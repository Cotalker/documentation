---
title: Workflows (YAML)
sidebar_label: Workflows
displayed_sidebar: developer
---

<!-- source: repositories/cotctl/src/commands/workflows.ts, src/schemas/workflow.schema.ts, src/resources/workflow.resource.ts (~208-221), docs/workflows/yaml-structure.md @ 4f7248a (2026-07-06) -->

A **workflow** models a process: a task that moves through a series of states, from creation to closure. Workflows are the most powerful — and the most structured — resource in Cotalker. You rarely write one from scratch: [`cotctl workflows scaffold`](../commands/scaffolding.md) generates a correct skeleton, and this page explains what that skeleton contains so you can customize it with confidence.

This is the map. It covers the hierarchy, the real root fields, and the commands; the subpages cover the parts subtle enough to bite you — merge semantics, immutability, COTLang expressions.

## The hierarchy

A single workflow YAML document manages a nested structure:

```
Workflow                 (the process: name, permissions, settings)
└── stateMachines[]      (one or more independent flows)
    └── states[]         (the steps a task moves through)
        └── next[]       (the allowed transitions between states)
```

## The workflow level

The top of the file describes the workflow itself:

```yaml
kind: Workflow
nameCode: purchase_orders        # immutable after creation
nameDisplay: Purchase Orders
isActive: true
hideClosedAfterDays: 30
readPermissions:
  - purchase_orders:view         # literal permission codes (see below)
writePermissions:
  - purchase_orders:start-form
stateMachines:
  - # ...
```

### Root fields

The schema defines these top-level fields:

| Field | Required | Notes |
|---|---|---|
| `kind` | Yes | Always `Workflow` |
| `nameCode` | Yes | Unique per company. **Immutable after creation.** Min 3 chars, `^[a-z]+([_a-z0-9]+)*$` |
| `nameDisplay` | No | Display name. If omitted, apply runs in "SM-only mode" (see below) |
| `nameTranslations` | No | `es` / `en` / `pt` / `fr` |
| `color`, `icon` | No | Display appearance |
| `weight` | No | Display order (default `0`) |
| `isActive` | No | Defaults to `true` |
| `hideClosedAfterDays` | No | Days before closed tasks are hidden (0–1825). **Defaults to 7, which is often too short** — consider 30 |
| `readPermissions` | No | Permission codes — who can read tasks |
| `writePermissions` | No | Permission codes — who can create tasks |
| `taskImportPermissions` | No | Permission codes — who can import tasks |
| `taskFollowerPermissions` | No | Permission codes — who can be added as followers |
| `taskEditorPermissions` | No | Permission codes — who can edit tasks |
| `availableViews`, `defaultView` | No | Which UI views (e.g. kanban, list) are available |
| `stateMachines` | No | The list of state machines |

<div className="alert alert--danger">

**Permission fields are literal permission codes — not AccessRole names.** The five permission arrays (`readPermissions`, `writePermissions`, `taskImportPermissions`, `taskFollowerPermissions`, `taskEditorPermissions`) hold **permission code strings** like `web-admin-write` or `purchase_orders:view`, and `cotctl` sends them to the server **verbatim** — it does *not* resolve them to AccessRole IDs. This is different from surveys, whose `permissions` field *does* take AccessRole names. Put the permission code itself here, exactly as it appears on the role that grants it. (Older workflows may still carry raw ObjectIds in these fields from a previous `cotctl` version; export surfaces those with a legacy marker so you can replace them.)

</div>

## State machines, states, and transitions

Each `stateMachines[]` entry is an independent flow. It declares which data drives it and where it starts:

```yaml
stateMachines:
  - code: sm_po_main
    name: PO Main Flow
    propertyType: pt_po_states     # immutable after creation
    asset:
      type: unique                 # "unique" or "generic" — immutable
      propertyType: pt_po_assets
    initialState: po_draft
    states:
      - property: po_draft         # a Property code that must already exist
        type: new                  # "new" | "in-progress" | "closed" — immutable
        next:
          - target: po_approved
            canChange: manual
          - target: po_rejected
            canChange: survey
            requiredSurvey: survey_rejection_reason
```

Each state corresponds to a [Property](./properties.md). Its `type` is one of `new`, `in-progress`, `closed`. A transition's `canChange` controls how it fires:

| `canChange` | Meaning |
|---|---|
| `manual` (default) | A user triggers it from the task UI |
| `survey` | The user must complete a survey first — set `requiredSurvey` to its code |
| `none` | Only automation/system can trigger it (e.g. auto-closure) |

State machines also support a `requiredSurvey` (a StartForm that gates task creation), and states support `subtask` and `surveyTriggers` slots — all of which can carry automation **bots**. Those slots have preserve/replace/delete rules you must understand before editing a live workflow; the [Merge semantics](./workflows/merge-semantics.md) page covers them.

### SM-only mode

If you omit `nameDisplay`, apply runs in **SM-only mode**: it touches only the state machines and states, leaving the workflow's display settings and permissions untouched. This is exactly what you want when adding a second state machine to a workflow that already exists, without resetting anything.

## What the subpages cover

- **[Merge semantics](./workflows/merge-semantics.md)** — the GET-merge-PUT contract (0.7.0+): why an omitted field is preserved but an explicit `[]` deletes, which fields it applies to, and the silent errors it prevents. **Read this before editing a live workflow.**
- **[COTLang](./workflows/cotlang.md)** — the expression language for bot `data`, and the reserved characters that break it.
- **[Immutability & versioning](./workflows/immutability-and-versioning.md)** — what can't change after creation, why states are permanent, and the bot-version rules `cotctl` enforces.
- **[Complete example](./workflows/complete-example.md)** — a full purchase-order workflow, annotated.

## Managing workflows with `cotctl`

| Command | What it does |
|---|---|
| `cotctl workflows list` | List workflows (active by default; `--all` includes inactive) |
| `cotctl workflows get <nameCode>` | Show one workflow with its state machines and states |
| `cotctl workflows export <nameCode>` | Export a workflow as YAML |
| `cotctl workflows apply -f <file>` | Create or update a workflow from YAML |
| `cotctl workflows scaffold` | Generate a correct workflow skeleton |
| `cotctl workflows deactivate <nameCode>` | Deactivate the workflow (its state machines stay active) |

### Applying safely

```bash
# Preview against the server, showing a verbose diff
cotctl workflows apply -f workflow.yaml -c acme --dry-run --diff verbose

# In CI: fail on any destructive change the dry-run detects
cotctl workflows apply -f workflow.yaml -c acme --dry-run --fail-on-destructive
```

- `--dry-run` validates and shows what would happen without applying.
- `--diff <off|compact|verbose>` sets the before/after verbosity (default `compact`).
- `--fail-on-destructive` exits with code `2` when the dry-run finds a danger-severity change (requires `--dry-run`).
- `--rollback` deactivates anything created during a partial apply if it fails partway.
- `--yes` skips confirmations; `--json` emits one result object per line.

## A dependency note

A transition's `requiredSurvey` references a survey by code. Under `apply --dir`, workflows are applied *before* surveys, so a transition's survey must already exist — apply surveys first when running them separately:

```bash
cotctl surveys apply -f surveys.yaml -c acme
cotctl workflows apply -f workflow.yaml -c acme
```

## See also

- [Scaffolding](../commands/scaffolding.md) — generate the workflow skeleton
- [Properties](./properties.md) and [Roles](./roles.md) — the resources a workflow references
- [validate](../commands/validate.md) — the production-readiness checklist for live workflows
- [Data models](../data-models.md) — Task and TaskGroup, the entities a workflow produces
