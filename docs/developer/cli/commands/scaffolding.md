---
title: Scaffolding a workflow
sidebar_label: Scaffolding
displayed_sidebar: developer
---

<!-- source: repositories/cotctl/src/commands/scaffold.ts, src/lib/scaffold-generator.ts @ a9168d68 (2026-10-23) -->

Building a workflow from a blank file is a lot of boilerplate: you need roles, property types, state properties, and the workflow itself, all named consistently and wired together. `cotctl workflows scaffold` generates that skeleton for you — correctly named and ready to customize — so you start from a working structure instead of an empty page.

It's an offline command. No environment is touched until you `apply` later.

## The command

```bash
cotctl workflows scaffold --name <flow-name> --code <prefix> [options]
```

Two inputs are required:

- `--name` — the flow name in kebab-case, e.g. `ordenes-compra`.
- `--code` — a short prefix (2 to 8 characters) used across all generated codes, e.g. `oc`.

```bash
cotctl workflows scaffold --name ordenes-compra --code oc
```

### Options

| Option | Description |
|---|---|
| `--name <name>` | **(required)** Flow name, kebab-case |
| `--code <prefix>` | **(required)** 2 to 8 characters: a lowercase letter, then lowercase letters or digits (`oc`, `qa011`) |
| `--display <name>` | Human-readable name (default: title-cased `--name`) |
| `--output-dir <dir>` | Where to write (default: `./<name>/`). May already exist; no file in it is overwritten |
| `--states <list>` | Extra closed states beyond the base three, comma-separated, each written as its display name (`"Aprobado,En compra"`) |
| `--no-technical` | Omit the technical permissions (`form-bypass`, `force-state`) |

## What it generates

A scaffold is a small folder of YAML, organized by concern:

```
ordenes-compra/
├── README.md                  # Flow definition, naming conventions, apply order
├── workflow.yaml              # Workflow + state machine + transitions
├── access/
│   ├── permissions.yaml       # One AccessRole per permission
│   └── manager-role.yaml      # Manager role aggregating all permissions
└── data-model/
    ├── property-types.yaml    # transaccion, maestro, estados
    └── states.yaml            # base states: borrador, pendiente, error
```

Out of the box you get six access roles (four with `--no-technical`), a Manager role, three property types, three base states (a *new* state, an *in-progress* state, and an *error* state), and one workflow with its state machine. Everything follows Cotalker's implementation naming conventions, so the result passes the nomenclature checks in [`cotctl validate --workflow`](./validate.md#workflow-mode--production-readiness-online) from the start.

### Adding your own states

Most real flows need more than the three base states. Pass them with `--states` and `cotctl` generates the state properties and wires transitions from `pendiente` to each. Write each state as the name users should see: it is kept as typed for the display, and the codes are derived from it.

```bash
cotctl workflows scaffold --name ordenes-compra --code oc \
  --display "Órdenes de Compra" \
  --states "Aprobado,Rechazado,En compra"
```

## The pipeline it fits into

Scaffolding is step 1 of a five-step loop. Steps 2–5 repeat safely as you iterate, because every apply is idempotent:

```
1. scaffold   →  cotctl workflows scaffold --name ordenes-compra --code oc
2. customize  →  edit the YAML — add properties, forms, business logic
3. validate   →  cotctl validate --dir ordenes-compra/
4. apply      →  cotctl apply --dir ordenes-compra/ -c dev
5. validate   →  cotctl validate --workflow ordenes_compra -c dev
```

<div className="alert alert--primary">

**The mental model.** Scaffold gives you a *correct skeleton*. You then flesh it out (step 2), check it offline (step 3), deploy it (step 4), and confirm it's production-ready against the live environment (step 5) — looping over 2–5 until you're happy.

</div>

<div className="alert alert--warning">

**Don't re-apply a scaffold over transitions added in the webclient.** Without `--states`, the scaffold writes `next: []` on the workflow's *in-progress* state, and since 0.14.0 a written `next: []` deletes every transition of that state. If someone added transitions to it in the webclient, remove the line — or write those transitions into the YAML — before re-applying. The same goes for the `next` lists the scaffold writes elsewhere — on the *new* state, and with `--states` on the *in-progress* state: a written list is the complete list, so re-applying deletes any transition added in the webclient that it leaves out.

</div>

## A couple of input rules

`cotctl` validates your inputs up front so the generated names are always valid:

- `--name` must be kebab-case (e.g. `ordenes-compra`).
- `--code` must be 2 to 8 characters — a lowercase letter, then lowercase letters or digits (`qa011`). Before 0.15.0 it took 2 to 4 lowercase letters; every code it took then is still accepted. `validate --workflow` checks the flow's codes against the same rule.
- `--output-dir` may already exist — an empty folder, or a folder of a repository — but `cotctl` never overwrites a file: if any of the six files it generates is already there, it exits `1` naming them and writes nothing.

## See also

- [validate](./validate.md) — check the scaffold offline, then against the live workflow
- [apply](./apply.md) — deploy the whole folder with `--dir`
- [Workflows YAML reference](../resources/workflows.md) — understand what you're customizing
