---
title: Workflow merge semantics
sidebar_label: Merge semantics
displayed_sidebar: developer
---

<!-- source: repositories/cotctl/docs/workflows/merge-semantics.md, src/lib/apply-helpers.ts @ 4f7248a (2026-07-06) -->

This is the most important page to read before you edit a workflow that's already live. It explains what `cotctl workflows apply` does with the fields you *didn't* write — and why an innocent-looking `bots: []` can silently wipe automation that someone built in the web builder.

## The contract, in one paragraph

Since `cotctl` 0.7.0, updating an existing workflow uses **GET-merge-PUT**: `cotctl` fetches the current state from the server, merges your YAML on top of it, and sends the result. The consequence is the rule you must internalize — **a field you omit is preserved from the server; it is not wiped.** Your YAML is a patch, not a replacement.

## Three intents, three shapes

For any mergeable field, the *shape* you write encodes your intent:

| What you write | What happens |
|---|---|
| **Field omitted** (no key) | **Preserve** — the server's current value is kept |
| **`fieldName: []`** (empty) | **Delete** — the server's value is replaced with empty. Destructive. |
| **`fieldName: [ ... ]`** (values) | **Replace** — the server's value becomes your list |

The empty array is the trap. Omitting a field and setting it to `[]` look almost the same in YAML, but they mean opposite things: one says "leave it alone," the other says "clear it."

### Before / after

Say the server has a transition with two bots configured in the web builder, and you apply this YAML to change the transition's target:

```yaml
- target: po_approved
  canChange: manual
  # bots: not mentioned
```

**Result:** the two bots are preserved. You only changed what you declared.

Now say you apply this instead:

```yaml
- target: po_approved
  canChange: manual
  bots: []
```

**Result:** both bots are deleted. The empty array is an explicit instruction to clear the slot.

## Which fields this applies to

The merge covers the fields that are commonly co-managed by the web builder, where a wholesale overwrite would destroy UI-configured data:

- **Workflow (Group):** `nameDisplay`, `nameTranslations`, `color`, `icon`, `weight`, `isActive`.
- **TaskGroup:** the five permission arrays, `hideClosedAfterDays`, `availableViews`, `defaultView`.
- **State machine — `requiredSurvey`:** when you omit the whole `requiredSurvey` block, the server's StartForm (survey, bots, permissions) is left fully intact. If you write a partial block, each sub-field follows YAML-wins-else-preserve.
- **State — `subtask`:** its `bots` (and `target`) preserve unless you declare them.
- **State — `surveyTriggers[]`:** preserve/replace/delete at the **array level** (omit preserves the whole list; `[]` deletes it; a list replaces it — there is no per-entry merge).
- **Transitions — `next[]`:** each transition is matched to the server by its resolved `target`. For a matched transition, its `bots`, `requiredSurvey`, and `permissions` preserve unless declared; `canChange` follows your YAML. A transition whose `target` doesn't match any existing one is treated as new.
- **Bots**, in every slot above, follow the omit/`[]`/list rule exactly.

## The silent errors it prevents (and the ones to still watch)

The merge exists because pre-0.7.0 `cotctl` emitted near-complete bodies with hardcoded `[]` defaults, which silently wiped UI-managed config. That class of bug is gone for `cotctl`. Two things still deserve care:

1. **A stray `bots: []`.** This is the one destructive shape you can still type by accident. When in doubt, `cotctl workflows export <nameCode>` first and see what the slot actually holds before you touch it.
2. **`canChange` degradation.** The YAML schema only allows `manual`, `survey`, `none`, but the backend also accepts the legacy values `task-ui` and `*`. Re-applying a workflow whose transition used one of those silently degrades it to `manual`. Preserve the original by writing the same value, or apply with `--legacy-replace-workflows`.

<div className="alert alert--secondary">

**The merge is `cotctl`-side only.** It protects `cotctl workflows apply`. A PATCH sent directly (webclient, MCP, curl) still hits the backend's wholesale-replace behavior. The merge is a `cotctl` feature, not a change to the API.

</div>

## The escape hatch

If you genuinely want the old destructive behavior — omitted fields wiped on the server — there's a temporary flag:

```bash
cotctl workflows apply -f workflow.yaml --legacy-replace-workflows
```

It runs every transformer without the server's existing state, so anything you didn't write is cleared. It prints a warning, applies only to workflows, and **will be removed in 0.8.0.** You almost never want it.

## See also

- [Workflows](../workflows.md) — the landing page and root fields
- [Immutability & versioning](./immutability-and-versioning.md) — the *other* class of apply surprises
- [apply](../../commands/apply.md) — the shared apply pipeline
