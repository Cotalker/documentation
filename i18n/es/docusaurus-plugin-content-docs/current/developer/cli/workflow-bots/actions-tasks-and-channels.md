---
title: 'Bots de workflow: tareas y canales'
sidebar_label: 'Acciones: tareas y canales'
displayed_sidebar: developer
---

<!-- source: repositories/cotctl/docs/workflows/bots/pb-create-task.md, pb-update-task.md, pb-duplicate-task.md, pb-bulk-task-update.md, pb-change-state.md, pb-task-add-editor.md, pb-channel-to-task-se.md, pb-create-channel.md, pb-update-channel.md, pb-channel-add-user.md, pb-clean-channel.md, pb-hide-messages.md, pb-get-channel-messages.md @ 4f7248a (2026-07-06) -->

Estos bots `PB*` crean y modifican los dos objetos centrales de un workflow —**tareas** y **canales**— más sus editores, miembros e historial de mensajes. Todos comparten la convención de ramas `SUCCESS`/`ERROR` salvo que se indique lo contrario.

Un tema recurrente: varios de estos bots **reemplazan** una lista por completo (`editors`, `userIds`, …). Cuando solo quieras agregar o quitar un miembro, recurre al bot aditivo (`PBTaskAddEditor`, `PBChannelAddUser`).

## PBCreateTask

Crea una tarea en un `taskGroup`, resolviendo opcionalmente la padre por canal vinculado o por código de propiedad.

Parámetros clave: `name` (arreglo de strings, unidos con espacios), `taskGroup`; opcionalmente `user` (owner/asignado/editor por defecto), `assignee`, `editors`, `followers`, `visibility`, `channel`, `parent`, `parentChannel` (resuelve la padre por canal vinculado), `parentAsset` (resuelve la padre por código de propiedad), `status1…status5`, `startDate`, `endDate`, `extensions`.

```yaml
- key: s_create
  name: PBCreateTask
  version: "2.0.1"
  data:
    taskGroup: "5d23a26435513c1230fc671d"
    name: ["Review Purchase Order"]
    user: "5e7548ae1d8897202c6668b7"
    parent: "{{task._id}}"
    status1: "5d2fd97cb448357a12fe59ac"
  next:
    SUCCESS: ""
    ERROR: ""
```

Detalles a cuidar:

- `name` debe ser un arreglo no vacío de strings.
- Si se define `user` y no `assignee`/`editors`, se usa `user` para ambos.
- `parentChannel`/`parentAsset` disparan búsquedas extra: prefiere `parent` cuando ya tienes el ObjectId.
- Falla cuando el `taskGroup` destino está inactivo.

## PBUpdateTask

Modifica una tarea existente: campos de estado, asignado, editores/seguidores/visibilidad/validadores, fechas, canal, extensiones, `isActive`. La versión `2.2.0` agrega tracking de rendimiento.

Parámetros clave: `_id`, `taskGroup` (ambos obligatorios); opcionalmente `name`, `smState`, `status1…status5`, `assignee`, `editors`, `followers`, `visibility`, `validators`, `isActive`, `startDate`, `endDate`, `channel`, `parent`, `info`, `extensions`, `quiet`.

```yaml
- key: s1
  name: PBUpdateTask
  version: "2.2.0"
  data:
    _id: "{{task._id}}"
    taskGroup: "{{task.taskGroup}}"
    status1: "5d2fd97cb448357a12fe59ac"
    info: "Patched by intake workflow"
    quiet: true
  next:
    SUCCESS: ""
    ERROR: ""
```

Detalles a cuidar:

- `editors`, `followers`, `visibility`, `validators` **reemplazan** la lista existente. Para agregar/quitar un usuario usa `PBTaskAddEditor`.
- **No** avanza la máquina de estados: usa `PBChangeState` para eso.
- `quiet: true` se recomienda para actualizaciones masivas o programáticas, para evitar avalanchas de notificaciones.

## PBDuplicateTask

Clona una tarea vía `duplicateTask`, con opción de omitir las tareas hijas.

Parámetros clave: `targetId` (tarea origen), `taskGroup`, `ignoreChildren` (omite hijas).

```yaml
- key: s1
  name: PBDuplicateTask
  version: "2.0.0"
  data:
    targetId: "{{template.taskId}}"
    taskGroup: "{{task.taskGroup}}"
    ignoreChildren: false
  next:
    SUCCESS: ""
    ERROR: ""
```

El endpoint de la API es dueño de la semántica de duplicación (estado, fechas, editores); el bot solo reenvía la llamada. Para creación manual usa `PBCreateTask`.

## PBBulkTaskUpdate

