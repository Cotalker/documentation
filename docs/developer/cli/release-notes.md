---
title: Release notes
sidebar_label: Release notes
displayed_sidebar: developer
---

<!-- source: repositories/cotctl/CHANGELOG.md @ c85e3b7 (2026-09-11) -->

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

{/* DRAFT - copied verbatim from the cotctl CHANGELOG for release-0.12.0.
    Before merging, rewrite it for implementation partners: give every
    breaking change a "What to do", drop the internal detail (file paths,
    PR numbers, contributor-only notes) and translate anything left in
    Spanish. Then delete this comment. */}

## 0.12.0 — 2026-09-11

### ⚠ Breaking changes

- **`surveys export` now exits `2`, not `1`, when the simplified transformer
  refuses the survey.** This matches the documented contract every other input
  failure follows (`0` ok, `1` runtime failure, `2` invalid input) and the
  branch of `apply` it mirrors. A transport or authentication failure still
  exits `1`. A pipeline that treats any non-zero exit as a failure is
  unaffected; one that tests for `== 1` specifically needs updating.

- **`workflows apply --dry-run` reports up to two more `preserved` fields per
  state machine.** Routing `dynamicPropertyTypes` and `allowedExtensions`
  through the same traced `pickFrom` as their neighbours — the fix above — is
  what stops them being wiped, and a traced preserve is also a *reported* one.
  Nothing about the apply changed, but the headline `N preserved` count grows
  by up to 2 per state machine, so a script that parses that number (or diffs
  the dry-run output verbatim) sees a change with no change behind it.

- **`conditionalDisplay` and `command` inside a `+table` column are now
  rejected.** Both spellings are refused at parse time, so a YAML that validates
  and applies today stops doing either. The refusal is a schema failure, so it
  exits with each command's validation-failure code — `1` for `validate`,
  `apply` and `surveys apply` alike. It is **not** the `2` above, which belongs
  to `surveys export` refusing a survey in the transformer. Migration: move the
  condition up to the `table` question itself, which is the level that actually
  gets evaluated. Conditional display on a top-level question is unchanged.

- **`validate --dir` now fails on two things it used to let through.** A
  directory that exits `0` today can start exiting `1`, for either of two
  reasons.

  The first is **a survey's semantic errors**. Nothing new is wrong with those
  files — the error was already there, it just did not surface until the survey
  was applied.

  The second is **a `file://` reference that does not resolve, in any kind**.
  This one is not limited to surveys: a PropertyType carrying
  `editable.src: "file://missing.js"` passed as a valid string in `0.11.0` and
  now fails the directory run. Any kind that accepts a `file://` reference is
  checked the same way.

  Migration: fix what the validator now reports, or the same failure lands on
  the next `apply`.

- **`surveys export` no longer emits `conditionalDisplay` or `command` inside a
  column.** Neither key is evaluated at that level, so an export → edit → apply
  round trip carried a field that did nothing.

  What they did on apply differed by key, and it is worth stating precisely.
  `conditionalDisplay` was discarded. `command` was **not**: verified against
  `release/0.11.0`, `mapQuestionToApi` spread the question without walking
  `columns`, so a column's `command` did travel in the `PUT`. Because
  `RawTransformer.toApiBody` replaces `body.chat` wholesale, dropping the key
  from the export means a raw round trip now removes it from the backend rather
  than rewriting it. The value is inert, so nothing observable changes — but the
  removal is real, not a no-op.

  A verbatim diff against an earlier export shows the difference.

### Added

- **cotctl can now authenticate from the environment, for CI and any other
  non-interactive run.** Export `COTCTL_TOKEN` (a cotctl ApiToken) and
  `COTCTL_API_URL` (the API URL of the environment it belongs to), then drop
  `-c/--company`:

  ```bash
  export COTCTL_TOKEN="$CI_COTCTL_TOKEN"
  export COTCTL_API_URL="https://www.cotalker.com"
  cotctl apply -f survey.yaml --yes
  ```

  Until now a pipeline had to write `~/.cotctl/config.json` by hand, which meant
  reproducing an internal file format — and the recipe `docs/` published for it
  was missing the required `version` key, so it produced a config cotctl
  rejected as corrupted.

  The configuration is built in memory and **nothing is written to disk**. The
  company is read from the token's own `company` claim, so it cannot disagree
  with the token, and the expiry is read from the token's `exp`. One line goes
  to `stderr` naming where the credential came from.

- **`-c` still wins.** The variables are consulted only when `-c/--company` is
  absent — previously an outright error — so no existing invocation changes
  meaning when `COTCTL_TOKEN` happens to be exported.

- **An environment credential fails hard when it is rejected.** cotctl does not
  re-authenticate from the environment: on a 401, or once the token's expiry has
  passed, it stops with a message naming `COTCTL_TOKEN` instead of the password
  prompt and the `cotctl login --url … --subdomain …` recipe a profile would get.
  Writing `COTCTL_TOKEN` into a profile is not something cotctl will do behind
  your back.

- **The credential is checked before it is used, and the checks cost no network
  call.** A user session JWT copied out of the browser is refused instead of
  being labelled an ApiToken (the backend signs a `type` claim; a legacy token
  without one is still accepted). The optional `COTCTL_COMPANY_ID` asserts which
  company the job expects, and a token belonging to another one stops the run
  before anything happens, naming both ids — a validation refusal, so `apply`
  exits `2`. Exporting only one half of the pair now
  says which half is missing in **both** directions, instead of answering
  `--company/-c is required` when only `COTCTL_API_URL` is set.

- **The startup line no longer reads as confirmation when it is not.** An
  already-expired token is announced as `EXPIRED at …` in yellow rather than as
  an expiry date in the past, and a `COTCTL_API_URL` written without a scheme
  says so — the same notice `cotctl login` gives for `--api-url`.

- **An invalid `COTCTL_TOKEN` no longer leaks part of its value.** The error for
  a value that is not a JWT interpolated `JSON.parse`'s own message, and Node
  quotes the first characters of what it was given — decoded token material, in
  a CI log. The failure is now classified from a fixed set of reasons that
  cannot contain the input. Same fix covers `cotctl login --paste-token`.

- **A clear of `context` is now announced before it happens.** A new
  `webhook.context-clear` destructive-change rule fires whenever an apply would
  remove a populated `context`, naming the slots being dropped and the
  consequence (the webhook stops being scoped and starts firing for every event
  of its trigger). Every path announces it, through whichever surface that path
  has: the warning channel on `--dry-run`, the confirmation preview on an
  interactive apply, and the warning channel again on an unattended apply (`-y`,
  or `apply --dir`, which always skips the prompt). Exactly one of the three
  fires per run, so there is no path on which the clear goes unannounced —
  including under `-q`, which mutes only the progress lines. The unattended
  emission now carries
  the finding's severity (`warn` / `DANGER`), matching the confirmation preview,
  so a future `danger` rule cannot be degraded to a warning on the scripted
  path; and it no longer prints twice on the interactive path.

