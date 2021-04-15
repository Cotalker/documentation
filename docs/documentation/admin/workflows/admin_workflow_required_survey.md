---
id: admin_workflow_required_survey
title: III. Procedural Surveys
sidebar_label: III. Procedural Surveys
---
import useBaseUrl from '@docusaurus/useBaseUrl'; 
import Highlight from '@theme/Highlight';

<img alt="design" className="img_sizing" src={useBaseUrl('img/design/Workflows.svg')} />
<br/>

<div className="alert alert--secondary">

## Summary {#summary}

By default, _users_ can create a _task_ or change its state through the _tasks view_ section. However, _administrators_ may require _users_ to complete a _survey_ before **creating or changing the state of a task**. This feature – known as **procedural survey** – allows _administrators_ to:
- control what type of _tasks_ users create, 
- ensure that the _users_ provide all necessary information when creating _tasks_,  
- and manage _task_ state changes.

</div>

<!-- TODO insert image from Tasks View with procedural Survey -->


## New Task Procedural Survey {#setting-up-a-procedural-survey-for-a-new-task_}
Without selecting this feature, _administrators_ will allow _users_  to create any _task_ and create them with incomplete data, such as assignee, deadline, state, and other necessary information.

By setting up a _procedural survey_, a _channel_ is created within a _workflow group_ to host the newly created task and will display the _survey_ used to create and modify the _task_.

:::info
When using a procedural survey and some input error prevents a task from being created, the _channel_ will be generated but without an assigned task. It will be the implementor's duty to notify this problem adequately in the _channel_; the _user_ must be told to re-send the _survey_ and make the necessary corrections to create the _task_ appropriately.
:::

### Step-by-step configuration: {#step-by-step-configuration}
*The following steps are provided as a general example guide. For full, in-depth explanations please refer to [Predefined Routines](/docs/documentation/automation/existing_routines).*

1. _Administrators_ must first enter the **workflow configuration panel**:
    - To get there, from the _main menu_, select the **administrative panel**. 
    - Then, go to the **workflows** section and select a _workflow group_.
    - Finally, inside the _workflow group_ select an existing _workflow_ or create a new one. The _workflow configuration panel_ will open up.

<!-- TODO add image of main menu bar with administration panel & workflow panel -->

2. Once inside the **workflow configuration panel** follow the general procedure for configuring _workflows_ and employ the subsequent steps' configuration options.

3. Under **General information**, ensure that the **Chat channels** option is set to **BOUND**. This will generate the necessary channel for the new task.

4. Under **States**, in the **Start form** option, choose the _survey_ that will guide _users_ in creating new _tasks_. (The specific _survey_ must be previously elaborated for this purpose.)

5. Next, select the **Edit Routine** button to create the necessary **bot**. Once inside the **Routine builder** dialog box, follow the general procedure for making bots keeping in mind the required configurations mentioned below.
<!-- TODO insert image with Routine Builder dialog box -->

6. In the **Name** field, press the *add item* button, and include something like the following: 

    ```$VALUE#answer|data|[find=>identifier=text_input_question_identifier]|process|0```
    
7. Ensure to add the **group** from which the _task_ is created. The **Group** field should look like this: 

    ```$VALUE#meta|taskGroup```

8. The **User** field must have the following: 

    ```$VALUE#answer|user```

9. In the **Channel** field, the corresponding _channel_ must be indicated with the following: 

    ```$VALUE#answer|channel```

10. If the task being created is a sub-task within a **parent task**, the following must be indicated: 

    ```$VALUE#meta|parentTask```

11. The _procedural survey_ must be associated as an **answer** to the _task_. In order to do this, the _answer's_ universally unique identifier (UUID) must be included in the **answers** field: 

    ```$VALUE#answer|uuid```

12. The **assignee** value is optional. By default, the _user_ creating the task is set as the _assignee_, but this value can be changed: 

    ```$VALUE#answer|user```


## Modifying Task States Procedural Survey {#procedural-survey-for-modifying-task-states}

Configuring a _procedural survey_ for when _users_ want to modify a _task's state_ is a little bit simpler than the previous case. Unlike the _procedural surveys_ used for creating _tasks_, it isn't necessary to add a bot or specify a routine to the _procedural survey_ when changing a task's state.

This feature makes configuring the _procedural survey_ easier. In case an automatic response – like sending an email to the CEO –  is desired after changing the state of a task, a bot can be configured through the **Edit routine** button.

:::info
If a _routine_ is afterwards added, the automatic change of _state_ is disabled and must be then configured manually as a step in the routine.
:::

### Step-by-step configuration: {#step-by-step-configuration-1}
*The following steps are provided as a general example guide. For full, in-depth explanations please refer to [Predefined Routines](/docs/documentation/automation/existing_routines).*


1. _Administrators_ must first enter the **workflow configuration panel**:
    - To get there, from the _main menu_, select the **administrative panel**. 
    - Then, go to the **workflows** section and select a _workflow group_.
    - Finally, inside the _workflow group_ select an existing _workflow_. The _workflow configuration panel_ will open up.

<!-- TODO add image of main menu bar with administration panel & workflow configuration panel -->

2. Finally, in the _workflow configuration panel_, find the _state list_ and select the **state** that is going to be changed. The _create state panel_ opens up.
<!-- TODO add image with state list -->

3. From the _create state panel_, under **State changes**, choose the _state_ to be changed into.
<!-- TODO add image of the Create State Panel -->

4. Under **State changes**, in **Start form**, choose the _survey_ created to process the _state_ change. (The specific _survey_ must be previously elaborated for this purpose.)

5. If administrators desire an automatic response to occur when a change of _state_ is made, a _bot_ should be created through the **Edit routine** button. Otherwise, it is not necessary to go through this step.
