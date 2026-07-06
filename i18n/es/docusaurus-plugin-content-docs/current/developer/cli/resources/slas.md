---
title: SLAs (YAML)
sidebar_label: SLAs
displayed_sidebar: developer
---

<!-- source: repositories/cotctl/src/commands/slas.ts, src/schemas/sla.schema.ts, src/resources/sla.resource.ts, docs/slas/ @ 4f7248a (2026-07-06) -->

Un **SLA** (Acuerdo de Nivel de Servicio) es una regla de escalamiento por tiempo asociada a una máquina de estados dentro de un [workflow](./workflows.md). Define una ventana que **se abre** cuando una tarea entra a ciertos estados, **se cierra** cuando la tarea alcanza otros estados, y — si la ventana **expira** antes de cerrarse — **dispara una automatización** (`pb`) para escalar. "Notificar al jefe si una orden de compra queda en revisión más de 24 horas" es un SLA de manual.

## La forma de un SLA

```yaml
kind: Sla
code: sla_review_window            # clave de upsert dentro de su máquina de estados
display: "Review window SLA"
stateMachine: sm_po_main           # el código de la SM (o un ObjectId de 24 caracteres)
reset: true                        # reiniciar el temporizador en las transiciones de estado
repeat: false                      # rearmarse tras dispararse

start:                             # la ventana se abre acá
  types: [new]                     # cualquiera de: new, in-progress, closed
  states: []                       # opcional: códigos de estado específicos
end:                               # ...y se cierra acá
  types: [closed]
  states: []

data:                              # la ventana de tiempo
  timeType: static                 # static | dynamic
  time: "HOURS|24"                 # <UNIDAD>|<valor>
  baseDate: default                # default | startDate | endDate | resolutionDate

pb:                                # corre cuando la ventana expira
  start: send_alert
  stages:
    - key: send_alert
      name: PBSendMessage
      data:
        channelId: "6a000000000000000000abcd"
        text: "Review deadline reached"
      next:
        SUCCESS: ""
        ERROR: ""
```

| Campo | Requerido | Notas |
|---|---|---|
| `kind` | Sí | Siempre `Sla` |
| `code` | Sí | Clave de upsert, con alcance de su máquina de estados. Minúsculas/guiones bajos. **Inmutable** |
| `display` | Sí | Etiqueta legible |
| `stateMachine` | Sí | El `code` u ObjectId de la SM dueña |
| `reset` | No | Predeterminado `true` — reiniciar el temporizador en las transiciones |
| `repeat` | No | Predeterminado `false` — rearmarse tras dispararse |
| `start` | Sí | La condición de apertura (necesita al menos una entrada `types` o `states`) |
| `end` | Sí | La condición de cierre (misma forma que `start`) |
| `data` | Sí | La ventana de tiempo (mira más abajo) |
| `pb` | Sí | La automatización que se dispara al expirar — misma forma que los bots en [workflows](./workflows.md) |
| `description` | No | Aceptado, pero **no actualizable** — mira la nota de inmutabilidad |

## La ventana de tiempo: `data`

`data` define cuánto dura la ventana. `time` sigue un formato `<UNIDAD>|<valor>`, donde la unidad es una de `HOURS`, `DAYS`, `WEEKS`, `MONTHS`, `YEARS`, `MINUTES`, `SECONDS`, `MS` o `DATE`:

```yaml
data:
  timeType: static     # una duración fija
  time: "HOURS|24"     # 24 horas desde baseDate
  baseDate: default    # desde qué se mide el reloj
```

`baseDate` ancla el reloj — `default`, `startDate`, `endDate` o `resolutionDate`. `timeType: dynamic` usa el mismo formato `<UNIDAD>|<valor>` pero deja que el valor referencie datos de tiempo de ejecución en vez de un número fijo.

<div className="alert alert--info">

**`start.states` / `end.states` son códigos de estado a la entrada, IDs de propiedad a la salida.** Tú escribes códigos de estado (u ObjectIds); `cotctl` los resuelve, y el backend los almacena como los `_id` de la Property vinculada. Por eso los `states` de un SLA exportado pueden verse distintos de lo que escribiste — la exportación los mapea de vuelta a códigos por ti.

