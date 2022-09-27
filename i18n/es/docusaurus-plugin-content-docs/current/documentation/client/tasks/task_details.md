---
title: Task Details
sidebar_label: Details
---

:::caution Advertencia
Esta página aún no se encuentra traducida al español.
:::
import useBaseUrl from '@docusaurus/useBaseUrl'; 
import Layout, {toc as Title1TOC} from '/docs/documentation/client/tasks/task_details/_task-details-layout.mdx';



Task settings are displayed in the **Details** tab on the task workspace. Settings can be viewed and edited according to the workflow configuration and user access roles.

## Layout {#layout}
<Layout/>

---

## Best Practices {#best-practices}
### Sorting Tasks {#sorting-tasks}
Tasks should be sorted in the group panel by _states_ so that users can visually identify the state their tasks are found in. Sorting tasks by states can be set in the [layout section of the settings panel](/docs/documentation/admin/workflows/settings_panels/workflowgroup-create-edit#layout-section) by choosing the _collection_ where the workflow states are found in.

### Task State Names {#task-state-organization}
State names should begin with a number or individual letter corresponding to their order in the group panel and task view. For example: "1. Backlog", "2. Doing", "3. Finished", "4. Unable to Complete". Since _states_ are _elements_ within _collections_, their names are configured and edited from the settings panel in the [Database panel](/docs/documentation/admin/database/admin_elements).

### Associating Tasks from Different Workflows {#tasks-different-workflows}
If needed, [tasks that belong to different workflows can be associated with one another](/docs/documentation/admin/workflows/settings_panels/workflow_create_edit#tasks-different-workflows). 
