---
title: Release notes
sidebar_label: Release notes
displayed_sidebar: developer
---

<!-- source: repositories/cotctl/CHANGELOG.md @ release-0.11.0 -->

What changed in each published release of `cotctl`, newest first — with the migration steps you need when something breaks.

Check which version you're on:

```bash
cotctl --version
```

And upgrade to the latest one:

```bash
npm install -g @cotctl/cli@latest
```

<div className="alert alert--info">

**Read the breaking changes before upgrading.** Every release lists them first, and each one tells you exactly what to change in your YAML or in your pipeline. Releases with no breaking-changes section are safe to take as-is.

</div>

{/* releases:start — the cotctl release job inserts each new release right below this line. Newest first. */}

## 0.11.0 — 2026-09-01

### ⚠ Breaking changes

**`cotctl slas apply` no longer forces `pb.version: 'v3'` when updating an SLA.**

The default still applies when **creating** one. On update, a YAML that omits `pb.version` (or carries it as `null` / `""`) now leaves the server's value untouched instead of overwriting it with `'v3'`.

- **Who this affects:** anyone who relied on `apply` to normalize SLAs created outside `cotctl` up to V3. Those SLAs stay on whatever engine they have. If their bots use COTLang expressions (`$VALUE#...`, `$INPUT#...`) in the stage `data`, those go unresolved under V2 — with no error.
- **What to do:** pin the version explicitly in the YAML —

  ```yaml
  pb:
    version: "v3"
    start: ...
  ```

  An explicit `pb.version` was never touched by `apply`, on create or on update, and still is not.

### Added

- **`table` questions now round-trip through the CLI.** `export` writes a table's `columns` — previously dropped, so an exported YAML described a table with no columns — and `apply` validates and applies them, in both the raw and the simplified YAML formats.
- **A saved table and its columns are protected from destructive edits.** Removing the table (or changing its identifier), removing a column (or changing its identifier), changing a saved column's type, and reordering, renaming or removing a saved option — each of these would silently orphan or re-label answers already stored, so all four are now refused, in `--dry-run` as much as in a real apply. Renaming a table or a column is still fine — only the identifier is frozen — and so is adding a new column or appending new options.
- **`apply` warns when a new table won't render on mobile yet.** It works on web today; mobile support is coming in a later app release.
- **`--allow-unverified-company` on `login`** lets you continue when the environment can't confirm which company a token belongs to — see the company-verification fix below.
- **`-y, --yes` on `login`** overwrites an existing profile without asking, and running `login` without a terminal now fails fast instead of hanging.
- **`apply` reports the PropertyType schema fields it preserved**, instead of merging them back silently:

  ```
  Updated: office_location (preserved 1 schemaNode not in YAML: 'city')
  ```

  and `--dry-run` shows the same information before anything is sent. Deleting a schema field through YAML still isn't supported — use `isActive: false` to retire one.

### Changed

- **A `table` question written in the simplified format is now validated exactly like the raw format.** The simplified schema previously skipped several checks the raw format always enforced — allowed column types, no nested tables, the column count and row limits, the column identifier charset, required column headers, and the per-column-type requirements. A survey YAML with a `table` question that passed `validate` before may now be refused if it relied on one of these gaps — the payloads being refused were already failing, or silently misbehaving, on the server.
- **`cotctl login --url` and `--api-url` now accept a host with no scheme.** `--url web.cotalker.com` resolves to `https://web.cotalker.com`, and the command prints the URL it resolved. An explicit `http://` is honored, for local and on-premise environments without TLS.

### Fixed

- **`login`'s API-URL autodiscovery no longer hangs**, and explains what it tried when it fails. Every attempt is now bounded (6 seconds per candidate, 10 seconds for the whole sweep), the `www.` ↔ `web.` sibling host is tried as a fallback, and a failure lists every URL it tried and why. It also stops picking up a **commented-out** `api` value from a whitelabel configuration file — which used to make `login` discover, and authenticate against, the wrong host.
- **`login` refuses to save a profile for the wrong company.** The browser sign-in flow authenticates against whichever Cotalker session the browser already has, so signing in with another company's session open used to save a profile pointing at that company, silently. `login` now verifies the company after minting the token and before writing anything, and fails on a mismatch — naming both companies and how to fix it. When the company can't be verified at all, `login` asks before saving; `--allow-unverified-company` is how to proceed without a terminal. **This is a behavior change for unattended `login`:** a scripted run against an environment that can't expose its company used to succeed with a warning; it now fails unless you pass the flag.
- **A cancelled profile overwrite now fails instead of reporting success.** Answering anything but `y` to the overwrite prompt used to exit `0`. It now exits `1`, on stderr. **If a script only checks the exit code, this is a behavior change** — a cancelled login now stops the pipeline instead of continuing with an unwritten profile, which is the intent.
- **`Profile saved` is now verified against the file.** `login` re-reads the config after saving and confirms the profile is actually there before printing success, naming the exact path (`Profile saved as "acme" to ~/.cotctl/config.json`).
- **`surveys export` no longer overwrites one exec script with another.** Two questions that produced the same extracted-script filename used to collide, and the second write silently won. **Exported script files change name as a result of this fix** — re-export rather than renaming existing files by hand.
- **Four `--help` descriptions asserted things that were already false.** Two flags claimed a removal that never happened, and `property-types get --show-inactive` promised a filter it doesn't apply (inactive fields are already listed by default, tagged `[INACTIVE]`). No flag changed name or behavior — only what `--help` said about them.
- **`surveys list --help` no longer advertises a `-c` short form for `--code`.** `-c` is already the global `--company` flag, so the short form never reached `--code` — it silently searched for a *profile* with that name instead. `--code` itself is unaffected.
- **The AI assistant's built-in guidance is corrected on two points it had gotten out of sync on:** a workflow's `icon` field takes SVG path data, not an icon name, and a routine invoked from a bot stage takes its declared inputs as sibling keys of `code` in the same `data` block — omitting a required one never fails the apply, the routine just runs with that input empty.

