---
title: 'Workflow bots: data extraction & patching'
sidebar_label: Data extraction & patching
displayed_sidebar: developer
---

<!-- source: repositories/cotctl/docs/workflows/bots/jp-*.md, st-*.md @ 4f7248a (2026-07-06) -->

This family covers two kinds of low-level data tools:

- **`JP*` — raw JSON Patch (RFC 6902)** on a channel, property or user. These accept *any* op on *any* path, with no whitelist. They are powerful but sharp — for everyday edits prefer the `PB*` equivalents (`PBUpdateChannel`, `PBUpdateProperty`, `PBUpdateUser`), which validate and are easier to read.
- **`ST*` — survey tools** that read a survey answer and produce a formatted string. Handy for building display labels and formatting dates from answers.

All `JP*` bots call their patch endpoint with `admin: 'true'` and share the same two branches: `DEFAULT` on success, `ERROR` on API failure. Note that a patch *failure does not throw* — it just returns `ERROR` with no further detail.

## JPChannel

RFC 6902 JSON Patch on a channel. Any op (`add`/`remove`/`replace`/`move`/`copy`) on any path.

Key parameters: `channelId`, `body` (array of `{ op, path, value?, from? }`).

```yaml
- key: s1
  name: JPChannel
  data:
    channelId: "{{task.channel}}"
    body:
      - op: "add"
        path: "/propertyIds/-"
        value: "5d2fd97cb448357a12fe59ac"
  next:
    DEFAULT: ""
    ERROR: ""
```

For convenience over flexibility, use `PBUpdateChannel` (replaces lists wholesale).

## JPProperty

RFC 6902 JSON Patch on a property. No path whitelist.

Key parameters: `propertyId`, `body`.

```yaml
- key: s1
  name: JPProperty
  data:
    propertyId: "5d2fd97cb448357a12fe59ac"
    body:
      - op: "add"
        path: "/subproperty/-"
        value: "5e7548ae1d8897202c6668b7"
  next:
    DEFAULT: ""
    ERROR: ""
```

`PBUpdateProperty` (3.0.0) is the safer, whitelisted alternative for `/display`, `/schemaInstance`, `/subproperty`.

## JPUser

RFC 6902 JSON Patch on a user. Any op on any path.

Key parameters: `userId`, `body`.

```yaml
- key: s1
  name: JPUser
  data:
    userId: "{{user._id}}"
    body:
      - op: "add"
        path: "/accessRoles/-"
        value: "5d2fd97cb448357a12fe59ac"
  next:
    DEFAULT: ""
    ERROR: ""
```

For a field-level, validated alternative use `PBUpdateUser`.

## STDatetimeString

Formats a datetime answer (or a raw epoch `dateNumber`) into a string according to `dateFormat`, `timeFormat` and `dateSeparator`. Always returns `DEFAULT` (errors call back with `{}`).

Key parameters: `answer` + `identifier` (for a `+datetime` question) OR `dateNumber` (epoch ms as a string); `dateFormat` (`yyyy/mm/dd` default, `dd/mm/yyyy`, `mm/dd/yyyy`, `dd/mm/yy`, `mm/dd/yy`, `D-ESmonthWord`); `timeFormat` (`null` default, `military`, `ampm`); `dateSeparator` (`-` default, `/`).

```yaml
- key: s1
  name: STDatetimeString
  data:
    answer: "{{answer._id}}"
    identifier: "due_date"
    dateFormat: "dd/mm/yyyy"
    dateSeparator: "/"
    timeFormat: "military"
  next:
    DEFAULT: ""
```

Gotchas:

- Use `dateSeparator` (the legacy annotations misspell it `dateSepator`, but the runtime reads `dateSeparator`).
- Known bug for `dd/mm/yyyy`: the implementation builds `${dateNumber}${sep}${dateNumber}${sep}${fullYear}` (day repeated). Verify the output before relying on it.
- For `+datetime` answers, the value is read from `data.process[0]` as an epoch string.

## STPropertyNames

Given a `+property` answer, fetches each selected property and returns its `name.display` (default) or `name.code`. Always returns `DEFAULT`.

Key parameters: `answer`, `identifier` (a `+property` question), `mode` (`display` default, `code`), `asStringSeparatedBy` (optional; also returns a joined `resultString`).

```yaml
- key: s1
  name: STPropertyNames
  data:
    answer: "{{answer._id}}"
    identifier: "category_selector"
    mode: "display"
    asStringSeparatedBy: ", "
  next:
    DEFAULT: ""
```

Gotchas:

- Rejects if the question's `contentType` is not `application/vnd.cotalker.survey+property`.
- For compositions combining several fields per property, use `STPropertyStrComposer`.

## STPropertyStrComposer

For each already-loaded `COTProperty`, walks a `commandArray` and builds a string by appending literal text or property fields (via `%<path>` accessors). Returns the array and optionally a joined string. Always returns `DEFAULT`.

Key parameters: `properties` (array of already-loaded `COTProperty` objects — the bot does **not** fetch them), `commandArray` (command strings), `joinBy` (optional joiner), `printDebug` (optional).

Command rules: anything not starting with `%` is appended literally; `%<path>` walks the property with `.split('.')` (e.g. `%name.display`, `%extra.taxId`) and appends the resolved value.

```yaml
- key: s1
  name: STPropertyStrComposer
  data:
    properties: "{{stages.s_load.properties}}"
    commandArray:
      - "%name.display"
      - " ("
      - "%name.code"
      - ")"
    joinBy: ", "
  next:
    DEFAULT: ""
```

Gotchas:

- `properties` must contain already-loaded objects — load them in a prior stage.
- A missing/undefined path resolves to the literal string `"undefined"` (the accessor uses `String(path)`).
