---
title: Release notes
sidebar_label: Release notes
displayed_sidebar: developer
---

<!-- source: repositories/cotctl/CHANGELOG.md @ 18d0110 (2026-11-04) -->

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

<!-- DRAFT - copied verbatim from the cotctl CHANGELOG for release-0.16.0.
    Before merging, rewrite it for implementation partners: give every
    breaking change a "What to do", drop the internal detail (file paths,
    PR numbers, contributor-only notes) and translate anything left in
    Spanish. Then delete this comment. -->

## 0.16.0 — 2026-11-04

### ⚠ Breaking changes

- **A `gte` or `lte` condition on a question that is neither a `textnumber`
  nor a `datetime` passes `validate` and the apply with a warning, in both
  formats.** The raw format refused it unless the question was a `textnumber`,
  and the simplified format accepted it without a word. The web app's survey
  builder offers the four operators whatever the question's type, and compares
  `gte` and `lte` only on a number or a date, so on any other type the
  condition never matches and the question is never shown: the warning says
  so. On a `datetime` question the condition passes with no message.
- **A raw `exec.onPlay.button` with any of `label`, `type`, `theme` or
  `debounceTime` missing, or stored as `null`, passes `validate` and the
  apply.** The raw format required all four keys and refused `null`, while the
  server leaves each key optional and accepts a `null` button.
- **Under `allow: jobTitle`, `jobs: "*"` passes, and `jobs: []` passes with a
  warning.** The web app's builder saves the string `"*"` for every job title,
  and an empty list once every job title is unselected, which leaves the person
  picker with no users. `jobs` written as a single code still fails, with
  `jobs must be a list, or "*" for every job title` where it said
  `jobs must be a list`; a missing `jobs` fails with
  `jobs is required when allow is "jobTitle": …` where it said
  `jobs must not be empty when allow is "jobTitle"`.
  `jobs: ["*"]`, or a list holding `"*"` among codes, passes with a warning,
  and the apply sends it as the string `"*"`: the payload changes from a list
  to a string. Remote validation looks up none of that list's codes; before,
  the apply failed with `JobTitle "*" not found`.
- **A simplified `exec.onChange`, `exec.presave` or `exec.filter` that is not
  an object fails `validate`.** It passed with a warning while the simplified
  format ignored it; now that the format sends it, a value no update can store
  is refused before the apply.
- **A simplified `exec.onChange`, `exec.presave` or `exec.filter` whose
  JavaScript does not parse fails `validate` and the apply on a Question.** The
  check covers each stage's `src` and the `filter` stage's `filter`. It passed
  with a warning while the simplified format ignored the stage; now that the
  format sends it, the server parses it when it saves the Question and would
  refuse it. On a `+table` column the simplified format only warns: the server
  never parses a column's exec. It is a semantic check, so
  `--skip-semantic-validation` turns it off.
- **A simplified `+table` column's `exec.onDisplay`, `exec.onPlay`,
  `exec.postsave` or `exec.onSubmitSuccess` whose JavaScript does not parse
  passes `validate` and the apply with a warning.** The server never parses a
  column's exec and a cell never runs those stages; `preload` and `validate`
  still fail, and the raw format still refuses one in every stage of a column.

  Migration: nothing refuses a `gte` or `lte` on text, or an empty `jobs`, any
  more, since the server stores both: a pipeline that relied on `validate` to
  stop one can match its warning on stderr instead. A raw `onPlay` button with
  missing keys or `null` now passes with no message, and a pipeline that
  matched the old `jobs` messages has to match the new ones. Write a
  simplified exec stage as an object — `src` and `context`, plus `filter` on
  the `filter` stage. Where `validate` names a syntax error in one of those
  stages, fix the JavaScript at the path it gives, or remove the stage: the web
  app never runs it, and the apply then erases it from the Question. A syntax
  error in a stage a `+table` cell never runs now passes the simplified
  `validate` with a warning: a pipeline that relied on it to stop one can match
  the warning on stderr instead.

- **`validate -f` and `validate --dir` exit `0` with a warning on a Property
  `code` outside `^[a-z][_a-z0-9]*$` or shorter than 3 characters, where they
  exited `1`.** The API refuses such a code when it creates a Property, a PATCH
  cannot change a stored `code`, and `validate` cannot tell a create from an
  update. A server configured to check codes on update also checks it each
  time it saves an update: there, the apply of an update that sends a change to
  such a Property fails, although `validate` and the dry run let it through. An
  empty `code` still fails `validate`.

  Migration: a pipeline that relied on `validate` to stop such a code before a
  create gets that stop from the dry run instead — `--dry-run` on
  `properties apply`, `apply -f` or `apply --dir` refuses the code with exit
  `1` when the apply would create the Property.

- **`slas apply` and `apply --dir` report the SLA they created or updated, and
  exit `0`.** Every SLA create and update ended in `the backend accepted the
  write but answered with no Sla document, so nothing was written`, although
  the write had happened, and the run exited `1`. It now reports `created` or
  `updated`.
  Migration: in every version from 0.12.0 until this one, `apply --dir`
  stopped after the first file holding an SLA, unless `--continue-on-error`
  was passed, so the files after it were never applied: the rest of the SLA
  files, then the Schedule, User, Bot and Webhook ones. This version applies
  them, so review those files first, or run the same `apply --dir` with
  `--dry-run`. A script that read that exit `1` as "nothing was written" now
  gets `0` for the same write.
- **`validate --remote` and the apply of a Survey look up a Question
  identifier that carries a `/`, `?`, `#` or `%` as written.** The lookup sent
  it unescaped: with a `/` it reached no route, so the identifier counted as
  free whoever held it; a `?` or a `#` cut it short, so the check judged the
  text before it; and the server decoded a `%` followed by two hex digits, so
  `a%41b` was judged as `aAb`. Only a run with `--skip-semantic-validation`
  reaches this check with such an identifier; without it, the semantic check
  refuses the identifier first.
  Migration: under `--skip-semantic-validation`, the verdict now follows the
  whole identifier, as written, and can turn either way. An identifier that a
  Question of another Survey of the Company already uses is now refused as a
  conflict where it passed before: always with a `/`, and with a `?` or a `#`
  whenever the text before it was free; rename the identifier. One with a `?`
  or a `#` that was refused for the text before it now passes. One with a `%`
  followed by two hex digits is now looked up literally, not as the server
  decoded it. One with a `%` not followed by two hex digits, which made the
  server answer `400` and stopped the check with an HTTP error, now gets a
  verdict.

- **`logs get --parts stage:<key>` exits `1` and writes no file for a log that
  has no stage by that key**, where it exited `0` and wrote a file holding
  `config: null` and no results for it, which read as a stage that never ran
  and hid a mistyped key. The error names the stages the log has, read from
  its `routine` part with one more request, so the key can be fixed from the
  message alone. Like any `logs get` that stops, it prints no manifest under
  `--json`, and the files written before that log stay. A configured stage
  that never ran is still delivered as an empty part. Two kinds of log cannot
  tell a stage from a typo and are still written as they are: one whose output
  is not valid JSON, and one that stored no response of its run, which is what
  a run that timed out or whose worker threw leaves. On those, a mistyped key
  still goes unnoticed.

  Migration: a script that reads one stage from several logs and relied on
  exit `0` now gets `1` at the first log that lacks it. Fix the key with the
  stages the error names, or leave that log out; `logs pull` still writes such
  logs, with a warning.

- **A command a published data-loss advisory names no longer runs on a cotctl
  version it affects: it exits `5`.** A release that fixes a loss of data now
  publishes an advisory with the package — the affected versions, the version
  that fixes it and the commands that lose the data — and the check before
  every command reads it along with the latest version. A named command stops,
  `--dry-run` included, after printing the loss, the advisory id and the
  version that fixes it on stderr. Without a terminal, in CI or with `-y`, it
  exits `5` right away. On a terminal it offers `update` or `cancel`, with no
  `continue`, and `cancel` exits `5` too; an update that fails stops the
  command as well, where a failed automatic update lets it run. Every other
  command runs as before, so `export` keeps working on an affected version.
  The advisories are kept in the update cache, so a run that cannot reach npm
  still knows the ones the last answered lookup brought, and a cache last
  written by an earlier version, which does not record them, is looked up again
  rather than trusted for its 12 hours.
  Migration: a pipeline that meets exit `5` updates cotctl and runs the command
  again. To run an affected version anyway, set `COTCTL_ACCEPT_ADVISORY` to the
  id the message names (several ids go separated by commas); the command then
  runs with a warning on stderr. `npm view @cotctl/cli cotctl.advisories --json`
  lists the published advisories. The first, `COTCTL-2026-001`, is the loss of
  card labels and allowed extensions on every StateMachine `apply` and
  `workflows apply` updated from 0.5.1 to 0.11.x; those versions predate the
  check and never read it. Only this release and later read advisories: an
  earlier one, 0.14 and 0.15 included, runs every command whatever is published.
- **`COTCTL_NO_UPDATE_CHECK` no longer turns the whole check off.** It still
  silences the update notice, the prompt and the automatic install, but not the
  advisories: a command an advisory names still exits `5`, and the lookup that
  brings them still runs.
  Migration: a job that set the variable to keep cotctl off the network now
  reaches `https://registry.npmjs.org` once every 12 hours while `~/.cotctl`
  can be written, which on a runner that starts with an empty home directory
  is once per job. Where npm cannot be reached, that lookup waits up to 1.5
  seconds before the command runs. Only `COTCTL_ACCEPT_ADVISORY` lets a command
  an advisory names run.

- **`validate --dir --remote` and `validate -f --remote` fail with exit `1` on
  a Survey a Workflow names that the server does not have**, where they
  passed: a StartForm's `requiredSurvey.surveyCode`, a transition's
  `requiredSurvey` or a state's `surveyTriggers[].survey`. The error names
  where the Workflow names the Survey, and `--dir --json` lists it under
  `remoteResults` with the `id` `R3`. With `--dir`, a Survey the directory
  declares counts as present, wherever its file sorts, since `apply --dir`
  creates every Survey before any Workflow; with `-f`, only the server counts,
  as in `workflows apply -f --dry-run`. Codes match whatever their case.
  Without `--remote` nothing changes: `validate --dir` still only warns (X7) of
  a Survey the directory does not declare.

  Migration: a directory or a Workflow file that passed `validate --remote`
  while naming a Survey that exists nowhere now fails it, as
  `apply --dry-run` already did. Correct the code, add the Survey to the
  directory, or apply it first. A Workflow file whose Surveys sit in sibling
  files, or in the file itself, fails `validate -f --remote` until they are
  applied, so validate it with `--dir`, next to them.
