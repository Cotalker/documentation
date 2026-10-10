---
title: update
sidebar_label: update
displayed_sidebar: developer
---

<!-- source: repositories/cotctl/src/commands/update.ts, src/lib/update-check.ts, docs/commands/update.md @ 82e613d (2026-10-10) -->

From **0.14.0**, `cotctl` keeps itself current. Before every command it checks whether a newer version is published, and `cotctl update` installs the latest one whenever you ask. This page covers both.

<div className="alert alert--warning">

**The move to 0.14.0 is manual, once.** Versions before 0.14.0 never look for an update, so they never offer one. Install 0.14.0 by hand with `npm install -g @cotctl/cli` — from then on `cotctl` announces each new version itself.

</div>

## `cotctl update`

```bash
cotctl update
```

It takes no options. It asks npm for the latest `@cotctl/cli` and:

- **Already up to date** — says so and exits `0`.
- **A newer version exists** — names both versions (plus the [release notes](../release-notes.md) link when the update has breaking changes), installs it with `npm install -g @cotctl/cli@<version>`, and exits `0` once the new version answers.
- **This copy cannot update itself** (see [When cotctl can update itself](#when-cotctl-can-update-itself)) — prints the command to run instead and exits `1`.
- **Another `cotctl` is installing an update right now** — says so and exits `1` without touching npm. Run `cotctl update` again once that install finishes.

It works without a terminal, so a pipeline or a Dockerfile can call it, and it ignores `COTCTL_NO_UPDATE_CHECK` — asking for an update is an explicit request. Everything it prints goes to stderr.

| Exit | Meaning |
|---|---|
| `0` | Already up to date, or updated |
| `1` | npm could not be reached, this copy cannot update itself, another `cotctl` is installing an update, or npm failed |

## The check before every command

Before running any command, `cotctl` compares its version with the latest one on npm. What happens next depends on whether the update has **breaking changes**, and on whether there is a **terminal** to talk to:

| Situation | What `cotctl` does |
|---|---|
| Nothing newer is published | Nothing |
| No terminal (CI, scripts, redirected output), or a command run with `-y`/`--yes` | Prints a notice on **stderr** — the versions, the release notes link when the update is breaking, and the command to update with — then runs your command. It never asks and never installs |
| Terminal, update **without** breaking changes (`0.14.0` → `0.14.1`) | Installs it, prints one line, and runs your command on the new version. The exit code is that run's |
| Terminal, update **with** breaking changes (`0.14.x` → `0.15.0`) | Asks, on **every** command, until you update |

Before 1.0, a minor version bump is the breaking one; from 1.0 on, a major bump. Prerelease versions are never offered.

"A terminal" means stdin, stdout and stderr are all attached to one and `CI` is unset (or `0`, `false`, `no`). Redirecting only the output — `cotctl surveys export … > survey.yaml` — counts as no terminal. A command run with `-y` gets the no-terminal behaviour even on a terminal: `--yes` says nobody is there to answer.

### The prompt for a breaking update

| Choice | Effect |
|---|---|
| `update` | Installs the new version and runs your command on it. If this copy cannot update itself or npm fails, it prints the command to update with and exits `1` without running anything |
| `continue` | Runs your command on the current version. The prompt comes back on the next command |
| `cancel` | Does not run your command, and exits `0` |

The versions and the release notes link stay on screen above the options, so you can read what changed before you choose.

### When an automatic update fails

A failed update never stops your command. If npm fails, `cotctl` prints npm's reason and the command to run, carries on with the current version, and does not retry that version for 12 hours — an install you interrupt with Ctrl-C counts too. The registry gets 30 seconds to answer each request, and a whole install that reaches five minutes is stopped and treated as failed. When another `cotctl` is already installing an update, the command carries on with the current version instead of waiting, and does not suggest the npm command: running it at that moment would collide with that install.

## When cotctl can update itself

Only a copy installed with `npm install -g @cotctl/cli`, and only when all of these hold:

- it runs on **macOS or Linux** — Windows does not allow replacing `cotctl.exe` while it runs;
- the user running it can **write to npm's global directory** — `cotctl` never runs `sudo`, so an install made with `sudo npm install -g` has to be updated the same way;
- the `npm` on the `PATH` installs into the directory `cotctl` lives in, which is not the case when several Node versions (nvm, Volta) each have their own.

Any other installation — a standalone binary, a project dependency, `npx` — gets the command to update with instead. A **standalone binary** is also told its path: delete it after installing with npm, or replace it with the new release's binary. Left where it is, it stays ahead of the npm copy on the `PATH` and keeps running the old version.

## The lookup, its cache, and turning it off

- The latest version comes from the npm registry with a **1.5-second** timeout. A slow or unreachable registry is ignored silently: the command runs as if nothing were published.
- The lookup does not read `HTTP_PROXY` / `HTTPS_PROXY`. Behind a mandatory proxy it always fails, so no notice ever appears and `cotctl update` reports that it could not reach the registry. Update with `npm install -g @cotctl/cli`, which follows npm's own proxy settings.
- The answer is cached for **12 hours** in `~/.cotctl/update-check.json`, next to the profiles. The cache only spares the network call: while a breaking update is pending, the prompt still appears on every command.

Set `COTCTL_NO_UPDATE_CHECK=1` to skip the check entirely — no network call, no notice, no prompt:

```bash
COTCTL_NO_UPDATE_CHECK=1 cotctl apply -f survey.yaml -c acme --yes
```

The check is also skipped for `--version`, for `--help`, and for `cotctl update` itself.

<div className="alert alert--info">

**Updating `cotctl` does not update your installed Skills.** The [Skills](../skills.md) are files copied from the version that installed them. Run `cotctl skills install` again after an update to bring them in line with the new version.

</div>

## See also

- [Installation](../installation.md) — the first install
- [CI/CD](../ci-cd.md#new-cotctl-versions-in-a-pipeline) — what the check does in a pipeline
- [Troubleshooting](../troubleshooting.md#installation--setup) — when an update cannot install
