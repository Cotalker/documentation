---
title: Task View
---
import useBaseUrl from '@docusaurus/useBaseUrl'; 

The _task view_ is a graphic interface to view tasks at a glance. It's an easy way to search for and manage tasks, along with getting a general idea of ​​the status of tasks in your company. Furthermore, it can also cover the visualization of other implemented solutions, such as the statuses of a company's client.

There are four different _task views_: _list view_, _calendar view_, _kanban view_, and  _table view_. Each view permits different ways to visualize and handle tasks.

:::tip Configuration
**Admins**: For more details on configuring the task view, [click here](/docs/documentation/admin/tips/task_view).
:::

## Task Views {#views}

### List View {#list-view}
_Displays tasks in a vertical view, sorting them in groups according to the filters being used. The List View has a space designated for the task workspace._

<img alt="list view" className="img_sizing item shadow--tl" src={useBaseUrl('img/task_listview.png')} />
<br/>

### Calendar View {#calendar-view}
_Displays tasks in a calendar. The calendar can be set to day, week, or month view._

<img alt="calendar button" className="img_sizing item shadow--tl" src={useBaseUrl('img/task_calendarview.png')} />
<br/>

### Kanban View {#kanban-view}
_Displays tasks as cards and sorts them horizontally according to the filters being used. The task workspace can be accessed in this view._

<img alt="kanban button" className="img_sizing item shadow--tl" src={useBaseUrl('img/task_kanbanview.png')} />
<br/>

### Table View {#table-view}
_Tasks are displayed in a table and divided by task status (workflow state)._

<img alt="table button" className="img_sizing item shadow--tl" src={useBaseUrl('img/task_tableview.png')} />
<br/>

## Menu Bar Icons {#menu-bar-icons}
From the task view title bar you can access the different _tasks views_ and _filters_.

<img alt="menu bar" className="img_sizing_small item shadow--tl" src={useBaseUrl('img/task_menubar.png')} />
<br/>

- **<span className="badge badge--danger">1.</span> Restore**: Refresh task information and display.
- **<span className="badge badge--danger">2.</span> Filter**: Order and sort tasks
- **<span className="badge badge--danger">3.</span> List View**: Vertical display
- **<span className="badge badge--danger">4.</span> Calendar View**: Display tasks by days, weeks, or months
- **<span className="badge badge--danger">5.</span> Kanban View**: Horizontal display
- **<span className="badge badge--danger">6.</span> Table View**: Sort by state

## Task Workspace {#workspace}
The **task workspace** allows users to access a task's chat channel, files and notes associated with the task, and task settings. Through these sections, users associated with a task can communicate, share data, update tasks, and much more.

Task workspaces are viewable from [_list_](#list-view) and [_kanban_](#kanban-view) views. By simply clicking on a _task_, a side panel opens on the right side of the screen with access to the task's workspace. 

_Below is an example of how the task workspace is accessed:_

<img alt="task workspace" className="img_sizing item shadow--tl" src={useBaseUrl('img/task_workspace_access_01.gif')} />
<br/>

_Task workspace layout:_

<img alt="task workspace" className="img_sizing item shadow--tl" src={useBaseUrl('img/task_workspace_access_00.png')} />
<br/>

- **<span className="badge badge--danger">A.</span> Task Workspace**: This side panel slides open when a task is selected.
- **<span className="badge badge--warning">1.</span> [Files](/docs/documentation/client/tasks/task_notes)**: Dispalys shared files and notes. Notes can also be edited from here. 
- **<span className="badge badge--success">2.</span> [Chat](/docs/documentation/client/tasks/task_chat)**: Accesses the chat area which displays user and system messages, survey forms, and shared files.
- **<span className="badge badge--info">3.</span> [Details](/docs/documentation/client/tasks/task_details)**: View and edit task settings.



## Task Filters {#create-a-filter}
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

---

## Best Practices {#best-practices}
### Sorting Tasks {#sorting-tasks}
Tasks should be sorted in the group panel by _states_ so that users can visually identify the state their tasks are found in. Sorting tasks by states can be set in the [layout section of the settings panel](/docs/documentation/admin/workflows/settings_panels/workflowgroup-create-edit#layout-section) by choosing the _collection_ where the workflow states are found in.






