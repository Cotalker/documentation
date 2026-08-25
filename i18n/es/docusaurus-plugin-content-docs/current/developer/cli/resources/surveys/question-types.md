---
title: Tipos de pregunta de formulario
sidebar_label: Tipos de pregunta
displayed_sidebar: developer
---

<!-- source: repositories/cotctl/src/transformers/simplified.transformer.ts, src/schemas/survey.schema.ts, docs/surveys/question-types/*.md @ 4f7248a (2026-07-06) -->

Cotalker ofrece 13 tipos de pregunta. Toda pregunta comparte los [campos comunes](../surveys.md#preguntas) — `type`, `identifier`, `label` y los opcionales `help`, `required`, `isReadOnly`, `conditionalDisplay`, `exec`. Esta página cubre lo *específico* de cada tipo: los campos extra que necesita y los detalles que conviene conocer antes de crear uno.

Todos los fragmentos usan el formato **simplificado** de `cotctl` — la forma `type:` que escribes en una lista `questions[]`. `cotctl` la traduce a la representación interna de la plataforma al aplicar.

## Texto e input

### `text` — texto estático

Renderiza un bloque de contenido — un título, una instrucción, un separador. No captura respuesta.

```yaml
- type: text
  identifier: re_titulo
  label: "# Employee Registration"
```

El `label` es el contenido visible y se renderiza como Markdown (GitHub-flavored, con HTML permitido). Úsalo para encabezados y divisores.

### `textinput` — texto libre

```yaml
- type: textinput
  identifier: re_nombre
  label: "Full name"
  min: 0          # largo mínimo (por defecto 0)
  max: 5000       # largo máximo (por defecto 5000)
```

Usa `subtype: long_text` para un cuadro multilínea.

### `textnumber` — números

```yaml
- type: textnumber
  identifier: re_edad
  label: "Age"
  min: 18         # valor mínimo aceptado
  max: 99         # valor máximo aceptado
```

`min`/`max` acotan el *valor* ingresado (no un largo). Usa `subtype: rating` para renderizar una calificación con estrellas en vez de un campo numérico.

## Selección

### `listquestion` — selección única o múltiple

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

`options` es requerido, con al menos una entrada `{label, value}`. Por defecto es de selección única (`min: 0`, `max: 1`); sube `max` por encima de 1 para permitir múltiples selecciones. Mantén estables los `value` — son la forma en que se guardan las respuestas, y otras preguntas pueden basar su visibilidad condicional en ellos.

### `property` — elegir una Property

Permite al usuario elegir desde una [Property](../../data-models.md#property) de Cotalker de un tipo dado.

```yaml
- type: property
  identifier: re_area
  label: "Area"
  filters:
    - propertyType: area      # code del PropertyType
      subfilter: "*"          # "*" = cualquier property de ese tipo
```

`filters` es requerido (al menos una entrada). Agrega `tree: true` para un selector jerárquico de árbol, o `creation: true` para permitir al usuario crear una nueva property inline. Para acotar las opciones, reemplaza `subfilter: "*"` por un subfiltro real y fija `subfilterValue`.

### `person` — elegir un usuario

```yaml
- type: person
  identifier: re_supervisor
  label: "Supervisor"
  personFilter:
    allow: job          # todos (cualquier cargo)
```

`personFilter.allow` controla quién es seleccionable:

| `allow` | Usuarios seleccionables |
|---|---|
| `job` | Cualquiera |
| `jobTitle` | Solo usuarios con uno de los `jobs: [ ... ]` (codes de JobTitle) |
| `hierarchy.subordinates` | Los subordinados de quien responde |
| `hierarchy.boss` | El jefe de quien responde |
| `hierarchy.peers` | Los pares de quien responde |

Para `jobTitle`, agrega una lista `jobs`:

```yaml
  personFilter:
    allow: jobTitle
    jobs: ["supervisor_ventas"]
```

### `api` — opciones desde un endpoint externo

```yaml
- type: api
  identifier: re_ciudad
  label: "City"
  source: url                       # "url" o "cotalker"
  url: "https://api.example.com/cities"
  method: POST                      # GET o POST (por defecto POST)
  identifiers: ["re_area"]          # otras respuestas enviadas como parámetros de filtro
```

`source` y `url` son ambos requeridos y no pueden ir vacíos. `identifiers` lista otras preguntas del mismo formulario cuyas respuestas actuales se envían al endpoint como filtros — omítelo (o usa `[]`) para no enviar ninguna. Usa `source: cotalker` para endpoints internos de Cotalker.

## Fecha, ubicación, multimedia

### `datetime` — fecha y/u hora

```yaml
- type: datetime
  identifier: re_ingreso
  label: "Start date"
  dateMode: date            # "date" o "date_time"
  timezone: America/Santiago  # opcional, nombre IANA
```

`dateMode: date` captura solo una fecha; `date_time` agrega un selector de hora.

### `gps` — una ubicación

```yaml
- type: gps
  identifier: re_ubicacion
  label: "Location"
  locationType: currentLocation   # opcional, por defecto currentLocation
```

### `image` — fotos

```yaml
- type: image
  identifier: re_foto
  label: "Evidence photo"
  min: 1      # cantidad mínima de imágenes (por defecto 1)
  max: 100    # cantidad máxima (por defecto 100)
```

### `file` — adjuntos de archivo

```yaml
- type: file
  identifier: re_documento
  label: "Attached document"
  allowAllFileTypes: false
  allowedTypes: ["pdf", "ms/word"]   # codes de la allowlist del backend, NO tipos MIME
```

<div className="alert alert--secondary">

**Los tipos de archivo son codes de la allowlist de Cotalker, no tipos MIME.** Usa `pdf`, `ms/word`, `ms/excel`, `ms/ppt`, `ms/*`, `text/plain`, `text/md`, `image/*`, `video/*`, `cot/notes` o `*`. Escribir `application/pdf` no funcionará — el code es `pdf`. Omite `allowedTypes` (o deja `allowAllFileTypes` en su valor por defecto) para aceptar cualquier archivo. Usa `fileType: note` para adjuntar una nota de Cotalker en vez de un archivo.

</div>

### `signature` — una firma digital

```yaml
- type: signature
  identifier: re_firma
  label: "Approval signature"
  required: true
```

Renderiza un pad de firma para una firma trazada a mano.

## Composición

### `survey` — incrustar un subformulario

Anida otro formulario dentro de este.

```yaml
- type: survey
  identifier: re_eval_sub
  label: "Supplier evaluation"
  surveyCode: eval_proveedor    # code del formulario a incrustar
  embedded: false               # true lo abre inline
```

<div className="alert alert--primary">

**Aplica primero la hija.** `surveyCode` debe coincidir exactamente (sin distinguir mayúsculas) con el `code` de un formulario existente. Si el formulario referenciado aún no existe, `apply` falla con *"Referenced survey ... not found. Apply the child survey first."*. `cotctl` resuelve el code a un ID al aplicar y de vuelta al code al exportar, así que tu YAML sigue siendo portable.

</div>

## Ver también

- [Formularios](../surveys.md) — la página de inicio y los campos raíz
- [Lógica y validación](./logic-and-validation.md) — visibilidad condicional basada en respuestas de `listquestion`
- [Ejemplo completo](./complete-example.md) — varios tipos en un formulario funcional
