---
title: 'Workflow bots: messaging & surveys'
sidebar_label: 'Actions: messaging & surveys'
displayed_sidebar: developer
---

<!-- source: repositories/cotctl/docs/workflows/bots/pb-message.md, pb-bulk-message.md, pb-email.md, pb-send-custom-notification.md, pb-whats-app.md, pb-send-survey.md, pb-copy-survey.md, pb-editable-survey.md, pb-answer-checker.md, pb-action-button.md, pb-template.md @ 4f7248a (2026-07-06) -->

These `PB*` bots are how a workflow **talks** — to channels, inboxes, phones — and how it sends, reopens and inspects surveys. Most share the `SUCCESS`/`ERROR` convention; the exceptions are called out per bot.

Quick routing reminder: `PBMessage` posts to a channel, `PBSendCustomNotification` sends a mobile **push** (plus an optional channel message), `PBEmail` sends email, and `PBWhatsApp` sends a WhatsApp template. For many recipients, `PBBulkMessage` beats a `PBMessage` loop.

## PBMessage

Sends a message to one or more channels (one per channel, in series). Supports translations. Version `2.2.0` adds performance tracking.

Key parameters: `content`, `contentType` (`text/plain`, `text/system`, …), `sentBy`, `channelIds` (non-empty array); optionally `joinContentBy`, `contentTranslations` (`{ en?, es?, pt?, fr? }`).

```yaml
- key: s1
  name: PBMessage
  version: "2.2.0"
  data:
    content: "The task was updated by {{user.names}}"
    contentType: "text/plain"
    sentBy: "{{user._id}}"
    channelIds:
      - "{{task.channel}}"
  next:
    SUCCESS: ""
    ERROR: ""
```

Gotchas:

- Channels are processed in series; one failure stops the run and emits `ERROR`.
- With `contentTranslations`, `text/plain` becomes `multilanguage/plain` (and `text/system` → `multilanguage/system`). Only `en`/`es`/`pt`/`fr` are allowed — any other key throws.
- For broadcasting to many channels, prefer `PBBulkMessage`.

## PBBulkMessage

The bulk version of `PBMessage`: one batched call for many channels (~90% fewer round-trips). Typically chained after `PBBulkTaskUpdate` inside an `FCEachBulk`.

Key parameters: `updatedTaskBatch` (non-empty array of task objects, each with a `channel`; usually from `PBBulkTaskUpdate`), `messageContent`; optionally `contentType` (default `text/system`), `context`, `messageOptions`, `batchSize`, `continueOnError`.

Branches: `SUCCESS` (some/all delivered), `ERROR` (all failed **and** `continueOnError !== true`).

```yaml
- key: s1
  name: PBBulkMessage
  data:
    updatedTaskBatch: "{{stages.updatedTaskBatch}}"   # produced by PBBulkTaskUpdate
    messageContent: "Task batch processed"
    contentType: "text/system"
    batchSize: 10
    continueOnError: true
  next:
    SUCCESS: ""
    ERROR: ""
```

This bot does **not** iterate by itself — it expects a pre-resolved `updatedTaskBatch`. Results are exposed on `externalData.bulkMessageResults`.

## PBEmail

Renders an HTML template with `content` and sends it via `EmailV2`. Supports attachments downloaded from URLs.

Key parameters: `subject`, `content` (object passed to the template), `targets` (recipient emails); optionally `from` (default `no-responder@cotalker.com`), `attachments` (file URLs), `cc`, `bcc`, `htmlTemplate`, `cssTemplate`, `singleRecipient`.

```yaml
- key: s1
  name: PBEmail
  version: "3.0.1"
  data:
    subject: "Your PO has been received"
    content:
      poId: "{{task._id}}"
      name: "{{user.names}}"
    targets:
      - "{{user.email}}"
  next:
    SUCCESS: ""
    ERROR: ""
```

Gotchas:

