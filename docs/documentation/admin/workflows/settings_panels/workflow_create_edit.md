---
title: Create/Edit Workflow
---

import useBaseUrl from '@docusaurus/useBaseUrl'; 

<span className="hero__subtitle">Settings Panel Guide</span>

_Settings panel for creating and editing a workflow. Edit an existing workflow to configure settings not initially available when creating it. From this panel, modify and add states, routines, subtasks, start forms, and SLAs. Make your Start Forms public._

## Create a Workflow {#create-workflow}
You can create a new workflow by pressing the <span className="badge badge--primary">+</span> icon found in the upper right-hand corner of the [Workflows Settings Panel](/docs/documentation/admin/workflows/settings_panels/workflows-setup).

<img alt="create workflow" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_workflow_create_00.png')} />
<br/>
<br/>

## Edit a Workflow {#edit-workflow}
To edit a workflow, access its settings panel by either:

1. Clicking on the workflow diagram:

<img alt="access to edit workflows" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_workflow_edit_00.png')} />
<br/>

2. From the list, click anywhere in the workflow's row:

<img alt="access to edit workflows" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_workflow_edit_01.png')} />
<br/>

<div className="alert alert--secondary">

## Settings Panel Layout {#layout}
After choosing to create or edit a workflow, the **Workflows** settings panel will open up.

