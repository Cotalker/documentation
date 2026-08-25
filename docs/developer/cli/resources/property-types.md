---
title: Property types (YAML)
sidebar_label: Property types
displayed_sidebar: developer
---

<!-- source: repositories/cotctl/src/commands/property-types.ts, src/schemas/property-type.schema.ts, src/resources/property-type.resource.ts, docs/property-types/ @ 4f7248a (2026-07-06) -->

A **property type** is a schema — it defines the shape of a class of data. Its list of `schemaNodes` are the fields; each [property](./properties.md) of that type fills those fields in. If a property type is a table definition, a property is a row. This page is the deep reference for the type side and the `cotctl property-types` command; for the type-vs-instance mental model and the property side, start with [Properties & types](./properties.md).

<div className="alert alert--info">

**Two separate commands.** `cotctl property-types` manages type definitions (this page). `cotctl properties` manages the instances. They're distinct top-level commands, applied in that order.

</div>

## The shape of a property type

```yaml
kind: PropertyType
code: location                     # upsert key, immutable
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
    isIndexable: true
```

| Field | Required | Notes |
|---|---|---|
| `kind` | Yes | Always `PropertyType` |
| `code` | Yes | Unique per company. **Immutable after creation** |
| `display` | Yes | UI display name |
| `hidden` | No | Defaults to `true`. See visibility below |
| `viewPermissions` | Conditional | AccessRole **names**. **Required (non-empty) when `hidden: false`** |
| `schemaNodes` | No | The field definitions (keys must be unique) |
| `isActive` | No | Defaults to `true` |
| `displayTranslations`, `propertyImportPermissions`, `hierarchyLevel` | No | Localised label, import roles, hierarchy depth |

## Schema nodes: the fields

Each entry in `schemaNodes` defines one field. The key ones:

```yaml
schemaNodes:
  - key: office                    # the field name — becomes a schemaInstance key
    display: Office Location
    basicType: COTProperty         # the datatype
    subType: office_location       # required for COTProperty — the target type's code
    isArray: false
    validators:
      required: false
    weight: 10                     # display order (lower first)
    isActive: true
```

| Node field | Required | Notes |
|---|---|---|
| `key` | Yes | Unique within the type. The key that appears in a property's `schemaInstance` |
| `basicType` | Yes | The datatype (see the catalog below). **Immutable** once the node exists |
| `subType` | Conditional | The target PropertyType **code**, required by the backend for `COTProperty`. **Immutable** |
| `isArray` | No | Defaults to `false`. Makes the field a list. **Immutable** |
| `display`, `description` | No | Labels |
| `validators` | No | `required`, `min`/`max`, `arrayMin`/`arrayMax`, and a custom `validator` list |
| `default`, `weight`, `visualization` | No | Default value, display order, rendering hint |
| `isActive`, `isHidden`, `isNonEditable`, `isIndexable` | No | Node-level flags |

### The `basicType` catalog

There are exactly eight types:

| `basicType` | Holds | Notes |
|---|---|---|
| `string` | Free text, URLs, codes | The workhorse; indexable, arrayable |
| `number` | Integer or float | `min`/`max` validators apply |
| `date` | ISO 8601 datetime | |
| `boolean` | true/false | |
| `link` | A URL | |
| `file` | A file `_id` | |
| `COTProperty` | A property `_id` | Needs `subType` (the target type's code); the picker is filtered to it |
| `COTUser` | A user `_id` | The picker lists users |

<div className="alert alert--info">

**How schema nodes connect to properties.** A property of this type carries a `schemaInstance` — a key/value map whose keys are exactly the `key` fields you define here. Define a node `key: city`, and every [property](./properties.md) of the type may set `schemaInstance.city`. To see the valid keys for a type, run `cotctl property-types get <code>`.

</div>

## Immutability and the non-destructive merge

<div className="alert alert--primary">

**A node's `basicType`, `subType`, and `isArray` are frozen once the node exists.** Everything else on a node (display, validators, `isActive`, weight, …) is editable, but you cannot change what a field *is* after data may already conform to it. If your YAML changes one of the three frozen attributes on an existing key, `cotctl` refuses the whole document with an immutability error — before touching the backend. To reshape a field, retire the old node and add a new one under a different key.

</div>

<div className="alert alert--secondary">

**Omitting a node never deletes it.** When you apply a type, any node that exists on the server but isn't in your YAML is **preserved** — merged back into the update. So a partial YAML can't accidentally drop fields. To retire a node, include it explicitly with `isActive: false`; there's no way to permanently delete a schema node through YAML.

</div>

## Visible vs. hidden types

Most property types are internal machinery and stay `hidden: true`. Set `hidden: false` only for catalogs users actually browse in the UI (locations, teams). When you do, you **must** list the roles allowed to see it:

```yaml
hidden: false
viewPermissions:
  - Admin
  - "Human Resources"   # role names can contain spaces — quote them
```

`viewPermissions` are AccessRole **names**, case-sensitive. This is enforced before any API call — `hidden: false` with an empty `viewPermissions` fails validation. Conversely, flipping a visible type back to `hidden: true` clears its `viewPermissions`, and `cotctl` warns you when an apply would do that.

## Working with property types

```bash
# Read
cotctl property-types list                       # active (default)
cotctl property-types list --all                 # include inactive
cotctl property-types list --search loca         # min 3 chars
cotctl property-types get location
cotctl property-types export location -o location.yaml
cotctl property-types export -o all-types.yaml   # every type, multi-doc

# Write
cotctl property-types apply -f location.yaml --dry-run
cotctl property-types apply -f location.yaml -y

# Retire
cotctl property-types deactivate location
```

`apply` takes `-f/--file` (required), `--dry-run`, and `-y/--yes`, and handles multi-document files. There's no delete — `deactivate` (setting `isActive: false`) is the removal path.

<div className="alert alert--warning">

**A `COTProperty` node's `subType` isn't checked at apply time.** If a node points at a property type that doesn't exist yet, `cotctl` accepts it and it fails at runtime. Apply the referenced type first — in a directory apply, order your files so dependencies come first.

</div>

## Apply order

Property types are applied **second, after roles** (because `viewPermissions` references role names) and **before properties, workflows, and job titles** that reference them. `cotctl apply --dir` enforces the order.

## See also

- [Properties & types](./properties.md) — the type-vs-instance model and the property (instance) side
- [Roles](./roles.md) — the `viewPermissions` a visible type references
- [Job titles](./jobtitles.md) — reference property types via `allowedExtensions`
- [apply](../commands/apply.md) — property types are applied before properties
