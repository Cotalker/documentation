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

<!-- DRAFT - copied verbatim from the cotctl CHANGELOG for release-0.14.0.
    Before merging, rewrite it for implementation partners: give every
    breaking change a "What to do", drop the internal detail (file paths,
    PR numbers, contributor-only notes) and translate anything left in
    Spanish. Then delete this comment. -->

## 0.14.0 — 2026-10-10

### ⚠ Breaking changes

- **A `file://` reference is read only in a script field**: the `data.src` of a
  `CCJS` or `ESMCode` stage — in a Bot, a Routine, an SLA, a Schedule or a
  Workflow's bot slots — and a Survey's `src`, `editable.src`, `hidden.src` and
  the `src` of an `exec` hook on a question or a table column. 0.13.0 read a
  Survey's references in any `src` key, at any depth, so a `src` elsewhere in a
  Survey is no longer read. A `file://` in any other `src` keeps its text:
  `validate` and every apply print a warning that `-q` does not silence, naming
  the field and, in a file of several documents, the document. In a
  `partial: true` document, a `file://` in the `data.src` of a stage written
  without its `name` is refused, by `validate` and by every apply, with exit
  `1` before anything in its file is sent: the stage keeps the bot type of the
  stored stage it pairs with, which the document alone cannot tell, and a
  stored stage of another type would store the file's content as free data.

  Migration: a `file://` in another `src` of a Survey, which no documentation
  described, is now sent as the literal `file://…` text, with the warning.
  Write its content inline, or keep the script in a script field. In a
  `partial: true` document, write the stage's `name` (`CCJS` or `ESMCode`).
- **A `file://` reference that leaves the YAML file's directory through a
  symlink is refused**, by `validate` and by every apply, with exit `1` before
  its document is sent — as `file://../…` already was. That covers a linked file
  that points outside the directory, and a path under a linked directory that
  does. The check looked at the path as written while the read followed the
  link, so the content of a file outside the directory was read and sent, a
  Survey's hooks included. The error says where the link leads. A symlink whose
  target stays inside the directory is still followed.

  Migration: copy the file, or the folder, under the YAML file's directory
  instead of linking it, or write its content inline.
- **A state machine whose `asset.type` is `generic` must name its Property in
  `asset.property`**, in `validate` and in every apply, `--dry-run` included,
  with exit `1`. The server refuses to save a generic asset without its
  Property: a state machine written with no `asset.property`, or with
  `property: []`, passed `validate` and the dry run and failed at its write, in
  the middle of the apply, with a server error. Both are now refused — on an
  update too, even when the stored state machine has a Property — with
  `asset.property must name one Property on a generic asset: the server refuses to save the asset without it`.
  A `unique` asset is unchanged: `asset.property` stays optional there, and
  `property: []` still clears the stored Property. A `partial: true` document
  may leave the key out, keeping the stored Property — unless it moves the
  asset to another `asset.propertyType`, whose Properties the stored one is not
  among: the dry run then refuses it until it names one — while a
  `property: []` it writes over a generic asset is refused by the dry run and
  the apply, once merged with the stored state machine. The workflow YAML
  reference and the `cotctl-workflows` skill now say so, and the skill's example
  of a generic asset, which left the key out, declares it.

  Migration: declare `asset.property` on every `generic` asset —
  `cotctl workflows export` writes it.
- **Every apply, `--dry-run` included, refuses with exit `2` a bot stage that
  would be written without a `data` entry its bot type requires**: in a Bot, a
  Routine, an SLA, a Schedule and a Workflow's bot slots, with or without
  `partial: true`. The entries are the ones the live bot catalog marks required
  for the stage's bot type and version; the webclient does not save a stage
  while one is absent, `null`, `""` or `[]`, nor while a list holds an element
  that is, in any list: `user: ["", "u1"]` is refused as `data.user[0]`. A
  stage is refused when the stored stage it is written over has the entry and
  the update drops it — a key written `null` under the marker, a `data: {}`, or
  a full document's `data` that leaves the key out, though a Schedule's
  scheduler keeps a key its body leaves out — and when nothing is stored: a new
  stage, one that moves to another bot type or version, or an element the
  stored list does not have. That includes a new `PBScript` stage without
  `data.data`: the catalog requires it, the routine's input, besides
  `data.code`, in every version, and every PBScript example cotctl shipped left
  it out. A stage written over a stored one that already lacks the entry at
  the same place — the same element of a list, by position — or an entry above
  it, on the same bot type and version, draws only a warning, so an export
  applies again as it is over the stages it was exported from — except a Routine
  exported with an earlier version, which lost every empty object: its
  `PBScript` stage is refused where the stored one holds `data.data: {}`, until
  the routine is exported again (see *Fixed* below). A catalog that cannot be
  read skips the check with one warning.

  Migration: give each entry the refusal names (`data.<key>`) a value. A stage
  that moves to another version needs every entry that version requires. A
  `PBScript` stage carries its routine's input under `data.data`, and
  `data: {}` when the routine takes none. An export applied to another company,
  as when promoting from QA to production, or after its entity was deleted, is
  checked against the stages stored there, so a stage not stored there yet is
  new and every entry it lacks is refused.
- **Reading a routine found by its `code` needs the `admin-pbscripts-read`
  permission**: `routines get`, `routines export`, `routines test`, and
  `routines apply` or `apply -d` of a Routine document without `id` whose
  routine exists. cotctl now reads the routine through the endpoint the
  webclient uses, which checks that permission, while the one it read before
  asked only for a login — so a profile without the permission now fails
  there with `API Error 403` and exit `1`. `routines list`, and an apply of a
  document that pins its `id`, already needed it.

  Migration: grant the profile's user `admin-pbscripts-read`, the permission
  `routines list` already needs.

- **`dateMode` takes only `date` or `date_time`**, on a `datetime` question and
  on a `datetime` column of a `+table`: `validate` refuses any other value with
  exit `1`, and every apply with exit `2`, before anything is sent. Any other
  value — `time` and `datetime` included, or an empty `dateMode:` — passed both
  and was saved as a date only, without the time of day and without a word, and
  the next `surveys export` wrote no `dateMode` back. The message names the two
  values and points to `date_time`: there is no time-only mode.

  Migration: write `dateMode: date_time` where the question should capture the
  time of day, and `dateMode: date`, or no `dateMode`, where it should not —
  `date` keeps what the server has stored until now. A `+table` column already
  saved that way stays a date: on that column `date_time` is a type change the
  apply refuses, so capture the time in a new column.

- **`validate -f`, `apply -f`, `apply --dir` and every per-kind `apply` now read
  the `file://` references in the script fields of every kind, not only a
  Survey's** — which fields those are, and what a reference anywhere else does,
  is in the two `file://` entries at the top of this section. A per-kind
  `apply` reads those of the
  documents it applies, so it skips or refuses a document of another kind the
  same way whether that document's references can be read or not;
  `apply --dir` does not read those of a document whose kind it does not know,
  and `validate` and `apply -f` read those of every document. A reference that
  cannot be read fails with exit `1` — the failure `validate --dir` already
  reported, while `validate -f` passed the same file and the apply went on with
  the literal path. Outside a Survey it fails before anything is sent, unless
  `apply --dir` is given `--continue-on-error`, which skips the whole file
  that holds it, applies the other files and still exits non-zero. A Survey's
  fails before that Survey is sent: a multi-document `surveys apply -f` goes
  on with the other Surveys, and `apply --dir` stops there unless
  `--continue-on-error` is given. A reference that can be read is now sent as
  the file's content: a CCJS stage's `data.src: "file://script.js"` used to
  reach the server as that path.

  A reference must also stay inside the YAML file's directory: `file://../…`,
  or an absolute path elsewhere, is refused even when the file exists, as
  `validate --dir` and the Survey paths already refused it, and so is one that
  leaves it through a symlink. The limit is the directory of each file, not the
  root of `--dir`, so a project with one folder per kind and a shared scripts
  folder beside them runs into it.

  Migration: create the file each reference names, or write its content
  inline, and move a script that lives outside the YAML file's directory under
  it, pointing the reference at the new path. A pipeline whose `validate -f`
  passed a reference `validate --dir` refused now fails at that first step.
- **A PropertyType schema node's `editable` block is refused**, by `validate`
  and by every apply, with exit `1`. The platform has no `editable` on a schema
  node and drops the key, so the block — and any `file://` in it — never reached
  the property type, and nothing said so.

  Migration: remove the block. To keep users from editing the field, use
  `isNonEditable: true`; an `editable` with `src` belongs to a Survey.
- **A Workflow refuses a key its root does not declare**, in `validate` and in
  every apply, with exit `1`. A key written one level too high — `cardLabels` at
  the root instead of under a state machine — validated in any shape and was
  dropped without a word. The message names where a state machine field goes —
  `stateMachines[].cardLabels` — and answers a `code` or a `name` with the
  root's own `nameCode` or `nameDisplay`.

  Migration: move the key under the state machine it belongs to, or remove it.
- **A state machine's `asset.property` takes one Property code**, in `validate`
  and in every apply, with exit `1`. The server stores a single Property for
  the asset: a list of two or more passed `validate` and the dry run, and was
  refused at the state machine's write, in the middle of the apply. The message
  says so.

  Migration: keep in `asset.property` the one Property code the asset is.
- **A Workflow that names a Survey the server does not have is refused before
  its first write, `--dry-run` included, with exit `1`.** That covers a
  transition's `requiredSurvey`, a StartForm's `requiredSurvey.surveyCode` and a
  state's `surveyTriggers[].survey`, each named in the error. The apply used to
  stop halfway — after creating the Group, the TaskGroup, the state machine and
  its states — and exit `3` from `workflows apply` and `apply --dir` (`1` from
  `apply -f`), while the dry run passed. A Survey that the same
  `apply --dir` applies earlier counts as present.

  Migration: apply the Survey first, or add it to the directory. A script that
  waited for exit `3` to clean up after this case now gets `1`, with nothing
  left behind to clean.
- **`surveys export --format` takes only `simplified` or `raw`.** Any other
  value — `xml`, `json`, `yaml`, or `RAW` in capitals — exported the simplified
  format and exited `0`; it now exits `1` before anything is read. The `2` of
  this command keeps its one meaning: the simplified format cannot model the
  survey.

  Migration: pass `--format simplified` or `--format raw` in lower case, or leave
  the flag out for the default.

- **A `table` question (`+table` in the raw format) whose `max` is below 1 now
  fails validation**, with
  `max must be at least 1 row — remove it to keep the 50-row cap`: `validate`
  exits `1`, and an apply refuses that Survey before sending any of it, with
  exit `2`, `--dry-run` included. The refusal is per document, not per run:
  `apply --dir --yes` has already written the documents applied before it,
  `--continue-on-error` also writes the rest of the directory, and
  `surveys apply -f` still applies the other Surveys of the same file.
  The platform refuses such a table too, but `validate` and the dry run passed a
  `max: 0`, and only the apply failed, when the server refused the write. A
  negative `max` now reports the same message instead of `max must not be
  negative`. The other row limits are unchanged: `min` from 0 to 50, `max` up to
  50, and `min` not above `max`.
  A Survey exported from a table saved with `max: 0` before the platform began
  refusing it is refused as well, even when re-applied without edits — which
  used to end as unchanged, with nothing sent.

  Migration: remove the table's `max`. Such a table only half works today: the
  backend ignores the stored `max` on submit, but the webclient refuses to
  submit the table with any row — and with none either, when it is required.
  Without the `max`, it takes up to 50 rows everywhere. Set a `max` of 1 or more
  only to actually limit the rows: a submission with more rows is not saved.

- **`partial: true` on a PropertyType, Bot, Workflow, Routine, SLA or Schedule
  document is now read, and edits only the elements the document names** (see
  partial documents under *Added*); any other value of the key, and the key on
  any other kind, is refused (see the entry on a top-level `partial` key that
  is not `true`, below). 0.13.0 refused the
  key on a Bot, a Routine, an SLA and a Schedule. On a PropertyType or a
  Workflow it dropped the key without a warning and read a complete document:
  it refused a fragment for the required fields it left out, applied a
  complete one as a full update, and created the entity when none was stored,
  which the marker now refuses.

  Migration: remove `partial: true` from a PropertyType or Workflow YAML that
  should still be applied whole, or that creates its entity.
- **A partial document the apply refuses** — no stored entity, a key it cannot
  pair, or a merged document that is not valid — exits with the code its kind
  gives any refusal: `1` for a property type or a workflow, `2` for a bot, a
  routine, an SLA or a schedule. A workflow that names a deactivated state
  machine exits `2`, as without the marker.

  Migration: read the exit code of a refused `partial: true` document by its
  kind: `1` for a PropertyType or a Workflow, `2` for a Bot, a Routine, an SLA
  or a Schedule, and `2` for a Workflow that names a deactivated state machine.
  To create the entity, remove `partial: true` and declare the document in
  full.

- **An update no longer resets the keys your YAML omits.** Every `apply` — `-f`,
  `-d` and the per-kind `apply` commands — used to fill each omitted key with its
  default before sending an update: `[]` for a workflow's five permission lists,
  a user's roles or a job title's lists, `7` for `hideClosedAfterDays`, `true`
  for `isActive`, `60` for a schedule's `timeoutMinutes`, and so on. That
  overwrote whatever the server had. An update now carries only the keys the YAML
  declares, and the server keeps the rest; a create still fills every default. To
  clear a list on purpose, write it as `[]`. Only two paths keep the old
  behavior, on purpose: `--legacy-replace-workflows` (on `apply` and
  `workflows apply`) and `surveys apply --legacy-replace` still build the update
  with the create defaults, so a field the YAML omits is still wiped. Inside an
  object the server replaces whole, the keys the YAML omits are kept too — see the
  entry below on objects the server replaces whole.

  Migration: write each key an update must reset, with the value you want:
  `[]` to clear a list, such as a workflow's permission lists or a user's
  `accessRoles`; `isActive: true` to reactivate; or the default itself, such as
  `hideClosedAfterDays: 7` or `timeoutMinutes: 60`. A key the YAML leaves out
  now keeps its stored value. Reactivating a user or a job title also needs
  `--allow-reactivate`.
- **A written `[]` now empties three lists that used to ignore it:** a bot's
  `extraData`, a workflow state's `next`, and a user's `hierarchy` when all three
  of `boss`, `peers` and `subordinate` are empty.

  Migration: to keep a stored `extraData`, a state's `next` or a user's
  `hierarchy`, leave the key out of the YAML — an omitted key keeps its stored
  value — and write `[]` only to empty it, which for `hierarchy` means in each
  of `boss`, `peers` and `subordinate`. `cotctl workflows scaffold` without
  `--states` writes `next: []` on the workflow's `in-progress` state: if that
  state got transitions in the webclient, remove the line or write them before
  re-applying.
- **Updating a schedule no longer changes its status.** `apply` used to leave
  every schedule it updated in `pending`, which reactivated a canceled one, and a
  YAML without `isActive` counted as active. Now the update keeps the status: only
  `isActive: true` or `isActive: false` activates or deactivates, and an omitted
  `isActive` does neither. The flip side: updating a schedule whose cron runs —
  status `running`, `tick` or `idle` — with a YAML that omits `isActive` stops
  its cron, although the status keeps reading what it read, until you run
  `cotctl schedules activate <code>`, or until the scheduler service restarts: a
  restart relaunches it on its own, with the new configuration, at a moment
  nobody picks, such as the next deploy.

  Migration: write `isActive: true` in the YAML of each schedule whose cron
  must keep running — `cotctl schedules export` writes it — so that `apply`
  relaunches the cron right after the update. An apply that changes a running
  schedule from a YAML that omits `isActive` stops its cron, exits `0` and only
  warns on stderr: run `cotctl schedules activate <code>` to relaunch it. To
  reactivate a canceled schedule, which an update used to do, write
  `isActive: true` too.
- **Updating an inactive user or job title whose YAML omits `isActive` now
  succeeds, and the record stays inactive.** `apply` used to read the omitted key
  as `isActive: true` and refused the update unless you passed
  `--allow-reactivate`, which then reactivated the record; `users apply` and
  `jobtitles apply` exited 2. Now the rest of the YAML is applied and the record
  is left inactive. `--allow-reactivate` only matters for a YAML that writes
  `isActive: true`.

  Migration: a pipeline that counted on that refusal — exit `2` from
  `users apply` and `jobtitles apply` — to leave an inactive record untouched
  now gets `0`, and the rest of the YAML is applied. Take the record out of the
  YAML to leave it as stored; to reactivate it, write `isActive: true` and pass
  `--allow-reactivate`.
