---
id: question_exec
title: Question Code Automations
sidebar_label: Question Code
---

:::caution Advertencia
Esta página aún no se encuentra traducida al español.
:::
import useBaseUrl from '@docusaurus/useBaseUrl'; 
import Highlight from '@theme/Highlight';

<span className="hero__subtitle">

_Program logic, retrieve data, and add customized automations on Survey Questions with JavaScript Code._

</span>

## Overview {#overview}
_Question Code Automations_ permit adding Javascript code to a survey question. These automations can be set using customized code logic to add validation processes, retrieve external data, automatically fill out survey questions, and much more.

:::info
- Custom code must be written in **JavaScript** using an asynchronous function.
- The code runs on the client-side within a _sandbox_.
- On the backend, _Question Code Automations_ are found in [COTQuestionExec](/docs/documentation/models/surveys/model_questionExec) objects. (Sometimes _Question Code Automations_ are referred to as _Question Exec_)
:::

## Setup {#setup}
To add your custom code:
1. Select the [**Automation** tab](/docs/documentation/admin/survey/survey_overview#automation) within the [survey component](/docs/documentation/admin/survey/survey_overview#form-template)
2. Choose a [_lifecycle stage_](#component-lifecycle-stages).
3. Choose the appropriate [_parameters_](#parameters).
4. Put your [Question Code function](#function) on the editor box at the bottom of the settings panel.

_See the image below:_

<img alt="automation tab" className="img_sizing_small item shadow--md" src={useBaseUrl('img/automation_question_exec_00.png')} />
<br/>
<br/>

## Component Lifecycle Stages {#component-lifecycle-stages}
You can add custom code in any of the four _stages_ of a _survey component's lifecycle_. Select the **stage** either with the dropdown menu or by clicking the corresponding icon. 

_See the image below:_

<img alt="automation tab" className="img_sizing_small item shadow--md" src={useBaseUrl('img/automation_question_exec_01.png')} />
<br/>

- **Preload**: The code executes when the survey is created.
- **onDisplay**: Code executes when a survey is in editing mode, i.e., when a user opens the survey from the channel, and it is displayed for answering. 
- **Validate**: Code executes before internal validations and before sending the survey. This permits adding additional levels of validation (business guidelines, protocols, etc.). 
- **Postsave**: If custom and internal validations are passed, the code executes after sending the survey.

:::caution
- Lifecycles can be complex, especially when dealing with asynchronous functions. Avoid using repetitions.
:::

:::tip Best Practices
- Use survey field answers to validate other fields.
- Use validations for complex rules involving string manipulation or mathematical operations.
- When possible, try using [routines](/docs/documentation/automation/admin_routine) instead of executing code on the _postsave_ stage.
:::

## Stage Funciton / Coding Guide {#coding-guide}
In the Stage Function section, you can write or paste your [Question Code function](#function) into the editor box and set the necessary [parameters](#parameters) for it to work.

<img alt="automation tab" className="img_sizing_small item shadow--md" src={useBaseUrl('img/automation_question_exec_01a.png')} />
<br/>

:::tip
See the [Embedded Code Editor](/docs/documentation/automation/code_editor) section for more information on how to use the editor.
:::

### Parameters (Context Variables) {#parameters}
_Parameters_ or _context variables_ enable communication with different endpoints.

<img alt="automation tab" className="img_sizing_small item shadow--md" src={useBaseUrl('img/automation_question_exec_01b.png')} />
<br/>

_The following context variables are available for use in the code but must be selected from the Parameters menu for them to be accessible:_

- **property#channel**: Properties associated with a channel.
- **property#user**: Properties associated with a user.
- **channel#self**: Channel where the survey is located.
- **user#me**: User that is answering the survey.
- **user#company**: The company the user belongs to.
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


### Question Code Function {#function}
Write or paste your code into the editor.

<img alt="automation tab" className="img_sizing_small item shadow--md" src={useBaseUrl('img/automation_question_exec_01c.png')} />
<br/>

_Question Code Automation_ **MUST** comply with at least two requirements:

1. The Question Code Automation **SHOULD** be written as an asynchronous function named `run`, without any arguments.  

  _Structure example:_  
  ```javascript
  async function run () { /* yourCode; */ return []; }
  ```

2. The function **MUST** return an array with [_command objects_](#command-objects).  
  
  :::note Command Notes
  **A.** The function may return more than one command.  
  **B.** [Below](#command-objects) are descriptions and samples of the available command objects.
  :::

  _Structure example:_
  ```javascript
  return [
    { 
      cmd: <cmd-name>, 
      value: <cmd-value>, 
      result: <cmd-result> //Used with RESULT commands.
      target: <cmd-target> //Used with SET-RESPONSES commands.
    }
  ];
  ```

  <br/>

:::tip Best Practices
- Use console logs or print statements within your code to show what your function is doing on the browser console and debug if necessary.
- Wrap your code logic in try-catch statements.
- Code defensively, expect null values in your logic, and try to handle null cases when reading an answer from another question.
- Let survey field answers automatically determine other answers. The _target_ option in the [SET_RESPONSES](#responses-cmd) command can help you with this.
:::

### Command Objects {#command-objects}
Command objects provide the system with instructions and data for continuing the process. 

#### READONLY {#readonly-cmd}

<div className="margin margin-left--lg">

**Description**: Sets the field to read-only mode.  
**Example**: `{cmd: 'SET_READONLY', value: 'true' }`

Field | Values 
--- | --- 
**cmd**  | SET_READONLY
**value** | 'true' \| 'false'

</div>

#### RESPONSES {#responses-cmd}

<div className="margin margin-left--lg">

**Description**: _Places a value on the indicated field._  
**Example**: `{ cmd: 'SET_RESPONSES', target: 'rating_00', value: '5' }`

Field | Values 
--- | --- 
**cmd**  | SET_RESPONSES
**target** | 'self' \| '[Survey question identifier](/docs/documentation/admin/survey/survey_overview#field-descriptions)'
**value** | [Click here to view value type format.](/docs/documentation/automation/surveys/question_exec_extras/set_responses_values)

</div>

#### REQUIRED {#required-cmd}

<div className="margin margin-left--lg">

**Description**: Sets the field as mandatory, requiring an answer.  
**Example**: `{ cmd: 'SET_REQUIRED', value: 'true' }`

Field | Values
--- | ---
**cmd** | SET_REQUIRED | 
**value** | 'true' \| 'false'

</div>

#### RESULT {#result-cmd}

<div className="margin margin-left--lg">

**Description**: Validates responses with a "true" or "false" _result_.  
**Example**: `{ cmd: 'RESULT', result: 'false', value: 'Please try again.' }`  

Field | Values
--- | ---
**cmd** | RESULT
**result** | 'true' \| 'false'
**value** | _custom error message_

</div>

### Network Requests {#network-requests}
The Question Code Automation can make network requests, i.e., API requests that can be customized with user survey input and then filtered and processed to be used to fill out the survey or any other process that can be automated with the code.

:::caution
- Use network requests with caution and only for retrieving precise data.
- Avoid including passwords or API tokens directly in your code.
:::

To make a network request, you must include in your code the following function: `networkRequest(url, { headers, method, body }, options)`.  
If an authentication token is needed to make an API request, add `{token: true}` option to use the current user's token.

_Code structure example:_

```javascript
const example = await networkRequest(`url`, {
            method: 'GET' | 'POST' | 'PATCH',
            headers: {...},
            body: {...} // Used with POST & PATCH
        },
        {
            token: true // Adds user's API token to the header
        });
    return [];  //Must return a command object.
}
```

[See Example 3 for more details](#example-network-request).

## Examples {#examples}

### Example 1: Preload User and Channel {#example-1}
_Displays the current channel and user name on read-only survey field, as shown below:_

<img alt="preload user and channel" className="img_sizing item shadow--lt" src={useBaseUrl('img/automation_question_exec_02a.png')} />
<br/>

_Settings:_

- Set _lifecycle_ on **Preload** stage.  
- Set _parameters_ to **user#me** and **channel#self**.

_Code sample_:

```javascript
function run() {
    const commands = [];
    const user = context['user#me'];
    const channel = context['channel#self'];
    const channelName = channel.nameDisplay;
    const userName = user.name.names + ' ' + user.name.lastName;

    commands.push({
        cmd: 'SET_RESPONSES',
        target: 'self',
        value: channelName + ' / ' + userName
    });
    commands.push({
        cmd: 'SET_READONLY',
        value: 'true'
    });
    return commands;
}
```
_Your settings panel should look something like this:_

<img alt="preload user and channel" className="img_sizing_narrow item shadow--lt" src={useBaseUrl('img/automation_question_exec_02.png')} />
<br/>


### Example 2: Validate Value {#example-2}
_Validates if a value is between 0 and 100. An error message appears and the form cannot be submitted. See image below:_ 

<img alt="validate value" className="img_sizing item shadow--lt" src={useBaseUrl('img/automation_question_exec_03a.png')} />
<br/>

_Settings:_
- Set _lifecylce_ on **Validate** stage.
- Set _parameters_ on **responses#self**.

_Code:_

```javascript
function run() {
    const val = context['responses#self'][0];

    if (!val)
        return [{
            cmd: 'RESULT',
            result: false,
            value: 'Please enter a number.'
        }];

    if (val < 0)
        return [{
            cmd: 'RESULT',
            result: false,
            value: 'Value is lower than the minimum allowed (0).'
        }];

    if (val > 100)
        return [{
            cmd: 'RESULT',
            result: false,
            value: 'Value is greater than the maximum allowed (100).'
        }];

    else
        return [{
            cmd: 'RESULT',
            result: true
        }];
}
```

<br/>

### Example 3: Make a network request. {#example-network-request}
_This example makes an API request to retrieve all elements belonging to a particular collection and use the data to fill out the form._

:::info Example Explanation
- In the example, the network request retrieved an array of all the _elements_ belonging to the `client` _collection_. The code is hotwired to use the fourth element in the array and extract from it the client's contact name and email and use them to fill out the form.
- With a little bit of coding, you can add customized logic to the survey to automate data retrival and usage.
:::

_Settings:_
- Set lifecycle on **Preload** stage.
- No parameters are required.

_Code:_
```javascript
async function run() {
    const test = await networkRequest(
        `https://www.cotalker.com/api/v2/properties?propertyTypes=client`, {
            method: 'GET',
            headers: {
                "admin": "true"
            },
        }, {
            token: true
        });
    const printTest = test.data.properties[3];
    console.log(test);
    return [{
            cmd: "SET_RESPONSES",
            target: "self",
            value: printTest.schemaInstance.contact_name
        },
        {
            cmd: "SET_RESPONSES",
            target: "contact_email",
            value: printTest.schemaInstance.email
        },
    ];
}
```

_The code above retrived this [element (COTProperty)](/docs/documentation/api/databases/properties):_

```json {14-15}
{
    "data": {
        "_id": "62a8f377f2fb5bf8612fc356",
        "subproperty": [],
        "isActive": true,
        "name": {
            "display": "ACME",
            "code": "ein_99-787654"
        },
        "propertyType": "client",
        "schemaInstance": {
            "address_1": "130 32nd St.",
            "tax_id": "153225974",
            "email": "sales@acme.com",
            "contact_name": "Rebbecca Rogers",
            "address_2": "-",
            "city": "Union City",
            "state": "NJ",
            "zip": "07087",
            "phone": "2018653676"
        },
        "company": "62a8f3225c32dfdb26a90b77",
        "createdAt": "2022-06-06T11:57:48.474Z",
        "modifiedAt": "2022-06-14T18:54:46.230Z"
    }
}
```

_With this data, the returned commands set responses for two survey fields:_

<img alt="preload user and channel" className="img_sizing_narrow item shadow--lt" src={useBaseUrl('img/automation_question_exec_03b.png')} />
<br/>


<!--  EXAMPLE NOT WORKING
### Example 3: Validate Email Address {#validate-email-address}
_Validates if response has "@". Set on Validate stage._

```javascript
function run() {
    const email = context['responses#self'][0]; // gets the value from the input

    if (!email.match(/@/))
        return [{
            cmd: 'RESULT',
            result: false,
            value: 'The input must have an @'
        }];

    return [{
        cmd: 'RESULT',
        result: true
    }];
}
``` -->
