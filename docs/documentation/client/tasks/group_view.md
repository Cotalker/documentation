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
  - **<span className="badge badge--warning">1.</span> Task Category**: Indicates the category the tasks are sorted by. By default, they are sorted by workflow state.
  - **<span className="badge badge--warning">2.</span> Tasks**: Displays all the tasks present in the group under a specific category.
  - **<span className="badge badge--warning">3.</span> Action Button**: This button permits authorized users to carry out specific actions within the task group, like creating a new task or accessing data. Available actions vary on the workflow configuration.

- **<span className="badge badge--success">B.</span> Channel Workspace**: Displays the workspace area which allows user to access the chat channel and task settings.
  - **<span className="badge badge--info">4.</span> Menu Bar Icons**: Contains icons for various task actions and settings.
  - **<span className="badge badge--info">5.</span> Task Chat View**: Shows the chat conversation and activity related to the selected task.
  - **<span className="badge badge--info">6.</span> Task Detail View**: Displays detailed information about the selected task.
  - **<span className="badge badge--info">7.</span> Task Notification Subscription Banner**: Allows users to manage their notification preferences for the task.


## Task Details {#details}
To view or edit task details:

<img alt="task group" className="img_sizing item shadow--tl" src={useBaseUrl('img/task_group_01.png')} />
<br/>

- <span className="badge badge--danger">1.</span> Press the title bar on the channel workspace.
- <span className="badge badge--danger">2.</span> The task details panel slides open on the right side of the screen.

:::info
Go to the [Task Details](/docs/documentation/client/tasks/task_details) section for more information.
:::
