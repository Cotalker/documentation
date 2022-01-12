---
id: create_user
title: Create User
---
import useBaseUrl from '@docusaurus/useBaseUrl'; 

Tutorial on how to create a _user_.

Time: 10 minutes

:::tip Vocabulary Note
In Cotalker, a _user_ is a [data model](/docs/documentation/models/users/model_users) that represents either a real person or a bot. A _user_, whether human or not, can access and interact with the Cotalker platform. The _user_ contains profile data, such as name, email, phone number, password, and other con. _Users_ can also be configured to have different level access roles.
:::

## Company Requirements {#company-requirements}
Our mock company, Ruanda, wants to add all their employees (about 40 people) to the Cotalker platform. The company has sent all the employee details in [this spreadsheet](https://docs.google.com/spreadsheets/d/1Vt5QKS8ggV9Rw45Rjz7sCZ-bdjGzUVy0xyaqWB3yoe4/edit?usp=sharing). 

For the tutorial, we will be creating the _user_ accounts for at least two employees. One of them is Jennifer Fritz, a developer in the cybersecurity division. Her email is `jennifer@ruanda.cl` and her phone number is `202-555-0477`. The second one is her boss, Mario Casas, and his email is `mario.casas@ruanda.cl`.

## Tutorial Objectives {#tutorial-objectives}
1. Create a user account for a high level employee.
2. Create a user account for a lower level employee.

:::tip
_Users_ can also be created through an API request. For example, you could use [Postman](https://www.postman.com/) to automatically create users with spreadsheet data and the [Create New User API request](/docs/documentation/api/users/#post-user).
:::

## Pre-Requisites {#pre-requisites}
**Access Role**
Your _user_ profile's _access role_ **must** have at least the following [permissions](/docs/documentation/admin/admin_accessrole#default-permissions): 
- `admin-access` (permission to access the Administrative Panel)
- `admin-user-write` (permission to create and edit users)
- `admin-accesscontrol-write` (permission to grant the user _access roles_)
- `admin-jobtitles-write` or `admin-company-write` (permission to give the user a _job title_)

**Completed Tutorials**
You should have completed the following tutorials:
1. [Configure Company Basics Tutorial](/docs/tutorials/basic/configure_company).
2. [Create Access Roles Tutorial](/docs/tutorials/basic/create_accessroles)

## Steps {#steps}

### I. Create a user account for a high level employee. {#high-level-user}

<div className="alert alert--secondary">

1. From the **Main Menu Bar**, access the <span className="badge badge--primary">Administrator</span> and open <span className="badge badge--primary">Users</span>.

  _The following settings panel will open up:_

<img alt="user settings panel" className="img_sizing item shadow--tl" src={useBaseUrl('img/tutorial_user_00.png')} />
<br/>

</div>
<br/>

<div className="alert alert--secondary">

2. In the settings panel, press the <span className="badge badge--primary">+</span> button to create a new user.

<img className="img_sizing item shadow--tl" alt="create user" src={useBaseUrl('img/tutorial_user_01.png')} /> 
<br/>

_The following panel will then open up:_

 <img className="img_sizing item shadow--tl" alt="" src={useBaseUrl('img/blog_simple_task_user.png')} />
<br/>

</div>
<br/>

<div className="alert alert--secondary">

3. Create the boss, by setting the following fields:
    * **Name**: *Mario*
    * **Surname**: *Casas*
    * **Email**:  `mario@ruanda.cl`
    * **Job Title**: *chief of cyber security*
    * **Access Role**: *default*
    * Set a **Password**
    * Optionally set **extras**.
    
    :::note 
    _Email addresses must be unique, even across companies._
    :::

</div>
<br></br>

<div className="alert alert--secondary">

4. Press <span className="badge badge--primary">Save</span>.

</div>
<br></br>

<div className="alert alert--secondary">

5. Create the developer by setting the following fields:
    * **Names**: *Valentina*
    * **Surname**: *Martínez*
    * **Email**:  `vm@ruanda.cl`
    * **Phone**: +56 9 5555 8888
    * **Job Title**: *developer*
    * **Access Role**: *default*
    * Set a **Password**
    * **Bosses**: *Mario Casas*
    * Optionally set **extras**.

</div>
<br></br>

<div className="alert alert--secondary">

6. Press <span className="badge badge--primary">Save</span>.

</div>
<br></br>

<div className="alert alert--secondary">

7. Repeat the same steps for the rest of the employees. 

:::note
- Four more users will be enough for the tutorial.
:::

</div>



## Result {#result}
You should now be able to see all the _users_ you created listed in the _Users_ settings panel, somewhat like in the following image:

<img alt="user list" className="img_sizing item shadow--tl" src={useBaseUrl('img/tutorial_user_result.png')} />