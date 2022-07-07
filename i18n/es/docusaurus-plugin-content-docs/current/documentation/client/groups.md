---
title: Groups
---

import useBaseUrl from '@docusaurus/useBaseUrl'; 
import Mermaid from '@theme/Mermaid';

<img alt="design" className="img_title" src={useBaseUrl('img/design/Groups_and_Channels.svg')} />
<br/>
<br/>


## General Description {#descriptions}

_Groups_ are the primary place to interact and exchange information in the Cotalker environment. From a group's panel, you can go to [channels](/docs/documentation/client/channels) and subgroups. Depending on the type of group, you can create and view [tasks](/docs/documentation/client/taskview), create other channels, or access a link to other information.

<div className="alert alert--primary">

## Group Types {#group-types}
_Groups_ – which can only be created by administrators – are classified into three kinds:

### Standard Groups {#regular-groups} 
Normally, we refer to _regular groups_ simply as _groups_. They incorporate a list of users and include [_channels_](/docs/documentation/client/basic_concepts#channel), i.e., chat rooms for messaging and answering surveys. Groups can have subgroups and more than one channel. 

### Workflow Groups {#workflow-groups}
_Workflow groups_, also known as _task groups_, are similar to standard groups in that they include channels and subgroups. Their great advantage is that they host [_tasks_](/docs/documentation/client/basic_concepts#tasks) with their corresponding [_channels_](/docs/documentation/client/basic_concepts#channel). You can access task details either through the [_group panel_](#group-panel) or the [_channel workspace_](/docs/documentation/client/channels).

### Link Groups {#link-groups}
This kind of _group_ is a _link_ that can be found in the [_main menu bar_](/docs/documentation/client/main_menu) or [_group panel_](#group-panel). It can redirect the user to another source of information, whether internal or external to the Cotalker environment.

</div>
<br/>

## Group Display {#access}
Groups can be displayed either in _group view_ or _task view_. 
- [**Task View**](#task-view): This is the default view for _workflow groups_. It displays tasks in one of the [available task views](/docs/documentation/client/taskview#tasks-view).
- [**Group View**](#group-view): Contains the group panel, which can display sub-groups, folders, links, channels, and tasks. _Standard groups_ are always displayed in _group view_. Although this is not the default view for _Task groups_, the [admin](/docs/documentation/admin/workflows/settings_panels/workflowgroup-create-edit#settings) can set them to be displayed in _group view_.

### Task View {#task-view}

#### How to access a workflow (task) group: {#access-task-view}

<img alt="groups" className="img_sizing item shadow--tl" src={useBaseUrl('img/platform_groups_02.png')} />
<br/>

<div className="margin-left--lg">

1. Choose a _task group_ from the **Main Menu Bar**.
2. Tasks appear according to the predetermined _task view_.
3. The _task view toolbar_ appears above, allowing to change the task view appearance and display filters.

:::info
For more details about _task views_ and their display options, go to the [**Task View**](/docs/documentation/client/taskview#tasks-view) section.
:::

</div>

### Group View {#group-view}

#### How to access a group: {#access-group-view}

<img alt="groups" className="img_sizing item shadow--tl" src={useBaseUrl('img/platform_groups_00.png')} />
<br/>

<div className="margin-left--lg">

1. Choose a _standard group_ through the **Main Menu Bar**.
2. The _group panel_ opens up, displaying the content and available options.

</div>

<br/>
<div className="alert alert--secondary">

#### Group Panel Layout {#group-panel}

<img alt="group panel" className="img_sizing item shadow--tl" src={useBaseUrl('img/platform_groups_01.png')} />
<br/>

- a.) [Task Viewer](/docs/documentation/client/taskview): Appears within workflow groups. Permits viewing tasks with display filters.
- b.) [Group Search Tool](/docs/documentation/client/client_search#group-search): Search within the group.
- c.) Channel and Subgroup list: Access [channels](/docs/documentation/client/channels) and subgroups.
- d.) [Actions Button](/docs/documentation/client/actions_button): Depending on the group's configuration, create channels, tasks, or access a URL.

</div>
<br/>