---
title: 'Bots de workflow: datos e integraciones'
sidebar_label: 'Acciones: datos e integraciones'
displayed_sidebar: developer
---

<!-- source: repositories/cotctl/docs/workflows/bots/pb-create-property.md, pb-update-property.md, pb-create-user.md, pb-update-user.md, pb-switch-list.md, pb-conditional.md, pb-calendar.md, pb-google-calendar.md, pb-pdf.md, pb-pdf-extractor.md, pb-report.md, pb-sheet.md, pb-giphy.md, pb-qr-code.md, pb-payments.md, pb-llm-runner.md @ 4f7248a (2026-07-06) -->

El resto del catálogo `PB*`: crear y modificar **propiedades y usuarios**, pequeños **helpers de enrutamiento** y un conjunto de bots de **integración** que salen a servicios externos (renderizado y extracción de PDF, planillas, calendarios, pagos, Giphy, códigos QR y un runner de LLM). La mayoría comparte la convención `SUCCESS`/`ERROR`; las excepciones se indican por bot.

Dos bots aquí **no tienen versión `default`** y exigen un `version:` explícito: `PBCalendar` (`2.0.0`) y `PBReport` (`1.0.0`).

## PBCreateProperty

Crea una propiedad. `display` y `code` se envuelven en un objeto `name.{display, code}`.

Parámetros clave: `display`, `code`, `propertyType`; opcionalmente `subproperty` (arreglo de ObjectIds de propiedad), `schemaInstance` (objeto arbitrario).

```yaml
- key: s1
  name: PBCreateProperty
  version: "2.0.0"
  data:
    display: "Acme Corp"
    code: "acme-corp"
    propertyType: "5d2fd97cb448357a12fe59ac"
    schemaInstance:
      taxId: "12.345.678-9"
  next:
    SUCCESS: ""
    ERROR: ""
```

Si `display`/`code` son arreglos, solo se usa el primer ítem; `subproperty` se aplana y deduplica.

## PBUpdateProperty

JSON-Parchea una propiedad, restringido a una lista blanca de rutas (`/display`, `/schemaInstance`, `/subproperty`) y operaciones (`add`, `replace`). La alternativa más segura a `JPProperty`.

Parámetros clave: `propertyId`, `body` (arreglo de `{ op, path, value }`; cada ruta a lo sumo una vez).

```yaml
- key: s1
  name: PBUpdateProperty
  version: "3.0.0"
  data:
    propertyId: "5d2fd97cb448357a12fe59ac"
    body:
      - op: "replace"
        path: "/display"
        value: "Acme S.A. (renamed)"
  next:
    SUCCESS: ""
    ERROR: ""
```

Formas de valor: `/display` → string, `/schemaInstance` → objeto, `/subproperty` → arreglo de strings. Para parches sin restricción usa `JPProperty`.

## PBCreateUser

Crea (invita) un usuario. Los campos de propiedad y access-role aceptan tanto ObjectIds como strings de código/nombre.

Parámetros clave: `email`, `phone`, `names`, `lastName`, `jobTitle` (todos obligatorios); opcionalmente `secondLastName`, `accessRoles` (**nombres** de AccessRole), `properties` (ObjectIds de propiedad o strings `name.code`), `extensions`.

```yaml
- key: s1
  name: PBCreateUser
  version: "2.0.0"
  data:
    email: "supplier@example.com"
    phone: "+56999999999"
    names: "Alice"
    lastName: "Smith"
    jobTitle: "supplier"
    accessRoles: ["external-supplier"]
    properties: ["acme-corp"]
  next:
    SUCCESS: ""
    ERROR: ""
```

`accessRoles` se emparejan por `.name` (sensible a mayúsculas). Si cada entrada de `properties` es un ObjectId válido, pasan directo; en caso contrario se resuelven por `name.code`.

## PBUpdateUser

Modifica un conjunto pequeño de campos de usuario.

