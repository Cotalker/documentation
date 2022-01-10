---
id: tutorial_taskview
title: Task View Tutorial
sidebar_label: Task View
---
import useBaseUrl from '@docusaurus/useBaseUrl'; 

Tutorial on how to configure the _task view_.

Time: 15 minutes

:::tip Vocabulary Note:
The _task view_ is a tool to visualize the state of workflows. The view can be modified by filters to organize and arrange the tasks as needed.
:::

## Company Requirements {#company-requirements}
#### Tutorial Objectives {#tutorial-objectives}
In our last tutorial, the Ruanda company requested a task manager. Now they want to see how to create, view and arrange tasks. They just want to see a demo, so we'll go to Cotalker's best and easiest way to manage tasks: _Task View_.

For this demo, we will create three _filters_ to sort _tasks_ according to the following criteria:
* _Status_: tasks grouped by status
* _Critical Tasks by Department_: high importance tasks grouped by department
* _My Tasks_: sort a specific user's tasks by status

We will use three built-in criteria to demonstate how to sort and arrange tasks. Plus, we will make the first two filters visible to the rest of the team. The third one will be visible only to the _user_.

## Pre-Requisites {#pre-requisites}
#### Group {#group}
* Having completed the [Create a Workflow Tutorial](create_state_machines).

#### User {#user}
* A _user_ with access to the **Task Manager Workflow-Group**.

## Steps {#steps}
### I. Create Tasks {#i-create-tasks}

<div className="alert alert--secondary">

1. From the **Main Menu Bar**, access the <span className="badge badge--primary">Task Manager</span> group.

<img alt="Main menu bar" className="img_sizing item shadow--tl" src={useBaseUrl('img/tutorial_taskview_00.png')} />
<br/>

</div>
<br/>

<div className="alert alert--secondary">

2. From the **Task Manager** channel list, press the <span className="badge badge--primary">Task View</span> button.

<img alt="add task button" className="img_sizing item shadow--tl" src={useBaseUrl('img/tutorial_taskview_01.png')} />
<br/>

  This will send you to the _Task View_ window:

<img alt="task mana" className="img_sizing item shadow--tl" src={useBaseUrl('img/tutorial_taskview_02.png')} />
<br/>

</div>
<br/>

<div className="alert alert--secondary">

3. Prese the <span className="badge badge--primary">Create new task</span> icon. A side panel will then slide open on the right:

<img alt="create new task" className="img_sizing item shadow--tl" src={useBaseUrl('img/tutorial_taskview_03.png')} />
<br/>

</div>
<br/>

<div className="alert alert--secondary">

4. Name the _task_:

    - In the **Task's name** field, type `This is the first task` and press the "Enter" key on your keyboard. 
    - The side panel will then change color.

    _Look at the following image to find the respective field:_

<img alt="task name field" className="img_sizing item shadow--tl" src={useBaseUrl('img/tutorial_taskview_04.png')} />
<br/>

</div>
<br/>

<div className="alert alert--secondary">

5. In the side panel, using the mock compnay's data, set the following:

    - **Status**: `Waiting`
    - **Assignee**: `Mario Casas`
    - **Task Importance**: `High`
    - **Department**: `Board of Directors`
    
    _Look at the following image to find the respective fields:_

<img alt="side panel" className="img_sizing item shadow--tl" src={useBaseUrl('img/tutorial_taskview_05.png')} />
<br/>

</div>
<br/>

<div className="alert alert--secondary">

6. Repeat these steps using random data to create at least five tasks. We'll use these for task viewing and sorting examples.

</div>
<br/>

### II. Create Filters {#ii-create-filters}


<div className="alert alert--secondary">

7. Create the first _filter_ (tasks grouped by status):
    1. Press the <span className="badge badge--primary">Filter</span> icon. 
    2. Then, press the <span className="badge badge--primary">Configuration</span> icon that shows up afterward. 
    3. Finally, you will see the **Filters** side panel open up on the left side of the window.

    _Follow the sequence shown below:_

<img alt="filter button" className="img_sizing item shadow--tl" src={useBaseUrl('img/tutorial_taskview_06a.png')} />
<br/>

</div>
<br/>

