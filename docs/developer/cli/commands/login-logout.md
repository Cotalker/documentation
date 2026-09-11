---
title: login & logout
sidebar_label: login & logout
displayed_sidebar: developer
---

<!-- source: repositories/cotctl/src/commands/login.ts, src/commands/logout.ts @ 4f7248a (2026-07-06) -->

These two commands open and close your connection to a Cotalker environment. If you've already read the [Authentication](../authentication.md) page, you've met `login` — this page is the complete reference for both commands, including every option and the less common cases like on-premise environments.

## `cotctl login`

`login` authenticates you against a Cotalker environment and saves the result as a reusable **profile** in `~/.cotctl/config.json`. You typically run it once per environment.

```bash
cotctl login --url <webclient-url> --subdomain <subdomain> [options]
```

The key thing to remember: `--url` is the **webclient** address (what you'd type into a browser), not an API URL. `cotctl` discovers the API automatically from it.

### Options

| Option | Required | Default | Description |
|---|---|---|---|
| `--url` | Yes | — | Webclient URL of the environment |
| `--subdomain` | Yes | — | Company subdomain |
| `--api-url` | No | Auto-detected | Manual override of the API URL |
| `--no-browser` | No | `false` | Use email/password instead of the browser flow |
| `--profile` | No | Value of `--subdomain` | Custom profile name |
| `--machine-id` | No | Sanitized hostname | Identifier embedded in the ApiToken's code, so you can tell tokens apart per machine |
| `--paste-token` | No | `false` | Paste a pre-generated ApiToken instead of authenticating, typed at a prompt (see below) |
| `--token` | No | — | The same, supplied as an argument, a file or standard input — the form that works with no terminal (see below) |
| `--yes` / `-y` | No | `false` | Overwrite an existing profile without asking. Required in CI, where the prompt cannot be answered |
| `--allow-unverified-company` | No | `false` | Continue when the environment cannot confirm which company the token belongs to |

### Browser flow (the default)

```bash
cotctl login --url https://web.cotalker.com --subdomain acme
```

This opens your browser on the Cotalker authentication page, you approve access, and the token is handed back to the CLI. The flow times out after 5 minutes if you don't complete it.

### Email/password flow

When there's no browser available — a server, a CI runner — add `--no-browser` and you'll be prompted for credentials in the terminal:

```bash
cotctl login --url https://web.cotalker.com --subdomain acme --no-browser
```

### On-premise environments

Most environments expose a variables file that lets `cotctl` auto-discover the API URL. If a customer runs Cotalker on their own infrastructure and that discovery fails, point `cotctl` at the API explicitly with `--api-url`:

```bash
cotctl login \
  --url https://cotalker.empresa.com \
  --subdomain emp \
  --api-url https://api.empresa.com
```

### Pasting a pre-generated token

The two flows above both **mint** an ApiToken for you, which requires the `admin-apitokens-write` permission. If your user doesn't have it, there's a third path: an administrator issues an ApiToken for you from the webclient admin panel, and you register it with `--paste-token`:

```bash
cotctl login --url https://web.cotalker.com --subdomain acme --paste-token
```

`cotctl` prompts you to paste the token (masked), validates it against the backend, and saves the profile — no email/password and no browser involved. Because it reads from a prompt, **this flow needs a terminal**: in a pipeline, use `--token` below or an [environment credential](../authentication.md#running-without-a-profile-the-environment-credential) instead. See [CI/CD](../ci-cd.md).

### Logging in with no terminal: `--token`

**New in 0.12.0.** `--paste-token` reads from a prompt, which a pipeline cannot answer. `--token` takes the same pre-generated ApiToken as an argument instead, in three forms:

| Form | Reads the token from |
|---|---|
| `--token <jwt>` | The value itself, on the command line |
| `--token @<path>` | A file |
| `--token -` | Standard input |

**Prefer one of the two indirect forms.** A bare value sits in the process arguments, where any process on the same host can read it — and a CI provider masks its own job log, not the process table. The recommended shape is:

```bash
echo "$CI_COTCTL_TOKEN" | cotctl login \
  --url https://web.cotalker.com \
  --subdomain acme \
  --token - \
  --yes \
  --allow-unverified-company
```

Neither indirect form can hang or run away. `--token -` gives up after 10 seconds if the pipe stays open without delivering a token, and stops reading at 8 KB, so a job never burns its global timeout on a stalled stdin. `--token @<path>` **warns — it does not fail** — when the file is readable beyond its owner, so a secret mounted with your cluster's own mode still works.

`--token` and `--paste-token` supply the same thing, so passing both is an error. `--machine-id` is rejected alongside `--token` as well: it labels the machine that *mints* a token, and `--token` supplies one minted elsewhere.

<div className="alert alert--warning">

**Do not name the CI variable `COTCTL_TOKEN`.** `cotctl` reserves that name as an [environment credential](../authentication.md#running-without-a-profile-the-environment-credential), so exporting it changes the behaviour of every later command that omits `-c`.

</div>

<div className="alert alert--info">

**Which one should a pipeline use?** If the job addresses **one** company, prefer the environment credential — no `login` step, no profile file, no `-c`. Reach for `--token` when a single job has to address **several** companies, which one token cannot do. [CI/CD](../ci-cd.md) walks through both.

</div>

### Telling tokens apart with `--machine-id`

Each ApiToken carries a `code` that includes a machine identifier — by default your sanitized hostname — so you can recognize which machine a token came from in the admin panel. Override it with `--machine-id <id>` when the default isn't distinctive (for example, several ephemeral CI runners that share a hostname).

**A value you pass with `--machine-id` is pinned, and survives re-authentication.** `cotctl` records whether the identifier was chosen by you or derived from the hostname: a pinned one is reused when the token is renewed, and a derived one keeps being re-derived, so a renamed host is still picked up.

<div className="alert alert--info">

**Fixed in 0.12.0, and it needs one action from you.** Until this release the automatic re-login re-derived the identifier from the hostname and wrote it over whatever you had pinned, so the per-device naming reverted on the first renewal — and the token's code changed with it. **A profile written before 0.12.0 carries no record of how its identifier was chosen and is treated as derived**, so if you rely on the flag, run `cotctl login --machine-id <id>` once more to pin the value.

</div>

<div className="alert alert--info">

**Where credentials live.** The profile is written to `~/.cotctl/config.json` with restrictive file permissions (`0600`). In the browser and email/password flows there is no token to copy or store yourself; with `--paste-token` or `--token` you supply one, and it is written to that same file.

</div>

### A note on permissions

To apply resources (surveys, workflows, and so on) you need administration permissions in Cotalker. If a command later returns a `403`, that's the platform telling you the logged-in user lacks the required permission — ask the company's administrator to grant it.

### What the success line says

A login that **mints** a token reports it as created and prints a URL where you can revoke it. A login that **supplies** one — `--token` or `--paste-token` — reports `API token "…" accepted` and prints no revoke line, because you did not mint that token here and the panel that owns it may not even be yours to reach. Before 0.12.0 both said "created", which was misleading in the second case.

## `cotctl logout`

`logout` removes a profile's credentials from your local config file.

```bash
cotctl logout <profile>
# or, equivalently:
cotctl logout -c <profile>
```

The positional `<profile>` is optional if you pass `-c <profile>` instead.

<div className="alert alert--secondary">

**`logout` revokes your token server-side.** For modern API-token profiles, `cotctl logout` **revokes the ApiToken on the Cotalker server** and then removes the local profile, so the token can no longer be used. Revocation is **best-effort**: if the server can't be reached, `cotctl` still removes the local profile and warns you to revoke the token manually in the admin panel — so a logout never leaves you unable to log back in. (Legacy JWT profiles have nothing to revoke — they simply expire — so they're only removed locally.) This is the key difference from [`cotctl profile delete`](./profiles.md), which removes the profile **locally only** and leaves any token valid.

</div>

## See also

- [Authentication](../authentication.md) — the conceptual walkthrough of profiles and the `-c` flag
- [Managing profiles](./profiles.md) — list and delete saved profiles
