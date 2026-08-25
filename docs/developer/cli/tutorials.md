---
title: Tutorials
sidebar_label: Tutorials
displayed_sidebar: developer
---

<!-- source: repositories/cotctl/docs/{bots,routines,schedules,slas,property-types,properties}/, repositories/cotctl/src/commands/{bots,routines,schedules,slas,property-types,properties,surveys,workflows,validate,apply}.ts, repositories/cotctl/examples/{bots,routines,properties}/ @ 4f7248a (2026-07-06) -->

The reference pages tell you *what* each command does. This page shows you *how* they fit together, with complete, follow-along recipes for the things you'll actually do on a project. Each recipe lists what you need before you start and what success looks like, so you can tell when it worked.

If you haven't installed and authenticated yet, start with [Installation](./installation.md) and [Authentication](./authentication.md) — every recipe below assumes you have a working profile.

## Recipe 1 — Log in and confirm your setup

**What you'll need:** `cotctl` installed, and admin access to an environment.

```bash
# Log in (browser flow by default)
cotctl login --url https://web.cotalker.com --subdomain acme

# Confirm the profile was saved
cotctl profile list
```

**What success looks like:** `cotctl profile list` shows an `acme` row with your URL and user. You're ready to run any command with `-c acme`.

## Recipe 2 — Create a new survey from scratch

**What you'll need:** a working profile, and an idea of the form you want to build.

```bash
# 1. Write the YAML (see the Surveys reference for structure)
vim my-survey.yaml

# 2. Validate it offline — catch mistakes before touching the environment
cotctl validate -f my-survey.yaml

# 3. Preview what would be sent, changing nothing
cotctl apply -f my-survey.yaml -c acme --dry-run

# 4. Apply for real
cotctl apply -f my-survey.yaml -c acme
```

**What success looks like:**

```
Survey "my_survey" created successfully
```

<div className="alert alert--info">

This validate → dry-run → apply sequence is the safe default for *every* resource, not just surveys. Build the habit now.

</div>

## Recipe 3 — Modify an existing survey

**What you'll need:** the `code` of a survey that already exists.

```bash
# 1. Export it as your starting point
cotctl surveys export existing_survey -c acme -o survey.yaml

# 2. Edit the YAML
vim survey.yaml

# 3. Validate, then apply — it updates automatically because the code exists
cotctl validate -f survey.yaml
cotctl apply -f survey.yaml -c acme
```

**What success looks like:** `Survey "existing_survey" updated successfully`. You can add, remove, edit, and reorder questions freely — `cotctl` matches them by `identifier` and preserves their IDs.

## Recipe 4 — Promote a survey between environments

**What you'll need:** profiles for both the source and the target environment.

```bash
# 1. Export from the source
cotctl surveys export my_survey -c acme-prod -o survey.yaml

# 2. Apply to the target
cotctl apply -f survey.yaml -c devteam
```

**What success looks like:** the survey is created in the target environment. The exported YAML contains IDs from the source, but those are ignored on creation — the target generates its own.

## Recipe 5 — Build and deploy a workflow from a scaffold

This is the big one — the full loop from nothing to a live workflow.

**What you'll need:** a working profile and a name + short code for your flow.

```bash
# 1. Generate the skeleton
cotctl workflows scaffold --name ordenes-compra --code oc \
  --display "Órdenes de Compra"

# 2. Customize the generated files:
#    - states in data-model/states.yaml
#    - transitions in workflow.yaml
#    - roles/permissions in access/

# 3. Validate the whole folder offline
cotctl validate --dir ordenes-compra/

# 4. Apply — entities deploy in the right dependency order automatically
cotctl apply --dir ordenes-compra/ -c dev

# 5. Run the production-readiness checklist against the live workflow
cotctl validate --workflow ordenes_compra -c dev
```

**What success looks like:** step 4 reports `N created, 0 errors`, and step 5 ends with `production ready`. Steps 2–5 form a loop you can repeat safely — every apply is idempotent.

## Recipe 6 — Ship a slash-command bot

A **Bot admin** owns the `/<command>` shortcuts operators type in the chat. This recipe takes you from an empty file to a working `/hola`.

**What you'll need:** a working profile with Bot-admin access.

Start from `examples/bots/bot-minimal.yaml` in the cotctl repo, or write the file from scratch — the `name` is the upsert key (unique per company) and `commands[]` holds the slash-commands:

```yaml
kind: Bot
name: "Saludo Bot"
description: "Bot que saluda con /hola"
commands:
  - description: "Saluda al usuario"
    isSlash: true
    slashCmd: "hola"
    isActive: true
```

```bash
# 1. Pre-flight offline. Bots are NOT handled by `cotctl validate` — run
#    apply in dry-run mode instead. It Zod-validates the file (and any
#    embedded ParametrizedBot) and previews the change without applying it.
cotctl bots apply -f bot.yaml -c acme --dry-run

# 2. Apply for real
cotctl bots apply -f bot.yaml -c acme -y

# 3. Test it: open any chat and type
#    /hola
```

