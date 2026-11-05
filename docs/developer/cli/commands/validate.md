---
title: validate
sidebar_label: validate
displayed_sidebar: developer
---

<!-- source: repositories/cotctl/src/commands/validate.ts @ 18d0110b (2026-11-04) -->

`cotctl validate` checks your YAML *before* you deploy it. Getting into the habit of validating first is one of the highest-value things you can do as a partner: it catches mistakes on your machine, in seconds, instead of as a half-applied change in a customer's environment.

There are three things you might want to validate, and `validate` has a mode for each:

| Mode | Flag | Network | What it's for |
|---|---|---|---|
| File | `-f <file>` | Offline | Check a single YAML file of any supported kind |
| Directory | `--dir <path>` | Offline (online with `--remote`) | Cross-check a whole folder of resources before `apply --dir` |
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
| Semantic | Per-type rules (a `property` question's `filters`, each filter's `tree.filter` and `creation.permissions` must be lists, a jobTitle `jobs` must be a list or `"*"`, a `survey` question needs a non-empty `surveyCode`), `function run()` in exec hooks, the JavaScript of a simplified `exec.onChange`, `exec.presave` and `exec.filter`, buttons in the wrong stage, deprecated fields | **Survey only** | `--skip-semantic-validation` |
| Remote | Identifier uniqueness across the company, and that the referenced PropertyTypes, JobTitles, Properties and `survey`-question surveys exist (with a warning for an inactive embedded survey); on a **Workflow**, the `data` entries each bot stage's type requires — warnings only — and, since 0.16.0, that the Surveys it names exist | **Survey**, and a Workflow's Surveys and bot stages | Needs `--remote` + `-c <profile>` |

Non-Survey kinds get the structural (Zod) layer only — plus, for a Workflow under `--remote`, the Survey lookup and the bot-stage check, and the Property `code` and schema-node `key` warnings described below. Remote checks reach the API, so they require a profile:

```bash
cotctl validate -f my-survey.yaml --remote -c acme
```

**Some checks run whatever the flags say.** Since 0.15.0, `validate` refuses — in both survey formats, and with `--skip-semantic-validation` too — a `subtype` the server does not accept on a `textinput`, `textnumber`, `listquestion` or `datetime` question or table column, and `dependsOn`, `showWhen` or `resetIdentifiers` at the root of a table column. It also refuses an `id` that is not a 24-character hex ObjectId — `id: ""` included — on an AccessRole, Property, PropertyType, Survey, User or Workflow, `partial: true` fragments too. See [Question types](../resources/surveys/question-types.md) and [Logic & validation](../resources/surveys/logic-and-validation.md) for the survey rules.

**Warnings never change the exit code.** A survey also gets warnings that do not refuse the file: a `showWhen` the webclient cannot honour (empty, or with more than one entry), an `exec.onChange`, `exec.presave` or `exec.filter` stage, which the webclient never runs, `subtype: long_text` on a `textinput`, and a table column's `context` or hooks that a cell cannot use. Since 0.16.0 it also warns about:

- **A `gte` or `lte` condition on a question that is neither a `textnumber` nor a `datetime`**, in both formats. The webclient compares those operators only on a number or a date, so the condition never matches and the question is never shown. Before 0.16.0 the raw format refused it and the simplified format accepted it silently.
- **`jobs: []` under `allow: jobTitle`**, which leaves the person picker with no users, and a list holding `"*"` (`jobs: ["*"]`, or `"*"` among codes), which the apply sends as the string `"*"`. `jobs: "*"` — what the webclient saves for every job title — passes with no message. A single code (`jobs: mgr`) still fails, now with `jobs must be a list, or "*" for every job title`; a missing `jobs` fails with `jobs is required when allow is "jobTitle": …`.
- **Every key a Question does not take.** Each question type sends only the keys it reads, so a `tree` or `creation` written next to a `property` question's `filters` instead of inside one of them, a `jobs` outside `personFilter`, a `min` on a `gps` question, a raw-format key such as `isActive`, or a typo used to vanish from the write without a word. One warning per key says where it belongs or which types take it; a table column gets the same.
- **A `responses#<column>` context on a question outside the table** that holds the column: the context does not see the table's rows, so it resolves empty. (It used to warn that the identifier did not exist.)

A raw `exec.onPlay.button` may leave out any of `label`, `type`, `theme` and `debounceTime`, or be `null`, as the server allows; before 0.16.0 the raw format required all four.

**Simplified exec stages are checked since 0.16.0.** The simplified format now sends a question's `exec.onChange`, `exec.presave` and `exec.filter` (see [Logic & validation](../resources/surveys/logic-and-validation.md)), so `validate` refuses one that is not an object — write `src` and `context`, plus `filter` on the `filter` stage — and, on a question, one whose JavaScript does not parse (each stage's `src` and the `filter` stage's `filter`): the server parses it when it saves the question. On a table column it only warns, since the server never parses a column's exec, and the same holds for a column's `exec.onDisplay`, `exec.onPlay`, `exec.postsave` and `exec.onSubmitSuccess`; a column's `preload` and `validate` still fail. The syntax check is semantic, so `--skip-semantic-validation` turns it off.

