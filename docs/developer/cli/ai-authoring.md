---
title: AI-assisted authoring (Skills & RAG)
sidebar_label: AI-assisted authoring
displayed_sidebar: developer
---

<!-- source: repositories/cotctl/src/commands/bot-types.ts @ 4f7248a (2026-07-06) -->

So far this guide has treated `cotctl` as a tool *you* drive by hand. But `cotctl` is also the foundation for something bigger: **authoring Cotalker configurations with the help of an AI agent.** This page explains how that ecosystem fits together — and why it makes you, as a partner, dramatically faster.

## The idea in one picture

Writing resource YAML by hand is precise but slow, and it's easy to forget a field or a naming convention. An AI agent like **Claude Code** can write that YAML for you — *if* it knows two things: how Cotalker resources are structured, and what actually exists in the platform right now. `cotctl` provides exactly those two things, through **Skills** and **RAG**:

```
              Claude Code  (the AI agent)
                    │   writes the YAML for you
        ┌───────────┴────────────┐
        │                        │
     SKILLS                   RAG (via MCP)
 cotctl skills install     cotctl mcp install
 → domain expertise:       → live grounding:
   how each resource          up-to-date Cotalker
   is authored                documentation
        └───────────┬────────────┘
                    ▼
   correct YAML → cotctl validate → cotctl apply
```

- **Skills** teach the agent *how* to write each kind of resource (a survey, a workflow, a role…), encoding Cotalker's conventions so the output is well-formed.
- **RAG** (through an MCP server) grounds the agent in the *current* Cotalker documentation, so it answers from real reference material instead of guessing field names.

Put together, you describe what you want in plain language, the agent produces grounded YAML, and you finish with the same trustworthy `validate` → `apply` loop you already know.

## The three pieces

### 1. The agent

[Claude Code](https://claude.com/claude-code) is the AI coding assistant that does the authoring. On its own it's a capable generalist; the next two pieces turn it into a Cotalker specialist.

### 2. Skills — domain expertise, installed

A **Skill** is an installable package that gives the agent specialized knowledge and tools for one area. `cotctl` ships a set of them — one per resource type — that you install with a single command:

```bash
cotctl skills install
```

Once installed, asking the agent to "create a purchase-orders workflow" produces YAML that follows Cotalker's structure and naming conventions, because the relevant Skill is guiding it. The full command reference — listing, scopes, and the available Skills — is on the [Skills](./skills.md) page.

### 3. RAG — live documentation grounding

**RAG** (Retrieval-Augmented Generation) lets the agent look things up in Cotalker's documentation as it works, via an **MCP** server. This is what stops it from inventing a field that doesn't exist: when it's unsure, it retrieves the real reference. You connect it with:

```bash
cotctl mcp install
```

Conveniently, installing the Skills already offers to set this up for you. The full details — indices, scopes, multiple servers — are on the [MCP integration](./mcp-integration.md) page.

### Grounding on live bot versions

Skills and the RAG teach the agent *conventions*, but some facts are specific to your environment right now — most notably, which **bot versions** the backend has registered. When the agent (or you) is about to write YAML that wires up a bot, it's worth checking the live catalog first, so the pinned `version` is a real one rather than a guess:

```bash
# What versions does this bot type actually have, and what's the default?
cotctl bot-types versions PBCreateTask -c dev

# Or the whole catalog at once
cotctl bot-types list -c dev
```

This is the same catalog `cotctl` validates against at apply time, so consulting it up front turns "the apply rejected my bot version" into a one-line lookup before you ever write the file. It's the manual counterpart to the RAG: `bot-types` grounds you in the live version catalog, the RAG grounds you in the documentation.

## The authoring loop, end to end

Here's what working this way actually looks like:

```bash
# 1. One-time setup: install the Skills (this also offers to connect the RAG/MCP)
cotctl skills install --all

# 2. In Claude Code, describe what you want in plain language, e.g.:
#    "Scaffold a purchase-orders workflow with draft, pending, approved
#     and rejected states, and a manager role with full access."
#    → the agent writes the YAML, grounded by the Skills + RAG.

# 3. You stay in control with the usual safety loop:
cotctl validate --dir ordenes-compra/
cotctl apply    --dir ordenes-compra/ -c dev
cotctl validate --workflow ordenes_compra -c dev
```

<div className="alert alert--primary">

**You're always the reviewer.** The agent drafts; you validate and apply. Nothing reaches an environment without going through `cotctl validate` and your explicit `apply`. The AI makes authoring faster — it doesn't remove the guardrails.

</div>

## Why this matters for partners

This is the difference between *configuring Cotalker* and *implementing on Cotalker at speed*. The Skills carry the conventions so you don't have to memorize them, the RAG keeps everything current as the platform evolves, and `cotctl` remains the trustworthy way to validate and ship what the agent produces. The result is faster delivery with the same — or better — correctness.

## Next steps

- [**Skills**](./skills.md) — install and manage the Cotalker Skills for Claude Code
- [**MCP integration**](./mcp-integration.md) — connect the documentation RAG
- [**Tutorials**](./tutorials.md) — the resource flows the agent helps you author
