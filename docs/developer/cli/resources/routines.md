---
title: Routines (YAML)
sidebar_label: Routines
displayed_sidebar: developer
---

<!-- source: repositories/cotctl/src/commands/routines.ts, src/schemas/routine.schema.ts, src/resources/pbscript.resource.ts, docs/routines/ @ 4f7248a (2026-07-06) -->

A **routine** (a PBScript, or *rutina*) is a reusable automation promoted to a first-class resource. It's the same automation graph you'd embed inline in a workflow — a `start` stage and a list of `stages[]` — but with its own `code`, `display`, and declared inputs, living in its own collection. Once a routine exists, any [bot](./bots.md), [SLA](./slas.md), or [schedule](./schedules.md) can invoke it from a stage by referencing its `code`. Think of routines as the shared library layer of the automation model.

## The shape of a routine

```yaml
kind: Routine
code: rutina_saludo_simple         # upsert key — lowercase, immutable
display: "Rutina de saludo"

body:
  start: send
  stages:
    - key: send
      name: PBMessage              # a bot type from the catalog
      data:
        channelId: "6a000000000000000000abcd"
        text: "Hola desde una rutina"
      next:
        SUCCESS: ""
        ERROR: ""
```

| Field | Required | Notes |
|---|---|---|
| `kind` | Yes | Always `Routine` |
| `code` | Yes | Upsert key. Lowercase/underscores/digits, 3–50 chars. **Immutable after creation** |
| `display` | Yes | Human-readable label (mutable) |
| `description` | No | Free text |
| `type` | No | `normal` (default), `network`, or `flowcontrol` |
| `isActive` | No | Defaults to `true`. Soft-delete by re-applying with `isActive: false` |
| `dataType` | No | Declared inputs the routine accepts (see below) |
| `body` | Yes | The automation graph — same shape as bots embedded in [workflows](./workflows.md) |

## Declared inputs: `dataType`

A routine can declare the inputs it expects. Each entry names a `key` (referenced inside the graph as `$INPUT#<key>`), a `display`, and whether it's `required`:

```yaml
dataType:
  - key: monto
    display: "Monto a evaluar"
    required: true
  - key: umbral
    display: "Umbral de riesgo"
    required: false
```

These are documentation-and-contract only — `cotctl` doesn't check that the graph actually consumes them, and it won't resolve `$INPUT#...` expressions for you. They fail at runtime if misspelled, not at apply time.

## The automation graph: `body`

`body` is a **multi-stage builder** — a directed graph the runtime walks one stage at a time, branching on the transition each stage emits (`SUCCESS`, `ERROR`, and type-specific branches like `TRUE`/`FALSE`). Every stage has:

- **`key`** — unique within the body.
- **`name`** — the bot type (see [Bot types](./bot-types.md) for the catalog: `PB*` messaging/tasks, `FC*` flow control, `NW*` HTTP, `PBScript`, …).
- **`version`** — optional. Omit it to take the type's default; pin it (quoted!) when the type has no default.
- **`data`** — an opaque payload passed straight through. `cotctl` does **not** rewrite ObjectIds or resolve COTLang expressions (`$INPUT#`, `$VALUE#`, `$OUTPUT#`) inside it — provide them exactly as the runtime expects.
- **`next`** — a map from branch name to the next stage's `key`. The empty string `""` is a valid terminal branch.

`body.start` names the entry stage. `body.maxIterations` (default `100`) caps how many transitions run — a safety net against loops.

### Invoking another routine

A stage with `name: PBScript` invokes a standalone routine by code — and a routine may invoke itself (a retry-with-backoff pattern) or form a cycle with another:

```yaml
body:
  start: try
  stages:
    - key: try
      name: PBScript
      data:
        code: rutina_calcular_riesgo   # must be a real routine code
      next:
        SUCCESS: ""
        ERROR: retry
    - key: retry
      name: FCSleep
      data:
        seconds: 30
      next:
        SUCCESS: try
        ERROR: ""
```

`cotctl` validates every `PBScript` stage's `data.code` against the routines registered in the profile, so a typo fails at apply time with a "did you mean…?" suggestion.

<div className="alert alert--info">

**Self-references validate clean on the *second* apply.** A brand-new routine that references its own `code` isn't in the catalog yet the first time you apply it, so you'll get a warning on that first pass. Apply again and it validates cleanly — the routine now exists. `cotctl` never blocks the create, so this is just noise on the first run.

</div>

## Working with routines

```bash
# Read
cotctl routines list                         # active, company-scoped (default)
cotctl routines list --all                   # include inactive
cotctl routines list --search "riesgo"
cotctl routines list --include-global        # include admin-only globals
cotctl routines get rutina_saludo_simple
cotctl routines export rutina_saludo_simple -o rutina.yaml

# Write
cotctl routines apply -f rutina.yaml --dry-run
cotctl routines apply -f rutina.yaml -y

# Run for real
cotctl routines test rutina_saludo_simple --context ctx.json
```

`apply` takes `-f/--file` (required), `--dry-run`, `-y/--yes`, and `-q/--quiet`, and handles multi-document files.

<div className="alert alert--warning">

**`routines test` runs the routine for real.** There is no simulation mode: `test` executes the routine immediately with all its side effects (it posts messages, creates tasks, writes properties, fires webhooks). It always prints a warning banner, and without `-y` it makes you retype the routine's `code` to confirm. `--context <file>` supplies the input JSON; `--dry-run` prints the payload that would be sent without calling the backend. Reserve `-y` for CI and scripts. Inspect the run afterward with `cotctl schedules logs <TEST_...>` — the backend records each test as a schedule.

</div>

<div className="alert alert--primary">

**Applying a routine is a live deploy.** Routines aren't versioned — re-applying mutates the live document in place, and a task currently executing it picks up the new behaviour on its next stage transition. Treat `cotctl routines apply` against production with the same care as shipping code.

</div>

## Immutability and updates

`code` is immutable and identifies the routine — there's no in-place rename. On update, `cotctl` sends only the fields the backend allows to change (`display`, `description`, `type`, `isActive`, `dataType`, and `body`); it deliberately omits `code` so an update can never try to change it. To retire a routine, set `isActive: false` and re-apply — there's no delete endpoint, and no `cotctl routines logs` command.

## Apply order

In a directory apply, routines come **after** workflows and **before** SLAs and schedules — because an SLA or schedule may invoke a routine from a `PBScript` stage, and the dry-run validator needs the routine to already exist in the catalog. `cotctl apply --dir` enforces this ordering for you.

## See also

- [Bot types](./bot-types.md) — the catalog of stage types, and how to check versions before pinning
- [Bots](./bots.md), [SLAs](./slas.md), [Schedules](./schedules.md) — the resources that invoke routines via `PBScript` stages
- [Workflows](./workflows.md) — the full ParametrizedBot reference
- [apply](../commands/apply.md) — routines are applied before SLAs and schedules
