---
title: validate
sidebar_label: validate
displayed_sidebar: developer
---

<!-- source: repositories/cotctl/src/commands/validate.ts @ 4f7248a (2026-07-06) -->

`cotctl validate` checks your YAML *before* you deploy it. Getting into the habit of validating first is one of the highest-value things you can do as a partner: it catches mistakes on your machine, in seconds, instead of as a half-applied change in a customer's environment.

There are three things you might want to validate, and `validate` has a mode for each:

| Mode | Flag | Network | What it's for |
|---|---|---|---|
| File | `-f <file>` | Offline | Check a single YAML file of any supported kind |
| Directory | `--dir <path>` | Offline | Cross-check a whole folder of resources before `apply --dir` |
| Workflow | `--workflow <nameCode>` | Online | Run the production-readiness checklist against a live workflow |

## File mode — one file, offline

The quickest check. It validates a single YAML file against the schema for its `kind`, with no API call:

```bash
cotctl validate -f my-survey.yaml
```

```
✓ my-survey.yaml is valid
```

If something's wrong, it tells you what and where:

```
✗ my-survey.yaml has validation errors:

  - code: code must start with a lowercase letter and contain only lowercase letters, numbers, and underscores
```

File mode isn't survey-only. It reads the `kind` field and runs the matching schema for **seven** kinds — `Survey`, `AccessRole`, `PropertyType`, `Property`, `JobTitle`, `Workflow`, `User`. (A file with no `kind` is treated as a Survey, for backward compatibility.)

<div className="alert alert--warning">

**`validate` recognises seven kinds; `apply` applies twelve.** The five `apply` handles that `validate` does not are `Routine`, `Sla`, `Schedule`, `Bot` and `Webhook`. A file of one of those kinds is reported as an **unrecognized kind** and fails the run — so the natural pipeline of `validate --dir` followed by `apply --dir` **stops at the validation step** on a directory that `apply` would have deployed without complaint.

Until the gap closes, either keep those five kinds in a directory of their own, or let the validation step tolerate them. This is a gap in `cotctl`, not a problem with your files.

</div>

A single file can hold **several documents** separated by `---`. `validate` checks each one and **accumulates** the errors — it doesn't stop at the first bad document — then reports a per-kind tally like `2 Survey documents, 1 User document validated successfully`, so you can fix everything in one pass.

Under the hood, up to three layers of checking run — but only the first applies to every kind:

