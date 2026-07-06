---
title: Schedules (YAML)
sidebar_label: Schedules
displayed_sidebar: developer
---

<!-- source: repositories/cotctl/src/commands/schedules.ts, src/schemas/schedule.schema.ts, src/resources/schedule.resource.ts, src/lib/validate-cron.ts, docs/schedules/ @ 4f7248a (2026-07-06) -->

Un **schedule** ejecuta una automatización en el momento que elijas — una vez, o de forma recurrente por cron. Empareja un *cuándo* (un `time` de una sola vez, o una expresión `cron` con una zona horaria) con un *qué* (`body`, un grafo de automatización embebido). El `body` tiene la misma forma de ParametrizedBot usada en todos lados, así que un schedule puede publicar un mensaje, correr un reporte o invocar una [rutina](./routines.md) independiente con una cadencia.

`cotctl schedules` gestiona los schedules que poseen los operadores (`owner: AdminSchedules`). Los schedules creados por SLAs, hooks o bots internos aparecen en los listados pero los gestiona el backend — no apliques esos a través de `cotctl`.

## La forma de un schedule

```yaml
kind: Schedule
code: sched_daily_digest           # clave de upsert — minúsculas, inmutable

time: "2026-06-15T10:00:00Z"       # primer disparo / disparo único (ISO 8601)
cron: "0 9 * * *"                  # cron UNIX de 5 campos — omítelo para una sola vez
cronTimeZone: America/Santiago     # zona IANA; predeterminada America/Santiago

isActive: true
priority: 4                        # 1 (tiempo real) .. 6 (ocioso); predeterminado 4
timeoutMinutes: 60                 # 1..240

body:
  start: enqueue
  stages:
    - key: enqueue
      name: PBSendMessage
      data:
        channelId: "6a000000000000000000abcd"
        text: "Daily digest is ready"
      next:
        SUCCESS: ""
        ERROR: ""
```

| Campo | Requerido | Notas |
|---|---|---|
| `kind` | Sí | Siempre `Schedule` |
| `code` | Sí | Clave de upsert. Minúsculas/guiones bajos/dígitos. **Inmutable** |
| `time` | Sí | ISO 8601. El momento del disparo único, o la primera ocurrencia de un schedule recurrente |
| `cron` | No | Cron UNIX de 5 campos. Omítelo para un schedule de una sola vez |
| `cronTimeZone` | No | Zona horaria IANA. Predeterminada `America/Santiago` |
| `endDate` | No | ISO 8601 o `null`. **Solo válido con `cron`** — pon `null` para limpiar una fecha de fin existente |
| `isActive` | No | Predeterminado `true`. Mira la nota de activación más abajo |
| `priority` | No | `1`–`6` (1 = tiempo real, 6 = ocioso). Predeterminado `4` |
| `timeoutMinutes` | No | `1`–`240`. Predeterminado `60` |
| `body` | Sí | El grafo de automatización — misma forma que los bots en [workflows](./workflows.md) |
| `owner`, `execPath` | No | Déjalos en sus valores predeterminados; `cotctl` advierte si los cambias |
| `tags`, `hooks`, `exponentialBackoff`, `runVersion` | No | Metadatos, webhooks, política de reintentos, versión de máquina |

## Cron y zona horaria

Cotalker usa **cron UNIX de 5 campos** — `minuto hora día-del-mes mes día-de-la-semana`. `cotctl` valida la expresión antes de aplicar:

```yaml
cron: "0 9 * * *"        # todos los días a las 09:00
cronTimeZone: America/Santiago
```

<div className="alert alert--warning">

**El webclient precarga cron estilo Quartz — no lo pegues tal cual.** Las expresiones Quartz tienen 6 o 7 campos (agregan segundos, y a veces un año). `cotctl` rechaza cualquier cosa con 6 o 7 campos con un mensaje que te indica quitar los campos de más. Una expresión de 5 campos se parsea luego de verdad, y una inválida (rangos malos, imposible de parsear) se rechaza con el error del parser. La zona horaria se pasa tal cual — sirve cualquier zona IANA — y una zona inválida aparece como parte del mismo error de cron.

