---
title: Users Section
sidebar_label: Users
---
import useBaseUrl from '@docusaurus/useBaseUrl'; 
import Highlight from '@theme/Highlight';

<img alt="design" class="img_sizing" src={useBaseUrl('img/design/users.svg')} />

## Introduction {#introduction}

<img alt="user section" class="img_sizing item shadow--tl" src={useBaseUrl('img/admin_user_00.png')} />
<br/>

_Users_ are the basic unit of a company. They may log in and perform actions within the company, such as sending messages.

_Users_ can represent real people (team members, clients, associates, testers) or even non-people, such as robots. For example, a _user_ may be the company's Chief Operating Officer (COO) or a _bot_ who reminds you of pending tasks. 

This section is divided into two parts: the **User list** to search, review, and download company user-related data; and the **Create/Edit User** where _users_ are created or modified.

## User list {#user-list}

In this section, you can find the complete list of _users_ that have been created.
  
<img alt="user list" class="img_sizing item shadow--tl" src={useBaseUrl('img/admin_user_list.png')} />
<br/>

:::note
Descriptions of each toolbar-button are found in the [Admin Overview](admin_overview).
:::

The information shown in the _user list_ corresponds to:

| column | meaning | 
|--------|---------|
|   Name  |   User first and last name    |
|   User  |  User email |
|  Job title |  User job | 
| Access Role | List of access-roles names |

<br/>

### Download User List {#download-user-list}

You can only download _user lists_ in CSV format.  
The available encoding field options are `Windows`, `Macintosh` and `UTF-8`.  

<img alt="download list" class="img_sizing item shadow--tl" src={useBaseUrl('img/admin_user_download.png')} />
<br/>

  
## Create/Edit User {#createedit-user}
In this section, you can create or edit a single user.
  
<img alt="" src={useBaseUrl('img/admin_user_create_1.png')}  />

<img alt="" src={useBaseUrl('img/admin_user_create_2.png')}  />
<br/>
<br/>

  
The following table describes each field shown above.
  
  
| Field | Description | Notes | 
| ---- | ----------- | ----- | 
| Names | User's first name | The second name is optional |
| Surname | User's last name | |
| Email | User's email | It has to be unique. This email is used to log in. |
| Phone | User's phone number | |
| Job title | User's job | The Job Title must be created in the *Job Category* of the company section to be selected. |
| Access Roles | User assigned access roles | You can only choose from existing access roles.|
| Password | Create or change password | This field starts empty; the password can be changed in this field.|
| Repeat Password | Create or change password | Required to validate secret password creation or change |
| Add additional Attributes | Custom additional field | Add a name and value for the new field |
| Add Element | Element/Property additional field | Add the collection and element. Useful when setting up a routine or survey associated with a particular element. |
| Bosses | User supervisor | You can choose from existing users |

:::note
- Additional, read-only, "relational" sections will appear, for example, where channels and tasks include the _user_.
- Descriptions of each toolbar-button are found in the [Admin Overview](admin_overview).
:::

:::caution
- An administrator can change all the fields, except the email.
- Keep the __admin-accesscontrol-write__ and __admin-*-write__ permissions limited to key _users_ because they can assign _access-roles_. Therefore, they access and change every configuration in the entire company. 
:::

:::warning
- Beware of changing or removing assigned _user_ access-roles or elements. This could affect worklow or automation behavior, but adding new ones will generally not have any side effects.
:::

## Permissions {#permissions}

_Administrative users_ can view and perform changes, depending on their _permissions_.

| Permission | Description |
|------------|-------------|
| __admin-user-read__ or __admin-*-read__ | Allows to view all users |
| __admin-user-write__ | Allows modifying all fields, except access-roles |
| __admin-accesscontrol-write__ | Allows modifying user access-roles |
| __admin-*-write__ | Allows modifying all user fields |

## Additional Fields {#additional-fields}

When creating or modifying a _user_, it may be desirable to add extra information depending on the company's needs. Since this information can be multiple and varied, a special arrangement has been developed in order to associate a _user_ to a _collection_ created to host the extra user-data requirements. The **additional fields** can include information in _string_, _number_, _date_, _boolean_, and _URL_ format. They can also host files, other _elements_, or even _users_.

:::note
_Attributes_ assigned to a user's [_job title_](/docs/documentation/admin/admin_company#job-titles) are automatically assigned as **additional fields**.
:::

_In order to activate **Additional Fields**, press the button in the upper-right corner:_

<img alt="additional fields" class="img_sizing item shadow--tl" src={useBaseUrl('img/admin_user_additional_00.png')} />
<br/>
<br/>

_From the following dialog box, choose the **Additional Fields** you want to associate with the **user**._

<img alt="choose additional fields" class="img_sizing item shadow--tl" src={useBaseUrl('img/admin_user_additional_01.png')} />
<br/>
<br/>

_Once the **Additional Fields** have been selected, **Additional Field Tabs** will appear at the bottom of the **user** settings panel._

<img alt="additional fields" class="img_sizing item shadow--tl" src={useBaseUrl('img/admin_user_additional_02.png')} />
<br/>

:::note Setup information
- **Additional Fields** must be previously created as _Collections_ in the _Database_ section.
- Information on how to set up an **Additional Fields Collection** can be found in the [Database Section](admin_properties#additional-fields).
:::


<br/>
<br/>

[Please report any bugs, problems, or issues you may have found here.](/docs/support/bug_report)
