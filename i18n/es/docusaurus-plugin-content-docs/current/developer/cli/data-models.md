---
title: Modelos de datos
sidebar_label: Modelos de datos
displayed_sidebar: developer
---

<!-- source: repositories/cotctl/docs/cotalker-models/{README,user,channel,task,task-group,property,message}.md @ 4f7248a (2026-07-06) -->

Cuando escribes un script exec, configuras el `data` de un bot o lees una respuesta de API, estás tocando las entidades núcleo de Cotalker. Esta página es un recorrido, pensado para partners, por las seis que más importan — qué es cada una, los campos con los que realmente trabajarás y cómo se conectan. Es una referencia para tener abierta mientras creas encuestas y workflows, no algo para leer una sola vez.

## Cómo encajan entre sí

Seis modelos cargan casi todo con lo que trabaja un partner:

- Un **TaskGroup** es el contenedor de un workflow. Cada **Task** pertenece a exactamente un TaskGroup.
- Una **Task** es una unidad de trabajo que se mueve por una máquina de estado. Está vinculada a un **Channel** donde ocurre la conversación.
- Los **Message** viven dentro de un Channel — incluidos los formularios de encuesta que la gente completa.
- Los **User** pueblan todo esto: envían mensajes, se asignan a tareas y tienen roles y cargos.
- Las **Property** son los datos genéricos y tipados adjuntos a Users, Channels y Tasks — el mecanismo detrás de los campos personalizados de una tarea (sus "extensions").

En un script exec, alcanzas estos modelos mediante alias de context: `user#me`, `user#company`, `channel#self`, `task#self`, `message#self`, `property#channel`, `property#user`. Ver [Scripting con exec](./resources/surveys/exec-scripting.md) para cómo declararlos y leerlos.

## User

La cuenta de una persona — quién es, a qué empresa pertenece y qué tiene permitido hacer. En un script exec, `user#me` es el objeto completo y `user#company` es el ID de la empresa.

**Campos que tocarás:**

- **Identidad:** `_id`, `email`, `name` (anidado `name.names`, `name.lastName`, `name.displayName`), `phone`.
- **Acceso:** `role`, `accessRoles[]`, `allAccessRoles[]`, `permissionsV2[]`, `isActive`.
- **Organización:** `company` (`company._id`, `company.name`), `companies[]`.
- **Datos adjuntos:** `properties[]` (IDs — resuelve vía `property#user`), `_jobElements[]` (cargos), `extensions`, `extra` (ej. `rut`, `supervisor` — depende de la config de la empresa).

**Se relaciona con:** pertenece a una empresa; carga roles y cargos; referenciado en otros lados como `sentBy` (Message), `assignee`/`validators`/`editors`/`followers` (Task) y `userIds` (Channel).

<div className="alert alert--secondary">

**`user#company` es un string, no un objeto** — es el valor de `user.company._id`. Y `allAccessRoles` incluye roles heredados por la jerarquía de empresa, mientras que `accessRoles` son solo los asignados directamente.

</div>

## Channel

El lugar donde ocurren la comunicación y el workflow — una sala de chat/workflow. Algunos canales son conversaciones comunes; otros son canales de tarea (`isTask: true`) atados a una tarea de workflow. En un script exec es `channel#self`.

**Campos que tocarás:**

- **Despliegue:** `_id`, `nameDisplay`, `nameCode`, `info.description`.
- **Membresía:** `userIds[]`, `group`, `company`, `visibility.groups[]`, `visibility.users[]`.
- **Flags:** `isPrivate`, `isDirect`, `isTask`, `isActive`.
- **Datos adjuntos:** `propertyIds[]` (IDs — resuelve vía `property#channel`), `actionButton[]`, `lastMessage`.

**Se relaciona con:** pertenece a una empresa y un grupo; contiene usuarios vía `userIds`; un canal de tarea refleja `task.channel`; los mensajes viven dentro; las properties se adjuntan vía `propertyIds`.

## Task

Una única unidad de trabajo que se mueve por la máquina de estado de un workflow — con un asignado, un status, fechas y datos dinámicos. En un script exec es `task#self`.

**Campos que tocarás:**

- **Identidad:** `_id`, `name`, `serial` (el número de serie de la tarea — ojo, `serial`, no `serialNumber`), `company`.
- **Posición en el workflow:** `taskGroup`, `smState`, `smStateMachine`, `parent`, `child[]`.
- **Personas:** `assignee`, `validators[]`, `editors[]`, `followers[]`, `visibility[]`.
- **Status:** `status`, `status1`–`status5` (su significado lo define el workflow), `isActive`, `color`.
- **Vínculo con el canal:** `channel`, `channelType` (`bound` / `unbound` / `unbound-hierarchy`).
- **Fechas:** `startDate`, `endDate`, `resolutionDate`, `closedAt`.
- **Datos dinámicos:** `extensions` (ver abajo).

