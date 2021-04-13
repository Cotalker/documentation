---
id: admin_workflow_configure
title: II. Configure Workflows
sidebar_label: II. Configure Workflows
---
import useBaseUrl from '@docusaurus/useBaseUrl'; 
import Highlight from '@theme/Highlight';

<img alt="design" className="img_sizing" src={useBaseUrl('img/design/Workflows.svg')} />
<br/>

:::note Summary
Configuring workflows and workflow groups.
:::

## Introduction {introduction}
A _workflow group_ can contain one or more workflows. The workflow group and individual workflow are configured through the _workflows settings panel_.

You can access the _workflows settings panel_ by 


## Workflows Settings Panel {#workflows-settings-panel}
 Once a _workflow-group_ is created, the group's initial workflow, along with other basic settings, can be configured from this settings panel.

Below, you can see what the settings panel looks like. It has three basic sections: **Configuration** settings panel,**workflow diagram**, **workflow list**.

<img alt="settings panel" className="img_sizing_narrow item shadow--tl" src={useBaseUrl('img/admin_wfconfiguration.png')} />
<br/>
<br/>

_Below you will find descriptions of the **Configuration** section. The setup for **workflow diagram** and **workflow list** can be found in [Create a Workflow](/docs/documentation/admin/admin_workflow#create-a-single-workflow) and [Edit a Workflow](/docs/documentation/admin/admin_workflow#edit-a-single-workflow) sections._

### - <span className="badge badge--secondary">Configuration Fields</span> {#workflows-configuration-panel}

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
<div className="col col--4"><em>[List of availavle Read Permissions](/docs/documentation/admin/admin_accessrole#default-permissions)</em></div>
</div>
<div className="row table-row-1">
<div className="col col--3"><b>Write Permissions:</b></div>
<div className="col col--5">Permissions required to edit the workflows.</div>
<div className="col col--4"><em>[List of availavle Write Permissions](/docs/documentation/admin/admin_accessrole#default-permissions)</em></div>
</div>

</div>
<br/>

:::warning
You may add as many permissions as you want, but do not change the previously assigned _permissions_. Nor should you change the _initial workflow_. These changes could alter existing workflows' functionality.  If you want to unassign a _permission_ or change the initial _workflow_, please check with the support team.
:::

### Create a Workflow {#create-a-single-workflow}
You can create a new workflow by pressing the <span className="badge badge--secondary">+</span> icon found in the upper right-hand corner of the [Workflows Settings Panel](/docs/documentation/admin/admin_workflow#workflows-settings-panel).

After pressing the icon to create a new workflow , you will see the following settings panel:

<img alt="create workflow settings panel" className="img_sizing_narrow item shadow--tl" src={useBaseUrl('img/admin_workflows_create_workflow_00.png')} />
<br/>
<br/>

:::note
At first, you can only define general specifications for the _workflow_, but after saving the _workflow_ you can create states for it by [editing](/docs/documentation/admin/admin_workflow#create-edit-single-state) it.
:::


### - <span className="badge badge--secondary">Settings Panel Fields </span> {#create-workflow-fields}

<div className="container box">
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
<div className="row table-row-1">
<div className="col col--3"><b>Additional field Nº:</b></div>
<div className="col col--5">Adds a collection that is used to filter, group, or sort the tasks in the task view.</div>
<div className="col col--4"><em>Tip: The added collections with their respective elements can indicate things like task priority or corresponding company department.</em></div>
</div>
<div className="row table-row-2">
<div className="col col--3"><b>State list:</b></div>
<div className="col col--5">The collection with the available states for tasks is to be selected. The states are stored as elements in the collection.</div>
<div className="col col--4"><em>The collection with its elements must be previously created.</em></div>
</div>
<div className="row table-row-1">
<div className="col col--3"><b>Start from:</b></div>
<div className="col col--5">Option that indicates a survey that will initialize the task.</div>
<div className="col col--4"><em>All created surveys will appear as options, but only the survey created for the task should be chosen.</em></div>
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

### - Chat Channels Options (details) {#further-details}
In the [settings panel](/docs/documentation/admin/admin_workflow#create-workflow-fields), workflow chat channels can be set to one of three options. Each option permits a different relationship between the task and its channel. The options are explained below:

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

### Edit a Workflow {#edit-a-single-workflow}
Created _workflows_ can be edited and configured exhaustively by selecting them from the _workflows list_ in the [_workflows settings panel_](/docs/documentation/admin/admin_workflow#workflows-settings-panel).

Apart from the settings mentioned for [creating a workflow](#create-a-single-workflow), editing an existing workflow permits you to [create states](#create-edit-single-state) and [configure service-level agreement (SLA) settings](create-edit-sla).

_Once you open a workflow for editing, the settings panel will look something like this:_

<img alt="edit workflow settings panel" className="img_sizing_narrow item shadow--tl" src={useBaseUrl('img/admin_workflows_edit_workflow_00.png')} />
<br/>

### - <span className="badge badge--secondary">States Section</span> {#states-section}

<div className="box container">
<div className="row table-row-1">
<div className="col col--12">

In the **states** section you can see a diagram of the _workflow states_, a table with the created _states_, along with some other settings which will be explained below.

</div>

</div>
<div className="row table-row-2">
<div className="col col--12">

Most of the settings fields are discussed [here](#create-workflow-fields).

</div>
</div>
<div className="row table-row-1">
<div className="col col--12">

In the table, you can see workflow states listed by _name_, _type_, and _date last modified_.

</div>
</div>
<div className="row table-row-2">
<div className="col col--12">

To create a new state, press the <span className="badge badge--secondary">+</span> icon in the **Workflow states** section.

</div>
</div>
<div className="row table-row-1">
<div className="col col--12">

To edit an existing _state_, click on the state listed in the _table_.

</div>
</div>
</div>
<br/>

:::tip
- States are the different moments through which a task could pass in its lifecycle. 
- Remember that to add states to your workflow, they must previously exist as elements in a collection assigned to the workflow. 
- The collection is assigned through the **State list** field in the [workflow settings panel](#create-workflow-fields).
:::

### - Create/Edit State {#create-edit-single-state}

After
<img alt="" src={useBaseUrl('img/admin_state_create.png')} />
<br/><br/>
Below you will find the description and notes for each field in the pictures above.
<br/><br/>

| Field | Description | Notes | 
| ---- | ----------- | ----- | 
| Type | State type. Corresponds to the location of the state. There are three options: closed (conects to end), in progress (connect to other states) or new (connect with to start). |  |
| Elements | Choose the element corresponding to the state you want to create | The collection was already selected on the created Statemachine. |
| Add state change | Add successor states. If it is the final state, it has none. The name of the state has to be added and the capacity for change must be defined. It could be the survey, the task-ui (task) or * (both). | The added states must already be created in the state machine. |
| State machine | Select the sub - state machine | The added state machine must already be created in the workflow |
| Add survey trigger | A survey is used to trigger the passage of the state to its successors. |  |

The Routine builder is explained in the [Routine Section](/docs/documentation/automation/admin_routine).

### - Create/Edit SLA {#create-edit-sla}

The SLA of a state machine is used to execute a routine when a task does not change from one state to another in a stipulated time. In the image, the SLA list is shown. <br/><br/>


In this section you can edit or creat a single state of a State Machine.
<img alt="" src={useBaseUrl('img/admin_sla.png')} />
<br/><br/>
Below you will find the description and notes for each field in the pictures above.
<br/><br/>

| Field | Description | Notes | 
| -- | ----- | ------------ | 
| Name |  The visual name of the SLA | It dosen't have to be unique  | 
| Code | The identifier of the SLA | It only accept lowercase, number and underscore and start with the letters. Once you create and save the code, you cannot change it.   |  |
| State types | The type of state selected is specified in the field next to it. |  |
| States | One or more of the states of the State Machine is specified. | If it is the *start*, the start of the state is the one defined by the SLA. If it is the end, it means that the start of the state is the one that stops the SLA. |
| Time Type | The option are: (1)Dynamic or (2)Static | **Dynamic** means that the time is calculated with task information. <br/> **Static** means that the time can be a specific date or calculated from amount of months, days, or hours from the date the action is executed |
| Time | The date or time is specified that the task is supposed to go from the initial state to the final state is specified. | The format for Static type is as follows: <br/>"HOURS&#124;*Number*" spedified the *number* hours from action, <br/>"DAYS&#124;*Number*" specified the *number*  days form action or <br/>"DATE&#124;$YYYY-$MM-$DDT${HH + 5}:00:000Z" specified a date.<br/> The format for Dynamic type is as follows: <br/> "DATE&#124;endDate" use the task endDate,  <br/> "DATE&#124;parent&#124;endDate" use parent task endDate |
| Reset | If active, *time* will start again when the task returns to *start state*. |  |
| Repeat | If active, *time* will cycle infinitely until the condition is met. Therefore, the SLA will be executed as many times as necessary. Otherwise, the SLA will only run once. |  |

The Routine builder is explained in the [Routine Section](/docs/documentation/automation/admin_routine).