- **A missing profile stops `validate --remote` on a Workflow that names a
  Survey to look up**, with its one error and exit `1`, as it already stopped
  a directory holding a Survey. Before, such a run passed, with at most the
  one warning of a bot catalog that could not be read.

  Migration: pass `-c <profile>`, or set `COTCTL_TOKEN` and `COTCTL_API_URL`:
  `--remote` cannot look a Survey up without a credential.

- **`workflows apply`, `apply -f` and `apply --dir` exit `2`, instead of `1`,
  for a `partial: true` Workflow that is not valid once merged with the stored
  one**: a state, transition or state machine it names that is not stored and
  leaves out what a new one needs, a key it names twice, a key the stored list
  repeats, or a bot slot whose stored bots are several. Each was already
  refused before anything was written, `--dry-run` included; only the code
  changes, to the one a `partial: true` Bot, Routine, SLA or Schedule already
  gets for the same refusal.

  Migration: a pipeline that matched `1` for such a Workflow matches `2`. A
  `partial: true` Workflow still exits `1` when:

  - the schema rejects the YAML itself, before the merge: a value it writes,
    such as a state `type` other than `new`, `in-progress` or `closed`. That
    is the `1` a Workflow without the marker gets for a document the schema
    rejects. A field a new state leaves out passes that check, and the merge
    refuses it with `2`;
  - it comes with `--legacy-replace-workflows`, which wipes what the marker
    keeps;
  - a state machine it names is stored pointing at a `propertyType` or an
    `asset.propertyType` that no longer exists. The fault is in what is
    stored, not in the YAML: leaving that state machine out applies the rest;
  - its `nameCode` or `id` is not stored.

  A `partial: true` PropertyType the merge refuses also still exits `1`.

- **`properties export` writes the `code` of the Property a `COTProperty` node
  references, where it wrote its `_id`.** The export now round-trips by code.
  An `_id` the export cannot name — a deleted or deactivated Property's —
  stays, with a warning, and so does every node reference of a PropertyType
  that is not active or cannot be found — an inactive one included when the
  profile cannot read it: listing inactive PropertyTypes takes
  `admin-properties-read`, and without it the backend answers as if the type
  did not exist; the `type: COTProperty` slice at the root of `schemaInstance`
  is written by code all the same.

  Migration: apply such an export with this release or a later one. An older
  cotctl sends the code as written and the backend refuses it. An export taken
  before this release still applies, since each `_id` it holds is the stored
  value, which the apply keeps — with a warning when it names a Property the
  apply now refuses; a script that reads the ids out of an export reads codes
  now.

- **A `COTProperty` node refuses a Property outside its `subType`, by `code` or
  by `_id`.** The backend checks only that the value is an ObjectId, while the
  webclient lists a node's Properties by its `subType`: it showed such a field
  as empty and dropped the reference at the next edit. `properties apply`,
  `apply -f` and `apply --dir`, `--dry-run` included, now fail that Property. A
  value the Property already stores still applies, with a warning.

  Migration: name a Property of the node's `subType`.
- **A `COTProperty` node with no `subType` refuses every reference.** The
  backend accepts such a node and any Property under it, while the webclient
  lists a node's Properties by its `subType`: it showed the value as empty,
  offered no Property to pick and dropped it at the next edit. A value the
  Property already stores stays, with a warning.

  Migration: leave the node empty, or reference the Property from a node that
  has a `subType`. A stored node's `subType` cannot change, so that is a new
  node.
- **An `_id` in a `COTProperty` node must name an active Property.** One that
  names a deleted or deactivated Property, or none at all, was sent as it is
  and shown as empty; it now fails the Property, unless it is the stored value,
  which stays with a warning. A code that names a deactivated Property was
  already refused as unknown, and still is: re-export the Property that
  references it to get the `_id` the export keeps.

  Migration: use the code of an active Property, or remove the value.
- **A `COTProperty` list refuses an empty item.** The webclient never saves
  one, and can read a `null` item as every Property of the type, so the next
  edit of the field saves them all. A stored one stays, with a warning.

  Migration: drop the item. `[]` is an empty list, which a `required` node
  refuses.
- **A `COTProperty` list refuses a Property it already holds.** The backend
  stores the repeat, while the webclient shows each Property once and saves the
  list without it at the next edit of the field, which can leave the list
  under `arrayMin`. A code and the `_id` of the same Property count as a
  repeat. A stored one stays, with a warning.

  Migration: drop the repeat.

- **The apply refuses a schema node `key` longer than 62 minus the length of
  the PropertyType's `code`, and `validate` warns about it.** The backend
  checks that limit on every node of every write of the type, stored nodes
  included, so such a key passed `validate` and `--dry-run` and failed the
  apply. `property-types apply`, `apply -f` and `apply --dir`, `--dry-run`
  included, now refuse it on a node they create, and refuse an update of a type
  that already stores one whenever the update sends something; an update that
  sends nothing only warns. `validate -f` and `validate --dir` (check `S7`)
  warn and pass, as they do for the 3-to-50-character rule on a node the apply
  creates: they cannot tell whether the apply will send anything, and the
  export of a type stored with such a key has to pass its own `validate`.

  Migration: shorten the key, or the code of a type being created. A type
  already stored with such a key refuses every write in the backend, with or
  without cotctl.

- **`cotctl login` saves the profile under the name `-c` gives it.** With `-c`
  before or after `login`, the profile was saved under the `--subdomain` value,
  with exit `0`: the option every other command reads as the profile to use was
  ignored. `-c` now names the profile, as `--profile` does. When both are given
  with different names, `--profile` wins and `login` warns on stderr that `-c`
  was ignored — the rule `logout` already follows, where the positional profile
  wins over `-c`. `--subdomain` still labels the company the profile belongs to.
  An empty or blank `-c` or `--profile` counts as not given, as it does for
  every other command, so the profile falls back to the next name in line
  instead of being saved under a name no command can select.

  Migration: a script that passes `-c` to `login` finds the profile under that
  name, not under the subdomain; select it with the `-c` name, or drop `-c` from
  the `login` line. When the `-c` name is a profile that already exists, `login`
  now asks before overwriting it, and without a terminal or `--yes` exits `1`
  where it saved under the subdomain and exited `0`. With `-y`/`--yes` it does
  not ask: it overwrites that profile with the credentials of whichever
  environment the login authenticated against and exits `0`, so a script or
  alias that passes both `-c` and `--yes` should check the profile name it
  targets. The same holds for an alias or wrapper that adds `-c` to every
  command.

- **`schedules logs`, `webhooks list` and `webhooks logs` exit `2`, instead of
  `1`, when `COTCTL_COMPANY_ID` does not match the company of `COTCTL_TOKEN`**,
  as `apply` already did: the mismatch is refused as an input error before any
  request is sent. The check runs only on a run without `-c`, which takes its
  credential from the environment.

  Migration: a pipeline that matched `1` for that refusal matches `2`, or tests
  for a non-zero exit, as the authentication page advises: the same refusal
  still exits `1` from other commands, `webhooks get` among them.

### Added

- **A Routine update uses the server's keyed route where it exists.**
  `routines apply` and `apply --dir` now send an update to
  `PATCH /api/v2/pbscripts`, with the `code` in the body, and fall back to
  `PATCH /api/v2/pbscripts/:id` when the server answers the HTML 404 of a route
  it does not serve. The routine ends up the same either way, but for the
  `dataType` input described next. Against a server without the route, an
  update behaves as it did before: one attempt per run, remembered per API URL,
  nothing kept on disk. A JSON error from the keyed route — `ENTITY_NOT_FOUND`
  included — fails without trying the other route. A YAML that reorders
  `body.stages` is sent through the old route, the only one that writes an
  order, with a warning saying so.
- **On the keyed route, a routine input written over another stored one keeps
  nothing of it, and draws no warning.** That route replaces `dataType` whole,
  so an input with no stored counterpart, or one that moved, is written as the
  update sends it. The warning naming what such an input keeps of the stored
  one — its `description` or `type` — appears only when the update goes through
  `PATCH /api/v2/pbscripts/:id`: on a server without the keyed route, for a
  YAML that reorders `body.stages`, or with `COTCTL_LEGACY_PATCH` set, in a
  `--dry-run` as well.
- **`--dry-run` asks the server where the keyed route exists.** The update is
  sent with `?dryRun=true`, which validates it without saving anything; a
  profile without write permission, and a server without the route, get
  cotctl's own preview as before. `routines apply` dry-runs every document
  before it writes, and so does `apply --dir` without `-y`, so there an update
  reaches the server twice.
- **cotctl checks its diff against the server's `ops`.** It warns when the keyed
  route announces an operation the local diff did not predict — a warning `-q`
  does not silence — and notes a predicted change the server does not announce.
  An answer with no operation saved nothing, so the routine is reported
  `unchanged` (`no-op` in a dry run). The route's own warnings are printed too —
  a violation the stored routine already had, a `dataType` that repeats a
  `key` — and its errors list the fields it refuses or the violations an update
  would introduce.
- **Where the server has the keyed route, a Routine whose stored stages repeat
  a `key` or lack one stops with a message that says how to fix it.** The route
  refuses such an update with a 409 `STORED_KEY_CONFLICT`, in a dry run too, and
  writes nothing; once cotctl knows the route is there, it stops on the routine
  it read before sending anything, and while it does not know yet it asks with a
  dry run first. The update is not retried through
  `PATCH /api/v2/pbscripts/:id`: cotctl names the routine, the stored stage by
  its index and the repeated key, and says to give that stage a unique `key` in
  the webclient's Routine editor or through `PATCH /api/v2/pbscripts/:id` before
  re-running. Both cases print the same message and `--json` line, and the apply
  exits `1`. Only that 409 is read as a conflict: any other JSON error to the dry
  run fails as the route sent it, with its own `code` and `data`; a dry run the
  route accepts — the routine changed after cotctl read it — stops and asks to
  re-run; and a profile without write permission stops saying so, since the
  route could not tell. These last two carry no `code` in `--json`. A server
  without the keyed route still takes such an update through the old route, as
  before.
- **`routines apply --json`** prints one JSON object per routine on stdout, as
  `schedules apply --json` does, errors included. A result the keyed route
  answered carries its `ops` exactly as the server sent them, and so does the
  Routine line of `apply --dir --json`; a `partial: true` update carries the
  stages it keeps as `preservedElements`. An error the keyed route answered
  keeps its `code` and `data` in the line's `error` object.
- **A `partial: true` Routine takes the same route as any update.** cotctl
  completes the document with the stored stages before sending it, so the keyed
  route and `PATCH /api/v2/pbscripts/:id` both receive the complete
  `body.stages`, and the refusals, the script gate and the unreachable-stage
  warning apply before either is tried.
- **`COTCTL_LEGACY_PATCH=1` sends every update through the old routes**, without
  trying the keyed ones. `1`, `true`, `yes` and `on` set it; `0`, `false`, `no`,
  `off` or no value leave detection on; any other value is refused before
  anything is sent, and `apply` exits `2`. It exists for the transition and
  will be removed in a later release.

