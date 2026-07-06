---
title: 'Workflow bots: network & code'
sidebar_label: Network & code
displayed_sidebar: developer
---

<!-- source: repositories/cotctl/docs/workflows/bots/nw-request.md, nw-bot-v2-v3.md, ccjs.md, esm-code.md, pb-script.md @ 4f7248a (2026-07-06) -->

This family is the workflow's connection to the outside world and its escape hatch when no first-party bot fits:

- **`NW*` — network bots**: make an HTTP request (`NWRequest`) or bridge to a legacy v2 bot (`NWBotV2V3`).
- **Script-executing bots** (`CCJS`, `ESMCode`, `PBScript`): run arbitrary JavaScript. These are **gated** — the CLI blocks `apply` unless you pass `--allow-script-bots`, and the webclient will not render or execute them otherwise.

:::warning Gated bots
`CCJS`, `ESMCode` and `PBScript` execute arbitrary code and can break security boundaries. Use them only when no first-party bot can do the job, and apply with the flag:

```bash
cotctl workflows apply -f workflow.yaml -c <profile> --allow-script-bots
```
:::

## NWRequest

Generic HTTP request (GET/POST/PATCH/PUT/DELETE/OPTIONS) with optional Cotalker internal auth, query strings, JSON body and a dry-run mode.

