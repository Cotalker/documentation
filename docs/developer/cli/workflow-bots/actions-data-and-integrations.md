---
title: 'Workflow bots: data & integrations'
sidebar_label: 'Actions: data & integrations'
displayed_sidebar: developer
---

<!-- source: repositories/cotctl/docs/workflows/bots/pb-create-property.md, pb-update-property.md, pb-create-user.md, pb-update-user.md, pb-switch-list.md, pb-conditional.md, pb-calendar.md, pb-google-calendar.md, pb-pdf.md, pb-pdf-extractor.md, pb-report.md, pb-sheet.md, pb-giphy.md, pb-qr-code.md, pb-payments.md, pb-llm-runner.md @ 4f7248a (2026-07-06) -->

The rest of the `PB*` catalog: creating and patching **properties and users**, small **routing helpers**, and a set of **integration** bots that reach out to external services (PDF rendering and extraction, spreadsheets, calendars, payments, Giphy, QR codes, and an LLM runner). Most share the `SUCCESS`/`ERROR` convention; the exceptions are noted per bot.

Two bots here have **no `default` version** and require an explicit `version:` — `PBCalendar` (`2.0.0`) and `PBReport` (`1.0.0`).

## PBCreateProperty

Creates a property. `display` and `code` are wrapped into a `name.{display, code}` object.

Key parameters: `display`, `code`, `propertyType`; optionally `subproperty` (array of property ObjectIds), `schemaInstance` (arbitrary object).

```yaml
- key: s1
  name: PBCreateProperty
  version: "2.0.0"
  data:
    display: "Acme Corp"
    code: "acme-corp"
    propertyType: "5d2fd97cb448357a12fe59ac"
    schemaInstance:
      taxId: "12.345.678-9"
  next:
    SUCCESS: ""
    ERROR: ""
```

If `display`/`code` are arrays, only the first item is used; `subproperty` is flattened and deduplicated.

## PBUpdateProperty

JSON-Patches a property, restricted to a whitelist of paths (`/display`, `/schemaInstance`, `/subproperty`) and ops (`add`, `replace`). The safer alternative to `JPProperty`.

Key parameters: `propertyId`, `body` (array of `{ op, path, value }`; each path at most once).

```yaml
- key: s1
  name: PBUpdateProperty
  version: "3.0.0"
  data:
    propertyId: "5d2fd97cb448357a12fe59ac"
    body:
      - op: "replace"
        path: "/display"
        value: "Acme S.A. (renamed)"
  next:
    SUCCESS: ""
    ERROR: ""
```

Value shapes: `/display` → string, `/schemaInstance` → object, `/subproperty` → array of strings. For unrestricted patches use `JPProperty`.

## PBCreateUser

Creates (invites) a user. Property and access-role fields accept both ObjectIds and code/name strings.

Key parameters: `email`, `phone`, `names`, `lastName`, `jobTitle` (all required); optionally `secondLastName`, `accessRoles` (AccessRole **names**), `properties` (property ObjectIds or `name.code` strings), `extensions`.

```yaml
- key: s1
  name: PBCreateUser
  version: "2.0.0"
  data:
    email: "supplier@example.com"
    phone: "+56999999999"
    names: "Alice"
    lastName: "Smith"
    jobTitle: "supplier"
    accessRoles: ["external-supplier"]
    properties: ["acme-corp"]
  next:
    SUCCESS: ""
    ERROR: ""
```

`accessRoles` are matched by `.name` (case-sensitive). If every `properties` entry is a valid ObjectId they pass through; otherwise they are resolved by `name.code`.

## PBUpdateUser

Patches a small set of user fields.

Key parameters: `userId` (required); optionally `jobTitle`, `properties` (**replaces** the list), `accessRoles` (**replaces** the list), `isActive`, `extensions`.

```yaml
- key: s1
  name: PBUpdateUser
  version: "2.0.0"
  data:
    userId: "{{user._id}}"
    isActive: false
  next:
    SUCCESS: ""
    ERROR: ""
```

`properties` and `accessRoles` replace, not append. For granular RFC 6902 patches use `JPUser`.

## PBSwitchList

Routes on the `process` array of a `+list` answer, picking `process[0]` as the `next` key. (No `@botdoc:general` annotation — parameters inferred from source.)

Key parameters: `data` (a `COTAnswerData` object whose `process: string[]` holds the selected codes).

Branches: `__NONE__` (empty selection), or a dynamic key matching `process[0]`.

```yaml
- key: s1
  name: PBSwitchList
  data:
    data: "{{answer.statusList}}"   # COTAnswerData
  next:
    __NONE__: s_nothing_selected
    approved: s_approve_flow
    rejected: s_reject_flow
    on_hold: s_hold_flow
```