- **`cotctl logout --revoke` revokes the ApiToken even when another local
  profile still uses it**, and names the profiles it leaves unable to
  authenticate. Without it, `logout` keeps a shared token active (see Fixed).
- **`cotctl profile delete -y/--yes` deletes the profile without asking**, so
  a script can remove one profile and leave its token active. Without it, the
  command still asks on the terminal.
- **`cotctl login --paste-token` and `--token` warn on stderr when another
  profile already holds the token they save**, naming it. The profile is saved
  anyway.
- **The `cotalker-docs` skill and the npm package's README tell `logout` and
  `profile delete` apart.** The skill described `logout` as only removing a
  saved profile, and the README as always revoking its ApiToken. Both now say
  that `logout` revokes the ApiToken unless another local profile still uses
  it, that `--revoke` revokes it anyway, and that `profile delete` keeps the
  token active and deletes without a terminal only with `-y`. Installed skills
  are files on disk: run `cotctl skills install` again to get this version.

- **A Workflow YAML can set how many Tasks its task list loads per page, with
  `taskPaginationLimit`**, an integer from 10 to 100 that takes precedence over
  the Company's limit. `validate` and every apply refuse a value outside that
  range, a fraction or a string; `--dry-run` shows the change in the Workflow's
  diff; `workflows export` writes it when the workflow has one, and `workflows
  get` prints it as `Tasks per page`. Omitting the key keeps the stored value,
  and a workflow without one keeps using the Company's limit;
  `taskPaginationLimit: null` clears it, back to the Company's limit. It needs a
  backend that stores the field: an older one accepts the request and ignores it.

- **A Workflow YAML can set the order of its task list's default view**, with
  `defaultSortBy: modifiedAt` or `defaultSortBy: createdAt`; tasks are always
  listed newest first. `validate`, `apply` and `workflows apply` accept it,
  `--dry-run` shows the change, and `workflows export` writes it when the
  Workflow has one. Leaving it out keeps what the Workflow has, and one that
  never set it sorts by `modifiedAt`. Any other value is refused before a
  request is sent, `null` included: going back to the default is writing
  `modifiedAt`.
- **It needs a backend that stores the field.** An older one accepts the
  request and drops the key, so the apply reports success and the next
  `--dry-run` lists the same change again.

### Changed

- **The `cotctl-routines`, `cotctl-bots` and `cotctl-workflows` skills have
  Claude propose an error path for every stage that can fail** — sending an
  email or a message, calling an endpoint, invoking a Routine, writing what the
  backend can refuse — instead of writing `ERROR: ""` by default, and ask before
  leaving one out. A stage that fails onto `ERROR: ""` ends the run unnoticed,
  and the run is still logged as executed, so a broken email stage could go
  unseen until someone missed the email.
- **They pin the version of a bot type that reports a failure on `ERROR`**,
  because the default version of many types does not: the default `PBEmail`
  and `PBMessage` report a failed send on `DEFAULT`, the default
  `PBCreateTask` reports a task it did not create on `NOT-CREATED` and crashes
  on a refusal, and the default `PBChangeState` crashes on one. The examples
  pin `PBEmail` `3.0.1` and `PBMessage` `2.2.0`, and the skills name
  `PBCreateTask` `2.0.1` and `PBChangeState` `2.1.0`. They also say where an
  error branch cannot help: a `PBScript` stage's `ERROR` does not see a
  failure inside the Routine it invokes.
- **They tell the user when a failure cannot be routed at all, by how the bot
  fails rather than by the branches it declares**: a failure the bot reports
  reaches `ERROR` — `PBCalendar` `2.0.0` routes every failure there, although
  it declares only `DEFAULT` — while one it throws ends the run as
  `UNHANDLED_ERROR`, past every branch. For `PBGiphy`, `PBWhatsApp`, the `ST*`
  survey tools and `CBCheckOTsched`, whose own failures never reach `ERROR`,
  the skills say so instead of adding an `ERROR` branch that would never run.
- **When they pin an existing stage, they rename its `next` and re-check its
  `data`**: the pinned versions accept only `SUCCESS` / `ERROR` — `DEFAULT`
  and `CREATED` become `SUCCESS`, `NOT-CREATED` becomes `ERROR`, keeping one
  handler where the stage already has the new key — and check `data` against
  a schema the default does not have, so a `PBEmail` stage whose `targets` is
  not a list of valid emails fails every run once pinned. A stage left as it
  was never runs its bot, and `cotctl validate` catches neither.
- **Before a Routine or a bot goes live, they test both branches**: two runs,
  one forced through `ERROR`, read with `cotctl logs list` and `cotctl logs get
  --parts results` — for a Routine, two `cotctl routines test` runs found with
  `cotctl logs list --owner TEST`. Installed skills are files on disk: run
  `cotctl skills install` again to get this version.

- **Only a create refuses a Property `code` outside `^[a-z][_a-z0-9]*$`.** The
  API enforces the charset whenever it creates a Property, and the backend
  stores many codes that do not match it: the `unique-<task id>` code it gives
  each Task's asset, or the concatenated codes of `local_concat`. A PATCH
  cannot change a stored `code`, and an update checks it only on a server
  configured to check codes on update; cotctl cannot tell which servers are.
  `properties export` writes those codes as stored, and `validate` and `apply`
  refused the file it had just written. Now `properties apply`, `apply -f` and
  `apply --dir` update such a Property and refuse the code only when they would
  create one, in a dry run too. On a server that checks updates, the apply of
  an update that sends a change to such a Property fails although the dry run
  reports it as an update; a re-apply that changes nothing sends no request, so
  it passes.
- **A Property `code` shorter than 3 characters follows the same rule.** The
  API enforces the 3-character minimum when it creates a Property, as it does
  the charset and the 50-character cap, and on an update only where it
  enforces the charset. `properties apply`, `apply -f` and `apply --dir` refuse
  it only when they would create the Property, in a dry run too; updating a
  Property stored with a short code goes through, except on a server that
  checks updates.

- **`surveys apply --dry-run` and `apply --dry-run` name what a Survey update
  changes on each Question.** The first raw re-apply of a Survey built in the
  web app read `Would UPDATE` without naming a field, while the PUT rewrote its
  Questions. The diff now comes from the same comparison that decides the
  action, one entry per Question and field
  (`questions[identifier="…"].isReadOnly`), so a second re-apply still reads
  `No changes`. The compact diff counts a change several Questions share on one
  line (`+ questions[].isReadOnly ×7`), and `--diff verbose` lists every entry.
  A Question an update adds or removes is one entry of its own
  (`questions[identifier="…"]`, or `+ questions[] ×3` in the compact diff), next
  to the entries of the Questions it edits: a change in how many Questions there
  are no longer reads as a single `chat` entry. A SurveyChat it adds or removes
  whole is one such entry per item, its `+text` title included, so the compact
  count includes titles; one holding an item with no identifier, or two with the
  same one, is a single entry on its index instead (`chat[2]`). The same
  Questions in another order are one `changed` entry on their list.
  A note under the diff counts the stored keys at their default value that the
  update leaves out and that read back the same; with `--diff verbose`, another
  counts the `command.values` conditions the backend stores with a new `_id`.
  No action, exit code or flag changes.
- **The `diff` of `--json` carries those entries, and the notes stay out of
  it.** A stored value the update removes, such as `required: false`, is an entry
  with `kind: "deleted"`, and so is a Question it removes: a pipeline that stops
  on any `deleted` entry will stop on those first re-applies, and on an update
  that removes a Question. Check the entry's `field`, or rely on
  `destructiveChanges` and `--fail-on-destructive`, which this does not touch.
  An entry on a whole Question carries that Question, never the SurveyChat that
  holds it: as `after` when the update adds it, as `before` when it removes it.
  An entry on an index (`chat[2]`) carries a whole SurveyChat, and the one on
  the list itself (`chat`) carries both lists, the stored one as `before` and
  the sent one as `after`: a reorder gives it, and so does a change in how many
  SurveyChats there are when one of them cannot be named.

- **`properties apply`, `apply -f` and `apply --dir` fail only that Property
  when its `id` is one the backend answers with a 404, and apply the other
  Properties of the same file.** The apply used to stop the file on the raw
  404; it now reports `Property with id '<id>' was not found`, as it already did
  for an empty answer, and still exits `1`. So the other Properties of that
  file are written now where the 404 used to stop them: a pipeline that relied
  on it should fix or remove the `id` first. `apply --dir` still stops after
  that file unless `--continue-on-error`.

- **`schedules list` is ordered newest first**, so `--type all` shows the
  schedules created most recently instead of the oldest ones in the company.
  The columns, the `--json` output and the exit codes are unchanged.

- **`cotctl login --token -` reads the token from stdin before it discovers the
  API URL, sends any request to the Cotalker backend or asks anything**, as
  `--token @<path>` and the literal value already did. An empty stdin, one past
  8 KB, or a terminal where `-` expects a pipe now fails before the discovery
  instead of after it, and a stdin that never closes fails 10 seconds after
  `login` starts reading it — ahead of the discovery — rather than 10 seconds
  after the discovery. The messages and the exit code are the same. When the token
  comes from a slow command piped into `login`, that command's time now adds to
  the discovery's, where the two used to overlap. With `--api-url`, which skips
  the discovery, nothing changes.

### Fixed

- **`surveys export --format raw` writes an `exec.onPlay.button` that
  `validate` accepts, whatever keys it stores.** The raw format required
  `label`, `type`, `theme` and `debounceTime` on every button, all four of
  which the server leaves optional, so the raw export of a Survey with a button
  saved without `debounceTime` failed its own `validate`. Each key is now
  optional in the raw format, as it already was in the simplified one, and the
  button may be `null`, as the server allows.
- **`surveys export --format raw` skips a SurveyChat of a type the survey
  update does not accept back, such as `text/system`, with a warning.** It
  wrote the bubble as stored, and `validate` and `apply` refused the file. No
  YAML can write such a bubble back, so the warning says what applying the
  export does: it deactivates that SurveyChat. The dry run says so too, in a
  `warn` line that `--fail-on-destructive` lets through. The simplified export,
  which already dropped the bubble, no longer sends you to `--format raw` for
  it. The embedded `cotctl-surveys` and `cotctl-export` skills now say so too.
- **`surveys export` writes a jobTitle filter stored as `"*"` or as a single
  code.** "All job titles" exports as `jobs: "*"`, and a legacy single code as
  the one-code list the web app reads it as, which an apply writes back as
  stored. Both were left out without a word, and `validate` refused the export.
  A stored value that is neither is now named in a warning. A stored list
  holding `"*"`, which the web app reads as every job title but its builder
  cannot show, exports as `jobs: "*"`, without the list's other codes, with a
  warning that the next apply writes it back as the string.
