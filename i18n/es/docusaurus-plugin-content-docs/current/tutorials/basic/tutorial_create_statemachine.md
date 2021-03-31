---
id: create_state_machines
title: Create a Workflow
author: Edward Alvarado
author_title: CTO
author_url: https://www.cotalker.com/
author_image_url: https://avatars1.githubusercontent.com/u/3951895?v=4
tags: [company, tasks, state machine, example]
---
import useBaseUrl from '@docusaurus/useBaseUrl'; 

Tutorial on how to create a _workflow_.

Time: 30 minutes

:::tip Vocabulary Note:
A _workflow_ is the configuration of the various states a task can assume. _Users_ can be given access to see and modify the current state of a task.
:::

## Company Requirements {#company-requirements}
#### Tutorial Objectives {#tutorial-objectives}
The company requests a _task manager_. For now, they only want to see a demo. Therefore, we will create in this tutorial a simple task manager. If they were to like the demo and sign up for this service, configuring the actual workflows and expanding to all departments will be more complicated. You'll get a complete walkthrough on creating complex workflows in the [advanced tutorial section](../advanced/project_manager).

For this demo, you will create a _task manager_ with the following categories:
- **State of the Task**:
    - Backlog
    - Doing
    - Waiting
    - Ready
    - Not implemented
- **Importance of the Task**:
    - High
    - Normal
    - Low
- **Department of the assigned task**
- **Associated project**


## Pre-Requisites {#pre-requisites}
#### Access Role {#access-role}
* _User_ with the `admin-statemachines-write`, `admin-bots-write`, `admin-properties-write`, `admin-accesscontrol-write`, and `admin-groups-write` permissions to create and modify workflows, bots, properties, and groups. 
* Or the `admin-*-write` permission which allows all of the above. 
* _User_ with the `read admin` access role.

#### User {#user}
* Having completed the [Create User Tutorial](/docs/tutorials/basic/create_user).

#### Database {#database}
* Having completed the [Create Collection Tutorial](/docs/tutorials/basic/create_database)
* Three new collections:
  * Collection: __Task-States__ 
    * Element: *Backlog*
    * Element: *Doing*
    * Element: *Waiting*
    * Element: *Ready*
    * Element: *Not implemented*
  * Collection: __Task-Asset__
    * Element: *task*
  * Collection: __Task-Importance__
    * Element: *High*
    * Element: *Normal*
    * Element: *Low*

    **Note**: The _code_ for each collection and element will be up to you.


#### Group {#group}
* Having completed the [Create Group & Channels Tutorial](/docs/tutorials/basic/create_group).
* Create a *workflow-group* in the *Workflow Section* with the following specifications:
  - **Name**: `Task Manager`
  - **Code**: `taskmanager_1`
  - Set up the icon section as you prefer.
  - Activate the **Allow channel creation** option.

## Steps {#steps}
### I. Create a New Workflow {#i-create-a-new-workflow}
<div class="alert alert--secondary">

1. From the **Main Menu Bar**, access the <span class="badge badge--primary">Administrator</span> and open the <span class="badge badge--primary">Workflow Section</span>.

</div>
<br/>

<div class="alert alert--secondary">

2. Press the *Task Manager* workflow-group.

<img alt="workflow-group" class="img_sizing item shadow--tl item shadow--tl" src={useBaseUrl('img/tutorial_workflow_00.png')} />
<br/>

