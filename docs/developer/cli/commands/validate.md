---
title: validate
sidebar_label: validate
displayed_sidebar: developer
---

<!-- source: repositories/cotctl/src/commands/validate.ts @ 4f7248a (2026-07-06) -->

`cotctl validate` checks your YAML *before* you deploy it. Getting into the habit of validating first is one of the highest-value things you can do as a partner: it catches mistakes on your machine, in seconds, instead of as a half-applied change in a customer's environment.

There are three things you might want to validate, and `validate` has a mode for each:

| Mode | Flag | Network | What it's for |
|---|---|---|---|
| File | `-f <file>` | Offline | Check a single YAML file of any supported kind |
| Directory | `--dir <path>` | Offline | Cross-check a whole folder of resources before `apply --dir` |
| Workflow | `--workflow <nameCode>` | Online | Run the production-readiness checklist against a live workflow |

## File mode — one file, offline

The quickest check. It validates a single YAML file against the schema for its `kind`, with no API call:

```bash
cotctl validate -f my-survey.yaml
```

```
✓ my-survey.yaml is valid
```

If something's wrong, it tells you what and where:

```
✗ my-survey.yaml has validation errors:

  - code: code must start with a lowercase letter and contain only lowercase letters, numbers, and underscores
```

File mode isn't survey-only. It reads the `kind` field and runs the matching schema, so it validates any of the seven kinds `apply` supports — `Survey`, `AccessRole`, `PropertyType`, `Property`, `JobTitle`, `Workflow`, `User`. (A file with no `kind` is treated as a Survey, for backward compatibility.)

A single file can hold **several documents** separated by `---`. `validate` checks each one and **accumulates** the errors — it doesn't stop at the first bad document — then reports a per-kind tally like `2 Survey documents, 1 User document validated successfully`, so you can fix everything in one pass.

Under the hood, up to three layers of checking run — but only the first applies to every kind:

| Layer | What it checks | Applies to | How to skip |
|---|---|---|---|
| Structure (Zod) | Types, required fields, enums | **All kinds** | Always on |
| Semantic | `function run()` in exec hooks, buttons in the wrong stage, deprecated fields | **Survey only** | `--skip-semantic-validation` |
| Remote | Identifier uniqueness across the company, that referenced entities exist | **Survey only** | Needs `--remote` + `-c <profile>` |

Non-Survey kinds get the structural (Zod) layer only. The semantic and remote layers are Survey-specific. Remote checks reach the API, so they require a profile — and `--remote` can't be combined with `--dir`:

```bash
cotctl validate -f my-survey.yaml --remote -c acme
```

## Directory mode — a whole folder, offline

This is the one you'll use most when working with scaffolded workflows. It validates every YAML file in a folder **and** checks that they reference each other correctly — all offline. Run it right before `apply --dir`:

```bash
cotctl validate --dir ordenes-compra/
```

It runs two families of checks. **Schema checks**, per file:

| ID | Check |
|---|---|
| S1 | File parses as valid YAML |
| S2 | `kind` is present and recognized |
| S3 | Document validates against the schema for its `kind` |

And **cross-reference checks**, across files — this is what catches a property pointing at a property type that doesn't exist:

| ID | Severity | Check |
|---|---|---|
| X1 | warn | Permission strings (`name:action`) are defined as AccessRoles |
| X2 | fail | `Property.propertyType` references an existing PropertyType |
| X3 | fail | Workflow state machine `propertyType` references resolve |
| X4 | fail | Workflow `states[].property` references an existing Property |
| X5 | fail | The state machine `initialState` references an existing Property |
| X6 | warn | Workflow permissions are defined as AccessRoles |

A clean run ends with a clear verdict:

```
Results: 11 PASS, 0 WARN, 0 FAIL — ready to apply
```

Add `--json` if you want to consume the result in a script.

## Workflow mode — production readiness, online

Once a workflow is live, this mode runs the **Marcha Blanca** (go-live) checklist against it. It's an online check, so it needs a profile:

```bash
cotctl validate --workflow ordenes_compra -c prod
```

The checklist is organized in three sections, and you can run just one with `--section`:

- **Nomenclature** (`nomenclature`) — naming conventions for codes, forms, properties, and permissions.
- **Permissions** (`permissions`) — that a Manager role exists with all flow permissions, wired into the linked forms.
- **Configuration** (`configuration`) — technical rules, like control fields being read-only and an error state existing.

```bash
# only the naming checks
cotctl validate --workflow ordenes_compra --section nomenclature -c prod
```

```
Results: 13 PASS, 1 WARN, 0 FAIL — production ready
```

Checks are graded **WARN** (a recommendation) or **FAIL** (a real problem). The command exits `0` when everything passes or only warns, and `1` when at least one check fails — which is exactly what you want as a gate in a pipeline.

<div className="alert alert--info">

**A couple of known limits.** Deep JavaScript code-quality checks on exec hooks aren't implemented, and the error-state check (T3) looks for the `_estado_error` naming convention — if your implementation names its error state differently, expect a warning even when an error state exists.

</div>

## See also

- [apply](./apply.md) — deploy your resources once validation passes
- [scaffolding](./scaffolding.md) — generate a workflow skeleton to validate and apply
