---
title: MCP & AI integration
sidebar_label: MCP integration
displayed_sidebar: developer
---

<!-- source: repositories/cotctl/src/commands/mcp.ts, src/lib/skills-manager.ts @ 80cdbc87 (2026-10-27) -->

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

**The managed path needs no endpoint.** `cotctl mcp install` already knows the Cotalker documentation endpoint — `https://codex.cotalker.com/mcp` — so you don't have to supply one: just run it. Use this URL whichever environment your profiles point at. You only need an explicit URL if you register the server manually with `claude mcp add` (below), or want to point at a non-default endpoint (pass `--url`, or set the `COTCTL_MCP_URL` environment variable).

</div>

If you prefer to register it manually with an MCP-capable client, the shape is an HTTP transport pointing at the documentation endpoint:

```bash
claude mcp add --transport http cotalker-docs https://codex.cotalker.com/mcp
```

Add `--scope user` to make it available in every project rather than only the current one.

## Focusing on specific documentation

A single endpoint can serve several documentation sets ("indices"). The server currently publishes two, and a connection without a filter searches both:

| Index | What it covers |
|---|---|
| `cotctl-documentation` | The `cotctl` CLI: commands, authentication, surveys, workflows, MCP configuration and troubleshooting |
| `cotalker-implementation` | Implementing workflows in Cotalker: naming conventions, the permissions framework, code recipes and best practices |

`cotctl mcp indices` lists what the server publishes at any time. You can scope a connection to just the ones you care about with an `?indices=` query parameter — for example, to query only the CLI docs:

```bash
claude mcp add --transport http cotalker-cli \
  "https://codex.cotalker.com/mcp?indices=cotctl-documentation"
```

Keep the URL in quotes: shells like zsh otherwise try to expand the `?`. An index name the server does not publish makes it answer `400 No valid indices found`.

You can also register **multiple** servers, each scoped to a different set — one for the CLI, another for implementation guidance — so the assistant routes each question to the most relevant source:

```bash
claude mcp add --transport http cotalker-cli \
  "https://codex.cotalker.com/mcp?indices=cotctl-documentation"
claude mcp add --transport http cotalker-implementation \
  "https://codex.cotalker.com/mcp?indices=cotalker-implementation"
```

Each registered server advertises what it covers, which is how the assistant decides where to look.

## Installing without prompts

`cotctl mcp install` is interactive by default, but you can drive it entirely from flags — useful in setup scripts or a dotfiles bootstrap. Passing `--indices` skips the index-selection prompt, and `--scope` skips the scope prompt; with both, the command runs without asking anything:

| Flag | Description |
|---|---|
| `--name <name>` | Server name (default `cotalker-rag`) |
| `--scope <local\|global>` | Where to write the config, instead of asking |
| `--indices <a,b,c>` | Comma-separated index names — skips the selection prompt |
| `--url <url>` | Custom MCP server URL, overriding the build default |

```bash
cotctl mcp install --name cotalker-cli --scope local --indices cotctl-documentation
```

With `--indices`, a server that already exists under the same name and scope is replaced without asking. The names are not checked against the server, so use the ones `cotctl mcp indices` lists: an old name such as `cotctl` creates a connection the server rejects.

## Where the connection is stored

`cotctl` writes the connection where Claude Code reads it:

| Scope | File |
|---|---|
| `local` | `.mcp.json` in the current directory — what Claude Code calls the `project` scope |
| `global` | `~/.claude.json` (top-level `mcpServers`), or `$CLAUDE_CONFIG_DIR/.claude.json` when `CLAUDE_CONFIG_DIR` is set — the same place `claude mcp add --scope user` uses |

`~/.claude.json` is Claude Code's own file and holds all of your MCP servers, not only Cotalker's. When `cotctl` installs or removes a server, it changes only that server's entry and keeps every other key and server with the same values. If the file is not valid JSON, `cotctl` stops with an error instead of rewriting it.

Claude Code asks you to approve a project's `.mcp.json` servers the first time it starts in that project.

## Upgrading from an earlier version

The URL is written into the Claude Code configuration when you install, so updating `cotctl` does not change a connection that already exists. Two cases are worth re-running the install for:

- **A connection made with `cotctl` 0.15.0 or earlier** keeps the URL it was installed with — the staging server, for 0.15.0, which no longer answers. If you picked specific indices then, the old names (`cotctl`, `cot-api`, `cot-models`) are not published by the current server either.
- **A connection installed with the `global` scope before 0.15.1** never reached Claude Code: it was written to `~/.claude/settings.json`, where Claude Code does not look for MCP servers.

Run `cotctl mcp install` again with the same name and scope, and choose **Replace existing instance** if it asks. For a global server, the new entry goes to `~/.claude.json` and the old one is removed from `~/.claude/settings.json`. `cotctl skills install` (with `--global` for the global scope) also does it when you accept the MCP prompt, but only for the default `cotalker-rag` server — re-install any server you named differently with `cotctl mcp install --name <name>`. `cotctl mcp list` shows the URL each server uses, and warns about any server `cotctl` left in `~/.claude/settings.json`.

If you registered servers manually with `claude mcp add`, remove them with `claude mcp remove <name>` and add them again with the URLs above.

## Managing your connections

Beyond `install`, the `mcp` command group lets you inspect and tidy up what's configured:

- **`cotctl mcp list`** — show the configured MCP servers, grouped by scope (local `.mcp.json` and global `~/.claude.json`), with each server's URL and the indices it's scoped to. Add `--scope` to filter.
- **`cotctl mcp indices`** — list the indices the server advertises and show, per scope, which of your configured servers use each one (and which indices aren't in use anywhere). Add `--json` for machine-readable output, or `--url` to query a non-default endpoint.
- **`cotctl mcp remove [name]`** — remove a configured server. Run it with no name for an interactive picker; pass a `name` (and `--scope` to disambiguate if it exists in both) to target one directly. `-y` skips the confirmation.

These commands consider every HTTP server with a URL — the kind `cotctl` writes — including ones you added yourself to another host. Other servers in the same files, such as a `stdio` server, are not listed and cannot be removed through `cotctl`.

```bash
cotctl mcp list
cotctl mcp indices
cotctl mcp remove cotalker-cli --scope local -y
```

## See also

- [Overview](./overview.md) — what `cotctl` is and how the pieces fit together
- [Resource YAML reference](./resources/surveys.md) — the docs the MCP server makes queryable
