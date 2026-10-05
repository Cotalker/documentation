---
title: apply
sidebar_label: apply
displayed_sidebar: developer
---

<!-- source: repositories/cotctl/src/commands/apply.ts @ 4f7248a (2026-07-06) -->

`cotctl apply` is the command that actually changes a Cotalker environment. It takes your YAML and makes the platform match it — creating resources that don't exist and updating those that do. This is the verb you'll use most, so it's worth understanding well.

There are two ways to run it, depending on whether you're deploying one file or a whole folder:

| Mode | Flag | Purpose |
|---|---|---|
| Single file | `-f <file>` | Apply one YAML file of any supported kind |
| Directory | `--dir <path>` | Apply every YAML file in a folder, in the correct dependency order between kinds |

<div className="alert alert--primary">

**Always validate first.** `apply` writes to a real environment. Make `cotctl validate` (and `--dry-run`) part of your muscle memory before every apply — especially against production.

</div>

## How apply decides what to do

`apply` reads the `kind:` field at the top of your YAML and routes to the right handler. **Twelve** kinds are supported, applied in this order when you point it at a directory:

| `kind:` | What it manages | `validate` knows it |
|---|---|:--:|
| `AccessRole` | Permissions | ✅ |
| `PropertyType` | Data model schemas | ✅ |
| `Property` | Data model instances | ✅ |
| `JobTitle` | Org positions (Cargos) | ✅ |
| `Survey` | Forms | ✅ |
| `Workflow` | Processes and state machines | ✅ |
| `Routine` | Reusable script routines | ❌ |
| `Sla` | Service-level agreements | ❌ |
| `Schedule` | Scheduled runs | ❌ |
| `User` | People | ✅ |
| `Bot` | Bots | ❌ |
| `Webhook` | Event subscriptions | ❌ |

<div className="alert alert--warning">

**The last column is not decoration.** `cotctl validate` recognises only the seven marked ✅, so a directory holding a `Routine`, `Sla`, `Schedule`, `Bot` or `Webhook` file **fails `validate --dir` with `unrecognized kind`** — at the step before the one that would have applied it without complaint. Until the gap closes, keep those five in their own directory or let the validation step tolerate them. See [validate](./validate.md).

</div>

If `kind:` is missing or unrecognized, `apply` stops and lists the valid options (plus the entity-scoped form for each, like `cotctl roles apply`). It never guesses.

**Create vs. update is automatic.** `apply` looks the resource up by its `code` (or `name`). If it doesn't exist, it's created; if it does, it's updated. You don't choose — you just describe the desired state.

## Single-file mode

```bash
cotctl apply -f <file.yaml> -c <profile> [options]
```

### Options

The unified `apply` is deliberately lean — a common core plus a few kind-specific flags that only take effect when the file's `kind` matches:

