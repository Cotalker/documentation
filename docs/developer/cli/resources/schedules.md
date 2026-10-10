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
| `cronTimeZone` | No | IANA timezone. Defaults to `America/Santiago` on create. A schedule stored without one fires in the scheduler's own zone, and `apply` warns when an update sets a zone on such a cron |
| `endDate` | No | ISO 8601 or `null`. **Only valid with `cron`** — set `null` to clear an existing end date |
| `isActive` | No | Defaults to `true` on create. On an update, only a written `isActive` changes the status — see [Activation and status](#activation-and-status) |
| `priority` | No | `1`–`6` (1 = real-time, 6 = idle). Defaults to `4` |
| `timeoutMinutes` | No | `1`–`240`. Defaults to `60` |
| `body` | Yes | The automation graph — same shape as bots in [workflows](./workflows.md) |
| `owner`, `execPath` | No | Leave at their defaults; `cotctl` warns if you change them |
| `tags`, `hooks`, `exponentialBackoff`, `runVersion` | No | Metadata, webhooks, retry policy, engine version |

On an update, a key you omit keeps its stored value, and the declared `body` is completed from the stored one: each stage is paired with the stored stage of the same `key`, and a stage that omits `version` keeps the stored one. **`version: null` now unpins a stage** (before 0.14.0 a schedule kept the stored version either way), so remove a `version: null` that should keep it. The scheduler updates `body.stages` by position, not by key: a new stage, or one you move, keeps the keys it omits from the stored stage it lands on, and `apply` warns which. `owner` and `runVersion` are set on create only — an update never changes them, and `apply` warns when your YAML's value differs. To change one stage without restating the `body`, use a `partial: true` document (0.14.0+), which may leave out `time` and `body` — see [Partial documents](../commands/apply.md#partial-documents-partial-true).

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

`apply` takes `-f/--file` (required), `--dry-run`, `-y/--yes`, `-q/--quiet`, `--allow-script-bots` (for a `PBScript`, `CCJS` or `ESMCode` stage) and — new in 0.14.0 — `--json`, which prints one JSON object per result with `statusCall` when the apply relaunches or stops a cron. It checks each stage's bot `version` against the live catalog and refuses a bad one with exit `2`, `--dry-run` included, before anything is written (since 0.14.0; it used to fail only when the schedule ran). `list` defaults to active, admin-owned schedules; `--limit` defaults to 100. `logs` shows recent executions and takes `--op` to filter by operation (`executed`, `failed`, `started`, …).

### Reading a failed run

**Add `-v, --verbose`, new in 0.12.0.** Without it a failed stage prints its date and `executed` and nothing else, while the backend's error text sits unread in the response. `-v` prints the full stage output alongside the error:

```bash
cotctl schedules logs sched_daily_digest -c acme -v
```

The error line now also appears without `-v` whenever there is one; `-v` is what gets you the whole `output` payload.

<div className="alert alert--warning">

**`--op failed` cannot find a stage that failed inside the bot.** The scheduler marks the *run* as failed only when the run itself fails. A schedule whose PBScript throws every night still records its runs as `executed`, so a health check built on `--op failed` reports green through a schedule that has not worked in weeks.

Until that changes, read the runs rather than filtering them: `cotctl schedules logs <code> -c <profile> -v` and look for the error text, or consume `--json` and filter on the error field yourself. The gap is in the backend, not in `cotctl`.

</div>

<div className="alert alert--info">

**Two more `list` behaviours that do not follow from the flag names.** `--has-cron` tests for the *presence* of a `cron` field, not its value. And `-l, --limit` bounds what the backend returns, so the active filter runs **afterwards**, on your machine — which means a listing can legitimately come back shorter than the limit you asked for.

</div>

## Activation and status

<div className="alert alert--primary">

**`isActive` in the YAML isn't sent in the apply body — it's carried out with a second call.** A schedule's live state can only be flipped through the dedicated `activate` / `deactivate` endpoints, not through create/update. So `cotctl` applies your schedule, then, if the YAML asks for a different state than what's live, it makes a follow-up `activate` or `deactivate` call.

</div>

Since **0.14.0** an update never changes the status by itself — read this before you re-apply a running schedule:

- **Only a written `isActive` moves the status.** `isActive: true` activates a canceled schedule, `isActive: false` deactivates any other, and an omitted `isActive` does neither. The live state is read from the status alone: anything but `canceled` counts as active — `done`, `error` and `incomplete` included. (Before 0.14.0 every update left the schedule `pending`, which reactivated a canceled one, and a YAML without `isActive` counted as active.)
- **An update stops a running cron.** The scheduler stops the cron of a schedule in `running`, `tick` or `idle` when it updates it, and the status doesn't show it. With **`isActive: true`** in the YAML, `apply` relaunches the cron right after the update — the call `cotctl schedules activate` makes — and shows it as `+ activate` after the code in the dry run, the prompt and the result line (`"statusCall": "activate"` under `--json`). The cron starts again with the new configuration once its `time` has passed, staying `pending` until then. With `isActive` **omitted**, the cron stays stopped: `apply` warns on stderr and exits `0`, and you relaunch it with `cotctl schedules activate <code>`.
- **A schedule that runs once is never relaunched** — with its `time` in the past it would run again right away — and neither is a running one whose YAML empties its cron (`cron: ''`), which turns it into a one-shot. `apply` warns in both cases; `cotctl schedules activate <code>` runs it.
- **If the relaunch fails**, the update is already stored, so a re-apply would send nothing: `schedules apply` and `apply --dir` exit `3`, and `cotctl schedules activate <code>` is the fix.
- **Re-applying a YAML that changes nothing sends nothing**, so it leaves the cron as it is.

<div className="alert alert--warning">

**Write `isActive: true` in the YAML of every schedule whose cron must keep running** — `cotctl schedules export` writes it for you. And re-export before re-applying an export made with 0.13.0 or earlier: those wrote `cronTimeZone: America/Santiago` for a schedule stored without a zone, so re-applying one moves its cron from the scheduler's zone to Santiago — three or four hours away — and relaunches it there.

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
