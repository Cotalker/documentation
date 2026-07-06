---
title: Tutoriales
sidebar_label: Tutoriales
displayed_sidebar: developer
---

<!-- source: repositories/cotctl/docs/{bots,routines,schedules,slas,property-types,properties}/, repositories/cotctl/src/commands/{bots,routines,schedules,slas,property-types,properties,surveys,workflows,validate,apply}.ts, repositories/cotctl/examples/{bots,routines,properties}/ @ 4f7248a (2026-07-06) -->

Las páginas de referencia te dicen *qué* hace cada comando. Esta página te muestra *cómo* se combinan, con recetas completas para seguir paso a paso sobre las cosas que realmente vas a hacer en un proyecto. Cada receta lista qué necesitas antes de empezar y cómo se ve el éxito, para que sepas cuándo funcionó.

Si todavía no has instalado ni te has autenticado, empieza por [Instalación](./installation.md) y [Autenticación](./authentication.md) — todas las recetas de abajo asumen que tienes un perfil funcionando.

## Receta 1 — Inicia sesión y confirma tu configuración

**Qué necesitas:** `cotctl` instalado y acceso de administrador a un entorno.

```bash
# Inicia sesión (flujo de navegador de forma predeterminada)
cotctl login --url https://web.cotalker.com --subdomain acme

# Confirma que el perfil se guardó
cotctl profile list
```

**Cómo se ve el éxito:** `cotctl profile list` muestra una fila `acme` con tu URL y usuario. Ya puedes ejecutar cualquier comando con `-c acme`.

## Receta 2 — Crea una encuesta nueva desde cero

**Qué necesitas:** un perfil funcionando y una idea del formulario que quieres construir.

```bash
# 1. Escribe el YAML (ver la referencia de Encuestas para la estructura)
vim my-survey.yaml

# 2. Valídalo offline — detecta errores antes de tocar el entorno
cotctl validate -f my-survey.yaml

# 3. Previsualiza lo que se enviaría, sin cambiar nada
cotctl apply -f my-survey.yaml -c acme --dry-run

# 4. Aplica de verdad
cotctl apply -f my-survey.yaml -c acme
```

**Cómo se ve el éxito:**

```
Survey "my_survey" created successfully
```

<div className="alert alert--info">

Esta secuencia validate → dry-run → apply es la opción predeterminada segura para *cualquier* recurso, no solo encuestas. Adopta el hábito desde ahora.

</div>

## Receta 3 — Modifica una encuesta existente

**Qué necesitas:** el `code` de una encuesta que ya existe.

```bash
# 1. Expórtala como punto de partida
cotctl surveys export existing_survey -c acme -o survey.yaml

# 2. Edita el YAML
vim survey.yaml

# 3. Valida y luego aplica — se actualiza automáticamente porque el code existe
cotctl validate -f survey.yaml
cotctl apply -f survey.yaml -c acme
```

**Cómo se ve el éxito:** `Survey "existing_survey" updated successfully`. Puedes agregar, quitar, editar y reordenar preguntas libremente — `cotctl` las empareja por `identifier` y preserva sus IDs.

## Receta 4 — Promueve una encuesta entre entornos

**Qué necesitas:** perfiles para el entorno de origen y el de destino.

```bash
# 1. Exporta desde el origen
cotctl surveys export my_survey -c acme-prod -o survey.yaml

# 2. Aplica al destino
cotctl apply -f survey.yaml -c devteam
```

**Cómo se ve el éxito:** la encuesta se crea en el entorno de destino. El YAML exportado contiene IDs del origen, pero se ignoran al crear — el destino genera los suyos.

## Receta 5 — Construye y despliega un workflow desde un scaffold

Esta es la grande — el ciclo completo desde la nada hasta un workflow en vivo.

**Qué necesitas:** un perfil funcionando y un nombre + código corto para tu flujo.

```bash
# 1. Genera el esqueleto
cotctl workflows scaffold --name ordenes-compra --code oc \
  --display "Órdenes de Compra"

# 2. Personaliza los archivos generados:
#    - estados en data-model/states.yaml
#    - transiciones en workflow.yaml
#    - roles/permisos en access/

# 3. Valida la carpeta entera offline
cotctl validate --dir ordenes-compra/

# 4. Aplica — las entidades se despliegan en el orden de dependencias correcto, automáticamente
cotctl apply --dir ordenes-compra/ -c dev

# 5. Ejecuta el checklist de preparación para producción contra el workflow en vivo
cotctl validate --workflow ordenes_compra -c dev
```

