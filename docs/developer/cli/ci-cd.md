---
title: CI/CD pipelines
sidebar_label: CI/CD
displayed_sidebar: developer
---

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

There are two ways to authenticate in CI, depending on what your environment supports:

**Option A — log in with `--no-browser` using secret credentials.** The cleanest approach when you have a service account with email/password:

```bash
cotctl login \
  --url https://web.cotalker.com \
  --subdomain acme \
  --no-browser
# credentials supplied via the CI secret-backed environment variables
```

**Option B — provide a token via a secret.** If you mint a token out-of-band, expose it to the job as a secret-backed environment variable (for example `$COTCTL_TOKEN`) rather than hardcoding it. Reference the variable; never the literal value.

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
      COTCTL_EMAIL: ${{ secrets.COTCTL_EMAIL }}
      COTCTL_PASSWORD: ${{ secrets.COTCTL_PASSWORD }}
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '22'
      - run: npm install -g @cotctl/cli
      - run: cotctl login --url https://web.cotalker.com --subdomain acme --no-browser
      - run: cotctl apply --dir config/ -c acme -y
```

Note `cotctl apply ... -y` — the `-y` flag skips the interactive confirmation prompts, which is exactly what you want in an unattended job.

## Token lifetime in CI

Tokens expire after 7 days of inactivity. For pipelines that run regularly this is rarely an issue, but for infrequent deploys, prefer a **service account** and re-authenticate at the start of each run rather than caching a token between runs.

## Use `--continue-on-error` deliberately

By default, a directory apply stops at the first failure — usually what you want, so a broken deploy halts loudly. Add `--continue-on-error` only when you intentionally want the remaining entities to apply despite one failing.

## See also

- [validate](./commands/validate.md) — the offline gate to run on every PR
- [apply](./commands/apply.md) — `--dir`, `--dry-run`, and `-y`
- [Authentication](./authentication.md) — how login and profiles work
