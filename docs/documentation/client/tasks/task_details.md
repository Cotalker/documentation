---
title: Task Details
---
import useBaseUrl from '@docusaurus/useBaseUrl'; 



## User Task Roles {#user-roles}
User task roles are set in the task **Details** section. If you have the proper permissions and task role, you can write the name of the user in the corresponding field.

<div className="container">
<div className="row">
<div className="col col--6">


<img alt="create task" className="img_sizing_narrow item shadow--tl" src={useBaseUrl('img/client_tasks_12.png')} />
<br/>

</div>
<div className="col col--6">

1. **Assignee**: The user in charge of carrying out the task. Only one _assignee_ can be designated at a time. By default, the _creator_ of the task is designated as the _assignee_, but can later be changed.
2. **Creator**: The user that created the task. The _creator_ can be a human or a bot.
3. **Users** (_doble-click on the user tag to shuffle through the following options_):
    - **Follower**: A _follower_ can read task details and participate in the chat area, but cannot update task states or details.
    - **Editor**: An _editor_ has read & write access on all task detail fields and can participate in the chat area.
    - **Visibility**: Users with the _visibility_ tag can view limited task details. They can participate in the chat area and view notes, but they cannot change the task's state.

</div>
</div>
</div>

---

## Best Practices {#best-practices}
### Sorting Tasks {#sorting-tasks}
Tasks should be sorted in the group panel by _states_ so that users can visually identify the state their tasks are found in. Sorting tasks by states can be set in the [layout section of the settings panel](/docs/documentation/admin/workflows/settings_panels/workflowgroup-create-edit#layout-section) by choosing the _collection_ where the workflow states are found in.

### Task State Names {#task-state-organization}
State names should begin with a number or individual letter corresponding to their order in the group panel and task view. For example: "1. Backlog", "2. Doing", "3. Finished", "4. Unable to Complete". Since _states_ are _elements_ within _collections_, their names are configured and edited from the settings panel in the [Database panel](/docs/documentation/admin/database/admin_elements).

### Associating Tasks from Different Workflows {#tasks-different-workflows}
If needed, [tasks that belong to different workflows can be associated with one another](/docs/documentation/admin/workflows/settings_panels/workflow_create_edit#tasks-different-workflows). 