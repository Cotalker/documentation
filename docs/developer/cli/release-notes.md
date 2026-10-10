---
title: Release notes
sidebar_label: Release notes
displayed_sidebar: developer
---

<!-- source: repositories/cotctl/CHANGELOG.md @ 82e613d (2026-10-10) -->

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

<!-- releases:start — the cotctl release job inserts each new release right below this line. Newest first. -->

## 0.14.0 — 2026-10-10

A large release with one idea behind most of it: **an update now changes only what your YAML says.** Until now every `apply` filled each key the YAML left out with its default before sending an update, so re-applying a file could quietly empty permission lists, reactivate records or stop a schedule's cron. From this release an omitted key keeps its stored value, an element of a keyed list is matched with its stored counterpart, re-applying a YAML that changes nothing sends nothing, and an export writes only what is stored. On top of that, **`partial: true`** lets a document edit one element of a long list — one schema node, one bot stage — without restating the rest.

The release also moves many failures from the middle of an apply to before anything is written, makes the dry run report what the apply will actually do, and brings many exit codes in line with their contract (see *Exit codes* below). And it is **the first version that checks for new versions of itself**, which means the move from 0.13.x to 0.14.0 is still a manual install — see *Version updates* under *Added*. The *Migration* checklist at the end of this section lists everything to do.

### ⚠ Breaking changes

Grouped by theme. Each group says who it affects and what to do.

#### Updates keep what your YAML leaves out

An update used to fill every key the YAML omitted with its default — `[]` for a workflow's five permission lists, a user's roles or a job title's lists, `7` for `hideClosedAfterDays`, `true` for `isActive`, `60` for a schedule's `timeoutMinutes` — and overwrite whatever the server had. Now an update carries only the keys the YAML declares, and the server keeps the rest. A create still fills every default. The same rule reaches inside nested structures:

- **Objects the server replaces whole are completed from the stored one**, so a key left out of them keeps its value: an SLA's `start`, `end`, `data` and `pb`; a bot's `parametrizedBot`; a schedule's `body`; a state machine's `asset`; a survey's `nameTranslations`, `editable`, `hidden` and `post`; a user's `hierarchy`; and a workflow slot's bot when the stored slot holds one bot. A declared list is still the complete list — except a property type's `schemaNodes`, which keep the nodes the YAML leaves out. A webhook's `context` and each survey question still travel as written.
- **List elements are matched with their stored counterpart, and keep the keys they omit**: a bot's commands by `slashCmd` (a survey command by `surveyIds`) and their `arguments` by `name`; the stages of a bot, a routine, an SLA's `pb` and a schedule's `body` by `key`, as long as they keep their bot type; a routine's `dataType` inputs and a property type's schema nodes by `key`. So a command that omits `isActive: false` stays deactivated, and a stage that omits `isCritical` keeps it. A stage is completed at its own level only: a `data` or `next` it declares travels whole. A command that is neither a slash nor a survey command is never matched and travels as written, and `apply` warns on stderr which stored keys it loses. In a routine's `dataType` and a schedule's `body.stages`, which the server updates by position, `apply` also warns which keys an element keeps from the stored one it lands on.
- **A stage that omits `version` keeps its stored version; `version: null` (or `""`) puts it back on the bot type's default.** In a schedule, which already kept the stored version, what is new is that `version: null` unpins the stage.
- **A survey trigger that omits `bots` keeps the bots stored for that survey.** It used to be sent with an empty list, which wiped them.
- **A property type update sends `viewPermissions` as written.** It used to send `[]` unless the YAML said `hidden: false`. An update that writes `hidden: true` and no `viewPermissions` still removes them, now with a warning.
- **A written `[]` now empties three lists that used to ignore it:** a bot's `extraData`, a workflow state's `next`, and a user's whole `hierarchy` when `boss`, `peers` and `subordinate` are each written as `[]` — a list left out keeps its stored value.
- **Updating an inactive User or JobTitle whose YAML omits `isActive` succeeds, and the record stays inactive.** It used to be refused — with exit `2` from `users apply` and `jobtitles apply` — unless `--allow-reactivate` was passed, which then reactivated it.

Two paths keep the old behaviour on purpose: `--legacy-replace-workflows` (on `apply` and `workflows apply`) and `surveys apply --legacy-replace` still build the update from the create defaults, so a field the YAML omits is still wiped.

- **Who this affects:** anyone whose YAML relies on leaving a key out to reset it, or on a key left out of a nested object being dropped.
- **What to do:** write every key an update must reset, with the value you want:
  - `[]` to clear a list — a workflow's permission lists, a user's `accessRoles`, a survey trigger's `bots`, a property type's `viewPermissions` — and, to empty a user's whole `hierarchy`, `[]` in each of `boss`, `peers` and `subordinate`;
  - `""` to clear a text inside one of the objects above — a translation left out of a survey's `nameTranslations` now stays stored until the YAML writes it as `""`;
  - `isActive: true` to reactivate a record (plus `--allow-reactivate` for a User or a JobTitle) or a bot command, `isCritical: false` on a stage, `required: false` on a routine input;
  - the default itself wherever you relied on it, such as `hideClosedAfterDays: 7` or `timeoutMinutes: 60`;
  - `version: null` on a stage that must go back to its bot type's default — and in a schedule, remove a `version: null` that should keep the stored version.

  The other way round, **leave out** a bot's `extraData`, a state's `next`, or a user's `hierarchy` or any one of its three lists, to keep them. `cotctl workflows scaffold` without `--states` writes `next: []` on the `in-progress` state: if that state got transitions in the webclient, remove the line or write them before re-applying. A pipeline that relied on that refusal to leave an inactive User or JobTitle untouched now gets `0` with the rest of the YAML applied — take the record out of the YAML instead.

#### Exports write only what is stored

Every `export` used to write a key the stored entity lacked with its default, and re-applying that export sent those keys as changes. Now a key the entity lacks stays out of the export, and re-applying an unchanged export sends nothing.

<details>
<summary>Keys an export no longer fills in, by kind</summary>

- `roles export`: `description`.
- `property-types export`: `isActive`, `hidden`, `viewPermissions`, `propertyImportPermissions` and `schemaNodes`; in each node `isArray`, `validators.required`, `weight`, `isActive` and `isHidden`.
- `properties export` and `webhooks export`: `isActive`.
- `jobtitles export`: `isActive`, `accessRoles`, `allowedExtensions` and `elements`.
- `users export`: `name.lastName`, `name.secondLastName`, `phone`, `accessRoles`, `extra`, `settings` and each `hierarchy` list.
- `workflows export`: `weight`, `isActive`, the five permission lists, `hideClosedAfterDays` and a state machine's `isActive`.
- `routines export`: `type`, `isActive`, `dataType` and each input's `required`.
- `slas export`: `reset`, `repeat`, the `start` and `end` lists and `data.baseDate`.
- `schedules export`: `cronTimeZone`, `timeoutMinutes`, `priority`, `owner`, `execPath`, `tags`, `hooks`, `isSystem`, `runVersion` and the keys of `exponentialBackoff`.
- `bots export`: `extraData` and `commands`; in each command `isSlash`, `isSurvey`, `showHelp`, `isActive`, `surveyIds` and `arguments`, and in each argument `isOptional`.

</details>

Two more exports changed shape. `users export` writes the hierarchy of the profile's company only; it used to fall back to the user's first company. `workflows export` leaves out a transition's `canChange` that the YAML cannot express (`task-ui`, `*`, several values) instead of turning it into `manual` or `none`, so re-applying keeps it; a transition created from such an export starts as `manual`.

Three exports still send an update when re-applied unchanged: `users export` leaves out an inactive access role, with a warning, so the re-apply removes it from the user; `routines export` writes the routine's `code` as its `display` when it stores none; and the first re-apply of a survey built in the webclient rewrites it in cotctl's shape — it reads `would-update`, not `no-op`, and the dry run's diff does not show why, since it covers the survey's root fields only.

- **Who this affects:** scripts that read keys from an exported YAML, and anyone keeping exports made with 0.13.0 or earlier — in a repository, for instance.
- **What to do:** read a missing key as the default the export used to write. **Re-export every YAML exported with 0.13.0 or earlier before re-applying it**, or it sends as changes the defaults the entity does not store. Re-export it into a scratch folder and merge it into the YAML you keep — or delete from that YAML the keys listed above — rather than overwriting a file that holds edits not yet applied. The costliest case is a schedule stored without `cronTimeZone`: the old export wrote `America/Santiago`, which moves its cron three or four hours away from the scheduler's own zone, and the `isActive: true` it wrote relaunches the cron in that zone right away. `apply` now warns about such a zone.

#### Schedules: status and cron

The scheduler stops the cron of a running schedule — status `running`, `tick` or `idle` — whenever it updates it. This release makes `apply` deal with that explicitly:

- **An update no longer changes a schedule's status.** `apply` used to leave every schedule it updated in `pending`, which reactivated a canceled one, and a YAML without `isActive` counted as active. Now only `isActive: true` or `isActive: false` activates or deactivates; an omitted `isActive` does neither.
- **With `isActive: true`, `apply` relaunches the cron right after the update** — the same call `cotctl schedules activate` makes — and shows it as `+ activate` after the code in the dry run, the confirmation prompt and the result line, and as `statusCall` under `--json`. That suffix replaces the dry run's stderr line `apply will also + activate the schedule.` The cron starts again with the new configuration once its `time` has passed.
- **A YAML that omits `isActive` leaves an updated running cron stopped**, while the status keeps reading what it read, until `cotctl schedules activate <code>` — or until the scheduler service restarts, at a moment nobody picks, such as the next deploy. `apply` exits `0` and warns on stderr.
- **A schedule that runs once is never relaunched**, since with its `time` in the past it would run again right away. `apply` warns when it updates a finished one, and when `cron: ''` empties the cron of a running one.
- **A schedule that is `done`, `error` or `incomplete` now counts as active.** `isActive` is compared with the status alone, as `cotctl schedules export` reads it: active unless `canceled`. So `isActive: false` now deactivates a finished schedule, moving it to `canceled`, and `isActive: true` alone no longer runs one again.
- **A relaunch that fails after the update exits `3`**, from `schedules apply` and `apply --dir`: the update is stored, so a re-apply would send nothing and the cron would stay stopped. A status change that fails after the update exits `1`, since a re-apply sends it again.

