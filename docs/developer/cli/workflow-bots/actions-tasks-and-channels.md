---
title: 'Workflow bots: tasks & channels'
sidebar_label: 'Actions: tasks & channels'
displayed_sidebar: developer
---

<!-- source: repositories/cotctl/docs/workflows/bots/pb-create-task.md, pb-update-task.md, pb-duplicate-task.md, pb-bulk-task-update.md, pb-change-state.md, pb-task-add-editor.md, pb-channel-to-task-se.md, pb-create-channel.md, pb-update-channel.md, pb-channel-add-user.md, pb-clean-channel.md, pb-hide-messages.md, pb-get-channel-messages.md @ 4f7248a (2026-07-06) -->

These `PB*` bots create and modify the two core objects of a workflow — **tasks** and **channels** — plus their editors, members and message history. They all share the `SUCCESS`/`ERROR` branch convention unless noted.

A recurring theme: several of these bots **replace** a list wholesale (`editors`, `userIds`, …). When you only want to add or remove one member, reach for the additive bot (`PBTaskAddEditor`, `PBChannelAddUser`) instead.

## PBCreateTask

Creates a task in a `taskGroup`, optionally resolving the parent by bound channel or property code.

Key parameters: `name` (array of strings, joined with spaces), `taskGroup`; optionally `user` (default owner/assignee/editor), `assignee`, `editors`, `followers`, `visibility`, `channel`, `parent`, `parentChannel` (resolve parent by bound channel), `parentAsset` (resolve parent by property code), `status1…status5`, `startDate`, `endDate`, `extensions`.

```yaml
- key: s_create
  name: PBCreateTask
  version: "2.0.1"
  data:
    taskGroup: "5d23a26435513c1230fc671d"
    name: ["Review Purchase Order"]
    user: "5e7548ae1d8897202c6668b7"
    parent: "{{task._id}}"
    status1: "5d2fd97cb448357a12fe59ac"
  next:
    SUCCESS: ""
    ERROR: ""
```

Gotchas:

- `name` must be a non-empty array of strings.
- If `user` is set and `assignee`/`editors` are not, `user` is used for both.
- `parentChannel`/`parentAsset` trigger extra lookups — prefer `parent` when you already have the ObjectId.
- Fails when the target `taskGroup` is inactive.

## PBUpdateTask

Patches an existing task: status fields, assignee, editors/followers/visibility/validators, dates, channel, extensions, `isActive`. Version `2.2.0` adds performance-trace tracking.

Key parameters: `_id`, `taskGroup` (both required); optionally `name`, `smState`, `status1…status5`, `assignee`, `editors`, `followers`, `visibility`, `validators`, `isActive`, `startDate`, `endDate`, `channel`, `parent`, `info`, `extensions`, `quiet`.

```yaml
- key: s1
  name: PBUpdateTask
  version: "2.2.0"
  data:
    _id: "{{task._id}}"
    taskGroup: "{{task.taskGroup}}"
    status1: "5d2fd97cb448357a12fe59ac"
    info: "Patched by intake workflow"
    quiet: true
  next:
    SUCCESS: ""
    ERROR: ""
```

Gotchas:

- `editors`, `followers`, `visibility`, `validators` **replace** the existing list. To add/remove one user use `PBTaskAddEditor`.
- Does **not** advance the state machine — use `PBChangeState` for that.
- `quiet: true` is recommended for bulk/programmatic updates to avoid notification storms.

## PBDuplicateTask

Clones a task via `duplicateTask`, optionally skipping child tasks.

Key parameters: `targetId` (source task), `taskGroup`, `ignoreChildren` (skip children).

```yaml
- key: s1
  name: PBDuplicateTask
  version: "2.0.0"
  data:
    targetId: "{{template.taskId}}"
    taskGroup: "{{task.taskGroup}}"
    ignoreChildren: false
  next:
    SUCCESS: ""
    ERROR: ""
```

The API endpoint owns the duplication semantics (status, dates, editors); the bot just forwards the call. For manual creation use `PBCreateTask`.

## PBBulkTaskUpdate

