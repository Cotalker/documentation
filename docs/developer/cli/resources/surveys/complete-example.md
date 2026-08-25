---
title: A complete survey, annotated
sidebar_label: Complete example
displayed_sidebar: developer
---

<!-- source: repositories/cotctl/docs/surveys/complete-example.md @ 4f7248a (2026-07-06) -->

Everything on the survey pages comes together in one place here: a real employee-registration survey. Read it top to bottom, then apply it to your demo company and answer it once — the fastest way to make the pieces click.

```yaml
kind: Survey
code: registro_empleado           # immutable — pick it deliberately
name: "Employee Registration"
nameTranslations:
  es: "Registro de Empleado"
  en: "Employee Registration"
questions:

  # 1 — A Markdown title. Captures no answer.
  - type: text
    identifier: re_titulo
    label: "# Employee Registration"

  # 2 — Free text, required, with a per-language label.
  - type: textinput
    identifier: re_nombre
    label: "Full name"
    required: true
    max: 200
    translations:
      label:
        es: "Nombre completo"
        en: "Full name"

  # 3 — A bounded integer.
  - type: textnumber
    identifier: re_edad
    label: "Age"
    subtype: integer
    min: 18
    max: 100

  # 4 — Single choice. The `value`s are what get stored.
  - type: listquestion
    identifier: re_departamento
    label: "Department"
    required: true
    options:
      - label: "Engineering"
        value: "engineering"
      - label: "Sales"
        value: "sales"
      - label: "HR"
        value: "hr"

  # 5 — Shown only when department = engineering; cleared if hidden.
  - type: textinput
    identifier: re_comentarios_tech
    label: "Tech stack"
    conditionalDisplay:
      dependsOn: re_departamento
      showWhen:
        - op: eq
          value: "engineering"
      resetOnHide: true

  # 6 — A date, no time.
  - type: datetime
    identifier: re_fecha_ingreso
    label: "Start date"
    required: true
    dateMode: date

  # 7 — Pre-filled from the current user, then locked.
  - type: textinput
    identifier: re_email
    label: "Corporate email"
    exec:
      preload:
        context: "user#me"
        src: |
          function run() {
            const email = context['user#me']?.email || '';
            return [
              { cmd: 'SET_RESPONSES', value: [email] },
              { cmd: 'SET_READONLY', value: 'true' }
            ];
          }

  # 8 — A hand-drawn signature.
  - type: signature
    identifier: re_firma
    label: "Employee signature"
    required: true
```

## What to notice

- **Every identifier is prefixed `re_`**, derived from the survey code `registro_empleado`. This is the convention that keeps identifiers unique across the whole company — see [why it matters](../surveys.md#identifiers-the-one-rule-to-internalize).
- **Question 1 (`text`)** puts its content in `label` and renders it as Markdown — no answer is captured.
- **Question 5 (`conditionalDisplay`)** appears only when the department is Engineering, and `resetOnHide: true` clears whatever was typed if the user changes their mind.
- **Question 7 (`exec.preload`)** reads `user#me` to pre-fill the email and returns two commands — one to set the value, one to lock the field. See [Exec scripting](./exec-scripting.md).
- **Translations** appear at two levels: `nameTranslations` for the survey name and `translations.label` per question.

## Try it

```bash
# Validate first (structure + semantics)
cotctl validate -f registro_empleado.yaml

# Preview against the server without applying
cotctl surveys apply -f registro_empleado.yaml -c demo --dry-run

# Apply for real
cotctl surveys apply -f registro_empleado.yaml -c demo
```

## See also

- [Question types](./question-types.md) · [Exec scripting](./exec-scripting.md) · [Logic & validation](./logic-and-validation.md)
- [Surveys](../surveys.md) — the landing page
