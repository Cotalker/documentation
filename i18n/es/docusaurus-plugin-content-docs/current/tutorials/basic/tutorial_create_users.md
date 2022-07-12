---
id: create_user
title: Create User
---

:::caution Advertencia
Esta página aún no se encuentra traducida al español.
:::
import useBaseUrl from '@docusaurus/useBaseUrl'; 

<span className="hero__subtitle">

Tutorial on how to create and configure _user_ accounts.

</span>

Time: 10 minutes

:::tip Vocabulary Note
In Cotalker, a _user_ is a [data model](/docs/documentation/models/users/model_users) that represents either a real person or a bot. A _user_, whether human or not, can access and interact with the Cotalker platform. The _user_ contains profile data, such as name, email, phone number, password, and other additional information. _Users_ can also be configured to have different level access roles.
:::

## Company Requirements {#company-requirements}
Our mock company, Ruanda, wants to add all their employees (about 40 people) to the Cotalker platform. The company has sent all the employee details in [this spreadsheet](https://docs.google.com/spreadsheets/d/1Vt5QKS8ggV9Rw45Rjz7sCZ-bdjGzUVy0xyaqWB3yoe4/edit?usp=sharing). 

For the tutorial, we will be creating the _user_ accounts for at least two employees. One of them is Jennifer Fritz, a developer in the cybersecurity division. Her email is `jennifer@ruanda.cl` and her phone number is `202-555-0477`. The second one is her boss, Mario Casas, and his email is `mario.casas@ruanda.cl`.

## Tutorial Objectives {#tutorial-objectives}
- [A. Create a user account for a lower level employee.](#create-low-level-user)
- [B. Create a user account for a high level employee.](#create-high-level-user)

:::tip Advanced tip
_Users_ can also be created through an API request. For example, you could use [Postman](https://www.postman.com/) to automatically create users with spreadsheet data and the [Create New User API request](/docs/documentation/api/users/#post-user).
:::

## Pre-Requisites {#pre-requisites}
#### Access Role {#access-role}
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

### A. Create a user account for a lower level employee. {#create-low-level-user}

<div className="alert alert--secondary">

**I. Go to the Users section.**

<img alt="users section" className="img_sizing item shadow--tl" src={useBaseUrl('img/tutorials/tutorial_basic_users_00.png')} />
<br/>

1. From the **Main Menu Bar**, press the <span className="badge badge--primary">Administrator</span> button to open the **Administrative Panel**.
2. In the **Administrative Panel**, select <span className="badge badge--primary">Users</span>.
3. The **Users** section opens.

</div>
<br/>

<div className="alert alert--secondary">

**II. Open a _Create user_ settings panel.**

<img alt="create user" className="img_sizing item shadow--tl" src={useBaseUrl('img/tutorials/tutorial_basic_users_01.png')} />
<br/>

Press the <span className="badge badge--primary">+</span> icon in the upper right-hand corner to open the **Create user** settings panel.

</div>
<br/>

<div className="alert alert--secondary">

** III. Set up general user information.**

<img alt="users section" className="img_sizing item shadow--tl" src={useBaseUrl('img/tutorials/tutorial_basic_users_02.png')} />
<br/>

From the **Create user** settings panel, in the **General information** tab, set up the first employee with the following information:

1. **Names**: _Jennifer_
2. **Surname**: _Fritz_
3. **Email**: _jennifer@ruanda\.cl_
4. **Phone**: _2025550477_
5. **Job title**: _Developer_
6. Add a profile picture if you like.


:::note 
- The _email_ serves as the user's identification code. Hence, once it is saved it cannot be chagned or edited.
:::

:::tip
- _Email addresses_ must be unique, even across companies.
- Try using a different made-up email address for this tutorial to avoid using an email already registered in the Cotalker environment.
:::

</div>
<br></br>

<div className="alert alert--secondary">

**IV. Set up access information.**

<img alt="access roles" className="img_sizing item shadow--tl" src={useBaseUrl('img/tutorials/tutorial_basic_users_03.png')} />
<br/>

From the **Create user** settings panel, in the **Access** tab, add the following user information:

1. **Access roles**: _default_
2. **Password**: Create a password for the user.
3. **Repeat password**: Retype the password for confirmation.

</div>
<br></br>

<div className="alert alert--secondary">

**V. Save settings.**

<img alt="users section" className="img_sizing item shadow--tl" src={useBaseUrl('img/tutorials/tutorial_basic_users_03a.png')} />
<br/>

Press <span className="badge badge--primary">Save</span> button in the upper right-hand corner to create the new user.

</div>
<br></br>

### B. Create a user account for a high level employee. {#create-high-level-user}

<div className="alert alert--secondary">

**I. Open a _Create user_ settings panel.**

<img alt="create user" className="img_sizing item shadow--tl" src={useBaseUrl('img/tutorials/tutorial_basic_users_01.png')} />
<br/>

Once again, press the <span className="badge badge--primary">+</span> icon in the upper right-hand corner to open the **Create user** settings panel.

</div>
<br/>

<div className="alert alert--secondary">

** II. Set up general user information.**

<img alt="users section" className="img_sizing item shadow--tl" src={useBaseUrl('img/tutorials/tutorial_basic_users_02.png')} />
<br/>

From the **Create user** settings panel, in the **General information** tab, set up the second employee with the following information:

1. **Names**: _Mario_
2. **Surname**: _Casas_
3. **Email**: _mario.casas@ruanda\.cl_
4. **Phone**: left blank
5. **Job title**: _Chief of Cybersecurity_
6. Add a profile picture if you like.

:::tip Remember
- _Email addresses_ must be unique, even across companies.
- Try using a different made-up email address for this tutorial to avoid using an email already registered in the Cotalker environment.
:::

</div>
<br></br>

<div className="alert alert--secondary">

**III. Set up access information.**

<img alt="access roles" className="img_sizing item shadow--tl" src={useBaseUrl('img/tutorials/tutorial_basic_users_03.png')} />
<br/>

From the **Create user** settings panel, in the **Access** tab, add the following user information:

1. **Access roles**: _default_, _Report Access_
2. **Password**: Create a password for the user.
3. **Repeat password**: Retype the password for confirmation.

</div>
<br></br>

<div className="alert alert--secondary">

***IV. Associate subordinate users.**

<img alt="Related users" className="img_sizing item shadow--tl" src={useBaseUrl('img/tutorials/tutorial_basic_users_04.png')} />
<br/>

Under the **Related users** tab, fill in the field:
1. **Subordinates**: _Jennifer Fritz_

</div>
<br></br>

<div className="alert alert--secondary">

**V. Save settings.**

<img alt="users section" className="img_sizing item shadow--tl" src={useBaseUrl('img/tutorials/tutorial_basic_users_03a.png')} />
<br/>

Press <span className="badge badge--primary">Save</span> button in the upper right-hand corner to create the new user.

</div>
<br></br>



## Expected Results {#result}
You should now be able to see all the _users_ you created listed in the _Users_ section, somewhat like in the following image:

<img alt="user list" className="img_sizing item shadow--tl" src={useBaseUrl('img/tutorials/tutorial_basic_users_07.png')} />
<br/>

_The first created user's settings should look like this:_

<img alt="first user" className="img_sizing item shadow--tl" src={useBaseUrl('img/tutorials/tutorial_basic_users_05.png')} />
<br/>

_The higer level user's settings should look like this:_

<img alt="user list" className="img_sizing item shadow--tl" src={useBaseUrl('img/tutorials/tutorial_basic_users_06.png')} />
<br/>

<div className="align-center">

<iframe src="https://giphy.com/embed/l0Iyl55kTeh71nTXy" width="90%" height="90%" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/quizizz-l0Iyl55kTeh71nTXy">via GIPHY</a></p>

</div>
<br/>

----

## Related Topics {#related-topics}
- [Users section](/docs/documentation/admin/users): Administrive Panel documentation
- [COTUser](/docs/documentation/models/users/model_users): User Data model
- [User API Requests](/docs/documentation/api/users/): API documentation
