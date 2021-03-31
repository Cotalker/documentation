---
id: create_survey_sm
title: Create Survey that Starts a Workflow
author: Valentina Martínez
author_url: https://www.cotalker.com/
---
import useBaseUrl from '@docusaurus/useBaseUrl'; 

Time: 30 minutes

## Company Requirements {#company-requirements}
Let's continue the tutorial with our mock company, Ruanda. Two tutorials ago, we started making a [task manager](/docs/tutorials/basic/create_state_machines) and then we saw how to [create tasks from within the _task view_](/docs/tutorials/basic/tutorial_taskview). The company liked the demo, but they want to know if there's an easier way for _users_ to create _tasks_. In this section, we'll see how to create a _task_ using a _survey_ associated with a _bot_.

## Pre-Requisites {#pre-requisites}

#### Access Role {#access-role}
* _User_ with the `admin-statemachines-write`, `admin-bots-write`, `admin-properties-write`, and `admin-groups-write` permissions to create and modify workflows, bots, proeperties, and groups. 
* Or`admin-*-write` which allows all of the above. 
* _User_ with the `full admin` access role.

#### Database {#database}
* Having completed the [Create Collection Tutorial](/docs/tutorials/basic/create_database).
* Have the _Department_ collection still activated.

#### Workflow {#workflow}
* Having completed the [Create a Worflow Tutorial](/docs/tutorials/basic/create_state_machines).
* Have the _Task Manager_ workflow-group still activated.
* Copy either the workflow-group's _id_ number or its _code_.

  :::note 
    - The _id_ can be obtained by copying the number that appears in the URL when accessing the _Task Manager_ workflow-group.
    - The _code_ can be obtained from _Task Manager_ workflow-group's settings panel.
    - Be sure to respectively replace the *-group id-* or the *-group code-* tags used in this tutorial with the _id_ or _code_ you retrived from your computer.
  :::

#### Survey {#survey}
* Having completed the [Create Survey Tutorial](/docs/tutorials/basic/create_survey)

## Steps {#steps}
### I. Create the Survey Form {#i-create-the-survey-form}

<div class="alert alert--secondary">

1. Create a _collection_ for the survey.

    1. Go to <span class="badge badge--primary">Admin</span>, then <span class="badge badge--primary">Database</span>.
    2. Press the <span class="badge badge--primary">+</span> icon to create a new _collection_.
    3. Configure and save the _collection_ with the following settings:
        - **Name**: `Task creator survey`
        - **Code**: `task_creator_survey`

</div>
<br/>

<div class="alert alert--secondary">

2. Create an _element_ in the _collection_.

    1. From within the collection's settings panel, press the <span class="badge badge--primary">+</span> icon to create a new _element_.
    2. Configure and save the new _element_ with the following settings:
        - **Name**: `Create task form`
        - **Code**: `create_task_form`

</div>
<br/>

<div class="alert alert--secondary">

3. Create the _survey_.

    1. Go to <span class="badge badge--primary">Administrator</span>, then <span class="badge badge--primary">Surveys</span>.

    2. Press the <span class="badge badge--primary">+</span> icon to create a new _form_.

</div>
<br/>

<div class="alert alert--secondary">

4. Configure and save the new _form_ with the following settings:

    1. In <span class="badge badge--primary">General information</span>, set:
        - **Name**: `Create task`
        - **Code**: `task_creator_00`
    --------
    2. In <span class="badge badge--primary">Access</span>, set:
        - **Group permission**: `Task Manager`
        - **Access roles**: `default`
        - In **Channel properties**, press the <span class="badge badge--primary">+ Add Element</span> button, and set:
            - **Collection**: `Task creator survey`
            - **Elements**: `Create task form`

</div>
<br/>

<div class="alert alert--secondary">

5. From the **Form Template** section, set up the _form_:

    1. From the <span class="badge badge--info">Components</span> column, drag and drop the <span class="badge badge--warning">Written Answer</span> component to the _form template_ and fill the fields with the following:
        - **Field label**: `Name of the Task`
        - **Identifier**: `nametask_00`
    ------
    2. From the <span class="badge badge--info">Components</span> column, drag and drop the <span class="badge badge--warning">Written Answer</span> component to the _form template_ and fill the fields with the following:
        - **Field label**: `Long Description of the Task`
        - **Identifier**: `descriptiontask_00`
    ------
    3. From the <span class="badge badge--info">Components</span> column, drag and drop the <span class="badge badge--warning">Multiple choice</span> component to the _form template_ and fill the fields with the following:
        - **Field label**: `Department`
        - **Identifier**: `departmenttask_00`
        - **Type**: `Collection`
        - **Collection**: `Department`
    ------
    4. From the <span class="badge badge--info">Components</span> column, drag and drop the <span class="badge badge--warning">Multiple choice</span> component to the _form template_ and fill the fields with the following:
        - **Field label**: `Importance`
        - **Identifier**: `importancetask_00`
        - **Type**: `Collection`
        - **Collection**: `Task-Importance`

