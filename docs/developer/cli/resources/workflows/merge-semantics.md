---
title: Workflow merge semantics
sidebar_label: Merge semantics
displayed_sidebar: developer
---

<!-- source: repositories/cotctl/docs/workflows/merge-semantics.md, src/lib/apply-helpers.ts @ 4f7248a (2026-07-06) -->

This is the most important page to read before you edit a workflow that's already live. It explains what `cotctl workflows apply` does with the fields you *didn't* write — and why an innocent-looking `bots: []` can silently wipe automation that someone built in the web builder.

## The contract, in one paragraph

Since `cotctl` 0.7.0, updating an existing workflow uses **GET-merge-PUT**: `cotctl` fetches the current state from the server, merges your YAML on top of it, and sends the result. The consequence is the rule you must internalize — **a field you omit is preserved from the server; it is not wiped.** Your YAML is a patch, not a replacement. (Since 0.14.0 the same rule holds for every kind, not only workflows — see [What an update sends](../../commands/apply.md#what-an-update-sends).)

And since 0.14.0, each request carries only what differs from the server: the Group, the TaskGroup, each state machine and each state is skipped on its own when it would change nothing, so **re-applying a YAML that changes nothing sends no request at all** and the workflow is reported `unchanged`.

## Three intents, three shapes

For any mergeable field, the *shape* you write encodes your intent:

| What you write | What happens |
|---|---|
| **Field omitted** (no key) | **Preserve** — the server's current value is kept |
| **`fieldName: []`** (empty) | **Delete** — the server's value is replaced with empty. Destructive. |
| **`fieldName: [ ... ]`** (values) | **Replace** — the server's value becomes your list |
| **A sub-object with some keys** | The keys you write replace; the keys you omit keep their server value |

The empty array is the trap. Omitting a field and setting it to `[]` look almost the same in YAML, but they mean opposite things: one says "leave it alone," the other says "clear it."

### Before / after

Say the server has a transition with a bot configured in the web builder, and you apply this YAML to change the transition's `canChange`:

```yaml
- target: po_approved
  canChange: survey
  requiredSurvey: survey_po_approval
  # bots: not mentioned
```

**Result:** the bot is preserved. You only changed what you declared.

Now say you apply this instead:

```yaml
- target: po_approved
  canChange: manual
  bots: []
```

**Result:** the bot is deleted. The empty array is an explicit instruction to clear the slot.

## Which fields this applies to

- **Workflow (Group):** `nameDisplay`, `nameTranslations` (a declared object keeps the languages it omits), `color`, `icon`, `weight`, `isActive`.
- **TaskGroup:** the five permission arrays, `hideClosedAfterDays`, `availableViews`, `defaultView`, `defaultSelectedTaskTab`. A declared permission list replaces the stored one, and when it leaves out entries the TaskGroup has, `apply` names them on stderr, list by list.
- **Each level is applied by presence.** The Group is patched only when your YAML declares one of its fields, and the TaskGroup only when it declares one of its own — so a YAML that sets only `nameDisplay` sends no TaskGroup update, and the reverse. A YAML that declares **no** root field at all runs in [SM-only mode](../workflows.md#sm-only-mode).
- **State machine:** `name`, `description`, `isActive`; a declared `asset` is completed from the stored one (its `property` only while the asset keeps its `propertyType`); `cardLabels` and `allowedExtensions` as described on the [Workflows](../workflows.md#card-labels-task-extensions-and-the-default-tab) page.
- **State machine — `requiredSurvey`:** when you omit the whole block, the server's StartForm (survey, bots, permissions) is left fully intact. If you write a partial block, each sub-field follows YAML-wins-else-preserve.
- **State — `subtask`:** its `bots` and `target` preserve unless you declare them.
- **State — `surveyTriggers[]`:** omitting the key preserves the whole list and `[]` deletes it. A declared list replaces the stored one — a stored trigger it leaves out is removed — but each entry you declare is **paired with the stored trigger for the same survey** and completed from it: an entry that omits `bots` keeps the bots stored for that survey (before 0.14.0 it wiped them). Write `bots: []` to empty them on purpose.
- **Transitions — `next[]`:** each transition is matched to the server by its resolved `target`. For a matched transition, its `bots`, `requiredSurvey`, `permissions` and — since 0.14.0 — `canChange` preserve unless declared. A transition whose `target` doesn't match any existing one is new, and starts as `manual`. **`next: []` deletes every transition of the state** — since 0.14.0; it used to be ignored — and a transition a declared `next` leaves out is removed.
- **Bots**, in every slot above, follow the omit/`[]`/list rule. A declared bot is **completed from the stored one** when the slot holds one bot: the keys it omits keep their stored value, and each stage is paired with the stored stage of the same `key` while it keeps its bot type (its `data` and `next` travel as written, and an omitted `version` keeps the stored one). When the slot stores **several** bots there is nothing to pair with, so the declared bot replaces all of them and `apply` warns which stored keys it loses; `workflows export` leaves such a slot's `bots` out, so re-applying the export keeps them.

## The silent errors it prevents (and the ones to still watch)

The merge exists because pre-0.7.0 `cotctl` emitted near-complete bodies with hardcoded `[]` defaults, which silently wiped UI-managed config. That class of bug is gone for `cotctl`. Two things still deserve care:

1. **A stray `[]`.** `bots: []` and `next: []` are the destructive shapes you can still type by accident. When in doubt, `cotctl workflows export <nameCode>` first and see what the slot actually holds before you touch it.
2. **`canChange` values the YAML can't express.** The schema only allows `manual`, `survey`, `none`, but the backend also accepts the legacy `task-ui` and `*`. A YAML that *declares* `canChange` on such a transition replaces it. Omit `canChange` there to keep it — which is what `workflows export` writes for those transitions since 0.14.0.

<div className="alert alert--secondary">

**The merge is `cotctl`-side only.** It protects `cotctl` applies. A PATCH sent directly (webclient, MCP, curl) still hits the backend's wholesale-replace behavior. The merge is a `cotctl` feature, not a change to the API.

</div>

## The escape hatch

If you genuinely want the old destructive behavior — omitted fields wiped on the server — there's a flag:

```bash
cotctl workflows apply -f workflow.yaml --legacy-replace-workflows
```

It builds every level without the server's existing state, filling in the create defaults, so anything you didn't write is cleared. Since 0.14.0 its `--dry-run` shows that write: a permission list it would empty is a `DANGER` finding, so `--fail-on-destructive` exits `2` on it. It prints a warning and applies only to workflows. It was announced for removal in 0.8.0, which did not happen, and no removal version is announced now — treat it as deprecated and declare the fields you want to keep instead. You almost never want it.

## See also

- [Workflows](../workflows.md) — the landing page and root fields
- [Immutability & versioning](./immutability-and-versioning.md) — the *other* class of apply surprises
- [apply](../../commands/apply.md) — the shared apply pipeline
