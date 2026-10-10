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

### `Could not update cotctl to <version>: …`

- **Cause:** the automatic update (from 0.14.0) could not install the new version with npm — no write permission on npm's global directory, no network, or an `npm` that belongs to another Node installation.
- **Fix:** run the `npm install -g` command the message prints, with the permissions that directory needs. On an update without breaking changes your command still ran, on the current version, and `cotctl` will not retry for 12 hours; after choosing `update` at the prompt, it stopped without running the command. See [update](./commands/update.md#when-cotctl-can-update-itself).

### `Another cotctl process is installing an update right now.`

- **Cause:** a `cotctl` in another terminal or script is installing the new version at that moment. Nothing failed.
- **Fix:** on an update without breaking changes your command ran anyway, on the current version. After `update` at the prompt, or from `cotctl update`, it exited `1` without running anything — run it again once that install finishes, and do **not** run `npm install -g` meanwhile: two installs at once can break the global installation.

## Authentication & profiles

### `--company/-c is required`

- **Cause:** the command needs to know which company to act on and you didn't say. There's no default profile, by design.
- **Fix:** add `-c <profile>`. Run `cotctl profile list` to see the available names.
- **In a pipeline:** export an [environment credential](./authentication.md#running-without-a-profile-the-environment-credential) instead — `COTCTL_TOKEN` plus `COTCTL_API_URL` — and `-c` becomes unnecessary. Since 0.12.0 the error also tells you **which of the two variables is missing** if you exported only one.

### `Profile '<name>' not found`

- **Cause:** that profile doesn't exist locally (typo, or you never logged in to it).
- **Fix:** check `cotctl profile list`; run `cotctl login` if it's missing.

### `Session expired for profile "<name>"` / `Failed to refresh token`

- **Cause:** the token is more than 7 days old, or it was revoked server-side.
- **Fix:** run `cotctl login` again for that environment.

### `API Error 401`

- **Cause:** the token is invalid.
- **Fix:** re-authenticate with `cotctl login`.

### `API Error 403` / `Forbidden (HTTP 403)`

- **Cause:** the logged-in user lacks a permission the request needs — for a Survey, usually the survey administration permission. Since 0.14.0, `routines get`, `routines export`, `routines test`, and an apply of a Routine without `id` that already exists also need **`admin-pbscripts-read`** — the permission `routines list` already needed. Which of the two messages you get depends on the kind; see [apply](./commands/apply.md#a-word-on-rate-limits-and-permissions).
- **Fix:** this is a Cotalker permissions matter — ask the company's administrator to grant the user the needed permissions, then retry.

### `Attempted to modify a read-only field (path: …)`

- **Cause:** the server refused a field `cotctl` sent in a JobTitle, User or Routine (`routines apply`) update.
- **Fix:** report it as a bug — `cotctl` should not send that field.

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

### `file:// path escapes YAML directory: <path>`

- **Cause:** a `file://` reference leaves the YAML file's directory — through `..`, an absolute path, or a symlink that leads outside it (the message names where). Since 0.14.0 every kind's script fields are read, and the limit is each YAML file's own directory, not the root of `--dir`.
- **Fix:** copy the file, or the folder, under the YAML file's directory, or write the script inline. See [`file://` references](./commands/validate.md#file-references).

### `Cannot read file referenced by file://<path>` / `file:// reference is not a regular file`

- **Cause:** the file a script field names doesn't exist, can't be read, or is a directory. Since 0.14.0 a `CCJS` or `ESMCode` stage's `data.src` is read too — before, it was sent as the literal path, so a reference that never resolved now fails.
- **Fix:** create the file or fix its permissions, point the reference at a file, or write the content inline.

### `… would be written without data.<key>, which its bot type requires`

- **Cause:** a bot stage lacks an entry the live bot catalog marks required for its type and version — most often a new `PBScript` stage without `data.data`. Since 0.14.0 every apply refuses it with exit `2`, its `--dry-run` too.
- **Fix:** give the entry a value. A `PBScript` stage carries its routine's input under `data.data`, and `data: {}` when the routine takes none. See [Required `data` entries](./workflow-bots/index.md#required-data-entries).

### Identifier conflict on remote validation / `Duplicate key error`

- **Cause:** a question `identifier` already exists in another survey in the company — identifiers are unique company-wide, not per survey.
- **Fix:** rename the identifier, prefixing it with the survey code (e.g. `re_nombre` instead of `nombre`).

### An exec hook doesn't run, or `Illegal return statement`

- **Cause:** the script's `src` is missing its `function run()` wrapper, so a top-level `return` is invalid.
- **Fix:** wrap the logic in `function run() { ... }` (or `async function run()`).

### `filters must be a list`

- **Cause:** a `property` question's `filters` is written as a map — a single filter missing its leading `- `. Before `0.13.0` this passed validation and then broke the apply.
- **Fix:** start each filter with `- `. See [`property`](./resources/surveys/question-types.md#property--pick-a-property).

### `jobs must be a list`

- **Cause:** a `person` question with `personFilter.allow: jobTitle` has `jobs` as a single value (`jobs: mgr`) instead of a list. Before `0.13.0` this passed validation, and the apply looked up one JobTitle per character of the value.
- **Fix:** write it as a list, even for one code: `jobs: [mgr]`. Under any other `allow`, `jobs` is not read. See [`person`](./resources/surveys/question-types.md#person--pick-a-user).

### `Survey with code "<code>" not found`

- **Cause:** no survey in the company — active or inactive — carries that code. On a `survey`-type question it means the child survey hasn't been applied yet.
- **Fix:** check the code with `cotctl surveys list --code <code> -c <profile>`, which looks up the exact code and includes inactive surveys. For a `survey` reference, apply the child first; with `apply --dir`, put it in a file that sorts before the parent's, or earlier in the same file — surveys are applied in path order, not in reference order.

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

- **Cause:** you ran `cotctl surveys apply` or `cotctl workflows apply` with `--dry-run --fail-on-destructive`, and the dry-run found a `danger` finding: a permission list emptied whole, or — since 0.14.0 — questions the survey update would deactivate (reported under `--json` as `survey.questions-deactivated`). That's the flag doing its job: exit code `2` means "a destructive change was detected", distinct from `1` (runtime error) and `0` (success). A `warn` finding, such as a deactivation, never changes the code.
- **Fix:** if the change is intentional, apply without the gate — a real apply ignores the flag. If it isn't, you just caught a mistake before it reached the environment — review the diff. An unmodified export made with 0.13.0 or earlier can trip it: re-export first. This gate exists only on the entity-scoped applies, not on the unified `cotctl apply`.

## Still stuck?

- Re-run the command — many errors include a precise hint about the fix.
- For schema questions, export a working example of the same resource and compare:
  `cotctl <entity> export <code> -c <profile> -o example.yaml`
- See the [command reference](./commands/apply.md) for the exact options and behavior of each command.