- **A property type update sends `viewPermissions` as written.** It used to send
  `[]` unless the YAML said `hidden: false`, so updating a hidden type, or one
  whose YAML omitted `hidden`, wiped its view permissions. Creating a hidden type
  still drops them, and so does an update that writes `hidden: true` and no
  `viewPermissions`.

  Migration: write `viewPermissions: []` to remove a property type's view
  permissions on update. A YAML that omits both that key and `hidden: true`
  now keeps the stored ones, and a list it writes is stored even on a hidden
  type; `hidden: true` without the key still removes them, with a warning.

- **Inside an object the server replaces whole, the keys your YAML omits keep
  their stored value.** An update used to send such an object exactly as
  declared, so the server dropped every key the YAML left out, or put back its
  default. `apply` now completes the declared object from the stored one: an
  SLA's `start`, `end`, `data` and `pb`; a bot's `parametrizedBot`; a schedule's
  `body`; a state machine's `asset`, whose `property` — which a `generic` asset
  must declare — is kept only while the asset keeps its property type; a
  survey's objects — `nameTranslations`,
  `editable`, `hidden` and `post`; a user's `hierarchy`; and the bot of a
  workflow slot (`bots` under a
  StartForm, `subtask`, a transition or a survey trigger) when the stored slot
  holds one bot. A key you write still wins, a written `[]` still empties, and a
  declared list is still the complete list — except a property type's
  `schemaNodes`, which keep the nodes the YAML leaves out: the server rejects an
  update that removes one. The flip side: leaving a key out of one of these
  objects no longer removes it. Two things still travel as written: a webhook's
  `context`, because deliveries match it whole, and each question a survey YAML
  declares, which keeps only its stored `_id`, matched by identifier.

  Migration: to clear a key in one of these objects, write it with an empty
  value — `""` for a text, `[]` for a list — instead of leaving it out. A
  translation left out of a survey's `nameTranslations`, for instance, now
  stays stored until the YAML writes it as `""`.
