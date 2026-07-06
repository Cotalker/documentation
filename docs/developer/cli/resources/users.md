---
title: Users (YAML)
sidebar_label: Users
displayed_sidebar: developer
---

<!-- source: repositories/cotctl/src/schemas/user.schema.ts, src/commands/users.ts, docs/users/apply-behavior.md @ 4f7248a (2026-07-06) -->

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
| `job` | No | A JobTitle **code** that exists and is **active**. Optional — bot and integration users often have none |
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

`job` points to a job title by **code**, and that job title must be active — `cotctl` only resolves active ones. It is **optional**: bot and integration users often don't have a job title at all, and the schema and backend both accept a user without one. `accessRoles` lists role **names**, and like everywhere else, they're case-sensitive (`Manager` ≠ `manager`).

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

## Applying users: passwords, onboarding, and reactivation

`password` is write-only — you can set it on apply, but it's never exported. How onboarding plays out depends on whether you set a password and whether you pass `--notify-email`:

| You set… | Result |
|---|---|
| No `password`, with `--notify-email` | **Recommended.** The backend generates a password and emails the credentials to the new user |
| A `password`, with `--notify-email` | **Rejected** (exit `2`) — the welcome email would leak a masked password, so `cotctl` blocks the combination |
| A `password`, no `--notify-email` | The password is set; `cotctl` warns it's in plaintext in your YAML |
| No `password` on an **update** | The existing password is left untouched — it's never cleared |

**Reactivation is guarded.** An inactive user reappearing with `isActive: true` (or omitted, since the default is `true`) is **not** brought back automatically — `apply` stops with exit `2` and tells you to re-run with `--allow-reactivate`. Two situations can't be overridden at all: a `isReadOnly` user is never modified, and a `role: super` user can't be deactivated (both exit `1`).

To deactivate a user without deleting anything:

```bash
cotctl users deactivate juan.perez@acme.com -c acme
```

As everywhere in `cotctl`, exit codes are meaningful here: `0` success, `1` a runtime error mid-apply (network, an API error, an unresolvable hierarchy email), and `2` a pre-apply validation failure (bad YAML, an unknown job code, a reactivation without the flag, the password/notify-email conflict).

## See also

- [Job titles](./jobtitles.md) — the `job` a user references (apply these first)
- [Roles](./roles.md) — the `accessRoles` a user references
- [apply](../commands/apply.md) — users are applied last