Key parameters: `url`, `method`, `headers` (optional), `defaultAuth` (attach the caller's Cotalker token), `queryString` (object appended to the URL), `body` **or** `sbody` (JSON body / stringified JSON — mutually exclusive), `simulation` (skip the real call, return `{ statusCode: 999, data: <config> }`).

Branches: `SUCCESS` (status < 400), `ERROR` (≥ 400 after retries, or transport error).

```yaml
- key: s1
  name: NWRequest
  version: "2.0.0"
  data:
    url: "https://api.example.com/sync"
    method: "POST"
    defaultAuth: false
    headers:
      Authorization: "Bearer {{secret.token}}"
      Content-Type: "application/json"
    body:
      taskId: "{{task._id}}"
      status: "{{task.status1.code}}"
    simulation: false
  next:
    SUCCESS: ""
    ERROR: ""
```

Gotchas:

- Auto-retries on `ECONNRESET`, HTTP 429 (honoring `Retry-After`, up to 30 s) and HTTP 502 to the configured external host.
- Total request timeout is 600 s (10 min).
- `body` and `sbody` cannot be used together.
- `simulation: true` is the way to test the YAML without side effects.

## NWBotV2V3

Internal adapter that wraps a legacy v2 bot endpoint so it can be called from the v3 engine. Posts the channel context, the last message and the caller's `me` payload to the v2 bots service.

Key parameters: `process` (v2 bot process name), `channel`, `messages` (only the LAST one is forwarded), `uri` (optional override; defaults to `http://<USERVICES_HOST>:<UXPORT>/bots/process/<process>`).

Branches: `SUCCESS`, `ERROR`.

```yaml
- key: s1
  name: NWBotV2V3
  data:
    process: "legacy-classifier"
    channel: "{{task.channel}}"
    messages:
      - "{{lastMessage}}"
  next:
    SUCCESS: ""
    ERROR: ""
```

Gotchas:

- Requires env vars `USERVICES_HOST` and `UXPORT` unless `uri` is provided.
- Rarely used in modern workflows — consider migrating the underlying v2 bot instead.

## CCJS

Sends arbitrary JavaScript (`src`) plus `data`, workflow `input` and previous `output` to the `faas-native-products` Lambda and returns its output. The escape hatch when no first-party bot covers your case. **Gated by `--allow-script-bots`.**

Key parameters: `src` (the JS; the handler receives `{ input, output, data, env, useDefaultCotalkerAuth, defaultCotalkerAuthToken }`), `data` (object passed to the script), `useDefaultCotalkerAuth` (inject a Cotalker token), `hideOutput` (don't forward the potentially large results history).

Branches: `SUCCESS` (Lambda `status=success`), `ERROR`.

```yaml
# Apply with: --allow-script-bots
- key: s1
  name: CCJS
  version: "2.0.3"
  isCritical: true
  risks: "Executes arbitrary JS in a FaaS Lambda"
  data:
    useDefaultCotalkerAuth: true
    data:
      taskId: "{{task._id}}"
    src: |
      const computed = data.taskId.length;
      return { computed };
  next:
    SUCCESS: ""
    ERROR: ""
```

`fetch` availability depends on the version: **`2.0.0`+ (FaaS)** has `fetch`; **`default` (legacy `isolated-vm`)** does **not** (`ReferenceError: fetch is not defined`). If pinned to `default` and you need HTTP, move to `2.0.0`+ or make the call with `NWRequest` and feed the response back via `data`.

The script receives an `env` object with Cotalker's internal hosts — pick the right one:

| Variable | Points to | Use for |
|----------|-----------|---------|
| `BASEURL` | internal API host (private network) | server-to-server calls inside the cluster (not browser-reachable) |
| `EXTERNAL_API_URL` | public API host | calls whose result reaches a browser or external caller |
| `EXTERNAL_APP_URL` | public webclient host | URLs clicked by end users (emails, notifications) |
| `FAASURL` / `FAAS_PRODUCTS_URL` | internal FaaS gateway / products endpoint | calling other FaaS endpoints |

For modern ESM imports and `isolated-vm` sandboxing, prefer `ESMCode`.

## ESMCode

Runs modern ES-module JavaScript in an `isolated-vm` sandbox via the `esmcode-runner` Lambda. Supports dynamic dependencies fetched from CDNs, pinned to exact versions. **Gated by `--allow-script-bots`.**

Key parameters: `src` (must `export default async function main({ fetch, console, env, input, data, output }) { … }`), `deps` (`{ "<pkg>": "<exact-version>" }` — semver ranges are rejected), `data`, `useDefaultCotalkerAuth`, `hideOutput`.

Branches: `SUCCESS`, `ERROR`.

```yaml
# Apply with: --allow-script-bots
- key: s1
  name: ESMCode
  version: "1.0.0"
  isCritical: true
  risks: "Executes ESM JS in an isolated-vm sandbox"
  data:
    deps:
      papaparse: "5.4.1"
    src: |
      import Papa from 'papaparse';
      export default async function main({ data }) {
        const parsed = Papa.parse(data.csv, { header: true });
        return { rows: parsed.data.length };
      }
    data:
      csv: "{{stages.s_fetch.body}}"
  next:
    SUCCESS: ""
    ERROR: ""
```

Gotchas:

- `axios` is **blocked** by the sandbox — use the provided `fetch`.
- Bundle builds are cached for 7 days, then rebuilt on miss.
- For the legacy CommonJS-only sandbox, use `CCJS`.

## PBScript

Loads a packaged `COTPBScript` by `code` and runs its `parametrizedBot` body through the controller with your `data` as input. Returns a `{ key → result }` dictionary from each stage of the wrapped script. **Gated by `--allow-script-bots`.**

Key parameters: `code` (the pbscript code to look up), `data` (input forwarded to the wrapped script).

Branches: `SUCCESS` (the wrapped script produced at least one stage result), `ERROR` (not found, runtime error, or empty result).

```yaml
# Apply with: --allow-script-bots
- key: s1
  name: PBScript
  version: "2.0.0"
  isCritical: true
  risks: "Runs an arbitrary packaged PB script"
  data:
    code: "my-custom-pbscript"
    data:
      taskId: "{{task._id}}"
  next:
    SUCCESS: ""
    ERROR: ""
```

Gotchas:

- An empty result routes to `ERROR` — the wrapped script must actually produce stage results.
- `PBScript` is for **reusable, named** bot bundles. For ad-hoc JavaScript prefer `CCJS` or `ESMCode` (also gated).
