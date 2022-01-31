---
id: tutorial_taskview
title: Task View Tutorial
sidebar_label: Task View
---
import useBaseUrl from '@docusaurus/useBaseUrl'; 

<span className="hero__subtitle">

Tutorial on configuring _tasks_ and using filters to organize _tasks_ in the _task view_.

</span>

Time: 15 minutes

:::tip Vocabulary Note:
The [_task view_](/docs/documentation/client/taskview) is a tool used to display and organize tasks within a workflow. Tasks can be arranged using customized filters, allowing you to view at a glance the state of tasks according to your needs. Filters can also be shared globally so that all company members can use the same criteria for organizing tasks.
:::

## Company Requirements {#company-requirements}
In our last tutorial, Ruanda requested a task manager. Now they want to see how to configure, view, and arrange tasks. They just want to see a demo, so we'll go to Cotalker's best and easiest way to manage tasks: _Task View_.

For this demo, we will create three _filters_ to sort _tasks_ according to the following criteria:
* _Status_: tasks grouped by status
* _Critical Tasks by Department_: high importance tasks grouped by department
* _My Tasks_: sort a specific user's tasks by status

We will use three built-in criteria to demonstrate how to sort and arrange tasks. Plus, we will make the first two filters visible to the rest of the team. The third one will be visible only to the _user_.