**Cómo se ve el éxito:** el paso 4 reporta `N created, 0 errors`, y el paso 5 termina con `production ready`. Los pasos 2–5 forman un ciclo que puedes repetir con seguridad — cada apply es idempotente.

## Receta 6 — Publica un bot de comando slash

Un **Bot admin** es dueño de los atajos `/<comando>` que los operadores escriben en el chat. Esta receta te lleva desde un archivo vacío hasta un `/hola` funcionando.

**Qué necesitas:** un perfil funcionando con acceso de Bot admin.

Parte de `examples/bots/bot-minimal.yaml` en el repo de cotctl, o escribe el archivo desde cero — el `name` es la clave de upsert (único por compañía) y `commands[]` contiene los comandos slash:

```yaml
kind: Bot
name: "Saludo Bot"
description: "Bot que saluda con /hola"
commands:
  - description: "Saluda al usuario"
    isSlash: true
    slashCmd: "hola"
    isActive: true
```

```bash
# 1. Verifícalo offline. Los Bots NO los cubre `cotctl validate` — ejecuta
#    apply en modo dry-run en su lugar. Valida el archivo con Zod (y cualquier
#    ParametrizedBot embebido) y previsualiza el cambio sin aplicarlo.
cotctl bots apply -f bot.yaml -c acme --dry-run

# 2. Aplica de verdad
cotctl bots apply -f bot.yaml -c acme -y

# 3. Pruébalo: abre cualquier chat y escribe
#    /hola
```

**Cómo se ve el éxito:** el paso 2 reporta el bot creado, y escribir `/hola` en el chat lo dispara. No existe un comando `cotctl bots test` — un bot se ejercita invocando su comando slash desde el chat.

<div className="alert alert--info">

`cotctl validate -f` solo entiende archivos `Survey`, `PropertyType`, `Property`, `JobTitle`, `Workflow`, `AccessRole` y `User`. Para archivos **Bot**, **Routine**, **Schedule** y **SLA**, la verificación offline equivalente es `<familia> apply --dry-run`, que valida el YAML antes de mutar nada.

</div>

Para ir más allá — un comando de encuesta que dispara un formulario, más un grafo embebido que llama a una Rutina — ver `examples/bots/bot-with-survey-command.yaml`.

## Receta 7 — Automatización programada: una Rutina en un cron

Una **Rutina** (PBScript) es un script reutilizable; un **Schedule** dispara una en un cron. Esta receta las conecta: escribe la rutina, pruébala y luego prográmala.

**Qué necesitas:** un perfil funcionando y el `_id` de un canal de chat donde la rutina publique.

```yaml
# rutina.yaml — ver examples/routines/routine-minimal.yaml
kind: Routine
code: rutina_saludo_simple     # clave de upsert — inmutable tras la creación
display: "Rutina de saludo"
body:
  start: send
  stages:
    - key: send
      name: PBMessage
      data:
        channelId: "6a000000000000000000abcd"   # un _id de canal real
        text: "Hola desde una rutina"
      next:
        SUCCESS: ""
        ERROR: ""
```

```bash
# 1. Dry-run y luego aplica (las rutinas, como los bots, no las cubre `cotctl validate`)
cotctl routines apply -f rutina.yaml -c acme --dry-run
cotctl routines apply -f rutina.yaml -c acme -y

# 2. Dispárala una vez para confirmar que funciona. --dry-run imprime el
#    payload sin ejecutarla; quita --dry-run para ejecutar de verdad — esto
#    tiene efectos secundarios REALES (publica el mensaje, y crearía/transicionaría
#    tareas si la rutina lo hiciera).
cotctl routines test rutina_saludo_simple -c acme --dry-run
cotctl routines test rutina_saludo_simple -c acme
```

Ahora prográmala. El `body` del schedule invoca la rutina a través de una etapa `PBScript`:

```yaml
# sched.yaml
kind: Schedule
code: sched_saludo_diario
time: "2026-07-07T12:00:00Z"    # primera ocurrencia
cron: "0 9 * * *"               # todos los días a las 09:00 — UNIX de 5 campos, NO Quartz
cronTimeZone: America/Santiago
body:
  start: run_routine
  stages:
    - key: run_routine
      name: PBScript
      data:
        code: rutina_saludo_simple   # debe ser un code de Rutina real
      next:
        SUCCESS: ""
        ERROR: ""
```

