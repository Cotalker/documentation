---
title: Bots (YAML)
sidebar_label: Bots
displayed_sidebar: developer
---

<!-- source: repositories/cotctl/src/commands/bots.ts, src/schemas/bot-admin.schema.ts, src/resources/bot.resource.ts, docs/bots/ @ 4f7248a (2026-07-06) -->

Un **bot** es la entidad detrás de los comandos slash que los operadores disparan desde el chat (`/hola`, `/registrar`). Cada bot tiene una lista de `commands` y, opcionalmente, un grafo de automatización embebido (un **ParametrizedBot**) que se ejecuta cuando se dispara un comando. Como un bot puede invocar casi cualquier cosa de la plataforma, se aplica **al final** en una aplicación por carpeta, después de todo recurso que pudiera referenciar.

<div className="alert alert--primary">

**`bots` no es `bot-types`.** `cotctl bots` gestiona estas *entidades* Bot — las que tienen `name` y `commands[]`. `cotctl bot-types` lista el *catálogo* de bloques de construcción ParametrizedBot (`PBMessage`, `PBCreateTask`, …) que referencias en `stages[].name`. Son superficies distintas — mira [Tipos de bot](./bot-types.md) y la [nota de renombrado](#un-renombrado-reciente) más abajo si usabas una versión antigua de `cotctl`.

</div>

## La forma de un bot

```yaml
kind: Bot
name: "Saludo Bot"                 # clave de upsert — única por empresa, 1..80 caracteres
description: "Bot que saluda con /hola"
isActive: true
global: false

commands:
  - description: "Saluda al usuario"
    isSlash: true
    slashCmd: "hola"               # el literal que escribe el operador (sin la barra inicial)
    isActive: true

parametrizedBot:                   # automatización opcional que corre al dispararse un comando
  start: send
  stages:
    - key: send
      name: PBSendMessage
      data:
        channelId: "6a000000000000000000abcd"
        text: "Hola"
      next:
        SUCCESS: ""
        ERROR: ""
```

| Campo | Requerido | Notas |
|---|---|---|
| `kind` | Sí | Siempre `Bot` |
| `name` | Sí | La clave de upsert. Única por empresa, 1–80 caracteres. Sin reglas de formato — cualquier texto |
| `description` | No | Texto libre |
| `isActive` | No | Predeterminado `true`. Borrado lógico reaplicando con `isActive: false` |
| `global` | No | Predeterminado `false`. Con `true`, el bot está disponible en todas las empresas — habitual en producción, sin advertencia al aplicar |
| `commands` | No | Comandos slash y comandos de formulario. Mira la regla de tres vías más abajo |
| `parametrizedBot` | No | El grafo de automatización, misma forma que los bots embebidos en [workflows](./workflows.md) |
| `extraData` | No | Flags de funcionalidad de formato libre (`messages`, `messagesWithSubsurveys`) |

<div className="alert alert--info">

**`name` es la identidad — no hay `code`.** A diferencia de la mayoría de los recursos, un bot se busca por `name`, y la coincidencia es exacta. `cotctl` tampoco expone un campo `version`: se fija en V3 al crear, la única máquina que el webclient de administración permite guardar.

</div>

## Comandos

Cada entrada en `commands[]` es una acción que un operador puede disparar. Un comando puede ser un comando slash puro, un comando de formulario, o ambos:

```yaml
commands:
  # comando slash puro: el operador escribe /hola y el bot corre
  - description: "Saluda"
    isSlash: true
    slashCmd: "hola"

  # comando de formulario: el operador escribe /registrar, se presenta una
  # Survey y luego corre el bot cuando se responde
  - description: "Inicia el registro"
    isSlash: true
    slashCmd: "registrar"
    isSurvey: true
    surveyIds:
      - "6a000000000000000000abcd"   # un ObjectId de Survey — NO un código de formulario
```

Algunas cosas suelen confundir:

- **`slashCmd` es el texto literal**, sin la barra inicial — el chat la antepone. No hay reglas de formato; espacios y acentos se comparan tal cual. Es obligatorio siempre que `isSlash: true`.
- **`surveyIds` toma ObjectIds de Survey, no códigos.** Aquí los códigos no se resuelven. Obtén el `_id` con `cotctl surveys list -c <perfil>`. El campo es una lista porque un comando puede presentar varios formularios, aunque en la práctica suele ser uno.
- **`showHelp`** (predeterminado `true`) controla si el comando aparece en la ayuda automática del chat. **`isActive`** en un comando (predeterminado `true`) oculta solo ese slash manteniendo el bot vivo — tanto el `isActive` del bot como el del comando deben ser `true` para que un comando sea alcanzable.
- **`arguments[]`** existe para el parseo de comandos slash pero es exótico — prácticamente sin uso en producción. Trátalo como una salida de emergencia poco frecuente.

<div className="alert alert--primary">

**`commands` reemplaza por completo al actualizar — y su ausencia significa "conservar".** Esta es la regla operativa más importante de los bots. Al aplicar una actualización:

| YAML | Resultado |
|---|---|
| `commands` omitido | El arreglo existente se **conserva** intacto |
| `commands: [ … ]` | El arreglo existente se **reemplaza por completo** — se descarta todo comando ausente de tu lista |
| `commands: []` | **Se eliminan todos los comandos.** `cotctl` se niega a hacerlo en silencio: advierte y te obliga a reescribir el nombre del bot para confirmar — incluso con `-y` |

No hay fusión inteligente por `slashCmd`. Para agregar un comando a un bot existente, expórtalo, agrega la entrada y reaplica:

```bash
cotctl bots export "Saludo Bot" -c acme -o bot.yaml
# edita bot.yaml — agrega a commands[]
cotctl bots apply -f bot.yaml -c acme
```

</div>

## La automatización: `parametrizedBot`

`parametrizedBot` es el grafo que corre cuando se dispara un comando. Tiene la misma forma que los bots que embebes en estados de workflow, SLAs y schedules — un estado `start` y una lista de `stages[]`, cada uno con un `name` (el tipo de bot), una carga `data` y ramas `next`. Para la referencia completa de ParametrizedBot, mira [Workflows](./workflows.md).

Lo único que conviene destacar acá: un stage puede invocar una [rutina](./routines.md) (PBScript) independiente. Es el patrón más común en los bots de producción:

```yaml
parametrizedBot:
  start: invoke_routine
  stages:
    - key: invoke_routine
      name: PBScript
      data:
        code: rutina_calcular_riesgo   # debe ser un código de rutina real
      next:
        SUCCESS: send_message
        ERROR: ""
```

Cuando tu YAML declara un stage `PBScript`, `cotctl` comprueba que el código de la rutina exista de verdad en el perfil antes de aplicar — así un error de tipeo falla al aplicar con una sugerencia de "¿quisiste decir…?", no en silencio en tiempo de ejecución. También valida que `start` apunte a un stage real y que cada rama `next` caiga en un stage real o en la cadena vacía (una rama terminal).

## El usuario del bot

Todo bot tiene una cuenta de usuario dedicada que el backend crea automáticamente en la primera aplicación. Su correo se deriva del nombre del bot y del subdominio de la empresa (`saludo-bot.acme.bot@cotalker.com`), queda marcado como `system: 'bot'` y recibe el rol `bot-default`.

<div className="alert alert--secondary">

**El usuario del bot no se gestiona desde `cotctl bots`.** Nunca aparece en el YAML — ni al crear, ni al exportar (el correo se emite como comentario, de referencia). Como `cotctl` nunca lo lee ni lo escribe, cualquier edición que le hagas desde el webclient de administración (roles, teléfono, avatar) **sobrevive a las reaplicaciones**. La contracara: `cotctl` tampoco puede revertir esas ediciones. Para cambiar el usuario del bot, edítalo directamente con `cotctl users apply` o la UI de administración. También lo encontrarás listado entre los [usuarios](./users.md) — es el que lleva `system: 'bot'`.

</div>

## Trabajar con bots

```bash
# Lectura
cotctl bots list                          # bots activos (predeterminado)
cotctl bots list --all                    # incluir inactivos
cotctl bots list --search "greet"         # búsqueda del backend
cotctl bots list --global-only            # solo global: true
cotctl bots get "Saludo Bot"
cotctl bots export "Saludo Bot" -o bot.yaml

# Escritura
cotctl bots apply -f bot.yaml --dry-run   # previsualizar
cotctl bots apply -f bot.yaml -y
```

`apply` toma `-f/--file` (obligatorio), `--dry-run`, `-y/--yes` y `-q/--quiet`, y admite archivos multidocumento. Como siempre, primero `--dry-run` — sobre todo contra producción — para ver el plan de creación/actualización y cualquier error de validación antes de escribir nada.

<div className="alert alert--info">

**Sin `deactivate`, `test` ni `logs`.** No existe `cotctl bots deactivate` (en su lugar, borrado lógico con `isActive: false`), ni `cotctl bots test`, ni `cotctl bots logs` — el backend aún no tiene endpoints consolidados para los dos últimos.

</div>

## Un renombrado reciente

Si usaste una versión antigua de `cotctl`, el espacio de nombres `bots` cambió de significado:

- **`cotctl bots list`** antes listaba el *catálogo de tipos* (`PBMessage`, …). Ahora lista tus *entidades* Bot. **No hay alias** — los scripts que esperaban el catálogo deben pasar a `cotctl bot-types list`.
- **`cotctl bots versions <BotType>`** sigue funcionando pero está **obsoleto**: imprime una advertencia y delega en `cotctl bot-types versions <BotType>`. Se eliminará en `cotctl` 1.0.0.

Mira [Tipos de bot](./bot-types.md) para los comandos del catálogo.

## Ver también

- [Tipos de bot](./bot-types.md) — el catálogo de bloques de construcción de stages (`bots` ≠ `bot-types`)
- [Rutinas](./routines.md) — los PBScripts que invoca un stage `PBScript`
- [Workflows](./workflows.md) — la referencia completa de ParametrizedBot
- [Formularios](./surveys.md), [Usuarios](./users.md) — lo que referencia un bot
- [apply](../commands/apply.md) — los bots se aplican al final
