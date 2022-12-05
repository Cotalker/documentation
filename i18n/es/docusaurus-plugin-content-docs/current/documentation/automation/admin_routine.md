---
id: admin_routine
title: Routine Builder
sidebar_label: Routine Builder
---

:::caution Advertencia
Esta página aún no se encuentra traducida al español.
:::
import useBaseUrl from '@docusaurus/useBaseUrl';
import Highlight from '@theme/Highlight';

<img alt="design" className="img_sizing" src={useBaseUrl('img/design/routines.svg')} />

## Overview {#routine-overview}

The _Routine Builder_ is used to build routines in _Workflows_, _Bots_, _Schedules_, and _SLAs_. This section explains how to build a _routine_ within the mentioned processes.

_Routines_ are used to configure various actions within a company. For example, you can automate the sending of an email or a message, create a task, or change a workflow from one state to another.

- Check out the [list](/docs/documentation/automation/existing_routines#stage-list) of automations that you can include in your _routines_.

- Test your _routines_ with the [automation log](#run-routine).


<div className="alert alert--secondary">

#### Routine builder in settings panels:


<img alt="routine builder" className="img_sizing_narrow item shadow--tl" src={useBaseUrl('img/automations_routines_00.png')} />
<br/>
<br/>

#### Routine builder in workflows:

<img alt="routine builder" className="img_sizing_narrow item shadow--tl" src={useBaseUrl('img/automations_routines_01.png')} />
<br/>
<br/>

The settings panel shows a visualization of the _routine_ that has been created. A _routine_ is built by a set of _stages_ or _steps_ that can function in different ways according to the chosen type. In general, [stage types](#stage-type-list) can do the following:

* help with configuration
* make decisions based on context
* network request
* interact with the user
* edit workflow components
* update workflow components

</div>
<br/>

## Routine Setup {#setup-the-routine}

Below you will find the description and notes for each field in the Routine Builder's settings panel.

| Field | Description | Notes | 
| ---- | ----------- | ----- | 
| Initial State | Select the stage that initializes the routine. | The list shows the stages that have been created so far in this particular routine. You can fill in this field after you have added the stage or stages. |
| Max Iterations | Specifies the maximum number of stages the routine can go through. | Make sure looping stages are taken into account when specifying the maximum number of iterations. |
| Add Stage | Adds a stage to the routine. | The _code_ and _stage type_ must be specified. After that, the settings for the selected stage type will be displayed. |
| Code | Stage identification name | This field only allows lowercase letters, underscores and should always start with a letter.  |
| Type | Select the stage type. | The dropdown menu lists all the available _stage types_. Hover over the name for a brief explanation. [Click here](/docs/documentation/automation/existing_routines#stage-list) for more information. |
| Version | Select the stage type version. | Available versions will appear in the dropdown menu. For more information, [click here](/docs/documentation/automation/existing_routines#stage-type-versions).|

## Stage Type Configuration {#configure-stage-types}
After selecting <span className="badge badge--primary">+ Add Stage</span>, choose among the various _stage types_ that are made available and configure them for use within the routine. 

The **Type** field has a dropdown menu with a list of all the available _stage types_. If you hover over the name, a brief explanation of the function will be displayed. 

Once the **type** is selected, its specific settings fields will be displayed (an example is displayed below).

:::info
- Go to the [Routine Stage Types](/docs/documentation/automation/existing_routines) section for a complete list and description of **stage types**.
- On the backend, **stage types** use [COTLang](/docs/documentation/automation/cotlang/admin_cotlang) (Cotalker Script Language) for settings fields. Depending on your needs, you can input any text characters and even use _HTML_ or _COTLang_ on the various settings fields.
:::

:::caution Using variables
- Variables declared within a _stage routine_ are always read by the system as strings.
- Therefore, if you are to use a function in relation to a variable, such as to cast a number as an integer, that function must be used when the variable is being used, and not when the variable is being declared or defined.  
  
  **For example:**  
  The function `[cast=>parseInt]` **should not** be used when declaring the variable as shown below:
  ```  
  {
      "key" : "lastStock",
      "value" : "$CODE#property#qty|[cast=>parseInt]"
  },
  {
      "key" : "actualStock",
      "value" : "$VAR#lastStock|[math=>add=($VALUE#qty)]"
  },  
  ```  
  But **should rather** be used when the variable is used, as shown below:  
    ```
  {
      "key" : "lastStock",
      "value" : "$CODE#property#qty"
  },
  {
      "key" : "actualStock",
      "value" : "(($VAR#lastStock)|[cast=>parseInt])|[math=>add=($VALUE#qty)]"
  },  
    
    ```
:::

:::caution Characters that must be escaped
Since **stage type** fields have a COTLang underlying, certain characters must be escaped within all stage settings fields (except the source code in the _Custom Javascript Code_ stage type).
- If the text input is wrapped in triple backticks ` ``` `, only ``` ` ``` need to be escaped using a backslash. For example: ``` \` ```.
- Otherwise, `= | ( ) [ ] #` must be escaped. Example: ` \= `
:::

<div className="alert alert--secondary">

#### Stage Type Example {#stage-example}

_For example, if you choose the **Send gif** stage type, the following fields appear:_

<img alt="type fields" className="img_sizing_narrow item shadow--tl" src={useBaseUrl('img/automations_routines_02.png')} />
<br/>

- **Options**: In this example, the **Send gif** stage type has three options or fields: _Search_, _Channel_, and _User_.
- **Required Fields**: The _required_ fields are outlined by a red box (_Search_ and _Channel_).
- **General Field Description**: The field highlighted in red has its name at the top left (in this case: "CHANNEL"). Next to it, you can find the field's _specifications_ ("REQUIRED") and the _input type_ ([COTCHANNELID](/docs/documentation/automation/cotlang/admin_cotlang)). In italic letters, at the bottom of the box, is the explanation of the expected input ("ID OF THE CHANNEL TO WHICH THE GIF WILL BE SENT").

</div>
<br/>


## Run Routine {#run-routine}

<img alt="run routine" className="img_sizing item shadow--tl" src={useBaseUrl('img/automations_log_06.png')} />
<br/>

The <span className="badge badge--primary">Run Routine</span> button is a blue button found in the *Routine Builder*. This button opens up an automation log that will help you test and debug your routines while still building them.

To learn more about the log information shown in **Run Routine**, please refer to [Automation Log](/docs/documentation/automation/automation_log).

:::warning
*Run Routine* is **not** a "playground" or "sandbox". The routine will actually execute all the steps. So, for example, if you program the routine to send an email, it will really send the email.
You can insert mock data into the *Context* editor to avoid mishaps.
:::

## Best Practices {#best-practices}
### Routines associated with state changes. {#routines-state-change}
A task can change from one state to another through different means, e.g., a _state start form_, a _survey trigger_, the _task view_, a _routine-stage bot_, the _action button_, or an API request. If a _routine_ is to be associated with the state change, it is highly recommended to add the _routine_ in the [**State Change**](/docs/documentation/admin/workflows/settings_panels/create_edit_state#state-changes) and not through other means, like a _survey_ or a _routine-stage bot_.


