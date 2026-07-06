---
title: 'Bots de workflow: extracción de datos y parcheo'
sidebar_label: Extracción de datos y parcheo
displayed_sidebar: developer
---

<!-- source: repositories/cotctl/docs/workflows/bots/jp-*.md, st-*.md @ 4f7248a (2026-07-06) -->

Esta familia cubre dos tipos de herramientas de datos de bajo nivel:

- **`JP*` — JSON Patch crudo (RFC 6902)** sobre un canal, propiedad o usuario. Aceptan *cualquier* operación sobre *cualquier* ruta, sin lista blanca. Son potentes pero filosos: para ediciones cotidianas prefiere los equivalentes `PB*` (`PBUpdateChannel`, `PBUpdateProperty`, `PBUpdateUser`), que validan y son más fáciles de leer.
- **`ST*` — herramientas de encuesta** que leen una respuesta y producen un string con formato. Útiles para armar etiquetas de despliegue y formatear fechas a partir de respuestas.

Todos los bots `JP*` llaman a su endpoint de parche con `admin: 'true'` y comparten las mismas dos ramas: `DEFAULT` al éxito, `ERROR` ante falla de API. Ten en cuenta que una falla de parche *no lanza excepción*: solo devuelve `ERROR` sin más detalle.

## JPChannel

JSON Patch RFC 6902 sobre un canal. Cualquier operación (`add`/`remove`/`replace`/`move`/`copy`) sobre cualquier ruta.

Parámetros clave: `channelId`, `body` (arreglo de `{ op, path, value?, from? }`).

```yaml
- key: s1
  name: JPChannel
  data:
    channelId: "{{task.channel}}"
    body:
      - op: "add"
        path: "/propertyIds/-"
        value: "5d2fd97cb448357a12fe59ac"
  next:
    DEFAULT: ""
    ERROR: ""
```

Por comodidad antes que flexibilidad, usa `PBUpdateChannel` (reemplaza listas por completo).

## JPProperty

JSON Patch RFC 6902 sobre una propiedad. Sin lista blanca de rutas.

Parámetros clave: `propertyId`, `body`.

```yaml
- key: s1
  name: JPProperty
  data:
    propertyId: "5d2fd97cb448357a12fe59ac"
    body:
      - op: "add"
        path: "/subproperty/-"
        value: "5e7548ae1d8897202c6668b7"
  next:
    DEFAULT: ""
    ERROR: ""
```

`PBUpdateProperty` (3.0.0) es la alternativa más segura, con lista blanca para `/display`, `/schemaInstance`, `/subproperty`.

## JPUser

JSON Patch RFC 6902 sobre un usuario. Cualquier operación sobre cualquier ruta.

Parámetros clave: `userId`, `body`.

```yaml
- key: s1
  name: JPUser
  data:
    userId: "{{user._id}}"
    body:
      - op: "add"
        path: "/accessRoles/-"
        value: "5d2fd97cb448357a12fe59ac"
  next:
    DEFAULT: ""
    ERROR: ""
```

Para una alternativa validada a nivel de campo usa `PBUpdateUser`.

## STDatetimeString

Formatea una respuesta de fecha/hora (o un epoch `dateNumber` crudo) como string según `dateFormat`, `timeFormat` y `dateSeparator`. Siempre devuelve `DEFAULT` (los errores devuelven `{}` por callback).

Parámetros clave: `answer` + `identifier` (para una pregunta `+datetime`) O `dateNumber` (epoch en ms como string); `dateFormat` (`yyyy/mm/dd` por defecto, `dd/mm/yyyy`, `mm/dd/yyyy`, `dd/mm/yy`, `mm/dd/yy`, `D-ESmonthWord`); `timeFormat` (`null` por defecto, `military`, `ampm`); `dateSeparator` (`-` por defecto, `/`).

```yaml
- key: s1
  name: STDatetimeString
  data:
    answer: "{{answer._id}}"
    identifier: "due_date"
    dateFormat: "dd/mm/yyyy"
    dateSeparator: "/"
    timeFormat: "military"
  next:
    DEFAULT: ""
```

Detalles a cuidar:

- Usa `dateSeparator` (las anotaciones antiguas lo escriben mal como `dateSepator`, pero el runtime lee `dateSeparator`).
- Bug conocido para `dd/mm/yyyy`: la implementación arma `${dateNumber}${sep}${dateNumber}${sep}${fullYear}` (día repetido). Verifica la salida antes de confiar en ella.
- Para respuestas `+datetime`, el valor se lee de `data.process[0]` como string epoch.

## STPropertyNames

Dada una respuesta `+property`, obtiene cada propiedad seleccionada y devuelve su `name.display` (por defecto) o `name.code`. Siempre devuelve `DEFAULT`.

Parámetros clave: `answer`, `identifier` (una pregunta `+property`), `mode` (`display` por defecto, `code`), `asStringSeparatedBy` (opcional; también devuelve un `resultString` unido).

```yaml
- key: s1
  name: STPropertyNames
  data:
    answer: "{{answer._id}}"
    identifier: "category_selector"
    mode: "display"
    asStringSeparatedBy: ", "
  next:
    DEFAULT: ""
```

Detalles a cuidar:

- Rechaza si el `contentType` de la pregunta no es `application/vnd.cotalker.survey+property`.
- Para composiciones que combinan varios campos por propiedad, usa `STPropertyStrComposer`.

## STPropertyStrComposer

Por cada `COTProperty` ya cargado, recorre un `commandArray` y arma un string agregando texto literal o campos de la propiedad (vía accesores `%<path>`). Devuelve el arreglo y, opcionalmente, un string unido. Siempre devuelve `DEFAULT`.

Parámetros clave: `properties` (arreglo de objetos `COTProperty` ya cargados: el bot **no** los obtiene), `commandArray` (strings de comando), `joinBy` (unificador opcional), `printDebug` (opcional).

Reglas de comandos: todo lo que no empiece con `%` se agrega literalmente; `%<path>` recorre la propiedad con `.split('.')` (por ej. `%name.display`, `%extra.taxId`) y agrega el valor resuelto.

```yaml
- key: s1
  name: STPropertyStrComposer
  data:
    properties: "{{stages.s_load.properties}}"
    commandArray:
      - "%name.display"
      - " ("
      - "%name.code"
      - ")"
    joinBy: ", "
  next:
    DEFAULT: ""
```

Detalles a cuidar:

- `properties` debe contener objetos ya cargados: cárgalos en una etapa previa.
- Una ruta inexistente/indefinida resuelve al string literal `"undefined"` (el accesor usa `String(path)`).
