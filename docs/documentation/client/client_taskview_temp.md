---
title: Tasks
sidebar_label: Tasks
---
import useBaseUrl from '@docusaurus/useBaseUrl'; 
import Highlight from '@theme/Highlight';

<img alt="design" className="img_title" src={useBaseUrl('img/design/Tasks.svg')} />

## Overview {#overview}

In general, a Cotalker [**task**](/docs/documentation/client/basic_concepts#tasks) is _something_ that _someone_ has to do but can be much more than that. Every **task** represents an asset and has at least a _name_, _description_, _state_, and _assignee_.

Cotalker _tasks_ exist within a [workflow](/docs/documentation/admin/workflows/admin_workflow_overview) and represent the state of a real-life task.

_Tasks_ count with a corresponding [channel workspace](/docs/documentation/client/channels). Furthermore, _tasks_ can be assigned to _users_, monitored (either by other users or automatically), and updated (manually or automatically). _Start_ and _end dates_ along with _SLAs_ can be configured to give programmed responses or notifications according to established deadlines. This amplitude of functions gives _tasks_ the versatility to adapt to each organization's needs.

Tasks can be created and updated either manually or automatically:
- manually: 
  - [tasks view toolbar](#create-from-task-view)
  - [actions button](#actions-button)
  - [task details](#task-details)
- automatically: 
  - [surveys](/docs/documentation/client/surveys) within the Cotalker environment
  - [public surveys](/docs/documentation/client/surveys) outside the Cotalker environment
  - [other automations](/docs/documentation/automation/existing_routines) available and configurable within the Cotalker environment


:::info
- To view or modify a task, users must be associated with the task and count with the corresponding permissions and [task roles](#user-roles).
- Admins can [set permissions](/docs/documentation/api/tasks/#task-permissions-for-unassigned-users) that allow unassociated users to follow or edit tasks within a task group.
:::

<br/>

By default, _tasks_ are accessed through the [task view](#tasks-view), but can be configured to be viewed through the [_group panel_](/docs/documentation/client/groups).
- From the _task view_, tasks can be organized and filtered to help users view and manage them.
- In the _group panel_, _tasks_ appear within their _task group_ (or _workflow group_). Through the group panel, you can access a task's [channel workspace](/docs/documentation/client/channels) or enter the group's _task view_.



:::tip
#### Accessing the Task View from Group View {#access-task-view}
If you are not automatically taken to the _task view_ when you choose a task group (workflow group) from the _group panel_, you can access the _tasks view_ as shown below: 

- Through the _task button_, found on top of the _group panel_:  
<img alt="task button" className="img_sizing item shadow--tl" src={useBaseUrl('img/client_tasks_00.png')} />
<br/>

- By pressing the _kebab menu icon_ in the upper-right corner of the _channel workspace_:  
<img alt="task button" className="img_sizing item shadow--tl" src={useBaseUrl('img/client_tasks_00a.png')} />
<br/>
:::

## Task View {#tasks-view}
The _task view_ is a graphic interface to view tasks at a glance. It's an easy way to search for and manage tasks, along with getting a general idea of ​​the status of tasks in your company. Furthermore, it can also cover the visualization of other implemented solutions, such as the statuses of a company's client.

There are four different _task views_: _list view_, _calendar view_, _kanban view_, and  _table view_. Each view permits different ways to visualize and handle the tasks.

:::tip
**For admins**:  
[Click here](/docs/documentation/admin/tips/task_view) for more details on configuring the task view.
:::

### List View {#list-view}
<img alt="list view" className="img_sizing item shadow--tl" src={useBaseUrl('img/client_tasks_01.png')} />
<br/>

### Calendar View {#calendar-view}
<img alt="calendar button" className="img_sizing item shadow--tl" src={useBaseUrl('img/client_tasks_02.png')} />
<br/>

### Kanban View {#kanban-view}
<img alt="kanban button" className="img_sizing item shadow--tl" src={useBaseUrl('img/client_tasks_03.png')} />
<br/>

### Table View {#table-view}
<img alt="table button" className="img_sizing item shadow--tl" src={useBaseUrl('img/client_tasks_04.png')} />
<br/>

### Menu Bar Icons {#menu-bar-icons}
From the *button bar* on the top of the _tasks_ screen, you can access the different _tasks views_ as well as other tools, like _filters_ and the creation of _new tasks_.

<div className="padding-horiz--lg">

| Action Name | Image | Description |
| ---- | ----- | ----------- |
| Create | <img alt="" src={useBaseUrl('img/taskview_add.png')} /> | Create a task/item |
| Reset | <img alt="" src={useBaseUrl('img/taskview_reset.png')} /> | Reload the page |
| Collapse | <img alt="" src={useBaseUrl('img/taskview_collapse.png')} /> | Collapse the tasks/items |
| Expand | <img alt="" src={useBaseUrl('img/taskview_expand.png')} /> | Expand the tasks/items |
| Search | <img alt="" src={useBaseUrl('img/taskview_search.png')} /> | Search for tasks/items by name |
| Filter | <img alt="" src={useBaseUrl('img/taskview_filter.png')} /> | Filter display |
| List View | <img alt="" src={useBaseUrl('img/taskview_listview.png')} /> |Vertical order |
| Calendar View | <img alt="" src={useBaseUrl('img/taskview_calendarview.png')} /> | Sort by days, weeks, or months |
| Kanban View | <img alt="" src={useBaseUrl('img/taskview_kanvanview.png')} /> |Horizontal order |
| Table View | <img alt="" src={useBaseUrl('img/taskview_tableview.png')} /> |Sort by process |

</div>



### Task Filters {#create-a-filter}
Customizing the way tasks are displayed is crucial. You can sort or filter them through multiple criteria, e.g., item status, the task's assigned user, etcetera. Up to three filters and three sorting criteria can be used per view.

When creating a filter for the first time, press the *filter button* in the top menu bar. A small *cog icon* will appear. Press it to open the *filter dialog box*. 

_Your screen should look something like this:_
<img alt="filter" className="img_sizing item shadow--tl" src={useBaseUrl('img/client_tasks_05.png')} />
<br/>

Once you are done adjusting the filters in the dialog box, it's possible to *save the filter* as a preset, so the next time the _task view_ is accessed, the saved filter will be shown as an option next to the *filter button*.

Filters can be saved for personal use or shared globally with the rest of the company by selecting the _Public filter_ option.

_Below is an example of a filter grouping tasks together by their state machine and ordering them by name alphabetically._

<img alt="task filters" className="img_sizing item shadow--tl" src={useBaseUrl('img/task_name_filter.gif')} />
<br/>

:::tip
See the [Task View Tutorial](/docs/tutorials/basic/tutorial_taskview) for more examples on using filters to organize tasks in the _task view_.
:::

### Channel Workspace in Task View {#chat-in-task}

Channel workspaces are viewable from _list_ and _kanban_ views. By simply pressing the task's _information card_, a side panel opens on the right side of the screen with access to the task's shared files and notes, chat area, and other settings.

_In **List View**, your screen will look something like this:_

<img alt="chat in task" className="img_sizing item shadow--tl" src={useBaseUrl('img/client_taskview_08.png')} />
<br/>

<div className="margin-left--lg">

**New message notification icons** appear on the _task information card_. Both new user and system messages display the notification icon. By simply clicking on the _task information card_, you open the chat area and can read and respond messages.

</div>

_Below is an example of viewing and responding task messages in **Kanban View**:_

<img alt="chat in task" className="img_sizing item shadow--tl" src={useBaseUrl('img/client_taskview_08a.gif')} />
<br/>


---

## Creating Tasks {#creating-tasks}
_Depending on workflow configurations, users can create tasks through one of the following methods:_

:::note
- In some configurations, administrators might program a [_Workflow Start Form_](/docs/documentation/admin/workflows/admin_workflow_required_survey) to appear when creating a new task. This feature permits _administrators_ make sure that _users_ correctly fill out all the necessary information for a _task_ and help teams stay informed of all created _tasks_.
- Tasks can also be created through _public surveys_ for users outside the Cotalker environment.
:::

### Creating tasks from the task view {#create-from-task-view}

_Regular task creation:_
<img alt="create task" className="img_sizing item shadow--tl" src={useBaseUrl('img/client_tasks_07.png')} />
<br/>

<div className="margin-left--lg">

1. From the task view toolbar, press the <span className="badge badge--secondary">+</span> icon.
2. A new task card opens up. 
3. Write the task's name and press Enter to create the task.

</div>
<br/>

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

### Creating tasks from the group panel {#create-from-group-panel}
_By pressing the actions buttons found at in the group panel, a workflow start form opens up to initialize a new task._

<img alt="create task" className="img_sizing item shadow--tl" src={useBaseUrl('img/client_actionsbutton_01.png')} />
<br/>
<br/>

## Updating a Task {#modifying-tasks}
Depending on users' permissions and [role](#user-roles) within the task, they will be able to view or update certain task aspects. 

Once a task has been updated or modified a system message is sent to the task's chat channel notifying the change.

_Updating tasks can be carried out through various means detailed below._
:::note
If programmed by the administrator, a [_State Start Form_](/docs/documentation/admin/workflows/admin_workflow_required_survey#required-survey-for-modifying-task-states) window might also appear when trying to modify the task.
:::

### Task Details Panel {#task-details}

You can update a task by opening a the **Details** side panel with its settings. Open the side panel either by selecting it through the _task view_ or by pressing the _title bar_ in the task's _channel workspace_ when viewing by group.

_From the Task View:_
<img alt="edit task" className="img_sizing item shadow--tl" src={useBaseUrl('img/client_tasks_11a.png')} />
<br/>

_From the Group Panel view:_
<img alt="edit task" className="img_sizing item shadow--tl" src={useBaseUrl('img/client_tasks_11.png')} />
<br/>

### Actions Button
If configured, you can change a task's state using the _actions button_ in its channel workspace, as shown below:

<img alt="create task" className="img_sizing item shadow--tl" src={useBaseUrl('img/client_tasks_10.png')} />
<br/>
<br/>

<div className="margin-left--lg">

1. Press the _actions button_ found at the bottom of the channel workspace.
2. Select options with this icon to change the task's state to the one indicated in the menu.
3. Select options with this icon to open a survey form. Survey forms can also be configured to create or update tasks.

</div>

## User Task Roles {#user-roles}
User task roles are set in the task **Details** section. If you have the proper permissions and task role, you can write the name of the user in the corresponding field.

<div className="container">
<div className="row">
<div className="col col--6">


<img alt="create task" className="img_sizing_narrow item shadow--tl" src={useBaseUrl('img/client_tasks_12.png')} />
<br/>

</div>
<div className="col col--6">

1. **Assignee**: The user in charge of carrying out the task. Only one _assignee_ can be designated at a time. By default, the _creator_ of the task is designated as the _assignee_, but can later be changed.
2. **Creator**: The user that created the task. The _creator_ can be a human or a bot.
3. **Users** (_doble-click on the user tag to shuffle through the following options_):
    - **Follower**: A _follower_ can read task details and participate in the chat area, but cannot update task states or details.
    - **Editor**: An _editor_ has read & write access on all task detail fields and can participate in the chat area.
    - **Visibility**: Users with the _visibility_ tag can view limited task details. They can participate in the chat area and view notes, but they cannot change the task's state.

</div>
</div>
</div>

---

## Best Practices {#best-practices}
### Sorting Tasks {#sorting-tasks}
Tasks should be sorted in the group panel by _states_ so that users can visually identify the state their tasks are found in. Sorting tasks by states can be set in the [layout section of the settings panel](/docs/documentation/admin/workflows/settings_panels/workflowgroup-create-edit#layout-section) by choosing the _collection_ where the workflow states are found in.

### Task State Names {#task-state-organization}
State names should begin with a number or individual letter corresponding to their order in the group panel and task view. For example: "1. Backlog", "2. Doing", "3. Finished", "4. Unable to Complete". Since _states_ are _elements_ within _collections_, their names are configured and edited from the settings panel in the [Database panel](/docs/documentation/admin/database/admin_elements).

### Associating Tasks from Different Workflows {#tasks-different-workflows}
If needed, [tasks that belong to different workflows can be associated with one another](/docs/documentation/admin/workflows/settings_panels/workflow_create_edit#tasks-different-workflows). 