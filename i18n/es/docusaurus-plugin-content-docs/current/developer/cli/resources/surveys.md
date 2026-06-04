---
title: Encuestas (YAML)
sidebar_label: Encuestas
displayed_sidebar: developer
---

Una **encuesta** es un formulario — la forma en que Cotalker captura datos estructurados de las personas. Las encuestas suelen ser el primer recurso que los partners aprenden a gestionar con `cotctl`, porque son autocontenidas e inmediatamente útiles. Esta página explica la estructura YAML para que puedas crearlas y versionarlas con confianza.

## La forma de una encuesta

En su forma más simple, una encuesta es un `code`, un `name` y una lista de `questions`:

```yaml
kind: Survey
code: registro_empleado
name: "Employee Registration"
questions:
  - type: textinput
    identifier: re_nombre
    label: "Name"
```

### Campos raíz

| Campo | Requerido | Descripción |
|---|---|---|
| `kind` | Sí | Siempre `Survey` |
| `code` | Sí | Único por empresa. Minúsculas, números, guiones bajos. **Inmutable tras la creación** |
| `name` | Sí | Nombre para mostrar |
| `isActive` | No | Por defecto `true` |

<div className="alert alert--primary">

**`code` es inmutable.** Una vez creada una encuesta, su `code` no puede cambiar — elegilo con cuidado. Lo mismo aplica al `identifier` de cada pregunta. Para "renombrar" cualquiera de los dos, creás un recurso nuevo. Por eso recomendamos una convención de nombres clara desde el principio.

</div>

Más allá de estos, las encuestas soportan muchos campos opcionales para quién puede responder, edición post-envío, visibilidad condicional, scoring, y vincular respuestas a campos de tareas. Recurrirás a esos según lo pidan los proyectos; esta página se enfoca en la estructura que usarás todos los días.

## Preguntas

`questions` es un array, y toda pregunta comparte un conjunto común de campos sin importar su tipo:

| Campo | Requerido | Descripción |
|---|---|---|
| `type` | Sí | El tipo de pregunta (ver abajo) |
| `identifier` | Sí | ID único a nivel de empresa |
| `label` | Sí | La etiqueta visible |
| `help` | No | Texto de ayuda secundario |
| `required` | No | Por defecto `false` |
| `isReadOnly` | No | Por defecto `false` |

### Identificadores: la regla a internalizar

El `identifier` de una pregunta debe ser **único en toda la empresa**, no solo dentro de esta encuesta. La convención que te mantiene fuera de problemas es **prefijar cada identifier con el código de la encuesta**:

```yaml
# BIEN — prefijado, no colisiona
identifier: re_nombre

# MAL — genérico, colisionará con otras encuestas
identifier: nombre
```

Algunas palabras están reservadas y no pueden usarse como identifiers: `survey`, `user`, `channel`, `_id`, `UUID`, `target`, `properties`.

### Tipos de pregunta

Cotalker ofrece un conjunto rico de tipos de pregunta. Acá está el catálogo — elegí el que coincida con el dato que estás capturando:

| Tipo | Para |
|---|---|
| `text` | Texto estático, títulos, separadores |
| `textinput` | Texto libre |
| `textnumber` | Números, enteros, ratings |
| `listquestion` | Selección única/múltiple (radio/checkbox) |
| `property` | Seleccionar desde una propiedad del modelo de datos |
| `person` | Seleccionar una persona |
| `api` | Seleccionar desde una API externa |
| `datetime` | Fecha y hora |
| `gps` | Una ubicación |
| `image` | Una foto o imagen |
| `file` | Un archivo adjunto |
| `signature` | Una firma digital |
| `survey` | Una subencuesta embebida |

Un par de tipos tienen subcampos requeridos que conviene recordar: `listquestion` necesita una lista `options` no vacía, y `property` necesita un bloque `filters`:

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

## Editar encuestas con seguridad

Como [`apply`](../commands/apply.md) matchea las preguntas por `identifier` en vez de por posición, podés agregar, editar, quitar y reordenar preguntas libremente — los IDs se preservan. Quitar una pregunta la desactiva (no se borra definitivamente), y se te pedirá confirmar. Si aplicás un YAML de encuesta sin su sección `questions`, las preguntas existentes quedan intactas.

## Un consejo práctico

La forma más rápida de aprender la estructura completa es exportar una encuesta real y leerla:

```bash
cotctl surveys export <some_survey> -c acme -o example.yaml
```

## Ver también

- [apply](../commands/apply.md) — cómo se crean y actualizan las encuestas
- [Exportar e importar](../commands/export-import.md) — las opciones de exportación, incluyendo `--extract-scripts`
- [Workflows](./workflows.md) — las encuestas son referenciadas por las transiciones de workflow
