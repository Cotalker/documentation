---
title: Job titles (YAML)
sidebar_label: Job titles
displayed_sidebar: developer
---

A **job title** (Cargo) is the bridge between a person and what they can do. It links a [user](./users.md) to a set of [access roles](./roles.md), property-type extensions, and inherited properties. Assign a user a job title, and they inherit everything the job title grants. Because job titles depend on roles and the data model, they're applied after those — and before users.

## The shape of a job title

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

| Field | Required | Notes |
|---|---|---|
| `kind` | Yes | Always `JobTitle` |
| `code` | Yes | Unique per company, 3–50 chars, lowercase/underscores. **Immutable after creation** |
| `display` | Yes | Human-readable label (mutable) |
| `isActive` | No | Defaults to `true` |
| `accessRoles` | No | AccessRole **names** (case-sensitive), max 50 |
| `allowedExtensions` | No | PropertyType **codes**, max 50 |
| `elements` | No | Property **codes** inherited by users |

The three list fields each reference a different resource by name or code:

- **`accessRoles`** → role names the user inherits.
- **`allowedExtensions`** → property *types* a user may attach as a profile extension.
- **`elements`** → specific *properties* (e.g. a default location) the user inherits.

<div className="alert alert--primary">

**These lists are REPLACE-on-update, not merge.** When you update a job title, the array you send *replaces* the one on the server. Omit a role that was already there, and it's removed. Always export before a partial edit:

```bash
cotctl jobtitles export store_manager -c acme -o store_manager.yaml
```

</div>

<div className="alert alert--info">

**Role names are case-sensitive.** `cotctl` matches `accessRoles` exactly. If a name isn't found, the error includes a "did you mean…?" suggestion — usually a casing slip. List the real names with `cotctl roles list -c <profile>`.

</div>

## Renaming

Like several resources, `code` is immutable, and there's no in-place rename for job titles. To change a code: deactivate the old one, create a new one, then re-point the affected users with `cotctl users apply` setting their `job` to the new code.

## Deactivation and reactivation

Deactivate with the dedicated command (or `isActive: false` in YAML):

```bash
cotctl jobtitles deactivate store_manager -c acme
```

Reactivating is deliberately guarded: applying `isActive: true` to a currently-inactive job title requires the explicit `--allow-reactivate` flag, so you never bring one back by accident.

## Apply job titles before users

<div className="alert alert--secondary">

**Order matters here for a subtle reason.** If you apply a user whose `job` code doesn't yet exist as a job title, the backend may silently create a placeholder job title — often malformed or inactive — which then breaks later user applies. Applying job titles first avoids this entirely, and `cotctl apply --dir` enforces the order for you.

</div>

## See also

- [Roles](./roles.md), [Property types](./properties.md) — what a job title references
- [Users](./users.md) — reference job titles via `job`
- [apply](../commands/apply.md) — job titles are applied fourth, before users
