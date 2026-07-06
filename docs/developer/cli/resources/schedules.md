---
title: Schedules (YAML)
sidebar_label: Schedules
displayed_sidebar: developer
---

<!-- source: repositories/cotctl/src/commands/schedules.ts, src/schemas/schedule.schema.ts, src/resources/schedule.resource.ts, src/lib/validate-cron.ts, docs/schedules/ @ 4f7248a (2026-07-06) -->

A **schedule** runs an automation at a time you choose — once, or on a recurring cron. It pairs a *when* (a one-shot `time`, or a `cron` expression with a timezone) with a *what* (`body`, an embedded automation graph). The `body` is the same ParametrizedBot shape used everywhere else, so a schedule can post a message, run a report, or invoke a standalone [routine](./routines.md) on a cadence.

`cotctl schedules` manages the schedules operators own (`owner: AdminSchedules`). Schedules created by SLAs, hooks, or internal bots show up in listings but are backend-managed — don't apply those through `cotctl`.

## The shape of a schedule

```yaml
kind: Schedule
code: sched_daily_digest           # upsert key — lowercase, immutable

time: "2026-06-15T10:00:00Z"       # first fire / one-shot trigger (ISO 8601)
cron: "0 9 * * *"                  # UNIX 5-field cron — omit for a one-shot
cronTimeZone: America/Santiago     # IANA zone; defaults to America/Santiago

isActive: true
priority: 4                        # 1 (real-time) .. 6 (idle); default 4
timeoutMinutes: 60                 # 1..240

body:
  start: enqueue
  stages:
    - key: enqueue
      name: PBSendMessage
      data:
        channelId: "6a000000000000000000abcd"
        text: "Daily digest is ready"
      next:
        SUCCESS: ""
        ERROR: ""
```

| Field | Required | Notes |
|---|---|---|
| `kind` | Yes | Always `Schedule` |
| `code` | Yes | Upsert key. Lowercase/underscores/digits. **Immutable** |
| `time` | Yes | ISO 8601. The one-shot fire time, or the first occurrence of a recurring schedule |
| `cron` | No | UNIX 5-field cron. Omit for a one-shot schedule |
| `cronTimeZone` | No | IANA timezone. Defaults to `America/Santiago` |
| `endDate` | No | ISO 8601 or `null`. **Only valid with `cron`** — set `null` to clear an existing end date |
| `isActive` | No | Defaults to `true`. See the activation note below |
| `priority` | No | `1`–`6` (1 = real-time, 6 = idle). Defaults to `4` |
| `timeoutMinutes` | No | `1`–`240`. Defaults to `60` |
| `body` | Yes | The automation graph — same shape as bots in [workflows](./workflows.md) |
| `owner`, `execPath` | No | Leave at their defaults; `cotctl` warns if you change them |
| `tags`, `hooks`, `exponentialBackoff`, `runVersion` | No | Metadata, webhooks, retry policy, engine version |

## Cron and timezone

Cotalker uses **UNIX 5-field cron** — `minute hour day-of-month month day-of-week`. `cotctl` validates the expression before applying:

```yaml
cron: "0 9 * * *"        # every day at 09:00
cronTimeZone: America/Santiago
```

<div className="alert alert--warning">

**The webclient pre-fills Quartz-style cron — don't paste it verbatim.** Quartz expressions have 6 or 7 fields (they add seconds, and sometimes a year). `cotctl` rejects anything with 6 or 7 fields with a message telling you to drop the extra fields. A 5-field expression is then parsed for real, and an invalid one (bad ranges, unparseable) is rejected with the parser's error. The timezone is passed straight through — any IANA zone works — and an invalid zone surfaces as part of the same cron error.

</div>

An `endDate` only makes sense for a recurring schedule, so setting it without `cron` is an error. A blank/absent `cron` means "one-shot", driven purely by `time`. Cron validation is best-effort — the backend's scheduler has the final word — but it catches the common mistakes before you write.

## Working with schedules

```bash
# Read
cotctl schedules list                        # active, admin-owned (default)
cotctl schedules list --all                  # include canceled
cotctl schedules list --has-cron             # only recurring
cotctl schedules list --type all             # include SLA/internal-owned (read-only)
cotctl schedules get sched_daily_digest
cotctl schedules export sched_daily_digest -o sched.yaml

# Write
cotctl schedules apply -f sched.yaml --dry-run
cotctl schedules apply -f sched.yaml -y

# State + logs
cotctl schedules activate sched_daily_digest
cotctl schedules deactivate sched_daily_digest
cotctl schedules logs sched_daily_digest --limit 50
```

`apply` takes `-f/--file` (required), `--dry-run`, `-y/--yes`, and `-q/--quiet`. `list` defaults to active, admin-owned schedules; `--limit` defaults to 100. `logs` shows recent executions and takes `--op` to filter by operation (`executed`, `failed`, `started`, …).

## Activation is a separate operation

<div className="alert alert--primary">

**`isActive` in the YAML isn't sent in the apply body — it's converged with a second call.** A schedule's live state can only be flipped through the dedicated `activate` / `deactivate` endpoints, not through create/update. So `cotctl` applies your schedule, then, if the YAML asks for a different state than what's live, it makes a follow-up `activate` or `deactivate` call. On a normal apply this is seamless.

</div>

<div className="alert alert--warning">

**Creating a new schedule as `isActive: false` can leave it active — retry to fix.** The backend's create call returns an empty response (no `_id`), so to deactivate a just-created schedule `cotctl` has to read the new record back by code and call `deactivate` on it. On a lagging read replica that read-back can fail, in which case `cotctl` **warns and leaves the schedule active** rather than erroring. The create always succeeds; only the auto-deactivation is skipped. If you see that warning, just re-run `apply` (the update path will find it and deactivate) or run `cotctl schedules deactivate <code>`. This only affects the create-then-deactivate case — updates already have the record in hand.

</div>

## Invoking a routine

Like other automations, a schedule's `body` can invoke a standalone [routine](./routines.md) via a `PBScript` stage:

```yaml
body:
  start: run_report
  stages:
    - key: run_report
      name: PBScript
      data:
        code: rutina_reporte_diario   # must be a real routine code
      next:
        SUCCESS: ""
        ERROR: ""
```

`cotctl` validates the routine code exists before applying — which is why routines are applied before schedules in a directory apply.

## Apply order

In a directory apply, schedules come **last among the automation resources** — after routines and SLAs — so any routine a schedule references already exists in the catalog when its dry-run validation runs. `cotctl apply --dir` enforces the order.

## See also

- [Routines](./routines.md) — the PBScripts a schedule's `PBScript` stage invokes
- [Bot types](./bot-types.md) — the catalog of stage types, and checking versions before pinning
- [Workflows](./workflows.md) — the full ParametrizedBot reference
- [apply](../commands/apply.md) — schedules are applied last among automations