- **Each command, stage, input and schema node keeps the keys it omits, matched
  with its stored counterpart.** A bot command is matched by `slashCmd`, a survey
  command by its `surveyIds`, and a command's `arguments` by `name`; a stage of
  a bot, a routine, an SLA's `pb` or a schedule's `body` by `key`, as long as it
  keeps its bot type; a routine's `dataType` input by `key`; a property type's
  schema node by `key`. So a command that omits `isActive: false` stays
  deactivated, a stage that omits `isCritical` keeps it, and an input that omits
  `required` keeps it wherever the YAML moves it in the list. A stage is
  completed at its own level only: a `data` or `next` it declares travels whole.
  An element with no stored counterpart travels as written — plus, in a
  routine's `dataType` and a schedule's `body.stages`, the defaults the YAML
  omits (`required: false`; `isCritical: false` and `version: null`, the bot
  type's default): the server updates those lists by position, not by key, so
  without them the element would take the values of the stored one it lands on.
  Any other key it omits still keeps that stored element's value — an input's
  `description` or `type`, a key of a stage's `data` or `next` — and so does an
  element that moved onto another stored one; `apply` warns on stderr which
  stored keys each one keeps, so you can write them with an empty value. A
  schedule stage stored with `version: null`, as the platform saves it, sends it
  back, so a stage the YAML leaves as stored stays lined up with itself. And in
  a schedule, a key the YAML removes from a stage's `data` or `next` usually
  stays stored.
  A command that is neither a slash nor a survey command is never
  matched: it travels as written, and `apply` warns on stderr — with
  `--dry-run` and with `-y` alike — which stored keys it loses. An element
  whose key appears twice, in the YAML or in the stored list, is treated the
  same way.

  Migration: write each key a command, stage, input or schema node must reset,
  such as `isActive: true` to reactivate a command, `isCritical: false` on a
  stage or `required: false` on an input: a key left out keeps the value of
  the stored element it is matched with. To clear a key `apply` names on
  stderr, write it with an empty value.
- **A workflow survey trigger that omits `bots` keeps the bots stored for that
  survey.** It used to be sent with an empty list, which wiped them. Write
  `bots: []` to empty them on purpose; creating a state still starts the
  trigger with no bots.

  Migration: write `bots: []` on a survey trigger whose stored bots must be
  removed; a trigger that leaves `bots` out now keeps them.
- **A stage that omits `version` now keeps its stored version; `version: null`
  goes back to the bot type's default.** In a bot, a routine, an SLA's `pb` and a
  workflow's bots an omitted `version` used to mean the default, because the
  stage was replaced whole; a schedule already kept its stored version, and what
  is new there is that `version: null` removes it. To unpin a stage, write
  `version: null` (or `version: ""`). So an update of a routine, an SLA, a bot
  or a workflow may leave out the `version` of a bot type with no default
  (`PBReport`, `PBCalendar`) when the stored stage the update pairs it with
  pins one.
  A kept version that the catalog no longer registers only draws a warning,
  since the update leaves it as it is; a version the YAML writes is still
  refused when it is not registered.

  Migration: write `version: null` on a stage that must go back to its bot
  type's default version, since one that leaves `version` out now keeps the
  stored version. In a schedule, remove a `version: null` that should keep the
  stored version: it now unpins the stage.

- **An entity your YAML does not change is reported as unchanged, never as
  updated.** Most per-kind `apply` commands print it as `Unchanged`; `apply -f`
  and `surveys apply` as `<kind> "<identifier>" unchanged — nothing to send`,
  and `apply -d` as `[unchanged]`. `--dry-run` prints `No changes` (`[NO-OP]`
  under `apply -d`) instead of `Would UPDATE`. Each summary gains an
  `unchanged` count after `updated`, and `updated` now counts only what was
  sent. With `--json`, such an entity carries the new action `no-op` in a dry run
  and `unchanged` in an apply. A script that parses these lines, the summaries or
  the `action` field has to accept the new values. Exit codes do not change.

  Migration: a script that reads an apply's result lines takes `Unchanged`,
  `unchanged — nothing to send`, `[unchanged]` and `"action": "unchanged"` as
  success, and a dry run's `No changes`, `[NO-OP]` and `"action": "no-op"` as
  nothing to send. One that compares the `updated` count with the number of
  documents adds the `unchanged` count to it.
- **A batch that declares the same entity twice now fails before anything is
  written, where before the last document won.** Two documents of one kind with
  the same identifier — its `code`, `name`, `email` or `nameCode`, or an SLA's
  `code` within its state machine — in one file, or anywhere in the directory
  under `apply -d`, are refused with an error naming the identifier, and under
  `apply -d` the files that declare it. Keep one document per entity. With
  `apply -d --continue-on-error`, the files that do not repeat it still apply.

  Migration: a batch that relied on the last document of a repeated entity
  winning now exits `2` instead of `0`, and none of the documents that repeat it
  is written. Keep only the one that used to win, the last.

- **With `isActive: true`, `apply` relaunches the cron of a schedule it
  updates.** The scheduler stops the cron of a schedule in `running`, `tick` or
  `idle` when it updates it, so when the YAML writes `isActive: true`, `apply`
  relaunches the cron right after the update — the same call
  `cotctl schedules activate` makes — and shows it as `+ activate` after the
  code in the dry run, the confirmation prompt and the result line. The dry run
  no longer prints `apply will also + activate the schedule.` (or
  `+ deactivate`) on stderr: the suffix on stdout replaces it. The cron starts
  again with the new configuration once its `time` has passed — until then it
  stays `pending` — and first fires at its next match after that. If the
  relaunch fails, the error says the update was applied and the cron stays
  stopped: a re-apply sends nothing, since the update is stored, so run
  `cotctl schedules activate <code>`. A schedule that runs once is never
  relaunched, since with its `time` in the past it would run again right away:
  `apply` warns instead when it updates a finished one, and when the YAML
  empties the cron of a running one (`cron: ''`) — the update stops that cron
  and leaves a schedule that runs once, which a restart does not relaunch
  either. A YAML that omits `isActive` still leaves the cron stopped, and
  `apply` now warns about it (see *Added*).

  Migration: a script that read `apply will also + activate the schedule.` (or
  `+ deactivate`) on stderr reads the suffix after the code on stdout instead —
  `Would UPDATE: <code> + activate`, `Updated: <code> + activate`, and the
  `[UPDATE]` and `[updated]` lines of `apply -d` — or `"statusCall"` under
  `--json`. One that matched a line ending in the code accepts the suffix.
- **A schedule that is `done`, `error` or `incomplete` now counts as active,
  so `isActive` treats it like a running one.** `isActive` in a schedule YAML
  is compared with the schedule's status alone, as `cotctl schedules export`
  reads it: active unless `canceled`. `apply` used to read the stored `isActive`
  field first, which `/activate` and `/deactivate` never move, and counted
  `done`, `error` and `incomplete` as inactive: a running schedule stored with a
  stale `isActive: false` was never deactivated by `isActive: false`, and
  re-applying the export of a finished schedule sent an `/activate` for it. For
  a YAML you already have, two things change, both in what `--dry-run` and the
  prompt announce and in the calls the apply makes: `isActive: false` now
  deactivates a `done`, `error` or `incomplete` schedule, and `isActive: true`
  no longer reactivates one by itself — a cron is relaunched only when the
  update changes something, such as an extended `endDate`, and a schedule that
  runs once never is. To run a finished schedule again, use
  `cotctl schedules activate <code>`. An omitted `isActive` still neither
  activates nor deactivates.

  Migration: run `cotctl schedules activate <code>` to run a `done`, `error` or
  `incomplete` schedule again: `isActive: true` alone no longer does. Remove
  `isActive: false` from the YAML of a finished schedule that should keep its
  status — the apply now deactivates it, which moves it to `canceled`.
- **Exports write only what is stored.** Every `export` used to fill in, with
  its default, a key the stored entity lacked, and re-applying that export sent
  those keys as changes. Now a key the entity lacks stays out of the export, and
  re-applying an unchanged export sends nothing — which is also what leaves a
  running schedule's cron alone, since an update stops it. By kind, the keys no
  longer filled in:
  - `roles export`: `description`.
  - `property-types export`: `isActive`, `hidden`, `viewPermissions`,
    `propertyImportPermissions` and `schemaNodes`, and in each node `isArray`,
    `validators.required`, `weight`, `isActive` and `isHidden`.
  - `properties export`: `isActive`.
  - `jobtitles export`: `isActive`, `accessRoles`, `allowedExtensions` and
    `elements`.
  - `users export`: `name.lastName`, `name.secondLastName`, `phone`,
    `accessRoles`, `extra`, `settings` and each `hierarchy` list. The hierarchy
    is also the profile company's alone: it used to fall back to the user's
    first company when the profile company had no entry.
  - `workflows export`: `weight`, `isActive`, the five permission lists,
    `hideClosedAfterDays` and a state machine's `isActive`. A transition's
    `canChange` the enum cannot express (`task-ui`, `*`, several values) is left
    out instead of being normalized to `manual` or `none`, so re-applying keeps
    it; a transition created from such an export starts as `manual`.
  - `routines export`: `type`, `isActive`, `dataType` and each input's
    `required`.
  - `slas export`: `reset`, `repeat`, the `start` and `end` lists and
    `data.baseDate`.
  - `schedules export`: `cronTimeZone`, `timeoutMinutes`, `priority`, `owner`,
    `execPath`, `tags`, `hooks`, `isSystem`, `runVersion` and the keys of
    `exponentialBackoff`.
  - `webhooks export`: `isActive`.
  - `bots export`: `extraData` and `commands`, and in each command `isSlash`,
    `isSurvey`, `showHelp`, `isActive`, `surveyIds` and `arguments`, and in each
    argument `isOptional`.

  A script that reads those keys from an exported YAML has to accept their
  absence. Applying an export elsewhere still creates the entity with the same
  defaults, but on one that already exists there it no longer overwrites those
  keys with defaults.

  Three exports still send an update when re-applied unchanged:
  - `users export` leaves out an access role that is not active, and warns for
    each one, so the re-apply removes it from the user;
  - `routines export` writes the routine's `code` as its `display` when the
    routine stores none, since the schema requires one;
  - `surveys export` of a survey built in the web app: its first re-apply reads
    `would-update`, never `no-op`, and rewrites the survey in cotctl's shape.
    cotctl writes the survey and every question whole, with values the web app
    does not store — such as `onlySubSurvey`, empty scripts and translations,
    and `twoColumns` — a date question's labels in Spanish, and the chats
    numbered from 0. The dry run's diff does not show it, since it covers the
    survey's root fields only. A survey cotctl created reads `no-op`.

  And an export made with 0.13.0 or earlier filled in the defaults listed above:
  re-export before re-applying it, or it sends as changes the ones the entity
  does not store. For a schedule stored without `cronTimeZone`, that moves its
  cron from the scheduler's own zone to `America/Santiago`, three or four hours
  away, and the `isActive: true` that export writes for every schedule that is
  not canceled relaunches the cron in the new zone right away. `apply` warns
  about such a zone (see *Added*).

  Migration: a script that reads one of those keys from an export reads its
  absence as the default the export used to write in its place. Re-export a YAML
  exported with 0.13.0 or earlier before re-applying it.
- **A YAML document whose top-level `partial` key is not `true`, or that
  carries the key on a kind the marker does not cover, is refused.** On a
  property type, bot, workflow, routine, SLA or schedule document,
  `partial: true` edits only the elements the document names (see
  partial documents under *Added*) and any other value — `false`, `null`, a
  string, a number — is refused; on any other kind, the key is refused
  whatever its value. 0.13.0 dropped the key from a property type, access
  role, property, user, workflow or survey document without a word and
  applied the document as if it were complete. On a bot, routine, SLA,
  schedule, job title or webhook document it already refused the key, with
  `Unrecognized key: "partial"`: the message now says that the key takes only
  the value `true`, or why the document's kind has no list the marker covers.
  Every command that reads YAML refuses such a document before anything is
  sent: `apply -f`, `apply -d`, every per-kind `apply` and `validate`. The exit
  code is the one each command gives a validation refusal — `2` for
  `apply -f` — while `apply -d` treats the file as one it cannot parse and
  exits `1`: it goes on with the other files only under `--continue-on-error`
  — without `-y`, the file is an `ERROR` row of the preview, which goes on to
  its prompt only under that flag. Remove the key and write the document in
  full.

  Migration: a pipeline whose YAML carries a top-level `partial` key that
  0.13.0 dropped — any value on an access role, property, user or survey
  document, any value but `true` on a property type or workflow document — now
  fails on that file before any of it is sent — `2` from `apply -f`, `1` from
  `apply -d`. Remove the key and declare the document in full.
- **`surveys apply --dry-run --fail-on-destructive` now exits `2` when the
  apply would deactivate questions.** A stored question the YAML leaves out is
  deactivated. An interactive `surveys apply` or `apply -f` asks before doing
  that — `-y` skips the question and `apply -d` never asks it — so the dry run
  reports it as a `danger` finding, a severity that until now only a permission
  list emptied whole carried. 0.13.0's dry run did not report it at all, so the
  flag exited `0`: a CI pipeline that gates on this dry run now stops there.
  `--json` reports the finding with `"severity": "danger"`; the dry runs of
  `surveys apply`, `apply -f` and `apply -d` label it `⚠ DANGER`, and so does
  the line an apply prints on stderr. Every other finding keeps its severity,
  and the flag still acts only together with `--dry-run`.

  The gate is all or nothing: it cannot accept one finding and keep failing on
  the rest, so a question you remove on purpose fails it too. Check the
  question the gated dry run names, then apply — a real apply ignores the flag.

  An unmodified export can fail the gate too. On a staging company with 203
  active surveys, the unmodified export of 5 of them would deactivate
  questions, a `danger` finding. All five hold chats whose title is named
  `labelQuestion<id>`, which the simplified export of 0.13.0 or earlier does
  not recognize as a title: it exports it as a `text` question and leaves the
  real question out with a warning — 14 questions in all — so applying that
  export deactivates them. The export now folds such a title into its
  question (see *Fixed*).

  Migration: a pipeline that gates `surveys apply` on
  `--dry-run --fail-on-destructive` now stops where the YAML leaves out a stored
  question, reported under `--json` as
  `"ruleId": "survey.questions-deactivated"`. Declare the question to keep it,
  or apply without the gate to remove it on purpose. An export made with 0.13.0
  or earlier can fail the gate unmodified: re-export it first.

- **Every `apply` exits `2` for a batch that declares the same entity twice**,
  the code of a validation refusal: `apply -f`, `apply -d` and every per-kind
  `apply`, `roles`, `properties` and `property-types apply` included, which
  exit `1` for their other validation failures. `apply -f` still refuses a
  Survey or Workflow file of more than one document with `1`, before it looks
  for a repeat. With
  `apply -d --continue-on-error`, the files that do not repeat it still apply
  and the run still exits `2`, or `3` if one of them left a partial apply. The
  other documents a refused file declares for that kind are skipped with it,
  and each is named: a `[skip]` line with the repeat that took it, the
  summary's `skipped` count, and a line with `"action": "skipped"` under
  `--json`.

  Migration: a script that reads `$?` gets `2` for a repeated entity, also from
  `roles`, `properties` and `property-types apply`, which give `1` for their
  other refusals. One that parses `apply -d --continue-on-error` accepts the
  `[skip]` lines, the `skipped` count and `"action": "skipped"`. Keep one
  document per entity.
- **A schedule whose cron relaunch fails after its update exits `3`**, from
  `cotctl schedules apply` and `cotctl apply --dir`, as for a partial apply, so
  a script can tell it from a failure a re-apply retries: the update is stored,
  so a re-apply sends nothing, and the cron stays stopped until
  `cotctl schedules activate <code>`. A status change that fails after the
  update exits `1`, since a re-apply sends it again.

  Migration: a pipeline that re-applies a schedule after any non-zero exit
  handles `3` apart: the update is stored, so a re-apply sends nothing and the
  cron stays stopped. Run `cotctl schedules activate <code>` instead.
- **`cotctl schedules apply` checks each stage's bot version against the live
  catalog, and refuses a bad one with exit `2`**, `--dry-run` included, before
  anything is written. A `version` the stage's bot type does not register, or
  none on a type with no default, used to apply cleanly and fail when the
  schedule ran; routines, SLAs and bots already had this check.
  `cotctl apply --dir` refuses it too, as a per-file error that exits `2`. On an update, a stage that omits
  `version` is checked with the version it keeps from the stored stage with the
  same `key`, and a kept version the catalog no longer registers only warns. A
  bot type the catalog does not list only warns, and when the catalog does not
  answer the check is skipped with a warning. A stage with no stored match that
  omits `version` is checked, and sent, as its type's default.

  Migration: a pipeline whose schedule names a version its bot type does not
  register, or none on a type without a default, now gets `2` with nothing
  written, where the apply exited `0`. Write a version that
  `cotctl bot-types versions <BotType>` lists, or leave it out on a type with a
  default.
- **A survey YAML that would write one stored chat twice is refused before
  anything is written**, `--dry-run` and `--skip-remote-validation` included:
  `cotctl surveys apply` and `cotctl apply -f` exit `2`, and
  `cotctl apply --dir` reports it as a file error that exits `2`. The server's
  survey update writes a chat once for each chat of the body that takes it and
  keeps the last write, so the apply used to succeed while one of the
  questions left the survey without a word. Two kinds of YAML build such a
  body: one that adds a question with the identifier of a stored title while
  keeping that title's question — give the new question another identifier —
  and one that declares apart two questions the survey stores in one chat,
  which the `chat` format keeps together. The error names both questions and
  the stored chat they share.

  Migration: a pipeline that applied such a YAML with exit `0` now gets `2`, and
  nothing is written. Give a new question that takes a stored title's identifier
  another identifier, and declare two questions the survey stores in one chat
  with the `chat` format, which keeps them together.
- **What `--rollback` deactivated is reported as rolled back, not as created.**
  When a workflow apply failed partway, `--rollback` deactivated what the apply
  had created, and `cotctl apply -f` still printed `created successfully` for
  each of those resources, `cotctl apply --dir` `[created]`, and every `--json`
  `"action": "created"`. They now read
  `<kind> "<identifier>" rolled back — created, then deactivated`,
  `[rolled-back]` and `"action": "rolled-back"`, and the `apply --dir` summary
  counts them as `N rolled back`, after `unchanged`, instead of as created;
  `--json` prints no summary, so count its `"action": "rolled-back"` lines.
  `cotctl workflows apply`, which printed no result lines after a partial
  apply, prints them now and shows these as
  `Rolled back <kind>: <identifier>`. Only a create is rolled back: what the
  apply updated stays `updated`, and a resource whose deactivation failed still
  reads created. A partial apply that a failed request stopped reads the same.
  A script that parses these lines, the summary or the `action` field has to
  accept the new value and count.

  Migration: a script that counts what an apply created counts what `--rollback`
  deactivated apart: `rolled back — created, then deactivated` from `apply -f`,
  `[rolled-back]` and `N rolled back` from `apply --dir`, `Rolled back <kind>:`
  from `workflows apply`, and `"action": "rolled-back"` under `--json`.
- **A partial workflow apply exits `3` from `cotctl apply -f` too, instead of
  `1`**, as it does from `cotctl apply --dir`, so a script can tell resources
  left on the server from a plain failure. `--rollback` does not change the
  code: what it deactivates stays on the server, inactive. And
  `cotctl workflows apply -f` exits `3` for a partial apply that a failed
  request stopped, where it exited `1`: only one that a check of cotctl's own
  stopped exited `3`.

  Migration: a pipeline that read `1` from a workflow apply that failed partway
  gets `3`, from `apply -f` and from `workflows apply -f` alike: handle it as
  resources left on the server — inactive under `--rollback` — not as a failure
  that wrote nothing.
- **`cotctl bots apply --dry-run` exits `1`, instead of `2`, when a bot fails
  at runtime** — an HTTP error or a network failure while it previews the bot.
  The dry run counted every failure as a validation error; it now tells them
  apart as the apply does, so `2` means a bot failed validation and `1` a
  runtime error, as the exit-code table always stated.

  Migration: a pipeline that read `2` from this dry run as a YAML to fix now
  gets `1` for an HTTP or network failure while it previews a bot; `2` still
  means a bot failed validation.
- **`cotctl slas apply` exits `2` for a bot version the catalog does not
  register, instead of `1`**, as `cotctl schedules apply` does: a `pb` stage
  whose `version` its bot type does not register, or that names none on a type
  with no default. The SLA was already refused before anything was written,
  `--dry-run` included; only the code changes.

  Migration: a pipeline that matched `1` for this refusal matches `2`. Write a
  version that `cotctl bot-types versions <BotType>` lists, or leave it out on a
  type with a default.
- **`cotctl slas apply` and `cotctl schedules apply` exit `2`, instead of `1`,
  for the rest of what they refuse in the YAML**, and so does
  `cotctl apply --dir` for such a document: an SLA or a schedule the schema
  rejects; a schedule whose `cron` `cron-parser` rejects; a `PBScript` stage
  whose `data.code` names a routine the company does not have, as
  `routines apply` and `bots apply` already did; and an SLA whose
  `stateMachine` no workflow has — or more than one has, without
  `--task-group` — or whose `start.states` or `end.states` name a state its
  state machine does not have. Each was already refused before anything was
  written, `--dry-run` included; only the code changes. A request that fails
  while the SLA is looked up, a routine catalog that cannot be read and a
  script stage without `--allow-script-bots` still exit `1`.

  Migration: a pipeline that matched `1` for a YAML these commands refuse — or
  `apply --dir` refuses in such a document — matches `2`; `1` stays for the
  failures listed above.
- **A survey YAML that `cotctl surveys apply` or `cotctl apply -f` refuses
  exits `2`, instead of `1`**, the code of a validation refusal, which a YAML
  that would write one stored chat twice gets too: a schema or semantic error, an
  identifier another survey holds, a question whose type changes, a
  PropertyType, JobTitle or survey reference that does not resolve — a child
  survey the apply looks up under `--skip-remote-validation` included — a
  renamed `code`, an AccessRole name in `permissions` or a `permissionsV2` code
  the company does not have, and an edit to a saved table its locks refuse.
  Each was already refused before anything was sent, `--dry-run` included; only
  the code changes. A permission catalog that does not answer still exits `1`.

  Migration: a pipeline that matched `1` for a survey these commands refuse
  matches `2`; `1` stays for a failure that refuses nothing in the YAML, such as
  a permission catalog that does not answer.
- **A survey whose question needs a title name another question already holds
  exits `2` with `Identifier "<id>" cannot be reused`, instead of `1` and the
  server's raw `500`**: `cotctl surveys apply`, `cotctl apply -f` and
  `cotctl apply --dir`. cotctl names a question's title `<id>_label`, or
  `<id>_label_<n>` when the survey already has a question of that name, and
  the server refuses the write when a question of the company already holds
  it — typically a question a survey stopped declaring. The remote check
  refuses such a YAML first, so the server's refusal comes under
  `--skip-remote-validation`. cotctl meant to rewrite that error into the hint,
  but looked for it where the survey update does not put it, and did not
  recognize a `<id>_label_<n>` title. The hint names the title, says that a
  stored question — possibly one removed from the same survey, which the
  server keeps — holds it, and to declare the question with another
  identifier.

  Migration: a pipeline that matched `1`, or the server's `500`, for this
  failure matches `2` and the `Identifier "<id>" cannot be reused` hint. Declare
  the question with another identifier.
- **`cotctl apply --dir` exits `2` for a document its own apply command refuses
  with `2`, instead of `1`**, even after `--continue-on-error` applied the other
  files: a Webhook, Routine or Bot the schema rejects, a Routine or Bot refused
  before its write — a script stage without `--allow-script-bots` included — a
  User or JobTitle its pre-apply checks refuse, a survey YAML `surveys apply`
  refuses, and a bot version an SLA or a schedule stage names that the catalog
  does not register. The `[error]` line does not change. A document its own
  command fails with `1` still exits `1`, and so does a file the run
  cannot read, a refused `partial` key included; a partial apply still
  exits `3`, before any other code.

  Migration: a pipeline that checked `apply --dir` for `1` accepts `2` too, even
  after `--continue-on-error` applied the other files: on `2`, fix the YAML the
  `[error]` lines name. A partial apply still exits `3` first.
- **Under `--json`, the confirmation prompt and `Apply cancelled.` print on
  stderr, instead of stdout**: `cotctl surveys apply`, `workflows apply` and
  `properties apply`. Without `-y`, stdout mixed them with the JSON lines, so
  only `-y` or `--dry-run` gave output a script could parse line by
  line; now stdout carries nothing but JSON. A script that looked for
  `Apply cancelled.` on stdout has to read it on stderr. The exit codes do not
  change.

  Migration: read `Apply cancelled.` and the prompt on stderr. Under `--json`,
  stdout now carries only JSON lines, so a script no longer filters text lines
  out of it.
- **`cotctl bots apply`, `routines apply`, `users apply` and `jobtitles apply`
  exit `1`, instead of `2`, for a failure that refuses nothing in the YAML**,
  and so does `cotctl apply -f` for a User or a JobTitle, as
  `cotctl apply --dir` already did: a PBScript catalog that cannot be read, for
  a Bot or a Routine with a `PBScript` stage; a User whose pinned `id` the
  server fails to look up; and a JobTitle whose stored record it fails to
  read. `1` is the code of a runtime failure, and `2` stays for what the YAML
  gets wrong — it still wins when another document of the batch is refused,
  or the Bot or Routine itself, whose refusal then also says that the catalog
  could not be read. Either way the failure still prints: `routines apply`,
  which printed only the refusals of a batch it refused, now prints every
  routine's error, in the order of the file.
  Such a User or JobTitle failure now reads `Pre-apply checks could not run
  for …` instead of `Pre-apply validation failed for …`, and the User lookup
  says `Could not look up the user by id "…"` instead of calling it a rejected
  create. A system JobTitle whose code you do not type back at its prompt
  cancels the apply like a declined prompt — `Apply cancelled.`, nothing sent,
  exit `0` — where it exited `2` with `Aborted: confirmation text did not
  match`; Ctrl-C at that prompt exits `1`, as at any prompt. The prompt comes
  only once nothing else in the batch is refused: a batch that refuses another
  document exits `2` listing it, as before, without asking for the code.

  Migration: a pipeline that matched `2` when a PBScript catalog cannot be read,
  or a User or JobTitle lookup fails, matches `1`, and
  `Pre-apply checks could not run for …` where it matched
  `Pre-apply validation failed for …`. A system JobTitle code typed wrong at its
  prompt now cancels with `0`, as a declined prompt does.
- **A multi-document `cotctl surveys apply -f` goes on after a survey whose
  write fails**, where it stopped the file there (see *Fixed*). A script that
  counted on the run stopping at its first failed write now finds the surveys
  after it written; the exit code does not change, and `surveys apply` has no
  `--continue-on-error` to choose the old behavior.

  Migration: to stop at the first survey that fails, apply each survey from its
  own file, one call per file, and stop at the first non-zero exit.

- **A survey whose question declares an identifier another question already
  holds exits `2` with `Identifier "<id>" cannot be reused`, instead of `1` and
  the server's raw `500`**: `cotctl surveys apply`, `cotctl apply -f` and
  `cotctl apply --dir`. The server refuses a question's own identifier that a
  question of the company already stores — in another survey, or one a survey
  stopped declaring — as it refuses the name of its title, and only the title
  got the hint. The remote check refuses such a YAML first, so the server's
  refusal comes under `--skip-remote-validation`. The hint names the
  identifier and says to declare the question with another one.

  Migration: a pipeline that matched `1`, or the server's `500`, for this
  failure matches `2` and the `Identifier "<id>" cannot be reused` hint. Declare
  the question with another identifier.
- **An AccessRole's or a Bot's `name`, a PropertyType's `code`, or an SLA's
  `stateMachine`, made of whitespace only is refused like an empty one.** The
  schema accepted it, so `cotctl roles apply`, `cotctl bots apply`,
  `cotctl apply -f` and `cotctl apply --dir` wrote an AccessRole or a Bot
  named with spaces and exited `0`, and `cotctl validate -f` and
  `validate --dir` passed the AccessRole; a PropertyType was sent, for the
  server to refuse it with `Invalid code`, and its `--dry-run`, `validate -f`
  and `validate --dir` passed it with `0`; an SLA went on to look for a state
  machine with that code, and was refused only when none matched. Each is now
  refused before any request, with the empty value's message —
  `Name is required`, `name is required`, `Code is required`,
  `stateMachine is required` — and the code an empty one already exits with:
  `1` for an AccessRole or a PropertyType, in every command that takes one,
  and `2` for a Bot or an SLA. An SLA's code does not change, since its
  refusal already exited `2`: only its message does, and no request is sent.

  Migration: give the field a value with a character other than whitespace.
- **Under `--legacy-replace` and `--legacy-replace-workflows`, a dry run shows
  the write those flags make, so `--fail-on-destructive` exits `2` where it
  empties a permission list.** The flags build the update without the stored
  values: a Workflow's Group and TaskGroup get a create's defaults — `weight`
  `0`, `[]` for each permission list the YAML omits, `hideClosedAfterDays` `7`
  — its state machines an empty `requiredSurvey`, no card labels and
  `allowedExtensions` `[]` where the YAML omits them, its states empty bot and
  survey-trigger lists, and a survey's PUT, which overwrites the survey whole,
  drops the `permissions` the YAML omits. The dry run compared the YAML with
  the stored values instead, so it reported those fields as preserved and
  found nothing, and `cotctl workflows apply --dry-run --fail-on-destructive`
  and `cotctl surveys apply --dry-run --fail-on-destructive` exited `0`. The
  diff now compares what the write sends with what is stored, a permission
  list it empties — a state machine's `requiredSurvey.permissions` too — is a
  `workflow.permissions-wipe`, `state-machine.requiredSurvey.permissions-wipe`
  or `survey.permissions-wipe` `DANGER`, and those commands exit `2` on it;
  the card labels and the `allowedExtensions` it empties are warnings.
  `cotctl apply -f` and `apply --dir` show the same diff and findings under
  `--legacy-replace-workflows`, and still exit `0`: they have no
  `--fail-on-destructive`. The apply names a TaskGroup permission list it
  empties that way on stderr, as it does a declared one.

  Migration: a pipeline that gates a legacy-replace apply on `--dry-run
  --fail-on-destructive` now stops where the write empties a permission list,
  a state machine's `requiredSurvey.permissions` included. Declare the list in
  the YAML to keep it, or apply without the flag, whose merge keeps what the
  YAML omits.
- **`cotctl apply --dir --dry-run` refuses a User, a JobTitle or a Survey's
  `permissions` that names an AccessRole by the name the directory renames
  away, or an AccessRole the directory leaves inactive, with exit `2`, as the
  apply does.** When an AccessRole document of the directory renames a stored
  role through its `id`, the apply writes the AccessRoles first and reads the
  active ones back, so a User, a JobTitle or a Survey that still names the old
  name is refused with `AccessRole "<name>" not found` and exit `2`. So is one
  that names a role the directory writes with `active: false`, or a stored
  inactive role it updates through its `id` without `active`, which the
  update keeps inactive. The dry run took the old name, or a stored active
  role the directory deactivates, for available and exited `0`, and a
  JobTitle's did the same with a role the directory creates inactive, or a
  stored inactive one; a User's or a Survey's already refused those two, but
  with exit `1`. It now reads the AccessRoles as the directory leaves them.

  Migration: write the role's new name in the User, the JobTitle or the
  Survey, and take out of them a role the directory leaves inactive, or
  activate the role.
- **A Workflow state machine whose `code` a deactivated state machine holds is
  refused with exit `2`, before anything is written**: `cotctl workflows
  apply`, `cotctl apply -f` and `cotctl apply --dir`, `--dry-run` included. The
  API reads active state machines only, so these commands took the code for
  free: the dry run planned a create and exited `0`, and the apply wrote the
  Workflow's Group and TaskGroup before the server refused that create with an
  HTTP 500 — a deactivated state machine keeps its code — and exited `1`, or
  `3` when an earlier state machine of the run had already been created. They
  now name the deactivated state machine and say what to do: remove it from
  the YAML, or declare it with `isActive: false`, to leave it deactivated, or
  give it another code — nothing in the API updates or reactivates a
  deactivated state machine; that takes a change in the database.
  `workflows apply`, which exited `1` for every error, exits `2` for this
  refusal. A YAML that declares it with `isActive: false`, as the one that
  deactivated it does, is not refused: it leaves the state machine as stored,
  `unchanged`, sends nothing for it, and warns when it differs from it in
  another field or in its states.

  Migration: a pipeline that read this failure as `0` from a dry run, or as
  `1` or `3` from an apply, gets `2`. Remove the deactivated state machine from
  the YAML, declare it with `isActive: false`, or give it another code.
- **Without `-y`, `cotctl apply --dir` exits with the code of the errors its
  preview finds, instead of asking and applying the files before them.** The
  preview that now runs before the prompt (see *Fixed*) changes two exit
  codes. Without `--continue-on-error`, a directory the preview finds an
  error in is not asked about: the run exits with that error's code — `2` for
  a validation refusal, `1` otherwise — having written nothing. In 0.13.0 a
  yes to its prompt applied the directory as `-y` does: it wrote the files
  before an error the write meets and exited `1`, or `3` when one of them
  left a partial apply, and an error only a dry run finds — a code in a
  Workflow's TaskGroup permission lists that the catalog lacks — stopped
  nothing, so the write sent it and exited `0`. A reference to what the same
  directory writes first is not such an error: the preview reads it as the
  write will find it (see *Fixed*). And a prompt that shows errors,
  which it now asks only under `--continue-on-error`, exits with their code
  when declined, where it exited `0`, and still prints `Apply cancelled.`; a
  declined prompt with none still exits `0`. What makes this breaking is the
  run that is no longer asked: a declined prompt is a person's answer, not a
  script's, so its exit code is not a scripting contract — which is why the
  same change in `bots apply`, `property-types apply` and `apply -f` with
  property types is listed under *Fixed*.

  Migration: a script that answers the prompt and reads `$?` gets the code of
  the errors whenever the preview found any. To apply the files a broken
  directory still holds, pass `--continue-on-error`; to skip the preview, `-y`.
- **A multi-document `cotctl surveys apply -f` goes on after a survey whose
  read fails, or whose `file://` reference cannot be read**, as it does after a
  failed write (see *Fixed*). A script that counted on the run stopping there
  now finds the surveys after it written; the exit code does not change.

  Migration: to stop at the first survey that fails, apply each survey from its
  own file, one call per file, and stop at the first non-zero exit.

### Added

- **`cotctl validate -f <file> --remote` warns of each Workflow bot stage that
  lacks a `data` entry its bot type requires**, read from the live bot catalog.
  It only warns, since it has no stored stage to compare with: the dry run
  refuses such a stage unless the stored stage already lacks the entry, and
  keeps the stored `data` of a stage that leaves it out, as the warning says. A
  stage that leaves out `version` is read on the default version, a
  `partial: true` document is skipped, and a catalog that cannot be read gives
  one warning. Without `--remote`, `validate` reads no catalog, and `--remote`
  still does not take `--dir`.
- **The dry run and the apply warn when `bots: []` empties a workflow bot slot
  under `partial: true`.** Written on a StartForm, a transition, a `subtask` or
  a survey trigger whose slot stores a bot, `bots: []` still empties the slot,
  as without the marker, deleting the bot stored there with its stages; the
  warning names the slot and those stages. It prints on stderr in
  `workflows apply`, `apply -f` and `apply -d`, `-q` does not silence it, and
  it changes no exit code, `--fail-on-destructive` included. A slot already
  empty draws none.

- **`conditionalDisplay` takes `resetIdentifiers` on its own**, on a question no
  other question commands: the webclient clears those answers whenever this
  question's own answer changes, which is what empties the answers nested under
  a main option when it changes. `dependsOn` and `showWhen` go together or not
  at all, and one without the other is refused with a message naming the
  missing key; `resetOnHide` is refused without them, since nothing would hide
  the question. `surveys export` writes such a reset back in the same form,
  where it used to drop it. The warning about a `resetIdentifiers` at the
  question root now says what nesting it does. Earlier versions refuse a YAML
  that uses this form, which `surveys export` now writes for every stored reset
  of this kind.

- **X7 looks for each Survey a Workflow names among the directory's Surveys**:
  a StartForm's `requiredSurvey.surveyCode`, a transition's `requiredSurvey` and
  a state's `surveyTriggers[].survey`. One the directory does not declare is a
  `WARN`, not a `FAIL`, because it may already exist on the server, which an
  offline check cannot read; `apply --dry-run` looks it up there.

- **`partial: true` edits one element of a keyed list without rewriting the
  others.** A PropertyType, Bot, Workflow, Routine, SLA or Schedule document
  that carries it names only the elements it changes: to edit one node of a
  property type with fifteen, write `kind`, `code`, `partial: true` and that
  node — its `key` and the change — and the other fourteen stay as stored. It
  reaches a property type's `schemaNodes` (by `key`), a bot's `commands` (by
  `slashCmd` or `surveyIds`) and their `arguments` (by `name`), a workflow's
  states (by `property`) with their `next` (by `target`) and `surveyTriggers`
  (by `survey`), and the stages (by `key`) of a bot's `parametrizedBot`, a
  routine's `body`, an SLA's `pb`, a schedule's `body` and the bot in each of a
  workflow's bot slots (`requiredSurvey.bots`, `next[].bots`, `subtask.bots`,
  `surveyTriggers[].bots`). It works wherever
  those kinds are applied: `apply -d`, `apply -f` (a property type or a
  workflow), `property-types apply`, `bots apply`, `routines apply`,
  `slas apply`, `schedules apply` and `workflows apply`.
