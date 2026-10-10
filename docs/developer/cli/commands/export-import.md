---
title: Exporting & importing
sidebar_label: Export & import
displayed_sidebar: developer
---

<!-- source: repositories/cotctl/src/commands/{surveys,roles,property-types,properties,workflows,users,jobtitles,bots,bot-types,routines,schedules,slas}.ts @ 4f7248a (2026-07-06) -->

So far we've talked about pushing YAML *to* an environment. Just as often, you'll want to pull existing configuration *out* of one — to bring a customer's existing setup under version control, to copy a resource between environments, or simply to see how something is built. That round-trip — **export → edit → apply** — is one of the most useful patterns in `cotctl`.

This page uses surveys as the worked example, because they have the richest export options. The same `list` / `get` / `export` / `apply` shape repeats across the other entity groups: `roles`, `property-types`, `properties`, `users`, `jobtitles`, `workflows`, and the newer `bots`, `bot-types`, `routines`, `schedules` and `slas`.

<div className="alert alert--info">

**Not every group has all four verbs.** The shape is a pattern, not a guarantee — a few groups differ:

- **`bot-types` is read-only.** It exposes only `list` and `versions <BotType>` (the live catalog of ParametrizedBot types). There's no `bot-types apply`; you author bots with `cotctl bots`.
- **`slas` need their state machine.** `slas get`, `slas export` and the by-code paths require `--state-machine <smCode>`, because there's no global by-code lookup for SLAs.
- **Some groups add verbs.** `routines` has `test <code>` (run a routine immediately — real side effects); `schedules` has `activate` / `deactivate` / `logs`.

</div>

<div className="alert alert--info">

**Naming note.** The old `cotctl get surveys` and `cotctl export survey` commands were removed. Use the entity-scoped forms — `cotctl surveys list`, `cotctl surveys export`, and so on.

</div>

## Finding what's there: `list`

Before exporting, you usually need to find the resource. `list` shows what exists, with search and paging:

```bash
cotctl surveys list -c acme
```

```
ID                         NAME                  CODE             VER   ACTIVE   MODIFIED
-------------------------------------------------------------------------------------------
507f1f77bcf86cd799439011   Order Request Form    order_request    3     true     2024-03-15
507f1f77bcf86cd799439012   Approval Survey       approval_srv      1     true     2024-02-20
```

Useful options: `-s/--search <text>` to filter, `--all` to include inactive resources, `-l/--limit` and `-p/--page` for paging, and `--json` for machine-readable output.

What `--search` matches depends on the resource — `<resource> list --help` describes it — and `bot-types` and `slas` have no `--search` at all. `surveys list --search` matches the **name** only — to find a survey by its code, use `surveys list --code <code>`, an exact lookup.

## Looking at one: `get`

To inspect a single resource without writing a file:

```bash
cotctl surveys get order_request -c acme
```

