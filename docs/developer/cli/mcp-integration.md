---
title: MCP & AI integration
sidebar_label: MCP integration
displayed_sidebar: developer
---

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

## See also

- [Overview](./overview.md) — what `cotctl` is and how the pieces fit together
- [Resource YAML reference](./resources/surveys.md) — the docs the MCP server makes queryable
