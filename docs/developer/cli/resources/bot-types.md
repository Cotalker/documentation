---
title: Bot types (catalog)
sidebar_label: Bot types
displayed_sidebar: developer
---

<!-- source: repositories/cotctl/src/commands/bot-types.ts, src/resources/bot-type.resource.ts, src/lib/known-bot-types.ts @ 4f7248a (2026-07-06) -->

When you write an automation graph — inside a [bot](./bots.md), a [routine](./routines.md), an [SLA](./slas.md), or a [schedule](./schedules.md) — each stage names a **bot type** in its `name` field: `PBSendMessage`, `PBCreateTask`, `FCEach`, `PBScript`, and so on. `cotctl bot-types` is the read-only lens onto that catalog: which types exist, which versions each one has registered, and whether it has a default.

Unlike every other resource in this section, there's nothing to apply — the catalog is defined by the runtime, not by you. These two commands just let you read it.

<div className="alert alert--primary">

**`bot-types` is not `bots`.** `cotctl bot-types` reads the *catalog of building blocks*. `cotctl bots` is the CRUD for Bot *entities* (the ones with a `name` and `commands[]`). See [Bots](./bots.md).

</div>

## Listing the catalog

```bash
cotctl bot-types list
```

```text
BotType                          Versions                             Default
------------------------------------------------------------------------------
PBCreateTask                     2.0, 2.1                             yes
PBReport                         1.3                                  no
PBSendMessage                    (none pinned)                        yes
...
68 bot type(s) — source: live backend
```

Each row is a stage type you can put in a `stages[].name`. The catalog is fetched live from your profile's backend, so it reflects the types actually available in that environment (some are company-specific and won't appear everywhere). `--json` gives you the machine-readable form.

## Inspecting one type's versions

```bash
cotctl bot-types versions PBCreateTask
```

```text
Bot type: PBCreateTask
versions: 2.0, 2.1
default:  yes
```

This is the command you reach for **before pinning a `version` in YAML**. A stage's `version` is optional — omit it and the backend resolves the type's default. But some types ship with **no default** and require you to pin one explicitly:

```text
Bot type: PBReport
versions: 1.3
default:  no

This type has no default — you MUST pin a version (one of: 1.3).
```

<div className="alert alert--info">

**Quote versions in YAML.** A version like `2.10` written unquoted is parsed by YAML as the number `2.1` and rejected. Always write `version: "2.10"`. When `cotctl apply` runs `--dry-run`, it validates each stage's `version` against this live catalog, so a stale or wrong pin surfaces before you write anything.

</div>

## Reading the catalog while authoring

The typical loop when building an automation:

1. `cotctl bot-types list` to find the stage type you need.
2. `cotctl bot-types versions <BotType>` to see its versions and whether it needs an explicit pin.
3. Write the stage — omit `version` to take the default, or pin `version: "<x>"` (quoted) if there's no default.
4. `cotctl <resource> apply --dry-run` — the version is checked against the catalog again as a safety net.

A handful of types (`PBScript`, `CCJS`, `ESMCode`) execute arbitrary JavaScript. They appear in the catalog like any other, but a **workflow** apply that declares one is refused unless you pass `--allow-script-bots`. (Standalone routines, SLAs, and bots validate the referenced routine exists but don't gate on that flag.)

## A recent rename

If you used an older `cotctl`, this catalog lived under the `bots` namespace:

- `cotctl bots list` (old) → **`cotctl bot-types list`**. No alias — the old `bots list` now lists Bot *entities*, so scripts that expected the catalog must be updated.
- `cotctl bots versions <BotType>` (old) → **`cotctl bot-types versions <BotType>`**. The old form still works as a **deprecated alias** (it prints a warning) and is slated for removal in `cotctl` 1.0.0.

## See also

- [Bots](./bots.md) — Bot entities (`bot-types` ≠ `bots`)
- [Routines](./routines.md), [SLAs](./slas.md), [Schedules](./schedules.md) — the resources whose stages reference these types
- [Workflows](./workflows.md) — the full ParametrizedBot / stage reference
