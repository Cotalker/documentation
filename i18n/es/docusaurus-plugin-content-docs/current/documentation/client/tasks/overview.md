---
title: Tasks
---

:::caution Advertencia
Esta página aún no se encuentra traducida al español.
:::
import useBaseUrl from '@docusaurus/useBaseUrl'; 
import Tasks, {toc as Title1TOC} from '/docs/documentation/client/glossary/_task.mdx';

export const toc = [...Title1TOC];

<img alt="design" className="img_title" src={useBaseUrl('img/design/Tasks.svg')} />
<br/>

## Overview {#overview}

<Tasks/>

## Example

In the image below, tasks are displayed in _kanban view_, one of the many [forms to view tasks](/docs/documentation/client/tasks/taskview) in Cotalker:

<img alt="task manager" className="img_sizing item shadow--tl" src={useBaseUrl('img/concepts_task_00.png')} />
<br/>

The image above displays the tasks that were created in a specific workflow. The tasks are sorted according to the _state_ or _status_ they are currently in. This workflow was configured with three states: _backlog_, _doing_, and _ready_.


## Features {#features}

- Users can [access tasks](/docs/documentation/client/tasks/access_task) to view and interact with them.
- Users can create tasks.
- Tasks can be filtered and sorted in the display. 
- The _task workspace_ includes:  
    - [Files](/docs/documentation/client/tasks/task_notes): Displays shared files and notes. Notes can also be edited from here. 
    - [Chat](/docs/documentation/client/tasks/task_chat): Accesses the chat area which displays user and system messages, survey forms, and shared files.
    - [Details](/docs/documentation/client/tasks/task_details): View and edit task settings.
- Tasks count with different levels of user access.
- Automations can be set to create or update tasks through survey forms or bots.
- Automations associated with tasks can carry out a vast amount routines enabling companies to automate entire processes.
- _Start_ and _end dates_ along with _SLAs_ can be configured on a task to give programmed responses or notifications according to established deadlines.

This amplitude of functions gives _tasks_ the versatility to adapt to each organization's needs and beyond.
 

:::info
- To view or modify a task, users must be associated with the task and count with the corresponding permissions and [task roles](#user-roles).
- Admins can [set permissions](/docs/documentation/api/tasks/#task-permissions-for-unassigned-users) that allow unassociated users to follow or edit tasks within a task group.
:::

<br/>

---
## Related Resources {#related}
- Step-by-step tutorials:
  - Creating a [workflow](/docs/tutorials/basic/create_state_machines).
  - Creating and viewing [tasks](/docs/tutorials/basic/tutorial_taskview)
