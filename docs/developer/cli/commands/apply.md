---
title: apply
sidebar_label: apply
displayed_sidebar: developer
---

`cotctl apply` is the command that actually changes a Cotalker environment. It takes your YAML and makes the platform match it — creating resources that don't exist and updating those that do. This is the verb you'll use most, so it's worth understanding well.

There are two ways to run it, depending on whether you're deploying one file or a whole folder:

| Mode | Flag | Purpose |
|---|---|---|
| Single file | `-f <file>` | Apply one YAML file of any supported kind |
| Directory | `--dir <path>` | Apply every YAML file in a folder, in the correct dependency order |

<div className="alert alert--primary">

**Always validate first.** `apply` writes to a real environment. Make `cotctl validate` (and `--dry-run`) part of your muscle memory before every apply — especially against production.

</div>

## How apply decides what to do

`apply` reads the `kind:` field at the top of your YAML and routes to the right handler. Seven kinds are supported:

| `kind:` | What it manages |
|---|---|
| `Survey` | Forms |
| `AccessRole` | Permissions |
| `PropertyType` | Data model schemas |
| `Property` | Data model instances |
| `JobTitle` | Org positions (Cargos) |
| `Workflow` | Processes and state machines |
| `User` | People |

If `kind:` is missing or unrecognized, `apply` stops and lists the valid options (plus the entity-scoped form for each, like `cotctl roles apply`). It never guesses.

**Create vs. update is automatic.** `apply` looks the resource up by its `code` (or `name`). If it doesn't exist, it's created; if it does, it's updated. You don't choose — you just describe the desired state.

## Single-file mode

```bash
cotctl apply -f <file.yaml> -c <profile> [options]
```

### Options

| Option | Description |
|---|---|
| `-f, --file <path>` | **(required)** Path to the YAML file |
| `-c, --company <profile>` | **(required)** Profile to use |
| `--dry-run` | Validate and show what *would* be sent, without applying |
| `-y, --yes` | Skip confirmation prompts (warnings still print to stderr) |
| `--skip-semantic-validation` | **Survey only** — skip semantic checks |
| `--skip-remote-validation` | **Survey only** — skip remote checks |

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

A successful apply confirms what happened:

```
Survey "my_survey" created successfully (id: 507f1f77bcf86cd799439011)
```

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

### Options

| Option | Description |
|---|---|
| `--dir <path>` | **(required)** Folder of YAML files |
| `-c, --company <profile>` | **(required)** Profile to use |
| `--dry-run` | Preview every payload without applying |
| `-y, --yes` | Skip all confirmation prompts |
| `--continue-on-error` | Keep going if one entity fails (default: stop on first error) |

### Example

```bash
# Preview, then apply
cotctl apply --dir ordenes-compra/ -c dev --dry-run
cotctl apply --dir ordenes-compra/ -c dev
```

```
Applying directory: ordenes-compra/ → dev

AccessRole (6 documents)
  ✓ created  ordenes-compra:start-form
  ...
PropertyType (3 documents)
  ✓ created  oc_transaccion
  ...
Workflow (1 document)
  ✓ created  ordenes_compra

─────────────────────────────────────────────────────────────────
13 created, 0 updated, 0 errors
```

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
