---
title: Access Roles Section
sidebar_label: Access Roles
---
import useBaseUrl from '@docusaurus/useBaseUrl';
import Highlight from '@theme/Highlight';

<img alt="design" class="img_sizing" src={useBaseUrl('img/design/Access_Roles.svg')} />


## Overview {#overview}

:::tip Vocabulary Tip
An _access role_ is a set of previously arranged _permissions_ assignable to _users_ by administrators.
:::

In the _Access Roles_ section of the _administrative panel_, you can create, search, and edit the company's access roles.

Within a company, _users_ fulfill different roles. It is important to assign specific _permissions_ to some _users_ and not to others. Assigning _access roles_ permits the quick designation of the sets of _permissions_ that _users_ will need to read or modify something in the application. The access given can go from answering a _survey_ from a specific _channel_ to configuring the _administrative panel_ or changing the state of a _workflow_.

There is a wide range of default _permissions_ to choose from, but personalized ones can also be created. Created _permissions_ are given functionalities when other models are configured.


## Main Settings Panel {#settings-panel}

As shown in the image below, from the _Access roles_ button in the _Administrative Panel_, a list of all the _access roles_ that have been created in the company appears in the settings panel.

<img alt="access roles settings panel" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_accessroles_00.png')} />
<br />

_Icon descriptions can be found in the [Overview section](admin_overview)._

Checkboxes enable you to select from one to all _access roles_, so you can deactivate them together with just one click.

## Edit / Create Single Access Role {#edit--create-single-access-role}
From the _Access roles_ settings panel, you can edit or create a single access role. By selecting an existing _access role_ or by pressing the _create new element_ button, the _Create access role_ settings panel will appear.

<img alt="edit or create" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_accessroles_01.png')}  />
<br />

_Button descriptions can be found in the [Overview section](admin_overview)._

### Field Descriptions