- **The simplified format keeps a Question's `exec.onChange`, `exec.presave`
  and `exec.filter`.** The export left them out and the apply never sent them,
  so re-applying a simplified export erased them from every Question and
  `+table` column that stored them. Both formats now export and send them as
  written, and `validate` and the apply warn that the web app never runs them,
  as they already did for the raw format; on a Question the warning adds that
  saving the Survey from the web app's builder removes them, and on a `+table`
  column, that opening or editing the column, or editing its table, there may
  remove them. The simplified format also checks their JavaScript, which the
  server parses when it saves a Question, and only warns on a `+table` column,
  whose exec the server never parses.

- **The Routine, Bot, SLA and Schedule examples in the skills used
  `PBSendMessage`, which is not a registered bot type**, with `channelId` and
  `text` in its data — a stage that fails at runtime. They use `PBMessage` with
  its own data now: `content`, `contentType`, `sentBy`, `channelIds`. The
  `cotctl-workflows` skill's `PBEmail` examples wrote the recipient as `to`;
  they write `targets`, with `subject` and `content`.
- **The `cotctl-workflows` skill's `PBCreateTask` examples had no `name`**,
  which every version of the bot needs, so the stage failed on every run. They
  carry one now, and its reference routes the default version on `CREATED`,
  the branch it reports, instead of `DEFAULT`, which it never does.
- **Two bots of the `cotctl-workflows` skill's Workflow example never did
  their work.** Its survey-triggered bot started on an `FCEach` stage with no
  `data`, which stopped the run before the next stage, and that stage gave
  `PBSendSurvey` a `surveyId` its default version does not read: it is a
  single `PBSendSurvey` stage with `survey`, `channel` and `recipient` now. Its
  sub-task bot's `PBSendCustomNotification` had no `data`, which the bot
  refuses on every run; it carries `content` and `channelId`.

- **`workflows apply --dry-run` and `apply --dry-run` refuse a state machine
  whose PropertyTypes or asset Property do not exist, as the apply does.** A
  `cardLabels` or `allowedExtensions` code — or the state machine's
  `propertyType`, its asset's `propertyType` or a generic asset's `property` —
  that the server does not know showed up in the dry run as a planned change,
  with exit `0`, and the apply then stopped with
  `PropertyType "<code>" not found` or `Property "<code>" not found`. The dry
  run now reports the same error and exits `1`, for a Workflow the server has
  and for one it does not have yet. Under `apply --dir --dry-run`, a
  PropertyType or Property the same directory declares counts as present, since
  the apply creates it first.
- **`surveys apply --dry-run --skip-semantic-validation` refuses what the apply
  refuses when it builds the Survey.** A shape only the semantic check catches,
  such as a single-value `personFilter.jobs`, passed the dry run with
  `Would UPDATE` or `Would CREATE` and exit `0`, and the apply refused it with
  exit `2`. The dry run now reports the apply's error, with its exit code.
  Without the flag nothing changes: the semantic check refuses such a shape
  first.
- **`validate` warns about a Property `code` longer than 50 characters, and the
  dry run refuses it on a create.** The API caps the code at 50 whenever it
  creates a Property, so `validate` and `--dry-run` approved a longer one that
  the create then failed with a 400. `validate -f` and `validate --dir` now warn
  and pass, since they cannot tell a create from an update, and
  `properties apply`, `apply -f` and `apply --dir`, dry run included, refuse the
  code only when they would create the Property, before sending anything.
  Updating a Property already stored with a longer code works as before,
  except on a server configured to check codes on update.
- **With an `id` in a Property YAML, `--dry-run` announces what the apply
  does.** The dry run looked the Property up by `code` alone, so an `id` with a
  new code announced a create, an `id` with another Property's code announced
  that Property's update, and an `id` the backend does not hold announced an
  update by code — three cases the apply refuses. The dry run now reads by `id`,
  as the apply does, and refuses the same three with the apply's message. It
  also refuses a changed `propertyType`, which the apply already refused.
- **`workflows apply --dry-run` and `apply --dry-run` refuse a State whose
  Property does not exist, as the apply does.** The dry run skipped such a State
  and announced the update with exit `0`, and the apply then stopped with
  `Property "<code>" not found`. The dry run now reports that error and exits
  `1`, in a state machine the server has, in a new one and in a new Workflow.
  Under `apply --dir --dry-run`, a Property the same directory declares counts
  as present. When it cannot read the Properties a state machine references,
  the dry run says so in a warning that names the state machine, and leaves the
  verdict to the apply.

- **`cotctl logout` no longer revokes an ApiToken another local profile still
  uses.** `login --paste-token` and `login --token` can save one token in
  several profiles, and a `logout` of any of them revoked it for all, leaving
  the others unable to authenticate. It now removes only the profile you named,
  keeps the token active and names the profiles that still use it; the last of
  them to log out revokes it. Only the profiles on this machine are checked: a
  token also saved on another machine, or kept as a CI secret, is still revoked
  by the last local `logout`.
- **`apply --dir` names the files a run that stopped early never reached**, on
  stderr, right under the summary: `Not reached, the run stopped before them:
  …`. The summary counts only the files the run chose to skip, so a run that
  stopped at an error said `0 skipped` and nothing about the files after it. A
  mixed-kind file whose later kind never ran is named with that kind. The
  summary line, still the last line of stdout, and the `--json` output are
  unchanged.
- **`slas list --state-machine`, `slas get`, `slas export`, `slas apply` and
  `apply --dir` name the inactive Workflow a state machine belongs to**,
  instead of saying it does not exist and asking to apply a Workflow that is
  already applied. The exit codes are unchanged: the SLAs of an inactive
  Workflow are still neither read nor applied.

- **`logs pull --parts stage:<key>` warns on stderr once per log that has no
  stage by that key**, where it said nothing. The pull goes on and writes those
  logs as before, with `config: null` and no results for the key, and its exit
  code does not change: the runs a pull matches need not share their stages.
  As in `logs get`, a log whose output is not valid JSON or that stored no
  response of its run is not judged, and gets no warning.

- **`--legacy-replace-workflows` names every card-label slot of a StateMachine
  it updates, `null` where the YAML declares none.** With no `cardLabels` in the
  YAML, or with `cardLabels: {}`, it sent the active labels empty and no slot at
  all: the body every release from 0.5.1 to 0.11 sent on each update, erasing
  the labels. A backend that refuses that body over stored labels, to protect
  them from those releases, no longer refuses the legacy replace for it. The
  labels end up cleared as before, and the dry run reads as before.

- **`validate --dir --remote` ended `ready to apply`, with exit `0`, on a
  directory whose Workflow names a Survey that exists nowhere**, while
  `apply --dir --dry-run` refused the same directory with exit `1`, naming the
  transition. A pipeline that gated a pull request on `validate --remote`
  stayed green until the apply. The remote checks now look each of those
  Surveys up as the dry run does, before anything is written, so, on the
  Surveys a Workflow names, `validate --dir --remote` reaches the verdict of
  `apply --dir --dry-run`, and `validate -f --remote` on a Workflow file
  reaches that of its own dry run. The dry run still checks more: it resolves
  a Survey's `permissions` and `permissionsV2`, and refuses a bot stage that
  lacks the `data` its type requires, where `validate --remote` only warns, so
  it stays the last check before an apply.

- **`schedules list` reads beyond the first page, up to the newest 1000
  schedules.** It read a single page, and the server answers at most 100 per
  request: where most schedules are canceled ones belonging to SLAs,
  `--type all` could show `1 schedule(s)`. It now reads page after page until
  it has `-l` schedules that pass the active filter and `--search`, until a
  page comes back short, or until it has read 10 pages (the newest 1000), so a
  `-l` above 100 works within those 1000. When it stops at the 10 pages and
  the server holds more, it says so on stderr with the server's total; stopping
  because `-l` was reached does not warn. stdout and `--json` keep their shape.
- **`schedules list -s` filters.** The server ignores the search it was sent,
  so `-s` returned the same listing as without it. It now keeps the schedules
  whose code, or the name or description of the bot they run, contains the
  text, case-insensitively, over the pages read.
- **`schedules list --no-cron` lists only the one-shot schedules.** It was
  parsed and then dropped, so it returned the cron ones too. It now asks the
  server for the schedules without a cron expression. Given together with
  `--has-cron`, `list` warns and keeps `--has-cron`.

- **A `partial: true` document that names an element no stored one holds says
  so.** A misspelled `property`, `target`, `code` or stage `key` reads as a new
  element, and when it left out what a new one needs, the refusal named only
  the missing field — `…states[property="<x>"].type: Invalid option` — which
  sent you looking for a `type`. It now leads with `State "<x>" is not stored
  in <list>, so partial: true would add it as a new state, and nothing stored
  completes what it leaves out:`, and the warning that the apply adds the
  element is no longer printed beside the refusal. Every kind `partial: true`
  covers.
- **`validate --workflow` names an inactive form by its code.** Check T4
  listed each form the workflow references that the active surveys do not
  include by the id the workflow stores, as `deleted or inactive`. It now reads
  each one: an inactive form is named by its code, marked `(inactive)`, and a
  reference no Survey of the company answers to is shown as the workflow
  stores it — its id, or its code — marked `(not found)`. A reference whose
  read finds it active no longer warns. T4 reads one Survey per reference
  stored as an id, and walks the company's inactive Surveys once when a
  reference is stored as a code. It reads them only when the `configuration`
  section runs.
- **A question's `responses#<column>` context names the column's table.** On a
  question outside a `+table`, a context naming one of its columns warned that
  the identifier `does not exist in this survey`, although the column exists.
  The warning now says that a context outside the table does not see its rows,
  so it resolves empty, on `validate` and every apply, `--dry-run` included.
  It is still a warning.
- **An apply whose write the server answers with no document says it could not
  confirm the write**, instead of `the backend accepted the write but answered
  with no <kind> document, so nothing was written`: cotctl cannot know that
  nothing was written. Only the message changed; the run still fails with exit `1`.

- **`--diff verbose` lists what an entity with nothing to change keeps.** A
  state machine whose declared `cardLabels` equal the stored ones, and that
  changes nothing else, read `No changes to StateMachine` and printed no diff,
  so the labels' `preserved` entry reached only `--json`. With
  `--diff verbose`, a dry run now lists such an entity's preserved entries
  under its `No changes` or `[NO-OP]` line, as it does under an update's — for
  that state machine, `= cardLabels (preserved)`. This holds for
  every command with `--diff`: `workflows apply`, `surveys apply`,
  `properties apply` and `apply`, with `-f` and with `--dir`. The compact
  default, `-q`, `--json` and the exit codes are unchanged.