- **Who this affects:** anyone who applies schedules, and any script that reads their output or retries on a non-zero exit.
- **What to do:**
  - Write `isActive: true` in the YAML of every schedule whose cron must keep running — `cotctl schedules export` writes it. Write it too to reactivate a canceled schedule, which an update used to do by itself.
  - Remove `isActive: false` from a finished schedule that should keep its status, and run `cotctl schedules activate <code>` to run a finished one again.
  - On exit `3`, run `cotctl schedules activate <code>` instead of re-applying.
  - A script that read `apply will also + activate the schedule.` (or `+ deactivate`) on stderr reads the suffix after the code on stdout instead — `Would UPDATE: <code> + activate`, `Updated: <code> + activate`, the `[UPDATE]` and `[updated]` lines of `apply -d` — or `"statusCall"` under `--json`. One that matched a line ending in the code accepts the suffix.

#### `partial: true` and the `partial` key

`partial: true` is new in this release (see *Added*), and it changes how a document that already carries the key is read:

- **On a PropertyType or a Workflow, `partial: true` is now read.** 0.13.0 dropped the key without a warning and applied the document as a complete one: it refused a fragment for the required fields it left out, applied a complete document as a full update, and created the entity when none was stored. Now the document edits only the elements it names, and one whose entity is not stored is refused.
- **Any other value of the key, and the key on any other kind, is refused** before anything is sent, by `validate`, `apply -f`, `apply -d` and every per-kind `apply`. `partial` takes only `true`, and only on a PropertyType, Bot, Workflow, Routine, SLA or Schedule document. 0.13.0 dropped the key from an AccessRole, Property, User or Survey document without a word.
- **A refused partial document exits with the code its kind gives any refusal:** `1` for a PropertyType or a Workflow, `2` for a Bot, a Routine, an SLA or a Schedule, and `2` for a Workflow that names a deactivated state machine. A refused `partial` key exits `2` from `apply -f` and from the commands that give a refusal `2`, but `1` from `roles apply`, `properties apply`, `property-types apply`, `workflows apply` and `validate`; `apply -d` treats the file as one it cannot parse, exits `1`, and goes on with the other files only under `--continue-on-error`.

- **Who this affects:** anyone whose YAML already carries a top-level `partial` key.
- **What to do:** remove `partial: true` from a PropertyType or Workflow YAML that should still be applied whole, or that creates its entity. Remove the key, whatever its value, from AccessRole, Property, User, Survey, JobTitle and Webhook documents, and any value but `true` from the six kinds that take it.

#### `file://` references

- **Every kind now reads `file://` in its script fields**, not only a Survey: the `data.src` of a `CCJS` or `ESMCode` stage — in a Bot, a Routine, an SLA, a Schedule or a Workflow's bot slots — and a Survey's `src`, `editable.src`, `hidden.src` and the `src` of an `exec` hook on a question or a table column. A CCJS stage's `data.src: "file://script.js"` used to reach the server as that literal path; it is now sent as the file's content. `validate -f`, `apply -f`, `apply --dir` and every per-kind `apply` read them.
- **Only those fields.** 0.13.0 read a Survey's references in any `src` key, at any depth. A `file://` in any other `src` key now keeps its text, with a warning that `-q` does not silence; one in a key other than `src` was never read and draws no warning.
- **A reference must stay inside the YAML file's directory.** `file://../…`, an absolute path elsewhere, and a symlink that leads outside it — a linked file, or a path under a linked directory — are refused with exit `1` before the document is sent, even when the file exists; the error says where a link leads. A symlink whose target stays inside is still followed. The limit is the directory of **each file**, not the root of `--dir`, so a project with one folder per kind and a shared scripts folder beside them runs into it.
- **A reference that cannot be read fails with exit `1`** — a missing file, a directory, or a named pipe, which used to leave the run waiting forever. `validate -f` now reports it, for every document of the file; it used to pass such a reference outside a Survey and let the apply send the literal path. Outside a Survey it fails before anything is sent, unless `apply --dir --continue-on-error` skips the whole file that holds it and applies the others — the run still exits `1`, or the `2` or `3` another document gives. A Survey's fails before that Survey is sent: a multi-document `surveys apply -f` goes on with the other Surveys, while `apply --dir` stops there unless `--continue-on-error` is given — with `-y`, after writing the files before it.
- **In a `partial: true` document, a `file://` in the `data.src` of a stage written without its `name` is refused**, since the document alone cannot tell the stage's bot type.
- **The file's extension only decides a warning.** A file ending in `.js`, `.mjs` or `.cjs` is read without one; a file with any other extension is read with a warning, which `-q` silences in an apply. When the reference is a symlink, the extension that counts is the one of the file it leads to.

- **Who this affects:** anyone who keeps scripts in files referenced with `file://`.
- **What to do:** move each script — or copy its folder — under the directory of the YAML file that references it, instead of linking it, and point the reference at the new path; create the file a reference names, or write its content inline. Write inline the content of a `file://` in a `src` key that is not a script field. In a `partial: true` document, write the stage's `name` (`CCJS` or `ESMCode`). A pipeline whose `validate -f` passed a reference that `validate --dir` refused now fails at that first step.

#### Bot stages: required `data` entries and versions

- **Every apply, `--dry-run` included, refuses with exit `2` a bot stage written without a `data` entry its bot type requires** — in a Bot, a Routine, an SLA, a Schedule and a Workflow's bot slots, with or without `partial: true`. The required entries come from the live bot catalog for the stage's bot type and version, and the rule is the webclient's: an entry may not be absent, `null`, `""` or `[]`, nor may a list hold such an element (`user: ["", "u1"]` is refused as `data.user[0]`). It applies to a new stage, a stage moved to another bot type or version, and an update that drops an entry the stored stage has. A stage written over a stored one that already lacks the entry only draws a warning, so an export re-applies over the stages it came from. A catalog that cannot be read skips the check with one warning.
- **A `PBScript` stage needs `data.data`** — the routine's input — besides `data.code`, in every version. Every PBScript example cotctl shipped left it out, and the ones that passed an input put it beside `data.code`, where it never reached the routine.
- **`schedules apply` checks each stage's `version` against the catalog**, as routines, SLAs and bots already did, and refuses with exit `2`, `--dry-run` included, a version the bot type does not register, or none on a type with no default. It used to apply cleanly and fail when the schedule ran. `slas apply` now refuses the same case with `2` instead of `1`.

- **Who this affects:** anyone who applies bot stages — and especially anyone promoting an export from one company to another, as from QA to production: the check compares with the stages stored *there*, so a stage not stored there yet is new, and every entry it lacks is refused.
- **What to do:** give each entry the refusal names (`data.<key>`) a value; a stage that moves to another version needs every entry that version requires. Put a routine's input under `data.data`, and write `data: {}` when the routine takes none. **Re-export routines exported with an earlier version**: those exports lost every empty object, so their `PBScript` stage is refused where the stored one holds `data.data: {}`. For versions, write one that `cotctl bot-types versions <BotType>` lists, or leave it out on a type with a default.

#### New refusals before anything is written

Each of these used to pass `validate` and the dry run and then fail in the middle of the apply, or be stored in a way nobody intended. They are now refused up front.

**Workflows**

- **`asset.property` takes one Property code, and a `generic` asset must have it.** A generic asset with no `asset.property` or with `property: []` — `asset.property must name one Property on a generic asset: the server refuses to save the asset without it` — and any asset with a list of two or more are refused with exit `1`, `--dry-run` included, on an update too. They used to fail at the state machine's write, with a server error. A `unique` asset may still leave the key out. **What to do:** declare `asset.property` on every generic asset, with the one code the asset is — `cotctl workflows export` writes it.
- **A key the Workflow root does not declare is refused** with exit `1`. A key written one level too high — `cardLabels` at the root instead of under a state machine — used to be dropped without a word; the message says where a state machine field goes (`stateMachines[].cardLabels`), and answers a `code` or a `name` with the root's `nameCode` or `nameDisplay`. **What to do:** move the key under the state machine it belongs to, or remove it.
- **A Survey the server does not have is refused before the first write**, with exit `1`, `--dry-run` included: a transition's `requiredSurvey`, a StartForm's `requiredSurvey.surveyCode` and a state's `surveyTriggers[].survey`. The apply used to stop halfway, after creating the Group, the TaskGroup, the state machine and its states, and exit `3`. A Survey that the same `apply --dir` applies earlier counts as present. **What to do:** apply the Survey first, or add it to the directory. A cleanup step that waited for exit `3` in this case now gets `1`, with nothing left to clean.
- **A state machine whose `code` a deactivated state machine holds is refused** with exit `2`, before anything is written, `--dry-run` included. The dry run used to plan a create, and the apply wrote the Group and the TaskGroup before the server refused it. Nothing in the API updates or reactivates a deactivated state machine. **What to do:** remove it from the YAML, declare it with `isActive: false` to leave it as stored, or give it another code.

**Surveys**

- **`dateMode` takes only `date` or `date_time`**, on a `datetime` question and on a `datetime` column of a `+table`: `validate` exits `1` and an apply `2`. Any other value — `time` and `datetime` included, or an empty `dateMode:` — used to be saved as a date only, without the time of day and without a word. There is no time-only mode. **What to do:** write `dateMode: date_time` where the question should capture the time of day, and `date`, or nothing, where it should not. A `+table` column already saved as a date stays one — on a column, `date_time` is a type change the apply refuses — so capture the time in a new column.
- **A `table` question whose `max` is below 1 is refused**, with `max must be at least 1 row — remove it to keep the 50-row cap` (`validate` exits `1`, an apply `2`), even when an unedited export of such a table is re-applied. **What to do:** remove the `max`. Such a table only half works today — the webclient refuses to submit it — and without `max` it takes up to 50 rows; set a `max` of 1 or more only to actually limit the rows.
- **A YAML that would write one stored chat twice is refused** with exit `2`, `--dry-run` included. The server keeps the last write, so one of the questions used to leave the survey without a word. Two kinds of YAML do it: one that gives a new question the identifier of a stored title while keeping that title's question, and one that declares apart two questions the survey stores in one chat. **What to do:** give the new question another identifier, and declare two questions that share a chat with the `chat` format, which keeps them together.
- **A question identifier — or the title name cotctl gives a question, `<id>_label` or `<id>_label_<n>` — that another question of the company already holds exits `2` with `Identifier "<id>" cannot be reused`**, instead of `1` and the server's raw `500`. That includes a question a survey stopped declaring, which the server keeps. **What to do:** declare the question with another identifier; neither cotctl nor the public API can delete a stored question.
- **`surveys export --format` takes only `simplified` or `raw`**, in lower case. Any other value — `xml`, `json`, `RAW` — exported the simplified format and exited `0`; it now exits `1`. **What to do:** pass one of the two, or leave the flag out for the default.

