---
title: Cotalker CLI (cotctl)
sidebar_label: Overview
displayed_sidebar: developer
---

<span className="hero__title">Cotalker CLI — cotctl</span>
<br/>
<br/>

_Welcome! This guide will take you from zero to deploying your first Cotalker configuration from the command line. It's written for **implementation partners** — the technical consultants and developers who build solutions on top of Cotalker — and it assumes no prior experience with the CLI._

## What is cotctl, and why would you use it?

When you configure Cotalker through the web admin panel, you click through forms to create surveys, workflows, roles, and so on. That works well for one-off changes, but it has limits: changes aren't versioned, they're hard to reproduce across environments, and you can't automate them.

`cotctl` solves this. It is a **command-line tool that manages Cotalker resources declaratively from YAML files** — much like `kubectl` manages Kubernetes, or like Terraform manages cloud infrastructure. Instead of clicking, you *describe* the resource you want in a text file, and `cotctl` makes the platform match that description.

In practice, this gives you four things that matter when you're delivering projects for customers:

- **Declarative.** You write *what you want* (a survey with these questions, a workflow with these states), and `cotctl apply` figures out whether to create or update it. You don't manage the "how".
- **Versionable.** Your YAML lives in your own Git repository. Every change a customer's configuration goes through is reviewable in a pull request and reversible with a `git revert`.
- **Reproducible.** The exact same files deploy to a staging environment first and to production later, against any company you have access to. No more "it worked in the demo".
- **Automatable.** Because it's a command, it runs unattended in a CI/CD pipeline — so deployments become repeatable and don't depend on someone remembering the steps.

<div className="alert alert--primary">

**The mental model.** A Cotalker company is a collection of *resources* (surveys, workflows, properties, roles, users…). With `cotctl` you keep a YAML description of those resources in Git, and you `apply` them to an environment. The YAML is the source of truth; the environment is the result.

</div>

## What you can manage with it

Almost every building block you assemble during an implementation has a `cotctl` representation:

| Resource | What it is | Command group |
|---|---|---|
| **Surveys** | Forms used to capture data | `cotctl surveys`, `cotctl apply` |
| **Workflows** | Processes and their state machines | `cotctl workflows`, `cotctl workflows scaffold` |
| **Property types & properties** | The data model (entities and their fields) | `cotctl property-types`, `cotctl properties` |
| **Access roles** | Permissions and what each role can see/do | `cotctl roles` |
| **Users** | People in the company, with their hierarchy | `cotctl users` |
| **Job titles (Cargos)** | Organizational positions | `cotctl jobtitles` |

Don't worry about learning all of these at once. Most partners start with surveys and workflows and pick up the rest as projects require them.

## A 60-second taste

Here is the shortest possible path from nothing to a deployed change. We'll explain each step in detail in the next pages — this is just so you can see the shape of it:

```bash
# 1. Install the tool (once per machine)
npm install -g @cotctl/cli

# 2. Connect it to an environment. This saves a reusable "profile" called acme.
cotctl login --url https://web.cotalker.com --subdomain acme

# 3. Deploy a resource. The -c flag tells cotctl which company to act on.
cotctl apply -f my-survey.yaml -c acme
```

That's the whole loop: **install → login → apply.** Everything else in this guide makes each of those steps more powerful and safer.

## How this guide is organized

We recommend reading the first three pages in order — they get you set up and productive:

1. [**Installation**](./installation.md) — get `cotctl` onto your machine and confirm it works.
2. [**Authentication**](./authentication.md) — connect to an environment and understand profiles and the all-important `-c` flag.
3. [**Practice in a demo company**](./demo-company.md) — set up a safe, non-production environment so your first real use case isn't a customer's live company.
4. [**Commands**](./commands/apply.md) — the day-to-day verbs: `apply`, `validate`, exporting/importing, and scaffolding.

Then reach for these as you need them:

- [**Resource YAML reference**](./resources/surveys.md) — the exact schema for each resource type.
- [**Tutorials**](./tutorials.md) — complete, end-to-end recipes you can follow along with.
- [**Troubleshooting**](./troubleshooting.md) — what the common errors mean and how to fix them.
- [**CI/CD**](./ci-cd.md) — running `cotctl` in automated pipelines.

<div className="alert alert--secondary">

**A note on exit codes.** `cotctl` returns `0` when everything succeeded and `1` on any error (a validation problem, an API error, a missing profile, or a missing file). You don't need this yet, but it's what makes `cotctl` safe to use in scripts and CI gates later on.

</div>

Ready? Let's [install it](./installation.md).
