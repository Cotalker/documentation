---
title: Property types & properties (YAML)
sidebar_label: Properties & types
displayed_sidebar: developer
---

Cotalker's data model is built from two related resources: **property types** and **properties**. Understanding the relationship between them is the key to the whole model, so let's start there.

## The mental model: type vs. instance

A **property type** is a *schema* — it defines the shape of something, like "a Location has an address, a city, and a country." A **property** is an *instance* of that schema — like "Santiago, at Av. Providencia 1234, in Chile."

If you've worked with databases, a property type is the table definition and a property is a row. You define the type once, then create as many properties of that type as you need.

Because properties depend on their type, the type must exist first — and `cotctl apply --dir` enforces exactly that order (property types before properties).

## Property types

A property type declares a `code`, a `display` name, and a list of `schemaNodes` (its fields):

```yaml
kind: PropertyType
code: location
display: Location
hidden: true
schemaNodes:
  - key: address
    display: Address
    basicType: string
    validators:
      required: true
  - key: city
    display: City
    basicType: string
```

| Field | Required | Notes |
|---|---|---|
| `kind` | Yes | Always `PropertyType` |
| `code` | Yes | Unique per company. **Immutable after creation** |
| `display` | Yes | UI display name |
| `hidden` | No | Defaults to `true`. See below |
| `viewPermissions` | Conditional | AccessRole names. **Required when `hidden: false`** |
| `schemaNodes` | No | The field definitions |

### Visible vs. hidden types

Most property types are internal machinery (workflow states, configuration) and should stay `hidden: true`. Set `hidden: false` only for types that users actually browse in the platform UI — catalogs of locations, teams, or employees that show up in form pickers. When you do, you **must** list the roles allowed to browse them:

```yaml
hidden: false
viewPermissions:
  - Admin
  - "Human Resources"   # spaces are allowed in role names
```

<div className="alert alert--info">

**You can't delete a schema node via YAML.** If the server has fields your YAML doesn't, `cotctl` keeps them — omission is never destructive here. To retire a node, set `isActive: false` on it.

</div>

## Properties

A property is an instance. It names its type and fills in the schema with a `schemaInstance`:

```yaml
kind: Property
code: santiago
display: Santiago
propertyType: location          # immutable after creation
schemaInstance:
  address: Av. Providencia 1234
  city: Santiago
  country: Chile
```

| Field | Required | Notes |
|---|---|---|
| `kind` | Yes | Always `Property` |
| `code` | Yes | Unique per company. Min 3 chars. **Immutable** |
| `display` | Yes | UI display name (mutable) |
| `propertyType` | Yes | The type's **code**. **Immutable after creation** |
| `schemaInstance` | No | The data, keyed by the type's `schemaNodes[].key` |

The keys inside `schemaInstance` must match the `key` fields you defined on the property type. To check which keys are valid:

```bash
cotctl property-types get location -c acme
```

### Hierarchies with `subproperty`

Properties can form parent-child trees via `subproperty` (a list of child property codes) — useful for things like regions containing cities:

```yaml
kind: Property
code: region_sur
display: Región Sur
propertyType: location
subproperty:
  - santiago
  - temuco
```

Children must exist before the parent — or be applied in the same batch file.

<div className="alert alert--primary">

**Two immutable fields on a property: `code` and `propertyType`.** Neither can change after creation. To "move" a property to a different type, deactivate the old one and create a new property with the right type — the data doesn't migrate automatically.

</div>

## Deactivating

Prefer the dedicated command:

```bash
cotctl properties deactivate santiago -c acme
```

If a property is still referenced by an active workflow or form, deactivation is **blocked** — resolve the dependency first. Note that deactivating a property *type* does not deactivate its properties; they remain active but orphaned, so deactivate in the right order.

## See also

- [apply](../commands/apply.md) — apply order puts types before properties
- [Workflows](./workflows.md) — workflow states are properties
- [Job titles](./jobtitles.md) — reference property types and properties
