---
id: admin_workflow
title: Workflows
sidebar_label: Workflows
---
import useBaseUrl from '@docusaurus/useBaseUrl'; 
import Highlight from '@theme/Highlight';

<img alt="design" className="img_sizing" src={useBaseUrl('img/design/Workflows.svg')} />


## Overview {#overview}

<img alt="overview image" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_workflows_00.png')} />
<br/>
<br/>

_Workflows_ are used to create _tasks_ and their corresponding processes. For example, suppose an administrative request must be approved by a CEO, a manager, and an administrator. In that case, the _workflow_ could take the request to each one of them, one after another, for approval. If, along the line, one of them doesn't approve, the request gets rejected and doesn't continue down the chain.

A _Workflow_ is made up of one or more _State Machines_. In the state machine, all states through which the _task_ must pass are specified, as well as each [_routine_](/docs/documentation/automation/admin_routine). Following the example given above, a _routine_ can be programmed to send an email notifying the CEO once the administrator and manager have approved the request.

Workflows are hosted inside a _workflow group_. _Workflow groups_ can host multiple workflows and permit interaction among them.


<!-- The following image shows how it looks in the application.

<br /> <br />
<img alt="" src={useBaseUrl('img/admin_task_webclient.png')} />
<br /> <br />

This example refers to a administrative request in a Company. So, on the open channel, the executive can send a request by answering a survey. The possible status through which the request can pass is "0. Levantamiento de Solicitud", "1. Pendiente por Jefatura" ... "5.1.- Rechazado por Jefatura", "5.2.- Rechazado por Gerencia" and "5.3.- Rechazado por Administración". And if you can see the channel called "Solicitud Insumo - 219 - Ariel - Lobos" it's an active request that is in the state "2. Pendiente por Gerencia".
<br /> <br /> -->

## I. Workflow Groups {#workflow-groups}
From the initial settings panel, you can find the entire list of _workflow groups_ that have been created. 

<img alt="workflow group" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_workflows_groups_00.png')} />
<br/><br/>

The description of the icons can be found in the [Overview section](/docs/documentation/admin/admin_overview).

The information shown on the list is as follows:
<!-- DEPRECATED- Weight: The relative number that positions the group on the main bar -->
- **Icon**: Group icon
- **Name**: Visible group name.
<!-- DEPRECATED- Last Modified: Last time the group was edited. -->
- **Initial Workflow**: Workflow which starts off the task.
- **Options**: _Configure Workflows_ - _View Channels_ - _Edit Workflow Group_