Parámetros clave: `userId` (obligatorio); opcionalmente `jobTitle`, `properties` (**reemplaza** la lista), `accessRoles` (**reemplaza** la lista), `isActive`, `extensions`.

```yaml
- key: s1
  name: PBUpdateUser
  version: "2.0.0"
  data:
    userId: "{{user._id}}"
    isActive: false
  next:
    SUCCESS: ""
    ERROR: ""
```

`properties` y `accessRoles` reemplazan, no agregan. Para parches RFC 6902 granulares usa `JPUser`.

## PBSwitchList

Enruta según el arreglo `process` de una respuesta `+list`, tomando `process[0]` como la clave `next`. (Sin anotación `@botdoc:general`: parámetros inferidos del código.)

Parámetros clave: `data` (un objeto `COTAnswerData` cuyo `process: string[]` contiene los códigos seleccionados).

Ramas: `__NONE__` (selección vacía), o una clave dinámica que coincida con `process[0]`.

```yaml
- key: s1
  name: PBSwitchList
  data:
    data: "{{answer.statusList}}"   # COTAnswerData
  next:
    __NONE__: s_nothing_selected
    approved: s_approve_flow
    rejected: s_reject_flow
    on_hold: s_hold_flow
```

Las claves en `next` deben coincidir exactamente con los valores `code[]` de la pregunta; un `process[0]` sin coincidencia deja al motor sin etapa siguiente. Declara cada código posible.

## PBConditional

Convierte `condition` a booleano y enruta a `TRUE` o `FALSE`. Una compuerta liviana en línea.

Parámetros clave: `condition` (cualquier valor; decide `!!condition`).

```yaml
- key: s1
  name: PBConditional
  data:
    condition: "{{answer.approved}}"
  next:
    TRUE: s_continue
    FALSE: ""
```

`TRUE` y `FALSE` deben estar ambos presentes en `next`. Para comparaciones más ricas (`==`, `>`, `<`), usa `FCIfElse`.

## PBCalendar

Envía un correo con una invitación `.ics` adjunta para que los destinatarios agreguen una reunión a su calendario. **No tiene versión `default`: especifica `2.0.0`.**

Parámetros clave: `title`, `initialDate` (COTDate), `durationMinutes` (≥ 1), `owner`; opcionalmente `description`, `invitedById` (ObjectIds de usuario), `invitedByEmail` (correos crudos — **pasa `[]` aunque no lo uses**).

Ramas: `DEFAULT` (los errores lanzan `EventError` en vez de ramificar).

```yaml
- key: s1
  name: PBCalendar
  version: "2.0.0"
  data:
    title: "Kickoff with {{user.names}}"
    description: "Discuss the new project requirements"
    initialDate: "{{startsAt}}"
    durationMinutes: 30
    owner: "{{user._id}}"
    invitedById:
      - "{{task.assignee}}"
    invitedByEmail: []
  next:
    DEFAULT: ""
```

Detalle a cuidar: la implementación llama `.map()` sobre `invitedByEmail` sin condición, así que omitir `invitedByEmail` rompe el bot. Pasa siempre un arreglo (aunque vacío).

## PBGoogleCalendar

Crea un evento de Google Calendar vía una cuenta de servicio con delegación a nivel de dominio, suplantando al `organizer`.

Parámetros clave: `title`, `location`, `description`, `initialDate` (ISO), `organizer` (debe tener un correo en el dominio GSuite de la empresa); `endDate` **o** `endMinutes`; opcionalmente `timeZone` (default `America/Santiago`), `invitedById`, `invitedByEmail`.

```yaml
- key: s1
  name: PBGoogleCalendar
  version: "2.0.0"
  data:
    title: "Kickoff"
    location: "Remote"
    description: "PO {{task._id}}"
    initialDate: "{{startsAt}}"
    endMinutes: 30
    organizer: "{{user._id}}"
    invitedById:
      - "{{task.assignee}}"
  next:
    SUCCESS: ""
    ERROR: ""
```