<div className="alert alert--secondary">

8. From the **Filters** settings panel, set up the _Filter_ as follows:
    1. In the **Preset** field, type `Status`.
    2. In the **Group by** section, press <span className="badge badge--primary">ADD CRITERIA</span>.
        - A **Field** pad will appear with options in a pull down menu. 
        - Select `Status`.
    3. In the **Order by** section, press <span className="badge badge--primary">ADD CRITERIA</span>. 
        - A **Field** pad will appear with options in a pull down menu. 
        - Select `Department`.
    4. At the bottom of the panel, activate the **Public Filter** option.

    :::note 
    The **Public Filter** option will permit each person in the company access to the _filter_.
    :::

  _You should now see your tasks arranged by status and department, somewhat like the image below:_

<img alt="status filter" className="img_sizing item shadow--tl" src={useBaseUrl('img/tutorial_taskview_07.png')} />
<br/>

</div>
<br/>

<div className="alert alert--secondary">

9. Create the second _filter_ (high importance tasks grouped by department).

    1. In the **Filters** panel, press the **Preset** field. 
        - A drop-down menu will appear. 
        - Select the _New..._ option to clear all the fields and create a new filter.

      _The image below will help you find the corresonging item:_
    
    <img alt="new filter" className="img_sizing item shadow--tl" src={useBaseUrl('img/tutorial_taskview_08.png')} />
    <br/>

    2. Set the panel as follows:
        - **Preset**: `Critical task by department`.
        - In the **Group by** section, press <span className="badge badge--primary">ADD CRITERIA</span>. Set the following: 
          - **Field**: `Department`.
        - In the **Order by** section, press <span className="badge badge--primary">ADD CRITERIA</span>. Set the following:
          - **Field**: `Status`.
        - In the **Filter by** section, press <span className="badge badge--primary">ADD FILTER</span>. Set the following:
          - **Field**: `Task-Importance`
          - **Condition**: `Equal`
          - **Task-importance**: `High`
        - Activate the `Public Filter` option.
    
    _You should now see "high" importance tasks arranged by departments:_

<img alt="my tasks filter" className="img_sizing item shadow--tl" src={useBaseUrl('img/tutorial_taskview_09.png')} />
<br/>

</div>
<br/>

<div className="alert alert--secondary">

10. Create the third _filter_ (sort a specific user's tasks by status). 

    1. As in the last step, from the **Filters** panel, press the **Preset** field and select the _New..._ option to clear all fields and create a new filter.

    2. Set the panel as follows:
        - **Preset**: `My tasks`.
        - In the **Group by** section, press <span className="badge badge--primary">ADD CRITERIA</span>. Set the following: 
            - **Field**: `Status`.
        -  In the **Filter by** section, press <span className="badge badge--primary">ADD FILTER</span>. Set the following:
            - **Field**: `Asignee`
            - **Condition**: `Equal`
            - **Value**: _your user name_
        - Deactivate the `Public Filter` option.
    
    _You should now see your personal tasks arranged by status:_

<img alt="my tasks filter" className="img_sizing item shadow--tl" src={useBaseUrl('img/tutorial_taskview_10.png')} />
<br/>
<br/>

:::note
_Once you have finished creating all the filters, you can close the settings panel._
:::

</div>
<br/>

## Result {#result}
From now on, everytime you go to the _Task view_, you can use the filter presets you have just created. To do this, simply click con the <span className="badge badge--primary">Filter</span> icon and choose a preset from the drop-down menu, as shown below:

<img alt="stored filter presets" className="img_sizing item shadow--tl" src={useBaseUrl('img/tutorial_taskview_results_00.png')} width= "60%" height= "60%" />
<br/>
<br/>

:::note
_Filters created with the **Public filter** activated will be visible to you and all other users. In this manner, strategic filters can be shared within the company._
:::

You can also adjust the _view type_. Let's practice using the _kanban view_ and see how the filtered tasks look like:

<img alt="kanban view" className="img_sizing item shadow--tl" src={useBaseUrl('img/tutorial_taskview_results_01.png')} />
<br/>
<br/>

:::tip
_Try playing around with the different views and filters to get acquainted with viewing and sorting tasks._
:::