- **`cotctl login --token <jwt|@file|->` logs in with no terminal attached.** It
  takes the same pre-generated ApiToken as `--paste-token`, supplied as an
  argument instead of typed at a prompt, so a script or a CI job can authenticate
  without a TTY. The token can be given in three forms: the value itself
  (`--token <jwt>`), the path of a file (`--token @<path>`), or standard input
  (`--token -`).

  The two indirect forms exist because a bare value sits in `argv`, where any
  process on the same host can read it out of `ps` — GitHub Actions masks
  `secrets` in the job log, and that is all it masks. The recommended shape for
  CI is `echo "$CI_COTCTL_TOKEN" | cotctl login --token -`. Do **not** name that
  variable `COTCTL_TOKEN`: cotctl reserves it as an environment credential
  source, so exporting it changes the behaviour of every later command that omits
  `-c`.

  Neither indirect form can hang or run away: `--token -` gives up after 10
  seconds if the pipe stays open without delivering a token, and stops reading at
  8 KB, so a pipeline never burns its global timeout on a stalled stdin and a
  large file is never buffered whole. `--token @<path>` warns — it does not fail
  — when the file is readable beyond its owner, mirroring the check the profile
  store already runs on `~/.cotctl/config.json`; a secret mounted with the
  cluster's own mode still works.

  `--token` and `--paste-token` supply the same thing, so passing both is an
  error and the command exits 1 before touching the network. `--machine-id` is
  rejected the same way: it labels the machine that *mints* a token, and
  `--token` supplies one minted elsewhere. `--no-browser` is accepted but ignored,
  with a warning. A malformed `@<path>` or a value that is really a file path
  (missing its `@`) now fails on the local problem, before the API-URL discovery
  round-trip rather than after it.

  A CI run also needs `--yes` (the profile-overwrite guard fails without a
  terminal instead of waiting on an answer that cannot arrive) and, on most
  environments, `--allow-unverified-company`: if the token's user cannot read
  `GET /api/companies/:id` the company check cannot conclude, and `--yes`
  deliberately does not answer that one. The full recipe is in
  `docs/commands/login.md`.

- **A question declaring `dependsOn`, `showWhen`, `resetOnHide` or
  `resetIdentifiers` at its root now warns.** Those keys only take effect inside
  `conditionalDisplay`; written one level up they were accepted, never sent, and
  never mentioned. They still apply — this is a warning, not an error, and no
  exit code changes. The warning covers the **simplified** format: in the raw
  format the keys are not part of the question shape, so they are dropped at
  parse time and nothing is emitted.

- **A `preload` or `onDisplay` stage declaring `src` without `context` now
  warns.** Those two hooks are not registered without it, so the stage applied
  cleanly and then did nothing at runtime. The warning is scoped to them on
  purpose: on every other stage `context` is recommended, not required, and
  nothing warns. That is four more in the simplified format (`validate`,
  `onPlay`, `postsave`, `onSubmitSuccess`) and seven in the raw one, which also
  declares `filter`, `onChange` and `presave`.

- **`apply` accepts `-q, --quiet`.** `surveys apply` already had it, but the
  generic `apply` did not, so the warnings above could not be silenced on the
  path that applies a whole directory.

- **`schedules logs` accepts `-v, --verbose`**, which prints the full stage
  output alongside the error.

- **`schedules` has a command page**, including what `--op failed` does *not*
  cover: a stage that errors inside the bot does not mark the run as failed, so
  the filter cannot find it. That gap is in the backend, not in the CLI.

- **Conditional display documents that several `showWhen` entries are ANDed.**
  The embedded skill said so; the documentation did not, so anyone reading only
  the docs wrote two equality checks expecting an OR. The `regex` workaround is
  named alongside it.

- **⚠ The `workflows export` output gains two fields.** A repository that keeps
  its exports under version control will see them appear in the next diff.
  Each is emitted only when it is actually configured, so a workflow that uses
  neither exports exactly as before — but the shape of the document did change,
  and that is worth knowing before the diff shows up in a review.

- **`defaultSelectedTaskTab` — the tab a task opens on.** The field was
  invisible to cotctl in both directions: a YAML that declared it had the key
  stripped by the schema before the request was built, and the export never
  emitted it, so a workflow configured from the webclient lost the setting the
  moment anyone rebuilt its YAML from an export. It now round-trips.

  The accepted values are the backend enum — `notes`, `channel`, `task`,
  `documents` — plus `null`. **There is no `detail` tab**; the field was
  reported with one, and the backend `IntegratedTaskTabName` has no such
  member, so a `detail` value is rejected by the schema rather than sent.

  It carries the three intents `requiredSurvey` already uses on a transition:
  an omitted key preserves the server value, an explicit `null` clears it, and
  a tab name sets it. On export `null` is omitted — it is the default every
  workflow starts with, so emitting it would add a line to every export that
  says nothing, and an absent key round-trips back to `null` anyway.

- **`cardLabels` — the labels a task card shows.** This is the constructive
  half of the fix above: card labels stopped being deleted, but there was still
  no way to declare them, so a workflow could only acquire them through the
  webclient.

  The backend models five fixed slots (`status1`..`status5`) plus an `isActive`
  list naming which are shown — a shape that is faithful but unpleasant to
  write by hand. The YAML collapses both halves into one slot → PropertyType
  **code** map, so declaring a slot is what activates it and `isActive` is
  derived rather than typed:

  ```yaml
  stateMachines:
    - code: sm_po_main
      cardLabels:
        status1: pt_po_priority
        status3: pt_po_supplier
  ```

  Slots may be sparse. The card renders them in ascending slot order
  (`status1`..`status5`), fixed by the backend schema's key order and not
  something the YAML can change — `isActive` is a derived set of which slots
  are populated, not a sequence. `cardLabels: {}` deactivates every label; omitting the key preserves what the
  webclient configured. A slot the map omits is deactivated but keeps the
  PropertyType reference the server had stored — the backend replaces this
  sub-object wholesale, so the undeclared slots travel on the request instead
  of being destroyed. An unknown slot key (`status6`, `stat1`) is a validation
  error, not a key Zod silently strips.

  `validate --dir` now also resolves each `cardLabels` slot against the
  PropertyTypes declared in the directory (check `X3`), so a typo is caught
  before the apply turns it into a backend `400`.

  Two more guards around the same field:

  - `workflows export` warns on stderr when a card-label slot points at a
    PropertyType it cannot resolve to a code. The id is emitted raw, and —
    unlike `propertyType` / `asset.propertyType`, which really do pass an
    ObjectId back through — re-applying that YAML aborts the **whole**
    workflow with `PropertyType "<id>" not found`, naming a PropertyType
    nobody wrote. The usual cause is a slot left pointing at a PropertyType
    that was deleted, deactivated, or is invisible to the exporting profile.
  - `--dry-run` gained the destructive-change rule
    `state-machine.card-labels-deactivation` (severity `warning`): declaring
    `cardLabels` deactivates every slot the map omits, and `cardLabels: {}`
    deactivates all of them, so the run now says which labels the card stops
    showing instead of leaving it to be inferred.

- **The extensions a state machine's tasks accept can now be pinned from a
  file.** The webclient was the only possible editor: `cotctl workflows export`
  never emitted `allowedExtensions`, the schema did not model it, and the apply
  sent back whatever the server already had. A state machine now declares the
  PropertyTypes its tasks may carry as an extension the same way it declares its
  card labels — by **code**, resolved to ids on apply:

  ```yaml
  stateMachines:
    - code: sm_po_main
      allowedExtensions:
        - pt_po_photo
        - pt_po_signature
  ```

