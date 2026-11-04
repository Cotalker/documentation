---
title: Property types (YAML)
sidebar_label: Property types
displayed_sidebar: developer
---

<!-- source: repositories/cotctl/src/commands/property-types.ts, src/schemas/property-type.schema.ts, src/resources/property-type.resource.ts, docs/property-types/ @ a9168d68 (2026-10-23) -->

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
| `hidden` | No | Defaults to `true` on create. See visibility below |
| `viewPermissions` | Conditional | AccessRole **names**. **Required (non-empty) when `hidden: false`** |
| `schemaNodes` | No | The field definitions (keys must be unique) |
| `isActive` | No | Defaults to `true` on create; an update that omits it keeps the stored value |
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
| `key` | Yes | Unique within the type. The key that appears in a property's `schemaInstance`. A node the apply creates needs 3 to 50 characters matching `^[a-z][a-z0-9_]*$`, and every key must fit in 62 minus the length of the type's `code` (see [Key rules](#key-rules)) |
| `basicType` | Yes | The datatype (see the catalog below). **Immutable** once the node exists |
| `subType` | Conditional | The target PropertyType **code**, expected for `COTProperty`. The backend accepts a node without it, but the webclient then shows no value and offers no property to pick, and `properties apply` refuses every reference under it. **Immutable** |
| `isArray` | No | Defaults to `false`. Makes the field a list. **Immutable** |
| `display`, `description` | No | Labels |
| `validators` | No | `required`, `min`/`max`, `arrayMin`/`arrayMax`, and a custom `validator` list |
| `default`, `weight`, `visualization` | No | Default value, display order, rendering hint |
| `isActive`, `isHidden`, `isNonEditable`, `isIndexable` | No | Node-level flags |

A node has **no `editable` block** — that belongs to a survey. The platform drops it, so since 0.14.0 `validate` and every apply refuse it (`editable is not a schema node field`, exit `1`) instead of letting it vanish. To keep users from editing a field, use `isNonEditable: true`.

A node that omits `subType` is no longer read as a type change (fixed in 0.14.0): on an existing node it keeps the stored one. Give a new `COTProperty` node its `subType` when you create it — it cannot be added later.

### Key rules

The backend holds a node's `key` to two rules, and since 0.16.0 `cotctl` checks both before sending anything, so a key no longer passes `validate` and `--dry-run` only to fail the apply with a 400:

- **3 to 50 characters matching `^[a-z][a-z0-9_]*$`** — checked only when a node is **created**. `property-types apply`, `apply -f` and `apply --dir`, `--dry-run` included, refuse another key on a new type and on a node an update adds. A type stored with such a key — a `firstName` written before the rule, say — still updates, since an update sends no change to a stored node's key.
- **At most 62 minus the length of the type's `code`** — checked on **every node of every write** of the type, stored nodes included. The apply refuses it on a node it creates, and refuses an update of a type that already stores such a key whenever the update sends something, ending the error with `The backend refuses every write to a PropertyType that holds this key`; an update that sends nothing only warns. Shorten the key, or the code of a type being created. A type already stored with such a key refuses every write in the backend, with or without `cotctl`.

`validate -f` and `validate --dir` (check `S7`) **warn and pass** on both: they cannot tell a stored node from a new one, nor whether the apply will send anything, and the export of a type stored with such a key has to pass its own `validate`.

```
Error: fresh: schemaNodes[ab].key: Key must be at least 3 characters (it has 2). The backend refuses this key when it creates a schema node
```

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
| `COTProperty` | A property `_id` | Needs `subType` (the target type's code); the picker lists the active properties of that type. A property YAML names the referenced property by `code` — see [Properties & types](./properties.md#references-to-other-properties-cotproperty-nodes) |
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

Since 0.14.0 a node you declare is also matched with its stored node by `key` and keeps the fields it omits, and the nodes travel in their **stored order** — the ones your YAML omits in place, new ones last — whatever order the YAML lists them in (`apply` notes it when the orders differ). Before, a YAML that left a node out of the middle of the list, or reordered the nodes, produced an update the server refused.

**To edit one node without writing the others**, add `partial: true` (0.14.0+): the document names the type's `code` and only the nodes it changes, each by `key`, and may leave out their `basicType` and the type's `display` — see [Partial documents](../commands/apply.md#partial-documents-partial-true).

**Omitting the whole section and writing `schemaNodes: []` are different**, and since 0.12.0 `cotctl` tells them apart in what it reports. Nothing is deleted either way — the distinction is whether you *asked*:

| Your YAML | What `cotctl` reports |
|---|---|
| No `schemaNodes` key at all — a partial file that only touches `display` or `isActive` | `kept N schemaNodes the YAML does not declare` · `(no deletion was requested)` |
| `schemaNodes` present, with some nodes left out (including `schemaNodes: []`) | `preserved N schemaNodes not in YAML` · `(will NOT be deleted)` |

Before 0.12.0 both cases produced the second message, so a partial YAML that never mentioned the section was told a deletion had been refused — a deletion nobody had asked for.

<div className="alert alert--info">

**`schemaNodes` has no default.** Earlier versions of this page and of the bundled assistant guidance listed the default as `[]`, which implied the two rows above were equivalent. They are not, and that row is what led people to write the YAML that triggered the confusing message.

</div>

</div>

## Visible vs. hidden types

Most property types are internal machinery and stay `hidden: true`. Set `hidden: false` only for catalogs users actually browse in the UI (locations, teams). When you do, you **must** list the roles allowed to see it:

```yaml
hidden: false
viewPermissions:
  - Admin
  - "Human Resources"   # role names can contain spaces — quote them
```

`viewPermissions` are AccessRole **names**, case-sensitive. This is enforced before any API call — `hidden: false` with an empty `viewPermissions` fails validation.

How `hidden: true` treats `viewPermissions` differs between create and update:

- **On create**, `hidden: true` wins: the type is created with no view permissions, whatever list the YAML writes.
- **On update** (since 0.14.0), a written `viewPermissions` travels as written, even next to `hidden: true`, and a YAML that omits both the list and `hidden: true` keeps the stored permissions — before 0.14.0 such an update wiped them. Only `hidden: true` **without** a `viewPermissions` list sends an empty one, and `apply` warns, naming the permissions it removes. Write `viewPermissions: []` to remove them on purpose.
- **`hidden: true` does not hide a visible type.** `cotctl` never sends the visibility flag for `hidden: true`, so an update that writes it clears the view permissions (as above) but leaves a visible type visible — hide it from the webclient.

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

Since 0.15.0, `export` leaves out a node's `min`, `max`, `arrayMin` and `arrayMax` when they are stored as `null` — and `validators` when nothing is left — so the exported file passes `validate`; `get` no longer prints `min: null`, `max: null` or `default: null`. Applying property types is unchanged.

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
