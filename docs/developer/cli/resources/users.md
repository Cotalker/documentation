---
title: Users (YAML)
sidebar_label: Users
displayed_sidebar: developer
---

A **user** is a person in a company. Users are the most connected resource in Cotalker — each one references a [job title](./jobtitles.md), one or more [access roles](./roles.md), and can sit in an org-chart hierarchy with other users. Because of those dependencies, users are applied **last** (after job titles and roles exist).

## The shape of a user

```yaml
kind: User
email: juan.perez@acme.com
name:
  names: Juan
  lastName: Pérez
job: store_manager               # JobTitle code — must be active
accessRoles:
  - "ordenes-compra:manager"     # AccessRole names — case-sensitive
phone: "+56912345678"
isActive: true
```

| Field | Required | Notes |
|---|---|---|
| `kind` | Yes | Always `User` |
| `email` | Yes | The upsert key. Globally unique, auto-lowercased. **Immutable after creation** |
| `name` | Yes | Sub-object: `names` (required), `lastName`, `secondLastName` |
| `job` | Yes | A JobTitle **code** that exists and is **active** |
| `accessRoles` | No | AccessRole **names** (case-sensitive) |
| `phone`, `isActive`, `settings` | No | Optional profile fields |

The `name` field is an object, not a string. `cotctl` builds the display name from it automatically:

```yaml
name:
  names: Juan
  lastName: Pérez
  secondLastName: García
```

## Job and roles

`job` points to a job title by **code**, and that job title must be active — `cotctl` only resolves active ones. `accessRoles` lists role **names**, and like everywhere else, they're case-sensitive (`Manager` ≠ `manager`).

<div className="alert alert--info">

**The default role.** If you create a user with no `accessRoles`, the backend assigns a `default` role automatically. You'll see it appear in later exports — that's expected, not a bug.

</div>

## Hierarchy

You can place a user in the org chart with `hierarchy`. All three lists contain **emails**, resolved at apply time:

```yaml
hierarchy:
  boss:
    - manager@acme.com
  peers:
    - colleague@acme.com
  subordinate:          # ← singular!
    - junior1@acme.com
    - junior2@acme.com
```

<div className="alert alert--primary">

**`subordinate` is singular.** The key is `subordinate`, not `subordinates`. Because the user schema is lenient, writing the plural produces *no error* — the user is applied with no subordinates set, silently. Double-check this key whenever you build a hierarchy.

</div>

When you apply a batch of users that reference each other (A's boss is B, both new), `cotctl` handles it with a two-pass apply, so forward references resolve correctly.

## Custom metadata: `extra`

`extra` is a free key-value map for anything else you need to store:

```yaml
extra:
  department: "Sales"
  rut: "12.345.678-9"
```

On update, `extra` is **merged** — keys you provide win, keys already on the server are kept. You can't delete an `extra` key through YAML.

<div className="alert alert--secondary">

**`extra` often holds PII** (national IDs, etc.), and it appears as-is in exports. Review this field before committing an exported user YAML to version control.

</div>

## A note on passwords

`password` is write-only — you can set it on apply, but it's never exported. For onboarding flows and the details of how passwords and reactivation behave, see the command reference.

## See also

- [Job titles](./jobtitles.md) — the `job` a user references (apply these first)
- [Roles](./roles.md) — the `accessRoles` a user references
- [apply](../commands/apply.md) — users are applied last
