---
id: taskview
title: Tasks
sidebar_label: Tasks
---
import useBaseUrl from '@docusaurus/useBaseUrl'; 
import Highlight from '@theme/Highlight';

<img alt="design" class="img_sizing" src={useBaseUrl('img/design/Tasks.svg')} />

## Overview {#overview}

<div className="alert alert--primary">

A Cotalker **task** is basically _something_ that _someone_ has to do, but it is not limited to that. Every **task** represents an asset and has at least a _name_, _description_, _state_, and _assignee_. Other options are also available, e.g., _chat channels_, _users_, _start and end dates_, _SLAs_, and more. This amplitude of functions gives **tasks** great versatility that can adapt to each company's needs.

_Tasks_ are found within a [workflow group](/docs/documentation/client/groups_channels). They can be created manually –either through the [tasks view](/docs/documentation/client/taskview#creating-and-modifying-tasks) or the [actions button](/docs/documentation/client/groups_channels#floating-action-button-fab)– or automatically through internal or external [surveys](/docs/documentation/client/surveys). Our tools permit _tasks_ to be assigned, monitored, and updated.

</div>

## Tasks Views {#tasks-views}
_Tasks views_ are an easy way to search for and manage tasks, along with getting a general idea of ​​the status of tasks in your company. Furthermore, it can also cover the visualization of other implemented solutions, such as a company client's statuses.

Through the *task button* – found on top of the _group_ menu bar – you can access the _tasks view_. 

<img alt="task button" className="img_sizing item shadow--tl" src={useBaseUrl('img/client_tasks_00.png')} />
<br/>

There are four different _task_ views: _list view_, _calendar view_, _kaban view_, and  _table view_. Each view permits different ways to visualize and handle the tasks.

#### List View {#list-view}
<img alt="list view" className="img_sizing item shadow--tl" src={useBaseUrl('img/client_tasks_01.png')} />
<br/>

#### Calendar View {#calendar-view}
<img alt="calendar button" className="img_sizing item shadow--tl" src={useBaseUrl('img/client_tasks_02.png')} />
<br/>

#### Kaban View {#kaban-view}
<img alt="kaban button" className="img_sizing item shadow--tl" src={useBaseUrl('img/client_tasks_03.png')} />
<br/>

#### Table View {#kaban-view}
<img alt="table button" className="img_sizing item shadow--tl" src={useBaseUrl('img/client_tasks_04.png')} />
<br/>


## Menu Bar Icons {#menu-bar-icons}
From the *button bar* on the top of the _tasks_ screen, you can access the different _tasks views_ as well as other tools, like _filters_ and the creation of _new tasks_.

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

## Create a Filter {#create-a-filter}
Customizing the display of elements is crucial. You can sort or filter them through multiple criteria – e.g., item status, the task's assigned user, etcetera. Up to three filters and three sorting criteria can be used per view.

When creating a filter for the first time, press the *filter button* in the top menu bar. A small *cog icon* will appear. Press it to open the *filter dialog box*. 

_Your screen should look something like this:_
<img alt="filter" className="img_sizing item shadow--tl" src={useBaseUrl('img/client_tasks_05.png')} />
<br/>

Once you are done adjusting the filters in the dialog box, it's possible to *save the filter* as a preset, so the next time the _task view_ is accessed, the saved filter will be shown as an option next to the *filter button*.

## Chat in Task View {#chat-in-task}

Chat channels are also viewable from _task views_. By simply pressing the task's information box, the task's chat channel will appear on a side panel.

_Your screen will look something like this:_
<img alt="chat in task" className="img_sizing item shadow--tl" src={useBaseUrl('img/client_tasks_08.png')} />
<br/>

## Creating Tasks {#creating-tasks}
If configured, you can create tasks from the _actions button_ in the workflow's channel, as shown below:
<img alt="create task" className="img_sizing item shadow--tl" src={useBaseUrl('img/client_tasks_09.png')} />
<br/>

You can manually **create a task** from within the _task views_ by pressing the <span className="badge badge--secondary">+</span> icon in the menu bar. A new task will appear in the list where you can name the task, and a side panel will open up with all the options needed to assign it to someone, establish its status and deadline, among other options.

<img alt="create task" className="img_sizing item shadow--tl" src={useBaseUrl('img/client_tasks_07.png')} />
<br/>
<br/>

:::note
- In some configurations, administrators might program a [_workflow start survey_](/docs/documentation/admin/workflows/admin_workflow_required_survey) to appear when creating a new task. This feature permits _administrators_ make sure that _users_ correctly fill out all the necessary information for a _task_ and help teams stay informed of all created _tasks_.
- Tasks can also be created through _public surveys_ for users outside the Cotalker environment.
:::

## Modifying a Task {#modifying-tasks}
If configured, you can change a task's state using the _actions button_ in its channel, as shown below.

<img alt="create task" className="img_sizing item shadow--tl" src={useBaseUrl('img/client_tasks_10.png')} />
<br/>


You can also modify an existing _task_ by opening its configuration side panel either by selecting it through the _task view_ or by pressing the _title bar_ in the task's channel.

#### _Task view:_
<img alt="edit task" className="img_sizing item shadow--tl" src={useBaseUrl('img/client_tasks_06.png')} />
<br/>

#### _Task's channel:_
<img alt="edit task" className="img_sizing item shadow--tl" src={useBaseUrl('img/client_tasks_11.png')} />
<br/>



:::note
- In the _task view_, if the _task_ has a _channel_ associated with it, the _channel_ will open up first in the side panel. Press the channel's title bar, and the configuration side panel will then open up. 
- If programmed by the administrator, a _state survey_ window might also appear when trying to modify the task.
:::
