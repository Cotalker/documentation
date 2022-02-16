---
title: Workflow Group Tasks
---
import useBaseUrl from '@docusaurus/useBaseUrl'; 

<span className="hero__subtitle">Settings Panel Guide</span>

_Workflow groups host [tasks](/docs/documentation/client/taskview) that exist within their workflows or state machines. You can access an individual task's configuration from the Administrative Panel or the task's workspace. Task configuration from the Administrative Panel is described below._

_Take advantage of tasks' ample array of tools and configurations that permit customizing them to your organization's needs. All tasks have an incorporated [channel workspace](/docs/documentation/client/channels), the ability to share files and [notes](/docs/documentation/client/notes#task-notes), and the possibility to view and configure other settings, like state, users, start and end dates, additional fields, among others._


## Access settings panel {#access}

To access a workflow-group channel's settings panel:

1. From the workflow groups (initial) setting panel, select the channel manager icon of the corresponding workflow.

<img alt="channel manager" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_workflowgroup_channel_00.png')} />
<br/>

2. A list of all the channels available in the workflow group opens up. Choose the channel you wish to edit. The [task details panel](#layout) opens up.

<img alt="channel manager" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_workflowgroup_channel_01.png')} />
<br/>

<div className="alert alert--secondary">

## Task Details Panel Layout {#layout}

_After choosing to edit a task, the following panel opens up._

<div className="container">
<div className="row">
<div className="col col--6">

<img alt="channel layout" className="img_sizing_narrow item shadow--tl" src={useBaseUrl('img/admin_workflowgroup_channel_02.png')} />
<br/>

</div>
<div className="col col--6">

_Main settings and actions:_
- **1. Task number**: Automatically assigned number in sequential order.
- **2. Task name**: The name given to the task by its creator.
- **3. Save**: Saves current changes made to the task's settings.
- **4. Delete**: Deletes the task and removes it from all lists.

_Settings:_
- [**A. Additional information**](#additional-information): Space used to give a brief description of the task.
- [**B. General information**](#general-information): Basic task settings.
- [**C. Additional fields (status)**](#additional-fields-status): Collections assigned as additional fields of the task are displayed here. These additional fields, known as _statuses_, are optional and vary in every workflow. 
- [**D. Additional fields (extensions)**](#additional-field-extensions): Collections assigned as additional fields of the task are displayed here. These additional fields, known as _extensions_ are optional and vary in every workflow.
- [**E. Notes**](#notes): Displays the list of task notes. Permits viewing and creating notes.
- [**F. Images, Videos, Files**](#attachments): Displays thumbnails of files shared within the task workspace.


</div>
</div>
</div>

</div>
<br/>

<div className="alert alert--secondary">

### A. Additional information {#additional-information}
_Customizable description of the task._

<img alt="general info" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_workflowgroup_channel_03.png')} />
<br/>

Users with task editing access can write a brief description of the task here for other users to see.

:::note
The Cotalker platform [search tool](/docs/documentation/client/client_search) also searches through this field, making the task easier to find through search queries.
:::

</div>
<br/>

<div className="alert alert--secondary">

### B. General information {#general-information}
_Basic task settings._

<img alt="participants" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_workflowgroup_channel_04.png')} />
<br/>

<div className="container box">
<div className="row table-row-1">
<div className="col col--3"><strong>Status</strong>:</div>
<div className="col col--4">Indicates the current status or state the task is found in.</div>
<div className="col col--5"><em>

The workflow configuration can permit manual [state changes](/docs/documentation/admin/workflows/settings_panels/create_edit_state#state-changes).

</em></div>
</div>
<div className="row table-row-2">
<div className="col col--3"><strong>Assignee</strong>:</div>
<div className="col col--4">Indicates the user in charge of the task.</div>
<div className="col col--5"><em>

The assignee is usually designated automatically but can be modified manually.

</em></div>
</div>
<div className="row table-row-1">
<div className="col col--3"><strong>Creator</strong>:</div>
<div className="col col--4">Displays the user that created the task.</div>
<div className="col col--5"><em>Tasks can be created either by human or bot users.</em></div>
</div>
<div className="row table-row-2">
<div className="col col--3"><strong>Users</strong>:</div>
<div className="col col--4">

Indicates the users associated with the task. Users can be added by typing their names in the field. Assign different user roles within the task by double-clicking on their name tags until the desired role appears.

</div>
<div className="col col--5"><em>

Roles include: **editors**, **followers**, and **visibility**. **Editors** can view and edit all task details, chat and use notes; **followers** can chat, use notes, and view all details but cannot edit them; the **visibility** role permits users to participate in the chat, use notes, and can only view some task details.

</em></div>
</div>
<div className="row table-row-1">
<div className="col col--3"><strong>SLAs</strong>:</div>
<div className="col col--4">Lists active Service-Level Agreements (SLAs) within the task's workflow.</div>
<div className="col col--5"><em>

[Click here to learn more about SLAs.](/docs/documentation/automation/sla)

</em></div>
</div>
<div className="row table-row-2">
<div className="col col--3"><strong>Answers</strong>:</div>
<div className="col col--4">Displays the ObjectIds of the answers or responses given to surveys associated with the task.</div>
<div className="col col--5"><em>

[**Answers**](/docs/documentation/client/reports) can be viewed in the Reports section or through the [API tools](/docs/documentation/api/surveys/answers#get-by-id).

</em></div>
</div>
<div className="row table-row-1">
<div className="col col--3"><strong>Creation date</strong>:</div>
<div className="col col--4">Indicates the date the task was created.</div>
<div className="col col--5"><em></em></div>
</div>
<div className="row table-row-2">
<div className="col col--3"><strong>Start date</strong>:</div>
<div className="col col--4">Sets the date the task should begin.</div>
<div className="col col--5"><em>The date can be used to set up an SLA.</em></div>
</div>
<div className="row table-row-1">
<div className="col col--3"><strong>End date</strong>:</div>
<div className="col col--4">Sets the date the task should end.</div>
<div className="col col--5"><em>The date can be used to set up an SLA.</em></div>
</div>
<div className="row table-row-2">
<div className="col col--3"><strong>Estimated time</strong>:</div>
<div className="col col--4">Indicates the amount of days it should take to complete the task.</div>
<div className="col col--5"><em></em></div>
</div>
</div>
<br/>

</div>
<br/>

<div className="alert alert--secondary">

### C. Additional Fields (Status) {#additional-fields-status}
_Displays extra fields in the general information section._

_Example:_
<img alt="elements" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_workflowgroup_channel_05.png')} />
<br/>

Additional fields are optional and vary according to your organization's needs. They are set up in the [Create/Edit Workflow](/docs/documentation/admin/workflows/settings_panels/workflow_create_edit#additional-fields) settings panel. Up to five additional fields can be added to the **General information** section.

These additonal fields are known as `status{1,5}` in the [task data model](/docs/documentation/models/tasks/model_tasks).

</div>
<br/>

<div className="alert alert--secondary">

### D. Additional Fields (extensions) {#additional-fields-extensions}
_Additional fields added to task details._

_Example:_

<img alt="general info" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_workflowgroup_channel_06.png')} />
<br/>

Additional fields are optional and vary according to your organization's needs. They are set up in the [Create/Edit Workflow](/docs/documentation/admin/workflows/settings_panels/workflow_create_edit#additional-fields) settings panel. Multiple collections can be set as additional fields. 

These additonal fields are known as `extensions` in the [task data model](/docs/documentation/models/tasks/model_tasks).

[Click here](/docs/documentation/admin/workflows/settings_panels/workflow_create_edit#workflow-additional-fields) to learn more about the difference between `extensions` and `status{1,5}`.

</div>
<br/>

<div className="alert alert--secondary">

### E. Notes {#notes}
_View, create, edit, or delete task notes._

_Example:_

<img alt="notes" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_workflowgroup_channel_07.png')} />
<br/>

**Task notes** help teams share knowledge and information concerning the task. 

[Click here to learn more about task notes](/docs/documentation/client/notes).

</div>
<br/>

<div className="alert alert--secondary">

### F. Images, Videos, Files {#attachments}
_View shared files and multimedia content._

_Example:_

<img alt="attachments" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_workflowgroup_channel_08.png')} />
<br/>

All files and multimedia content shared through the task's channel workspace can be accessed here. By pressing **View More**, you can see all documents distributed in three groups: _images_, _videos_, and _files_.

</div>
<br/>

## Related Topics {#related-topics}
- [**Create/Edit Workflow**](/docs/documentation/admin/admin_group): Administrative Panel documentation on workflow settings. Here, workflows are configured, giving a structure to the tasks that pass through them.
- [**COTTask**](/docs/documentation/models/tasks/model_tasks): Task data model. Here you can see how all task data is stored and related.