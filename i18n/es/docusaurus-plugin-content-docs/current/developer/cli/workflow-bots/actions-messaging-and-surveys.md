---
title: 'Bots de workflow: mensajería y encuestas'
sidebar_label: 'Acciones: mensajería y encuestas'
displayed_sidebar: developer
---

<!-- source: repositories/cotctl/docs/workflows/bots/pb-message.md, pb-bulk-message.md, pb-email.md, pb-send-custom-notification.md, pb-whats-app.md, pb-send-survey.md, pb-copy-survey.md, pb-editable-survey.md, pb-answer-checker.md, pb-action-button.md, pb-template.md @ 4f7248a (2026-07-06) -->

Estos bots `PB*` son la forma en que un workflow **habla** —con canales, bandejas de entrada, teléfonos— y cómo envía, reabre e inspecciona encuestas. La mayoría comparte la convención `SUCCESS`/`ERROR`; las excepciones se señalan por bot.

Recordatorio rápido de enrutamiento: `PBMessage` publica en un canal, `PBSendCustomNotification` envía un **push** móvil (más un mensaje de canal opcional), `PBEmail` envía correo y `PBWhatsApp` envía una plantilla de WhatsApp. Para muchos destinatarios, `PBBulkMessage` supera a un bucle de `PBMessage`.

## PBMessage

Envía un mensaje a uno o más canales (uno por canal, en serie). Soporta traducciones. La versión `2.2.0` agrega tracking de rendimiento.

Parámetros clave: `content`, `contentType` (`text/plain`, `text/system`, …), `sentBy`, `channelIds` (arreglo no vacío); opcionalmente `joinContentBy`, `contentTranslations` (`{ en?, es?, pt?, fr? }`).

```yaml
- key: s1
  name: PBMessage
  version: "2.2.0"
  data:
    content: "The task was updated by {{user.names}}"
    contentType: "text/plain"
    sentBy: "{{user._id}}"
    channelIds:
      - "{{task.channel}}"
  next:
    SUCCESS: ""
    ERROR: ""
```

Detalles a cuidar:

- Los canales se procesan en serie; una falla detiene la corrida y emite `ERROR`.
- Con `contentTranslations`, `text/plain` pasa a `multilanguage/plain` (y `text/system` → `multilanguage/system`). Solo se permiten `en`/`es`/`pt`/`fr`: cualquier otra clave lanza excepción.
- Para difundir a muchos canales, prefiere `PBBulkMessage`.

## PBBulkMessage

La versión masiva de `PBMessage`: una llamada por lotes para muchos canales (~90% menos idas y vueltas). Suele encadenarse tras `PBBulkTaskUpdate` dentro de un `FCEachBulk`.

Parámetros clave: `updatedTaskBatch` (arreglo no vacío de objetos de tarea, cada uno con un `channel`; usualmente de `PBBulkTaskUpdate`), `messageContent`; opcionalmente `contentType` (default `text/system`), `context`, `messageOptions`, `batchSize`, `continueOnError`.

Ramas: `SUCCESS` (algunos/todos entregados), `ERROR` (todos fallaron **y** `continueOnError !== true`).

```yaml
- key: s1
  name: PBBulkMessage
  data:
    updatedTaskBatch: "{{stages.updatedTaskBatch}}"   # producido por PBBulkTaskUpdate
    messageContent: "Task batch processed"
    contentType: "text/system"
    batchSize: 10
    continueOnError: true
  next:
    SUCCESS: ""
    ERROR: ""
```

Este bot **no** itera por sí mismo: espera un `updatedTaskBatch` ya resuelto. Los resultados se exponen en `externalData.bulkMessageResults`.

## PBEmail

Renderiza una plantilla HTML con `content` y la envía vía `EmailV2`. Soporta adjuntos descargados desde URLs.

Parámetros clave: `subject`, `content` (objeto pasado a la plantilla), `targets` (correos destinatarios); opcionalmente `from` (default `no-responder@cotalker.com`), `attachments` (URLs de archivo), `cc`, `bcc`, `htmlTemplate`, `cssTemplate`, `singleRecipient`.

```yaml
- key: s1
  name: PBEmail
  version: "3.0.1"
  data:
    subject: "Your PO has been received"
    content:
      poId: "{{task._id}}"
      name: "{{user.names}}"
    targets:
      - "{{user.email}}"
  next:
    SUCCESS: ""
    ERROR: ""
```

Detalles a cuidar:

