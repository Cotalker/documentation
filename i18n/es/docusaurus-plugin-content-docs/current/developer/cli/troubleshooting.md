---
title: Solución de problemas
sidebar_label: Solución de problemas
displayed_sidebar: developer
---

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

## ¿Todavía atascado?

- Re-ejecutá el comando — muchos errores incluyen una pista precisa sobre la solución.
- Para dudas de esquema, exportá un ejemplo funcionando del mismo recurso y compará:
  `cotctl <entity> export <code> -c <profile> -o example.yaml`
- Mirá la [referencia de comandos](./commands/apply.md) para las opciones y el comportamiento exacto de cada comando.
