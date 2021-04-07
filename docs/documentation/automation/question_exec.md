---
id: question_exec
title: Question Exec
sidebar_label: Question Exec
---
import useBaseUrl from '@docusaurus/useBaseUrl'; 
import Highlight from '@theme/Highlight';

<span class="hero__subtitle">

_Customize Survey Questions with JavaScript Code_

</span>

## Overview
Surveys are among Cotalker's main features. Their flexibility and customization ability allow them to adapt to each business's needs.

This spec expands the notion of survey functionality by introducing _Question EXEC_, custom code execution for your survey questions.

:::info
- Custom code must be written in **JavaScript**.
- Code runs on the client side, within in a _sandbox_.
:::

## Set Up

To add your custom code, choose any survey component and select the **Automation** tab. The code is added in the field at the bottom of the settings panel.
_See the image below:_

<img alt="automation tab" class="img_sizing_narrow item shadow--md" src={useBaseUrl('img/automation_question_exec_00.png')} />
<br/>
<br/>

You can add custom code in any of the four _stages_ of a _survey component's lifecycle_. Set the **stage** either with the dropdown menu or by clicking the corresponding icon. 
_See the image below:_

<img alt="automation tab" class="img_sizing_narrow item shadow--md" src={useBaseUrl('img/automation_question_exec_01.png')} />
<br/>

## Component Lifecycle Stages
- **Preload**: The code executes when the survey is created.
- **onDisplay**: Code executes when a survey is in editing mode.
- **Validate**: Code executes before internal validations, which permits adding additional levels of validation (business guidelines, protocols, etc.).
- **Postsave**: Code executes after custom and internal validations.

## Coding Guide
### Available Commands:
_The following commands are available for use in your code:_
- **SET_READONLY**: Sets the field to read-only mode.
- **SET_RESPONSES**: Replaces the value stored in the field.
- **SET_REQUIRED**: Sets the field as mandatory, requiring an answer.

### Parameters (Context Variables)
_The following context variables are available for use in the code but must be selected from the Parameters menu for them to be accessible:_

- **property#channel**: Properties associated with a channel.
- **property#user**: Properties associated with a user.
- **channel#self**: Channel where the survey is located.
- **user#me**: User that is answering the survey.
- **responses#self**: Survey field answer stored as value.
- **messages#self**: Message associated with the survey.

## Examples

### Example 1: Preload User and Channel
_Displays the user name and current channel in the survey field._

```javascript
function run(){
  const commands = [];
  const user = context['user#me'];
  const channel = context['channel#self'];
  const channelName = channel.nameDisplay;
  const userName = user.name.names + ' ' + user.name.lastName;
  commands.push(
  { cmd: 'SET_RESPONSES', 
    value: channelName + ' / ' + userName }
  );
  commands.push(
  { cmd: 'SET_READONLY',
    value: 'true' }
  );
  return commands;
}
```
_Your settings panel should look something like this:_

<img alt="preload user and channel" class="img_sizing_narrow item shadow--lt" src={useBaseUrl('img/automation_question_exec_02.png')} />
<br/>


### Example 2: Validate Value
_Validates if a value is between 0 and 100._

```javascript
function run(){
const val = context['responses#self'][0];
if (!val) return [{ cmd: 'RESULT', result: false, value: 'Please enter a number.' }];
if (val < 0) return [{ cmd: 'RESULT', result: false, value: 'Value is lower than the minimum allowed (0).' }];
if (val > 100) return [{ cmd: 'RESULT', result: false, value: 'Value is greater than maximum allowed (100).' }];
else return [{ cmd: 'RESULT', result: true }];
}
```

_Your settings panel should look something like this:_

<img alt="validate value" class="img_sizing_narrow item shadow--lt" src={useBaseUrl('img/automation_question_exec_03.png')} />
<br/>

-------