- Todas las direcciones se validan: una sola inválida rechaza la llamada completa.
- `singleRecipient: true` envía un correo por destinatario (más lento, pero más seguro para semántica de baja de suscripción).
- cotctl fija `dryRun: true`, que omite el envío SMTP real pero igual corre la validación.

## PBSendCustomNotification

Envía una notificación **push** móvil Y un mensaje de canal `text/system`. El canal se referencia directo (`channelId`) o se resuelve desde una tarea (`taskId` + `taskGroupId`).

Parámetros clave: `content`; `channelId` **o** `taskId` (mutuamente excluyentes; `taskId` requiere `taskGroupId`); opcionalmente `userIds` (restringe el push; vacío = todos los miembros), `quietPushNotification`, `quietChannelNotification`.

```yaml
- key: s1
  name: PBSendCustomNotification
  data:
    content: "Task {{task.name}} was updated"
    taskId: "{{task._id}}"
    taskGroupId: "{{task.taskGroup}}"
  next:
    SUCCESS: ""
    ERROR: ""
```

Detalles a cuidar:

- El usuario `sentBy` depende de la fuente: para `channelId` es el primer usuario en `channel.userIds`; para `taskId` es el `taskGroup.botUser`.
- `userIds` se filtra a usuarios activos antes del push.
- Usa `quietChannelNotification: true` para solo-push, o `quietPushNotification: true` para solo-mensaje-de-canal.

## PBWhatsApp

Envía un mensaje de WhatsApp con plantilla vía Twilio. El teléfono debe ser un número internacional completo.

Parámetros clave: `contractCode` (debe ser exactamente el valor bloqueado `contract-addendum-whatsapp-6580129519321951`), `phoneNumber` (por ej. `+56912345678`), `template` (solo `default` implementado), `language` (`en`/`es`), `name`, `first`, `second`.

Ramas: solo `DEFAULT` (Twilio respondió; revisa `result.status` más adelante).

```yaml
- key: s1
  name: PBWhatsApp
  data:
    contractCode: "contract-addendum-whatsapp-6580129519321951"
    phoneNumber: "+56912345678"
    template: "default"
    language: "es"
    name: "Alice"
    first: "PO-12345"
    second: "Aprobada"
  next:
    DEFAULT: ""
```

Detalles a cuidar:

- `contractCode` debe ser exactamente el valor bloqueado: cualquier otro lanza excepción.
- Requiere las variables de entorno `TWILIO_ACCOUNT_SID` y `TWILIO_AUTH_TOKEN`; el teléfono remitente está fijado al número de negocio de Cotalker.
- El bot **no** ramifica ante errores de Twilio: revisa `result.status === 'error'` en la etapa siguiente.

## PBSendSurvey

Envía una encuesta a un canal en modo borrador (`editMode: true`, el default) o enviado. Soporta respuestas precargadas y sub-encuestas.

Parámetros clave: `recipientId`, `taskGroupId`; `surveyId` **o** `surveyCode`; `channelId` **o** `taskId`; opcionalmente `senderId`, `editMode`, `prefilled`, `meta`.

```yaml
- key: s1
  name: PBSendSurvey
  version: "3.0.0"
  data:
    surveyId: "00000000aaaaaaaaaaaaaaaa"
    taskGroupId: "{{task.taskGroup}}"
    taskId: "{{task._id}}"
    recipientId: "{{user._id}}"
    editMode: true
  next:
    SUCCESS: ""
    ERROR: ""
```

`prefilled` se indexa por el `identifier` de la pregunta; la forma del valor depende del tipo de pregunta y se valida en runtime (un desajuste enruta a `ERROR`, típicamente `'<identifier>' must be a string`):

| Tipo de pregunta | Valor esperado |
|---|---|
| `textinput` | string plano — **no** un arreglo |
| `textnumber` | string numérico |
| `listquestion` | arreglo de códigos de opción |
| `property` | arreglo de IDs de propiedad |
| `person` | arreglo de IDs de usuario |
| `datetime` | arreglo `[date, time]` |

Detalles a cuidar:

- cotctl resuelve `surveyTriggers[].survey` (un código) a un ObjectId, pero **no** `stage.data.surveyId`: pasa allí un ObjectId real.
- Cuando se usa `taskId`, el bot apunta a `task.channel`.

## PBCopySurvey

Lee todos los mensajes de una instancia de encuesta en un canal origen y los reenvía a un canal destino, remapeando los ids de formulario (y, opcionalmente, generando un uuid de respuesta nuevo). Se usa para clonar una encuesta en un canal recién creado.

