---
title: Access Roles Section
sidebar_label: Access Roles
---
import useBaseUrl from '@docusaurus/useBaseUrl';
import Highlight from '@theme/Highlight';

<img alt="design" class="img_sizing" src={useBaseUrl('img/design/Access_Roles.svg')} />


## Overview {#overview}
<br />
<img alt="" src={useBaseUrl('img/admin_accessrole.png')} width= "20%" height= "20%" align="left" />
<br />

In this section of the _administrative panel_, you can create, search, check and download the company's access roles.

An _access role_ is a set of previously arranged _permissions_ assignable to _users_ by administrators.

Within a company, _users_ fulfill different roles. It is important to assign specific _permissions_ to some _users_ and not to others. Assigning _access roles_ permits the quick designation of the sets of _permissions_ that _users_ will need to read or modify something in the application. The access given can go from answering a _survey_ from a specific _channel_ to configuring the _administrative panel_.

There is a wide range of default _permissions_ to choose from, but personalized ones can also be created. Created _permissions_ are given functionalities when other models are configured.

<br clear="left" />


## All Access Roles {#all-access-roles}

From the _Access roles_ button in the _Administrative Panel_ a list of all the _access roles_ that have been created in the company appear in the settings panel.
<img alt="" src={useBaseUrl('img/admin_accessrole_list.png')} />
<br/>
<br/>

The description of the icons are in the [Overview section](admin_overview).
<br/>

Checkboxes enable you to select from one to all _access roles_ for deactivation with one action.

## Edit / Create Single Access Role {#edit--create-single-access-role}
From the _Access roles_ settings panel, you can edit or create a single access role. By selecting an existing _access role_ or by pressing the _create new element_ button, the _Create access role_ settings panel will appear.
<img alt="" src={useBaseUrl('img/admin_accessrole_create.png')}  />
<br />
<br />

Below you will find the description and notes for each field of the _Create access role_ settings panel shown above.

| Field | Description | Notes |
| ---- | ----------- | ----- |
| Name | The visual name of the Access Role | It dosen't have to be unique|
| Description | Text that explains the Access Role | |
| Permissions | The given privileges | The list of default permissions is below |
| Positions assigned to | List of users who have been assigned this access role. | Obviously, at first when you create the access role it'll be blank|

The description of each button on the page where the _access role_ is created can be found in the [Overview section](admin_overview).

:::warning
Do not change the permission and name of an access role already created. It could change some state machine already created. If you want to change an access role, check with support first.
:::

### Default Access Roles {#default-access-roles}
The following table contains the default _access roles_ that already exist in any company.

<br/>

| Access Role      | Description          |
|------------------|----------------------|
| full admin       | full access in the legacy Admin.|
| read admin       | read all in the legacy Admin. |
| default          | basic client access  |
| bot-default      | full read            |

### Default Permissions {#default-permissions}
Default _permissions_ come pre-installed and can be assigned to any _access role_.

_Users_ need either _admin-accesscontrol-read permission_ or _admin-accesscontrol-write permission_ to read or write permissions respectively.

The next table contains the default _permissions_ present in all company configurations.

| Legacy Permissions for Admin and Users (soon to be deprecated)        | Description          |
|----------------------|----------------------|
| modify-permissions |  |
| web-admin-write | permission needed to use any other writing permission. |
| web-admin-read	| permission needed to use any other reading permission. |
| web-dashboard |  |
| web-survey-read |  |
| web-survey-write |  |
| create-invites |  |
| news-write |  |
| web-access |  |
| app-access |	can use any client	|

| Permissions for Admin Access          | Description          |
|----------------------|----------------------|
| admin-*-read |	Read all	|
| admin-*-write	| Write all |
| admin-groups-read	| Group Read |
| admin-groups-write | Group write |
| admin-channels-read	| Channels read |
| admin-channels-write	| Channels write |		
| admin-tasks-write | Task write |
| admin-accesscontrol-read	| permission needed to use any other reading permission |
| admin-accesscontrol-write | permission needed to create or edit access roles and permissions. |
| admin-users-read	| Users read |
| admin-users-write	| User write |		
| admin-bots-write	| Bot write |		
| admin-properties-read	| Properties read |
| admin-properties-write	| Properties write |
| admin-company-read	| Company read |
| admin-company-write	| Company write |
| admin-surveys-read | Surveys read |
| admin-surveys-write	| Surveys write |

| Report Section          | Description          |
|----------------------|----------------------|
| report-*-read | allows to view the report section |
| report-surveys-read | web reports	access |
| report-users-read |  |
| report-workflows-read |  |
| report-properties-read |  |

<!-- | report-*-write" |  |  -->
<!-- | report-surveys-write |  |
| report-users-write |  |
| report-workflows-write |  |
| report-properties-write |  | -->

| Database section | Description     |
|----------------------|----------------------|
| db-properties-read | allows viewing database section |
| db-properties-write | allows editing properties in database view |

:::note
In order to apply any _permission_ to a _user_ you must have _admin-accesscontrol-read permission_ and _admin-users-write permission_. :::
