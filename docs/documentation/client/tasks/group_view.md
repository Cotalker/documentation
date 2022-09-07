---
title: Group View
---
import useBaseUrl from '@docusaurus/useBaseUrl'; 

The **Group View** is an alternative to the [**Task View**](/docs/documentation/client/tasks/taskview). It displays tasks within the [group panel](/docs/documentation/client/groups#group-view) and has an area reserved for the [channel workspace](/docs/documentation/client/channels).

The group panel can also display sub-groups and links.

## Layout {#layout}

<img alt="task group" className="img_sizing item shadow--tl" src={useBaseUrl('img/task_group_00.png')} />
<br/>

- **<span className="badge badge--danger">A.</span> Group Panel**: Displays the tasks contained within the task group. 
  - **<span className="badge badge--success">1.</span> Task View**: Changes the display to [task view](/docs/documentation/client/tasks/taskview).
  - **<span className="badge badge--success">2.</span> Search Tool**: Performs a [group search](/docs/documentation/client/client_search#group-search), i.e., a query within the task group.
  - **<span className="badge badge--warning">3.</span> Task Category**: Indicates the category the tasks are sorted by. By default, they are sorted by workflow state.
  - **<span className="badge badge--warning">4.</span> Tasks**: Displays all the tasks present in the group under a specific category.
  - **<span className="badge badge--warning">5.</span> Action Button**: This button permits authorized users to carry out specific actions within the task group, like creating a new task or accessing data. Available actions vary on the workflow configuration.

- **<span className="badge badge--danger">B.</span> Channel Workspace**: Displays the workspace area which allows user to access the chat channel and task settings.
  - **<span className="badge badge--info">6.</span> Task Title Bar**: Displays the selected task's name, task number, and associated users. Clicking on the title bar opens the [task details](/docs/documentation/client/tasks/task_details) panel.
  - **<span className="badge badge--info">7.</span> Task View**: Allows users to switch to [task view](/docs/documentation/client/tasks/taskview).




