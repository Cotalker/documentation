---
title: Access roles (YAML)
sidebar_label: Roles
displayed_sidebar: developer
---

<!-- source: repositories/cotctl/src/commands/roles.ts, src/lib/permission-warnings.ts @ 4f7248a (2026-07-06) -->

An **access role** bundles a set of permissions under a name. Roles are the foundation of access control in Cotalker — every other resource that grants access (workflows, property types, job titles, users) refers to roles by name. That's why `cotctl apply --dir` applies roles *first*: everything else depends on them.

## The shape of a role

A role is a `name`, an optional `description`, and a list of `permissions`:

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

| Field | Required | Notes |
|---|---|---|
| `kind` | Yes | Always `AccessRole` |
| `name` | Yes | Unique per company. **Case-sensitive** — it's the upsert key |
| `description` | No | Free text |
| `active` | No | Defaults to `true`. **Note the field is `active`, not `isActive`** |
| `permissions` | Yes | At least one permission |

<div className="alert alert--secondary">

**Two easy mistakes to avoid.** First, the active flag here is `active` — not `isActive` like every other resource. Writing `isActive` is silently ignored. Second, `name` is case-sensitive: `Admin` and `admin` are *different* roles, so applying the wrong casing creates a brand-new role instead of updating the one you meant.

</div>

## Naming conventions

Cotalker's implementation convention is one role per permission, named `{flow}:{action}`, plus an aggregate "Manager" role that holds the full set:

```yaml
# Composable, one permission each
name: "ordenes-compra:start-form"
name: "ordenes-compra:view"
name: "ordenes-compra:view-all"
name: "ordenes-compra:write"

# Aggregate
name: "Órdenes de Compra: Manager"
```

This composability is what lets you assign exactly the right access to each job title.

<div className="alert alert--info">

**The convention warnings are about `permissions`, not `name`.** On apply, `cotctl` prints non-blocking warnings when the entries inside a role's `permissions[]` list stray from the `{flow}:{action}` shape — the role's own `name` is not what's checked. The warnings never block the apply; they're a nudge toward consistent permission strings.

</div>

## Renaming a role

Changing `name` creates a *new* role — it doesn't rename the existing one. To rename in place while keeping all references intact, pin the role by its `id`:

```bash
cotctl roles export "Old Name" -c acme -o role.yaml
```

Then uncomment the `id` line in the exported file, change `name`, and apply. (The role's permissions can be edited at the same time.)

## Deactivating

Either the dedicated command:

```bash
cotctl roles deactivate "old-role:viewer" -c acme
```

…or declaratively with `active: false` in the YAML, which is handy in version-controlled, batch setups.

## Applying several at once

A single file can hold many roles, separated by `---` — this is the common pattern for a workflow's whole permission set:

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

## See also

- [apply](../commands/apply.md) — roles are applied first
- [Job titles](./jobtitles.md) and [Workflows](./workflows.md) — both reference roles by name
- Use `cotctl roles list -c <profile>` to see existing role names and their exact casing