The keys in `next` must match the question's `code[]` values exactly; an unmatched `process[0]` leaves the engine with no downstream stage. Declare every possible code.

## PBConditional

Casts `condition` to a boolean and routes to `TRUE` or `FALSE`. A lightweight inline gate.

Key parameters: `condition` (any value; `!!condition` decides).

```yaml
- key: s1
  name: PBConditional
  data:
    condition: "{{answer.approved}}"
  next:
    TRUE: s_continue
    FALSE: ""
```

Both `TRUE` and `FALSE` must be present in `next`. For richer comparisons (`==`, `>`, `<`), use `FCIfElse`.

## PBCalendar

Sends an email with an attached `.ics` invite so recipients can add a meeting to their calendar. **Has no `default` version — specify `2.0.0`.**

Key parameters: `title`, `initialDate` (COTDate), `durationMinutes` (≥ 1), `owner`; optionally `description`, `invitedById` (user ObjectIds), `invitedByEmail` (raw emails — **pass `[]` even if unused**).

Branches: `DEFAULT` (errors throw `EventError` instead of branching).

```yaml
- key: s1
  name: PBCalendar
  version: "2.0.0"
  data:
    title: "Kickoff with {{user.names}}"
    description: "Discuss the new project requirements"
    initialDate: "{{startsAt}}"
    durationMinutes: 30
    owner: "{{user._id}}"
    invitedById:
      - "{{task.assignee}}"
    invitedByEmail: []
  next:
    DEFAULT: ""
```

Gotcha: the implementation calls `.map()` on `invitedByEmail` unconditionally, so an omitted `invitedByEmail` crashes the bot — always pass an array (even empty).

## PBGoogleCalendar

Creates a Google Calendar event via a service account with domain-wide delegation, impersonating the `organizer`.

