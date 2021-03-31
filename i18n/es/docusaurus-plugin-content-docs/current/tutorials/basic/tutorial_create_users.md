---
id: create_user
title: Create User
---
import useBaseUrl from '@docusaurus/useBaseUrl'; 

Tutorial on how to create a _user_.

Time: 10 minutes

:::tip Vocabulary Note
A _user_, as in most applications, permits a person to access and interact with the software. The _user_ contains the person's profile data, such as name, email, password, etc. Different level access permissions are also configured through the _user_.
:::

## Company Requirements {#company-requirements}
#### _Tutorial Objectives_ {#_tutorial-objectives_}

Our mock company, Ruanda, wants to add all their employees (about 40 people) to the app. 

+ The company has sent all the employee details in [this document](https://docs.google.com/spreadsheets/d/1UC_W706m5_8TYogK29y8HU7_HqA_Jx2slZQJC5bBWS4/edit?usp=sharing). 
 

+ One of the employees is Valentina Martínez, a developer in the cybersecurity division. Her email is `vm@ruanda.cl` and her phone is +56 9 5555 8888.
+ Her boss is Mario Casas and his email is `mario@ruanda.cl`.

## Pre-Requisites {#pre-requisites}
**Access Role**
* User with the `admin-user-write` permission to edit/create users.
* User with the `admin-accesscontrol-write` permission to set access roles.
* Or`admin-*-write` permission which allows all of the above.
* User with the `web-admin-write` and `web-admin-read` permissions to set up the _admin_.
* User with the access role `read admin`.

**Company**
* Having completed the [Configure Company Tutorial](/docs/tutorials/basic/configure_company).

***Optional***
* Access Role created in the [Access Role section](/docs/documentation/admin/admin_accessrole)
* Having completed the [Database Tutorial](/docs/tutorials/basic/create_database).

## Steps {#steps}

<div class="alert alert--secondary">

1. From the **Main Menu Bar**, access the <span class="badge badge--primary">Administrator</span> and open <span class="badge badge--primary">Users</span>.

  _The following settings panel will open up:_

<img alt="user settings panel" class="img_sizing item shadow--tl" src={useBaseUrl('img/tutorial_user_00.png')} />
<br/>

</div>
<br/>

<div class="alert alert--secondary">

2. In the settings panel, press the <span class="badge badge--primary">+</span> button to create a new user.

<img class="img_sizing item shadow--tl" alt="create user" src={useBaseUrl('img/tutorial_user_01.png')} /> 
<br/>

_The following panel will then open up:_

 <img class="img_sizing item shadow--tl" alt="" src={useBaseUrl('img/blog_simple_task_user.png')} />
<br/>

</div>
<br/>

<div class="alert alert--secondary">

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

<div class="alert alert--secondary">

4. Press <span class="badge badge--primary">Save</span>.

</div>
<br></br>

<div class="alert alert--secondary">

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

<div class="alert alert--secondary">

6. Press <span class="badge badge--primary">Save</span>.

</div>
<br></br>

<div class="alert alert--secondary">

7. Repeat the same steps for the rest of the employees. 

:::note
- Four more users will be enough for the tutorial.
:::

</div>



## Result {#result}
You should now be able to see all the _users_ you created listed in the _Users_ settings panel, somewhat like in the following image:

<img alt="user list" class="img_sizing item shadow--tl" src={useBaseUrl('img/tutorial_user_result.png')} />