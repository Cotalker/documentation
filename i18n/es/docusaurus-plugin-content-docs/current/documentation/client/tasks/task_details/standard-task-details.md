---
title: Standard Task Details
displayed_sidebar: getting_started
---

:::caution Advertencia
Esta página aún no se encuentra traducida al español.
:::
import useBaseUrl from '@docusaurus/useBaseUrl'; 
import Roles, {toc as Title1TOC} from '/docs/documentation/client/tasks/task_details/_user_roles.mdx';

export const toc = [...Title1TOC];

## Overview {#overview}
**Standard Task Details** are present in all [_Task Details_](/docs/documentation/client/tasks/task_details) and found under the _General information_ tab.

:::tip
The [COTTask](/docs/documentation/models/tasks/model_tasks) data model contains task details and is mainly used on the backend or through API.
:::

## Layout {#layout}

<div className="container">
<div className="row">
<div className="col col--6">

<img alt="task details general" className="img_sizing item shadow--tl" src={useBaseUrl('img/task_details_general_00.png')} />
<br/>

</div>
<div className="col col--6">

- **<span className="badge badge--danger">1.</span> Task's Name**: Indicates the task's name. Task names can be set manually or automatically.
- **<span className="badge badge--danger">2.</span> Status**: Indicates the task's current state or status within the workflow.
- **<span className="badge badge--danger">3.</span> Assignee**: Indicates the user responsible for the task. Only one _assignee_ can be designated at a time. By default, the _creator_ of the task is designated as the _assignee_, but can be changed later on.
- **<span className="badge badge--danger">4.</span> Creator**: Indicates the user that created the task. The user can be a human or a bot.
- **<span className="badge badge--danger">5.</span> Users**: Indicates users associated with the task. Users can have different roles. Double-click on the user tag to shuffle through the following roles:
    - **Follower**: A _follower_ can read task details and participate in the chat area, but cannot update task states or details.
    - **Editor**: An _editor_ has read & write access on all _task detail_ fields and can participate in the chat area.
    - **Visibility**: Users with the _visibility_ tag can view limited task details. They can participate in the chat area and view notes, but they cannot change the task's state.
- **<span className="badge badge--danger">6.</span> SLAs**: Displays the ObjectId of any active [Service-Level Agreements (SLAs)](/docs/documentation/automation/sla) programmed with the task.
- **<span className="badge badge--danger">7.</span> Answers**: Displays the ObjectId of answered [survey forms](/docs/documentation/client/surveys) associated with the task.
- **<span className="badge badge--danger">8.</span> Creation Date**: Specifies the date the task was created.
- **<span className="badge badge--danger">9.</span> Start Date**: Indicates the date the task begins.
- **<span className="badge badge--danger">10.</span> End Date**: Indicates the task's deadline.
- **<span className="badge badge--danger">11.</span> Estimated Time**: The number of days in which the task should be completed.


</div>
</div>
</div>