| Layer | What it checks | Applies to | How to skip |
|---|---|---|---|
| Structure (Zod) | Types, required fields, enums | **All kinds** | Always on |
| Semantic | Per-type rules (a `property` question's `filters` and a jobTitle `jobs` must be lists, a `survey` question needs a non-empty `surveyCode`), `function run()` in exec hooks, buttons in the wrong stage, deprecated fields | **Survey only** | `--skip-semantic-validation` |
| Remote | Identifier uniqueness across the company, and that the referenced PropertyTypes, JobTitles, Properties and `survey`-question surveys exist (with a warning for an inactive embedded survey); on a **Workflow**, the `data` entries each bot stage's type requires — warnings only | **Survey**, and Workflow bot stages | Needs `--remote` + `-c <profile>` |

Non-Survey kinds get the structural (Zod) layer only — plus, for a Workflow under `--remote`, the bot-stage check. Remote checks reach the API, so they require a profile — and `--remote` can't be combined with `--dir`:

```bash
cotctl validate -f my-survey.yaml --remote -c acme
```

**Since 0.12.0 the semantic layer also runs in directory mode**, which it did not before. See the warning under *Directory mode* below: a folder that passed clean can start failing, and the failure was always there.

**The Workflow bot-stage check only warns** (new in 0.14.0). The live bot catalog marks some `data` entries as required for each bot type and version, and every apply refuses a stage that would be written without one (see [Required `data` entries](../workflow-bots/index.md#required-data-entries)). `validate -f --remote` has no stored stage to compare with, so it warns and exits `0`; the apply's `--dry-run` is where the refusal shows. It reads a stage that omits `version` on the default version and skips a `partial: true` document. Without `--remote`, and with `--dir`, it reads no catalog.

A `partial: true` PropertyType or Workflow is checked on its own fields only, with what the schema otherwise requires left optional: `validate` reads nothing stored, so the merged document is validated by `apply`. Any other `partial` value, or the key on another kind, fails. See [Partial documents](./apply.md#partial-documents-partial-true).

### `file://` references

A script can live in its own file, referenced as `file://<path>`. Since **0.14.0**, `validate` and every apply read those references in the **script fields of every kind** — not only a survey's — and nowhere else:

- **Which fields:** the `data.src` of a `CCJS` or `ESMCode` stage — in a Bot, a Routine, an SLA, a Schedule or a Workflow's bot slots — and a Survey's `src`, `editable.src`, `hidden.src` and the `src` of an `exec` hook on a question or a table column. A reference that can be read is sent as the file's content; before 0.14.0 a `CCJS` stage's `data.src: "file://script.js"` reached the server as that literal path.
- **Anywhere else**, a `file://` keeps its text and is sent as written. When the field is a `src` — a Property's `schemaInstance.src`, a `src` deeper in a survey — `validate` and the apply print a warning that `-q` does not silence. (0.13.0 read a survey's references in any `src` key, at any depth.)
- **It must stay inside the YAML file's directory.** `file://../…`, an absolute path elsewhere, or a symlink that leads outside the directory is refused even when the file exists; a symlink whose target stays inside is followed. The limit is the directory of **each file**, not the root of `--dir`, so a project with one folder per kind and a shared scripts folder beside them runs into it: move the scripts under each YAML file's directory.
- **A reference that cannot be read fails, exit `1`** — a missing file, one you can't read, or something that is not a regular file. `validate -f` reports each document that fails under its own header and still checks the rest. A file that is not `.js`, `.mjs` or `.cjs` is read with a warning.
- **In a `partial: true` document**, a `file://` in the `data.src` of a stage written without its `name` is refused: the stage keeps the bot type of the stored stage, which the document alone cannot tell. Write the stage's `name` (`CCJS` or `ESMCode`).

A pipeline whose `validate -f` passed a reference that `validate --dir` refused now fails at that first step — they read the same references the same way.

## Directory mode — a whole folder, offline

This is the one you'll use most when working with scaffolded workflows. It validates every YAML file in a folder **and** checks that they reference each other correctly — all offline. Run it right before `apply --dir`:

```bash
cotctl validate --dir ordenes-compra/
```

It runs two families of checks. **Schema checks**, per file:

| ID | Check |
|---|---|
| S1 | File parses as valid YAML |
| S2 | `kind` is present and recognized, and a top-level `partial` key, if any, is `true` on a kind that reads it |
| S3 | Document validates against the schema for its `kind` |
| S4 | **New in 0.12.0.** A survey's semantic rules — repeated identifiers, reserved identifiers, a `dependsOn` pointing at an identifier that does not exist. FAIL for errors, WARN for warnings |
| S5 | **New in 0.14.0.** A `partial: true` PropertyType or Workflow passed against its own fields only (WARN). It is left out of the cross-reference checks: the merged document is validated by `apply` |

And **cross-reference checks**, across files — this is what catches a property pointing at a property type that doesn't exist:

| ID | Severity | Check |
|---|---|---|
| X1 | warn | Permission strings (`name:action`) are defined as AccessRoles |
| X2 | fail | `Property.propertyType` references an existing PropertyType |
| X3 | fail | Workflow state machine PropertyType references resolve — `propertyType`, `asset.propertyType`, and since 0.12.0 each `cardLabels` slot and every entry of `allowedExtensions` |
| X4 | fail | Workflow `states[].property` references an existing Property |
| X5 | fail | The state machine `initialState` references an existing Property |
| X6 | warn | Workflow permissions are defined as AccessRoles |
| X7 | warn | **New in 0.14.0.** Each Survey a Workflow names — a StartForm's `requiredSurvey.surveyCode`, a transition's `requiredSurvey`, a state's `surveyTriggers[].survey` — is among the directory's Surveys. A WARN, not a FAIL, because it may already exist on the server; the apply's `--dry-run` looks it up there and refuses the workflow before its first write when it's missing |

<div className="alert alert--warning">

**Changed in 0.12.0 — a directory that exits `0` today can start exiting `1`.** Two classes of problem now surface here that used to wait until `apply`:

- **A survey's semantic errors** (check `S4` above). Those rules used to live inside the apply, so `validate --dir` passed a survey that the deploy would then refuse.
- **A `file://` reference that does not resolve** in a script field, in any kind — not just surveys. (Since 0.14.0 `validate -f` and every apply read the same fields; see [`file://` references](#file-references).)

**Nothing new is wrong with your files.** Run it once before you upgrade a CI gate and fix what it reports; the same failure was already waiting on the next `apply`.

Related, in the same release: `validate --dir` now resolves `file://` references **before** validating a survey's JavaScript, so an external `exec` hook is no longer reported as a syntax error in the literal string `file://...`.

</div>

A clean run ends with a clear verdict:

```
Results: 11 PASS, 0 WARN, 0 FAIL — ready to apply
```

Add `--json` if you want to consume the result in a script.

## Workflow mode — production readiness, online

Once a workflow is live, this mode runs the **Marcha Blanca** (go-live) checklist against it. It's an online check, so it needs a profile:

```bash
cotctl validate --workflow ordenes_compra -c prod
```

The checklist is organized in three sections, and you can run just one with `--section`:

- **Nomenclature** (`nomenclature`) — naming conventions for codes, forms, properties, and permissions.
- **Permissions** (`permissions`) — that a Manager role exists with all flow permissions, wired into the linked forms.
- **Configuration** (`configuration`) — technical rules, like control fields being read-only and an error state existing.

```bash
# only the naming checks
cotctl validate --workflow ordenes_compra --section nomenclature -c prod
```

```
Results: 13 PASS, 1 WARN, 0 FAIL — production ready
```

Checks are graded **WARN** (a recommendation) or **FAIL** (a real problem). The command exits `0` when everything passes or only warns, and `1` when at least one check fails — which is exactly what you want as a gate in a pipeline.

<div className="alert alert--info">

**`validate` exits `1` on a failure, not `2`.** Several other commands reserve `2` for a validation refusal, so this one surprises people wiring up their first gate. It holds for all three modes. [CI/CD](../ci-cd.md#exit-codes) has the full map.

</div>

<div className="alert alert--info">

**A couple of known limits.** Deep JavaScript code-quality checks on exec hooks aren't implemented, and the error-state check (T3) looks for the `_estado_error` naming convention — if your implementation names its error state differently, expect a warning even when an error state exists.

</div>

## See also

- [apply](./apply.md) — deploy your resources once validation passes
- [scaffolding](./scaffolding.md) — generate a workflow skeleton to validate and apply
