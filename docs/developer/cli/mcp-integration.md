---
title: MCP & AI integration
sidebar_label: MCP integration
displayed_sidebar: developer
---

<!-- source: repositories/cotctl/src/commands/mcp.ts @ 4f7248a (2026-07-06) -->

`cotctl` can connect AI assistants — like Claude — to Cotalker's technical documentation, so that while you're authoring resources you can ask questions and get answers grounded in the real, up-to-date docs. This page explains the idea and how to set it up.

## What is MCP, and why would a partner care?

**MCP** (Model Context Protocol) is a standard way to give an AI assistant access to an external source of knowledge or tools. Cotalker exposes an MCP server backed by its documentation, so an assistant connected to it can answer "how do I structure a workflow transition?" or "what fields does a property type take?" using the actual reference material instead of guessing.

For a partner authoring YAML, that means faster, more accurate help right inside your editor or AI tool — fewer round-trips to the docs, fewer invented field names.

## Registering the server

The simplest path is the managed command, which walks you through connecting and lets you pick which documentation sets to include:

```bash
cotctl mcp install
```

<div className="alert alert--info">

**The managed path needs no endpoint.** `cotctl mcp install` already knows the default Cotalker documentation endpoint, so you don't have to supply one — just run it. You only need an explicit URL if you register the server manually with `claude mcp add` (below), or want to point at a non-default environment (override it with the `COTCTL_MCP_URL` environment variable).

</div>

If you prefer to register it manually with an MCP-capable client, the shape is an HTTP transport pointing at the documentation endpoint:

```bash
# Replace the URL with your environment's documentation MCP endpoint
claude mcp add --transport http cotalker-docs https://<your-cotalker-docs-endpoint>/mcp
```

## Focusing on specific documentation

A single endpoint can serve several documentation sets ("indices"). You can scope a connection to just the ones you care about with an `?indices=` query parameter — for example, to query only the CLI docs:

```bash
claude mcp add --transport http cotalker-cli \
  "https://<your-cotalker-docs-endpoint>/mcp?indices=cotctl"
```

You can also register **multiple** servers, each scoped to a different set — one for the CLI, another for the API and data models — so the assistant routes each question to the most relevant source:

```bash
claude mcp add --transport http cotalker-cli \
  "https://<your-cotalker-docs-endpoint>/mcp?indices=cotctl"
claude mcp add --transport http cotalker-api \
  "https://<your-cotalker-docs-endpoint>/mcp?indices=cot-api,cot-models"
```

Each registered server advertises what it covers, which is how the assistant decides where to look.

## Installing without prompts

`cotctl mcp install` is interactive by default, but you can drive it entirely from flags — useful in setup scripts or a dotfiles bootstrap. Passing `--indices` skips the index-selection prompt, which makes the whole command non-interactive:

| Flag | Description |
|---|---|
| `--name <name>` | Server name (default `cotalker-rag`) |
| `--scope <local\|global>` | Where to write the config, instead of asking |
| `--indices <a,b,c>` | Comma-separated index names — skips the selection prompt |
| `--url <url>` | Custom MCP server URL, overriding the build default |

```bash
cotctl mcp install --name cotalker-cli --scope local --indices cotctl
```

## Managing your connections

Beyond `install`, the `mcp` command group lets you inspect and tidy up what's configured:

- **`cotctl mcp list`** — show every configured MCP server, grouped by scope (local `.mcp.json` and global `~/.claude/settings.json`), with each server's URL and the indices it's scoped to. Add `--scope` to filter.
- **`cotctl mcp indices`** — list the indices the server advertises and show, per scope, which of your configured servers use each one (and which indices aren't in use anywhere). Add `--json` for machine-readable output, or `--url` to query a non-default endpoint.
- **`cotctl mcp remove [name]`** — remove a configured server. Run it with no name for an interactive picker; pass a `name` (and `--scope` to disambiguate if it exists in both) to target one directly. `-y` skips the confirmation.

```bash
cotctl mcp list
cotctl mcp indices
cotctl mcp remove cotalker-cli --scope local -y
```

## See also

- [Overview](./overview.md) — what `cotctl` is and how the pieces fit together
- [Resource YAML reference](./resources/surveys.md) — the docs the MCP server makes queryable
