---
title: Un formulario completo, anotado
sidebar_label: Ejemplo completo
displayed_sidebar: developer
---

<!-- source: repositories/cotctl/docs/surveys/complete-example.md @ 4f7248a (2026-07-06) -->

Todo lo de las páginas de formularios se junta acá: un formulario real de registro de empleado. Léelo de principio a fin, luego aplícalo a tu empresa demo y respóndelo una vez — la forma más rápida de que las piezas encajen.

```yaml
kind: Survey
code: registro_empleado           # inmutable — elígelo con criterio
name: "Employee Registration"
nameTranslations:
  es: "Registro de Empleado"
  en: "Employee Registration"
questions:

  # 1 — Un título en Markdown. No captura respuesta.
  - type: text
    identifier: re_titulo
    label: "# Employee Registration"

  # 2 — Texto libre, requerido, con etiqueta por idioma.
  - type: textinput
    identifier: re_nombre
    label: "Full name"
    required: true
    max: 200
    translations:
      label:
        es: "Nombre completo"
        en: "Full name"

  # 3 — Un entero acotado.
  - type: textnumber
    identifier: re_edad
    label: "Age"
    subtype: integer
    min: 18
    max: 100

  # 4 — Selección única. Los `value` son lo que se guarda.
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

  # 5 — Se muestra solo si department = engineering; se limpia al ocultarse.
  - type: textinput
    identifier: re_comentarios_tech
    label: "Tech stack"
    conditionalDisplay:
      dependsOn: re_departamento
      showWhen:
        - op: eq
          value: "engineering"
      resetOnHide: true

  # 6 — Una fecha, sin hora.
  - type: datetime
    identifier: re_fecha_ingreso
    label: "Start date"
    required: true
    dateMode: date

  # 7 — Precargado desde el usuario actual, luego bloqueado.
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

  # 8 — Una firma trazada a mano.
  - type: signature
    identifier: re_firma
    label: "Employee signature"
    required: true
```

## Qué notar

- **Cada identifier lleva el prefijo `re_`**, derivado del code del formulario `registro_empleado`. Es la convención que mantiene los identifiers únicos en toda la empresa — ver [por qué importa](../surveys.md#identificadores-la-única-regla-que-hay-que-internalizar).
- **La pregunta 1 (`text`)** pone su contenido en `label` y lo renderiza como Markdown — no se captura respuesta.
- **La pregunta 5 (`conditionalDisplay`)** aparece solo cuando el departamento es Engineering, y `resetOnHide: true` limpia lo escrito si el usuario cambia de opinión.
- **La pregunta 7 (`exec.preload`)** lee `user#me` para precargar el email y devuelve dos comandos — uno para fijar el valor, otro para bloquear el campo. Ver [Scripting con exec](./exec-scripting.md).
- **Las traducciones** aparecen en dos niveles: `nameTranslations` para el nombre del formulario y `translations.label` por pregunta.

## Pruébala

```bash
# Valida primero (estructura + semántica)
cotctl validate -f registro_empleado.yaml

# Previsualiza contra el servidor sin aplicar
cotctl surveys apply -f registro_empleado.yaml -c demo --dry-run

# Aplica de verdad
cotctl surveys apply -f registro_empleado.yaml -c demo
```

## Ver también

- [Tipos de pregunta](./question-types.md) · [Scripting con exec](./exec-scripting.md) · [Lógica y validación](./logic-and-validation.md)
- [Formularios](../surveys.md) — la página de inicio
