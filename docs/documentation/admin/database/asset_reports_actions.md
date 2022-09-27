---
title: Asset Reports & Actions
sidebar_label: Reports & Actions
---
import useBaseUrl from '@docusaurus/useBaseUrl';
import Highlight from '@theme/Highlight';

<span className="hero__subtitle">Asset Viewer</span>
<br/>
<br/>

The **Asset Viewer** provides users with access to customized **reports and actions** related to the asset being displayed.

_Reports and actions can be set to:_
- Display tasks associated with the asset ([Tasks](/docs/documentation/admin/database/asset_tasks))
- Open surveys associated with the asset ([Actions](/docs/documentation/admin/database/asset_actions))
- Display data gathered from the SQL database ([Forms](/docs/documentation/admin/database/asset_forms))




## Options {#options}
_From the Asset Viewer you can open, create, or delete reports and actions:_

:::info
**Reports & actions** can only be configured when the _Asset Viewer_ is accessed through the [Administrative Panel](/docs/documentation/admin/database/admin_elements#edit-element) by authorized users.
:::

<img alt="reports and actions" className="img_sizing item shadow--tl" src={useBaseUrl('img/asset_reports_actions_00.png')} />
<br/>

1. Existing reports and actions (customizable for each asset)
    - _Left-click_: [**Open**](#open) a report or action
    - _Right-click_: [**Edit** or **delete**](#edit-delete) a report or action
2. [**Create**](#create) a report or action (only available when accessed through Administrative Panel)

### Open Reports/Actions {#open}
Reports and actions accessed through the Asset Viewer are divided into three categories:
- [**Tasks**](/docs/documentation/admin/database/asset_tasks): Displays [tasks](/docs/documentation/client/tasks/overview) according to predefined filters
- [**Actions**](/docs/documentation/admin/database/asset_actions): Opens a [survey](/docs/documentation/client/surveys)
- [**Forms**](/docs/documentation/admin/database/asset_forms): Displays data gathered from an SQL database query.


### Edit/Delete Reports/Actions {#edit-delete}
_To edit or delete a report or action:_

<img alt="reports and actions" className="img_sizing item shadow--tl" src={useBaseUrl('img/asset_reports_actions_01.png')} />
<br/>

- Right-click the corresponding report or action to open the sub-menu.
- Choose to **Edit** or **Delete** from the sub-menu.

### Create Reports & Actions. {#create}
Once the _create_ icon is selected, the following window appears:

<img alt="reports and actions" className="img_sizing item shadow--tl" src={useBaseUrl('img/asset_reports_actions_02.png')} />
<br/>

_Admins can create Reports & Actions in the following three categories:_

- [**A. Tasks**](/docs/documentation/admin/database/asset_tasks): Displays [tasks](/docs/documentation/client/tasks/taskview) according to predefined filters
- [**B. Actions**](/docs/documentation/admin/database/asset_actions): Opens a [survey](/docs/documentation/client/surveys)
- [**C. Forms**](/docs/documentation/admin/database/asset_forms): Displays data gathered from an SQL database query.

Choosing a category from the tabs above displays the corresponding settings fields.

:::note
Only one report or action can be created at a time. 
:::