The bulk version of `PBUpdateTask`: patches many tasks in batches via an external bulk service (~90% fewer network calls). Typically chained after `FCEachBulk`.

Key parameters: `tasks` (non-empty array of task objects), `taskGroup`, `bulkOptions` (`{ notify?, requiredSurvey? }`), `batchSize` (1–100, default 10), `continueOnError` (default `true`; when `false`, stop at the first failing batch).

Branches: `SUCCESS` (batches processed — some items may still carry per-task errors), `ERROR` (every task failed **and** `continueOnError !== true`).

```yaml
- key: s1
  name: PBBulkTaskUpdate
  data:
    tasks: "{{tasks}}"
    taskGroup: "{{task.taskGroup}}"
    batchSize: 10
    continueOnError: true
    bulkOptions:
      notify: false
  next:
    SUCCESS: ""
    ERROR: ""
```

Gotchas:

- Each task may expose the same updateable fields as `PBUpdateTask`; only fields present are patched.
- Writes `externalData.stages.updatedTaskBatch` so a downstream `PBBulkMessage` can consume the result.
- Per-batch HTTP timeout is 120 s; max 100 items per batch. The host must be able to reach `BULK_TASK_UPDATE_URL`.

## PBChangeState

Patches only the `smState` of a task — use this instead of `PBUpdateTask` when you want to advance the state machine and preserve its history.

Key parameters: `tid`, `smState`, `taskGroup`; optionally `quiet`.

```yaml
- key: s1
  name: PBChangeState
  version: "2.1.0"
  data:
    tid: "{{task._id}}"
    taskGroup: "{{task.taskGroup}}"
    smState: "5e98c2c81d8897202c6668b7"
    quiet: false
  next:
    SUCCESS: ""
    ERROR: ""
```

Unlike `PBUpdateTask`, this bot touches only `smState` and goes through proper state-machine transition logic.

## PBTaskAddEditor

Resolves users (from `user`, `boss`, `property` or `accessRole`) and **additively** adds or removes them from a task list (`editors`, `followers`, `visibility`, `validators`, `subscribers`) — preserving the existing members.

Key parameters: `type` (`user`/`boss`/`property`/`accessRole`), `task`, `taskGroup`; then the source field for the chosen `type` (`user`/`users`, `accessRole`, or `property`); optionally `taskRole` (default `editors`), `operation` (`add` default, `remove`), `quiet`.

```yaml
- key: s1
  name: PBTaskAddEditor
  version: "2.2.1"
  data:
    type: "user"
    users: ["{{user._id}}"]
    task: "{{task._id}}"
    taskGroup: "{{task.taskGroup}}"
    taskRole: "editors"
  next:
    SUCCESS: ""
    ERROR: ""
```

Gotchas:

- For `type=user`/`boss` provide **either** `user` **or** `users` (Joi `xor`). For `boss`, the bot resolves each user's hierarchy boss.
- The bot filters to `isActive: true` users, so inactive users are silently dropped from the addition.

## PBChannelToTaskSE

Resolves the task bound to a channel (`getTaskForChannel`) — useful when you only have the channel id but need the task downstream. The result `task` is also written to `meta.body.data.task`.

Key parameters: `channelId`.

```yaml
- key: s1
  name: PBChannelToTaskSE
  version: "2.0.0"
  data:
    channelId: "{{event.channel}}"
  next:
    SUCCESS: ""
    ERROR: ""
```

Gotchas:

- The source header mistakenly says "PBUpdateTask — Patch Existing Task"; this bot does **not** patch anything, it only resolves.
- Returns the **first** task bound to the channel (`tasks[0]`); if several share the channel, the rest are ignored.

## PBCreateChannel

Creates a channel. Settings (`display`/`write`/`read`) and image sizes are passed as flat fields and re-grouped server-side.

Key parameters: `group` (required); optionally `nameCode`, `nameDisplay`, `userIds`, `propertyIds`, `groupOwnerIds`, `isActive`, `settingsDisplay`/`settingsWrite`/`settingsRead`, `imageOriginal`/`imageSmall`/`imageSquare`.