- **`validate` and `--dry-run` warn about every key a Survey Question does not
  take.** Each Question type sends only the keys it reads, so a `tree` or a
  `creation` written next to a `property` Question's `filters` instead of inside
  one of them, a `jobs` outside `personFilter`, a `min` on a `gps` Question, a
  raw-format key such as `isActive` or a typo passed `validate` and vanished
  from the write without a word. One warning per key names where it belongs or
  which types take it; a `+table` column gets the same. It is a warning: no exit
  code changes, and `--skip-semantic-validation` skips it with the rest.
- **A Property names another Property by `code` under a `COTProperty` node, and
  the apply sends its id.** The backend stores the id of the referenced
  Property, and cotctl resolved a code only in the `type: COTProperty` slice at
  the root of `schemaInstance`, so a node given a code passed `validate` and the
  dry run and failed the apply with a 400. `properties apply`, `apply -f` and
  `apply --dir` now resolve the code of each such node — read from the
  PropertyType the apply already reads, single values and lists alike — and
  send an `_id` that is already one as it is, once it names an active Property
  of the node's `subType`. A node that is not active is left out of the
  write, with a warning: the backend does not store it, so re-applying an
  export leaves the value stored under it as it is. Under `apply --dir`, the
  dry run's diff shows a reference to a Property an earlier file creates as
  `<id of <code>, created by this batch>`,
  which the apply replaces with that Property's `_id`; an error names the
  code as written.
- **A COTProperty code that names no Property fails only that Property, in the
  dry run as in the apply.** The dry run reported the unresolved references
  alone, for the whole file, while the apply failed those Properties and wrote
  the others; the dry run now previews the others too, and still exits `1`. A
  file that also fails a check of the whole file — a PropertyType that does not
  exist — still stops. Its Property then lists an unresolved reference next to
  that error only from the `type: COTProperty` slice, since a type that does
  not exist has no node to read. An `_id` in the `type: COTProperty` slice,
  where the type has no node of that name, now applies as it is, where it was
  refused as an unknown code.
- **The dry run refuses a schema node `key` the backend refuses on a node it
  creates, and `validate` warns about it.** The backend creates a node only
  with a `key` of 3 to 50 characters matching `^[a-z][a-z0-9_]*$`, while cotctl
  asked for one character, so `validate` and `--dry-run` approved a key the
  apply then failed with a 400. `property-types apply`, `apply -f` and
  `apply --dir`, dry run included, now refuse such a key on a PropertyType they
  create and on a node an update adds, before sending anything. A type stored
  with such a key — a `firstName` written before the rule — still updates, since
  an update sends no change to a stored node's key. `validate -f` and
  `validate --dir` (check `S7`) cannot tell the two apart, so they warn and pass.

- **The dry run refuses a `COTProperty` value of the wrong shape, as the apply
  now does before sending anything.** A single value in an `isArray` node, a
  list in a single-value node, an empty `required` node (`[]` included) and
  a list outside `arrayMin` / `arrayMax` passed `--dry-run` and failed the
  apply with a 400;
  both now fail that Property alone, and so does a value that is neither a
  Property code nor an `_id`. The backend checks every node when
  `schemaInstance` changes, so a stored value of the wrong shape fails a write
  that changes another key, and the error says it is the stored value; a write
  that does not send `schemaInstance` only warns about it.
- **A node named `propertyType` or `propertyTypes` is read as that node.** On a
  `type: COTProperty` instance, cotctl took such a key for the legacy slice at
  the root of `schemaInstance`, which the backend does not store: a
  `COTProperty` node of that name is now resolved as a node, and a node of any
  other `basicType` is sent as written.

- **`cotctl login` asks whether to overwrite an existing profile before it
  authenticates.** The question came after the browser or password login had
  minted a new ApiToken, so answering `n` left that token active with no profile
  referencing it — and, when the existing profile held the token the same user
  had minted on the same machine, the login could already have deactivated it,
  so even the profile it kept needed a new login. The question now comes before
  the API URL is discovered, the browser opens or a password is asked for, so
  `n` mints nothing and leaves the existing profile as it was. It still exits
  `1`, and `--yes` and runs without a terminal behave as before. Only a profile
  that another process saves while the login runs is asked about after
  authenticating, and a `n` then still names the token it leaves behind.

- **The automatic re-login checks the user before it mints a new ApiToken.**
  When a profile's ApiToken expires or is revoked mid-command, cotctl asks for
  the password and logs in again, and refuses when the login resolves to a user
  other than the one the profile is bound to — which takes two users sharing an
  email, or a profile edited by hand. It refused only after minting a token for
  that user, which stayed active with no profile referencing it and nothing
  saying so. The refusal, its message and its exit code are the same; it now
  comes before any ApiToken is created or deactivated, so it leaves none behind.
  And when the new token is minted but the profile cannot be saved, on a full or
  read-only disk, the re-login names that token and where to revoke it, as
  `cotctl login` does, before failing with the same error.

- **The text output of a dry run names a state machine's card labels
  `cardLabels`, the key the YAML uses.** It printed the API's name for them,
  `dynamicPropertyTypes` — `= dynamicPropertyTypes (preserved)` under
  `--diff verbose`, or `~ dynamicPropertyTypes: …` when they change — a name
  that appears in no YAML. It now prints `= cardLabels (preserved)` and
  `~ cardLabels: …`, in the commands that apply a Workflow: `workflows apply`,
  `apply -f` and `apply --dir`. `--json` is unchanged: its `diff[]` entry keeps
  `field: "dynamicPropertyTypes"`.

- **A `-l` that is not a positive integer now exits `2` before any request is
  sent**, with `--limit takes an integer from 1 to 100, got "-5".` on
  `schedules logs` and `--limit takes a positive integer, got "-5".` on
  `webhooks list` and `webhooks logs`, as `logs list` already did. A negative
  `-l` used to reach the backend as written: on `schedules logs` the log reader
  turned it into no limit at all, lifting its 100-row cap, so `-l -1` returned
  every log of the Schedule. A `0` or a non-number (`-l abc`) was dropped
  instead, and the backend's own default of 10 rows answered in place of the
  documented 50 or 100.
- **`schedules logs -l` takes at most 100**, the most the log reader returns: a
  higher value was cut to 100 without a word, and now exits `2`.
- The `-l` change is a fix, not a breaking change: every value now refused
  either removed the cap or was silently replaced by another, so none of them
  ever did what it asked for. Every value from 1 to the cap is sent exactly as
  before, and the defaults are unchanged.

### Docs

- **The documentation and the YAML examples give every stage that can fail an
  error path.** Their stages sent `ERROR` to `""`, which ends the run
  unnoticed while the run is still logged as executed; they now send it to a
  stage that tells a channel the team watches. A new section of the Routine
  guide, *Give every stage that can fail an error path*, says where an `ERROR`
  branch cannot see the failure — the default version of `PBEmail`,
  `PBMessage`, `PBCreateTask` and `PBChangeState`, a `PBScript` stage invoking
  a Routine, a bot that throws its failure instead of reporting it, a bot type
  or version the scheduler does not register, which fails the whole run before
  its first stage — and how to prove both branches with `cotctl routines test`
  and `cotctl logs`. It also says what decides it: whether the bot reports the
  failure or throws it, not the branches its version declares. The SLA,
  Schedule, Bot and bot-catalog pages point to it. The pages of those four
  bots say which versions declare `ERROR`, every example pins `PBEmail`
  `3.0.1` and `PBMessage` `2.2.0`, and all four pages warn that the pinned
  versions validate `data` where the default barely checks it, so pinning an
  existing stage can break it — a `targets` entry that is not an email address
  in `PBEmail`, an array `content` in `PBMessage`.
- **They also say that pinning an existing stage renames its `next`:**
  `DEFAULT` and `CREATED` become `SUCCESS`, and `NOT-CREATED` becomes `ERROR`.
  The pinned versions check the keys before the bot runs and refuse any other,
  so a stage that keeps an old key never runs its bot — and `cotctl validate`
  does not catch it. A `PBCreateTask` stage holding both `NOT-CREATED` and
  `ERROR` can keep only one of the two handlers. The Routine guide, the
  catalog's *Error branches* and the pages of the four bots say so.
- **The examples no longer name bot types that do not exist.** They used
  `PBSendMessage` with `channelId` and `text`, and one Workflow example
  `PBNotify`; they use `PBMessage` with `content`, `contentType`, `sentBy` and
  `channelIds`, and `PBSendCustomNotification`. The Routine guide's `FCIfElse`,
  `FCEach` and `FCSleep` examples use those types' real data and branches, its
  `$OUTPUT` expression is written `$OUTPUT#<stage>#<field>`, and the complete
  Workflow example's `PBEmail` writes `targets` instead of `to`. Its
  `PBCreateTask` and the YAML twin of the Workflow skill example now give the
  task a `name`, which the default version requires before it runs. The YAML
  structure page pins its `PBEmail` to `3.0.1`, gives
  `PBSendCustomNotification` the `content` and `channelId` its schema
  requires, and replaces an `FCEach` that never reached its next stage with a
  `PBSendSurvey`.
- **Every page of the bot catalog does the same.** Where the bot reports its
  failures on `ERROR`, its examples send it to a `notify_failure` stage, a
  pinned `PBMessage`; where it throws them or reports none — `PBGiphy`,
  `PBWhatsApp`, the `ST*` bots, `CBCheckOTsched` — the page says no `ERROR`
  branch catches them and what to do instead. Five pages also said something
  the runtime does not do: `PBCalendar`'s said its failures throw instead of
  branching, and its only version, although it declares just `DEFAULT`,
  reports every one of them on `ERROR`; `PBConditional`'s example wrote
  `TRUE:` and `FALSE:` unquoted, which YAML reads as booleans, so the stage
  never branched; `PBSheet` recommended a version, and no version of it can be
  applied and run through `cotctl` today — its page now says why; `PBScript`'s
  `ERROR` is taken only when the invoked Routine returns no results, not on a
  missing script or a failure inside it; and `PBGiphy` stops the run on a
  failure rather than reporting it on a branch. The `PBChangeState` page said
  its default version refuses `quiet`: the default accepts it and ignores it,
  and only `2.0.0` refuses it.
- **`{{…}}` placeholders are no longer written into bot `data` on the pages of
  the error-path bots.** `data` is not a Mustache template — only `htmlTemplate`
  is — so the placeholder reached the bot as literal text,
  and a pinned version that validates the field, such as an email in `PBEmail`
  `3.0.1`'s `targets` or an ObjectId in `PBMessage` `2.2.0`'s `sentBy`, refused
  it on every run. The COTLang reference no longer lists `{{…}}` as one of its
  expressions.

- **The `properties` documentation no longer promises a warning for a
  `schemaInstance` key the PropertyType does not define.** It said `apply` warns
  about such a key; nothing emits that warning, and the key is sent as written.
  The documentation now says so, and points at `property-types get` to check the
  keys a type defines before writing them.

