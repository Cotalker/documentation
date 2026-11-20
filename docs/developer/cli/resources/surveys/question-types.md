---
title: Survey question types
sidebar_label: Question types
displayed_sidebar: developer
---

<!-- source: repositories/cotctl/src/transformers/simplified.transformer.ts, src/schemas/survey.schema.ts, docs/surveys/question-types/*.md @ a9168d68 (2026-10-23) -->
<!-- the `table` section: repositories/cotctl/docs/surveys/question-types/table.md, src/lib/survey-validator.ts @ a9168d68 (2026-10-23) -->
<!-- a `table` text column's `max` and `min`: repositories/cotctl/src/transformers/simplified.transformer.ts, src/lib/survey-validator.ts, src/lib/constants.ts, docs/surveys/question-types/table.md @ acc260a9 (2026-11-14) -->

Cotalker offers 14 question types. Every question shares the [common fields](../surveys.md#questions) — `type`, `identifier`, `label`, and the optional `help`, `required`, `isReadOnly`, `conditionalDisplay`, `exec`. This page covers what's *specific* to each type: the extra fields it needs and the gotchas worth knowing before you author one.

Each type sends only the keys it reads, so a key written on the wrong type, or in the wrong place, never reaches the server. Since 0.16.0 `validate` and every apply, `--dry-run` included, warn about each such key — on a question and on a `table` column alike — naming where it belongs or which types take it. It is a warning: no exit code changes.

All snippets use the **simplified** `cotctl` format — the `type:` form you write in a `questions[]` list. `cotctl` translates it to the platform's internal representation on apply.

## Text and input

### `text` — static text

Renders a block of content — a title, an instruction, a separator. It captures no answer.

```yaml
- type: text
  identifier: re_titulo
  label: "# Employee Registration"
```

The `label` is the visible content and is rendered as Markdown (GitHub-flavored, HTML allowed). Use it for headings and dividers. Don't reach for `display`: the simplified format builds a new question's `display` from its type, keeps the stored one on an update (see [Applying safely](../surveys.md#applying-safely)), and never sends the one you write — since 0.14.0 `validate` and every apply warn when a question or `table` column carries one.

### `subtype` — only the values the server takes

Four types take a `subtype`, and since 0.15.0 `validate` and every apply refuse any other value before anything is sent — in both formats, on a `table` column too, and `--skip-semantic-validation` does not turn the check off. The error lists the values the type takes:

| Type | `subtype` |
|---|---|
| `textinput` | `short_text` |
| `textnumber` | `number` (default), `integer`, `rating` |
| `listquestion` | `list` (default), `toggle` |
| `datetime` | `absolute`, `relative`, `createdAt` — each with numeric `min` and `max` (see [`datetime`](#datetime--date-andor-time)) |

Leaving `subtype` out is always valid. An export of a survey that stores a value outside this list — `short_text` on a `textnumber`, say — now fails `validate`: fix the value or remove the key before re-applying it.

### `textinput` — free text

```yaml
- type: textinput
  identifier: re_nombre
  label: "Full name"
  min: 0          # min length (default 0)
  max: 5000       # max length (default 5000)
```

The 5000 default is a standalone question's. A `textinput` **column** of a `table` defaults to 1000 since 0.17.0 — see [`table`](#table--a-grid-of-repeating-rows).

`long_text` is a legacy value older surveys store. It is still accepted, with a warning, and sent as `short_text` — what the webclient's survey builder does when it loads the question — so the first apply of an unchanged survey that stores it writes `short_text` (`Would UPDATE` in a dry run). Write `short_text`, or no `subtype`, to silence the warning. Since 0.17.0 the warning ends with the release-notes entry that explains it, `(cotctl release-notes 0.15.0-C6)`, and `--skip-semantic-validation` no longer silences it — see [Migration diagnostics](../../commands/validate.md#migration-diagnostics).

### `textnumber` — numbers

```yaml
- type: textnumber
  identifier: re_edad
  label: "Age"
  min: 18         # minimum accepted value
  max: 99         # maximum accepted value
```

`min`/`max` bound the entered *value* (not a length). Set `subtype: integer` for an integer field, or `subtype: rating` to render a star rating instead of a number field.

## Selection

### `listquestion` — single or multiple choice

```yaml
- type: listquestion
  identifier: re_cargo
  label: "Role"
  options:
    - label: "Analyst"
      value: "analista"
    - label: "Manager"
      value: "gerente"
```

`options` is required, with at least one `{label, value}` entry. By default it's single-choice (`min: 0`, `max: 1`); set `max` above 1 to allow multiple selections. Keep `value`s stable — they're what answers are stored as, and other questions may key conditional display off them.

### `property` — pick a Property

Lets the user choose from a Cotalker [Property](../../data-models.md#property) of a given type.

```yaml
- type: property
  identifier: re_area
  label: "Area"
  filters:
    - propertyType: area      # PropertyType code
      subfilter: "*"          # "*" = any property of that type
```

`filters` is required and has to be a **list** of 1 to 3 entries, each starting with `- `. A single filter written as a map — without that leading `- ` — fails validation with `filters must be a list`. To scope the options, replace `subfilter: "*"` with a real subfilter and set `subfilterValue`.

Two optional keys on a filter entry change the picker:

```yaml
  filters:
    - propertyType: area
      subfilter: "*"
      tree:
        target: parent_area   # required, non-empty
        filter: []            # a list; [] = every folder visible
      creation:
        permissions: []       # a list; [] = every user can create
```

- `tree` turns the picker into a hierarchical tree. `target` must not be empty, and `filter` must be a **list** — an empty list applies no narrowing, which is what the webclient saves for a tree with none.
- `creation` lets the user create a new property inline. `permissions` must be a **list** — an empty list opens creation to every user, which is what the webclient saves when no role is chosen.

These keys belong to each entry, never to the question: a `tree` or a `creation` written next to `filters` is ignored, and since 0.16.0 `validate` and every apply warn about it without failing.

Since 0.15.0 `validate` and every apply refuse a `tree.filter` or `creation.permissions` that is not a list — `filter: <value>` has to become `filter: [<value>]` — and accept an empty list, which `surveys export` writes back. It is a semantic check, so `--skip-semantic-validation` turns it off.

### `person` — pick a user

```yaml
- type: person
  identifier: re_supervisor
  label: "Supervisor"
  personFilter:
    allow: job          # everyone (any job)
```

`personFilter.allow` controls who's selectable:

| `allow` | Selectable users |
|---|---|
| `job` | Anyone |
| `jobTitle` | Only users holding one of `jobs: [ ... ]` (JobTitle codes), or any job title with `jobs: "*"` |
| `hierarchy.subordinates` | The responder's subordinates |
| `hierarchy.boss` | The responder's manager |
| `hierarchy.peers` | The responder's peers |

`personFilter` itself is required — a `person` question without it fails with `person requires personFilter`. The legacy `allow: no_filter` is still accepted and normalized to `job`, with a deprecation warning.

For `jobTitle`, add a `jobs` **list** of JobTitle codes, or the string `"*"` for every job title:

```yaml
  personFilter:
    allow: jobTitle
    jobs: ["supervisor_ventas"]
```

```yaml
  personFilter:
    allow: jobTitle
    jobs: "*"            # every job title
```

A list has to be a list even for a single code: `jobs: supervisor_ventas` fails with `jobs must be a list, or "*" for every job title`, and a missing `jobs` fails with `jobs is required when allow is "jobTitle": …`. Under any other `allow`, `jobs` is not read and not checked. `--skip-semantic-validation` does not get either through: the apply still refuses the question before writing anything, with exit `2`, and a `--dry-run` with that flag refuses it too.

Since 0.16.0 two shapes the webclient's survey builder saves pass with a **warning** instead of failing:

- **`jobs: []`** — what the builder saves once every job title is unselected. It passes, but the person picker lists no users.
- **A list holding `"*"`** (`jobs: ["*"]`, or `"*"` among codes) — the person picker reads it as every job title, but the builder compares the string strictly and does not show it as "all job titles". The apply sends it as the string `"*"`, without the list's other codes.

Remote validation verifies that every code in the list is an existing JobTitle. It looks up nothing for `"*"`, nor for a list holding `"*"` (earlier versions failed such a list with `JobTitle "*" not found`).

`surveys export` writes "all job titles" as `jobs: "*"`, and a legacy filter stored as a single code as the one-code list the webclient reads it as, which an apply writes back as stored; earlier versions left both out, and `validate` refused the export. A stored list holding `"*"` exports as `jobs: "*"`, with a warning that the next apply writes it back as the string. Any other stored value is named in a warning.

### `api` — options from an external endpoint

```yaml
- type: api
  identifier: re_ciudad
  label: "City"
  source: url                       # "url" or "cotalker"
  url: "https://api.example.com/cities"
  method: POST                      # GET or POST (default POST)
  identifiers: ["re_area"]          # other answers sent as filter params
```

`source` and `url` are both required and can't be empty. `identifiers` lists other questions in the same survey whose current answers are passed to the endpoint as filters — omit it (or use `[]`) to send none. Use `source: cotalker` for internal Cotalker endpoints.

## Date, location, media

### `datetime` — date and/or time

```yaml
- type: datetime
  identifier: re_ingreso
  label: "Start date"
  dateMode: date            # "date" (default) or "date_time"
  timezone: America/Santiago  # optional, IANA name
```

`dateMode: date` (or no `dateMode`) captures a date only; `date_time` adds the time of day. **There is no time-only mode**, and since 0.14.0 any other value — `time` and `datetime` included, or an empty `dateMode:` — is refused: `validate` exits `1` and an apply `2`, before anything is sent. Before, such a value was saved silently as a date only. The same applies to a `datetime` column of a `table`, where switching a saved column from `date` to `date_time` is a type change the apply refuses — capture the time in a new column. A `dateMode` on any type other than `datetime` is never sent, and draws a warning.

A `subtype` limits which dates are accepted — `absolute`, `relative` or `createdAt` — and needs numeric `min` and `max`, not dates: without them the webclient refuses every answer (`absolute`) or accepts a single day (`relative`, `createdAt`), and neither `validate` nor an apply catches it. On `relative` and `createdAt` the limits are **seconds** before and after the reference date; the safest way to get them right is to copy them from the export of a survey whose limits were set in the webclient. **Avoid `absolute`**: the webclient refuses every answer even with the limits its own builder saves. Use `relative` or `createdAt`, or leave `subtype` out.

The simplified format has no field for the labels of a `datetime`'s inputs. A new question gets `Fecha`, or `Fecha` and `Hora` with `date_time`; an update keeps the stored labels — `Date` and `Hour` from the English webclient, say — unless its `dateMode` adds or drops the time input.

### `gps` — a location

```yaml
- type: gps
  identifier: re_ubicacion
  label: "Location"
  locationType: currentLocation   # optional, default currentLocation
```

### `image` — photos

```yaml
- type: image
  identifier: re_foto
  label: "Evidence photo"
  min: 1      # minimum number of images (default 1)
  max: 100    # maximum (default 100)
```

### `file` — file attachments

```yaml
- type: file
  identifier: re_documento
  label: "Attached document"
  allowAllFileTypes: false
  allowedTypes: ["pdf", "ms/word"]   # backend allowlist codes, NOT MIME types
```

<div className="alert alert--secondary">

**File types are Cotalker allowlist codes, not MIME types.** Use `pdf`, `ms/word`, `ms/excel`, `ms/ppt`, `ms/*`, `text/plain`, `text/md`, `image/*`, `video/*`, `cot/notes`, or `*`. Writing `application/pdf` won't work — the code is `pdf`. Omit `allowedTypes` (or leave `allowAllFileTypes` at its default) to accept any file. Set `fileType: note` to attach a Cotalker note instead of a file.

</div>

### `signature` — a digital signature

```yaml
- type: signature
  identifier: re_firma
  label: "Approval signature"
  required: true
```

Renders a signature pad for a hand-drawn signature.

## Composition

### `survey` — embed a sub-survey

Nests another survey inside this one.

```yaml
- type: survey
  identifier: re_eval_sub
  label: "Supplier evaluation"
  surveyCode: eval_proveedor    # code of the survey to embed
  embedded: false               # true opens it inline
```

<div className="alert alert--primary">

**Apply the child first.** `surveyCode` has to be a non-empty string matching an existing survey's `code` exactly (case-insensitive) — a missing, empty or non-string value fails with *`survey requires a non-empty surveyCode`*.

If the referenced survey doesn't exist, the remote validation that runs before every apply — `--dry-run` included — stops the parent with *`Survey with code "..." not found`*. With `--skip-remote-validation` that check doesn't run, so a dry run reports nothing and the apply itself stops later, with *"Referenced survey ... not found. Apply the child survey first."* The lookup is by code, the same way `apply` resolves the reference, so an inactive survey counts.

`apply --dir` does **not** order surveys among themselves by reference: within the Survey kind, files go in path order and each file's documents in the order they're written. A child the server doesn't have yet has to sort first — an earlier file, or earlier in the same file.

`cotctl` resolves the code to an ID on apply and back to the code on export, so your YAML stays portable.

</div>

### `table` — a grid of repeating rows

Each column is itself a question, and every row's answers are stored under the column identifiers.

```yaml
- type: table
  identifier: re_expenses
  label: "Expense detail"
  min: 1
  max: 20
  columns:
    - type: textinput
      identifier: description
      label: "Description"
    - type: textnumber
      identifier: amount
      label: "Amount"
    - type: listquestion
      identifier: status
      label: "Status"
      options:
        - { label: "Approved", value: "approved" }
        - { label: "Pending", value: "pending" }
```

`columns` is required, from 1 to 10, in render order. **On a table, `min` and `max` are row counts** — not characters, not selections; the backend caps every table at 50 rows. `min` goes from 0 to 50 and `max` from **1** to 50, with `min` not above `max`. On a column they keep that column's own meaning.

Since 0.14.0 a table `max` below 1 is refused — `max must be at least 1 row — remove it to keep the 50-row cap` — by `validate` (exit `1`) and by every apply (exit `2`, `--dry-run` included), also in a survey exported from a table saved with `max: 0`. Such a table only half worked anyway: the webclient refused to submit it. Remove the `max` and the table takes up to 50 rows; set one only to actually limit the rows.

Column identifiers are unique *within their own table*, not across the survey, so the same identifier may appear in two different tables. Their charset is `^[a-zA-Z0-9_]+$` — stricter than a question identifier, and with no dots, dashes or spaces, which would break the per-cell error paths. A header caps at 50 characters.

Seven types are allowed as a column: `textinput`, `textnumber`, `listquestion`, `datetime`, `person`, `property` and `api`. Plain `text` is not one of them, and a table cannot nest another table. **A selection column is single-select**: leave `max` unset and it becomes 1, and declaring `max: 3` is rejected — the webclient cannot fill a multi-select column inside a table.

**A text column's `max` defaults to 1000 characters** (0.17.0+), not the 5000 of a standalone `textinput`. In the simplified format, a `textinput` column that leaves out `max` is sent with `max: 1000`, where earlier versions sent 5000; the raw format sends a column as written. So the first apply of an unchanged YAML over a column stored with 5000 lowers it to 1000 — `Would UPDATE` in a dry run, with the column's `max` in the diff — and the applies after it change nothing. `surveys export` leaves out a text column's `max` only when it is 1000 and writes any other value, 5000 included, so re-applying an export made with 0.17.0, on a server without the 1000-character cap, keeps the column as stored. An export made with an earlier `cotctl` left out the 5000, so its first apply lowers the column to 1000; an export made with 0.17.0, applied with an earlier `cotctl`, writes 5000 again. Nothing to do for a column whose answers fit in 1000 characters; a longer text belongs in a standalone `textinput` question, which keeps its 5000.

**A text column's `min` may not exceed its `max`** (0.17.0+). `validate` fails such a column with exit `1`, and every apply, `--dry-run` included, refuses it with exit `2` before writing anything, with a message that names the column:

```
column "observaciones": min (1500) exceeds the max of 1000 a text column is sent with when it leaves max out — the webclient could not fill the cell with any text. Lower min to 1000 or below
```

In the simplified format a column that leaves out `max` is compared with the 1000 it is sent with, and a quoted `min` or `max` counts as the number it spells, as the server reads it; a raw-format column without `max` is sent without one and is not compared. `cotctl` used to send such a column and the server stored it, but its `min` is never usable as written: a webclient or server without the 1000-character cap refuses every non-empty cell, and only one that applies the cap lowers the `min` to the `max`. Fix it by lowering the `min` to the `max` or below — to 1000 when the column declares no `max` — or, for a `min` of 1000 or less, by raising the `max` to it. That includes a column exported as stored: neither the webclient's survey builder nor the server compares the two, so the export of a survey that stores one is refused whole, even when the change being applied does not touch the table. It is a semantic check, so `--skip-semantic-validation` turns it off.

<div className="alert alert--info">

**A server may cap a table's text column at 1000 characters.** Where it does, it refuses a column `min` or `max` above 1000, which `cotctl` still accepts: to apply the YAML there, lower it to 1000, or move the longer text to a standalone `textinput` question. A webclient whose survey builder applies the same cap marks such a column invalid and limits its cells to 1000 characters. An answer already stored with a cell over 1000 characters still shows, but editing it in the webclient needs that cell shortened.

</div>

<div className="alert alert--warning">

**Four edits are refused once a table has been applied**, and they fail before anything is written — `apply --dry-run` refuses them exactly as `apply` does:

- removing the table, or changing its `identifier`;
- removing a column, or changing its `identifier`;
- changing a saved column's type — including `date` → `date_time` and `number` → `rating`, which do not change the type name;
- reordering, renaming or removing a saved option of a `listquestion` column, or editing its label.

**Renaming is not among them.** The frozen field is the `identifier`, of the table as much as of a column — a `label` changes freely. The one exception is a saved *option*, whose label is frozen alongside its value, because the two are parallel by index and touching either re-labels answers already stored.

Still editable on a saved column: `label`, `help` and `min`/`max`. Adding a **new** column is fine, and so is **appending** options after the existing ones on a `listquestion` column — an append cannot re-label anything, because every saved option keeps its index.

`cotctl` enforces these, not the backend: the API accepts all four and loses the answers silently.

</div>

<div className="alert alert--warning">

**A column cannot carry a conditional display — rejected since 0.12.0.** `conditionalDisplay` (and `command`, its raw-format spelling) used to validate fine on a column, and then do nothing: the client always renders every cell of a table, so the condition was never evaluated. Since 0.15.0 the same goes for `dependsOn`, `showWhen` and `resetIdentifiers` written at the column's root, in both formats: they used to pass, and the apply dropped them without a word. Remove them — the apply never sent them, so the stored survey does not change.

**Move the condition up to the `table` question itself**, which is the level that is actually evaluated:

```yaml
# ❌ rejected — a column is always rendered
- type: table
  identifier: re_expenses
  columns:
    - type: textnumber
      identifier: amount
      conditionalDisplay: ...

# ✅ the whole table appears or does not
- type: table
  identifier: re_expenses
  conditionalDisplay: ...
  columns:
    - type: textnumber
      identifier: amount
```

Conditional display on a top-level question is unchanged. `surveys export` also stopped emitting either key inside a column, so an export produced by 0.12.0 re-applies cleanly where an older one would now be refused — **re-export before re-applying an old file**.

</div>

<div className="alert alert--primary">

**Not visible on mobile yet.** A table renders on web today; mobile support arrives with the next mobile release. `apply` prints a warning when it creates one.

</div>

## See also

- [Surveys](../surveys.md) — the survey landing and root fields
- [Logic & validation](./logic-and-validation.md) — conditional display keyed off `listquestion` answers
- [Complete example](./complete-example.md) — several types in one working survey
