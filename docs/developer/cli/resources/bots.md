---
title: Bots (YAML)
sidebar_label: Bots
displayed_sidebar: developer
---

<!-- source: repositories/cotctl/src/commands/bots.ts, src/schemas/bot-admin.schema.ts, src/resources/bot.resource.ts, docs/bots/ @ 4f7248a (2026-07-06) -->

A **bot** is the entity behind the slash-commands operators trigger from the chat (`/hola`, `/registrar`). Each bot owns a list of `commands`, and — optionally — an embedded automation graph (a **ParametrizedBot**) that runs when a command fires. Because a bot can invoke almost anything in the platform, it's applied **last** in a directory apply, after every resource it might reference.

<div className="alert alert--primary">

**`bots` is not `bot-types`.** `cotctl bots` manages these Bot *entities* — the things with a `name` and `commands[]`. `cotctl bot-types` lists the *catalog* of ParametrizedBot building blocks (`PBMessage`, `PBCreateTask`, …) you reference inside `stages[].name`. They're different surfaces — see [Bot types](./bot-types.md), and the [migration note](#a-recent-rename) below if you used an older `cotctl`.

</div>

## The shape of a bot

```yaml
kind: Bot
name: "Saludo Bot"                 # upsert key — unique per company, 1..80 chars
description: "Bot que saluda con /hola"
isActive: true
global: false

commands:
  - description: "Saluda al usuario"
    isSlash: true
    slashCmd: "hola"               # the literal an operator types (no leading slash)
    isActive: true

parametrizedBot:                   # optional automation that runs when a command fires
  start: send
  stages:
    - key: send
      name: PBSendMessage
      data:
        channelId: "6a000000000000000000abcd"
        text: "Hola"
      next:
        SUCCESS: ""
        ERROR: ""
```

| Field | Required | Notes |
|---|---|---|
| `kind` | Yes | Always `Bot` |
| `name` | Yes | The upsert key. Unique per company, 1–80 chars. No format rules — any string |
| `description` | No | Free text |
| `isActive` | No | Defaults to `true`. Soft-delete by re-applying with `isActive: false` |
| `global` | No | Defaults to `false`. When `true`, the bot is available across companies — common in production, no warning on apply |
| `commands` | No | Slash-commands and survey-commands. See the three-way rule below |
| `parametrizedBot` | No | The automation graph, same shape as bots embedded in [workflows](./workflows.md) |
| `extraData` | No | Free-form feature flags (`messages`, `messagesWithSubsurveys`) |

<div className="alert alert--info">

**`name` is the identity — there is no `code`.** Unlike most resources, a bot is looked up by `name`, and matching is exact. `cotctl` never exposes a `version` field either: it's fixed to V3 on create, which is the only engine the admin webclient lets you save.

</div>

## Commands

Each entry in `commands[]` is one action an operator can trigger. A command can be a pure slash-command, a survey-command, or both:

```yaml
commands:
  # pure slash-command: operator types /hola, the bot runs
  - description: "Saluda"
    isSlash: true
    slashCmd: "hola"

  # survey-command: operator types /registrar, a Survey is presented,
  # then the bot runs after it's answered
  - description: "Inicia el registro"
    isSlash: true
    slashCmd: "registrar"
    isSurvey: true
    surveyIds:
      - "6a000000000000000000abcd"   # a Survey ObjectId — NOT a survey code
```

A few things trip people up:

- **`slashCmd` is the literal text**, without the leading slash — the chat prepends it. There are no format rules; whitespace and accents are matched as-is. It's required whenever `isSlash: true`.
- **`surveyIds` takes Survey ObjectIds, not codes.** Codes aren't resolved here. Find the `_id` with `cotctl surveys list -c <profile>`. The field is a list because one command can present several surveys, though in practice it's usually one.
- **`showHelp`** (default `true`) controls whether the command appears in the chat's auto-help. **`isActive`** on a command (default `true`) hides just that one slash while keeping the bot live — both the bot's and the command's `isActive` must be `true` for a command to be reachable.
- **`arguments[]`** exists for slash-command parsing but is exotic — essentially unused in production. Treat it as a rarely-needed escape hatch.

<div className="alert alert--primary">

**`commands` is replace-entire on update — and its absence means "keep".** This is the single most important operational rule for bots. When you apply an update:

| YAML | Result |
|---|---|
| `commands` omitted | The existing array is **kept** untouched |
| `commands: [ … ]` | The existing array is **replaced wholesale** — every command not in your list is dropped |
| `commands: []` | **All commands deleted.** `cotctl` refuses to do this silently: it warns and makes you retype the bot name to confirm — even with `-y` |

There's no smart merge by `slashCmd`. To add one command to an existing bot, export it, append the entry, and re-apply:

```bash
cotctl bots export "Saludo Bot" -c acme -o bot.yaml
# edit bot.yaml — append to commands[]
cotctl bots apply -f bot.yaml -c acme
```

</div>

## The automation: `parametrizedBot`

`parametrizedBot` is the graph that runs when a command fires. It's the same shape as the bots you embed in workflow states, SLAs, and schedules — a `start` stage and a list of `stages[]`, each with a `name` (the bot type), a `data` payload, and `next` branches. For the full ParametrizedBot reference, see [Workflows](./workflows.md).

The one thing worth calling out here: a stage can invoke a standalone [Routine](./routines.md) (PBScript). This is the most common pattern in production bots:

```yaml
parametrizedBot:
  start: invoke_routine
  stages:
    - key: invoke_routine
      name: PBScript
      data:
        code: rutina_calcular_riesgo   # must be a real Routine code
      next:
        SUCCESS: send_message
        ERROR: ""
```

When your YAML declares a `PBScript` stage, `cotctl` checks that the routine code actually exists in the profile before applying — so a typo fails at apply time with a "did you mean…?" suggestion, not silently at runtime. It also validates that `start` points to a real stage and that every `next` branch lands on a real stage or the empty string (a terminal branch).

## The bot's user

Every bot carries a dedicated user account that the backend creates automatically on the first apply. Its email is derived from the bot name and company subdomain (`saludo-bot.acme.bot@cotalker.com`), it's flagged `system: 'bot'`, and it gets the `bot-default` role.

<div className="alert alert--secondary">

**You don't manage the bot user through `cotctl bots`.** It never appears in the YAML — not on create, not on export (the email is emitted as a comment for reference). Because `cotctl` never reads or writes it, any edits you make to it from the admin webclient (roles, phone, avatar) **survive re-applies**. The flip side: `cotctl` can't revert those edits either. To change the bot user, edit it directly with `cotctl users apply` or the admin UI. You'll also find it listed among [users](./users.md) — it's the one carrying `system: 'bot'`.

</div>

## Working with bots

```bash
# Read
cotctl bots list                          # active bots (default)
cotctl bots list --all                    # include inactive
cotctl bots list --search "greet"         # backend search
cotctl bots list --global-only            # only global: true
cotctl bots get "Saludo Bot"
cotctl bots export "Saludo Bot" -o bot.yaml

# Write
cotctl bots apply -f bot.yaml --dry-run   # preview
cotctl bots apply -f bot.yaml -y
```

`apply` takes `-f/--file` (required), `--dry-run`, `-y/--yes`, and `-q/--quiet`, and handles multi-document files. As always, `--dry-run` first — especially against production — to see the create/update plan and any validation errors before anything is written.

<div className="alert alert--info">

**No `deactivate`, `test`, or `logs`.** There's no `cotctl bots deactivate` (soft-delete with `isActive: false` instead), no `cotctl bots test`, and no `cotctl bots logs` — the backend has no consolidated endpoints for the latter two yet.

</div>

## A recent rename

If you've used an older `cotctl`, the `bots` namespace changed meaning:

- **`cotctl bots list`** used to list the *type catalog* (`PBMessage`, …). It now lists your Bot *entities*. **There is no alias** — scripts that expected the catalog must move to `cotctl bot-types list`.
- **`cotctl bots versions <BotType>`** still works but is **deprecated**: it prints a warning and delegates to `cotctl bot-types versions <BotType>`. It's slated for removal in `cotctl` 1.0.0.

See [Bot types](./bot-types.md) for the catalog commands.

## See also

- [Bot types](./bot-types.md) — the catalog of stage building blocks (`bots` ≠ `bot-types`)
- [Routines](./routines.md) — the PBScripts a `PBScript` stage invokes
- [Workflows](./workflows.md) — the full ParametrizedBot reference
- [Surveys](./surveys.md), [Users](./users.md) — what a bot references
- [apply](../commands/apply.md) — bots are applied last
