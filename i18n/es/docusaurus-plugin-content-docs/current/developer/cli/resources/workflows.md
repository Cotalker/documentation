---
title: Workflows (YAML)
sidebar_label: Workflows
displayed_sidebar: developer
---

Un **workflow** modela un proceso: una tarea que se mueve a través de una serie de estados, desde la creación hasta el cierre. Los workflows son el recurso más potente — y el más estructurado — de Cotalker. La buena noticia es que rara vez escribís uno desde cero: [`cotctl workflows scaffold`](../commands/scaffolding.md) genera un esqueleto correcto, y esta página explica qué contiene ese esqueleto para que lo personalices con confianza.

## La jerarquía

Un único documento YAML de workflow gestiona una estructura anidada:

```
Workflow                 (el proceso: nombre, permisos, settings)
└── stateMachines[]      (uno o más flujos independientes)
    └── states[]         (los pasos por los que pasa una tarea)
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
  - Admin                        # nombres de AccessRole
writePermissions:
  - Admin
  - Manager
stateMachines:
  - # ...
```

| Campo | Requerido | Notas |
|---|---|---|
| `kind` | Sí | Siempre `Workflow` |
| `nameCode` | Sí | Único por empresa. **Inmutable tras la creación.** Mín. 3 caracteres, minúsculas/guiones bajos |
| `nameDisplay` | No | Nombre para mostrar. Si se omite, apply corre en "modo SM-only" (ver abajo) |
| `isActive` | No | Por defecto `true` |
| `hideClosedAfterDays` | No | Días antes de ocultar tareas cerradas. **Por defecto 7, que suele ser demasiado corto** — considerá 30 |
| `readPermissions` / `writePermissions` | No | **Nombres** de AccessRole — quién puede leer / crear tareas |

<div className="alert alert--secondary">

**Los permisos se matchean por nombre, y los typos fallan en silencio.** Las listas de permisos usan *nombres* de AccessRole, que `cotctl` resuelve a IDs en el apply. Si un nombre no existe en el servidor, se **descarta silenciosamente** — sin error. Después de aplicar, verificá con `cotctl workflows get <nameCode>` que cada permiso haya quedado.

</div>

## Máquinas de estado

Cada entrada en `stateMachines[]` es un flujo independiente. Declara qué datos la mueven y dónde arranca:

```yaml
stateMachines:
  - code: sm_po_main
    name: PO Main Flow
    propertyType: pt_po_states     # inmutable tras la creación
    asset:
      type: unique                 # "unique" o "generic" — inmutable
      propertyType: pt_po_assets
    initialState: po_draft         # un código de propiedad de estado
    states:
      - # ...
```

El `propertyType` y el `asset.type` son **inmutables tras la creación** — definen la forma fundamental del flujo, así que planificalos de antemano.

## Estados y transiciones

Cada estado corresponde a una [Property](./properties.md) y declara su tipo de ciclo de vida y sus transiciones salientes:

```yaml
states:
  - property: po_draft        # un código de Property que ya debe existir
    type: new                 # "new" | "in-progress" | "closed" — inmutable
    next:
      - target: po_approved
        canChange: manual
      - target: po_rejected
        canChange: survey
        requiredSurvey: survey_rejection_reason
```

El `canChange` de una transición controla cómo se dispara:

| `canChange` | Significado |
|---|---|
| `manual` (default) | Un usuario la dispara desde la UI de la tarea |
| `survey` | El usuario debe completar una encuesta primero — poné `requiredSurvey` con su código |
| `none` | Solo la automatización/el sistema puede dispararla (ej. auto-cierre) |

<div className="alert alert--primary">

**Los estados son permanentes.** Una vez creado, un estado no puede borrarse ni desactivarse, y su `type` no puede cambiar. Quitar un estado de tu YAML no lo borra — el apply bloqueará el cambio. Diseñá tu conjunto de estados deliberadamente.

</div>

## Automatización: bots

Las transiciones y los estados pueden disparar **bots** — pequeñas rutinas de automatización que corren cuando una transición se dispara o se envía un formulario (enviar una notificación, crear una tarea de seguimiento, llamar a una API). Los bots son un tema avanzado, con su propio catálogo de tipos; por ahora, lo que importa es una regla de seguridad:

<div className="alert alert--secondary">

**Las tres formas de un campo `bots` — y por qué importa.** Cuando escribís un slot `bots` en YAML, la forma que elegís cambia el comportamiento:

| YAML | Efecto en el apply |
|---|---|
| Campo **ausente** | **Preservar** los bots que el servidor ya tiene en ese slot |
| `bots: []` | **Borrar** los bots de ese slot (destructivo) |
| `bots: [{...}]` | **Reemplazar** por el bot que declaraste |

Si los bots se configuraron fuera de `cotctl` (por ejemplo, en el builder web), un `bots: []` accidental los borrará. Ante la duda, hacé `cotctl workflows export` primero para ver qué hay.

</div>

## Modo SM-only

Si omitís `nameDisplay`, el apply corre en **modo SM-only**: toca solo las máquinas de estado y los estados, dejando intactos los settings de display y los permisos del workflow. Es justo lo que querés al agregar una segunda máquina de estado a un workflow que ya existe, sin resetear nada.

## Una nota de dependencias

El `requiredSurvey` de una transición referencia una encuesta por código. Por el orden de apply, cuando usás `apply --dir`, los workflows se aplican *antes* que las encuestas. Si una transición necesita una encuesta, aplicá las encuestas primero, luego el workflow:

```bash
cotctl surveys apply -f surveys.yaml -c acme
cotctl workflows apply -f workflow.yaml -c acme
```

## Ver también

- [Scaffolding](../commands/scaffolding.md) — generá el esqueleto del workflow
- [Propiedades](./properties.md) y [Roles](./roles.md) — los recursos que un workflow referencia
- [validate](../commands/validate.md) — el checklist de preparación para producción de workflows en vivo
