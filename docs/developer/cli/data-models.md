---
title: Data models
sidebar_label: Data models
displayed_sidebar: developer
---

<!-- source: repositories/cotctl/docs/cotalker-models/{README,user,channel,task,task-group,property,message}.md @ 4f7248a (2026-07-06) -->

When you write an exec script, configure a bot's `data`, or read an API response, you're touching Cotalker's core entities. This page is a partner-facing tour of the six that matter most — what each one is, the fields you'll actually work with, and how they connect. It's a reference to keep open while you author surveys and workflows, not something to read once.

## How they fit together

Six models carry almost everything a partner works with:

- A **TaskGroup** is the container for a workflow. Every **Task** belongs to exactly one TaskGroup.
- A **Task** is a unit of work moving through a state machine. It's linked to a **Channel** where the conversation happens.
- **Messages** live inside a Channel — including the survey forms people fill out.
- **Users** populate all of it: they send messages, get assigned to tasks, and hold roles and job titles.
- **Properties** are the generic, typed data attached to Users, Channels, and Tasks — the mechanism behind a task's custom fields (its "extensions").

In an exec script you reach these through context aliases: `user#me`, `user#company`, `channel#self`, `task#self`, `message#self`, `property#channel`, `property#user`. See [Exec scripting](./resources/surveys/exec-scripting.md) for how to declare and read them.

## User

A person's account — who they are, which company they belong to, and what they're allowed to do. In an exec script, `user#me` is the full object and `user#company` is the company ID.

**Fields you'll touch:**

- **Identity:** `_id`, `email`, `name` (nested `name.names`, `name.lastName`, `name.displayName`), `phone`.
- **Access:** `role`, `accessRoles[]`, `allAccessRoles[]`, `permissionsV2[]`, `isActive`.
- **Org:** `company` (`company._id`, `company.name`), `companies[]`.
- **Attached data:** `properties[]` (IDs — resolve via `property#user`), `_jobElements[]` (job titles), `extensions`, `extra` (e.g. `rut`, `supervisor` — depends on company config).

**Relates to:** belongs to a company; carries roles and job titles; referenced elsewhere as `sentBy` (Message), `assignee`/`validators`/`editors`/`followers` (Task), and `userIds` (Channel).

<div className="alert alert--secondary">

**`user#company` is a string, not an object** — it's the value of `user.company._id`. And `allAccessRoles` includes roles inherited through the company hierarchy, while `accessRoles` is only the directly assigned ones.

</div>

## Channel

The place where communication and workflow happen — a chat/workflow room. Some channels are plain conversations; some are task channels (`isTask: true`) tied to a workflow task. In an exec script it's `channel#self`.

**Fields you'll touch:**

- **Display:** `_id`, `nameDisplay`, `nameCode`, `info.description`.
- **Membership:** `userIds[]`, `group`, `company`, `visibility.groups[]`, `visibility.users[]`.
- **Flags:** `isPrivate`, `isDirect`, `isTask`, `isActive`.
- **Attached data:** `propertyIds[]` (IDs — resolve via `property#channel`), `actionButton[]`, `lastMessage`.

**Relates to:** belongs to a company and a group; holds users via `userIds`; a task channel mirrors `task.channel`; messages live inside it; properties attach via `propertyIds`.

## Task

A single unit of work moving through a workflow's state machine — with an assignee, a status, dates, and dynamic data. In an exec script it's `task#self`.

**Fields you'll touch:**

- **Identity:** `_id`, `name`, `serial` (the task serial number — note `serial`, not `serialNumber`), `company`.
- **Workflow position:** `taskGroup`, `smState`, `smStateMachine`, `parent`, `child[]`.
- **People:** `assignee`, `validators[]`, `editors[]`, `followers[]`, `visibility[]`.
- **Status:** `status`, `status1`–`status5` (their meaning is workflow-defined), `isActive`, `color`.
- **Channel link:** `channel`, `channelType` (`bound` / `unbound` / `unbound-hierarchy`).
- **Dates:** `startDate`, `endDate`, `resolutionDate`, `closedAt`.
- **Dynamic data:** `extensions` (see below).

