---
id: create_accessroles
title: Create Access Roles
---
import useBaseUrl from '@docusaurus/useBaseUrl'; 

Tutorial on how to create _access roles_.

Time: 7 minutes

:::tip Vocabulary Note
An [_Access Role_](/docs/documentation/admin/admin_accessrole) is a preset of [_permissions_](/docs/documentation/admin/admin_accessrole#default-permissions) that can be assigned to a _user_ to allow them to have different levels of reading and writing access in the Cotalker platform.
:::

## Company Requirements {#company-requirements}
The company wants only managers and the CEO to be able to see the company's reports. Privacy is vital, so there must be no possibility that lower-ranking employees could have access to that information.

## Tutorial Objectives {#tutorial-objectives}
- [Create an _access role_ with the specified requirements.](#create-an-access-role)

## Pre-Requisites {#pre-requisites}
#### Access Role {#access-role}
Your _user_ profile's _access role_ **must** have at least the following [permissions](/docs/documentation/admin/admin_accessrole#default-permissions): 
- `admin-access` (permission to access the Administrative Panel)
- `admin-accesscontrol-write` (permission to create and edit _access roles_)

## Steps {#steps}
#### Create an Access Role: {#create-an-access-role}

<div className="alert alert--secondary">

**I. Go to the Access Roles section.**

<img alt="access role section" className="img_sizing item shadow--tl" src={useBaseUrl('img/tutorials/tutorial_basic_accessroles_00.png')} />
<br/>

1. From the **Main Menu Bar**, press the <span className="badge badge--primary">Administrator</span> button to access the **Administrative Panel**.
2. Select <span className="badge badge--primary">Acesss roles</span>.
3. The **Access Roles** section opens up.

</div>
<br></br>

<div className="alert alert--secondary">

**II. Open a settings panel to create a new access role.**

<img alt="access role panel" className="img_sizing item shadow--tl" src={useBaseUrl('img/tutorials/tutorial_basic_accessroles_01.png')} />
<br/>

- Press the <span className="badge badge--primary">+</span> icon in the upper right-hand corner to open an Access Role Settings Panel.

</div>
<br></br>

<div className="alert alert--secondary">

**III. Set up the new access role.**

<img alt="access role settings" className="img_sizing item shadow--tl" src={useBaseUrl('img/tutorials/tutorial_basic_accessroles_02.png')} />
<br/>

_Set the following: _
1. **Name**: _Report Access_
2. **Description**: _Grants users access to read reports._
3. **Permissions**: `report-surveys-read`
4. Press <span className="badge badge--primary">Save</span>

</div>
<br></br>

## Expected Result {#result}

_In the **Access Roles** section, the newly created access role should be found on the table._

<img alt="result access role section" className="img_sizing item shadow--tl" src={useBaseUrl('img/tutorials/tutorial_basic_accessroles_04.png')} />
<br/>

_The newly created access role's settings should look like this:_

<img alt="result settings" className="img_sizing item shadow--tl" src={useBaseUrl('img/tutorials/tutorial_basic_accessroles_03.png')} />
<br/>

:::tip Useful information
- _Access roles_ must be assigned to users when they are created. 
- It is useful to have access roles ready before creating users. 
- Nonetheless, users can be edited later and have new access roles assigned to them.
:::

<div className="align-center">

<iframe src="https://giphy.com/embed/3oz8xCsYTaeGxtF1W8" width="480" height="270" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/gotham-fox-mad-city-3oz8xCsYTaeGxtF1W8">via GIPHY</a></p>

</div>
<br/>

---

## Related Topics {#related-topics}
- [**Access Roles Section**](/docs/documentation/admin/admin_accessrole): Administrative Panel documentation
- [**COTAccessRoles**](/docs/documentation/models/users/model_accessroles): Access Role data model
- [**Access Role API**](/docs/documentation/api/users/accessroles): API documentation