La versión masiva de `PBUpdateTask`: modifica muchas tareas por lotes vía un servicio externo (~90% menos llamadas de red). Suele encadenarse tras `FCEachBulk`.

Parámetros clave: `tasks` (arreglo no vacío de objetos de tarea), `taskGroup`, `bulkOptions` (`{ notify?, requiredSurvey? }`), `batchSize` (1–100, default 10), `continueOnError` (default `true`; con `false`, se detiene en el primer lote que falle).

Ramas: `SUCCESS` (lotes procesados; algunos ítems pueden traer errores por tarea), `ERROR` (todas las tareas fallaron **y** `continueOnError !== true`).

```yaml
- key: s1
  name: PBBulkTaskUpdate
  data:
    tasks: "{{tasks}}"
    taskGroup: "{{task.taskGroup}}"
    batchSize: 10
    continueOnError: true
    bulkOptions:
      notify: false
  next:
    SUCCESS: ""
    ERROR: ""
```

Detalles a cuidar:

- Cada tarea puede exponer los mismos campos modificables que `PBUpdateTask`; solo se parchean los campos presentes.
- Escribe `externalData.stages.updatedTaskBatch` para que un `PBBulkMessage` posterior consuma el resultado.
- Timeout HTTP por lote: 120 s; máximo 100 ítems por lote. El host debe poder alcanzar `BULK_TASK_UPDATE_URL`.

## PBChangeState

Modifica solo el `smState` de una tarea: usa esto en vez de `PBUpdateTask` cuando quieras avanzar la máquina de estados y preservar su historial.

Parámetros clave: `tid`, `smState`, `taskGroup`; opcionalmente `quiet`.

```yaml
- key: s1
  name: PBChangeState
  version: "2.1.0"
  data:
    tid: "{{task._id}}"
    taskGroup: "{{task.taskGroup}}"
    smState: "5e98c2c81d8897202c6668b7"
    quiet: false
  next:
    SUCCESS: ""
    ERROR: ""
```

A diferencia de `PBUpdateTask`, este bot toca solo `smState` y pasa por la lógica de transición de la máquina de estados.

## PBTaskAddEditor

Resuelve usuarios (desde `user`, `boss`, `property` o `accessRole`) y los agrega o quita de forma **aditiva** de una lista de la tarea (`editors`, `followers`, `visibility`, `validators`, `subscribers`), preservando los miembros existentes.

Parámetros clave: `type` (`user`/`boss`/`property`/`accessRole`), `task`, `taskGroup`; luego el campo fuente según el `type` elegido (`user`/`users`, `accessRole`, o `property`); opcionalmente `taskRole` (default `editors`), `operation` (`add` por defecto, `remove`), `quiet`.

```yaml
- key: s1
  name: PBTaskAddEditor
  version: "2.2.1"
  data:
    type: "user"
    users: ["{{user._id}}"]
    task: "{{task._id}}"
    taskGroup: "{{task.taskGroup}}"
    taskRole: "editors"
  next:
    SUCCESS: ""
    ERROR: ""
```

Detalles a cuidar:

- Para `type=user`/`boss` provee **o** `user` **o** `users` (Joi `xor`). Para `boss`, el bot resuelve el jefe jerárquico de cada usuario.
- El bot filtra a usuarios con `isActive: true`, así que los inactivos se descartan en silencio de la adición.

## PBChannelToTaskSE

Resuelve la tarea vinculada a un canal (`getTaskForChannel`): útil cuando solo tienes el id del canal pero necesitas la tarea más adelante. El resultado `task` también se escribe en `meta.body.data.task`.

Parámetros clave: `channelId`.

```yaml
- key: s1
  name: PBChannelToTaskSE
  version: "2.0.0"
  data:
    channelId: "{{event.channel}}"
  next:
    SUCCESS: ""
    ERROR: ""
```

Detalles a cuidar:

- El encabezado del código dice por error "PBUpdateTask — Patch Existing Task"; este bot **no** modifica nada, solo resuelve.
- Devuelve la **primera** tarea vinculada al canal (`tasks[0]`); si varias comparten el canal, el resto se ignora.

## PBCreateChannel

Crea un canal. Los settings (`display`/`write`/`read`) y los tamaños de imagen se pasan como campos planos y se reagrupan en el servidor.

Parámetros clave: `group` (obligatorio); opcionalmente `nameCode`, `nameDisplay`, `userIds`, `propertyIds`, `groupOwnerIds`, `isActive`, `settingsDisplay`/`settingsWrite`/`settingsRead`, `imageOriginal`/`imageSmall`/`imageSquare`.

