---
title: Workflows (YAML)
sidebar_label: Workflows
displayed_sidebar: developer
---

A **workflow** models a process: a task that moves through a series of states, from creation to closure. Workflows are the most powerful — and the most structured — resource in Cotalker. The good news is you rarely write one from scratch: [`cotctl workflows scaffold`](../commands/scaffolding.md) generates a correct skeleton, and this page explains what that skeleton contains so you can customize it with confidence.

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
  - Admin                        # AccessRole names
writePermissions:
  - Admin
  - Manager
stateMachines:
  - # ...
```

| Field | Required | Notes |
|---|---|---|
| `kind` | Yes | Always `Workflow` |
| `nameCode` | Yes | Unique per company. **Immutable after creation.** Min 3 chars, lowercase/underscores |
| `nameDisplay` | No | Display name. If omitted, apply runs in "SM-only mode" (see below) |
| `isActive` | No | Defaults to `true` |
| `hideClosedAfterDays` | No | Days before closed tasks are hidden. **Defaults to 7, which is often too short** — consider 30 |
| `readPermissions` / `writePermissions` | No | AccessRole **names** — who can read / create tasks |

<div className="alert alert--secondary">

**Permissions are matched by name, and typos fail silently.** Permission lists use AccessRole *names*, which `cotctl` resolves to IDs on apply. If a name doesn't exist on the server, it is **silently dropped** — no error. After applying, verify with `cotctl workflows get <nameCode>` that every permission landed.

</div>

## State machines

Each entry in `stateMachines[]` is an independent flow. It declares which data drives it and where it starts:

```yaml
stateMachines:
  - code: sm_po_main
    name: PO Main Flow
    propertyType: pt_po_states     # immutable after creation
    asset:
      type: unique                 # "unique" or "generic" — immutable
      propertyType: pt_po_assets
    initialState: po_draft         # a state property code
    states:
      - # ...
```

The `propertyType` and `asset.type` are **immutable after creation** — they define the fundamental shape of the flow, so plan them up front.

## States and transitions

Each state corresponds to a [Property](./properties.md) and declares its lifecycle type and its outgoing transitions:

```yaml
states:
  - property: po_draft        # a Property code that must already exist
    type: new                 # "new" | "in-progress" | "closed" — immutable
    next:
      - target: po_approved
        canChange: manual
      - target: po_rejected
        canChange: survey
        requiredSurvey: survey_rejection_reason
```

A transition's `canChange` controls how it fires:

| `canChange` | Meaning |
|---|---|
| `manual` (default) | A user triggers it from the task UI |
| `survey` | The user must complete a survey first — set `requiredSurvey` to its code |
| `none` | Only automation/system can trigger it (e.g. auto-closure) |

<div className="alert alert--primary">

**States are permanent.** Once created, a state can't be deleted or deactivated, and its `type` can't change. Removing a state from your YAML doesn't delete it — apply will block the change. Design your state set deliberately.

</div>

## Automation: bots

Transitions and states can trigger **bots** — small automation routines that run when a transition fires or a form is submitted (sending a notification, creating a follow-up task, calling an API). Bots are an advanced topic with their own catalog of types; for now, what matters is one safety rule:

<div className="alert alert--secondary">

**The three forms of a `bots` field — and why it matters.** When you write a `bots` slot in YAML, the form you choose changes behavior:

| YAML | Effect on apply |
|---|---|
| Field **absent** | **Preserve** whatever bots the server already has in that slot |
| `bots: []` | **Delete** the bots in that slot (destructive) |
| `bots: [{...}]` | **Replace** with the bot you declared |

If bots were configured outside `cotctl` (for example, in the web builder), an accidental `bots: []` will wipe them. When in doubt, `cotctl workflows export` first to see what's there.

</div>

## SM-only mode

If you omit `nameDisplay`, apply runs in **SM-only mode**: it touches only the state machines and states, leaving the workflow's display settings and permissions untouched. This is exactly what you want when adding a second state machine to a workflow that already exists, without resetting anything.

## A dependency note

A transition's `requiredSurvey` references a survey by code. Because of apply ordering, when you use `apply --dir`, workflows are applied *before* surveys. If a transition needs a survey, apply the surveys first, then the workflow:

```bash
cotctl surveys apply -f surveys.yaml -c acme
cotctl workflows apply -f workflow.yaml -c acme
```

## See also

- [Scaffolding](../commands/scaffolding.md) — generate the workflow skeleton
- [Properties](./properties.md) and [Roles](./roles.md) — the resources a workflow references
- [validate](../commands/validate.md) — the production-readiness checklist for live workflows