**`extensions` — el concepto clave.** Los datos personalizados de una tarea se agrupan por PropertyType: `extensions[codePropertyType][fieldKey] = valor`. Por debajo, cada extension es un documento [Property](#property) separado, dueño de la tarea. Qué PropertyTypes están disponibles lo fija la máquina de estado (`asset.propertyType` más sus extensions permitidas). Esto es lo que leen y escriben los [`bounds` de encuestas](./resources/surveys/logic-and-validation.md#bounds-escribir-respuestas-en-la-tarea) y los bots de workflow.

**Se relaciona con:** pertenece a exactamente un TaskGroup; gobernada por una máquina de estado; vinculada a un Channel; asignada a Users; sus datos dinámicos viven en Properties.

<div className="alert alert--secondary">

**Cuida los nombres de campo.** Es `serial`, no `serialNumber`. `status1`–`status5` significan lo que diga el workflow. Y `extensions` puede venir `undefined` si la consulta no lo pobló.

</div>

## TaskGroup

El contenedor que agrupa cada tarea bajo un mismo workflow. Los partners mayormente lo conocen como un identificador que se pasa a la API de tareas.

**Campos que tocarás:**

- `_id` — el ID de Mongo; la referencia canónica para código nuevo.
- `group` — un identificador orientado al negocio, mantenido por compatibilidad hacia atrás (precede a `_id`).

**Se relaciona con:** el padre de las Tasks — `task.taskGroup` apunta al `_id` del TaskGroup.

<div className="alert alert--secondary">

**`task.taskGroup` es el `_id`** (un ObjectId), no el string `group` — puedes usarlo directo donde un endpoint pida `{groupid}`. No pases el `name` legible por humanos; no está indexado para esa búsqueda y la API dará 404.

</div>

## Property

Una pieza de datos configurable y tipada, adjunta a un User, Task o Channel — el mecanismo genérico de Cotalker para campos personalizados. Cada Property es una instancia de un PropertyType. En un script exec, `property#channel` y `property#user` devuelven **arreglos** de estas.

**Campos que tocarás:**

- **Tipo:** `_id`, `propertyType`, `company`, `isActive`.
- **Nombres:** `name.display` (el nombre visible), `name.code` (el code identificador — el code vive acá, no en el nivel superior).
- **Valor:** `schemaInstance` (los campos dinámicos definidos por el PropertyType — el portador real del valor).
- **Propiedad (ownership):** `owner.$ref` (`user` / `task` / `channel`), `owner.$id`, `subproperty[]`, `breadcrumbs[]`.
- **Presentación:** `geo.lat` / `geo.lng` / `geo.address`, `weight`, `color`.

**Se relaciona con:** tipada por un PropertyType; poseída por un User, Task o Channel vía `owner.$ref`/`owner.$id` — el mismo mecanismo detrás de las `extensions` de una tarea.

<div className="alert alert--secondary">

**Dos cosas hacen tropezar a la gente.** `property#channel` y `property#user` son **arreglos**, no objetos únicos. Y el code de la property es `name.code`, no un `code` de nivel superior — tampoco hay un campo `value` de nivel superior; el valor está en `schemaInstance` (`extra` está deprecado).

</div>

## Message

Un único mensaje dentro de un canal — contenido plano, un formulario de encuesta, un comando. En un script exec es `message#self`.

**Campos que tocarás:**

- **Ubicación:** `_id`, `channel`, `sentBy` (el ID de User del autor), `createdAt`.
- **Contenido:** `contentType`, `content`, `contentArray[]` (preguntas de encuesta, cuando es un formulario), `tag`.
- **Formularios:** `form`, `formId`, `answer`, `responses[]` (respuestas de encuesta enviadas).
- **Interacción:** `reactions`, `reply[]`, `mentions.users[]`, `readBy[]`, `isActive`.

**Se relaciona con:** vive en un Channel; autoreado por un User (`sentBy`); los mensajes de formulario cargan preguntas de encuesta en `contentArray` y respuestas en `responses`.

<div className="alert alert--secondary">

**El campo del emisor es `sentBy`, no `sender`.** Y el `createdAt` de un Message es un timestamp numérico en milisegundos Unix, no un objeto Date (lo mismo vale para `channel.lastMessage.createdAt`).

</div>

## Dos patrones que conviene recordar

- **IDs versus objetos.** Muchos campos (`user.properties`, `channel.propertyIds`) guardan IDs, no objetos completos. Los alias exec `property#*` los resuelven por ti.
- **Polimorfismo de owner.** `property.owner.$ref` (`user` / `task` / `channel`) es el único vínculo que permite a un mismo modelo Property decorar las tres entidades — y es el sustrato de almacenamiento de las `extensions` de una tarea.

## Ver también

- [Encuestas](./resources/surveys.md) y [Scripting con exec](./resources/surveys/exec-scripting.md) — donde lees estos modelos
- [Workflows](./resources/workflows.md) — de donde vienen las Tasks y TaskGroups
- [Properties](./resources/properties.md) — gestionar definiciones de Property con `cotctl`
