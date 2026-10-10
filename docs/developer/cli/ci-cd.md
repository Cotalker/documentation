---
title: CI/CD pipelines
sidebar_label: CI/CD
displayed_sidebar: developer
---

<!-- source: repositories/cotctl/src/commands/{apply,surveys,properties,workflows}.ts @ 82e613d (2026-10-10) -->

Everything `cotctl` does on your laptop, it can do unattended in a pipeline. Running it in CI/CD is what turns "a partner deploys changes by hand" into "changes are validated and deployed automatically on every merge" — repeatable, reviewable, and not dependent on anyone remembering the steps. This page shows the recommended shape and, importantly, how to handle credentials safely.

## The recommended pipeline shape

A good `cotctl` pipeline mirrors the manual workflow: **validate on every change, apply on merge.**

1. **On a pull request** — run `cotctl validate --dir` (offline, no credentials needed). This catches schema and cross-reference errors before review.
2. **On merge to your main branch** — run `cotctl apply --dir -c <profile>` against the target environment, optionally preceded by a `--dry-run`.

Because every apply is idempotent, re-running the deploy is always safe.

## Handling credentials safely

This is the part to get right. In a pipeline there's no browser to log in with, so you authenticate non-interactively — but **you never put a token in your repository**.

<div className="alert alert--primary">

**The rule: secrets live in your CI provider, never in code.** Store the credentials as encrypted CI secrets (GitHub Actions secrets, GitLab CI variables, etc.) and read them from environment variables at runtime. Never commit a token, and never paste one into a YAML or script that's checked in.

</div>

Both `cotctl login` (browser) and `cotctl login --no-browser` (email/password) are **interactive** — they open a browser or prompt for credentials — so they aren't suitable for an unattended job on their own. You authenticate with a **pre-generated API token** instead, and since **0.12.0** there are two ways to hand it over.

### The recommended way: an environment credential

Export the token and the environment's API URL, and `cotctl` runs with no profile at all:

```bash
export COTCTL_TOKEN="$CI_COTCTL_TOKEN"
export COTCTL_API_URL="https://www.cotalker.com"

cotctl apply --dir config/ --yes
```

There is no `login` step and no `-c` flag. **Nothing is written to disk** — the configuration is built in memory for that run — and the company comes from the token itself, so it cannot disagree with the credential.

Add `COTCTL_COMPANY_ID` to assert which company the job expects. A token belonging to another one stops the run before anything happens, naming both ids. On a job that can write, this is worth the one line:

```bash
export COTCTL_COMPANY_ID="64a1b2c3d4e5f6a7b8c9d0e1"
```

An expired or rejected token stops the run and names the variable. `cotctl` never re-authenticates from the environment and never writes your token into a profile, so a pipeline fails loudly instead of quietly continuing as somebody else.

### The other way: write a profile with `--token`

Use this when a single job addresses **several companies**, which an environment credential cannot do — it carries one token, so it carries one company. `cotctl login --token` registers a pre-generated token as a named profile with no terminal attached:

```bash
echo "$CI_COTCTL_TOKEN" | cotctl login \
  --url https://web.cotalker.com \
  --subdomain acme \
  --profile acme \
  --token - \
  --yes \
  --allow-unverified-company
```

Three details that decide whether this works in a real job:

- **Pipe the token in; do not pass it as a value.** `--token -` reads standard input, and `--token @<path>` reads a file. A bare `--token <jwt>` puts the secret in the process arguments, where any process on the same host can read it — and a CI provider masks its own log, not the process table.
- **`--yes` is required.** Without a terminal, the profile-overwrite guard fails instead of waiting for an answer that cannot arrive.
- **`--allow-unverified-company` is usually required too.** If the token's user cannot read the company record, the company check cannot conclude, and `--yes` deliberately does not answer that one.

<div className="alert alert--warning">

**Do not name that CI secret `COTCTL_TOKEN`.** The name is reserved as an environment credential, so exporting it changes the behaviour of every later command that omits `-c` — including the ones you meant to run against a different profile.

</div>

## A worked example (GitHub Actions)

This workflow validates on pull requests and deploys on pushes to `main`. The credentials come entirely from repository secrets:

```yaml
name: Deploy Cotalker config

on:
  pull_request:
  push:
    branches: [main]

env:
  COTCTL_NO_UPDATE_CHECK: '1'   # both jobs: no version lookup, no notice

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '22'
      - run: npm install -g @cotctl/cli@0.14.0
      # Offline — no credentials required
      - run: cotctl validate --dir config/

  deploy:
    if: github.ref == 'refs/heads/main'
    needs: validate
    runs-on: ubuntu-latest
    env:
      COTCTL_TOKEN: ${{ secrets.COTCTL_API_TOKEN }}
      COTCTL_API_URL: https://www.cotalker.com
      COTCTL_COMPANY_ID: ${{ vars.COTCTL_COMPANY_ID }}
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '22'
      - run: npm install -g @cotctl/cli@0.14.0
      - run: cotctl apply --dir config/ -y
```

Two things to notice. There is **no login step** — the environment credential is the whole of the authentication, and `-c` is absent because the company comes from the token. And `cotctl apply ... -y` skips the interactive confirmation prompts, which is exactly what you want in an unattended job.

`COTCTL_COMPANY_ID` is a plain variable rather than a secret: a company id is not sensitive, and keeping it visible is the point — it is the line a reviewer reads to see which environment this job deploys to.

Both jobs install a **pinned** version, so the version that runs is the one the workflow names — without a terminal `cotctl` never installs an update on its own; the pin is what keeps `npm install` from picking up a newer release. The workflow-level `COTCTL_NO_UPDATE_CHECK` (the "offline" validate job queries npm for the check too) removes the version notice and its network call, and keeps a runner that has a terminal but no `CI` variable from ever being offered an update. See [New cotctl versions in a pipeline](#new-cotctl-versions-in-a-pipeline).

## The CI-oriented flags, and where they live

Most of the flags that make an apply *pipeline-friendly* used to live only on the **entity-scoped** applies. Since **0.14.0** the unified `cotctl apply` has caught up on all but one:

| Flag | On | What it does |
|---|---|---|
| `--json` | `surveys`, `properties`, `workflows` and — new in 0.14.0 — `schedules apply`, and `apply --dir` | Emits results as JSON, one object per line, to stdout. `apply -f` refuses it |
| `--quiet` / `-q` | those, plus `bots` / `routines` / `webhooks apply` and the unified `apply` | Suppresses the advisory warnings on stderr. On `surveys`, `properties`, `workflows` and `webhooks apply` it also drops the `would-create` / `would-update` lines; on the unified `apply`, the per-field diff of a `--dry-run` (the result lines still print). Errors still surface, and **so does every destructive finding** |
| `--diff <off\|compact\|verbose>` | `surveys`, `properties`, `workflows apply` and — new in 0.14.0 — the unified `apply`, `-f` or `--dir` | How much per-field diff a `--dry-run` prints (default `compact`) |
| `--fail-on-destructive` | `surveys apply`, `properties apply`, `workflows apply` **only** | Exits `2` when a `--dry-run` finds a `danger` finding |

`--fail-on-destructive` acts only together with `--dry-run`, and only on a **`danger`** finding: a permission list emptied whole and — since 0.14.0 — the questions a survey update would deactivate. A `warn` finding never changes the exit code, which is why the flag never changes it on `properties apply`: every finding a property can raise is a warning.

<div className="alert alert--warning">

**The gate is all or nothing.** It cannot accept one finding and keep failing on the rest, so a question you remove on purpose fails it too: check the question the gated dry run names, then apply — a real apply ignores the flag. And an **unmodified export made with 0.13.0 or earlier can fail it**: that export could leave a survey's real question out, so applying it deactivates the question. Re-export with 0.14.0 first.

</div>

The unified `apply` prints the destructive findings in a dry run too, since 0.14.0, but has no `--fail-on-destructive`. So a strict per-resource gate still uses the scoped form:

```bash
# Fail the job if deploying this workflow would destroy anything
cotctl workflows apply -f workflow.yaml -c acme --dry-run --fail-on-destructive
```

A common pattern is: gate each sensitive kind with a scoped `--dry-run --fail-on-destructive`, then deploy the whole set with `apply --dir`.

## Exit codes

`cotctl` maps outcomes to four exit codes:

| Code | Meaning |
|---|---|
| `0` | Success — including a clean `--dry-run` and a user-cancelled prompt with nothing wrong in it |
| `1` | The default failure code: an API error, a missing file or profile, and any validation failure not covered by `2` |
| `2` | One of three: a pre-apply **validation refusal** (what was refused was not sent, though other documents of the same run may have been), an **export refusal** (the survey could not be modelled), or a `danger` finding under `--fail-on-destructive` |
| `3` | **Partial apply** — part of the apply was written and the run failed afterwards: resources a Workflow created, or a schedule whose cron an update stopped and whose relaunch failed |

<div className="alert alert--warning">

**`2` carries three unrelated meanings, and none of them is applied uniformly across commands.** Inside one command the code is unambiguous, and that is the case a script is usually in. Across commands it is not: a pipeline that runs `apply` and `surveys export` and branches on a shared `$?` learns that *something* was refused, not whether anything was written. **Pin the exact command, or read the message** — do not carry one command's meaning of `2` over to the next.

</div>

<div className="alert alert--info">

**0.14.0 changed several codes.** If your pipeline tests for specific values, check it against the list below. Among the moves: a survey refusal from `surveys apply` or `apply -f` (`1` → `2`); an SLA or schedule refusal (`1` → `2`); a partial workflow apply from `apply -f` (`1` → `3`); a Workflow naming a Survey the server lacks (`3` → `1`, refused before its first write); `bots apply --dry-run` on a runtime failure (`2` → `1`); `apply --dir` without `-y` when its preview finds an error (now exits with that error's code, writing nothing); `apply --dir` for a document its own apply command refuses with `2` (`1` → `2`, even after `--continue-on-error` applied the rest); a batch that declares a resource twice (now `2`, where the last document used to win); `users` / `jobtitles apply` on an inactive record whose YAML omits `isActive` (`2` → `0`, and the rest of the YAML is now written); `bots`, `routines`, `users` and `jobtitles apply` on a failure that refuses nothing in the YAML, such as a catalog that cannot be read (`2` → `1`); a system JobTitle code typed back wrong at its prompt in `jobtitles apply` or `apply -f` (`2` → `0`, cancelled like a declined prompt; `apply --dir` stops there with `1`); and a Workflow state machine reusing a deactivated one's `code` (now `2`, before anything is written).

</div>

### Which refusals exit `2`

A kind gets the **same code from its own command as from `cotctl apply`**:

- **Survey, User and JobTitle** exit `2` for what they check before writing — schema, references, a renamed code — through `apply -f` as through `surveys`, `users` and `jobtitles apply`. A check the server keeps them from making (a pinned User `id` it fails to look up, a JobTitle it fails to read) exits `1`.
- **AccessRole, PropertyType, Property and Workflow** exit `1` for theirs, through `apply -f` as through `roles`, `property-types`, `properties` and `workflows apply` — except a Workflow state machine whose `code` a deactivated state machine holds, which every command refuses with `2`.
- **Webhook, Routine, Bot, SLA and Schedule** — which `apply -f` does not take — exit `2` from their own commands for what the YAML gets wrong: the schema, an SLA whose state machine or states don't resolve, a schedule's invalid `cron`, a bot version or routine the catalog doesn't have. A catalog that cannot be read exits `1`.
- **`cotctl validate` exits `1` for a validation failure, not `2`** — which surprises most people wiring up their first gate, because `validate` is the command whose whole job is validation.

Three refusals cross the kinds: **a batch that declares a resource twice** exits `2` from every apply; **a bot stage missing a `data` entry its bot type requires** exits `2` from every command that writes stages, `workflows apply` included; and **a `partial` key no command reads** exits `2` from `apply -f` but `1` from `roles`, `property-types`, `properties` and `workflows apply`.

**`apply --dir` gives each document the code its own command gives it**, and exits with the first of `3`, `2`, `1` it met — even after `--continue-on-error` applied the other files. A file it cannot read at all (a YAML syntax error, an unreadable `file://` reference, a refused `partial` key) exits `1`.

### `2` from `surveys export` is the odd one

It is not a pre-apply signal at all: `surveys export` exits `2` when the simplified format cannot model the survey, and nothing was ever going to be mutated, because the run is a read.

Read inside that command, though, it is unambiguous and it is actionable. It has exactly one meaning — *this survey cannot be expressed in the simplified format* — and exactly one answer: re-run with `--format raw`, which exports it verbatim. A script wrapping `surveys export` can branch on `2` and retry without reading the message. (An unknown `--format` value is not that: since 0.14.0 it exits `1` before anything is read.)

### One failure whose code depends on the command you entered through

An inconsistency in the current implementation, not a design. Pin the exact command in a script rather than relying on the code alone.

**Script-bot refusal** — the YAML declares a `PBScript`, `CCJS` or `ESMCode` stage without `--allow-script-bots`. Same refusal, same message, two codes:

| Command | Exit |
|---|---|
| `cotctl bots apply` | `2` |
| `cotctl routines apply` | `2` |
| `cotctl slas apply` | `1` |
| `cotctl schedules apply` | `1` |
| `cotctl workflows apply` | `1` |
| `cotctl apply -f` | `1` |
| `cotctl apply --dir` | the document's own command: `2` for a Bot or a Routine, `1` otherwise |

**A partial apply** no longer depends on the entry point: since 0.14.0 a workflow left half-applied exits `3` from `apply -f`, `apply --dir` and `workflows apply -f` alike — `--rollback` included, since what it deactivates stays on the server, inactive — and a schedule whose cron relaunch failed exits `3` from `schedules apply` and `apply --dir`. What `--rollback` deactivated is reported as `rolled back — created, then deactivated` (`[rolled-back]` under `--dir`, `"action": "rolled-back"` under `--json`), not as created.

## stdout vs. stderr

`cotctl` keeps the two streams disciplined so your pipeline can parse output reliably:

- **stdout** carries the result — the human table, or, under `--json`, the JSON-Lines payload and nothing else. When you pass `--json`, the human banner is suppressed so stdout stays machine-parseable.
- **stderr** carries warnings, progress notes, and prompts. Since 0.14.0 that includes the confirmation prompt and `Apply cancelled.` under `--json` (`surveys`, `workflows`, `properties` and `schedules apply`, and `apply --dir`), so a run without `-y` no longer mixes them into the JSON lines.

So the safe pattern in CI is to **capture stdout for parsing and let stderr flow to the log**:

```bash
cotctl workflows apply -f workflow.yaml -c acme --dry-run --json > result.jsonl
# parse result.jsonl; warnings and progress already went to the job log via stderr
```

## Token lifetime in CI

**An ApiToken does not expire from disuse.** It carries its own expiry date, set when it was issued, and a pipeline that runs once a quarter is as valid as one that runs hourly. The "7 days of inactivity" rule belongs to the browser session a person logs in with, not to the token a pipeline uses.

What that means in practice: an ApiToken expires on a date somebody chose, and nothing warns you as it approaches. **Record when each one expires and rotate it before that date** — a pipeline whose only credential has lapsed fails on its next run, which is usually the run you needed.

`cotctl` tells you which token it is refusing: an expired environment credential stops the run naming `COTCTL_TOKEN`, and the startup line announces an already-expired token as `EXPIRED` rather than printing a date in the past.

## New cotctl versions in a pipeline

From **0.14.0**, `cotctl` checks for a newer version before every command. In a pipeline that check never prompts and never installs anything: without a terminal, or with `CI` set to any value other than empty, `0`, `false` or `no` — and on any command run with `-y` — it writes a few `[cotctl]` lines to **stderr** (the versions, the release notes link for a breaking update, and the command to update with) and runs the command as usual. stdout is untouched, so `--json` output stays parseable. 0.14.0 is the first version with the check: a job still on 0.13.x never sees a notice.

Two settings make a job predictable:

- **Pin the version you install** — `npm install -g @cotctl/cli@<version>`, as the worked example does. An unpinned install picks up whatever is latest on the next run, breaking releases included: 0.14.0, for one, changed several exit codes a pipeline may branch on. Move the pin when you have read the release notes.
- **Set `COTCTL_NO_UPDATE_CHECK=1`** to skip the check and its network call altogether. Any value other than empty, `0`, `false` or `no` turns it off.

To move a pinned job forward, change the pin. Outside a pipeline, `cotctl update` installs the latest version on demand — see [update](./commands/update.md).

## Use `--continue-on-error` deliberately

By default, a directory apply stops at the first failure — usually what you want, so a broken deploy halts loudly. Add `--continue-on-error` only when you intentionally want the remaining entities to apply despite one failing; the run still exits non-zero. It exists only on `apply --dir`: `apply -f` refuses it with exit `1`. In an unattended job, which runs with `-y`, the interactive preview never runs — see [apply](./commands/apply.md#one-preview-one-prompt) for what it changes when a person answers the prompt.

## See also

- [validate](./commands/validate.md) — the offline gate to run on every PR
- [apply](./commands/apply.md) — `--dir`, `--dry-run`, and `-y`
- [Authentication](./authentication.md) — how login and profiles work