Key parameters: `title`, `location`, `description`, `initialDate` (ISO), `organizer` (must have an email in the company's GSuite domain); `endDate` **or** `endMinutes`; optionally `timeZone` (default `America/Santiago`), `invitedById`, `invitedByEmail`.

```yaml
- key: s1
  name: PBGoogleCalendar
  version: "2.0.0"
  data:
    title: "Kickoff"
    location: "Remote"
    description: "PO {{task._id}}"
    initialDate: "{{startsAt}}"
    endMinutes: 30
    organizer: "{{user._id}}"
    invitedById:
      - "{{task.assignee}}"
  next:
    SUCCESS: ""
    ERROR: ""
```

Requires per-company env vars (`GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL__<SUBDOMAIN>` / `..._PRIVATE_KEY__<SUBDOMAIN>`) and domain-wide delegation. The reminder is hard-coded to one popup 10 minutes before.

## PBPdf

Uploads HTML (a local file in the workflow FS) or a URL to the Cotalker PDF service, polls until processed, and returns the resulting `COTFile`.

Key parameters: `localFile` **or** `url` (mutually exclusive; `url` must match the bot's whitelist), `context` (`{ channel, group }`, required for storage); optionally `disableAutoHeaders`, `headers`, `defaultAuth`, `fileName`.

```yaml
- key: s_pdf
  name: PBPdf
  version: "4.0.0"
  data:
    localFile: "{{stages.s_html.filePath}}"   # from PBTemplate
    fileName: "po-{{task._id}}.pdf"
    context:
      channel: "{{task.channel}}"
      group: "{{task.taskGroup}}"
  next:
    SUCCESS: ""
    ERROR: ""
```

Gotchas:

- `url` is validated against a whitelist of URI patterns; non-matching URLs are rejected.
- Polling until the file is `uploaded` (with all three image URLs) can take several seconds.
- Pair with `PBTemplate` to render HTML first (see [Messaging & surveys](./actions-messaging-and-surveys.md#pbtemplate)).

## PBPDFExtractor

Downloads a PDF (merging multi-file ZIPs), sends it to the Adobe PDF Extract API, and returns parsed tables and `structuredData.json`. **Gated by contract code — paid per use.**

Key parameters: `contractCode` (must equal `contract-addendum-pdf-extractor-6580129519321951`), `url`; optionally `csv` (return tables as raw CSV instead of JSON).

Branches: `DEFAULT`, `ERROR`.

```yaml
- key: s1
  name: PBPDFExtractor
  data:
    contractCode: "contract-addendum-pdf-extractor-6580129519321951"
    url: "https://files.example.com/invoice.pdf"
    csv: false
  next:
    DEFAULT: ""
    ERROR: ""
```

`checkData` rejects any other `contractCode` — talk to your Cotalker representative to activate. `result.data` is Adobe's `structuredData.json`.

## PBReport

Loads an answer by uuid and renders the default `COTReport` HTML for it. **Has no `default` version — specify `1.0.0`.**

Key parameters: `answerUUID`.

```yaml
- key: s1
  name: PBReport
  version: "1.0.0"
  data:
    answerUUID: "{{answer.uuid}}"
  next:
    SUCCESS: ""
    ERROR: ""
```

Uses `@cotalker/lib-report`'s default template; `result.html` holds the output. To customize the visuals, post-process with `PBTemplate`.

## PBSheet

Downloads a CSV/XLSX/XLS from `url`, parses the first sheet with sheetjs, and returns rows as an array of objects.

Key parameters: `url`; optionally `csv_iso_date` (parse cells as dates).

```yaml
- key: s1
  name: PBSheet
  version: "1.0.0"
  data:
    url: "https://files.example.com/roster.xlsx"
    csv_iso_date: false
  next:
    SUCCESS: ""
    ERROR: ""
```

Only the **first** sheet is parsed. Values are not coerced (`{ raw: true }`); `result.data` holds the rows.

## PBGiphy

Searches Giphy (or fetches an exact id) and posts the GIF as an `image/gif` message to a channel.

Key parameters: `search` (non-empty array of terms, joined with `+`; a single `id:<giphyId>` element fetches that exact GIF), `channel`; optionally `sentBy` (defaults to `meta.user`).

Branches: `DEFAULT` (errors throw `EventError`).

```yaml
- key: s1
  name: PBGiphy
  data:
    search: ["congratulations"]
    channel: "{{task.channel}}"
  next:
    DEFAULT: ""
```

Uses Giphy rating `g` and `limit=1`; the API key is hard-coded in the source.

## PBQRCode

Wraps the `qrcode` package and returns a PNG data URL.

Key parameters: `qrcode` (the string to encode).

```yaml
- key: s1
  name: PBQRCode
  version: "2.0.0"
  data:
    qrcode: "https://app.cotalker.com/tasks/{{task._id}}"
  next:
    SUCCESS: ""
    ERROR: ""
```

Returns a single PNG data URL in `result.image` — no SVG/EPS export and no size customization in this bot.

## PBPayments

Creates a Transbank payment order and returns the buyer's redirect URL. **Creates a real payment order in production — test with `development: true` first.**

Key parameters (all required unless noted): `type` (`mall`/`normal`), `service`, `paymentMethod`, `amount`, `currency`, `buyerName`, `buyerEmail`, `buyerNationalId`, `sellerName`, `sellerEmail`, `sellerNationalId`, `webhook`, `development`; optionally `meta`, `emails`.

```yaml
- key: s1
  name: PBPayments
  version: "2.0.0"
  data:
    type: "normal"
    service: "webpay-plus"
    paymentMethod: "WEBPAY"
    amount: 25000
    currency: "CLP"
    buyerName: "{{user.names}} {{user.lastName}}"
    buyerEmail: "{{user.email}}"
    buyerNationalId: "12345678-9"
    sellerName: "Acme S.A."
    sellerEmail: "billing@acme.cl"
    sellerNationalId: "76123456-7"
    webhook: "https://example.com/webhooks/transbank"
    development: false
  next:
    SUCCESS: ""
    ERROR: ""
```

`development` is the only switch between dev and prod hosts (both hard-coded). `result` contains `{ status, redirect }`.

## PBLLMRunner

Invokes the `llm-runner` Lambda to run a Vertex AI / Gemini query, with optional MCP-server tools and file attachments. All parameters support COTLang resolution.

Key parameters: `systemPrompt`, `messages` (array of `{ role, content }`, min 1); optionally `model` (default `gemini-2.5-flash`), `maxSteps` (1–50, default 5), `temperature` (0–2, default 1), `maxTokens`, `files` (`{ url, mediaType, filename? }`), `mcpServers` (`{ name, url, headers?, timeout?, useCotalkerAuth? }`).

```yaml
- key: s1
  name: PBLLMRunner
  version: "1.0.0"
  data:
    systemPrompt: "Use the docs MCP server to find relevant articles."
    messages:
      - role: "user"
        content: "What is a taskGroup?"
    model: "gemini-2.5-pro"
    maxSteps: 10
    mcpServers:
      - name: "cotalker-docs"
        url: "https://rag.example.com/mcp"
        useCotalkerAuth: true
  next:
    SUCCESS: ""
    ERROR: ""
```

Gotchas:

- `useCotalkerAuth: true` injects an internal Cotalker token into that server's `Authorization` header only.
- The result exposes `data.text`, `data.toolCalls`, `data.usage`, and MCP connection status. Model-level errors set `result.error` and route to `ERROR`.
