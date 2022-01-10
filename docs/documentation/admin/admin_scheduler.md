---
title: Scheduler Section
sidebar_label: Scheduler
---
import useBaseUrl from '@docusaurus/useBaseUrl';
import Highlight from '@theme/Highlight';


<img alt="design" className="img_sizing" src={useBaseUrl('img/design/scheduler.svg')} />

## Overview {#overview}

<div className="container">
  <div className="row">
    <div className="col col--8">
    <img alt="Schedule screenshot" className="img_sizing" src={useBaseUrl('img/admin_scheduler_01.png')} align=""/>
    </div>
    <div className="col col--4">
      <p>The <em>scheduler</em> is used to configure a routine that runs periodically. For example, a regular company routine might be to send users to-do tasks for the week every Monday.
      In this section of the _administrative panel_ you can create, search, and check the company's schedules.
      </p>
    </div>
  </div>
</div>



<br />



## All Schedules {#all-schedules}
In this part, you can find the entire **list of schedules** that have been created.

<img alt="scheduler list" className="" src={useBaseUrl('img/admin_scheduler_list.png')} />
<br/><br/>

### Types of Schedules: {#types-of-schedules}
The _scheduler_ list is divided by recurring and non-recurring schedules. And the two filters are:
- **Show system schedules**: displays the list of the system schedules.
- **Show executed schedules**: displays the list of the executed schedules.

### Schedule information: {#schedule-information}
The information shown in the list is as follows:
- **Code**: scheduler code.
- **Start date**: scheduler start date
- **Recurrence**: the recurrence is in the written _cron_ format. [Check this link to see the format: https://crontab.guru]
- **End time**: scheduler end date

The description of the icons are in the [Overview section](/docs/documentation/admin/admin_overview).

## Edit / Create Single Group {#edit--create-single-group}
In this section you can edit or create a single group.

<br />
<img alt="" src={useBaseUrl('img/admin_scheduler_create.png')} />

<br/><br/>

<!-- The descriptions of the **general information fields** are as follows
| Field | Description | Notes |
| ---- | ----------- | ----- |
| Code | The identifier of the scheduler | It only accepts lowercase letters, numbers, underscores, and must start with a letter. Once you create and save the code, you cannot change it.|
| Start Date | The start date to run the scheduler |  |
| Time zone | The default time zone of the company.  | It isn't changeable. |
| Recurrence | Add the recurrence to the scheduler. End time and recurrence must be specified | -->

### Description of General Information Fields {#description-of-general-information-fields}

<div className="container">
  <div className="row table-row-1">
    <div className="col col--4"><strong>Code</strong></div>
    <div className="col col--4"><em>Description</em>: The identifier of the scheduler </div>
    <div className="col col--4"><em>Notes</em>: It only accepts lowercase letters, numbers, underscores, and must start with a letter. Once you create and save the code, you cannot change it.</div>
  </div>
    <div className="row table-row-2">
    <div className="col col--4"><strong>Start Date</strong></div>
    <div className="col col--4"><em>Description</em>: The start date to run the scheduler</div>
    <div className="col col--4"><em>Notes</em>:</div>
  </div>
    <div className="row table-row-1">
    <div className="col col--4"><strong>Time Zone</strong></div>
    <div className="col col--4"><em>Description</em>: The default time zone of the company.</div>
    <div className="col col--4"><em>Notes</em>: This item is unchangeable.</div>
  </div>
    <div className="row table-row-2">
    <div className="col col--4"><strong>Recurrence</strong></div>
    <div className="col col--4"><em>Description</em>: Add the recurrence to the scheduler. End time and recurrence must be specified.</div>
    <div className="col col--4"><em>Notes</em>:</div>
  </div>
</div>

<!-- + **Code**
  + _Description_: The identifier of the scheduler 
  + _Notes_: It only accepts lowercase letters, numbers, underscores, and must start with a letter. Once you create and save the code, you cannot change it.

+ **Start Date**
  + _Description_: The start date to run the scheduler
  + _Notes_:

+ **Time Zone**
  + _Description_: The default time zone of the company.
  + _Notes_: This item is unchangeable.

+ **Recurrence**
  + _Description_: Add the recurrence to the scheduler. End time and recurrence must be specified.
  + _Notes_: -->

<br>
</br>

_The Routine builder is explained in the [Routine Section](/docs/documentation/automation/admin_routine)._
