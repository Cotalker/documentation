---
title: apply
sidebar_label: apply
displayed_sidebar: developer
---

<!-- source: repositories/cotctl/src/commands/apply.ts @ 18d0110b (2026-11-04) -->

`cotctl apply` is the command that actually changes a Cotalker environment. It takes your YAML and makes the platform match it — creating resources that don't exist and updating those that do. This is the verb you'll use most, so it's worth understanding well.

There are two ways to run it, depending on whether you're deploying one file or a whole folder:

| Mode | Flag | Purpose |
|---|---|---|
| Single file | `-f <file>` | Apply one YAML file of the seven kinds marked ✅ below; the other five go through their own command (`cotctl bots apply`, …) or `--dir` |
| Directory | `--dir <path>` | Apply every YAML file in a folder, in the correct dependency order between kinds |

<div className="alert alert--primary">

**Always validate first.** `apply` writes to a real environment. Make `cotctl validate` (and `--dry-run`) part of your muscle memory before every apply — especially against production.

</div>

## How apply decides what to do

`apply` reads the `kind:` field at the top of your YAML and routes to the right handler. **Twelve** kinds are supported by `apply --dir`, applied in this order. `apply -f` takes the seven `validate` knows — the same ✅ column:

| `kind:` | What it manages | `validate` and `apply -f` know it |
|---|---|:--:|
| `AccessRole` | Permissions | ✅ |
| `PropertyType` | Data model schemas | ✅ |
| `Property` | Data model instances | ✅ |
| `JobTitle` | Org positions (Cargos) | ✅ |
| `Survey` | Forms | ✅ |
| `Workflow` | Processes and state machines | ✅ |
| `Routine` | Reusable script routines | ❌ |
| `Sla` | Service-level agreements | ❌ |
| `Schedule` | Scheduled runs | ❌ |
| `User` | People | ✅ |
| `Bot` | Bots | ❌ |
| `Webhook` | Event subscriptions | ❌ |

<div className="alert alert--warning">

**The last column is not decoration.** `cotctl validate` recognises only the seven marked ✅, so a directory holding a `Routine`, `Sla`, `Schedule`, `Bot` or `Webhook` file **fails `validate --dir` with `unrecognized kind`** — at the step before the one that would have applied it without complaint. Until the gap closes, keep those five in their own directory or let the validation step tolerate them. See [validate](./validate.md).

</div>

If `kind:` is missing or unrecognized, `apply` stops and lists the valid options (plus the entity-scoped form for each, like `cotctl roles apply`). It never guesses.

**Create vs. update is automatic.** `apply` looks the resource up by its `code` (or `name`). If it doesn't exist, it's created; if it does, it's updated. You don't choose — you just describe the desired state.

## Single-file mode

```bash
cotctl apply -f <file.yaml> -c <profile> [options]
```

### Options

The unified `apply` is deliberately lean — a common core plus a few kind-specific flags that only take effect when the file's `kind` matches:

