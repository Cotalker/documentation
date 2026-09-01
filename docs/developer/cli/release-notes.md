---
title: Release notes
sidebar_label: Release notes
displayed_sidebar: developer
---

<!-- source: repositories/cotctl/CHANGELOG.md @ release-0.10.0 -->

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

{/* DRAFT - copied verbatim from the cotctl CHANGELOG for release-0.11.0.
    Before merging, rewrite it for implementation partners: give every
    breaking change a "What to do", drop the internal detail (file paths,
    PR numbers, contributor-only notes) and translate anything left in
    Spanish. Then delete this comment. */}

## 0.11.0 — 2026-09-01

### ⚠ Breaking changes

- **`cotctl slas apply` no longer forces `pb.version: 'v3'` when updating.**
  The default still applies when **creating** an SLA; on update, a YAML that
  omits `pb.version` (or carries it as `null` / `""`) leaves the server's value
  intact instead of overwriting it with `'v3'`.

  **Who this affects:** anyone who relied on `apply` to normalize SLAs created
  outside cotctl up to V3. Those SLAs stop being promoted on their own and stay
  on whatever engine they have. If their bots use COTLang expressions
  (`$VALUE#...`, `$INPUT#...`) in the stage `data`, those go unresolved under
  V2, with no error.

  **Migration:** declare the pin explicitly in the YAML —

  ```yaml
  pb:
    version: "v3"
    start: ...
  ```

  An explicit `pb.version` was never touched and still is not, on create or on
  update.

### Added

- **A survey's `+table` question now round-trips through the CLI.** `export`
  writes the question's `columns` (previously dropped, so an exported YAML
  described a table with no columns), the Zod schema validates them, `validate`
  and `apply` check them semantically, and `apply --dry-run` diffs them.
  Both YAML shapes are covered: the raw `chat[].contentArray[]` form and the
  simplified `questions[]` form (`type: table`).

- **A saved table and its columns are protected on update.** Four refusals,
  enforced by the CLI because the backend does not diff a table against the
  stored document: removing the table or changing its `identifier`, removing a
  column or changing its `identifier`, changing a saved column's type, and
  reordering, renaming or removing a saved option of a selection column (or
  editing its label) — each orphans or re-labels answers already stored. They
  fail the apply, in `--dry-run` as much as in a real run. The frozen field is
  the `identifier`: **renaming a table or a column is allowed**, and so is
  adding a new column or **appending new options after the existing ones**.

- **`apply` warns that a new table will not render on mobile** until the next
  mobile release. It works on web today. The warning is emitted only after the
  apply's error gates pass — a run that failed never warns about a table it did
  not create — and `--quiet` silences it like every other warning.

- **`--allow-unverified-company` accepts a profile whose company could not
  be confirmed.** Separate from `--yes` on purpose — one approves an
  overwrite, the other waives a safety check.

- **`-y, --yes` overwrites an existing profile without asking**, and without
  a terminal `login` now fails fast instead of blocking. The overwrite
  confirmation used to be read from stdin with no TTY check, so
  `echo | cotctl login …` waited forever. The refusal names both escape
  hatches (`--yes`, `--profile <name>`) and happens before any network
  round-trip.

- **`apply` reports the PropertyType `schemaNodes` it preserved.** Server
  nodes absent from the YAML have always been merged back into the PATCH
  body so an incomplete YAML cannot delete data — but the apply reported a
  bare `Updated`, and `--dry-run` diffs the already-merged body, where the
  kept nodes leave no delta. Applying a property type with `schemaNodes: []`
  therefore answered `1 updated` while silently ignoring the removal.

  The preservation is unchanged. What changed is that it is now stated:

  ```
    Updated: office_location (preserved 1 schemaNode not in YAML: 'city')
  ```

  and `--dry-run` gains a dedicated section, computed against the server
  state **before** the merge, so the omission surfaces before anything is
  sent:

  ```
    Would UPDATE: office_location
      Preserved 1 schemaNode not in YAML (will NOT be deleted):
        = schemaNode 'city'
  ```

  Covered on `cotctl property-types apply`, `cotctl apply -f` and
  `cotctl apply --dir`. Applies with nothing to preserve print exactly what
  they printed before.

  Deleting a schema node is still not supported through the YAML; use
  `isActive: false` to retire one.

