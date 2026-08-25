---
title: Roles de acceso (YAML)
sidebar_label: Roles
displayed_sidebar: developer
---

<!-- source: repositories/cotctl/src/commands/roles.ts, src/lib/permission-warnings.ts @ 4f7248a (2026-07-06) -->

Un **rol de acceso** agrupa un conjunto de permisos bajo un nombre. Los roles son el fundamento del control de acceso en Cotalker — todo otro recurso que otorga acceso (workflows, tipos de propiedad, cargos, usuarios) se refiere a los roles por nombre. Por eso `cotctl apply --dir` aplica los roles *primero*: todo lo demás depende de ellos.

## La forma de un rol

Un rol es un `name`, una `description` opcional y una lista de `permissions`:

```yaml
kind: AccessRole
name: "ordenes-compra:manager"
description: "Manager role — full access to the OC flow"
active: true
permissions:
  - ordenes-compra:start-form
  - ordenes-compra:view
  - ordenes-compra:view-all
  - ordenes-compra:write
```

| Campo | Requerido | Notas |
|---|---|---|
| `kind` | Sí | Siempre `AccessRole` |
| `name` | Sí | Único por empresa. **Sensible a mayúsculas** — es la clave de upsert |
| `description` | No | Texto libre |
| `active` | No | Por defecto `true`. **Notá que el campo es `active`, no `isActive`** |
| `permissions` | Sí | Al menos un permiso |

<div className="alert alert--secondary">

**Dos errores fáciles de evitar.** Primero, el flag de activo acá es `active` — no `isActive` como en todos los demás recursos. Escribir `isActive` se ignora silenciosamente. Segundo, `name` es sensible a mayúsculas: `Admin` y `admin` son roles *distintos*, así que aplicar el casing equivocado crea un rol nuevo en vez de actualizar el que querías.

</div>

## Convenciones de nombres

La convención de implementación de Cotalker es un rol por permiso, nombrado `{flow}:{action}`, más un rol "Manager" agregado que tiene el conjunto completo:

```yaml
# Componible, un permiso cada uno
name: "ordenes-compra:start-form"
name: "ordenes-compra:view"
name: "ordenes-compra:view-all"
name: "ordenes-compra:write"

# Agregado
name: "Órdenes de Compra: Manager"
```

Esta componibilidad es lo que te permite asignar exactamente el acceso correcto a cada cargo.

<div className="alert alert--info">

**Las advertencias de convención son sobre `permissions`, no sobre `name`.** Al aplicar, `cotctl` imprime advertencias no bloqueantes cuando las entradas dentro de la lista `permissions[]` de un rol se desvían de la forma `{flow}:{action}` — el `name` del rol no es lo que se revisa. Las advertencias nunca bloquean el apply; son un empujón hacia strings de permiso consistentes.

</div>

## Renombrar un rol

Cambiar `name` crea un *nuevo* rol — no renombra el existente. Para renombrar in situ manteniendo todas las referencias intactas, fijá el rol por su `id`:

```bash
cotctl roles export "Old Name" -c acme -o role.yaml
```

Luego descomentá la línea `id` en el archivo exportado, cambiá `name`, y aplicá. (Los permisos del rol pueden editarse al mismo tiempo.)

## Desactivar

Ya sea con el comando dedicado:

```bash
cotctl roles deactivate "old-role:viewer" -c acme
```

…o declarativamente con `active: false` en el YAML, lo que es práctico en setups versionados y por batch.

## Aplicar varios a la vez

Un único archivo puede contener muchos roles, separados por `---` — este es el patrón común para el conjunto entero de permisos de un workflow:

```yaml
kind: AccessRole
name: "ordenes-compra:manager"
permissions:
  - ordenes-compra:view
  - ordenes-compra:write
---
kind: AccessRole
name: "ordenes-compra:solicitante"
permissions:
  - ordenes-compra:start-form
  - ordenes-compra:view
```

## Ver también

- [apply](../commands/apply.md) — los roles se aplican primero
- [Cargos](./jobtitles.md) y [Workflows](./workflows.md) — ambos referencian roles por nombre
- Usá `cotctl roles list -c <profile>` para ver los nombres de rol existentes y su casing exacto
