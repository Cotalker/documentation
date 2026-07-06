---
title: SLAs (YAML)
sidebar_label: SLAs
displayed_sidebar: developer
---

<!-- source: repositories/cotctl/src/commands/slas.ts, src/schemas/sla.schema.ts, src/resources/sla.resource.ts, docs/slas/ @ 4f7248a (2026-07-06) -->

An **SLA** (Service Level Agreement) is a timed escalation rule attached to one state machine inside a [workflow](./workflows.md). It defines a window that **opens** when a task enters certain states, **closes** when the task reaches certain other states, and — if the window **expires** before closing — **fires an automation** (`pb`) to escalate. "Notify the manager if a purchase order sits in review for more than 24 hours" is a textbook SLA.

## The shape of an SLA

```yaml
kind: Sla
code: sla_review_window            # upsert key within its state machine
display: "Review window SLA"
stateMachine: sm_po_main           # the SM code (or a 24-char ObjectId)
reset: true                        # restart the timer on state transitions
repeat: false                      # re-arm after firing

start:                             # the window opens here
  types: [new]                     # any of: new, in-progress, closed
  states: []                       # optional: specific state codes
end:                               # ...and closes here
  types: [closed]
  states: []

data:                              # the time window
  timeType: static                 # static | dynamic
  time: "HOURS|24"                 # <UNIT>|<value>
  baseDate: default                # default | startDate | endDate | resolutionDate

pb:                                # runs when the window expires
  start: send_alert
  stages:
    - key: send_alert
      name: PBSendMessage
      data:
        channelId: "6a000000000000000000abcd"
        text: "Review deadline reached"
      next:
        SUCCESS: ""
        ERROR: ""
```

| Field | Required | Notes |
|---|---|---|
| `kind` | Yes | Always `Sla` |
| `code` | Yes | Upsert key, scoped to its state machine. Lowercase/underscores. **Immutable** |
| `display` | Yes | Human-readable label |
| `stateMachine` | Yes | The owning SM's `code` or ObjectId |
| `reset` | No | Defaults to `true` — restart the timer on transitions |
| `repeat` | No | Defaults to `false` — re-arm after firing |
| `start` | Yes | The opening condition (needs at least one `types` or `states` entry) |
| `end` | Yes | The closing condition (same shape as `start`) |
| `data` | Yes | The time window (see below) |
| `pb` | Yes | The automation that fires on expiry — same shape as bots in [workflows](./workflows.md) |
| `description` | No | Accepted, but **not updatable** — see the immutability note |

## The time window: `data`

`data` defines how long the window lasts. `time` follows a `<UNIT>|<value>` envelope, where the unit is one of `HOURS`, `DAYS`, `WEEKS`, `MONTHS`, `YEARS`, `MINUTES`, `SECONDS`, `MS`, or `DATE`:

```yaml
data:
  timeType: static     # a fixed duration
  time: "HOURS|24"     # 24 hours from baseDate
  baseDate: default    # what the clock is measured from
```

`baseDate` anchors the clock — `default`, `startDate`, `endDate`, or `resolutionDate`. `timeType: dynamic` uses the same `<UNIT>|<value>` envelope but lets the value reference runtime data rather than a fixed number.

<div className="alert alert--info">

**`start.states` / `end.states` are state codes on the way in, Property IDs on the way out.** You write state codes (or ObjectIds); `cotctl` resolves them, and the backend stores them as the linked Property `_id`s. That's why an exported SLA's `states` may look different from what you wrote — the export reverse-maps them back to codes for you.

</div>

## Immutability — the thing to understand before you apply

<div className="alert alert--primary">

**An SLA is almost frozen after creation.** On update, the backend accepts changes to exactly seven fields: `display`, `reset`, `repeat`, `start`, `end`, `data`, and `pb`. Everything else is fixed at creation and cannot be changed by re-applying — not `code`, not `stateMachine`, not `description`, not `isActive`.

</div>

What that means in practice:

- **`code`, `stateMachine`** — the identity and its home. `cotctl` omits them from the update entirely, so an apply can never try to move or rename an SLA. To change either, you're creating a different SLA.
- **`description`** — accepted on *create*, but ignored on *update*. If you edit the `description` of an existing SLA and re-apply, `cotctl` warns that the change is dropped and applies the rest. (The warning exists so a later re-export doesn't look like drift.) Keep the YAML `description` accurate for documentation, but know the stored copy is frozen at creation.
- **`isActive` — there is no way to deactivate an SLA.** Not through `cotctl`, not through the API, not through the admin webclient. `cotctl slas deactivate` was deliberately removed, because sending `isActive: false` would be a silent no-op — an apply that reports success while nothing changes.

<div className="alert alert--warning">

**To stop an SLA from firing, make its window never open.** Since `start` is one of the seven mutable fields, edit it to point at a state the task can never reach — that's a legal update and effectively disables the SLA. Truly deleting one, or changing `code` / `stateMachine` / `description`, requires deleting and recreating the record at the database level (a backend-dev task). Don't reach for an `isActive` workaround through the API — it cannot succeed.

</div>

## Working with SLAs

```bash
# Read
cotctl slas list                                   # across all workflows
cotctl slas list --state-machine sm_po_main        # one SM
cotctl slas list --all                             # include inactive
cotctl slas get sla_review_window --state-machine sm_po_main
cotctl slas export sla_review_window --state-machine sm_po_main -o sla.yaml

# Write
cotctl slas apply -f sla.yaml --dry-run
cotctl slas apply -f sla.yaml -y
```

`get` and `export` **require** `--state-machine <smCode>` (an SLA code is only unique within its SM). `apply` reads the SM from each document's `stateMachine` field and takes `-f/--file` (required), `--dry-run`, and `-y/--yes`; it handles multi-document files. When the same SM code exists in more than one workflow, add `--task-group <workflow>` to disambiguate — `cotctl` will tell you when it's needed.

There's no `cron` in an SLA — it's driven by state transitions and its time window, not a schedule. If you want a cron cadence, that's a [schedule](./schedules.md).

## Invoking a routine

Like other automations, an SLA's `pb` can invoke a standalone [routine](./routines.md) via a `PBScript` stage — `cotctl` validates the routine code exists before applying, and validates each stage's bot type and version against the live catalog.

## Apply order

In a directory apply, SLAs come after workflows and routines (so the SM they attach to, and any routine they invoke, already exist) and before schedules. `cotctl apply --dir` enforces the order.

## See also

- [Workflows](./workflows.md) — SLAs attach to a workflow's state machines; also the full ParametrizedBot reference
- [Routines](./routines.md) — the PBScripts an SLA's `PBScript` stage invokes
- [Bot types](./bot-types.md) — the stage catalog and version checks
- [Schedules](./schedules.md) — for cron-driven automation (SLAs are event/time-window driven)
