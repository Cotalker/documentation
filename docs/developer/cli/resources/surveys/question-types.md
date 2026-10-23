---
title: Survey question types
sidebar_label: Question types
displayed_sidebar: developer
---

<!-- source: repositories/cotctl/src/transformers/simplified.transformer.ts, src/schemas/survey.schema.ts, docs/surveys/question-types/*.md @ a9168d68 (2026-10-23) -->
<!-- the `table` section: repositories/cotctl/docs/surveys/question-types/table.md, src/lib/survey-validator.ts @ a9168d68 (2026-10-23) -->

Cotalker offers 14 question types. Every question shares the [common fields](../surveys.md#questions) — `type`, `identifier`, `label`, and the optional `help`, `required`, `isReadOnly`, `conditionalDisplay`, `exec`. This page covers what's *specific* to each type: the extra fields it needs and the gotchas worth knowing before you author one.

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

`long_text` is a legacy value older surveys store. It is still accepted, with a warning, and sent as `short_text` — what the webclient's survey builder does when it loads the question — so the first apply of an unchanged survey that stores it writes `short_text` (`Would UPDATE` in a dry run). Write `short_text`, or no `subtype`, to silence the warning.

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
| `jobTitle` | Only users holding one of `jobs: [ ... ]` (JobTitle codes) |
| `hierarchy.subordinates` | The responder's subordinates |
| `hierarchy.boss` | The responder's manager |
| `hierarchy.peers` | The responder's peers |

`personFilter` itself is required — a `person` question without it fails with `person requires personFilter`. The legacy `allow: no_filter` is still accepted and normalized to `job`, with a deprecation warning.

For `jobTitle`, add a `jobs` **list** of one or more JobTitle codes:

```yaml
  personFilter:
    allow: jobTitle
    jobs: ["supervisor_ventas"]
```

It has to be a list even for a single code: `jobs: supervisor_ventas` fails with `jobs must be a list`. Under any other `allow`, `jobs` is not read and not checked. Remote validation verifies that every code in the list is an existing JobTitle.

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