- **The release opens the public release-notes PR by itself.** A new
  `docs-release-notes` job in `release.yml` extracts this file's `## X.Y.Z`
  section, inserts it into `docs/developer/cli/release-notes.md` in
  `Cotalker/documentation` and opens a PR against `main` there. The inserted
  block is a **draft** — copied verbatim, carrying a `DRAFT` comment and a
  review checklist in the PR body — because the CHANGELOG is written for
  whoever develops the CLI and the page is read by implementation partners,
  who cannot see this repo at all.

  The job runs after `publish`, so a failure never blocks the binaries or the
  npm packages. It needs a `DOCS_RELEASE_NOTES_TOKEN` secret (a fine-grained PAT
  on `Cotalker/documentation` with Contents:write, Pull requests:write and
  Metadata:read); a missing or expired one fails at the first step instead of
  reaching an opaque 403 after the release is out.

  Two guards protect the draft a reviewer is curating: the job refuses to run
  while an earlier release-notes PR is still open — every release inserts at the
  same anchor, so a second branch cut from `main` would conflict by construction
  — and it never overwrites an existing branch, so re-running a tag leaves the
  curated version alone. The job holds the only cross-repo token in the
  workflow, so it drops its ambient `GITHUB_TOKEN` to `contents: read` and
  checks the documentation repo out with `persist-credentials: false`.

- **Anti-drift guard for `icon:` values** (`tests/skills/skill-icon-path.test.ts`).
  Every `icon:` line in the embedded skills, in `docs/`, and in `examples/`
  must be SVG path data. The rule is applied to the three trees uniformly, so
  they cannot drift into the antipattern independently — which is what
  happened here for the third time. It deliberately checks the YAML value, the
  notation the mistake is written in, rather than the prose claim about it.

### Changed

- **A `+table` written in the simplified `questions[]` form is validated exactly
  like the raw `chat[]` form.** The simplified schema never declared `columns`,
  so nine rules the raw format enforces were skipped: the seven allowed column
  types, no nested tables, 1 to 10 columns, the `^[a-zA-Z0-9_]+$` column
  identifier charset, the required column header and its 50-character cap, no
  `_id` on a column, the 50-row ceiling with `min` not above `max`, and the
  per-type requirements of a column (`options`, `filters`, `personFilter`,
  `source`/`url`) including the JavaScript syntax of its `exec`.

- **A table with no `columns` key at all is refused instead of crashing.** It
  used to pass `validate` and `apply --dry-run` and then fail the real apply
  with an internal `TypeError`; the same held for a `listquestion` column with
  no `options`, a `person` column with no `personFilter` and a `property`
  column with no `filters`. All four are now reported as validation errors
  before anything is written.

  **A simplified YAML that passed `validate` before may now be refused.** Every
  new refusal was already failing, or silently misbehaving, on the raw path or
  server-side.

- **`cotctl login --url` and `--api-url` accept a host with no scheme.**
  `--url web.cotalker.com` resolves to `https://web.cotalker.com` and the
  command prints the resolved URL. An explicit `http://` is honored, for local
  and on-premise environments that do not serve TLS.

**This is a restriction, not only a feature.** A survey YAML carrying a `+table`
question that passed `validate` before will now be refused if it breaks any of
the rules the schema previously did not check: `columns` present on a
non-`+table` question, a table with zero columns or more than the allowed
maximum, a column identifier outside `^[a-zA-Z0-9_]+$`, `min`/`max` row counts
that are non-integer, negative, above the row ceiling, or inverted, and column
labels past the length limit. Each is backend parity — the payloads being
refused were already failing, or silently misbehaving, server-side.

Note that a **column** identifier may start with a digit or an underscore while
a **question** identifier may not. The divergence is deliberate backend parity,
not an oversight.

### Fixed

