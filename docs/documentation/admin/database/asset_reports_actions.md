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
- Display tasks associated with the asset
- Open surveys associated with the asset
- Display data gathered from the SQL database

:::info
Reports and actions must be configured by admins.
:::


## Options {#options}
_From the Asset Viewer you can open, create, or delete reports and actions:_

<img alt="reports and actions" className="img_sizing item shadow--tl" src={useBaseUrl('img/asset_reports_actions_00.png')} />
<br/>

1. Existing reports and actions
    - _Left-click_: **Open** a report or action
    - _Right-click_: **Edit** or **delete** a report or action
2. **Create** a report or action

## Open Reports/Actions {#open}
Reports and actions accessed through the Asset Viewer are divided into three categories:
- [**Tasks**](/docs/documentation/admin/database/asset_tasks): Displays [tasks](/docs/documentation/client/taskview) according to predefined filters
- [**Actions**](/docs/documentation/admin/database/asset_actions): Opens a [survey](/docs/documentation/client/surveys)
- [**Forms**](/docs/documentation/admin/database/asset_forms): Displays data gathered from an SQL database query.


## Edit/Delete Reports/Actions {#edit-delete}
_To edit or delete a report or action:_

<img alt="reports and actions" className="img_sizing item shadow--tl" src={useBaseUrl('img/asset_reports_actions_01.png')} />
<br/>

- Right-click the corresponding report or action to open the sub-menu.
- Choose to **Edit** or **Delete** from the sub-menu.

## Create Reports & Actions. {#create}
Admins can create Reports & Actions in the following three categories:

<img alt="reports and actions" className="img_sizing item shadow--tl" src={useBaseUrl('img/asset_reports_actions_02.png')} />
<br/>

- [**A. Tasks**](/docs/documentation/admin/database/asset_tasks): Displays [tasks](/docs/documentation/client/taskview) according to predefined filters
- [**B. Actions**](/docs/documentation/admin/database/asset_actions): Opens a [survey](/docs/documentation/client/surveys)
- [**C. Forms**](/docs/documentation/admin/database/asset_forms): Displays data gathered from an SQL database query.

Choosing a category from the tabs above displays the corresponding settings fields. 

:::note
Only one report or action can be created at a time. 
:::