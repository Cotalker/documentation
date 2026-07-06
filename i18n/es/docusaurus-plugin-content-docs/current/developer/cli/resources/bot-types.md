---
title: Tipos de bot (catálogo)
sidebar_label: Tipos de bot
displayed_sidebar: developer
---

<!-- source: repositories/cotctl/src/commands/bot-types.ts, src/resources/bot-type.resource.ts, src/lib/known-bot-types.ts @ 4f7248a (2026-07-06) -->

Cuando escribes un grafo de automatización — dentro de un [bot](./bots.md), una [rutina](./routines.md), un [SLA](./slas.md) o un [schedule](./schedules.md) — cada stage nombra un **tipo de bot** en su campo `name`: `PBSendMessage`, `PBCreateTask`, `FCEach`, `PBScript`, etc. `cotctl bot-types` es la lente de solo lectura sobre ese catálogo: qué tipos existen, qué versiones tiene registrada cada uno y si tiene una versión predeterminada.

A diferencia del resto de los recursos de esta sección, aquí no hay nada que aplicar — el catálogo lo define el runtime, no tú. Estos dos comandos solo te dejan leerlo.

<div className="alert alert--primary">

**`bot-types` no es `bots`.** `cotctl bot-types` lee el *catálogo de bloques de construcción*. `cotctl bots` es el CRUD de las *entidades* Bot (las que tienen `name` y `commands[]`). Mira [Bots](./bots.md).

</div>

## Listar el catálogo

```bash
cotctl bot-types list
```

```text
BotType                          Versions                             Default
------------------------------------------------------------------------------
PBCreateTask                     2.0, 2.1                             yes
PBReport                         1.3                                  no
PBSendMessage                    (none pinned)                        yes
...
68 bot type(s) — source: live backend
```

Cada fila es un tipo de stage que puedes poner en un `stages[].name`. El catálogo se obtiene en vivo desde el backend de tu perfil, así que refleja los tipos realmente disponibles en ese entorno (algunos son específicos de una empresa y no aparecerán en todas partes). `--json` te da la forma legible por máquina.

## Inspeccionar las versiones de un tipo

```bash
cotctl bot-types versions PBCreateTask
```

```text
Bot type: PBCreateTask
versions: 2.0, 2.1
default:  yes
```

Este es el comando al que recurres **antes de fijar una `version` en el YAML**. La `version` de un stage es opcional — omítela y el backend resuelve la versión predeterminada del tipo. Pero algunos tipos vienen **sin predeterminada** y exigen que fijes una explícitamente:

```text
Bot type: PBReport
versions: 1.3
default:  no

This type has no default — you MUST pin a version (one of: 1.3).
```

<div className="alert alert--info">

**Encierra las versiones entre comillas en el YAML.** Una versión como `2.10` escrita sin comillas la interpreta YAML como el número `2.1` y se rechaza. Escribe siempre `version: "2.10"`. Cuando `cotctl apply` corre `--dry-run`, valida la `version` de cada stage contra este catálogo en vivo, así una fijación desactualizada o incorrecta aparece antes de escribir nada.

</div>

## Leer el catálogo mientras redactas

El ciclo típico al construir una automatización:

1. `cotctl bot-types list` para encontrar el tipo de stage que necesitas.
2. `cotctl bot-types versions <BotType>` para ver sus versiones y si necesita una fijación explícita.
3. Escribe el stage — omite `version` para tomar la predeterminada, o fija `version: "<x>"` (entre comillas) si no hay predeterminada.
4. `cotctl <recurso> apply --dry-run` — la versión se comprueba de nuevo contra el catálogo, como red de seguridad.

Un puñado de tipos (`PBScript`, `CCJS`, `ESMCode`) ejecuta JavaScript arbitrario. Aparecen en el catálogo como cualquier otro, pero una aplicación de **workflow** que declare uno se rechaza salvo que pases `--allow-script-bots`. (Las rutinas, SLAs y bots independientes validan que la rutina referenciada exista, pero no exigen ese flag.)

## Un renombrado reciente

Si usaste una versión antigua de `cotctl`, este catálogo vivía bajo el espacio de nombres `bots`:

- `cotctl bots list` (antiguo) → **`cotctl bot-types list`**. Sin alias — el viejo `bots list` ahora lista *entidades* Bot, así que los scripts que esperaban el catálogo deben actualizarse.
- `cotctl bots versions <BotType>` (antiguo) → **`cotctl bot-types versions <BotType>`**. La forma antigua sigue funcionando como **alias obsoleto** (imprime una advertencia) y se eliminará en `cotctl` 1.0.0.

## Ver también

- [Bots](./bots.md) — entidades Bot (`bot-types` ≠ `bots`)
- [Rutinas](./routines.md), [SLAs](./slas.md), [Schedules](./schedules.md) — los recursos cuyos stages referencian estos tipos
- [Workflows](./workflows.md) — la referencia completa de ParametrizedBot / stages
