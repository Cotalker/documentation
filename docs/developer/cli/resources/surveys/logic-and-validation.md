---
title: Survey logic and validation
sidebar_label: Logic & validation
displayed_sidebar: developer
---

<!-- source: repositories/cotctl/docs/surveys/conditional-display.md, scoring.md, bounds.md, validations.md, src/lib/survey-validator.ts, src/validators/remote.validator.ts @ 82e613d (2026-10-10) -->

Beyond capturing answers, a survey can react to them: hide questions that don't apply, compute a score, push answers onto the task it belongs to. This page covers the three declarative mechanisms for that — conditional display, scoring, and bounds — and the three-layer validation `cotctl` runs before any of it reaches the server.

## Conditional display

Show or hide a question based on another question's answer.

```yaml
- type: textinput
  identifier: re_motivo_rechazo
  label: "Reason for rejection"
  conditionalDisplay:
    dependsOn: re_decision       # the controlling question's identifier
    showWhen:
      - op: eq
        value: "rechazado"
```

`dependsOn` names the controlling question; the question is shown when any entry in `showWhen` matches. Each entry is an `op` and a `value` (always written as a **string**, even for numeric comparisons):

| `op` | Matches when | Use with |
|---|---|---|
| `eq` | Exact equality | `listquestion`, `textinput` |
| `regex` | Regex match | `listquestion`, `textinput` |
| `gte` | Controlling value ≥ `value` | `textnumber` |
| `lte` | Controlling value ≤ `value` | `textnumber` |

Use `regex` for an OR of options (`value: "alto|excelente"`). `dependsOn` and `showWhen` go together or not at all — one without the other is refused, naming the missing key.

### Clearing answers: `resetIdentifiers`

`resetIdentifiers: [...]` lists questions whose answers are cleared when this question's own answer changes, or when its condition shows or hides it. Since 0.14.0 it can also stand **alone**, with no `dependsOn` / `showWhen`, on a question no other question commands — typically the root of a chain, so changing the main option empties the answers nested under it:

```yaml
- type: listquestion
  identifier: sol_tipo
  label: "Request type"
  options:
    - { label: "Invoice", value: "invoice" }
    - { label: "Credit note", value: "credit" }
  conditionalDisplay:
    resetIdentifiers: [sol_detalle, sol_subdetalle]   # cleared when sol_tipo changes
```

Each identifier must be a question of the survey. `surveys export` writes such a reset back in this form (earlier versions dropped it, and refuse a YAML that uses it), and leaves out — with a warning — an identifier that names no question of the export. An apply that is about to erase a reset stored on a question that your YAML doesn't declare says so first, dry run included: declare the list to keep it, or `resetIdentifiers: []` to clear it.

<div className="alert alert--warning">

**`resetOnHide` has no effect.** The schema accepts it, but the server stores no such key, so it clears no answer when the question hides — earlier versions of this page said otherwise. Since 0.14.0 `validate` and every apply warn about a question that sets `resetOnHide: true`, and refuse it on a question with no condition. Use `resetIdentifiers` to clear answers.

</div>

## Scoring

A survey can compute a score from its answers with a `src` script (the scoring language, run server-side).

```yaml
kind: Survey
code: evaluacion_riesgo
name: "Risk assessment"
src: |
  function run() {
    const impact = Number(data['er_impacto']);
    const likelihood = Number(data['er_probabilidad']);
    return { main: impact * likelihood };
  }
questions:
  # ...
```

The script must be wrapped in `function run()` and **return an object with at least a `main` property** (the computed score). It reads answers by identifier through `data['<identifier>']`. Because it's compiled with `vm.Script`, a top-level `return` is a syntax error — always use the `run()` wrapper. Like exec scripts, `src` supports a `file://` reference so you can keep the logic in a real `.js` file.

## Bounds: writing answers onto the task

`bounds` maps survey answers onto fields of the task the survey belongs to. When the survey is submitted (or edited), those fields update automatically.

<div className="alert alert--warning">

**`cotctl` cannot set `bounds`.** The server's survey update does not store the key: a survey created by `cotctl` gets no bounds whatever the YAML says, and an update that is sent erases bounds another client stored. Since 0.14.0 `apply` warns on stderr when the YAML sets `bounds`, and before an update that would erase stored ones. The same holds for `onlyChannelCreation`, `responders`, `representation` and `reassignable`. The shape below is what the platform stores; configure it outside `cotctl`, and avoid re-applying a survey that holds it unless the YAML changes nothing.

</div>

```yaml
bounds:
  status:
    identifier: re_resultado
    action: replace
  assignee:
    identifier: re_responsable
    action: replace
  status1:
    identifier: re_prioridad
    action: increment
```

Each entry names a task field, the `identifier` of the question that feeds it, and an `action`:

- **Fields you can bind:** `status`, `status1`–`status5`, `assignee`, `startDate`, `endDate`, `validators`, `editors`, `followers`, `visibility`, `resolutionDate`.
- **`action`:** `replace` (overwrite), `increment`, or `decrement`.

The `identifier` must point at a real question in the survey. See [Task](../../data-models.md#task) for what each of these fields means.

## The three layers of validation

Before `cotctl` sends a survey to the server it validates it in three layers. Each finding is an **error** (blocks the apply) or a **warning** (informational, non-blocking).

**Layer 1 — Structure.** Schema checks: `kind` is `Survey`, `code` matches `^[a-z][a-z0-9_]*$`, `name` is present, each `type` is one of the 13, enum fields (button `type`/`theme`, `editable.mode`, responder `filter`) hold valid values, `button.debounceTime` is at least 1000.

**Layer 2 — Semantic.** Cross-field rules: `listquestion` needs `options` with no duplicate values; `property` needs `filters`, as a **list** of at least one entry; `person` needs `personFilter`, and under `allow: jobTitle` a `jobs` **list** of at least one code; a `survey` question needs a non-empty string `surveyCode`; `propertiesChannel`/`propertiesLimit` must have matching lengths; every `exec` `src` must be valid JavaScript; identifiers must match `^[a-zA-Z][a-zA-Z0-9_]*$` and avoid the reserved words. Warnings flag things like a missing `function run()`, a `button` on a non-`onPlay` hook, or a deprecated field (`hint`→`help`, `api`→`source`). Since 0.14.0 the layers also refuse a `dateMode` other than `date` / `date_time`, a table `max` below 1, and a `dependsOn` without `showWhen` (or the reverse), and warn about a `display` on a simplified question, `resetOnHide: true`, a `dateMode` on a non-`datetime` question, and a `resetIdentifiers` with no condition on a `text` question.

**Layer 3 — Remote.** Only with `--remote` and a profile. It calls the server to check what local validation can't: identifiers are unique across the company's surveys, existing identifiers aren't being renamed (they're immutable), referenced `propertyType`s, JobTitle codes and the `propertiesChannel` / `propertiesLimit` codes actually exist, and a `survey`-type question's `surveyCode` resolves — looked up by code the way `apply` resolves it, so an inactive survey counts.

```bash
# Layers 1 + 2
cotctl validate -f survey.yaml

# All three layers
cotctl validate -f survey.yaml --remote -c acme

# Also runs as part of apply
cotctl surveys apply -f survey.yaml -c acme --dry-run
```

## See also

- [Question types](./question-types.md) — the types you build conditions and bounds around
- [Exec scripting](./exec-scripting.md) — the imperative counterpart to these declarative tools
- [validate](../../commands/validate.md) — the full validation command
