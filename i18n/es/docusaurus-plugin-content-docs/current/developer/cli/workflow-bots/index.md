---
title: Bots de workflow
sidebar_label: Visión general
displayed_sidebar: developer
---

<!-- source: repositories/cotctl/docs/workflows/bots/README.md, data-context.md, company-specific.md @ 4f7248a (2026-07-06) -->

Un **bot** es una unidad de automatización que corre dentro de un workflow. Cuando una tarea cambia de estado, o se responde una encuesta, el motor de workflows ejecuta los bots que configuraste en esa transición —uno tras otro— y enruta a la siguiente etapa según la rama que devuelve cada bot. Los bots son la forma en que un workflow *hace* cosas: crear una tarea, enviar un mensaje, llamar a una API externa, ramificar según un valor.

Esta sección es el catálogo pensado para lectura humana. Cada bot que Cotalker soporta está agrupado aquí por familia, con una descripción de una línea, un ejemplo YAML mínimo y los parámetros que se usan a diario. Para la lista exhaustiva de parámetros de un bot puntual, usa `cotctl bot-types versions <BotType>` (ver [Consultar versiones](#consultar-versiones-y-el-catalogo-en-vivo)) o busca en la referencia respaldada por RAG.

## Cómo se declara un bot en YAML

Los bots viven dentro de uno de estos espacios (slots) de un workflow: `requiredSurvey.bots`, `state.subtask.bots`, `state.next[i].bots` o `state.surveyTriggers[i].bots`. Cada bot es a su vez una pequeña máquina de estados: una lista de `stages`, cada una nombrando un tipo de bot y enrutando sus salidas:

```yaml
bots:
  - name: my-bot                # nombre del bot a nivel workflow
    start: s1                   # primera etapa a ejecutar
    stages:
      - key: s1
        name: PBUpdateTask      # el TIPO de bot (clave técnica)
        version: "2.2.0"        # opcional; se omite para usar el default del tipo
        data:                   # parámetros propios del tipo
          _id: "{{task._id}}"
          taskGroup: "{{task.taskGroup}}"
          status1: "5d2fd97cb448357a12fe59ac"
        next:                   # a dónde ir según cada rama de salida
          SUCCESS: ""           # "" termina este bot
          ERROR: ""
```

Dos reglas que suelen confundir:

- **cotctl no resuelve ObjectIds dentro de `stage.data`.** Debes pasar ObjectIds reales. Las únicas resoluciones automáticas son `surveyTriggers[].survey` (código → ObjectId) y los permisos AccessRole por nombre. Dentro de `data`, un código de encuesta en `surveyId` *no* se resuelve: pasa el ObjectId.
- **Cada bot declara sus propias ramas de salida** (`SUCCESS`/`ERROR`, `IF`/`ELSE`, `FOUND`/`NOT-FOUND`, `DEFAULT`, …). Declara en `next` cada rama que el bot puede devolver, o el motor podría no encontrar la etapa siguiente.

## Elegir el bot correcto

Recurre a un bot de primera línea antes de escribir JavaScript propio. La tabla mapea una necesidad al bot recomendado; la columna "En vez de" es el antipatrón común a evitar.

| Necesidad | Usa | En vez de | Notas |
|-----------|-----|-----------|-------|
| Crear una tarea | `PBCreateTask` | `CCJS` + llamada a la API | Usa la versión `2.0.1` |
| Actualizar campos de tarea (estado, asignado, fechas) | `PBUpdateTask` | `CCJS` | `2.2.0` agrega tracking de rendimiento |
| Avanzar la máquina de estados | `PBChangeState` | `PBUpdateTask` (no registra historial de SM) | |
| Duplicar una tarea | `PBDuplicateTask` | `PBCreateTask` manual | `ignoreChildren: true` omite hijas |
| Enviar un mensaje a un canal | `PBMessage` | `PBSendCustomNotification` (ese es para push) | |
| Enviar mensajes a muchos canales | `PBBulkMessage` | bucle `FCEach` + `PBMessage` | ~90% menos llamadas de red |
| Enviar una encuesta | `PBSendSurvey` | `PBMessage` | `editMode: true` para borradores |
| Reabrir una encuesta enviada | `PBEditableSurvey` | `PBSendSurvey` con `editMode` | |
| Copiar una encuesta a otro canal | `PBCopySurvey` | `PBSendSurvey` | |
| Enviar un correo | `PBEmail` | `NWRequest` a SES/SMTP | `3.0.1` recomendada |
| Push + mensaje al canal | `PBSendCustomNotification` | `PBMessage` | |
| Plantilla de WhatsApp | `PBWhatsApp` | `NWRequest` a un BSP | requiere un `contractCode` válido |
| Generar un PDF | `PBPdf` (4.0.0) | `PBTemplate` (solo HTML) | |
| Extraer datos de un PDF | `PBPDFExtractor` | `CCJS` | API Adobe Extract (bloqueado por contrato) |
| Renderizar HTML desde plantilla | `PBTemplate` | concatenar strings con `CCJS` | |
| Generar un código QR | `PBQRCode` | `NWRequest` | |
| Crear un canal | `PBCreateChannel` | `JPChannel` | |
| Modificar un canal | `PBUpdateChannel` | `JPChannel` (RFC 6902) | |
| Ocultar todos los mensajes de un canal | `PBCleanChannel` | `PBHideMessages` (ids puntuales) | |
| Agregar un usuario a un canal | `PBChannelAddUser` | `JPChannel` | |
| Crear / actualizar un usuario | `PBCreateUser` / `PBUpdateUser` | `NWRequest` a `/users` | |
| Modificar una propiedad de forma granular | `PBUpdateProperty` (3.0.0) o `JPProperty` | `CCJS` | JP* es JSON Patch crudo |
| Agregar editor/seguidor a una tarea | `PBTaskAddEditor` | `PBUpdateTask` con `editors[]` | aditivo; soporta `operation: remove` |
| Iterar sobre un arreglo | `FCEach` (4.1.0) | `forEach` de `CCJS` | un subcontexto por ítem |
| Iterar arreglos grandes por lotes | `FCEachBulk` | `FCEach` simple | `batchSize`/`concurrency` configurables |
| Rama condicional | `FCIfElse` | `CCJS` | `eq`/`neq`/`gt`/`lt`/`gte`/`lte` |
| Switch (primera / todas las coincidencias) | `FCSwitchOne` / `FCSwitchAll` | `FCIfElse` anidados | |
| Switch según una respuesta de lista | `PBSwitchList` | `FCSwitchOne` | las next-keys coinciden con `code[]` de la pregunta |
| Compuerta booleana en línea | `PBConditional` | `FCIfElse` | devuelve `TRUE`/`FALSE` |
| Pausar el workflow | `FCSleep` | `CCJS setTimeout` | |
| HTTP a un sistema externo | `NWRequest` (2.0.0) | `CCJS` con `fetch` | soporta modo `simulation` |
| Comprobar si existe una respuesta | `PBAnswerChecker` | `NWRequest` a `/answers` | |
| Consulta a un LLM con herramientas MCP | `PBLLMRunner` | `NWRequest` a Vertex | |

Si nada encaja, las vías de escape son los bots que ejecutan código —ver [Red y código](./network-and-code.md)—. Ejecutan JavaScript arbitrario y quedan bloqueados salvo que se aplique con `--allow-script-bots`.

## Las familias de bots

| Familia | Página | Qué contiene |
|---------|--------|--------------|
| Control de flujo (`FC*`) | [Control de flujo](./flow-control.md) | Bucles, ramas, switches, pausa |
| Extracción de datos (`JP*`, `ST*`) | [Extracción de datos y parcheo](./data-extraction.md) | JSON Patch crudo y herramientas de string sobre respuestas |
| Red y código (`NW*`, bots de script) | [Red y código](./network-and-code.md) | Peticiones HTTP y las vías de escape de JS bloqueadas |
| Tareas y canales (`PB*`) | [Acciones: tareas y canales](./actions-tasks-and-channels.md) | Crear/modificar tareas, canales, editores, ocultar mensajes |
| Mensajería y encuestas (`PB*`) | [Acciones: mensajería y encuestas](./actions-messaging-and-surveys.md) | Mensajes, correo, WhatsApp, encuestas, botones |
| Datos e integraciones (`PB*`) | [Acciones: datos e integraciones](./actions-data-and-integrations.md) | Propiedades, usuarios, PDF, planillas, pagos, LLM, calendarios |

## Qué datos ve un bot (`$VALUE` / `data`)

Un bot idéntico en YAML se comporta distinto según **qué slot lo disparó**. El valor que recibe como `$VALUE` (expuesto como `data` en el motor) lo construye el motor a partir del contexto del disparador. Si tu bot vive en un slot inusual, lo más seguro es imprimir `$VALUE` una vez con un `PBMessage` antes de referenciar campos.

Los dos contextos más comunes:

**`requiredSurvey.bots` — una transición de estado con formulario obligatorio.** Cuando la persona envía el formulario, la entrada tiene forma de `WorkflowStart`:

| Campo | Origen |
|-------|--------|
| `answer` | el documento de respuesta enviado |
| `task` | la tarea cuyo estado cambia |
| `meta.parentTask` | la tarea padre, si existe |
| `meta.taskGroup` | el TaskGroup de la tarea |

```yaml
data:
  taskId: "{{task._id}}"          # task está en la raíz de $VALUE
  responderId: "{{answer.user}}"
  taskGroupId: "{{meta.taskGroup}}"
```

**`state.surveyTriggers[i].bots` — una encuesta respondida dentro de un estado en curso.** Aquí el motor esparce la **tarea en la raíz** y pone la respuesta bajo `sentAnswer`:

| Campo | Origen |
|-------|--------|
| `_id`, `channel`, `taskGroup`, `status`, … | todos los campos de `task`, esparcidos en la raíz |
| `sentAnswer` | la respuesta que disparó el bot |

```yaml
data:
  taskId: "{{_id}}"               # la tarea misma (raíz), NO task._id
  taskChannel: "{{channel}}"
  answerId: "{{sentAnswer._id}}"
```

Errores comunes en un bot de `surveyTriggers`:

- Referenciar `task._id`: los campos de la tarea están en la raíz, así que es `{{_id}}`.
- Referenciar `answer`: allí el campo se llama `sentAnswer`.
- Asumir que existe `meta.taskGroup`: no existe; usa el campo `taskGroup` de la tarea directamente.

## Bots específicos por empresa (`CB*`)

Un puñado de bots (`CB*`) se cargan **solo para ciertos tenants** y fallan en cualquier otro lado. Los tenants con bots propios hoy son `puertocoronel`, `muellesdepenco` y `primetime`. No los uses en workflows entre empresas salvo que hayas confirmado que el bot está registrado en el entorno destino.

| Bot | Tenant | Propósito |
|-----|--------|-----------|
| `CBCheckOTsched` | puertocoronel | Dispara el scheduler `checkOT` una vez (utilidad de prueba) |
| `CBCoronelCreateMtNotification` | puertocoronel | Envía notificaciones de mantenimiento a SAP vía SOAP WS1 |
| `CBGruas` | puertocoronel | Inserta registros de grúas en una base PostgreSQL, partidos por turno |
| `CBRocketReachIOGetContact` | primetime | Pese al nombre, fija `smState` en una tarea (`patchTask`) |
| `CBRocketReachIOSearch` | primetime | **Stub** — siempre devuelve `SEARCH_ERROR` (la llamada real está comentada) |
| `CBErrorMessages` | muellesdepenco | Devuelve mensajes de un canal cuyo contenido coincide con substrings |
| `CBGetDeadTimeAnswer` | muellesdepenco | Busca una respuesta de tiempo muerto / demora por un id compuesto |
| `CBValidateAssignation` | muellesdepenco | Valida que una asignación de tiempo muerto iguale la duración real |
| `CBValidateClose` | muellesdepenco | Valida que ningún tiempo muerto termine después del fin real del turno |
| `CBValidateStart` | muellesdepenco | Valida que el inicio real caiga dentro de la ventana planificada |
| `CBValidateTM` | muellesdepenco | Valida que un nuevo tiempo muerto quepa en el turno planificado |

Estos bots dependen de variables de entorno propias del tenant, ids de encuesta fijados en el código y servicios externos (SAP, PostgreSQL, SOAP). Trátalos como integraciones internas, no como bloques reutilizables, y confirma su comportamiento con el equipo dueño antes de diseñar un workflow alrededor de ellos.

## Consultar versiones y el catálogo en vivo {#consultar-versiones-y-el-catalogo-en-vivo}

La mayoría de los bots publica varias versiones, y la recomendada cambia con el tiempo. El catálogo lo sirve el backend, así que conviene consultarlo en vivo en lugar de confiar en una lista estática:

```bash
cotctl bot-types list                    # catálogo completo: cada tipo, sus versiones y si tiene default
cotctl bot-types versions PBUpdateTask   # versiones + default de un tipo
```

Notas:

- `cotctl bots list` / `cotctl bots versions <BotType>` siguen funcionando como **alias deprecados** de los comandos `bot-types`.
- Un `stage.name` que no sea un tipo de bot conocido produce una **advertencia** al aplicar (detección de errores de tipeo), no un error duro: revisa la clave exacta cuando aparezca.
- Algunos bots **no tienen versión `default`** y exigen un `version:` explícito: los notables son `PBCalendar` (`2.0.0`) y `PBReport` (`1.0.0`).
