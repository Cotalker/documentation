---
title: Exportar e importar
sidebar_label: Exportar e importar
displayed_sidebar: developer
---

<!-- source: repositories/cotctl/src/commands/{surveys,roles,property-types,properties,workflows,users,jobtitles,bots,bot-types,routines,schedules,slas}.ts @ 4f7248a (2026-07-06) -->

Hasta ahora hablamos de empujar YAML *hacia* un entorno. Con la misma frecuencia, vas a querer extraer configuración existente *de* uno — para poner bajo control de versiones la configuración existente de un cliente, copiar un recurso entre entornos, o simplemente ver cómo está construido algo. Ese ciclo — **exportar → editar → aplicar** — es uno de los patrones más útiles de `cotctl`.

Esta página usa formularios como ejemplo, porque tienen las opciones de exportación más ricas. La misma forma `list` / `get` / `export` / `apply` se repite en los otros grupos de entidades: `roles`, `property-types`, `properties`, `users`, `jobtitles`, `workflows`, y los más nuevos `bots`, `bot-types`, `routines`, `schedules` y `slas`.

<div className="alert alert--info">

**No todos los grupos tienen los cuatro verbos.** La forma es un patrón, no una garantía — algunos grupos difieren:

- **`bot-types` es de solo lectura.** Expone solo `list` y `versions <BotType>` (el catálogo en vivo de tipos de ParametrizedBot). No hay `bot-types apply`; los bots se redactan con `cotctl bots`.
- **Los `slas` necesitan su máquina de estado.** `slas get`, `slas export` y las rutas por código requieren `--state-machine <smCode>`, porque no hay una búsqueda global por código para los SLAs.
- **Algunos grupos agregan verbos.** `routines` tiene `test <code>` (ejecuta una rutina de inmediato — efectos secundarios reales); `schedules` tiene `activate` / `deactivate` / `logs`.

</div>

<div className="alert alert--info">

**Nota de nomenclatura.** Los viejos comandos `cotctl get surveys` y `cotctl export survey` fueron eliminados. Usá las formas con alcance de entidad — `cotctl surveys list`, `cotctl surveys export`, etc.

</div>

## Encontrar lo que hay: `list`

Antes de exportar, normalmente necesitás encontrar el recurso. `list` muestra lo que existe, con búsqueda y paginación:

```bash
cotctl surveys list -c acme
```

```
ID                         NAME                  CODE             VER   ACTIVE   MODIFIED
-------------------------------------------------------------------------------------------
507f1f77bcf86cd799439011   Order Request Form    order_request    3     true     2024-03-15
507f1f77bcf86cd799439012   Approval Survey       approval_srv      1     true     2024-02-20
```

Opciones útiles: `-s/--search <text>` para filtrar por nombre o código, `--all` para incluir recursos inactivos, `-l/--limit` y `-p/--page` para paginar, y `--json` para salida procesable por máquina.

## Mirar uno: `get`

Para inspeccionar un único recurso sin escribir un archivo:

```bash
cotctl surveys get order_request -c acme
```

Agregá `--populate` para incluir la lista completa de preguntas (la salida pasa a YAML automáticamente, ya que una tabla no puede mostrar preguntas anidadas), o `-o json` para obtener JSON.

## Extraerlo: `export`

`export` es lo que trae un recurso como archivo YAML que podés versionar y volver a aplicar:

```bash
cotctl surveys export order_request -c acme -o ./order_request.yaml
```

<div className="alert alert--secondary">

**`-o` es una ruta, no un formato.** Un error común al principio es `-o yaml`. El flag `-o`/`--output` es la *ruta de archivo* donde escribir; usá `--format` para elegir el formato. Pasar una palabra clave de formato a `-o` es un error inmediato con un mensaje que te lo indica exactamente.

</div>

Hay dos formatos de exportación disponibles:

| `--format` | Descripción |
|---|---|
| `simplified` (default) | Legible para humanos, con un array `questions[]` limpio — lo que querés para control de versiones |
| `raw` | La representación cruda de la API |

```bash
# YAML simplificado por defecto, impreso a stdout
cotctl surveys export order_request -c acme

# Formato raw, escrito a un archivo
cotctl surveys export order_request -c acme --format raw -o ./order_request_raw.yaml
```

### Mantener los scripts fuera del YAML

Los formularios pueden llevar JavaScript inline (exec hooks). Para un control de versiones más limpio, `--extract-scripts <dir>` saca esos scripts a archivos separados y los reemplaza por referencias `file://` en el YAML:

```bash
cotctl surveys export order_request -c acme \
  -o ./order_request.yaml \
  --extract-scripts ./scripts/
```

Ahora el JavaScript vive en archivos `.js` reales que tu editor y Git pueden manejar correctamente.

## El ciclo completo

Juntando todo, el ciclo exportar–editar–aplicar se ve así:

```bash
# 1. Exportar el recurso en vivo
cotctl surveys export order_request -c acme -o order_request.yaml

# 2. Editar order_request.yaml en tu editor, commitearlo a Git

# 3. Validar, luego aplicar el cambio de vuelta
cotctl validate -f order_request.yaml
cotctl apply -f order_request.yaml -c acme
```

Así es también como **promovés entre entornos** — exportás de staging, aplicás a producción (con el perfil `-c` correspondiente).

## Desactivar en vez de eliminar

Cotalker prefiere la desactivación por sobre el borrado definitivo. Para sacar de uso un formulario sin perderlo:

```bash
cotctl surveys deactivate order_request -c acme
```

Pone `isActive: false` tras una confirmación (`-y` salta la confirmación en scripts).

## Ver también

- [apply](./apply.md) — la otra mitad del ciclo
- [validate](./validate.md) — revisá el YAML exportado antes de re-aplicar
- [Referencia YAML de recursos](../resources/surveys.md) — qué contienen los archivos exportados