- **The `cotctl-apply` skill and the `apply` documentation give a `partial: true`
  Workflow the merge refuses its exit `2`.** The documentation still gave it
  `1`, and the skill left it out of the refusals that exit `2`. Both now name
  the refusals that keep `1`: a `nameCode` or `id` that is not stored, a stored
  state machine pointing at a `propertyType` that no longer exists, and the
  marker with `--legacy-replace-workflows`. The skill also stops giving `2` to a
  `partial: true` Bot, Routine, SLA or Schedule refused for any reason: like the
  documentation, it names the three refusals that exit `2` — no stored one, a
  key it cannot pair, a merged document that is not valid. The exit codes of
  `apply --dir` list the `partial: true` refusals that exit `2`. Installed
  skills are files on disk: run `cotctl skills install` again to get this
  version.
- **The webhooks documentation names `-l` on `webhooks list` and
  `webhooks logs`**, with its defaults and its exit `2` for a value that is not
  a positive integer, and the troubleshooting page explains
  `could not confirm the write`.
- **The authentication page gives the exit codes of a `COTCTL_COMPANY_ID` that
  does not match the token, in one place.** It listed seven commands that exit
  `2`, the troubleshooting page repeated the list, and both left out
  `logs list`, `logs pull` and most per-entity `apply` subcommands. The page now
  names which commands exit `2` and which exit `1`, every per-entity `apply`
  subcommand included, and tells a script to test for non-zero; the
  troubleshooting and advanced-configuration pages link to it.

## 0.15.1 — 2026-10-27

A patch release for the AI assistant integration. **`cotctl` now connects Claude to Cotalker's production documentation server, `https://codex.cotalker.com/mcp`**, and a connection installed with the `global` scope now reaches Claude Code — before this release it never did. Nothing in your YAML or your profiles changes; a script that runs `cotctl mcp` should check the exit-code changes below.

A connection you set up with an earlier version keeps its old URL until you install it again: the *Migration* checklist at the end of this section says how.

### Exit codes

These `cotctl mcp` cases now exit `1` where 0.15.0 exited `0`:

| Command | Before | Now |
|---|---|---|
| `cotctl mcp list`, `cotctl mcp indices`, `cotctl mcp remove`, when the global configuration file is not valid JSON | `0`, ignoring that file's servers (in 0.15.0 the file was `~/.claude/settings.json`) | `1`, with an error that names the file — now `~/.claude.json`. `--scope local` does not read it |
| `cotctl mcp remove <name>` when no server is configured | `0`, with `No MCP servers configured.` | `1`, reporting that `<name>` was not found |
| `cotctl mcp remove <name>` for a server that is only in `~/.claude/settings.json`, or for a `.mcp.json` entry that is not an HTTP server | `0`, and the entry was removed | `1`, reporting that `<name>` was not found; the entry stays |

### Fixed

- **The documentation server answers again.** `cotctl mcp install` and `cotctl skills install` configured the staging server, which no longer answers: `cotctl mcp install` and `cotctl mcp indices` could not list its indices, and Claude got no documentation through the connection. They now use the production server, which publishes two indices — `cotctl-documentation` and `cotalker-implementation`.
- **A global connection reaches Claude Code.** `cotctl mcp install --scope global` and `cotctl skills install --global` wrote the server to `~/.claude/settings.json`, where Claude Code does not look for MCP servers, so it never appeared in `claude mcp list`. They now write it to `~/.claude.json` — or `$CLAUDE_CONFIG_DIR/.claude.json` when that variable is set — the file `claude mcp add --scope user` uses. Every other server and setting in that file keeps its value and the file keeps its indentation; a file that is not valid JSON is left untouched and the command stops with an error. Installing a global server, or removing one that is in `~/.claude.json`, also removes the same-named entry an earlier version left in `~/.claude/settings.json`, and says so.
- **`cotctl` only manages HTTP servers.** `cotctl mcp list`, `cotctl mcp indices`, `cotctl mcp remove` and `cotctl skills uninstall` consider only HTTP servers with a URL — the kind `cotctl` writes — in both `.mcp.json` and `~/.claude.json`, including HTTP servers you added yourself. A `stdio` or `sse` server, or one with no `type`, is not listed and cannot be removed through `cotctl`.

### Docs

- **[MCP integration](./mcp-integration.md) describes the production server**: its two indices, where each scope stores the connection, and how to move one made with an earlier version. The index names it used to show — `cotctl`, `cot-api` and `cot-models` — are not published by the production server, which answers `400 No valid indices found` to them.

### Migration

1. **Install 0.15.1.** A 0.15.0 installed with `npm install -g` on macOS or Linux updates itself the first time you run a command in a terminal, and 0.14.x asks first. In CI, with `-y`, with the standalone binary or on Windows, run `npm install -g @cotctl/cli@0.15.1` or download the binary. Updating `cotctl` does not move a connection you already installed: that is step 2.
2. **Install the documentation connection again** if you set it up with an earlier version: run `cotctl mcp install` with the same name and scope, and choose **Replace existing instance** if it asks — or run `cotctl skills install` (with `--global` for the global scope) and accept the MCP prompt, which rewrites the default `cotalker-rag` server with the default indices. A global connection from an earlier version never worked, so it needs this step too. An entry an earlier version left only in `~/.claude/settings.json` is not found by `cotctl mcp remove`: install it again with the same name to move it, or delete it by hand.
3. **Replace old index names** in setup scripts and in servers you registered with `claude mcp add`: use `cotctl-documentation` and `cotalker-implementation`, or leave `?indices=` out to search both. `--indices` is not checked against the server, so an old name produces a connection the server rejects.
4. **Check the result** with `cotctl mcp list`: each Cotalker server should show `https://codex.cotalker.com/mcp`. It also warns about any server an earlier version left in `~/.claude/settings.json`.

## 0.15.0 — 2026-10-23

The headline is **`cotctl logs`, a new command group that reads what a Routine did when it ran** — the context the run received, the configuration it ran with, what each stage returned and its error — and saves it as JSON files, without copying anything out of the webclient. It needs backend `release-5.13.0` or later in the environment you point it at.

The rest of the release makes survey validation agree with what the server and the webclient accept, keeps a survey's stored placeholders and input labels across re-applies, makes `validate --workflow` check the forms a Workflow is actually wired to, and makes `cotctl login` and `COTCTL_TOKEN` accept only ApiTokens. Most of the nine breaking changes are YAML that used to pass and is now refused before anything is written. The *Migration* checklist at the end of this section lists everything to do.

### ⚠ Breaking changes

Grouped by theme. Each group says who it affects and what to do.

#### Survey YAML that validation now refuses

Each of these used to pass `validate`. It now fails `validate` with exit `1`, and every apply, dry runs included, refuses it with exit `2` before anything is written.

- **A `subtype` its question type does not take**, on a `textinput`, `textnumber`, `listquestion` or `datetime` question or `+table` column, in both formats. It used to pass: an unchanged export of a survey that stores one — `short_text` on a `textnumber`, say — re-applied with exit `0`, and an apply with something to write failed with the server's `500`. The error lists the values the type takes, and `--skip-semantic-validation` does not turn the check off. The one exception is `long_text` on a `textinput`, a legacy value older surveys store: it is accepted, with a warning, and sent as `short_text`, so the first apply of an unchanged survey that stores it writes `short_text` (`Would UPDATE` in a dry run) and the ones after it change nothing.
- **A `property` question's `tree.filter` or `creation.permissions` that is not a list.** Either key used to be refused only when empty, so a non-empty string went through. It is a semantic check, so `--skip-semantic-validation` turns it off. The other way round, an empty list is now accepted (see *Fixed*).
- **`dependsOn`, `showWhen` or `resetIdentifiers` at the root of a `+table` column**, in both formats. They passed, and the apply dropped them without a word, so the condition never reached the server. No export writes them there.

- **Who this affects:** anyone with hand-written survey YAML, and anyone re-applying the export of a survey that stores a `subtype` the server does not accept.
- **What to do:**
  - Set each `subtype` to a value its type takes — `short_text` on a `textinput`; `number`, `integer` or `rating` on a `textnumber`; `list` or `toggle` on a `listquestion`; `absolute`, `relative` or `createdAt` on a `datetime` — or remove the key, which is always valid.
  - A `datetime` with a `subtype` also needs a numeric `min` and `max`, which neither `validate` nor `apply` checks: without them the webclient refuses every answer (`absolute`) or accepts a single day (`relative`, `createdAt`). On `relative` and `createdAt` the limits are **seconds** before and after the reference date — copy them from the export of a survey whose limits were set in the webclient. Avoid `absolute`: the webclient refuses every answer even with the limits its own builder saves, so use `relative` or `createdAt`, or leave `subtype` out.
  - Write `tree.filter` and `creation.permissions` as lists: `filter: [<value>]` instead of `filter: <value>`, and the same for `permissions`.
  - Remove `dependsOn`, `showWhen` and `resetIdentifiers` from the column — the apply never sent them, so the stored survey does not change. A column takes no condition at all (its `conditionalDisplay`, or `command` in the raw format, is refused too): put the condition on the `table` question itself, in its own `conditionalDisplay`.

#### What a survey update writes

- **An update in the simplified format keeps each question's stored `display`.** When `surveys apply`, `apply -f` or `apply -d` updates a survey, each question and `+table` column that keeps its identifier and its type keeps its stored `display` — a field's placeholder, the labels of a `datetime`'s inputs — where the update used to send its type's default: an empty placeholder, and the default Spanish labels on a `datetime`. So an unchanged YAML now writes something different over a survey whose `display` was set in the webclient or by a raw apply; over a survey the simplified format created and nobody edited since, it writes what it wrote before. *Fixed* has the details.
- **A two-entry chat bubble — a `+text` followed by a question whose type takes a title — is read as that title and its question, whatever the `+text` is called.** A `+text` used to count as a title only when its identifier ended in `_label` or `_<digits>`, or was `labelQuestion` followed by its question's identifier. Over a bubble like `[+text mileageHeading, textnumber mileage]`, the same simplified YAML now rebuilds the stored title in place, keeping its identifier, where it used to create `mileage_label` and deactivate the stored `+text`. So it writes something different, and `surveys apply --dry-run --fail-on-destructive` no longer exits `2` on it.

- **Who this affects:** anyone who relied on a re-apply to reset a placeholder or a label, and pipelines gated on `--fail-on-destructive` over surveys with such bubbles.
- **What to do:** to put a stored `display` back to its type's default, set it in the raw format (`surveys export --format raw`, edit the `display`, apply that file) or in the webclient. `surveys apply --legacy-replace` still sends the default, but it also wipes every field the YAML leaves out. Nothing is needed to keep a survey with such a bubble: a gated pipeline that relied on that exit `2` now gets, at most, a `survey.title-conditions-dropped` warning, when the title stores a condition of its own. A YAML exported earlier, with the title as a `text` question, applies as it did.

