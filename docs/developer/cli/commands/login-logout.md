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
| `--paste-token` | No | `false` | Paste a pre-generated ApiToken instead of authenticating (see below) |

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

`cotctl` prompts you to paste the token (masked), validates it against the backend, and saves the profile — no email/password and no browser involved. This is also the flow CI pipelines use; see [CI/CD](../ci-cd.md).

### Telling tokens apart with `--machine-id`

Each ApiToken carries a `code` that includes a machine identifier — by default your sanitized hostname — so you can recognize which machine a token came from in the admin panel. Override it with `--machine-id <id>` when the default isn't distinctive (for example, several ephemeral CI runners that share a hostname).

<div className="alert alert--info">

**Where credentials live.** The profile is written to `~/.cotctl/config.json` with restrictive file permissions (`0600`). There's no token to copy or store yourself.

</div>

### A note on permissions

To apply resources (surveys, workflows, and so on) you need administration permissions in Cotalker. If a command later returns a `403`, that's the platform telling you the logged-in user lacks the required permission — ask the company's administrator to grant it.

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
