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

Within a company, _users_ fulfill different roles. It is important to assign specific _permissions_ to some _users_ and not to others. Assigning _access roles_ permits the quick designation of the sets of _permissions_ that _users_ will need to read or modify something in the application. The access given can go from answering a _survey_ from a specific _channel_ to configuring the _administrative panel_.

There is a wide range of default _permissions_ to choose from, but personalized ones can also be created. Created _permissions_ are given functionalities when other models are configured.


## Main Settings Panel {#settings-panel}

As shown in the image below, from the _Access roles_ button in the _Administrative Panel_ a list of all the _access roles_ that have been created in the company appear in the settings panel.

<img alt="access roles settings panel" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_accessroles_00.png')} />
<br />

Icon descriptions can be found in the [Overview section](admin_overview).

Checkboxes enable you to select from one to all _access roles_ for deactivation with one action.

## Edit / Create Single Access Role {#edit--create-single-access-role}
From the _Access roles_ settings panel, you can edit or create a single access role. By selecting an existing _access role_ or by pressing the _create new element_ button, the _Create access role_ settings panel will appear.

<img alt="edit or create" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_accessroles_01.png')}  />
<br />


### Field Descriptions

| Field | Description | Notes |
| ---- | ----------- | ----- |
| Name | The visual name of the Access Role | It dosen't have to be unique|
| Description | Text that explains the Access Role | |
| Permissions | Permissions available in access role. | See the full list of default permissions [below](#default-permissions). |
| Assigned to users | List of users who have been assigned this access role. | The list will be automatically filled when users are granted an access role. |

The description of each button on the page where the _access role_ is created can be found in the [Overview section](admin_overview).

:::warning
Do not change the permission and name of an access role already created. It could alter an existing workflow's functionality. If you want to change an access role, check with support first.
:::

### Default Access Roles {#default-access-roles}
The following table contains the default _access roles_ that are available by default in all companies.

| Access Role | Description |
|------------------|----------------------|
| full admin       | full access in the legacy Admin.|
| read admin       | read all in the legacy Admin. |
| default          | basic client access  |
| bot-default      | full read            |

### Default Permissions {#default-permissions}
Default _permissions_ come pre-installed and can be assigned to any _access role_.
The following table contains the default _permissions_ present in all company configurations.

:::note
_Admin-accesscontrol-read permission_ or _admin-accesscontrol-write permission_ are required to read or write permissions respectively.
:::

| Permissions for Admin Access | Description |
|-----|-----|
| admin-*-read | Read all |
| admin-*-write | Write all |
| admin-access | |


| Report Section          | Description          |
|----------------------|----------------------|
| report-*-write | |
| report-*-read | allows to view the report section |
| report-surveys-write |  |
| report-surveys-read | web reports	access |
| report-users-read |  |
| report-workflows-write |  |
| report-workflows-read |  |
| report-properties-write |  |
| report-users-write |  |
| report-properties-read |  |

| Database section | Description     |
|----------------------|----------------------|
| db-*-write | |
| db-*-read | |
| db-properties-read | allows viewing database section |
| db-properties-write | allows editing properties in database view |

| Endpoint permissions | Description |
| ---- | - --- |
| admin-groups-read	| Group Read |
| admin-groups-write | Group write |
| admin-channels-read	| Channels read |
| admin-channels-write	| Channels write |
| admin-tasks-read | |
| admin-tasks-write | Task write |
| admin-accesscontrol-read	| permission needed to use any other reading permission |
| admin-accesscontrol-write | permission needed to create or edit access roles and permissions. |
| admin-users-read | Users read |
| admin-users-write | User write |
| admin-bots-read | |
| admin-bots-write | Bot write |
| admin-properties-read | Properties read |
| admin-properties-write | Properties write |
| admin-company-read | Company read |
| admin-company-write | Company write |
| admin-surveys-read | Surveys read |
| admin-surveys-write | Surveys write |
| admin-answers-read | |


:::note
In order to apply any _permission_ to a _user_ you must have _admin-accesscontrol-read permission_ **and** _admin-users-write permission_.
:::

### Configuring Permissions {#configuring-permissions}

If administrators wish to configure permissions, they can do it through the library package. For access to the _Permissions Library Package_, please contact the [technical support team](/docs/support/technical).

:::note
Hard-coding _permissions_ has been deprecated.
:::

### Deprecated Permissions {#deprecated-permissions}

| Legacy Permissions for Admin and Users (soon to be deprecated) | Description |
|----------------------|----------------------|
| modify-permissions |  |
| web-admin-write | permission needed to use any other writing permission. |
| web-admin-read | permission needed to use any other reading permission. |
| web-dashboard |  |
| web-survey-read |  |
| web-survey-write |  |
| create-invites |  |
| news-write |  |
| web-access |  |
| app-access |	can use any client	|