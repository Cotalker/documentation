---
title: Exporting & importing
sidebar_label: Export & import
displayed_sidebar: developer
---

So far we've talked about pushing YAML *to* an environment. Just as often, you'll want to pull existing configuration *out* of one — to bring a customer's existing setup under version control, to copy a resource between environments, or simply to see how something is built. That round-trip — **export → edit → apply** — is one of the most useful patterns in `cotctl`.

This page uses surveys as the worked example, because they have the richest export options. The same `list` / `get` / `export` / `apply` shape repeats across the other entity groups (`roles`, `property-types`, `properties`, `users`, `jobtitles`, `workflows`).

<div className="alert alert--info">

**Naming note.** The old `cotctl get surveys` and `cotctl export survey` commands were removed. Use the entity-scoped forms — `cotctl surveys list`, `cotctl surveys export`, and so on.

</div>

## Finding what's there: `list`

Before exporting, you usually need to find the resource. `list` shows what exists, with search and paging:

```bash
cotctl surveys list -c acme
```

```
ID                         NAME                  CODE             VER   ACTIVE   MODIFIED
-------------------------------------------------------------------------------------------
507f1f77bcf86cd799439011   Order Request Form    order_request    3     true     2024-03-15
507f1f77bcf86cd799439012   Approval Survey       approval_srv      1     true     2024-02-20
```

Useful options: `-s/--search <text>` to filter by name or code, `--all` to include inactive resources, `-l/--limit` and `-p/--page` for paging, and `--json` for machine-readable output.

## Looking at one: `get`

To inspect a single resource without writing a file:

```bash
cotctl surveys get order_request -c acme
```

Add `--populate` to include the full question list (output switches to YAML automatically, since a table can't show nested questions), or `-o json` to get JSON.

## Pulling it out: `export`

`export` is what brings a resource down as a YAML file you can version and re-apply:

```bash
cotctl surveys export order_request -c acme -o ./order_request.yaml
```

<div className="alert alert--secondary">

**`-o` is a path, not a format.** A common first mistake is `-o yaml`. The `-o`/`--output` flag is the *file path* to write to; use `--format` to choose the format. Passing a format keyword to `-o` is a hard error with a message telling you exactly this.

</div>

Two export formats are available:

| `--format` | Description |
|---|---|
| `simplified` (default) | Human-readable, with a clean `questions[]` array — what you want for version control |
| `raw` | The raw API representation |

```bash
# Default simplified YAML, printed to stdout
cotctl surveys export order_request -c acme

# Raw format, written to a file
cotctl surveys export order_request -c acme --format raw -o ./order_request_raw.yaml
```

### Keeping scripts out of YAML

Surveys can carry inline JavaScript (exec hooks). For cleaner version control, `--extract-scripts <dir>` pulls those scripts out into separate files and replaces them with `file://` references in the YAML:

```bash
cotctl surveys export order_request -c acme \
  -o ./order_request.yaml \
  --extract-scripts ./scripts/
```

Now the JavaScript lives in real `.js` files your editor and Git can handle properly.

## The round-trip in full

Putting it together, the export–edit–apply loop looks like this:

```bash
# 1. Export the live resource
cotctl surveys export order_request -c acme -o order_request.yaml

# 2. Edit order_request.yaml in your editor, commit it to Git

# 3. Validate, then apply the change back
cotctl validate -f order_request.yaml
cotctl apply -f order_request.yaml -c acme
```

This is also how you **promote between environments** — export from staging, apply to production (with the matching `-c` profile).

## Deactivating instead of deleting

Cotalker favors deactivation over hard deletion. To take a survey out of use without losing it:

```bash
cotctl surveys deactivate order_request -c acme
```

It sets `isActive: false` after a confirmation prompt (`-y` skips the prompt in scripts).

## See also

- [apply](./apply.md) — the other half of the round-trip
- [validate](./validate.md) — check exported YAML before re-applying
- [Resource YAML reference](../resources/surveys.md) — what the exported files contain
