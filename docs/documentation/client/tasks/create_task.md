---
title: Create a Task
---
import useBaseUrl from '@docusaurus/useBaseUrl'; 


## Creating Tasks {#creating-tasks}
_Depending on workflow configurations, users can create tasks through one of the following methods:_

:::note
- In some configurations, administrators might program a [_Workflow Start Form_](/docs/documentation/admin/workflows/admin_workflow_required_survey) to appear when creating a new task. This feature permits _administrators_ make sure that _users_ correctly fill out all the necessary information for a _task_ and help teams stay informed of all created _tasks_.
- Tasks can also be created through _public surveys_ for users outside the Cotalker environment.
:::

### Creating tasks from the task view {#create-from-task-view}

_Regular task creation:_
<img alt="create task" className="img_sizing item shadow--tl" src={useBaseUrl('img/client_tasks_07.png')} />
<br/>

<div className="margin-left--lg">

1. From the task view toolbar, press the <span className="badge badge--secondary">+</span> icon.
2. A new task card opens up. 
3. Write the task's name and press Enter to create the task.

</div>
<br/>

_Task start survey:_
<img alt="create task" className="img_sizing item shadow--tl" src={useBaseUrl('img/client_tasks_07a.png')} />
<br/>

<div className="margin-left--lg">

1. From the task view toolbar, press the <span className="badge badge--secondary">+</span> icon.
2. A survey form opens up. 
3. Fill out the survey and press Enter to create the task.

</div>
<br/>

### Creating tasks from the group panel {#create-from-group-panel}
_By pressing the actions buttons found at in the group panel, a workflow start form opens up to initialize a new task._

<img alt="create task" className="img_sizing item shadow--tl" src={useBaseUrl('img/client_actionsbutton_01.png')} />
<br/>

### Creating tasks from the channel workspace {#create-from-channel-workspace}
_By pressing the actions buttons found at the bottom of the channel workspace, a workflow start form opens up to initialize a new task._

<img alt="create task" className="img_sizing item shadow--tl" src={useBaseUrl('img/client_tasks_09.png')} />
<br/>




---

## Best Practices {#best-practices}
### Task State Names {#task-state-organization}
State names should begin with a number or individual letter corresponding to their order in the group panel and task view. For example: "1. Backlog", "2. Doing", "3. Finished", "4. Unable to Complete". Since _states_ are _elements_ within _collections_, their names are configured and edited from the settings panel in the [Database panel](/docs/documentation/admin/database/admin_elements).

### Associating Tasks from Different Workflows {#tasks-different-workflows}
If needed, [tasks that belong to different workflows can be associated with one another](/docs/documentation/admin/workflows/settings_panels/workflow_create_edit#tasks-different-workflows). 