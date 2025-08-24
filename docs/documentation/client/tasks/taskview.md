---
title: Task View
---
import useBaseUrl from '@docusaurus/useBaseUrl'; 

## Overview {#overview}

The _task view_ is a graphic interface to view tasks at a glance. It's an easy way to search for and manage tasks, along with getting a general idea of ​​the status of tasks in your company. Furthermore, it can also cover the visualization of other implemented solutions, such as the statuses of a company's client.

There are four different _task views_: 
- [_list view_](#list-view), 
- [_calendar view_](#calendar-view), 
- [_kanban view_](#kanban-view), 
- and [_table view_](#table-view). 

Each view permits different ways to visualize and handle tasks.

:::tip Configuration
**Admins**: For more details on configuring the task view, [click here](/docs/documentation/admin/tips/task_view).
:::

## Menu Bar Icons {#menu-bar-icons}
From the task view title bar you can access the different _tasks views_ and _filters_.

<img alt="menu bar" className="img_sizing_small item" src={useBaseUrl('img/task_menubar.png')} />
<br/>

- **<span className="badge badge--danger">1.</span> Collapse**: Collapse or expand groupings (available in list and table views)
- **<span className="badge badge--danger">2.</span> Refresh**: Refresh task information and display
- **<span className="badge badge--danger">3.</span> Filter**: Filter tasks by criteria
- **<span className="badge badge--danger">4.</span> Sort**: Sort tasks
- **<span className="badge badge--danger">5.</span> Grouped**: Group tasks by criteria
- **<span className="badge badge--danger">6.</span> Visible**: Column visibility (only in table view)
- **<span className="badge badge--danger">7.</span> Selected Task View Name**: Displays the name of the currently selected task view
- **<span className="badge badge--danger">8.</span> Views**: Open the views panel
- **<span className="badge badge--danger">9.</span> More**: Bulk export and import of tasks (only in table view)

## Views Panel {#view-panel}

The _views panel_ is where users can create and manage custom views for tasks. This panel allows you to create personalized task views that can be either private (personal use only) or public (shared with other users). Custom views help organize and display tasks according to your specific needs and preferences.

### Accessing the View Panel {#accessing-view-panel}

The view panel can be accessed from the task view interface. It provides a centralized location to manage all your custom views.

<img alt="view panel location" className="img_sizing img_format item shadow--tl" src={useBaseUrl('img/taskview_panel_00.png')} />
<br/>

### View Panel Components {#view-panel-components}

The view panel displays all available views organized by type and visibility. Here's what you'll find in the view panel:

<img alt="view panel overview" className="img_sizing_super_small img_format shadow--tl" src={useBaseUrl('img/taskview_panel_01.png')} />
<br/>

- **<span className="badge badge--danger">1.</span> View Search**: Search for specific views by name
- **<span className="badge badge--danger">2.</span> Private Views**: Personal views visible only to you
- **<span className="badge badge--danger">3.</span> Public Views (Created by me)**: Public views that you've created and shared
- **<span className="badge badge--danger">4.</span> Public Views**: Views created and shared by other users
- **<span className="badge badge--danger">5.</span> Create New View**: Create a new custom view (table, list, kanban, or calendar) based on the workflow configuration

### Creating a New View {#creating-new-view}

To create a new custom view, click on the type of view you want to create (table, list, kanban, or calendar). A configuration panel will appear with the following options:

<img alt="create new view panel" className="img_sizing img_format item" src={useBaseUrl('img/taskview_panel_02.png')} />
<br/>

- **<span className="badge badge--danger">1.</span> View Name**: Enter a descriptive name for your view
- **<span className="badge badge--danger">2.</span> Group By**: Choose to group tasks by status or assigned user
- **<span className="badge badge--danger">3.</span> Visibility**: Select whether the view will be public (shared) or private (personal)
- **<span className="badge badge--danger">4.</span> Default State**: Choose if groups will start collapsed or expanded when the view loads

### Managing Existing Views {#managing-views}

You can modify any existing view by right-clicking on it in the view panel. This opens a context menu with the following options:

- **Edit**: Modify the view's name, visibility, view type, or default collapse state
- **Delete**: Remove the view permanently

:::note Automatic Saving
When you're working within a custom view and modify filters, grouping, or task sorting, all changes are automatically saved to that view. This means each view maintains its own unique configuration and display preferences.
:::

### View Types and Configurations {#view-types-configurations}

The types of views available for creation depend on your workflow's configuration. Administrators can enable or disable specific view types for each workflow group. The available options typically include:

- **List View**: Vertical task display with grouping options
- **Kanban View**: Card-based horizontal task organization
- **Calendar View**: Time-based task visualization
- **Table View**: Structured tabular task display

## Available Task Views {#views}

### List View {#list-view}
_Displays tasks in a vertical view, sorting them in groups according to the filters being used. The List View has a space designated for the [task workspace](/docs/documentation/client/tasks/task_workspace)._

<img alt="list view" className="img_sizing img_format item shadow--tl" src={useBaseUrl('img/task_listview.png')} />
<br/>

### Calendar View {#calendar-view}
_Displays tasks in a calendar. The calendar can be set to day, week, or month view._

<img alt="calendar button" className="img_sizing img_format item shadow--tl" src={useBaseUrl('img/task_calendarview.png')} />
<br/>

### Kanban View {#kanban-view}
_Displays tasks as cards and sorts them horizontally according to the filters being used. The [task workspace](/docs/documentation/client/tasks/task_workspace) can be accessed in this view._

<img alt="kanban button" className="img_sizing img_format item shadow--tl" src={useBaseUrl('img/task_kanbanview.png')} />
<br/>

### Table View {#table-view}
_Tasks are displayed in a table and divided by task status (workflow state)._

<img alt="table button" className="img_sizing img_format item shadow--tl" src={useBaseUrl('img/task_tableview.png')} />
<br/>






