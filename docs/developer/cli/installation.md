---
title: Installation
sidebar_label: Installation
displayed_sidebar: developer
---

In this page you'll get `cotctl` installed on your machine and confirm it's working. It takes about two minutes. If you've ever installed a global npm package before, this will feel familiar.

## Before you start: the requirements

There are two things you need in place:

- **Node.js version 22.0.0 or newer.** `cotctl` is distributed as an npm package and runs on Node. To check whether you have it — and which version — run:

  ```bash
  node --version
  ```

  If the command isn't found, or the number is lower than `22`, install or upgrade Node first from [nodejs.org](https://nodejs.org). We recommend the LTS release.

- **Administrator access to the Cotalker company you want to manage.** Most `cotctl` commands read and write configuration, which requires admin permissions on the target environment.

<div className="alert alert--info">

**Don't have admin access yet?** That's fine for installing the tool — you can do everything on this page without it. But you'll need it before the [Authentication](./authentication.md) step, so it's worth requesting from the company's Cotalker administrator now.

</div>

## Installing the tool

The recommended way is to install it **globally**, which makes the `cotctl` command available everywhere on your machine:

```bash
npm install -g @cotctl/cli
```

The `-g` flag is what makes it global. After this finishes, you can run `cotctl` from any folder.

### Prefer not to install globally?

If you only need it occasionally, or you want to pin a version per project, you can run it on demand with `npx` — this downloads and runs it without a permanent install:

```bash
npx @cotctl/cli <command> [options]
```

Throughout this guide we'll write commands as `cotctl ...`. If you're using `npx`, just replace that with `npx @cotctl/cli ...`.

## Confirming it worked

Let's make sure the install succeeded. Ask the tool for its version:

```bash
cotctl --version
```

You should see a version number printed back, for example:

```
0.8.0
```

If you see a version, you're done — the tool is installed correctly. If instead you get a "command not found" error, the global npm bin directory may not be on your `PATH`; the [Troubleshooting](./troubleshooting.md) page covers how to fix that.

## Getting your bearings

Two commands are worth knowing from the start. The general shape of every `cotctl` invocation is:

```bash
cotctl <command> [options]
```

And whenever you're unsure what's available or what a command expects, append `--help`:

```bash
cotctl --help            # list all commands
cotctl apply --help      # options for a specific command
```

## Next step

`cotctl` is installed, but it doesn't know about any Cotalker environment yet. Let's fix that in [**Authentication**](./authentication.md), where you'll connect it to a company and learn how profiles work.