**Other kinds**

- **A PropertyType schema node's `editable` block is refused** with exit `1`. The platform has no `editable` on a schema node and dropped it, `file://` included, without a word. **What to do:** remove the block; to keep users from editing the field, use `isNonEditable: true`.
- **A `name` (AccessRole, Bot), a `code` (PropertyType) or a `stateMachine` (SLA) made only of whitespace is refused like an empty one** — exit `1` for an AccessRole or a PropertyType, `2` for a Bot or an SLA. An AccessRole or a Bot used to be written named with spaces. **What to do:** give the field a value.
- **Reading a Routine found by its `code` needs the `admin-pbscripts-read` permission** — `routines get`, `routines export`, `routines test`, and an apply of a Routine document without `id` whose routine exists — because cotctl now reads it the way the webclient does. A profile without it gets `API Error 403` and exit `1`. **What to do:** grant the profile's user `admin-pbscripts-read`, the permission `routines list` already needs.
- **A batch that declares the same entity twice fails before that entity is written**, where the last document used to win: two documents of one kind with the same `code`, `name`, `email` or `nameCode` — an SLA's `code` within its state machine — in one file, or anywhere in the directory under `apply -d`. Every `apply` exits `2`; with `apply -d --continue-on-error`, the files that do not repeat it still apply, and each document skipped with the refused file is named. **What to do:** keep one document per entity — the last one, which used to win.
- **`apply --dir --dry-run` refuses a User, a JobTitle or a Survey's `permissions` that names an AccessRole by a name the directory renames away, or a role the directory leaves inactive**, with exit `2`, as the apply already did. **What to do:** write the role's new name, and remove a role the directory leaves inactive, or activate it.

#### Exit codes

What each code means as of this release — the cases in the table below now line up with it:

- **`0`** — success.
- **`1`** — the default failure: a runtime failure (the network, the server, a catalog that cannot be read), a file or `file://` reference that cannot be read, every `validate` failure, and what an AccessRole, PropertyType, Property or Workflow refuses.
- **`2`** — a YAML refused before its document was sent (other documents of the same run may have been sent) for a Survey, User, JobTitle, Bot, Routine, SLA, Schedule or Webhook, plus three refusals that exit `2` whatever the kind: an entity declared twice, a bot stage missing a required `data` entry, and a state machine `code` that a deactivated one holds. Apart from that, `2` also means a `danger` finding under `--dry-run --fail-on-destructive`, and a survey that `surveys export` cannot model.
- **`3`** — an apply that stopped partway and left something needing attention — resources a Workflow created, or a schedule whose cron relaunch failed — which wins over any other code.

These cases change:

| Command | Case | Was | Now |
|---|---|---|---|
| Every `apply`, `roles`, `properties` and `property-types apply` included | A batch declares the same entity twice | `0`, the last document won | `2` |
| `surveys apply`, `apply -f` | A survey YAML they refuse: a schema or semantic error, an identifier another survey holds, a question type change, a reference that does not resolve, a renamed `code`, an unknown AccessRole or `permissionsV2` code, a table edit its locks refuse | `1` | `2` |
| `surveys apply`, `apply -f`, `apply --dir` | A question identifier or title name another question holds | `1`, the server's raw `500` | `2`, `Identifier "<id>" cannot be reused` |
| `slas apply`, `schedules apply`, `apply --dir` | A YAML they refuse: the schema, a `cron` that does not parse, a `PBScript` stage naming a routine the company lacks, an SLA `stateMachine` missing — or ambiguous without `--task-group` — or `start` / `end` states it does not have, an unregistered bot version | `1` (`0` for a schedule stage's unregistered version, which was not checked) | `2` |
| `apply --dir` | A document its own command refuses with `2` | `1` | `2`, also after `--continue-on-error` |
| `apply --dir --dry-run` | A User, JobTitle or Survey naming an AccessRole the directory renames away or leaves inactive | `0`, or `1` | `2` |
| `bots apply`, `routines apply`, `users apply`, `jobtitles apply`, `apply -f` with a User or JobTitle | A runtime failure: a PBScript catalog that cannot be read, a User or JobTitle lookup that fails | `2` | `1` |
| `bots apply --dry-run` | An HTTP or network failure while previewing a bot | `2` | `1` |
| `apply -f`, `workflows apply -f` | A workflow apply that stopped partway, under `--rollback` too | `1` (from `workflows apply -f`, only when a failed request stopped it) | `3` |
| `workflows apply`, `apply -f`, `apply --dir` | A Survey the server does not have | `0` from a dry run; `3` (`1` from `apply -f`) after writing part of the workflow | `1`, nothing written |
| `workflows apply`, `apply -f`, `apply --dir` | A state machine `code` that a deactivated one holds | `0` from a dry run; `1` or `3` after writing the Group and TaskGroup | `2`, nothing written |
| `schedules apply`, `apply --dir` | The cron relaunch fails after the update | — | `3` |
| `users apply`, `jobtitles apply`, `apply -f`, `apply --dir` | An inactive User or JobTitle whose YAML omits `isActive` | Refused: `2` from `users apply` and `jobtitles apply`, non-zero from `apply` | `0`, applied, stays inactive |
| `jobtitles apply` | A system JobTitle's code typed back wrong at its prompt | `2` | `0`, `Apply cancelled.` |
| `surveys export` | A `--format` other than `simplified` or `raw` | `0` | `1` |
| `surveys apply --dry-run --fail-on-destructive` | The update would deactivate questions | `0` | `2` |
| `workflows apply` / `surveys apply --dry-run --fail-on-destructive` with a legacy-replace flag | The write empties a permission list | `0` | `2` |
| `apply --dir` without `-y` | Its preview finds an error, without `--continue-on-error` | Asked; a yes wrote the files before the error | The error's code, nothing asked or written |

`slas apply` and `schedules apply` still exit `1` for a request that fails while the SLA is looked up, a routine catalog that cannot be read, and a script stage without `--allow-script-bots`.

- **Who this affects:** any script or pipeline that branches on `$?`.
- **What to do:** re-check each row your scripts rely on. Even a pipeline that only tests for a non-zero exit is affected by the rows whose old or new code is `0`: it now fails, or passes, where it did not.

#### Output that scripts read

- **An entity your YAML does not change is reported as unchanged, never as updated.** The result line reads `Unchanged` from most per-kind `apply` commands, `<kind> "<identifier>" unchanged — nothing to send` from `apply -f` and `surveys apply`, and `[unchanged]` from `apply -d`; a dry run prints `No changes` (`[NO-OP]` under `apply -d`) instead of `Would UPDATE`. Each summary gains an `unchanged` count after `updated`, and `updated` counts only what was sent. Under `--json` the action is `no-op` in a dry run and `unchanged` in an apply.
- **What `--rollback` deactivated reads as rolled back, not as created**: `<kind> "<identifier>" rolled back — created, then deactivated` from `apply -f`; `[rolled-back]` and an `N rolled back` count from `apply --dir`; `Rolled back <kind>: <identifier>` from `workflows apply`, which now prints result lines after a partial apply; `"action": "rolled-back"` under `--json`.
- **Under `--json`, stdout carries only JSON.** The confirmation prompt and `Apply cancelled.` of `surveys apply`, `workflows apply` and `properties apply` print on stderr.
- **A repeated entity skipped under `apply -d --continue-on-error`** reads as a `[skip]` line, a `skipped` count in the summary, and `"action": "skipped"` under `--json`.
- **A runtime failure in a User's or a JobTitle's pre-apply checks** reads `Pre-apply checks could not run for …` instead of `Pre-apply validation failed for …`, and a failed User lookup reads `Could not look up the user by id "…"`.
- **A multi-document `surveys apply -f` goes on after a survey that fails** — its read, its write, or a `file://` it cannot read — where it used to stop the file there. The failed survey prints `Error: <code>: …` (a `"would-error"` line under `--json`), and the exit code does not change. `surveys apply` has no `--continue-on-error` to choose the old behaviour.

- **Who this affects:** scripts that parse result lines, summaries or the `action` field.
- **What to do:** accept the new values, and add the `unchanged` count to `updated` when you compare it with the number of documents. To stop at the first survey that fails, apply each survey from its own file, one call per file, and stop at the first non-zero exit.

#### Dry-run gates and interactive runs

- **`surveys apply --dry-run --fail-on-destructive` exits `2` when the update would deactivate questions.** A stored question the YAML leaves out is deactivated, and the dry run now reports it as a `danger` finding — `⚠ DANGER`, and `"ruleId": "survey.questions-deactivated"` under `--json`. 0.13.0 did not report it, so the gate passed. The gate is all or nothing: a question you remove on purpose fails it too. An unmodified export made with 0.13.0 or earlier can fail it as well, because that export misread a title named `labelQuestion<identifier>` as a question of its own and left the real one out (see *Fixed*).
- **Under `--legacy-replace-workflows` and `surveys apply --legacy-replace`, the dry run shows the write those flags make**, so `--fail-on-destructive` now exits `2` where that write empties a permission list (`workflow.permissions-wipe`, `state-machine.requiredSurvey.permissions-wipe`, `survey.permissions-wipe`). The dry run used to compare the YAML with the stored values and report those fields as preserved. `apply -f` and `apply --dir` show the same findings and still exit `0`: they have no `--fail-on-destructive`.
- **Without `-y`, `apply --dir` previews the whole directory before it asks** (see *Fixed*), and a preview that finds an error ends the run with that error's code — `2` for a refused YAML, `1` otherwise — without asking or writing anything, unless `--continue-on-error` is given. In 0.13.0 a yes applied the files before the error. A declined prompt that shows errors exits with their code, where it exited `0`.

- **Who this affects:** pipelines gated on a dry run, and scripts that answer the `apply --dir` prompt.
- **What to do:** in a gated pipeline, declare a question to keep it; to remove it on purpose, check the question the gate names and apply without the gate — a real apply ignores the flag. Re-export surveys exported with 0.13.0 or earlier before gating them. Under the legacy flags, declare the permission list to keep it, or drop the flag, whose absence merges what the YAML omits. To apply what a broken directory still holds, pass `--continue-on-error`; to skip the preview, `-y`.

### Added

- **Version updates: cotctl tells you when a newer version is out, and installs the ones without breaking changes.** Before every command but `cotctl update`, it reads the latest published version of `@cotctl/cli` from npm.

  - **In a terminal**, an update without breaking changes — a patch, such as `0.14.0` to `0.14.1` — is installed before the command, which then runs on the new version and returns its own exit code. One with breaking changes — before 1.0, a minor version bump, such as `0.14.x` to `0.15.0` — is offered on every command with three options, `update`, `continue` and `cancel`, next to the link to its release notes; `cancel` exits `0` without running the command, and choosing `update` exits `1` without running it when this copy cannot update itself, another cotctl process is installing an update, or npm fails.
  - **Without a terminal, or with `-y`/`--yes`**, it never asks and never installs: it writes a notice to stderr and runs the command, without touching stdout. A terminal means that stdin, stdout and stderr are all attached to one and the `CI` environment variable is not set, so a CI job, a pipe or redirected output count as unattended — but a script started from a terminal does not. Set `COTCTL_NO_UPDATE_CHECK=1` in such a script, or pass `-y`, so it neither installs a patch partway through nor stops at the prompt.
  - The check waits at most a second and a half, is ignored silently when it fails, and its result is kept for 12 hours next to the profiles. **`COTCTL_NO_UPDATE_CHECK=1` turns it off.**
  - Only an installation made with `npm install -g` on macOS or Linux, with write permission on npm's global directory, updates itself. A standalone binary, an installation inside a project or through `npx`, Windows, and an installation made with `sudo` are shown the command to run by hand instead. A standalone binary is also told to delete that file or replace it with the new version's: if it comes first in your `PATH`, it keeps running the old version.
  - If an automatic install fails, cotctl says so, carries on with the current version, and does not retry that version for 12 hours. A whole installation is cut off at five minutes.

  **`cotctl update`** updates to the latest version on demand, also without a terminal. It exits `0` when it updated or was already up to date, and `1` when it could not reach npm, this copy cannot update itself, another cotctl process is installing an update, or npm failed.

  **0.13.x and earlier do not carry the check**, so the move to 0.14.0 is manual: `npm install -g @cotctl/cli@0.14.0`, or replace the standalone binary with the 0.14.0 one. From then on the notices come by themselves.

  **In CI, cotctl never updates itself**: a pipeline keeps running whatever version its install step fetched, and gets a notice on stderr on every command while a newer one exists. Install a pinned version (`npm install -g @cotctl/cli@0.14.0`) rather than the latest — an unpinned install picks up the next minor release, breaking changes included, on its next run — and move the pin on purpose, after reading that release's breaking changes. Set `COTCTL_NO_UPDATE_CHECK=1` in the job to skip the lookup before every command.

- **`partial: true` edits one element of a keyed list without rewriting the others.** A PropertyType, Bot, Workflow, Routine, SLA or Schedule document that carries it names only the elements it changes. To edit one node of a property type with fifteen, write the type and that node — its `key` and the change — and the other fourteen stay as stored:

  ```yaml
  kind: PropertyType
  code: office_location
  partial: true
  schemaNodes:
    - key: address
      display: Street address
  ```

  - **What it reaches:** a property type's `schemaNodes` (by `key`); a bot's `commands` (by `slashCmd` or `surveyIds`) and their `arguments` (by `name`); a workflow's states (by `property`) with their `next` (by `target`) and `surveyTriggers` (by `survey`); and the stages (by `key`) of a bot's `parametrizedBot`, a routine's `body`, an SLA's `pb`, a schedule's `body` and the bot in each of a workflow's bot slots. It works in `apply -d`, `apply -f` (a PropertyType or a Workflow), `property-types apply`, `bots apply`, `routines apply`, `slas apply`, `schedules apply` and `workflows apply`.
  - **How it merges:** a named element is completed from its stored pair, so it may leave out what the schema otherwise requires — a node's `basicType`, a stage's `name`, a state machine's `name`, `propertyType` and `asset`, a schedule's `time` and `body`. The merged document is then validated whole: an issue in what the document writes refuses it, naming the element (`schemaNodes[key="serial"].basicType: …`), and an issue the stored entity already has elsewhere is a warning. Inside a named stage, `data` and `next` merge key by key: write one key to change it, `null` to remove it, or `{}` to empty the whole field — `next: { ERROR: notify }` reroutes one branch and keeps the others. A schedule removes no key, since its scheduler keeps them: there, a `null` or `{}` over a stored value is refused, and a branch is emptied by writing it as `""`.
  - **What it never does:** delete, reorder or create. A stored element the document leaves out keeps its place; a new one is added last with a warning — and so is an element whose key was edited, such as a survey command's `surveyIds`; a document whose entity is not stored is refused. A bot's `commands: []` deletes nothing under the marker. The one exception is a workflow bot slot written as `bots: []`, which is emptied as without the marker, deleting the bot stored there with its stages; the dry run and the apply warn of it, and `-q` does not silence that warning. A stage the merge leaves unreachable is warned of; applying the full document, without the marker and without that stage, is what deletes it.
  - **It never guesses:** an element whose key the stored list repeats, or that the document names twice, is refused before anything is sent, naming the key — and so is a declared bot in a workflow slot that stores several bots.
  - **What it reports:** the dry run lists the stored elements the document keeps (`Kept 14 schemaNodes the partial YAML does not name (partial: true deletes nothing)`), the apply names them on its result line, and `--json` carries them as `preservedElements` with `reason: "partial"`. `validate -f` and `validate -d` check a partial PropertyType or Workflow on its own, with its required fields optional; a partial Bot, Routine, SLA or Schedule is checked by `apply --dry-run`.
  - **Not covered:** a routine's `dataType` (a partial routine that declares it is refused), a survey's questions, lists of values such as permission codes, and every other kind. `--legacy-replace-workflows` refuses the marker, and editing a stored `PBScript` stage still needs `--allow-script-bots`.

- **`apply` warns on stderr before an update that takes something away or stops something** — with `--dry-run`, in an interactive apply and with `-y` alike. `-q` does not silence these warnings, and none of them changes an exit code:
  - a User losing access roles — which takes the user out of the task groups those roles grant;
  - a TaskGroup losing permission codes, list by list (a dry run reports them as findings instead: a list emptied whole as `DANGER`, any other loss as `warn`, carried in `destructiveChanges` by `workflows apply --dry-run --json`);
  - a running cron that a YAML omitting `isActive` updates, or that `cron: ''` empties;
  - a property type's view permissions emptied by `hidden: true`;
  - a Bot losing commands, each named by `slashCmd` or `surveyIds`, where a dry run used to show only the count;
  - a workflow bot slot stored with several bots, all of which the declared bot replaces;
  - a schedule stage or a routine input written over another stored one, naming the keys it keeps from it;
  - a cron moved to a time zone the schedule does not store — for `America/Santiago`, the zone an old export wrote, the warning also says to re-export.
- **More dry runs print a per-field diff.** `apply -f --dry-run` and `apply --dir --dry-run` print, under each PropertyType, Property, Workflow (with its state machines and states) or Survey, the diff the per-kind commands print. The new `--diff <mode>` sets how much — `off`, `compact` (the default) or `verbose` — `-q` drops it, and `apply --dir --json` carries the whole diff. `property-types apply --dry-run` shows what an update changes, one line per schema-node field, where it printed only `Would UPDATE`.
- **`schedules apply --json` and `apply --dir --json`** print one JSON object per line on stdout, in the shape of `surveys apply --json`: `statusCall` (`activate` or `deactivate`) when a schedule update is followed by that call, `file` under `apply --dir`, and a failed document as `"action": "would-error"` with its `error`. The prompts print on stderr. `apply -f` refuses `--json`.
- **`conditionalDisplay` takes `resetIdentifiers` on its own**, on a question no other question commands: the webclient clears those answers whenever this question's answer changes, which is what empties the answers nested under a main option. `dependsOn` and `showWhen` go together or not at all, and `resetOnHide` is refused without them. `surveys export` now writes such a reset in this form, where it used to drop it — and **earlier versions refuse a YAML that uses it**, so a team that shares exports should move to 0.14.0 together.
- **New warnings for configuration that applies and then does not work:**
  - a `+survey` question embedding an inactive survey — the backend fails to load a public survey that embeds one;
  - the survey keys the server does not store — `onlyChannelCreation`, `responders`, `representation`, `bounds` and `reassignable`: a create gets their defaults whatever the YAML says, and an update that is sent erases a value another client stored — the warning before such an erase survives `-q`;
  - `conditionalDisplay.resetOnHide: true`, which the server does not store, so it clears no answer — `resetIdentifiers` is what does;
  - a StartForm's or a transition's permission code that no active AccessRole grants — a typo, an AccessRole id where a code belongs, or a code only an inactive role grants. No user holds it, and a list made only of such codes keeps the StartForm or the transition from everyone;
  - a `bots export` whose YAML cannot be re-applied as it is, because a survey command is stored without `surveyIds`;
  - a card-label slot that `isActive` lists but that holds no PropertyType, from `workflows export`;
  - a Workflow bot stage that lacks a required `data` entry, from `validate -f --remote`.

  And `validate --dir` looks for each Survey a Workflow names among the directory's Surveys, reporting one it does not declare as a warning, since it may already exist on the server.

### Changed

- **Large companies see fewer server reads.** `apply --dir`, `surveys apply -f` and the Workflow apply look each survey code up once per pass or per file, read a Workflow's state Properties in one batched request, and read the bot-version catalog once per pass instead of once per document. The writes and the exit codes do not change.

### Fixed

- **Re-applying what you already applied changes nothing.**
  - `apply` sends only the keys whose value differs from what the server holds, and no request at all when none does. A re-apply used to write every entity again, and the write was not harmless: task groups, state machines, states, SLAs and bots were saved again, a property type pushed its schema nodes to its task groups again, a survey deactivated and reactivated all its chats, and a schedule update stopped an active cron. A survey is saved whole, so it is sent in full or not at all. A value stored in another shape — a list in another order, another type — is still sent: the cost is one extra request, never a lost change.
  - The dry run announces what the apply does. An existing entity is no longer always `would-update`, and changes the apply never sends are gone: a Bot's `extraData` and a Routine's `description`, `dynamicPropertyTypes`, `nameTranslations` and `requiredSurvey.autoCreateTask` on workflows, a Property's `schemaInstance` reference, a Survey's `permissions` under `--skip-remote-validation`, and StartForm and transition `permissions` shown as AccessRole ids.
  - A schedule's `time` and `endDate` are compared as the instant the scheduler stores, and a date-time without a zone designator means UTC, whatever the zone of the machine running cotctl — `apply` warns about one, so write it with `Z` or an offset. The scheduler ignores `owner` and `runVersion` on an update, so they no longer count as changes, and `apply` warns when they differ from the stored values.
  - A Routine is read the way the webclient reads it, so an empty object such as a `PBScript` stage's `data: {}` survives: a routine written that way converges instead of reporting the same change after every apply, and `routines export` keeps it. `routines test` no longer sends a `version: null` for the bot and its stages, which a company with `enableSecurity` refused, and `routines get --json` prints the routine as `routines list --json` does.
  - A workflow bot stored without a pinned version is no longer sent back as `version: null`, which the server's own validator rejected: a StartForm, subtask, transition or survey trigger that omitted `bots` could fail the update of its state machine or state.
- **Exports that now apply again.**
  - `workflows export` no longer fails on a state machine with a `generic` asset (`asset.property.map is not a function`); the Property code it writes resolves back on apply, and an `asset.property` with one code now applies.
  - `workflows export` leaves out a slot's `bots` when the slot stores more than one bot, with a warning, and a state's sub-workflow `subtask.target` — `apply` refused both — and the update keeps the stored values.
  - `slas export` writes `start.states` and `end.states` by Property code, so re-applying no longer fails with `state id … does not belong to the target StateMachine`.
  - `surveys export` keeps `isBulkForm` — re-applying a bulk form's export used to turn it off and take the form out of the **Actions** menu of a workflow's task view — and the `onPlay` button of a question with no `onPlay` script, which re-applying deleted.
  - `surveys export` folds a title named `labelQuestion<identifier>`, as solution presets name them, into its question. It used to export the title as a `text` question and drop the question it titles, so applying the export deactivated that question. **An export made with 0.13.0 or earlier still lacks the question: export the survey again before applying it** — with `-y`, the apply deactivates it without asking.
  - `surveys export` no longer writes `resetIdentifiers: [""]`, nor an identifier that names no question of the export — it warns instead — both of which made `validate` and every apply refuse the file it had just written.
  - In a survey built in the webclient, a question's title (`<question>_<digits>`) is no longer counted as a question the update deactivates, and the apply writes it back under its stored identifier and `_id` instead of replacing it with a new title. A real question whose identifier ends in `_label` is now named when an update deactivates it.
- **Surveys.**
  - A conditional question that depends on another conditional question keeps reacting to it, whatever their order in `questions`.
  - A survey YAML that omits `questions` is no longer refused when the survey has a table.
  - `validate -f --remote` accepts a child survey declared earlier in the same file, as `surveys apply -f` does.
  - A question the survey removed and the YAML declares again is refused with `Identifier "<id>" belongs to a question removed from this survey`, instead of a claim that another survey holds it.
  - An apply about to erase a `resetIdentifiers` stored on a question says so before writing, even under `-q`. `surveys apply --dry-run --legacy-replace` warns when a declared `editable` without `src` would delete the stored script.
  - New warnings, which `-q` silences: a `display` on a simplified question or `+table` column, which was never sent — on a `text` question the visible text is its `label`, rendered as Markdown; a `dateMode` on a type other than `datetime`; and a `resetIdentifiers` with no condition on a `text` question.
  - `surveys list --all` lists the inactive surveys too.
- **Dry runs refuse what the apply refuses.**
  - A PropertyType dry run runs the schema-node immutability check and resolves a pinned `id` as the apply does, so a changed `basicType`, or an `id` the company does not have, fails the preview too. A node that omits `subType` keeps the stored one instead of failing with `subType is immutable`, and each node is compared with the stored node it actually replaces.
  - `apply -f --dry-run` and `apply -d --dry-run` print the destructive findings they computed and never showed — a permission wipe, a deactivation, the questions an update deactivates — and an apply of a Survey, a Property or a Workflow prints the same findings on stderr before writing, with the dry run's severity; `-q` keeps them. `--dry-run` and `-y` now name the questions a survey update deactivates, in the `questions[]` and the `chat[]` formats.
  - `apply --dir --dry-run` reads a reference to what the same directory creates as the apply will find it: an SLA naming a Workflow's state machine or states; a JobTitle naming a Property, a PropertyType or an AccessRole; a Survey's `permissions`, `permissionsV2`, `+person` JobTitle, `propertiesChannel` or `propertiesLimit`; a User's access role, job title or `hierarchy`; a Property's `COTProperty` reference; a Routine's `PBScript` stage; and an AccessRole the directory renames or reactivates through its `id`. A reference to something only a later file creates is still an error, as in the apply.
  - A Workflow dry run shows its TaskGroup's fields — the permission lists, `hideClosedAfterDays`, `availableViews`, `defaultView`, `defaultSelectedTaskTab` — a StartForm moved to another Survey, a state machine's `asset`, and the `initialStateMachine` the apply sets.
  - A workflow update may leave out the `version` of a bot type with no default when the stored stage pins one; it used to be refused with `version must be specified`.
- **Prompts show the warnings while you can still decline.**
  - Without `-y`, `apply --dir` runs the directory as `--dry-run` does, with the same flags, and prints that preview before it asks. The prompt totals it — `3 CREATE · 12 UPDATE · 40 NO-OP · 1 ERROR — Apply 15 changes to dev?` — and is skipped when there is nothing to send; a file it cannot read is an `ERROR` row, as with `-y`. Each stored entity is read twice: once to preview, once to write.
  - `bots apply`, `property-types apply` and `apply -f` with property types print their warnings before the prompt, and list each entity as `CREATE`, `UPDATE`, `NO-OP` or `ERROR`. The User, JobTitle, SLA, Schedule, Webhook and Routine prompts label an unchanged entity `NO-OP`, and an interactive `workflows apply` runs its own dry run before asking. `users apply` warns about a user it creates with no password and no `--notify-email` before you confirm.
  - `property-types apply` and `apply -f` stop before the prompt, having written nothing, when planning a document fails, and report the documents they handled when another one fails.
  - A Ctrl-C at a prompt, or a system JobTitle's code typed back wrong, stops `apply --dir` — `--continue-on-error` included — and every per-kind `apply`: what was already applied is reported, and the run reads `Apply cancelled at a prompt: nothing after it was applied.`
  - The password prompt of an automatic re-login prints on stderr, so it no longer lands among `--json` lines. `routines apply` prints each warning once.
- **Workflows, property types and SLAs.**
  - `workflows apply` patches only the level the YAML touches, the Group or the TaskGroup, and a YAML whose only root field is `defaultSelectedTaskTab` now applies it.
  - A transition that omits `canChange` keeps its stored value instead of becoming `manual`.
  - A property type update sends its schema nodes in their stored order, the omitted ones in place and the new ones last; a YAML listing them in another order produced an update the server rejected as forbidden.
  - A JobTitle update that omits `accessRoles` no longer asks for the typed confirmation on the `admin` and `bot` job titles, and a User's `displayName` uses the stored last name when the YAML omits `name.lastName`.
  - The Workflow apply's warning about a routine's required `dataType` inputs reads them from `data.data`, and says when one is written beside `data.code`, where it never reaches the routine.
  - An SLA resolves a state whose Property a batched read left out, instead of refusing it as not found.
  - A workflow apply that a failed request stopped prints the result lines of what it wrote, and still exits `3`.
- **Messages, help and `--json`.**
  - `properties list --json`, `property-types list --json`, `roles list --json`, `surveys list --json` and `workflows list --json` print `[]` when nothing matches, instead of a line of text.
  - `workflows apply -q` drops the advisory warnings, as its help promises, and `surveys apply`, `workflows apply` and `properties apply` no longer print `--quiet ignored with --json`.
  - An update the server refuses for changing a read-only field, such as a `code`, names the field in every environment — `Attempted to modify a read-only field (path: /code)`, or `API Error 403` with a `Debug:` line — and keys such as `password` or `token` in that `Debug:` part read `[REDACTED]`.
  - The hint for a refused `code` change names the entity refused. For a JobTitle it gives the steps: deactivate the stored one with `cotctl jobtitles deactivate <code>`, apply the YAML without `id` to create the new `code`, and move the users to it.
  - A server `500` on a User names the write it answered: `Update rejected by server (HTTP 500)` or `Hierarchy PATCH rejected by server (HTTP 500)`.
  - A Bot or a Routine with an empty `name` or `code` is named by its position (`document <n>: name: name is required`), and messages joined with `; ` no longer carry a stray period.
  - `surveys export -o json` and `-o yaml` no longer suggest a `--format json` or `--format yaml` that does not exist. `schedules activate` and `schedules deactivate` describe what they do: `activate` sets a schedule in any status back to `pending`, and `deactivate` cancels one in any status. When the user cannot create an ApiToken, `cotctl login` points at `--paste-token`, or `--token` for a non-interactive run.

### Docs

- **The skills embedded in the CLI describe 0.14.0**: the `file://` rules, the version notice, `partial: true`, what an update sends and what it keeps, the `--json` fields `preservedElements`, `diff` and `destructiveChanges`, and `cotctl bot-types list` for the bot type catalog. The `@cotctl/cli` README describes `partial: true`.
- **Earlier guidance was corrected on these points** — worth checking if you configured from it:
  - A StartForm's or a transition's `permissions` take **permission codes**, not AccessRole ids. A list of ids matches no user and keeps the transition from everyone: replace each id with the permission code it was meant to require. `apply` now warns of a code no active AccessRole grants.
  - A `PBScript` stage passes only `data.data` to its routine (see *Bot stages* above).
  - `resetOnHide: true` has no effect; `resetIdentifiers` is what clears answers. And cotctl cannot set a survey's `onlyChannelCreation`, `responders`, `representation`, `bounds` or `reassignable`.
  - To soft-delete a routine, export it, set `isActive: false` and apply it back. A stub with a placeholder stage replaces the routine's real stages.
  - `apply --dir` applies files and documents in order: a child Survey, and the Routine a `PBScript` stage calls, must come in an earlier document or file; the Property a `COTProperty` names, in an earlier file; a User a `hierarchy` names, in the same file or an earlier one.
  - `apply -f` refuses `--continue-on-error` with exit `1`; it was described as ignored. `bots apply` asks you to type the bot name before `commands: []` deletes every command, `-y` included, while `apply --dir` names the commands in its preview instead. `apply` (`-f` or `--dir`) has no `--fail-on-destructive`, and a `danger` finding is not always asked about: `-y` skips the question and `apply --dir` never asks it. `schedules activate` leaves the cron `pending` until its `time` has passed.

### Migration

- **Install 0.14.0 by hand once** — `npm install -g @cotctl/cli@0.14.0`, or replace the standalone binary. It is the first version that announces the next ones. In CI, pin the version and set `COTCTL_NO_UPDATE_CHECK=1`; in a script started from a terminal, set it too or pass `-y`.
- **Re-export every YAML exported with 0.13.0 or earlier before re-applying it** — schedules (their time zone), surveys (`labelQuestion` titles) and routines (empty objects) above all. Export into a scratch folder and merge into the YAML you keep, rather than overwriting edits not yet applied.
- **With 0.14.0 installed, run `apply --dir --dry-run` (or each kind's `apply --dry-run`) over your YAML before you move a pipeline to it**, and fix what it refuses, such as a bot stage missing a required `data` entry (`data.data` on `PBScript`), a `generic` asset without `asset.property`, a Workflow naming a Survey the server lacks, a `dateMode` other than `date` or `date_time`, a table `max` below 1, a `file://` outside the YAML file's directory, an entity declared twice, a `partial` key.
- **Write what an update must reset** — `[]`, `""`, `isActive: true`, `version: null`, `bots: []`, `viewPermissions: []` — and leave out a bot's `extraData`, a state's `next` and a user's `hierarchy` to keep them.
- **Write `isActive: true` on every schedule whose cron must keep running**, and remove `isActive: false` from the YAML of a finished schedule that should keep its status: the apply now deactivates it.
- **Move `file://` scripts under the directory of the YAML file that references them.**
- **Re-check every branch on `$?`** against the table in *Exit codes*, and every parser of result lines or `--json` against *Output that scripts read*.
- **Re-check pipelines gated on `--dry-run --fail-on-destructive`**: a survey YAML that leaves out a stored question, and a legacy-replace write that empties a permission list, now exit `2`.
- **Move the team, and every pinned CI install, to 0.14.0 together when you share survey exports**: earlier versions refuse the `conditionalDisplay` with `resetIdentifiers` alone that 0.14.0 exports write.
- **Remove `partial: true` from PropertyType and Workflow YAML meant to be applied whole**, and any `partial` key from the kinds that do not take it.
- **Grant `admin-pbscripts-read`** to the profiles that read or apply routines by `code`.
- **Replace AccessRole ids in StartForm and transition `permissions`** with the permission codes they were meant to require.

## 0.13.0 — 2026-10-02

A reliability release for survey validation. The headline is that **a survey embedding another survey is no longer rejected because of how the embedded survey is named** — the most visible of several checks that failed on YAML that was valid, or broke outright instead of reporting an error. One gap closed in the other direction: two fields that have to be lists are now checked as lists instead of being misread.

### ⚠ Breaking changes

**A `filters` written as a map, and a jobTitle `jobs` written as a single value, now fail validation.**

On a `+property` question `filters` has to be a list, and on a `+person` question with `allow: jobTitle` so does `personFilter.jobs`. A filter missing its leading `- `, or `jobs: mgr` instead of `jobs: [mgr]`, used to pass the semantic check — `validate` exited `0`, and so did `surveys apply --dry-run --skip-remote-validation`. The apply that followed then failed without naming the problem, or looked up one JobTitle per letter of the value. Both now report `filters must be a list` or `jobs must be a list`, name the question, and exit `1`. Under any other `allow`, `jobs` is still not read and still not checked.

- **Who this affects:** anyone whose survey YAMLs write a `+property` filter without its leading `- `, or a single-value `jobs` under `allow: jobTitle` — and any survey that `0.12.0` already applied from one of those files.
- **What to do:** start each filter with `- `, and write `jobs` as a list. Then check the surveys `0.12.0` applied **with a validation flag off**: under `--skip-remote-validation` it wrote a single-value `jobs` to the survey as a string, and under `--skip-semantic-validation` it wrote a missing one as an empty list. Those surveys **export without their JobTitle codes**, and re-applying that export fails with `jobs must not be empty when allow is "jobTitle"` — add the codes back as a list before you re-apply.
- **If you branch on exit codes:** with `--skip-semantic-validation` the apply now refuses both before writing anything, and exits `2` — `1` under `apply --dir`.

### Fixed

- **A survey that embeds another survey is no longer reported as missing because of how it is named.** `surveys apply`, `apply` (`-f` or `--dir`, `--dry-run` included) and `validate --remote` resolved each `+survey` question's `surveyCode` with a search the backend matches against the survey's **name**, not its code. A sub-survey named "Agregar Producto" with code `so_add_product` came back as `Survey with code "so_add_product" not found` and the command exited `1` — on valid YAML, an unchanged `surveys export` included. The only way past it was `--skip-remote-validation`, which switches off the survey's other remote checks along with it. The check now resolves codes the same way `apply` does when it writes the reference, so the two agree on what exists: a code that no survey carries is still reported, with the same message, and a reference to an inactive survey passes.

- **A `+survey` question whose `surveyCode` is missing, empty or not a string gets an error instead of breaking the command.** A `surveyCode` such as `123` or a list stopped `validate` and `apply` outright; an empty one, or one carrying an accent or a slash, failed the apply with an HTTP 400 from the backend. They now get the usual `survey requires a non-empty surveyCode` or `Survey with code "…" not found` and exit `1`.

- **A survey that references more than ten PropertyTypes, JobTitles or Properties no longer fails on all but ten of them.** Each kind of reference was looked up in a single request, which the backend answers with at most ten results. With eleven or more distinct codes of one kind — in `+property` questions, in the JobTitles of its `+person` questions, or in `propertiesChannel` / `propertiesLimit` — the rest came back as `… not found` and the command exited `1` on valid YAML. Which codes failed depended on the backend's ordering rather than on your file, so the same reference could pass in one survey and fail in another. Each lookup now asks for every code it sends.

- **A `+property` question without `filters`, or a `+person` question without `personFilter`, is reported instead of breaking the command.** The apply stopped on an internal error that hid `property requires at least 1 filter` or `person requires personFilter` along with every other error it had already found. Those are now reported together, and the command exits `1` as it does for any other invalid survey. `validate --remote --skip-semantic-validation` broke the same way; it now completes its remote checks.

- **`properties apply`, `workflows apply` and `jobtitles apply` no longer fail with HTTP 431 when their YAML carries many long codes.** They looked codes up in requests of up to 100 whatever their length, so enough long PropertyType or Property codes made a request larger than the backend accepts. They now split them the way the survey checks do.

- **The help of `--skip-remote-validation` and of `validate --remote` names what each one covers.** `--skip-remote-validation` said "Skip remote identifier validation", but it skips the survey's remote checks of identifiers, of references to surveys, PropertyTypes, JobTitles and Properties, and of permission names. Three things still reach the API with the flag: a missing sub-survey and an unknown AccessRole in `permissions` still stop the apply, because both are resolved when the survey is written, and a YAML that sets the survey's `id` still has its `code` compared with the server's. `validate --remote` said it checked identifiers; it also checks a survey's references to surveys, PropertyTypes, JobTitles and Properties.

### Docs

The question-type reference now says that a `+property` question's `filters` and a jobTitle `jobs` have to be lists, and that a `person` question needs its `personFilter`; the troubleshooting page lists this release's new messages with their fix. The `apply --dir` page no longer says surveys are applied in reference order: they go in path order, so a child survey that does not exist yet has to sort first. The `surveys` page expands `--code` and adds that `--search` matches names.

### Migration

- **Run `validate` over your YAML before you upgrade a CI gate.** The two list rules are reported there now, and a file that breaks either one was already being misread on the next apply.
- **Re-check the surveys `0.12.0` applied from a single-value `jobs`.** They export without their JobTitle codes; add the codes back as a list before re-applying.
- **Drop `--skip-remote-validation` if you added it to get a sub-survey through.** The false `not found` it worked around is fixed, and the flag was switching off the survey's other remote checks with it.

## 0.12.0 — 2026-09-11

A consolidation release. The headline is that **`cotctl` can now authenticate from the environment**, so a pipeline no longer has to hand-write a profile file. Alongside it, two state-machine settings that could only be configured from the webclient became declarable from YAML — and, in the same pass, stopped being silently erased on every apply.

### ⚠ Breaking changes

**`validate --dir` now fails on two things it used to let through.**

A directory that exits `0` today can start exiting `1`, for either of two reasons. The first is **a survey's semantic errors** — repeated identifiers, a reserved identifier, a `dependsOn` pointing at an identifier that does not exist. Those rules ran only at apply time until now. The second is **a `file://` reference that does not resolve**, in any kind — a PropertyType carrying `editable.src: "file://missing.js"` passed as a plain string before and now fails the run.

- **Who this affects:** anyone running `validate --dir` as a CI gate over a directory of YAML.
- **What to do:** run it once before you upgrade the pipeline, and fix what it reports. Nothing new is wrong with those files — the same failure was already waiting on the next `apply`.

**`conditionalDisplay` and `command` inside a `+table` column are now rejected.**

Neither key was ever evaluated at column level: the client always renders every cell of a table. A YAML that validates and applies today stops doing both.

- **Who this affects:** anyone whose survey YAMLs put a condition on a table *column*.
- **What to do:** move the condition up to the `table` question itself, which is the level that is actually evaluated. Conditional display on a top-level question is unchanged.

**`surveys export` now exits `2`, not `1`, when the simplified format cannot represent the survey.**

This matches the contract every other input failure follows — `0` ok, `1` runtime failure, `2` invalid input. A transport or authentication failure still exits `1`.

- **Who this affects:** only a pipeline that tests for `== 1` specifically. One that treats any non-zero exit as a failure is unaffected.
- **What to do:** if you branch on the exit code, add `2`. And note this is a different `2` from the one above: a `+table` column refusal is a schema failure, which exits `1` from `validate`, `apply` and `surveys apply` alike.

**`surveys export` no longer writes `conditionalDisplay` or `command` inside a column.**

Since neither key does anything at that level, an export → edit → apply round trip was carrying a field with no effect.

- **Who this affects:** anyone who diffs exports against a file produced by an earlier version.
- **What to do:** expect the two keys to disappear from the next export. On the raw format this also removes an inert `command` value from the backend on the next apply, because a raw round trip replaces the question's content wholesale. Nothing observable changes, but the removal is real.

**`workflows apply --dry-run` reports up to two more `preserved` fields per state machine.**

Nothing about the apply changed. The two fields below stopped being wiped, and a preserved field is also a *reported* one, so the headline `N preserved` count grows.

- **Who this affects:** only a script that parses that number or diffs the dry-run output verbatim.
- **What to do:** re-baseline the expected output. There is no change in behaviour behind the new count.

### Added

- **`cotctl` can authenticate from the environment, with no profile on disk.** Export an API token and the API URL of the environment it belongs to, then drop `-c/--company`:

  ```bash
  export COTCTL_TOKEN="$CI_COTCTL_TOKEN"
  export COTCTL_API_URL="https://www.cotalker.com"
  cotctl apply -f survey.yaml --yes
  ```

  Until now a pipeline had to write `~/.cotctl/config.json` by hand, reproducing an internal file format. The configuration is now built in memory and **nothing is written to disk**. The company is read from the token itself, so it cannot disagree with the credential, and one line goes to `stderr` naming where the credential came from.

  Four things worth knowing before you wire it up:

  - **`-c` still wins.** The variables are consulted only when `-c/--company` is absent, so no existing invocation changes meaning if `COTCTL_TOKEN` happens to be exported.
  - **It fails hard when the token is rejected.** On a `401`, or once the token has expired, `cotctl` stops and names `COTCTL_TOKEN` — it does not fall back to a password prompt, and it never writes your token into a profile behind your back.
  - **A browser session token is refused.** Only an API token is accepted, and the check costs no network call.
  - **`COTCTL_COMPANY_ID` is optional and asserts which company the job expects.** A token belonging to another one stops the run before anything happens, naming both ids.

- **`cotctl login --token` logs in with no terminal attached.** It takes a pre-generated API token as an argument instead of at a prompt, in three forms: the value itself, a file path (`--token @<path>`), or standard input (`--token -`).

  ```bash
  echo "$CI_COTCTL_TOKEN" | cotctl login --token -
  ```

  **Prefer the indirect forms.** A bare value sits in the process arguments, where any process on the same host can read it. Neither indirect form can hang: `--token -` gives up after 10 seconds and stops reading at 8 KB, and `--token @<path>` warns — it does not fail — when the file is readable beyond its owner.

  **Do not name that CI variable `COTCTL_TOKEN`.** That name is reserved as an environment credential and exporting it changes the behaviour of every later command that omits `-c`.

  A CI run also needs `--yes`, and on most environments `--allow-unverified-company`: if the token's user cannot read the company record the check cannot conclude, and `--yes` deliberately does not answer that one.

- **A state machine can now declare the labels its task cards show.** Until now `cardLabels` could only be configured from the webclient. The YAML takes a slot → PropertyType **code** map, so declaring a slot is what activates it:

  ```yaml
  stateMachines:
    - code: sm_po_main
      cardLabels:
        status1: pt_po_priority
        status3: pt_po_supplier
  ```

  Slots may be sparse, and the card renders them in ascending slot order. **Omitting the key preserves whatever the webclient configured**; declaring the map deactivates every slot it leaves out, and `cardLabels: {}` deactivates all of them — `--dry-run` now says which labels the card stops showing. An unknown slot key is a validation error, and `validate --dir` resolves each slot against the PropertyTypes declared in the directory, so a typo is caught before the apply turns it into a `400`.

- **A state machine can now pin the extensions its tasks accept.** Same shape, same resolution by code:

  ```yaml
  stateMachines:
    - code: sm_po_main
      allowedExtensions:
        - pt_po_photo
        - pt_po_signature
  ```

  **An absent key and an empty list are different instructions.** Omitting the key preserves the server's list; `allowedExtensions: []` declares an empty list and **removes every extension** the state machine accepted. The list is replaced wholesale rather than merged, so an omitted entry stops being an accepted extension, and `--dry-run` reports how many would be lost.

- **`defaultSelectedTaskTab` — the tab a task opens on — now round-trips.** The field was invisible to `cotctl` in both directions, so a workflow configured from the webclient lost the setting the moment anyone rebuilt its YAML from an export. Accepted values are `notes`, `channel`, `task`, `documents` and `null`. **There is no `detail` tab** — it has been reported as one, and a `detail` value is rejected rather than sent. An omitted key preserves the server value, an explicit `null` clears it.

- **Clearing a webhook's `context` is announced before it happens.** An apply that would remove a populated `context` now names the slots being dropped and the consequence: the webhook stops being scoped and starts firing for every event of its trigger. Every path announces it — the warning channel on `--dry-run`, the confirmation preview on an interactive apply, and the warning channel again on an unattended one (`-y`, or `apply --dir`). **Including under `-q`**, which mutes only progress lines.

- **Two configuration mistakes that used to apply cleanly and then do nothing now warn.** A question declaring `dependsOn`, `showWhen`, `resetOnHide` or `resetIdentifiers` at its root — those keys only take effect inside `conditionalDisplay` — and a `preload` or `onDisplay` stage declaring `src` without `context`, which is what registers the hook. Both are warnings, not errors: no exit code changes.

- **`apply` accepts `-q, --quiet`.** `surveys apply` already had it, so until now the warnings above could not be silenced on the path that applies a whole directory.

- **`schedules logs` accepts `-v, --verbose`**, which prints the full stage output alongside the error.

- **⚠ `workflows export` output gains two fields.** `cardLabels` and `allowedExtensions` are emitted only when they are actually configured, so a workflow that uses neither exports exactly as before — but if you keep exports under version control, the shape of the document changed and it will show up in a review.

### Changed

- **`webhooks apply -q` now mutes progress lines instead of warnings.** The flag used to drop the warning channel entirely, which meant `webhooks apply -y -q` — the canonical CI shape — could clear a webhook's `context` without printing a single line. It now suppresses the per-webhook `Would CREATE` / `Would UPDATE` / `Created` / `Updated` lines; errors and destructive findings still surface. The flag, its short form and every exit code are unchanged, but a script that parsed those progress lines under `-q` was reading output the help text never promised.

### Fixed

- **`workflows apply` was silently erasing two state-machine settings on every run.** A workflow's card labels and its list of allowed task extensions were sent as fixed empty values on every request, including updates — and since the backend replaces them wholesale, **each apply cleared whatever the webclient had configured**. It happened on workflows whose YAML mentions neither field, so an apply meant to change a name or a transition also erased configuration set from the UI, with nothing in the output saying so. Both now preserve the server value on update, and both became declarable from YAML — see the two entries in *Added* above.

- **A `2xx` response carrying no document no longer reads as success.** Several endpoints answer `200` with an empty body for a request that did nothing — a patch against a record that was deleted, or one belonging to another company. `cotctl` reported the write as done and exited `0`, which in CI is indistinguishable from success. The writes now assert the document and fail naming the entity and its identifier. The same empty body on the **read** side used to read as a *hit*, which produced a string of user-visible failures now fixed:

  - **`schedules apply` never created a schedule** — every apply took the update branch.
  - **`surveys apply` reported every free question identifier as already taken**, blocking a legitimate apply.
  - **`surveys apply` refused a rename that never happened**, reporting the existing survey's code as `undefined`.
  - **`jobtitles apply` issued a patch against a nonexistent record.** It now creates, as the miss implies.
  - **`webhooks apply` reported `updated` for a write that never happened.**
  - A workflow apply could address an invalid task-group URL; it now fails naming the group.

  One exception is deliberate: creating a schedule genuinely answers empty by design, so `schedules apply` stays silent there. And `bots apply` still keeps its result when a patch answers empty — the Bot endpoints are documented to do that under some configurations — but it now **warns on `stderr`** naming the bot, so you can tell a real echo apart from a fallback.

- **A non-JSON response no longer surfaces as a parser error.** Any response that was not well-formed JSON reached the operator with no status, no URL and no body. Two reported symptoms:

  - `cotctl slas list` against an environment where the route is not routed showed `Unexpected token '<', "<html>..."`. It now reports `API Error 404: Not Found`, the method and URL invoked, the content type received, and the first 200 characters of the body.
  - `cotctl workflows export` of a workflow with no state machines showed `Unexpected end of JSON input`. An empty successful body is now an empty result, and a `404` from the state-machine endpoints means *there are none* — the command warns and continues instead of aborting, and the YAML it writes omits the key rather than emitting it empty, so it re-applies without deleting anything.

  A backend error message that **is** well-formed JSON still arrives unchanged.

- **The PropertyType report no longer claims a deletion nobody asked for was ignored.** There are two cases and the message only distinguished one. A YAML that **declares** `schemaNodes` and leaves some out is asking for a deletion, and `cotctl` still refuses it with `preserved N schemaNodes not in YAML`. A YAML that **never mentions the section** — the hand-written partial file that only touches `display` or `isActive` — asked for nothing, and now reads `kept N schemaNodes the YAML does not declare (no deletion was requested)`. Preservation itself is unchanged.

  The reference documentation for `schemaNodes` also stopped advertising a `[]` default, which implied that omitting the section and writing `schemaNodes: []` were equivalent. They are not, and that row is what led people to the message above.

- **A machine identifier pinned at login is no longer silently replaced.** The automatic re-login triggered when a token expires re-derived the identifier from the hostname and wrote it over whatever the profile held, so `cotctl login --machine-id ci-runner-3` reverted on the first re-authentication — and the minted token's code changed with it. A pinned value is now reused; a hostname-derived one keeps being re-derived, so a renamed host is still picked up. **Profiles written before this release are treated as derived** — re-run `cotctl login --machine-id <id>` once to pin the value.

- **`webhooks apply`: `context: null` now clears a webhook's `context`.** Until now it could only be emptied through a `context: {}` workaround. Omitting the key still preserves the server value, so no existing YAML applies differently.

  | YAML | Result |
  |---|---|
  | `context` omitted | preserved |
  | `context: null` | cleared (recommended) |
  | `context: {}` | cleared (legacy, still supported) |

  `context: null` is accepted on **every** trigger, including the non-task ones that reject a *populated* `context` — clearing a stale value is exactly what that validation asks you to do.

- **`apply` no longer throws away every semantic warning.** It kept only the entries marked as errors, so `validate` was the one command in the CLI that ever showed a warning — and `apply` is where the problem is actually suffered. Exit codes are unchanged: a warning stays a warning.

- **`validate --dir` accepts a survey with external `exec` hooks again.** A `src: "file://./scripts/validate.js"` reached the new semantic pass as literal text and was reported as a JavaScript syntax error. References are now resolved before validating, exactly as `validate -f` and `apply` already did.

- **A deactivated PropertyType no longer aborts `workflows apply`.** A faster batched lookup introduced in this release filtered on active records only, so a workflow referencing a deactivated PropertyType — in `propertyType`, `asset.propertyType`, a card-label slot or `allowedExtensions` — started failing with `PropertyType "<code>" not found`. Unresolved codes now fall back to an individual lookup, so the behaviour is back to what it was.

- **A workflow apply resolves its PropertyTypes in one query.** It used to ask for each code separately, per state machine: a workflow of 8 state machines with 4 distinct codes each made up to 32 requests where it now makes 1.

- **A refused `surveys export` names the question.** Several failure paths aborted the whole export with a message identifying neither the survey position nor the question. On a survey with sixty questions that is a message with nowhere to go. Each one now names the chat index and the identifier, and points at `--format raw`.

  **`--format raw` is the supported escape hatch for a legacy survey**, not just a debugging aid. It exports the survey verbatim and re-applies unchanged; it was previously mentioned only in passing.

- **A simplified export that silently dropped content now warns.** The worse failure was not the abort above but the *successful* export of an incomplete document: the YAML looks fine, gets committed, and the next apply is what removes the missing questions. Three cases now print to `stderr` naming what was left out, with `stdout` untouched so piping and `-o` are unchanged — a chat bubble of an unexpected content type, a legacy bubble packing several questions into one, and a standalone text question consumed as somebody else's label because of how its identifier is spelled.

- **A taken question identifier now says which question took it.** The message stopped at "it exists elsewhere", so you had to export in raw and dig the id out by hand. It now carries the id, the label, the type, whether the question is still active, and the export command to run. The owning survey itself cannot be named — the API offers no way to reverse that lookup.

- **`schedules logs` renders the error the backend was already sending.** A failed stage printed a date and `executed` and nothing else, while the detail sat unread in the response. The error now prints under the existing line whenever there is one. The current line and `--json` are unchanged, so a script parsing either keeps working.

- **`workflows apply` stops offering an escape hatch it rejects.** When the permission catalogue did not answer, the message suggested retrying "or skip with `--skip-remote-validation`" — a survey-only flag that every path reaching a workflow refuses, so anyone following the suggestion got an error. It now says what actually works, and states that a workflow has no bypass flag.

- **A workflow dry run says when it could not resolve the PropertyType codes.** The lookup behind `cardLabels` and `allowedExtensions` used to degrade to nothing and say so nowhere, so the diff reported no change for those fields — a dry run could look clean because the lookup had failed rather than because nothing had changed.

- **A login that supplies its own token no longer reports having created one.** With `--token` or `--paste-token` the success line read `API token "…" created` and printed a revoke URL, for a token you did not mint and a panel you may not be able to reach. Both now report `accepted` and print no revoke line.

- **`-q` said something false in seven commands, and now separates two classes of message.** The help text for `apply`, `bots apply`, `schedules apply` and `routines apply` promised to suppress non-fatal warnings without saying that a destructive finding is not one of them; on `properties apply`, `surveys apply` and `workflows apply` it announced "Only output errors" while a `⚠ DANGER` line still reached `stderr` under it. The flag's behaviour is unchanged — only the promise was false.

  Behaviour did change in one place: **`-q` now really does silence `apply`'s Workflow warnings**, which kept printing "Unknown bot type …" despite the flag. And the rule that holds everywhere: **`-q` never silences a destructive finding**, on any kind. Progress lines and advisory warnings are muted; a finding that announces data being removed is not.

- **The `--legacy-replace` warnings are in English, and no longer announce a removal that already passed.** `apply`, `workflows apply` and `surveys apply` printed their escape-hatch warning in Spanish — the only non-English runtime text in the CLI — and promised the flag would disappear in a version this release is four and five minors past. Both flags are still present and behave identically; the text now states they are deprecated with no removal version announced.

- **Smaller message fixes.** A `subfilterValue` error named the wrong field and offered no way out; it now says the value is required unless the subfilter is `*`. A `jobtitles apply` that falls back to creating because a record disappeared between listing and lookup now says so instead of doing it in silence. A workflow whose task group is missing now fails with a message naming it instead of a bare `404`. And `surveys apply` no longer prints its warnings in two different shapes — the mobile table warning now looks like every other warning.

- **The assistant guidance bundled with the CLI was corrected on five points.** These strings are compiled into the binary, so a wrong one cannot be fixed until the next release. It described two survey behaviours the CLI does not have; it taught a deprecated full-collection scan for job titles; it stated that every command requires a profile, which stopped being true with the environment credential above; it knew neither half of `schedules logs`; and it presented a `validate --dir` → `apply --dir` pipeline over twelve kinds when `validate --dir` recognises seven, so a directory holding routines, SLAs, schedules, bots or webhooks stopped at the validation step.

### Known limitations

These are named, not fixed. They are worth knowing before you build a pipeline on them.

- **`apply` never prints the destructive-findings block.** The `⚠ DANGER` / `⚠ WARNING` block a dry run shows under `surveys apply`, `workflows apply` and `properties apply` is not rendered by the generic `apply` — it computes the findings and discards them, and it declares no `--fail-on-destructive` either. For surveys, workflows and properties that block is the only place those findings surface, so **`apply --dir --dry-run` is the quietest preview available**: silent about exactly the changes that cannot be undone. Use the per-entity command when you want a preview that flags them. Webhooks are the exception — their findings also go through the warning channel, which `apply` does print.

- **`schedules list --op failed` cannot find a stage that failed inside the bot.** The scheduler does not mark the run as failed in that case, so a health check built on that filter reports green through a schedule failing every night. The gap is in the backend, not in the CLI.

- **`schedules list` accepts a single-run filter it never applies.** The flag is parsed and never forwarded, so the listing comes back unfiltered and exits `0`. Filter the `--json` output instead.

- **`-l, --limit` on `schedules list` bounds what the backend returns, and the active filter runs afterwards**, client-side — so a listing can come back shorter than the limit.

### Migration

- **Run `validate --dir` once before you upgrade a CI gate.** Two new classes of failure are reported there now, and both were already waiting on the next apply.
- **Re-export if you keep YAML under version control.** Workflow exports gain two fields, survey exports drop two keys inside table columns, and neither change is a behaviour change — but both show up as a diff.
- **Re-pin a machine identifier.** A profile written before this release is treated as hostname-derived, so run `cotctl login --machine-id <id>` once if you rely on the flag.
- **Check exit-code branches on `surveys export`.** A simplified-format refusal now exits `2` instead of `1`.

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

**A `table` question written in the simplified format is now validated exactly like the raw format.**

The simplified schema previously skipped several checks the raw format always enforced — allowed column types, no nested tables, the column count and row limits, the column identifier charset, required column headers, and the per-column-type requirements. A survey YAML with a `table` question that passed `validate` before may now be refused.

- **Who this affects:** anyone whose survey YAMLs carry `table` questions written in the simplified format. The payloads now being refused were already failing, or silently misbehaving, on the server — the missing checks only hid that until now.
- **What to do:** re-run `validate` over those files before your next apply —

  ```bash
  cotctl validate -f survey.yaml
  ```

  A new refusal means the YAML was relying on one of the gaps above, so fix it as the error describes rather than reading it as a regression.

### Added

- **`table` questions now round-trip through the CLI.** `export` writes a table's `columns` — previously dropped, so an exported YAML described a table with no columns — and `apply` validates and applies them, in both the raw and the simplified YAML formats.
- **A saved table and its columns are protected from destructive edits.** Removing the table (or changing its identifier), removing a column (or changing its identifier), changing a saved column's type, and reordering, renaming or removing a saved option — each of these would silently orphan or re-label answers already stored, so all four are now refused, in `--dry-run` as much as in a real apply. Renaming a table or a column is still fine — only the identifier is frozen — and so is adding a new column or appending new options.
- **`apply` warns when a new table won't render on mobile yet.** It works on web today; mobile support is coming in a later app release.
- **`--allow-unverified-company` on `login`** lets you continue when the environment can't confirm which company a token belongs to — see the company-verification fix below.

  ```bash
  cotctl login --url web.cotalker.com --subdomain acme --allow-unverified-company
  ```

- **`-y, --yes` on `login`** overwrites an existing profile without asking, and running `login` without a terminal now fails fast instead of hanging.

  ```bash
  cotctl login --url web.cotalker.com --subdomain acme --yes
  ```

- **`apply` reports the PropertyType schema fields it preserved**, instead of merging them back silently:

  ```
  Updated: office_location (preserved 1 schemaNode not in YAML: 'city')
  ```

  and `--dry-run` shows the same information before anything is sent. Deleting a schema field through YAML still isn't supported — use `isActive: false` to retire one.

- **These release notes are now generated automatically.** Every `cotctl` release opens a draft pull request against this page with the new section already drafted; it is reviewed and curated before it merges, so what you read here has been through a human pass.

### Changed

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
