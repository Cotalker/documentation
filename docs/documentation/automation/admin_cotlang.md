---
id: admin_cotlang
title: COTLang
sidebar_label: COTLang
---
import useBaseUrl from '@docusaurus/useBaseUrl'; 
import Highlight from '@theme/Highlight';


## Overview {#cotlang-overview}

Script language created by Cotalker.

It is used to extract data from different _contexts_ in Cotalker. It is useful for configuring _routines_.

## Data Context {#data-context}
This table contains the data to which the different sources have access. For example, if you are using Cotlang in a _survey trigger_ routine, you will have direct access to the task.

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
    taskGroupId: ObjectId[COTTaskGroup]
}
```
</div>
<div className="col col--12 code-table-2">

*Description:*

</div>
<div className="col col--12 code-table-2">

_SLAs_ are time triggered events based on how much time a task is in a specific state.

</div>
</div>

</div>
<br/>

<!-- <div className="row table-row-1">
<div className="col col--12 code-table-1">

**Source:**

</div>
<div className="col col--12 code-table-1">


### Workflow New Subtask {#new-subtask}

</div>
<div className="col col--11 col--offset-1 code-table-1">

```typescript
{
    task: COTTask,
    parent: COTTask,
}
```

</div>
<div className="col col--12 code-table-2">

**Description:**

</div>
<div className="col col--12 code-table-2">

_Workflow New Subtask_ is triggered after a sub-task is created.

</div>
</div> -->

## Context language description {#context-language}
1. `...` Destructuring Operator: each key is merged into the parent object.
For example:
```
if COTExample is { _id: ObjectId, content: String } 
then             { ...COTExample,                  someKeyName: Number } 
represents       { _id: ObjectId, content: String, someKeyName: Number }
```
2. Array[T]: is an array of type T.
For example:
```
model       { commands: Array[String] }
can contain { commands: ["hello", "world"] } 
```
3. [COTChannel Data model](/docs/documentation/api/communication/channels)
4. [COTMessage Data model](/docs/documentation/api/communication/messages)
5. [COTAnswer Data model](/docs/documentation/api/surveys/answers)
6. [COTTask Data model](/docs/documentation/api/tasks/tasks) 
7. [COTTaskGroup Data model](/docs/documentation/api/tasks/task_groups)
8. ObjectID[T]: 24-character unique identifier that represents an object of type T


## How to use Cotlang {#how-to-use-cotlang}
To configure the type of stages, COTlang is useful to easily get information from the database.

| Cotlang | Description | Format |
| ---- | --------- | ------- |
| VALUE | Extracts data from external data | $VALUE#[EXTRACTOR] |
| OUTPUT | Extracts data from stages data of a routine. | $OUTPUT#[stage-name]#[EXTRACTOR] |
| ENV | Access the environment variable | $ENV# environment-var |
| CODE | Transform the code into an object |  $CODE#[model]#[EXTRACTOR]#[INPUT] |
| JOIN | Concatenate values |  $JOIN#[Some char to join]#[ARG A]#[ARG B]#...#[ARG N] |
| TIME | Generates date, relative to the current date. | $$TIME#[PARAM1]#[PARAM2] |
| META | Extracts data from message.meta (Questions). | $META#[EXTRACTOR] |
| EXTRACTOR | Token values: (1) *Values*: Dive into value or (2) *Operators*: Apply function to current data. |

### Examples {#examples}

**META** <br/>
question.display = ["$META#somekey"]<br/> 
message.meta = '{"somekey":"Happy New Year"}' <br/> 
When a value is required, question.display should return ["$META#somekey"] <br/>

**EXTRACTOR** <br/>
- Operators: ... |[find => identifier = keyname]|...  | [TOKEN1]|[TOKEN2]|...|[TOKEN-N]
- General Example: 
{a: { b: { c1: 'Hola', c2: 'Mundo' }  }  } <br/> To access the info of variable c1, use the following token: *a|b|c1* . It wil respond with *Hola* 

## Function {#function}
The format of the function is as follows: <br/>
[ function_name => token = Syntax | token ]
<br/>

The following list shows the available cotlang functions:
- **size**: Return the size of an array. <br/>
Example: $VALUE#array|[size=>*] <br/><br/>
- **toString**: Returns the input in string type. <br/><br/>
- **cast**:  Returns the input in float or boolean type. <br/>
Example: $VALUE#anyValue|[cast=>parseFloat]<br/><br/>
- **map**: Map elements from one type to another. <br/>
Example: $VALUE#populatedChannelUsers|[map=>email]<br/><br/>
- **arrayToObject**: Returns the object in array. <br/>
Example:$VALUE#data|[arrayToObject=>key=value]...<br/><br/>
- **isDefinedFilter**: Return only values that are not *0*,*""*,*null* or *undefined*. <br/>
Example: $VALUE#data|[isDefinedFilter=>meta]<br/><br/>
- **filter**: Return all the arguments that apply to the condition. <br/>
Example: $VALUE#data|[filter=>contentType=application/vnd.cotalker.survey+text]<br/><br/>
- **notEqualFilter**: Filter the unequal values ​​of an array.<br/>
Example: $VALUE#data|[notEqualFilter=>contentType=application/vnd.cotalker.survey+text] <br/><br/>
- **simpleNotEqualFilter**: Filter unequal values ​​from an array to a condition. <br/>
Example: $VALUE#data|[simpleNotEqualFilter=>125938f23295sd0]<br/><br/>
- **simpleEqualFilter**: Filter equal values ​​from an array to a condition.<br/>
Example: $VALUE#data|[simpleEqualFilter=>125938f23295sd0]<br/><br/>
- **concat**: Concatenate values. <br/><br/>
- **find**: Return a particular element of the array. <br/>
Example: $VALUE#data|[find=>identifier=minuta-fecha]<br/><br/>
- **push**: Add an element on the back. <br/>
Example: $VALUE#populatedChannelUsers|[map=>email]|[push=>string=ignacio@cotalker.com]<br/><br/>
- **add**: Add an element on the back, if it doesn't exists. <br/>
Example: $VALUE#populatedChannelUsers|[map=>email]|[add=>string=ignacio@cotalker.com]<br/><br/>
- **math**: Perform a mathematical operation on the values. The operation ar *add* or *subtract*. <br/>
Example: $VALUE#answer|anyNumber|[math=>add=2]<br/><br/>
- **date**: Allows parsing dates. <br/>
Example: $VALUE#createdAt|[date=>format=DD-MM-YYYY]<br/><br/>
- **every**: Perform the operation on each element of the array. The operator can be *>= x*, *> x*, *< x*, *<= x* or *=== x*. And the key are *gte*, *gt*, *lt*, *lte* or *eq*, respectively.<br/>.
Example: $VALUE#data|[filter=>contentType=application/vnd.cotalker.survey+textnumber]|[map=>responses]|[every=>lte=2] <br/><br/>
- **some**: Return the values that apply to one of the following conditions: *>= x*, *> x*, *< x*, *<= x* or *=== x*. And the key are *gte*, *gt*, *lt*, *lte* or *eq*, respectively. <br/>
Example $VALUE#data|[filter=>contentType=application/vnd.cotalker.survey+textnumber]|[map=>responses]|[some=>lte=2]<br/><br/>
- **json**: Convert a Json to string. <br/>
Example: $VALUE#populatedChannelUsers|[json=>parse]<br/><br/>
- **querystring**: Generate a querystring form an object. <br/>
Example: $VALUE#someValue|[querystring=>string]<br/><br/>
- **cotanswer_list**: Generate text answer from an array. <br/>
Example: $VALUE#answer_data|[cotanswer_list=>array]<br/><br/>
- **gencode**: Generate a code from a string. <br/>
Example: $VALUE#path|to|string|[gencode=>*]<br/><br/>


