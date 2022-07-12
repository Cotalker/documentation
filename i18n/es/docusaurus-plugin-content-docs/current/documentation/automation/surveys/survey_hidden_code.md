---
title: Developer Mode Survey Access
sidebar_label: Developer Mode Access
displayed_sidebar: documentation
---

:::caution Advertencia
Esta página aún no se encuentra traducida al español.
:::

import useBaseUrl from '@docusaurus/useBaseUrl';

## Description {#description}
Users can see surveys on channel workspaces according to different settings that act as filters determining the survey's accessibility. Among these settings, the _Developer Mode_ permits the use of custom code to program the survey's availability.

:::note
Go to the [survey settings panel](/docs/documentation/admin/survey/survey_overview#access) for more details on _Access_ configurations.
:::

## Setup {#setup}
To use custom code to program survey accessibility:

<img alt="survey access" className="img_sizing item shadow--tl" src={useBaseUrl('img/survey_access_00.png')} />
<br/>

1. Select the <span className="badge badge--primary">Administrator</span> on the **Main Menu Bar**.
2. From the **Administrative Panel**, choose <span className="badge badge--info">Surveys</span>.
3. In the **Form** table, choose to edit the survey you wish to customize to open the survey's settings panel.

<br/>

<img alt="survey access" className="img_sizing item shadow--tl" src={useBaseUrl('img/survey_access_01.png')} />
<br/>

4. Toggle on the **Developer Mode** option.
5. Choose the appropiate context.
6. Place the code script in the function field.

:::note
Configuration details and code guidelines are explained below. Code examples and expected results are shown further below.
:::

## Coding Guide {#coding-guide}
The code script used to program the survey's accessibility should follow the guidelines specified below.

### Context {#context} 
The _context_ field indicates a relevant _source_ from which data can be extracted. _Sources_ are Cotalker objects structured with a corresponding [data model](/docs/documentation/models/overview_model). The _context_ can be used as a variable representing the object within the code to extract data from an indicated source.

:::note
- Currently, only the `channel#task` context is available. This context permits retrieving data from the task channel associated with the survey.
- The `channel#task` context can be used as a variable that allows your code to access the task's data. 
- The task's data is structured according to the [COTTask data model](/docs/documentation/models/tasks/model_tasks). 
:::

### Function {#function}
_Consider the following guidelines for the code to be used:_
- The code **must** be a function written in Javascript. The function must be named `run` without any arguments.
- The function **must** return a _Hidden command_ array.
- The code **must** include the _context_ as a variable in your code if you wish to retrieve data from the available contexts.

#### Structure Example {#function-example}
```javascript
function run() {
    /* yourCode; */
    return [{
        cmd: 'HIDDEN',
        value: true | false
    }];
}
```

## Example {#example}
Below we share an example of code used to determine accessibility and how it affects end-users.

The function follows the following logic:
1. First, the `channel#task` context is declared as the `task` variable.
2. Then it checks to see if the channel corresponds to a task channel. If no task is found, the Hidden command must still be returned. It is returned with a `false` value.
3. If a task is present, then the cost field's value is examined. If the value is equal to or less than 5000, then the survey is made unaccessible by returning a _Hidden command_ with a `true` value. Otherwise, a `false` value is returned, making the survey accessible to users in the channel.

:::tip Extracting Context Data
- In this example, we use the `task` variable – which represents the _context source_ – to retrieve data from the task's additional fields.
- [Additional field types vary](/docs/documentation/admin/workflows/settings_panels/workflow_create_edit#additional-fields). In this case, we gather data from the additional fields stored in a task's `extensions` field. See the [COTTask data model](/docs/documentation/models/tasks/model_tasks) for details.
- 
:::

### Code Sample {#code-samples}



```javascript
function run() {
    const task = context['channel#task'];
    console.log('Checking survey visibility.', task);
    if (!task) {
        console.log('No task is present.');
        return [{
            cmd: 'HIDDEN',
            value: false
        }, ]
    }
    if (task.extensions.c_purchaseorder_active.cost_task_po <= 5000) {
        console.log('Survey is not accessible.');
        return [{
            cmd: 'HIDDEN',
            value: true
        }, ]
    }
}
```

### Expected Results {#results}
Below is an example of a survey following the logic expressed in the code used above.

_The task's cost field is set to 2000, meaning that the survey cannot be accessed through the actions button at bottom of the channel workspace:_

<img alt="editable survey" className="img_sizing item shadow--tl" src={useBaseUrl('img/survey_access_02.png')} />
<br/>

_The task's cost field has been manually changed to 6000, making the survey accessible to users through the actions button found at the bottom of the channel workspace:_

<img alt="editable survey" className="img_sizing item shadow--tl" src={useBaseUrl('img/survey_access_03.png')} />
<br/>

## Related Resources {#resources}
- [Survey Admin Documentation](/docs/documentation/admin/survey/survey_overview)
- [COTSurvey Data Model](/docs/documentation/models/surveys/model_surveys)
- [COTTask Data Model](/docs/documentation/models/tasks/model_tasks)
