---
title: Workflows Setup
---

:::caution Advertencia
Esta página aún no se encuentra traducida al español.
:::

import useBaseUrl from '@docusaurus/useBaseUrl'; 

<span className="hero__subtitle">Settings Panel Guide</span>

_Configure the workflow group. Create and edit workflows within a workflow group._

## Access the Panel {#access}

From the [Initial Settings Panel (Workflow Groups)](/docs/documentation/admin/workflows/settings_panels/workflowgroups-initial), press the corresponding icon from the _workflow group list_.

<img alt="access workflow setup" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_workflow_setup_00.png')} />
<br/>


<div className="alert alert--secondary">

## Settings Panel Layout {#settings-panel-layout}

After choosing to set up workflows, the following **Workflows** settings panel opens up:

<img alt="settings panel layout" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_workflow_setup_01.png')} />
<br/>

_Options and Settings:_
1. Display workflow diagrams in panel (4)
2. [Add workflow](/docs/documentation/admin/workflows/settings_panels/workflow_create_edit): create a new workflow in the workflow group
3. [Configuration](#configuration): configure workflow group
4. Workflow diagrams: [edit workflow](/docs/documentation/admin/workflows/settings_panels/workflow_create_edit)
5. Workflow list: [edit workflow](/docs/documentation/admin/workflows/settings_panels/workflow_create_edit)

</div>
<br/>


<div className="alert alert--secondary">

### Configuration {#configuration}

<img alt="configuration" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_workflow_setup_02.png')} />
<br/>

<div className="container box">
<div className="row table-row-1">
<div className="col col--3"><b>Flow Type:</b></div>
<div className="col col--5">

Determines how tasks transition from one state to another, i.e., either _freely_ or through a _state-machine_ process.

</div>
<div className="col col--4"><em>

- **State-machine**: Task state transitions much be predetermined in the setup.
- **Free**: Tasks can freely change from one state to another.

</em></div>
</div>
<div className="row table-row-2">
<div className="col col--3"><b>Initial Workflow:</b></div>
<div className="col col--5">

Choose the _initial workflow_ from the existing workflows in the group.

</div>
<div className="col col--4"><em></em></div>
</div>

<div className="row table-row-1">
<div className="col col--3"><b>Available Views:</b></div>
<div className="col col--5">

Indicates how users can view tasks within the task-view. The options will be made available through icons in the [task-view toolbar](/docs/documentation/client/taskview#menu-bar-icons).

</div>
<div className="col col--4"><em>

Options are _Calendar view_, _Table view_, _Kanban view_, and _List view_.

</em></div>
</div>

<div className="row table-row-2">
<div className="col col--3"><b>Default view:</b></div>
<div className="col col--5">

Indicates the default view in the _task view_ section. Options are _Calendar view_, _Gantt view_, _Table view_, _Kanban view_, and _List view_.

</div>
<div className="col col--4"><em></em></div>
</div>
<div className="row table-row-1">
<div className="col col--3"><b>Default filter:</b></div>
<div className="col col--5">

Filter used by default to sort tasks in the _task view_.

</div>
<div className="col col--4"><em>

Options are determined by the [global filters](/docs/documentation/client/taskview#create-a-filter) that have been created.

</em></div>
</div>
<div className="row table-row-2">
<div className="col col--3"><b>Hide closed tasks after:</b></div>
<div className="col col--5">Closed tasks will disappear from the task view after the amount of days indicated.</div>
<div className="col col--4"><em>Closed tasks will remain in the workflows channel panel.</em></div>
</div>
<div className="row table-row-1">
<div className="col col--3"><b>User bot name:</b></div>
<div className="col col--5">Code name of automatically-created bot associated with the workflow group.</div>
<div className="col col--4"><em>The name is automatically generated using the workflow group's code name as reference.</em></div>
</div>
<div className="row table-row-2">
<div className="col col--3"><b>Access roles:</b></div>
<div className="col col--5">Access roles that allow the bot to act upon the workflow.</div>
<div className="col col--4"><em></em></div>
</div>
<div className="row table-row-1">
<div className="col col--3"><b>Read Permissions:</b></div>
<div className="col col--5">Permissions that allow users to view task settings.</div>
<div className="col col--4"><em>

[List of available Read Permissions](/docs/documentation/admin/admin_accessrole#default-permissions)

</em></div>
</div>
<div className="row table-row-2">
<div className="col col--3"><b>Write Permissions:</b></div>
<div className="col col--5">Permissions that allow users to edit task settings.</div>
<div className="col col--4"><em>

[List of available Write Permissions](/docs/documentation/admin/admin_accessrole#default-permissions)

</em></div>
</div>

</div>
<br/>

:::note Attention
You may add as many permissions as you want, but do not change the previously assigned _permissions_. Nor should you change the _initial workflow_. These changes could alter the functionality of existing workflows.  If you want to unassign a _permission_ or change the initial _workflow_, please check with the support team.
:::

</div>
<br/>

## Related Topics {#related-topics}
- [**Create a Workflow Tutorial**](/docs/tutorials/basic/create_state_machines)