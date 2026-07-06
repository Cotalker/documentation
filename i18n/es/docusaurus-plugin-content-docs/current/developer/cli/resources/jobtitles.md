---
title: Cargos (YAML)
sidebar_label: Cargos
displayed_sidebar: developer
---

<!-- source: repositories/cotctl/src/schemas/job-title.schema.ts, src/commands/jobtitles.ts @ 4f7248a (2026-07-06) -->

Un **cargo** (Job title) es el puente entre una persona y lo que puede hacer. Vincula un [usuario](./users.md) a un conjunto de [roles de acceso](./roles.md), extensiones de tipo de propiedad y propiedades heredadas. Asígnale un cargo a un usuario, y hereda todo lo que el cargo otorga. Como los cargos dependen de roles y del modelo de datos, se aplican después de esos — y antes que los usuarios.

## La forma de un cargo

```yaml
kind: JobTitle
code: store_manager
display: "Jefe de Tienda"
isActive: true
accessRoles:
  - "ordenes-compra:manager"
  - "ventas:reader"
allowedExtensions:
  - "perfil_jefe"
elements:
  - "elemento_inventario_default"
```

| Campo | Requerido | Notas |
|---|---|---|
| `kind` | Sí | Siempre `JobTitle` |
| `code` | Sí | Único por empresa, 3–50 caracteres. Debe empezar con una letra minúscula, luego minúsculas, dígitos y guiones bajos (`^[a-z]+([_a-z0-9]+)*$`). **Inmutable tras la creación** |
| `display` | Sí | Etiqueta legible (mutable) |
| `id` | No | El ID del registro, de 24 caracteres. Opcional — normalmente se omite, ya que `code` es la clave de upsert |
| `isActive` | No | Por defecto `true` |
| `accessRoles` | No | **Nombres** de AccessRole (sensibles a mayúsculas), máx. 50 |
| `allowedExtensions` | No | **Códigos** de PropertyType, máx. 50 |
| `elements` | No | **Códigos** de Property heredados por los usuarios |

<div className="alert alert--secondary">

**Cuando un code viejo no cumple la regla actual.** El formato de `code` se impone estrictamente al crear. En *update*, si el `code` del registro existente ya viola la regla actual (un cargo viejo creado antes de que la regla se endureciera), `--lax-code` degrada ese check a una advertencia para que igual puedas editar los otros campos del registro. Nunca relaja el check al crear, ni te deja introducir un code nuevo no conforme.

</div>

Los tres campos de lista referencian cada uno un recurso distinto por nombre o código:

- **`accessRoles`** → nombres de rol que el usuario hereda.
- **`allowedExtensions`** → *tipos* de propiedad que un usuario puede adjuntar como extensión de perfil.
- **`elements`** → *propiedades* específicas (ej. una ubicación por defecto) que el usuario hereda.

<div className="alert alert--primary">

**Estas listas son REEMPLAZO al actualizar, no fusión.** Cuando actualizas un cargo, el array que envías *reemplaza* el del servidor. Omite un rol que ya estaba, y se quita. Siempre exporta antes de una edición parcial:

```bash
cotctl jobtitles export store_manager -c acme -o store_manager.yaml
```

</div>

<div className="alert alert--info">

**Los nombres de rol son sensibles a mayúsculas.** `cotctl` matchea `accessRoles` exactamente. Si un nombre no se encuentra, el error incluye una sugerencia "¿quisiste decir…?" — normalmente un desliz de casing. Lista los nombres reales con `cotctl roles list -c <profile>`.

</div>

## Renombrar

Como en varios recursos, `code` es inmutable, y no hay renombrado in situ para cargos. Para cambiar un código: desactiva el viejo, crea uno nuevo, y luego reapunta a los usuarios afectados con `cotctl users apply` poniendo su `job` en el nuevo código.

## Desactivación y reactivación

Desactiva con el comando dedicado (o `isActive: false` en YAML):

```bash
cotctl jobtitles deactivate store_manager -c acme
```

Reactivar está deliberadamente protegido: aplicar `isActive: true` a un cargo actualmente inactivo requiere el flag explícito `--allow-reactivate`, así nunca traes uno de vuelta por accidente.

**No hay borrado** para los cargos — la desactivación es la única vía de eliminación, en línea con el modelo de soft-delete de Cotalker.

## Aplica los cargos antes que los usuarios

<div className="alert alert--secondary">

**El orden importa acá por una razón sutil.** Si aplicas un usuario cuyo `job` aún no existe como cargo, el backend puede crear silenciosamente un cargo placeholder — a menudo malformado o inactivo — que luego rompe applies posteriores de usuarios. Aplicar los cargos primero evita esto por completo, y `cotctl apply --dir` impone el orden por ti.

</div>

## Ver también

- [Roles](./roles.md), [Tipos de propiedad](./properties.md) — lo que un cargo referencia
- [Usuarios](./users.md) — referencian cargos vía `job`
- [apply](../commands/apply.md) — los cargos se aplican cuarto, antes que los usuarios
