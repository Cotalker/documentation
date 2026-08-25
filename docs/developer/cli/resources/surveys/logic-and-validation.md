---
title: Survey logic and validation
sidebar_label: Logic & validation
displayed_sidebar: developer
---

<!-- source: repositories/cotctl/docs/surveys/conditional-display.md, scoring.md, bounds.md, validations.md, src/lib/survey-validator.ts, src/validators/remote.validator.ts @ 4f7248a (2026-07-06) -->

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
    resetOnHide: true            # clear this answer when hidden
```

`dependsOn` names the controlling question; the question is shown when any entry in `showWhen` matches. Each entry is an `op` and a `value` (always written as a **string**, even for numeric comparisons):

| `op` | Matches when | Use with |
|---|---|---|
| `eq` | Exact equality | `listquestion`, `textinput` |
| `regex` | Regex match | `listquestion`, `textinput` |
| `gte` | Controlling value ≥ `value` | `textnumber` |
| `lte` | Controlling value ≤ `value` | `textnumber` |

Use `regex` for an OR of options (`value: "alto|excelente"`). `resetOnHide: true` clears the answer when the question is hidden; add `resetIdentifiers: [...]` to also clear other questions when the condition flips.

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

**Layer 2 — Semantic.** Cross-field rules: `listquestion` needs `options` with no duplicate values; `property` needs `filters`; `propertiesChannel`/`propertiesLimit` must have matching lengths; every `exec` `src` must be valid JavaScript; identifiers must match `^[a-zA-Z][a-zA-Z0-9_]*$` and avoid the reserved words. Warnings flag things like a missing `function run()`, a `button` on a non-`onPlay` hook, or a deprecated field (`hint`→`help`, `api`→`source`).

**Layer 3 — Remote.** Only with `--remote` and a profile. It calls the server to check what local validation can't: identifiers are unique across the company's surveys, existing identifiers aren't being renamed (they're immutable), referenced `propertyType`s and JobTitle codes actually exist, and a `survey`-type question's `surveyCode` resolves.

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