Parámetros clave: `formId` (el `form.id` compartido por los mensajes origen), `formChannel`, `targetChannel`; opcionalmente `sentBy`, `createNewAnswer`, `editMode` (default `false`).

```yaml
- key: s1
  name: PBCopySurvey
  version: "2.0.0"
  data:
    formId: "{{form.id}}"
    formChannel: "{{source.channel}}"
    targetChannel: "{{newChannel._id}}"
    createNewAnswer: true
    editMode: false
  next:
    SUCCESS: ""
    ERROR: ""
```

Las preguntas encuesta-en-encuesta anidadas tienen sus UUIDs remapeados para que la copia mantenga referencias internas consistentes. Los timestamps y los `_id` de mensaje se eliminan antes de reenviar.

## PBEditableSurvey

Reabre mensajes de encuesta ya enviados para edición (los devuelve a borrador) usando uno de cuatro modos de selección.

Parámetros clave: `type` (`uuids`/`survey`/`firstSurvey`/`lastSurvey`), `channel`; más `uuids` (para `type=uuids`) o `surveyId` (para los modos de encuesta).

```yaml
- key: s1
  name: PBEditableSurvey
  version: "2.0.1"
  data:
    type: "survey"
    channel: "{{task.channel}}"
    surveyId: "5e98c2c81d8897202c6668b7"
  next:
    SUCCESS: ""
    ERROR: ""
```

Detalles a cuidar:

- `firstSurvey` y `lastSurvey` están declarados pero **no implementados**: devuelven `'NYI.'` por callback (enrutan a `ERROR`). Evítalos.
- Solo mira 2 años atrás; una primera pregunta encuesta-en-encuesta no se captura.

## PBAnswerChecker

Corre una consulta de respuestas y filtra el resultado con reglas de comparación: una compuerta del tipo "¿el usuario ya envió una respuesta hoy?".

Parámetros clave: `query` (objeto pasado a la API de respuestas), `check` (arreglo de `{ comparison, identifier, value? }`).

Comparación soportada: `TIME-TODAY` (el `process[0]` del dato, epoch en ms, cae dentro de hoy).

Ramas: `FOUND`, `NOT-FOUND`, `ERROR`.

```yaml
- key: s1
  name: PBAnswerChecker
  version: "2.0.0"
  data:
    query:
      channel: "{{task.channel}}"
      user: "{{user._id}}"
    check:
      - comparison: "TIME-TODAY"
        identifier: "submission_date"
  next:
    FOUND: ""
    NOT-FOUND: s_next
    ERROR: ""
```

`query` se envía tal cual: eres responsable de su corrección. Cada `check` debe coincidir (`.every`). Para comparaciones más ricas hoy hay que recurrir a `CCJS` (bloqueado).

## PBActionButton

Agrega un botón de enlace/URI al arreglo `actionButton` de un canal (vía JSON Patch RFC 6902).

Parámetros clave: `channelId`, `actionType` (solo `uri` implementado); opcionalmente `isActive`, `accessRoles`, `channelProperties`, `uri`, `queryParams`, `windowConfig`, `windowName`, `openMode` (default `window`).

```yaml
- key: s1
  name: PBActionButton
  version: "2.0.0"
  data:
    channelId: "{{task.channel}}"
    actionType: "uri"
    uri: "https://example.com/po/{{task._id}}"
    windowName: "PO Detail"
    openMode: "window"
  next:
    SUCCESS: ""
    ERROR: ""
```

Solo `actionType: "uri"` produce un botón real hoy; otros valores registran una advertencia y parchean sin `uriSettings`. Si `actionButton` no existe, se crea primero.

## PBTemplate

Renderiza un documento HTML desde una plantilla + `content` y lo escribe en el FS de runtime del workflow, devolviendo el `filePath` —típicamente consumido luego por `PBPdf`—.

Parámetros clave: `content` (objeto pasado a la plantilla); opcionalmente `htmlTemplate`, `cssTemplate`, `fileName` (default `template.html`).

```yaml
- key: s1
  name: PBTemplate
  version: "3.0.0"
  data:
    content:
      title: "Invoice"
      amount: "$25.000"
    fileName: "invoice.html"
  next:
    SUCCESS: s_pdf     # alimenta filePath en PBPdf.localFile
    ERROR: ""
```

El `filePath` de salida está enraizado en `/` y vive en el FS virtual `iContext.files` del workflow. Encadénalo a `PBPdf.localFile` para producir un PDF (ver [Datos e integraciones](./actions-data-and-integrations.md#pbpdf)).
