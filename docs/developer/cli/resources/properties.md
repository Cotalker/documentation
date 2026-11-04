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
| `hidden` | No | Defaults to `true` on create; an update that omits it keeps the stored value. See below |
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
| `code` | Yes | Unique per company. To create a property it must match `^[a-z][_a-z0-9]*$` and have 3 to 50 characters (see below). **Immutable** |
| `id` | No | The property's `_id`, a 24-character hex ObjectId. With it, the property is looked up by `_id`, in a dry run as in the apply |
| `display` | Yes | UI display name (mutable) |
| `propertyType` | Yes | The type's **code**. **Immutable after creation** |
| `schemaInstance` | No | The data, keyed by the type's `schemaNodes[].key` |

The keys inside `schemaInstance` must match the `key` fields you defined on the property type. `cotctl` does not check them against the type and prints no warning for a key the type does not define: the key is sent as written (earlier versions of this page said `apply` warns about it). Check which keys a type defines before writing them:

```bash
cotctl property-types get location -c acme
```

### The `code` rules apply on create

The API enforces the charset `^[a-z][_a-z0-9]*$`, the 3-character minimum and the 50-character cap when it **creates** a property, and a PATCH cannot change a stored `code`. The backend stores many codes that break those rules — the `unique-<task id>` code it gives each task's asset, for example — and `properties export` writes them as stored. So since 0.16.0:

- `properties apply`, `apply -f` and `apply --dir` refuse such a code **only when they would create** the property, `--dry-run` included, before sending anything. A property already stored with one still updates.
- `validate -f` and `validate --dir` cannot tell a create from an update, so they **warn and exit `0`**; an empty `code` still fails. To stop such a code before a create in a pipeline, rely on the dry run, which exits `1` when the apply would create the property.
- Depending on the server's configuration, the code may also be checked each time an update is saved. There, the apply of an update that sends a change to such a property fails, although `validate` and the dry run let it through. A re-apply that changes nothing sends no request, so it passes.

### Pinning by `id`

With an `id`, the dry run reads the property by `_id`, as the apply does, so it refuses what the apply refuses: an `id` with a new `code`, an `id` with another property's `code`, an `id` the backend does not hold, and a changed `propertyType`. Since 0.16.0 an `id` the backend answers with a 404 fails only that property, with `Property with id '<id>' was not found` and exit `1`, and the other properties of the same file are still applied; `apply --dir` still stops after that file unless `--continue-on-error`.

### References to other properties: `COTProperty` nodes

A `COTProperty` node of the type holds a reference to another property. In the YAML you name that property by its **`code`**; the backend stores its `_id`, so `properties apply`, `apply -f` and `apply --dir` send the `_id` each code names, for a single value and for every item of a list:

```yaml
propertyType: work_order_asset      # nodes: equipo (COTProperty, subType: equipos), repuestos (COTProperty, isArray)
schemaInstance:
  equipo: eq_compresor_01           # the code of a property of type equipos
  repuestos: [eq_filtro_02, eq_valvula_07]
```

Since 0.16.0 `properties export` writes each such reference as a code too, so an export round-trips by code. Apply it with 0.16.0 or later: an older `cotctl` sends the code as written, and the backend refuses it. The export keeps an `_id`, with a warning, when it cannot name the property — a deleted or deactivated one — and for every node reference of a property whose type is not active or cannot be found (listing inactive types takes `admin-properties-read`; without it the backend answers as if the type did not exist). An export taken before 0.16.0 still applies, since each `_id` it holds is the stored value.

The webclient lists a node's properties by its `subType`, among the active ones, and rewrites the value at the next edit of the field. The backend checks almost none of this, so the apply — `--dry-run` included — refuses what the webclient cannot show, and fails that property alone while the other properties of the file are still applied or previewed:

- a code that names no active property, with `Unknown COTProperty code(s) in schemaInstance: <key>="<code>"` — a deactivated property's code included; re-export the property that references it to get the `_id` the export keeps;
- an `_id` that names no active property;
- a property outside the node's `subType`, by code or by `_id`;
- any reference under a node with **no `subType`** — leave the node empty, or reference the property from a node that has one; a stored node's `subType` cannot change, so that is a new node;
- an empty item (`""` or `null`) in a list — the webclient can read a `null` item as every property of the type, so the next edit would save them all; `[]` is an empty list, which a `required` node refuses;
- a property the list already holds, a code and the `_id` of the same property counting as a repeat;
- the shapes the backend refuses with a 400: a single value in an `isArray` node, a list in a single-value node, an empty `required` node (`[]` included), and a list outside `arrayMin` / `arrayMax`.

A value the property **already stores** stays, with a warning, in every case but the shape checks. The backend checks the shape of every node whenever `schemaInstance` changes, so a stored value of the wrong shape fails a write that changes another key, and the error says it is the stored value; a write that does not send `schemaInstance` only warns about it.

A node that is not active is left out of the write, with a warning: the backend does not store it, so re-applying an export leaves the value stored under it as it is. A node named `propertyType` or `propertyTypes` is read as a node like any other, not as the legacy `type: COTProperty` slice at the root of `schemaInstance`.

Under `apply --dir`, a property an earlier file creates has no `_id` until the apply, so the dry run's diff shows a reference to it as `<id of <code>, created by this batch>`, and the apply sends the `_id` that property gets.

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
