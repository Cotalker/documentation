---
title: Survey exec scripting
sidebar_label: Exec scripting
displayed_sidebar: developer
---

<!-- source: repositories/cotctl/docs/surveys/exec-hooks.md, exec-contexts.md, exec-commands.md, exec-network-request.md, src/schemas/survey.schema.ts (~255-279) @ 4f7248a (2026-07-06) -->

Exec scripting is how a survey does things a static form can't: pre-fill a field from the current user, validate an answer against a business rule, call an external API when a button is pressed. Each question can carry an `exec` block with small JavaScript functions that run at defined points in its lifecycle.

The code runs in the **frontend, inside a Web Worker**, with a **60-second timeout**. Every script is a `function run()` (or `async function run()`) that **always returns an array of commands** — even an empty one.

## The six lifecycle hooks

```yaml
- type: textinput
  identifier: re_email
  label: "Email"
  exec:
    preload:
      context: "user#me"
      src: |
        function run() {
          const email = context['user#me'].email;
          return [{ cmd: 'SET_RESPONSES', value: [email] }];
        }
```

| Hook | Fires | Typical use |
|---|---|---|
| `preload` | When the survey is created/loaded | Pre-fill fields, load remote data |
| `onDisplay` | When the survey is opened for editing | Adjust the UI, set required/read-only conditionally |
| `onPlay` | When the user presses a custom button | Searches, user-triggered lookups |
| `validate` | Before submit | Custom validation — **must return a `RESULT`** |
| `postsave` | After saving | Post-processing, logging |
| `onSubmitSuccess` | After a successful submit | Webhooks, external notifications |

The order over a session is: `preload` → (user opens it) `onDisplay` → (button) `onPlay` → (submit) `validate` → `postsave` → `onSubmitSuccess`.

Each hook accepts three fields:

- `src` — inline JavaScript, or a `file://` path relative to the YAML file (`cotctl` inlines it on apply). Must define `function run()`.
- `context` — a comma-separated string of the contexts to inject (see below).
- `button` — **only valid on `onPlay`** — configures the trigger button.

### The `onPlay` button

```yaml
    onPlay:
      context: "responses#self,user#me"
      src: "file://./scripts/lookup.js"
      button:
        label: "Search"
        type: flat          # flat | stroked | default
        theme: primary      # basic | primary | accent | warn | ...
        debounceTime: 2000  # milliseconds, minimum 1000
```

## Contexts: what a script can read

A script only sees the data you declare in its `context` field. Declare the contexts as a comma-separated string, then read each one by key: `context['user#me']`.

| Context | Gives you |
|---|---|
| `user#me` | The responding [User](../../data-models.md#user) object |
| `user#company` | The company ID as a **string** (`user.company._id`) |
| `channel#self` | The [Channel](../../data-models.md#channel) running the survey |
| `task#self` | The [Task](../../data-models.md#task) linked to the channel |
| `message#self` | The [Message](../../data-models.md#message) that triggered the survey |
| `property#channel` | The channel's properties (an **array**) |
| `property#user` | The user's properties (an **array**) |
| `responses#self` | This question's current answer |

You can also read other answers in the same survey with `responses#<identifier>`, a parent survey's answers with `responses#parent#<identifier>`, and a sub-survey's answers with `responses#<identifier>@<sub_survey_code>`.

<div className="alert alert--secondary">

**In a transition survey, `task#self` is not populated.** When a survey opens from a state-change transition (`canChange: survey`), only the channel-side contexts (`channel#self`, `property#channel`) carry data — the task isn't attached yet. Read what you need from those or from `responses#self` instead.

</div>

## Commands: what a script returns

`run()` returns an array of command objects that tell the survey what to do.

| Command | Shape | Effect |
|---|---|---|
| `SET_RESPONSES` | `{ cmd: 'SET_RESPONSES', value: [...], target?: 'self' \| <identifier> }` | Sets the saved answer (of this question, or another via `target`) |
| `SET_READONLY` | `{ cmd: 'SET_READONLY', value: 'true' \| 'false' }` | Locks/unlocks editing |
| `SET_REQUIRED` | `{ cmd: 'SET_REQUIRED', value: 'true' \| 'false' }` | Toggles required |
| `RESULT` | `{ cmd: 'RESULT', result: true \| false, value: 'message' }` | Controls validity (see below) |

Note that `SET_READONLY` and `SET_REQUIRED` take the **strings** `'true'`/`'false'`, not booleans.

### Validation with `RESULT`

In a `validate` hook, `RESULT` is **required**. If your array doesn't contain one, the survey treats the question as invalid and blocks submission. A `result: false` blocks submit and shows `value` as the message — and short-circuits, so no other commands in the array run. A `result: true` lets submission proceed.

```yaml
    validate:
      context: "responses#self"
      src: |
        function run() {
          const value = context['responses#self'];
          if (!value || Number(value) < 0) {
            return [{ cmd: 'RESULT', result: false, value: 'Must be zero or greater' }];
          }
          return [{ cmd: 'RESULT', result: true }];
        }
```

In other hooks `RESULT` is optional and there's no short-circuit — the remaining commands always run.

## Network requests

Every script has a global `networkRequest` for authenticated HTTP calls, plus `baseURL` for building internal URLs.

```javascript
async function run() {
  const data = await networkRequest(
    `${baseURL}/api/users`,
    { method: 'GET', headers: { 'Content-Type': 'application/json' } },
    { token: true }   // injects the current user's Bearer token
  );
  if (!data) return [];                       // undefined on failure — always null-check
  const name = data.data?.[0]?.name?.names ?? 'No data';
  return [{ cmd: 'SET_RESPONSES', value: [name] }];
}
```

Key behaviors:

- **It never throws.** On any failure — network error, 4xx, 5xx — it returns `undefined`. Guard with `if (!data) return [];`.
- Pass `{ token: true }` to attach the current user's JWT. **Never hardcode a token.**
- A `body` object is auto-serialized with `JSON.stringify` — don't pre-stringify it.
- There's no automatic retry and no request limit, but the 60-second worker timeout still applies.

## Editing scripts as files

Inline JavaScript inside YAML is awkward to write and review. Export with `--extract-scripts` to pull each script into its own `.js` file, referenced with `file://`:

```bash
cotctl surveys export my_survey -c acme --extract-scripts ./scripts/
```

On the next `apply`, `cotctl` inlines the file contents back in — so you get real editor tooling and clean diffs while the survey stays a single portable resource.

## See also

- [Surveys](../surveys.md) — the survey landing
- [Logic & validation](./logic-and-validation.md) — declarative alternatives (conditional display, scoring)
- [Data models](../../data-models.md) — the shape of the context objects your scripts read
