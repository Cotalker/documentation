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

<span className="hero__subtitle">

Tutorial on how to create a workflow that can process tasks through five different states.

</span>

Time: 30 minutes

:::tip Vocabulary Notes:
- **Tasks** can represent anything that has to be done. They exist within _workflows_.
- A **workflow** is the process through which _tasks_ go through.
- Each step of a workflow process is called a **state**. _Users_ can be given access to see and modify the current _state_ of a _task_ in a _workflow_. 
- _Workflows_ are part of **workflow groups**. A workflow group can have various workflows which can be interrelated.
- Each _task_ has its own _channel_ for messaging and sharing files. They can also include _notes_ or even be programmed with _SLAs_.
:::

## Company Requirements {#company-requirements}
The company requests a _task manager_. For now, they only want to see a demo. Therefore, we will create in this tutorial a simple task manager. If they were to like the demo and sign up for this service, configuring the actual workflows and expanding to all departments will be more complicated. You'll get a complete walkthrough on creating complex workflows in the [advanced tutorial section](/docs/tutorials/advanced/project_manager).

For this demo, you will create a _task manager_ with the following characteristics:
- Workflows must include five available **task states**:
    - Backlog
    - Doing
    - Waiting
    - Ready
    - Not implemented
- Tasks must be able to be categorized by **task importance**:
    - High
    - Normal
    - Low
- Tasks must be able to be assigned to **Departments**.

_These characteristics will be represented through collections and their respective elements._

