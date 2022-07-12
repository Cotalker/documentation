---
id: admin_workflow_required_survey
title: Start Forms
sidebar_label: Start Forms
---

:::caution Advertencia
Esta página aún no se encuentra traducida al español.
:::
import useBaseUrl from '@docusaurus/useBaseUrl'; 
import Highlight from '@theme/Highlight';

<img alt="design" className="img_sizing" src={useBaseUrl('img/design/Workflows.svg')} />
<br/>

<div className="alert alert--secondary">

## Summary {#summary}

By default, _users_ can create a _task_ or change its state through the _tasks view_ section. However, _administrators_ may require _users_ to complete a _survey_ before **creating a new task** or **before changing the task state**. Adding a _survey trigger_ before creating a workflow ([Workflow Start Form](#required-survey-for-a-new-task)) or changing a state ([State Start Form](#required-survey-for-modifying-task-states)) allows _administrators_ to:
- control what type of _tasks_ users create, 
- ensure that the _users_ provide all necessary information when creating _tasks_,  
- and manage _workflow_ state changes.

</div>
<br/>

:::tip
Workflow Start Forms can also be [shared](/docs/documentation/admin/workflows/admin_workflow_public_survey) outside the Cotalker environment, allowing visitors to create new tasks.
:::


## Workflow Start Form {#required-survey-for-a-new-task}
Without configuring this feature, _administrators_ will allow _users_  to create any _task_ and create them with incomplete data, such as assignee, deadline, state, and other necessary information.

Once set up, the survey can be accessed through the workflow group's [action button](/docs/documentation/client/actions_button).

By setting up a _Workflow Start Form_, a _channel_ is created within the _workflow group_ to host the newly created task and will display the answered _survey_ used to generate the _task_.

:::important
When using a Workflow Start Form and some input error prevents a task from being created, the _channel_ will be generated but without an assigned task. It will be the implementor's duty to notify this problem adequately in the _channel_; the _user_ must be told to re-send the _survey_ and make the necessary corrections to create the _task_ appropriately.
:::

### Step-by-step configuration: {#step-by-step-configuration}
*The following steps are provided as a general example guide. For full, in-depth explanations please refer to the [Routine Builder](/docs/documentation/automation/admin_routine).*

<div className="alert alert--secondary">

1. Go to the <span className="badge badge--primary">Workflow</span> section and select a _workflow group_ from the list.

  <img alt="workflow section" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_workflows_start_survey_00.png')} />
  <br/>

  Inside the _workflow group_ select a _workflow_ or create a new one. 

  <img alt="workflow section" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_workflows_start_survey_01.png')} />
  <br/>

</div>
<br/>

<div className="alert alert--secondary">

2. After choosing the workflow, **workflow settings panel** will appear. Follow the general procedure for configuring _workflows_, while also applying the subsequent steps.

<img alt="workflow section" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_workflows_start_survey_02a.png')} />
<br/>

</div>
<br/>

<div className="alert alert--secondary">

3. Under <span className="badge badge--primary">General information</span>, ensure that the **Chat channels** option is set to `BOUND`. This will generate the necessary channel for the new task.

  <img alt="workflow section" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_workflows_start_survey_03a.png')} />
  <br/>

</div>
<br/>

<div className="alert alert--secondary">

4. Under <span className="badge badge--primary">States</span>, in the **Start form** field, choose the previously made _survey_ that will guide _users_ in starting new _workflows_.

  <img alt="workflow section" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_workflows_start_survey_03b.png')} />
  <br/>
  <br/>

  :::note
  Once a survey is selected, the <span className="badge badge--primary">Share</span> button will appear. Go to [Public Survey](/docs/documentation/admin/workflows/admin_workflow_public_survey) to find out more about sharing _Workflow Start Forms_ with external users.
  :::

</div>
<br/>

<div className="alert alert--secondary">

5. Next, select the <span className="badge badge--primary">Edit Routine</span> button to create the necessary _automation_. 

  <img alt="workflow section" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_workflows_start_survey_03c.png')} />
  <br/>

</div>
<br/>

<div className="alert alert--secondary">

6. The **Routine builder** dialog box will appear. Add a **stage** and set the **Type** field to `Create Task`.

  <img alt="workflow section" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_workflows_start_survey_03.png')} />
  <br/>

  _Follow the general procedure for [building routines](/docs/documentation/automation/admin_routine) keeping in mind the required configurations mentioned below._

</div>
<br/>

<div className="alert alert--secondary">

7. New fields –based on the the _Create Task_ bot– will appear. In the **Name** field, press the <span className="badge badge--primary">Add item</span> button, and include a [COTLang Script command](/docs/documentation/automation/admin_cotlang) like the following: 

  `$VALUE#answer|data|[find=>identifier=text_input_question_identifier]|process|0`

</div>
<br/>

<div className="alert alert--secondary">

8. Ensure to add the _group_ from which the _task_ is created. The **Group** field should look like this: 

  `$VALUE#meta|taskGroup`

</div>
<br/>

<div className="alert alert--secondary">

9. The **User** field must have the following: 

  `$VALUE#answer|user`

</div>
<br/>

<div className="alert alert--secondary">

10. In the **Channel** field, the corresponding _channel_ must be indicated with the following: 

  `$VALUE#answer|channel`

</div>
<br/>

<div className="alert alert--secondary">

11. The _Workflow Start Form_ must be associated as an _answer_ to the _task_. In order to do this, the _answer's_ universally unique identifier (UUID) must be included in the **Answers** field: 

    ```$VALUE#answer|uuid```

</div>
<br/>

<div className="alert alert--secondary">

12. The **assignee** value is optional. By default, the _user_ creating the task is set as the _assignee_, but this value can be changed: 

    ```$VALUE#answer|user```

</div>
<br/>

<div className="alert alert--secondary">

13. (ONLY FOR SUB-TASKS) If the task being created is a sub-task within a **parent task**, the following must be indicated: 

  `$VALUE#meta|parentTask`

</div>
<br/>


## State Start Form {#required-survey-for-modifying-task-states}

Configuring a _State Start Form_ for when _users_ want to modify a _workflow's state_ is a little bit simpler than the previous case. Unlike the _Workflow Start Form_ used for creating a new workflow, it isn't necessary to add a bot or specify a routine to the _State Start Form_ when changing a workflow's state.

This feature makes configuring the _State Start Form_ easier. In case an automatic response –like sending an email to the CEO–  is desired after changing the state of a workflow, a bot can be configured through the _Edit Routine_ button.

:::important
If a _routine_ is afterwards added, the automatic change of _state_ is disabled and must be then configured manually as a step in the routine.
:::

### Step-by-step configuration: {#step-by-step-configuration-1}
*The following steps are provided as a general example guide. For full, in-depth explanations please refer to [Predefined Routines](/docs/documentation/automation/existing_routines).*

<div className="alert alert--secondary">

1. Go to the <span className="badge badge--primary">Workflow</span> section and select a _workflow group_ from the list.

  <img alt="workflow section" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_workflows_start_survey_00.png')} />
  <br/>

  Inside the _workflow group_ select a _workflow_ or create a new one. 

  <img alt="workflow section" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_workflows_start_survey_01.png')} />
  <br/>

</div>
<br/>

<div className="alert alert--secondary">

2. Finally, in the _workflow settings panel_, find the _state list_ and select the **state** that is going to be changed.

  <img alt="State Start Form" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_workflows_state_survey_00.png')} />
  <br/>

</div>
<br/>

<div className="alert alert--secondary">

3. The _create state panel_ will open up. 

  Under **State changes**, go to the state(s) the will require a survey. In their **Start form** field, choose the _survey_ previously created to process the _state_ change.

  <img alt="State Start Form" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_workflows_state_survey_01.png')} />
  <br/>

</div>
<br/>

<div className="alert alert--secondary">

4. If administrators desire an automatic response to occur when a _state_ change is made, a _routine_ should be created through the <span className="badge badge--primary">Edit routine</span> button. Otherwise, it is not necessary to go through this step. [Click here for more information on routines](/docs/documentation/automation/admin_routine).

</div>
<br/>