- All addresses are validated — a single invalid one rejects the whole call.
- `singleRecipient: true` sends one email per recipient (slower, but safer for unsubscribe semantics).
- cotctl sets `dryRun: true`, which skips the actual SMTP send but still runs validation.

## PBSendCustomNotification

Sends a mobile **push** notification AND a `text/system` channel message. The channel is referenced directly (`channelId`) or resolved from a task (`taskId` + `taskGroupId`).

Key parameters: `content`; `channelId` **or** `taskId` (mutually exclusive; `taskId` requires `taskGroupId`); optionally `userIds` (restrict the push; empty = all members), `quietPushNotification`, `quietChannelNotification`.

```yaml
- key: s1
  name: PBSendCustomNotification
  data:
    content: "Task {{task.name}} was updated"
    taskId: "{{task._id}}"
    taskGroupId: "{{task.taskGroup}}"
  next:
    SUCCESS: ""
    ERROR: ""
```

Gotchas:

- The `sentBy` user depends on the source: for `channelId` it is the first user in `channel.userIds`; for `taskId` it is the `taskGroup.botUser`.
- `userIds` are filtered to active users before the push.
- Use `quietChannelNotification: true` for push-only, or `quietPushNotification: true` for channel-message-only.

## PBWhatsApp

Sends a templated WhatsApp message via Twilio. The phone must be a full international number.

Key parameters: `contractCode` (must equal the exact gated value `contract-addendum-whatsapp-6580129519321951`), `phoneNumber` (e.g. `+56912345678`), `template` (only `default` is implemented), `language` (`en`/`es`), `name`, `first`, `second`.

Branches: `DEFAULT` only (Twilio responded — check `result.status` downstream).

```yaml
- key: s1
  name: PBWhatsApp
  data:
    contractCode: "contract-addendum-whatsapp-6580129519321951"
    phoneNumber: "+56912345678"
    template: "default"
    language: "es"
    name: "Alice"
    first: "PO-12345"
    second: "Aprobada"
  next:
    DEFAULT: ""
```

Gotchas:

- `contractCode` must be exactly the gated value — anything else throws.
- Requires env vars `TWILIO_ACCOUNT_SID` and `TWILIO_AUTH_TOKEN`; the sender phone is hard-coded to Cotalker's business number.
- The bot does **not** branch on Twilio errors — check `result.status === 'error'` in the next stage.

## PBSendSurvey

Sends a survey to a channel in draft (`editMode: true`, the default) or sent mode. Supports prefilled answers and sub-surveys.

Key parameters: `recipientId`, `taskGroupId`; `surveyId` **or** `surveyCode`; `channelId` **or** `taskId`; optionally `senderId`, `editMode`, `prefilled`, `meta`.

```yaml
- key: s1
  name: PBSendSurvey
  version: "3.0.0"
  data:
    surveyId: "00000000aaaaaaaaaaaaaaaa"
    taskGroupId: "{{task.taskGroup}}"
    taskId: "{{task._id}}"
    recipientId: "{{user._id}}"
    editMode: true
  next:
    SUCCESS: ""
    ERROR: ""
```

`prefilled` is keyed by question `identifier`; the value shape depends on the question type and is validated at runtime (a mismatch routes to `ERROR`, typically `'<identifier>' must be a string`):

| Question type | Expected value |
|---|---|
| `textinput` | plain string — **not** an array |
| `textnumber` | numeric string |
| `listquestion` | array of option codes |
| `property` | array of property IDs |
| `person` | array of user IDs |
| `datetime` | array `[date, time]` |

Gotchas:

- cotctl resolves `surveyTriggers[].survey` (a code) to an ObjectId, but **not** `stage.data.surveyId` — pass a real ObjectId there.
- When `taskId` is used, the bot targets `task.channel`.

## PBCopySurvey

Reads all messages of a survey instance on a source channel and re-sends them to a target channel, re-mapping form ids (and optionally minting a fresh answer uuid). Used to clone a survey into a newly-created channel.