</div>

## Inmutabilidad — lo que hay que entender antes de aplicar

<div className="alert alert--primary">

**Un SLA queda casi congelado tras crearse.** Al actualizar, el backend acepta cambios en exactamente siete campos: `display`, `reset`, `repeat`, `start`, `end`, `data` y `pb`. Todo lo demás queda fijo desde la creación y no puede cambiarse reaplicando — ni `code`, ni `stateMachine`, ni `description`, ni `isActive`.

</div>

Qué significa en la práctica:

- **`code`, `stateMachine`** — la identidad y su hogar. `cotctl` los omite por completo en la actualización, así que un apply nunca puede intentar mover ni renombrar un SLA. Para cambiar cualquiera de los dos, estás creando un SLA distinto.
- **`description`** — se acepta al *crear*, pero se ignora al *actualizar*. Si editas la `description` de un SLA existente y reaplicas, `cotctl` advierte que el cambio se descarta y aplica el resto. (La advertencia existe para que una reexportación posterior no parezca una desviación.) Mantén la `description` del YAML correcta como documentación, pero ten presente que la copia almacenada queda congelada desde la creación.
- **`isActive` — no hay forma de desactivar un SLA.** Ni por `cotctl`, ni por la API, ni por el webclient de administración. `cotctl slas deactivate` se eliminó a propósito, porque enviar `isActive: false` sería una operación nula silenciosa — un apply que informa éxito mientras nada cambia.

<div className="alert alert--warning">

**Para que un SLA deje de dispararse, haz que su ventana nunca se abra.** Como `start` es uno de los siete campos mutables, edítalo para que apunte a un estado que la tarea nunca pueda alcanzar — es una actualización legal y desactiva el SLA en la práctica. Borrarlo de verdad, o cambiar `code` / `stateMachine` / `description`, requiere borrar y recrear el registro a nivel de base de datos (una tarea de desarrollo de backend). No recurras a un truco con `isActive` por la API — no puede funcionar.

</div>

## Trabajar con SLAs

```bash
# Lectura
cotctl slas list                                   # en todos los workflows
cotctl slas list --state-machine sm_po_main        # una SM
cotctl slas list --all                             # incluir inactivos
cotctl slas get sla_review_window --state-machine sm_po_main
cotctl slas export sla_review_window --state-machine sm_po_main -o sla.yaml

# Escritura
cotctl slas apply -f sla.yaml --dry-run
cotctl slas apply -f sla.yaml -y
```

`get` y `export` **requieren** `--state-machine <smCode>` (un código de SLA solo es único dentro de su SM). `apply` lee la SM del campo `stateMachine` de cada documento y toma `-f/--file` (obligatorio), `--dry-run` y `-y/--yes`; admite archivos multidocumento. Cuando el mismo código de SM existe en más de un workflow, agrega `--task-group <workflow>` para desambiguar — `cotctl` te avisará cuándo hace falta.

No hay `cron` en un SLA — se rige por transiciones de estado y su ventana de tiempo, no por un schedule. Si quieres una cadencia por cron, eso es un [schedule](./schedules.md).

## Invocar una rutina

Como otras automatizaciones, el `pb` de un SLA puede invocar una [rutina](./routines.md) independiente vía un stage `PBScript` — `cotctl` valida que el código de la rutina exista antes de aplicar, y valida el tipo de bot y la versión de cada stage contra el catálogo en vivo.

## Orden de aplicación

En una aplicación por carpeta, los SLAs van después de los workflows y las rutinas (para que la SM a la que se asocian, y cualquier rutina que invoquen, ya existan) y antes de los schedules. `cotctl apply --dir` impone el orden.

## Ver también

- [Workflows](./workflows.md) — los SLAs se asocian a las máquinas de estados de un workflow; también la referencia completa de ParametrizedBot
- [Rutinas](./routines.md) — los PBScripts que invoca el stage `PBScript` de un SLA
- [Tipos de bot](./bot-types.md) — el catálogo de stages y las comprobaciones de versión
- [Schedules](./schedules.md) — para automatización regida por cron (los SLAs se rigen por eventos/ventana de tiempo)