- **A named element is completed from its stored pair, so the document can
  leave out what the schema otherwise requires** — a node's `basicType`, a
  state machine's `name`, `propertyType` and `asset`, a state's `type`, a
  stage's `name`, a bot's `start`, a property type's or a routine's `display`,
  an SLA's `display`, `start`, `end`, `data` and `pb`, and a schedule's `time`
  and `body`. A field the document leaves out is not sent, so a schedule keeps
  `keepStatus` and relaunches its cron only when the document writes
  `isActive: true`, and an SLA's omitted `start` or `end` is not resolved
  again. The document merged with the stored one is then validated whole: an
  issue in what it writes refuses it and names the element
  (`schemaNodes[key="serial"].basicType: …`), and an issue the stored entity
  already has elsewhere is a warning. A stage graph is checked on the merged
  list, so a `next` may name a stage the document leaves out, and a broken one
  is refused naming its stage, `--dry-run` included. The script gate reads a
  named stage with the bot type it keeps, so editing a stored `PBScript` stage
  still needs `--allow-script-bots`. A stage named under another bot type
  (`name`) is not completed: it replaces its stored pair as written, the stored
  stage's `next` and `data` are not kept, and a warning that `-q` does not
  silence says so.
- **A named stage's `data` and `next` merge key by key with the stored
  stage's.** To change one parameter of a stage, or one branch of its `next`,
  write that key alone: it replaces the stored value of that key whole — a
  written `data.propertyValues` replaces the stored one — and the keys the
  document leaves out stay, so `next: { ERROR: notify }` reroutes one branch
  and keeps the others. A key written as `null` is removed, and a `data` or
  `next` written as `{}` is emptied — `next: {}` makes the stage end the run —
  while one the document leaves out stays as stored. The dry run, the checks
  and the update read the same merged stage, so an outcome removed or emptied
  this way can leave a stage unreachable, which is warned of. A `null` is
  valid only in a stage paired with its stored stage of the same bot type: in a
  stage the document adds, or in one named under another bot type, it is
  refused, naming the stage and the key. A schedule removes no key: its
  scheduler keeps a key the body leaves out, so in a paired stage a `null` over
  a key the stored stage holds with a value, or a `data` or `next` written as
  `{}` over one with keys, is refused, while one over nothing to remove passes
  and changes nothing — so an exported schedule applied with `partial: true`
  goes through — and a `{}` in a stage under another bot type is judged against
  the stored stage at its place. A branch is emptied by writing it as `""`.
  Without the marker, a stage's `data` and `next` still replace the stored ones
  whole.
- **The marker never deletes an element, never reorders and never creates the
  entity.** A stored element the document leaves out keeps its place, a named
  one goes back to its stored place, and a new one is added last with a
  warning — which is also what happens to an element whose key was edited,
  such as a survey command's `surveyIds`. The exception is a workflow bot slot
  written as `bots: []`: it is emptied as without the marker, deleting the bot
  stored there with its stages, and the dry run and the apply warn of it.
  Otherwise, the one thing the marker removes is what the document writes
  inside a named stage, outside a schedule: a `data` or `next` key written as
  `null`, or the whole field written as `{}`. A document whose entity is not
  stored is refused.
  Under the marker, a bot's `commands: []` deletes nothing, and `bots apply`
  does not ask for the bot name as it does without the marker — its
  confirmation prompt still runs unless `-y` is set — and a workflow's states
  the document leaves out are kept instead of refused. A deactivated state
  machine the document names is answered as without the marker: refused with
  exit `2`, `--dry-run` included, or, declared with `isActive: false`, left as
  stored.
- **A stage the merge leaves unreachable is warned of.** The marker deletes no
  stage of a bot it edits, so a bot, routine, SLA or schedule document, or a
  workflow slot's bot, that rewires a `next`
  around a stage, moves `start`, or adds a stage no `next` names leaves a stage
  that never runs. The dry run and the apply warn of each one, naming its key,
  its bot type and its list (`Stage "b" (PBReport) of pb.stages cannot be
  reached from start once merged …`), and `-q` silences the warning. Every
  outcome of a `next` counts as a path, and a stage the stored entity already
  left unreachable is not warned of. Applying the full document, without the
  marker and without that stage, deletes it. A graph with a COTLang v3 `next`
  computed at run time gets one note that reachability cannot be determined
  instead.
- **The marker never guesses which element a key means.** An element whose key
  the stored list repeats, or that the document names twice, is refused before
  anything is sent, `--dry-run` included, naming the key and its list
  (`stage "c" appears 2 times in the stored body.stages`); a repeated key the
  document does not name stays as stored. A workflow bot slot whose stored
  slot holds several bots is refused the same way when the document declares
  its bot, since bots carry no key to pair by; without the marker such a slot
  is still sent as written. A slot's bot keeps the full schema under the
  marker: each stage it names carries its `name`, the bot its `start`, and a
  written `next` names only stages the bot declares.
- **The dry run lists the stored elements the document keeps**, under each
  update (`Kept 14 schemaNodes the partial YAML does not name (partial: true
  deletes nothing)`), the apply names them on the line of what it updated, and
  `--json` carries them as `preservedElements` with `reason: "partial"`. A
  workflow's ride its state machine's line, also when only one of its states
  was written and that line reads `unchanged` — in the text of `apply -f`,
  `apply -d` and `workflows apply` as in `--json` — and an apply that writes
  nothing reports none.
- **`validate -f` and `validate -d` check a partial property type or workflow
  alone** — its own fields, with the required ones optional — since they read
  nothing stored; `validate -d` reports it as a new `S5` warning and keeps it
  out of its cross-reference checks. A bot, a routine, an SLA and a schedule
  are kinds `validate` does not recognize, with or without the marker: a
  partial one is checked by `apply --dry-run`.
- **Not covered:** a routine's `dataType` (a partial routine that declares it
  is refused), a survey's questions, lists of values such as permission codes,
  and every other kind. `--legacy-replace-workflows` refuses the marker.

- **cotctl tells you when a newer version is out and, when it brings no
  breaking changes, updates itself.** Before every command it reads the latest
  published version of `@cotctl/cli` from npm. In a terminal, an update
  without breaking changes (from `0.14.0` to `0.14.1`) is installed before the
  command, which then runs on the new version and returns its own exit code.
  One with breaking changes — before 1.0, a minor version bump, such as from
  `0.14.x` to `0.15.0` — is offered on every command with three options,
  `update`, `continue` and `cancel`, next to the link to the release notes;
  `cancel` exits `0` without running the command.

  Without a terminal (CI, scripts, redirected output), or in a command run
  with `-y`/`--yes`, it never asks and never installs: it writes the notice to
  stderr and runs the command, without touching stdout. The check waits at most
  a second and a half and is ignored silently when it fails — and then nothing
  is installed — and its result is kept for 12 hours next to the profiles; the
  prompt, by contrast, comes back on every command while the update is
  pending. `COTCTL_NO_UPDATE_CHECK=1` turns the check off entirely.

  The automatic update applies only to installations made with
  `npm install -g` on macOS or Linux, with write permission on npm's global
  directory. A standalone binary, an installation inside a project or through
  `npx`, Windows, and an installation made with `sudo` get the command to
  update by hand instead, to run with whatever permissions npm's global
  directory requires. A standalone binary is also told to delete that file or
  replace it with the new version's binary: if it comes first in the `PATH`,
  it keeps running the old version.

  If npm fails, cotctl says so, carries on with the current version and does
  not retry that version for 12 hours; an installation interrupted with Ctrl-C
  is not retried within that window either. cotctl runs npm without retries and
  gives the registry 30 seconds to answer each request; that limit does not
  cover downloading the package, which is cut off only when the whole
  installation reaches five minutes, and then counts as failed. If another
  cotctl process is already installing an update, the command says so and
  carries on with the current version instead of waiting for it, without
  suggesting the npm command: running it at that moment would collide with
  that installation.

  Earlier versions do not carry this check: to start getting the notices, this
  version has to be installed by hand once.

- **`cotctl update` updates to the latest version at any time**, also without
  a terminal. It exits `0` if it updated or was already up to date, and `1` if
  it could not reach npm, if this copy cannot update itself, if another cotctl
  process is installing an update, or if npm failed.

- **`apply` now warns on stderr before an update that takes something away or
  stops something** — with `--dry-run`, in an interactive apply and with `-y`
  alike. Like the other destructive warnings, these survive `-q`. They never
  stop the apply, and none of them changes an exit code: `--fail-on-destructive`
  acts only on a dry run's `danger` findings, such as a permission list emptied
  whole or the questions a survey update deactivates.
  - **A user losing access roles.** When an update's `accessRoles` leaves out
    roles the user has, the warning names them and says that removing a role
    takes the user out of the task groups it grants.
  - **A task group losing permissions.** When a workflow update writes
    `readPermissions`, `writePermissions`, `taskImportPermissions`,
    `taskFollowerPermissions` or `taskEditorPermissions` without entries the
    task group has, the warning names them, list by list. A `--dry-run`
    reports them as findings instead, each list once: a list emptied whole as
    the `DANGER` permissions wipe, and any other loss as a `warn` finding,
    which `workflows apply --dry-run --json` carries in `destructiveChanges`.
  - **A running cron edited by a YAML that omits `isActive`.** Updating a
    schedule whose status is `running`, `tick` or `idle` stops its cron, and the
    status does not show it; the warning says so and that
    `cotctl schedules activate <code>` relaunches it. A YAML that writes
    `isActive` gets no warning, unless it empties the cron (next item): with
    `isActive: true` `apply` relaunches the cron itself (see *⚠ Breaking
    changes*), and `isActive: false` deactivates it. A re-apply that changes
    nothing, a schedule that runs once, and one that is canceled or pending
    stay silent too.
  - **A running cron whose YAML empties it.** `cron: ''` over a schedule in
    `running`, `tick` or `idle` turns it into one that runs once: the update
    stops the cron, and `apply` does not relaunch it, even with
    `isActive: true`. The warning says so and names
    `cotctl schedules activate <code>`, which runs it.
  - **A property type's view permissions emptied by `hidden: true`.** An update
    that writes `hidden: true` and no `viewPermissions` sends
    `viewPermissions: []`; the warning names the stored permissions it removes.
  - **A bot losing commands.** A declared `commands` list is the complete list,
    so each stored command it leaves out is deleted. The warning names them —
    by `slashCmd`, or by `surveyIds` for a survey command — where a dry-run
    used to show only the count. A survey command whose `surveyIds` changed is
    named too, since it no longer matches its stored version, and the same
    warning names the edited command, which travels as written, and the stored
    keys it loses: a survey command is matched by its `surveyIds`, so cotctl
    does not guess which stored command it was. The `commands: []` warning now
    names every command it deletes as well.
  - **A workflow bot slot stored with several bots.** cotctl cannot pair the
    declared bot with any of them, so it travels as written and replaces all of
    the stored ones, and the warning names the stored keys it loses.
  - **A schedule stage or a routine input written over another stored one.**
    The server updates `body.stages` and `dataType` by position, not by key, so
    an element with no stored counterpart, or one that moved, is written over
    the stored element it lands on and keeps every key it omits from that one.
    The warning names the element, the stored one and those keys — a key of a
    stage's `data` or `next`, an input's `description` or `type` — so you can
    write them with an empty value. A key stored with an empty value — `null`,
    `''`, `[]` or `{}` — is not named, since keeping one keeps nothing. A
    schedule's stages are lined up as the scheduler does, so inserting or
    removing a stage around stages left as stored draws no warning.
