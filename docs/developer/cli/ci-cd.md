---
title: CI/CD pipelines
sidebar_label: CI/CD
displayed_sidebar: developer
---

<!-- source: repositories/cotctl/src/commands/{apply,surveys,properties,workflows}.ts @ 4f7248a (2026-07-06) -->

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

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '22'
      - run: npm install -g @cotctl/cli
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
      - run: npm install -g @cotctl/cli
      - run: cotctl apply --dir config/ -y
```

Two things to notice. There is **no login step** — the environment credential is the whole of the authentication, and `-c` is absent because the company comes from the token. And `cotctl apply ... -y` skips the interactive confirmation prompts, which is exactly what you want in an unattended job.

`COTCTL_COMPANY_ID` is a plain variable rather than a secret: a company id is not sensitive, and keeping it visible is the point — it is the line a reviewer reads to see which environment this job deploys to.

## The CI-oriented flags live on the scoped applies

This is the detail that catches people wiring up their first pipeline. Most of the flags that make an apply *pipeline-friendly* — machine-readable output, diff control, and the destructive-change gate — are **not** options of the unified `cotctl apply` (or `apply --dir`). They live only on the **entity-scoped** applies:

| Flag | On | What it does |
|---|---|---|
| `--json` | `surveys apply`, `properties apply`, `workflows apply` | Emits results as JSON, one object per line, to stdout |
| `--quiet` / `-q` | those three, plus `bots` / `routines` / `schedules` / `webhooks apply` — and, since **0.12.0**, the unified `apply` | Suppresses the `would-create` / `would-update` progress lines. Errors still surface, and **so does every destructive finding** |
| `--diff <off\|compact\|verbose>` | `surveys apply`, `properties apply`, `workflows apply` | Controls how much per-field diff detail is printed (default `compact`) |
| `--fail-on-destructive` | `surveys apply`, `properties apply`, `workflows apply` | Exits `2` when a `--dry-run` detects a destructive change |

<div className="alert alert--warning">

**`-q` never silences a destructive finding, and `apply` never prints one.** These are two different statements and both matter in a pipeline. The flag separates progress chatter from findings that announce data being removed, and mutes only the first. But the unified `apply` does not render the destructive-findings block at all — it computes the findings and discards them — so `apply --dir --dry-run` is the **quietest preview available**, silent about exactly the changes that cannot be undone. See [apply](./commands/apply.md) for what to run instead.

</div>

So a strict per-resource gate uses the scoped form:

```bash
# Fail the job if deploying this workflow would destroy anything
cotctl workflows apply -f workflow.yaml -c acme --dry-run --fail-on-destructive
```

`cotctl apply --dir` remains the right tool for deploying a **mixed** directory in dependency order — it just doesn't carry those four flags. A common pattern is: gate each sensitive kind with a scoped `--dry-run --fail-on-destructive` check, then deploy the whole set with `apply --dir`.

## Exit codes

`cotctl` maps outcomes to four exit codes:

| Code | Meaning |
|---|---|
| `0` | Success — including a clean `--dry-run` and a user-cancelled prompt |
| `1` | The default failure code: an API error, a missing file or profile, and any validation failure not covered by `2` |
| `2` | One of three: a pre-apply **validation refusal** (nothing was mutated), an **export refusal** (the survey could not be modelled), or destructive changes detected under `--fail-on-destructive` |
| `3` | **Partial apply** — some resources were created, but the batch left orphaned or incomplete state that needs attention |

<div className="alert alert--warning">

**`2` carries three unrelated meanings, and none of them is applied uniformly across commands.** Inside one command the code is unambiguous, and that is the case a script is usually in. Across commands it is not: a pipeline that runs `apply` and `surveys export` and branches on a shared `$?` learns that *something* was refused, not whether anything was written. **Pin the exact command, or read the message** — do not carry one command's meaning of `2` over to the next.

</div>

### Which commands exit `2` on a validation failure

`apply`, `bots`, `slas`, `schedules`, `routines`, `users`, `jobtitles`, `surveys` and `webhooks`.

The rest — `properties`, `workflows`, `roles`, `property-types` and `validate` — exit **`1`**. Two consequences worth planning around:

- The *same invalid YAML* exits `2` through `cotctl apply -f` and `1` through `cotctl properties apply`, `workflows apply`, `roles apply` or `property-types apply`.
- **`cotctl validate` exits `1` for a validation failure, not `2`** — which surprises most people wiring up their first gate, because `validate` is the command whose whole job is validation.

### `2` from `surveys export` is the odd one

It is not a pre-apply signal at all: `surveys export` exits `2` when the simplified format cannot model the survey, and nothing was ever going to be mutated, because the run is a read.

Read inside that command, though, it is unambiguous and it is actionable. It has exactly one meaning — *this survey cannot be expressed in the simplified format* — and exactly one answer: re-run with `--format raw`, which exports it verbatim. A script wrapping `surveys export` can branch on `2` and retry without reading the message.

<div className="alert alert--info">

**Changed in 0.12.0.** This refusal used to exit `1`. If your pipeline tests for `== 1` specifically, update it; one that treats any non-zero exit as a failure is unaffected.

</div>

### Two failures whose code depends on the command you entered through

These are inconsistencies in the current implementation, not a design. Pin the exact command in a script rather than relying on the code alone.

**Script-bot refusal** — the YAML declares a `PBScript`, `CCJS` or `ESMCode` stage without `--allow-script-bots`. Same refusal, same message, two codes:

| Command | Exit |
|---|---|
| `cotctl bots apply` | `2` |
| `cotctl routines apply` | `2` |
| `cotctl slas apply` | `1` |
| `cotctl schedules apply` | `1` |
| `cotctl workflows apply` | `1` |
| `cotctl apply -f` / `apply --dir` | `1` |

**Partial apply** — a workflow left orphaned group, task-group, state-machine or state resources behind:

| Command | Exit |
|---|---|
| `cotctl apply --dir` | `3` |
| `cotctl workflows apply -f` | `3` |
| `cotctl apply -f` | `1` |

## stdout vs. stderr

`cotctl` keeps the two streams disciplined so your pipeline can parse output reliably:

- **stdout** carries the result — the human table, or, under `--json`, the JSON-Lines payload and nothing else. When you pass `--json`, the human banner is suppressed so stdout stays machine-parseable.
- **stderr** carries warnings, progress notes, and prompts.

So the safe pattern in CI is to **capture stdout for parsing and let stderr flow to the log**:

```bash
cotctl workflows apply -f workflow.yaml -c acme --dry-run --json > result.jsonl
# parse result.jsonl; warnings and progress already went to the job log via stderr
```

## Token lifetime in CI

**An ApiToken does not expire from disuse.** It carries its own expiry date, set when it was issued, and a pipeline that runs once a quarter is as valid as one that runs hourly. The "7 days of inactivity" rule belongs to the browser session a person logs in with, not to the token a pipeline uses.

What that means in practice: an ApiToken expires on a date somebody chose, and nothing warns you as it approaches. **Record when each one expires and rotate it before that date** — a pipeline whose only credential has lapsed fails on its next run, which is usually the run you needed.

`cotctl` tells you which token it is refusing: an expired environment credential stops the run naming `COTCTL_TOKEN`, and the startup line announces an already-expired token as `EXPIRED` rather than printing a date in the past.

## Use `--continue-on-error` deliberately

By default, a directory apply stops at the first failure — usually what you want, so a broken deploy halts loudly. Add `--continue-on-error` only when you intentionally want the remaining entities to apply despite one failing.

## See also

- [validate](./commands/validate.md) — the offline gate to run on every PR
- [apply](./commands/apply.md) — `--dir`, `--dry-run`, and `-y`
- [Authentication](./authentication.md) — how login and profiles work
