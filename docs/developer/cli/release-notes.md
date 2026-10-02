---
title: Release notes
sidebar_label: Release notes
displayed_sidebar: developer
---

<!-- source: repositories/cotctl/CHANGELOG.md @ 278d134 (2026-10-02) -->

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

## 0.13.0 — 2026-10-02

A reliability release for survey validation. The headline is that **a survey embedding another survey is no longer rejected because of how the embedded survey is named** — the most visible of several checks that failed, or broke outright, on YAML that was valid. One gap closed in the other direction: two fields that have to be lists are now checked as lists instead of being misread.

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

Reference pages updated for the simplified `type: person` format — its `allow` values and `jobs` as a list, which had no page of its own until now — and the troubleshooting page lists this release's new messages with their fix. The `apply --dir` page no longer says surveys are applied in reference order: they go in path order, so a child survey that does not exist yet has to sort first. The `surveys` page documents `--code` and corrects `--search`, which matches names.

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
