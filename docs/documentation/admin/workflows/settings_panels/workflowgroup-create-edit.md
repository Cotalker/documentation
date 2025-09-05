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
1. **Dev Mode**: Enables advanced developer options. Once enabled, it cannot be disabled.
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

The Data Model section allows you to define custom data elements that will be associated with tasks in this workflow group. These elements extend the standard task information with additional properties specific to your business needs.

**1. Elements Overview**

The main Data Model interface displays a list of available element types on the left side. To add elements to your workflow, simply drag and drop the desired element type from the available options into the elements list. Once added, each element can be configured individually by clicking on it.
<br/>

<img alt="data model list" className="img_sizing img_format item shadow--tl" src={useBaseUrl('img/admin_workflowgroup_create_datamodel_01.png')} />

<br/>

<div className="container box">
<div className="row table-row-1">
<div className="col col--3"><b>Elements:</b></div>
<div className="col col--5">Drag and drop elements from the available types to build your custom data model.</div>
<div className="col col--4"><em>Configure each element's properties using the General and Advanced tabs.</em></div>
</div>
</div>
<br/>

#### Available Element Types

The system provides eight different data types that can be added to your workflow:

- **Boolean**: True/false values for binary choices
- **Date**: Date and time fields for temporal information
- **Property**: References to existing database properties
- **File**: File attachments and document uploads
- **Link**: URL links to external resources
- **Number**: Numeric values for quantities, measurements, etc.
- **Text**: Free-form text fields for descriptions and notes
- **User**: User references for assignments and responsibilities

<br/> 

**2. General Configuration**

<img alt="general config" className="img_sizing img_format item shadow--tl" src={useBaseUrl('img/admin_workflowgroup_create_datamodel_02.png')} />
<br/>
When you click on any element in the list, the General configuration tab opens. This section contains the fundamental settings for each element:

- **Name**: The display name that users will see for this field
- **Code**: A unique identifier used internally by the system
- **Description**: Additional information about the element's purpose
- **Required**: Whether this field must be filled when creating or updating tasks
- **Element-Specific Fields**: The available configuration fields will vary depending on the data type of the element you select. Each element type (such as Text, Number, Date, User, etc.) presents its own set of relevant options and properties. 

These settings define how the element appears and behaves in the user interface.

**3. Advanced Configuration (Workflow Version 2 Only)**

<img alt="advanced configuration" className="img_sizing img_format item shadow--tl" src={useBaseUrl('img/admin_workflowgroup_create_datamodel_03.png')} />

For workflows running on version 2, the Advanced tab provides additional configuration options that control element visibility and behavior:

- **Visible**: Controls whether this element appears in the task detail view and table view. When disabled, the field exists in the data model but is hidden from users.

- **Editable**: Determines if users can modify this field's value in the task detail view. When disabled, the field becomes read-only after initial creation.

- **Indexable**: Enables filtering and searching capabilities for this field across different views. When enabled, users can filter tasks based on this element's values in list views and reports.

These advanced settings provide fine-grained control over how elements behave in the user interface and help optimize the user experience based on specific workflow requirements.

#### Multi-language Support

All workflow versions support multi-language configuration for element names and descriptions. This allows you to provide localized labels that match your organization's language preferences, ensuring that users see field names in their preferred language.

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

These _additional fields_ differ from the _statuses_ shown above (status 1-5). [See "best practices" below for information on the preference of _statuses_ over _additional fields_](#status-vs-additional-fields).

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

<img alt="SLAs" className="img_sizing img_format img_format item shadow--tl" src={useBaseUrl('img/admin_workflow_edit_07.png')} />
<br/>

<div className="container box">
<div className="row table-row-1">
<div className="col col--3"><b>Create SLA:</b></div>
<div className="col col--5">
A service-level agreement (SLA) can be incorporated into the workflow. When a task does not change from one state to another at a pre-determined time, a routine can be built to take a course of action, like sending a reminder to whoever was assigned the task.
</div>
<div className="col col--4"><em>
For information on how to <strong>add an SLA routine</strong> to your workflow, go to the <a href="/docs/documentation/automation/sla">SLA Routine</a> section.
</em></div>
</div>
</div>
<br/>

</div>
<br/>

<div className="alert alert--secondary">

### F. Advanced Settings {#advanced-settings-section}
_Configure advanced workflow options and permissions._

<img alt="access to edit workflows" className="img_sizing img_format item shadow--tl" src={useBaseUrl('img/admin_workflow_edit_08.png')} />
<br/><br/>

<table>
  <tbody>
    <tr>
      <td><b>Available visualization mode</b></td>
      <td>Specifies how users can view tasks within the task panel. The available options (shown as icons in the menu bar) are: Calendar view, Table view, Kanban view, and List view.</td>
    </tr>
    <tr>
      <td><b>Default view</b></td>
      <td>Sets the default view in the task section. Options include: List, Kanban, Calendar and Table.</td>
    </tr>
    <tr>
      <td><b>Hide closed tasks after</b></td>
      <td>Closed tasks will disappear from the task panel after the specified number of days, but will remain accessible in the workflows channel panel.</td>
    </tr>
    <tr>
      <td><b>Default selected task tab</b></td>
      <td>Defines which task tab is selected by default when opening the task panel.</td>
    </tr>
    <tr>
      <td><b>User bot name</b></td>
      <td>Code name of the automatically created bot associated with the workflow group. The name is generated using the workflow group's code as a reference.</td>
    </tr>
    <tr>
      <td><b>Access roles</b></td>
      <td>Access roles that allow the bot to act on the workflow.</td>
    </tr>
    <tr>
      <td><b>Unique Forms</b></td>
      <td>Configure unique form settings for this workflow.</td>
    </tr>
    <tr>
      <td><b>Workflow visualization permissions</b></td>
      <td>Defines which users or roles can view the workflow and its tasks.</td>
    </tr>
    <tr>
      <td><b>Task import permissions</b></td>
      <td>Defines which users or roles can import tasks into the workflow.</td>
    </tr>
    <tr>
      <td><b>Visualize all tasks permissions</b></td>
      <td>Defines which users or roles can view all tasks in the workflow, regardless of assignment.</td>
    </tr>
    <tr>
      <td><b>Permissions by properties</b></td>
      <td>Set specific permissions based on task properties. Includes functionality to add custom properties.</td>
    </tr>
  </tbody>
</table>
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


## Related Topics {#related-topics}
- [**Create a Workflow Tutorial**](/docs/tutorials/basic/create_state_machines)
- [**Create a Survey that Starts a Workflow Tutorial**](/docs/tutorials/intermediate/create_survey_sm)
- [**Set up Start Forms**](/docs/documentation/admin/workflows/admin_workflow_required_survey)
- [**Set up a Public Survey**](/docs/documentation/admin/workflows/admin_workflow_public_survey)
- [**Routine Builder**](/docs/documentation/automation/admin_routine)
- [**SLAs**](/docs/documentation/automation/sla)