- **`apply` warns when an update moves a cron to a time zone it does not
  store.** A schedule stored without `cronTimeZone` fires in the scheduler's
  own zone, so an update that writes one changes the hour its cron fires. The
  warning names the zone and survives `-q`; for `America/Santiago`, the zone an
  export made with 0.13.0 or earlier wrote for such a schedule, it also says to
  re-export before re-applying.
- **`property-types apply --dry-run` shows what the update changes**, in the
  YAML's names and one line per schema-node field, where it used to print only
  `Would UPDATE`.

- **`cotctl schedules apply --json` and `cotctl apply --dir --json` print their
  results as JSON, one object per line on stdout**, in the shape
  `surveys apply --json` and `workflows apply --json` already print. It carries
  `statusCall` — `activate` or `deactivate` — when the apply sends that call
  after a schedule update, which the text output shows as `+ activate`, so a
  script can tell a relaunched cron without parsing text. `apply --dir` adds the
  `file` each result comes from. A failed document is a line with
  `"action": "would-error"` and its `error`, and the exit codes do not change.
  Without `-y`, the confirmation prompt prints on stderr, with
  `Apply cancelled.` and the count of the files `apply --dir` found, and so
  does the prompt for a system JobTitle's code, which asks even with `-y`, so
  stdout carries nothing but JSON. `cotctl apply -f` refuses the flag, as it
  refuses `--continue-on-error`.
- **`surveys apply`, `apply` (`-f` or `--dir`) and `validate --remote` warn when
  a `+survey` question embeds an inactive survey.** The reference resolves, so
  the check still passes and the exit code does not change, but the backend
  fails to load a public survey that embeds an inactive one, and nothing said
  so. The warning, on stderr, names the question and the code, in a dry run
  too; `--quiet` drops it from the applies. A survey declared earlier in the
  same batch is not looked up, so it never draws the warning.
- **`cotctl bots export` warns when the YAML it writes cannot be re-applied as
  it is**: a bot with a survey command stored without `surveyIds` exports that
  command as stored, and `apply` refuses it with
  `surveyIds must contain at least one ObjectId when isSurvey is true`. The
  warning, on stderr, names each such command by its position, and by its
  description when it has one; the export itself does not change. The Bot YAML reference no longer promises
  that such an export re-applies unchanged.
- **`surveys apply` and `apply` (`-f` or `--dir`) warn about the survey keys the
  server does not store.** The server's survey update stores none of
  `onlyChannelCreation`, `responders`, `representation`, `bounds` and
  `reassignable`: a create gets their defaults whatever the YAML sets, and an
  update that is sent erases a value another client stored, such as one written
  through the v1 API. `apply` now says so on stderr, in a dry run too: when the
  YAML sets one of them to a value the survey will not hold, a warning `-q`
  drops; and before an update that erases a stored one, a warning `-q` keeps. A
  re-apply that changes nothing sends nothing, so it leaves them as they are.
  The exit code does not change.
- **`cotctl validate` and every survey `apply` warn about a question whose
  `conditionalDisplay.resetOnHide` is `true`**: the server does not store the
  key, so it clears no answer when the question hides. The warning names the
  question and points at `resetIdentifiers`, which is what clears answers when
  the condition changes. It prints on stderr, except under `validate --dir`,
  where it is a `⚠ WARN` line on stdout that marks the file as a warning
  instead of a pass. `-q` drops it from the applies,
  `--skip-semantic-validation` skips it, and the exit code does not change.
- **`cotctl apply -f --dry-run` and `cotctl apply --dir --dry-run` print the
  per-field diff** that `surveys apply`, `workflows apply`, `properties apply`
  and `property-types apply` print for the same YAML: under the `Would UPDATE`
  or `Would CREATE` line — `[UPDATE]` or `[CREATE]` in a directory — of a
  PropertyType, a Property, a Workflow, its state machines and states, or a
  Survey. They printed only the line. The new `--diff <mode>` sets how much of
  it prints — `off`, `compact`, the default, or `verbose` — as it does on those
  commands, and `-q` drops it. `apply --dir --json` carries the whole diff.
- **`cotctl workflows export` warns about a card-label slot that `isActive`
  lists but that holds no PropertyType.** The export leaves the slot out, as
  before, since there is no code to write for it, and re-applying that YAML
  drops it from `isActive` — as saving the workflow in the webclient does —
  which changes nothing on the task card. The warning, on stderr, names the
  state machine and the slot. The exported YAML does not change.

- **`cotctl workflows apply`, `cotctl apply -f` and `cotctl apply --dir` warn of
  a StartForm's or a transition's permission code that no active AccessRole
  grants.** The server lets a user use a StartForm, or trigger a transition,
  when one of its codes is among those the user's AccessRoles grant. A code no
  active AccessRole of the company grants — a typo, an AccessRole id written
  where a code belongs, or a code only an inactive AccessRole grants — is held
  by no user, and a list made only of such codes keeps the
  StartForm or the transition from everyone. The warning names the StartForm
  or the transition and the code, on stderr, in a dry run and in an apply
  alike, and the apply still sends the code. In a dry run of a directory, a
  code an AccessRole of the same directory grants counts as granted when the
  apply leaves that AccessRole active: not when the directory declares it with
  `active: false`, updates a stored inactive one without `active`, or holds it
  in a file the apply refuses. The codes
  of the active AccessRoles are read once per apply, and only when a StartForm
  or a transition names one; the check of the TaskGroup's lists under
  `--dry-run` still reads the whole catalog. The exit codes do not change.

### Changed

- **`cotctl apply --dir`, `surveys apply -f` and the Workflow apply read the
  server less, which shows in a large Company.** A directory whose Survey
  codes all exist stops walking the survey lists once it has seen every code
  it looks up, instead of reading every page. `surveys apply -f` walks them
  once per file rather than once per document, and a document looks each
  `+survey` code up once instead of twice. A Workflow's write reads the
  Properties of its states in one batched request, where it read each stored
  state's Property twice and each declared one alone. `apply --dir` reads the
  bot-version catalog once per pass instead of once per SLA, Schedule, Routine,
  Bot or Workflow (without `-y`, the preview and the write are one pass each),
  and the Workflows of a pass share one listing of the routines; a routine
  apply lists them once for both checks. The writes and the exit codes do not
  change.

### Fixed

- **A `file://` reference to something that is not a regular file is refused
  with its own message**, by `validate` and by every apply, with exit `1`. A
  directory used to report "file not found", and a named pipe left the run
  waiting forever.
- **The extension warning of a `file://` reference judges the file a symlink
  leads to.** A `.js` link to a `.txt` file now warns, naming the file it
  resolves to, and a link to a `.js`, `.mjs` or `.cjs` file is read without a
  warning, whatever the link is called.
- **The `PBScript` examples in the docs and the embedded skills put the
  routine's input under `data.data`**, the only part of a stage's `data` that
  PBScript passes to the routine. The ones that passed an input put it beside
  `data.code`, where it never reached the routine, and all of them left
  `data.data` out, which every apply now refuses on a new stage. A routine that
  takes no input gets `data: {}`. The pages that placed the input beside `code`
  now say where it goes, and the PBScript bot reference says what cotctl
  checks.
- **The Workflow apply's warning about a routine's required `dataType` inputs
  reads them from `data.data`.** It read the keys beside `data.code`, so it
  warned of inputs written where PBScript passes them and stayed quiet about
  inputs written where they never reach the routine. It now names each required
  input that `data.data` lacks or holds as `null`, and says so when one is
  written beside `code`, which never reaches the routine whatever `data.data`
  holds. When `data.data` is not an object — absent, empty, or a string holding
  a runtime expression — it warns only of the inputs written beside `code`, and
  leaves a missing `data.data` to the check of required `data` entries.
- **cotctl reads a stored routine as the webclient does, so an empty object
  such as a `PBScript` stage's `data: {}` survives the dry-run comparison,
  `routines export` and the check of required `data` entries.** A routine
  found by its `code` was read from an endpoint that drops every empty
  object: a Routine written with `data: {}` never converged, its dry run
  reporting the same change after every apply; its export left `data: {}`
  out; and a write that dropped `data.data` from that stage only warned,
  where it is now refused with exit `2`. The code still resolves as before
  and the routine is then read by id: one more request each time a routine
  is looked up by its `code`. `routines get --json` prints the routine as
  `routines list --json` does, with only what it stores and without `__v`
  or the `_id` of each `documentation.dataType` and `documentation.nextType`
  entry, and `routines test` sends its body as stored, without the
  `version: null` of the bot and its stages, which the run endpoint's validator
  refuses in a company with `enableSecurity` and otherwise only logs;
  `--dry-run` prints that same body. The `cotctl-routines` skill and the
  routines YAML reference say so. An export
  taken with an earlier version lacks those empty objects, so a `PBScript`
  stage it carries without `data.data` is refused where the stored stage has it:
  export the routine again before applying it. Over such an export, the first
  dry run after updating also reports the routine as changed, since the export
  lacks the stored `data: {}`, and the apply can drop an optional `{}` the
  export left out anywhere outside `PBScript`'s `data.data`; exporting the
  routine again avoids both.

- **A `display` written on a simplified question or `+table` column draws a
  warning**, from `validate` and from every apply, dry run included; `-q`
  silences it. The simplified format builds every `display` from the question's
  type and never sent the one in the YAML. The warning says where the text goes
  instead: on a `text` question, the visible text is its `label`, which the
  webclient renders as Markdown.
- **A `dateMode` on a question or `+table` column that is not `datetime` draws a
  warning**, from `validate` and from every apply, dry run included; `-q`
  silences it. Only a `datetime` question takes it, so on any other type it was
  accepted and never sent.
- **A `resetIdentifiers` with no condition on a `text` question draws a
  warning**, from `validate` and from every apply, dry run included; `-q`
  silences it. A `text` question takes no user input and, without a condition,
  is never shown or hidden, so that reset only runs when another question's
  `validate` or `onPlay` exec writes to it, or another question's reset names
  it. The warning says to remove it, or to declare it on the question whose
  answer should clear those identifiers.
- **An apply that is about to erase a `resetIdentifiers` stored on a question
  says so before writing, dry run included, and `-q` does not silence it.** A
  reset set by another client — a direct update, or the raw format — was wiped
  by the next apply of a YAML that did not declare it, and the dry run showed
  nothing. The warning names the question and the identifiers: declare them in
  its `conditionalDisplay.resetIdentifiers` (`command.resetIdentifiers` in the
  raw format) to keep them. An identifier that names no question of the YAML —
  for example, a question in an inactive chat, or one the simplified format did
  not export — cannot be kept that way, and the warning says so instead, even
  when the YAML declares the reset. A reset stored on a `+table` column is named
  too: no YAML can declare one there.
- **`surveys export` no longer writes `resetIdentifiers: [""]` in the simplified
  format, the default.** A survey built in the webclient with conditional
  displays can store a reset holding only an empty entry, and the export wrote it
  back as is, so `validate` and every apply refused the file the export had just
  written. The empty entry names no question: the export leaves it out, and the
  next apply stores an empty list in its place.
- **`surveys export` leaves out of a reset an identifier that names no question
  of the export, and says so with a `Warning:` line**, in the simplified format.
  A stored reset can still name a question the survey read does not return —
  for example, one removed from the survey, whose chat bubble the next save
  deactivated — or one the simplified format does not export, such as the extra
  questions of a legacy chat bubble that holds several, and the export wrote
  that identifier back as is, so `validate` and every apply refused the file the
  export had just written. The line names the survey, the question and the
  identifiers left out, and tells the two causes apart: `--format raw` keeps an
  identifier only when the simplified format is what left its question out. The
  rest of the reset is kept, and applying the export erases those identifiers
  from the stored reset.

- **`surveys export -o json` and `-o yaml` no longer suggest `--format json` or
  `--format yaml`**, which are not formats of the command. Their error now says
  the export is always YAML and asks for a file path; `-o raw` and
  `-o simplified` still point at `--format`. `surveys export --help` and the
  `cotctl-export` skill say the same: the command exports YAML, no longer "YAML
  or JSON", and `--format` takes only `simplified` or `raw`.
- **`validate -f` reports every document whose `file://` reference cannot be
  read.** On a file with several documents it stopped at the first one with a
  bare `Error:` and checked none of the others. Each now fails under its own
  header, as `validate --dir` reports it, and the run still exits `1`.
- **A `file://` reference to a `.mjs` or `.cjs` file is read without a
  warning**, as a `.js` one is: the three hold JavaScript, and an ESMCode
  module is usually kept in `.mjs`. Any other extension still warns.

- **`workflows export` no longer fails on a workflow whose state machine has a
  `generic` asset.** It stopped with `asset.property.map is not a function` and
  exit 1, because the server stores a generic asset's Property as a single id.
  The export now writes it as a one-entry list of the Property's code, and
  `apply` resolves that code back to the id the server stores, so re-applying
  the export changes nothing, `--dry-run` included, even while the state
  machine has tasks. An `asset.property` with one code now applies: it used to
  reach the server as a list of codes, which the server refused. A code that
  names no Property is refused by `apply` with `Property "<code>" not found`,
  the same error a state gets. A list of more than one Property is refused
  before anything is sent, with exit `1`, since the server holds one; the
  `cotctl-workflows` skill and the workflow YAML reference now say so.
- **`slas export` writes the states of `start.states` and `end.states` by
  their Property code, which `slas apply` resolves to the state.** It wrote the
  id of each state's Property, so re-applying the export failed with
  `state id … does not belong to the target StateMachine`. A state whose
  Property cannot be read is written by its own id, which `slas apply` also
  accepts.
- **`workflows export` writes a YAML that re-applies when a bot slot stores
  more than one bot.** A Workflow YAML declares at most one bot per slot, so the
  export wrote a list that `validate` and `apply` refused. It now leaves that
  slot's `bots` out and warns on stderr, naming the state machine, the slot and
  how many bots it holds. Re-applying the export keeps the stored bots; they do
  not travel to another company.
- **`apply` no longer says it is preserving the bots configured outside YAML
  under `--legacy-replace-workflows`**, which wipes them instead.

- **`workflows apply` patches only the level the YAML touches.** A YAML that sets
  only group fields (`nameDisplay`, `color`, …) no longer sends a task-group
  update, and the reverse. A YAML whose only root field is
  `defaultSelectedTaskTab` now applies it; it used to be ignored.
- **A transition that omits `canChange` keeps its stored value** instead of
  becoming `manual`, and a new transition still starts as `manual`.
- **A job-title update that omits `accessRoles` no longer asks for the typed
  confirmation on the `admin` and `bot` job titles.** The omission read as
  emptying their roles.
- **A user's `displayName` stays consistent on an update that omits
  `name.lastName`:** it is computed with the stored last name.
- **A workflow bot stored without a pinned version no longer goes back to the
  server as `version: null`.** The server returns an unpinned bot that way and
  its own validator rejects it on a write, so a StartForm, subtask, transition or
  survey trigger that omitted `bots` could fail the update of its state machine
  or state. `--dry-run` also stops reporting those bots as changed on a pristine
  export.
- **`--dry-run` no longer announces changes the apply does not make.**
  `bots apply` reported an `extraData` change for a YAML that omitted the key,
  and `routines apply` a `description` change, though neither was ever sent. With
  the defaults gone from updates, both report `no-op` for a YAML that changes
  nothing.

- **Updating a property type sends its schema nodes in their stored order.** A
  YAML that left a node out of the middle of the list, or listed the nodes in
  another order, produced an update the server rejected as forbidden. The nodes
  now travel in the stored order — the ones the YAML omits in place, new ones
  last — and `apply` notes on stderr, with `--dry-run` and without it, when the
  YAML lists them differently. A node is completed only with the fields cotctl
  models. When the stored list repeats a node's key, the YAML's node takes the
  place of the first one and the others travel as stored, instead of one being
  dropped from an update the server would reject.