Key parameters: `formId` (the `form.id` shared by the source messages), `formChannel`, `targetChannel`; optionally `sentBy`, `createNewAnswer`, `editMode` (default `false`).

```yaml
- key: s1
  name: PBCopySurvey
  version: "2.0.0"
  data:
    formId: "{{form.id}}"
    formChannel: "{{source.channel}}"
    targetChannel: "{{newChannel._id}}"
    createNewAnswer: true
    editMode: false
  next:
    SUCCESS: ""
    ERROR: ""
```

Nested survey-survey questions have their UUIDs re-mapped so the copy keeps internal references consistent. Timestamps and message `_id`s are stripped before re-sending.

## PBEditableSurvey

Reopens sent survey messages for editing (sets them back to draft) using one of four targeting modes.

Key parameters: `type` (`uuids`/`survey`/`firstSurvey`/`lastSurvey`), `channel`; plus `uuids` (for `type=uuids`) or `surveyId` (for the survey modes).

```yaml
- key: s1
  name: PBEditableSurvey
  version: "2.0.1"
  data:
    type: "survey"
    channel: "{{task.channel}}"
    surveyId: "5e98c2c81d8897202c6668b7"
  next:
    SUCCESS: ""
    ERROR: ""
```

Gotchas:

- `firstSurvey` and `lastSurvey` are declared but **not implemented** — they call back with `'NYI.'` (route to `ERROR`). Avoid them.
- Only looks back 2 years; a survey-survey first question is not captured.

## PBAnswerChecker

Runs an answer query and filters the result with comparison rules — a gate such as "did the user already submit today?".

Key parameters: `query` (object passed to the answers API), `check` (array of `{ comparison, identifier, value? }`).

Supported `comparison`: `TIME-TODAY` (the datum's `process[0]` epoch ms falls within today).

Branches: `FOUND`, `NOT-FOUND`, `ERROR`.

```yaml
- key: s1
  name: PBAnswerChecker
  version: "2.0.0"
  data:
    query:
      channel: "{{task.channel}}"
      user: "{{user._id}}"
    check:
      - comparison: "TIME-TODAY"
        identifier: "submission_date"
  next:
    FOUND: ""
    NOT-FOUND: s_next
    ERROR: ""
```

`query` is sent as-is — you own its correctness. Every `check` must match (`.every`). For richer comparisons you currently fall back to `CCJS` (gated).

## PBActionButton

Appends a link/URI button to a channel's `actionButton` array (via RFC 6902 JSON Patch).

Key parameters: `channelId`, `actionType` (only `uri` is implemented); optionally `isActive`, `accessRoles`, `channelProperties`, `uri`, `queryParams`, `windowConfig`, `windowName`, `openMode` (default `window`).

```yaml
- key: s1
  name: PBActionButton
  version: "2.0.0"
  data:
    channelId: "{{task.channel}}"
    actionType: "uri"
    uri: "https://example.com/po/{{task._id}}"
    windowName: "PO Detail"
    openMode: "window"
  next:
    SUCCESS: ""
    ERROR: ""
```

Only `actionType: "uri"` produces a real button today; other values log a warning and patch with no `uriSettings`. If `actionButton` does not exist it is created first.

## PBTemplate

Renders an HTML document from a template + `content` and writes it into the workflow's runtime FS, returning the `filePath` — typically consumed next by `PBPdf`.

Key parameters: `content` (object passed to the template); optionally `htmlTemplate`, `cssTemplate`, `fileName` (default `template.html`).

```yaml
- key: s1
  name: PBTemplate
  version: "3.0.0"
  data:
    content:
      title: "Invoice"
      amount: "$25.000"
    fileName: "invoice.html"
  next:
    SUCCESS: s_pdf     # feed filePath into PBPdf.localFile
    ERROR: ""
```

The output `filePath` is rooted at `/` and lives in the workflow's `iContext.files` virtual FS. Chain it into `PBPdf.localFile` to produce a PDF (see [Data & integrations](./actions-data-and-integrations.md#pbpdf)).
