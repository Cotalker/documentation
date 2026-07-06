---
title: Rutinas (YAML)
sidebar_label: Rutinas
displayed_sidebar: developer
---

<!-- source: repositories/cotctl/src/commands/routines.ts, src/schemas/routine.schema.ts, src/resources/pbscript.resource.ts, docs/routines/ @ 4f7248a (2026-07-06) -->

Una **rutina** (un PBScript) es una automatización reutilizable elevada a recurso de primera clase. Es el mismo grafo de automatización que embeberías en un workflow — un estado `start` y una lista de `stages[]` — pero con su propio `code`, `display` e inputs declarados, viviendo en su propia colección. Una vez que la rutina existe, cualquier [bot](./bots.md), [SLA](./slas.md) o [schedule](./schedules.md) puede invocarla desde un stage referenciando su `code`. Piensa en las rutinas como la capa de biblioteca compartida del modelo de automatización.

## La forma de una rutina

```yaml
kind: Routine
code: rutina_saludo_simple         # clave de upsert — minúsculas, inmutable
display: "Rutina de saludo"

body:
  start: send
  stages:
    - key: send
      name: PBMessage              # un tipo de bot del catálogo
      data:
        channelId: "6a000000000000000000abcd"
        text: "Hola desde una rutina"
      next:
        SUCCESS: ""
        ERROR: ""
```

| Campo | Requerido | Notas |
|---|---|---|
| `kind` | Sí | Siempre `Routine` |
| `code` | Sí | Clave de upsert. Minúsculas/guiones bajos/dígitos, 3–50 caracteres. **Inmutable tras la creación** |
| `display` | Sí | Etiqueta legible (mutable) |
| `description` | No | Texto libre |
| `type` | No | `normal` (predeterminado), `network` o `flowcontrol` |
| `isActive` | No | Predeterminado `true`. Borrado lógico reaplicando con `isActive: false` |
| `dataType` | No | Los inputs declarados que la rutina acepta (mira más abajo) |
| `body` | Sí | El grafo de automatización — misma forma que los bots embebidos en [workflows](./workflows.md) |

## Inputs declarados: `dataType`

Una rutina puede declarar los inputs que espera. Cada entrada nombra una `key` (referenciada dentro del grafo como `$INPUT#<key>`), un `display` y si es `required`:

```yaml
dataType:
  - key: monto
    display: "Monto a evaluar"
    required: true
  - key: umbral
    display: "Umbral de riesgo"
    required: false
```

Son solo documentación y contrato — `cotctl` no comprueba que el grafo realmente los consuma, y no resolverá por ti las expresiones `$INPUT#...`. Si los escribes mal, fallan en tiempo de ejecución, no al aplicar.

## El grafo de automatización: `body`

`body` es un **constructor multi-stage** — un grafo dirigido que el runtime recorre stage por stage, ramificando según la transición que emite cada stage (`SUCCESS`, `ERROR`, y ramas específicas del tipo como `TRUE`/`FALSE`). Cada stage tiene:

- **`key`** — única dentro del body.
- **`name`** — el tipo de bot (mira [Tipos de bot](./bot-types.md) para el catálogo: `PB*` mensajería/tareas, `FC*` control de flujo, `NW*` HTTP, `PBScript`, …).
- **`version`** — opcional. Omítela para tomar la predeterminada del tipo; fíjala (¡entre comillas!) cuando el tipo no tiene predeterminada.
- **`data`** — una carga opaca que se pasa tal cual. `cotctl` **no** reescribe ObjectIds ni resuelve expresiones COTLang (`$INPUT#`, `$VALUE#`, `$OUTPUT#`) dentro de ella — provéelas exactamente como las espera el runtime.
- **`next`** — un mapa de nombre de rama al `key` del stage siguiente. La cadena vacía `""` es una rama terminal válida.

`body.start` nombra el stage de entrada. `body.maxIterations` (predeterminado `100`) limita cuántas transiciones corren — una red de seguridad contra bucles.

### Invocar otra rutina

Un stage con `name: PBScript` invoca una rutina independiente por código — y una rutina puede invocarse a sí misma (un patrón de reintento con espera) o formar un ciclo con otra:

```yaml
body:
  start: try
  stages:
    - key: try
      name: PBScript
      data:
        code: rutina_calcular_riesgo   # debe ser un código de rutina real
      next:
        SUCCESS: ""
        ERROR: retry
    - key: retry
      name: FCSleep
      data:
        seconds: 30
      next:
        SUCCESS: try
        ERROR: ""
```

`cotctl` valida el `data.code` de cada stage `PBScript` contra las rutinas registradas en el perfil, así un error de tipeo falla al aplicar con una sugerencia de "¿quisiste decir…?".

<div className="alert alert--info">

**Las autorreferencias validan limpio en la *segunda* aplicación.** Una rutina recién creada que referencia su propio `code` todavía no está en el catálogo la primera vez que la aplicas, así que verás una advertencia en esa primera pasada. Aplica de nuevo y valida limpio — la rutina ya existe. `cotctl` nunca bloquea la creación, así que esto es solo ruido en la primera corrida.

</div>

## Trabajar con rutinas

```bash
# Lectura
cotctl routines list                         # activas, con alcance de empresa (predeterminado)
cotctl routines list --all                   # incluir inactivas
cotctl routines list --search "riesgo"
cotctl routines list --include-global        # incluir globales solo de administración
cotctl routines get rutina_saludo_simple
cotctl routines export rutina_saludo_simple -o rutina.yaml

# Escritura
cotctl routines apply -f rutina.yaml --dry-run
cotctl routines apply -f rutina.yaml -y

# Ejecutar de verdad
cotctl routines test rutina_saludo_simple --context ctx.json
```

`apply` toma `-f/--file` (obligatorio), `--dry-run`, `-y/--yes` y `-q/--quiet`, y admite archivos multidocumento.

<div className="alert alert--warning">

**`routines test` ejecuta la rutina de verdad.** No hay modo de simulación: `test` ejecuta la rutina de inmediato con todos sus efectos (publica mensajes, crea tareas, escribe propiedades, dispara webhooks). Siempre imprime un banner de advertencia, y sin `-y` te obliga a reescribir el `code` de la rutina para confirmar. `--context <archivo>` provee el JSON de entrada; `--dry-run` imprime la carga que se enviaría sin llamar al backend. Reserva `-y` para CI y scripts. Inspecciona la corrida después con `cotctl schedules logs <TEST_...>` — el backend registra cada prueba como un schedule.

</div>

<div className="alert alert--primary">

**Aplicar una rutina es un despliegue en vivo.** Las rutinas no se versionan — reaplicar muta el documento en vivo en el lugar, y una tarea que la esté ejecutando en ese momento toma el nuevo comportamiento en su siguiente transición de stage. Trata `cotctl routines apply` contra producción con el mismo cuidado que un despliegue de código.

</div>

## Inmutabilidad y actualizaciones

`code` es inmutable e identifica a la rutina — no hay renombrado en el lugar. Al actualizar, `cotctl` envía solo los campos que el backend permite cambiar (`display`, `description`, `type`, `isActive`, `dataType` y `body`); omite deliberadamente `code` para que una actualización nunca intente cambiarlo. Para retirar una rutina, pon `isActive: false` y reaplica — no hay endpoint de borrado, y no existe comando `cotctl routines logs`.

## Orden de aplicación

En una aplicación por carpeta, las rutinas van **después** de los workflows y **antes** que los SLAs y schedules — porque un SLA o schedule puede invocar una rutina desde un stage `PBScript`, y el validador de dry-run necesita que la rutina ya exista en el catálogo. `cotctl apply --dir` impone este orden por ti.

## Ver también

- [Tipos de bot](./bot-types.md) — el catálogo de tipos de stage, y cómo comprobar versiones antes de fijarlas
- [Bots](./bots.md), [SLAs](./slas.md), [Schedules](./schedules.md) — los recursos que invocan rutinas vía stages `PBScript`
- [Workflows](./workflows.md) — la referencia completa de ParametrizedBot
- [apply](../commands/apply.md) — las rutinas se aplican antes que los SLAs y schedules