:::note
The collections mentioned were to be created during previous tutorials and might differ from the ones found in your session.
:::

</div>
<br/>

<div class="alert alert--secondary">

6. Press <span class="badge badge--primary">Save</span>.

    _Before saving, your screen should look something like this:_

<img alt="form" class="img_sizing item shadow--tl" src={useBaseUrl('img/tutorial_task_survey_01.png')} />
<br/>

</div>
<br/>

### II. Create the Bot {#ii-create-the-bot}

<div class="alert alert--secondary">

7. Go to <span class="badge badge--primary">Administrator</span> and open <span class="badge badge--primary">Bots</span>.

</div>
<br/>

<div class="alert alert--secondary">

8. Press the <span class="badge badge--primary">+</span> icon to create a new _bot_.

</div>
<br/>

<div class="alert alert--secondary">

9. Configure the new _bot_ with the following settings:

    1. In <span class="badge badge--primary">General information</span>, set: 
        - **Name**: `Create task bot`
        - **User bot name**: `create_task_bot`
        - **Description**: `Creates bot through survey.`
    ------
    2. In <span class="badge badge--primary">Access</span>, set: 
        - **Access Roles**: `full admin`
    ------
    3. In <span class="badge badge--primary">Functions</span>, set: 
        - **It's a survey command**: _activated_
        - **Form**: `Create Task` 
        
        :::note
        This is the survey we created in the previous step.
        :::
    
    _Your screen should look something like this:_

<img alt="bot settings 1" class="img_sizing item shadow--tl" src={useBaseUrl('img/tutorial_task_survey_02.png')} />
<br/>

</div>
<br/>

<div class="alert alert--secondary">

10. Build the _routine_:

    1. In <span class="badge badge--primary">Routine Builder</span>, press <span class="badge badge--primary">+ Add Routine</span>.
    
    _The following panel will show up:_

    ![Routine Builder](/img/tutorial_task_survey_03.png)

    2. Then, press <span class="badge badge--primary">+ Add Stage</span> and set the following:
        - **Code**: `create_task`
        - **Type**: `Crear Tarea`

    _Your screen should now look something like this:_

    ![Stage](/img/tutorial_task_survey_04.png)

    3. Also set the following:

        - In **Nombre** field, press <span class="badge badge--primary">+ Add Item</span>, then set:
            - **Item**: `$VALUE#data|[find=>identifier=nametask_00]|process|0`

          :::note
            - We use [Cotlang](/docs/documentation/automation/admin_cotlang) script to retrieve the task's name from the entered survey.
            - Notice how we use `nametask_00` to reference the survey's **Name of the Task** field.
          :::
        -------
        - **Grupo**: `($CODE#group#code#group-code)|_id`
          :::note IMPORTANT!
            - **Replace** `group-code` with your _Task Manager_ workflow-group's _code_.
            - **Or**, instead of using this [Cotlang](/docs/documentation/automation/admin_cotlang) script, you may also insert the _Task Manager_'s id number which can be obtained from its URL.
          :::
        -------
        - **Usuario**: `$VALUE#user`
          :::note 
          This [Cotlang](/docs/documentation/automation/admin_cotlang) script will get the person who filled out the survey.
          :::
        -------
        - In **Respuestas**, press <span class="badge badge--primary">+ Add Item</span>, then set:
            - **Item**: `$VALUE#uuid`
        -------
        - **Campo Dinámico 1**: `$VALUE#data|[find=>identifier=importancetask_00]|process|0`
          :::note
            - We use [Cotlang](/docs/documentation/automation/admin_cotlang) script to retrieve the task's level of importance which was entered in the survey.
            - Notice how we use `importancetask_00` to reference the survey's **Importance** field.
          :::
        -------
        - **Campo Dinámico 2**: `$VALUE#data|[find=>identifier=departmenttask_00]|process|0`
          :::note
            - We use [Cotlang](/docs/documentation/automation/admin_cotlang) script to retrieve the department assigned to the task.
            - Notice how we use `departmenttask_00` to reference the survey's **Department** field.
          :::
        -------
        - In **Asignado**, press <span class="badge badge--primary">+ Add Item</span>, then set: 
            - **Item**: `$VALUE#user`
        
          :::note
          The _user_ who filled out the survey will be posted as the assignee.
          :::
        -------
        * In **Information**, set:
          - **Information**: `$VALUE#data|[find=>identifier=descriptiontask_00]|process|0`
          
          :::note
            - We use [Cotlang](/docs/documentation/automation/admin_cotlang) script to retrieve the _Long Description of the Task_ which was entered in the survey.
            - Notice how we use `descriptiontask_00` to reference the survey's **Importance** field. 
            - The description will be placed in the task's _additional information_ field.
          :::