```yaml
- key: s1
  name: PBCreateChannel
  version: "2.0.0"
  data:
    group: "5d2fd97cb448357a12fe59ac"
    nameCode: "po-{{task._id}}"
    nameDisplay: "PO {{task.name}}"
    userIds: ["{{user._id}}"]
    isActive: true
  next:
    SUCCESS: ""
    ERROR: ""
```

Los campos planos `settings*`/`image*` se agrupan en `settings.{…}` / `image.{…}`; los valores ausentes se descartan. Para modificar un canal existente usa `PBUpdateChannel` (o `JPChannel`).

## PBUpdateChannel

Modifica un canal. Los campos planos `settings*` se reagrupan; si se provee `image` (un ObjectId de File), el bot sondea hasta que termina la carga antes de modificar.

Parámetros clave: `channelId` (obligatorio); opcionalmente `group`, `nameCode`, `nameDisplay`, `userIds`, `propertyIds`, `groupOwnerIds`, `isActive`, `settingsDisplay`/`settingsWrite`/`settingsRead`, `image`.

```yaml
- key: s1
  name: PBUpdateChannel
  version: "3.0.0"
  data:
    channelId: "{{task.channel}}"
    nameDisplay: "PO {{task.name}}"
  next:
    SUCCESS: ""
    ERROR: ""
```

Detalles a cuidar:

- `userIds` **reemplaza** la lista de miembros: para agregar un usuario usa `PBChannelAddUser`.
- El sondeo de imagen tiene 3 intentos (con 2 s entre ellos); si la imagen no está lista, devuelve `ERROR`.
- Para modificaciones granulares usa `JPChannel`.

## PBChannelAddUser

Agrega (o quita) usuarios de un canal, resueltos desde `user`, `boss`, `property` o `accessRole`.

Parámetros clave: `type`, `channel`; más `user` (arreglo), `accessRole`, `property` (Joi marca los tres obligatorios: pasa placeholders para los no usados); opcionalmente `operation: remove`.

Ramas: `ADDED`, `NOT-ADDED` (el parche no devolvió canal), `ERROR`.

```yaml
- key: s1
  name: PBChannelAddUser
  version: "2.0.0"
  data:
    type: "property"
    channel: "{{task.channel}}"
    property: "5e7548ae1d8897202c6668b7"
    user: []
    accessRole: ""
  next:
    ADDED: ""
    NOT-ADDED: ""
    ERROR: ""
```

Solo se usa de forma efectiva el campo que corresponde al `type`; pasa placeholders vacíos (`[]`, `""`) para los otros. `operation: "remove"` filtra los ids resueltos de `channel.userIds`.

## PBCleanChannel

Oculta **todos** los mensajes de los canales indicados (los marca ocultos + inactivos y suprime la automatización posterior sobre el parche mismo).

Parámetros clave: `channelIds` (arreglo no vacío).

```yaml
- key: s1
  name: PBCleanChannel
  version: "2.0.0"
  data:
    channelIds:
      - "{{task.channel}}"
  next:
    SUCCESS: ""
    ERROR: ""
```

Detalles a cuidar:

- Solo se procesan canales con **más de un** mensaje visible; un canal con un solo mensaje se omite en silencio.
- Para ocultar ids de mensajes puntuales, usa `PBHideMessages`.

## PBHideMessages

Oculta mensajes puntuales por id (el mismo tratamiento oculto+inactivo que `PBCleanChannel`, pero dirigido).

Parámetros clave: `messages` (arreglo no vacío de ObjectIds de mensaje).

```yaml
- key: s1
  name: PBHideMessages
  version: "2.0.0"
  data:
    messages:
      - "60f0a1b2c3d4e5f60718293a"
      - "60f0a1b2c3d4e5f60718293b"
  next:
    SUCCESS: ""
    ERROR: ""
```

Los mensajes parcheados no se pueden remostrar con este bot. Para ocultar todos los mensajes de un canal, usa `PBCleanChannel`.

## PBGetChannelMessages

Carga los mensajes de un canal y devuelve solo aquellos cuyo `answer` sea igual a `<uuid>#<surveyId>`.

Parámetros clave: `channel`, `uuid` (UUID de respuesta sin el sufijo `#surveyId`), `surveyId`.

Ramas: `FOUND`, `NOT-FOUND`, `ERROR`.

```yaml
- key: s1
  name: PBGetChannelMessages
  version: "2.0.0"
  data:
    channel: "{{task.channel}}"
    uuid: "{{answer.uuid}}"
    surveyId: "{{answer.survey}}"
  next:
    FOUND: ""
    NOT-FOUND: ""
    ERROR: ""
```

Detalles a cuidar:

- Mira hasta 9 años atrás en busca de mensajes.
- El filtrado ocurre **en memoria** del lado cliente, no como consulta del servidor.