**Property codes and schema-node keys warn, they do not fail.** The API refuses a Property `code` shorter than 3 or longer than 50 characters, or outside `^[a-z][_a-z0-9]*$`, when it **creates** a Property, but many stored codes do not match it, a PATCH cannot change a stored code, and `validate` cannot tell a create from an update. Since 0.16.0 `validate -f` and `validate --dir` warn and exit `0` on such a code, where they used to exit `1`; an empty `code` still fails. The same goes for a PropertyType schema node `key` shorter than 3 or longer than 50 characters or outside `^[a-z][a-z0-9_]*$`, and for a `key` longer than 62 minus the length of the type's `code`. The stop has moved to the apply: its `--dry-run` refuses such a code or key whenever the apply would create it (see [apply](./apply.md#properties-and-propertytypes)). Depending on the server's configuration, an update that sends a change to a Property stored with such a code can also fail.

**Since 0.12.0 the semantic layer also runs in directory mode**, which it did not before. See the warning under *Directory mode* below: a folder that passed clean can start failing, and the failure was always there.

**The Workflow bot-stage check only warns** (new in 0.14.0). The live bot catalog marks some `data` entries as required for each bot type and version, and every apply refuses a stage that would be written without one (see [Required `data` entries](../workflow-bots/index.md#required-data-entries)). `validate -f --remote` has no stored stage to compare with, so it warns and exits `0`; the apply's `--dry-run` is where the refusal shows. It reads a stage that omits `version` on the default version and skips a `partial: true` document. Without `--remote`, and with `--dir`, it reads no catalog.

**The Surveys a Workflow names are looked up with `--remote`** (new in 0.16.0), except in a `partial: true` document. Each one — a StartForm's `requiredSurvey.surveyCode`, a transition's `requiredSurvey`, a state's `surveyTriggers[].survey` — is matched on the server whatever its case, as the apply's dry run does before its first write. One the server does not have fails the document with exit `1`, naming where the Workflow names it:

```
✗ workflow.yaml has remote validation errors:

  - Workflow "<nameCode>" SM "<sm>" state "<state>" next[target="<target>"] requiredSurvey → Survey "<code>" not found on the server
```

File mode counts only the server: a Survey declared by another document of the same file, or in a sibling file, does not count, so validate such a Workflow with `--dir`, next to its Surveys, or apply them first. A missing profile now stops such a run with its error and exit `1`, as it already stopped a Survey's check; pass `-c <profile>`, or set `COTCTL_TOKEN` and `COTCTL_API_URL`.

**Question identifiers are looked up as written** (fixed in 0.16.0). Under `--skip-semantic-validation` an identifier can reach the remote uniqueness check with a `/`, `?`, `#` or `%` in it, and the lookup used to send it unescaped, judging another identifier. The verdict now follows the whole identifier, and can turn either way: rename one that another Survey of the company already uses. Without the flag, the semantic check refuses such an identifier first.

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
| S6 | **New in 0.16.0.** A Property `code` the API refuses when it creates a Property — shorter than 3 or longer than 50 characters, or outside `^[a-z][_a-z0-9]*$` (WARN). The apply refuses it only on a create, in a dry run too |
| S7 | **New in 0.16.0.** A PropertyType schema node `key` the backend refuses when it creates the node — shorter than 3 or longer than 50 characters, or outside `^[a-z][a-z0-9_]*$` — and a `key` longer than 62 minus the length of the type's `code`, which the backend refuses on every write of the type (WARN). The apply refuses them before sending anything; see [apply](./apply.md#properties-and-propertytypes) |

And **cross-reference checks**, across files — this is what catches a property pointing at a property type that doesn't exist:

| ID | Severity | Check |
|---|---|---|
| X1 | warn | Permission strings (`name:action`) are defined as AccessRoles |
| X2 | fail | `Property.propertyType` references an existing PropertyType |
| X3 | fail | Workflow state machine PropertyType references resolve — `propertyType`, `asset.propertyType`, and since 0.12.0 each `cardLabels` slot and every entry of `allowedExtensions` |
| X4 | fail | Workflow `states[].property` references an existing Property |
| X5 | fail | The state machine `initialState` references an existing Property |
| X6 | warn | Workflow permissions are defined as AccessRoles |
| X7 | warn | **New in 0.14.0.** Each Survey a Workflow names — a StartForm's `requiredSurvey.surveyCode`, a transition's `requiredSurvey`, a state's `surveyTriggers[].survey` — is among the directory's Surveys. A WARN, not a FAIL, because it may already exist on the server; the apply's `--dry-run` looks it up there and refuses the workflow before its first write when it's missing, and so does `--remote` (R3) |

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

### Adding the remote checks: `--dir --remote`

Since **0.15.0**, `--dir` takes `--remote` (with `-c <profile>`), which used to exit `1`. After the offline checks, it runs the same remote checks `validate -f --remote` runs on every Survey and Workflow that passed them; a `partial: true` Workflow fragment is not checked remotely.

```bash
cotctl validate --dir ordenes-compra/ --remote -c acme
```

| ID | Severity | Check |
|---|---|---|
| R1 | fail / warn / pass | A Survey's remote checks, as in file mode |
| R2 | warn / pass | A Workflow's bot stages against the `data` the live bot catalog requires |
| R3 | fail / pass | **New in 0.16.0.** Each Survey a Workflow names (the ones X7 lists) is on the server or declared by a Survey of the directory, matched whatever its case. A Survey the directory declares counts wherever its file sorts, since `apply --dir` creates every Survey before any Workflow |

Its results are reported in a `Remote` section and count in the verdict: a remote FAIL exits `1`. An API error on one Survey is reported as that Survey's FAIL, and the documents after it are still checked; an API error while looking up a Workflow's Surveys is that Workflow's R3 FAIL. An expired session or a missing profile stops the run before anything is looked up — when the folder holds a Survey, or a Workflow that names a Survey the directory does not declare; otherwise the bot-stage check is reported as not run. When no document was checked remotely, the `Remote` section says why. Under `--json` the results arrive in a `remoteResults` key, present only with `--remote`, and count in `summary`.

<div className="alert alert--warning">

**Changed in 0.16.0 — `validate --dir --remote` can now fail on a Workflow.** A directory whose Workflow names a Survey that exists nowhere used to end `ready to apply` with exit `0`, while `apply --dir --dry-run` refused it. It now fails R3 with exit `1`. Correct the code, add the Survey to the directory, or apply it first. The dry run still checks more — a Survey's `permissions` and `permissionsV2`, and a bot stage that lacks required `data` — so it stays the last check before an apply.

</div>

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

**Which forms are checked.** A form is linked to the Workflow when the Workflow references it — a StartForm's `requiredSurvey`, a transition's `requiredSurvey`, a State's `surveyTriggers` — or when its `permissionsV2` grant one of the flow's TaskGroup permissions; a form linked both ways counts once. Since **0.15.0** both kinds count (before, only the second did, so a Workflow wired through its States reported `No forms linked to this workflow`), and the PASS of `Form codes follow {flow}_{type}_{desc}` names the forms it checked. A new check, `Referenced forms exist and are active` (T4), warns about every referenced form the active surveys do not include. Since **0.16.0** it reads each one: an inactive form is named by its code and marked `(inactive)`, and a reference no Survey of the company answers to is shown as the Workflow stores it — its id, or its code — marked `(not found)`. A reference whose read finds it active no longer warns.

**The flow code.** The naming checks on the flow code prefix, form codes, PropertyType codes and Property codes read the flow code from the state machine's `{code}_estados` PropertyType, so a flow fresh out of `workflows scaffold --name ordenes-compra --code oc` is checked against `oc`. When that PropertyType carries no such code — a flow built in the webclient names it `wf_<hex>_…` — they fall back to the segment of the `nameCode` before its first underscore. `Flow code prefix (2-8 chars)` applies the [`--code` rule](./scaffolding.md) of `workflows scaffold`: 2 to 8 characters, a lowercase letter, then lowercase letters or digits.

Checks are graded **WARN** (a recommendation) or **FAIL** (a real problem). The command exits `0` when everything passes or only warns, and `1` when at least one check fails — which is exactly what you want as a gate in a pipeline.

<div className="alert alert--warning">

**Since 0.15.0, a Workflow that used to pass can fail.** Checking the referenced forms means `Manager in access roles of all forms` and `_ctrl fields hidden in forms` can fail on a form they never saw — a new FAIL there is a finding the command used to miss. And a survey listing that fails no longer reads as no linked forms: every check that reads the forms FAILs with `Not checked — survey listing failed: …`, which is about the listing, not the Workflow — re-run once the listing answers. Both reach the exit code, with or without `--json`. Also: in `--json`, N1 is now named `Flow code prefix (2-8 chars)` instead of `(2-4 chars)`, so a script should pick a check by its `id`, which does not change.

</div>

A `--workflow` code that names a Group that is not configured as a Workflow says so, with the message `workflows get` gives, instead of a raw `API Error 404`; it still exits `1`.

<div className="alert alert--info">

**`validate` exits `1` on a failure, not `2`.** Several other commands reserve `2` for a validation refusal, so this one surprises people wiring up their first gate. It holds for all three modes. [CI/CD](../ci-cd.md#exit-codes) has the full map.

</div>

<div className="alert alert--info">

**A couple of known limits.** Deep JavaScript code-quality checks on exec hooks aren't implemented, and the error-state check (T3) looks for the `_estado_error` naming convention — if your implementation names its error state differently, expect a warning even when an error state exists.

</div>

## See also

- [apply](./apply.md) — deploy your resources once validation passes
- [scaffolding](./scaffolding.md) — generate a workflow skeleton to validate and apply