**What success looks like:** step 2 reports the bot created, and typing `/hola` in the chat triggers it. There is no `cotctl bots test` command — you exercise a bot by invoking its slash-command from the chat.

<div className="alert alert--info">

`cotctl validate -f` only understands `Survey`, `PropertyType`, `Property`, `JobTitle`, `Workflow`, `AccessRole`, and `User` files. For **Bot**, **Routine**, **Schedule**, and **SLA** files, the equivalent offline check is `<family> apply --dry-run`, which validates the YAML before it mutates anything.

</div>

To go further — a survey-command that fires a form, plus an embedded graph that calls a Routine — see `examples/bots/bot-with-survey-command.yaml`.

## Recipe 7 — Scheduled automation: a Routine on a cron

A **Routine** (PBScript) is a reusable script; a **Schedule** fires one on a cron. This recipe wires them together: write the routine, test it, then schedule it.

**What you'll need:** a working profile and a chat channel `_id` for the routine to post into.

```yaml
# rutina.yaml — see examples/routines/routine-minimal.yaml
kind: Routine
code: rutina_saludo_simple     # upsert key — immutable after creation
display: "Rutina de saludo"
body:
  start: send
  stages:
    - key: send
      name: PBMessage
      data:
        channelId: "6a000000000000000000abcd"   # a real channel _id
        text: "Hola desde una rutina"
      next:
        SUCCESS: ""
        ERROR: ""
```

```bash
# 1. Dry-run then apply (routines, like bots, aren't covered by `cotctl validate`)
cotctl routines apply -f rutina.yaml -c acme --dry-run
cotctl routines apply -f rutina.yaml -c acme -y

# 2. Fire it once to confirm it works. --dry-run prints the payload without
#    running it; drop --dry-run to execute for real — this has REAL side
#    effects (it posts the message, and would create/transition tasks if the
#    routine did that).
cotctl routines test rutina_saludo_simple -c acme --dry-run
cotctl routines test rutina_saludo_simple -c acme
```

Now schedule it. The schedule's `body` invokes the routine through a `PBScript` stage:

```yaml
# sched.yaml
kind: Schedule
code: sched_saludo_diario
time: "2026-07-07T12:00:00Z"    # first occurrence
cron: "0 9 * * *"               # every day at 09:00 — UNIX 5-field, NOT Quartz
cronTimeZone: America/Santiago
body:
  start: run_routine
  stages:
    - key: run_routine
      name: PBScript
      data:
        code: rutina_saludo_simple   # must be a real Routine code
      next:
        SUCCESS: ""
        ERROR: ""
```

```bash
# 3. Apply the schedule — it's active by default, so it starts firing on cron.
cotctl schedules apply -f sched.yaml -c acme --dry-run
cotctl schedules apply -f sched.yaml -c acme -y

# 4. After it has fired, inspect the runs
cotctl schedules logs sched_saludo_diario -c acme -l 25 --op executed
```

**What success looks like:** the routine `test` posts the message, the schedule applies clean, and after the first cron tick `schedules logs` shows an `executed` entry.

<div className="alert alert--warning">

Apply the **routine before the schedule**. The schedule's `--dry-run` checks that `data.code` points at a routine that already exists in the profile — apply the schedule first and that check fails. Under `cotctl apply --dir`, cotctl orders Routine before Schedule automatically, so keeping both files in one folder side-steps the problem.

</div>

Two details worth knowing:

- **Cron is UNIX 5-field.** cotctl validates it as standard cron. The admin webclient's Advanced tab pre-fills Quartz (6/7-field) examples like `0 15 10 L-2 * ?` — those are rejected. Use `0 9 * * *`.
- **Pause without editing the YAML** using the dedicated endpoints:

  ```bash
  cotctl schedules deactivate sched_saludo_diario -c acme -y
  cotctl schedules activate   sched_saludo_diario -c acme -y
  ```

## Recipe 8 — Define an SLA (and what "immutable" means)

An **SLA** is a timer attached to a workflow's state machine: it opens when a task enters certain states and fires a ParametrizedBot if the task hasn't left them in time.

**What you'll need:** an existing workflow whose state-machine code you know.

```yaml
# sla.yaml
kind: Sla
code: sla_review_window
display: "Review window SLA"
stateMachine: sm_po_main        # SM code or 24-hex ObjectId
start:
  types: [in-progress]
  states: [po_review]
end:
  types: [closed]
  states: []
data:
  timeType: static
  time: "HOURS|24"              # fire 24h after the window opens
  baseDate: default
pb:
  start: alert
  stages:
    - key: alert
      name: PBSendMessage
      data:
        channelId: "6a000000000000000000abcd"
        text: "Review deadline reached"
      next:
        SUCCESS: ""
        ERROR: ""
```

