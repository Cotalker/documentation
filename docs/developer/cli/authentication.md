---
title: Authentication
sidebar_label: Authentication
displayed_sidebar: developer
---

<!-- source: repositories/cotctl/src/commands/login.ts, src/commands/logout.ts @ 4f7248a (2026-07-06) -->

Now that `cotctl` is installed, it needs to know *which Cotalker environment to talk to* and *who you are*. This page explains how authentication works, walks you through your first login, and introduces **profiles** — the concept that lets you safely juggle several environments.

## How cotctl thinks about authentication: profiles

`cotctl` stores your credentials in a **profiles** system, kept in a file at `~/.cotctl/config.json`. Each profile holds the connection details and token for one environment or company.

This matters because as a partner you'll often work with more than one company — a staging environment, a production environment, several customers. Instead of logging in and out constantly, you log in *once per environment*, each login becomes a named profile, and from then on you simply tell each command which profile to use.

<div className="alert alert--primary">

**Good to know.** There is no `.env` file and no hardcoded token to copy around. Everything lives in the managed profiles file, which `cotctl` creates with restrictive permissions. You never paste a token by hand.

</div>

## Your first login

To connect to an environment, use `cotctl login`. The most important detail: the `--url` flag takes the **webclient URL** — the address you'd open in a browser to use Cotalker — *not* an API URL. `cotctl` figures out the API address automatically from there.

```bash
cotctl login --url https://web.cotalker.com --subdomain acme
```

By default this opens your browser to log in. Here's what happens, step by step:

1. `cotctl` opens your browser on the environment's authorization page.
2. You log in (if you aren't already) and approve access.
3. The token is transferred back to the CLI automatically.
4. A profile is saved to `~/.cotctl/config.json` — named `acme` in this example, after the `--subdomain`.

If the browser doesn't open on its own, `cotctl` prints the URL in the terminal so you can open it manually.

### Logging in without a browser

On a server, in CI, or any headless environment where no browser is available, add `--no-browser` to log in with email and password instead:

```bash
cotctl login --url https://web.cotalker.com --subdomain acme --no-browser
```

```
Email: admin@acme.com
Password: ********

Logged in as admin@acme.com (company: 64a1b2c3...)
Profile saved as "acme"
Use with: cotctl surveys list -c acme
```

### All login options

| Option | Description |
|---|---|
| `--url <url>` | **(required)** Webclient URL of the environment |
| `--subdomain <name>` | **(required)** Subdomain or company name |
| `--api-url <url>` | API URL, if you need to override autodiscovery |
| `--no-browser` | Use email/password instead of the browser flow |
| `--profile <name>` | Custom profile name (defaults to the `--subdomain` value) |
| `--paste-token` | Register a pre-generated ApiToken instead of authenticating — the path for CI and for users who can't mint their own token |
| `--machine-id <id>` | Override the machine identifier stamped into the token's code, so you can tell tokens apart per machine |

The [login & logout reference](./commands/login-logout.md) covers `--paste-token` and `--machine-id` in full.

## The `-c` flag: telling commands which company to act on

This is the single most important habit to build. **Every command that touches the API requires a `-c` (or `--company`) flag** naming the profile to use. There is deliberately no default — this prevents you from accidentally running a command against the wrong customer's environment.

```bash
cotctl surveys list -c acme
cotctl apply -f survey.yaml -c acme
cotctl surveys export my_survey -c acme
```

If you forget it, `cotctl` stops and tells you:

```
Error: --company/-c is required. Use 'cotctl profile list' to see available profiles.
```

That error is a feature, not a nuisance: it's the guardrail that keeps a staging change from landing in production.

## Working with multiple environments

Because each login is its own profile, supporting several environments is just several logins:

```bash
cotctl login --url https://web.cotalker.com --subdomain acme
cotctl login --url https://web.staging.cotalker.com --subdomain devteam
cotctl login --url https://www.cotalkercoopeuch.com --subdomain coopeuch
```

After that, switching environments is simply a matter of changing the `-c` value:

```bash
cotctl surveys list -c acme
cotctl surveys list -c devteam
cotctl apply -f survey.yaml -c coopeuch
```

## Managing your profiles

**See what you have.** To list every profile you've saved:

```bash
cotctl profile list
```

```
NAME          URL                              SUBDOMAIN    USER
acme          https://www.cotalker.com         acme         admin@acme.com
devteam       https://staging.cotalker.com     devteam      dev@cotalker.com
```

**Remove one.** When you no longer need an environment, log out of it. For modern API-token profiles this **revokes the token on the server** and then removes the local profile:

```bash
cotctl logout acme
# Remote ApiToken revoked.
# Logged out from profile "acme".
```

If you only want to forget a profile locally **without** revoking its token, use `cotctl profile delete <name>` instead.

## You don't have to think about token refresh

Tokens expire, but `cotctl` handles renewal for you before each API call, so in normal use you rarely log in more than once a week:

- **Less than 50 minutes old:** used as-is.
- **Between 50 minutes and 7 days old:** renewed quietly in the background.
- **Older than 7 days:** the session has expired and you'll be asked to log in again.

If a refresh can't be done, `cotctl` tells you exactly what to run:

```
Error: Session expired for profile "acme". Run: cotctl login --url https://web.cotalker.com --subdomain acme
```

## Next step

You're connected. Now let's put it to work — head to [**Commands**](./commands/apply.md) to learn `apply`, the verb you'll use most.