#### Record `id`s must be ObjectIds

`validate` and every apply, dry runs included, refuse an `id` that is not a 24-character hex ObjectId on an AccessRole, Property, PropertyType, Survey, User or Workflow, `partial: true` fragments included. The `id` is refused before the record is looked up by it; an apply that reads catalogs first, such as a User's JobTitles and AccessRoles, still reads them. Two cases that passed now fail:

- `id: ""`, which every apply treated as absent;
- a malformed `id` on a User or a Survey, which fell back to the email or the `code` when the server answered `404`.

The refusal exits with the code its kind gives any refusal, with or without `--dry-run`, through `apply -f`, `apply --dir` and the kind's own `apply`: `1` for an AccessRole, Property, PropertyType or Workflow, `2` for a User or Survey. `validate` exits `1` for every kind.

- **Who this affects:** anyone whose YAML carries an empty `id`, or an `id` copied wrong.
- **What to do:** remove the `id`, or set it to the record's `_id` as its export writes it — a `# id:` comment for an AccessRole, Property, PropertyType, User or Workflow, and an `id:` field for a Survey.

#### `cotctl login` and `COTCTL_TOKEN` accept only ApiTokens

`cotctl login --token` and `--paste-token` refuse a token they cannot recognize as an ApiToken — one whose `type` claim is missing or is not `api-token`, such as a session JWT copied from the browser, or one without a `company` or an `_id` claim — with exit `1` and before sending it anywhere, where they used to save it as an ApiToken profile. `--allow-unverified-company` does not waive the `company` claim. `COTCTL_TOKEN` applies the same check, so it now also refuses a token without a `type` or an `_id` claim.

- **Who this affects:** anyone who logs in with a token copied from the browser, and pipelines that pass a token through `COTCTL_TOKEN`.
- **What to do:** mint an ApiToken with `cotctl login`, or have an admin issue one from the webclient's ApiTokens panel, and use that one instead. A `COTCTL_TOKEN` without a `type` claim may be a session JWT, which expires within 7 days, or an ApiToken old enough to predate the claim — replace it either way. A profile saved earlier from a session JWT is not checked again: it stops working when that session expires, and `cotctl login` replaces it.

#### `validate --workflow`

- **It can now fail, and exit `1`, on a Workflow it used to report as production ready.** It checks the forms the Workflow references, not only those its permissions reach (see *Fixed*), so the two form checks that fail rather than warn — "Manager in access roles of all forms" and "`_ctrl` fields hidden in forms" — can fail on a form they never saw: one without the flow's Manager permissions in its `permissionsV2`, or with an editable `_ctrl` field. And a survey listing that fails no longer reads as "no linked forms": every form check fails with `Not checked — survey listing failed`. Both reach the exit code, with or without `--json`.
- **The flow-code check is now named `Flow code prefix (2-8 chars)`**, where it said `(2-4 chars)`: it follows the `--code` rule of `workflows scaffold` (see *Changed*). The `--json` shape and the exit codes do not change, but a script that picks that check by its `name` no longer finds it.

- **Who this affects:** pipelines gated on `validate --workflow`, and scripts that read its `--json`.
- **What to do:** a new FAIL on a linked form is a finding the command used to miss — fix the form as the check says. A FAIL that reads `Not checked — survey listing failed` is about the listing, not the Workflow: re-run once the listing answers. No flag brings back the old result. In `--json`, pick a check by its `id` (`N1` for the flow-code check), which does not change, rather than by its `name`.

#### Exit codes

These cases change:

| Command | Case | Was | Now |
|---|---|---|---|
| `validate`, every apply | A `subtype` its question type does not take | `0` from `validate`; an apply with something to write failed with the server's `500` | `1` from `validate`; `2` from every apply, before anything is written |
| `validate`, every apply | A `property` question's `tree.filter` or `creation.permissions` written as a non-empty string | `0` | `1` from `validate`; `2` from every apply |
| `validate`, every apply | The same keys written as an empty list | `1` from `validate`; `2` from every apply | `0`, accepted |
| `validate`, every apply | `dependsOn`, `showWhen` or `resetIdentifiers` at the root of a `+table` column | `0`, and the apply dropped them | `1` from `validate`; `2` from every apply |
| `validate` | An `id` that is not a 24-character hex ObjectId, `id: ""` included | `0` | `1` |
| Every apply, dry runs included | `id: ""` on an AccessRole, Property, PropertyType, Survey, User or Workflow, or a malformed `id` on a User or Survey | `0` | `1` for an AccessRole, Property, PropertyType or Workflow; `2` for a User or Survey |
| `login --token`, `login --paste-token` | A token that is not an ApiToken, such as a session JWT | `0`, saved as a profile | `1`, nothing saved |
| `validate --workflow` | A referenced form fails a form check, or the survey listing fails | `0` | `1` |
| `validate --dir --remote` | Any run | `1`, the combination was refused | `0`, or `1` when an offline or remote check fails |
| `surveys apply --dry-run --fail-on-destructive` | A two-entry bubble whose `+text` title did not follow the old naming | `2` | `0` |
| `surveys export` | A chat bubble the survey read returns empty | `2` | `0`, the bubble skipped with a warning |
| `schedules get`, `export`, `activate`, `deactivate`, `logs` | A Schedule whose code contains `#` | `1`, `not found` | `0` |

A malformed, non-empty `id` on an AccessRole, Property, PropertyType or Workflow already failed with `1`, as not found; it is now refused before the lookup, with the same code.

The new `cotctl logs` commands have exit codes of their own: `3` when some log was not delivered (not the partial write it means on `apply`), and `4` when the environment's backend cannot serve the logs yet. See *Added*.

- **Who this affects:** any script or pipeline that branches on `$?`.
- **What to do:** re-check each row your scripts rely on. Even a pipeline that only tests for a non-zero exit is affected by the rows whose old or new code is `0`.

### Added

- **`cotctl logs`: read what a Routine did when it ran, as JSON files.** The scheduler keeps one log per run for 7 days: the context the run received, the configuration it ran with, what each stage returned and its error. The commands need backend `release-5.13.0` or later, and a profile whose user has the `admin-schedules-read` permission, or one that includes it, such as `admin-schedules-write`.
  - **`logs list`** lists the runs that match the webclient's filters, newest first, a page at a time: `--workflow` (alone or with `--state` or `--sla`), `--bot`, `--schedule`, `--routine`, `--tag-value`, `--owner`, `--op`, and the dates `--from`, `--to` and `--since`. It prints a table, or with `--json` the page and the count of every matching run.
  - **`logs get <logId...>`** downloads logs by id, one file per log, named after the Schedule, the run's start in UTC and the log id. `--stdout` prints the logs instead of writing files.
  - **`logs pull`** downloads every run the same filters match. Beyond one page of 100 runs it asks first, with an estimate of the time it takes; `--yes` skips the question, and with no terminal to ask on, the run stops with exit `2` instead of waiting. It refuses a pull that matches more than `--max` runs, 500 by default; raise `--max` to download more.
  - **`--parts`** downloads only part of each log: `log`, `context`, `routine`, `results`, `error`, or one stage with `stage:<key>`.
  - **A log of 2 MiB or more**, which the scheduler keeps in S3, arrives like any other. When its download URL has expired, the log is reported as expired — with the instant the URL stopped working, when the URL carries one — and no file is written for it.
  - **Log files are owner-only (`0600`) on Linux and macOS**, a replaced copy included: a log carries what its run received and returned.
  - **For scripts**, `--json` on `get` and `pull` prints a manifest of each file written and of each log missing, expired or failed. Exit `3` means some log was not delivered, and `4` that the environment's backend has no log reader yet, or cannot filter by Routine — both arrive with backend `release-5.13.0`, which the no-reader message names.
  - **`--routine` cannot see every run, and says so each time it is used**: an interrupted run, a Routine called by another Routine, and a run of `routines test`, which `--owner TEST` lists instead.
  - **Known limitation:** an `--owner` with no `--bot`, `--workflow` or `--tag-value` beside it can answer `504` in a company with a very large number of Schedules of that owner. A shorter date window does not help; one of those three filters does.
  - **This is not the audit log.** Who changed a Routine's configuration, and when, is a different record, and the command name `audit-logs` is reserved for it.
  - **A new embedded skill, `cotctl-logs`**, lets an agent use these commands: `cotctl skills install cotctl-logs`. `schedules logs <code>` still shows the recent log entries of one Schedule in the terminal; `cotctl logs` finds runs across Schedules — by Workflow, Bot, Routine and the other filters — and saves each run's full log as a file.

- **`validate --dir --remote`** runs the remote checks `validate --file --remote` runs, on every Survey and Workflow that passed the offline checks; a `partial: true` Workflow fragment is not checked remotely. The combination used to exit `1`. `--json` gains a `remoteResults` key, present only with `--remote`; its results count in `summary`, and a FAIL exits `1`. An API error on a Survey is reported as that Survey's FAIL and the documents after it are still checked; an expired session or a missing profile stops the run.
- **`validate --workflow` warns about each form the Workflow references that the survey listing does not return** — a deleted or inactive survey — in a new check, "Referenced forms exist and are active", which names the reference as the Workflow stores it: an `_id` or a code.
- **New survey warnings** from `validate` and every survey apply, dry runs included. None of them refuses a file or changes the exit code, and `-q` silences them on `apply`:
  - a `showWhen` the webclient cannot honor: an empty one, which hides the question for good, and one with more than one entry, of which the webclient reads only the first (see *Docs*). A raw `command.values` on a question with an `isCommanded` gets the same warnings. The server stores both shapes, so neither is refused;
  - an `exec.onChange`, `exec.presave` or `exec.filter` stage, which the webclient never runs. In the raw format it is sent and stored as written; in the simplified format it is never sent, so an apply also removes it from a question that stores it;
  - `subtype: long_text` on a `textinput`, which cotctl sends as `short_text`, as the webclient's survey builder does when it loads the question. Write `short_text` to silence it.
- **Two new `ruleId`s in the `--json` output of a survey dry run:** `survey.empty-chats-deactivated`, when the apply deactivates a SurveyChat the YAML cannot write — a question bubble the survey read returns empty, or a text bubble the simplified export leaves out, which a re-apply used to deactivate with no line in the dry run — and `survey.title-conditions-dropped`, when it drops a title's own condition. Both are warnings: `--fail-on-destructive` exits `2` only on a `danger` finding.

### Changed