</div>
<br/>

<div class="alert alert--secondary">

11. Go to the top of the <span class="badge badge--primary">Routine builder</span> section, under _Stage_, _General Information_, set:
    1. **Initial Stage**: `create_task`
    2. **Max. Iterations**: `10`

    _The top of the Routine builder section looks like this:_

<img alt="routine builder settings" class="img_sizing item shadow--tl" src={useBaseUrl('img/tutorial_task_survey_05.png')} />
<br/>


</div>
<br/>

<div class="alert alert--secondary">

12. Press <span class="badge badge--primary">Save</span>.

</div>
<br/>

### III. Create Channel Associated with Survey and Bot {#iii-create-channel-associated-with-survey-and-bot}

<div class="alert alert--secondary">

13. Access the <span class="badge badge--primary">Administrator</span> and open <span class="badge badge--primary">Workflow</span>.

</div>
<br/>

<div class="alert alert--secondary">

14. Press the *Task Manager* workflow-group's <span class="badge badge--primary">channels list</span> icon.

_Look for the following icon and press it:_

<img alt="channel list icon" class="img_sizing item shadow--tl" src={useBaseUrl('img/tutorial_task_survey_06.png')} />
<br/>
<br/>

_The Task Manager's Channels settings panel will open up and might look something like this:_

<img alt="workflow group channel" class="img_sizing item shadow--tl" src={useBaseUrl('img/tutorial_task_survey_07a.png')} />
<br/>

</div>
<br/>

<div class="alert alert--secondary">

15. Press <span class="badge badge--primary">+</span> icon to create a new channel and set it as follows:
    
    1. In <span class="badge badge--primary">General information</span>, set:
        - **Name**: `Create Task`
        - **Code**: `create_task_channel`
    ------
    2. In <span class="badge badge--primary">Participants</span>, set:
        - **User**: _Add all the users of the company_
        - **Bots**: _Create task bot_
    ------
    3. In <span class="badge badge--primary">Elements</span>, do the following:
        - Press <span class="badge badge--primary">+ Add Element</span>, set:
          - **Collection**: `Task creator survey`
          - **Elements**: `Create task form`
    -------
    4. In <span class="badge badge--primary">Options</span>, set:
        - **Permission for sending messages**: `None`
    -------
    _Your screen should now look similar to this:_

<img alt="Channel settings" class="img_sizing item shadow--tl" src={useBaseUrl('img/tutorial_task_survey_08.png')} />
<br/>

</div>
<br/>

<div class="alert alert--secondary">

16. Press <span class="badge badge--primary">Save</span>.

</div>
<br/>

### IV. Workflow Configuration {#iv-workflow-configuration}

<div class="alert alert--secondary">

17. Access the <span class="badge badge--primary">Administrator</span> and open <span class="badge badge--primary">Workflows</span>.

</div>
<br/>

<div class="alert alert--secondary">

18. Press the *Task Manager* group.

    _Follow the image below:_

<img alt="task manager" class="img_sizing item shadow--tl" src={useBaseUrl('img/tutorial_task_survey_09.png')} />
<br/>

</div>
<br/>

<div class="alert alert--secondary">

19. Press the *Task Manager Flow* workflow.

    _Follow the image below:_

<img alt="task manager" class="img_sizing item shadow--tl" src={useBaseUrl('img/tutorial_task_survey_10.png')} />
<br/>

</div>
<br/>

<div class="alert alert--secondary">

20. In <span class="badge badge--primary">General Information</span>, set:
    - **Chat channels**: `UNBOUND`

    _Follow the image below:_

<img alt="task manager" class="img_sizing item shadow--tl" src={useBaseUrl('img/tutorial_task_survey_11.png')} />
<br/>

</div>
<br/>

<div class="alert alert--secondary">

21. Press <span class="badge badge--primary">Save</span>.

</div>
<br/>

<div class="hero shadow--lw">
<div class="container">
<h1 class="hero__title">You did it!</h1>
<p class="hero__subtitle">

Now go to the _Task Manager's Create Task_ channel to create your first task!</p>

<img alt="create task channel" class="img_sizing item shadow--tl" src={useBaseUrl('img/tutorial_task_survey_12.png')} />
<br/>
<div>
</div>
</div>
</div>


## Result {#result}

Once you create your first tasks, the _Task Manager_ workflow-group, with its _Create Task_ channel and <span class="badge badge--success">Task Creator</span> survey button, should look something like the following image:

<img alt="task manager group" class="img_sizing item shadow--tl" src={useBaseUrl('img/tutorial_result_smsurvey.png')} />
<br/>
<br/>

In the following image, we see the _task view_ with tasks created using the survey. You should see similar results:

<img alt="task view" class="img_sizing item shadow--tl" src={useBaseUrl('img/tutorial_result_sm.png')} />