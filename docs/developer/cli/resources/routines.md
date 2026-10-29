---
title: Routines (YAML)
sidebar_label: Routines
displayed_sidebar: developer
---

<!-- source: repositories/cotctl/src/commands/routines.ts, src/schemas/routine.schema.ts, src/resources/pbscript.resource.ts, docs/routines/ @ a9168d68 (2026-10-23) -->

A **routine** (a PBScript, or *rutina*) is a reusable automation promoted to a first-class resource. It's the same automation graph you'd embed inline in a workflow — a `start` stage and a list of `stages[]` — but with its own `code`, `display`, and declared inputs, living in its own collection. Once a routine exists, any [bot](./bots.md), [SLA](./slas.md), or [schedule](./schedules.md) can invoke it from a stage by referencing its `code`. Think of routines as the shared library layer of the automation model.

## The shape of a routine

```yaml
kind: Routine
code: rutina_saludo_simple         # upsert key — lowercase, immutable
display: "Rutina de saludo"

body:
  start: send
  stages:
    - key: send
      name: PBMessage              # a bot type from the catalog
      version: "2.2.0"             # pinned: the default version never takes ERROR
      data:
        content: "Hola desde una rutina"
        contentType: "text/plain"
        sentBy: "6a000000000000000000beef"   # the user shown as the sender
        channelIds:
          - "6a000000000000000000abcd"
      next:
        SUCCESS: ""
        ERROR: notify_failure      # see "Give every stage that can fail an error path"
    - key: notify_failure
      name: PBMessage
      version: "2.2.0"
      data:
        content: "La rutina de saludo no pudo enviar su mensaje."
        contentType: "text/plain"
        sentBy: "6a000000000000000000beef"
        channelIds:
          - "6a000000000000000000fa11"       # a channel the team watches
      next:
        SUCCESS: ""
        ERROR: ""                  # the handling stage ends the run either way
```

| Field | Required | Notes |
|---|---|---|
| `kind` | Yes | Always `Routine` |
| `code` | Yes | Upsert key. Lowercase/underscores/digits, 3–50 chars. **Immutable after creation** |
| `display` | Yes | Human-readable label (mutable) |
| `description` | No | Free text |
| `type` | No | `normal` (default), `network`, or `flowcontrol` |
| `isActive` | No | Defaults to `true` on create; an update that omits it keeps the stored value. Soft-delete by re-applying the export with `isActive: false` |
| `dataType` | No | Declared inputs the routine accepts (see below) |
| `body` | Yes | The automation graph — same shape as bots embedded in [workflows](./workflows.md) |

## Declared inputs: `dataType`

A routine can declare the inputs it expects. Each entry names a `key` (referenced inside the graph as `$INPUT#<key>`), a `display`, and whether it's `required`:

```yaml
dataType:
  - key: monto
    display: "Monto a evaluar"
    required: true
  - key: umbral
    display: "Umbral de riesgo"
    required: false
```

These are documentation-and-contract only — `cotctl` doesn't check that the graph actually consumes them, and it won't resolve `$INPUT#...` expressions for you. They fail at runtime if misspelled, not at apply time.

On an update, each input is matched with the stored input of the same `key`, wherever you place it, and keeps the fields it omits — an input that omits `required` keeps its stored value. The server updates this list **by position**, though. An input with no stored match is sent with `required: false` when it omits it. An input with no stored match, or one that moved, is written over the stored input at its position and keeps any other key it omits — its `description` or `type` — and `apply` warns on stderr which. Write those keys — empty where needed — to replace them. `dataType: []` removes every input.

## The automation graph: `body`

`body` is a **multi-stage builder** — a directed graph the runtime walks one stage at a time, branching on the transition each stage emits (`SUCCESS`, `ERROR`, and type-specific branches like `TRUE`/`FALSE`). Every stage has:

