---
title: Survey question types
sidebar_label: Question types
displayed_sidebar: developer
---

<!-- source: repositories/cotctl/src/transformers/simplified.transformer.ts, src/schemas/survey.schema.ts, docs/surveys/question-types/*.md @ 4f7248a (2026-07-06) -->

Cotalker offers 13 question types. Every question shares the [common fields](../surveys.md#questions) — `type`, `identifier`, `label`, and the optional `help`, `required`, `isReadOnly`, `conditionalDisplay`, `exec`. This page covers what's *specific* to each type: the extra fields it needs and the gotchas worth knowing before you author one.

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

## See also

- [Surveys](../surveys.md) — the survey landing and root fields
- [Logic & validation](./logic-and-validation.md) — conditional display keyed off `listquestion` answers
- [Complete example](./complete-example.md) — several types in one working survey
