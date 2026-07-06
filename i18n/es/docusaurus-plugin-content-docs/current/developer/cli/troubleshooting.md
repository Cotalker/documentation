---
title: Solución de problemas
sidebar_label: Solución de problemas
displayed_sidebar: developer
---

<!-- source: repositories/cotctl/src/lib/validate-bot-versions.ts, src/lib/validate-cron.ts, src/commands/bots.ts, src/commands/bot-types.ts @ 4f7248a (2026-07-06) -->

La mayoría de los errores de `cotctl` son claros y te dicen cómo resolverlos. Esta página reúne los que más probablemente vas a encontrar, organizados como **síntoma → causa → solución** para que encuentres el tuyo rápido.

## Instalación y setup

### `cotctl: command not found` después de un install global

- **Causa:** el directorio de binarios globales de npm no está en tu `PATH`.
- **Solución:** confirmá dónde instala npm los binarios globales con `npm bin -g`, y agregá ese directorio a tu `PATH`. Como atajo, siempre podés ejecutar la herramienta vía `npx @cotctl/cli <command>`.

## Autenticación y perfiles

### `--company/-c is required`

- **Causa:** el comando necesita un perfil y no pasaste ninguno. No hay default, por diseño.
- **Solución:** agregá `-c <profile>`. Ejecutá `cotctl profile list` para ver los nombres disponibles.

### `Profile '<name>' not found`

- **Causa:** ese perfil no existe localmente (typo, o nunca te logueaste a él).
- **Solución:** revisá `cotctl profile list`; ejecutá `cotctl login` si falta.

### `Session expired for profile "<name>"` / `Failed to refresh token`

- **Causa:** el token tiene más de 7 días, o fue revocado del lado del servidor.
- **Solución:** ejecutá `cotctl login` de nuevo para ese entorno.

### `API Error 401`

- **Causa:** el token es inválido.
- **Solución:** reautenticate con `cotctl login`.

### `API Error 403`

- **Causa:** el usuario logueado no tiene los permisos de administración requeridos.
- **Solución:** esto es un tema de permisos de Cotalker — pedile al administrador de la empresa que le otorgue al usuario los permisos necesarios, y reintentá.

### `Could not discover API URL from <url>`

- **Causa:** la URL del webclient es incorrecta, o (común on-premise) el webclient no sirve el archivo de variables que `cotctl` lee para encontrar la API.
- **Solución:** revisá el `--url`. On-premise, pasá la API explícitamente con `--api-url https://api.empresa.com`.

### `Token does not belong to the specified company`

- **Causa:** el token fue emitido para una empresa distinta del subdominio/URL que especificaste.
- **Solución:** verificá que el `--subdomain` y la `--url` coincidan con el entorno que querés.

## YAML y validación

### `YAML parse error`

- **Causa:** sintaxis YAML inválida — normalmente indentación o un carácter perdido.
- **Solución:** revisá la indentación (espacios, no tabs) y el formato. Ejecutar `cotctl validate -f <file>` apunta a la línea problemática.

### Conflicto de identificador en validación remota / `Duplicate key error`

- **Causa:** un `identifier` de pregunta ya existe en otra encuesta de la empresa — los identificadores son únicos a nivel de empresa, no por encuesta.
- **Solución:** renombrá el identifier, prefijándolo con el código de la encuesta (ej. `re_nombre` en vez de `nombre`).

### Un exec hook no corre, o `Illegal return statement`

- **Causa:** al `src` del script le falta su envoltura `function run()`, así que un `return` de nivel superior es inválido.
- **Solución:** envolvé la lógica en `function run() { ... }` (o `async function run()`).

## Encuestas: preguntas huérfanas

Esta vale la pena entenderla porque es fácil de evitar y molesta de deshacer.

- **Síntoma:** después de aplicar una encuesta con `questions: []`, ya no podés re-crear preguntas con los mismos identificadores.
- **Causa:** aplicar un array de preguntas *vacío* deja las preguntas viejas atrás como registros huérfanos, y sus identificadores (únicos por empresa) ahora bloquean la re-creación.
- **Solución / prevención:** nunca apliques `questions: []` para "limpiar" una encuesta. Para desactivar una encuesta, poné `isActive: false` *sin* tocar la sección de preguntas — `cotctl` preserva las preguntas existentes automáticamente cuando la sección está ausente. (Recuperarse de un huérfano existente requiere limpieza en el backend, así que acá la jugada es la prevención.)