| Option | Applies to | Description |
|---|---|---|
| `-f, --file <path>` | all | **(required)** Path to the YAML file |
| `-c, --company <profile>` | all | **(required)**, unless an [environment credential](../authentication.md#running-without-a-profile-the-environment-credential) supplies it. Profile to use |
| `--dry-run` | all | Validate and show what *would* be sent, without applying |
| `-y, --yes` | all | Skip confirmation prompts (warnings still print to stderr) |
| `--skip-semantic-validation` | Survey only | Skip semantic checks — hard error on any other kind |
| `--skip-remote-validation` | Survey only | Skip the remote checks — identifiers, references (Survey, PropertyType, JobTitle, Property) and permission names — hard error on any other kind. A missing sub-survey and an unknown AccessRole in `permissions` still stop the apply, which resolves both before writing; a `--dry-run` with the flag doesn't report them. A YAML that sets the survey's `id` still has its `code` compared with the server's, and a `--dry-run` does report that one |
| `--allow-reactivate` | User, JobTitle | Permit `isActive: true` on a currently-inactive record (otherwise blocked) |
| `--notify-email` | User only | Send the welcome email on create (incompatible with a `password` in the YAML) |
| `--lax-code` | JobTitle only | On *update* only, downgrade the code-format check to a warning when the existing record's code is already non-conforming |
| `--rollback` | Workflow only | On a mid-apply error, deactivate the resources created during the partial apply |
| `-q, --quiet` | all | Suppress the progress lines. Errors and destructive findings still surface |
| `--legacy-replace-workflows` | Workflow only | Escape hatch that restores pre-0.7.0 destructive replace semantics. Prints a warning to stderr. **Deprecated, with no removal version announced** — earlier releases promised 0.8.0, which never happened |

The `--skip-*` flags are Survey-only by design: passing them with any other kind (or a directory containing non-Survey files) is a hard error, not a silent no-op.

<div className="alert alert--secondary">

**Some flags live on the entity-scoped applies, not here.** `--diff`, `--json` and `--fail-on-destructive` are **not** options of the unified `cotctl apply`. They exist only on `cotctl surveys apply`, `cotctl properties apply` and `cotctl workflows apply` — the entity-scoped forms built for CI. Reach for those when you need machine-readable output or a destructive-change gate; see [CI/CD](../ci-cd.md).

`--quiet` **was** on that list until 0.12.0 and now exists here too, so a directory apply can be silenced. It mutes progress lines only: errors and destructive findings are never suppressed by it, on any kind.

</div>

### Examples

```bash
# Create or update a survey
cotctl apply -f my-survey.yaml -c acme

# Preview what would be sent — changes nothing
cotctl apply -f my-survey.yaml -c acme --dry-run

# A workflow, a role, a property type — same command, different kind
cotctl apply -f workflow.yaml -c acme
cotctl apply -f role.yaml -c acme
cotctl apply -f property-type.yaml -c acme
```

A successful apply confirms what happened, one line per resource:

```
Survey "my_survey" created successfully
```

An update prints `updated successfully` instead. `cotctl` doesn't echo the generated `_id` — you never manage IDs by hand (see the note below).

<div className="alert alert--info">

**You never manage IDs by hand.** When creating, you don't include `_id`/`id` — the backend generates them. When updating, `cotctl` retrieves the existing resource and resolves the right IDs for you (matching survey questions by their `identifier`). Your YAML stays clean and human-readable.

</div>

### What you can change on a survey update

Because questions are matched by `identifier`, not position, edits behave intuitively:

| You want to… | Do this | Result |
|---|---|---|
| Add a question | Add it to `questions[]` | Created |
| Remove a question | Delete it from `questions[]` | Deactivated (not hard-deleted), after a confirmation prompt |
| Edit a question | Change its fields, keep the `identifier` | Updated, ID preserved |
| Reorder questions | Reorder `questions[]` | Order changes, IDs preserved |

Two things are immutable once created: a survey's `code`, and a question's `identifier`. `apply` will refuse to rename either — to "rename", you create a new resource instead. And if you apply a survey YAML without its `questions` section (say, to toggle `isActive`), the existing questions are preserved automatically.

## Preview first: `--dry-run`

`--dry-run` validates the file and prints what *would* happen without sending anything. On the unified `apply` it reports the intended action per resource:

```
--- DRY RUN ---

  Would CREATE Survey: my_survey
```

The entity-scoped applies (`surveys apply`, `properties apply`, `workflows apply`) render a **per-field diff** on top of this, and mark any **destructive** change — a removed question, a dropped state, a deactivation — so you can catch it before it lands. In CI you can turn that signal into a hard gate with `--fail-on-destructive`, which exits `2` when a dry-run finds a destructive change. Those richer diff and gating flags are documented under [CI/CD](../ci-cd.md); the unified `apply` shown here keeps the plain preview.

<div className="alert alert--warning">

**The unified `apply` never prints the destructive-findings block — read this before you build a pipeline on it.**

The `⚠ DANGER` / `⚠ WARNING` block is rendered by the shared dry-run formatter, which `apply` does not use. It computes the findings and discards them, and it declares no `--fail-on-destructive` either. For `Survey`, `Workflow` and `Property` that block is the **only** place those findings surface, so:

> `cotctl apply --dir --dry-run` is the quietest preview available — silent about exactly the changes that cannot be undone.

This is the opposite of what most people assume, because `apply --dir` is the form the documentation otherwise recommends. **Preview a sensitive kind with its entity-scoped command**, which does render the block:

```bash
# Preview that actually flags destructive changes
cotctl surveys apply -f survey.yaml -c acme --dry-run
cotctl workflows apply -f workflow.yaml -c acme --dry-run
cotctl properties apply -f property.yaml -c acme --dry-run
```

`Webhook` is the one exception: its applier also mirrors each finding into the warning channel, which `apply` does print — so a `context` clear is announced on every path.

This is a known gap in `cotctl`, named here rather than closed.

</div>

## Workflow apply: merge semantics

Since 0.7.0, applying a `Workflow` is a **merge**, not a wholesale replace. `cotctl` fetches the current workflow, merges your YAML into it, and writes the result back (a GET-merge-PUT). The practical consequences:

- **A field you omit is preserved.** Leave a section out of your YAML and the live value stays — you can safely apply a partial workflow to touch just one thing.
- **An explicit empty array deletes.** Writing `someList: []` is a deliberate "make this empty", and it *will* clear the live value. Omitting the key and writing `[]` mean different things.
- **States can't silently vanish.** Removing a state from the YAML doesn't delete it; missing states are rejected so you don't lose one by accident.

<div className="alert alert--secondary">

**Omit to keep, `[]` to clear.** This is the one rule that trips people up. If you don't want to change a list, leave the key out entirely. The full field-by-field behavior lives in [Workflow merge semantics](../resources/workflows/merge-semantics.md).

</div>

The `--legacy-replace-workflows` flag restores the old pre-0.7.0 behavior where omitted fields were deleted. It exists only as a temporary escape hatch for 0.7.x, prints a warning to stderr when used, and is slated for removal in 0.8.0 — you should not need it.

## Directory mode

For anything beyond a single file — and especially for a scaffolded workflow, which spans roles, property types, properties, and the workflow itself — point `apply` at the folder and let it handle ordering:

```bash
cotctl apply --dir <path> -c <profile> [options]
```

### Why order matters (and why you don't have to think about it)

Resources depend on each other: a workflow references roles and property types, which must exist first. `apply --dir` groups documents by kind and applies them in this canonical order automatically:

| # | Entity | Comes first because… |
|---|---|---|
| 1 | AccessRole | Everything else references permissions |
| 2 | PropertyType | Foundation of the data model |
| 3 | Property | Depends on PropertyType |
| 4 | JobTitle | Depends on roles and the data model |
| 5 | Workflow | References roles, property types, and properties |
| 6 | Survey | Referenced by workflow transitions |
| 7 | User | Depends on job titles and roles |

The order is between **kinds**. Within the Survey kind, surveys are *not* ordered among themselves by reference: files go in path order, and each file's documents in the order they're written. A survey that embeds a child the server doesn't have yet needs that child to sort first — in an earlier file, or earlier in the same file — otherwise the parent fails with `Survey with code "..." not found`, `--dry-run` included. A child the server already has is found in any order; putting it first is still the safe default.

### Options

| Option | Description |
|---|---|
| `--dir <path>` | **(required)** Folder of YAML files |
| `-c, --company <profile>` | **(required)**, unless an [environment credential](../authentication.md#running-without-a-profile-the-environment-credential) supplies it |
| `--dry-run` | Preview every payload without applying |
| `-y, --yes` | Skip all confirmation prompts |
| `--continue-on-error` | Keep going if one entity fails (default: stop on first error) |

### Example

```bash
# Preview, then apply
cotctl apply --dir ordenes-compra/ -c dev --dry-run
cotctl apply --dir ordenes-compra/ -c dev
```

Before applying, `cotctl` shows what it found and asks you to confirm; then it reports one line per resource and a final tally:

```
Applying directory: ordenes-compra/
Profile: dev

Found 10 YAML files:
  6 AccessRole files (6 documents)
  3 PropertyType files (3 documents)
  1 Workflow file (1 document)

Apply 10 resources to dev? (Y/n)
  [created] roles.yaml — AccessRole: ordenes-compra:start-form
  [created] property-types.yaml — PropertyType: oc_transaccion
  [created] workflow.yaml — Workflow: ordenes_compra

Applied directory "ordenes-compra/": 13 created, 0 updated, 0 error(s), 0 skipped
```

Under `--dry-run` the per-resource lines read `[CREATE]` / `[UPDATE]` instead of `[created]` / `[updated]`, and a failed file shows `[error] <file> — <entity> <identifier>: <message>`.

### It's safe to run twice

Directory apply is **idempotent** — re-running it is expected and safe:

| Scenario | Behavior |
|---|---|
| Fresh environment | Everything created |
| Re-apply, no changes | Everything updated (effectively a no-op) |
| Re-apply with new files | Existing updated, new created |
| State removed from a workflow YAML | **Blocked** — missing states are rejected |
| Immutable field changed | **Blocked** — `code`/`nameCode` immutability enforced |

## A word on rate limits and permissions

The backend rate-limits writes (roughly 20 per 5-second window). In large batch scripts, space out your calls or handle `429` responses. And if any apply returns `403`, the logged-in user lacks the required administration permission — that's a Cotalker permissions matter, not a CLI one.

## The standard loop

In practice, deploying a workflow looks like this:

```bash
cotctl validate --dir ordenes-compra/            # 1. catch errors offline
cotctl apply    --dir ordenes-compra/ -c dev     # 2. deploy
cotctl validate --workflow ordenes_compra -c dev # 3. production-readiness check
```

## See also

- [validate](./validate.md) — always run before apply
- [scaffolding](./scaffolding.md) — generate the folder that `apply --dir` consumes
- [Resource YAML reference](../resources/surveys.md) — the schema for each kind