- **`key`** — unique within the body.
- **`name`** — the bot type (see [Bot types](./bot-types.md) for the catalog: `PB*` messaging/tasks, `FC*` flow control, `NW*` HTTP, `PBScript`, …).
- **`version`** — optional. On create, omit it to take the type's default; pin it (quoted!) when the type has no default, or when its default never reports a failure on `ERROR` (see [below](#give-every-stage-that-can-fail-an-error-path)). On an update, an omitted `version` keeps the stored stage's version, and `version: null` sends it back to the type's default.
- **`data`** — an opaque payload passed straight through. `cotctl` does **not** rewrite ObjectIds or resolve COTLang expressions (`$INPUT#`, `$VALUE#`, `$OUTPUT#`) inside it — provide them exactly as the runtime expects.
- **`next`** — a map from branch name to the next stage's `key`. The empty string `""` is a valid terminal branch.

`body.start` names the entry stage. `body.maxIterations` (default `100`) caps how many transitions run — a safety net against loops.

To edit one stage without restating the whole `body`, apply a document with `partial: true` (0.14.0+) that names the routine's `code` and only that stage, by `key` — see [Partial documents](../commands/apply.md#partial-documents-partial-true). A partial routine that declares `dataType` is refused.

### Give every stage that can fail an error path

`""` is a valid terminal branch, and that is the trap: a stage that fails onto `ERROR: ""` ends the run there, and the run is still logged as executed, so `cotctl logs list --op failed` does not find it. Point the `ERROR` of every stage that can fail — an email, a message, a request, a write the backend can refuse — at a handler stage someone will see, such as the pinned `PBMessage` that posts to a watched channel in the example above. The handler is the one stage that keeps `ERROR: ""`. Not every default reports there, though: a default `PBCreateTask` routes `CREATED` / `NOT-CREATED`, and a request the backend refuses stops the run as `UNHANDLED_ERROR` without taking any branch.

The default `PBEmail` and `PBMessage` never take that branch: they return `DEFAULT` whether the send worked or not (the default `PBEmail` only records `status: false` in its result). Pin `PBEmail` `"3.0.1"` and `PBMessage` `"2.2.0"`, and know that pinning changes two contracts `cotctl` does not check. Their `next` takes only `SUCCESS` and `ERROR`, so rename `DEFAULT` to `SUCCESS` — a stage that keeps `DEFAULT` never sends. And they validate `data` strictly, refusing any key they don't list: `PBEmail` needs `subject`, an object `content` and `targets` as email addresses; `PBMessage` needs `content`, `contentType`, a `sentBy` ObjectId and a non-empty `channelIds` list of ObjectIds. A `{{…}}` placeholder is neither: `data` is not a Mustache template.

Prove both branches before production. Apply the routine to a testing company and run `cotctl routines test` twice — once as it is, once with the stage made to fail by a variant you apply only for that test (`PBEmail` `3.0.1` refuses a malformed address in `targets`, and `PBMessage` `2.2.0` a `channelIds` entry that is not an ObjectId, before sending anything) — then read each run with [`cotctl logs`](../commands/logs.md):

```bash
cotctl logs list --owner TEST --since 1h            # a test run carries no Routine code
cotctl logs get <logId> --parts results --stdout    # each stage's status, in order
```

The failing run must show the stage with `status: ERROR` and the handler stage after it, and the handler's message must have arrived.

### Invoking another routine

A stage with `name: PBScript` invokes a standalone routine by code — and a routine may invoke itself (a retry-with-backoff pattern) or form a cycle with another:

```yaml
body:
  start: try
  stages:
    - key: try
      name: PBScript
      data:
        code: rutina_calcular_riesgo   # must be a real routine code
        data: {}                       # its input, one key per dataType entry — {} when none
      next:
        SUCCESS: ""
        ERROR: retry
    - key: retry
      name: FCSleep
      data:
        seconds: 30
      next:
        SUCCESS: try
        ERROR: ""
```

