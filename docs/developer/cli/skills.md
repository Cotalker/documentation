---
title: Skills for Claude Code
sidebar_label: Skills
displayed_sidebar: developer
---

<!-- source: repositories/cotctl/src/commands/skills.ts, src/lib/skills-manager.ts, src/lib/skills-manifest.ts, src/lib/skills-refresh.ts, src/skills/index.ts, docs/commands/skills.md @ acc260a9 (2026-11-14) -->

A **Skill** is an installable package that gives the Claude Code AI agent specialized knowledge and tools for a specific area. `cotctl` ships a set of Skills — one per resource type — that turn a general-purpose agent into a Cotalker authoring specialist. This page is the reference for the `cotctl skills` command that manages them. For the bigger picture of how Skills fit with the RAG and the agent, see [AI-assisted authoring](./ai-authoring.md).

## Listing what's available

```bash
cotctl skills list
```

This shows every available Skill and its installation status, which can be `[not installed]`, `[local]`, `[global]`, or `[local, global]`. Add `--json` for machine-readable output — one entry per available Skill, each with its per-scope install state.

A Skill counts as installed only in a folder named exactly as the Skill, letter case included — also on a disk that ignores case, as macOS's does by default (0.17.0+). A folder such as `COTCTL-APPLY` shows as not installed, `uninstall --all` and the [update before every command](#keeping-the-skills-in-step-with-cotctl) leave it as it is, and `cotctl skills uninstall <name>` still removes it.

## Installing Skills

```bash
cotctl skills install [name] [options]
```

Run it **without a name** to get an interactive checklist and pick what you want. Provide a name to install a specific one.

