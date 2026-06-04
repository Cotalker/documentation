---
title: Tutorials
sidebar_label: Tutorials
displayed_sidebar: developer
---

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
Survey "my_survey" created successfully (id: 507f1f77bcf86cd799439011)
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

## Where to go next

- [Resource YAML reference](./resources/surveys.md) — the schema behind each file you edit
- [Troubleshooting](./troubleshooting.md) — when a recipe doesn't go to plan
- [CI/CD](./ci-cd.md) — run these flows automatically on every merge
