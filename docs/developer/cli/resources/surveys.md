---
title: Surveys (YAML)
sidebar_label: Surveys
displayed_sidebar: developer
---

A **survey** is a form — the way Cotalker captures structured data from people. Surveys are usually the first resource partners learn to manage with `cotctl`, because they're self-contained and immediately useful. This page explains the YAML structure so you can author and version them confidently.

## The shape of a survey

At its simplest, a survey is a `code`, a `name`, and a list of `questions`:

```yaml
kind: Survey
code: registro_empleado
name: "Employee Registration"
questions:
  - type: textinput
    identifier: re_nombre
    label: "Name"
```

### Root fields

| Field | Required | Description |
|---|---|---|
| `kind` | Yes | Always `Survey` |
| `code` | Yes | Unique per company. Lowercase letters, numbers, underscores. **Immutable after creation** |
| `name` | Yes | Display name |
| `isActive` | No | Defaults to `true` |

<div className="alert alert--primary">

**`code` is immutable.** Once a survey is created, its `code` can't change — choose it carefully. The same is true of each question's `identifier`. To "rename" either, you create a new resource. This is why we recommend a clear naming convention from the start.

</div>

Beyond these, surveys support many optional fields for who can respond, post-submission editing, conditional visibility, scoring, and binding answers to task fields. You'll reach for those as projects demand; this page focuses on the structure you'll use every day.

## Questions

`questions` is an array, and every question shares a common set of fields regardless of its type:

| Field | Required | Description |
|---|---|---|
| `type` | Yes | The question type (see below) |
| `identifier` | Yes | Company-wide unique ID |
| `label` | Yes | The visible label |
| `help` | No | Secondary help text |
| `required` | No | Defaults to `false` |
| `isReadOnly` | No | Defaults to `false` |

### Identifiers: the one rule to internalize

A question's `identifier` must be **unique across the entire company**, not just within this survey. The convention that keeps you out of trouble is to **prefix every identifier with the survey code**:

```yaml
# GOOD — prefixed, won't collide
identifier: re_nombre

# BAD — generic, will collide with other surveys
identifier: nombre
```

A few words are reserved and can't be used as identifiers: `survey`, `user`, `channel`, `_id`, `UUID`, `target`, `properties`.

### Question types

Cotalker offers a rich set of question types. Here's the catalog — pick the one that matches the data you're capturing:

| Type | For |
|---|---|
| `text` | Static text, titles, separators |
| `textinput` | Free text |
| `textnumber` | Numbers, integers, ratings |
| `listquestion` | Single/multiple choice (radio/checkbox) |
| `property` | Selecting from a data-model property |
| `person` | Selecting a person |
| `api` | Selecting from an external API |
| `datetime` | Date and time |
| `gps` | A location |
| `image` | A photo or image |
| `file` | A file attachment |
| `signature` | A digital signature |
| `survey` | An embedded sub-survey |

A couple of types have required sub-fields worth remembering: `listquestion` needs a non-empty `options` list, and `property` needs a `filters` block:

```yaml
- type: listquestion
  identifier: re_cargo
  label: "Role"
  options:
    - label: "Analyst"
      value: "analista"

- type: property
  identifier: re_area
  label: "Area"
  filters:
    - propertyType: "area"
      subfilter: "*"
```

## Editing surveys safely

Because [`apply`](../commands/apply.md) matches questions by `identifier` rather than position, you can add, edit, remove, and reorder questions freely — IDs are preserved. Removing a question deactivates it (it isn't hard-deleted), and you'll be asked to confirm. If you apply a survey YAML without its `questions` section, the existing questions are left untouched.

## A practical tip

The fastest way to learn the full structure is to export a real survey and read it:

```bash
cotctl surveys export <some_survey> -c acme -o example.yaml
```

## See also

- [apply](../commands/apply.md) — how surveys are created and updated
- [Export & import](../commands/export-import.md) — the export options, including `--extract-scripts`
- [Workflows](./workflows.md) — surveys are referenced by workflow transitions