```bash
# 3. Aplica el schedule — está activo de forma predeterminada, así que empieza a dispararse en el cron.
cotctl schedules apply -f sched.yaml -c acme --dry-run
cotctl schedules apply -f sched.yaml -c acme -y

# 4. Después de que se haya disparado, inspecciona las ejecuciones
cotctl schedules logs sched_saludo_diario -c acme -l 25 --op executed
```

**Cómo se ve el éxito:** el `test` de la rutina publica el mensaje, el schedule aplica sin errores, y tras el primer tick del cron `schedules logs` muestra una entrada `executed`.

<div className="alert alert--warning">

Aplica la **rutina antes que el schedule**. El `--dry-run` del schedule verifica que `data.code` apunte a una rutina que ya existe en el perfil — si aplicas el schedule primero, esa verificación falla. Con `cotctl apply --dir`, cotctl ordena Routine antes que Schedule automáticamente, así que mantener ambos archivos en una carpeta evita el problema.

</div>

Dos detalles que conviene conocer:

- **El cron es UNIX de 5 campos.** cotctl lo valida como cron estándar. La pestaña Avanzado del webclient de administración precarga ejemplos Quartz (6/7 campos) como `0 15 10 L-2 * ?` — esos se rechazan. Usa `0 9 * * *`.
- **Pausa sin editar el YAML** con los endpoints dedicados:

  ```bash
  cotctl schedules deactivate sched_saludo_diario -c acme -y
  cotctl schedules activate   sched_saludo_diario -c acme -y
  ```

## Receta 8 — Define un SLA (y qué significa "inmutable")

Un **SLA** es un temporizador adjunto a la máquina de estados de un workflow: se abre cuando una tarea entra en ciertos estados y dispara un ParametrizedBot si la tarea no los abandona a tiempo.

**Qué necesitas:** un workflow existente cuyo código de máquina de estados conozcas.

```yaml
# sla.yaml
kind: Sla
code: sla_review_window
display: "Review window SLA"
stateMachine: sm_po_main        # code de la SM o ObjectId hex de 24 caracteres
start:
  types: [in-progress]
  states: [po_review]
end:
  types: [closed]
  states: []
data:
  timeType: static
  time: "HOURS|24"              # dispara 24h después de que se abre la ventana
  baseDate: default
pb:
  start: alert
  stages:
    - key: alert
      name: PBSendMessage
      data:
        channelId: "6a000000000000000000abcd"
        text: "Review deadline reached"
      next:
        SUCCESS: ""
        ERROR: ""
```

```bash
cotctl slas apply -f sla.yaml -c acme --dry-run
cotctl slas apply -f sla.yaml -c acme -y

# Desambigua si el mismo code de SM vive en más de un workflow:
cotctl slas apply -f sla.yaml -c acme --task-group wf_po
```

**Cómo se ve el éxito:** el SLA aplica sin errores y se arma cada vez que una tarea entra en `po_review`.

**Qué significa "inmutable" en la práctica.** El PATCH del backend acepta solo `display`, `reset`, `repeat`, `pb`, `start`, `end` y `data`. Todo lo demás queda congelado tras la creación:

- **No puedes apagar un SLA a través de la API.** No existe `cotctl slas deactivate`; `isActive: false` se descarta silenciosamente. Para que un SLA deje de dispararse, edita `start.states` para que apunte a un estado que nada alcanza, o pide a backend-dev que elimine el documento a nivel de base de datos.
- **`description` se descarta en el UPDATE.** Solo se persiste en el CREATE — cambiarla después no hace nada (cotctl te avisa cuando lo intentas). Acértala a la primera.
- **`code` y `stateMachine` son identidad.** Cambiar cualquiera de los dos crea un SLA nuevo en vez de editar el existente.

Así que "cambiar un SLA" significa editar los campos mutables; cualquier otra cosa es borrar y recrear a nivel de base de datos.

## Receta 9 — Define un tipo de propiedad y agrega propiedades

Un **PropertyType** es un esquema (un conjunto de campos tipados); una **Property** es una fila que lo completa. Esta receta define un tipo `location` y agrega dos ciudades.