Requiere variables de entorno por empresa (`GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL__<SUBDOMAIN>` / `..._PRIVATE_KEY__<SUBDOMAIN>`) y delegación a nivel de dominio. El recordatorio está fijado a un popup 10 minutos antes.

## PBPdf

Sube HTML (un archivo local en el FS del workflow) o una URL al servicio de PDF de Cotalker, sondea hasta procesar y devuelve el `COTFile` resultante.

Parámetros clave: `localFile` **o** `url` (mutuamente excluyentes; `url` debe coincidir con la lista blanca del bot), `context` (`{ channel, group }`, obligatorio para almacenamiento); opcionalmente `disableAutoHeaders`, `headers`, `defaultAuth`, `fileName`.

```yaml
- key: s_pdf
  name: PBPdf
  version: "4.0.0"
  data:
    localFile: "{{stages.s_html.filePath}}"   # de PBTemplate
    fileName: "po-{{task._id}}.pdf"
    context:
      channel: "{{task.channel}}"
      group: "{{task.taskGroup}}"
  next:
    SUCCESS: ""
    ERROR: ""
```

Detalles a cuidar:

- `url` se valida contra una lista blanca de patrones de URI; las URLs que no coinciden se rechazan.
- El sondeo hasta que el archivo esté `uploaded` (con las tres URLs de imagen) puede tardar varios segundos.
- Combínalo con `PBTemplate` para renderizar el HTML primero (ver [Mensajería y formularios](./actions-messaging-and-surveys.md#pbtemplate)).

## PBPDFExtractor

Descarga un PDF (fusionando ZIPs de varios archivos), lo envía a la API Adobe PDF Extract y devuelve tablas parseadas y `structuredData.json`. **Bloqueado por código de contrato — pago por uso.**

Parámetros clave: `contractCode` (debe ser igual a `contract-addendum-pdf-extractor-6580129519321951`), `url`; opcionalmente `csv` (devuelve las tablas como CSV crudo en vez de JSON).

Ramas: `DEFAULT`, `ERROR`.

```yaml
- key: s1
  name: PBPDFExtractor
  data:
    contractCode: "contract-addendum-pdf-extractor-6580129519321951"
    url: "https://files.example.com/invoice.pdf"
    csv: false
  next:
    DEFAULT: ""
    ERROR: ""
```

`checkData` rechaza cualquier otro `contractCode` — habla con tu representante de Cotalker para activarlo. `result.data` es el `structuredData.json` de Adobe.

## PBReport

Carga una respuesta por uuid y renderiza el HTML `COTReport` por defecto para ella. **No tiene versión `default`: especifica `1.0.0`.**

Parámetros clave: `answerUUID`.

```yaml
- key: s1
  name: PBReport
  version: "1.0.0"
  data:
    answerUUID: "{{answer.uuid}}"
  next:
    SUCCESS: ""
    ERROR: ""
```

Usa la plantilla por defecto de `@cotalker/lib-report`; `result.html` contiene la salida. Para personalizar el aspecto, post-procesa con `PBTemplate`.

## PBSheet

Descarga un CSV/XLSX/XLS desde `url`, parsea la primera hoja con sheetjs y devuelve las filas como arreglo de objetos.

Parámetros clave: `url`; opcionalmente `csv_iso_date` (parsea celdas como fechas).

```yaml
- key: s1
  name: PBSheet
  version: "1.0.0"
  data:
    url: "https://files.example.com/roster.xlsx"
    csv_iso_date: false
  next:
    SUCCESS: ""
    ERROR: ""
```

Solo se parsea la **primera** hoja. Los valores no se convierten (`{ raw: true }`); `result.data` contiene las filas.

## PBGiphy

Busca en Giphy (o obtiene un id exacto) y publica el GIF como mensaje `image/gif` en un canal.

Parámetros clave: `search` (arreglo no vacío de términos, unidos con `+`; un único elemento `id:<giphyId>` obtiene ese GIF exacto), `channel`; opcionalmente `sentBy` (por defecto `meta.user`).

Ramas: `DEFAULT` (los errores lanzan `EventError`).

```yaml
- key: s1
  name: PBGiphy
  data:
    search: ["congratulations"]
    channel: "{{task.channel}}"
  next:
    DEFAULT: ""
```

Usa la clasificación `g` de Giphy y `limit=1`; la clave de API está fijada en el código.

## PBQRCode

Envuelve el paquete `qrcode` y devuelve una data URL PNG.

Parámetros clave: `qrcode` (el string a codificar).

```yaml
- key: s1
  name: PBQRCode
  version: "2.0.0"
  data:
    qrcode: "https://app.cotalker.com/tasks/{{task._id}}"
  next:
    SUCCESS: ""
    ERROR: ""
```

Devuelve una sola data URL PNG en `result.image` — sin exportación SVG/EPS y sin personalización de tamaño en este bot.

## PBPayments

Crea una orden de pago Transbank y devuelve la URL de redirección del comprador. **Crea una orden de pago real en producción — prueba con `development: true` primero.**

Parámetros clave (todos obligatorios salvo indicación): `type` (`mall`/`normal`), `service`, `paymentMethod`, `amount`, `currency`, `buyerName`, `buyerEmail`, `buyerNationalId`, `sellerName`, `sellerEmail`, `sellerNationalId`, `webhook`, `development`; opcionalmente `meta`, `emails`.

```yaml
- key: s1
  name: PBPayments
  version: "2.0.0"
  data:
    type: "normal"
    service: "webpay-plus"
    paymentMethod: "WEBPAY"
    amount: 25000
    currency: "CLP"
    buyerName: "{{user.names}} {{user.lastName}}"
    buyerEmail: "{{user.email}}"
    buyerNationalId: "12345678-9"
    sellerName: "Acme S.A."
    sellerEmail: "billing@acme.cl"
    sellerNationalId: "76123456-7"
    webhook: "https://example.com/webhooks/transbank"
    development: false
  next:
    SUCCESS: ""
    ERROR: ""
```

`development` es el único interruptor entre hosts de dev y prod (ambos fijados en el código). `result` contiene `{ status, redirect }`.

## PBLLMRunner

Invoca el Lambda `llm-runner` para correr una consulta a Vertex AI / Gemini, con herramientas de servidor MCP y adjuntos opcionales. Todos los parámetros soportan resolución COTLang.

Parámetros clave: `systemPrompt`, `messages` (arreglo de `{ role, content }`, mínimo 1); opcionalmente `model` (default `gemini-2.5-flash`), `maxSteps` (1–50, default 5), `temperature` (0–2, default 1), `maxTokens`, `files` (`{ url, mediaType, filename? }`), `mcpServers` (`{ name, url, headers?, timeout?, useCotalkerAuth? }`).

```yaml
- key: s1
  name: PBLLMRunner
  version: "1.0.0"
  data:
    systemPrompt: "Use the docs MCP server to find relevant articles."
    messages:
      - role: "user"
        content: "What is a taskGroup?"
    model: "gemini-2.5-pro"
    maxSteps: 10
    mcpServers:
      - name: "cotalker-docs"
        url: "https://rag.example.com/mcp"
        useCotalkerAuth: true
  next:
    SUCCESS: ""
    ERROR: ""
```

Detalles a cuidar:

- `useCotalkerAuth: true` inyecta un token interno de Cotalker solo en la cabecera `Authorization` de ese servidor.
- El resultado expone `data.text`, `data.toolCalls`, `data.usage` y el estado de conexión MCP. Los errores a nivel del modelo fijan `result.error` y enrutan a `ERROR`.
