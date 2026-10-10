---
title: Webhooks
sidebar_label: Webhooks
displayed_sidebar: developer
---

<!-- source: repositories/cotctl/src/schemas/webhook.schema.ts, src/commands/webhooks.ts @ c85e3b7 (2026-09-11) -->

A **webhook** tells Cotalker to POST an event to a URL you control whenever something happens — a task changes, a form is answered, a user logs out. It is how you connect a Cotalker process to a system that lives outside it.

`cotctl` manages webhooks as YAML, like every other resource, so the integrations a customer depends on live in your repository rather than in somebody's browser tab.

## The shape of a webhook

```yaml
kind: Webhook
code: notify_task_changes
name: "Notify task changes"
url: "https://example.com/cotalker/hook"
trigger: create-edit-delete-task
```

That is a complete, valid file. Everything else is optional.

| Field | Required | Notes |
|---|---|---|
| `kind` | Yes | Always `Webhook` |
| `code` | Yes | The upsert key. Lowercase, digits and underscores (`^[a-z]+([_a-z0-9]+)*$`) |
| `name` | Yes | Display name |
| `url` | Yes | Where the event is POSTed. `cotctl` checks it is a real URL before applying |
| `trigger` | Yes | Which event fires it — one of the six below |
| `context` | No | Optional scoping. **Read the section below before using it** |
| `description` | No | A free-text note |
| `isActive` | No | Defaults to `true` on create; an update that omits it keeps the stored value. Setting `false` stops it firing — there is no delete |

## `trigger` — the six events

Each value fires when the named entity is **created, edited or deleted**:

| `trigger` | Fires on |
|---|---|
| `create-edit-delete-task` | A Task |
| `create-edit-delete-survey` | A Survey (form) |
| `create-edit-delete-property` | A Property |
| `create-edit-delete-user` | A User |
| `create-edit-delete-note` | A Note |
| `logout-user` | A user logging out |

This is a closed set as far as `cotctl` is concerned: a typo is caught before it is persisted. The backend is more permissive and would accept an arbitrary value, so the guard here is worth having.

The payload your endpoint receives is the audited event object. To see what it actually looks like, send yourself one and read it:

```bash
cotctl webhooks test notify_task_changes -c acme
cotctl webhooks logs notify_task_changes -c acme
```

## `context` — scoping a webhook, and the trap in it

By default a webhook fires for **every** event of its trigger in the company. `context` narrows that to one survey, group or task group:

```yaml
context:
  survey: "6a000000000000000000aaaa"
  group: "6a000000000000000000cccc"
  taskGroup: "6a000000000000000000bbbb"
```

All three are **ObjectIds**, not codes — `cotctl` does not resolve them for you yet, so take the `_id` of the survey, group or task group you mean.

<div className="alert alert--warning">

**`context` only does something on `create-edit-delete-task`, and `cotctl` refuses it elsewhere.** On any other trigger a populated `context` used to apply cleanly and then deliver **nothing at all** — matching events kept happening, and every delivery was silently dropped. The result was indistinguishable from an unreachable endpoint unless you happened to suspect `context`.

`cotctl` now rejects that combination before any request is sent. **This is a `cotctl`-side guard, not a backend one**: the same payload applied through the API or the admin UI still reproduces the original trap.

</div>

### Clearing it: three intents, not two

`context` has the same three-way convention as `requiredSurvey` in [workflows](./workflows.md):

| YAML | Result on `apply` |
|---|---|
| `context` omitted | **Preserved.** Whatever is on the server stays |
| `context: null` | **Cleared** — the recommended way |
| `context: {}` | **Cleared too** — the older form, still supported |
| A populated `context` | Replaces whatever was there |

**`context: null` is new in 0.12.0.** Before it, `context: {}` was the only way to empty the field, and it was blessed as such. Both work; `null` says what you mean.

Clearing is accepted on **every** trigger, including the ones that reject a populated `context` — removing a stale value is exactly what that rule wants you to do, so it is never blocked.

<div className="alert alert--info">

**Why omitting does not clear.** A webhook's `context` can be set outside `cotctl`, and most YAML files never mention the field. If omission meant "delete", every apply of a file that simply does not talk about `context` would silently drop the scoping.

</div>

### A clear is always announced

An apply that would remove a populated `context` warns before it writes, on `--dry-run` and on the real run alike:

```
  ⚠ warn: notify_task_changes: context: { survey } → cleared — the webhook stops
    being scoped and will fire for EVERY event of its trigger in the company.
```

**Every path announces it**, including `-y` and `apply --dir`, where there is no confirmation prompt, and including under `-q`. That flag mutes the per-webhook progress lines; it does not and cannot silence a destructive finding. So a scripted `cotctl webhooks apply -y -q` still reports the clear on stderr before it writes.

Preview it without writing anything:

```bash
cotctl webhooks apply -f webhook.yaml -c acme --dry-run
```

## Working with webhooks

```bash
# List — active only by default
cotctl webhooks list -c acme
cotctl webhooks list -c acme --all          # include deactivated ones

# Read one
cotctl webhooks get notify_task_changes -c acme
cotctl webhooks export notify_task_changes -c acme -o webhook.yaml

# Apply
cotctl webhooks apply -f webhook.yaml -c acme --dry-run
cotctl webhooks apply -f webhook.yaml -c acme

# Did it fire, and what did my endpoint answer?
cotctl webhooks logs notify_task_changes -c acme
cotctl webhooks test notify_task_changes -c acme
```

`apply` handles multi-document files and takes `--dry-run`, `-y/--yes` and `-q/--quiet`. `test` can also probe a destination that does not exist yet, with `--url` and `--trigger` instead of a code — useful when you are building the receiving end.

<div className="alert alert--info">

**There is no delete.** Set `isActive: false` to retire a webhook. It stops firing and stays listable with `--all`.

</div>

## Apply order

Webhooks are applied **last** in a directory apply, after every resource their `context` might point at already exists. `cotctl apply --dir` enforces the order.

<div className="alert alert--warning">

**`cotctl validate` does not know the `Webhook` kind.** It recognises seven of the twelve kinds `apply` handles, and this is one of the five it does not — so a `Webhook` file in a directory makes `validate --dir` fail with `unrecognized kind`, at the step *before* the one that would have applied it. Keep webhooks in their own directory, or let the validation step tolerate them. See [validate](../commands/validate.md).

</div>

## See also

- [apply](../commands/apply.md) — the twelve kinds, and what `--dry-run` does and does not show
- [Workflows](./workflows.md) — where the tasks a `create-edit-delete-task` webhook reports on come from
- [CI/CD](../ci-cd.md) — applying webhooks unattended, and what `-q` does there
