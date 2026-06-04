---
title: Practice in a demo company first
sidebar_label: Demo company
displayed_sidebar: developer
---

Before you point `cotctl` at a real customer's environment, do yourself a favor: **practice in a demo company first.** This single habit is the best way to learn the tool with zero risk — your first real use case should never be a production company.

## Why this matters

`cotctl apply` makes real changes to a real environment. While you're still learning — getting comfortable with profiles, the validate → apply loop, scaffolding a workflow, seeing what an error looks like — you want a place where mistakes cost nothing. A **demo company** is exactly that: a throwaway environment where you can experiment freely, break things, start over, and build confidence before any of it touches a live customer.

<div className="alert alert--primary">

**The rule of thumb.** Your *first* end-to-end run of any new flow — and your *first* time using `cotctl` at all — should happen in a demo or sandbox company, never in production. Graduate to real environments only once the steps are second nature.

</div>

## Getting a demo company

New companies are created through the **Cotalker Partner Platform** — the super-admin web application for managing organizations across the Cotalker ecosystem, where creating and configuring a new company is a built-in capability.

- **If you have super-user access to the Partner Platform**, create a fresh demo company there and use it as your sandbox.
- **If you don't**, ask your Cotalker contact to provision a demo/sandbox company for you. For partner onboarding this is often ideal, since it can be pre-seeded to resemble a real implementation.

Either way, the goal is the same: a non-production company you fully control.

## Connecting cotctl to it

Once you have a demo company, log into it just like any other environment — it simply becomes another profile. Giving it an obvious name (like `demo`) makes it hard to confuse with a customer's environment later:

```bash
cotctl login --url https://web.cotalker.com --subdomain my-demo --profile demo
```

From then on, everything you practice runs against `-c demo`:

```bash
cotctl validate --dir ordenes-compra/
cotctl apply    --dir ordenes-compra/ -c demo
cotctl validate --workflow ordenes_compra -c demo
```

<div className="alert alert--info">

**The `-c` flag is your safety net.** Because every command requires you to name the company explicitly, the only way a change reaches production is if you *type* a production profile. Keeping a clearly-named `demo` profile makes the safe choice the obvious one. See [Authentication](./authentication.md) for how profiles work.

</div>

## A suggested first run

A great way to break in your demo company is to do the full workflow recipe end to end — generate a scaffold, validate it, apply it, and run the production-readiness check — all against `-c demo`:

```bash
cotctl workflows scaffold --name ordenes-compra --code oc --display "Órdenes de Compra"
cotctl validate --dir ordenes-compra/
cotctl apply    --dir ordenes-compra/ -c demo
cotctl validate --workflow ordenes_compra -c demo
```

Nothing here can hurt a customer — so experiment, inspect the result in the demo company's UI, tweak the YAML, and re-apply as many times as you like.

## Graduating to real environments

Once you're comfortable, real work is the same commands with a different profile. A healthy progression is:

**demo → staging → production** — prove a change in your demo company, promote it to a customer's staging environment, and only then to production. The [export & import](./commands/export-import.md) flow is how you carry the same YAML across those environments.

## Next steps

- [Tutorials](./tutorials.md) — run these in your demo company first
- [Authentication](./authentication.md) — profiles and the `-c` flag
- [apply](./commands/apply.md) — what actually changes an environment
