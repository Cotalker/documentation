---
title: Release notes
sidebar_label: Release notes
displayed_sidebar: developer
---

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
- **Exit code `3` for a partial apply.** When a Workflow apply fails after creating some resources, it leaves orphaned records behind. `apply --dir` and `workflows apply -f` now exit `3` so CI can tell "needs manual cleanup" apart from an ordinary failure.
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
