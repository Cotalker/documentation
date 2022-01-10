---
id: question_exec
title: Question Exec
sidebar_label: Question Exec
---
import useBaseUrl from '@docusaurus/useBaseUrl'; 
import Highlight from '@theme/Highlight';

<span className="hero__subtitle">

_Customize Survey Questions with JavaScript Code_

</span>

## Overview {#overview}
Surveys are among Cotalker's main features. Their flexibility and customization ability allow them to adapt to each business's needs.

This spec expands the notion of survey functionality by introducing _QuestionExec_, custom code execution for your survey questions.

:::info
- Custom code must be written in **JavaScript**.
- Code runs on the client side, within a _sandbox_.
:::

## Setup {#setup}

To add your custom code, choose any survey component and select the **Automation** tab. **The code is added in the field at the bottom of the settings panel.**

_See the image below:_

<img alt="automation tab" className="img_sizing_narrow item shadow--md" src={useBaseUrl('img/automation_question_exec_00.png')} />
<br/>
<br/>

You can add custom code in any one of the four _stages_ of a _survey component's lifecycle_. Select the **stage** either with the dropdown menu or by clicking the corresponding icon. 

_See the image below:_

<img alt="automation tab" className="img_sizing_narrow item shadow--md" src={useBaseUrl('img/automation_question_exec_01.png')} />
<br/>

## Component Lifecycle Stages {#component-lifecycle-stages}
- **Preload**: The code executes when the survey is created.
- **onDisplay**: Code executes when a survey is in editing mode, i.e., when a user opens the survey from the channel, and it is displayed for answering. 
- **Validate**: Code executes before internal validations and before sending the survey. This permits adding additional levels of validation (business guidelines, protocols, etc.). 
- **Postsave**: If custom and internal validations are passed, the code executes after the survey is sent.

## Coding Guide {#coding-guide}

### QuestionExec Function

1. The QuestionExec function **MUST** be written as a function named `run`, without any arguments e.g., 

  ```javascript
  function run () { /* yourCode; */ return []; }
  ```

2. The function **MUST** return a _command_ array with the following structure:
  
  ```javascript
  return [
    { 
      cmd: <cmd-name>, 
      value: <cmd-value>, 
      result: <cmd-result> 
    }
  ];
  ```
The function may return more than one command.
  
### Command Array Elements {#command-array-elements}

| _cmd-name_ | _cmd-value_ | _cmd-result_ | Description |
| ----- | ----- | ----- | ----- |
| **SET_READONLY** | "true", "false" | | Sets the field to read-only mode.|
| **SET_RESPONSES** | [value] | | Replaces the value stored in the field. |
| **SET_REQUIRED** | "true", "false" | | Sets the field as mandatory, requiring an answer. |
| **RESULT** | Custom error message | "true", "false" | Validates responses with a "true" or "false" _result_ |

### Parameters (Context Variables) {#parameters-context-variables}
_The following context variables are available for use in the code but must be selected from the Parameters menu for them to be accessible:_

- **property#channel**: Properties associated with a channel.
- **property#user**: Properties associated with a user.
- **channel#self**: Channel where the survey is located.
- **user#me**: User that is answering the survey.
- **responses#self**: Survey field answer stored as value.
- **message#self**: Message associated with the survey.

:::note
These _parameters_ or _context variables_ can be further specified in your code. Just look up the appropriate [models](/docs/documentation/models/overview_model) for each _parameter_. For example, if you wanted to use some specific channel properties, you could use the models to declare constants:

```javascript
const channelId = context['channel#self']._id;   //  e.g. 606b0d554c479b00080f0d27
const channelCode = context['channel#self'].nameCode;    // identification code
const channelDisplay = context['channel#self'].nameDisplay;  // display name
```
:::


## Examples {#examples}

### Example 1: Preload User and Channel {#example-1}
_Displays the user name and current channel in the survey field. Set on Preload stage._

```javascript
function run(){
  const commands = [];
  const user = context['user#me'];
  const channel = context['channel#self'];
  const channelName = channel.nameDisplay;
  const userName = user.name.names + ' ' + user.name.lastName;
  
  commands.push(
    { 
      cmd: 'SET_RESPONSES', 
      value: channelName + ' / ' + userName 
    }
  );
  commands.push(
    { 
      cmd: 'SET_READONLY',
      value: 'true' 
    }
  );
  return commands;
}
```
_Your settings panel should look something like this:_

<img alt="preload user and channel" className="img_sizing_narrow item shadow--lt" src={useBaseUrl('img/automation_question_exec_02.png')} />
<br/>


### Example 2: Validate Value {#example-2}
_Validates if a value is between 0 and 100. Set on Validate stage._

```javascript
function run(){
  const val = context['responses#self'][0];

  if (!val) 
    return [
      { 
        cmd: 'RESULT', 
        result: false, 
        value: 'Please enter a number.' 
      }
    ];
  
  if (val < 0) 
    return [
      { 
        cmd: 'RESULT', 
        result: false, 
        value: 'Value is lower than the   minimum allowed (0).' 
      }
    ];
  
  if (val > 100) 
    return [
      { 
        cmd: 'RESULT', 
        result: false, 
        value: 'Value is greater than   maximum allowed (100).' 
      }
    ];
  
  else 
    return [
      { 
        cmd: 'RESULT', 
        result: true 
      }
    ];
}
```

_Your settings panel should look something like this:_

<img alt="validate value" className="img_sizing_narrow item shadow--lt" src={useBaseUrl('img/automation_question_exec_03.png')} />
<br/>

### Example 3: Validate Email Address {#validate-email-address}
_Validates if response has "@". Set on Validate stage._

```javascript
function run() {
  const email = context['responses#self'][0] ; // gets the value from the input
  
  if (!email.match(/@/)) 
    return [
      { 
        cmd: 'RESULT', 
        result: false, 
        value: 'The input must have an @' 
      }
    ];

  return [{ cmd: 'RESULT', result: true }];
}
```

-------
