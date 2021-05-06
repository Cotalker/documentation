---
id: automation_log
title: Automation Log
sidebar_label: Automation Log
---
import useBaseUrl from '@docusaurus/useBaseUrl'; 
import Highlight from '@theme/Highlight';

## Overview {#overview}

The _automation log_ helps you test and debug _routines_. Every time a routine or automation runs, its operation is recorded in the _automation log_. There you can find information concerning the automation's execution date, duration, owner, data context, and result. This tool allows you to see how your routines are working and do any necessary debugging.

Whenever you test a routine (Run Routine) from the _Routine Builder_, the test will also be recorded in the log.

Logs can be accessed directly through the _Administrative Panel_ or anywhere a routine can be built, like workflows, SLAs, or other automations.

## Automation Log List {#log-list}

<img alt="automation log" className="img_sizing item shadow--tl" src={useBaseUrl('img/automations_log_00.png')} />
<br/>

### List Details {#settings-panel}
The initial settings panel displays the list of automations in descending chronological order. It is divided into the following four columns:

- **Result**: Possible results are _executed_ or _failed_.
- **Duration**: Time it takes for an automation to execute. Results return in seconds and milliseconds.
- **Execution Date**: The date and time the automation executed. The date is in DD/MM/YY format.
- **Options**: Viewing is the only option, but more alternatives are available once the log is [opened](#automation-log-details).

:::note
- Each automation will be stored in the log list for no more than seven days.
- The automation log list refreshes every minute but can be manually refreshed by pressing the refresh icon found in the upper-right corner.
:::

### Log Details {#automation-log-details}
Once an automation has been chosen for viewing, a new settings panel will appear and more information will be made available. 

_The settings panel will look something like the following image:_

<img alt="automation log" className="img_sizing item shadow--tl" src={useBaseUrl('img/automations_log_01.png')} />
<br/>

The information displayed in the settings panel is divided into the five sections –_log, schedule, context, routine, results_– explained below:

<div className="container box">
<div className="row table-row-1">
<div className="col col--3"><b>Log:</b></div>
<div className="col col--3">

Displays the automation's basic information, which is also shown in the automation log [list](#settings-panel).

</div>
<div className="col col--6">

- **Result**: Possible results are _executed_ or _failed_.
- **Duration**: Time it takes for an automation to execute. Results return in seconds and milliseconds.
- **Start & End Dates**: The date and time the automation executed. The date is in DD/MM/YY format.

</div>
</div>
<div className="row table-row-2">
<div className="col col--3"><b>Schedule:</b></div>
<div className="col col--3">Displays links to the elements related to the routine.</div>
<div className="col col--6">

- **Code**: Indicates the routine's Id number and links to its place within the _schedules_ section.
- **Owner**: Indicates the type of automation or routine and links to its _routine builder_. When an automation is tested with the _routine builder_, its owner will be indicated as "Test" and won't have any link.
- **Context**: Links to the elements related to the routine.

</div>
</div>
<div className="row table-row-1">
<div className="col col--3"><b>Context:</b></div>
<div className="col col--3">Shows the data context related to the source.</div>
<div className="col col--6">

_Click here for more information on [data context](/docs/documentation/automation/triggers_and_contexts)._

</div>
</div>
<div className="row table-row-2">
<div className="col col--3"><b>Routine:</b></div>
<div className="col col--3">Shows information from the different routine stages. Each stage, indicated by its name, displays the following three indicators:</div>
<div className="col col--6">

- **Name**: Indicates the name of the bot or stage type used in the step.
- **Data**: Indicates the specific data entered corresponding to the stage type. 
- **Next**: Indicates the name of the next step or stage, either if the run was successful or not.

</div>
</div>
<div className="row table-row-1">
<div className="col col--3"><b>Results:</b></div>
<div className="col col--3">Shows the data that is returned from each stage inquiry. The data is divided into five basic categories:</div>
<div className="col col--6">

- **Key**: Stage name.
- **Name**: Stage type (bot).
- **Status**: Depends on the stage type.
- **Result**: Depends on the stage type.
- **NextBot**: Indicates the next stage type or bot called.
- **Iteration**: Indicates the stage's place in routine order.

</div>
</div>
<div className="row table-row-2">
<div className="col col--3"><b>Error:</b></div>
<div className="col col--3">Returns any errors caught.</div>
<div className="col col--6"><em>Appears only when there are errors. Error message content will depend on the source.</em></div>
</div>


</div>
<br/>

:::note
When errors are caught, the **Error** section appears at the bottom of the settings panel. It will look somewhat similar to the following image:
![error](/img/automations_log_05.png)
:::

### Log Lists in Other Places {#other}

_Routine Builders in Workflow States:_
<img alt="automation log" className="img_sizing item shadow--tl" src={useBaseUrl('img/automations_log_03.png')} />
<br/>

_In SLAs:_
<img alt="sla logs" className="img_sizing item shadow--tl" src={useBaseUrl('img/automations_log_02.png')} />
<br/>

_In other automations:_
<img alt="sla logs" className="img_sizing item shadow--tl" src={useBaseUrl('img/automations_log_04.png')} />
<br/>

## Run Routine "Tester" {#tester}

<img alt="run routine" className="img_sizing item shadow--tl" src={useBaseUrl('img/automations_log_06.png')} />
<br/>

The <span className="badge badge--primary">Run Routine</span> button is part of the [*Routine Builder*](/docs/documentation/automation/admin_routine). It opens up a window that will help you test and debug your routines while you are building them. The **Run Routine** window has two sections: [_Context_](#context-editor) and [_Automation Log_](#run-routine-automation-log).

_The **Run Routine** window will look something like this:_

<img alt="run routine" className="img_sizing item shadow--tl" src={useBaseUrl('img/automations_log_07.png')} />
<br/>

### Context Editor {#context-editor}

The **Context** editor is the big black box on the upper half of the window. It acts just like a code editor and is used to edit the data context for testing purposes.

Next to the **Context** title, you can find a link to the [Triggers & Contexts](/docs/documentation/automation/triggers_and_contexts) section for more information on data context.

When using **Run Routine** with a subtask, the **Context** editor is automatically filled with mock data for testing.

:::caution Warning
*Run Routine* is **not** a "playground". The routine will actually execute all the steps. So, for example, if you program the routine to send an email, it will really send the email.
You can insert mock data into the *Context* editor to avoid mishaps.
:::

### Automation Log {#run-routine-automation-log}

The _automation log_ in **Run Routine** is the same as described [above](#automation-log-details). 
