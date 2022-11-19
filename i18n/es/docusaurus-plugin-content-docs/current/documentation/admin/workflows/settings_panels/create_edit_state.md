---
title: Create/Edit State
---

:::caution Advertencia
Esta página aún no se encuentra traducida al español.
:::

import useBaseUrl from '@docusaurus/useBaseUrl'; 

<span className="hero__subtitle">Settings Panel Guide</span>

_States are the different moments or statuses through which a task could pass by in its lifecycle within the workflow._

## How to Create a State {#how-to-create-a-state}
To create a new state, press the <span className="badge badge--primary">+</span> icon (circled in red in the image below) in the [**states** section of the create/edit workflow settings panel](/docs/documentation/admin/workflows/settings_panels/workflow_create_edit#states).

<img alt="create state" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_workflow_state_00.png')} />
<br/>

:::tip
- New states can only be created when editing an existing workflow.
- To add states to your workflow, they **must** previously exist as _elements_ in a collection assigned to the workflow. 
- The collection is assigned through the **State list** field in the [workflow settings panel](/docs/documentation/admin/workflows/settings_panels/workflow_create_edit#states).
:::

## How to Edit a State {#how-to-edit-a-state}
Choose from the table in [**states** section of the create/edit workflow settings panel](/docs/documentation/admin/workflows/settings_panels/workflow_create_edit#states)the _state_ you wish to edit.

<img alt="create state" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_workflow_state_01.png')} />
<br/>

<div className="alert alert--secondary">

## Settings Panel Layot {#layout}

After choosing to create or edit a state, you will be taken to the following settings panel:

<img alt="create state layout" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_workflow_state_02.png')} />
<br/>

_Options:_
1. Save: save the current configuration

_Settings:_
- [**A. General information**](#create-state-general-information)
- [**B. State changes**](#state-changes)
- [**C. Subtask**](#state-subtask)
- [**D. Survey triggers**](#survey-trigger)

</div>
<br/>

<div className="alert alert--secondary">

### A. General information {#create-state-general-information}

<img alt="general information" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_workflow_state_03.png')} />
<br/>

<div className="container box">
<div className="row table-row-1">
<div className="col col--3"><b>Type</b>:</div>
<div className="col col--5">

Indicates the state type. Options are: _new_ (connects with start), _in progress_ (connects to other states), or _closed_ (connects to end).

</div>
<div className="col col--4"><em>This field is mandatory.</em></div>
</div>
<div className="row table-row-2">
<div className="col col--3"><b>Elements</b>:</div>
<div className="col col--5">Enter the state name.</div>
<div className="col col--4"><em>

The state should already exist as an element in the collection selected previously in the State list field in the [States](#states-section) section.

</em></div>
</div>
</div>
<br/>

</div>
<br/>

<div className="alert alert--secondary">

### B. State changes {#state-changes}

<img alt="state changes" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_workflow_state_04.png')} />
<br/>

<div className="container box">
<div className="row table-row-1">
<div className="col col--3"><b>+ Add state change</b>:</div>
<div className="col col--5">Indicates successor states. If it is the final state, this field is not required. Multiple state changes can be added, allowing diverse courses of action.</div>
<div className="col col--4"><em>When pressed, the other fields and buttons appear.</em></div>
</div>
<div className="row table-row-2">
<div className="col col--3"><b>State</b>:</div>
<div className="col col--5">Enter the name of the succeeding state.</div>
<div className="col col--4"><em>States must have been previously saved into the workflow.</em></div>
</div>
<div className="row table-row-1">
<div className="col col--3"><b>Can change:</b></div>
<div className="col col--5">

Creates an action button in the workflow's channel that indicates how a state change can be triggered. Options are: 
- _None_: The action button is not created. Use this option to change states through other means, like: [_survey trigger_](/docs/documentation/admin/workflows/settings_panels/create_edit_state/#survey-trigger), [_task view_](/docs/documentation/client/tasks/update_task), a [routine-stage bot](/docs/documentation/automation/bots/pbchangestate-2.1.0), or through [API](/docs/documentation/api/tasks/).
- _Survey_: A survey is added as an option in the actions button. The **start form** field appears. There you can indicate which survey should be summoned.
- _Manual_: Adds the state itself as an option in the actions button.

</div>
<div className="col col--4"><em>

[Click here](/docs/documentation/client/actions_button) to see where to find the _actions button_ in the channel and how the options appear in it.

</em></div>
</div>
<div className="row table-row-2">
<div className="col col--3"><b>Start form</b>:</div>
<div className="col col--5">

_Appears when **survey** is chosen in **Can change**._
Indicates that a survey will change the workflow's state. Remember to previously create the survey and choose it from the dropdown menu where all existing surveys will appear as options.

</div>
<div className="col col--4"><em>

Go to [Start Forms](/docs/documentation/admin/workflows/admin_workflow_required_survey) for more setup information.

</em></div>
</div>
<div className="row table-row-1">
<div className="col col--3"><b>State change permissions</b>:</div>
<div className="col col--5">Select permissions users need to change a task's state. Users are requiered to have at least one of the selected persmissions.</div>
<div className="col col--4"><em>

Users are assigned permissions through their [access roles](/docs/documentation/admin/admin_accessrole).

</em></div>

</div>
<div className="row table-row-2">
<div className="col col--3"><b>+ Edit Routine</b>:</div>
<div className="col col--5">Routines automate processes within the workflow.</div>
<div className="col col--4"><em>

[Click here](/docs/documentation/automation/admin_routine) to learn more about routines.

</em></div>
</div>

</div>
<br/>

</div>
<br/>

<div className="alert alert--secondary">

### C. Subtask {#state-subtask}

[See section below for more information about subtasks.](#about-subtasks)

<img alt="subtask" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_workflow_state_05.png')} />
<br/>

<div className="container box">

<div className="row table-row-1">
<div className="col col--3"><b>Workflow:</b></div>
<div className="col col--5">Indicates a subtask that continues through a different workflow.</div>
<div className="col col--4"><em>Only existing workflows in the workflow group can be selected.</em></div>
</div>
<div className="row table-row-2">
<div className="col col--3"><b>+ Edit Routine:</b></div>
<div className="col col--5">Routines automate processes within the workflow.</div>
<div className="col col--4"><em>

[Click here](/docs/documentation/automation/admin_routine) to learn more about routines.

</em></div>
</div>

</div>
<br/>

</div>
<br/>

<div className="alert alert--secondary">

### D. Survey triggers {#survey-trigger}

<img alt="state changes" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_workflow_state_06.png')} />
<br/>

<div className="container box">

<div className="row table-row-1">
<div className="col col--3"><b>+ Add Survey Trigger:</b></div>
<div className="col col--5">A survey that accompanies a workflow's state change. Multiple survey triggers can be added. When pressed, new fields appear.</div>
<div className="col col--4"><em>

Go to [State Start Form](/docs/documentation/admin/workflows/admin_workflow_required_survey#required-survey-for-modifying-task-states) for setup information.

</em></div>
</div>
<div className="row table-row-2">
<div className="col col--3"><b>Survey:</b></div>
<div className="col col--5">Choose from existing surveys.</div>
<div className="col col--4"><em>

[Click here](/docs/documentation/admin/survey/survey_overview) to learn more about surveys.

</em></div>
</div>
<div className="row table-row-1">
<div className="col col--3"><b>+ Edit Routine:</b></div>
<div className="col col--5">Routines automate processes within the workflow.</div>
<div className="col col--4"><em>

[Click here](/docs/documentation/automation/admin_routine) to learn more about routines.

</em></div>
</div>
</div>
<br/>

</div>
<br/>

---

## Best Practices {#best-practices}
### Task State Names {#task-state-organization}
State names should begin with a number or individual letter corresponding to their order in the group panel and task view. For example: "1. Backlog", "2. Doing", "3. Finished", "4. Unable to Complete". Since _states_ are _elements_ within _collections_, their names are configured and edited from the settings panel in the [Database panel](/docs/documentation/admin/database/admin_elements).

### Routines associated with state changes. {#routines-state-change}
A task can change from one state to another through different means, e.g., a _state start form_, a _survey trigger_, the _task view_, a _routine-stage bot_, the _action button_, or an API request. If a _routine_ is to be associated with the state change, it is highly recommended to add the _routine_ in the [**State Change**](/docs/documentation/admin/workflows/settings_panels/create_edit_state#state-changes) and not through other means, like a _survey_ or a _routine-stage bot_.

### State Change Notification {#state-change-notification}
When a state change occurs, a notification should be sent in the task's chat channel to notify users of the change. The notification can be programmed to appear through the _routines_ associated with state changes. It is recommended that notifications should include a _title_, referencing the action taken, and a _body_ indicating what can be done in the new state. 

### State Change Survey Trigger {#state-change-survey-trigger}
Use _survey triggers_ when the answer to a survey question determines the next state. For example, if a user is asked to validate a job, whether it gets validated or not will affect the status of the task.

### Surveys Associated to Task States {#survey-task-states}
If a [_survey_](/docs/documentation/admin/survey/survey_overview) is to be made available only within a specific _task state_, the _element_ that represents the _state_ must be associated with the _survey_. In case the _survey_ has to be available in more than one _task state_, a _collection_ with _elements_ that are to be required to view the _survey_ should be created.

For example, you can use an element to make a survey available in a channel at a specific moment. First, create the element and associate it manually to the survey. Then you can associate the element to the desired channel through a routine.  Afterward, when the state has changed, the associated element can be taken off the channel through another routine to make the survey no longer visible.

---

## More About Subtask States {#about-subtasks}
- Subtask states are intertwined with their parent workflow. Since a workflow can have diverse subtasks depending on its state, a workflow's state affects subtasks, i.e., it defines its subtasks.
- A change of workflow state must allow subtasks to change state as well. If the initial and succeeding states have the same subtask, this is not required.
- If a workflow is changing to a _closed_ type state, all of its subtasks must also be _closed_. This is not done automatically since it is an irreversible change. Therefore, before changing to the _closed_ state, all the subtasks must be manually _closed_.