- **`apply` sends only the keys whose value differs from what the server
  holds, and no request at all when none does.** Re-applying a YAML that
  changes nothing used to write every entity again, and the write was not
  harmless: task groups, state machines, states, SLAs and bots were saved again,
  a property type pushed its schema nodes to its task groups again, a survey
  deactivated and reactivated all its chats, and a schedule update stopped an
  active cron. Now each request is skipped on its own when it would change
  nothing: a workflow's group, its task group, each state machine — its initial
  state included — and each state; a user's profile and its hierarchy; a
  schedule's update, while an `isActive` that changes the status still activates
  or deactivates it. A survey is saved whole, so it is sent in full or not at
  all.
- **A value the server holds in another shape still counts as a change.** A list
  in another order, a value stored with another type, or a key the server keeps
  inside an object the YAML writes whole — such as a webhook's `context` — is
  sent, as before: the cost is one extra request, never a lost change. An
  unquoted date inside free-form content — a stage's `data`, a property's
  `schemaInstance`, a user's `extra` — is sent as its ISO text and, once
  stored, re-applies as no change.
- **A schedule's `time` and `endDate` are compared as the instant the scheduler
  stores, and a date-time with no zone designator means UTC.** That is how the
  scheduler reads it, whatever the zone of the machine running `cotctl`, so
  `apply` compares it the same way and warns about such a value: write it with
  `Z` or an offset. A value that names no zone and is not written as ISO 8601
  is sent every time.
- **An update does not change a schedule's `owner` or `runVersion`, and `apply`
  now says so.** The scheduler's update ignores both, so neither counts as a
  change — a YAML that only rewrites them sends nothing — and `apply` warns when
  the YAML's value differs from the stored one. A schedule stored without
  `runVersion` runs as `v2`, which is what an export from an earlier version
  writes, so re-applying one raises no warning.
- **`--dry-run` and `apply -d` announce what the apply does.** A dry-run used to
  show every existing entity as `would-update`, and `apply -d --dry-run` showed
  even a routine or bot with nothing to change as `[UPDATE]`. The routine and bot
  dry-runs also stop hiding a change the apply sends: `extraData` in another
  order, or a stage that writes the default `isCritical: false` over one stored
  without it.
- **`--legacy-replace-workflows` and `surveys apply --legacy-replace` skip a
  write the same way.** Fields the YAML omits are still wiped, but a write whose
  result would be identical is not sent.

- **A property type's schema node is checked against the stored node it
  replaces.** When the stored list repeats a node's key, the update sends the
  YAML's node in place of the first one, but its immutable fields — `basicType`,
  `subType`, `isArray` — were compared with the last one.
- **A property type's `--dry-run` refuses what the apply refuses.** The dry-run
  announced `Would UPDATE` without the schema-node immutability check the apply
  runs, and resolved the type by `code` even when the YAML pins an `id`: a node
  whose `basicType` the YAML changed passed the preview and failed the apply.
  Now `property-types apply`, `apply -f` and `apply -d` resolve, check and build
  the update in a dry-run exactly as they do in an apply, and fail with the same
  error and exit code. A YAML with an uncommented `id` that does not exist in
  the target Company now fails the dry-run too, as the apply always did: remove
  `id` to resolve by `code`.
- **A schema node that omits `subType` is no longer refused as a type change.**
  An edited node that left `subType` out was compared as if it had none, so
  updating a `COTProperty` node without repeating its `subType` failed with
  `subType is immutable`. An omitted `subType` now keeps the stored one, as an
  omitted `isArray` already did; a written one that differs is still refused.
- **`apply -f --dry-run` and `apply -d --dry-run` now print the destructive
  findings they computed and never showed** — a `DANGER` permission wipe, a
  deactivation, the survey questions an update deactivates — on stderr under
  each entity, as `surveys apply` and `workflows apply` do, once each. Exit codes
  do not change: `apply` has no `--fail-on-destructive`, and the commands that
  have it still fail only on `danger` findings.
- **`--dry-run` and `-y` now name the questions an update deactivates, as the
  documentation promised.** A survey update deactivates every question its YAML
  leaves out. The list of them, by `identifier`, used to appear only in the
  interactive prompt; it now appears in every mode, and it covers the `chat[]`
  format as well as `questions[]`. `--dry-run` shows it under the survey, among
  its destructive findings, as `⚠ DANGER`, and `surveys apply --dry-run --json`
  carries it in `destructiveChanges` with `"severity": "danger"` — so
  `--fail-on-destructive` fails on it with exit `2`, as the breaking change
  above describes. An apply prints it on stderr, labeled `DANGER`; without `-y`,
  `surveys apply` and `apply -f` still ask before the apply goes ahead, while
  `apply -d` names them in the preview it prints before its one prompt.
- **Applying an unmodified export of a survey built in the web app no longer
  reads as deactivating its questions' titles.** The web app names a question's
  title `<question>_<digits>`; the export folds that title into its question, and
  the apply writes it back. The stored title was counted as a question the YAML
  leaves out: without `-y`, `surveys apply` and `apply -f` have asked to
  deactivate it since 0.3.0, and the `--dry-run`, `-y` and `--json` reports this
  release adds listed it too. A title is no longer counted, and a question the
  YAML leaves out is still named by its own identifier.
- **A question whose identifier ends in `_label` is named when an update
  deactivates it.** Since 0.3.0 such an identifier was left out of the list by
  its name alone, so a real question named that way — typically a section
  header — was deactivated without being named, and the `DANGER` finding this
  release adds would have missed it too. Now only a title is left out: the
  `+text` the export folds into the question after it. In a `chat[]` YAML, only
  when that question leaves too: the raw format sends each chat as written, so
  a title it leaves out beside its question is lost and named.
- **`surveys apply` writes each title back under the identifier it has
  stored, and with its `_id`.** The apply rebuilt a title the web app named
  `<question>_<digits>` as `<question>_label`, so an update replaced the stored
  title with a new one. And when the survey also held a real question named
  `<question>_label`, the rebuilt title took that question's `_id`, so the
  update carried two questions under one identifier and one `_id`. A title
  keeps its stored identifier now, and a new title is named
  `<question>_label`, or the first free `<question>_label_<n>` when a question
  of the survey holds that name, and the remote check looks up the identifier
  it takes. A YAML that gives a stored title's identifier to a new question is
  refused (see *⚠ Breaking changes*).
- **A survey YAML that omits `questions` is no longer refused when the survey has
  a table.** Omitting `questions` keeps every stored question, tables included,
  but the table check read the omission as removing the table.
- **Without `-y`, a confirmation prompt no longer lists as `UPDATE` an entity the
  apply will leave unchanged.** The user, job title, SLA, schedule, webhook and
  routine prompts label it `NO-OP`, as `--dry-run` does, and the survey and
  workflow prompts say `No changes to … — nothing will be sent`. To tell, an
  interactive workflow apply runs its own dry-run before the prompt, so its
  warnings now show before you confirm.
- **Without `-y`, `bots apply`, `property-types apply` and `apply -f` with
  property types print their warnings before the confirmation prompt, while you
  can still decline.** They used to print them after you confirmed, as each
  entity was written — among them the stored commands a bot update deletes and
  a schema node the stored list repeats. The prompt now lists each entity as
  `CREATE`, `UPDATE` or `NO-OP`, or as `ERROR` with the reason it will not be
  applied, and it is not asked when none can be. Declining a prompt that lists
  an `ERROR` line still prints `Apply cancelled.`, and exits with the code of
  those errors: `1` for a property type, and for a bot `2` when one of them is
  a validation error, `1` otherwise. The write that follows repeats none of the
  warnings. To preview, `bots apply` reads each bot once more, and for a
  `parametrizedBot` its bot-version catalog, plus the routine catalog when a
  stage is a `PBScript`; `property-types apply` writes from what it already
  read. `-y` and `--dry-run` print their warnings as they did. `apply -d`
  prints its warnings before its one prompt too, in a preview of the whole
  directory.
- **`routines apply` prints each warning once.** It checks every routine with a
  dry run before it writes any, with or without `-y`, and the write printed
  again every warning that check had printed — such as the bot versions it
  could not verify. The write now repeats none of them.
- **Without `-y`, `property-types apply` and `apply -f` with property types stop
  before the confirmation prompt, having written nothing, when planning a
  document fails** — a network or authentication error, or a 404 on a pinned
  `id`. They used to show the prompt, write part of the file and then fail. The
  exit code is `1` either way. In every mode, `apply -d` included, the error now
  names the `code` of the property type it failed on.
- **`property-types apply` and `apply -f` report the documents they handled when
  another one fails.** Both printed only the errors and exited `1`: a dry-run hid
  the preview of the documents that passed, and an apply the result line of
  each one it wrote. Now they print every result next to the errors, and still
  exit `1`; `property-types apply` prints its summary only when nothing failed.
  `apply -f` does this for every kind. For a property type, a request that
  fails — a network error, or a 404 on a pinned `id` — stops the run at that
  document; with `-y`, with `--dry-run` and after the prompt, the documents
  before it are still reported. `apply -d` reports them as well, where it used
  to report the whole file as one error.
- **`cotctl schedules activate` and `cotctl schedules deactivate` describe what
  they do.** `activate`'s help and confirmation prompt said it reactivates a
  canceled schedule; it sets a schedule in any status back to `pending`, which
  is also how an active schedule an update stopped is relaunched. `deactivate`'s
  help said it cancels a `pending` or `running` schedule; it cancels one in any
  status.

- **Applying a survey no longer turns `isBulkForm` off.** The server rewrites
  the whole survey on every update, and cotctl neither exported `isBulkForm`
  nor sent it, so re-applying an export of a bulk form with `surveys apply`,
  `apply -f` or `apply -d` cleared the key: the form stopped being offered in
  the **Actions** menu of a workflow's task view, and `--dry-run` did not show
  it. `surveys export` now writes `isBulkForm: true` when a survey has it, an
  update that omits the key keeps the stored value, and `isBulkForm: false`
  turns it off.
- **A conditional question that depends on another conditional question keeps
  reacting to it.** When C's `conditionalDisplay` depended on B, and B was
  itself conditional, applying the survey left C out of the questions B
  controls whenever C came before B in `questions`, so C did not show or hide
  when B's answer changed.
- **Re-applying a survey's export keeps the `onPlay` button of a question with
  no `onPlay` script.** A question can store `exec.onPlay.button` with an empty
  `src` and `context`, and `surveys export` left that question's `exec` out, in
  both formats. The server rewrites every question on each update, so
  re-applying the export with `surveys apply`, `apply -f` or `apply -d` deleted
  the button, and the default export of a survey nobody had changed re-applied
  as an update instead of unchanged. The export now writes that `onPlay` with
  its `button` and `src: ''`.
- **`cotctl validate -f --remote` accepts a child survey declared earlier in the
  same file, as `surveys apply -f` does.** It checked each `+survey` question's
  `surveyCode` against the server alone, so a multi-document file that declares
  a child before the survey that embeds it failed with
  `Survey with code "…" not found` and exit `1`, while `surveys apply -f` and
  `apply --dir` apply the same file. A survey that passed its checks earlier in
  the file now counts as existing. A survey placed before its child still fails,
  as it does in `apply`.
- **`cotctl apply --dir --dry-run` no longer reads a job title as dropping an
  access role the same directory declares.** The dry run left out of each job
  title every access role the directory declares, including one the server
  already has, so a job title that kept its roles was listed as an update — and
  for the system job titles `admin` and `bot`, with a warning that the apply
  would leave their users without access. A role the server has is now resolved
  as `apply` resolves it. A role the directory creates still has no id in a dry
  run, so a job title that names one is listed as an update, never as unchanged
  or as emptying its roles.
- **`cotctl apply --dir --dry-run` no longer reports a user's access role or
  job title as not found when the same directory creates it.** The dry run
  creates neither, and it failed each user that names one with
  `AccessRole "…" not found` or `JobTitle code "…" not found or inactive`, the
  users the directory creates and the ones it updates alike, although the apply
  itself succeeds. Such a user is now listed as a create or an update: the new
  name has no id in a dry run, so an existing user is listed as an update. The
  apply itself does not change.
- **`cotctl users apply` and `cotctl apply -f` warn about a user they create
  with no password and no `--notify-email` before asking to confirm.** In an
  interactive apply the warning printed only after the confirmation, as the
  user was created, when it was too late to decline. `--dry-run` and `-y`
  already printed it, and still do.
- **`cotctl properties list --json`, `property-types list --json`,
  `roles list --json`, `surveys list --json` and `workflows list --json` print
  `[]` when nothing matches**, as every other `list --json` does. They printed
  `No properties found` and the like instead, which is not JSON, so a script
  that parsed the output failed on an empty result. `surveys list --code`
  included, and a `surveys list --search` term with no character the API
  accepts, such as `"()"`, which lists nothing and printed nothing on stdout.
- **`cotctl surveys apply`, `workflows apply` and `properties apply` no longer
  print `Warning: --quiet ignored with --json`**, which `schedules apply --json`
  and `apply --dir --json` never printed. `-q` was not ignored: under `--json`
  it keeps dropping the advisory warnings `surveys apply` and `workflows apply`
  print on stderr, and `properties apply` prints none there.
- **`cotctl workflows apply -q` drops the advisory warnings on stderr**, as its
  help promises and as `cotctl apply -f -q` does for a Workflow. It printed
  every warning the apply raised; the destructive ones still print, `-q` or
  not, and their text does not change.
- **The remote identifier check no longer says that another survey holds a
  question the survey being applied removed.** A survey keeps a question it
  stops declaring in an inactive chat, and the check counts only its active
  chats as its own, so a raw YAML that declares that question again with its
  `_id` was refused with `Identifier "<id>" already exists in another survey`.
  It is still refused, now with
  `Identifier "<id>" belongs to a question removed from this survey`, by
  `cotctl validate --remote`, `cotctl surveys apply`, `cotctl apply -f` and
  `cotctl apply --dir`, when the YAML declares the question in the chat it was
  removed from.
- **The warning for a `resetOnHide` set at a question's root no longer says
  that nesting it inside `conditionalDisplay:` makes it take effect.** Nested,
  it has no effect either, since the server does not store it, and the warning
  now says so. The warnings for `dependsOn`, `showWhen` and `resetIdentifiers`
  at the root do not change.
- **`cotctl apply --dir --dry-run` no longer fails a survey whose
  `propertiesChannel` names a PropertyType the same directory creates.** The
  dry run creates no PropertyType, so the survey's check did not find it and
  reported `PropertyType "…" referenced in propertiesChannel not found` as a
  file error, although the apply itself succeeds. A `+property` question's
  filter already passed in that case.
- **The warning `apply` gives for an element whose key appears twice, in the
  YAML or in the stored list, names what the element loses inside it too**:
  the keys of a command's stored `arguments`, matched by `name`, and those of a
  survey trigger's stored bot and of its stages. It names a survey trigger's
  bots `bots`, as the YAML writes them — `bots[0].maxIterations` — where it
  said `triggers`, the name the request gives them. For a key the YAML
  repeats, the warning comes once however many times the YAML repeats it, and
  says that cotctl cannot tell which of the YAML's elements updates the stored
  one.
- **A workflow apply that a failed request stopped after its first create
  prints the result lines of what it wrote**, as one that a check of cotctl's
  own stopped does: `cotctl workflows apply`, `cotctl apply -f` and
  `cotctl apply --dir` list each resource created, updated or — under
  `--rollback` — rolled back, and report the request's error against the
  Workflow: `Error: <nameCode>: …`, or
  `[error] <file> — Workflow <nameCode>: …`. Under `--json` they are JSON lines,
  the error a `"would-error"` line for the Workflow. They printed only the
  error, so the stderr warnings were the only record of what the apply left on
  the server, and the `apply --dir` summary counted none of it. The run still
  exits `3`.
- **`cotctl apply --dir` reads the company's list of surveys at most once per
  pass** (without `-y`, the preview and the write are one pass each), where
  each survey document read it again: to look up its own `code`,
  and each code its `+survey` questions reference. A code that no survey has —
  a new survey's own, or a reference to a survey the company does not have —
  reads the whole list, the active surveys and then the inactive ones, so a
  directory of such documents repeated that walk for every document and every
  reference. A pass's first walk now answers every later lookup in it, and a
  survey the run creates or updates is found by the files after it, as before.
  The results and the messages do not change.
- **An interactive `cotctl workflows apply` reads the catalogs it only reads
  once**, where the dry-run it runs before its prompt, for a workflow that
  exists, read them all again: the PropertyTypes, the permissions, the bot
  versions, the routines and each survey its states name. That dry-run now
  reads again only the Group, TaskGroup, state machines and states, which the
  apply still reads fresh as it writes them. Every workflow apply also looks
  each survey code up once, where each state looked up the codes it names,
  and under `apply --dir` the run's own lookups answer them. `cotctl apply -f`
  of a Workflow does the same. The results and the messages do not change.
