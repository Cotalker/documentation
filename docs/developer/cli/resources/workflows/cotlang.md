---
title: COTLang in workflows
sidebar_label: COTLang
displayed_sidebar: developer
---

<!-- source: repositories/cotctl/docs/workflows/cotlang.md @ 4f7248a (2026-07-06) -->

**COTLang** is the small expression language Cotalker uses to interpolate runtime values into a bot's configuration. When a bot fires inside a workflow, the strings in its `data` block are parsed as COTLang expressions and resolved against the live context — so `{{task._id}}` becomes the current task's ID, `{{user.company}}` becomes the company, and so on.

You'll meet COTLang mainly in the `data` values of the bots you attach to transitions, StartForms, and survey triggers. Most of the time it just works. This page is about the one way it surprises people.

## Reserved characters

COTLang parses `data` values as expressions, and a few characters are **reserved by the grammar**. The two you'll actually hit are:

- `=` (equals)
- `#` (hash)

Put either one inside a plain string value and the parser fails with `Unexpected end of input`. There is **no escape syntax** and **no raw-string literal** — you can't write `\=` or wrap the value in quotes to opt out. The grammar also reserves `|`, `(`, `)`, `[`, and `]`, but those rarely surface by accident; `=` and `#` are the usual culprits.

### The classic break: a URL with a query string

```yaml
data:
  # This FAILS to parse — the `=` in the query string is reserved.
  url: "https://example.com/api?company={{user.company}}&token=abc"
```

Note that `?` and `&` are fine — it's the `=` that breaks it.

## Working around it

Since you can't escape the character, you assemble the offending string inside a script bot (`CCJS` / `ESMCode`) and pass the finished value along, or use a bot's structured fields when it offers them.

| You need | Do this |
|---|---|
| A URL with `?foo=bar` | Build the URL inside a `CCJS`/`ESMCode` stage using `String.fromCharCode(61)` for `=`, and return the assembled string |
| A literal `#tag` | Assemble it in a script and pass it via `data` |
| A header like `Bearer token=...` | Pass the pieces separately in `data` and concatenate them inside the script before the request |

When a bot exposes structured `query` or `headers` fields, prefer those over hand-building a URL — they sidestep the parser entirely.

## Debugging tip

If a bot mysteriously stops before a stage, suspect a reserved character. Temporarily replace the suspect value with a hardcoded `"ok"`; if the bot then reaches the next stage, the parser was rejecting your original string — move its construction into a script.

## See also

- [Workflows](../workflows.md) — where bots attach
- [Merge semantics](./merge-semantics.md) — how bot `data` is preserved across applies