| Field | Description | Notes |
| ---- | ----------- | ----- |
| Name | The visual name of the Access Role | It doesn't have to be unique|
| Description | Text that explains the Access Role | |
| Permissions | Permissions available in access role. | See the full list of default permissions [below](#default-permissions). |
| Assigned to users | List of users who have been assigned this access role. | The list will be automatically filled when users are granted an access role. |


:::warning
Do not change the permission and name of an access role already created. It could alter an existing workflow's functionality or a users ability to work in Cotalker. If you want to change an access role, check with the support team first.
:::

## Default Access Roles {#default-access-roles}
The following table contains the default _access roles_ that are available by default in all companies.

| Access Role | Description |
|------------------|----------------------|
| full admin       | full access in the legacy Admin.|
| read admin       | read all in the legacy Admin. |
| default          | basic client access  |
| bot-default      | full read            |

## Default Permissions {#default-permissions}
Default _permissions_ come pre-installed and can be assigned to any _access role_.

There are four permission types. Three correspond to configuration areas accessible through the **Main Menu Bar** when the respective permissions have been granted: 

- [_Administrator_](#admin-section)
- [_Report_](#report-section)
- [_Database_](#database-section) 

The fourth permission type is like a sub-category for the other three types: 
- [_Endpoint_](#endpoint-permissions)

<div className="alert alert--secondary">

_The following "permissions tree" shows how the four permission types are related. Click the image to enlarge._

<a target="_blank" href="https://camo.githubusercontent.com/377a94a6105b687fcd8609b41251651a0f6899c457310f1f8f5b53e21ee8cd56/68747470733a2f2f646f63732e676f6f676c652e636f6d2f64726177696e67732f642f652f32504143582d3176517351585f5876662d36316f67764543504a735a455170324d4e4877343532436b55767a51467974393872545f456c735779792d386564777373644e6443743564445f4c536e6c66344676394e482f7075623f773d3137323326683d363939"><img alt="permissions tree" className="img_sizing" src='https://camo.githubusercontent.com/377a94a6105b687fcd8609b41251651a0f6899c457310f1f8f5b53e21ee8cd56/68747470733a2f2f646f63732e676f6f676c652e636f6d2f64726177696e67732f642f652f32504143582d3176517351585f5876662d36316f67764543504a735a455170324d4e4877343532436b55767a51467974393872545f456c735779792d386564777373644e6443743564445f4c536e6c66344676394e482f7075623f773d3137323326683d363939' /></a>

</div>
<br/>



### Administrator Section {#admin-section}
_Grant access to the Administrator Section:_
<img alt="admin section" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_accessroles_administrator_permissions.png')} />
<br/>

| Administrator section | Description |
|-----|-----|
| admin-*-read | Reading permission for all _endpoints_ in **Administrator** section. |
| admin-*-write | Allows reading and editing all _endpoints_ in **Administrator** section. |
| admin-access | Grants access to the **Administrator** section, but will only show the _endpoint permissions_ the user has been granted. |

### Report Section {#report-section}
_Grant access to the Report Section:_
<img alt="admin section" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_accessroles_reports_permissions.png')} />
<br/>

| Report Section | Description |
|----------------------|----------------------|
| report-*-read | Allows viewing of the **Report** section and all its categories. |
| report-surveys-read | Allows viewing the _surveys_ category in the **Reports** section. |
| report-workflows-read | Allows viewing the _workflows_ category in the **Reports** section. |
| report-properties-read | Allows viewing the _properties_ category in the **Reports** section. |
| report-users-read | Allows viewing the _users_ category in the **Reports** section. |
| report-*-write | Allows viewing and editing the **Reports** section and all its categories. |
| report-surveys-write | Allows viewing and editing the _surveys_ category in the **Reports** section. |
| report-workflows-write | Allows viewing and editing the _workflows_ category in the **Reports** section. |
| report-properties-write | Allows viewing and editing the _properties_ category in the **Reports** section. |
| report-users-write | Allows viewing and editing the _users_ category in the **Reports** section. |

### Database Section {#database-section}
_Grant access to the Database Section:_
<img alt="admin section" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_accessroles_database_permissions.png')} />
<br/>

| Database section | Description |
|----------------------|----------------------|
| db-*-read | Allows entering the **Database** section and viewing all of its collections and elements. |
| db-properties-read | Allows entering the **Database** section and viewing collections. |
| db-*-write | Allows reading and writing in all of the collections and elements of the **Database** section. |
| db-properties-write | Allows editing collections in the **Database** section. |

:::tip
For the time being, _db-*-read_ and _db-properties-read_ fulfill equivalent roles. Likewise, so do _db-*-write_ and _db-properties-write_.
:::

### Endpoint Permissions {#endpoint-permissions}
_Permissions for specific sections only. Must be used in conjunction with at least "admin-access"._

| Endpoint permissions | Description |
| ---- | ---- |
| admin-groups-read	| Allows reading _groups_. |
| admin-channels-read | Allows viewing _channels_. |
| admin-tasks-read | Allows viewing _tasks_. |
| admin-accesscontrol-read | Allows viewing _access roles_. |
| admin-users-read | Allows viewing _users_. |
| admin-bots-read | Allows viewing _bots_. |
| admin-properties-read | Allows viewing the _database_. |
| admin-company-read | Allows viewing _company_. |
| admin-surveys-read | Allows viewing _surveys_. |
| admin-answers-read | Allows viewing _answers_. |
| admin-groups-write | Allows editing _groups_. |
| admin-channels-write | Allows editing _channels_. |
| admin-tasks-write | Allows editing _tasks_. |
| admin-accesscontrol-write | Allows editing _access roles_. |
| admin-users-write | Allows editing _users_. |
| admin-bots-write | Allows editing _bots_. |
| admin-properties-write | Allows editing _database_. |
| admin-company-write | Allows editing _company_. |
| admin-surveys-write | Allows editing _surveys_. |


:::info Take into account:
- _Endpoint_ permissions require at least the _admin-access_ permission to be accessible through the Administrative Panel.
- _Admin-accesscontrol-read permission_ or _admin-accesscontrol-write permission_ are required to read or write permissions respectively.
- In order to apply any _permission_ to a _user_ you must have _admin-accesscontrol-read permission_ **and** _admin-users-write permission_.
:::

## Configuring Permissions {#configuring-permissions}

If administrators wish to configure permissions, they can do it through the library package. For access to the _Permissions Library Package_, please contact the [technical support team](/docs/support/technical).

:::note
Hard-coding _permissions_ has been deprecated.
:::

## Deprecated Permissions {#deprecated-permissions}

| Legacy Permissions for Admin and Users (soon to be deprecated) | Description |
|----------------------|----------------------|
| modify-permissions |  |
| web-admin-write | Equivalent to _admin-*-write_. |
| web-admin-read | Equivalent to _admin-*read_. |
| web-dashboard |  |
| web-survey-read | Equivalent to _admin-survey-read_. |
| web-survey-write | Equivalent to _admin-survey-write_. |
| create-invites |  |
| news-write |  |
| web-access |  |
| app-access | can use any client |