`cotctl` validates every `PBScript` stage's `data.code` against the routines registered in the profile, so a typo fails at apply time with a "did you mean…?" suggestion. The invoked routine's input goes under **`data.data`** — required since 0.14.0, `{}` when the routine takes none; see [Required `data` entries](../workflow-bots/index.md#required-data-entries).

<div className="alert alert--info">

**Self-references validate clean on the *second* apply.** A brand-new routine that references its own `code` isn't in the catalog yet the first time you apply it, so you'll get a warning on that first pass. Apply again and it validates cleanly — the routine now exists. `cotctl` never blocks the create, so this is just noise on the first run.

</div>

## Working with routines

```bash
# Read
cotctl routines list                         # active, company-scoped (default)
cotctl routines list --all                   # include inactive
cotctl routines list --search "riesgo"
cotctl routines list --include-global        # include admin-only globals
cotctl routines get rutina_saludo_simple
cotctl routines export rutina_saludo_simple -o rutina.yaml

# Write
cotctl routines apply -f rutina.yaml --dry-run
cotctl routines apply -f rutina.yaml -y

# Run for real
cotctl routines test rutina_saludo_simple --context ctx.json
```

`apply` takes `-f/--file` (required), `--dry-run`, `-y/--yes`, `-q/--quiet`, and `--allow-script-bots` (required when the body has a `PBScript`, `CCJS` or `ESMCode` stage), and handles multi-document files.

`get`, `export` and `test` look up exactly the code they are given, and report a routine whose code is not that one as not found. (Before 0.15.0 a code containing `#`, `?`, `/`, `\` or `%` reached the request URL unencoded and could resolve another routine: `routines test 'daily#x' -y` ran `daily`.)

<div className="alert alert--info">

**Since 0.14.0, reading a routine by its `code` needs `admin-pbscripts-read`.** `cotctl` now reads it through the endpoint the webclient uses, which checks that permission — so `routines get`, `routines export`, `routines test`, and `routines apply` or `apply --dir` of a Routine without `id` that already exists fail with `API Error 403` (exit `1`) for a profile without it. It's the permission `routines list` already needed; writing also needs `admin-pbscripts-write`.

</div>

<div className="alert alert--warning">

**`routines test` runs the routine for real.** There is no simulation mode: `test` executes the routine immediately with all its side effects (it posts messages, creates tasks, writes properties, fires webhooks). It always prints a warning banner, and without `-y` it makes you retype the routine's `code` to confirm. `--context <file>` supplies the input JSON; `--dry-run` prints the payload that would be sent without calling the backend. Reserve `-y` for CI and scripts. Inspect the run afterward with `cotctl schedules logs <TEST_...>` — the backend records each test as a schedule — or download its log with [`cotctl logs`](../commands/logs.md) `pull --schedule <TEST_...>`.

</div>

<div className="alert alert--primary">

**Applying a routine is a live deploy.** Routines aren't versioned — re-applying mutates the live document in place, and a task currently executing it picks up the new behaviour on its next stage transition. Treat `cotctl routines apply` against production with the same care as shipping code.

</div>

## Immutability and updates

`code` is immutable and identifies the routine — there's no in-place rename. On update, `cotctl` sends only the fields the backend allows to change (`display`, `description`, `type`, `isActive`, `dataType`, and `body`) — and of those, only what differs from the stored routine. A key you omit keeps its stored value, inside `body` too: each stage is paired with the stored stage of the same `key`. But a declared `body.stages` is the complete list, so a stage it leaves out is removed.

That is why **a routine is retired from its export, never from a stub.** The schema requires `display` and a full `body`, so a YAML can't carry `isActive: false` alone, and a stub with a placeholder stage would replace the routine's real stages. Export it, set `isActive: false`, and apply it back:

```bash
cotctl routines export rutina_obsoleta -c acme -o rutina_obsoleta.yaml
# edit rutina_obsoleta.yaml: isActive: false
cotctl routines apply -f rutina_obsoleta.yaml -c acme --dry-run
cotctl routines apply -f rutina_obsoleta.yaml -c acme -y
```

There's no delete endpoint, and no `cotctl routines logs` subcommand: to read what a routine did when it ran — the context it received, what each stage returned, its error — use [`cotctl logs`](../commands/logs.md), for example `cotctl logs pull --routine <code> --since 24h`.

## Apply order

In a directory apply, routines come **after** workflows and **before** SLAs and schedules — because an SLA or schedule may invoke a routine from a `PBScript` stage, and the dry-run validator needs the routine to already exist in the catalog. `cotctl apply --dir` enforces this ordering for you.

## See also

- [Bot types](./bot-types.md) — the catalog of stage types, and how to check versions before pinning
- [Bots](./bots.md), [SLAs](./slas.md), [Schedules](./schedules.md) — the resources that invoke routines via `PBScript` stages
- [Workflows](./workflows.md) — the full ParametrizedBot reference
- [apply](../commands/apply.md) — routines are applied before SLAs and schedules