**Qué necesitas:** un perfil funcionando.

```yaml
# location-type.yaml
kind: PropertyType
code: location                  # inmutable tras la creación
display: Location
schemaNodes:
  - key: address
    display: Address
    basicType: string
  - key: city
    display: City
    basicType: string
    isIndexable: true
    validators:
      required: true
```

```bash
# PropertyType SÍ lo cubre `cotctl validate` — usa la escalera completa.
cotctl validate -f location-type.yaml
cotctl apply -f location-type.yaml -c acme --dry-run
cotctl apply -f location-type.yaml -c acme
```

Ahora agrégale propiedades. Las claves de `schemaInstance` de cada propiedad se corresponden con los `schemaNodes[].key` del tipo:

```yaml
# cities.yaml — dos propiedades en un mismo lote
kind: Property
code: santiago
display: Santiago
propertyType: location          # inmutable; el tipo debe existir primero
schemaInstance:
  address: Av. Providencia 1234
  city: Santiago
---
kind: Property
code: buenos_aires
display: Buenos Aires
propertyType: location
schemaInstance:
  address: Av. Corrientes 1500
  city: Buenos Aires
```

```bash
cotctl validate -f cities.yaml
cotctl apply -f cities.yaml -c acme --dry-run
cotctl apply -f cities.yaml -c acme
```

**Cómo se ve el éxito:** el tipo aplica primero, luego ambas propiedades. `cotctl apply --dir` ordena PropertyType antes que Property automáticamente, así que puedes mantener ambos archivos en una carpeta y aplicar la carpeta de una sola vez.

Dos cosas que debes saber:

- **No puedes borrar un schemaNode quitándolo del YAML.** cotctl vuelve a fusionar los nodos del servidor en la actualización para evitar la pérdida accidental de datos — desactiva un nodo con `isActive: false` en el nodo en su lugar.
- **Las claves de `schemaInstance` se verifican contra el tipo.** Las claves desconocidas producen una advertencia no bloqueante (el valor igual se escribe), así que una errata no detiene el apply — lee las advertencias.

## Receta 10 — Protege un pipeline de CI con un diff seguro

En CI quieres una previsualización que **falle el build** cuando un apply destruiría algo, además de una salida legible por máquina para el registro. Los comandos de apply acotados `surveys`, `properties` y `workflows` soportan exactamente eso.

**Qué necesitas:** un perfil de CI y el YAML bajo control de versiones.

```bash
cotctl surveys apply -f survey.yaml -c ci \
  --dry-run \
  --diff compact \
  --fail-on-destructive \
  --json
```

- `--dry-run` — valida y previsualiza, no muta nada.
- `--diff compact` — cambios a nivel de campo (`off`, `compact` o `verbose`).
- `--fail-on-destructive` — sale con **2** si el diff contiene algún hallazgo de severidad danger (requiere `--dry-run`).
- `--json` — un objeto JSON por línea en stdout, para tus registros de CI.

**Códigos de salida** — ramifica tu pipeline según ellos:

| Código | Significado |
|--------|-------------|
| `0` | Limpio — sin errores ni hallazgos destructivos |
| `1` | Error en tiempo de ejecución (red, backend 4xx/5xx, o errores durante un apply real) |
| `2` | La validación falló, **o** `--fail-on-destructive` detectó un hallazgo danger |

<div className="alert alert--warning">

Estas cuatro banderas viven **solo** en los comandos de apply acotados `surveys`, `properties` y `workflows`. El `cotctl apply` unificado — y `bots` / `routines` / `schedules` / `slas` / `property-types` apply — **no** aceptan `--diff`, `--fail-on-destructive` ni el `--json` línea a línea. Apunta tu control de CI al comando acotado del recurso que estás desplegando.

</div>

**Cómo se ve el éxito:** un cambio benigno sale con `0` y el pipeline continúa; un cambio que borraría una pregunta (o similar) sale con `2` y el build se detiene antes de aplicar nada.

## A dónde ir después

- [Referencia YAML de recursos](./resources/surveys.md) — el esquema detrás de cada archivo que editas
- [Solución de problemas](./troubleshooting.md) — cuando una receta no sale según el plan
- [CI/CD](./ci-cd.md) — ejecuta estos flujos automáticamente en cada merge
