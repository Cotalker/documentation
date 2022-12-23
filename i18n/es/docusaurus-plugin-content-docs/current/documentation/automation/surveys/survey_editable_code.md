---
title: Developer Mode Survey Editability
sidebar_label: Developer Mode Editability
displayed_sidebar: documentation
---

:::caution Advertencia
Esta página aún no se encuentra traducida al español.
:::

import useBaseUrl from '@docusaurus/useBaseUrl';

## Description {#description}
Determine with customized rules whether a submitted survey can be edited using custom Javascript code scripts. Programming custom logic is an alternative to the `yes` or `no` options for determining a survey's editability after submission. For example, you can set a survey to be editable when found within a specific task state or priority; otherwise, it could be set to read-only.

This feature is useful when submitted forms affect task characteristics or contain information that should not be modified.

The code is inserted in the [survey's settings panel in the Access section](/docs/documentation/admin/survey/settings#access).

:::info
By default, surveys are not editable, except for surveys created before the release of this feature (June 2022).
:::

:::caution
If a submitted survey form is part of a routine, even if it is edited, the data gathered by the routine remains the same.
:::

## Setup {#setup}
To enable the use of custom code to determine survey editability:

<img alt="settings panel" className="img_sizing item shadow--tl" src={useBaseUrl('img/survey_editable_00.png')} />
<br/>

1. Select the <span className="badge badge--primary">Administrator</span> on the **Main Menu Bar**.
2. From the **Administrative Panel**, choose <span className="badge badge--info">Surveys</span>.
3. In the **Form** table, choose to edit the survey you wish to customize to open the survey's settings panel.

<img alt="settings panel" className="img_sizing item shadow--tl" src={useBaseUrl('img/survey_editable_01.png')} />
<br/>

4. In the _Editable_ field, choose **Developer Mode**.
5. Select the _context_.
6. Place the code script in the function field.

:::note
Configuration details and code guidelines are explained below. Code examples and expected results are shown further below.
:::

:::tip
See the [Embedded Code Editor](/docs/documentation/automation/code_editor) section for more information on how to use the editor.
:::


## Coding Guide {#guide}
Code used for determining survey editability should follow the guidelines specified below.

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
- The function **must** return a _Read-only command_ array.
- The code **must** include the _context_ as a variable in your code if you wish to retrieve data from the available contexts.

#### Structure Example {#function-example}
```javascript
function run() {
    /* yourCode; */
    return [{
        cmd: 'SET_READONLY',
        value: true | false
    }];
}
```

## Example {#example}
Below is an example of a code script and how it affects end-users. 
This code follows three simple steps to determine survey editability.
1. The code first checks if a task is present in the channel. Even though there is no task, a command array must be returned, so the function returns a false read-only value.
2. If the task is in a specific state, it returns a false read-only value. The survey can be edited.
3. If the task is in any other state, a read-only value is returned, and the survey cannot be edited.



:::tip Extracting context data
- In this example, we use the `task` variable, that represents the _context source_, to retrieve the task's current state.
- By looking at the [task's data model](/docs/documentation/models/tasks/model_tasks), we know that we can find this information through `task.status`. The information retrieved is an ObjectId which identifies the task.
- We must also [get the ObjectId of the state](docs/documentation/admin/tips/find_property_objectID) in which the survey could be edited.
- An `if` statement is used to compare both ObjectIds.
:::

### Code Samples {#samples}

```javascript
function run() {
    const task = context['channel#task'];  // The context used as a variable permits extracting specific data from the object represented.
    console.log('Check survey editability.');
    if (!task) {
        console.log('No task present.');
        return [{  //Command array that must be returned.
            cmd: 'SET_READONLY',
            value: false
        }, ]
    } else if (task.status === "604bb9d827f6ba0008435eac") {  // task.status retrieves the task's current state. The number to be equaled is the ObjectId of the state in which surveys can be edited.
        console.log('Survey is editable.');
        return [{  //Command array that must be returned.
            cmd: 'SET_READONLY',
            value: false
        }, ]
    } else {
        console.log('Survey is not editable.');
        return [{  // Command array that must be returned.
            cmd: 'SET_READONLY',
            value: true
        }, ]
    }
}
```

### Expected Results {#results}
Below is an example of a survey following the logic expressed in the code used above.

_This survey finds itself in a task state which allows editing:_

<img alt="editable survey" className="img_sizing item shadow--tl" src={useBaseUrl('img/survey_editable_03.png')} />
<br/>

_The task state has changed and now the survey cannot be edited:_

<img alt="editable survey" className="img_sizing item shadow--tl" src={useBaseUrl('img/survey_editable_02.png')} />
<br/>

## Related Resources {#related}
- [Survey Admin Documentation](/docs/documentation/admin/survey/survey_overview)
- [COTSurvey data model](/docs/documentation/models/surveys/model_surveys)
- [COTTask data model](/docs/documentation/models/tasks/model_tasks)


