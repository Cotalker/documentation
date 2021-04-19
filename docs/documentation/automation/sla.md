---
id: sla
title: Adding an SLA Routine to your Workflow
sidebar_label: SLA Routine
---
import useBaseUrl from '@docusaurus/useBaseUrl'; 
import Highlight from '@theme/Highlight';



## Overview {#overview}

A service-level agreement (SLA) can be incorporated into the workflow. When a task does not change from one state to another at a pre-determined time, a routine can be built to take an action, like sending a reminder to whomever was assigned the task.

_At the bottom of a workflow's [settings panel](#edit-a-single-workflow) you will find the **SLAs** section. You should see something like this:_

<img alt="sla section" className="img_sizing_narrow item shadow--tl" src={useBaseUrl('img/admin_workflows_sla_00.png')} />
<br/>
<br/>

From this settings panel, you will be able to create and edit SLA routines integrated into your workflow.

## Create/Edit an SLA {#create-edit-sla}

To create an SLA routine, press the <span className="badge badge--secondary">+</span> icon in the SLA section. To edit an existing SLA routine, choose it from the list in the SLA section. After choosing to create or edit an SLA routine, the _Create SLA_ settings panel opens up. 

_SLA settings panel:_

<img alt="sla section" className="img_sizing_narrow item shadow--tl" src={useBaseUrl('img/admin_workflows_sla_01.png')} />
<br/>
<br/>

_Fields described below:_

<div className="container box">
<div className="row table-row-title">
<div className="col col--12"><b>General information</b></div>
</div>
<div className="row table-row-1">
<div className="col col--2"><b>Name:</b></div>
<div className="col col--6">SLA's display name.</div>
<div className="col col--4"><em>It doesn't have to be unique.</em></div>
</div>
<div className="row table-row-2">
<div className="col col--2"><b>Code:</b></div>
<div className="col col--6">SLA's identification name. Only lowercase letters, numbers, and underscores are accepted. The first character must be a letter.</div>
<div className="col col--4"><em> The code cannot be edited once it is saved.</em></div>
</div>
<div className="row table-row-1">
<div className="col col--2"><b>State types:</b></div>
<div className="col col--6">

State type options are _closed_, _in-progress_, and/or _new_. **START** state types indicate type when the SLA routine is activated; **END** state types, when it is deactivated. 

</div>
<div className="col col--4"><em></em></div>
</div>
<div className="row table-row-2">
<div className="col col--2"><b>States:</b></div>
<div className="col col--6">Choose the states that activate the SLA routine (START) and deactivate it (END).</div>
<div className="col col--4"><em>Only exiting states can be chosen.</em></div>
</div>
<div className="row table-row-1">
<div className="col col--2"><b>Time type:</b></div>
<div className="col col--7">

Options are: 
- _Dynamic_: time is calculated with task information.
- _Static_: time can be a specific date or calculated from amount of months, days, or hours from the date the action is executed.

</div>
<div className="col col--3"><em></em></div>
</div>
<div className="row table-row-2">
<div className="col col--2"><b>Time:</b></div>
<div className="col col--3">

Specifies date or time that the task is supposed to go from its initial to final state.

</div>
<div className="col col--7">

Static type format:
- "HOURS&#124;*Number*" = *number* of hours from the action.
- "DAYS&#124;*Number*" = *number* of days from the action.
- "DATE&#124;$YYYY-$MM-$DDT${HH + 5}:00:000Z" = date and time.

Dynamic type format:
- "DATE&#124;endDate" = task's endDate.
- "DATE&#124;parent&#124;endDate" = parent task's endDate.

</div>
</div>

<div className="row table-row-1">
<div className="col col--2"><b>Reset:</b></div>
<div className="col col--6">

If active, _time_ will start again when the task returns to START state.

</div>
<div className="col col--4"><em></em></div>
</div>
<div className="row table-row-2">
<div className="col col--2"><b>Repeat:</b></div>
<div className="col col--6">If active, time will cycle infinitely until the condition is met. Therefore, the SLA routine will be executed as many times as necessary. Otherwise, the SLA will only run once.</div>
<div className="col col--4"><em>Use with precaution to avoid undesired looping activity.</em></div>
</div>
<div className="row table-row-title">
<div className="col col--12"><b>Routine builder</b></div>
</div>
<div className="row table-row-1">
<div className="col col--12"><em>

[Click here](/docs/documentation/automation/admin_routine) to learn more about routines.

</em></div>
</div>
</div>
<br/>