```yaml
- key: s1
  name: PBCreateChannel
  version: "2.0.0"
  data:
    group: "5d2fd97cb448357a12fe59ac"
    nameCode: "po-{{task._id}}"
    nameDisplay: "PO {{task.name}}"
    userIds: ["{{user._id}}"]
    isActive: true
  next:
    SUCCESS: ""
    ERROR: ""
```

Flat `settings*`/`image*` fields are grouped into `settings.{…}` / `image.{…}`; missing values are dropped. To patch an existing channel use `PBUpdateChannel` (or `JPChannel`).

## PBUpdateChannel

Patches a channel. Flat `settings*` fields are regrouped; if `image` (a File ObjectId) is provided, the bot polls until the upload finishes before patching.

Key parameters: `channelId` (required); optionally `group`, `nameCode`, `nameDisplay`, `userIds`, `propertyIds`, `groupOwnerIds`, `isActive`, `settingsDisplay`/`settingsWrite`/`settingsRead`, `image`.

```yaml
- key: s1
  name: PBUpdateChannel
  version: "3.0.0"
  data:
    channelId: "{{task.channel}}"
    nameDisplay: "PO {{task.name}}"
  next:
    SUCCESS: ""
    ERROR: ""
```

Gotchas:

- `userIds` **replaces** the member list — to add one user use `PBChannelAddUser`.
- Image polling has 3 attempts (2 s apart); if the image is not ready it returns `ERROR`.
- For granular patches use `JPChannel`.

## PBChannelAddUser

Adds (or removes) users from a channel, resolved from `user`, `boss`, `property` or `accessRole`.

Key parameters: `type`, `channel`; plus `user` (array), `accessRole`, `property` (Joi marks all three required — pass placeholders for the unused ones); optionally `operation: remove`.

Branches: `ADDED`, `NOT-ADDED` (patch returned no channel), `ERROR`.

```yaml
- key: s1
  name: PBChannelAddUser
  version: "2.0.0"
  data:
    type: "property"
    channel: "{{task.channel}}"
    property: "5e7548ae1d8897202c6668b7"
    user: []
    accessRole: ""
  next:
    ADDED: ""
    NOT-ADDED: ""
    ERROR: ""
```

Only the field matching `type` is meaningfully used; pass empty placeholders (`[]`, `""`) for the others. `operation: "remove"` filters the resolved ids out of `channel.userIds`.

## PBCleanChannel

Hides **all** messages in the given channels (marks them hidden + inactive and suppresses downstream automation on the patch itself).

Key parameters: `channelIds` (non-empty array).

```yaml
- key: s1
  name: PBCleanChannel
  version: "2.0.0"
  data:
    channelIds:
      - "{{task.channel}}"
  next:
    SUCCESS: ""
    ERROR: ""
```

Gotchas:

- Only channels with **more than one** visible message are processed; a single-message channel is skipped silently.
- To hide specific message ids instead, use `PBHideMessages`.

## PBHideMessages

Hides specific messages by id (same hidden+inactive treatment as `PBCleanChannel`, but targeted).

Key parameters: `messages` (non-empty array of message ObjectIds).

```yaml
- key: s1
  name: PBHideMessages
  version: "2.0.0"
  data:
    messages:
      - "60f0a1b2c3d4e5f60718293a"
      - "60f0a1b2c3d4e5f60718293b"
  next:
    SUCCESS: ""
    ERROR: ""
```

Patched messages cannot be un-hidden by this bot. To hide every message of a channel, use `PBCleanChannel`.

## PBGetChannelMessages

Loads a channel's messages and returns only those whose `answer` equals `<uuid>#<surveyId>`.

Key parameters: `channel`, `uuid` (answer UUID without the `#surveyId` suffix), `surveyId`.

Branches: `FOUND`, `NOT-FOUND`, `ERROR`.

```yaml
- key: s1
  name: PBGetChannelMessages
  version: "2.0.0"
  data:
    channel: "{{task.channel}}"
    uuid: "{{answer.uuid}}"
    surveyId: "{{answer.survey}}"
  next:
    FOUND: ""
    NOT-FOUND: ""
    ERROR: ""
```

Gotchas:

- Looks back up to 9 years for messages.
- Filtering happens **in memory** client-side, not as a server-side query.
