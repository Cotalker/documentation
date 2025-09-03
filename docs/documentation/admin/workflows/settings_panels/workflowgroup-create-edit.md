---
title: Create/Edit a Workflow Group
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<span className="hero__subtitle">Settings Panel Guide</span>

_Create and configure workflow groups. A workflow group contains workflows with their states, forms, and automations._

## Create a Workflow {#create-workflow-group}

From the [Initial Settings Panel (Workflows)](/docs/documentation/admin/workflows/admin_workflow_overview#layout), press <span className="badge badge--primary">+</span>.

<img alt="create new workflow" className="img_sizing img_format item shadow--tl" src={useBaseUrl('img/admin_workflowgroup_create_00a.png')} />
<br/>

## Edit a Workflow {#edit-workflow-group}

From the [Initial Settings Panel (Workflows)](/docs/documentation/admin/workflows/admin_workflow_overview#layout), press the corresponding icon from the _workflow list_.

<img alt="edit workflow" className="img_sizing img_format item shadow--tl" src={useBaseUrl('img/admin_workflowgroup_edit_00a.png')} />
<br/>

<div className="alert alert--secondary">

## Settings Panel Layout {#panel-layout}
After choosing to create or edit a workflow, the following settings panel opens up:

<img alt="settings panel" className="img_sizing img_format item shadow--tl" src={useBaseUrl('img/admin_workflowgroup_create_00.png')} />
<br/>

_Options:_
1. **Dev Mode**: Enabled advance developet options. Once enabled, it cannot be disabled.
2. **Deactivate**: Deactivate the element.
3. **Save**: Save current configuration.

_Settings:_
- [**A. General Information**](#general-information-section)
- [**B. Data Model**](#data-model-section)
- [**C. Tags and Additional Fields**](#tags-additional-fields-section)
- [**D. Icon**](#icon-section)
- [**E. SLAs**](#slas-section)
- [**F. Advanced Settings**](#advanced-settings-section)

</div>
<br/>

<div className="alert alert--secondary">

### A. General Information {#general-information-section}
_Basic setup and display options._

<img alt="general info" className="img_sizing img_format item shadow--tl" src={useBaseUrl('img/admin_workflowgroup_create_01a.png')} />

<br/>

**Basic Workflow Configuration Fields:**
This section displays the primary configuration fields for setting up a workflow group:

- **Workflow Name**: The display name for the workflow group
- **Code**: Unique identification code for the workflow (lowercase letters, numbers, and underscores only)
- **Weight**: Relative positioning number for list ordering (smaller numbers appear first)
- **Description**: Brief explanation of the workflow group's purpose
- **Data Collection**: Selection of the collection that will act as the asset for task definitions
- **State List**: Collection containing the available workflow states

<br/>

<img alt="general info" className="img_sizing img_format item shadow--tl" src={useBaseUrl('img/admin_workflowgroup_create_01b.png')} />

<br/>

**Workflow States Diagram and Start Form Configuration:**
This section shows the visual workflow diagram and start form settings:

- **Workflow States Diagram**: Visual representation of the workflow flow and its states. Use the **+** button to create new states
- **Start Form**: The selected survey form that will initialize the workflow. This survey must be previously created and can be chosen from the dropdown menu where all existing surveys appear as options. For more details, see the [Start Form section](../../workflows/admin_workflow_required_survey.md). Once selected, the Share button will appear. The actions button provides four key functions:
  1. **Edit Form**: Opens the editor for the selected start form
  2. **Mapping**: Opens the mapper panel for this form
  3. **Share**: Provides sharing options for the form
  4. **Edit Routine**: Opens the routine builder for workflow automation
- **Start Form Permissions**: Select permissions users need to create a subtask. Users are required to have at least one of the selected permissions. Users are assigned permissions through their access roles
- **Automatic Task Creation with Start Form**: Checkbox option to enable automatic task generation when the start form is submitted

<br/>

<img alt="general info" className="img_sizing img_format item shadow--tl" src={useBaseUrl('img/admin_workflowgroup_create_01c.png')} />

<br/>

**States List Management:**
This section displays the complete list of workflow states with management options:

- **State Name**: Display name for each workflow state
- **State ID**: Unique identifier that can be copied for reference
- **Type**: State classification (New, In Progress, or Closed)
- **Settings Button**: Configuration options for editing each individual state

Each state entry provides quick access to essential state information and editing capabilities for workflow management.

<br/>



</div>
<br/>

<div className="alert alert--secondary">

### B. Data Model {#data-model-section}
_Configure the data structure and elements for this workflow group._

<div className="container box">
<div className="row table-row-1">
<div className="col col--3"><b>Elements:</b></div>
<div className="col col--5">Configure the data elements and properties for this workflow group.</div>
<div className="col col--4"><em>This section will be configured later.</em></div>
</div>
</div>
<br/>

</div>
<br/>

<div className="alert alert--secondary">

### C. Tags and Additional Fields {#tags-additional-fields-section}
_Configure Tag fields and additional fields for tasks._

<img alt="additional fields" className="img_sizing img_format item shadow--tl" src={useBaseUrl('img/admin_workflow_edit_05.png')} />
<br/>

<div className="container box">
<div className="row table-row-1">
<div className="col col--3"><b>Status (Nº 1-5):</b></div>
<div className="col col--5">

Adds a _collection_ as an [additional field or status](/docs/documentation/admin/database/admin_collections#additional-fields) on all tasks belonging to the workflow. 

The _elements_ within the _collection_ are used as the available values (options) for each _status_. 

<br/>

_Status_ options can indicate things like task priority, corresponding company department, or [permissions for unassociated users](/docs/documentation/api/tasks#patch-taskgroup-permissions).

<br/>

_Status_ values can also be used to filter, group, or sort the tasks in the task view.


</div>
<div className="col col--4"><em>

_Status_ fields are displayed on the [general information of task details](/docs/documentation/client/tasks/task_details).

<br/>

_Status_ values appear on task descriptions when displayed on [list](/docs/documentation/client/tasks/taskview#list-view) or [kanban](/docs/documentation/client/tasks/taskview#kanban-view) views.

<br/>

These collections correspond to the five _status_ fields belonging to the `dynamicPropertyTypes` object of the [COTSMStateMachine](/docs/documentation/models/tasks/model_statemachine) data model.


</em></div>
</div>
<div className="row table-row-2">
<div className="col col--3"><b>Additional fields:</b></div>
<div className="col col--5">

_Collections_ used to add extra information to tasks. The [_additional fields contained within the selected collections_](/docs/documentation/admin/database/admin_collections#additional-fields) will be used as additional fields on the task. Up to fifty collections can be selected.

<br/>

The added [collections with their respective additional fields](/docs/documentation/admin/database/admin_collections#additional-fields) can indicate things like task priority, corresponding company department, etc. 

<br/>

The _additional fields_ can also be used to filter, group, or sort the tasks in the _task view_. 

</div>
<div className="col col--4"><em>

These _additional fields_ will appear within [_extra tabs_ on task details](/docs/documentation/admin/workflows/settings_panels/workflowgroup_channels#details-layout). 

<br/>

These _collections_ correspond to the `allowedExtensions` field in the [COTSMStateMachine](/docs/documentation/models/tasks/model_statemachine) data model.

<br/>

These _additional fields_ differ from the _statuses_ shown above (status 1-5). [See "best practices" below for information on the preference of _statuses_ over _additional fields_](#workflow-additional-fields).

</em></div>
</div>
</div>
<br/>

</div>
<br/>

<div className="alert alert--secondary">

### D. Icon Fields {#icon-section}
_Configures the group icon shown on the Main Menu Bar or Group Panel._

<img alt="icon" className="img_sizing img_format item shadow--tl" src={useBaseUrl('img/admin_workflowgroup_create_02.png')} />
<br/>

<div className="container box">
<div className="row table-row-1">
<div className="col col--3"><b>Select icon:</b></div>
<div className="col col--5">Choose personalized or pre-designed icon from the menu.</div>
<div className="col col--4"><em>Personalized icons are configured in the "Path" field.</em></div>
</div>
<div className="row table-row-2">
<div className="col col--3"><b>Color:</b></div>
<div className="col col--5">Choose from the menu the icon's color.</div>
<div className="col col--4"><em></em></div>
</div>
<div className="row table-row-1">
<div className="col col--3"><b>Path:</b></div>
<div className="col col--5">Must be filled with Scalable Vector Graphics (SVG) code.</div>
<div className="col col--4"><em>The path is completed automatically when a pre-designed icon is chosen. For personalized icons, SVG code must be inserted manually.</em></div>
</div>
</div>
<br/>

</div>
<br/>

<div className="alert alert--secondary">

### E. SLAs {#slas-section}
_Configure Service Level Agreements for workflow automation._

<img alt="SLAs" className="img_sizing img_format item shadow--tl" src={useBaseUrl('img/admin_workflow_edit_07.png')} />
<br/>

<div className="container box">
<div className="row table-row-1">
<div className="col col--3"><b>Create SLA:</b></div>
<div className="col col--5">
A service-level agreement (SLA) can be incorporated into the workflow. When a task does not change from one state to another at a pre-determined time, a routine can be built to take a course of action, like sending a reminder to whoever was assigned the task.
</div>
<div className="col col--4"><em>
For information on how to **add an SLA routine** to your workflow, go to the [SLA Routine](/docs/documentation/automation/sla) section.
</em></div>
</div>
</div>
<br/>

</div>
<br/>

<div className="alert alert--secondary">

### F. Advanced Settings {#advanced-settings-section}
_Configure advanced workflow options and permissions._

<div className="container box">
<div className="row table-row-1">
<div className="col col--3"><b>View Configuration:</b></div>
<div className="col col--5">Configure how the workflow group is displayed to users.</div>
<div className="col col--4"><em>This section will be configured later.</em></div>
</div>
<div className="row table-row-2">
<div className="col col--3"><b>User Bot Information:</b></div>
<div className="col col--5">Configure bot interactions and automated responses.</div>
<div className="col col--4"><em>This section will be configured later.</em></div>
</div>
<div className="row table-row-1">
<div className="col col--3"><b>Unique Forms:</b></div>
<div className="col col--5">Configure unique form settings for this workflow.</div>
<div className="col col--4"><em>This section will be configured later.</em></div>
</div>
<div className="row table-row-2">
<div className="col col--3"><b>Workflow Permissions:</b></div>
<div className="col col--5">Set permissions for who can access and modify this workflow.</div>
<div className="col col--4"><em>This section will be configured later.</em></div>
</div>
<div className="row table-row-1">
<div className="col col--3"><b>Task Permissions Configuration:</b></div>
<div className="col col--5">Configure permissions for task creation and modification.</div>
<div className="col col--4"><em>This section will be configured later.</em></div>
</div>
<div className="row table-row-2">
<div className="col col--3"><b>Permissions by Properties:</b></div>
<div className="col col--5">Set specific permissions based on task properties.</div>
<div className="col col--4"><em>This section will be configured later.</em></div>
</div>
</div>
<br/>

</div>
<br/>

## Best Practices {#best-practices}

### Using Status Fields vs Additional Fields {#status-vs-additional-fields}
When using **status fields** and **additional fields** in your workflows, note the differences:

The five **status fields** (Status 1-5) correspond to the `dynamicPropertyTypes` field in the workflow's data model ([COTSMStateMachine](/docs/documentation/models/tasks/model_statemachine)) and are displayed as [standard task settings](/docs/documentation/client/tasks/task_details/standard-task-details) on the [task details](/docs/documentation/client/tasks/task_details) panel. 

The **additional fields** can contain multiple _collections_ and are stored in the `allowedExtensions` field of the [COTSMStateMachine data model](/docs/documentation/models/tasks/model_statemachine). These _additional fields_ are displayed as extra tabs in the [task details](/docs/documentation/client/tasks/task_details) panel.

As best practice, it is recommended to use the **status fields** (1-5) because their structure permits greater consistency between the elements.

### Sorting Tasks {#sorting-tasks}
It is recommended to sort tasks in the group panel by _states_ so that users can visually identify the state their tasks are found in. Task (workflow) states are represented by the elements (properties) found in the collection (property types) associated with the workflow.

---

## Workflows Setup {#workflows-setup}

_Configure the workflow group. Create and edit workflows within a workflow group._

### Access the Workflows Setup Panel {#access-workflows-setup}

From the [Initial Settings Panel (Workflow Groups)](/docs/documentation/admin/workflows/admin_workflow_overview#layout), press the corresponding icon from the _workflow group list_.

<img alt="access workflow setup" className="img_sizing img_format img_formatitem shadow--tl" src={useBaseUrl('img/admin_workflow_setup_00.png')} />
<br/>

<div className="alert alert--secondary">

### Workflows Setup Panel Layout {#workflows-setup-panel-layout}

After choosing to set up workflows, the following **Workflows** settings panel opens up:

<img alt="settings panel layout" className="img_sizing img_format item shadow--tl" src={useBaseUrl('img/admin_workflow_setup_01.png')} />
<br/>

_Options and Settings:_
1. Display workflow diagrams in panel (4)
2. Add workflow: create a new workflow in the workflow group
3. [Configuration](#workflows-configuration): configure workflow group
4. Workflow diagrams: edit workflow
5. Workflow list: edit workflow

</div>
<br/>

<div className="alert alert--secondary">

### Workflows Configuration {#workflows-configuration}

<img alt="configuration" className="img_sizing img_format item shadow--tl" src={useBaseUrl('img/admin_workflow_setup_02.png')} />
<br/>

<div className="container box">
<div className="row table-row-1">
<div className="col col--3"><b>Flow Type:</b></div>
<div className="col col--5">

Determines how tasks transition from one state to another, i.e., either _freely_ or through a _state-machine_ process.

</div>
<div className="col col--4"><em>

- **State-machine**: Task state transitions much be predetermined in the setup.
- **Free**: Tasks can freely change from one state to another.

</em></div>
</div>
<div className="row table-row-2">
<div className="col col--3"><b>Initial Workflow:</b></div>
<div className="col col--5">

Choose the _initial workflow_ from the existing workflows in the group.

</div>
<div className="col col--4"><em></em></div>
</div>

<div className="row table-row-1">
<div className="col col--3"><b>Available Views:</b></div>
<div className="col col--5">

Indicates how users can view tasks within the _task view_. The options will be made available through icons in the task view menu bar.

</div>
<div className="col col--4"><em>

Options are _Calendar view_, _Table view_, _Kanban view_, and _List view_.

</em></div>
</div>

<div className="row table-row-2">
<div className="col col--3"><b>Default view:</b></div>
<div className="col col--5">

Indicates the default view in the _task view_ section. Options are _Calendar view_, _Gantt view_, _Table view_, _Kanban view_, and _List view_.

</div>
<div className="col col--4"><em></em></div>
</div>
<div className="row table-row-1">
<div className="col col--3"><b>Default filter:</b></div>
<div className="col col--5">

Filter used by default to sort tasks in the _task view_.

</div>
<div className="col col--4"><em>

Options are determined by the global filters that have been created.

</em></div>
</div>
<div className="row table-row-2">
<div className="col col--3"><b>Hide closed tasks after:</b></div>
<div className="col col--5">Closed tasks will disappear from the task view after the amount of days indicated.</div>
<div className="col col--4"><em>Closed tasks will remain in the workflows channel panel.</em></div>
</div>
<div className="row table-row-1">
<div className="col col--3"><b>User bot name:</b></div>
<div className="col col--5">Code name of automatically-created bot associated with the workflow group.</div>
<div className="col col--4"><em>The name is automatically generated using the workflow group's code name as reference.</em></div>
</div>
<div className="row table-row-2">
<div className="col col--3"><b>Access roles:</b></div>
<div className="col col--5">Access roles that allow the bot to act upon the workflow.</div>
<div className="col col--4"><em></em></div>
</div>
<div className="row table-row-1">
<div className="col col--3"><b>Read Permissions:</b></div>
<div className="col col--5">

Permissions that allow users to view task settings in the details tab.

</div>
<div className="col col--4"><em>

List of available Read Permissions

</em></div>
</div>
<div className="row table-row-2">
<div className="col col--3"><b>Write Permissions:</b></div>
<div className="col col--5">

Permissions that allow users to edit task settings in the details tab.

</div>
<div className="col col--4"><em>

List of available Write Permissions

</em></div>
</div>

</div>
<br/>

:::note Attention
You may add as many permissions as you want, but do not change the previously assigned _permissions_. Nor should you change the _initial workflow_. These changes could alter the functionality of existing workflows.  If you want to unassign a _permission_ or change the initial _workflow_, please check with the support team.
:::

</div>
<br/>

## Related Topics {#related-topics}
- [**Create a Workflow Tutorial**](/docs/tutorials/basic/create_state_machines)
- [**Create a Survey that Starts a Workflow Tutorial**](/docs/tutorials/intermediate/create_survey_sm)
- [**Set up Start Forms**](/docs/documentation/admin/workflows/admin_workflow_required_survey)
- [**Set up a Public Survey**](/docs/documentation/admin/workflows/admin_workflow_public_survey)
- [**Routine Builder**](/docs/documentation/automation/admin_routine)
- [**SLAs**](/docs/documentation/automation/sla)
