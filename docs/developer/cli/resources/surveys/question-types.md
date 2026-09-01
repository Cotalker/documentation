---
title: Survey question types
sidebar_label: Question types
displayed_sidebar: developer
---

<!-- source: repositories/cotctl/src/transformers/simplified.transformer.ts, src/schemas/survey.schema.ts, docs/surveys/question-types/*.md @ 4f7248a (2026-07-06) -->
<!-- the `table` section: repositories/cotctl/docs/surveys/question-types/table.md, src/lib/survey-validator.ts @ 6098bd5 (release-0.11.0, 2026-09-01) -->

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

The `label` is the visible content and is rendered as Markdown (GitHub-flavored, HTML allowed). Use it for headings and dividers.

### `textinput` — free text

```yaml
- type: textinput
  identifier: re_nombre
  label: "Full name"
  min: 0          # min length (default 0)
  max: 5000       # max length (default 5000)
```

Set `subtype: long_text` for a multi-line box.

### `textnumber` — numbers

```yaml
- type: textnumber
  identifier: re_edad
  label: "Age"
  min: 18         # minimum accepted value
  max: 99         # maximum accepted value
```

`min`/`max` bound the entered *value* (not a length). Set `subtype: rating` to render a star rating instead of a number field.

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

`filters` is required (at least one entry). Add `tree: true` for a hierarchical tree picker, or `creation: true` to let the user create a new property inline. To scope the options, replace `subfilter: "*"` with a real subfilter and set `subfilterValue`.

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

For `jobTitle`, add a `jobs` list:

```yaml
  personFilter:
    allow: jobTitle
    jobs: ["supervisor_ventas"]
```

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
  dateMode: date            # "date" or "date_time"
  timezone: America/Santiago  # optional, IANA name
```

`dateMode: date` captures a date only; `date_time` adds a time picker.

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

**Apply the child first.** `surveyCode` must match an existing survey's `code` exactly (case-insensitive). If the referenced survey doesn't exist yet, `apply` fails with *"Referenced survey ... not found. Apply the child survey first."* `cotctl` resolves the code to an ID on apply and back to the code on export, so your YAML stays portable.

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

`columns` is required, from 1 to 10, in render order. **On a table, `min` and `max` are row counts** — not characters, not selections; the backend caps every table at 50 rows. On a column they keep that column's own meaning.

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

<div className="alert alert--primary">

**Not visible on mobile yet.** A table renders on web today; mobile support arrives with the next mobile release. `apply` prints a warning when it creates one.

</div>

## See also

- [Surveys](../surveys.md) — the survey landing and root fields
- [Logic & validation](./logic-and-validation.md) — conditional display keyed off `listquestion` answers
- [Complete example](./complete-example.md) — several types in one working survey
