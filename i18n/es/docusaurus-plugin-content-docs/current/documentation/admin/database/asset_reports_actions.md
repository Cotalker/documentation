---
title: Asset Reports & Actions
sidebar_label: Reports & Actions
---

:::caution Advertencia
Esta página aún no se encuentra traducida al español.
:::
import useBaseUrl from '@docusaurus/useBaseUrl';
import Highlight from '@theme/Highlight';

<span className="hero__subtitle">Asset Viewer</span>
<br/>
<br/>

The **Asset Viewer** provides users with access to customized **reports and actions** related to the asset being displayed.

_Reports and actions can be set to:_
- Display tasks associated with the asset ([Tasks](#tasks))
- Open surveys associated with the asset ([Actions](#actions))
- Display data gathered from the SQL database ([Forms](#forms))

## Options {#options}
_From the Asset Viewer you can open, create, or delete reports and actions:_

:::info
**Reports & actions** can only be configured when the _Asset Viewer_ is accessed through the [Administrative Panel](/docs/documentation/admin/database/admin_elements#edit-element) by authorized users.
:::

<img alt="reports and actions" className="img_sizing item shadow--tl" src={useBaseUrl('img/asset_reports_actions_00.png')} />
<br/>

1. Existing reports and actions (customizable for each asset)
    - _Left-click_: [**Open**](#open) a report or action
    - _Right-click_: [**Edit** or **delete**](#edit-delete) a report or action
2. [**Create**](#create) a report or action (only available when accessed through Administrative Panel)

### Open Reports/Actions {#open}
Reports and actions accessed through the Asset Viewer are divided into three categories:
- [**Tasks**](#tasks): Displays [tasks](/docs/documentation/client/tasks/overview) according to predefined filters
- [**Actions**](#actions): Opens a [survey](/docs/documentation/client/surveys/overview)
- [**Forms**](#forms): Displays data gathered from an SQL database query.

### Edit/Delete Reports/Actions {#edit-delete}
_To edit or delete a report or action:_

<img alt="reports and actions" className="img_sizing item shadow--tl" src={useBaseUrl('img/asset_reports_actions_01.png')} />
<br/>

- Right-click the corresponding report or action to open the sub-menu.
- Choose to **Edit** or **Delete** from the sub-menu.

### Create Reports & Actions. {#create}
Once the _create_ icon is selected, the following window appears:

<img alt="reports and actions" className="img_sizing item shadow--tl" src={useBaseUrl('img/asset_reports_actions_02.png')} />
<br/>

_Admins can create Reports & Actions in the following three categories:_

- [**A. Tasks**](#tasks): Displays [tasks](/docs/documentation/client/tasks/taskview) according to predefined filters
- [**B. Actions**](#actions): Opens a [survey](/docs/documentation/client/surveys/overview)
- [**C. Forms**](#forms): Displays data gathered from an SQL database query.

Choosing a category from the tabs above displays the corresponding settings fields.

:::note
Only one report or action can be created at a time. 
:::

## Tasks {#tasks}

A Task report filters tasks associated with the element (asset) and displays them in the [task view](/docs/documentation/client/tasks/taskview).

### Settings {#tasks-settings}
Fill out the settings below to configure an _asset task report_:

<img alt="tasks" className="img_sizing item shadow--tl" src={useBaseUrl('img/asset_tasks_00.png')} />
<br/>

_General Information:_

- **<span className="badge badge--danger">1.</span> Report name**: Write a name to identify the report.
- **<span className="badge badge--danger">2.</span> Workflow**: Choose a workflow. The report will search through all tasks that are on that workflow.

_Fields:_

- **<span className="badge badge--danger">3.</span> Field**: Choose a field associated to act as a filter. Only tasks in which the field coincides with the current asset (element) will be displayed in the report. The fields correspond to the workflow's asset, additional fields, and current state.
- **<span className="badge badge--danger">4.</span> Operator**: Set to _Equal_ by default.

_Options:_
- **<span className="badge badge--primary">A.</span>** Closes the settings panel. Clicking outside the panel returns you to the previous window.
- **<span className="badge badge--primary">B.</span>** Displays a preview of the report with the current settings.
- **<span className="badge badge--primary">C.</span>** Saves the report, making it accessible through the _asset viewer_.

### Example {#tasks-example}
Below is an example of a corrective maintenance process. The report is set to display all tasks that involve _notifications_ concerning the asset known as _Equipment 1-A_.

<img alt="tasks" className="img_sizing item shadow--tl" src={useBaseUrl('img/asset_tasks_01.png')} />
<br/>

The **report** displaying the _notifications_ involving _Equipment 1-A_ is generated in the task view as shown below:

<img alt="tasks" className="img_sizing item shadow--tl" src={useBaseUrl('img/asset_tasks_02.png')} />
<br/>

## Actions {#actions}

**Task Actions** let users open [_workflow start forms_](/docs/documentation/admin/workflows/admin_workflow_required_survey) that can initiate tasks from the _asset viewer_.

### Settings {#actions-settings}
To set up **Task Actions**, fill out the following fields:

<img alt="actions" className="img_sizing item shadow--tl" src={useBaseUrl('img/asset_actions_00.png')} />
<br/>

_Report of actions:_

- **<span className="badge badge--danger">1.</span> Name**: Write a name to identify the report.
- **<span className="badge badge--danger">2.</span> Workflow**: Choose a workflow that counts with a _workflow start form_.
- **<span className="badge badge--danger">3.</span> Action**: Choose the survey (workflow start form) that users will be able to open through the _asset viewer_.

_Options:_
- **<span className="badge badge--primary">A.</span>** Closes the settings panel. Clicking outside the panel returns you to the previous window.
- **<span className="badge badge--primary">B.</span>** Displays the survey.
- **<span className="badge badge--primary">C.</span>** Saves the action, making it accessible through the _asset viewer_.

### Example {#actions-example}
We set up a piece of equipment with a notification form that initiates the corrective maintenance process in case it needs fixing.

<img alt="actions" className="img_sizing item shadow--tl" src={useBaseUrl('img/asset_actions_01.png')} />
<br/>

The notification form appears over the **Asset Viewer**:

<img alt="actions" className="img_sizing item shadow--tl" src={useBaseUrl('img/asset_actions_02.png')} />
<br/>

Once the form is submitted, the task is initiated.

## Forms {#forms}

**Asset Forms** let users view the asset's (element's) raw data as stored in the SQL database. The form can be set to filter data.

### Settings {#forms-settings}
_SQL commands are used to set up the report:_

<img alt="forms" className="img_sizing item shadow--tl" src={useBaseUrl('img/asset_forms_00.png')} />
<br/>
<br/>

_Options:_
- **<span className="badge badge--primary">A.</span>** Closes the settings panel. Clicking outside the panel returns you to the previous window.
- **<span className="badge badge--primary">B.</span>** Displays a preview of the report with the current settings.
- **<span className="badge badge--primary">C.</span>** Saves the report, making it accessible through the _asset viewer_.

_General Information:_
- **<span className="badge badge--danger">1.</span> Report Name**: Write a name to identify the report.
- **<span className="badge badge--danger">2.</span> Collection Name**: Choose the collection from where to gather data.

_SQL Commands:_
- **<span className="badge badge--danger">3.</span> Joins**: Combines rows from other collections based on related columns between them.
- **<span className="badge badge--danger">4.</span> Where**: Returns only elements that fulfill the specified values.
- **<span className="badge badge--danger">5.</span> Select**: Selects the table rows to display in the report.

_Settings:_
- **<span className="badge badge--danger">6.</span> Limit**: Sets the limit of elements to display in the report.
- **<span className="badge badge--danger">7.</span> Order By**: Selects a column used to order the results.
- **<span className="badge badge--danger">8.</span> Asc/Desc**: Indicates if the order of results is ascending or descending.
- **<span className="badge badge--danger">9.</span> Offset**: Sets the row from where to start returning data.

:::info
On the **Where**, **Limit**, and **Offset** fields, a special annotation can be used to retrieve a _value_ from the respective element (property): `${property.[...]}`.
_Example_: `${property.schemaInstance.number}`
:::

### Example {#forms-example}
This is a simple report that returns all the assets found within a specific collection.

The columns to be displayed are _selected_.

<img alt="forms" className="img_sizing item shadow--tl" src={useBaseUrl('img/asset_forms_01.png')} />
<br/>

_The report returns the results as shown below:_

<img alt="forms" className="img_sizing item shadow--tl" src={useBaseUrl('img/asset_forms_02.png')} />
<br/>