## Bots, schedules y rutinas

Estos recursos llegaron en las versiones 0.9–0.11 y tienen algunos modos de fallo que conviene conocer.

### `version must be specified` / `is not a registered version`

- **Causa:** el tipo de bot en tu YAML fija una `version` que el backend no tiene registrada, u omite `version` para un tipo que no tiene default. `cotctl` valida las versiones de bot al aplicar contra el catálogo **en vivo**, y una versión desconocida es un error (código de salida `2`) — el mensaje lista las versiones que *sí* están registradas.
- **Solución:** consulta el catálogo en vivo y fija una versión real. `cotctl bot-types versions <BotType>` muestra cada versión registrada y el default de un tipo; `cotctl bot-types list` muestra todo el catálogo. (Un *tipo* de bot no reconocido — a diferencia de una versión — es solo una advertencia, ya que el catálogo puede no listar todavía un bot recién agregado en el backend.)

### `looks like a Quartz-style expression` / cron inválido

- **Causa:** el campo `cron` de un Schedule no es una expresión cron **UNIX** válida. La trampa más común es una expresión **Quartz** (6 o 7 campos) — la pestaña Avanzado del webclient prellena ejemplos Quartz, y copiar uno tal cual falla, porque `cotctl` (y el scheduler) esperan 5 campos: `minuto hora día-del-mes mes día-de-la-semana`.
- **Solución:** quita los campos de segundos y año para obtener una expresión UNIX de 5 campos. `cotctl` valida el cron del lado del cliente al aplicar, así que lo ves antes de que el schedule se guarde (un cron inválido, de lo contrario, simplemente nunca se dispararía). Una cadena de zona horaria no parseable falla el mismo check — verifica el valor de `tz`/timezone.

### `bots list` ya no muestra el catálogo de tipos de bot

- **Causa:** un **renombrado con ruptura**. `cotctl bots` ahora gestiona entidades **Bot admin** — los slash-commands (`/comando`) que los usuarios ejecutan en el chat — así que `cotctl bots list` lista esos, no el catálogo de tipos de ParametrizedBot que listaba antes.
- **Solución:** el catálogo de tipos se movió a su propio grupo de comandos. Usa `cotctl bot-types list` y `cotctl bot-types versions <BotType>`. El antiguo `cotctl bots versions <BotType>` todavía funciona como **alias obsoleto** — imprime una advertencia y delega en `bot-types versions` — pero se eliminará en `cotctl` 1.0.0, así que actualiza tus scripts ahora.

<div className="alert alert--secondary">

**Una pista colgada que quizá aún veas.** Algunos mensajes de error de versión de bot sugieren `cotctl bots list` para verificar el nombre de un tipo. Desde el renombrado, el comando que realmente quieres es `cotctl bot-types list` — usa ese.

</div>

### Un apply por entidad sale con `2` ante un cambio "destructivo"

- **Causa:** ejecutaste `cotctl surveys apply`, `cotctl properties apply` o `cotctl workflows apply` con `--fail-on-destructive`, y el dry-run marcó un cambio destructivo (una pregunta eliminada, un estado quitado, una desactivación). Es el flag cumpliendo su función: el código de salida `2` significa "se detectó un cambio destructivo", distinto de `1` (error de ejecución) y `0` (éxito).
- **Solución:** si el cambio es intencional, quita `--fail-on-destructive` (o aplica sin `--dry-run`) para continuar. Si no lo es, acabas de atrapar un error antes de que llegara al entorno — revisa el diff. Este gate existe solo en los apply por entidad, no en el `cotctl apply` unificado.

## ¿Todavía atascado?

- Re-ejecutá el comando — muchos errores incluyen una pista precisa sobre la solución.
- Para dudas de esquema, exportá un ejemplo funcionando del mismo recurso y compará:
  `cotctl <entity> export <code> -c <profile> -o example.yaml`
- Mirá la [referencia de comandos](./commands/apply.md) para las opciones y el comportamiento exacto de cada comando.
