---
title: Introduction
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import Highlight from '@theme/Highlight';

<img alt="design" className="img_title" src={useBaseUrl('img/design/Platforms.svg')} />
<br/>

The _administrative panel_ is the admin's main workplace. From here, they can configure and monitor the entire Cotalker environment.

:::info
Access and use of the administrative panel is limited by the user's [access roles](/docs/documentation/admin/admin_accessrole).
:::

## Accessing the Administrative Panel {#access-administrative-panel}

<img alt="access" className="img_sizing_narrow item shadow--tl" src={useBaseUrl('img/admin_overview_00.png')} />
<br/>

1. Press <span className="badge badge--primary">Administrator</span> in the **Main Menu Bar**.
2. The _administrative panel_ opens up, 
3. A corresponding settings panel shows up.





<div className="container alert alert--secondary">
<div className="row">
<div className="col col--12">

## Layout/Index {#layout}

The administrative panel's layout serves also as this documentation section's index.

_From the administrative panel, you can access the following:_

</div>
</div>
<div className="row">
<div className="col col--6">
<img alt="access" className="img_sizing_narrow item shadow--lw" src={useBaseUrl('img/admin_overview_01.png')} />
<br/>
</div>
<div className="col col--6">

<span className="hero__subtitle">SECTIONS</span>

  1. [**Workflows**](/docs/documentation/admin/workflows/admin_workflow_overview): Create and configure workflow groups and workflows.
  2. [**Link Groups**](/docs/documentation/admin/admin_links): Create links that appear on the _Main Menu Bar_ or within a _group_.
  3. [**Groups**](/docs/documentation/admin/admin_group): Create _standard groups_ for communicating with other users and sharing information.

<span className="hero__subtitle">DATA</span>

  4. [**Database**](/docs/documentation/admin/database/admin_database_overview): Manage collections and elements.
  5. [**Surveys**](/docs/documentation/admin/survey/survey_overview): Create and modify surveys used to gather information from users or configure workflows.

<span className="hero__subtitle">COMPANY</span>

  6. [**Users**](/docs/documentation/admin/users): Create and modify _user profiles_ along with their access roles, job titles, and additional fields.
  7. [**Job Titles**](/docs/documentation/admin/admin_jobtitles): Create job titles that can be associated to users as elements with special attributes.
  8. [**Configuration**](/docs/documentation/admin/admin_company): Edit company information and language.

<span className="hero__subtitle">AUTOMATIONS</span>

  9. [**Bots**](/docs/documentation/admin/admin_bots): Create and edit customized bots to carry out automated routines.
  10. [**Schedules**](/docs/documentation/admin/admin_bots): Create and edit scheduled routines.
  11. [**Automation Log**](/docs/documentation/automation/automation_log): Monitor all automations carried out in the Cotalker environment.
  12. [**Routines**](/docs/documentation/admin/routines): Create or edit predetermined bots that can be later used in routines.
  13. [**Webhooks**](/docs/documentation/admin/admin_webhooks): Set up triggers that send data to your server upon certain events.

<span className="hero__subtitle">SECURITY</span>

  14. [**Access Roles**](/docs/documentation/admin/admin_accessrole): Create and modify sets of permissions given to users for different types of access.
  15. [**API Tokens**](/docs/documentation/admin/admin_token): Create API tokens or bearer keys that grant different levels of access and can be shared with users even outside the Cotalker environment.
  16. [**Audit Logs**](/docs/documentation/admin/admin_auditlogs): Monitor creation and modifications of _users_ and _access roles_.

</div>

</div>
</div>
<br/>

## Icons {#icons}
When using the _administrative panel_, various icons will appear in its settings panels to offer possible actions or options.


_Below, we find the descriptions of the buttons used for in all list tables:_

| Action Name | Image | Description |
| ---- | ----- | ----------- |
| Search | <img alt="" src={useBaseUrl('img/icon_search.png')} /> | Search for a specific element |
| Create | <img alt="" src={useBaseUrl('img/icon_plus.png')} /> | Create a new element |
| Edit | <img alt="" src={useBaseUrl('img/icon_edit.png')} /> | Edit a specific element |
| Download | <img alt="" src={useBaseUrl('img/icon_download.png')} /> | Open download menu|
| Import | <img alt="" src={useBaseUrl('img/icon_import.png')} /> | Open import menu. (This is not available for all models) |
| Change Page | <img alt="" src={useBaseUrl('img/icon_arrows.png')} /> | Moves user list backward / forward |
| Change the whole Page | <img alt="" src={useBaseUrl('img/icon_firstone.png')} /> <img alt="" src={useBaseUrl('img/icon_lastone.png')} /> | Moves user list to the first / last page |



The description of the _page buttons_ for **creating or editing an _element_** can be found in the following table:

| Action Name | Image | Description |
| ---- | ----- | ----------- |
| Save | <img alt="" src={useBaseUrl('img/icon_save.png')} /> | Save current configuration |
| Deactivate | <img alt="" src={useBaseUrl('img/icon_deactivate.png')} /> | Deactivate the element |
| Camera | <img width="50" alt="" src={useBaseUrl('img/icon_camera.png')} /> | Set image |
| Back | <img width="50" alt="" src={useBaseUrl('img/icon_back.png')} /> | Back to all elements list |
| Disable | <img width="50" alt="" src={useBaseUrl('img/icon_disabled.png')} /> | Show disabled items |
| Checkbox | <img width="50" alt="" src={useBaseUrl('img/icon_checkbox.png')} /> | Select the item to disable |
| Disable Button | <img width="50" alt="" src={useBaseUrl('img/icon_disablebutton.png')} /> | If it is blue, it activates the item, otherwise it deactivates it. |


The buttons used when **downloading a list of items** are found in the next table:

| Action Name | Image | Description |
| ---- | ----- | ----------- |
| Download | <img width="80" alt="" src={useBaseUrl('img/icon_download_1.png')} /> | Download the list |
| Cancel | <img width="80" alt="" src={useBaseUrl('img/icon_cancel.png')} /> | Retract the download |


In the next table, buttons for when a **list of items is imported**:

| Action Name | Image | Description |
| ---- | ----- | ----------- |
| Select | <img width="80" alt="" src={useBaseUrl('img/icon_select.png')} /> | Select a file from your finder |
| Cancel | <img width="80" alt="" src={useBaseUrl('img/icon_cancel_import.png')} /> | Retract the import |
