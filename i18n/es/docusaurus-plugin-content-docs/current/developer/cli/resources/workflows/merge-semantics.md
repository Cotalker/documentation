---
title: Semántica de merge de workflows
sidebar_label: Semántica de merge
displayed_sidebar: developer
---

<!-- source: repositories/cotctl/docs/workflows/merge-semantics.md, src/lib/apply-helpers.ts @ 4f7248a (2026-07-06) -->

Esta es la página más importante que leer antes de editar un workflow que ya está en vivo. Explica qué hace `cotctl workflows apply` con los campos que *no* escribiste — y por qué un `bots: []` de apariencia inocente puede borrar en silencio automatización que alguien construyó en el web builder.

## El contrato, en un párrafo

Desde `cotctl` 0.7.0, actualizar un workflow existente usa **GET-merge-PUT**: `cotctl` trae el estado actual del servidor, mezcla tu YAML encima y envía el resultado. La consecuencia es la regla que debes internalizar — **un campo que omites se preserva desde el servidor; no se borra.** Tu YAML es un parche, no un reemplazo.

## Tres intenciones, tres formas

Para cualquier campo mergeable, la *forma* que escribes codifica tu intención:

| Qué escribes | Qué ocurre |
|---|---|
| **Campo omitido** (sin la clave) | **Preservar** — se mantiene el valor actual del servidor |
| **`nombreCampo: []`** (vacío) | **Borrar** — el valor del servidor se reemplaza por vacío. Destructivo. |
| **`nombreCampo: [ ... ]`** (con valores) | **Reemplazar** — el valor del servidor pasa a ser tu lista |

El arreglo vacío es la trampa. Omitir un campo y ponerlo en `[]` se ven casi iguales en YAML, pero significan lo opuesto: uno dice "déjalo tranquilo", el otro dice "límpialo".

### Antes / después

Supón que el servidor tiene una transición con dos bots configurados en el web builder, y aplicas este YAML para cambiar el target de la transición:

```yaml
- target: po_approved
  canChange: manual
  # bots: no se menciona
```

**Resultado:** los dos bots se preservan. Solo cambiaste lo que declaraste.

Ahora supón que aplicas esto en cambio:

```yaml
- target: po_approved
  canChange: manual
  bots: []
```

**Resultado:** ambos bots se borran. El arreglo vacío es una instrucción explícita de limpiar el slot.

## A qué campos aplica

El merge cubre los campos que suele co-gestionar el web builder, donde una sobrescritura total destruiría datos configurados en la UI:

- **Workflow (Group):** `nameDisplay`, `nameTranslations`, `color`, `icon`, `weight`, `isActive`.
- **TaskGroup:** los cinco arreglos de permisos, `hideClosedAfterDays`, `availableViews`, `defaultView`.
- **Máquina de estado — `requiredSurvey`:** cuando omites el bloque `requiredSurvey` completo, el StartForm del servidor (encuesta, bots, permisos) queda totalmente intacto. Si escribes un bloque parcial, cada subcampo sigue la regla gana-YAML-si-no-preservar.
- **Estado — `subtask`:** sus `bots` (y `target`) se preservan a menos que los declares.
- **Estado — `surveyTriggers[]`:** preservar/reemplazar/borrar a **nivel de arreglo** (omitir preserva la lista completa; `[]` la borra; una lista la reemplaza — no hay merge por entrada).
- **Transiciones — `next[]`:** cada transición se empareja con el servidor por su `target` resuelto. Para una transición emparejada, sus `bots`, `requiredSurvey` y `permissions` se preservan a menos que se declaren; `canChange` sigue tu YAML. Una transición cuyo `target` no coincide con ninguno existente se trata como nueva.
- **Bots**, en cada slot de arriba, siguen la regla omitir/`[]`/lista exactamente.

## Los errores silenciosos que previene (y los que aún debes vigilar)

El merge existe porque `cotctl` pre-0.7.0 emitía cuerpos casi completos con defaults `[]` hardcodeados, que borraban en silencio config gestionada en la UI. Esa clase de bug desapareció para `cotctl`. Dos cosas aún ameritan cuidado:

1. **Un `bots: []` extraviado.** Es la única forma destructiva que aún puedes tipear por accidente. Ante la duda, `cotctl workflows export <nameCode>` primero y mira qué contiene el slot de verdad antes de tocarlo.
2. **Degradación de `canChange`.** El esquema YAML solo permite `manual`, `survey`, `none`, pero el backend también acepta los valores legacy `task-ui` y `*`. Reaplicar un workflow cuya transición usaba uno de esos lo degrada en silencio a `manual`. Preserva el original escribiendo el mismo valor, o aplica con `--legacy-replace-workflows`.

<div className="alert alert--secondary">

**El merge es solo del lado de `cotctl`.** Protege a `cotctl workflows apply`. Un PATCH enviado directamente (webclient, MCP, curl) aún golpea el comportamiento de reemplazo total del backend. El merge es una funcionalidad de `cotctl`, no un cambio en la API.

</div>

## La vía de escape

Si de verdad quieres el comportamiento destructivo antiguo — campos omitidos borrados en el servidor — hay una flag temporal:

```bash
cotctl workflows apply -f workflow.yaml --legacy-replace-workflows
```

Corre cada transformador sin el estado existente del servidor, así que todo lo que no escribiste se limpia. Imprime una advertencia, aplica solo a workflows y **se eliminará en 0.8.0.** Casi nunca la quieres.

## Ver también

- [Workflows](../workflows.md) — la página de inicio y los campos raíz
- [Inmutabilidad y versionado](./immutability-and-versioning.md) — la *otra* clase de sorpresas de apply
- [apply](../../commands/apply.md) — el pipeline de apply compartido
