---
id: admin_workflow_configure
title: II. Configure Workflows
sidebar_label: II. Configure Workflows
---
import useBaseUrl from '@docusaurus/useBaseUrl'; 
import Highlight from '@theme/Highlight';

<img alt="design" className="img_sizing" src={useBaseUrl('img/design/Workflows.svg')} />
<br/>

<div className="alert alert--secondary">

## Summary
A _workflow group_ can contain one or more workflows. The workflow group and individual workflows are configured through the _workflows settings panel_. Learn here about configuring a _workflow group_, as well as how to create and configure individual _workflows_, their _states_, and SLAs.  

</div>
<br/>

## Workflows Settings Panel {#workflows-settings-panel}
 _Workflow-groups_ can be created and accessed for configuration through the [initial settings panel](/docs/documentation/admin/workflows/admin_workflow_groups#initial-settings-panel). Once accessed for configuration, you will be taken to the _workflows settings panel_, which we wil cover here. Things like the group's initial workflow, how tasks are viewed and sorted, along with other basic settings, can be configured from this settings panel.

_Below, you can see what the settings panel looks like. It has three basic sections: **Configuration** settings panel, **workflow diagram**, **workflow list**._

_In the next section you will find the descriptions of the [**Configuration**](#workflows-configuration-panel) fields._

_Whenever you [create](#create-a-single-workflow) or [edit](#edit-a-single-workflow) an individual workflow, the changes will appear in the **workflow diagram** and **workflow list**._

<img alt="settings panel" className="img_sizing_narrow item shadow--tl" src={useBaseUrl('img/admin_wfconfiguration.png')} />
<br/>
<br/>



### <span className="badge badge--secondary">Configuration Fields</span> {#workflows-configuration-panel}

<div className="container box">
<div className="row table-row-1">
<div className="col col--3"><b>Flow Type:</b></div>
<div className="col col--5">

Options are _State-machine_ or _Free_.

</div>
<div className="col col--4"><em></em></div>
</div>
<div className="row table-row-2">
<div className="col col--3"><b>Initial Workflow:</b></div>
<div className="col col--5">

Choose the _initial workflow_ from the existing workflows in the group.

</div>
<div className="col col--4"><em></em></div>
</div>
<div className="row table-row-1">
<div className="col col--3"><b>Default view:</b></div>
<div className="col col--5">

Chooses what will be the default view in the _task view_ section. Options are _Calendar view_, _Gantt view_, _Table view_, _Kanban view_, and _List view_.

</div>
<div className="col col--4"><em>This is needed for external sites that require Cotalker authentication. For security reasons, use only on trusted sites.</em></div>
</div>
<div className="row table-row-2">
<div className="col col--3"><b>Default filter:</b></div>
<div className="col col--5">

Filter used to sort tasks in the _task view_.

</div>
<div className="col col--4"><em>

Options are determined by the [global filters](/docs/documentation/client/taskview) that have been created.

</em></div>
</div>
<div className="row table-row-1">
<div className="col col--3"><b>Hide closed tasks after:</b></div>
<div className="col col--5">Closed tasks will disappear from the task view after the amount of days indicated.</div>
<div className="col col--4"><em>Closed tasks will remain in the workflows channel panel.</em></div>
</div>
<div className="row table-row-2">
<div className="col col--3"><b>Read Permissions:</b></div>
<div className="col col--5">Permissions required to view the workflows.</div>
<div className="col col--4"><em>

[List of available Read Permissions](/docs/documentation/admin/admin_accessrole#default-permissions)

</em></div>
</div>
<div className="row table-row-1">
<div className="col col--3"><b>Write Permissions:</b></div>
<div className="col col--5">Permissions required to edit the workflows.</div>
<div className="col col--4"><em>

[List of available Write Permissions](/docs/documentation/admin/admin_accessrole#default-permissions)

</em></div>
</div>

</div>
<br/>

:::warning
You may add as many permissions as you want, but do not change the previously assigned _permissions_. Nor should you change the _initial workflow_. These changes could alter existing workflows' functionality.  If you want to unassign a _permission_ or change the initial _workflow_, please check with the support team.
:::

## Create a Workflow {#create-a-single-workflow}
You can create a new workflow by pressing the <span className="badge badge--secondary">+</span> icon found in the upper right-hand corner of the [Workflows Settings Panel](#workflows-settings-panel).

After pressing the icon to create a new workflow , you will see the following settings panel:

<img alt="create workflow settings panel" className="img_sizing_narrow item shadow--tl" src={useBaseUrl('img/admin_workflows_create_workflow_00.png')} />
<br/>
<br/>

:::note
At first, you can only define general specifications for the _workflow_, but after saving the _workflow_ you can create states for it by choosing to [edit](#edit-a-single-workflow) it.
:::


### <span className="badge badge--secondary">Settings Panel Fields</span> {#create-workflow-fields}

<div className="container box">
<div className="row table-row-title">
<div className="col col--12"><b>General information</b></div>
</div>
<div className="row table-row-1">
<div className="col col--3"><b>Name:</b></div>
<div className="col col--5">Workflow's display name.</div>
<div className="col col--4"><em>It doesn't have to be unique.</em></div>
</div>
<div className="row table-row-2">
<div className="col col--3"><b>Code:</b></div>
<div className="col col--5">Workflow identification name. Only lowercase letters, numbers, and underscores are accepted. The first character must be a letter.</div>
<div className="col col--4"><em> The code cannot be edited once it is saved.</em></div>
</div>
<div className="row table-row-1">
<div className="col col--3"><b>Chat channels:</b></div>
<div className="col col--5">

Options are: _bound_, _unbound_, and _unbound-hierarchy_. Refers to the relationship between tasks and their chat channels.

</div>
<div className="col col--4"><em>

[Click here](#further-details) for more details.

</em></div>
</div>
<div className="row table-row-title">
<div className="col col--12"><b>Asset</b></div>
</div>
<div className="row table-row-2">
<div className="col col--3"><b>Type:</b></div>
<div className="col col--5">

Options are: _unique_ or _generic_.

</div>
<div className="col col--4"><em>Use the "generic" type for tasks that need to be repeated. Use "unique" for one-time tasks.</em></div>
</div>
<div className="row table-row-1">
<div className="col col--3"><b>Collection:</b></div>
<div className="col col--5">A collection, along with one of its elements, must be selected. They will define the tasks that flow through the workflow.</div>
<div className="col col--4"><em>The collection requires at least one element. Both collection and element must have been previously created.</em></div>
</div>
<div className="row table-row-2">
<div className="col col--3"><b>Element:</b></div>
<div className="col col--5">An element from the chosen collection must be selected. This element is used to define the task that flows through the workflow.</div>
<div className="col col--4"><em>This field appears once the collection is chosen.</em></div>
</div>
<div className="row table-row-title">
<div className="col col--12"><b>Additional fields</b></div>
</div>
<div className="row table-row-1">
<div className="col col--3"><b>Additional field Nº:</b></div>
<div className="col col--5">Adds a collection that is used to filter, group, or sort the tasks in the task view.</div>
<div className="col col--4"><em>Tip: The added collections with their respective elements can indicate things like task priority or corresponding company department.</em></div>
</div>
<div className="row table-row-title">
<div className="col col--12"><b>States</b></div>
</div>
<div className="row table-row-2">
<div className="col col--3"><b>State list:</b></div>
<div className="col col--5">Select the collection that has the available workflow states. The states are stored as elements in the collection.</div>
<div className="col col--4"><em>The collection –with its elements– must be previously created.</em></div>
</div>
<div className="row table-row-1">
<div className="col col--3"><b>Start form:</b></div>
<div className="col col--5">

Indicates that a survey will initialize the workflow. Remember to previously create the survey and choose it from the dropdown menu where all existing surveys will appear as options.

Once selected, the <span className="badge badge--secondary">Share</span> button will appear in [editing mode](#edit-a-single-workflow).

</div>
<div className="col col--4"><em>

Go to [Workflow Survey Triggers](/docs/documentation/admin/workflows/admin_workflow_required_survey) for more setup information.

</em></div>
</div>
<div className="row table-row-2">
<div className="col col--3"><b>+ Edit Routine</b></div>
<div className="col col--5">Routines automate processes within the workflow.</div>
<div className="col col--4"><em>

[Click here](/docs/documentation/automation/admin_routine) to learn more about routines.

</em></div>
</div>
</div>
<br/>

### Chat Channels Options (details) {#further-details}
In the [Create Workflow settings panel](#create-a-single-workflow), workflow chat channels can be set to one of three options. Each option permits a different relationship between the task and its channel. The options are explained below:

*Bound* (two-way data binding):
- Task copies main-state and sub-states to bounded channel.
- Channel can change main-state and other parameters with surveys.
- Only one task can be bound to a channel, and vice-versa.
- This channel can only be unset manually.

*Unbound* (directly assigned to a task):
- Task only sends status-updates to this channel.
- A channel may have many un-bounded tasks.
- This channel can only be unset manually.

*Unbound-Hierarchy* (related through parent)
- Task only sends status-updates to this channel.
- Doesn't have a channel id, and always checks parent on update.
- This channel will be automatically set or unset depending on the current task hierarchy.

## Edit a Workflow {#edit-a-single-workflow}
Created _workflows_ can be edited and configured exhaustively by selecting them from the _workflows list_ in the [_workflows settings panel_](#workflows-settings-panel).

Apart from the settings mentioned for [creating a workflow](#create-a-single-workflow), editing an existing workflow permits you to [create/edit states](#create-edit-single-state) and [configure service-level agreement (SLA) settings](#create-edit-sla).

_Once you open a workflow for editing, the settings panel will look something like this:_

<img alt="edit workflow settings panel" className="img_sizing_narrow item shadow--tl" src={useBaseUrl('img/admin_workflows_edit_workflow_00.png')} />
<br/>

### <span className="hero__subtitle">States Section</span> {#states-section}
As shown above, the <span className="badge badge--secondary">States</span> section contains a diagram of the _workflow states_, a table with the created _states_, along with some other settings, which are explained below.

<img alt="state fields" className="img_sizing_narrow item shadow--tl" src={useBaseUrl('img/admin_workflow_states_01.png')} />
<br/>


<div className="box container">
<div className="row table-row-1">
<div className="col col--3"><b>State list</b>:</div>
<div className="col col--5">Select the collection that has the available workflow states. The states are stored as elements in the collection.</div>
<div className="col col--4"><em>The collection –with its elements– must be previously created.</em></div>
</div>
<div className="row table-row-2">
<div className="col col--3"><b>Initial state</b>:</div>
<div className="col col--5">Indicates in which state the workflow starts off by default.</div>
<div className="col col--4"><em>

Available options are the elements present in the collection selected in the **State list** field.

</em></div>
</div>
<div className="row table-row-1">
<div className="col col--3"><b>Start form</b>:</div>
<div className="col col--5">

Indicates that a survey will initialize the workflow. Remember to previously create the survey and choose it from the dropdown menu where all existing surveys will appear as options.

Once selected, the <span className="badge badge--secondary">Share</span> button will appear.

</div>
<div className="col col--4"><em>

Go to [Workflow Survey Triggers](/docs/documentation/admin/workflows/admin_workflow_required_survey) for more setup information.

</em></div>
</div>
<div className="row table-row-2">
<div className="col col--3"><b>+ Edit Routine</b>:</div>
<div className="col col--5">Routines automate processes within the workflow.</div>
<div className="col col--4"><em>

[Click here](/docs/documentation/automation/admin_routine) to learn more about routines.

</em></div>
</div>

<div className="row table-row-1">
<div className="col col--3"><b>Share</b>:</div>
<div className="col col--5">

Press this button to get a **link** which will permit you to share the survey outside the Cotalker environment. Appears when a _survey_ is selected in the **Start form** field.

</div>
<div className="col col--4"><em>

See the [Survey](/docs/documentation/admin/survey/survey_overview) documentation for more details.

</em></div>
</div>

</div>
<br/>

To [create a new state](#create-edit-single-state), press the <span className="badge badge--secondary">+</span> icon (circled in red in the image below) in the **Workflow states** section.

<img alt="create state" className="img_sizing_narrow item shadow--tl" src={useBaseUrl('img/admin_workflow_states_02.png')} />
<br/>


In the table, you can see workflow states listed by _name_, _type_, and _date last modified_. To [edit](#create-edit-single-state) a _state_, in the _options_ column, click on the icon circled red as shown in the image below.

<img alt="create state" className="img_sizing_narrow item shadow--tl" src={useBaseUrl('img/admin_workflow_states_03.png')} />
<br/>

:::tip
- States are the different moments through which a task could pass in its lifecycle. 
- Remember that to add states to your workflow, they must previously exist as elements in a collection assigned to the workflow. 
- The collection is assigned through the **State list** field in the [workflow settings panel](#create-workflow-fields).
:::

### Create/Edit State {#create-edit-single-state}

You will be taken to the following settings panel after pressing the <span className="badge badge--secondary">+</span> create state icon or after clicking on the workflow state from the table in the [**States** section](#states-section).

<img alt="create state" className="img_sizing_narrow item shadow--tl" src={useBaseUrl('img/admin_workflows_create_state_00.png')} />
<br/>
<br/>

_Below, you will find the descriptions and notes for each field in the **Create State** settings panel._

<div className="container box">
<div className="row table-row-title">
<div className="col col--12"><b>General information</b></div>
</div>
<div className="row table-row-1">
<div className="col col--3"><b>Type:</b></div>
<div className="col col--5">

Indicates the state type. Options are: _new_ (connects with start), _in progress_ (connects to other states), or _closed_ (connects to end).

</div>
<div className="col col--4"><em>This field is mandatory.</em></div>
</div>
<div className="row table-row-2">
<div className="col col--3"><b>Elements:</b></div>
<div className="col col--5">Enter the state name.</div>
<div className="col col--4"><em>

The state should already exist as an element in the collection selected previously in the State list field in the [States](#states-section) section.

</em></div>
</div>
<div className="row table-row-title">
<div className="col col--12"><b>State changes</b></div>
</div>
<div className="row table-row-1">
<div className="col col--3"><b>+ Add state change:</b></div>
<div className="col col--5">Indicates successor states. If it is the final state, this field is not required. Multiple state changes can be added, allowing diverse courses of action.</div>
<div className="col col--4"><em>When pressed, the other fields and buttons appear.</em></div>
</div>
<div className="row table-row-2">
<div className="col col--3"><b>State:</b></div>
<div className="col col--5">Enter the name of the succeeding state.</div>
<div className="col col--4"><em>States must have been previously saved into the workflow.</em></div>
</div>
<div className="row table-row-1">
<div className="col col--3"><b>Can change:</b></div>
<div className="col col--5">

Options are: _None_, _Survey_, or _Manual_.

</div>
<div className="col col--4"><em></em></div>
</div>
<div className="row table-row-2">
<div className="col col--3"><b>Start form:</b></div>
<div className="col col--5">

Appears when the **Can change** field is set to _survey_. Indicates that a survey will initialize the workflow. Remember to previously create the survey and choose it from the dropdown menu where all existing surveys will appear as options.

</div>
<div className="col col--4"><em>

Go to [Workflow Survey Triggers](/docs/documentation/admin/workflows/admin_workflow_required_survey) for more setup information.

</em></div>
</div>
<div className="row table-row-1">
<div className="col col--3"><b>+ Edit Routine:</b></div>
<div className="col col--5">Routines automate processes within the workflow.</div>
<div className="col col--4"><em>

[Click here](/docs/documentation/automation/admin_routine) to learn more about routines.

</em></div>
</div>
<div className="row table-row-title">
<div className="col col--12"><b>Subtask</b></div>
</div>
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
<div className="row table-row-title">
<div className="col col--12"><b>Survey triggers</b></div>
</div>
<div className="row table-row-1">
<div className="col col--3"><b>+ Add Survey Trigger:</b></div>
<div className="col col--5">A survey is used to change a workflow's state. Multiple survey triggers can be added. When pressed, new fields appear.</div>
<div className="col col--4"><em>

Go to [State Survey](/docs/documentation/admin/workflows/admin_workflow_required_survey#required-survey-for-modifying-task-states) for setup information.

</em></div>
</div>
<div className="row table-row-2">
<div className="col col--3"><b>Survey:</b></div>
<div className="col col--5">Choose from existing surveys.</div>
<div className="col col--4"><em>

[Click here](/docs/documentation/admin/survey) to learn more about surveys.

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

:::tip About Subtask States
- Subtask states are intertwined with their parent workflow. Since a workflow can have diverse subtasks depending on its state, a workflow's state affects subtasks, i.e., it defines its subtasks.
- A change of workflow state must allow subtasks to change state as well. If the initial and succeeding states have the same subtask, this is not required.
- If a workflow is changing to a _closed_ type state, all of its subtasks must also be _closed_. This is not done automatically since it is an irreversible change. Therefore, before changing to the _closed_ state, all the subtasks must be manually _closed_.
:::

### SLAs {#create-edit-sla}

A service-level agreement (SLA) can be incorporated into the workflow. When a task does not change from one state to another at a pre-determined time, a routine can be built to take a course of action, like sending a reminder to whoever was assigned the task.

_The **SLAs** section is located at the bottom of the [settings panel](#edit-a-single-workflow). You should see something like this:_

<img alt="sla section" className="img_sizing_narrow item shadow--tl" src={useBaseUrl('img/admin_workflows_sla_00.png')} />
<br/>
<br/>

:::info
_For information on how to add an SLA routine to your workflow, go to the [SLA Routine](/docs/documentation/automation/sla) section._
:::