</div>

Un `endDate` solo tiene sentido para un schedule recurrente, así que ponerlo sin `cron` es un error. Un `cron` en blanco o ausente significa "una sola vez", regido solo por `time`. La validación de cron es de mejor esfuerzo — el scheduler del backend tiene la última palabra — pero atrapa los errores comunes antes de escribir.

## Trabajar con schedules

```bash
# Lectura
cotctl schedules list                        # activos, de administración (predeterminado)
cotctl schedules list --all                  # incluir cancelados
cotctl schedules list --has-cron             # solo recurrentes
cotctl schedules list --type all             # incluir los de SLA/internos (solo lectura)
cotctl schedules get sched_daily_digest
cotctl schedules export sched_daily_digest -o sched.yaml

# Escritura
cotctl schedules apply -f sched.yaml --dry-run
cotctl schedules apply -f sched.yaml -y

# Estado + logs
cotctl schedules activate sched_daily_digest
cotctl schedules deactivate sched_daily_digest
cotctl schedules logs sched_daily_digest --limit 50
```

`apply` toma `-f/--file` (obligatorio), `--dry-run`, `-y/--yes` y `-q/--quiet`. `list` muestra por defecto los schedules activos y de administración; `--limit` es 100 por defecto. `logs` muestra ejecuciones recientes y toma `--op` para filtrar por operación (`executed`, `failed`, `started`, …).

## La activación es una operación aparte

<div className="alert alert--primary">

**El `isActive` del YAML no se envía en el cuerpo del apply — se converge con una segunda llamada.** El estado en vivo de un schedule solo puede cambiarse por los endpoints dedicados `activate` / `deactivate`, no por crear/actualizar. Así que `cotctl` aplica tu schedule y luego, si el YAML pide un estado distinto del que está en vivo, hace una llamada de seguimiento `activate` o `deactivate`. En un apply normal esto es transparente.

</div>

<div className="alert alert--warning">

**Crear un schedule nuevo como `isActive: false` puede dejarlo activo — reintenta para corregir.** La llamada de creación del backend devuelve una respuesta vacía (sin `_id`), así que para desactivar un schedule recién creado `cotctl` tiene que leer el registro nuevo por código y llamar `deactivate` sobre él. En una réplica de lectura con retraso esa relectura puede fallar, en cuyo caso `cotctl` **advierte y deja el schedule activo** en vez de fallar. La creación siempre tiene éxito; solo se omite la desactivación automática. Si ves esa advertencia, vuelve a correr `apply` (la ruta de actualización lo encontrará y lo desactivará) o corre `cotctl schedules deactivate <code>`. Esto solo afecta el caso crear-y-desactivar — las actualizaciones ya tienen el registro a mano.

</div>

## Invocar una rutina

Como otras automatizaciones, el `body` de un schedule puede invocar una [rutina](./routines.md) independiente vía un stage `PBScript`:

```yaml
body:
  start: run_report
  stages:
    - key: run_report
      name: PBScript
      data:
        code: rutina_reporte_diario   # debe ser un código de rutina real
      next:
        SUCCESS: ""
        ERROR: ""
```

`cotctl` valida que el código de la rutina exista antes de aplicar — por eso las rutinas se aplican antes que los schedules en una aplicación por carpeta.

## Orden de aplicación

En una aplicación por carpeta, los schedules van **últimos entre los recursos de automatización** — después de rutinas y SLAs — para que cualquier rutina que un schedule referencie ya exista en el catálogo cuando corra su validación de dry-run. `cotctl apply --dir` impone el orden.

## Ver también

- [Rutinas](./routines.md) — los PBScripts que invoca el stage `PBScript` de un schedule
- [Tipos de bot](./bot-types.md) — el catálogo de tipos de stage, y cómo comprobar versiones antes de fijarlas
- [Workflows](./workflows.md) — la referencia completa de ParametrizedBot
- [apply](../commands/apply.md) — los schedules se aplican al final entre las automatizaciones