**`extensions` — the key concept.** A task's custom data is grouped by PropertyType: `extensions[propertyTypeCode][fieldKey] = value`. Under the hood each extension is a separate [Property](#property) document owned by the task. Which PropertyTypes are available is set by the state machine (`asset.propertyType` plus its allowed extensions). This is what [survey `bounds`](./resources/surveys/logic-and-validation.md#bounds-writing-answers-onto-the-task) and workflow bots read and write.

**Relates to:** belongs to exactly one TaskGroup; governed by a state machine; linked to a Channel; assigned to Users; its dynamic data lives in Properties.

<div className="alert alert--secondary">

**Watch the field names.** It's `serial`, not `serialNumber`. `status1`–`status5` mean whatever the workflow says they mean. And `extensions` may be `undefined` if the query didn't populate it.

</div>

## TaskGroup

The container that groups every task under one workflow. Partners mostly meet it as an identifier passed to the task API.

**Fields you'll touch:**

- `_id` — the Mongo ID; the canonical reference for new code.
- `group` — a business-facing identifier kept for backward compatibility (predates `_id`).

**Relates to:** the parent of Tasks — `task.taskGroup` points at the TaskGroup's `_id`.

<div className="alert alert--secondary">

**`task.taskGroup` is the `_id`** (an ObjectId), not the `group` string — you can use it directly where an endpoint asks for `{groupid}`. Don't pass the human-readable `name`; it isn't indexed for that lookup and the API will 404.

</div>

## Property

A configurable, typed piece of data attached to a User, Task, or Channel — Cotalker's generic mechanism for custom fields. Each Property is an instance of a PropertyType. In an exec script, `property#channel` and `property#user` return **arrays** of these.

**Fields you'll touch:**

- **Type:** `_id`, `propertyType`, `company`, `isActive`.
- **Naming:** `name.display` (the display name), `name.code` (the identifier code — the code lives here, not at the top level).
- **Value:** `schemaInstance` (the dynamic fields defined by the PropertyType — the real value carrier).
- **Ownership:** `owner.$ref` (`user` / `task` / `channel`), `owner.$id`, `subproperty[]`, `breadcrumbs[]`.
- **Presentation:** `geo.lat` / `geo.lng` / `geo.address`, `weight`, `color`.

**Relates to:** typed by a PropertyType; owned by a User, Task, or Channel via `owner.$ref`/`owner.$id` — the same mechanism behind a task's `extensions`.

<div className="alert alert--secondary">

**Two things trip people up.** `property#channel` and `property#user` are **arrays**, not single objects. And the property code is `name.code`, not a top-level `code` — there's no top-level `value` field either; the value is in `schemaInstance` (`extra` is deprecated).

</div>

## Message

A single message inside a channel — plain content, a survey form, a command. In an exec script it's `message#self`.

**Fields you'll touch:**

- **Placement:** `_id`, `channel`, `sentBy` (the author's User ID), `createdAt`.
- **Content:** `contentType`, `content`, `contentArray[]` (survey questions, when it's a form), `tag`.
- **Forms:** `form`, `formId`, `answer`, `responses[]` (submitted survey answers).
- **Interaction:** `reactions`, `reply[]`, `mentions.users[]`, `readBy[]`, `isActive`.

**Relates to:** lives in a Channel; authored by a User (`sentBy`); form messages carry survey questions in `contentArray` and answers in `responses`.

<div className="alert alert--secondary">

**The sender field is `sentBy`, not `sender`.** And a Message's `createdAt` is a numeric Unix-milliseconds timestamp, not a Date object (the same is true of `channel.lastMessage.createdAt`).

</div>

## Two patterns worth remembering

- **IDs versus objects.** Many fields (`user.properties`, `channel.propertyIds`) store IDs, not full objects. The `property#*` exec aliases resolve them for you.
- **Owner polymorphism.** `property.owner.$ref` (`user` / `task` / `channel`) is the single link that lets one Property model decorate all three entities — and it's the storage substrate for a task's `extensions`.

## See also

- [Surveys](./resources/surveys.md) and [Exec scripting](./resources/surveys/exec-scripting.md) — where you read these models
- [Workflows](./resources/workflows.md) — where Tasks and TaskGroups come from
- [Properties](./resources/properties.md) — managing Property definitions with `cotctl`
