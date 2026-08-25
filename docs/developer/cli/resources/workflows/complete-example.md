---
title: A complete workflow, annotated
sidebar_label: Complete example
displayed_sidebar: developer
---

<!-- source: repositories/cotctl/docs/workflows/complete-example.md @ 4f7248a (2026-07-06) -->

Here's a full purchase-order workflow — a single state machine with five states, mixed transition types, and one automation bot. Read it once end to end, then scaffold your own with `cotctl workflows scaffold` and adapt.

## The workflow

```yaml
kind: Workflow
nameCode: purchase_orders          # immutable after creation
nameDisplay: Purchase Orders
color: "#FF5722"
hideClosedAfterDays: 30            # set it — don't rely on the 7-day default

# Permission CODES (not AccessRole names). Put the literal permission
# code that grants each capability; cotctl sends them verbatim.
readPermissions:
  - purchase_orders:view
  - purchase_orders:view-all
writePermissions:
  - purchase_orders:start-form

stateMachines:
  - code: sm_po_main
    name: PO Main Flow
    propertyType: pt_po_states       # owns the states list — immutable
    asset:
      type: unique                   # one asset per task — immutable
      propertyType: pt_po_assets     # the task's attached data — immutable once tasks exist
    initialState: po_draft           # a state property code

    # StartForm: a survey that gates task creation, with a bot that
    # emails the creator on intake.
    requiredSurvey:
      surveyCode: survey_po_intake
      bots:
        - name: notify-creator
          start: s1
          stages:
            - { key: s1, name: PBEmail, data: { to: "purchasing@acme.com" } }

    states:
      - property: po_draft           # must already exist as a Property
        type: new                    # new | in-progress | closed — immutable
        next:
          - target: po_under_review
            canChange: manual         # a user advances it from the task UI
          - target: po_rejected
            canChange: survey         # a form is required first
            requiredSurvey: survey_rejection_reason

      - property: po_under_review
        type: in-progress
        next:
          - target: po_approved
            canChange: manual
            # A transition bot: creates a follow-up task on approval.
            # NOTE: cotctl does NOT resolve IDs inside stage.data —
            # taskGroup must be a real ObjectId.
            bots:
              - start: s1
                stages:
                  - key: s1
                    name: PBCreateTask
                    data:
                      taskGroup: "665f0c3e9a1b2c0012ab34cd"
                      propertyValues:
                        priority: "high"
          - target: po_rejected
            canChange: survey
            requiredSurvey: survey_rejection_reason

      - property: po_approved
        type: in-progress
        next:
          - target: po_closed
            canChange: manual

      - property: po_rejected
        type: closed                 # terminal — no next[]

      - property: po_closed
        type: closed                 # terminal — no next[]
```

## What to notice

- **Permissions are codes, not role names.** `purchase_orders:view` is the permission code itself — see [why this matters](../workflows.md#root-fields). Getting this wrong is the single most common workflow mistake.
- **The asset and `propertyType` fields are immutable.** They define the shape of the data every task carries; plan them before the first task exists. See [Immutability & versioning](./immutability-and-versioning.md).
- **Two terminal states** (`po_rejected`, `po_closed`) have no `next[]` — a task there stays put.
- **Survey-gated rejection:** both transitions into `po_rejected` use `canChange: survey` with a `requiredSurvey`, so a reason is always captured.
- **`initialState` names a property code**, not an ID — `cotctl` resolves it after creating the states.
- **The bot slots** (`requiredSurvey.bots`, transition `bots`) follow the [merge rules](./merge-semantics.md): omit to preserve, `[]` to delete, a list to replace. IDs inside `stage.data` are passed through untouched.

## Two-step and multi-machine patterns

For anything larger, two patterns help:

- **Create the workflow first, add state machines later.** Apply a minimal `kind` + `nameCode` + `nameDisplay` document, then apply the state machines in [SM-only mode](../workflows.md#sm-only-mode) (omit `nameDisplay`). This verifies the workflow exists before the more complex structure lands.
- **Multiple state machines in one document** are supported — each with its own `code`, `propertyType`, and `asset`. With more than one, you set the initial state machine through the Cotalker UI or API (there's no YAML field for it); with a single machine `cotctl` patches it automatically.

## Apply it

```bash
cotctl workflows scaffold                                   # generate a skeleton
cotctl workflows apply -f purchase_orders.yaml -c demo --dry-run
cotctl workflows apply -f purchase_orders.yaml -c demo
```

## See also

- [Workflows](../workflows.md) · [Merge semantics](./merge-semantics.md) · [Immutability & versioning](./immutability-and-versioning.md) · [COTLang](./cotlang.md)