- **Deleting a whole `+table`, or changing its `identifier`, is now refused,
  like deleting a column already was.** The check only ever walked the tables
  the YAML still declared, so a table that vanished from the file was invisible
  to it: the apply went through, every row ever answered was orphaned, and a
  changed identifier was additionally reported to the operator as a brand-new
  table with the "not visible on mobile" notice. Changing a table's `label` was
  never affected and still is not.

- **A selection column that loses its whole label list is now refused.** The
  comparison iterated the labels the YAML declared, so an empty list meant no
  comparison ran at all — the exact loss the check exists to prevent. Losing
  the whole value list was already refused.

- **`surveys export` no longer overwrites one exec script with another.** The
  extracted file name joined the question path with `_`, which is legal inside
  both identifier charsets, so a top-level question named `t_c` and a column
  `c` of a table `t` produced one file. The second write won, and the exported
  YAML pointed both scripts at it — so re-applying that YAML wrote the column's
  script into the top-level question. The parts are now joined with `-`.
  **Exported script files change name**; re-export rather than renaming by hand,
  so the `file://` references in the YAML stay in step.

- **Four `--option` descriptions asserted things already false at 0.10.0.**
  `surveys --legacy-replace` and `apply` / `workflows --legacy-replace-workflows`
  announced a removal in 0.7.0 / 0.8.0 that never happened, and
  `property-types get --show-inactive` promised a filter it does not apply — the
  default output already lists inactive schema nodes, tagged `[INACTIVE]`. These
  strings ship compiled into the SEA binary, so a false one cannot be corrected
  until the next release. `docs/` already described the real behavior; only
  `--help` disagreed. No flag changed name or behavior.

- **The `401` retry no longer leaves its discarded response body open.** When a
  request is re-issued with a refreshed token, the body of the `401` that
  triggered the refresh is now cancelled first, the same way the `429` retry
  already did. undici warns about — and retains — an unconsumed stream.

- **API URL autodiscovery no longer hangs, and says what it tried.** The
  discovery `fetch` had no timeout at all, so a webclient host that accepted
  the connection and never answered left `cotctl login` waiting forever.
  Every attempt is now bounded by an `AbortSignal` (6 s per candidate, 10 s
  for the whole sweep).

  Discovery also probed a single URL. Shared production serves the app and the
  API from sibling hosts, so `--url https://www.cotalker.com` never reached the
  `environment.js` that `web.cotalker.com` serves. The `www.` ↔ `web.` sibling
  is now tried as a fallback, always after the host the user asked for.

  When every candidate fails, the error enumerates each URL and why it failed
  (`HTTP 404`, `no response after 6000ms`, `served, but no api field found`)
  instead of naming only the original `--url`.

  The host that answered is now printed, and flagged when it is the sibling
  rather than the one that was passed: the fallback moves the host the
  password and the JWT are posted to, and it used to do so silently.

- **`login` refuses to save a profile for the wrong company.** The browser
  flow authenticates against whatever Cotalker session the browser already
  has, and `--subdomain` is never sent to it — so signing in with another
  company's session open silently saved a profile pointing at that company.
  After the token is minted and **before** anything is written, `login` now
  reads back the company the token belongs to (`GET /api/companies/:id`) and
  compares it against `--subdomain`. On a mismatch it fails, naming the
  company it got, the one that was requested, and how to fix it (log out in
  the browser / use a private window, or `--no-browser`).

  If the company cannot be read back, the check cannot conclude. `login`
  warns — naming the unverified subdomain, and repeating the warning after
  the success block, where it is actually readable — and asks whether to save
  a profile whose company label nothing verified. With no terminal to ask on
  it stops, and `--allow-unverified-company` is the way through. `--yes` does
  **not** answer this question: it approves overwriting a profile, not
  skipping a verification.

  **Behavior change for unattended use:** a scripted `login` against an
  environment that does not expose the company used to succeed with a warning
  on stderr. It now fails unless `--allow-unverified-company` is passed.