:::note
  _[**Configure Workflows**](#configure-workflows), [**View Channels**](/docs/documentation/admin/admin_channels#edit--create-single-channel), and [**Edit Workflow Group**](#createedit-a-workflow-group) options are represented respectively by the following icons:_

<img alt="workflow group" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_workflows_options_00.png')} />
<br/>

:::

### Create/Edit a Workflow Group {#create-edit-a-workflow-group}
When creating or editing a _workflow group_, you will see the following settings panel:

<img alt="workflow group settings panel" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_workflows_create_group_00.png')} />
<br/><br/>

_Below, we will see each section of the settings panel in detail._

### - General Information {#general-information-section}
The **General information** fields are described below:

| Field | Description | Notes | 
| ---- | ----------- | ----- | 
| **Name** | The visual name of the group | It doesn't have to be unique. |
| **Code** | Group identification name | Must be unique. Only lowercase letters, numbers, and underscores are accepted. The first character must be a letter. The code cannot be edited once it is saved.|
| **Weight** | A relative number that positions the group on the list. Smaller numbers accommodate the group near the top, larger numbers towards the end. | If you don't type a number, the system will assign one. |
| **Parent Group** | The group can be related or positioned within another group as a child. | The parent group must already exist. |

<br/>


:::note
A _parent group_ with a direct access icon in the _main menu bar_ would host a child or sub-group like the image shown below:

<img alt="parent group" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_workflows_parent_00.png')} />
<br/>

:::

### - Icon Section {#icon-section}
The **Icon** section configures the group symbol shown on the main bar. **Icon** field descriptions are as follows:

| Field | Description | Notes | 
| ---- | ----------- | ----- | 
| **Select icon** | Choose personalized or pre-designed icon from the menu. | Personalized icons are configured in the "Path" field. |
| **Color** | Choose from the menu the icon's color. |  |
| **Path** | Must be filled with Scalable Vector Graphics (SVG) code. | If the icon was selected from the list of pre-designed icons, the path is completed automatically. If a personalized SVG is desired, its code must be inserted manually. |

<br/>

### - Help Section {#help-section}
The **Help** section sets up the onboarding when you log in to the App or website. **Help** fields are described below:

| Field | Description | Notes | 
| ---- | ----------- | ----- | 
| **Activate help for this group** | This function is for cellular application | For now it is not being used |
| **Display in onboarding** | If it is active it will show up after you log in the App or Website |  |
| **Instructions** | Text that explain whatever you want in the onboarding. | It will show below the animation |
| **Frequently asked question's URL** | This function is for cellular application | For now it is not being used |
| **Animation** | It is the animated image shown in the onboarding of the group. It's field with animation json. | We recommend using Lottie File. |

<br/>

### - Design Section {#design-section}
The _design_ section configures how channels are displayed in the group. The description of the layout fields is as follows:

| Field | Description | Notes | 
| ---- | ----------- | ----- | 
| Additional sorting | If active, you can configure the position of the channel where it is displayed. Otherwise, the default option is to sort by the state name and there by the last message sent. |  |
| Collection | Channels will be divided by the selected property type. The default option is to sort by property which channels are related. | If the channels are not related to the selected property type, it will not be divide. |
| Order elements by | The elements sort by the selected option. You can choose between Created At, Weight, Modified At and Name | Typo: properties appear on the picture, must be elements. |
| Order channels by | The channel sort by the selected option. You can choose between Created At, Last Message, Modified At and Name |  |
<br/>

### - Channel Creation Section {#channel-creation-section}
The description of the _channel creation_ fields is as follows:

| Field | Description | Notes | 
| ---- | ----------- | ----- | 
| Allow channel creation | When activated, it will allow users to create channels in the group. | Once active, press the "Actions" button – a green floating button near the bottom of the group's channel panel – to slide open a list of possible actions, including creating a channel. |
| Permissions | Specific user permissions needed to create a channel in the group. | Although the button will be visible if activated, without the necessary permissions, users will not be allowed to create channels. |
<br/>

### - Secondary Actions {#secondary-actions}

Here you can configure the _Actions_ button –a green floating button that appears at the bottom of the group's channel panel– where users can access URLs, which can be configured to open external websites, go to different sections of the app, answer surveys, and create tasks.

_The Actions button and its corresponding Actions Menu will look something like the image below:_
<img alt="fab secondary actions" className="img_sizing item shadow--lw" src={useBaseUrl('img/admin_groups_fab_secondary_actions.png')} />
<br/>

:::note
New channels can also be created through the _Action_ button. That option is activated in the [Channel Creation Section](admin_workflow#channel-creation-section)
:::

<br/>

Descriptions of the fields and options in the _secondary actions_ section are explained below:

The <span className="badge badge--secondary">+ ADD NEW ACTION</span>: creates an _action_ that can be accessed through the _Actions_ button.
<img alt="add new action" className="img_sizing item shadow--lw" src={useBaseUrl('img/admin_groups_secondary_actions_00.png')} />
<br/>

Pressing this button opens up a <span className="badge badge--secondary">New action #1</span> pad. Press the pad to open the new action's settings panel.
<img alt="add new action" className="img_sizing item shadow--lw" src={useBaseUrl('img/admin_groups_secondary_actions_01.png')} />
<br/>

The action's settings panel fields are described below:

| Field | Description | Notes |
| ----- | ------- | ------- |
| Name | Name given to the action. The name will appear as an option in the Actions Menu. | You can use any characters. |
| Url | Indicates de URL that will be accessed. URLs can point to external or internal pages. They can also point to sections within the app, surveys, and tasks by indicating their URL. | URLs for surveys, tasks, and other app objects can copied through your navegator's URL bar by first going directly to the destination.
| Use authentication | Sends the user's authentication token to external sites. | This is needed for external sites that require Cotalker authentication. For security reasons, use only on trusted sites. |
| Open link in a new tab | If activated, the URL will be opened in a new tab in your browser. Otherwise, it will open inside the Cotalker app window. | |
| Select icon | You can choose between personalized or pre-designed icons.| The color cannot be changed. |
| Path | Must be filled with Scalable Vector Graphics (SVG) code. | If the icon was selected from the list of pre-designed icons, the path will be completed automatically. If a personalized SVG is desired, its code must be inserted manually. |

## II. Configure Workflows {#configure-workflows}
A _workflow group_ can contain one or more workflows. These workflows are configured through the _workflows settings panel_. Once a _workflow-group_ is created, it is necesary to indicate here the group's initial workflow, along with other basic settings.

Below, you can see what the settings panel looks like. It has three basic sections: **Configurati


At the bottom are the list of the State machine created and in the center is the visualization of the whole process modulated with the created state machine.<br/>
In this case, only one state machine was created, making it the only state machine that formed the process.

<img alt="settings panel" className="img_sizing_narrow item shadow--tl" src={useBaseUrl('img/admin_wfconfiguration.png')} />
<br/>
<br/>

| Field | Description | Notes | 
| ---- | ----------- | ----- | 
| Flow Type | The option are State-machine or Free * |  |
| Initial Workflow | Choose from list  |  |
| Default view | The default view in the task view section. The option are Calendar view, Gantt view, Table view, Kanban view and List view |  |
| Filter | Options: "Status" or "Critical task by department" | |
| Hide closed tasks after | The closing task will be hidden after the defined number|  |
| Read Permissions | [List of availavle Read Permissions](/docs/documentation/admin/admin_accessrole#default-permissions) | |
| Write Permissions | [List of availavle Write Permissions](/docs/documentation/admin/admin_accessrole#default-permissions) | |

<br/>

:::warning
Do not change the previously assigned permissions and the Initial State Machine. It could change some state machine already created. But you can add as many as you want. If you want to unassign a permission or chenge the initial state machine, check with support first.
:::

### Create a Workflow {#create-a-single-workflow}
At first you can only define the general specifications of the state machine, after saving you can configure the states of the machine.

<img alt="" src={useBaseUrl('img/admin_sm_create_1.png')} />
<img alt="" src={useBaseUrl('img/admin_sm_create_2.png')} />
<br/>

Below you will find the description and notes for each field in the pictures above.<br/><br/>

| Field | Description | Notes | 
| ---- | ----------- | ----- | 
| Name | The visual name of the State Machine | It dosen't have to be unique  | 
| Code | The identifier of the State Machine | It only accept lowercase, number and underscore and start with the letters. Once you create and save the code, you cannot change it.  | 
| Chat channels | One of the option must be selected. The options are: *bound*, *unbound*, *unbound-hierarchy*. |  Bound means two-way data binding, Unbound means that a channel is directly assigned to the task and the other one means that a channel acquired relationship because the parent had a channel and is always relative to the current hierarchy. More [specific explanation](#further-details) will be below the table. | 
| Type | The option are: *unique* or *generic* type.  | The generic type refers to a reapited task and the unique type that is not. For example: the sub-state machine could be a unique type. | 
| Collection | The collection of the element to which it belongs is selected. This element is used to define the task that flows through the workflow. | Once selected, a field will appear to choose the element. Remember to create the colletion and elements before.| 
| Additional field Nº | Add a collection. It is used to filter/group/sort the task in the task view in the web client. |  | 
| State list | The collection of the element to which the states belongs is selected. Each element represents a state of the state machine. | Remember to create the colletion and elements before. | 
<br/>

#### Further Details of Chat Channels Option {#further-details}

The type of Chat channels allow differents things:

*Bound:* 
- Tasks copies main-state and sub-states to channel.
- Channel can change main-state and other parameters with forms
- One Task can be bound to One Channel, and vice-versa
- This channel can only be unset manually 

*Unbound:*
- Task only sends status-updates to this channel
- One channel may have many un-bounded tasks
- This channel can only be unset manually

*Unbound-Hierarchy:*
- Task only sends status-updates to this channel
- Doesn't have channel id, always check parents on update
- This channel will be automatically set or unset depending on the current task hierarchy

### Edit a Workflow {#edit-a-single-workflow}
In this section the created state machine can be edited, but the states and SLA section is added, as can be seen in the following image:

<img alt="" src={useBaseUrl('img/admin_state_list.png')} />
<img alt="" src={useBaseUrl('img/admin_SLA_list.png')} />
<br/><br/>
The states of a state machine are defined by the name, they are the possible states through which the task could pass. In the image, the states list is shown. The intial state from the created ones have to be selected in the initial state field. <br/>
The SLA of a state machine is used to execute a routine when a task does not change from one state to another in a stipulated time. In the image, the SLA list is shown. <br/><br/>

The description of the icons are in the [Overview section](admin_overview).


### - Create/Edit State {#createedit-single-state}

In this section you can edit or create a single state of a State Machine.
<img alt="" src={useBaseUrl('img/admin_state_create.png')} />
<br/><br/>
Below you will find the description and notes for each field in the pictures above.
<br/><br/>

| Field | Description | Notes | 
| ---- | ----------- | ----- | 
| Type | State type. Corresponds to the location of the state. There are three options: closed (conects to end), in progress (connect to other states) or new (connect with to start). |  |
| Elements | Choose the element corresponding to the state you want to create | The collection was already selected on the created Statemachine. |
| Add state change | Add successor states. If it is the final state, it has none. The name of the state has to be added and the capacity for change must be defined. It could be the survey, the task-ui (task) or * (both). | The added states must already be created in the state machine. |
| State machine | Select the sub - state machine | The added state machine must already be created in the workflow |
| Add survey trigger | A survey is used to trigger the passage of the state to its successors. |  |

The Routine builder is explained in the [Routine Section](/docs/documentation/automation/admin_routine).

### - Create/Edit SLA {#createedit-single-sla}
In this section you can edit or creat a single state of a State Machine.
<img alt="" src={useBaseUrl('img/admin_sla.png')} />
<br/><br/>
Below you will find the description and notes for each field in the pictures above.
<br/><br/>

| Field | Description | Notes | 
| -- | ----- | ------------ | 
| Name |  The visual name of the SLA | It dosen't have to be unique  | 
| Code | The identifier of the SLA | It only accept lowercase, number and underscore and start with the letters. Once you create and save the code, you cannot change it.   |  |
| State types | The type of state selected is specified in the field next to it. |  |
| States | One or more of the states of the State Machine is specified. | If it is the *start*, the start of the state is the one defined by the SLA. If it is the end, it means that the start of the state is the one that stops the SLA. |
| Time Type | The option are: (1)Dynamic or (2)Static | **Dynamic** means that the time is calculated with task information. <br/> **Static** means that the time can be a specific date or calculated from amount of months, days, or hours from the date the action is executed |
| Time | The date or time is specified that the task is supposed to go from the initial state to the final state is specified. | The format for Static type is as follows: <br/>"HOURS&#124;*Number*" spedified the *number* hours from action, <br/>"DAYS&#124;*Number*" specified the *number*  days form action or <br/>"DATE&#124;$YYYY-$MM-$DDT${HH + 5}:00:000Z" specified a date.<br/> The format for Dynamic type is as follows: <br/> "DATE&#124;endDate" use the task endDate,  <br/> "DATE&#124;parent&#124;endDate" use parent task endDate |
| Reset | If active, *time* will start again when the task returns to *start state*. |  |
| Repeat | If active, *time* will cycle infinitely until the condition is met. Therefore, the SLA will be executed as many times as necessary. Otherwise, the SLA will only run once. |  |

The Routine builder is explained in the [Routine Section](/docs/documentation/automation/admin_routine).


## III. Required Surveys {#required-surveys}
<!-- TODO insert image from Tasks View with Required Survey -->
By default, _Users_ can create a _task_ or change its state through the _tasks view_ section. However, _administrators_ may require _users_ to complete a _survey_ before **creating or changing the state of a task**. This feature – known as **required survey** – allows _administrators_ to:
- control what type of _tasks_ users create, 
- ensure that the _users_ provide all necessary information when creating _tasks_,  
- and manage _task_ state changes.

### Setting up a _required survey_ for a _new task_ {#setting-up-a-required-survey-for-a-new-task_}
Without selecting this feature, _administrators_ will allow _users_  to create any _task_ and create them with incomplete data, such as assignee, deadline, state, and other necessary information.

By setting up a _required survey_, a _channel_ is created within a _workflow group_ to host the newly created task and will display the _survey_ used to create and modify the _task_.

:::info
When using a required survey and some input error prevents a task from being created, the _channel_ will be generated but without an assigned task. It will be the implementor's duty to notify this problem adequately in the _channel_; the _user_ must be told to re-send the _survey_ and make the necessary corrections to create the _task_ appropriately.
:::

#### Step-by-step configuration: {#step-by-step-configuration}
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

11. The _required survey_ must be associated as an **answer** to the _task_. In order to do this, the _answer's_ universally unique identifier (UUID) must be included in the **answers** field: 

    ```$VALUE#answer|uuid```

12. The **assignee** value is optional. By default, the _user_ creating the task is set as the _assignee_, but this value can be changed: 

    ```$VALUE#answer|user```


### _Required survey_ for modifying task states {#required-survey-for-modifying-task-states}

Configuring a _required survey_ for when _users_ want to modify a _task's state_ is a little bit simpler than the previous case. Unlike the _required surveys_ used for creating _tasks_, it isn't necessary to add a bot or specify a routine to the _required survey_ when changing a task's state.

This feature makes configuring the _required survey_ easier. In case an automatic response – like sending an email to the CEO –  is desired after changing the state of a task, a bot can be configured through the **Edit routine** button.

:::info
If a _routine_ is afterwards added, the automatic change of _state_ is disabled and must be then configured manually as a step in the routine.
:::

#### Step-by-step configuration: {#step-by-step-configuration-1}
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
