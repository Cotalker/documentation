---
title: Troubleshooting
sidebar_label: Troubleshooting
displayed_sidebar: developer
---

<!-- source: repositories/cotctl/src/lib/validate-bot-versions.ts, src/lib/validate-cron.ts, src/commands/bots.ts, src/commands/bot-types.ts @ 4f7248a (2026-07-06) -->

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

## Bots, schedules & routines

These resources arrived in the 0.9–0.11 releases and have a few failure modes worth knowing.

### `version must be specified` / `is not a registered version`

- **Cause:** the bot type in your YAML pins a `version` the backend hasn't registered, or omits `version` for a type that has no default. `cotctl` validates bot versions at apply time against the **live** catalog, and an unknown version is an error (exit `2`) — the message lists the versions that *are* registered.
- **Fix:** consult the live catalog and pin a real version. `cotctl bot-types versions <BotType>` shows every registered version and the default for one type; `cotctl bot-types list` shows the whole catalog. (An unrecognized bot *type* — as opposed to version — is only a warning, since the catalog may not list a brand-new backend bot yet.)

### `looks like a Quartz-style expression` / invalid cron

- **Cause:** a Schedule's `cron` field isn't a valid **UNIX** cron expression. The most common trap is a **Quartz** expression (6 or 7 fields) — the webclient's Advanced tab pre-fills Quartz examples, and copying one as-is fails, because `cotctl` (and the scheduler) expect 5 fields: `minute hour day-of-month month day-of-week`.
- **Fix:** drop the seconds and year fields to get a 5-field UNIX expression. `cotctl` validates the cron client-side at apply time, so you see this before the schedule lands (an invalid cron would otherwise just silently never fire). An unparseable time-zone string fails the same check — verify the `tz`/timezone value.

### `bots list` doesn't show the bot-type catalog anymore

- **Cause:** a **breaking rename**. `cotctl bots` now manages **Bot admin** entities — the slash-commands (`/command`) users run in chat — so `cotctl bots list` lists those, not the ParametrizedBot type catalog it used to.
- **Fix:** the type catalog moved to its own command group. Use `cotctl bot-types list` and `cotctl bot-types versions <BotType>`. The old `cotctl bots versions <BotType>` still works as a **deprecated alias** — it prints a warning and delegates to `bot-types versions` — but it will be removed in `cotctl` 1.0.0, so update your scripts now.

<div className="alert alert--secondary">

**A dangling hint you may still see.** Some bot-version error messages suggest `cotctl bots list` to check a type name. Since the rename, the command you actually want is `cotctl bot-types list` — follow that instead.

</div>

### A scoped apply exits `2` on a "destructive" change

- **Cause:** you ran `cotctl surveys apply`, `cotctl properties apply` or `cotctl workflows apply` with `--fail-on-destructive`, and the dry-run flagged a destructive change (a removed question, a dropped state, a deactivation). That's the flag doing its job: exit code `2` means "a destructive change was detected", distinct from `1` (runtime error) and `0` (success).
- **Fix:** if the change is intentional, drop `--fail-on-destructive` (or apply without `--dry-run`) to proceed. If it isn't, you just caught a mistake before it reached the environment — review the diff. This gate exists only on the entity-scoped applies, not on the unified `cotctl apply`.

## Still stuck?

- Re-run the command — many errors include a precise hint about the fix.
- For schema questions, export a working example of the same resource and compare:
  `cotctl <entity> export <code> -c <profile> -o example.yaml`
- See the [command reference](./commands/apply.md) for the exact options and behavior of each command.