- **Every exit after the token is minted names the token it leaves behind.**
  The ApiToken is created before the company can be checked, so a mismatch —
  or a declined overwrite — abandoned a live token with no local record of
  it. All those paths now print its code and
  `<webclient>/admin/apitokens`. The mismatch message no longer claims more
  than it knows either: it says *no local profile was saved*, which is what
  actually happened.

  This is a client-side guard, not a fix for the root cause: making the
  browser flow honour the requested company requires the webclient's
  `/cli-auth` page to accept a company hint, which lives in another
  repository.

- **A cancelled overwrite now fails instead of reporting success.** Answering
  anything but `y` to `Profile "acme" already exists. Overwrite? (y/N)` exited
  `0` and printed `Login cancelled.` to **stdout**. A script could not tell a
  cancelled login from a successful one, so it went on to use a profile that
  was never written. The cancellation now exits `1` and is reported on
  **stderr**, together with the abandoned-token notice — the token is minted
  before the question is asked.

  **Observable contract change:** `login` never exited non-zero on a
  cancellation before. A pipeline that only checks `$?` will now stop where it
  used to continue, which is the point — but it will stop. Exit `1` matches
  every other `login` failure path; `2` (validation refusal) and `3` (partial
  directory apply) keep the meanings they have elsewhere in the CLI.

  The no-terminal refusal is unchanged and still exits `1`; it runs before the
  mint, so it has no token to name.

- **`Profile saved` is now verified against the file.** The success message
  was printed on the strength of the write alone. `login` now re-reads the
  config after saving, confirms the profile is there with the token it just
  wrote, and names the exact path in the success line
  (`Profile saved as "acme" to /Users/you/.cotctl/config.json`). A failed
  read-back exits non-zero naming the same path.

- **Autodiscovery no longer picks up a commented-out `api` value.** The
  `environment.js` parser matched the first `api: '...'` in the file with no
  notion of what was code and what was a comment, so a whitelabel file whose
  commented-out example config sits **above** the live value made
  `cotctl login` discover the wrong host — and then post the user's password
  and JWT to it. Shared production is one such file (it carries a commented
  `api: 'https://demo.cotalker.com'`) and resolved correctly only because the
  live line happens to come first. Line (`//`) and block (`/* */`) comments are
  now stripped before matching. A file whose every `api` value is commented out
  reports `no api field found` instead of returning the commented one.

- **`export` → `validate` round-trips again when a bot stage has no pinned
  version.** The backend persists an unpinned bot or stage as
  `version: null`, and every bot-emitting export dumped the document
  verbatim — so `cotctl validate -f` rejected cotctl's own pristine export
  with `stateMachines.0.states.0.next.0.bots.0.stages.0.version: Invalid
  input`. Two halves, because either one alone leaves the round-trip
  broken:

  - `version: null` is now accepted wherever a bot version is read, and
    normalized to "no version" — the same meaning as an omitted key or an
    empty string, and the same conflation the bot-type catalog already
    makes when it decides whether a type has a default. YAML already
    exported to disk keeps validating.
  - The exporters no longer emit the key when the value is `null`, so new
    YAML comes out clean regardless of what the backend sends. This covers
    all four workflow bot slots (`requiredSurvey`, `next[]`, `subtask`,
    `surveyTriggers[]`) plus the `parametrizedBot` / `pb` / `body`
    documents of `bots`, `routines`, `slas` and `schedules`.

  A pinned version — numeric, `'3'` or semver — is untouched; only `null`
  is stripped.

- **`applySla` no longer sends its default back on update.** The
  `pb.version: 'v3'` default `applySla` injects travelled in the body of
  create **and** update (`src/lib/apply-helpers.ts`), even though its own
  comment claimed to mirror the CREATE-only guard of
  `BotResource.toApiBody`. Combined with the cleaner export above, that
  turned an `export` → `apply` into a silent `COTLangV2` → `COTLangV3`
  repaint. It is CREATE-only now, for real.

