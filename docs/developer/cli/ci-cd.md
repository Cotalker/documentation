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

Nothing is hardcoded, and there's no interactive prompt to hang on.

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

## Token lifetime in CI

Tokens expire after 7 days of inactivity. For pipelines that run regularly this is rarely an issue, but for infrequent deploys, prefer a **service account** and re-authenticate at the start of each run rather than caching a token between runs.

## Use `--continue-on-error` deliberately

By default, a directory apply stops at the first failure — usually what you want, so a broken deploy halts loudly. Add `--continue-on-error` only when you intentionally want the remaining entities to apply despite one failing.

## See also

- [validate](./commands/validate.md) — the offline gate to run on every PR
- [apply](./commands/apply.md) — `--dir`, `--dry-run`, and `-y`
- [Authentication](./authentication.md) — how login and profiles work