## Tutorial Objectives {#tutorial-objectives}
- [A. Create a workflow group.](#create-workflow-group)
- [B. Create a workflow.](#create-workflow)
- [C. Configure workflow states.](#workflow-states)
- [D. Complete workflow group configuration](#workflow-group-configuration)

## Pre-Requisites {#pre-requisites}
#### Access Role {#access-role}
- Due to the scope of interactions needed to create a workflow, it is best if your _user_ profile's [_access role_](/docs/documentation/admin/admin_accessrole) counts with the `admin-*-write` permission that grants access to the entire **Administrative Panel**.
- You will later need to set the permissions users must have to view and edit workflow tasks. In this tutorial, we will suggest using the `admin-access` permission for both reading and writing in the workflow group. We recommend you add this permission to your access role, as well, in order to test your workflow.

#### Database {#database}
- If you completed the [Create Collection Tutorial](/docs/tutorials/basic/create_database), then you already have the _collection_ that represents company departments. If not, we suggest completing the tutorial.
- You will also need to have previously created the _collections_, and their respective _elements_, that will represent the task states, task importance, and tasks as assets. Below, in the _Tutorial Tip_, is an example of how the collections should look like.

:::tip Tutorial Tip
_The three collections that need to be created: **Task-Asset**, **Task-Importance**, and **Task-States**._

<img alt="collections" className="img_sizing item shadow--tl" src={useBaseUrl('img/tutorials/tutorial_basic_workflow_00.png')} />
<br/>

---

1. **Task-Asset** collection elements:
    - Task

<img alt="collections" className="img_sizing item shadow--tl" src={useBaseUrl('img/tutorials/tutorial_basic_workflow_00a.png')} />
<br/>

---

2. **Task-Importance** collection elements:
    - *High*
    - *Normal*
    - *Low*

<img alt="collections" className="img_sizing item shadow--tl" src={useBaseUrl('img/tutorials/tutorial_basic_workflow_00b.png')} />
<br/>

---
3. **Task-States** collection elements:
    - *1. Backlog*
    - *2. Doing*
    - *3. Waiting*
    - *4. Ready*
    - *5. Not implemented*

<img alt="collections" className="img_sizing item shadow--tl" src={useBaseUrl('img/tutorials/tutorial_basic_workflow_00c.png')} />
<br/>

**Note**: The _code_ for each collection and element will be up to you.
:::



## Steps {#steps}
### A. Create a Workflow Group {#create-workflow-group}

<div className="alert alert--secondary">

**I. Go to the Workflow section.**

<img alt="workflow" className="img_sizing item shadow--tl" src={useBaseUrl('img/tutorials/tutorial_basic_workflow_01.png')} />
<br/>


1. From the **Main Menu Bar**, press the <span className="badge badge--primary">Administrator</span> button.
2. In the **Administrative Panel**, select <span className="badge badge--primary">Workflows</span>.
3. The **Workflow groups** section opens up.

</div>
<br/>

<div className="alert alert--secondary">

**II. Open the Create Workflow Group settings panel.**

<img alt="workflow" className="img_sizing item shadow--tl" src={useBaseUrl('img/tutorials/tutorial_basic_workflow_02.png')} />
<br/>

- Press the <span className="badge badge--primary">+</span> icon in the upper right-hand corner to open the **Create workflow group** settings panel.

</div>
<br/>

<div className="alert alert--secondary">

**III. Configure basic workflow group settings.**

<img alt="workflow" className="img_sizing item shadow--tl" src={useBaseUrl('img/tutorials/tutorial_basic_workflow_03.png')} />
<br/>

1. **Name**: _Task Manager_
2. **Code**: _task\_manager_
3. **Select icon**: _Check circle_
4. **Color**: _Cyan_
5. Press <span className="badge badge--primary">Save</span>. The **Create workflow** settings panel will open up.

</div>
<br/>

### B. Create a Workflow {#create-workflow}

<div className="alert alert--secondary">

**I. Set up basic workflow settings.**

<img alt="workflow" className="img_sizing item shadow--tl" src={useBaseUrl('img/tutorials/tutorial_basic_workflow_04.png')} />
<br/>


1. **Name**: _Task Workflow_
2. **Code**: _task\_workflow_
3. **Type**: _Generic_
4. **Collection**: _Task-Asset_
5. **Element**: _Task_
6. **Additional Field 1**: _Task-Importance_
7. **Additional Field 2**: _General Departments_
8. **States List**: _Task-States_
9. Press <span className="badge badge--primary">Save</span>. The **State creation** settings panel will pop up.

</div>
<br/>

### C. Configure Workflow States {#workflow-states}

<div className="alert alert--secondary">

**I. Set up basic state settings.**

<img alt="workflow" className="img_sizing item shadow--tl" src={useBaseUrl('img/tutorials/tutorial_basic_workflow_05.png')} />
<br/>

_An automatically-generated list of task states appears in the pop-up settings panel. Make sure the state **type** is correct for each corresponding element._

1. **Backlog**: _NEW_
2. **Doing**: _IN-PROGRESS_
3. **Waiting**: _IN-PROGRESS_
4. **Ready**: _CLOSED_
5. **Not implemented**: _CLOSED_
6. Press <span className="badge badge--primary">Save</span>. You will be taken back to the **Create workflow** settings panel.

:::caution
Be careful to indicate the correct state **types** for each element representing a state because they cannot be changed afterward.
:::

</div>
<br/>

<div className="alert alert--secondary">

**II. Confirm initial state.**

<img alt="workflow" className="img_sizing item shadow--tl" src={useBaseUrl('img/tutorials/tutorial_basic_workflow_06.png')} />
<br/>

In the **Create workflow** settings panel, confirm that `1. Backlog` is set as **Initial state**.

</div>
<br/>

<div className="alert alert--secondary">

**III. Configure state order.**

<img alt="workflow" className="img_sizing item shadow--tl" src={useBaseUrl('img/tutorials/tutorial_basic_workflow_07.png')} />
<br/>

From the **Create workflow** settings panel, go to the **Workflow states** section and click on `1. Backlog`. The **Create state** settings panel opens up.

</div>
<br/>

<div className="alert alert--secondary">

**IV. Set the state changes that will be available for the initial state.**

<img alt="workflow" className="img_sizing item shadow--tl" src={useBaseUrl('img/tutorials/tutorial_basic_workflow_08.png')} />
<br/>

1. Press <span className="badge badge--primary">+ Add State Change</span>. More fields open up to indicate what state tasks can go to next.
2. **State**: _2. Doing_
3. **Can change**: _Manual_
4. Press <span className="badge badge--primary">Save</span>. You are taken back to the **Create workflow** settings panel.


</div>
<br/>

<div className="alert alert--secondary">

**V. Complete state changes for the remaining states.**

_Repeat the last two steps for other four remaining states._

:::tip Tutorial Advice
You will need to add more than one state change in most of the remaining states. Feel free to make changes between states more complex or simple.

Here is a suggestion for state changes:
- 1\. Backlog => 2. Doing (Previous step)
- 2\. Doing => 3. Waiting
- 2\. Doing => 4. Ready
- 2\. Doing => 5. Not implemented
- 3\. Waiting => 2. Doing
- 3\. Waiting => 4. Ready
- 3\. Waiting => 5. Not implemented
- 4\. Ready: no changes added
- 5\. Not implemented => 1. Backlog
:::

<img alt="workflow" className="img_sizing item shadow--tl" src={useBaseUrl('img/tutorials/tutorial_basic_workflow_09.png')} />
<br/>

1. Once you have finished setting all state changes in all states, confirm that state changes displayed in the diagram reflect the workflow process you desire.
2. Press <span className="badge badge--primary">Save</span>. You are sent back to the **Workflows** settings panel, where _workflows_ belonging to a _workflow group_ are displayed.

</div>
<br/>

### D. Complete Workflow Group Configuration {#workflow-group-configuration}

<div className="alert alert--secondary">

**I. Set workflow group configuration tab.**

<img alt="workflow" className="img_sizing item shadow--tl" src={useBaseUrl('img/tutorials/tutorial_basic_workflow_10.png')} />
<br/>

1. Press the _arrow_ icon in the **Configuration** tab to expand the settings panel.
2. **Flow type**: _State-machine_
3. **Initial workflow**: _Task Workflow_
4. **Available views**: _List view, Kanban view_
5. **Default view**: _List view_
6. **Read permissions**: _admin-access_
7. **Write permissions**: _admin-access_
8. Press <span className="badge badge--primary">Save</span>. 

:::note Note on Permissions
- Make sure you and the desired _users_ have the specified permissions (6 & 7) in your [access roles](/docs/documentation/admin/users#access). Only those with the indicated [permissions](/docs/documentation/admin/admin_accessrole#default-permissions) will be able to see and edit the tasks respectively.
- Go to the [Create Access Role](/docs/tutorials/basic/create_accessroles) tutorial on how to add permissions to an access role.
- Go to the [Create User](/docs/tutorials/basic/create_user) tutorial to see how to add an access role to a user.
:::

</div>
<br/>

<div className="align-center">

<span className="hero__subtitle">

Congratulations! You have a Task Manager!

</span>

<iframe src="https://giphy.com/embed/3o7btNa0RUYa5E7iiQ" width="90%" height="90%" frameBorder="0" className="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/latenightseth-boom-3o7btNa0RUYa5E7iiQ">via GIPHY</a></p>

</div>
<br/>

## Expected Result {#result}

Access the **Task Manager**:

<img alt="workflow" className="img_sizing item shadow--tl" src={useBaseUrl('img/tutorials/tutorial_basic_workflow_11.png')} />
<br/>

1. From the **Main Menu Bar**, press the **Task Manager** button.
2. From the **Task Manager** group panel, click the list icon on the upper right-hand corner. The _task view_ will open up.

Create a task:

<img alt="workflow" className="img_sizing item shadow--tl" src={useBaseUrl('img/tutorials/tutorial_basic_workflow_12.png')} />
<br/>

1. Press the <span className="badge badge--primary">+</span> to open a new task box.
2. Type a name for the new task and press Enter ⮐ on your keyboard.

In the _task view_, you will see your newly created task with its corresponding workspace.

<img alt="workflow" className="img_sizing item shadow--tl" src={useBaseUrl('img/tutorials/tutorial_basic_workflow_13.png')} />
<br/>

:::tip Tutorial Advice
- In our [next tutorial](/docs/tutorials/basic/tutorial_taskview), we'll see how to view and arrange _tasks_.
- For now, feel free to create more tasks and to change their states by pressing the [actions button in the channel workspace](/docs/documentation/client/channels#task-menus-within-channel).
:::

---

## Related Topics {#related-topics}
- [Workflows Settings Panel Guide](/docs/documentation/admin/workflows/admin_workflow_overview): Administrative Panel documentation
- [COTTaskGroup](/docs/documentation/models/tasks/model_taskgroup): Task Group data model
- [COTTask](/docs/documentation/models/tasks/model_tasks): Task data model
- [COTSMStateMachine](/docs/documentation/models/tasks/model_statemachine): State Machince data model
- [COTSMState](/docs/documentation/models/tasks/model_state): State data model
- [Tasks API](/docs/documentation/api/tasks/): REST API documentation
- [State Machines API](/docs/documentation/api/tasks/statemachines): REST API documentation