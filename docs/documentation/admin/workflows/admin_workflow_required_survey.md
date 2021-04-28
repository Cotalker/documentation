---
id: admin_workflow_required_survey
title: III. Workflow Survey Triggers
sidebar_label: III. Workflow Survey Triggers
---
import useBaseUrl from '@docusaurus/useBaseUrl'; 
import Highlight from '@theme/Highlight';

<img alt="design" className="img_sizing" src={useBaseUrl('img/design/Workflows.svg')} />
<br/>

<div className="alert alert--secondary">

## Summary {#summary}

By default, _users_ can create a _task_ or change its state through the _tasks view_ section. However, _administrators_ may require _users_ to complete a _survey_ before **creating a new task** or **before changing the state of a task**. Adding _survey trigger_ before creating a workflow ([Workflow Start Survey](#required-survey-for-a-new-task)) or changing a state ([State Survey](#required-survey-for-modifying-task-states)) allows _administrators_ to:
- control what type of _tasks_ users create, 
- ensure that the _users_ provide all necessary information when creating _tasks_,  
- and manage _workflow_ state changes.

</div>
<br/>

:::tip
Workflow Start Surveys can also be [shared](/docs/documentation/admin/workflows/admin_workflow_public_survey) outside the Cotalker environment, allowing visitors to create new tasks.
:::

<!-- TODO insert image of required survey -->


## Workflow Start Survey {#required-survey-for-a-new-task}
Without selecting this feature, _administrators_ will allow _users_  to create any _task_ and create them with incomplete data, such as assignee, deadline, state, and other necessary information.

By setting up a _Workflow Start Survey_, a _channel_ is created within a _workflow group_ to host the newly created task and will display the _survey_ used to create and modify the _task_.

:::important
When using a Workflow Start Surveys and some input error prevents a task from being created, the _channel_ will be generated but without an assigned task. It will be the implementor's duty to notify this problem adequately in the _channel_; the _user_ must be told to re-send the _survey_ and make the necessary corrections to create the _task_ appropriately.
:::

### Step-by-step configuration: {#step-by-step-configuration}
*The following steps are provided as a general example guide. For full, in-depth explanations please refer to the [Routine Builder](/docs/documentation/automation/admin_routine).*

<div className="alert alert--secondary">

1. _Administrators_ must first enter the **workflow configuration panel**:
    - To get there, from the _main menu_, select the **administrative panel**. 
    - Then, go to the **workflows** section and select a _workflow group_.
    - Finally, inside the _workflow group_ select an existing _workflow_ or create a new one. The _workflow configuration panel_ will open up.

<!-- TODO add image of main menu bar with administration panel & workflow panel -->

</div>
<br/>

<div className="alert alert--secondary">

2. Once inside the **workflow configuration panel** follow the general procedure for configuring _workflows_ and employ the subsequent steps' configuration options.

</div>
<br/>

<div className="alert alert--secondary">

3. Under **General information**, ensure that the **Chat channels** option is set to **BOUND**. This will generate the necessary channel for the new task.

</div>
<br/>

<div className="alert alert--secondary">

4. Under **States**, in the **Start form** option, choose the _survey_ that will guide _users_ in creating new _tasks_. (The specific _survey_ must be previously elaborated for this purpose.)

</div>
<br/>

<div className="alert alert--secondary">

5. Next, select the **Edit Routine** button to create the necessary **bot**. Once inside the **Routine builder** dialog box, follow the general procedure for making bots keeping in mind the required configurations mentioned below.
<!-- TODO insert image with Routine Builder dialog box -->

</div>
<br/>

<div className="alert alert--secondary">

6. In the **Name** field, press the *add item* button, and include something like the following: 

    ```$VALUE#answer|data|[find=>identifier=text_input_question_identifier]|process|0```

</div>
<br/>

<div className="alert alert--secondary">

7. Ensure to add the **group** from which the _task_ is created. The **Group** field should look like this: 

    ```$VALUE#meta|taskGroup```

</div>
<br/>

<div className="alert alert--secondary">

8. The **User** field must have the following: 

    ```$VALUE#answer|user```

</div>
<br/>

<div className="alert alert--secondary">

9. In the **Channel** field, the corresponding _channel_ must be indicated with the following: 

    ```$VALUE#answer|channel```

</div>
<br/>

<div className="alert alert--secondary">

10. If the task being created is a sub-task within a **parent task**, the following must be indicated: 

    ```$VALUE#meta|parentTask```

</div>
<br/>

<div className="alert alert--secondary">

11. The _Workflow Start form_ must be associated as an **answer** to the _task_. In order to do this, the _answer's_ universally unique identifier (UUID) must be included in the **answers** field: 

    ```$VALUE#answer|uuid```

</div>
<br/>

<div className="alert alert--secondary">

12. The **assignee** value is optional. By default, the _user_ creating the task is set as the _assignee_, but this value can be changed: 

    ```$VALUE#answer|user```

</div>
<br/>

## State Survey {#required-survey-for-modifying-task-states}

Configuring a _State Survey_ for when _users_ want to modify a _workflow's state_ is a little bit simpler than the previous case. Unlike the _Workflow Start Survey_ used for creating new workflow, it isn't necessary to add a bot or specify a routine to the _State Survey_ when changing a workflow's state.

This feature makes configuring the _State Survey_ easier. In case an automatic response – like sending an email to the CEO –  is desired after changing the state of a workflow, a bot can be configured through the **Edit routine** button.

:::important
If a _routine_ is afterwards added, the automatic change of _state_ is disabled and must be then configured manually as a step in the routine.
:::

### Step-by-step configuration: {#step-by-step-configuration-1}
*The following steps are provided as a general example guide. For full, in-depth explanations please refer to [Predefined Routines](/docs/documentation/automation/existing_routines).*

<div className="alert alert--secondary">

1. _Administrators_ must first enter the **workflow configuration panel**:
    - To get there, from the _main menu_, select the **administrative panel**. 
    - Then, go to the **workflows** section and select a _workflow group_.
    - Finally, inside the _workflow group_ select an existing _workflow_. The _workflow configuration panel_ will open up.

<!-- TODO add image of main menu bar with administration panel & workflow configuration panel -->

</div>
<br/>

<div className="alert alert--secondary">

2. Finally, in the _workflow configuration panel_, find the _state list_ and select the **state** that is going to be changed. The _create state panel_ opens up.
<!-- TODO add image with state list -->

</div>
<br/>

<div className="alert alert--secondary">

3. From the _create state panel_, under **State changes**, choose the _state_ to be changed into.
<!-- TODO add image of the Create State Panel -->

</div>
<br/>

<div className="alert alert--secondary">

4. Under **State changes**, in **Start form**, choose the _survey_ created to process the _state_ change. (The specific _survey_ must be previously elaborated for this purpose.)

</div>
<br/>

<div className="alert alert--secondary">

5. If administrators desire an automatic response to occur when a change of _state_ is made, a _bot_ should be created through the **Edit routine** button. Otherwise, it is not necessary to go through this step.

</div>
<br/>

