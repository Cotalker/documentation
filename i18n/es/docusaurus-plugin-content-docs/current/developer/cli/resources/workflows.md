---
title: Workflows (YAML)
sidebar_label: Workflows
displayed_sidebar: developer
---

<!-- source: repositories/cotctl/src/commands/workflows.ts, src/schemas/workflow.schema.ts, src/resources/workflow.resource.ts (~208-221), docs/workflows/yaml-structure.md @ 4f7248a (2026-07-06) -->

Un **workflow** modela un proceso: una tarea que se mueve a través de una serie de estados, desde la creación hasta el cierre. Los workflows son el recurso más potente — y el más estructurado — de Cotalker. Rara vez escribes uno desde cero: [`cotctl workflows scaffold`](../commands/scaffolding.md) genera un esqueleto correcto, y esta página explica qué contiene ese esqueleto para que lo personalices con confianza.

Esta es el mapa. Cubre la jerarquía, los campos raíz reales y los comandos; las subpáginas cubren las partes lo bastante sutiles como para morderte — semántica de merge, inmutabilidad, expresiones COTLang.

## La jerarquía

Un único documento YAML de workflow gestiona una estructura anidada:

```
Workflow                 (el proceso: nombre, permisos, ajustes)
└── stateMachines[]      (una o más máquinas de estado independientes)
    └── states[]         (los pasos por los que se mueve una tarea)
        └── next[]       (las transiciones permitidas entre estados)
```

## El nivel del workflow

La parte superior del archivo describe el workflow en sí:

```yaml
kind: Workflow
nameCode: purchase_orders        # inmutable tras la creación
nameDisplay: Purchase Orders
isActive: true
hideClosedAfterDays: 30
readPermissions:
  - purchase_orders:view         # codes de permiso literales (ver abajo)
writePermissions:
  - purchase_orders:start-form
stateMachines:
  - # ...
```

### Campos raíz

El esquema define estos campos de nivel superior:

| Campo | Requerido | Notas |
|---|---|---|
| `kind` | Sí | Siempre `Workflow` |
| `nameCode` | Sí | Único por empresa. **Inmutable tras la creación.** Mín. 3 caracteres, `^[a-z]+([_a-z0-9]+)*$` |
| `nameDisplay` | No | Nombre visible. Si se omite, apply corre en "modo SM-only" (ver abajo) |
| `nameTranslations` | No | `es` / `en` / `pt` / `fr` |
| `color`, `icon` | No | Apariencia visual |
| `weight` | No | Orden de despliegue (por defecto `0`) |
| `isActive` | No | Por defecto `true` |
| `hideClosedAfterDays` | No | Días antes de ocultar tareas cerradas (0–1825). **Por defecto 7, que suele ser muy corto** — considera 30 |
| `readPermissions` | No | Codes de permiso — quién puede leer tareas |
| `writePermissions` | No | Codes de permiso — quién puede crear tareas |
| `taskImportPermissions` | No | Codes de permiso — quién puede importar tareas |
| `taskFollowerPermissions` | No | Codes de permiso — quién puede agregarse como follower |
| `taskEditorPermissions` | No | Codes de permiso — quién puede editar tareas |
| `availableViews`, `defaultView` | No | Qué vistas de UI (ej. kanban, lista) están disponibles |
| `stateMachines` | No | La lista de máquinas de estado |

<div className="alert alert--danger">

**Los campos de permisos son codes de permiso literales — no nombres de AccessRole.** Los cinco arreglos de permisos (`readPermissions`, `writePermissions`, `taskImportPermissions`, `taskFollowerPermissions`, `taskEditorPermissions`) contienen **strings de code de permiso** como `web-admin-write` o `purchase_orders:view`, y `cotctl` los envía al servidor **verbatim** — *no* los resuelve a IDs de AccessRole. Esto es distinto de los formularios, cuyo campo `permissions` *sí* toma nombres de AccessRole. Pon acá el code de permiso mismo, exactamente como aparece en el rol que lo otorga. (Workflows antiguos pueden aún cargar ObjectIds crudos en estos campos por una versión previa de `cotctl`; la exportación los expone con un marcador legacy para que los reemplaces.)

</div>

## Máquinas de estado, estados y transiciones

Cada entrada de `stateMachines[]` es un flujo independiente. Declara qué datos la impulsan y dónde comienza:

```yaml
stateMachines:
  - code: sm_po_main
    name: PO Main Flow
    propertyType: pt_po_states     # inmutable tras la creación
    asset:
      type: unique                 # "unique" o "generic" — inmutable
      propertyType: pt_po_assets
    initialState: po_draft
    states:
      - property: po_draft         # un code de Property que ya debe existir
        type: new                  # "new" | "in-progress" | "closed" — inmutable
        next:
          - target: po_approved
            canChange: manual
          - target: po_rejected
            canChange: survey
            requiredSurvey: survey_rejection_reason
```

Cada estado corresponde a una [Property](./properties.md). Su `type` es uno de `new`, `in-progress`, `closed`. El `canChange` de una transición controla cómo se dispara:

| `canChange` | Significado |
|---|---|
| `manual` (por defecto) | Un usuario la dispara desde la UI de la tarea |
| `survey` | El usuario debe completar un formulario primero — fija `requiredSurvey` con su code |
| `none` | Solo la automatización/sistema puede dispararla (ej. cierre automático) |

Las máquinas de estado también admiten un `requiredSurvey` (un StartForm que condiciona la creación de tareas), y los estados admiten slots `subtask` y `surveyTriggers` — todos ellos pueden llevar **bots** de automatización. Esos slots tienen reglas de preservar/reemplazar/borrar que debes entender antes de editar un workflow en vivo; la página de [Semántica de merge](./workflows/merge-semantics.md) las cubre.

### Modo SM-only

Si omites `nameDisplay`, apply corre en **modo SM-only**: toca solo las máquinas de estado y los estados, dejando intactos los ajustes de despliegue y los permisos del workflow. Es exactamente lo que quieres al agregar una segunda máquina de estado a un workflow que ya existe, sin resetear nada.

## Qué cubren las subpáginas

- **[Semántica de merge](./workflows/merge-semantics.md)** — el contrato GET-merge-PUT (0.7.0+): por qué un campo omitido se preserva pero un `[]` explícito borra, a qué campos aplica y los errores silenciosos que previene. **Léela antes de editar un workflow en vivo.**
- **[COTLang](./workflows/cotlang.md)** — el lenguaje de expresiones para el `data` de los bots, y los caracteres reservados que lo rompen.
- **[Inmutabilidad y versionado](./workflows/immutability-and-versioning.md)** — qué no puede cambiar tras la creación, por qué los estados son permanentes y las reglas de versión de bots que `cotctl` valida.
- **[Ejemplo completo](./workflows/complete-example.md)** — un workflow completo de órdenes de compra, anotado.

## Gestionar workflows con `cotctl`

| Comando | Qué hace |
|---|---|
| `cotctl workflows list` | Lista workflows (activos por defecto; `--all` incluye inactivos) |
| `cotctl workflows get <nameCode>` | Muestra un workflow con sus máquinas de estado y estados |
| `cotctl workflows export <nameCode>` | Exporta un workflow como YAML |
| `cotctl workflows apply -f <archivo>` | Crea o actualiza un workflow desde YAML |
| `cotctl workflows scaffold` | Genera un esqueleto de workflow correcto |
| `cotctl workflows deactivate <nameCode>` | Desactiva el workflow (sus máquinas de estado quedan activas) |

### Aplicar de forma segura

```bash
# Previsualiza contra el servidor, mostrando un diff detallado
cotctl workflows apply -f workflow.yaml -c acme --dry-run --diff verbose

# En CI: falla ante cualquier cambio destructivo que detecte el dry-run
cotctl workflows apply -f workflow.yaml -c acme --dry-run --fail-on-destructive
```

- `--dry-run` valida y muestra qué pasaría sin aplicar.
- `--diff <off|compact|verbose>` fija el detalle del antes/después (por defecto `compact`).
- `--fail-on-destructive` sale con código `2` cuando el dry-run encuentra un cambio de severidad peligrosa (requiere `--dry-run`).
- `--rollback` desactiva lo creado durante un apply parcial si falla a mitad de camino.
- `--yes` omite las confirmaciones; `--json` emite un objeto de resultado por línea.

## Una nota de dependencia

El `requiredSurvey` de una transición referencia un formulario por code. Bajo `apply --dir`, los workflows se aplican *antes* que los formularios, así que el formulario de una transición ya debe existir — aplica primero los formularios cuando los corras por separado:

```bash
cotctl surveys apply -f surveys.yaml -c acme
cotctl workflows apply -f workflow.yaml -c acme
```

## Ver también

- [Scaffolding](../commands/scaffolding.md) — genera el esqueleto del workflow
- [Properties](./properties.md) y [Roles](./roles.md) — los recursos que un workflow referencia
- [validate](../commands/validate.md) — el checklist de preparación para producción de workflows en vivo
- [Modelos de datos](../data-models.md) — Task y TaskGroup, las entidades que un workflow produce
