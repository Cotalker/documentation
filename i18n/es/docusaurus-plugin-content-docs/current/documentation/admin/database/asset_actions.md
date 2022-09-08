---
title: Tasks Actions
sidebar_label: Task Actions
---

:::caution Advertencia
Esta página aún no se encuentra traducida al español.
:::
import useBaseUrl from '@docusaurus/useBaseUrl';
import Highlight from '@theme/Highlight';

<span className="hero__subtitle">Reports & Actions</span>
<br/>
<br/>

**Task Actions** let users open [_workflow start forms_](/docs/documentation/admin/workflows/admin_workflow_required_survey) that can initiate tasks from the _asset viewer_.


## Settings {#settings}
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

## Example {#example}
We set up a piece of equipment with a notification form that initiates the corrective maintenance process in case it needs fixing.

<img alt="actions" className="img_sizing item shadow--tl" src={useBaseUrl('img/asset_actions_01.png')} />
<br/>

The notification form appears over the **Asset Viewer**:

<img alt="actions" className="img_sizing item shadow--tl" src={useBaseUrl('img/asset_actions_02.png')} />
<br/>

Once the form is submitted, the task is initiated.
