---
title: logs
sidebar_label: logs
displayed_sidebar: developer
---

<!-- source: repositories/cotctl/src/commands/logs.ts, docs/commands/logs.md @ a9168d68 (2026-10-23) -->

`cotctl logs` reads **what a Routine did when it ran**: the context the run received, the configuration it ran with, what each stage returned, and its error. The scheduler keeps one log per run for **7 days**; `cotctl logs` lists those runs with the same filters the webclient offers and downloads their logs as JSON files, so you — or an AI assistant — can read them without copying anything out of the webclient.

| Command | What it does |
|---|---|
| `cotctl logs list` | Lists the runs that match the [filters](#filters), newest first, a page at a time |
| `cotctl logs get <logId...>` | Downloads logs by id, one JSON file per log |
| `cotctl logs pull` | Downloads the log of every run the [filters](#filters) match — `list` and `get` in one step |

<div className="alert alert--warning">

**It needs backend `release-5.13.0` or later.** An environment whose backend has no log reader yet answers every `logs` command with exit `4` and a message that names that release. Reading logs also needs the `admin-schedules-read` permission; without it the command fails with `403` and names the permission.

</div>

<div className="alert alert--info">

**This is not the audit log.** `cotctl logs` answers *what a run did*. *Who changed a Routine's configuration, and when* is a different record, and the command name `audit-logs` is reserved for it.

</div>

Every subcommand takes `-c, --company <profile>`, or an environment credential (see [Authentication](../authentication.md)). `cotctl schedules logs <code>` still lists one Schedule's recent runs, with each run's output and error already parsed; `logs list --schedule <code>` is the one that combines with every other filter.

## `logs list` — find the runs

```bash
# The last day of one Bot's runs
cotctl logs list -c acme --bot "Daily mailer" --since 24h

# Failed runs of a Schedule, as JSON for a script
cotctl logs list -c acme --schedule daily_report --op failed --json

# Runs fired by the transitions out of a State of a Workflow, on one local day
cotctl logs list -c acme --workflow maintenance --state in_progress --from 2026-09-20 --to 2026-09-20
```

It prints a table — log id, owner, op, start time (UTC) and duration — and downloads nothing: pass the ids it prints to `logs get`. Where the page sits (`Page 1 of 12: logs 1-20 of 234. Next: --page 2.`) and every notice go to stderr, so stdout pipes cleanly. `--limit` takes 1 to 100 logs per page (default `20`) and `--page` picks the page.

With `--json` it prints the page as one object: `page`, `limit`, `count` (every matching run, not only this page's), `filters` (what was sent, with codes already turned into ids and dates in ISO UTC) and `data`, the runs.

```bash
# Download every log of a page
cotctl logs list -c acme --routine rt_close --since 7d --json \
  | jq -r '.data[]._id' | xargs -r cotctl logs get -c acme --output-dir ./logs
```

Pages are counted by position, so runs that start while you page push the others down. To page a fixed set, pin both ends with `--from` and `--to` (`--since` moves with the clock).

## `logs get` — download by id

```bash
# One log, every part, into the current directory
cotctl logs get 6a1f0c2e9b1d4a0012345678 -c acme

# Two logs into ./logs, only their results and one stage, with the manifest
cotctl logs get 6a1f0c2e9b1d4a0012345678 6a1f0c2e9b1d4a0012345679 -c acme \
  --output-dir ./logs --parts results --parts stage:send_mail --json

# Straight into jq, without touching the disk
cotctl logs get 6a1f0c2e9b1d4a0012345678 -c acme --stdout --parts error | jq '.error'
```

A log id is 24 hexadecimal characters; a malformed one is refused before any request. Repeated ids are downloaded once, with a warning.

| Option | Description | Default |
|---|---|---|
| `--parts <part>` | Download only these [parts](#parts). Repeat the flag, or separate simple parts with commas (`--parts context,results`); a `stage:<key>` goes alone in its own `--parts` | every part but the stages |
| `--output-dir <dir>` | Directory for the files, created when missing | the current directory |
| `--compact` | One-line JSON instead of pretty-printed | pretty |
| `--stdout` | Print the logs instead of writing files: one log as JSON, several as NDJSON (one object per line). Not with `--json` or `--output-dir` | off |
| `--json` | Print the [manifest](#the-manifest) instead of the human summary | off |
| `-q, --quiet` | Leave the human summary out of stdout. Data you asked for still prints, and stderr is never silenced | off |
| `--max <n>` | Refuse a run that asks for more than `<n>` distinct logs — an error that gives the total, never a silent cut | `500` |
| `--concurrency <1-4>` | Batch requests in flight at once | `3` |

A script should always pass `--output-dir`: the current directory of a scheduled job is wherever its scheduler starts it (`$HOME` under cron, `/` for a systemd service).

## `logs pull` — download everything a filter matches

```bash
# Every run of a Bot in the last hour, into ./logs
cotctl logs pull -c acme --bot "Daily mailer" --since 1h --output-dir ./logs

# A scheduled job: a Schedule's failed runs of the last 24 hours, only their errors
cotctl logs pull -c acme --schedule daily_report --op failed --since 24h \
  --parts error --output-dir /var/log/cotctl --yes --json
```

`pull` takes the [filters](#filters) exactly as `list` does, and `--parts`, `--output-dir`, `--compact`, `--json`, `-q`, `--max` and `--concurrency` exactly as `get` does. The files and the manifest are the same.

Before reading any log it counts the matching runs over a window frozen at that instant, so runs that start while it reads do not move its pages. Then:

- **More than `--max` runs** (default `500`) — refused with exit `2` and the total, even with `--yes`.
- **No run** — exit `0` with an empty manifest.
- **More than one page (over 100 runs)** — it asks first, on stderr, with an estimate of the time it takes: `? 250 logs match these filters, 3 pages of 100; estimated time ~4 s. Download them? (Y/n)`. Enter downloads; `n` prints `Cancelled.` and exits `0` with nothing written. `-y, --yes` skips the question. With no terminal to ask on — a scheduled job, a pipeline — and no `--yes`, the run **stops with exit `2` instead of waiting**, before reading any log.

## Filters

`list` and `pull` take the webclient's filters as flags. Every one but `--op`, `--since` and the dates can be repeated; repeating a flag widens it (`--owner BOT --owner TEST` lists either owner), and different flags narrow each other.

| Flag | Takes |
|---|---|
| `--workflow <code>` | A Workflow, by its code. Alone, every run of the Workflow; it is also where `--state` and `--sla` are looked up |
| `--state <code>` | A State of the `--workflow`, by the code of its Property. Implies `--owner SM_STATE_NEXT`, so it finds the runs fired by the transitions **out of** that State |
| `--sla <code>` | An SLA of the `--workflow`, by its code. Implies `--owner SM_SLA`. An inactive SLA is not found by code: pass its id with `--tag-value` |
| `--bot <name>` | A Bot, by its name (a Bot has no code). Implies `--owner BOT` |
| `--schedule <code>` | A Schedule, by its code — a code with `#`, like those of SLA and State Schedules, works |
| `--routine <code>` | Runs that ran this Routine, by its code, sent without a lookup (see [Filtering by Routine](#filtering-by-routine)) |
| `--tag-value <value>` | Any tag value, sent as given — the only way to filter by a Survey trigger, which has no code |
| `--owner <owner>` | An owner, sent as given: `BOT`, `SM_REQUIRED_SURVEY`, `SM_STATE_SURVEY_TRIGGER`, `SM_STATE_NEXT`, `SM_SLA`, `TEST`, `WEBHOOK`, `AdminSchedules`, `CoreWrapper`, or any other. Replaces the one `--bot`, `--state` or `--sla` imply. `SM_STATE_NEXT` / `SMStateNext`, `SM_STATE_SUBTASK` / `SMStateSubtask` and `SM_HOOKS_ON_CREATE` / `SMHooksOnCreate` each match both spellings |
| `--op <op>` | `executed`, `created`, `modified`, `failed`, `canceled` or `started` |
| `--from <date>` / `--to <date>` | Runs that started at or after / at or before this instant: ISO 8601 (`2026-09-20T14:30`, local; or with `Z` or an offset), or a date alone, which is a **local** day — `--to` covers it whole |
| `--since <window>` | Runs that started within this window up to now: `30m`, `24h`, `7d`. Not with `--from` |

- **`--state` and `--sla` need `--workflow`.** A code that matches nothing is named in the error, and the run exits `2`.
- **`--bot`, `--workflow` (with or without `--state`/`--sla`) and `--tag-value` are refused together** (exit `2`): the API keeps a run that matches *any* of them, so together they would widen the list instead of narrowing it. `--state` and `--sla` are refused together for the same reason. `--schedule`, `--routine`, `--owner`, `--op` and the dates combine with any of them.
- **A wider window than 7 days finds nothing more** — the scheduler keeps no older log.

<div className="alert alert--warning">

**Known limitation: `--owner` on its own can time out.** An `--owner` with no `--bot`, `--workflow` or `--tag-value` beside it can answer `504` in a company with a very large number of Schedules of that owner. A shorter window does not help, and neither does `--schedule`; one of those three filters does. The owners `--bot`, `--state` and `--sla` imply never hit it, since they always come with their tag.

</div>

### Filtering by Routine

`--routine` cannot see every run, and every run that uses it prints a note on stderr saying so:

- **An interrupted run** — a timeout, a worker crash — does not report its Routines.
- **A Routine called by another Routine** is not recorded in the run.
- **A run of [`cotctl routines test`](../resources/routines.md)** carries no Routine code; list those with `--owner TEST`.

The code is sent without resolving it, because a deleted Routine keeps its logs for 7 days: when no Routine has that code today, a warning says so and the run goes on. A backend that cannot filter by Routine exits `4`.

## What you get

### Parts

Without `--parts` a log comes whole — every part but the stages, which is what the webclient shows.

| Part | What it holds |
|---|---|
| `log` | The run itself: its id, Schedule, owner, op, start time, duration, and the Routines it ran when the scheduler recorded them |
| `context` | The data the Routine received |
| `routine` | The Routine's configuration at run time, keyed by stage |
| `results` | What every stage returned, iterations included |
| `error` | The run's error, parsed when it is JSON |
| `stage:<key>` | One stage: its configuration and every result with that key |

A part the log does not have — an `error` in a successful run, a stage that never ran — comes empty and is listed in the file's `emptyParts`; it is not an error.

### Files

Each log is written to its own file, named after the Schedule, the run's start in UTC and the log id, so an `ls` sorts by Schedule and then by date:

```text
daily_report_20260928T140305Z_6a1f0c2e9b1d4a0012345678.json
daily_report_20260928T140305Z_6a1f0c2e9b1d4a0012345678.context+results.json   # with --parts
```

Characters outside `[A-Za-z0-9._-]` in the Schedule code — the `#` of SLA and State Schedules among them — become `-`. Downloading a log again replaces its file with the same content: a log never changes. The write is atomic, so an interrupted run never leaves a truncated file. **On Linux and macOS every file is owner-only (`0600`)**, a replaced copy included: a log carries what its run received and returned.

### Large logs

A log of **2 MiB or more** is kept by the scheduler in S3, and arrives like any other — the file only says `"source": "s3"`. Its download URL is signed for a limited time when the run is logged; once it has expired, the log is reported as `expired` with the instant the URL stopped working, and **no file is written for it**. An expired log cannot be downloaded again.

### The manifest

With `--json`, `get` and `pull` print a manifest of what happened to every log:

```json
{
  "requested": 4,
  "written": [
    { "_id": "6a1f0c2e9b1d4a0012345678", "path": "/abs/logs/daily_report_20260928T140305Z_6a1f0c2e9b1d4a0012345678.json", "bytes": 15234, "offloaded": false, "source": "db" }
  ],
  "missing": ["6a1f0c2e9b1d4a0012345679"],
  "expired": [{ "_id": "6a1f0c2e9b1d4a001234567a", "expiresAt": "2026-09-03T00:00:00.000Z", "signedForSeconds": 172800 }],
  "failed": [{ "_id": "6a1f0c2e9b1d4a001234567b", "reason": "unreachable", "detail": "S3 answered HTTP 500 InternalError" }],
  "emptyParts": {}
}
```

Every requested log lands in exactly one of `written`, `missing` (it does not exist in this company, or it is older than 7 days), `expired` or `failed`. A `failed` log is worth retrying only when the failure was transient — a `timeout`, a network error, or an S3 `5xx`.

## Exit codes

| Code | Meaning |
|---|---|
| `0` | Done: every log delivered, the page listed (an empty one included), nothing matched, or the `pull` confirmation was declined |
| `1` | General failure: an API error (`403`, `504`, `5xx`), the network, the profile, the file system, or Ctrl-C at the confirmation |
| `2` | Invalid input, before anything is read: a flag value or combination, a log id, a code or name that matches nothing, more logs than `--max`, or a multi-page `pull` with no terminal to confirm on and no `--yes` |
| `3` | `get` / `pull`: some log was not delivered — missing, expired or failed. The manifest (or, under `--stdout`, stderr) says which |
| `4` | The environment's backend has no log reader yet, or its reader cannot filter by `--routine`. Nothing to retry until the backend is on `release-5.13.0` or later |

A `504` means the reader took too long: narrow the window or add a `--schedule`, `--workflow` or `--bot` filter — except for the [`--owner` limitation](#filters) above. For `get`, ask for fewer ids at a time or lower `--concurrency`.

## With an AI assistant

The embedded **`cotctl-logs`** [Skill](../skills.md) teaches an assistant these commands — which filter finds which runs, which parts to download, and how to read the files:

```bash
cotctl skills install cotctl-logs
```

## See also

- [Routines](../resources/routines.md) — what a log records the run of
- [Schedules](../resources/schedules.md) — `schedules logs`, one Schedule's recent runs
- [Authentication](../authentication.md) — profiles and environment credentials
