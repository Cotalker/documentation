---
id: create_group
title: Create Groups & Channels
---
import useBaseUrl from '@docusaurus/useBaseUrl'; 

Tutorial on how to create _groups_ and _channels_.

Time: 15 minutes

:::tip Vocabulary Note:
- _Groups_ are different ways to organize, access, and communicate data among _users_. There are three kinds of groups: workflows, links, and regular.
- _Channels_ are like chats for _groups_. Inside a _channel_, _users_ can message each other, send images, files, emoticons, and answer _surveys_.
:::

## Company Requirements {#company-requirements}
#### Tutorial Objectives {#tutorial-objectives}
For this tutorial, the company wants to help its employees (_users_) to communicate and share information. They want to create a _group_ for each area or department. For now, each _group_ will have two types of _channels_: one, where all employees can communicate with the department, and another, for the department's private conversations.

The company also needs to add a direct link to each department's file on Google Drive for one-click access.

The company's departments or areas and their respective links are as follow:
- board of directors <br/>
 https://www.cotalker.com/board_of_directors
- financial control<br/>
 https://www.cotalker.com/financial_control
- commercial<br/> 
 https://www.cotalker.com/commercial
- treasury<br/> 
 https://www.cotalker.com/treasury
- risk management<br/>
 https://www.cotalker.com/risk_management
- marketing<br/> 
 https://www.cotalker.com/marketing
- human resources<br/> 
 https://www.cotalker.com/human_resource
- IT<br/> 
 https://www.cotalker.com/it
- cybersecurity<br/> 
 https://www.cotalker.com/cybersecurity

## Pre-Requisites {#pre-requisites}
#### Access Role {#access-role}
* _User_ with the `admin-group-write` permission to create and modify _groups_. 
* Or`admin-*-write` permission which allows all of the above. 
* _User_ with the `web-admin-write` and `web-admin-read` permissions to set up the _Admin_.
* User with the `read admin` access role.
* A _user_ for each employee of the company.

## Steps {#steps}
### I. Create New Regular Group {#i-create-new-regular-group}

<div className="alert alert--secondary">

1. From the **Main Menu Bar**, access the <span className="badge badge--primary">Administrator</span> and open <span className="badge badge--primary">Groups</span>.

<img alt="groups" className="img_sizing item shadow--tl" src={useBaseUrl('img/tutorial_group_00a.png')} />
<br/>

</div>
<br/>

<div className="alert alert--secondary">

2. Press the <span className="badge badge--primary">+</span> icon to create a new _Group_.

<img alt="groups" className="img_sizing item shadow--tl" src={useBaseUrl('img/tutorial_group_00.png')} />
<br/>
<br/>

  _The following settings panel will open up:_

<img alt="groups" className="img_sizing item shadow--tl" src={useBaseUrl('img/tutorial_group_01.png')} />
<br/>

</div>
<br/>

<div className="alert alert--secondary">

3. Under the <span className="badge badge--primary">General information</span>, set the following:

    - **Name**: `Cybersecurity`
    - **Code**: `cybersecuritygroup_1`

</div>
<br/>

<div className="alert alert--secondary">

4. Under the <span className="badge badge--primary">Icon</span> tab, set the following:

    - **Select Icon**: `Robot`
    - **Color**: `Green`

</div>
<br/>

<div className="alert alert--secondary">

5. Under the <span className="badge badge--primary">Channel creation</span> tab, set the following:

    - Activate the **Allow channel creation** option.

</div>
<br/>

<div className="alert alert--secondary">

6. Press <span className="badge badge--primary">Save</span>.

  _Your screen should look something like this before saving:_

<img alt="" className="img_sizing item shadow--tl" src={useBaseUrl('img/tutorial_group_02.png')} />
<br/>

</div>
<br/>

### II. Channel Set Up {#ii-channel-set-up}

<div className="alert alert--secondary">

7. From within the <span className="badge badge--primary">Groups</span> section, click on the **Cybersecurity** group.

<img alt="" className="img_sizing item shadow--tl" src={useBaseUrl('img/tutorial_group_03.png')} />

