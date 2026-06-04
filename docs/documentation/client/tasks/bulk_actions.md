---
title: Bulk Actions
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Sometimes you need to do the same thing to many tasks at once — fill out the same form, update the same field, or remove a batch of them. Instead of opening each task one by one, the _task view_ lets you act on a whole **selection** of tasks together. This page covers **bulk actions**: applying a form to every selected task in a single step.

## Selecting multiple tasks {#selecting-tasks}

Bulk operations start with a selection. In the _task view_, pick the tasks you want to act on — tick them individually, or select an entire group. Once one or more tasks are selected, the bulk options become available in the view's header.

<img alt="Selecting several tasks in the task view" className="img_sizing item shadow--tl" src={useBaseUrl('img/bulk_actions_selection.webp')} />
<br/>

## Running a bulk action form {#bulk-action-forms}

A **bulk action form** is a form (survey) that runs against every task in your selection at once — for example, marking a batch of tasks as reviewed, or recording the same inspection result across many of them.

To run one:

1. Select the tasks you want to act on.
2. Open the **Actions** menu in the _task view_ header. It lists the bulk action forms available for that task group.
3. Choose a form. It opens just like a normal form.
4. Fill it in and submit. The action is applied to **all** the selected tasks, and the selection clears once it completes.

<img alt="The Actions menu listing an available bulk action form" className="img_sizing item shadow--tl" src={useBaseUrl('img/bulk_actions_menu.webp')} />
<br/>

<img alt="Running a bulk action form across the selected tasks" className="img_sizing item shadow--tl" src={useBaseUrl('img/bulk_actions_form.webp')} />
<br/>

:::note
If the menu shows _"No bulk action forms available"_, it means no form has been set up as a bulk action form for that task group yet. See [Setting up a bulk action form](#setup) below.
:::

## Setting up a bulk action form {#setup}

A bulk action form is simply a survey that has been **flagged as a bulk action form**. This is configured in the _Administrative Panel_, not in the task view:

1. In the admin _Surveys_ section, open the survey you want to use (or create a new one).
2. Enable the **Bulk action form** setting on the survey.
3. Save.

Once flagged, the survey:

- appears under the dedicated **Bulk** list in the admin _Surveys_ section, and
- becomes selectable from the **Actions** menu in the _task view_ for the relevant task groups.

:::tip
A survey marked as a bulk action form is **removed from the normal single-task action menu** — it's intended for acting on a selection, not on one task at a time. Keep separate surveys for single-task and bulk use.
:::

## Other bulk operations {#other-bulk-operations}

Beyond running forms, the _task view_ offers two more operations on a selection:

- **Bulk edit** — update the same field(s) across all selected tasks in one dialog.
- **Bulk delete** — remove all selected tasks at once.

Both follow the same pattern: make your selection first, then choose the operation from the header.

:::note
Bulk operations act on the tasks of the **currently selected group**. Make sure you're in the right group before selecting and applying an action.
:::