```bash
cotctl slas apply -f sla.yaml -c acme --dry-run
cotctl slas apply -f sla.yaml -c acme -y

# Disambiguate if the same SM code lives in more than one workflow:
cotctl slas apply -f sla.yaml -c acme --task-group wf_po
```

**What success looks like:** the SLA applies clean and arms whenever a task enters `po_review`.

**What "immutable" means in practice.** The backend PATCH accepts only `display`, `reset`, `repeat`, `pb`, `start`, `end`, and `data`. Everything else is frozen after creation:

- **You cannot turn an SLA off through the API.** There is no `cotctl slas deactivate`; `isActive: false` is silently dropped. To stop an SLA firing, edit `start.states` to point at a state nothing reaches, or have backend-dev remove the document at the database level.
- **`description` is dropped on UPDATE.** It's persisted on CREATE only — changing it later does nothing (cotctl warns you when you try). Get it right the first time.
- **`code` and `stateMachine` are identity.** Changing either creates a new SLA rather than editing the existing one.

So "changing an SLA" means editing the mutable fields; anything else is delete-and-recreate at the database level.

## Recipe 9 — Define a property type and populate it

A **PropertyType** is a schema (a set of typed fields); a **Property** is one row that fills it in. This recipe defines a `location` type and adds two cities.

**What you'll need:** a working profile.

```yaml
# location-type.yaml
kind: PropertyType
code: location                  # immutable after creation
display: Location
schemaNodes:
  - key: address
    display: Address
    basicType: string
  - key: city
    display: City
    basicType: string
    isIndexable: true
    validators:
      required: true
```

```bash
# PropertyType IS covered by `cotctl validate` — use the full ladder.
cotctl validate -f location-type.yaml
cotctl apply -f location-type.yaml -c acme --dry-run
cotctl apply -f location-type.yaml -c acme
```

Now populate it. Each property's `schemaInstance` keys map to the type's `schemaNodes[].key`:

```yaml
# cities.yaml — two properties in one batch
kind: Property
code: santiago
display: Santiago
propertyType: location          # immutable; the type must exist first
schemaInstance:
  address: Av. Providencia 1234
  city: Santiago
---
kind: Property
code: buenos_aires
display: Buenos Aires
propertyType: location
schemaInstance:
  address: Av. Corrientes 1500
  city: Buenos Aires
```

```bash
cotctl validate -f cities.yaml
cotctl apply -f cities.yaml -c acme --dry-run
cotctl apply -f cities.yaml -c acme
```

**What success looks like:** the type applies first, then both properties. `cotctl apply --dir` orders PropertyType before Property automatically, so you can keep both files in one folder and apply the folder in one shot.

Two things to know:

- **You can't delete a schemaNode by removing it from YAML.** cotctl merges server-side nodes back into the update to prevent accidental data loss — deactivate a node with `isActive: false` on the node instead.
- **`schemaInstance` keys are checked against the type.** Unknown keys produce a non-blocking warning (the value is still written), so a typo won't stop the apply — read the warnings.

## Recipe 10 — Gate a CI pipeline on a safe diff

For CI you want a preview that **fails the build** when an apply would destroy something, plus machine-readable output to log. The scoped `surveys`, `properties`, and `workflows` apply commands support exactly that.

**What you'll need:** a CI profile and the YAML under version control.

```bash
cotctl surveys apply -f survey.yaml -c ci \
  --dry-run \
  --diff compact \
  --fail-on-destructive \
  --json
```

- `--dry-run` — validate and preview, mutate nothing.
- `--diff compact` — field-level changes (`off`, `compact`, or `verbose`).
- `--fail-on-destructive` — exit **2** if the diff contains any danger-severity finding (requires `--dry-run`).
- `--json` — one JSON object per line on stdout, for your CI logs.

**Exit codes** — branch your pipeline on them:

| Code | Meaning |
|------|---------|
| `0` | Clean — no errors, no destructive findings |
| `1` | Runtime error (network, backend 4xx/5xx, or errors during a real apply) |
| `2` | Validation failed, **or** `--fail-on-destructive` caught a danger finding |

<div className="alert alert--warning">

These four flags live **only** on the scoped `surveys`, `properties`, and `workflows` apply commands. The unified `cotctl apply` — and `bots` / `routines` / `schedules` / `slas` / `property-types` apply — do **not** accept `--diff`, `--fail-on-destructive`, or line-delimited `--json`. Point your CI gate at the scoped command for the resource you're deploying.

</div>

**What success looks like:** a benign change exits `0` and the pipeline proceeds; a change that would drop a question (or similar) exits `2` and the build stops before anything is applied.

## Where to go next

- [Resource YAML reference](./resources/surveys.md) — the schema behind each file you edit
- [Troubleshooting](./troubleshooting.md) — when a recipe doesn't go to plan
- [CI/CD](./ci-cd.md) — run these flows automatically on every merge