| Option | Applies to | Description |
|---|---|---|
| `-f, --file <path>` | all | **(required)** Path to the YAML file |
| `-c, --company <profile>` | all | **(required)**, unless an [environment credential](../authentication.md#running-without-a-profile-the-environment-credential) supplies it. Profile to use |
| `--dry-run` | all | Validate and show what *would* be sent, without applying |
| `--diff <mode>` | PropertyType, Property, Workflow, Survey | **New in 0.14.0.** How much per-field diff a `--dry-run` prints under each `Would CREATE` / `Would UPDATE` line: `off`, `compact` (default) or `verbose`. Since 0.16.0, `verbose` also lists what an entity with nothing to change keeps, under its `No changes` line |
| `-y, --yes` | all | Skip confirmation prompts (warnings still print to stderr) — all but one: emptying the `accessRoles` of the system `admin` or `bot` JobTitle asks you to type its code even with `-y` |
| `--skip-semantic-validation` | Survey only | Skip semantic checks — hard error on any other kind |
| `--skip-remote-validation` | Survey only | Skip the remote checks — identifiers, references (Survey, PropertyType, JobTitle, Property) and permission names — hard error on any other kind. A missing sub-survey and an unknown AccessRole in `permissions` still stop the apply, which resolves both before writing; a `--dry-run` with the flag doesn't report them. A YAML that sets the survey's `id` still has its `code` compared with the server's, and a `--dry-run` does report that one |
| `--allow-reactivate` | User, JobTitle | Permit `isActive: true` on a currently-inactive record (otherwise blocked) |
| `--notify-email` | User only | Send the welcome email on create (incompatible with a `password` in the YAML) |
| `--lax-code` | JobTitle only | On *update* only, downgrade the code-format check to a warning when the existing record's code is already non-conforming |
| `--rollback` | Workflow only | On a mid-apply error, deactivate the resources created during the partial apply |
| `-q, --quiet` | all | Suppress advisory warnings and the `--dry-run` diff. Errors and destructive findings still surface |
| `--allow-script-bots` | Workflow | Opt in to `PBScript` / `CCJS` / `ESMCode` bot stages, which run arbitrary JavaScript. Without it the apply is refused before any write |
| `--legacy-replace-workflows` | Workflow only | Escape hatch that restores pre-0.7.0 destructive replace semantics. Prints a warning to stderr. **Deprecated, with no removal version announced** — earlier releases promised 0.8.0, which never happened |

The `--skip-*` flags are Survey-only by design: passing them with any other kind (or a directory containing non-Survey files) is a hard error, not a silent no-op. And `--continue-on-error` and `--json` exist only for `--dir`: with `-f` they are refused, exit `1`, before anything is read.

<div className="alert alert--secondary">

**One CI flag lives only on the entity-scoped applies.** `--fail-on-destructive` is **not** an option of the unified `cotctl apply`: it exists on `cotctl surveys apply`, `cotctl properties apply` and `cotctl workflows apply`. Reach for those when a destructive change should fail the run; see [CI/CD](../ci-cd.md).

The rest of that list has moved here over time: `--quiet` in 0.12.0, and in **0.14.0** `--diff` (for a `--dry-run`, either mode) and `--json` (with `--dir`). `-q` never suppresses an error or a destructive finding, on any kind.

</div>

### Examples

```bash
# Create or update a survey
cotctl apply -f my-survey.yaml -c acme

# Preview what would be sent — changes nothing
cotctl apply -f my-survey.yaml -c acme --dry-run

# A workflow, a role, a property type — same command, different kind
cotctl apply -f workflow.yaml -c acme
cotctl apply -f role.yaml -c acme
cotctl apply -f property-type.yaml -c acme
```

A successful apply confirms what happened, one line per resource:

```
Survey "my_survey" created successfully
```

An update prints `updated successfully` instead, and — since 0.14.0 — a resource your YAML does not change prints `<Kind> "<identifier>" unchanged — nothing to send`, with no request made. `cotctl` doesn't echo the generated `_id` — you never manage IDs by hand (see the note below).

<div className="alert alert--info">

**You never manage IDs by hand.** When creating, you don't include `_id`/`id` — the backend generates them. When updating, `cotctl` retrieves the existing resource and resolves the right IDs for you (matching survey questions by their `identifier`). Your YAML stays clean and human-readable.

</div>

<div className="alert alert--warning">

**An `id` you do write must be the record's real ObjectId.** Since 0.15.0, `validate` and every apply — dry runs included, through `apply -f`, `apply --dir` and the kind's own `apply` — refuse an `id` that is not a 24-character hex ObjectId on an AccessRole, Property, PropertyType, Survey, User or Workflow, `partial: true` fragments included. The refusal comes before the record is looked up, so the value never reaches a request URL. Two cases that used to pass now fail: `id: ""`, which used to count as absent, and a malformed `id` on a User or a Survey, which used to fall back to the email or the `code` when the server answered `404`. The apply exits `1` for an AccessRole, Property, PropertyType or Workflow and `2` for a User or Survey; `validate` exits `1`. Remove the `id`, or set it to the `_id` the export writes — a `# id:` comment for an AccessRole, Property, PropertyType, User or Workflow, an `id:` field for a Survey.

</div>

### What you can change on a survey update

Because questions are matched by `identifier`, not position, edits behave intuitively:

| You want to… | Do this | Result |
|---|---|---|
| Add a question | Add it to `questions[]` | Created |
| Remove a question | Delete it from `questions[]` | Deactivated (not hard-deleted). An interactive apply asks first; `-y` skips the question and `apply --dir` never asks it. A dry run flags it as `⚠ DANGER` |
| Edit a question | Change its fields, keep the `identifier` | Updated, ID preserved |
| Reorder questions | Reorder `questions[]` | Order changes, IDs preserved |

Two things are immutable once created: a survey's `code`, and a question's `identifier`. `apply` will refuse to rename either — to "rename", you create a new resource instead. And if you apply a survey YAML without its `questions` section (say, to toggle `isActive`), the existing questions are preserved automatically.

## Preview first: `--dry-run`

`--dry-run` validates the file and prints what *would* happen without sending anything — one line per resource, and, since **0.14.0**, the same **per-field diff** the entity-scoped applies print, under each line of a PropertyType, Property, Workflow (and its state machines and states) or Survey:

```
--- DRY RUN ---

  Would UPDATE Survey: my_survey
    (1 changed)
    ~ name: "My survey" → "My Survey"
```

`--diff off|compact|verbose` sets how much of it prints (default `compact`), and `-q` drops it. A resource your YAML does not change reads `No changes to <Kind>: <identifier>` — before 0.14.0 every existing resource showed as `Would UPDATE`. Since **0.16.0**, `--diff verbose` lists what such a resource keeps under its `No changes` line — a state machine whose declared `cardLabels` equal the stored ones shows `= cardLabels (preserved)` — where before only `--json` carried it. The text diff of a state machine names its card labels `cardLabels`, the YAML key, where it printed the API's `dynamicPropertyTypes`; the `field` of a `--json` diff entry is still `dynamicPropertyTypes`.

**A survey update's diff names what changes on each question** (0.16.0). The first raw re-apply of a survey built in the webclient used to read `Would UPDATE` without naming a field. The diff now has one entry per question and field, such as `questions[identifier="…"].isReadOnly`, and a second re-apply reads `No changes`. The compact diff counts a change several questions share on one line (`+ questions[].isReadOnly ×7`); `--diff verbose` lists every entry. A question the update adds or removes is an entry of its own (`questions[identifier="…"]`, or `+ questions[] ×3` compact), and so is each item of a chat bubble added or removed whole; the same questions in another order are one entry on their list. In `--json`, a stored value the update removes — such as `required: false` — and a question it removes are entries with `kind: "deleted"`, so a pipeline that stops on any `deleted` entry will stop on those: check the entry's `field`, or rely on `destructiveChanges` and `--fail-on-destructive`, which this does not touch.

### What the dry run refuses

The dry run is meant to reach the apply's verdict. Since **0.16.0** it refuses, with the apply's message and exit code, several things it used to announce as planned changes:

- **A Workflow whose state machines reference something that does not exist** — a `cardLabels` or `allowedExtensions` code, the state machine's `propertyType`, its asset's `propertyType`, a generic asset's `property`, or a State's `property`. It reports `PropertyType "<code>" not found` or `Property "<code>" not found` and exits `1`, for a Workflow the server has and for one it does not have yet. Under `apply --dir --dry-run`, a PropertyType or Property the same directory declares counts as present. When the dry run cannot read the Properties a state machine references, it says so in a warning and leaves the verdict to the apply.
- **A Survey under `--skip-semantic-validation`** that the apply refuses when it builds the survey, such as a single-value `personFilter.jobs`: the dry run now reports that error with exit `2`.
- **Properties and PropertyTypes** — see the next section.

### Properties and PropertyTypes

What changed in **0.16.0** for `properties apply`, `property-types apply`, `apply -f` and `apply --dir`, `--dry-run` included:

- **A Property `code` is refused only when the apply would create the Property** — one shorter than 3 or longer than 50 characters, or outside `^[a-z][_a-z0-9]*$`. The backend stores many codes that do not match, a PATCH cannot change a stored code, and the export writes them as stored, so an update of such a Property goes through. Depending on the server's configuration, the apply of an update that sends a change to such a Property can still fail, although the dry run reports it as an update; a re-apply that changes nothing sends no request. `validate` only warns about such a code.
- **With an `id` in the YAML, the dry run reads by `id`, as the apply does.** It refuses an `id` with a new code, an `id` with another Property's code, an `id` the backend does not hold and a changed `propertyType`, each with the apply's message.
- **An `id` the backend answers with a `404` fails only that Property** (`Property with id '<id>' was not found`, exit `1`), and the other Properties of the file are applied. `apply --dir` still stops after that file unless `--continue-on-error`.
- **A `COTProperty` node of `schemaInstance` takes a Property `code`**, and the apply sends that Property's `_id`; an `_id` is sent as written. The value must name an active Property of the node's `subType`: anything else — a Property of another `subType`, any reference under a node with no `subType`, an `_id` of a deleted or deactivated Property, an empty item in a list, a Property the list already holds, a single value in an `isArray` node, a list in a single-value node, an empty `required` node, a list outside `arrayMin` / `arrayMax` — fails that Property alone, dry run included. A value the Property already stores stays, with a warning. A code that names no Property also fails only its Property, and the dry run previews the others. Under `apply --dir`, the diff shows a reference to a Property an earlier file creates as `<id of <code>, created by this batch>`. See [Properties](../resources/properties.md).
- **A schema node `key` the backend refuses is refused before anything is sent.** On a node the apply creates, the key must be 3 to 50 characters matching `^[a-z][a-z0-9_]*$`; a type stored with such a key still updates. A `key` longer than 62 minus the length of the type's `code` is refused on a type the apply creates, and on an update of a type that stores one whenever the update sends something — the backend refuses every write of such a type. An update that sends nothing only warns. `validate` warns about both (check `S7`).

A dry run also prints the **destructive findings** — a permission list emptied whole, the questions a survey update would deactivate, a state machine deactivated, card labels dropped — on stderr, under each resource: `⚠ DANGER` for the worst, `⚠ warn` for the rest. (Before 0.14.0 the unified `apply` computed these and never showed them.) What the unified `apply` still lacks is `--fail-on-destructive`: its exit code never changes with a finding. **When a danger finding should fail the run, preview with the entity-scoped command** first:

```bash
cotctl surveys apply -f survey.yaml -c acme --dry-run --fail-on-destructive
cotctl workflows apply -f workflow.yaml -c acme --dry-run --fail-on-destructive
```

Those richer gating flags are documented under [CI/CD](../ci-cd.md). Only a `danger` finding makes `--fail-on-destructive` exit `2`; a `warning` never does. A survey dry run's `--json` carries two warnings added in 0.15.0: `survey.empty-chats-deactivated`, when the apply deactivates a chat bubble the YAML cannot write (one the read returns empty, or a text bubble the simplified export leaves out), and `survey.title-conditions-dropped`, when it drops a title's own condition.

## What an update sends

Since **0.14.0**, every update — `apply -f`, `apply --dir` and each per-kind `apply` — follows for **every kind** the rule workflows have followed since 0.7.0: your YAML is a patch, not a replacement.

- **A key you omit keeps its stored value.** Before 0.14.0 an update filled each omitted key with its create default — `[]` for a workflow's permission lists or a user's `accessRoles`, `true` for `isActive`, `7` for `hideClosedAfterDays`, `60` for a schedule's `timeoutMinutes` — overwriting whatever the server had. Defaults now apply only when a resource is created.
- **Inside an object the server replaces whole, too.** `cotctl` completes the object you declare from the stored one: an SLA's `start`, `end`, `data` and `pb`, a bot's `parametrizedBot`, a schedule's `body`, a state machine's `asset`, a survey's `nameTranslations`, `editable`, `hidden` and `post`, a user's `hierarchy`, and the bot of a workflow slot. Bot commands (by `slashCmd`, or `surveyIds` for a survey command), stages (by `key`, while they keep their bot type), routine inputs and schema nodes (by `key`) are matched with their stored counterpart and keep the keys they omit — so a command that omits `isActive: false` stays deactivated. A stage's own `data` and `next` still travel as written.
- **A written `[]` empties the list, and a declared list is complete** — a stored element it leaves out is removed. A property type's `schemaNodes` is the exception: a node is never removed. `[]` now also empties three lists that used to ignore it: a bot's `extraData`, a workflow state's `next`, and a user's `hierarchy` when `boss`, `peers` and `subordinate` are all empty.
- **To clear a key, write it empty** — `""` for a text, `[]` for a list. Leaving it out no longer clears it. A translation left out of a survey's `nameTranslations`, for instance, stays stored until you write it as `""`.
- **A stage that omits `version` keeps its stored version.** Write `version: null` to send it back to the bot type's default.
- **Nothing to change, nothing sent.** A key whose value the server already holds is left out of the request, and a resource left with nothing to send gets no request at all.

Two things still travel exactly as written: **each question a survey YAML declares** — matched by `identifier`, which keeps its ID, but a field the question omits takes its default (`required: false`, …), not its stored value, so declare every field a question should keep. The exception, since 0.15.0, is a question's `display` — a field's placeholder, a `datetime`'s input labels: a question or table column that keeps its identifier and its type keeps its stored `display`, unless the YAML sets it (see [Surveys](../resources/surveys.md)). The other is a **webhook's `context`**. And two flags keep the old behaviour on purpose: `--legacy-replace-workflows` (on `apply` and `workflows apply`) and `surveys apply --legacy-replace` build the update from the create defaults, so what the YAML omits is wiped.

<div className="alert alert--warning">

**Upgrading from 0.13.x: write what an update must reset.** A YAML that relied on an omitted key being reset now leaves it as stored. Write the value you want instead — `[]` to clear a list, `isActive: true` to reactivate (with `--allow-reactivate` for a user or job title), or the default itself, such as `hideClosedAfterDays: 7`. And **re-export before re-applying an export made with 0.13.0 or earlier**: those exports filled in defaults the resource may not store, so re-applying one sends them as changes — see [Export & import](./export-import.md#exports-write-only-what-is-stored).

</div>

**A Routine update uses the server's keyed route** where the server has it (0.16.0): `PATCH /api/v2/pbscripts` with the `code` in the body, falling back to `PATCH /api/v2/pbscripts/:id` on a server without it. There, a routine input written over another stored one keeps nothing of it, and `--dry-run` asks the server to validate the update without saving it. Setting `COTCTL_LEGACY_PATCH=1` (also `true`, `yes`, `on`) sends every update through the old routes; any value other than those or `0`, `false`, `no`, `off` is refused, exit `2`. The variable exists for the transition and will be removed in a later release. See [Routines](../resources/routines.md).

**An apply whose write the server answers with no document** now says `could not confirm the write`, since `cotctl` cannot know whether anything was written; the run still exits `1`. Before 0.16.0 every SLA create and update ended that way, with `nothing was written` and exit `1`, although the write had happened: `slas apply` and `apply --dir` now report the SLA `created` or `updated` and exit `0`.

Each resource page notes the exceptions its kind has. For a workflow, the field-by-field contract — including why states can't silently vanish — is in [Workflow merge semantics](../resources/workflows/merge-semantics.md).

## Partial documents (`partial: true`)

**New in 0.14.0.** A declared list is normally the complete list. A document with `partial: true` at its top level instead names **only the elements it changes**, and every stored element it leaves out stays as it is, in its place. To edit one node of a property type that has fifteen:

```yaml
kind: PropertyType
code: asset_type
partial: true
schemaNodes:
  - key: serial
    display: Serial number
```

The other fourteen nodes travel as stored. It works for six kinds, on the keyed lists below, wherever those kinds are applied — `apply --dir`, `apply -f` (a PropertyType or a Workflow), and `property-types`, `bots`, `routines`, `slas`, `schedules` and `workflows apply`:

| Kind | List | Elements matched by |
|---|---|---|
| PropertyType | `schemaNodes` | `key` |
| Bot | `commands` (and each command's `arguments`) | `slashCmd`, or `surveyIds` for a survey command (`name` for arguments) |
| Bot | `parametrizedBot.stages` | `key` |
| Workflow | `stateMachines`, their `states`, each state's `next` and `surveyTriggers`, and the stages of each slot's bot | `code`, `property`, `target`, `survey`, and `key` for stages |
| Routine | `body.stages` | `key` |
| Sla | `pb.stages` | `key` |
| Schedule | `body.stages` | `key` |

- **A named element is completed from its stored pair**, so it may leave out what the schema otherwise requires — a node's `basicType`, a state machine's `name`, `propertyType` and `asset`, a state's `type`, a stage's `name`, a bot's `start`, a property type's or routine's `display`, an SLA's `display`, `start`, `end`, `data` and `pb`, a schedule's `time` and `body`. The merged document is then validated whole: a problem in what you wrote refuses it, naming the element (`schemaNodes[key="serial"].basicType: …`).
- **A named stage's `data` and `next` merge key by key.** Write one key to change it — `next: { ERROR: notify }` reroutes one branch and keeps the others. A key written as `null` is removed, and `data: {}` or `next: {}` empties the field (`next: {}` makes the stage end the run). On a schedule, a `null` over a key the stored stage holds with a value, or a `{}` over a `data` or `next` that has keys, is refused instead, since the scheduler keeps a key the body leaves out; over nothing to remove, it passes and changes nothing.
- **It never deletes, never reorders, never creates.** A stored element you leave out keeps its place; a new element is added last, with a warning — and so is an element whose key you edited, which becomes a new element. To retire one, set `isActive: false` where the element has it, or apply the complete list without the marker. A document whose entity does not exist yet is refused: remove `partial: true` and declare it in full to create it.
- **It never guesses.** An element whose key the stored list repeats, or that the document names twice, is refused before anything is sent, `--dry-run` included.
- **A misspelled key reads as a new element.** When it leaves out what a new element needs, the refusal says so first — `State "<x>" is not stored in <list>, so partial: true would add it as a new state, and nothing stored completes what it leaves out:` — instead of naming only the missing field.
- **The dry run lists what it keeps** — `Kept 14 schemaNodes the partial YAML does not name (partial: true deletes nothing)` — and warns of a stage the merge leaves unreachable from `start`.

Exceptions worth knowing before you rely on it:

- **A workflow slot written as `bots: []` is still emptied**, deleting the bot stored there with its stages; the dry run and the apply warn about it. Leave `bots` out to keep the bot.
- **A bot's `commands: []` deletes nothing** under the marker, and `cotctl bots apply` does not ask for the bot name then (its confirmation prompt still runs unless `-y`).
- **A stage named under another bot type** than its stored pair is not completed: it replaces that stage as written, with a warning. Editing a stored `PBScript` stage still needs `--allow-script-bots`.
- **Not covered:** a routine's `dataType` (a partial routine that declares it is refused), a survey's questions, lists of plain values such as permission codes, and every other kind. `--legacy-replace-workflows` refuses the marker.

**A `partial: true` document the apply refuses** — no stored entity, a key it cannot pair, or a merged document that is not valid — exits `2` for a Bot, Routine, SLA or Schedule, and `1` for a PropertyType. A Workflow exits `2` (since 0.16.0; it was `1`) for a key it cannot pair and for a merged document that is not valid — a state, transition or state machine it names that is not stored and leaves out what a new one needs, a key named twice, a key the stored list repeats, a bot slot holding several stored bots — and for a deactivated state machine it names. A `partial: true` Workflow still exits `1` when the schema rejects the YAML before the merge (a state `type` other than `new`, `in-progress` or `closed`), when its `nameCode` or `id` is not stored, when a state machine it names is stored pointing at a `propertyType` or `asset.propertyType` that no longer exists, and when it comes with `--legacy-replace-workflows`.

**Only `true` is read.** That is a different refusal: any other value of `partial` — `false`, `null`, a string — and the key on any other kind are refused before anything is sent, whatever the document holds: `apply -f` exits `2`, and `apply --dir` treats the file as unreadable (exit `1`). In 0.13.0 the key was dropped without a word on a PropertyType, AccessRole, Property, User, Workflow or Survey, which then applied as complete documents — so a YAML that carries the key on those kinds now fails until you remove it.

`cotctl validate` reads nothing stored, so it checks a partial PropertyType or Workflow on its own fields only (a new `S5` warning under `--dir`); the merged document is checked by `apply`, its `--dry-run` included — for Bot, Routine, SLA and Schedule, which `validate` does not recognise, that is the only check before a write.

## Directory mode

For anything beyond a single file — and especially for a scaffolded workflow, which spans roles, property types, properties, and the workflow itself — point `apply` at the folder and let it handle ordering:

```bash
cotctl apply --dir <path> -c <profile> [options]
```

### Why order matters (and why you don't have to think about it)

Resources depend on each other: a workflow references roles and property types, which must exist first. `apply --dir` groups documents by kind and applies them in this canonical order automatically:

| # | Entity | Comes first because… |
|---|---|---|
| 1 | AccessRole | Everything else references permissions |
| 2 | PropertyType | Foundation of the data model |
| 3 | Property | Depends on PropertyType |
| 4 | JobTitle | Depends on roles and the data model |
| 5 | Survey | Referenced by workflow transitions, StartForms and survey triggers |
| 6 | Workflow | References roles, property types, properties and surveys |
| 7 | Routine | Invoked by SLA and schedule `PBScript` stages |
| 8 | Sla | Attaches to a workflow's state machines |
| 9 | Schedule | May invoke routines |
| 10 | User | Depends on job titles and roles |
| 11 | Bot | Nothing references it |
| 12 | Webhook | References entities by id, so ordering cannot help it |

The order is between **kinds**. Within the Survey kind, surveys are *not* ordered among themselves by reference: files go in path order, and each file's documents in the order they're written. A survey that embeds a child the server doesn't have yet needs that child to sort first — in an earlier file, or earlier in the same file — otherwise the parent fails with `Survey with code "..." not found`, `--dry-run` included. A child the server already has is found in any order; putting it first is still the safe default.

### Options

| Option | Description |
|---|---|
| `--dir <path>` | **(required)** Folder of YAML files |
| `-c, --company <profile>` | **(required)**, unless an [environment credential](../authentication.md#running-without-a-profile-the-environment-credential) supplies it |
| `--dry-run` | Preview every payload without applying |
| `-y, --yes` | Skip the preview and the confirmation prompts — all but one: emptying the `accessRoles` of the system `admin` or `bot` JobTitle asks you to type its code even with `-y` |
| `-q, --quiet` | Suppress advisory warnings and the `--dry-run` diff; errors and destructive findings still print |
| `--diff <mode>` | **New in 0.14.0.** Diff verbosity of the preview: `off`, `compact` (default) or `verbose` |
| `--json` | **New in 0.14.0.** Print the results as JSON on stdout, one object per line — see [JSON output](#json-output) |
| `--continue-on-error` | Keep going when a resource fails (default: stop on the first error) — see below |
| `--allow-script-bots` | Opt in to `PBScript` / `CCJS` / `ESMCode` stages in Workflows, SLAs, Schedules, Routines and Bots |

`--skip-*`, `--allow-reactivate`, `--lax-code`, `--rollback` and `--legacy-replace-workflows` work as in single-file mode. `--notify-email` is accepted but has no effect: users created by `apply --dir` never get the welcome email.

### One preview, one prompt

Without `-y` or `--dry-run`, `apply --dir` previews the whole directory before it asks — since **0.14.0**. It prints what it found, runs the directory exactly as `--dry-run` would (with the same flags, so `-q` and `--diff` apply), prints that preview with its warnings and destructive findings, and only then asks **once**, with the totals per action:

```
Applying directory: ordenes-compra/
Profile: dev

Found 5 YAML files:
  2 AccessRole files (7 documents)
  1 PropertyType file (3 documents)
  1 Property file (3 documents)
  1 Workflow file (1 document)

  [CREATE] access/manager-role.yaml — AccessRole: Órdenes de Compra: Manager
  [CREATE] access/permissions.yaml — AccessRole: ordenes-compra:start-form
  [CREATE] access/permissions.yaml — AccessRole: ordenes-compra:view
  [CREATE] access/permissions.yaml — AccessRole: ordenes-compra:view-all
  [CREATE] access/permissions.yaml — AccessRole: ordenes-compra:write
  [CREATE] access/permissions.yaml — AccessRole: ordenes-compra:form-bypass
  [CREATE] access/permissions.yaml — AccessRole: ordenes-compra:force-state
  [CREATE] data-model/property-types.yaml — PropertyType: oc_transaccion
  [CREATE] data-model/property-types.yaml — PropertyType: oc_maestro
  [CREATE] data-model/property-types.yaml — PropertyType: oc_estados
  [CREATE] data-model/states.yaml — Property: oc_estado_borrador
  [CREATE] data-model/states.yaml — Property: oc_estado_pendiente
  [CREATE] data-model/states.yaml — Property: oc_estado_error
  [CREATE] workflow.yaml — Workflow: ordenes_compra
  [CREATE] workflow.yaml — StateMachine: sm_oc_main

✔ 15 CREATE — Apply 15 changes to dev? Yes
  [created] access/manager-role.yaml — AccessRole: Órdenes de Compra: Manager
  [created] access/permissions.yaml — AccessRole: ordenes-compra:start-form
  [created] access/permissions.yaml — AccessRole: ordenes-compra:view
  [created] access/permissions.yaml — AccessRole: ordenes-compra:view-all
  [created] access/permissions.yaml — AccessRole: ordenes-compra:write
  [created] access/permissions.yaml — AccessRole: ordenes-compra:form-bypass
  [created] access/permissions.yaml — AccessRole: ordenes-compra:force-state
  [created] data-model/property-types.yaml — PropertyType: oc_transaccion
  [created] data-model/property-types.yaml — PropertyType: oc_maestro
  [created] data-model/property-types.yaml — PropertyType: oc_estados
  [created] data-model/states.yaml — Property: oc_estado_borrador
  [created] data-model/states.yaml — Property: oc_estado_pendiente
  [created] data-model/states.yaml — Property: oc_estado_error
  [created] workflow.yaml — Workflow: ordenes_compra
  [created] workflow.yaml — StateMachine: sm_oc_main
  [created] workflow.yaml — State: oc_estado_borrador
  [created] workflow.yaml — State: oc_estado_pendiente
  [created] workflow.yaml — State: oc_estado_error

Applied directory "ordenes-compra/": 18 created, 0 updated, 0 unchanged, 0 rolled back, 0 error(s), 0 skipped
```

That is the scaffold's `ordenes-compra/` applied to a company that has none of it. A prompt with something in every column reads like `3 CREATE · 12 UPDATE · 40 NO-OP · 1 ERROR — Apply 15 changes to dev?`. A Workflow's state machines and states get lines of their own, so the counts outnumber the documents — and a new Workflow's preview lists its state machines but not their states, which is why the preview counts 15 and the summary 18. The write that follows repeats none of the warnings, and it asks nothing per resource — the questions a survey update deactivates, which `apply -f` asks about, are deactivated after that one prompt. What the preview settles:

- **Nothing to send** — every resource is `NO-OP`: it says so and asks nothing.
- **An error in the preview** — it asks nothing, writes nothing, and exits with the error's code: `2` for a validation refusal, `1` otherwise. In 0.13.0 a yes to the prompt applied the files before the error. With `--continue-on-error` it asks, with the `ERROR` lines on view, and the write skips what fails.
- **A declined prompt** — prints `Apply cancelled.`, writes nothing, and exits with the code of the errors the preview showed, or `0` when it showed none.

A reference to something the same directory writes first — an SLA naming a state machine one of its Workflows creates, a JobTitle or a User naming an AccessRole it creates — is read as the write will find it, in the preview and under `--dry-run` alike. Within a kind, files go in path order, so a reference to what only a **later** file creates is still an error.

Under `--dry-run` the per-resource lines read `[CREATE]`, `[UPDATE]` or `[NO-OP]`, with no summary; after a write they read `[created]`, `[updated]`, `[unchanged]` or `[rolled-back]`, and a failed document prints `[error] <file> — <Entity> <identifier>: <message>`.

### `--continue-on-error`

By default the run stops at the first failure. With `--continue-on-error` a resource that fails is reported and the rest still apply — a file whose YAML or `partial` key cannot be read is skipped whole, and so is one with an unreadable `file://` reference outside a Survey; in a Survey, such a reference fails only that Survey. The run still exits non-zero: with the first of `3` (a partial apply), `2` (a refusal) or `1`, in that order. A Ctrl-C at a prompt stops the run either way. The refusals that exit `2` include the `partial: true` ones listed under [Partial documents](#partial-documents-partial-true).

A run that stops early names, on stderr right under the summary, the files it never reached — `Not reached, the run stopped before them: <file>, …` (new in 0.16.0). A mixed-kind file that ran in part is named with the kinds that did not run, as `<file> (<Kind>, …)`. The `skipped` count of the summary covers only what the run chose to skip; the summary line stays the last line of stdout. The line is not printed under `--dry-run` or `--json`.

<div className="alert alert--warning">

**SLA files stopped every directory run before 0.16.0.** From 0.12.0 until 0.16.0, every SLA write ended in an error although it had been written, so `apply --dir` without `--continue-on-error` stopped after the first SLA file and never applied the rest of the SLA files, nor the Schedule, User, Bot and Webhook files after them. 0.16.0 applies them: review those files, or run the same `apply --dir` with `--dry-run`, before the first run on this version.

</div>

### One document per resource

A batch declares each resource once. Since **0.14.0**, two documents of one kind with the same identifier — `code`, `name`, `email` or `nameCode`, an SLA's `code` within its state machine — are refused before anything is written, whether they share a file or sit in two files of the directory, and the run exits `2`. Before, the last one silently won. Under `--continue-on-error` the files that repeat it are skipped (`[skip]` lines, counted under `skipped`) and the rest apply.

Every kind but `Workflow` takes several documents per file, and a file may mix kinds; a Workflow file holds exactly one document.

### JSON output

With `--json` (new in 0.14.0), stdout carries one JSON object per result instead of the text lines — the shape `surveys apply --json` and `workflows apply --json` print, plus the `file` it came from: `entity`, `identifier`, `action` and, when present, `diff`, `destructiveChanges`, `preservedElements` and `statusCall` (`activate` or `deactivate`, the call a schedule update is followed by).

```json
{"file":"schedules/digest.yaml","entity":"Schedule","identifier":"sched_daily_digest","action":"updated","statusCall":"activate"}
```

A Routine result the server's keyed route answered also carries `ops`, the operations it announced, exactly as the server sent them (an empty list means nothing was saved). A failed document is a line with `"action": "would-error"` and an `error` object — with the server's `code` and `data` when the keyed route refused a Routine update; a skipped one has `"action": "skipped"`; a resource `--rollback` deactivated has `"action": "rolled-back"`. No summary is printed and the exit codes do not change. Without `-y`, the preview, the prompt and `Apply cancelled.` go to **stderr**, so stdout carries nothing but JSON.

### It's safe to run twice

Directory apply is **idempotent** — re-running it is expected and safe:

| Scenario | Behavior |
|---|---|
| Fresh environment | Everything created |
| Re-apply, no changes | **Nothing is sent** — every resource reads `unchanged` (`[NO-OP]` in a dry run). Before 0.14.0 each one was written again. A User that declares `password`, and a Schedule whose `time` or `endDate` names no zone, are still sent every time |
| Re-apply with new files | New ones created; an existing one is updated only when the YAML changes it |
| State removed from a workflow YAML | **Blocked** — missing states are rejected |
| Immutable field changed | **Blocked** — `code`/`nameCode` immutability enforced |

## A word on rate limits and permissions

The backend rate-limits writes (roughly 20 per 5-second window). `cotctl` retries a `429` for you, up to three attempts with backoff, so you only need to space out calls when a batch is large enough to exhaust them.

A `403` means the logged-in user lacks a permission the request needs — a Cotalker permissions matter, not a CLI one. How it reads depends on the kind: `API Error 403` for a Survey (usually the survey administration permission), an AccessRole, a PropertyType, a Property, a Workflow's group or task group, and a Routine or a Bot under `apply --dir`; `Forbidden (HTTP 403): <message>` for a JobTitle, a User, an SLA, a Schedule, a Webhook, a Workflow's state machines and states, and `bots apply` or `routines apply`; and `Attempted to modify a read-only field (path: …)` when the server refused a field `cotctl` sent — report that one as a bug. Since 0.14.0, reading a routine by its `code` also needs `admin-pbscripts-read` — see [Routines](../resources/routines.md).

## The standard loop

In practice, deploying a workflow looks like this:

```bash
cotctl validate --dir ordenes-compra/            # 1. catch errors offline
cotctl apply    --dir ordenes-compra/ -c dev     # 2. deploy
cotctl validate --workflow ordenes_compra -c dev # 3. production-readiness check
```

## See also

- [validate](./validate.md) — always run before apply
- [scaffolding](./scaffolding.md) — generate the folder that `apply --dir` consumes
- [Resource YAML reference](../resources/surveys.md) — the schema for each kind