<br/>
<br/>

  _The following settings panel will open up:_
<img alt="" className="img_sizing item shadow--tl" src={useBaseUrl('img/tutorial_group_04.png')} />
<br/>

</div>
<br/>

<div className="alert alert--secondary">

8. From the **Cybersecurity** group's settings panel, press the <span className="badge badge--primary">+</span> icon to create a new _Channel_, as shown below:

<img alt="create icon" className="img_sizing item shadow--tl" src={useBaseUrl('img/tutorial_group_04a.png')} />
<br/>

  _The following settings panel will open up:_

<img alt="" className="img_sizing item shadow--tl" src={useBaseUrl('img/tutorial_group_05.png')} />
<br/>

</div>
<br></br>

<div className="alert alert--secondary">

9. Under the <span className="badge badge--primary">General information</span> tab, set the following:

    - **Name**: `Cybersecurity Inquiries`
    - **Code**: `cybersecurityinquiries_1`

</div>
<br/>

<div className="alert alert--secondary">

10. Under the <span className="badge badge--primary">Participants</span> tab, set the following: 

    - **Users**: _Search for and add each employee of the company._

</div>
<br/>

<div className="alert alert--secondary">

11. Under the <span className="badge badge--primary">Options</span> tab, make sure all options are turned on.

</div>
<br/>

<div className="alert alert--secondary">

12. Press <span className="badge badge--primary">Save</span>.

</div>
<br></br>

<div className="alert alert--secondary">

13. Repeat the last five steps to create a private **Cybersecurity** channel only with department personnel.

  _Upon completion, your **Cybersecurity** group's settings panel should look something like this:_

<img alt="" className="img_sizing" src={useBaseUrl('img/tutorial_group_06.png')} />

</div>
<br/>

### III. Link Group Set Up {#iii-link-group-set-up}

<div className="alert alert--secondary">

14. From the **Main Menu Bar**, access the <span className="badge badge--primary">Administrator</span> and open <span className="badge badge--primary">Link groups</span>.

    _The **Links groups** panel will open up and your screen should look something like this:_

<img alt="link groups" className="img_sizing item shadow--tl" src={useBaseUrl('img/tutorial_group_07.png')} />
<br/>

</div>
<br/>

<div className="alert alert--secondary">

15. Press the <span className="badge badge--primary">+</span> icon to create a new _Group_.

  _The following settings panel will open up:_

<img alt="new group" className="img_sizing item shadow--tl" src={useBaseUrl('img/tutorial_group_08.png')} />

</div>
<br/>

<div className="alert alert--secondary">

18. Under the <span className="badge badge--primary">General information</span> tab, set the following:

    - **Name**: `Cybersecurity Folder`
    - **Code**: `cybersecurityfolder_1`
    - **Parent Group**: `Cybersecurity`
    - **URL**: `https://www.cotalker.com/cybersecurity`
    - **Open link in a new tab**: _activate_

:::note
- The **Parent Group** hosts the group you are creating in the menu structure. For example, *Cybersecurity Folder*, is accessed through the *Cybersecurity* group found in the **Main Menu Bar**.
- The link in the **URL** field is the *cybersecurity link* given in the [Company Requirements](#company-requirements).
:::

</div>
<br/>

<div className="alert alert--secondary">

19. Under the <span className="badge badge--primary">Icon</span> tab, set the following:

    - **Select Icon**: `Folder`
    - **Color**: `Cyan`

</div>
<br/>

<div className="alert alert--secondary">

20. Press <span className="badge badge--primary">Save</span>.

</div>
<br/>

<div className="alert alert--secondary">

26. Repeat the steps above for the rest of the departments. 

:::note
For this tutorial, it's enough to create just one more _group link_.
:::

</div>
<br/>

## Result {#result}
The *Cybersecurity* group will look something like this:
<img alt="group channel" className="img_sizing item shadow--tl" src={useBaseUrl('img/tutorial_group_final.png')} />
<br/>
<br/>

:::tip
Try refreshing the screen if you don't see the new _group_ icons in the **Main Menu Bar**.
:::