- **Omitting the key still preserves the server's list.** The previous release
  stopped `workflows apply` wiping `allowedExtensions` on every update; for a
  YAML that does not mention the field, that behaviour is unchanged. What
  changes is that a YAML which does declare it now takes precedence.

- **An absent key and `allowedExtensions: []` are different instructions.** The
  first asks for nothing and preserves; the second declares an empty list and
  **removes every extension** the state machine accepted. The Zod field
  deliberately carries no `.default([])`, which is what collapsed those same two
  cases in `propertyTypeSchema.schemaNodes` and made the tool report a deletion
  nobody had asked for.

- **A shrinking list is reported as a destructive change.** `--dry-run` says
  how many PropertyTypes the apply would lose, and `allowedExtensions: []`
  against a populated list states it outright. The list is replaced wholesale
  rather than merged, so an omitted entry stops being an accepted extension.

- **A code that does not resolve fails the apply, and `export` warns before
  that happens.** A code matching no PropertyType aborts the whole workflow with
  `PropertyType "<code>" not found`, exactly like a card-label slot;
  `validate --dir` covers the offline half. On the way out, an id the export
  cannot resolve to a code is emitted as-is and carries a `Warning:` line,
  because re-applying that YAML would abort. An empty list is never exported: an
  exported `[]` would read as *remove every extension*.

### Changed

- **The preserved-elements section now goes to `stderr`.** `emitPreserved`
  wrote to stdout while `emitDestructive` — the same kind of diagnostic — wrote
  to stderr. Both go to stderr now: a diagnostic must not pollute the stream
  someone redirects. No published command changes visibly: no surface that
  produces preserved elements goes through this formatter today.