- **Three tables in the embedded skills were rendering with columns missing.**
  In `cotctl-jobtitles` the rows for `get` and `deactivate`, and in
  `cotctl-export` the JobTitles row, each carried a bare `|` inside a cell.
  Markdown splits a table row on its pipes before reading anything else, so
  those rows parsed one column too wide and their trailing text fell out of the
  table — an agent consulting the skill got a mangled row in place of the
  command it documents. The skills ship compiled into the binary, so the broken
  rendering shipped with them and could not be corrected without a release. The
  pipes are now escaped. `docs/` was swept at the same time; one unrelated row
  is still malformed in `docs/schedules/yaml-structure.md`, which is
  documentation only and correctable at any time.

- **`surveys list --help` no longer advertises a `-c` short form for `--code`.**
  The option was declared `-c, --code`, but `-c` is already the global
  `--company`, so Commander bound the short form to the profile selector:
  `cotctl surveys list -c my_survey_code` searched for a *profile* by that name
  and failed with `Profile '…' not found`. The short form is gone from the
  declaration. `--code` is untouched and still performs the exact code lookup,
  and `-c` keeps meaning `--company` here exactly as it does everywhere else —
  which is what it already did. Nothing that worked stops working, because the
  short form never reached `--code` at all; what changes is that `--help` stops
  promising it.

### Migration

A YAML exported by a version older than this one has **no `columns` block**,
because `export` dropped it. Re-applying such a file to a survey whose table
already has saved columns now trips the "column exists in the environment but is
missing from the YAML" refusal, once per saved column: from the file's point of
view every column disappeared.

This is the protection working, not a bug — but it means a stored YAML from an
earlier version is no longer a valid input for a survey with a table. **Re-export
those surveys** (`cotctl surveys export ...`) before re-applying them.

### Docs

- **The embedded skills catch up with `docs/` on two corrections they had
  missed (FB-37, FB-49).** Both had already been fixed under `docs/` and were
  still wrong inside `src/skills/`, which is what an agent actually reads and
  what ships compiled into the binary — so in practice the old guidance was
  still the guidance being served.
  - `icon` (Workflow) is documented and exemplified as an **SVG `d`-path**,
    not an icon name. The headline "Generate the YAML" example in
    `cotctl-workflows` carried `icon: shopping_cart` — the exact antipattern —
    and the reference table called the field an "Icon identifier". A name is
    accepted and stored verbatim, so nothing fails: the portal simply lists
    the workflow under "Custom / Path" and renders no icon. Both shipped
    examples under `examples/workflows/` carried the same value and were
    corrected too.
  - The section **"Passing the routine's `dataType[]` inputs"** now exists in
    the skills, not only in the four `docs/` files that already had it. Every
    place that shows the PBScript-via-stage pattern — the SLA and Schedule
    sections of `cotctl-workflows`, the cross-reference step of
    `cotctl-routines`, and step 5 of `cotctl-bots` — states that the invoked
    routine's inputs go **as sibling keys of `code` inside the same `data`
    block**, and that omitting a `dataType[].required: true` key **never
    fails the apply** — not in `validate`, not in `apply --dry-run`, not in
    the real apply: the routine just runs with that input empty. Applying a
    **Workflow** does emit a non-blocking warning for it (`applyWorkflow`
    fetches the routine catalog to check); no other resource that embeds bot
    stages does, so each skill now states which of the two cases it is in
    rather than denying the warning outright. The
    `cotctl-routines` example shipped the reproducer itself — it declared a
    required input and then invoked passing only `code:` — and now forwards
    the key. `examples/routines/routine-complete.yaml` and
    `examples/bots/bot-with-survey-command.yaml` had the same shape and were
    corrected.

- **`surveys` and `jobtitles` document their positional argument as
  `<identifier>`, which is what `--help` has always called it.** The
  JobTitle page advertised `<code|id>` on three of its rows while the
  command declared `<identifier>`, and two rows in the embedded skills
  rendered broken because an unescaped `|` split the table cell. Both
  copies now name the argument the way the CLI does, and the code
  comment at each declaration states what the word means there: a code
  or a 24-character hex ObjectId — not the `identifier` that a survey
  question or a `+table` column carries in Cotalker's own model.

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