- **The `--dry-run` diff of a workflow shows a change only where the apply
  sends one**: `cotctl workflows apply`, `cotctl apply -f` and
  `cotctl apply --dir`. It showed `~ dynamicPropertyTypes` for a state machine
  whose card-label slots the server holds as `null`, `~ nameTranslations` for a
  map that leaves out a language the Group keeps, and
  `+ requiredSurvey.autoCreateTask: false` over a state machine stored without
  the key, which the backend reads as `false` — although the apply sends none
  of them. The `diff` of a `--json` line carried them too, even on a `no-op`
  line. The diff now compares each value the way the update does, for the
  Group, each state machine and each state; a real change still shows.
- **The warning `cotctl workflows apply`, `cotctl apply -f` and
  `cotctl apply --dir` give when `cardLabels` deactivates a slot no longer
  says that the task card stops showing a slot that holds no PropertyType.**
  Such a slot, which `isActive` lists with nothing in it, shows nothing, so the
  warning now says that the apply only drops it from `isActive` and that
  nothing on the task card changes. A slot that holds a PropertyType is still
  named as one the card stops showing.
- **A multi-document `cotctl surveys apply -f` whose write fails for one
  survey still reports the surveys it wrote before it**, with their
  `Survey "<code>" created successfully` lines or, under `--json`, their JSON
  lines, and applies the surveys after it, as it does after a survey it
  refuses. The failed write threw out of the file, so the command printed only
  its error, and nothing said which surveys were already on the server. The
  failed survey now prints `Error: <code>: …`, or the `"would-error"` line the
  `--json` documentation describes. A title name the server refuses still
  exits `2`, and another failed write `1`.

- **The password prompt of an automatic re-login prints on stderr.** When an
  ApiToken profile's token expired or was revoked in the middle of a command,
  cotctl asked for the password on stdout, so a `--json` run piped to another
  program received the prompt among its JSON lines. It now asks on stderr,
  where the terminal still shows it.
- **A multi-document `cotctl surveys apply -f` still reports the surveys it
  wrote when a later survey's read fails, or a `file://` reference it names
  cannot be read**, and applies the surveys after that one. A request that
  failed while a survey was read and checked before its write — the lookup of
  its code, the read of the stored survey — and a `file://` path it could not
  read threw out of the file, so the command printed only its error, and
  nothing said which surveys were already on the server, in text or under
  `--json`. The failed survey now prints `Error: <code>: …`, or a
  `"would-error"` line under `--json`, and the command still exits `1`.
  `apply -f` and `apply --dir` name the survey's `code` in that error too,
  where they named nothing or the file.
- **A Ctrl-C at a prompt, or a system JobTitle's code typed back wrong, stops
  `cotctl apply --dir`, with `--continue-on-error` too.** A Ctrl-C at the code
  a system JobTitle asks for, which asks even with `-y`, was reported as that
  file's error, and `--continue-on-error` went on to apply the files after it;
  so was a code typed back wrong, which cancels `cotctl jobtitles apply`. A
  Ctrl-C at the password of an automatic re-login did the same, and inside a
  file of Routines, Bots, Users, JobTitles, SLAs, Schedules or Webhooks, or
  after a Workflow had created something, it moved on to the next document
  even without the flag. One at a read before a Workflow's first write, its
  dry run's included, at a PropertyType's read or a Property's lookup in a
  dry run, at the routine catalog a Routine's or a Bot's `PBScript` stage is
  checked against, at the permission catalog a Survey's `permissionsV2` is
  checked against, or at the bot catalog any apply reads, became a warning or
  an error instead, and the next request asked for the password again; one at
  an SLA's lookup of its state machine was dropped, and the SLA was refused as
  `not found`. The run now stops there: what was already applied is
  reported, the documents of the same file included, the one that asked reads
  `Apply cancelled at a prompt: nothing after it was applied.`, and nothing
  after it is sent. `cotctl users apply`, `surveys apply`, `jobtitles apply`,
  `roles apply`, `property-types apply`, `properties apply`, `slas apply`,
  `schedules apply`, `webhooks apply`, `workflows apply`, `bots apply` and
  `routines apply` stop at that document too. The cancelled file still counts
  as a runtime failure, exit `1`, and a Workflow that had already created
  something exits `3`, as any partial apply does. `--rollback` no longer
  deactivates what that Workflow created: each deactivation asked for the
  password again. The warning lists what was created and says it was not
  rolled back. On a few paths a Ctrl-C at the password is still taken for a
  failed request and the run goes on, so the password can be asked again: the
  AccessRoles a stored Survey's update plan reads for its `permissions`, the
  hierarchy a User's confirmation prompt compares without `-y`, and each
  deactivation of a `--rollback` that another failure started; requests sent
  at the same time can also ask at once. On those paths nothing is written
  until the password is typed at a later prompt.
- **A Ctrl-C at a prompt of a multi-document `cotctl surveys apply -f`
  reports the surveys the file already wrote.** It exited `1` printing
  nothing, so nothing said which surveys were already on the server. The run
  still stops there and exits `1`, but the surveys written before it print
  their line, in text or under `--json`, and the one that asked reads
  `Apply cancelled at a prompt: nothing after it was applied.`
- **A server error on a User names the write it answered.** A `500` on any
  User write read `Create rejected by server (HTTP 500)`, with the hypotheses
  of a create — a race with another admin, an email another company holds —
  also when it answered the update of a stored user or the PATCH that writes
  its `hierarchy`. Those now read `Update rejected by server (HTTP 500)` and
  `Hierarchy PATCH rejected by server (HTTP 500)`, and a read that fails before
  any write reads `Rejected by server (HTTP 500)`. The create keeps its
  wording; the `--json` shape and the exit codes do not change.
- **A simplified survey YAML that declares again a question the survey
  removed is told so.** The remote identifier check refused it with
  `Identifier "<id>" already exists in another survey`, since only the `_id`
  of a raw YAML led it to the inactive chat where the survey keeps that
  question. It now finds the question among the survey's chats and says
  `Identifier "<id>" belongs to a question removed from this survey`, as for a
  raw YAML: `cotctl validate --remote`, `cotctl surveys apply`,
  `cotctl apply -f` and `cotctl apply --dir`. The YAML is still refused, with
  the same exit codes.
- **An error that combines several messages no longer reads `….; …`.** Where
  cotctl joins the failures of one document with `; ` — a routine or a bot
  refused next to a catalog it could not load, several unknown permission
  codes, several identifier conflicts, the issues the schema finds — each
  message but the last kept its closing period, so a routine read
  `Available versions: 1.0.0.; Could not load PBScript catalog …`. It now
  reads `Available versions: 1.0.0; Could not load PBScript catalog …`.
- **`cotctl surveys list --all` lists the inactive surveys too.** It sent no
  `isActive` filter, and without one the server lists active surveys only, so
  `--all` listed the same surveys as without it. It now asks for active and
  inactive ones. `--active` still wins when both are given, and the output
  keeps its shape.
- **The dry run of a Property whose `schemaInstance` references another
  Property no longer shows a change that is not there.** The YAML names the
  referenced Property by its `code` and the server stores its id, and the diff
  compared the two, so `cotctl properties apply --dry-run`,
  `cotctl apply -f --dry-run` and `cotctl apply --dir --dry-run` printed a
  `schemaInstance` change on every run, which `--json` carried even on a
  `no-op`. The diff now compares the reference the apply would send, resolved
  to its id, with the stored one. The exit codes do not change.
- **`cotctl apply --dir --dry-run` accepts a Survey whose `propertiesLimit`
  names a Property the same directory creates.** The dry run creates no
  Property, so the Survey's check did not find it and refused the directory
  with `Property "<code>" referenced in propertiesLimit not found.`, although
  the apply itself creates the Property before the Survey. The check now
  passes a Property an earlier file of the directory applies, as it already
  did for a PropertyType.
- **The dry run of a Workflow shows its TaskGroup.** The diff of
  `cotctl workflows apply --dry-run`, `cotctl apply -f --dry-run` and
  `cotctl apply --dir --dry-run` listed the Group's fields only, so a change to
  a permission list, `hideClosedAfterDays`, `availableViews`, `defaultView` or
  `defaultSelectedTaskTab` never showed. The Workflow's line now lists them
  too, in text and under `--json`: each one the YAML declares, as the update
  sends it, and each one it leaves out, as preserved. The exit codes do not
  change.
- **The dry run of a Workflow shows a StartForm moved to another Survey, and
  a state machine's `asset`.** The diff of `cotctl workflows apply --dry-run`,
  `cotctl apply -f --dry-run` and `cotctl apply --dir --dry-run` listed the
  other keys of a declared `requiredSurvey` but not its Survey, and never
  `asset`, so a StartForm moved to another Survey, or an `asset` on another
  PropertyType, showed only as `would-update`. The state machine's line now
  lists `requiredSurvey.surveyId` and `asset` as the update sends them, in text
  and under `--json`, and the warning of a failed PropertyType lookup names
  `asset` among the fields it leaves incomplete. The exit codes do not change.
- **A Survey's dry run under `--skip-remote-validation` no longer shows a
  `permissions` change that is not there.** With the flag,
  `cotctl surveys apply --dry-run`, `cotctl apply -f --dry-run` and
  `cotctl apply --dir --dry-run` compared the AccessRole names the YAML writes
  with the ids the server stores, so the diff showed `permissions` changed on
  every run, even for the same roles. It now compares the ids the update would
  send, which the dry run already resolves to build that update. The exit
  codes do not change.
- **A Bot whose `name`, or a Routine whose `code`, is empty or whitespace
  only is named by its position in the error.** `cotctl bots apply`,
  `cotctl routines apply` and `cotctl apply --dir` printed the value as
  written, so the refusal read `Error:    : name: name is required` and did
  not say which document it was. It now reads
  `document <n>: name: name is required`, or `document <n>: code: …` for a
  Routine, as it already did for a bot with no `name` or a routine with no
  `code` at all. The exit code does not change.
- **`cotctl surveys apply --dry-run --legacy-replace` warns of the stored
  `editable.src` a partial `editable` drops.** The flag's PUT replaces
  `editable` whole, so an `editable` the YAML declares without `src` deletes
  the stored script, and the dry run said nothing, as if the merge kept it. It
  now reports the `survey.editable.src-change` warning it gives any other
  change of the script. A warning never stops `--fail-on-destructive`, so the
  exit codes do not change.
- **Error messages and `--help` no longer cite internal notes, and
  `cotctl login` no longer promises `--paste-token` for a later release.**
  When a YAML's `id` names a JobTitle stored under another `code`,
  `cotctl jobtitles apply`, `cotctl apply -f` and `cotctl apply --dir` sent the
  reader to a workaround in `cotctl jobtitles --help`, which describes none,
  and so did the hint cotctl adds when the server refuses a `code` change. The
  refusal now gives the steps: deactivate the stored JobTitle with
  `cotctl jobtitles deactivate <code>`, apply the YAML without `id` to create
  the new `code`, and move the users to it. The help of `cotctl apply`,
  `cotctl jobtitles apply`, `cotctl bots apply` and `cotctl schedules` no
  longer ends a description with the id of an internal note. When the user
  has no permission to create an ApiToken, `cotctl login` said that pasting
  one an admin creates would be supported in a later release; it now says to
  log in with it through `--paste-token`, or `--token` for a non-interactive
  run, which cotctl already supports. The exit codes and the `--json` shape do
  not change.
- **`cotctl surveys export` folds a title named `labelQuestion<identifier>`
  into its question.** Solution presets title a question with `labelQuestion`
  followed by the question's identifier — `labelQuestionst_name` for
  `st_name` — and the simplified export read that title as a `text` question
  of its own and dropped the question it titles with a `DROPPED` warning, so
  applying the export deactivated the question. The export now reads it as a
  title when its name is exactly `labelQuestion` followed by the identifier of
  the question after it, and writes the question with the title's text as its
  `label`. `cotctl surveys apply`, `apply -f` and `apply --dir` rebuild the
  title under its stored name and `_id`, the warning of the questions an apply
  deactivates no longer names it, and the refusal of a YAML that would write
  one stored chat twice names it as that question's title. A title in front
  of a question whose type takes none — `text`, `image`, `signature`, `file`
  or `gps` — is dropped and its question kept, with the warning the export
  already prints for that case, and applying that export deactivates the
  title. The exit codes do not change.

  Migration: an export written by 0.13.0 or earlier still lacks the question
  a title named this way titles, so applying it, from a repository for
  instance, still deactivates that question. Without `-y`, `surveys apply`
  and `apply -f` name it and ask before deactivating it, and `apply --dir`
  names it in its preview, before its prompt; with `-y`, all three deactivate
  it without asking. Export those surveys again with this version before
  applying them.
- **`cotctl apply --dir --dry-run` reads an AccessRole the directory renames
  or reactivates through its `id` under the id it keeps.** It took every
  AccessRole name the directory declares for one it creates, with no id yet,
  so a User or a JobTitle that names such a role was listed as `would-update`
  whatever it changed, and a User that holds the role was warned that the
  update removed it when the stored role was inactive or had another name.
  They now resolve the name to the role's id and are compared with the stored
  record as usual — `no-op` when nothing changes, and no removal warning for a
  role they keep. A name the directory creates still reads as a change, and
  so does the old name of a role it renames when another of its AccessRoles
  is created under that name, as the apply creates it. The exit codes do not
  change.
- **A dry run no longer refuses a `hierarchy` that names a User the same
  apply creates.** `cotctl users apply --dry-run`, `cotctl apply -f --dry-run`
  and `cotctl apply --dir --dry-run` looked every hierarchy email up on the
  server, and a dry run creates no user, so two new users that name each
  other — the two-pass example of the Users docs — were reported as
  `User(s) referenced in hierarchy not found` and the run exited `1`,
  although the apply resolves them. The dry run now leaves the users it would
  create out of that lookup, lists their `(hierarchy)` line as
  `would-update`, and exits `0`. Under `apply --dir` it follows the order of
  the apply: a User that the same file or an earlier one creates is
  accepted, and one that a later file creates is still an error, exit `1`, as
  in the apply — whose message now names that file in both.
- **The hint cotctl adds when the server refuses a `code` change names the
  entity refused, and gives a JobTitle's rename steps only for a JobTitle.**
  It told a StateMachine, a State, a Routine, a Bot, an SLA, a Schedule or a
  Webhook to deactivate a JobTitle and move its users. A Routine's hint now
  says to write the stored code back in the YAML, or to remove its `id` to
  create a Routine with the new code; the others say to write the stored code
  back. The server errors (HTTP 500) of those writes name the entity too. The
  exit codes and the `--json` shape do not change.
- **Two warnings say what they found: an inactive AccessRole a User loses,
  and a `labelQuestion<identifier>` title the export drops.** When an update
  removes an inactive AccessRole from a User, `cotctl users apply`,
  `cotctl apply -f` and `cotctl apply --dir` showed its id in quotes, where
  the other roles show their name; it now reads `an inactive access role
  (<id>)`, since only the active roles are read. And when a title named
  `labelQuestion` followed by the identifier of the question after it stands
  in front of a question whose type takes no title, `cotctl surveys export`
  warned that it might be a real text question it had dropped. Its name makes
  it that question's title, and the warning now says so: the export keeps the
  question and drops the title. The exit codes do not change.
- **A workflow update may leave out the `version` of a bot type with no
  default when the stored stage pins one.** `cotctl workflows apply`,
  `cotctl apply -f` and `cotctl apply --dir` refused such a stage with
  `version must be specified`, in a dry run too. They now read the stored bot
  for that stage alone and accept the version it pins. The stored bot is the one the update completes the
  YAML's from — the single bot of its slot, a transition's paired by its
  `target` and a survey trigger's by its survey — so a slot that stores
  several bots, a state or transition the apply creates, and
  `--legacy-replace-workflows` still need the `version`. A read that fails
  is the error, naming what could not be read, with the same exit `1` as the
  refusal.
- **A Workflow's dry run shows the initial state machine the apply gives its
  TaskGroup.** When the TaskGroup had none, `cotctl workflows apply`,
  `cotctl apply -f` and `cotctl apply --dir` set its `initialStateMachine` to
  its only state machine, yet reported the Workflow `unchanged`, and the dry
  run — the confirmation prompt's included — said nothing would be sent. The
  dry run now lists the Workflow `would-update`, with `initialStateMachine` in
  its diff, and the apply reports it `updated`. What the apply writes does not
  change, nor do the exit codes.
- **`cotctl workflows export` writes a file that applies again when a state
  has a sub-workflow target.** It wrote the state's stored `subtask.target`,
  which a YAML cannot declare — cotctl does not configure sub-workflows and
  accepts only `null` there — so `cotctl workflows apply`, `cotctl apply -f`
  and `cotctl apply --dir` refused the exported file with `subtask.target:
  Invalid input: expected null, received string`. The export now leaves the
  target out, and the update keeps the stored one, as it does whenever the
  YAML omits it.
