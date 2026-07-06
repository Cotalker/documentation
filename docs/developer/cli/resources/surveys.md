---
title: Surveys (YAML)
sidebar_label: Surveys
displayed_sidebar: developer
---

<!-- source: repositories/cotctl/src/commands/surveys.ts, src/schemas/survey.schema.ts, docs/surveys/yaml-structure.md @ 4f7248a (2026-07-06) -->

A **survey** is a form — the way Cotalker captures structured data from people. Surveys are usually the first resource partners learn to manage with `cotctl`, because they're self-contained and immediately useful. A survey is a `code`, a `name`, and a list of `questions`, and everything else — who can respond, conditional visibility, scoring, automation hooks — is layered on top of that spine.

This page is the map. It covers the minimal structure you'll write every day and the four commands you'll use to manage surveys; the subpages go deep on the parts that reward it.

## The shape of a survey

At its simplest, a survey is three things:

```yaml
kind: Survey
code: registro_empleado          # unique per company, immutable after creation
name: "Employee Registration"
questions:
  - type: textinput
    identifier: re_nombre         # company-wide unique, immutable after creation
    label: "Name"
  - type: listquestion
    identifier: re_cargo
    label: "Role"
    options:
      - label: "Analyst"
        value: "analista"
```

### Root fields

| Field | Required | Description |
|---|---|---|
| `kind` | Yes | Always `Survey` |
| `code` | Yes | Unique per company. Must match `^[a-z][a-z0-9_]*$`. **Immutable after creation** |
| `name` | Yes | Display name |
| `isActive` | No | Defaults to `true` |
| `nameTranslations` | No | `es` / `en` / `pt` / `fr` display-name translations |
| `permissions` | No | AccessRole **names**, resolved to IDs on apply — who can respond |
| `bounds` | No | Maps answers to task fields (see [Logic & validation](./surveys/logic-and-validation.md)) |
| `src` | No | Scoring script (see [Logic & validation](./surveys/logic-and-validation.md)) |

<div className="alert alert--primary">

**`code` is immutable, and so is every question `identifier`.** Once a survey is created these can't change — choose them carefully. To "rename" either, you create a new resource. This is why a clear naming convention from the start pays off.

</div>

Beyond these, surveys carry many optional fields for channel visibility, post-submission editing, responder filters, and re-assignment. You'll reach for those as projects demand; export a real survey to see them all.

## Questions

`questions` is an array. Every question, regardless of type, shares a common set of fields:

| Field | Required | Description |
|---|---|---|
| `type` | Yes | The question type — one of 13 (see below) |
| `identifier` | Yes | Company-wide unique ID. Must match `^[a-zA-Z][a-zA-Z0-9_]*$` |
| `label` | Yes | The visible label |
| `help` | No | Secondary help text |
| `required` | No | Defaults to `false` |
| `isReadOnly` | No | Defaults to `false` |
| `twoColumns` | No | Two-column layout |
| `translations` | No | Per-language `label` and `help` |
| `conditionalDisplay` | No | Show/hide based on another answer |
| `exec` | No | Automation hooks |

### Identifiers: the one rule to internalize

A question's `identifier` must be **unique across the entire company**, not just within this survey. The convention that keeps you out of trouble is to **prefix every identifier with the survey code**:

```yaml
# GOOD — prefixed, won't collide
identifier: re_nombre

# BAD — generic, will collide with other surveys
identifier: nombre
```

A few words are reserved and can't be used as identifiers: `survey`, `user`, `channel`, `_id`, `UUID`, `target`, `properties`.

## What the subpages cover

The survey model has four areas deep enough to deserve their own page:

- **[Question types](./surveys/question-types.md)** — the catalog of 13 types, with the minimal YAML and the type-specific fields each one needs (`options` for lists, `filters` for properties, `source` for API-backed selectors, and so on).
- **[Exec scripting](./surveys/exec-scripting.md)** — the six lifecycle hooks that run JavaScript inside a survey, the contexts your script can read, the commands it returns, and how to make authenticated network requests.
- **[Logic & validation](./surveys/logic-and-validation.md)** — conditional display, scoring, binding answers to task fields (`bounds`), and the three-layer validation `cotctl` runs before anything reaches the server.
- **[Complete example](./surveys/complete-example.md)** — a full, annotated survey you can read end to end.

## Managing surveys with `cotctl`

Surveys have their own entity-scoped command group. Every command takes a profile via the global `-c <profile>` flag.

| Command | What it does |
|---|---|
| `cotctl surveys list` | List surveys (active by default; `--all` includes inactive, `--code <code>` does an exact lookup) |
| `cotctl surveys get <code>` | Show one survey; `--populate` includes the full question list (and switches the default output to YAML) |
| `cotctl surveys export <code>` | Export a survey as YAML or JSON |
| `cotctl surveys apply -f <file>` | Create or update a survey from a YAML file |
| `cotctl surveys deactivate <code>` | Soft-delete a survey (it's never hard-deleted) |

### Applying safely

`apply` matches questions by `identifier` rather than position, so you can add, edit, remove, and reorder questions freely — IDs are preserved. Removing a question deactivates it rather than hard-deleting it, and you'll be asked to confirm. If you apply a survey YAML without its `questions` section, the existing questions are left untouched.

Two flags make `apply` safe to run in anger:

```bash
# Preview without touching the server. --diff controls verbosity.
cotctl surveys apply -f survey.yaml -c acme --dry-run --diff verbose

# In CI: fail the build if the dry-run detects a destructive change.
cotctl surveys apply -f survey.yaml -c acme --dry-run --fail-on-destructive
```

- `--dry-run` validates and prints exactly what would be sent, without applying.
- `--diff <off|compact|verbose>` sets how much of the before/after the dry-run prints (default `compact`).
- `--fail-on-destructive` exits with code `2` when the dry-run finds any danger-severity change — useful in a pipeline. (Requires `--dry-run`.)
- `--yes` skips the confirmation prompts; `--json` emits one result object per line for scripting.

### A practical tip

The fastest way to learn the full structure is to export a real survey and read it:

```bash
cotctl surveys export <some_survey> -c acme -o example.yaml
```

Add `--extract-scripts <dir>` to pull inline exec scripts out into separate `.js` files referenced with `file://` — much nicer to edit and diff.

## See also

- [apply](../commands/apply.md) — the shared apply pipeline and its ordering rules
- [Export & import](../commands/export-import.md) — export formats and `--extract-scripts`
- [Workflows](./workflows.md) — surveys are referenced by workflow transitions and StartForms
- [Data models](../data-models.md) — the entities a survey reads and writes
