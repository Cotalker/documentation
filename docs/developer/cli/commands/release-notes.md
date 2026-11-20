---
title: release-notes
sidebar_label: release-notes
displayed_sidebar: developer
---

<!-- source: repositories/cotctl/src/commands/release-notes.ts, src/lib/release-notes.ts, docs/commands/release-notes.md, docs/release-notes/README.md @ acc260a9 (2026-11-14) -->

**New in 0.17.0.** `cotctl release-notes` prints what each `cotctl` version changed **for YAML files**, from release notes compiled into the binary. The notes are written for an AI agent that writes or upgrades `cotctl` YAML — what now fails, what behaves differently, what is now accepted, what is deprecated and what is new — so an agent asked to bring a repository's YAML up to date reads them here, always for the `cotctl` it runs.

<div className="alert alert--info">

**This is not the [Release notes](../release-notes.md) page.** That page describes every change of each version for people. `cotctl release-notes` keeps only what a YAML file has to know, one entry at a time, each saying how to find an affected file and how to fix it. The notes cover every version from **0.10.0**.

</div>

To bring a repository's YAML up to date with Claude Code, the [`cotctl-upgrade`](../skills.md#upgrading-your-yaml-cotctl-upgrade) Skill runs this command from the version the repository was last reviewed against, and checks its changes with `validate` and a dry run.

## Usage

```bash
cotctl release-notes                                   # one line per version
cotctl release-notes 0.16.0                            # the note of a version
cotctl release-notes 0.16.0-C3                         # one entry
cotctl release-notes --since 0.14.0                    # every note after 0.14.0, up to this cotctl
cotctl release-notes --since 0.14.0 --kind Survey --json
cotctl release-notes --action deprecated               # every deprecated entry, in every note
```

| Argument | Description |
|---|---|
| `[version-or-entry]` | A version, `X.Y.Z`, prints its note. An entry id, `X.Y.Z-C<n>` such as `0.16.0-C3`, prints that entry under its section. Without it, the command lists the versions, or prints the entries `--since`, `--kind` or `--action` select |

| Option | Description |
|---|---|
| `--since <version>` | Every note after `<version>`, up to the version of this `cotctl`, oldest first — the order to apply them in. Cannot be combined with a version or an entry id |
| `--kind <kinds>` | Only the entries about these kinds, comma-separated, in any case: `AccessRole`, `PropertyType`, `Property`, `JobTitle`, `Survey`, `Workflow`, `Routine`, `Sla`, `Schedule`, `User`, `Bot`, `Webhook`. An entry about every kind matches any of them |
| `--action <actions>` | Only the entries of these sections, comma-separated: `action-required`, `behavior-changed`, `now-accepted`, `deprecated`, `new` |
| `--json` | Print JSON to stdout instead of Markdown |

An entry id names one entry, so `--kind` and `--action` are refused with one.

## What it prints

Data goes to stdout; a warning, or the reason nothing was printed, goes to stderr.

- **No argument:** one line per version — the version, its date and its summary — oldest first.
- **A version:** its note as written. With `--kind` or `--action`, only the entries they select, under their sections; when none matches, nothing, and stderr says so.
- **An entry id:** the note's title, the entry's section and the entry.
- **`--since <version>`:** the notes of every version after it, oldest first. With `--kind` or `--action`, a note with no matching entry is left out.
- **`--kind` or `--action` alone:** the matching entries of every note.

Only the notes up to the version that runs are printed. A build from source (`0.0.0-dev`), which has no version to stop at, prints every note it carries.

`--since` with a version older than the first note's previous release prints every note, with a warning that the releases before the notes are not covered: a YAML written for them may need changes no note describes. With the version that runs, or a later one, it prints nothing and says why.

### How an entry reads

Each note sorts its entries by what they ask of a YAML — **Action required**, **Behavior changed**, **Now accepted**, **Deprecated**, **New**. An entry is headed by its id, the kinds it is about (`*` for every kind) and its subject:

```markdown
### 0.17.0-C2 · Survey · A `textinput` column of a `+table` whose `min` is above its `max` fails `validate` and the apply
- Formats: raw, simplified
- Detect: a text column of a `+table` … whose `min` is above its `max`. …
- Fix: lower `min` to the column's `max` or below — to 1000 when a simplified column leaves out `max`. …
- Before: …
- After: …
- Detected by: validate, --dry-run
```

`Detect` says how to find an affected YAML, `Fix` what to change, and `Before` and `After` show it where that helps. `Detected by` names the commands whose output flags such a YAML — `validate`, `validate --remote`, `--dry-run`, or `none` when nothing notices it before the apply — and `Check` the command that shows the difference. A `Check` is written without `-c`: add your profile when it reads a company. An entry may also carry `Formats` (a Survey's `raw`, `simplified` or both), `Example` and `Note`.

### JSON

| Mode | Shape |
|---|---|
| No argument | An array of `{ version, previous, date, summary }` |
| A version | `{ version, previous, date, summary, entries }`, `entries` holding only what the filters select |
| An entry id | One entry |
| `--since`, or `--kind` / `--action` alone | An array of notes, as for a version |

An entry is `{ id, version, section, action, kinds, subject, fields }`, plus `formats`, `since`, `detectedBy` and `acceptedBy` when the note gives them. `action` is the section as `--action` spells it; `kinds` is `["*"]` for an entry about every kind; `fields` holds each field's text as the note writes it (`Detect`, `Fix`, `Before`, `After`, `Check`, …), a code block with its fences.

## Exit codes

| Code | Meaning |
|---|---|
| `0` | Printed — including a filter or a `--since` that selected nothing |
| `1` | No note for that version (the message names the versions this `cotctl` carries), or no such entry in its note |
| `2` | An argument or a value it cannot read, before anything is printed: neither a version nor an entry id, a `--since` that is not `X.Y.Z` or that comes with a version or an entry id, an unknown kind or section, an empty item in `--kind` or `--action`, or an entry id with `--kind` or `--action` |

An unknown flag, which is caught before `cotctl` runs, exits `1`, as in every `cotctl` command.

## Where the warnings point

From 0.17.0, `validate` and every apply end each warning about a legacy Survey form with the entry that explains it, such as `(cotctl release-notes 0.10.0-C19)` — run that command to read the entry, with the YAML before and after. See [validate → Migration diagnostics](./validate.md#migration-diagnostics).

## See also

- [Skills](../skills.md#upgrading-your-yaml-cotctl-upgrade) — `cotctl-upgrade`, which reads these notes to upgrade a repository's YAML
- [update](./update.md) — updating `cotctl` itself
- [Release notes](../release-notes.md) — every change of each version, for people
