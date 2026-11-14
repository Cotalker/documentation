---
title: validate
sidebar_label: validate
displayed_sidebar: developer
---

<!-- source: repositories/cotctl/src/commands/validate.ts, src/lib/migration-diagnostics.ts, src/lib/survey-only-flags.ts, src/lib/survey-validator.ts, src/lib/yaml-discovery.ts, docs/commands/validate.md @ acc260a9 (2026-11-14) -->

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
| Migration | **New in 0.17.0.** A form written under a name `cotctl` has replaced — `hint`, `api`, `translations.hint`, `personFilter.allow: no_filter`, `subtype: long_text` — warns (`M1`); a form a later version no longer accepts fails the document (`M2`). See [Migration diagnostics](#migration-diagnostics) | **Survey only** | Always on |
| Semantic | Per-type rules (a `property` question's `filters`, each filter's `tree.filter` and `creation.permissions` must be lists, a jobTitle `jobs` must be a list or `"*"`, a `survey` question needs a non-empty `surveyCode`, a table text column's `min` not above its `max`), `function run()` in exec hooks, the JavaScript of a simplified `exec.onChange`, `exec.presave` and `exec.filter`, buttons in the wrong stage | **Survey only** | `--skip-semantic-validation` |
| Remote | Identifier uniqueness across the company, and that the referenced PropertyTypes, JobTitles, Properties and `survey`-question surveys exist (with a warning for an inactive embedded survey); on a **Workflow**, the `data` entries each bot stage's type requires — warnings only — and, since 0.16.0, that the Surveys it names exist | **Survey**, and a Workflow's Surveys and bot stages | Needs `--remote` + `-c <profile>` |

<a id="survey-only-flag"></a>
**`--skip-semantic-validation` is Survey-only**, as in `apply` (0.17.0+). A file holding a document of another kind `apply` knows — a Routine included, which `validate` does not check — is refused once the file loads, before any document is checked, with exit `1` and nothing on stdout, `--json` included:

```
Error: --skip-semantic-validation / --skip-remote-validation are Survey-only.
The file <path> has kind: <kind>. Remove the flag or use a Survey YAML.
```

Before 0.17.0, `validate -f` accepted the flag on any kind and ignored it. Remove the flag, or validate the Surveys on their own. Directory mode refuses a directory the same way, with `Directory <path> contains <kind> documents. Remove the flag or use Survey files only.` The flag skips only the semantic checks: the schema and the [migration diagnostics](#migration-diagnostics) still run.

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

**A table's text column whose `min` is above its `max` fails** (new in 0.17.0), with exit `1`, naming the column. In the simplified format a column that leaves out `max` is compared with the 1000 it is sent with, and a quoted `min` or `max` counts as the number it spells; a raw-format column without `max` is not compared. Every apply refuses the same column, `--dry-run` included. It is a semantic check, so `--skip-semantic-validation` turns it off. See [Question types → `table`](../resources/surveys/question-types.md#table--a-grid-of-repeating-rows).

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

### Migration diagnostics

**New in 0.17.0.** A Survey form `cotctl` still accepts under an older name gets a warning, read from the YAML as written — before its `file://` references and its schema, so a document either of them refuses still gets it — and no flag skips it. Each warning names the Question or the `+table` column and ends with the [release-notes](./release-notes.md) entry that explains the form and what to write instead:

```
  ⚠ questions[identifier=plate].hint: "hint" is deprecated: write "help" (cotctl release-notes 0.10.0-C19)
```

| Legacy form | Write instead | Entry |
|---|---|---|
| `hint` | `help` | `0.10.0-C19` |
| `api` (question field) | `source` | `0.10.0-C20` |
| `translations.hint` | `translations.help` | `0.10.0-C21` |
| `personFilter.allow: no_filter` | `personFilter.allow: job` | `0.10.0-C22` |
| `subtype: long_text` on a `textinput` | `subtype: short_text` | `0.15.0-C6` |

The first four are checked in the simplified format; `subtype: long_text` in both.

`cotctl release-notes 0.10.0-C19` prints that entry, with the YAML before and after. When a Question also sets the current key, the warning says the old one is ignored: `"hint" is deprecated and ignored, since "help" is also set: remove "hint"`.

- **A warning (`M1`) leaves the document valid** and never changes the exit code. `validate -f` prints it on stderr — after the document's header, such as `document 2 (kind: Survey): `, in a file of several documents; with `--json` it is an issue of the report instead.
- **A form a later version no longer accepts (`M2`)** fails the document as a schema error does, with the same pointer. No form is removed yet.
- **Every apply runs the same diagnostics**, its dry run included, and prints them as `⚠ Survey "<code>": <line>`. An apply's `-q` silences them; `--skip-semantic-validation` does not.

<div className="alert alert--warning">

**Changed in 0.17.0 — a script that searches stderr for `[cotctl deprecation]` stops matching.** These warnings used to start with that prefix; every one now contains `(cotctl release-notes ` instead. `--skip-semantic-validation` no longer silences any of them — it used to silence the `subtype: long_text` warning and the advice to drop `hint` or `api` when `help` or `source` is also set — and in an apply, `-q` now does.

</div>

### JSON output

**New in 0.17.0**, `validate -f <file> --json` prints its result as one JSON document on stdout, in the shape [directory mode](#directory-mode--a-whole-folder-offline) gives each file. Before, the flag was accepted and ignored:

```json
{
  "file": "my-survey.yaml",
  "fileResults": [
    {
      "file": "my-survey.yaml",
      "kind": "Survey",
      "docCount": 1,
      "kindCounts": [{ "kind": "Survey", "count": 1 }],
      "severity": "warn",
      "issues": [
        {
          "id": "M1",
          "severity": "warn",
          "message": "my-survey.yaml: questions[identifier=plate].hint: \"hint\" is deprecated: write \"help\" (cotctl release-notes 0.10.0-C19)",
          "note": "0.10.0-C19"
        }
      ]
    }
  ],
  "summary": { "pass": 0, "warn": 1, "fail": 0 }
}
```

- **`fileResults` holds the file's one entry**, with the issue ids of directory mode: `S1` for a file that cannot be read or parsed or holds no document (a FAIL here, exit `1`), `S2` for an unrecognized `kind`, `S3` for a schema error, `S4` for the Survey semantic checks, `S5` to `S7` for the warnings file mode prints, `M1` and `M2` with their `note`. A document without `kind` is checked as a Survey, as file mode does without `--json`.
- **With `--remote`, `remoteResults`** lists `R1`, `R2` and `R3` as directory mode does. There is no `crossRefResults`: the cross-reference checks look across the files of a directory.
- **Only the report goes to stdout**, and `M1` and `M2` appear in it, not on stderr. An error that stops the run — a missing profile with `--remote`, or the [Survey-only](#survey-only-flag) refusal — prints nothing on stdout and exits `1`.

### `file://` references

A script can live in its own file, referenced as `file://<path>`. Since **0.14.0**, `validate` and every apply read those references in the **script fields of every kind** — not only a survey's — and nowhere else:

- **Which fields:** the `data.src` of a `CCJS` or `ESMCode` stage — in a Bot, a Routine, an SLA, a Schedule or a Workflow's bot slots — and a Survey's `src`, `editable.src`, `hidden.src` and the `src` of an `exec` hook on a question or a table column. A reference that can be read is sent as the file's content; before 0.14.0 a `CCJS` stage's `data.src: "file://script.js"` reached the server as that literal path.
- **Anywhere else**, a `file://` keeps its text and is sent as written. When the field is a `src` — a Property's `schemaInstance.src`, a `src` deeper in a survey — `validate` and the apply print a warning that `-q` does not silence. (0.13.0 read a survey's references in any `src` key, at any depth.)
- **It must stay inside the YAML file's directory.** `file://../…`, an absolute path elsewhere, or a symlink that leads outside the directory is refused even when the file exists; a symlink whose target stays inside is followed. The limit is the directory of **each file**, not the root of `--dir`, so a project with one folder per kind and a shared scripts folder beside them runs into it: move the scripts under each YAML file's directory.
- **A reference that cannot be read fails, exit `1`** — a missing file, one you can't read, or something that is not a regular file. `validate -f` reports each document that fails under its own header and still checks the rest. A file that is not `.js`, `.mjs` or `.cjs` is read with a warning.
- **In a `partial: true` document**, a `file://` in the `data.src` of a stage written without its `name` is refused: the stage keeps the bot type of the stored stage, which the document alone cannot tell. Write the stage's `name` (`CCJS` or `ESMCode`).

A pipeline whose `validate -f` passed a reference that `validate --dir` refused now fails at that first step — they read the same references the same way.

## Directory mode — a whole folder, offline

This is the one you'll use most when working with scaffolded workflows. It validates the YAML files below a folder **and** checks that they reference each other correctly — all offline. Run it right before `apply --dir`:

```bash
cotctl validate --dir ordenes-compra/
```

It reads the files `apply --dir` reads: every `.yaml` and `.yml` file below the directory, at any depth. **From 0.17.0, hidden files and folders and `node_modules` below it are skipped** without a message — a name that starts with `.`, such as `.git/`, `.claude/` or `.gitlab-ci.yml`. Before, a repository with the [Skills](../skills.md) installed locally had the example YAMLs under `.claude/skills/` validated too. The directory you pass is read even when its own name starts with `.`; to validate YAML kept in a hidden folder, pass that folder, or each file to `-f`. Symbolic links below the directory are not followed.

It runs two families of checks. **Schema checks**, per file:

| ID | Check |
|---|---|
| S1 | File parses as valid YAML |
| S2 | `kind` is present and recognized, and a top-level `partial` key, if any, is `true` on a kind that reads it |
| S3 | Document validates against the schema for its `kind` |
| S4 | **New in 0.12.0.** A survey's semantic rules — repeated identifiers, reserved identifiers, a `dependsOn` pointing at an identifier that does not exist. FAIL for errors, WARN for warnings. Since 0.17.0 `--skip-semantic-validation` skips it, as `apply --dir` does; before, it accepted the flag and ran the checks anyway |
| S5 | **New in 0.14.0.** A `partial: true` PropertyType or Workflow passed against its own fields only (WARN). It is left out of the cross-reference checks: the merged document is validated by `apply` |
| S6 | **New in 0.16.0.** A Property `code` the API refuses when it creates a Property — shorter than 3 or longer than 50 characters, or outside `^[a-z][_a-z0-9]*$` (WARN). The apply refuses it only on a create, in a dry run too |
| M1 | **New in 0.17.0.** A Survey form written under a name `cotctl` still accepts but has replaced, on a Question or a `+table` column, as in [file mode](#migration-diagnostics) (WARN). It runs ahead of S3 and S4, on the file as written |
| M2 | **New in 0.17.0.** A Survey form a later version no longer accepts, with the same pointer (FAIL). No form is removed yet |
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

<div className="alert alert--warning">

**Changed in 0.17.0 — a file that passed can now be a WARN.** A Survey that writes a legacy form gets an `M1` issue per form, so `summary` counts the file under `warn` where it counted a `pass`. The exit code does not change. Under `--json`, the `subtype: long_text` warning and the advice to drop `hint` or `api` when `help` or `source` is also set come as `M1` issues with a `note`, where they were `S4` issues.

</div>

A clean run ends with a clear verdict:

```
Results: 11 PASS, 0 WARN, 0 FAIL — ready to apply
```

Add `--json` if you want to consume the result in a script. Each issue of `fileResults[].issues` carries its `id`, `severity` and `message`, and an `M1` or `M2` issue also carries `note`, the id of its release-notes entry (`"note": "0.10.0-C19"`).

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
- **Permissions** (`permissions`) — that a Manager role exists with all flow permissions, wired into the linked forms. The flow permissions are the codes of the Workflow's permission lists, `taskExportPermissions` included since 0.17.0.
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
