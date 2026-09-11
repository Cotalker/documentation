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
| `--paste-token` | Register a pre-generated ApiToken instead of authenticating, typed at a prompt |
| `--token <jwt \| @file \| ->` | The same, supplied as an argument instead of at a prompt — this is the one that works with no terminal attached |
| `--machine-id <id>` | Pin the machine identifier stamped into the token's code, so you can tell tokens apart per machine |
| `--yes` | Overwrite an existing profile without asking |
| `--allow-unverified-company` | Continue when the environment cannot confirm which company the token belongs to |

The [login & logout reference](./commands/login-logout.md) covers `--token`, `--paste-token` and `--machine-id` in full.

## The `-c` flag: telling commands which company to act on

This is the single most important habit to build. **Every command that touches the API needs to know which company to act on**, and in interactive use that means a `-c` (or `--company`) flag naming the profile. There is deliberately no default profile — this prevents you from accidentally running a command against the wrong customer's environment.

The one way to omit `-c` is the [environment credential](#running-without-a-profile-the-environment-credential) below, which supplies the company from the token itself. It exists for pipelines, and `-c` always wins over it.

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

## Running without a profile: the environment credential

Everything above assumes a person at a terminal. A pipeline has no browser, no prompt and no `~/.cotctl/config.json` — so since **0.12.0** `cotctl` can take its credential from the environment instead, and `-c` becomes optional:

```bash
export COTCTL_TOKEN="$CI_COTCTL_TOKEN"
export COTCTL_API_URL="https://www.cotalker.com"

cotctl apply -f survey.yaml --yes
```

`COTCTL_TOKEN` is a Cotalker **ApiToken**, and `COTCTL_API_URL` is the API URL of the environment it belongs to. Both are required together: exporting only one tells you which half is missing.

**Nothing is written to disk.** The configuration is built in memory for that run, so a CI runner never has to reproduce the profile file format — which is what pipelines used to do, and what used to go wrong.

Four rules worth knowing before you wire it up:

- **`-c` always wins.** The variables are consulted only when `-c/--company` is absent, so exporting `COTCTL_TOKEN` on a machine that also has profiles changes nothing about your existing commands.
- **The company comes from the token**, not from a flag, so it cannot disagree with the credential. `cotctl` prints one line to `stderr` naming where the credential came from.
- **It fails hard when the token is rejected.** On a `401`, or once the token has expired, `cotctl` stops and names `COTCTL_TOKEN`. It does not fall back to a prompt, and it will never write your token into a profile on its own.
- **A browser session token is refused.** Only an ApiToken is accepted, and the check costs no network call.

### Asserting which company the job expects

`COTCTL_COMPANY_ID` is optional and exists for one purpose: to state which company the pipeline believes it is acting on. A token belonging to a different one stops the run before anything happens, naming both ids.

```bash
export COTCTL_COMPANY_ID="64a1b2c3d4e5f6a7b8c9d0e1"
```

This is worth setting on any job that can write. It is the same guardrail `-c` gives a person, expressed as an assertion instead of a choice.

<div className="alert alert--warning">

**Do not name your CI secret `COTCTL_TOKEN` if you are using `cotctl login --token`.** That name is reserved as an environment credential, so exporting it silently changes the behaviour of every later command that omits `-c`. Pick a different variable name and pipe it in — see the [login reference](./commands/login-logout.md).

</div>

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

**None of this applies to an environment credential.** `COTCTL_TOKEN` is never refreshed and never renewed: an expired token stops the run with a message naming the variable, so a pipeline fails loudly instead of quietly re-authenticating as somebody. Rotating that token is the pipeline's job, not the CLI's.

## Next step

You're connected. Now let's put it to work — head to [**Commands**](./commands/apply.md) to learn `apply`, the verb you'll use most.
