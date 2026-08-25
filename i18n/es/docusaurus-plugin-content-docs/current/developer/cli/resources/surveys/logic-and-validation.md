---
title: Lógica y validación de formularios
sidebar_label: Lógica y validación
displayed_sidebar: developer
---

<!-- source: repositories/cotctl/docs/surveys/conditional-display.md, scoring.md, bounds.md, validations.md, src/lib/survey-validator.ts, src/validators/remote.validator.ts @ 4f7248a (2026-07-06) -->

Más allá de capturar respuestas, un formulario puede reaccionar a ellas: ocultar preguntas que no aplican, calcular un puntaje, empujar respuestas hacia la tarea a la que pertenece. Esta página cubre los tres mecanismos declarativos para eso — visibilidad condicional, puntaje y bounds — y las tres capas de validación que `cotctl` corre antes de que nada llegue al servidor.

## Visibilidad condicional

Muestra u oculta una pregunta según la respuesta de otra.

```yaml
- type: textinput
  identifier: re_motivo_rechazo
  label: "Reason for rejection"
  conditionalDisplay:
    dependsOn: re_decision       # el identifier de la pregunta que controla
    showWhen:
      - op: eq
        value: "rechazado"
    resetOnHide: true            # limpia esta respuesta al ocultarse
```

`dependsOn` nombra la pregunta que controla; la pregunta se muestra cuando cualquier entrada de `showWhen` coincide. Cada entrada es un `op` y un `value` (siempre escrito como **string**, incluso para comparaciones numéricas):

| `op` | Coincide cuando | Usar con |
|---|---|---|
| `eq` | Igualdad exacta | `listquestion`, `textinput` |
| `regex` | Coincidencia con regex | `listquestion`, `textinput` |
| `gte` | Valor de control ≥ `value` | `textnumber` |
| `lte` | Valor de control ≤ `value` | `textnumber` |

Usa `regex` para un OR de opciones (`value: "alto|excelente"`). `resetOnHide: true` limpia la respuesta cuando la pregunta se oculta; agrega `resetIdentifiers: [...]` para limpiar además otras preguntas cuando la condición se invierte.

## Puntaje

Un formulario puede calcular un puntaje a partir de sus respuestas con un script `src` (el lenguaje de puntaje, ejecutado en el servidor).

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

El script debe estar envuelto en `function run()` y **devolver un objeto con al menos una propiedad `main`** (el puntaje calculado). Lee respuestas por identifier mediante `data['<identifier>']`. Como se compila con `vm.Script`, un `return` de nivel superior es un error de sintaxis — usa siempre el envoltorio `run()`. Igual que los scripts exec, `src` admite una referencia `file://` para mantener la lógica en un archivo `.js` real.

## Bounds: escribir respuestas en la tarea

`bounds` mapea respuestas del formulario a campos de la tarea a la que pertenece el formulario. Al enviar (o editar) el formulario, esos campos se actualizan automáticamente.

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

Cada entrada nombra un campo de la tarea, el `identifier` de la pregunta que lo alimenta y una `action`:

- **Campos que puedes vincular:** `status`, `status1`–`status5`, `assignee`, `startDate`, `endDate`, `validators`, `editors`, `followers`, `visibility`, `resolutionDate`.
- **`action`:** `replace` (sobrescribe), `increment` o `decrement`.

El `identifier` debe apuntar a una pregunta real del formulario. Ver [Task](../../data-models.md#task) para el significado de cada uno de estos campos.

## Las tres capas de validación

Antes de que `cotctl` envíe un formulario al servidor, lo valida en tres capas. Cada hallazgo es un **error** (bloquea el apply) o una **advertencia** (informativa, no bloqueante).

**Capa 1 — Estructura.** Chequeos de esquema: `kind` es `Survey`, `code` cumple `^[a-z][a-z0-9_]*$`, `name` está presente, cada `type` es uno de los 13, los campos enum (button `type`/`theme`, `editable.mode`, `filter` de responders) tienen valores válidos, `button.debounceTime` es al menos 1000.

**Capa 2 — Semántica.** Reglas entre campos: `listquestion` necesita `options` sin valores duplicados; `property` necesita `filters`; `propertiesChannel`/`propertiesLimit` deben tener largos coincidentes; todo `src` de `exec` debe ser JavaScript válido; los identifiers deben cumplir `^[a-zA-Z][a-zA-Z0-9_]*$` y evitar las palabras reservadas. Las advertencias marcan cosas como una `function run()` faltante, un `button` en un hook que no es `onPlay`, o un campo deprecado (`hint`→`help`, `api`→`source`).

**Capa 3 — Remota.** Solo con `--remote` y un perfil. Llama al servidor para chequear lo que la validación local no puede: que los identifiers sean únicos entre los formularios de la empresa, que los identifiers existentes no se estén renombrando (son inmutables), que los `propertyType` y codes de JobTitle referenciados existan de verdad, y que el `surveyCode` de una pregunta tipo `survey` resuelva.

```bash
# Capas 1 + 2
cotctl validate -f survey.yaml

# Las tres capas
cotctl validate -f survey.yaml --remote -c acme

# También corre como parte de apply
cotctl surveys apply -f survey.yaml -c acme --dry-run
```

## Ver también

- [Tipos de pregunta](./question-types.md) — los tipos alrededor de los cuales construyes condiciones y bounds
- [Scripting con exec](./exec-scripting.md) — la contraparte imperativa de estas herramientas declarativas
- [validate](../../commands/validate.md) — el comando de validación completo
