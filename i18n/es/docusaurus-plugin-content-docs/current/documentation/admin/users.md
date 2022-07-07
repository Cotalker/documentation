---
title: Users Panel
sidebar_label: Users
---
import useBaseUrl from '@docusaurus/useBaseUrl'; 
import Highlight from '@theme/Highlight';

<img alt="users" className="img_title" src={useBaseUrl('img/design/users.svg')} />

## Overview {#overview}

_Users_ are the basic unit of the Cotalker platform. They can log into their company's Cotalker environment and perform various actions. According to their [access roles](/docs/documentation/admin/admin_accessrole), they can view company data, create tasks following a workflow process, send messages to other users, submit information through surveys, interact with bots, initiate automated processes, and much more.

_Users_ can represent real people (team members, clients, associates, supervisors, platform administrators, etc.) or even non-people, such as robots. For example, a _user_ may be the company's Chief Operating Officer or a _bot_ who reminds you of pending tasks. 

_Users_ can also view and perform changes in the **Administrative Panel**, depending on the _permissions_ included in their _access roles_.

## Accessing the Users Panel {#accessing-users-panel}
To access the <span className="badge badge--primary">Users</span> panel:

<img alt="user panel" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_users_00.png')} />
<br/>

1. Press the <span className="badge badge--primary">Administrator</span> in the **Main Menu Bar**.
2. Select <span className="badge badge--primary">Users</span> from the **Administrative Panel**.
3. The [**Users Panel**](#users-panel-layout) will open up.

<div className="alert alert--secondary">

## Users Panel Layout {#users-panel-layout}
In this section, you can find the complete list of _users_ that have been created within the company.
  
<img alt="user panel" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_users_01.png')} />
<br/>

_Actions:_
- **1. Create user**: [Create a new user](#create-user) within the company.
- **2. Find user**: Searches for users within the company.
- **3. More options**: Allows viewing users that have been disabled and system users, i.e., bots created automatically by the platform.

_Table and Options:_
- **A. Checkbox**: Selects users in order to activate or deactivate them. When selected, the _Deactivate/Activate_ button will appear on the upper part of the layout.
- **B. Icon**: Displays the user's avatar.
- **C. Name**: Displays the user's full name.
- **D. User**: Indicates the user's identification code. The user's email is used in case of human users. For bots, a string with an email format is automatically generated.
- **E. Job title**: Indicates the [job title](/docs/documentation/admin/admin_jobtitles) associated with the user.
- **F. Access roles**: Displays the user's [access roles](/docs/documentation/admin/admin_accessrole).
- **G. Edit**: Opens the [user settings panel](#edit-user) for editing. 

</div>
<br/>

## Create User {#create-user}
Create a new _user_ by pressing the <span className="badge badge--secondary">+</span> icon in the upper right corner of the **Users Panel**. The [**User Settings Panel**](#user-settings-panel) will open up.

<img alt="create user" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_users_03.png')} />
<br/>

## Edit User {#edit-user}
From the **Users Panel**, edit an existing _user_ by pressing the _pen_ icon on its row. The [**User Settings Panel**](#user-settings-panel) will open up.

<img alt="create user" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_users_04.png')} />
<br/>



<div className="alert alert--secondary">

## User Settings Panel {#user-settings-panel}
Whether creating or editing a _user_, the following _user settings panel_ opens up. The **Channels** and **Surveys answered** sections are available only when editing a _user_. The **Additional fields** vary from _user_ to _user_ and according to the _collections_ used.
  
<img alt="user settings panel" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_users_02.png')} />
<br/>

_Actions:_
- **1. + Additional fields**: Associates a collection's additional fields to a user. [Details on Additional fields](#additional-fields).
- **2. Deactivate/Activate**: Deactivates or activates the user.
- **3. Save**: Saves the user with the current settings.

_Configuration:_
- [**A. General information**](#general-information): Basic user information.
- [**B. Access**](#access): User's access roles, i.e., sets of permissions.
- [**C. Settings**](#settings): Sets the visiblity of platform shortcuts for the user.
- [**D. Additional attributes**](#additional-attributes): Adds attributes to the user (deprecated).
- [**E. Elements**](#elements): Associates elements to the user.
- [**F. Related users**](#related-users): Indicates users that are direct superiors and subordinates.
- [**G. Channels**](#channels): Displays a list of the channels the user has access to.
- [**H. Surveys answered**](#surveys-answered): Displays a list of the surveys the user has submitted.
- [**I. Additional fields...**](#additional-fields-tab): Additional fields vary in name, type, and order of appearance according to the user's settings and the associated collection.

</div>
<br/>

<div className="alert alert--secondary">

### A. General information {#general-information}

<img alt="gnrl info" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_users_02a.png')} />
<br/>

<div className="container box">

<div className="row table-row-1">
<div className="col col--3"><strong>Names</strong>:</div>
<div className="col col--5">The user's first and middle names.</div>
<div className="col col--4"><em></em></div>
</div>
<div className="row table-row-2">
<div className="col col--3"><strong>Surname</strong>:</div>
<div className="col col--5">The user's surname (last or family name)</div>
<div className="col col--4"><em></em></div>
</div>
<div className="row table-row-1">
<div className="col col--3"><strong>Email</strong>:</div>
<div className="col col--5">The user's email address.</div>
<div className="col col--4"><em>It will be used as the user's identification code. Hence, it cannot be changed once saved and cannot be used more than once.</em></div>
</div>
<div className="row table-row-2">
<div className="col col--3"><strong>Phone</strong>:</div>
<div className="col col--5">The user's phone number.</div>
<div className="col col--4"><em></em></div>
</div>
<div className="row table-row-1">
<div className="col col--3"><strong>Job title</strong>:</div>
<div className="col col--5">The user's job title or responsibility within the company.</div>
<div className="col col--4"><em>

[Job titles](/docs/documentation/admin/admin_jobtitles) can be used to create pools of users, as well as granting them special attributes (additional fields), access roles, and elements.

</em></div>
</div>
</div>
</div>
<br/>

<div className="alert alert--secondary">

### B. Access {#access}

<img alt="access" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_users_02b.png')} />
<br/>

<div className="container box">

<div className="row table-row-1">
<div className="col col--3"><strong>Access roles</strong>:</div>
<div className="col col--3">

The [access roles](/docs/documentation/admin/admin_accessrole) assigned to the user.

<br/>

User _access roles_ imported by their [job title](/docs/documentation/admin/admin_jobtitles#access-roles) appear in gray.

<br/>

For security reasons, it is **EXTREMELY IMPORTANT** to assign _access roles_ with full knowledge of what their [_permissions_](/docs/documentation/admin/admin_accessrole#default-permissions) allow _users_ to do.

</div>
<div className="col col--6">

⚠️ – _Keep access roles with the __admin-accesscontrol-write__ and __admin-*-write__ permissions limited to key users because they can assign access roles to all other users. Furthermore, they can access and change every configuration in the entire company._  
⚠️ – _Beware of changing or removing assigned user access roles. This could affect workflow or automation behavior, but adding new ones will generally not have any side effects._

</div>
</div>
<div className="row table-row-2">
<div className="col col--3"><strong>Password</strong>:</div>
<div className="col col--3">Enter new password here.</div>
<div className="col col--6"><em>The field initially appears empty even if there is an existing password.</em></div>
</div>
<div className="row table-row-1">
<div className="col col--3"><strong>Repeat password</strong>:</div>
<div className="col col--3">Confirm the new password by rewriting it here.</div>
<div className="col col--6"><em></em></div>
</div>
</div>
</div>
<br/>

<div className="alert alert--secondary">

### C. Settings {#settings}

<img alt="settings" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_users_02c.png')} />
<br/>

<div className="container box">

<div className="row table-row-1">
<div className="col col--3"><strong>Hide Summary</strong>:</div>
<div className="col col--5">

When this toggle bar is on, the _home_ icon in the [**Main Menu Bar**](/docs/documentation/client/main_menu#main-menu-bar-layout) disapears, hiding access to all recent conversations.

</div>
<div className="col col--4"><em></em></div>
</div>
<div className="row table-row-2">
<div className="col col--3"><strong>Hide Contacts</strong>:</div>
<div className="col col--5">

When this toggle bar is on, the _contacts_ icon disappears, hiding access to a complete list of all users in the company.

</div>
<div className="col col--4"><em>

Found in the [upper toolbar on desktop versions](/docs/documentation/client/tool_bar#contact) or [the main menu in mobile versions](/docs/documentation/client/main_menu#main-menu-mobile).

</em></div>
</div>
</div>
</div>
<br/>

<div className="alert alert--secondary">

### D. Additional Attributes {#additional-attributes}

<img alt="additional attributes" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_users_02d.png')} />
<br/>

_Additional attributes have been deprecated and used only on legacy systems. Prefer [additional fields](#additional-fields) instead._

<div className="container box">

<div className="row table-row-1">
<div className="col col--3"><strong>+ Add Additional Attributes</strong>:</div>
<div className="col col--5">Opens the settings box for an additional attribute.</div>
<div className="col col--4"><em></em></div>
</div>
<div className="row table-row-2">
<div className="col col--3"><strong>Name</strong>:</div>
<div className="col col--5">The attribute's name.</div>
<div className="col col--4"><em>

Appears when the **+ Add Additional Attribute** button is pressed.

</em></div>
</div>
<div className="row table-row-1">
<div className="col col--3"><strong>Value</strong>:</div>
<div className="col col--5">The value given to the attribute.</div>
<div className="col col--4"><em>

Appears when the **+ Add Additional Attribute** button is pressed.

</em></div>
</div>
</div>
</div>
<br/>

<div className="alert alert--secondary">

### E. Elements {#elements}

<img alt="elements" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_users_02e.png')} />
<br/>

<div className="container box">

<div className="row table-row-1">
<div className="col col--3"><strong>+ Add Element</strong>:</div>
<div className="col col--5">

Opens the settings box to choose a [database collection and its elements](/docs/documentation/admin/database/admin_database_overview).

</div>
<div className="col col--4"><em>An element can be used to grant users permission to certain routines or surveys associated with the particular element.</em></div>
</div>
<div className="row table-row-2">
<div className="col col--3"><strong>Collection</strong>:</div>
<div className="col col--5">

Indicates a collection from where to choose elements to be associated with the user.  
Collections imported from the user's [job title](/docs/documentation/admin/admin_jobtitles#elements) appear in gray.

</div>
<div className="col col--4"><em>

Press the the **+ Add Element** button if elements from another collection are needed.

</em></div>
</div>
<div className="row table-row-1">
<div className="col col--3"><strong>Elements</strong>:</div>
<div className="col col--5">

Indicates the elements from the collection chosen to be associated with the user.  
Elements imported from the user's [job title](/docs/documentation/admin/admin_jobtitles#elements) appear in gray.

</div>
<div className="col col--4"><em>

Press the **+ Add Element** button if elements from another collection are needed.

</em></div>
</div>
</div>
</div>
<br/>

<div className="alert alert--secondary">

### F. Related users {#related-users}

<img alt="related users" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_users_02f.png')} />
<br/>

<div className="container box">

<div className="row table-row-1">
<div className="col col--3"><strong>Bosses</strong>:</div>
<div className="col col--5">Indicates the users that are direct supervisors, i.e., those that have the user set as their "subordinate".</div>
<div className="col col--4"><em></em></div>
</div>
<div className="row table-row-2">
<div className="col col--3"><strong>Subordinates</strong>:</div>
<div className="col col--5">Lists the users that the present user supervises.</div>
<div className="col col--4"><em></em></div>
</div>
</div>
</div>
<br/>

<div className="alert alert--secondary">

### G. Channels {#channels}

<img alt="gnrl info" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_users_02g.png')} />
<br/>

<div className="container box">

<div className="row table-row-1">
<div className="col col--3"><strong>Icon</strong>:</div>
<div className="col col--5">Displays the avatar of the channel the user is associted with.</div>
<div className="col col--4"><em></em></div>
</div>
<div className="row table-row-2">
<div className="col col--3"><strong>Channel name</strong>:</div>
<div className="col col--5">Indicates the name of the channel the user is associated with.</div>
<div className="col col--4"><em>Channels could correspond to tasks as well.</em></div>
</div>
<div className="row table-row-1">
<div className="col col--3"><strong>Group</strong>:</div>
<div className="col col--5">Indicates the group the channel belongs to.</div>
<div className="col col--4"><em>The group can be either a regular or workflow (task) group.</em></div>
</div>
</div>
</div>
<br/>

<div className="alert alert--secondary">

### H. Surveys answered {#surveys-answered}

<img alt="Surveys answered" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_users_02h.png')} />
<br/>

<div className="container box">

<div className="row table-row-1">
<div className="col col--3"><strong>1, 2, 3... Survey name</strong>:</div>
<div className="col col--5">Surveys the user has filled out. The survey containers hold the forms or answered surveys.</div>
<div className="col col--4"><em>"Survey" refers to the empty template with questions for users to fill out. A "form" refers to the submitted survey with its answers.</em></div>
</div>
<div className="row table-row-2">
<div className="col col--3"><strong>A. Form</strong>:</div>
<div className="col col--5">Lists the forms submitted by the users, i.e., each time the user filled out a survey and sent it.</div>
<div className="col col--4"><em></em></div>
</div>
<div className="row table-row-1">
<div className="col col--3"><strong>B. Eye icon</strong>:</div>
<div className="col col--5">

Click to view the corresponding form in the [Reports](/docs/documentation/client/reports) section.

</div>
<div className="col col--4"><em></em></div>
</div>
<div className="row table-row-2">
<div className="col col--3"><strong>C. Last modified</strong>:</div>
<div className="col col--5">Indicates the date and time the form was submitted.</div>
<div className="col col--4"><em></em></div>
</div>

</div>

</div>
<br/>


<div className="alert alert--secondary">

### i. Additional fields... {#additional-fields-tab}

<img alt="additional fields" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_users_02i.png')} />
<br/>

<div className="container box">

<div className="row table-row-1">
<div className="col col--12">

_An additional field's name, input type, and order of apperance is customizable and depends on its collection. The image shown above is just an example._

</div>
</div>
<div className="row table-row-2">
<div className="col col--12">

Go to the [**Additional Fields**](#additional-fields) section for setup information and more details on setting up _additional fields_ for a particular user.  
For information on adding _additional fields_ through a user's _job title_, go to the [**Attributes section of the Job Titles page**](/docs/documentation/admin/admin_jobtitles#attributes).

</div>
</div>

</div>

</div>
<br/>

## Additional Fields {#additional-fields}

When creating or modifying a _user_, it may be desirable to add extra information depending on the company's needs. Since this information can be multiple and varied, a special arrangement has been developed in order to associate a _user_ to a _collection_ created to host the extra user-data requirements. The **additional fields** can include information in _string_, _number_, _date_, _boolean_, and _URL_ format. They can also host files, other _elements_, or even _users_.

:::note
- **Additional Fields** must be previously created within a _Collection_ in the _Database_ section.
- Information on how to set up an **Additional Fields Collection** can be found in the [Database Admin Section](/docs/documentation/admin/database/admin_collections#additional-fields).
- All the user data input into the additional fields is stored in the collection.
- _Attributes_ assigned to a user's [_job title_](/docs/documentation/admin/admin_jobtitles) are automatically assigned as **additional fields** and cannot be removed from the _User Settings Panel_.
:::

_In order to activate **Additional Fields**, press the button in the upper-right corner:_

<img alt="additional fields" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_users_05.png')} />
<br/>
<br/>

_From the following dialog box, choose the **Collection containing the Additional Fields** that you want to associate with the **user**._

<img alt="choose additional fields" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_users_06.png')} />
<br/>
<br/>

_You can also conduct a search for the **collection** you are looking for._

<img alt="choose additional fields" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_users_07.png')} />
<br/>
<br/>


_Once the **Collection** has been selected, a new tab will appear in the **user** settings panel with the name of the **collection** containing the additional fields._

<img alt="additional fields" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_users_08.png')} />
<br/>

---

<br/>

## Related Topics {#related-topics}

- [How to Create a User Tutorial](/docs/tutorials/basic/create_user)
- [User data model](/docs/documentation/models/users/model_users)
- [User API Requests](/docs/documentation/api/users/)