:::note
The settings panel options for creating and editing a workflow are slightly different. This means that after creating a workflow, you might have to edit it to configure [states](#states) and [SLAs](#slas).
:::

<img alt="access to edit workflows" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_workflow_edit_02.png')} />
<br/>

_Options:_
1. **Save**: save current configuration

_Settings:_
- [**A. General information**](#general-information)
- [**B. Asset**](#asset)
- [**C. Additional fields**](#additional-fields)
- [**D. States**](#states)
- [**E. SLAs**](#slas)

</div>
<br/>

<div className="alert alert--secondary">

### A. General information {#general-information}

<img alt="access to edit workflows" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_workflow_edit_03.png')} />
<br/>

<div className="container box">
<div className="row table-row-1">
<div className="col col--3"><b>Name:</b></div>
<div className="col col--5">Workflow's display name.</div>
<div className="col col--4"><em>It doesn't have to be unique.</em></div>
</div>
<div className="row table-row-2">
<div className="col col--3"><b>Code:</b></div>
<div className="col col--5">Workflow identification name. Only lowercase letters, numbers, and underscores are accepted. The first character must be a letter.</div>
<div className="col col--4"><em>The code cannot be edited once it is saved.</em></div>
</div>
<div className="row table-row-1">
<div className="col col--3"><b>Chat channels:</b></div>
<div className="col col--5">

Refers to the [relationship](/docs/documentation/admin/tips/chat_channels_workflows) between tasks and their chat channels. 

</div>
<div className="col col--4"><em>

SHOULD BE KEPT AT BOUND.  
_Other options for legacy use only._

</em></div>
</div>
</div>
<br/>

</div>
<br/>

<div className="alert alert--secondary">

### B. Asset {#asset}

<img alt="access to edit workflows" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_workflow_edit_04.png')} />
<br/>

<div className="container box">
<div className="row table-row-2">
<div className="col col--3"><b>Type:</b></div>
<div className="col col--5">

Options are: _unique_ or _generic_.

</div>
<div className="col col--4"><em>Use the "generic" type for tasks that are on-going or cyclical, e.g., a preventive maintenance task. Use the "unique" type for tasks that should be closed once completed.</em></div>
</div>
<div className="row table-row-1">
<div className="col col--3"><b>Collection:</b></div>
<div className="col col--5">

Choose the collection that will act as the asset. This collection is used to define the tasks on the workflow. The collection's [additional fields](/docs/documentation/admin/database/admin_collections#additional-fields) are shared with each task, giving tasks the necessary slots to store relevant data.

</div>
<div className="col col--4"><em>

If the _unique_ type is chosen, task references are stored in the collection.

</em></div>
</div>
<div className="row table-row-2">
<div className="col col--3"><b>Element:</b></div>
<div className="col col--5">

If the _generic_ type is selected, you must choose an element from the collection. This element is used to define the task that flows through the workflow.

</div>
<div className="col col--4"><em></em></div>
</div>
</div>
<br/>

</div>
<br/>

<div className="alert alert--secondary">

### C. Additional fields {#additional-fields}

<img alt="access to edit workflows" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_workflow_edit_05.png')} />
<br/>

<div className="container box">
<div className="row table-row-1">
<div className="col col--3"><b>Status (Nº 1-5):</b></div>
<div className="col col--5">

Adds a collection's [additional fields](/docs/documentation/admin/database/admin_collections#additional-fields) to tasks belonging to the workflow. The additional fields (_statuses_) are used to filter, group, or sort the tasks in the task view. 

These collections correspond to the five _status_ fields belonging to the `dynamicPropertyTypes` object of the [COTSMStateMachine](/docs/documentation/models/tasks/model_statemachine) data model.

</div>
<div className="col col--4"><em>

**Note**: The added [collections with their respective additional fields](/docs/documentation/admin/database/admin_collections#additional-fields) can indicate things like task priority, corresponding company department, or [permissions for unassociated users](/docs/documentation/api/tasks#patch-taskgroup-permissions).

</em></div>
</div>
<div className="row table-row-2">
<div className="col col--3"><b>Additional fields:</b></div>
<div className="col col--5">

Collections are added to be used as [_additional tabs_ on task details](/docs/documentation/admin/workflows/settings_panels/workflowgroup_channels#additional-fields-extensions). The [collections' additional fields](/docs/documentation/admin/database/admin_collections#additional-fields) are included on the added tab. Up to fifty collections can be selected.

The additional fields are used to filter, group, or sort the tasks in the task view. 

These collections correspond to the `allowedExtensions` field in the [COTSMStateMachine](/docs/documentation/models/tasks/model_statemachine) data model.


</div>
<div className="col col--4"><em>

**Note**: The added [collections with their respective additional fields](/docs/documentation/admin/database/admin_collections#additional-fields) can indicate things like task priority, corresponding company department, etc. 
The collections added here are not the same as the additional field options shown above. [See "best practices" below for more information on the differences between these two types of additional fields](#workflow-additional-fields).

</em></div>
</div>
</div>
<br/>

</div>
<br/>

<div className="alert alert--secondary">

### D. States {#states}
_Items 7-10 are only available when editing a workflow._

<img alt="access to edit workflows" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_workflow_edit_06.png')} />
<br/>

<div className="box container">
<div className="row table-row-1">
<div className="col col--3"><b>1. State list</b>:</div>
<div className="col col--5">Select the collection that has the available workflow states. The states are stored as elements in the collection.</div>
<div className="col col--4"><em>The collection –with its elements– must be previously created.</em></div>
</div>
<div className="row table-row-2">
<div className="col col--3"><b>2. Initial state</b>:</div>
<div className="col col--5">Indicates in which state the workflow starts off by default.</div>
<div className="col col--4"><em>

Available options are the elements present in the collection selected in the **State list** field.

</em></div>
</div>
<div className="row table-row-1">
<div className="col col--3"><b>3. Start form</b>:</div>
<div className="col col--5">

Indicates that a survey will initialize the workflow. Remember to previously create the survey and choose it from the dropdown menu where all existing surveys will appear as options.

Once selected, the <span className="badge badge--secondary">Share</span> button will appear.

</div>
<div className="col col--4"><em>

Go to [Start Forms](/docs/documentation/admin/workflows/admin_workflow_required_survey) for more setup information.

</em></div>
</div>
<div className="row table-row-2">
<div className="col col--3"><b>4. Start form permissions</b>:</div>
<div className="col col--5">Select permissions users need to create a subtask. Users are requiered to have at least one of the selected persmissions.</div>
<div className="col col--4"><em>

Users are assigned permissions through their [access roles](/docs/documentation/admin/admin_accessrole).

</em></div>
</div>
<div className="row table-row-1">
<div className="col col--3"><b>5. + Edit Routine</b>:</div>
<div className="col col--5">Routines automate processes within the workflow.</div>
<div className="col col--4"><em>

[Click here](/docs/documentation/automation/admin_routine) to learn more about routines.

</em></div>
</div>
<div className="row table-row-2">
<div className="col col--3"><b>6. Share</b>:</div>
<div className="col col--5">

Press this button to get a **link** which will permit you to share the survey outside the Cotalker environment. Appears when a _survey_ is selected in the **Start form** field.

</div>
<div className="col col--4"><em>

See the [Survey](/docs/documentation/admin/survey/survey_overview) documentation for more details.

</em></div>
</div>

<div className="row table-row-1">
<div className="col col--3"><b>7. Diagram icon</b>:</div>
<div className="col col--5">

Press this icon to hide or display the workflow diagram.

</div>
<div className="col col--4"><em></em></div>
</div>
<div className="row table-row-2">
<div className="col col--3"><b>8. Create state icon</b>:</div>
<div className="col col--5">

After pressing the <span className="badge badge--primary">+</span> icon to create new states in the workflow, the [**Create State settings panel**](/docs/documentation/admin/workflows/settings_panels/create_edit_state) will open up.

</div>
<div className="col col--4"><em></em></div>
</div>
<div className="row table-row-1">
<div className="col col--3"><b>9. Workflow diagram</b>:</div>
<div className="col col--5">

Press the nodes on the diagram to [edit the corresponding state](/docs/documentation/admin/workflows/settings_panels/create_edit_state).

</div>
<div className="col col--4"><em></em></div>
</div>
<div className="row table-row-2">
<div className="col col--3"><b>10. Workflow list</b>:</div>
<div className="col col--5">

Displays the states that exist within the workflow. Press anywhere within a row to [edit the corresponding state](/docs/documentation/admin/workflows/settings_panels/create_edit_state).

</div>
<div className="col col--4"><em></em></div>
</div>

</div>
<br/>

</div>
<br/>

<div className="alert alert--secondary">

### E. SLAs {#slas}
_This section in only available when editing a workflow._
<img alt="access to edit workflows" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_workflow_edit_07.png')} />
<br/>

A service-level agreement (SLA) can be incorporated into the workflow. When a task does not change from one state to another at a pre-determined time, a routine can be built to take a course of action, like sending a reminder to whoever was assigned the task.

_For information on how to **add an SLA routine** to your workflow, go to the [SLA Routine](/docs/documentation/automation/sla) section._

</div>
<br/>

---

## Best Practices {#best-practices}
### Associating Tasks from Different Workflows {#tasks-different-workflows}
If needed, you can associate tasks that belong to different workflows. To do this, go to the [**Asset** section in the **Create/Edit Workflow** settings panel](/docs/documentation/admin/workflows/settings_panels/workflow_create_edit#asset). Set the **type** of each workflow to _unique_. The [_id_ of the **task**](/docs/documentation/models/tasks/model_tasks) that is to be associated must be included as an [additional field](/docs/documentation/admin/database/admin_collections#additional-fields) of the **asset** (element) of the other task's workflow.

For example, if _Task 1_ from _Workflow A_ is to be associated with _Task 5_ of _Workflow B_, the _element_ set as the **asset** of _Workflow A_ must include the Id of _Task 5_ in its additional fields. This will permit a [routine](/docs/documentation/automation/admin_routine) to communicate with _Task 5_ from _Task 1_, which would be the case if a [Network Request](/docs/documentation/automation/bots/nwrequest-2.0.0) is used to call the **asset** of _Workflow A_ to obtain the Id of its associated task, i.e., _Task 5_, and hence, being able to [automatically send a message](/docs/documentation/automation/bots/pbmessage-2.0.0) to _Task 5_'s channel or performing [any other automated action](/docs/documentation/automation/existing_routines) in the channel.

The same can be done using [child elements (subproperties)](/docs/documentation/admin/database/admin_elements#general-information) instead of additional fields with task Ids.

### Using Additional Fields in Workflows. {#workflow-additional-fields}
When using **additional fields** in your workflows, you will find two types of **additional fields**. 

_Two types of additional fields for workflows:_
<img alt="additional fields in workflows" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_workflow_create_edit_bestpractices_00.png')} />
<br/>

The first five _additional fields_ or **statuses** (A) correspond to the `dynamicPropertyTypes` field in the workflow's data model ([COTSMStateMachine](/docs/documentation/models/tasks/model_statemachine)). The **additional fields** slot found at the bottom of the section (B) can contain multiple collections and are stored in the `allowedExtensions` field of the [COTSMStateMachine data model](/docs/documentation/models/tasks/model_statemachine).

As best practice, it is recommended to use the first five **statuses** (A) because their structure permits greater consistency between the elements.


## Related Topics {#related-topics}
- [**Create a Workflow Tutorial**](/docs/tutorials/basic/create_state_machines)
- [**Create a Survey that Starts a Workflow Tutorial**](/docs/tutorials/intermediate/create_survey_sm)
- [**Set up Start Forms**](/docs/documentation/admin/workflows/admin_workflow_required_survey)
- [**Set up a Public Survey**](/docs/documentation/admin/workflows/admin_workflow_public_survey)
- [**Routine Builder**](/docs/documentation/automation/admin_routine)
- [**SLAs**](/docs/documentation/automation/sla)
