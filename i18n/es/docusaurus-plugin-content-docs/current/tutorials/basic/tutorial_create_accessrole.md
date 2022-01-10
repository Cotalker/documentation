---
id: create_accessroles
title: Create Access Roles
---
import useBaseUrl from '@docusaurus/useBaseUrl'; 

Tutorial on how to create _access roles_.

Time: 7 minutes

:::tip Vocabulary Note
An _Access Role_ is a preset of _permissions_ that can be assigned to a _user_ to allow them to have different levels of reading and writing access in the app.
:::

## Company Requirements {#company-requirements}
#### Tutorial Objectives {#tutorial-objectives}
The company wants only bosses and the CEO to be able to see the company's reports. Privacy is vital, so there must be no possibility that lower-ranking employees could have access to that information.

## Pre-Requisites {#pre-requisites}
#### Access Role {#access-role}
* User with the `admin-accesscontrol-write` permission to create and modify access roles. 
* Or`admin-*-write` which allows all of the above. 
* User with the `web-admin-write` and `web-admin-read` permissions to set up the admin.
* User with the `read admin` access role.

## Steps {#steps}

#### I. Create the Access Role: {#i-create-the-access-role}

<div className="alert alert--secondary">

1. From the **Main Menu Bar**, access the <span className="badge badge--primary">Administrator</span> and open <span className="badge badge--primary">Acesss roles</span>.

  _The following settings panel will open up:_

<img alt="access role panel" className="img_sizing item shadow--tl" src={useBaseUrl('img/tutorial_access_00.png')} />
<br/>

</div>
<br></br>

<div className="alert alert--secondary">

2. Press the <span className="badge badge--primary">+</span> icon shown below to create a new *Access Role*:

<img className="img_sizing item shadow--tl" alt="create access role icon" src={useBaseUrl('img/tutorial_access_01.png')} />
<br/>

_The following settings panel will then open up:_

<img className="img_sizing item shadow--tl" alt="create access role panel" src={useBaseUrl('img/tutorial_access_02.png')} />
<br/>

</div>
<br></br>

<div className="alert alert--secondary">

3. Set the following: 

    - **Name**: `Report Access`.
    - **Permissions**: `report-surveys-read`

:::note
- Optionally, you can add something to the **description** of the access role.
:::

</div>
<br></br>

<div className="alert alert--secondary">

4. Press <span className="badge badge--primary">Save</span>.

</div>
<br></br>

<br/>

#### II. Assign the access role to each boss and CEO: {#ii-assign-the-access-role-to-each-boss-and-ceo}

<div className="alert alert--secondary">

5. Access the <span className="badge badge--primary">Administrator</span> and open <span className="badge badge--primary">Users</span>.

</div>
<br></br>

<div className="alert alert--secondary">

6. Search for the boss of cybersecurity, *Mario Casas*. Click on the *user* to edit their properties.

  _Your **Users** panel should look something like this:_

<img className="img_sizing item shadow--tl" alt="" src={useBaseUrl('img/tutorial_access_03.png')} />
<br/>

_Once you click on the **user** you want to edit, the **Edit user** settings panel will open up, as shown in the next step._

</div>
<br></br>

<div className="alert alert--secondary">

7. In the **Edit users** settings panel, under the <span className="badge badge--primary">Access</span> tab, set the following:

    - **Access Roles**: `Report Access`.

<img className="img_sizing item shadow--tl" alt="" src={useBaseUrl('img/tutorial_access_04.png')} />
<br/>
<br/>

:::note 
- _As you type in the access role, you may select the option from the dialog box._
- _Access roles are case sensitive._
:::

</div>
<br></br>

<div className="alert alert--secondary">

8. Press <span className="badge badge--primary">Save</span>.

</div>
<br></br>

<div className="alert alert--secondary">

9. Repeat the last three steps with each boss and the CEO.

</div>
<br></br>


## Result {#result}
After creating the _access role_, you should be able to see it in the **Access Role** panel, as shown below:

<img className="img_sizing item shadow--tl" alt="access role result" src={useBaseUrl('img/tutorial_access_result_01.png')} />
<br/>

After designating a _user_ with the newly created _access role_, the user's settings panel should look something like this:

<img className="img_sizing item shadow--tl" alt="user result" src={useBaseUrl('img/tutorial_access_result_02.png')} />