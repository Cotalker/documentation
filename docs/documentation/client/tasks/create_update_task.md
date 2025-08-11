---
title: Create & Update Task
---
import useBaseUrl from '@docusaurus/useBaseUrl'; 

## Creating Tasks {#creating-tasks}
_Depending on workflow configurations, users can create tasks through one of the following methods:_

:::note
- In some configurations, administrators might program a [_Workflow Start Form_](/docs/documentation/admin/workflows/admin_workflow_required_survey) to appear when creating a new task. This feature permits _administrators_ make sure that _users_ correctly fill out all the necessary information for a _task_ and help teams stay informed of all created _tasks_.
- Tasks can also be created through _public surveys_ for users outside the Cotalker environment.
:::

### Creating tasks from the task view {#create-from-task-view}

_Task start survey:_
<img alt="create task" className="img_sizing item shadow--tl" src={useBaseUrl('img/client_tasks_07a.png')} />
<br/>

<div className="margin-left--lg">

1. From the task view toolbar, press the <span className="badge badge--secondary">+</span> icon.
2. A survey form opens up. 
3. Fill out the survey and press Enter to create the task.

</div>
<br/>

### Creating tasks from the channel workspace {#create-from-channel-workspace}
_By pressing the actions buttons found at the bottom of the channel workspace, a workflow start form opens up to initialize a new task._

<img alt="create task" className="img_sizing item shadow--tl" src={useBaseUrl('img/client_tasks_09.png')} />
<br/>

---

## Updating Tasks {#updating-tasks}

Depending on users' permissions and [role](#user-roles) within the task, they will be able to view or update certain task aspects. 

Once a task has been updated or modified a system message is sent to the task's chat channel notifying the change.

_Updating tasks can be carried out through various means detailed below._
:::note
If programmed by the administrator, a [_State Start Form_](/docs/documentation/admin/workflows/admin_workflow_required_survey#required-survey-for-modifying-task-states) window might also appear when trying to modify the task.
:::

### Task Details Panel {#task-details}
You can update a task by opening a the **Details** panel. Open the Details panel either in the _task_ or _group view_.

#### From the Task View {#update-task-view}

<img alt="edit task" className="img_sizing item shadow--tl" src={useBaseUrl('img/client_tasks_11a.png')} />
<br/>

#### From the Group View {#update-group-view}

<img alt="edit task" className="img_sizing item shadow--tl" src={useBaseUrl('img/client_tasks_11.png')} />
<br/>

by pressing the _title bar_ in the task's _channel workspace_ when viewing by group.

### Actions Button {#actions-button}
If configured, you can change a task's state using the _actions button_ in its channel workspace, as shown below:

<img alt="create task" className="img_sizing item shadow--tl" src={useBaseUrl('img/client_tasks_10.png')} />
<br/>
<br/>

<div className="margin-left--lg">

1. Press the _actions button_ found at the bottom of the channel workspace.
2. Select options with this icon to change the task's state to the one indicated in the menu.
3. Select options with this icon to open a survey form. Survey forms can also be configured to create or update tasks.

</div>

---

## Best Practices {#best-practices}
### Task State Names {#task-state-organization}
State names should begin with a number or individual letter corresponding to their order in the group panel and task view. For example: "1. Backlog", "2. Doing", "3. Finished", "4. Unable to Complete". Since _states_ are _elements_ within _collections_, their names are configured and edited from the settings panel in the [Database panel](/docs/documentation/admin/database/admin_elements).

### Associating Tasks from Different Workflows {#tasks-different-workflows}
If needed, [tasks that belong to different workflows can be associated with one another](/docs/documentation/admin/workflows/settings_panels/workflow_create_edit#tasks-different-workflows). 