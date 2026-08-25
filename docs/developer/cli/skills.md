---
title: Skills for Claude Code
sidebar_label: Skills
displayed_sidebar: developer
---

<!-- source: repositories/cotctl/src/commands/skills.ts, src/skills/index.ts @ 4f7248a (2026-07-06) -->

A **Skill** is an installable package that gives the Claude Code AI agent specialized knowledge and tools for a specific area. `cotctl` ships a set of Skills — one per resource type — that turn a general-purpose agent into a Cotalker authoring specialist. This page is the reference for the `cotctl skills` command that manages them. For the bigger picture of how Skills fit with the RAG and the agent, see [AI-assisted authoring](./ai-authoring.md).

## Listing what's available

```bash
cotctl skills list
```

This shows every available Skill and its installation status, which can be `[not installed]`, `[local]`, `[global]`, or `[local, global]`. Add `--json` for machine-readable output — one entry per available Skill, each with its per-scope install state.

## Installing Skills

```bash
cotctl skills install [name] [options]
```

Run it **without a name** to get an interactive checklist and pick what you want. Provide a name to install a specific one.

| Option | Description |
|---|---|
| `--all` | Install every available Skill |
| `--local` | Install to `.claude/skills/` (this project only) |
| `--global` | Install to `~/.claude/skills/` (all projects) |
| `-y, --yes` | Skip the interactive scope prompt (defaults to `--local`) |
| `--no-mcp` | Skip the Cotalker RAG/MCP configuration step |

If you don't pass `--local` or `--global`, `cotctl` asks you interactively which scope to use — unless you pass `-y`, which takes the safer `--local` default without prompting (handy in scripts).

<div className="alert alert--info">

**Installing also offers to connect the RAG.** After installing, `cotctl` offers to configure the MCP connection to Cotalker's documentation service — the "live grounding" half of the setup. Skip it with `--no-mcp`, or set it up later with [`cotctl mcp install`](./mcp-integration.md). For most partners, accepting it is the right call.

</div>

## The available Skills

Each Skill specializes the agent in one resource area:

| Skill | What it gives the agent |
|---|---|
| `cotctl-surveys` | Creating and modifying survey YAML |
| `cotctl-workflows` | Creating, scaffolding, and modifying workflows and state machines |
| `cotctl-properties` | Generating property types and properties |
| `cotctl-roles` | Creating and managing access roles and permissions |
| `cotctl-users` | Creating, managing, exporting, and applying user YAML |
| `cotctl-jobtitles` | Creating, managing, exporting, and applying job title (Cargo) YAML |
| `cotctl-routines` | Creating, editing, listing, exporting, and applying routines (PBScripts) |
| `cotctl-bots` | Creating, managing, exporting, and applying Bot admin (slash-command) YAML |
| `cotctl-apply` | Applying resources to Cotalker environments |
| `cotctl-export` | Exporting and querying resources |
| `cotalker-docs` | General knowledge of the Cotalker platform |

A common starting point is to install them all:

```bash
cotctl skills install --all --local
```

## Scopes: local vs. global

Where a Skill is installed determines which projects can use it:

| Scope | Directory | Applies to |
|---|---|---|
| Local | `.claude/skills/` | The current project only |
| Global | `~/.claude/skills/` | All your projects |

Use **local** when you're working on a specific client's repository and want the Skills versioned alongside it; use **global** when you want them available everywhere you work.

## Uninstalling

```bash
cotctl skills uninstall [name] [options]
```

| Option | Description |
|---|---|
| `--all` | Uninstall every Skill from the selected scope |
| `--local` | Uninstall from the current project |
| `--global` | Uninstall from the global configuration |

When you uninstall with `--all`, `cotctl` also asks whether to remove the RAG/MCP configuration that was set up alongside the Skills.

## See also

- [AI-assisted authoring](./ai-authoring.md) — how Skills, the RAG, and the agent work together
- [MCP integration](./mcp-integration.md) — the documentation RAG the Skills offer to connect
