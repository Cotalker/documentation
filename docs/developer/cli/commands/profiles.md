---
title: Managing profiles
sidebar_label: profile
displayed_sidebar: developer
---

A **profile** is a saved connection to one Cotalker environment — created every time you run [`cotctl login`](./login-logout.md). As a partner working across staging, production, and several customers, you'll accumulate a few of them. The `cotctl profile` command is how you see and tidy up that list.

## `cotctl profile list`

Shows every profile you've saved, with the environment and user behind each one:

```bash
cotctl profile list
```

```
NAME          URL                              SUBDOMAIN    USER
acme          https://www.cotalker.com         acme         admin@acme.com
devteam       https://staging.cotalker.com     devteam      dev@cotalker.com
```

This is the command to reach for whenever you're unsure which profile name to pass to `-c`, or you want to confirm which user a profile is authenticated as.

## `cotctl profile delete`

Removes a profile from your local config file:

```bash
cotctl profile delete <name>
```

<div className="alert alert--secondary">

**Local only — this does *not* revoke the token.** Deleting a profile removes it from `~/.cotctl/config.json` but leaves any token valid on the server. This is different from [`cotctl logout`](./login-logout.md), which revokes the ApiToken server-side (for API-token profiles) before removing the profile. Use `profile delete` when you just want to forget a profile; use `logout` when you also want to invalidate its token.

</div>

## The `-c` flag, one more time

Every command that talks to the API requires `-c <profile>` to select which environment to act on — there is no default, on purpose. `cotctl profile list` is how you find the exact name to use:

```bash
cotctl apply -f survey.yaml -c staging
cotctl surveys list -c production
cotctl surveys export my_survey -c staging
```

If you ever see `Error: --company/-c is required`, run `cotctl profile list` to pick the right name.
