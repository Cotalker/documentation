---
title: Workflow immutability and bot versioning
sidebar_label: Immutability & versioning
displayed_sidebar: developer
---

<!-- source: repositories/cotctl/docs/workflows/immutability.md, src/lib/validate-bot-versions.ts @ 4f7248a (2026-07-06) -->

Some parts of a workflow are structural: change them after tasks exist and you'd corrupt data, so Cotalker won't let you. This page lists what's frozen after creation, why states can never be removed, and the bot-version rules `cotctl` checks before an apply.

## What's immutable after creation

| Field | Scope | Frozen when | If you change it |
|---|---|---|---|
| `nameCode` | Workflow | Always | Apply errors |
| `code` | State machine | Always | Treated as a **new** state machine |
| `propertyType` | State machine | Always | Apply errors |
| `asset.type` | State machine | Always | Apply errors |
| `asset.propertyType` | State machine | When active tasks exist | Apply errors |
| `asset.property[]` | State machine | When active tasks exist | Apply errors |
| `type` | State | Always | Apply errors |

The rule of thumb: anything that defines the *shape* of the data a workflow produces is fixed once real tasks depend on it. Plan `nameCode`, the state machine's `propertyType`, and the asset model up front.

## States are permanent

A state can't be deleted or deactivated once it exists. If your YAML has fewer states than the server, apply stops with:

```
Cannot remove states: po_draft. States are permanent in Cotalker.
```

No flag bypasses this — you must keep every existing state in your YAML. **Adding** states is always safe; only removal is blocked. Always `export` before editing so you start from the complete set.

## Deactivation guards

- Deactivating a **state machine** (`isActive: false`) is blocked while it has active (non-closed) tasks: `Cannot deactivate — it has active tasks.` Close or reassign them first.
- Deactivating the **workflow** (`cotctl workflows deactivate <nameCode>`) only flips the workflow's own `isActive`. It does **not** deactivate the state machines inside it.

## When you truly need to change a frozen field

- **`nameCode`** — not possible. Create a new workflow and migrate tasks.
- **`propertyType` or `asset.type`** — create a new state machine with a different `code`; deactivate the old one once it has no active tasks.
- **`state.type`** — not possible (states are permanent).
- **`asset.propertyType` with active tasks** — close or move every active task first, then apply.

## Bot versioning

Bots carry two independent "version" numbers, and `cotctl` checks both against the **live** bot catalog on the server during a dry-run. (If the catalog can't be fetched, `cotctl` skips this check with a warning rather than validate against stale data.)

### `stage.version` — the bot type version

Every stage names a bot type (`PBCreateTask`, `PBReport`, …), and each type has registered versions on the server. `cotctl` enforces:

- **Unknown bot type** → a **warning** (the catalog may not list a brand-new type yet). Check the name with `cotctl bots list`.
- **A pinned `version` that isn't registered** → an **error**, listing the available versions so you can fix it in one shot.
- **No `version` and the type has no default** (e.g. `PBReport`, `PBCalendar`) → an **error**: the runtime has no fallback, so you must pin one.

### `bot.version` — the COTLang engine

The bot-level `version` selects the COTLang execution engine, not the bot type. Only `2`, `v2`, `3`, `v3` are recognized; **any other value is silently downgraded to COTLangV2 at runtime.** `cotctl` warns when it sees an unrecognized `bot.version` (a semver-shaped pin, junk, etc.) because the backend can't surface the downgrade. If you want V3, write `bot.version: "v3"`; otherwise omit the field.

## See also

- [Workflows](../workflows.md) — the landing page
- [Merge semantics](./merge-semantics.md) — the other class of apply surprises
- [Complete example](./complete-example.md) — a workflow with bots attached