## Tutorial Objectives {#tutorial-objectives}
- [A. Configure task details](#configure-tasks)
- [B. Create first filter: status](#status-filter)
- [C. Create second filter: critical tasks by department](#department-filter)
- [D. Create third filter: my tasks](#personal-filter)

## Pre-Requisites {#pre-requisites}
#### User {#user}
- A _user_ with access to the **Task Manager Workflow-Group**. To have access, users must have the _permissions_ specified in the workflow group configuration.

#### Tasks {#tasks}
- It will be very convenient to have created about four or more tasks to work with during this tutorial. [Click here to see how to create a task.](/docs/tutorials/basic/create_state_machines#result)
- It will also be useful if you created at least one of those tasks using one of the mock users we created [previously](/docs/tutorials/basic/create_user). Remember to add the necessary permissions to the user's access role. The tasks created by another user will help us play around with the filters and see how you can display only the current user's tasks.

## Steps {#steps}
### A. Configure Task Details {#configure-tasks}

<div className="alert alert--secondary">

**I. Go to the Task Manager Workflow Group.**

<img alt="task manager" className="img_sizing item shadow--tl" src={useBaseUrl('img/tutorials/tutorial_basic_tasks_00.png')} />
<br/>

From the **Main Menu Bar**: 
- Access the <span className="badge badge--primary">Task Manager</span> group. 
- The _group panel_ will display the tasks that exist within the workflow group.

</div>
<br/>

<div className="alert alert--secondary">

**II. Access a task's details.**  
_**NOTE**: We will view two ways to access task details below._

<span className="hero__subtitle">First method: Channel Workspace.</span>
<br/><br/>

<img alt="task manager" className="img_sizing item shadow--tl" src={useBaseUrl('img/tutorials/tutorial_basic_tasks_01.png')} />
<br/>

<div className="margin-left--xl">

1. Choose a _task_ from the _task group panel_.
2. Click the _title section_ of the task's _channel workspace_. 
3. The _task details_ panel will show up. 

</div>

<span className="hero__subtitle">Second method: Task View.</span>
<br/><br/>

<img alt="task manager" className="img_sizing item shadow--tl" src={useBaseUrl('img/tutorials/tutorial_basic_tasks_03.png')} />
<br/>

<div className="margin-left--xl">

From the Task Manager _group panel_, press the task _list_ button. The _task view_ will open up.

</div>

<img alt="task manager" className="img_sizing item shadow--tl" src={useBaseUrl('img/tutorials/tutorial_basic_tasks_02.png')} />
<br/>

<div className="margin-left--xl">

_From the task view:_
1. Select a task.
2. The task workspace panel opens up.
3. Select the _Details_ tab.

</div>

</div>
<br/>


<div className="alert alert--secondary">

**III. Set task details.**

_Whether accessed from the Channel Workspace or the Task View, the Task Details panel is identical._

<div className="container">
<div className="row">
<div className="col col--6">

<img alt="task details" className="img_sizing_narrow item shadow--tl" src={useBaseUrl('img/tutorials/tutorial_basic_tasks_04.png')} />
<br/>

</div>
<div className="col col--6 margin-top--lg">

_From the Details panel:_
1. Press the **General information** tab to open up the settings panel.
2. Add _users_ that will be able to view and modify the _task_.
3. In the **Task-importance** field, choose an option.
4. In the **General Departments** field, choose an option.

</div>
</div>
</div>

:::note Next Step
Repeat this process with the remaining tasks that you have created. Configure the details differently for each task so that you can order them using diverse filters.
:::

</div>
<br/>

### B. Create Status Filter {#status-filter}

<div className="alert alert--secondary">

**I. Open the filter configuration panel.**

<img alt="task filter" className="img_sizing" src={useBaseUrl('img/tutorials/tutorial_basic_tasks_05.gif')} />
<br/>

_From the task view:_
1. Press the _filter_ icon. 
2. Then, press the _configuration_ icon that shows up afterward.
3. Finally, you will see the **Filters** configuration panel open up on the left side of the window.


</div>
<br/>

<div className="alert alert--secondary">

**II. Set up filter.**

<div className="container">
<div className="row">
<div className="col col--6">

<img alt="task filter" className="img_sizing_menu" src={useBaseUrl('img/tutorials/tutorial_basic_tasks_06.gif')} />
<br/>

</div>
<div className="col col--6 margin-top--lg">

From the **Filters** configuration panel, set up the _Filter_ as follows:
1. **Preset**: _Status_
2. In the **Group by** section, press **ADD CRITERIA**.
3. **Field**: _Status_
3. In the **Order by** section, press **ADD CRITERIA**. 
4. **Field**: _General Departments_
5. Toggle on the **Public filter** switch.
6. The _filter preset_ is automatically saved.

_You should now see your tasks arranged by status and department._

</div>
</div>
</div>
</div>
<br/>

### C. Create Critical Tasks by Department Filter {#department-filter}

<div className="alert alert--secondary">

**I. Create a new filter.**

<img alt="second filter" className="img_sizing_50" src={useBaseUrl('img/tutorials/tutorial_basic_tasks_07.png')} />
<br/>

In the **Filters** panel, 
1. Press the **Preset** field.
2. Select the _New..._ option from the dropdown menu to clear all the fields and set up the new filter.



</div>
<br/>

<div className="alert alert--secondary">

**II. Set up the filter.**

<div className="container">
<div className="row">
<div className="col col--6">

<img alt="second filter" className="img_sizing_menu" src={useBaseUrl('img/tutorials/tutorial_basic_tasks_08.png')} />
<br/>

</div>
<div className="col col--6 margin-top--lg">

1. **Preset**: _Critical task by department_
2. In the **Group by** section, press **ADD CRITERIA** and set the following: 
3. **Field**: _General Departments_
4. In the **Order by** section, press **ADD CRITERIA** and set the following:
5. **Field**: _Status_
6. In the **Filter by** section, press **ADD FILTER** and set the following:
7. **Field**: _Task-Importance_
8. **Condition**: _Equal_
9. **Task-importance**: _High_
10. Toggle on the **Public filter** switch.

_You should now only see "high" importance tasks arranged by departments in the task view._

</div>
</div>
</div>

</div>
<br/>

### D. Create My Tasks Filter {#personal-filter}

<div className="alert alert--secondary">

**I. Create a new filter.**

As in the [last step](#department-filter), from the **Filters** panel, press the **Preset** field and select the _New..._ option to clear all fields and set up the new filter.


</div>
<br/>

<div className="alert alert--secondary">

**II. Set up the filter.**

<div className="container">
<div className="row">
<div className="col col--6">

<img alt="second filter" className="img_sizing_menu" src={useBaseUrl('img/tutorials/tutorial_basic_tasks_09.png')} />
<br/>

</div>
<div className="col col--6 margin-top--lg">

1. **Preset**: _My tasks_
2. In the **Group by** section, press **ADD CRITERIA**. Set the following: 
3. **Field**: _Status_
4. In the **Filter by** section, press **ADD FILTER**. Set the following:
5. **Field**: _Assignee_
6. **Condition**: _Equal_
7. **Value**: _your user name_
8. Deactivate the **Public Filter** option.

_You should now only see your assigned tasks arranged by status._

</div>



:::note
_Once you have finished creating the filters, you can close the settings panel._
:::

</div>
</div>

</div>
<br/>


<div className="align-center">

<iframe src="https://giphy.com/embed/7yojoQtevjOCI" width="480" height="342" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/profile-notoverthehill-tomdds-7yojoQtevjOCI">via GIPHY</a></p>

</div>
<br/>

## Expected Result {#result}

From now on, everytime you go to the _Task view_, you can use the filter presets you have just created. To do this, simply click con the _filter_ icon and choose a preset from the dropdown menu, as shown below:

<img alt="result" className="img_sizing" src={useBaseUrl('img/tutorials/tutorial_basic_tasks_10.gif')} />
<br/>
<br/>

:::note
_Filters created with the **Public filter** activated will be visible to you and all other users. In this manner, strategic filters can be shared within the company._
:::

<br/>

:::tip Tutorial Tip

You can also adjust the _view type_. Let's practice using the _kanban view_ and see how the filtered tasks look like:

<img alt="kanban view" className="img_sizing item shadow--tl" src={useBaseUrl('img/tutorials/tutorial_basic_tasks_11.gif')} />
<br/>
<br/>


_**NOTE**: More views can be added to the toolbar through the [**Workflows** settings panel](/docs/documentation/admin/workflows/settings_panels/workflows-setup#configuration)._
:::

## Related Topics {#related-topics}
- [Task View](/docs/documentation/client/taskview): Getting Started Documentation