---
id: triggers_and_contexts
title: Triggers & Contexts
sidebar_label: Triggers & Contexts
---
import useBaseUrl from '@docusaurus/useBaseUrl'; 
import Highlight from '@theme/Highlight';

<span className="hero__subtitle"><em>COTLang Data Extraction</em></span>
<br/>
<br/>
<br/>

<img alt="design" class="img_sizing_title" src={useBaseUrl('img/design/Database.svg')} />
<br/>
<br/>

## Overview

The [table](#contexts-table) below contains the data to which different _sources_ or _triggers_ have access. For example, you can use [COTLang](/docs/documentation/automation/admin_cotlang) in a [_state survey trigger_](#sm-survey-trigger) routine to get direct access to the task.

:::tip
See the [Context Language Description](#context-language) section for a brief explanation of the values shown in the table below.
:::

## Contexts Table {#contexts-table}

<div className="container box">

<div className="row table-row-1">
<div className="col col--12 code-table-1">

*Source*:

</div>
<div className="col col--11 col--offset-1 code-table-1">

### Slash Command Trigger {#channel-message-trigger}

</div>
<div className="col col--12 code-table-1">

*Context*:

</div>
<div className="col col--11 col--offset-1 code-table-1">

```typescript
{
  channel: COTChannel,
  message: COTMessage,
  cmdArgs: Array[string]
}
```
</div>
<div className="col col--12 code-table-2">

*Description*:

</div>
<div className="col col--12 code-table-2">

The source is a bot that is triggered with a slash command and is associated with a particular channel: `/command`

</div>
</div>

<div className="row table-row-1">
<div className="col col--12 code-table-1">

*Source:*

</div>
<div className="col col--11 col--offset-1 code-table-1">

### Global Slash Command Trigger {#global-message-trigger}

</div>
<div className="col col--12 code-table-1">

*Context:*

</div>
<div className="col col--11 col--offset-1 code-table-1">

```typescript
{
    channel: COTChannel,
    message: COTMessage,
    cmdArgs: Array[string]
}
```
</div>
<div className="col col--12 code-table-2">

*Description:*

</div>
<div className="col col--12 code-table-2">

The source is a global bot that is triggered in any channel with a slash command: `/command`

</div>
</div>

<div className="row table-row-1">
<div className="col col--12 code-table-1">

*Source:*

</div>
<div className="col col--11 col--offset-1 code-table-1">

### Channel Survey Trigger {#channel-survey-trigger}

</div>
<div className="col col--12 code-table-1">

*Context:*

</div>
<div className="col col--11 col--offset-1 code-table-1">

```typescript
{
    ...COTAnswer,
    messages: COTMessage
}
```
</div>
<div className="col col--12 code-table-2">

*Description:*

</div>
<div className="col col--12 code-table-2">

A _Channel Survey Trigger_ is a bot that is triggered with a specific type of survey sent in a specific channel.

</div>
</div>

<div className="row table-row-1">
<div className="col col--12 code-table-1">

*Source:*

</div>
<div className="col col--11 col--offset-1 code-table-1">

### Global Survey Trigger {#global-survey-trigger}

</div>
<div className="col col--12 code-table-1">

*Context:*

</div>
<div className="col col--11 col--offset-1 code-table-1">

```typescript
{
  ...COTAnswer,
  messages: COTMessage
}
```
</div>
<div className="col col--12 code-table-2">

*Description:*

</div>
<div className="col col--12 code-table-2">

_Global Survey Trigger_ is a bot that is triggered with a specific type of survey sent in any channel.

</div>
</div>

<div className="row table-row-1">
<div className="col col--12 code-table-1">

*Source:*

</div>
<div className="col col--11 col--offset-1 code-table-1">

### Schedule {#scheduler}
</div>
<div className="col col--12 code-table-1">

*Context:*

</div>
<div className="col col--11 col--offset-1 code-table-1">

```typescript
// Custom body.
```

</div>
<div className="col col--12 code-table-2">

*Description:*

</div>
<div className="col col--12 code-table-2">

A _Scheduler_ is an event that can be executed at a specific time (non-recurring) or at pre-established intervals (recurring).

</div>
</div>

<div className="row table-row-1">
<div className="col col--12 code-table-1">

*Source:*

</div>
<div className="col col--11 col--offset-1 code-table-1">

### Workflow Start {#required-survey}

</div>
<div className="col col--12 code-table-1">

*Context:*

</div>
<div className="col col--11 col--offset-1 code-table-1">

```typescript
{
    answer: COTAnswer,
    meta: {
        parentTask: ObjectId[COTTask],
        taskGroup: ObjectId[COTTaskGroup]
    }
}
```
</div>
<div className="col col--12 code-table-2">

*Description:*

</div>
<div className="col col--12 code-table-2">

A survey is triggered before starting a new workflow. The survey can be created and configured for new workflow initialization.

</div>
</div>

<div className="row table-row-1">
<div className="col col--12 code-table-1">

*Source:*

</div>
<div className="col col--11 col--offset-1 code-table-1">

### Post Workflow Start {#sm-new-task}

</div>
<div className="col col--12 code-table-1">

*Context:*

</div>
<div className="col col--11 col--offset-1 code-table-1">

```typescript
{
    task: COTTask,
    parent: COTTask
}
```
</div>
<div className="col col--12 code-table-2">

*Description:*

</div>
<div className="col col--12 code-table-2">

_Post workflow start_ is triggered after a workflow is started.

</div>
</div>

<div className="row table-row-1">
<div className="col col--12 code-table-1">

*Source:*

</div>
<div className="col col--11 col--offset-1 code-table-1">

### State Survey Trigger {#sm-survey-trigger}

</div>
<div className="col col--12 code-table-1">

*Context:*

</div>
<div className="col col--11 col--offset-1 code-table-1">

```typescript
{
    ...COTTask,
    sentAnswer: COTAnswer
}
```
</div>
<div className="col col--12 code-table-2">

*Description:*

</div>
<div className="col col--12 code-table-2">

_State Survey Triggers_ are triggered within any task by a specific survey and at specific states.

</div>
</div>

<div className="row table-row-1">
<div className="col col--12 code-table-1">

*Source:*

</div>
<div className="col col--11 col--offset-1 code-table-1">

### Changed State {#sm-change-state}

</div>
<div className="col col--12 code-table-1">

*Context:*

</div>
<div className="col col--11 col--offset-1 code-table-1">

```typescript
{
    ...COTTASK
}
```
</div>
<div className="col col--12 code-table-2">

*Description:*

</div>
<div className="col col--12 code-table-2">

_Changed State_ is triggered when a task changes state.

</div>
</div>

<div className="row table-row-1">
<div className="col col--12 code-table-1">

*Source:*

</div>
<div className="col col--11 col--offset-1 code-table-1">

### Service-Level Agreement (SLA) {#sla}
</div>
<div className="col col--12 code-table-1">

*Context:*

</div>
<div className="col col--11 col--offset-1 code-table-1">

```typescript
{
    taskId: ObjectId[COTTask],
    taskGroupId: ObjectId[COTTaskGroup],
    ChannelID: ObjectId[COTChannel]
}
```
</div>
<div className="col col--12 code-table-2">

*Description:*

</div>
<div className="col col--12 code-table-2">

_SLAs_ are time-triggered events based on how much time a task is in a specific state.

</div>
</div>

</div>
<br/>


<div className="alert alert--secondary">

## Context Language Description {#context-language}
_Brief explanation of the values used in the [Contexts Table](#contexts-table)._

1. `...` : Destructuring operator, i.e., each key is merged into the parent object.

  _For example:_

  If `COTExample` is:

    ```typescript
    { _id: ObjectId, content: String }
    ```
  
  then

    ```typescript
    { ...COTExample, someKeyName: Number }
    ```
  
  represents

    ```typescript
    { _id: ObjectId, content: String, someKeyName: Number }
    ```

------

2. `Array[T]`: is an array of type _T_.
  
  _For example:_
  
  Model 
  
  ```typescript
  { commands: Array[String] }
  ```

  can contain 

  ```typescript
  { commands: ["hello", "world"] } 
  ```

-----

3. [`COTChannel` Data model](/docs/documentation/api/communication/channels)

----

4. [`COTMessage` Data model](/docs/documentation/api/communication/messages)

----

5. [`COTAnswer` Data model](/docs/documentation/api/surveys/answers)

-----

6. [`COTTask` Data model](/docs/documentation/api/tasks/tasks) 

-----

7. [`COTTaskGroup` Data model](/docs/documentation/api/tasks/task_groups)

-----

8. `ObjectID[T]`: 24-character unique identifier that represents an object of type _T_

</div>