| Option | Description |
|---|---|
| `--all` | Install every available Skill |
| `--local` | Install to `.claude/skills/` (this project only) |
| `--global` | Install to `~/.claude/skills/` (all projects), or to `$CLAUDE_CONFIG_DIR/skills/` when `CLAUDE_CONFIG_DIR` is set — see [Scopes](#scopes-local-vs-global) |
| `-y, --yes` | Skip the interactive scope prompt (defaults to `--local`) |
| `--no-mcp` | Skip the Cotalker RAG/MCP configuration step |

If you don't pass `--local` or `--global`, `cotctl` asks you interactively which scope to use — unless you pass `-y`, which takes the safer `--local` default without prompting (handy in scripts).

**What an install writes.** An install overwrites the Skill's files, edited or not. From **0.17.0** it names on stderr the edited files it replaced and, on a line of its own, the deleted ones it restored, and it deletes the files a version no longer ships unless someone edited them. A symbolic link in place of a file or folder inside a Skill counts as an edit: the install replaces the link itself and writes nothing where it pointed — earlier versions wrote into whatever the link pointed at.

**The install keeps a record.** From 0.17.0 it records what it wrote in `.cotctl-manifest.json`, inside the scope's skills directory. That record is what lets a later `cotctl` tell an edited Skill from one it may replace. When the file was written by a newer `cotctl`, the install writes nothing and exits `1`: run `cotctl update` and install again. When it cannot be read — a permission error, say — the install also writes nothing and exits `1`, naming the file and the error. Errors are reported in English, and a file the install cannot write is named with its error code, as in `.claude/skills: could not install the skills (EACCES on .claude/skills/cotctl-apply/SKILL.md)`.

Once the scope holds any `cotctl-*` Skill, [`cotctl-upgrade`](#upgrading-your-yaml-cotctl-upgrade) comes with the install, named on a line of its own — unless it was uninstalled from that scope by name or deleted by hand.

<div className="alert alert--info">

**Installing also offers to connect the RAG.** After installing, `cotctl` offers to configure the MCP connection to Cotalker's documentation service — the "live grounding" half of the setup. Skip it with `--no-mcp`, or set it up later with [`cotctl mcp install`](./mcp-integration.md). For most partners, accepting it is the right call. `-y` does not answer this question — it skips only the scope prompt — so a script passes `--no-mcp`.

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
| `cotctl-webhooks` | Creating, editing, exporting, applying, testing, and deactivating webhooks (event subscriptions) |
| `cotctl-logs` | Reading what a routine did when it ran — listing runs and downloading their logs with [`cotctl logs`](./commands/logs.md) |
| `cotctl-apply` | Applying resources to Cotalker environments |
| `cotctl-export` | Exporting and querying resources |
| `cotctl-upgrade` | **New in 0.17.0.** Bringing a repository's YAML up to date with the installed `cotctl`, from its release notes — checked with `validate` and a dry run, never applied. See [below](#upgrading-your-yaml-cotctl-upgrade) |
| `cotalker-docs` | General knowledge of the Cotalker platform |

A common starting point is to install them all:

```bash
cotctl skills install --all --local
```

## Keeping the Skills in step with cotctl

From **0.17.0**, installed Skills follow the `cotctl` that runs them. Before every command, `cotctl` checks the global Skills and the `.claude/skills/` of the directory the command runs in, and brings the ones behind its version up to it — what [`cotctl skills update`](#cotctl-skills-update) does, without `--force`, so a Skill edited since `cotctl` recorded it is never replaced (Skills an older version installed are the exception — see the warning below):

- **Unchanged since `cotctl` wrote it:** rewritten with this version's content; files this version no longer ships are deleted.
- **Edited:** left as it is. It is named in a `Warning:` line, with the command that replaces it (`cotctl skills update --<scope> --force`), at each new `cotctl` version that ships for it something other than what `cotctl` last wrote there.
- **With a symbolic link in place of one of its files or folders:** counts as edited, because `cotctl` never writes or deletes through a link inside a Skill.
- **A Skill whose folder is a symbolic link:** followed only when it leads to a folder holding a `SKILL.md` and, in a project's `.claude/skills/`, stays inside that folder. Any other is left as it is and recorded as removed — a project link leading out is named in a `Warning:` line — and `cotctl skills install <name> --local` replaces a project link that leads out, or to nothing, with a folder.
- **Deleted by hand, or uninstalled by name:** stays deleted.
- **Written by a newer `cotctl`:** left as it is.
- **Missing:** `cotctl-upgrade` is added wherever a `cotctl-*` Skill is installed, and a scope installed with `--all` — or, for Skills installed by 0.16.0 or earlier, one holding every Skill `cotctl` ships but `cotctl-upgrade` — receives the Skills later versions add.

The check says what it did in one `[cotctl]` line on **stderr** — the Skills it updated or added, the backup it took, the edited Skills it left — and never writes to stdout, so a command's `--json` output is unaffected. It never stops the command: a failure prints one `Warning:` line and the command runs anyway, and a skills directory it cannot write to is skipped without a word. It does not run for `cotctl skills` and its subcommands, `cotctl update`, `--version` or `--help`, nor on a build with no release version.

Set `COTCTL_NO_SKILLS_REFRESH=1` to turn it off. `cotctl skills update` still works with it set.

<div className="alert alert--warning">

**The first command of 0.17.0 rewrites the Skills an older version installed — edited or not.** A Skill installed by 0.16.0 or earlier carries no record of what `cotctl` wrote, so there is no way to tell an edit from an older version. The first command a 0.17.0 or later `cotctl` runs copies such a Skill to `~/.cotctl/skills-backup/<date>/` and rewrites it, edited or not, unless its files already match the version that runs — then it is recorded as it is, with no copy. A Skill with a symbolic link inside it is left alone, and named at every version, since nothing records what it held. If you edited an installed Skill by hand, your edits are in the backup folder the `[cotctl]` line names.

</div>

<div className="alert alert--info">

**A repository that commits `.claude/skills/` gets changes to commit.** After `cotctl` is updated, its first command there rewrites the Skills that version changes and writes `.cotctl-manifest.json` next to them. In a pipeline that requires a clean tree, set `COTCTL_NO_SKILLS_REFRESH=1` — see [CI/CD](./ci-cd.md#new-cotctl-versions-in-a-pipeline). And resolve a merge conflict in `.cotctl-manifest.json` before running `cotctl` in that checkout: a manifest that does not parse counts as missing, so `cotctl` rebuilds it from the Skills on disk: it forgets which Skills were uninstalled by name, and treats every Skill there as one an older version installed — copying to the backup folder and rewriting any whose files differ from this version, edited or not.

</div>

## `cotctl skills update`

```bash
cotctl skills update [options]
```

Does the same on request (0.17.0+), for both scopes or the one you name:

| Option | Description |
|---|---|
| `--local` | Only the Skills of the current project (`.claude/skills/`) |
| `--global` | Only the global Skills (`~/.claude/skills/`, or `$CLAUDE_CONFIG_DIR/skills/` when `CLAUDE_CONFIG_DIR` is set) |
| `--force` | Also replace edited Skills, keeping a copy of each under `~/.cotctl/skills-backup/<date>/` |
| `--json` | Print what happened, as JSON: the version, and one object per scope with its `status` and the Skills in each outcome |

It exits `1` when a skills directory, or the backup folder under `~/.cotctl/`, cannot be read or written, and names the file or folder that failed. Edited Skills left as they are do not count as a failure. `COTCTL_NO_SKILLS_REFRESH` does not apply to it.

## Upgrading your YAML: `cotctl-upgrade`

**New in 0.17.0.** The `cotctl-upgrade` Skill guides Claude Code through bringing a repository of YAML files up to date with the installed `cotctl`. It reads the [release notes](./commands/release-notes.md) after the version the repository was last reviewed against, checks the YAMLs with `validate --dir` and with a dry run against a company you choose (`apply --dir <dir> -c <profile> --dry-run --continue-on-error --json`), proposes the changes the notes call for as a diff, file by file, then runs both checks again and compares each with its own earlier run, so a failure that was already there is not taken for one the changes caused. **It never applies anything**: applying the result is up to you.

- **Several companies in one repository** are checked folder by folder, each against its own profile. For a folder without a profile it runs only `validate`, and says that the dry-run comparison is missing there.
- **You can upgrade only some YAMLs** — the files, folders or pattern you name. It then changes only those files, but still checks the whole folder they are applied from, so references between files are still checked.
- **It lists the YAMLs no check reads** — ones that declare a `cotctl` `kind` but are hidden, below `node_modules`, or reached through a symbolic link — and never edits them.

The version a review starts from is kept in `.cotctl-upgrade.json`, at the root of the repository, meant to be committed with the YAMLs so everyone starts from the same place:

```json
{
  "reviewedThrough": "0.16.0"
}
```

The Skill writes it once a review is finished and checked, with your agreement. A review of only some YAMLs, of one company's folder in a repository that holds several, or of a folder without a usable dry run never writes it: the next review starts from the same version. Without the file, the Skill reads every note.

## Scopes: local vs. global

Where a Skill is installed determines which projects can use it:

| Scope | Directory | Applies to |
|---|---|---|
| Local | `.claude/skills/` | The current project only |
| Global | `~/.claude/skills/`, or `$CLAUDE_CONFIG_DIR/skills/` when `CLAUDE_CONFIG_DIR` is set | All your projects |

Use **local** when you're working on a specific client's repository and want the Skills versioned alongside it; use **global** when you want them available everywhere you work.

Claude Code reads a user's Skills from `$CLAUDE_CONFIG_DIR/skills/` when that variable is set, and from **0.17.0** `skills install`, `list`, `update` and `uninstall` follow it. Earlier versions installed global Skills under `~/.claude/skills/` whatever the variable said, so with it set the Skills never reached Claude Code — and once you update, Skills installed that way stop showing in `list` and `uninstall`. With the variable set, run `cotctl skills install --global` again, and delete the copies left under `~/.claude/skills/` by hand.

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

From **0.17.0**:

- **A Skill uninstalled by name is recorded** in the scope's `.cotctl-manifest.json`, so neither the [update before every command](#keeping-the-skills-in-step-with-cotctl) nor an install of other Skills brings it back; installing it by name, or with `--all`, does. `--all` keeps no record: it deletes the manifest with the Skills, and the next install starts as if nothing had been installed in that scope.
- **When the manifest was written by a newer `cotctl`**, `--all` removes nothing and exits `1`: run `cotctl update` and uninstall again. Uninstalling a single Skill by name still works there.
- **`[name]` is a single folder name.** A path such as `../skills-old` or `cotctl-apply/references`, and a name that starts with `.` such as `.cotctl-manifest.json`, are refused before anything is deleted. Any other folder in the scope can still be uninstalled by its name.

## See also

- [AI-assisted authoring](./ai-authoring.md) — how Skills, the RAG, and the agent work together
- [MCP integration](./mcp-integration.md) — the documentation RAG the Skills offer to connect
- [release-notes](./commands/release-notes.md) — what each `cotctl` version changed for YAML files, which `cotctl-upgrade` reads
- [update](./commands/update.md) — updating `cotctl` itself