:::note
- The _Task Manager_ workflow-group had to be [previously created for this tutorial](#group).
:::

</div>
<br/>

<div class="alert alert--secondary">

3. Press the <span class="badge badge--primary">+</span> button to create a new _workflow_.

<img alt="create workflow" class="img_sizing item shadow--tl item shadow--tl" src={useBaseUrl('img/tutorial_workflow_01.png')} />
<br/>

_The following settings panel will show up:_

<img alt="workflow settings panel" class="img_sizing item shadow--tl" src={useBaseUrl('img/tutorial_workflow_02.png')} />
<br/>

</div>
<br/>

<div class="alert alert--secondary">

4. Set up the following fields:
    * **Name**: `Task Manager Flow`
    * **Code**: `taskmanagerflow_1`
    * **Collection**: `Task Asset`
    * **Element**: `Task`
    * **Additional Field 1**: `Task-Importance`
    * **Additional Field 2**: `Department`
    * **States List**: `Task-States`

  :::note Configuration Note:
  The _Element_ field only appears after the _Collection_ field is set.
  :::

</div>
<br/>

<div class="alert alert--secondary">

5. Press <span class="badge badge--primary">Save</span>.

</div>
<br/>

### II. Configure the Workflow {#ii-configure-the-workflow}

<div class="alert alert--secondary">

6. From the <span class="badge badge--primary">Workflows</span> settings panel, click on the newly created *Task Manager Flow* workflow for editing.

  _The following image will help you find where the Task Manager Flow workflow is located._

<img alt="task manager" class="img_sizing item shadow--tl" src={useBaseUrl('img/tutorial_workflow_03.png')} />
<br/>

  _Once you enter the workflow, you should see the following:_

<img alt="settings panel" class="img_sizing item shadow--tl" src={useBaseUrl('img/tutorial_workflow_04.png')} />
<br/>

</div>
<br/>

<div class="alert alert--secondary">

7. Create the five different _states_ that tasks will be enabled to assume.
    
    1. Create the first out of five _states_:
        1. From the <span class="badge badge--primary">Create Workflow</span> settings panel, go to the <span class="badge badge--primary">States</span> section and press the <span class="badge badge--primary">+</span> button as shown in the picture:

           ![create state](/img/tutorial_workflow_05.png)
        2. The following settings panel will open up:
           
           ![create state settings panel](/img/tutorial_workflow_06.png)
        
        3. Set the following fields:
            - **Type**: `NEW`
            - **Elements**: `Backlog`
        4. Press <span class="badge badge--primary">Save</span>.
        
    2. Repeat the previous steps to create the remaining _states_, but fill in the fields as follows:
        1. Second state:
            - **Type**: `IN-PROGRESS`
            - **Elements**: `Doing`
        2. Third state:
            - **Type**: `IN-PROGRESS`
            - **Elements**: `Waiting`
        3. Fourth state:
            - **Type**: `CLOSED`
            - **Elements**: `Ready`
        4. Fifth state:
            - **Type**: `CLOSED`
            2. **Elements**: `Not implemented`

</div>
<br/>

<div class="alert alert--secondary">

8. From the <span class="badge badge--primary">Create Workflow</span> settings panel, go to the <span class="badge badge--primary">States</span> section and set the **Initial State**: to `Backlog`.

  _Your screen should look something like this:_

<img alt="workflow" class="img_sizing item shadow--tl" src={useBaseUrl('img/tutorial_workflow_07.png')} />
<br/>

</div>
<br/>

<div class="alert alert--secondary">


9. Associate the _states_ among themselves.
    
    1. Configure the ***Backlog*** state.
        1. From the list of _states_ in the <span class="badge badge--primary">States</span> section, click the ***Backlog*** state. The following settings panel will appear:

        ![create state](/img/tutorial_workflow_08.png)

        2. In the <span class="badge badge--primary">State changes</span> section, press <span class="badge badge--primary">+ Add State Change</span>. The following fields will appear:

        ![state changes](/img/tutorial_workflow_09.png)

        3. Set up the following fields: 
            * **State**: `Doing`
            * **Can change**: `*`
        4. Add the next state change.
            1. Press <span class="badge badge--primary">+ Add State Change</span>
            2. Set up the following fields: 
                * **State**: `Waiting`
                * **Can change**: `*`
        5. Add the next state change.
            1. Press <span class="badge badge--primary">+ Add State Change</span>
            2. Set up the following fields: 
                * **State**: `Ready`
                * **Can change**: `*`    
        5. Add the next state change.
            1. Press <span class="badge badge--primary">+ Add State Change</span>
            2. Set up the following fields: 
                * **State**: `Not implemented`
                * **Can change**: `*`
        6. Press <span class="badge badge--primary">Save</span>.

        _Your screen should have looked something like this:_
        ![Backlog state change](/img/tutorial_sm_creat2.png)
    ------
    2. Configure the ***Doing*** state.
        1. From the list of _states_ in the <span class="badge badge--primary">States</span> section, click the ***Doing*** state.
        2. Press <span class="badge badge--primary">+ Add State Change</span> and set the following:
            * **State**: `Backlog`
            * **Can change**: `*`
        3. Press <span class="badge badge--primary">+ Add State Change</span> and set the following:
            * **State**: `Waiting`
            * **Can change**: `*`
        4. Press <span class="badge badge--primary">+ Add State Change</span> and set the following:
            * **State**: `Ready`
            * **Can change**: `*`
        5. Press <span class="badge badge--primary">Save</span>.
    ------
    3. Configure the ***Waiting*** state.
        1. From the list of _states_ in the <span class="badge badge--primary">States</span> section, click the ***Waiting*** state.
        2. Press <span class="badge badge--primary">+ Add State Change</span> and set the following:
            * **State**: `Doing`
            * **Can change**: `*`
        3. Press <span class="badge badge--primary">+ Add State Change</span> and set the following:
            * **State**: `Ready`
            * **Can change**: `*`
        4. Press <span class="badge badge--primary">Save</span>.
    ------
    4. Configure the ***Not implemented*** state.
        1. From the list of _states_ in the <span class="badge badge--primary">States</span> section, click the ***Not implemented*** state.
        2. Press <span class="badge badge--primary">+ Add State Change</span> and set the following:
            * **State**: `Backlog`
            * **Can change**: `*`
        3. Press <span class="badge badge--primary">Save</span>.

    --------

<br/>

_You should see something like this on your screen:_

<img alt="state machine ready" class="img_sizing item shadow--tl" src={useBaseUrl('img/tutorial_workflow_10.png')} />
<br/>

__Now your workflow is ready. It only needs to be associated to the *Task Manager* workflow-group__.

</div>
<br/>

<div class="alert alert--secondary">

10. Press <span class="badge badge--primary">Save</span>.

</div>
<br/>

### III. Associate the Workflow to the Workflow-Group {#iii-associate-the-workflow-to-the-workflow-group}

<div class="alert alert--secondary">

11. After saving, you are sent back to the <span class="badge badge--primary">Workflows</span> settings panel. 

_You will see the following screen:_

<img alt="task manager" class="img_sizing item shadow--tl" src={useBaseUrl('img/tutorial_workflow_11.png')} />
<br/>

</div>
<br/>

<div class="alert alert--secondary">

12. Set the following:
    * **Initial workflow**: `Task Manager Flow`
    * **Default view**: `Kanbanview`
    * **Hide closed tasks after**: `100`
    * **Read permissions**: `admin-*-read`
    * **Write permissions**: `admin-*-write`

</div>
<br/>

<div class="alert alert--secondary">

13. Press <span class="badge badge--primary">Save</span>.

</div>
<br/>

<iframe src="https://giphy.com/embed/3o7btNa0RUYa5E7iiQ" width="90%" height="90%" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/latenightseth-boom-3o7btNa0RUYa5E7iiQ">via GIPHY</a></p>

_Congratulations! You have a Task Manager!_

## Result {#result}

The _Task Manager Workflow-Group_ should look something like this:


<img alt="task manager view" class="img_sizing item shadow--tl" src={useBaseUrl('img/tutorial_workflow_12.png')} />
<br/>
<br/>

In our [next tutorial](/docs/tutorials/basic/tutorial_taskview) we'll see how to create, view and arrange _tasks_.

