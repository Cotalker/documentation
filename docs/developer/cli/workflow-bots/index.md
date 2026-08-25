---
title: Workflow bots
sidebar_label: Overview
displayed_sidebar: developer
---

<!-- source: repositories/cotctl/docs/workflows/bots/README.md, data-context.md, company-specific.md @ 4f7248a (2026-07-06) -->

A **bot** is a unit of automation that runs inside a workflow. When a task changes state, or a survey is answered, the workflow engine executes the bots you wired into that transition — one after another — and routes to the next stage based on the branch each bot returns. Bots are how a workflow *does* things: create a task, send a message, call an external API, branch on a value.

This section is the human-readable catalog. Every bot Cotalker supports is grouped here by family, with a one-line description, a minimal YAML example, and the parameters you actually need day to day. For the exhaustive parameter list of any single bot, use `cotctl bot-types versions <BotType>` (see [Checking versions](#checking-versions-and-the-live-catalog)) or search the RAG-backed reference.

## How a bot is declared in YAML

Bots live inside one of these slots of a workflow: `requiredSurvey.bots`, `state.subtask.bots`, `state.next[i].bots`, or `state.surveyTriggers[i].bots`. Each bot is a small state machine of its own — a list of `stages`, each naming a bot type and routing its outputs:

```yaml
bots:
  - name: my-bot                # workflow-level name for this bot
    start: s1                   # first stage to run
    stages:
      - key: s1
        name: PBUpdateTask      # the bot TYPE (technical key)
        version: "2.2.0"        # optional; omit to use the type's default
        data:                   # type-specific parameters
          _id: "{{task._id}}"
          taskGroup: "{{task.taskGroup}}"
          status1: "5d2fd97cb448357a12fe59ac"
        next:                   # where to go for each output branch
          SUCCESS: ""           # "" ends this bot
          ERROR: ""
```

Two rules that trip people up:

- **cotctl does not resolve ObjectIds inside `stage.data`.** You must pass real ObjectIds. The only automatic resolutions are `surveyTriggers[].survey` (code → ObjectId) and AccessRole permissions by name. Inside `data`, a survey code in `surveyId` will *not* be resolved — pass the ObjectId.
- **Each bot declares its own output branches** (`SUCCESS`/`ERROR`, `IF`/`ELSE`, `FOUND`/`NOT-FOUND`, `DEFAULT`, …). Declare in `next` every branch the bot can return, or the engine may not find a downstream stage.

## Choosing the right bot

Reach for a first-party bot before writing custom JavaScript. The table below maps a need to the recommended bot; the "Instead of" column is the common anti-pattern to avoid.

| Need | Use | Instead of | Notes |
|------|-----|------------|-------|
| Create a task | `PBCreateTask` | `CCJS` + custom API call | Use version `2.0.1` |
| Update task fields (status, assignee, dates) | `PBUpdateTask` | `CCJS` | `2.2.0` adds performance tracking |
| Advance the state machine | `PBChangeState` | `PBUpdateTask` (does not record SM history) | |
| Duplicate a task | `PBDuplicateTask` | manual `PBCreateTask` | `ignoreChildren: true` skips children |
| Send a channel message | `PBMessage` | `PBSendCustomNotification` (that one is for push) | |
| Message many channels | `PBBulkMessage` | `FCEach` + `PBMessage` loop | ~90% fewer network calls |
| Send a survey | `PBSendSurvey` | `PBMessage` | `editMode: true` for drafts |
| Reopen a sent survey | `PBEditableSurvey` | `PBSendSurvey` with `editMode` | |
| Copy a survey to another channel | `PBCopySurvey` | `PBSendSurvey` | |
| Send an email | `PBEmail` | `NWRequest` to SES/SMTP | `3.0.1` recommended |
| Push notification + channel message | `PBSendCustomNotification` | `PBMessage` | |
| WhatsApp template | `PBWhatsApp` | `NWRequest` to a BSP | needs a valid `contractCode` |
| Generate a PDF | `PBPdf` (4.0.0) | `PBTemplate` (HTML only) | |
| Extract data from a PDF | `PBPDFExtractor` | `CCJS` | Adobe Extract API (gated) |
| Render HTML from a template | `PBTemplate` | `CCJS` string concatenation | |
| Generate a QR code | `PBQRCode` | `NWRequest` | |
| Create a channel | `PBCreateChannel` | `JPChannel` | |
| Patch a channel | `PBUpdateChannel` | `JPChannel` (RFC 6902) | |
| Hide all channel messages | `PBCleanChannel` | `PBHideMessages` (specific ids) | |
| Add a user to a channel | `PBChannelAddUser` | `JPChannel` | |
| Create / update a user | `PBCreateUser` / `PBUpdateUser` | `NWRequest` to `/users` | |
| Patch a property granularly | `PBUpdateProperty` (3.0.0) or `JPProperty` | `CCJS` | JP* is raw JSON Patch |
| Add editor/follower to a task | `PBTaskAddEditor` | `PBUpdateTask` with `editors[]` | additive; supports `operation: remove` |
| Iterate over an array | `FCEach` (4.1.0) | `CCJS` `forEach` | one subcontext per item |
| Iterate large arrays in batches | `FCEachBulk` | plain `FCEach` | configurable `batchSize`/`concurrency` |
| Conditional branch | `FCIfElse` | `CCJS` | `eq`/`neq`/`gt`/`lt`/`gte`/`lte` |
| Switch (first / all matches) | `FCSwitchOne` / `FCSwitchAll` | nested `FCIfElse` | |
| Switch by a survey list answer | `PBSwitchList` | `FCSwitchOne` | next-keys match the question's `code[]` |
| Inline boolean gate | `PBConditional` | `FCIfElse` | returns `TRUE`/`FALSE` |
| Pause the workflow | `FCSleep` | `CCJS setTimeout` | |
| HTTP to an external system | `NWRequest` (2.0.0) | `CCJS` with `fetch` | supports `simulation` mode |
| Check if an answer exists | `PBAnswerChecker` | `NWRequest` to `/answers` | |
| LLM query with MCP tools | `PBLLMRunner` | `NWRequest` to Vertex | |

If nothing fits, the escape hatches are the script-executing bots — see [Network & code](./network-and-code.md). They run arbitrary JavaScript and are blocked unless you apply with `--allow-script-bots`.

## The bot families

| Family | Page | What lives there |
|--------|------|------------------|
| Flow control (`FC*`) | [Flow control](./flow-control.md) | Loops, branches, switches, sleep |
| Data extraction (`JP*`, `ST*`) | [Data extraction & patching](./data-extraction.md) | Raw JSON Patch and survey-answer string tools |
| Network & code (`NW*`, script bots) | [Network & code](./network-and-code.md) | HTTP requests and the gated JS escape hatches |
| Tasks & channels (`PB*`) | [Actions: tasks & channels](./actions-tasks-and-channels.md) | Create/patch tasks, channels, editors, messages hiding |
| Messaging & surveys (`PB*`) | [Actions: messaging & surveys](./actions-messaging-and-surveys.md) | Messages, email, WhatsApp, surveys, buttons |
| Data & integrations (`PB*`) | [Actions: data & integrations](./actions-data-and-integrations.md) | Properties, users, PDF, sheets, payments, LLM, calendars |

## What data a bot sees (`$VALUE` / `data`)

A bot that looks identical in YAML behaves differently depending on **which slot triggered it**. The value it receives as `$VALUE` (exposed as `data` in the engine) is built by the engine from the trigger context. If your bot lives in an unusual slot, the safest move is to print `$VALUE` once with a `PBMessage` before referencing fields.

The two most common contexts:

**`requiredSurvey.bots` — a state transition with a required form.** When the user submits the form, the input is a `WorkflowStart` shape:

| Field | Origin |
|-------|--------|
| `answer` | the submitted answer document |
| `task` | the task whose state is changing |
| `meta.parentTask` | parent task, if any |
| `meta.taskGroup` | the task's TaskGroup |

```yaml
data:
  taskId: "{{task._id}}"          # task is at the root of $VALUE
  responderId: "{{answer.user}}"
  taskGroupId: "{{meta.taskGroup}}"
```

**`state.surveyTriggers[i].bots` — a survey answered inside a running state.** Here the engine spreads the **task at the root** and puts the answer under `sentAnswer`:

| Field | Origin |
|-------|--------|
| `_id`, `channel`, `taskGroup`, `status`, … | all `task` fields, spread at the root |
| `sentAnswer` | the answer that triggered the bot |

```yaml
data:
  taskId: "{{_id}}"               # the task itself (root), NOT task._id
  taskChannel: "{{channel}}"
  answerId: "{{sentAnswer._id}}"
```

Common mistakes in a `surveyTriggers` bot:

- Referencing `task._id` — the task fields are at the root, so it is `{{_id}}`.
- Referencing `answer` — the field is named `sentAnswer` there.
- Assuming `meta.taskGroup` exists — it does not; use the task's `taskGroup` field directly.

## Company-specific bots (`CB*`)

A handful of bots (`CB*`) are loaded **only for specific tenants** and will fail anywhere else. The current tenants with custom bots are `puertocoronel`, `muellesdepenco` and `primetime`. Do not use them in cross-company workflows unless you have confirmed the bot is registered in the target environment.

| Bot | Tenant | Purpose |
|-----|--------|---------|
| `CBCheckOTsched` | puertocoronel | Trigger the `checkOT` scheduler once (testing utility) |
| `CBCoronelCreateMtNotification` | puertocoronel | Push maintenance notifications to SAP via WS1 SOAP |
| `CBGruas` | puertocoronel | Pull crane registers into a PostgreSQL DB, split by shift |
| `CBRocketReachIOGetContact` | primetime | Despite the name, sets `smState` on a task (`patchTask`) |
| `CBRocketReachIOSearch` | primetime | **Stub** — always returns `SEARCH_ERROR` (real call commented out) |
| `CBErrorMessages` | muellesdepenco | Return channel messages whose content matches substrings |
| `CBGetDeadTimeAnswer` | muellesdepenco | Look up a dead-time / delay answer by composite id |
| `CBValidateAssignation` | muellesdepenco | Validate a dead-time assignation equals the actual duration |
| `CBValidateClose` | muellesdepenco | Validate no dead time ends after the shift's real end |
| `CBValidateStart` | muellesdepenco | Validate the real start falls inside the planned window |
| `CBValidateTM` | muellesdepenco | Validate a new dead time fits inside the planned shift |

These bots depend on tenant-specific env vars, hard-coded survey ids and external services (SAP, PostgreSQL, SOAP). Treat them as internal integrations, not reusable building blocks, and confirm behavior with the owning team before designing a workflow around them.

## Checking versions and the live catalog

Most bots ship several versions, and the recommended one changes over time. The catalog is served by the backend, so query it live rather than trusting a static list:

```bash
cotctl bot-types list                    # full catalog: every type, its versions, and whether it has a default
cotctl bot-types versions PBUpdateTask   # versions + default for one type
```

Notes:

- `cotctl bots list` / `cotctl bots versions <BotType>` still work as **deprecated aliases** of the `bot-types` commands.
- A `stage.name` that is not a known bot type produces a **warning** at apply time (typo detection), not a hard error — double-check the exact key when you see one.
- A few bots have **no `default` version** and require an explicit `version:` — `PBCalendar` (`2.0.0`) and `PBReport` (`1.0.0`) are the notable ones.
