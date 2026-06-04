---
title: Troubleshooting
sidebar_label: Troubleshooting
displayed_sidebar: developer
---

Most `cotctl` errors are clear and tell you how to fix them. This page collects the ones you're most likely to hit, organized as **symptom → cause → fix** so you can scan for yours quickly.

## Installation & setup

### `cotctl: command not found` after a global install

- **Cause:** the npm global bin directory isn't on your `PATH`.
- **Fix:** confirm where npm installs global binaries with `npm bin -g`, and add that directory to your `PATH`. As a quick workaround, you can always run the tool via `npx @cotctl/cli <command>`.

## Authentication & profiles

### `--company/-c is required`

- **Cause:** the command needs a profile and you didn't pass one. There's no default, by design.
- **Fix:** add `-c <profile>`. Run `cotctl profile list` to see the available names.

### `Profile '<name>' not found`

- **Cause:** that profile doesn't exist locally (typo, or you never logged in to it).
- **Fix:** check `cotctl profile list`; run `cotctl login` if it's missing.

### `Session expired for profile "<name>"` / `Failed to refresh token`

- **Cause:** the token is more than 7 days old, or it was revoked server-side.
- **Fix:** run `cotctl login` again for that environment.

### `API Error 401`

- **Cause:** the token is invalid.
- **Fix:** re-authenticate with `cotctl login`.

### `API Error 403`

- **Cause:** the logged-in user lacks the required administration permissions.
- **Fix:** this is a Cotalker permissions matter — ask the company's administrator to grant the user the needed permissions, then retry.

### `Could not discover API URL from <url>`

- **Cause:** the webclient URL is wrong, or (common on-premise) the webclient doesn't serve the variables file `cotctl` reads to find the API.
- **Fix:** double-check the `--url`. On-premise, pass the API explicitly with `--api-url https://api.empresa.com`.

### `Token does not belong to the specified company`

- **Cause:** the token was issued for a different company than the subdomain/URL you specified.
- **Fix:** verify the `--subdomain` and `--url` match the environment you intend.

## YAML & validation

### `YAML parse error`

- **Cause:** invalid YAML syntax — usually indentation or a stray character.
- **Fix:** check indentation (spaces, not tabs) and formatting. Running `cotctl validate -f <file>` points at the problem line.

### Identifier conflict on remote validation / `Duplicate key error`

- **Cause:** a question `identifier` already exists in another survey in the company — identifiers are unique company-wide, not per survey.
- **Fix:** rename the identifier, prefixing it with the survey code (e.g. `re_nombre` instead of `nombre`).

### An exec hook doesn't run, or `Illegal return statement`

- **Cause:** the script's `src` is missing its `function run()` wrapper, so a top-level `return` is invalid.
- **Fix:** wrap the logic in `function run() { ... }` (or `async function run()`).

## Surveys: orphaned questions

This one is worth understanding because it's easy to avoid and annoying to undo.

- **Symptom:** after applying a survey with `questions: []`, you can no longer re-create questions with the same identifiers.
- **Cause:** applying an *empty* questions array leaves the old questions behind as orphaned records, and their identifiers (unique per company) now block re-creation.
- **Fix / prevention:** never apply `questions: []` to "clear" a survey. To deactivate a survey, set `isActive: false` *without* touching the questions section — `cotctl` preserves existing questions automatically when the section is absent. (Recovering from an existing orphan requires backend cleanup, so prevention is the play here.)

## Still stuck?

- Re-run the command — many errors include a precise hint about the fix.
- For schema questions, export a working example of the same resource and compare:
  `cotctl <entity> export <code> -c <profile> -o example.yaml`
- See the [command reference](./commands/apply.md) for the exact options and behavior of each command.
