---
title: Workflow Group Tasks
---

:::caution Advertencia
Esta página aún no se encuentra traducida al español.
:::
import useBaseUrl from '@docusaurus/useBaseUrl'; 
import Layout, {toc as Title1TOC} from '/docs/documentation/client/tasks/task_details/_task-details-layout.mdx';

<span className="hero__subtitle">Settings Panel Guide</span>

_Workflow groups host [tasks](/docs/documentation/client/tasks/overview) that exist within their workflows or state machines. You can access an individual task's configuration from the Administrative Panel or the task's workspace. Task configuration from the Administrative Panel is described below._

_Take advantage of tasks' ample array of tools and configurations that permit customizing them to your organization's needs. All tasks have an incorporated [task workspace](/docs/documentation/client/tasks/task_workspace), the ability to share files and [notes](/docs/documentation/client/notes#task-notes), and the possibility to view and configure other settings, like state, users, start and end dates, and additional fields, among others._


## Access settings panel {#access}

To access a workflow-group channel's settings panel:

1. From the workflow groups (initial) setting panel, select the channel manager icon of the corresponding workflow.

<img alt="channel manager" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_workflowgroup_channel_00.png')} />
<br/>

2. A list of all the channels available in the workflow group opens up. Choose the channel you wish to edit. The [task details panel](#layout) opens up.

<img alt="channel manager" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_workflowgroup_channel_01.png')} />
<br/>

## Task Details Layout {#details-layout}

<Layout/>

## Related Topics {#related-topics}
- [**Tasks**](/docs/documentation/client/tasks/overview): Overview of tasks.
- [**Task Details**](/docs/documentation/client/tasks/task_details): Task details
- [**Create/Edit Workflow**](/docs/documentation/admin/admin_group): Administrative Panel documentation on workflow settings. Here, workflows are configured, giving a structure to the tasks that pass through them.
- [**COTTask**](/docs/documentation/models/tasks/model_tasks): Task data model. Here you can see how all task data is stored and related.
