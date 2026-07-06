---
title: Usuarios (YAML)
sidebar_label: Usuarios
displayed_sidebar: developer
---

<!-- source: repositories/cotctl/src/schemas/user.schema.ts, src/commands/users.ts, docs/users/apply-behavior.md @ 4f7248a (2026-07-06) -->

Un **usuario** es una persona en una empresa. Los usuarios son el recurso más conectado de Cotalker — cada uno referencia un [cargo](./jobtitles.md), uno o más [roles de acceso](./roles.md), y puede ubicarse en una jerarquía de organigrama con otros usuarios. Por esas dependencias, los usuarios se aplican **al final** (después de que existan los cargos y roles).

## La forma de un usuario

```yaml
kind: User
email: juan.perez@acme.com
name:
  names: Juan
  lastName: Pérez
job: store_manager               # código de JobTitle — debe estar activo
accessRoles:
  - "ordenes-compra:manager"     # nombres de AccessRole — sensibles a mayúsculas
phone: "+56912345678"
isActive: true
```

| Campo | Requerido | Notas |
|---|---|---|
| `kind` | Sí | Siempre `User` |
| `email` | Sí | La clave de upsert. Único globalmente, auto-minúsculas. **Inmutable tras la creación** |
| `name` | Sí | Sub-objeto: `names` (requerido), `lastName`, `secondLastName` |
| `job` | No | Un **code** de JobTitle que exista y esté **activo**. Opcional — los usuarios bot y de integración suelen no tener |
| `accessRoles` | No | **Nombres** de AccessRole (sensibles a mayúsculas) |
| `phone`, `isActive`, `settings` | No | Campos de perfil opcionales |

El campo `name` es un objeto, no un string. `cotctl` construye el nombre para mostrar a partir de él automáticamente:

```yaml
name:
  names: Juan
  lastName: Pérez
  secondLastName: García
```

## Cargo y roles

`job` apunta a un cargo por **code**, y ese cargo debe estar activo — `cotctl` solo resuelve los activos. Es **opcional**: los usuarios bot y de integración a menudo no tienen cargo, y tanto el esquema como el backend aceptan un usuario sin él. `accessRoles` lista **nombres** de rol, y como en todas partes, son sensibles a mayúsculas (`Manager` ≠ `manager`).

<div className="alert alert--info">

**El rol por defecto.** Si creás un usuario sin `accessRoles`, el backend le asigna un rol `default` automáticamente. Lo vas a ver aparecer en exportaciones posteriores — eso es esperado, no un bug.

</div>

## Jerarquía

Podés ubicar a un usuario en el organigrama con `hierarchy`. Las tres listas contienen **emails**, resueltos en el momento del apply:

```yaml
hierarchy:
  boss:
    - manager@acme.com
  peers:
    - colleague@acme.com
  subordinate:          # ¡singular!
    - junior1@acme.com
    - junior2@acme.com
```

<div className="alert alert--primary">

**`subordinate` es singular.** La clave es `subordinate`, no `subordinates`. Como el esquema de usuario es permisivo, escribir el plural *no produce error* — el usuario se aplica sin subordinados, silenciosamente. Verificá dos veces esta clave cada vez que construyas una jerarquía.

</div>

Cuando aplicás un batch de usuarios que se referencian entre sí (el jefe de A es B, ambos nuevos), `cotctl` lo maneja con un apply de dos pasadas, así las referencias hacia adelante resuelven correctamente.

## Metadata personalizada: `extra`

`extra` es un mapa clave-valor libre para cualquier otra cosa que necesites guardar:

```yaml
extra:
  department: "Sales"
  rut: "12.345.678-9"
```

Al actualizar, `extra` se **fusiona** — las claves que proveés ganan, las que ya están en el servidor se conservan. No podés borrar una clave de `extra` a través del YAML.

<div className="alert alert--secondary">

**`extra` suele contener PII** (documentos de identidad, etc.), y aparece tal cual en las exportaciones. Revisá este campo antes de commitear un YAML de usuario exportado al control de versiones.

</div>

## Aplicar usuarios: contraseñas, onboarding y reactivación

`password` es de solo escritura — puedes establecerla en el apply, pero nunca se exporta. Cómo se desarrolla el onboarding depende de si estableces una contraseña y de si pasas `--notify-email`:

| Estableces… | Resultado |
|---|---|
| Sin `password`, con `--notify-email` | **Recomendado.** El backend genera una contraseña y envía las credenciales por correo al nuevo usuario |
| Con `password`, con `--notify-email` | **Rechazado** (salida `2`) — el correo de bienvenida filtraría una contraseña enmascarada, así que `cotctl` bloquea la combinación |
| Con `password`, sin `--notify-email` | La contraseña se establece; `cotctl` advierte que queda en texto plano en tu YAML |
| Sin `password` en un **update** | La contraseña existente se deja intacta — nunca se borra |

**La reactivación está protegida.** Un usuario inactivo que reaparece con `isActive: true` (u omitido, ya que el default es `true`) **no** se reactiva automáticamente — `apply` se detiene con salida `2` y te indica reejecutar con `--allow-reactivate`. Dos situaciones no se pueden anular en absoluto: un usuario `isReadOnly` nunca se modifica, y un usuario `role: super` no se puede desactivar (ambos salen con `1`).

Para desactivar un usuario sin borrar nada:

```bash
cotctl users deactivate juan.perez@acme.com -c acme
```

Como en todo `cotctl`, los códigos de salida son significativos aquí: `0` éxito, `1` un error de ejecución a mitad del apply (red, un error de API, un email de jerarquía irresoluble), y `2` un fallo de validación previo al apply (YAML inválido, un code de cargo desconocido, una reactivación sin el flag, el conflicto password/notify-email).

## Ver también

- [Cargos](./jobtitles.md) — el `job` que un usuario referencia (aplicá estos primero)
- [Roles](./roles.md) — los `accessRoles` que un usuario referencia
- [apply](../commands/apply.md) — los usuarios se aplican al final
