---
title: Asset Tasks
sidebar_label: Asset Tasks
---
import useBaseUrl from '@docusaurus/useBaseUrl';
import Highlight from '@theme/Highlight';

<span className="hero__subtitle">Reports & Actions</span>
<br/>
<br/>

A Task report filters tasks associated with the element (asset) and displays them in the [task view](/docs/documentation/client/tasks/taskview).

## Settings {#settings}
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

## Example {#example}
Below is an example of a corrective maintenance process. The report is set to display all tasks that involve _notifications_ concerning the asset known as _Equipment 1-A_.

<img alt="tasks" className="img_sizing item shadow--tl" src={useBaseUrl('img/asset_tasks_01.png')} />
<br/>

The **report** displaying the _notifications_ involving _Equipment 1-A_ is generated in the task view as shown below:

<img alt="tasks" className="img_sizing item shadow--tl" src={useBaseUrl('img/asset_tasks_02.png')} />
<br/>
