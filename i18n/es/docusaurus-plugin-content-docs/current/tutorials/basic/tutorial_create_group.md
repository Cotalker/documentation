---
id: create_group
title: Create Group
---
import useBaseUrl from '@docusaurus/useBaseUrl'; 

<span className="hero__subtitle">

Tutorial on how to create _groups_ for communicating and sharing information.

</span>

Time: 15 minutes

:::tip Vocabulary Note:
- [_Groups_](/docs/documentation/client/groups) are different ways to organize, access, and communicate data among _users_. There are three kinds of groups: workflow (task), link, and regular. _Users_ can access _groups_ through the [_Main Menu Bar_](/docs/documentation/client/main_menu#main-menu-bar-layout) or the [_group panel_](/docs/documentation/client/groups#group-panel).
- [_Channels_](/docs/documentation/client/channels) existe within _regular_ and _workflow groups_. From the _channel workspace_, _users_ can message each other, send images, share files, react with emoticons, answer _surveys_. Furthermore, on channels belonging to workflow groups, you can view and edit task status and other task details.
:::

## Company Requirements {#company-requirements}
The company wants its employees (_users_) to be able to communicate and share information. They want to create a _group_ for each area or department. For now, each _group_ will have two types of _channels_: one, where all company employees can communicate with the department, and another, for the department's internal conversations.

The company also needs to add a direct link to each department's file on Google Drive for one-click access.

- Below are the company areas and their respective links:
  - cybersecurity: https://www\.ruanda.cl/cybersecurity  
  - board of directors: https://www\.ruanda.cl/board_of_directors
  - financial control: https://www\.ruanda.cl/finance
  - commercial: https://www\.ruanda.cl/commercial
  - treasury: https://www\.ruanda.cl/treasury
  - risk management:https://www\.ruanda.cl/risk_management
  - marketing: https://www\.ruanda.cl/marketing
  - human resources: https://www\.ruanda.cl/human_resources
  - IT: https://www\.ruanda.cl/it


  _**Note**: These are mock URLs for tutorial purposes only._

## Tutorial Objectives {#tutorial-objectives}
- [A. Create a Standard Group](#create-group)
- [B. Create Channels](#create-channels)
- [C. Create Link Group](#create-link-group)

## Pre-Requisites {#pre-requisites}
#### Access Role {#access-role}
Your _user_ profile's _access role_ **must** have at least the following [permissions](/docs/documentation/admin/admin_accessrole#default-permissions): 
- `admin-access` (permission to access the Administrative Panel)
- `admin-group-write` (permission to create and edit _regular and link groups_)
- `admin-channel-write`(permission to create and edit _channels_ in a standard group)

## Steps {#steps}
### A. Create a Standard Group {#create-group}

<div className="alert alert--secondary">

**I. Go to the Groups sections.**

<img alt="groups section" className="img_sizing item shadow--tl" src={useBaseUrl('img/tutorials/tutorial_basic_group_standard_00.png')} />
<br/>


1. From the **Main Menu Bar**, press the <span className="badge badge--primary">Administrator</span> button.
2. In the **Administrative Panel**, select <span className="badge badge--primary">Groups</span>.
3. The **Groups** section opens up.

</div>
<br/>

<div className="alert alert--secondary">

**II. Open the Create Group settings panel.**

<img alt="create group" className="img_sizing item shadow--tl" src={useBaseUrl('img/tutorials/tutorial_basic_group_standard_01.png')} />
<br/>

- Press the <span className="badge badge--primary">+</span> icon to open the _Create group_ settings panel.

</div>
<br/>

<div className="alert alert--secondary">

**III. Set up the Group.**

<img alt="group setup" className="img_sizing item shadow--tl" src={useBaseUrl('img/tutorials/tutorial_basic_group_standard_02.png')} />
<br/>

_Set up the group according to the following:_
1. **Name**: _Cybersecurity_
2. **Code**: _cybersecurity_group_
3. **Select icon**: _robot_
4. **Color**: _green_
5. **Allow channel creation**: Turn setting on.
6. Press the <span className="badge badge--primary">Save</span>. You will be sent back to the **Groups** section.

</div>
<br/>

<div className="alert alert--secondary">

**IV. Confirm successful group creation.**

_Your screen should look something like this after saving:_
<img alt="groups section afterwards" className="img_sizing item shadow--tl" src={useBaseUrl('img/tutorials/tutorial_basic_group_standard_03.png')} />
<br/>

</div>
<br/>

### B. Create Channels {#create-channels}

<div className="alert alert--secondary">

**I. Go to the Channels section.**

<img alt="group section" className="img_sizing item shadow--tl" src={useBaseUrl('img/tutorials/tutorial_basic_group_channel_00.png')} />
<br/>

- From within the <span className="badge badge--primary">Groups</span> section, click on _list_ icon corresponding to the **Cybersecurity** group. The **Cybersecurity Channels list** opens up.

</div>
<br/>

<div className="alert alert--secondary">

**II. Open the Create Channel settings panel.**

<img alt="group section" className="img_sizing item shadow--tl" src={useBaseUrl('img/tutorials/tutorial_basic_group_channel_01.png')} />
<br/>

- From the _Cybersecurity channels list_, press the <span className="badge badge--primary">+</span> icon to open the **Create channel** settings panel.

</div>
<br></br>

<div className="alert alert--secondary">

**III. Set up the channel.**

<img alt="group section" className="img_sizing item shadow--tl" src={useBaseUrl('img/tutorials/tutorial_basic_group_channel_02.png')} />
<br/>

_Set up the channel with the following:_
1. **Name**: _Cybersecurity General Channel_
2. **Code**: _cybersecurity\_gnrlch_
3. **Group**: Select the `Cybersecurity`group from the list.
4. **Users**: Type the names of the _users_ to be added to the channel.
5. **Permissions for sending messages**: Set to `All`.
6. Press the <span className="badge badge--primary">Save</span> button. You will be taken back to the Group's _channel list_.

</div>
<br/>

<div className="alert alert--secondary">

**IV. Confirm successful channel creation.**

_Your screen should look something like this after saving:_

<img alt="channel saved" className="img_sizing item shadow--tl" src={useBaseUrl('img/tutorials/tutorial_basic_group_channel_03.png')} />
<br/>

</div>
<br></br>

<div className="alert alert--secondary">

**V. Create another Channel.**

_Remember that the objective of the tutorial is to create a general and private channel for each company area._

Repeat the steps to create a new channel within the same group.

_After saving, your new private channel should appear on the channels list as shown in the example below:_

<img alt="new channel" className="img_sizing item shadow--tl" src={useBaseUrl('img/tutorials/tutorial_basic_group_channel_04.png')} />
<br/>

:::tip Tutorial advice
If you wish, create more standard groups and channels following the list given in the [company requirements](#company-requirements). But these are enough for the time being.
:::

</div>
<br/>

### C. Create Link Group {#create-link-group}

<div className="alert alert--secondary">

**I. Go to the Link Groups section.**

<img alt="link group section" className="img_sizing item shadow--tl" src={useBaseUrl('img/tutorials/tutorial_basic_group_link_00.png')} />
<br/>

1. From the **Main Menu Bar**, press the <span className="badge badge--primary">Administrator</span> button.
2. In the **Administrative Panel**, select <span className="badge badge--primary">Link groups</span>.
3. The **Links groups** panel will open up.

</div>
<br/>


<div className="alert alert--secondary">

**II. Open the Create Group settings panel.**

<img alt="link group section" className="img_sizing item shadow--tl" src={useBaseUrl('img/tutorials/tutorial_basic_group_link_01.png')} />
<br/>

- Press the <span className="badge badge--primary">+</span> icon to open the **Create group** settings panel.

</div>
<br/>

<div className="alert alert--secondary">

**III. Set up the Link Group.**

<img alt="link group section" className="img_sizing item shadow--tl" src={useBaseUrl('img/tutorials/tutorial_basic_group_link_02.png')} />
<br/>

1. **Name**: _Cybersecurity Documentation_
2. **Code**: cybersec_docs
3. **Parent Group**: _Cybersecurity_
4. **Open link in a new tab**: Turn toggle bar on.
5. **URL**: _https://www.ruanda\.cl/cybersecurity_
6. **Select icon**: _Book_
7. **Color**: _Radium_
8. Press <span className="badge badge--primary">Save</span>.

:::note
- The **Parent Group** hosts the group you are creating in the menu structure. For example, _Cybersecurity Documentation_ is accessed through the _Cybersecurity_ group's _group panel_.
- The link in the **URL** field is one of the mock links given in the [Company Requirements](#company-requirements).
:::

</div>
<br/>

<div className="alert alert--secondary">

**IV. Confirm the link group was successfully created.**

_After saving, the **Links group** section should look something like this:_

<img alt="link group section" className="img_sizing item shadow--tl" src={useBaseUrl('img/tutorials/tutorial_basic_group_link_03.png')} />
<br/>

</div>
<br/>

<div className="alert alert--secondary">

**V. Create link groups for the remaining groups. (OPCIONAL)**

Repeat the previos steps. 

:::tip Tutorial advice
Create as many _link groups_ as you would like, but one more is enough, just to get a hang of things.
:::

</div>
<br/>

## Result {#result}
The 'Cybersecurity' _group_ with its _channels_ and _group link_ should look something like this:

<img alt="link group section" className="img_sizing item shadow--tl" src={useBaseUrl('img/tutorials/tutorial_basic_group_link_04.png')} />
<br/>

:::note
- If you don't see the new _group_ icons in the **Main Menu Bar**, try refreshing the page.
- Notice that since the _group link_ is set as a subgroup within the _group panel_, its icon is set by default to a _folder icon_ and not the icon we chose in its settings.
:::

<div className="align-center">

<iframe src="https://giphy.com/embed/XreQmk7ETCak0" width="90%" height="90%" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>

<p><a href="https://giphy.com/gifs/retro-thumbs-up-XreQmk7ETCak0">via GIPHY</a></p>

</div>
<br/>

---

## Related Topics {#related-topics}
- [Link Groups Section](/docs/documentation/admin/admin_links): Administrative Panel Documentation
- [COTGroup](/docs/documentation/models/communication/model_groups): Group data model
- [Group API Requests](/docs/documentation/api/communication/groups): REST API Documentation