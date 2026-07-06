---
title: Inmutabilidad y versionado de bots en workflows
sidebar_label: Inmutabilidad y versionado
displayed_sidebar: developer
---

<!-- source: repositories/cotctl/docs/workflows/immutability.md, src/lib/validate-bot-versions.ts @ 4f7248a (2026-07-06) -->

Algunas partes de un workflow son estructurales: cámbialas después de que existan tareas y corromperías datos, así que Cotalker no te deja. Esta página lista qué queda congelado tras la creación, por qué los estados son permanentes y las reglas de versión de bots que `cotctl` chequea antes de un apply.

## Qué es inmutable tras la creación

| Campo | Alcance | Congelado cuando | Si lo cambias |
|---|---|---|---|
| `nameCode` | Workflow | Siempre | Apply da error |
| `code` | Máquina de estado | Siempre | Se trata como una **nueva** máquina de estado |
| `propertyType` | Máquina de estado | Siempre | Apply da error |
| `asset.type` | Máquina de estado | Siempre | Apply da error |
| `asset.propertyType` | Máquina de estado | Cuando existen tareas activas | Apply da error |
| `asset.property[]` | Máquina de estado | Cuando existen tareas activas | Apply da error |
| `type` | Estado | Siempre | Apply da error |

La regla general: todo lo que define la *forma* de los datos que produce un workflow queda fijo una vez que tareas reales dependen de ello. Planifica `nameCode`, el `propertyType` de la máquina de estado y el modelo de asset por adelantado.

## Los estados son permanentes

Un estado no puede borrarse ni desactivarse una vez que existe. Si tu YAML tiene menos estados que el servidor, apply se detiene con:

```
Cannot remove states: po_draft. States are permanent in Cotalker.
```

Ninguna flag evita esto — debes mantener cada estado existente en tu YAML. **Agregar** estados siempre es seguro; solo la eliminación está bloqueada. Siempre haz `export` antes de editar, para partir del conjunto completo.

## Guardas de desactivación

- Desactivar una **máquina de estado** (`isActive: false`) está bloqueado mientras tenga tareas activas (no cerradas): `Cannot deactivate — it has active tasks.` Ciérralas o reasígnalas primero.
- Desactivar el **workflow** (`cotctl workflows deactivate <nameCode>`) solo alterna el propio `isActive` del workflow. **No** desactiva las máquinas de estado que contiene.

## Cuando de verdad necesitas cambiar un campo congelado

- **`nameCode`** — no es posible. Crea un nuevo workflow y migra las tareas.
- **`propertyType` o `asset.type`** — crea una nueva máquina de estado con un `code` distinto; desactiva la antigua una vez que no tenga tareas activas.
- **`state.type`** — no es posible (los estados son permanentes).
- **`asset.propertyType` con tareas activas** — cierra o mueve cada tarea activa primero, luego aplica.

## Versionado de bots

Los bots llevan dos números de "versión" independientes, y `cotctl` chequea ambos contra el catálogo de bots **en vivo** del servidor durante un dry-run. (Si el catálogo no puede traerse, `cotctl` omite este chequeo con una advertencia en vez de validar contra datos obsoletos.)

### `stage.version` — la versión del tipo de bot

Cada etapa nombra un tipo de bot (`PBCreateTask`, `PBReport`, …), y cada tipo tiene versiones registradas en el servidor. `cotctl` impone:

- **Tipo de bot desconocido** → una **advertencia** (el catálogo puede no listar un tipo recién creado aún). Chequea el nombre con `cotctl bots list`.
- **Una `version` fijada que no está registrada** → un **error**, listando las versiones disponibles para que lo arregles de una.
- **Sin `version` y el tipo no tiene versión predeterminada** (ej. `PBReport`, `PBCalendar`) → un **error**: el runtime no tiene fallback, así que debes fijar una.

### `bot.version` — el motor COTLang

La `version` a nivel de bot selecciona el motor de ejecución COTLang, no el tipo de bot. Solo `2`, `v2`, `3`, `v3` se reconocen; **cualquier otro valor se degrada en silencio a COTLangV2 en tiempo de ejecución.** `cotctl` advierte cuando ve un `bot.version` no reconocido (un pin con forma de semver, basura, etc.) porque el backend no puede exponer la degradación. Si quieres V3, escribe `bot.version: "v3"`; si no, omite el campo.

## Ver también

- [Workflows](../workflows.md) — la página de inicio
- [Semántica de merge](./merge-semantics.md) — la otra clase de sorpresas de apply
- [Ejemplo completo](./complete-example.md) — un workflow con bots adjuntos