- **The confirmation of `schedules activate` and `schedules deactivate` names the Schedule's owner.** When the owner is not `AdminSchedules` — as with the Schedules the platform creates for SLAs and State changes — a warning also goes to stderr before the command acts, with `-y` too. Nothing is refused and the exit codes do not change.
- **`workflows scaffold --code` takes 2 to 8 characters, with digits after the first letter** (`qa011`): a lowercase letter, then lowercase letters or digits. It took 2 to 4 lowercase letters, and every code it took before is still accepted.
- **`validate --workflow` checks a flow against the code it was scaffolded with.** The flow-code check and the checks on form, PropertyType and Property code prefixes read the flow code from the states PropertyType that `workflows scaffold` generates, so a flow fresh out of `workflows scaffold --name purchase-orders --code po` no longer warns that its codes lack the prefix `purchase`. When that PropertyType carries no such code — as in a flow built in the webclient — they fall back to the part of the `nameCode` before its first underscore, as before. The flow-code check applies the `--code` rule, so a prefix of 5 to 8 characters, or one with digits, now passes. These checks only warn, so the exit code does not change.
- **`workflows scaffold --output-dir` accepts an existing directory.** It refuses — exit `1`, naming the files and writing nothing — only when one of the six files it generates is already there; it used to refuse any existing directory, even an empty one. The `--states` help now shows display names as typed (`"Approved,In purchase"`), which is what the flag has always kept.

### Fixed

- **Lookups that found the wrong record, or none.**
  - `routines get`, `routines export` and `routines test` look up exactly the code they are given. A code containing `#`, `?`, `/`, `\` or `%` could make the lookup find another routine — `routines test 'daily#x' -y` resolved, and ran, the routine `daily`. The code is now sent encoded, and a Routine with another code than the one requested is now reported as not found.
  - `schedules get`, `export`, `activate`, `deactivate` and `logs` find a Schedule whose code contains `#`, as the codes the platform gives the Schedules of SLAs and State changes do. They answered `Schedule "…" not found` and exited `1` for a Schedule that exists.
- **Exports that pass `validate` again.**
  - `surveys export --format raw` no longer writes `resetIdentifiers: [""]`, nor a reset identifier that names no question of the export. The empty entry the webclient's builder stores becomes `resetIdentifiers: []`, or the `command` is left out when the reset was all it held; an identifier naming a question the survey no longer returns — removed or deactivated — is left out, with a warning, as in the simplified format. The first apply of such an export stores an empty list in place of `[""]`, which changes nothing in the form, and erases the left-out identifiers from the stored reset.
  - `validate` and every apply accept a `property` question whose `tree.filter` or `creation.permissions` is an empty list — what the webclient saves for a tree with no narrowing, and for inline creation open to every user, and what `surveys export` writes back. `tree.target` is still required.
  - `property-types export` leaves out `min`, `max`, `arrayMin` and `arrayMax` when they are stored as `null`, and `validators` when nothing is left, so the file passes `validate`. `property-types get` no longer prints `min: null`, `max: null` or `default: null`.
- **Survey exports that keep more of the survey.**
  - `surveys export` no longer fails on a chat bubble the survey read returns empty because its questions were deactivated or deleted. It used to exit `2`; the bubble is now skipped with a `SKIPPED` warning that names the SurveyChat an apply of the export deactivates, and the export exits `0`.
  - The simplified export keeps the question of a `[+text, question]` bubble, with its reset, whatever the `+text` is called. It used to write the `+text` as a `text` question and leave the question out, so the exported YAML of those surveys changes. A title's own condition, help text and `required` are not kept in the simplified format: the export warns about each and points to `--format raw`, and the dry run warns about the condition.
  - The simplified export warns about a condition operator the simplified format does not accept, such as the `=` older webclient versions stored, and points to `--format raw`. The operator is still written as stored, so `validate` still refuses the file, but the export now says so first.
- **Re-applying a survey in the simplified format no longer empties a field's placeholder or renames a `datetime`'s labels.** A `textinput`, `textnumber` or `property` question kept the placeholder set in the webclient only until the next apply, and a `datetime`'s labels from the English webclient were replaced with the Spanish defaults. An update now keeps the stored `display`, in `+table` columns too, except where the YAML sets it: a `text` question's `label` and a `listquestion`'s `options[].label` are its whole `display`, and a `gps`, `image`, `file` or `signature` question sends its `label` as the first entry and keeps the stored ones after it. A new question, a changed type, and a `datetime` whose `dateMode` adds or drops the time input get the default. The dry run lists each `display` the update changes and counts each stored one it keeps as `preserved`.
- **`validate --workflow` and Workflow dry runs.**
  - `validate --workflow` checks the forms a Workflow is wired to. A form is linked when the Workflow references it — a StartForm's `requiredSurvey`, a transition's `requiredSurvey`, a State's `surveyTriggers` — or when its `permissionsV2` grant one of the flow's TaskGroup permissions, and a form linked both ways counts once. Only the second kind used to count, so a Workflow wired through its States reported `No forms linked to this workflow` and its form checks checked nothing. The form-code check now names the forms it checked, and the survey listing no longer fails on a backend configured with a lower page limit.
  - A Workflow's dry run lists a declared `cardLabels` equal to the stored one as `preserved`, so the diff alone shows that the labels survive the apply. It counts in the headline's `preserved` and reaches `--json` as one more `diff[]` entry, `field: "dynamicPropertyTypes"` with `kind: "preserved"`.
- **Script checks on `+table` columns.** The `context` of a column is checked against its row: a sibling column no longer draws a warning, and `responses#parent#X` is looked up in the row. A root question or the table itself in a column's `context`, and a column of another table, get their own warning, since in the cell they resolve empty. A column's `onDisplay`, `onPlay`, `postsave` and `onSubmitSuccess` warn that a cell never runs them, and a column's `preload` no longer draws the missing-`context` warning, since a cell runs it with `src` alone. No exit code changes.
- **`validate`, dry runs and apply no longer hang on a long `code` with an invalid character near its end** — a Property, JobTitle, Routine, Schedule, SLA or Webhook `code`, a Routine's `dataType[].key`, a Workflow's `nameCode` or a StateMachine's `code`. The same codes are accepted as before, and the errors that quote the pattern now write it `^[a-z][_a-z0-9]*$`.
- **Credentials and connection.**
  - The `[cotctl] Credentials from $COTCTL_TOKEN …` line prints after the first accepted response, and never for a refused token. The `EXPIRED at …` line is gone: an expired token stops before it is sent.
  - A `401` with `COTCTL_TOKEN` names the URL it was sent to and the likely causes — a revoked token, or one from another environment — instead of calling it "expired or revoked".
  - A trailing `/api` in `--api-url` or `COTCTL_API_URL` is dropped, with a notice. Requests used to go to `/api/api/…` and fail with a `404`.
  - A response that is not JSON names where its URL came from: `COTCTL_API_URL` or the profile. The error for a command run without `-c` names `COTCTL_TOKEN` and `COTCTL_API_URL`.
  - `login --token` and `--paste-token` no longer invent an expiry for a token from the ApiTokens panel, which has none: they report `no expiry`, as `COTCTL_TOKEN` does. A profile saved earlier keeps the invented date until the next `cotctl login`.
- **Messages.**
  - A Survey's validation messages name a question type the way its YAML writes it: ``columns is only valid on a `type: table` question`` (or `+table` in a `chat[]` YAML) instead of the internal content type, and a refused type change of a saved table column reads in the YAML's own keys — `type: textnumber (subtype: number) → type: textinput`, `dateMode: date → date_time`. What is refused did not change.
  - A repeated `identifier` in a simplified Survey points at the repeat and names the question that already has it — `questions[2].identifier: Identifier "x" is already used by questions[0] (label "First field")` — where the error named itself.
  - `validate --workflow` on a Group that is not a Workflow says so, with the message `workflows get` gives, instead of a raw `API Error 404`. It still exits `1`.

### Docs

- **The skills embedded in the CLI describe 0.15.0**: `cotctl logs` and the new `cotctl-logs` skill, what a survey update keeps, the `subtype` values each question type takes, the raw format's round trip, and the `workflows scaffold` rules.
- **Earlier guidance was corrected on these points** — worth checking if you configured from it:
  - **Not every `showWhen` entry has to hold.** The webclient reads only the first entry, so a list of them is neither an AND nor an OR: two `eq` entries only ever match the first value, and a numeric range written as a `gte` entry and an `lte` one is only the `gte`. For an OR, write one `op: regex` entry with `|` between the values. `regex` never matches a `textnumber` or a `datetime` answer, so an OR cannot be written on those.
  - **The raw format does not guarantee a re-apply that changes nothing.** The first apply of a raw export over a survey built in the webclient usually still sends an update (`Would UPDATE` in a dry run), because what the webclient stored differs from what a raw apply writes; from the second apply on, the raw round trip changes nothing. The error that points a failed simplified export to `--format raw` now says this too.
  - **The `cotctl-routines` and `cotctl-bots` skills point to `cotctl logs`** for a Routine's or a Bot's runs, where they said the backend had no way to read them.

### Migration

1. **Install 0.15.0** — `npm install -g @cotctl/cli@0.15.0`. From 0.14.x, cotctl announces it by itself and, in a terminal, offers to install it (a standalone binary is shown the command instead); in CI or with `-y` it only prints a notice. It never installs a minor version unasked, since one carries breaking changes, and `COTCTL_NO_UPDATE_CHECK=1` turns the check off. In CI, move the pinned version on purpose, after reading the breaking changes above.
2. **Run `validate --dir` over the directories that hold your Surveys, Workflows, AccessRoles, Properties, PropertyTypes, JobTitles and Users before you move a pipeline to 0.15.0** — it does not recognize the other kinds — and fix what it refuses: a `subtype` its question type does not take, a `tree.filter` or `creation.permissions` that is not a list, a condition at the root of a `+table` column, an `id` that is not a 24-character hex ObjectId. Add `--remote` to run the remote checks on every Survey and Workflow too.
3. **Give every `datetime` with a `subtype` a numeric `min` and `max`** — seconds on `relative` and `createdAt` — and prefer `relative` or `createdAt` over `absolute`, or leave `subtype` out.
4. **Replace any token that is not an ApiToken** in `COTCTL_TOKEN` and in `cotctl login --token` or `--paste-token` — a session JWT copied from the browser above all — with one minted by `cotctl login` or issued from the webclient's ApiTokens panel.
5. **Re-check pipelines gated on `validate --workflow`**: it now checks every form the Workflow references, and in `--json` a check is found by its `id`, not its `name`.
6. **Re-check pipelines gated on `surveys apply --dry-run --fail-on-destructive`** over surveys whose `+text` titles do not end in `_label`: the dry run no longer exits `2` on them.
7. **Reset a placeholder or an input label in the raw format or in the webclient**: a simplified re-apply now keeps the stored one.
8. **Before using `cotctl logs`**, check that the environment runs backend `release-5.13.0` or later, and that the profile's user has `admin-schedules-read`, or a permission that includes it such as `admin-schedules-write`.
9. **Re-check every branch on `$?`** against the table in *Exit codes*.

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
