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

Both `cotctl login` (browser) and `cotctl login --no-browser` (email/password) are **interactive** — they open a browser or prompt for credentials — so they aren't suitable for an unattended job on their own. The reliable way to authenticate in CI is with a **pre-generated API token**.

**1. Generate the token once.** An administrator issues an API token from the Cotalker admin panel (or the Partner Platform) and you store its value as an encrypted CI secret — for example `COTCTL_API_TOKEN`.

**2. Authenticate non-interactively with `--paste-token`.** `cotctl login --paste-token` creates a profile from a pre-generated token instead of prompting for credentials. In CI, pipe the secret into it:

```bash
echo "$COTCTL_API_TOKEN" | cotctl login \
  --url https://web.cotalker.com \
  --subdomain acme \
  --profile acme \
  --paste-token
```

Nothing is hardcoded. The command does show a paste prompt, but it reads the piped value from stdin, so the job never hangs.

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
      COTCTL_API_TOKEN: ${{ secrets.COTCTL_API_TOKEN }}
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '22'
      - run: npm install -g @cotctl/cli
      - run: echo "$COTCTL_API_TOKEN" | cotctl login --url https://web.cotalker.com --subdomain acme --profile acme --paste-token
      - run: cotctl apply --dir config/ -c acme -y
```

Note `cotctl apply ... -y` — the `-y` flag skips the interactive confirmation prompts, which is exactly what you want in an unattended job.

## The CI-oriented flags live on the scoped applies

This is the detail that catches people wiring up their first pipeline. The flags that make an apply *pipeline-friendly* — machine-readable output, quiet mode, diff control, and the destructive-change gate — are **not** options of the unified `cotctl apply` (or `apply --dir`). They live only on the **entity-scoped** applies:

| Flag | On | What it does |
|---|---|---|
| `--json` | `surveys apply`, `properties apply`, `workflows apply` | Emits results as JSON, one object per line, to stdout |
| `--quiet` / `-q` | those three, plus `bots`/`routines`/`schedules apply` | Suppresses the `would-create`/`would-update` chatter; errors still surface |
| `--diff <off\|compact\|verbose>` | `surveys apply`, `properties apply`, `workflows apply` | Controls how much per-field diff detail is printed (default `compact`) |
| `--fail-on-destructive` | `surveys apply`, `properties apply`, `workflows apply` | Exits `2` when a `--dry-run` detects a destructive change |

So a strict per-resource gate uses the scoped form:

```bash
# Fail the job if deploying this workflow would destroy anything
cotctl workflows apply -f workflow.yaml -c acme --dry-run --fail-on-destructive
```

`cotctl apply --dir` remains the right tool for deploying a **mixed** directory in dependency order — it just doesn't carry those four flags. A common pattern is: gate each sensitive kind with a scoped `--dry-run --fail-on-destructive` check, then deploy the whole set with `apply --dir`.

## Exit codes

`cotctl` maps outcomes to three exit codes, and a good pipeline branches on them:

| Code | Meaning |
|---|---|
| `0` | Success — including a clean `--dry-run` and a user-cancelled prompt |
| `1` | Runtime error — network failure, an API `4xx`/`5xx`, a missing file or profile |
| `2` | Validation failure (the YAML was rejected before anything was sent) — **or**, on a scoped apply with `--fail-on-destructive`, a destructive change was detected |

Because `2` is distinct from `1`, you can treat "destructive change / invalid YAML" differently from "the API was down". The unified `apply` uses `0`/`1`/`2` for success/runtime/validation; the `2`-for-destructive meaning is specific to the scoped applies with `--fail-on-destructive`.

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

Tokens expire after 7 days of inactivity. For pipelines that run regularly this is rarely an issue, but for infrequent deploys, prefer a **service account** and re-authenticate at the start of each run rather than caching a token between runs.

## Use `--continue-on-error` deliberately

By default, a directory apply stops at the first failure — usually what you want, so a broken deploy halts loudly. Add `--continue-on-error` only when you intentionally want the remaining entities to apply despite one failing.

## See also

- [validate](./commands/validate.md) — the offline gate to run on every PR
- [apply](./commands/apply.md) — `--dir`, `--dry-run`, and `-y`
- [Authentication](./authentication.md) — how login and profiles work