- **The destructive findings a `--dry-run` reports print outside it too.** An
  apply printed only a survey's question deactivation and a webhook's cleared
  `context`, plus a line without its `DANGER` label for the task group
  permissions a workflow update removes. It now prints every finding of a
  Survey (a permission list emptied whole, a changed `editable.src`, a
  deactivation), a Property (a deactivation, an emptied `subproperty`), a
  Workflow (a permission list emptied whole or that loses entries, a
  deactivation) and a state machine (its StartForm's permissions emptied, a
  deactivation, card labels or extensions dropped), on stderr, with the
  severity and message the dry run shows and the entity it names:
  `cotctl surveys apply`, `cotctl properties apply`, `cotctl workflows apply`
  and `cotctl apply -f` before their prompt, and with `-y`, as under
  `cotctl apply --dir`, right before the entity is written. Those findings
  replace the task group line, so a list emptied whole now reads `DANGER`.
  `-q` keeps them. `--json`, the exit codes and `--fail-on-destructive`, which
  still acts only together with `--dry-run`, do not change.
- **An update the server refuses for changing a read-only field names that
  field in every environment.** When an AccessRole, JobTitle, PropertyType,
  Property, Routine, User or Workflow update tried to change a field the
  server keeps read-only, such as a `code`, the field was named only by a
  server that sends its debug details unasked, as a staging one may. Those
  updates now ask the server for the details, so the field shows everywhere,
  in one of two shapes: a JobTitle, a User and `cotctl routines apply` print
  `Attempted to modify a read-only field (path: /code)`, while an AccessRole,
  a PropertyType, a Property, a Workflow's group and a routine under
  `cotctl apply --dir` print the server's `API Error 403` followed by a
  `Debug:` line that carries the field. Their other errors carry the server's
  details too. The exit codes do not change.
- **A Workflow's dry run diffs a StartForm's and a transition's `permissions`
  as the permission codes the apply writes.** The server stores permission
  codes there, as in the TaskGroup's lists, and checks them against the codes a
  user's AccessRoles grant; `cotctl workflows apply`, `cotctl apply -f` and
  `cotctl apply --dir` send them as written. The dry run turned each code an
  AccessRole is named after — the scaffold names one after each code — into
  that role's id, so it showed a change the apply never makes, or a changed
  list as ids. It now compares the codes as written and reads no AccessRole to
  do it. The workflow reference said these fields take AccessRole ids: a list
  written that way never matches any user, so replace each id with the
  permission code it was meant to require. The exit codes, under
  `--fail-on-destructive` too, do not change.
- **Without `-y`, `cotctl apply --dir` previews the directory before it asks,
  so its warnings print while you can still decline.** It asked once, with
  the count of files and documents per kind, before it read any entity, and
  printed each warning and destructive finding only after that confirmation,
  as it applied. It now runs the directory as `--dry-run` does first, with
  the same flags, and prints that preview — on stderr under `--json`, with
  `-q` and `--diff` honored — with each destructive finding as the write
  would print it. The prompt totals the preview per action, as in
  `3 CREATE · 12 UPDATE · 40 NO-OP · 1 ERROR — Apply 15 changes to dev?`, and
  the write that follows repeats none of the warnings or findings, a
  `file://` reference that is not a `.js` file included: that warning now
  goes with the others in every apply command, so `-q` silences it too. A
  directory with nothing to
  send says so and asks nothing, and the `--legacy-replace-workflows` warning
  prints before the prompt. A preview that finds an error asks only under
  `--continue-on-error` (see *⚠ Breaking changes*). Under `--json`, a run
  that ends at its preview prints the lines already final on stdout — an
  entity with nothing to change as `unchanged`, and each error — and none for
  what it would have sent. Each stored entity is read twice: once to preview,
  once to write. `-y` and `--dry-run` run as they did.
- **Without `-y`, `cotctl apply --dir` handles a file it cannot read as `-y`
  does.** A YAML syntax error stopped the interactive run before its prompt
  with a bare `Error:`, `--continue-on-error` included, where `-y` reports the
  file and, under that flag, applies the others. The file is now an `ERROR`
  row of the preview, and the files found count it: under `--continue-on-error`
  the prompt asks and the write applies the rest; without it, nothing is asked
  or written. A `--skip-*` flag no longer refuses the directory for it either.
  The exit codes are the ones `-y` gives: `1` for the unreadable file.
- **`cotctl apply --dir --dry-run`, and the preview before the prompt, accept a
  reference to what the same directory creates.** An SLA whose
  `stateMachine`, `start.states` or `end.states` named a state machine or a
  state that a Workflow of the directory creates was reported as not found,
  and so were a JobTitle whose `elements` or `allowedExtensions` named a
  Property or a PropertyType the directory creates; a Survey whose
  `permissions` named an AccessRole it creates, whose `permissionsV2` named a
  code only one of its AccessRoles grants, or whose `+person` question named
  a JobTitle it creates; and a Property whose `COTProperty` `schemaInstance`,
  or a Routine whose `PBScript` stage, named one an earlier file creates —
  though `-y` applied them all. They are now read as the directory's earlier
  files leave them: a stored document whose body needs the id of something
  only the directory creates is an update, since that id is not known yet. A
  name neither the server nor the directory has, a Property or a Routine
  that only a later file creates, which the write refuses too, and a state
  the Workflow does not declare, are still errors.
- **The `Debug:` part of an error is redacted.** The updates of AccessRoles,
  PropertyTypes, Properties, JobTitles, Users, Routines and a Workflow's
  Group ask the server for its debug payload, so an error they meet can
  print it, with the queries and messages of the write, in any environment.
  It printed it as received, on stderr and in the error lines of `--json`. A
  key such as `password` or `token` now reads `[REDACTED]`, as in the body
  cotctl prints for an error it does not recognize, and so does the `value`
  a validation detail or a patch operation names such a field by.
- **An SLA resolves a state whose Property the batched read leaves out.**
  `cotctl slas apply` and `apply --dir` matched the codes of `start.states`
  and `end.states` against one batched read of the state machine's
  Properties, and refused a code whose Property that read did not return as
  not found. They now read that Property by id, as the Workflow apply already
  did, and resolve the state.

### Docs

- **The embedded skills describe 0.14.0.** `cotctl-apply` explains the
  `file://` rules (a reference is read only in a script field, and only inside
  the YAML file's directory), the update notice, and the `preservedElements`,
  `diff` and `destructiveChanges` fields of `--json`. `cotctl-export` says that
  an export writes only what is stored, and that a file exported with 0.13.0 or
  earlier should be exported again. `cotctl-workflows` names `cotctl bot-types`
  for the bot type catalog, says that a Workflow naming a Survey the server
  does not have is refused before anything is written, and lists the bot stage
  `data` and `validate --dir` checks this release adds. `cotctl-bots` no longer
  says that `-y` confirms a `commands: []`, `cotctl-properties` and
  `cotctl-surveys` list the new refusals, and `cotalker-docs` lists
  `cotctl update`.
- **The scaffold tutorial no longer tells you to write AccessRole ids in a
  transition's `permissions`.** A transition, like the root's permission lists,
  takes permission codes: one configured from the old text matches no user and
  stays blocked for everyone. `apply` warns of a code no active AccessRole
  grants (see *Added*).
- **The embedded `cotctl-apply`, `cotctl-bots` and `cotctl-workflows` skills
  and the `@cotctl/cli` README describe `partial: true`** — the lists it
  reaches, the bots of a Workflow's slots included; what `bots: []` and a bot's
  `commands: []` do under it; and the documents it refuses, a partial Routine
  that declares `dataType` and any `partial: true` document under
  `--legacy-replace-workflows`. The `cotctl-workflows` skill also says which of
  its workflow rules the marker relaxes.
- **The embedded `cotctl-workflows` skill lists the bot type catalog with
  `cotctl bot-types list`**, where it said `cotctl bots list`, which lists the
  company's Bots instead.

- **Every kind's YAML reference now states how an update treats what the YAML
  leaves out.** Each of the twelve pages gains an *Update behavior* section: an
  omitted key keeps its stored value, a written `[]` empties the list, `null` is
  accepted only by the fields that name it, and the defaults apply only on
  create — with the exceptions each kind has, such as a property type's
  `schemaNodes`, a schedule's cron, a webhook's `context` and a survey's
  questions. The embedded skills carry the same rules, and `cotctl-apply` gains
  a *What an update sends* section.
- **The workflow merge contract is corrected.** Its reference described survey
  triggers as replaced with no per-item merge, a slot's bot as replaced whole,
  and an unchanged re-apply as a PATCH. It now documents the pairing by survey,
  the completion of a slot's bot, the presence rule for the Group and the
  TaskGroup, and that an unchanged re-apply sends nothing. SM-only mode is
  described by what it actually checks — no workflow root field at all —
  rather than by `nameDisplay` alone.
- **The skills stop stating behavior that changed.** `cotctl-routines` no longer
  says that omitting `isActive` reactivates a routine, `cotctl-bots` no longer
  describes a declared command as replaced whole, and `cotctl-workflows` states
  that an omitted schedule `isActive` activates nothing and that any status but
  `canceled` counts as active.
- **A routine is soft-deleted from its export, not from a stub.** The example in
  the routine reference and in `cotctl-routines` applied a YAML with a
  placeholder `noop` stage, which replaces the routine's real stages: the
  schema requires a full `body`, and a declared stage list is the complete
  list. It now exports the routine, sets `isActive: false` and applies it back.
- **A property type's `hidden: true` is described as it behaves.** On a create
  it sends `viewPermissions: []` over any list the YAML writes; on an update a
  written list wins. It does not hide a visible type.
- **The docs and the embedded skills stop stating what the CLI does not do:**
  - `apply -f` refuses `--continue-on-error` with exit `1`; the `apply` page and
    `cotctl-apply` said it was parsed and ignored.
  - A validation refusal that exits `2` did not send the document it refused,
    but other documents of the same run may have been sent; the exit-code table
    said nothing was.
  - `cotctl bots apply` asks you to type the bot name before `commands: []`
    deletes every command, `-y` included, and `cotctl apply --dir` does not ask
    for the name — its preview names the commands before its one prompt;
    `cotctl-bots` and the bot command reference said it asked in interactive
    mode.
  - `cotctl schedules activate` leaves a cron `pending`, and it starts only once
    its `time` has passed.
  - A `danger` finding is not one every apply asks about first: `-y` skips the
    question and `apply -d` never asks it. `cotctl-surveys` also names
    `cotctl surveys apply` as the command that has `--fail-on-destructive`;
    `cotctl apply` has none.

- **`cotctl-surveys` and the `survey` question reference say how surveys that
  reference each other are ordered inside one file.** `apply --dir` and a
  multi-document `surveys apply -f` apply a file's documents as written, so a
  child survey has to come before the survey that embeds it in the same file
  too: a child placed first is not looked up when its parent is checked,
  `--dry-run` included, and a parent placed first is checked against the
  server, where a child it does not have yet fails it.
- **The survey reference, the bounds page and `cotctl-surveys` say that cotctl
  cannot set `onlyChannelCreation`, `responders`, `representation`, `bounds`
  or `reassignable`**, which they described as ordinary survey fields. The
  complete survey example in `cotctl-surveys` no longer sets `responders`.
- **`surveys apply`, `workflows apply` and `properties apply` document their
  `--json` output**, as `schedules apply` and `apply --dir` do: the fields of a
  line, its actions, how a refused document reads, and where the confirmation
  prompt and `Apply cancelled.` print without `-y`. The option tables of
  `surveys apply` and `properties apply` list `-q`, `--diff` and `--json`.
- **The conditional display reference, the complete survey example,
  `cotctl-surveys` and the survey examples no longer present
  `resetOnHide: true` as clearing an answer**, which the server never stored.
  The reference says the key has no effect and points at `resetIdentifiers`.
- **The exit codes page says, kind by kind, which refusals exit `2`.** A
  Survey, a User or a JobTitle exits `2` through `cotctl apply -f` as through
  its own command, and an AccessRole, a PropertyType, a Property or a Workflow
  exits `1` through both. The page said that the same invalid YAML exits `2`
  through `apply -f` and `1` through `roles apply`, `property-types apply`,
  `properties apply` and `workflows apply`, which holds only for a refused
  `partial` key.
- **The `apply --dir` example output is the one the command prints**: the
  files it found, the prompt, a `[created] <file> — <Entity>: <identifier>`
  line per result and the summary, where the example showed a format cotctl
  never printed. The `apply -f` examples no longer show an id after
  `created successfully`.
- **The `properties apply` option table lists `--fail-on-destructive`**, which
  never changes the exit code of that command: every finding a property can
  raise is a warning. The page named two of them; it now names the third too,
  the one a `--dry-run` gives a property it cannot look up.
- **The User apply and YAML references and `cotctl-users` say how
  `apply --dir` orders a `hierarchy`**: it may name a User of its own file or
  of an earlier one, but not of a later one, which fails in the dry run as in
  the apply. The YAML reference said that a batch handles a forward reference,
  with no caveat. `cotctl-users` names the error as cotctl prints it,
  `User(s) referenced in hierarchy not found: …`, and `cotctl-apply` states the
  file order too. The `users-with-hierarchy.yaml` example says the same, in
  `examples/` and in `cotctl-users`.
- **`cotctl-users` says that one document that fails its pre-apply checks
  stops the whole batch, before anything is sent**, with exit `2`, or `1` when
  every failure is a pinned `id` the server failed to look up. It said that
  the batch stopped only when every document failed, and always with exit `2`.
- **The troubleshooting page no longer says that a question a survey stopped
  declaring takes direct MongoDB access to clean up.** It says that neither
  cotctl nor the public API can delete a stored question, which keeps its
  identifier, and to declare the question with another identifier, as the
  `Identifier "<id>" cannot be reused` hint says.
- **`cotctl-workflows` no longer says that an update cannot change a
  StateMachine's `requiredSurvey.autoCreateTask`.** The server replaces
  `requiredSurvey` whole on an update and stores a written `true` or `false`,
  as on a create, and a YAML that omits the key keeps the stored value. The
  skill said the update ignored the key, so that a `true` set from the
  webclient could only be turned back to `false` with a database write.

- **The User apply reference and `cotctl-users` name the error of a create the
  server answers with a `500` as cotctl prints it**, `Create rejected by
  server (HTTP 500). Most likely causes: …`, and list the update's and the
  hierarchy PATCH's. They cited `Email ... appears to exist but was not
  detected by pre-check`, which cotctl never printed.
- **The `surveys list` reference and `cotctl-export` say that `-s` and `--code`
  match in any case, and list `--active`**, the default, which wins over
  `--all`.
- **The example of `cotctl-workflows` leaves `subtask.target` out.** It wrote
  `target: null`, which clears a stored sub-workflow target when the example
  is applied over a Workflow that exists; left out, the update keeps it.
- **`cotctl-routines` says that a routine update changing a field outside the
  backend's PATCH allowlist is refused with HTTP 403** — `code`,
  `documentation.key`, `documentation.nextType`, `createdAt` or `modifiedAt`.
  It said the backend dropped those fields in silence, as the routine
  reference no longer did.
- **The `apply`, `login` and troubleshooting references, and `cotctl-apply`,
  say which 403 message each kind prints.** They said the user lacked the
  survey administration permission, which still holds for a Survey's
  `API Error 403`. A JobTitle, a User and `cotctl routines apply` name a
  read-only field as `Attempted to modify a read-only field`, and print any
  other 403 as `Forbidden (HTTP 403)` with the server's message, as an SLA, a
  Schedule, a Webhook, a Workflow's state machines and states, and
  `cotctl bots apply` do. A Survey, an AccessRole, a PropertyType, a Property,
  a Workflow's group and task group, and a routine or a bot under
  `cotctl apply --dir` print the server's `API Error 403`, with a `Debug:` line
  that names a read-only field when the update asked for it.
- **The `apply` reference lists which kinds `--dir` takes several documents
  of per file.** It said a Survey file holds one document, while
  `cotctl apply --dir` applies each Survey of a file, as it does for every kind
  but Workflow, and it left out Routines, SLAs, Schedules, Bots and Webhooks.
  It now names them all, the error a file with two Workflows gets, and that a
  file may mix kinds.
- **`cotctl-apply` and `cotctl-workflows` say what order `apply --dir` needs
  for a reference to another document of the same kind.** A Survey's child
  and the Routine a `PBScript` stage calls must come first, in an earlier
  document or file, and the Property a `COTProperty` names must be in an
  earlier file: one that comes later fails unless it is already on the
  server, in the dry run as in the apply.

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
