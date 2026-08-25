---
title: Un workflow completo, anotado
sidebar_label: Ejemplo completo
displayed_sidebar: developer
---

<!-- source: repositories/cotctl/docs/workflows/complete-example.md @ 4f7248a (2026-07-06) -->

Acá tienes un workflow completo de órdenes de compra — una sola máquina de estado con cinco estados, tipos de transición mixtos y un bot de automatización. Léelo una vez de principio a fin, luego arma el tuyo con `cotctl workflows scaffold` y adáptalo.

## El workflow

```yaml
kind: Workflow
nameCode: purchase_orders          # inmutable tras la creación
nameDisplay: Purchase Orders
color: "#FF5722"
hideClosedAfterDays: 30            # fíjalo — no dependas del valor predeterminado de 7 días

# CODES de permiso (no nombres de AccessRole). Pon el code de permiso
# literal que otorga cada capacidad; cotctl los envía verbatim.
readPermissions:
  - purchase_orders:view
  - purchase_orders:view-all
writePermissions:
  - purchase_orders:start-form

stateMachines:
  - code: sm_po_main
    name: PO Main Flow
    propertyType: pt_po_states       # dueño de la lista de estados — inmutable
    asset:
      type: unique                   # un asset por tarea — inmutable
      propertyType: pt_po_assets     # los datos adjuntos de la tarea — inmutable si ya hay tareas
    initialState: po_draft           # un code de property de estado

    # StartForm: un formulario que condiciona la creación de la tarea, con un
    # bot que envía email al creador al ingresar.
    requiredSurvey:
      surveyCode: survey_po_intake
      bots:
        - name: notify-creator
          start: s1
          stages:
            - { key: s1, name: PBEmail, data: { to: "purchasing@acme.com" } }

    states:
      - property: po_draft           # ya debe existir como Property
        type: new                    # new | in-progress | closed — inmutable
        next:
          - target: po_under_review
            canChange: manual         # un usuario la avanza desde la UI de la tarea
          - target: po_rejected
            canChange: survey         # se requiere un formulario primero
            requiredSurvey: survey_rejection_reason

      - property: po_under_review
        type: in-progress
        next:
          - target: po_approved
            canChange: manual
            # Un bot de transición: crea una tarea de seguimiento al aprobar.
            # OJO: cotctl NO resuelve IDs dentro de stage.data —
            # taskGroup debe ser un ObjectId real.
            bots:
              - start: s1
                stages:
                  - key: s1
                    name: PBCreateTask
                    data:
                      taskGroup: "665f0c3e9a1b2c0012ab34cd"
                      propertyValues:
                        priority: "high"
          - target: po_rejected
            canChange: survey
            requiredSurvey: survey_rejection_reason

      - property: po_approved
        type: in-progress
        next:
          - target: po_closed
            canChange: manual

      - property: po_rejected
        type: closed                 # terminal — sin next[]

      - property: po_closed
        type: closed                 # terminal — sin next[]
```

## Qué notar

- **Los permisos son codes, no nombres de rol.** `purchase_orders:view` es el code de permiso mismo — ver [por qué importa](../workflows.md#campos-raíz). Equivocarse en esto es el error más común de workflows.
- **Los campos de asset y `propertyType` son inmutables.** Definen la forma de los datos que carga cada tarea; planifícalos antes de que exista la primera tarea. Ver [Inmutabilidad y versionado](./immutability-and-versioning.md).
- **Dos estados terminales** (`po_rejected`, `po_closed`) no tienen `next[]` — una tarea ahí se queda quieta.
- **Rechazo condicionado por formulario:** ambas transiciones hacia `po_rejected` usan `canChange: survey` con un `requiredSurvey`, así que siempre se captura un motivo.
- **`initialState` nombra un code de property**, no un ID — `cotctl` lo resuelve tras crear los estados.
- **Los slots de bots** (`requiredSurvey.bots`, `bots` de transición) siguen las [reglas de merge](./merge-semantics.md): omitir para preservar, `[]` para borrar, una lista para reemplazar. Los IDs dentro de `stage.data` se pasan intactos.

## Patrones de dos pasos y multi-máquina

Para algo más grande, dos patrones ayudan:

- **Crea el workflow primero, agrega máquinas de estado después.** Aplica un documento mínimo `kind` + `nameCode` + `nameDisplay`, luego aplica las máquinas de estado en [modo SM-only](../workflows.md#modo-sm-only) (omitiendo `nameDisplay`). Esto verifica que el workflow existe antes de que aterrice la estructura más compleja.
- **Múltiples máquinas de estado en un documento** están soportadas — cada una con su propio `code`, `propertyType` y `asset`. Con más de una, fijas la máquina de estado inicial desde la UI o API de Cotalker (no hay campo YAML para ello); con una sola, `cotctl` lo parcha automáticamente.

## Aplícalo

```bash
cotctl workflows scaffold                                   # genera un esqueleto
cotctl workflows apply -f purchase_orders.yaml -c demo --dry-run
cotctl workflows apply -f purchase_orders.yaml -c demo
```

## Ver también

- [Workflows](../workflows.md) · [Semántica de merge](./merge-semantics.md) · [Inmutabilidad y versionado](./immutability-and-versioning.md) · [COTLang](./cotlang.md)
