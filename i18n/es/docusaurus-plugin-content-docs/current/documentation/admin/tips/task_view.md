---
title: Task View Configuration
displayed_sidebar: documentation
---

:::caution Advertencia
Esta página aún no se encuentra traducida al español.
:::

import useBaseUrl from '@docusaurus/useBaseUrl'; 

## Introduction {#intro}
This section provides information on how admins can customize the way users initially view tasks for a particular workflow (task) group.

Users can view tasks in the Cotalker platform through the [_group view_](/docs/documentation/client/groups#group-view) or one of four [_task views_](/docs/documentation/client/tasks/taskview). _Task view_ is set as the default.

### Task Views {#task-views}
_Task views_ display tasks in such a way as to help users visualize their current state. 

Currently, Cotalker has four [tasks views](/docs/documentation/client/tasks/taskview) available for workflow groups:
1. List View
2. Kanban View
3. Calendar View
4. Table View

_Below is an example of the task kanban view:_
<img alt="kanban task view" className="img_sizing item shadow--tl" src={useBaseUrl('img/task_view_04.png')} />
<br/>

### Group View {#group-view}
The _group view_ is similar to the _task list view_, but can display content not available through task views in its [_group panel_](/docs/documentation/client/groups#group-panel). For example, sub-groups and links are accessible through the _group panel_. The _group panel_ also has a special _actions button_ that can be used to summon a _workflow start form_ or open any other useful link. 

To change from the _group view_ to the [_task view_](/docs/documentation/client/tasks/taskview), simply press the [corresponding icon on the upper right side of the group panel](/docs/documentation/client/tasks/group_view).

_Below is an example of the group view:_

<img alt="group view" className="img_sizing item shadow--tl" src={useBaseUrl('img/task_view_05.png')} />
<br/>

## Set Up the Task View {#change-task-view}
_To set the default **task view** and the available **task views** to choose from on the **task view toolbar**:_

#### I. Select the workflow group you wish to set up.

<img alt="set task view" className="img_sizing item shadow--tl" src={useBaseUrl('img/task_view_00.png')} />
<br/>

<div className="margin-left--lg">

1. Press the <span className="badge badge--primary">Administrator</span> option in the **Main Menu Bar**.
2. From the the **Administrative Panel**, select <span className="badge badge--info">Workflows</span>.
3. The **Workflow groups** panel opens up.
4. Select the _set up workflows_ icon to open the corresponding settings panel shown below.

</div>

<img alt="set task view" className="img_sizing item shadow--tl" src={useBaseUrl('img/task_view_02.png')} />
<br/>

#### II. Adjust the workflow group settings.

<div className="margin-left--lg">

1. From **Workflows** Settings Panel, select the **Configuration** tab.
2. In the **Available Views** field, choose the _views_ that will be available one the _task views toolbar_.
3. In the **Default View** field, choose the _task view_ initially displayed when users open the workflow group.
4. Press <span className="badge badge--info">Save</span>.

</div>

## Set Group or Task View as Default {#change-group-view}
_To set the default view as either **group view** or **task view**:_

#### I. Select the workflow group you wish to set up.

<img alt="set task view" className="img_sizing item shadow--tl" src={useBaseUrl('img/task_view_01.png')} />
<br/>

<div className="margin-left--lg">

1. Press the <span className="badge badge--primary">Administrator</span> option in the **Main Menu Bar**.
2. From the the **Administrative Panel**, select <span className="badge badge--info">Workflows</span>.
3. The **Workflow groups** panel opens up.
4. Select the _edit workflow group_ icon to open the corresponding settings panel shown below.

</div>

#### II. Adjust the workflow group settings.

<img alt="set task view" className="img_sizing item shadow--tl" src={useBaseUrl('img/task_view_03.png')} />
<br/>

<div className="margin-left--lg">

1. From **Edit workflow group** settings panel, select the **Settings** tab.
2. In the **Initial view** field, choose to display the workflow group either in _task view_ or _group view_.
3. Press <span className="badge badge--info">Save</span>.

</div>