- **The `preserved` key of the `--json` payload is renamed to
  `preservedElements`.** `preserved` already existed in the same payload with a
  different meaning (`diff[].kind === 'preserved'`, "the YAML omits the field
  and the merge keeps the server's value"). Each entry also carries a `reason`
  (`element-omitted` | `section-omitted`). The change breaks nobody today
  because `--json` is not yet wired into the surfaces that produce the field;
  later it would have.

- **`webhooks apply -q` now mutes progress lines instead of warnings.** The flag
  used to drop the warning channel entirely, which meant `webhooks apply -y -q`
  — the canonical CI shape — could clear a webhook's `context` without emitting
  a single line. `-q` now suppresses the per-webhook `Would CREATE` /
  `Would UPDATE` / `Created` / `Updated` lines; errors and destructive findings
  still surface, and so does the final summary on the run that produces one (a
  clean, non-dry-run apply). Note that this is **quieter** than the same flag in
  `properties` / `surveys` / `workflows`, where `-q` drops the `Would …` preview
  lines only — their `Created` / `Updated` lines are gated on `--json`, not on
  `-q`. Aligning the four is a change of contract and is not part of this
  release. The flag, its short form and every exit
  code are unchanged, but a script that parsed those progress lines under `-q`
  was reading output that the help text never promised.

No observable change in the CLI: this entry touches neither `src/` nor the prose
that gets published. What it corrects are the guards that watch that prose.

- **The repository root is computed once.** Fourteen specs derived it on their
  own, under three different names (`ROOT`, `PROJECT_DIR`, `COTCTL_ROOT`) and in
  two shapes; three of them replaced an absolute path to one developer's
  machine. They now all import `REPO_ROOT` from `tests/helpers/specs.ts`. The
  fourteenth ended in a slash and a `slice(REPO_ROOT.length)` silently depended
  on it: that was replaced with `path.relative`, and a new assertion pins the
  shape of that label, which until now lived only inside an error message and so
  nobody read while the test passed.
- **The published README now has the ghost-flag check.** A nonexistent flag
  named in `npm/cotctl/README.md` was caught by nothing: the sweep in
  `tests/docs/flags-table.guard.test.ts` covers the 150 pages of `docs/`, and
  `npm/` is not inside it. The new check walks the whole page — not just the
  table rows — against what Commander declares. Measured on the current tree:
  **zero ghost flags**. The declared set includes `visibleOptions`, because
  Commander creates `-h` / `--help` lazily and it does not appear in `options`;
  without that, the guard would report the README's correct `--help` as a
  ghost.
- **The `ALSO` clause now requires the escape-hatch verb.** It recognised any
  conjunction (", or --x"), so a list of flags inside a message that already
  offered a way out was added to the escape set. It now demands `or with` /
  `or using` / `or re-run with`. The measured set is unchanged — the same eight
  flags — and two negative cases pin the difference, which the existing
  assertions could not express.
- **The embedded-examples guard goes from 2 pairs to 8, and declares the
  remaining 9.** Of the 17 examples the binary embeds, 8 are identical to their
  YAML in `examples/`, 6 have diverged and 3 have no file on disk. The 9 are
  exempted with their reason written in the file itself. The count-based lock
  (`toHaveLength(2)`) was replaced by the property that matters: every embedded
  example is either guarded or exempt, so a new one cannot slip through.

None of this changes what the CLI does; it is grouped here because it touches
`src/`.

- **The typecheck catches dead imports.** `tsconfig.json` turns on
  `noUnusedLocals`, which was missing until now and was why an unused import
  survived a commit: the repository has no ESLint, so nothing was looking. The
  eleven the flag found were cleaned up.
- **The batched PropertyType lookup lives in one place.** The dry-run and the
  real apply repeated the same block; they now share a helper, which is also
  where the fallback lookup described above lives. The difference between the
  two paths is kept: the dry-run degrades to an empty map when the query fails,
  the real apply does not swallow it.
- **Four more warnings go through `warn()`.** `surveys export`, `properties
  export` and the two in `mcp` wrote the `Warning: ` prefix by hand.
- **`apply` silences the warning channel one single way under `--quiet`.** Two
  call sites passed `undefined`, which lets the helper's own default take over
  and leaks the warning despite the flag; all four now pass an empty function.

### Removed

- **`StateMachineResource.smToYaml` is gone.** It was an exporter running
  parallel to `WorkflowResource.toYaml`, with the same shape and no importer
  anywhere in `src/`: `workflows export` always went through `toYaml`. There is
  no behaviour change, because no execution path reached it.
- **What made it look alive was its coverage, not its use.** Twenty-three tests
  called it, among them the five for `cardLabels export`. Those five were not
  testing the exporter: both paths invoke the same pure helper
  (`dynamicPropertyTypesToYaml`) with the same arguments, so what they measured
  was the transformer through a wrapper.
- **No test was deleted without first checking its assertion was already made
  elsewhere.** Of the 23, six were redirected at `WorkflowResource.toYaml` — the
  ones asserting something no other test covered about the live path — five were
  rewritten against the transformer, and the remaining twelve were removed
  because `toYaml` already covered them.
- **`src/transformers/card-labels.ts` gets a spec of its own**
  (`tests/transformers/card-labels.test.ts`). Its three functions were only
  tested indirectly; they are now covered directly, including the invariants no
  wrapper exposes, such as slot order in the output.

### Fixed

- **The e2e suite can now authenticate from `COTCTL_TOKEN`, and a run whose
  credential never opened can be made to fail.** These two are one defect: a CI
  runner has no `~/.cotctl/config.json`, so every gate closed, all 14 spec files
  reported `skipped`, and the process exited `0` — indistinguishable from a run
  in which every assertion passed.

  The gate now reads `COTCTL_TOKEN` + `COTCTL_API_URL` when no
  `COTCTL_E2E_PROFILE` is set, and `COTCTL_E2E_REQUIRE_CREDENTIAL=1` turns a gate
  that could not open into a failure naming the actual reason — an absent
  profile, an expired token, a missing write opt-in. Both are opt-in and neither
  changes a local run: without the variables, a machine with no profile still
  skips. The environment path carries its **own** write opt-in,
  `COTCTL_E2E_ALLOW_ENV_CREDENTIAL=1`: `COTCTL_E2E_ALLOW_WRITES=1` is granted for
  a named profile, and a token names its own company, so a permission taken for
  one destination must not open another.

  This is repository tooling, not CLI behaviour — nothing a user of `cotctl`
  runs is affected.

- **The documented way to authenticate a pipeline no longer produces a config
  file cotctl refuses to read.** The `~/.cotctl/config.json` heredoc in
  `docs/advanced-configuration.md` omitted the required `version` key, and
  quoted its heredoc delimiter so `$CI_JWT_TOKEN` was written literally instead
  of being expanded — following it produced a corrupted profile twice over. The
  recipe now leads with `COTCTL_TOKEN`, and the file-writing variant that
  remains (for a job addressing several companies) is correct. The same section
  still described token expiry as "7 days without use", which is the legacy
  user-JWT rule and not what an ApiToken does.

- **The report no longer claims a deletion nobody asked for was ignored.** The
  message distinguished a single case, and there were two. When the YAML
  **declares** `schemaNodes` and leaves some out (including an explicit
  `schemaNodes: []`), a deletion *was* requested and `cotctl` refuses: the text
  is still `preserved N schemaNodes not in YAML` / `(will NOT be deleted)`,
  unchanged. When the YAML **never mentions the section** — the hand-written
  partial YAML that only touches `display` or `isActive` — nobody asked for a
  deletion, and the message now says so:
  `kept N schemaNodes the YAML does not declare` /
  `(no deletion was requested)`.

  The cause was `propertyTypeSchema` declaring
  `schemaNodes: z.array(...).optional().default([])`, so Zod collapsed the
  omission into `[]` before `applyPropertyTypes` ever saw the document. The
  `.default([])` was dropped: `undefined` means "the YAML omits it" again, the
  same sentinel `dry-run-diff` already uses against `isExplicitEmpty()`.
  Preservation itself did not change — the nodes are still re-injected into the
  PATCH.

- **A machine identifier pinned at login is no longer silently replaced.** The
  automatic re-login triggered when an ApiToken expires re-derived the machine
  identifier from the hostname and wrote it over whatever the profile held, so
  a `cotctl login --machine-id ci-runner-3` reverted to the hostname on the
  first re-authentication — and the minted token's code changed with it,
  breaking the per-device naming the flag exists to provide.

  The profile now records **how** the identifier was chosen
  (`machineIdSource: 'pinned' | 'derived'`). A value passed with
  `--machine-id` is reused by the re-login; a hostname-derived one keeps being
  re-derived, so a renamed host is still picked up. Profiles written before
  this release carry no source and are treated as derived — re-run
  `cotctl login --machine-id <id>` once to pin the value.

- **The embedded skill and the `docs/` reference no longer advertise a `[]`
  default for `schemaNodes`.** Both `PropertyType` field tables still declared
  the `Default` column as `[]`, which implies that omitting the section and
  writing `schemaNodes: []` are equivalent — precisely the distinction this cut
  introduces. Anyone reading that row ended up writing the YAML that triggers
  the refused-deletion message without having asked for any deletion. The
  skill's table ships compiled inside the binary, so the correction only
  reaches an agent with this release.

- **The CHANGELOG section extractor no longer comes back empty because of an
  unbalanced code fence.** The fence counter toggled across the whole file, so a
  single odd fence above the target heading made that heading read as part of a
  code block: the extraction returned zero lines and the release died with
  `No '## X.Y.Z' section found in CHANGELOG.md`, a message that blames a
  section which does exist. A first pass now counts the fences, and the counter
  is only applied before the heading when the file is balanced.

- **`SOURCE_SHA` no longer masks the exit code of the command that computes
  it.** `export VAR="$(...)"` returns the status of `export`, not of the
  substituted command, so a failed `git rev-parse` left the variable empty and
  the error surfaced later, inside the insertion script. Declaration and
  assignment were split.

- **The `ApiClient` no longer crashes with a parser error when the response is
  not JSON.** `handleResponse` called `response.json()` **before** checking
  `response.ok` and without consulting the `content-type`, so any response that
  was not well-formed JSON reached the operator as a parser error — no status,
  no URL, no actual body. The two symptoms reported against shared production:

  - `cotctl slas list` against an environment where the route is not routed —
    the ingress returns an HTML page and it showed
    `Error: Unexpected token '<', "<html>..." is not valid JSON`. It now reports
    `API Error 404: Not Found`, the method and URL invoked, the `content-type`
    received, and the first 200 characters of the body (with newlines
    normalized onto a single line).
  - `cotctl workflows export` of a workflow with no state machines — one of the
    endpoints answered with an empty body and it showed
    `Error: Unexpected end of JSON input`. An empty body with `2xx` now returns
    an empty object, which the resources already degrade to an empty list; an
    empty body with an error names the request that produced it.

  The backend's message is preserved intact when the body **is** well-formed
  error JSON, so `API Error 500: connect ECONNREFUSED ...` still arrives
  unchanged. A non-JSON `2xx` response (a proxy page served with 200) now throws
  an actionable `ApiResponseFormatError` instead of a parse error; it is not an
  `ApiError`, so the resources' `err.status === 404` branches cannot mistake a
  format problem for a missing resource.

- **A write whose `2xx` carried no document no longer reads as a success.**
  `PATCH /api/v3/webhook/subscription/:id` runs
  `findOneAndUpdate({ _id, company })` and returns its result unchecked, so
  patching a webhook that was deleted — or that belongs to another company —
  answers `200` with an empty body. `cotctl webhooks apply` reported `updated`
  for a write that never happened. The call-sites that consume the written
  document now assert it and fail naming the entity and its identifier, instead
  of carrying an `undefined` id into the next request: the AccessRole,
  PropertyType, Property, JobTitle, SLA and Webhook create **and** update, the
  User create, update and hierarchy update, the Survey upsert, the Workflow
  group / task group / state machine / state writes, and the Routine create /
  update. `cotctl bots apply` also stopped preferring the empty answer over the
  known-good existing document — its `?? existing` fallback never fired,
  because an empty body arrives as `{}`, not `null`.

  Without the assertion these commands printed `created` / `updated` and exited
  `0` over a write that never happened, which for `apply --dir` in CI is
  indistinguishable from success.

  The check lives at the call-site on purpose. `POST /api/v3/scheduler/schedule`
  is declared `@HttpCode(201)` and returns `copy({})` — it discards the created
  schedule deliberately — so an empty body is *correct* there and
  `cotctl schedules apply` stays silent. The `ApiClient` keeps handing back an
  empty object for any empty `2xx`; only a call-site that needs the document
  treats its absence as a failure, so no list of endpoints has to be maintained.

  **Two families are deliberately still unguarded**, and are follow-ups rather
  than oversights. The `deactivate` paths of `property-types`, `roles`, `users`,
  `jobtitles`, `surveys`, `schedules` and `properties` still print
  `deactivated` over a document-less answer: they live in the command layer
  rather than in `apply-helpers.ts`, so guarding them changes seven exit-code
  contracts at once and belongs in its own change. And `src/lib/company-guard.ts`
  issues a raw `fetch` outside the `ApiClient`, so it never reaches
  `handleResponse` at all.

- **A lookup whose `2xx` carried no document no longer reads as a hit.** The
  same empty body on the *read* side reaches an identity resolver as `{}`, which
  is truthy — so `existing._id` was `undefined` and the write that followed was
  addressed to `.../undefined`. The six resolvers that accept a pinned `id`
  (AccessRole, PropertyType, Property, Webhook, Routine, Bot) now treat an empty
  answer as the miss it is:

  - **Webhook, Routine and Bot** fall back to the `code` / `name` lookup, which
    is what their pinned-`id` handling already promised for a `404`. A YAML
    exported from another environment re-applies instead of failing.
  - **AccessRole, PropertyType and Property** report that the pinned `id` was
    not found, naming the id. `PropertyType` used to answer
    `Code is immutable. Cannot change from 'undefined' to '<code>'`, blaming the
    operator's YAML for a value the backend never sent; `Property` crashed
    outright reading `name.code` off the empty object.

  `handleResponse` is unchanged — it still hands back an empty object silently,
  which is what keeps `cotctl schedules apply` quiet for the `POST` that
  discards its resource by contract.

- **The empty-`2xx` migration is completed outside `apply-helpers.ts`.** The
  two previous rounds fixed the identity resolvers they found; the consumers
  that live in the resources, the validators and the commands still read the
  removed signals. `handleResponse` used to *throw* a JSON parser error for an
  empty body and *return* `null` for a `{"data": null}` envelope, and code that
  depended on either now sees a truthy `{}`. What that broke:

  - **`cotctl schedules apply` never created a schedule.** The `/schedule/code/:code`
    endpoint answers `200` with an empty body for a code that does not exist,
    and the documented workaround caught the resulting `SyntaxError`. That catch
    could no longer run, so every apply took the UPDATE branch. The lookup now
    decides on the absence of an `_id`; the two dead `SyntaxError` catches are
    gone.
  - **`cotctl surveys apply` reported every free question identifier as taken.**
    `GET /api/questions/fid/:id` answers a free identifier with `{"data": null}`,
    which the remote validator tested with `!question`. Every identifier read as
    a conflict in another survey, blocking a legitimate apply.
  - **`cotctl surveys apply` also refused a rename that never happened.** A
    pinned `id` that resolves to nothing made the immutability check compare the
    YAML code against `undefined` and report
    `Existing survey has code 'undefined'`.
  - **`cotctl jobtitles apply` issued `PATCH /api/v2/jobtitles/undefined`.** The
    seventh identity resolver, and the only one whose empty answer reached the
    wire: with the id taken from the code map there is no immutability check to
    stop it. It now creates, as the miss implies. `applyUsers` takes the same
    guard — it died on a `TypeError` rather than writing, but its confirmation
    preview announced `UPDATE` for a user that does not exist.
  - **The by-code lookups for Property, PropertyType and Routine** honour their
    `| null` signature again, and `jobtitles get <id>` reports a miss instead of
    printing an empty record.
  - **A workflow apply can no longer address `/api/tasks/undefined/...`.**
    `getTaskGroup` builds every state-machine, state and SLA URL, so it now
    fails naming the group rather than handing back a document-less object.
  - Smaller consumers of the same signal: the state-machine merge base (an empty
    answer would have silently turned an update into a replace), the user
    hierarchy pass (it would have overwritten `companies[]`), the survey
    `populated` merge base, the routines apply preview, `validate`'s owned-identifier
    set, the workflow checklist runner and the export enrichment maps.

  `handleResponse` is still unchanged: it keeps returning an empty object
  silently, and the call-sites that need a document say so with `hasId`. The new
  specs stub `fetch` rather than `client.get`, so `handleResponse` actually runs
  — mocking the client is what hid this class for two rounds.

- **A `404` from the state-machine endpoints now means "there are none".**
  `workflows export` and `workflows get` no longer abort when those endpoints
  answer `404` for a workflow that has no state machines: the command warns on
  `stderr` and continues. The YAML it emits omits the `stateMachines` key — it
  does not emit it empty — so it re-applies without deleting anything.

- **A workflow with no task group now fails with a message that names it.**
  `GET /api/tasks/group/:id` answers `404` with an empty body when the
  workflow's group has no task group. The command still fails — this is not a
  recoverable state — but it says so in those words instead of surfacing a bare
  `API Error 404: Not Found`.

- **`cotctl bots apply` is the one write that survives a document-less `2xx`,
  and it now says so out loud.** Every other write guarded above fails hard
  (exit `1`) when the response carries no document. A Bot `PATCH` instead keeps
  `outcome: updated` and exit `0`, reporting the pre-update document as the
  applied bot — the Bot endpoints are documented to answer empty under some
  backend configurations, which is the same reason the `POST` path already
  retries `findByName` instead of failing. The asymmetry itself is unchanged;
  what changes is that it stops being invisible. The fallback now warns on
  `stderr` naming the bot, mirroring the warning the `CREATE` path already
  emitted, so the operator can tell "the `PATCH` echoed the updated document"
  apart from "the `PATCH` answered empty and cotctl fell back". Documented under
  *Known limitations* in `docs/bots/yaml-structure.md`.

- **A stale `code` map entry in `cotctl jobtitles apply` no longer creates in
  silence.** When the code map holds an id whose document was deleted between
  the listing and the lookup, the apply correctly falls back to `CREATE` — but
  it did so without a word, because the warning only covered the sibling case of
  a stale `id` pinned in the YAML. Both paths warn now, and neither warns twice.
  The genuine `CREATE` — no map entry, no pinned `id` — stays silent, as it
  should.

- **`webhooks apply`: `context: null` now clears a webhook's `context`.** Until
  now `context` could only be emptied through the `context: {}` workaround, and
  the documentation blessed it as the supported way. Omitting the key still
  preserves the server value — that behaviour is unchanged, and no existing YAML
  applies differently — but there is now an explicit way to declare "no
  scoping", matching the `Transition.requiredSurvey` convention introduced for
  workflows. cotctl translates `null` to `{}` on the wire: the Joi validator
  behind the PATCH it issues (`subscription-update-validator.schema.ts`, reached
  from `subscriptions.controller.ts` `@Patch(':subscription_id')`) declares
  `context` as `Joi.object({ survey, group, taskGroup }).optional()` with no
  `.allow(null)`, so a literal `null` is rejected with a 400. The create
  validator (`subscription.validator.schema.ts`) has no `.allow(null)` either,
  so the same translation is what covers the POST path. `{}` is required rather
  than merely accepted: delivery matches subscriptions by exact Mongo
  subdocument equality on `context`, so a webhook missing the field would match
  no event at all.

  The three intents, now documented as a triad in
  `docs/webhooks/yaml-structure.md`:

  | YAML | Result |
  |---|---|
  | `context` omitted | preserved |
  | `context: null` | cleared (recommended) |
  | `context: {}` | cleared (legacy, still supported) |

  `context: null` is accepted on **every** trigger, including the non-task ones
  that reject a *populated* `context` — clearing a stale value is exactly what
  that validation asks the operator to do.

- **A login that supplies a token no longer reports having created one.** With
  `--token` or `--paste-token` the success line read `API token "…" created`
  followed by a revoke URL, for a token the operator did not mint and a panel
  they probably cannot reach. Both forms now report `API token "…" accepted` and
  print no revoke line. When the best-effort metadata read-back fails, the line
  no longer names the internal `pasted-token` placeholder as if it were the
  token's code.

- **`apply` no longer throws away every semantic warning.** It kept only the
  entries marked as errors, so `validate` was the single command in the CLI that
  ever showed a warning — and `apply` is the path where the problem is actually
  suffered. Every semantic warning now surfaces there too. Exit codes are
  unchanged: a warning stays a warning.

- **`schedules logs` renders the error the backend was already sending.** The log
  entry was modelled with a `message` field the API does not return, and without
  the `error` and `output` fields it does return, so a failed stage printed
  `<date> executed` and nothing else while the detail sat in the response. The
  error now prints under the existing line whenever there is one. The current
  line and `--json` are unchanged, so a script parsing either keeps working.

- **The `subfilterValue` error points at the field that fixes it.** It said the
  value was required "when subfilter is undefined", naming the wrong field and
  offering no way out; it now says it is required unless the subfilter is `*`.

- **A taken question identifier now says which question took it.** The message
  reported that the identifier already existed elsewhere and stopped there, so
  the operator had to export in raw and dig the id out by hand. It now carries
  the id, the label, the type and whether the question is still active, plus the
  export command to run. The owning survey itself cannot be named: the API
  answers a bare question document with no back-reference, and no endpoint
  reverses the lookup.

- **The embedded survey skill described two behaviours the CLI does not have.**
  It said that setting `subfilterValue` does not clear the filter error — it
  does — and it described the error message by the wording this same release
  replaced. An agent following it would have discarded a configuration that
  works. These strings ship inside the binary, so a wrong one cannot be
  corrected until the next release.

- **The embedded jobtitles skill taught a deprecated full-collection scan.** Its
  reference rows said both the apply and the export path populate their lookup
  maps through `loadMap()`. Production uses three different calls, and only one
  of them is that: the apply path resolves codes in bounded batches, the export
  path resolves the ids a document actually references, and the full catalogue
  is loaded only for access roles. An agent following the old rows would have
  reached for the one call the code deprecated.

- **The `-q` help text in four commands described the behaviour this release
  replaced.** `apply`, `bots apply`, `schedules apply` and `routines apply` all
  promised to suppress non-fatal warnings without saying that a destructive
  finding is not one of them. A flag's own `--help` is where someone building a
  pipeline checks what it does, and these strings are compiled into the binary.
  A guard now refuses a help string or a docs row that promises to suppress
  warnings the sink is built to protect.

- **`-q` now really does silence `apply`'s Workflow warnings.** The flag tables
  for `cotctl apply` promised `all` scope, but the `Workflow` case never passed
  a callback and the helper fell back to its own default, which writes to
  stderr. So `apply -f wf.yaml -q` kept printing "Unknown bot type …" and "Could
  not verify bot versions …" — without the `⚠` prefix, because that prefix is
  added by the callback that was not being passed. Every other kind was already
  silencing its advisory warnings, and still does. `cotctl workflows apply -f`
  is unchanged: that command depends on the default on purpose.

  **`-q` never silences a destructive finding**, on any kind. The two are
  different classes of message on the same channel, and the flag now separates
  them: progress lines and advisory warnings are muted, a finding that announces
  data being removed is not. The sharpest case is `apply --dir -q`, which used
  to drop a webhook's `context`-clear warning on the floor — see the
  `webhook.context-clear` entry above, whose promise this is what makes true.

- **Two configurations of a state machine that the YAML never mentions now
  survive an apply.** `toSmApiBody` emitted
  `dynamicPropertyTypes: { isActive: [] }` and `allowedExtensions: []` as fixed
  literals on every request, including the PATCH — the only two fields in the
  body that ignored the merge base the rest of the transformer honours. Both are
  in the backend's update whitelist and its merge replaces a value wholesale
  instead of merging into it, so **each `workflows apply` cleared them**:

  - the card labels configured from the webclient (`isActive` plus the
    `status1`..`status5` PropertyType references), and
  - `allowedExtensions`, the list of PropertyTypes admitted as task extensions.

  It happened silently, on workflows whose YAML mentions neither, so an apply
  meant to change a name or a transition also erased configuration set from the
  UI — and nothing in the output said so.

  Both fields now go through the same `pickFrom` merge as their neighbours: on
  update the remote value is preserved, on create the body still carries the
  previous defaults (`{ isActive: [] }` and `[]`). This same release then made
  **both** declarable rather than preserve-only, through their two entries in
  `### Added` above: the one that pins a state machine's card labels, and the
  one that pins the extensions its tasks accept.

Neither is about workflows. They are here because the round-trip work above
put one question — *what does cotctl lose without saying so?* — in front of us
twice more, in code the branch was already reading, and both answers were
cheap to close.

- **A Routine dry-run will not start reporting a permanent phantom change.**
  `routineDiff` compared the stored `parametrizedBot` against the YAML body
  without stripping `stages[]._id`, while the equivalent Bot admin diff has
  stripped it since it shipped. Today the two agree only by accident: the
  Routine read endpoints project the stage ids out of the response, so there
  is nothing to differ on. The day that projection is lifted, every
  `routines apply --dry-run` would have reported `body (parametrizedBot):
  changed` on every routine, permanently, with no real change behind it — and
  a phantom diff that never clears is one an operator learns to ignore.

  The diff now strips the ids on both sides, and an update grafts the stored
  ones back onto the outgoing request so stage identity survives, the way it
  already does for Bots and SLAs. The graft can only ever be fed from a server
  read: the YAML has nowhere to put an `_id` (`stageSchema` does not declare
  it, so it is stripped on every parse), which is precisely why the identity
  was being lost in the first place.

- **Schedule stability is pinned by tests instead of by a comment.** That
  Schedules are immune to the same identity churn was checked by hand once and
  written into a code comment. It is true — but not for the reason the comment
  implied. cotctl drops a Schedule's `body._id` and every `body.stages[]._id`
  exactly as it used to for Bots; nothing churns because the backend stores
  `Schedule.body` as a `Mixed` path, so no subdocument ids are ever minted to
  lose. The regression tests now state both halves, so if that storage
  decision changes, what breaks and why is already written down.

- **A refused export names the question.** Two failure paths aborted the whole
  export with a message that identified neither the survey position nor the
  question — `Empty contentArray in chat`, `Unknown contentType: …` — and five
  more threw a bare `SyntaxError` from an unguarded `JSON.parse` over a
  question's `code[]`. On a survey with sixty questions that is a message with
  nowhere to go. Every one of them now names the chat index and the
  identifier, and every one of them points at `--format raw`.

  **`--format raw` is the documented escape hatch for a legacy survey**, not
  just a debugging aid. It exports the survey verbatim and re-applies
  unchanged, and it was previously mentioned only in passing, framed as
  something for backups.

- **Three silent discards now warn.** The simplified export could also finish
  *successfully* on an incomplete document, which is the failure that actually
  breaks a GitOps flow: the YAML looks fine, gets committed, and the next apply
  is what removes the missing questions. All three now print to stderr, naming
  what was left out — stdout stays clean, so piping and `-o` are unchanged:

  - a chat bubble whose `contentType` is not exactly
    `application/vnd.cotalker.survey` (the raw transformer keeps every bubble);
  - a legacy bubble packing several questions into one `contentArray`, of
    which only the first was ever read;
  - a standalone `+text` question consumed as somebody else's label because
    its identifier ends in `_label` or `_<digits>` — the pairing is a regex
    over the identifier, so it can and does misfire.

  Reading a legacy survey correctly is a separate, larger change; this one only
  makes sure the tool stops being quiet about what it is dropping.

- **`workflows apply` stops offering an escape that command rejects.** When the
  permission catalogue did not answer, the message closed by suggesting a retry
  "or skip with `--skip-remote-validation`". That flag is survey-only and the
  three entry points that reach a Workflow reject it, so anyone following the
  suggestion got an error and exit 1. The message now says what actually works —
  restore access and retry — and states that a Workflow has no bypass flag.
- **A workflow `apply` resolves its PropertyTypes in one query.** It used to
  ask for each code separately, per state machine: a workflow of 8 SMs with 4
  distinct codes each made up to 32 requests where it now makes 1. The error
  message is unchanged: it still reads `PropertyType "<code>" not found`, still
  names the state machine referencing it, and still appears at the same point in
  the walk.
- **`surveys apply` and `apply -f` stop having two warning formats.**
  `applySurvey` was the only applier writing to `stderr` on its own, and it did
  so two different ways inside the same function: one coloured and indented, the
  other bare. It now reports through the same `onWarning` channel as every other
  applier, so both warnings come out alike — with the same `  ⚠ ` that
  `apply --dir` and the other kinds already used. **The mobile table warning
  changes shape**: it used to print uncoloured and unindented, and now looks
  like any other warning. The semantic warnings keep their exact format. What is
  gained is that the command can silence, capture or format them, which was
  impossible before.
- **`validate --dir` runs the surveys' semantic validation.** A survey with
  repeated identifiers, a reserved identifier, or a `dependsOn` pointing at an
  identifier that does not exist passed `validate --dir` clean and only failed
  on apply, because those rules lived inside `applySurvey`. They are now
  reported as `S4` (FAIL for errors, WARN for warnings) alongside the rest of
  the per-document checks.
- **A `+table` column no longer accepts a conditional display nobody
  evaluates.** `conditionalDisplay` (and its raw form, `command`) validated
  fine, the transformer discarded it silently, and the client always shows every
  cell of a table. The YAML is now rejected with the reason written out: the
  condition belongs on the `table` question, not on the column. Conditional
  display on top-level questions is unchanged.

- **`validate --dir` accepts a survey with external `exec` hooks again.** The
  semantic pass introduced in this same cycle ran over the raw document, so a
  `src: "file://./scripts/validar.js"` reached the validator as literal text and
  was reported as `Syntax error in JavaScript`, at FAIL severity. The command
  now resolves `file://` references before validating, exactly as `validate -f`
  and `apply` already did. The example
  `examples/surveys/survey-exec-external.yaml`, which the repository publishes,
  was failing with exit `1` and passes clean again.
- **A deactivated PropertyType no longer aborts `workflows apply`.** The
  batched query that replaced the one-by-one lookups filters on
  `isActive=true`, which the by-code lookup did not: a Workflow referencing a
  deactivated PropertyType — in `propertyType`, in `asset.propertyType`, in a
  `cardLabels` slot or in `allowedExtensions` — used to apply and started
  failing with `PropertyType "<code>" not found`. Codes the batch does not
  resolve are now looked up one at a time, so the request saving is kept in the
  common case and the behaviour is back to what it was. The error is the same,
  on the same state machine and at the same point in the walk, for a code that
  genuinely does not exist.
- **`surveys export` stops emitting columns `apply` itself rejects.** Because a
  `+table` column is a question, both exporters ran it through the same cleaner
  as the rest: the raw format emitted `command` and the simplified one
  `conditionalDisplay`, and since both keys are rejected on a column, that
  exported YAML would not re-apply — exit `1`, the validation-failure code, as
  the breaking-change entry above states. Both exporters now drop them. On
  the raw path this also fixes a real write: `mapQuestionToApi` did not walk
  `columns`, so a column's `command` did reach the backend.

- **`-q` no longer promises to hide a warning it cannot hide.** On `properties
  apply`, `surveys apply` and `workflows apply` the flag announced "Only output
  errors", and a `⚠ DANGER` line still reached stderr under it — a warning is
  not an error, and silencing that class is precisely what `-q` must never do.
  All three now carry the exception, in the wording `webhooks apply` already
  used. The flag's behaviour is unchanged; only the promise was false. The guard
  that watches these strings was rebuilt to **measure what a command actually
  prints under `-q`** instead of inferring it from a symbol name in the source:
  the old read credited a file for merely importing that symbol, and saw none of
  the commands protected by the dry-run formatter rather than by the shared
  sink, which is how all three shipped.

- **A workflow dry run now says when it could not resolve the PropertyType
  codes.** The lookup behind a state machine's `cardLabels` and
  `allowedExtensions` degraded to an empty map on failure and said nothing, so
  the diff reported no change for those fields — a dry run could look clean
  because the lookup had failed rather than because nothing had changed. The
  failure now prints on stderr through the same warning channel as everything
  else, carrying the underlying error. Nothing else moves: the plan still
  completes, and a dry run that passes today exits exactly as it did.

- **The `--legacy-replace` warnings are in English, and no longer announce a
  removal that has already passed.** `apply`, `workflows apply` and `surveys
  apply` printed their escape-hatch warning in Spanish — the only non-English
  runtime text in the CLI — and promised the flag would disappear in 0.8.0
  (0.7.0 for `surveys --legacy-replace`), which this release is four and five
  minors past. The same false promises were taken out of the `--help` strings in
  0.11.0 and these runtime copies were missed. Both flags are still present and
  behave identically; the text now states they are deprecated with no removal
  version announced, which is what `docs/` has said throughout.

### Docs

- **Five flags the CLI demands and the npm page never mentioned.** The
  `@cotctl/cli` README now documents `--allow-script-bots`, `--allow-reactivate`,
  `--lax-code`, `--skip-remote-validation` and `--rollback` in a table stating
  what happens **without** each one. These are the flags cotctl names in its own
  message when it stops, so their absence left a reader facing a refusal whose
  way out was written nowhere npm renders. The table also declares its scope: it
  is not the complete index of flags, only the ones that appear when the CLI
  refuses.
- **The page only updates at the next release.** npm renders the README of the
  *tarball*, not the one in the repository, so this change does not alter what a
  visitor to the package page sees today.

- **`transformers/` is not the Survey folder.** The folder description said
  only "format transformations between layers"; since nine of its specs are
  Survey ones, the apparent convention contradicted the real one. It is now
  explicit that the criterion is the layer — pure format conversion, no I/O, no
  HTTP, no Zod and no state — and not the entity, so `card-labels.ts` is where
  it belongs and does not move.
- **Which one wins when `docs/` and `src/skills/` disagree.** Both surfaces
  describe the same CLI for different audiences, and the duplication is
  deliberate: `docs/` does not travel in the npm tarball, so an agent that only
  has the binary installed can read nothing but the embedded skills. The note
  pins the precedence — the code wins; between the two prose surfaces, `docs/`
  wins, because it is corrected on merge while a skill stays frozen until the
  next release — and explains why deduplicating them is not the answer.

- **`docs/commands/validate.md` documents what each side still misses.**
  Neither command contains the other: `validate --dir` does not touch the API,
  so it cannot catch an identifier renamed against the environment; and
  `apply --dir` never runs the cross-reference checks, so a `Property` pointing
  at a `PropertyType` declared in another file is only caught by validating.
  Running both is not redundant.

- **`docs/commands/schedules.md` documents all seven subcommands, not one.**
  The page described `logs` and stopped there: it covered 4 of the 23 flags the
  command declares. `list`, `get`, `export`, `apply`, `activate` and
  `deactivate` now each have their own section, with their option table and with
  the behaviour that does not follow from the flag's name: `--has-cron` tests
  for the *presence* of `cron`, not its value; `-l, --limit` bounds what the
  backend returns, so the active filter runs afterwards, client-side, and a
  listing can come back shorter than the limit; and `--allow-script-bots`
  controls a `body.stages[]` stage naming `PBScript` / `CCJS` / `ESMCode` and
  rejects **before any network call**, exiting with `1` and not with the `2`
  that the same rejection produces from `bots apply`.

- **`--help` advertises a filter the command ignores.** `schedules list` parses
  a flag for single-run schedules and never forwards it, so it returns the
  listing unfiltered and exits `0`. The page says so and offers the `--json`
  alternative, instead of documenting the flag as if it worked.

- **The exit-code section no longer contradicts what it documents.** It
  described `surveys export`'s `2` and then explained why a script reading it
  gets the wrong idea — true when comparing the three meanings of `2` across
  commands, and false inside `surveys export`, where the code says one thing and
  names its own fix (`--format raw`). The distinction is now the point: one
  command, one meaning; three commands, three, and only `stderr` tells them
  apart. The non-uniformity table stays.

- **A guard ties the embedded skills to the command tree.** The prose in
  `docs/` and the skills compiled into the binary assert the same things about
  the same CLI for two different audiences, and `docs/` does not travel in the
  npm tarball, so the duplication has to stay.
  `tests/docs/skills-docs-parity.guard.test.ts` checks the part that can be
  derived mechanically — subcommand names against `buildProgram()`, `kind`
  values against the applier's order, exit codes against the `process.exit()`
  literals — and states in its header that this reaches one assertion in ten:
  the rest is prose with no token to compare. `docs/README.md` records which of
  the two surfaces wins when they disagree.

- **The new rule reached all three surfaces.** The schema has rejected
  `conditionalDisplay` and `command` on a `+table` column since this same cycle,
  but the embedded `cotctl-surveys` skill still listed what a column may carry
  without mentioning it, and neither did
  `docs/surveys/question-types/table.md`, `docs/surveys/yaml-structure.md` or
  `docs/surveys/conditional-display.md`. All four pages say so now, with the
  reason and the alternative: the condition belongs on the `table` question.

- **`apply` never prints the destructive-findings block, and both surfaces now
  say so.** The `⚠ DANGER` / `⚠ WARNING` block a dry run shows under `surveys
  apply`, `workflows apply` and `properties apply` is rendered by the shared
  dry-run formatter, which `apply` does not use — the appliers compute the
  findings and the command discards them. For `Survey`, `Workflow` and
  `Property` that block is the only place they surface, and `apply` declares no
  `--fail-on-destructive` either, so the directory pipeline the documentation
  recommends is the **quietest preview available**: silent about exactly the
  changes that cannot be undone. `docs/commands/apply.md` and the embedded
  `cotctl-apply` skill both state it now and point at the per-entity command for
  a preview that does flag them. `Webhook` is the exception — its applier also
  mirrors each finding into the warning channel, which `apply` does print.
  Behaviour is unchanged: the gap is named here, not closed.

- **The npm page promised a destructive warning beside the one example that
  cannot produce one.** The Features list says `--dry-run` *"advierte sobre los
  cambios destructivos"*, and the Quick Start's only preview was `cotctl apply
  -f ./formulario.yaml --dry-run` — a `Survey` through the generic `apply`,
  which is exactly the combination that prints nothing: `applySurvey` tags no
  warning as destructive, and `apply` never renders the structured findings
  block it computes. The preview step now runs `cotctl surveys apply -f <file>
  --dry-run`, the command that does render it, and states in one line why the
  per-entity preview is the one that flags them. The bullet itself is unchanged,
  because it holds everywhere else; what was wrong was the pairing.

- **`cotctl-users` told an agent that this release's unattended-auth path does
  not exist.** The skill opened with *"All commands require `-c <profile>`
  (profile is mandatory at runtime)"*, which stopped being true here: a
  `COTCTL_TOKEN` + `COTCTL_API_URL` credential runs with `-c` omitted. It was
  also the skill's only word on the subject, so an agent holding that file alone
  could neither use the feature nor discover it. The sentence now states the
  environment path in the same words `cotctl-apply` already used, and the
  "(required)" cell on `-c, --company` in `cotctl-export` carries the same
  exception. Both ship inside the binary, which is why neither could wait for a
  later correction.

- **The embedded skills knew neither half of `schedules logs`.** `-v,
  --verbose` is new in this release and appeared in no skill — the only
  "verbose" string under `src/skills/` was an unrelated YAML field — so an agent
  reading only the binary had no way to reach the full `output` payload. And
  `cotctl-workflows` taught `--op executed` with no mention of its sibling's
  trap: the scheduler never sets `op: failed` for a stage that fails *inside*
  the PBScript, so a health check built on `--op failed` reports green through a
  schedule failing every night. `docs/commands/schedules.md` has explained this
  since 0.12.0's docs pass, but `docs/` does not travel in the npm tarball, so
  the skill was the only place an installed agent could learn it. Both are now
  in the skill's schedules command block.

- **`cotctl-workflows` taught a pipeline that rejects five of the twelve kinds
  it lists.** Its Step 4 presents `validate --dir` followed by `apply --dir`,
  and lists the twelve kinds the applier handles. `validate --dir` recognises
  seven, so a directory holding `Routine`, `Sla`, `Schedule`, `Bot` or `Webhook`
  gets `unrecognized kind` for those files and step 3 exits `1` — stopping a
  pipeline whose step 4 would have applied them without complaint. The warning
  `cotctl-apply` already carried is now on the pipeline block itself rather than
  further down the page, with a pointer at the Step 3 detail. Behaviour is
  unchanged: the gap is named, not closed.

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