Add `--populate` to include the full question list (output switches to YAML automatically, since a table can't show nested questions), or `-o json` to get JSON.

## Pulling it out: `export`

`export` is what brings a resource down as a YAML file you can version and re-apply:

```bash
cotctl surveys export order_request -c acme -o ./order_request.yaml
```

<div className="alert alert--secondary">

**`-o` is a path, not a format.** A common first mistake is `-o yaml`. The `-o`/`--output` flag is the *file path* to write to; use `--format` to choose the format. Passing a format keyword to `-o` is a hard error with a message telling you exactly this — for `-o json` or `-o yaml`, that the export is always YAML.

</div>

Two export formats are available, and since 0.14.0 `--format` takes only these two values, in lower case — anything else (`json`, `yaml`, `RAW`) exits `1` before anything is read, where it used to export the simplified format silently:

| `--format` | Description |
|---|---|
| `simplified` (default) | Human-readable, with a clean `questions[]` array — what you want for version control |
| `raw` | The raw API representation — **and the supported escape hatch for a survey the simplified format cannot express** |

```bash
# Default simplified YAML, printed to stdout
cotctl surveys export order_request -c acme

# Raw format, written to a file
cotctl surveys export order_request -c acme --format raw -o ./order_request_raw.yaml
```

<div className="alert alert--info">

**`--format raw` is not just for debugging.** The simplified format is a model of a survey, and an older or hand-built survey does not always fit it. When it does not, `export` refuses and **exits `2`**, naming the question that cannot be expressed and pointing you here. `--format raw` exports that survey verbatim and re-applies unchanged, so it is the answer, not a workaround.

A script wrapping `surveys export` can branch on exit `2` and retry with `--format raw` without reading the message — it has exactly one meaning in this command. See [CI/CD](../ci-cd.md#exit-codes). **In 0.12.0 this refusal changed from exit `1` to exit `2`.**

</div>

<div className="alert alert--warning">

**A simplified export can also succeed and leave something out**, which is the worse case: the YAML looks fine, gets committed, and the next `apply` is what removes the missing questions. Since 0.12.0 `cotctl` warns on stderr whenever it drops content — an unexpected chat bubble, a legacy bubble packing several questions into one, or a standalone text question absorbed as another question's label. **Read stderr on an export you are about to commit.** `stdout` stays clean, so piping and `-o` are unaffected.

Since 0.14.0 the export also folds a title named `labelQuestion<identifier>` (as some solution presets name them) into its question, instead of exporting it as a `text` question and leaving the real question out — and the dry run of a survey update flags the questions it would deactivate as `⚠ DANGER`. An export made with 0.13.0 or earlier can carry exactly that gap: re-export before re-applying it.

</div>

### Exports write only what is stored

Since **0.14.0**, an export writes the keys the resource actually stores and nothing else. Earlier versions filled in, with its default, every key the resource lacked — and re-applying that export sent those defaults as changes. Now **re-applying an unchanged export sends nothing**, which matters most for a running schedule, whose cron any update stops.

Two consequences to plan for:

- **A script that reads keys from an exported YAML has to accept their absence** — `isActive`, `accessRoles`, `extraData`, a schedule's `cronTimeZone` or `timeoutMinutes`, and so on. Read an absent key as the default the export used to write.
- **Re-export a YAML exported with 0.13.0 or earlier before re-applying it.** Those files carry defaults the resource may not store. The costly case is a schedule stored without `cronTimeZone`: the old export wrote `America/Santiago`, so re-applying it moves the cron from the scheduler's own zone to Santiago — three or four hours away — and the `isActive: true` it wrote relaunches it there right away. `apply` warns when an update sets a zone on such a cron.

A few exports still send an update on their first re-apply: `users export` leaves out an inactive access role (with a warning), so the re-apply removes it from the user; `routines export` writes the routine's `code` as its `display` when it stores none; and the first re-apply of a survey built in the web app rewrites it in `cotctl`'s shape.

### Keeping scripts out of YAML

Surveys can carry inline JavaScript (exec hooks). For cleaner version control, `--extract-scripts <dir>` pulls those scripts out into separate files and replaces them with `file://` references in the YAML:

```bash
cotctl surveys export order_request -c acme \
  -o ./order_request.yaml \
  --extract-scripts ./scripts/
```

Now the JavaScript lives in real `.js` files your editor and Git can handle properly.

## The round-trip in full

Putting it together, the export–edit–apply loop looks like this:

```bash
# 1. Export the live resource
cotctl surveys export order_request -c acme -o order_request.yaml

# 2. Edit order_request.yaml in your editor, commit it to Git

# 3. Validate, then apply the change back
cotctl validate -f order_request.yaml
cotctl apply -f order_request.yaml -c acme
```

This is also how you **promote between environments** — export from staging, apply to production (with the matching `-c` profile). One check behaves differently there: the [required bot `data` entries](../workflow-bots/index.md#required-data-entries) are compared with the stages stored in the *target* company, so a stage that doesn't exist there yet is new, and every required entry it lacks is refused — even when the same export re-applies cleanly where it came from.

## Deactivating instead of deleting

Cotalker favors deactivation over hard deletion. To take a survey out of use without losing it:

```bash
cotctl surveys deactivate order_request -c acme
```

It sets `isActive: false` after a confirmation prompt (`-y` skips the prompt in scripts).

## See also

- [apply](./apply.md) — the other half of the round-trip
- [validate](./validate.md) — check exported YAML before re-applying
- [Resource YAML reference](../resources/surveys.md) — what the exported files contain
