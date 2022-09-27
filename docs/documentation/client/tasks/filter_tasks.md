---
title: Filter & Sort Tasks
---

import useBaseUrl from '@docusaurus/useBaseUrl'; 

## Task Filters {#create-a-filter}
Customizing the way tasks are displayed is crucial. You can sort or filter them through multiple criteria, e.g., item status, the task's assigned user, etcetera. Up to three filters and three sorting criteria can be used per view.

When creating a filter for the first time, press the *filter button* in the top menu bar. A small *cog icon* will appear. Press it to open the *filter dialog box*. 

_Your screen should look something like this:_
<img alt="filter" className="img_sizing item shadow--tl" src={useBaseUrl('img/client_tasks_05.png')} />
<br/>

Once you are done adjusting the filters in the dialog box, it's possible to *save the filter* as a preset, so the next time the _task view_ is accessed, the saved filter will be shown as an option next to the *filter button*.

Filters can be saved for personal use or shared globally with the rest of the company by selecting the _Public filter_ option.

_Below is an example of a filter grouping tasks together by their state machine and ordering them by name alphabetically._

<img alt="task filters" className="img_sizing item shadow--tl" src={useBaseUrl('img/task_name_filter.gif')} />
<br/>

:::tip
See the [Task View Tutorial](/docs/tutorials/basic/tutorial_taskview) for more examples on using filters to organize tasks in the _task view_.
:::

---

## Best Practices {#best-practices}
### Sorting Tasks {#sorting-tasks}
Tasks should be sorted in the group panel by _states_ so that users can visually identify the state their tasks are found in. Sorting tasks by states can be set in the [layout section of the settings panel](/docs/documentation/admin/workflows/settings_panels/workflowgroup-create-edit#layout-section) by choosing the _collection_ where the workflow states are found in.