### Migration

A YAML exported by an older version has no `columns` block on its table questions, because `export` used to drop them. Re-applying such a file against a survey whose table already has saved columns now trips the "column exists but is missing from the YAML" refusal — once per column, since from the file's point of view every column disappeared. **Re-export those surveys** before re-applying them.

## 0.10.0 — 2026-08-21

### ⚠ Breaking changes

**`--allow-script-bots` is now required on every `apply` path.**

Applying a YAML that declares a stage of a script-executing bot type — `PBScript`, `CCJS` or `ESMCode` — now fails before anything is created or modified. Until this release the gate only existed on `cotctl workflows apply`; through the other paths such a bot applied silently and ran arbitrary JavaScript at runtime.

It now covers `bots apply`, `slas apply`, `schedules apply`, `routines apply`, and both `apply -f` and `apply --dir` — which previously had no way to pass the flag at all.

- **What to do:** re-run the same command with `--allow-script-bots` to opt in explicitly. Pipelines that apply these bot types **will start failing** until you add it. The error message names each offending stage and its type.
- **Careful in CI:** the refusal doesn't use one exit code. `bots apply` and `routines apply` exit **2**; `slas apply`, `schedules apply`, `workflows apply` and `apply -f` / `apply --dir` exit **1**. If your script branches on the exit code, pin it to the command you actually invoke.

**`webhooks apply` rejects a populated `context` outside the task trigger.**

Scoping by `survey` / `group` / `taskGroup` only means something for `create-edit-delete-task`. On any other trigger the backend accepts it and then matches no event at all, so every delivery is dropped without a warning.

- **What to do:** change the trigger to `create-edit-delete-task`, or remove `context`. An empty `context: {}` is still accepted everywhere, so clearing a stale value keeps working.

**A `PBScript` stage whose `data.code` isn't in your routine catalogue is rejected.**

The code is now resolved against the live catalogue at apply time, with a suggestion when a close match exists. Before, the backend accepted any string and failed in production instead.

- **What to do:** fix the typo, or apply the routine first. `apply --dir` already orders `Routine` before `Sla` and `Schedule` for exactly this reason.

**Duplicate `stage.key` values inside one bot are rejected.**

- **What to do:** give each stage a distinct key. Repeated keys made `stage.next` and `bot.start` ambiguous and broke the stage-identity fix below.

**`permissionsV2` on a Survey is validated against the permission catalogue.**

The field takes permission *strings*, never AccessRole *names* — passing a role name used to produce an opaque `HTTP 500`.

- **What to do:** replace role names with permission codes. Matching is case-sensitive. Use `--skip-remote-validation` if the divergence is intentional.

### Added

- **`apply` retries rate limits on its own.** An `HTTP 429` now backs off and retries up to 3 times, honouring `Retry-After` when the backend sends it. Large `apply --dir` batches no longer abort halfway and need a manual re-run.
- **Exit code `3` for a partial apply.** When a Workflow apply fails after creating some resources, it leaves orphaned records behind. `apply --dir` and `workflows apply -f` now exit `3` so CI can tell "needs manual cleanup" apart from an ordinary failure. `cotctl apply -f` doesn't subscribe to the signal and still exits `1` — pin your CI branch to the command you invoke.
- **`validate --dir` understands `JobTitle` and `User`.** Both are now schema-checked offline instead of falling through as an unrecognized kind. Seven kinds are recognized — still fewer than the twelve `apply --dir` handles, so `Routine`, `Sla`, `Schedule`, `Bot` and `Webhook` are not covered yet.
- **`--dry-run` resolves references inside the same batch.** A permission code, an AccessRole → JobTitle or a JobTitle → User reference defined in another document of the same run no longer reports a false failure.
- **`scaffold` accepts state names as you type them.** `--states "Aprobada" "En compra"` keeps the display name and derives the `code` slug from it; you no longer have to pre-slugify by hand and lose the label.
- **Non-blocking warnings** for three documented data traps that previously only surfaced at runtime.

### Fixed

- **SLA state references resolve to the right id.** An SLA whose `start.states[]` / `end.states[]` used state codes resolved to the wrong record and was rejected with `HTTP 500: SMStates not found`. Codes now work as documented, and remain the recommended form. If you write a raw ObjectId there it must be the `SMState._id`.
- **Bot and SLA stages keep their identity across applies.** Stage ids were reassigned on every apply, producing a permanent false diff in `--dry-run` that never converged.
- **`surveys` search no longer returns the whole catalogue** when the search term sanitises to an empty string.
- **`workflows apply` can clear `requiredSurvey` again**, and the dry-run preview now shows changes to `next[].canChange`, `next[].requiredSurvey` and `next[].bots` — they were being applied without appearing in the preview.
- **Multi-document files are dispatched per document.** A YAML mixing several `kind`s was previously dispatched by the first document's kind alone.
- **The bundled AI skills stated the wrong `apply --dir` order.** Six of them had drifted and listed `Survey` after `Workflow` — the inversion that orphans records when a state machine fails to create. If you author YAML with an assistant, this is worth re-reading.

### Docs

Reference pages updated for `subfilter` / `subfilterValue` on properties, `dataType[]` when a stage invokes a routine, `surveyTriggers` preserve-vs-delete semantics, the `validate` exec-hook contract, and the `transitions[].requiredSurvey` clearing semantics.

<div className="alert alert--secondary">

**Older releases.** Versions before `0.10.0` are not documented here. If you're on one of them, upgrade to the latest and read the section above before your next apply.

</div>
