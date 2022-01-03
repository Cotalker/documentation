---
title: Link Groups Section
sidebar_label: Link Groups
---
import useBaseUrl from '@docusaurus/useBaseUrl'; 
import Highlight from '@theme/Highlight';

<img alt="design" class="img_title" src={useBaseUrl('img/design/Groups_and_Channels.svg')} />


# Overview {#group-overview}

_Link groups_ are hyperlink icons that are displayed like _groups_, making them available in the **Main Menu Bar** or **Group Panel** for easy access. Link groups can be configured to redirect users to external sites or specific components in the Cotalker environment, such as channels or tasks.

_Below is an example of Link Groups found in a group panel:_
<img alt="link group in group panel" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_links_01.png')} />
<br/>

URL destinations can be embedded within the Cotalker platform, shown in a pop-up window, or opened up on a new tab in your internet browser.

_The following image shows an example of an external URL being displayed in a pop-up window:_
<img alt="link group pop-up window" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_links_02.png')} />
<br/>

---

## Accessing the Link Groups Section {#access-link-section}
To access the the Link Groups Section:

<img alt="link group" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_links_00.png')} />
<br/>

1. Press <span className="badge badge--primary">Administrator</span> in the **Main Menu Bar**.
2. Select <span className="badge badge--primary">Link groups</span> from the **Administrative Panel**.
3. The [**Link Groups Panel**](#link-groups-panel) will open up.

<div className="alert alert--secondary">

## Link Groups Panel Layout {#link-groups-panel}
From the _Link Groups Panel_, a list of all the _link groups_ within the _company_ is displayed. This panel also permits you to create and edit _link groups_.

<img alt="link group panel layout" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_links_03.png')} />
<br/>

_Actions:_
- **1. Create New Link Group**: Opens a [settings panel to create a new link group](#create-link).

_Table and Options:_
- **A. Icon**: The icon that represents the link.
- **B. Name**: The link group's display name.
- **C. Last modified**: Indicates the last time the link group was modified.
- **D. Edit**: The _pen_ icon opens a [settings panel for editting the corresponding link group](#edit-link).

</div>

## Create a New Link Group {#create-link}
Press the <span className="badge badge--secondary">+</span> icon in the **link groups panel** to create a new link group. The [link group settings panel](##edit--create-single-group) will open up.

<img alt="link group" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_links_03a.png')} />
<br/>


## Edit a Link Group {#edit-link}
To edit an existing link group, press the corresponding _pen_ icon in the table of the **link groups panel**. The [link group settings panel](##edit--create-single-group) will open up.


<img alt="link group" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_links_03b.png')} />
<br/>

<div className="alert alert--secondary">

## Link Group Settings Panel Layout {#edit--create-single-group}

<img alt="link group" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_links_04.png')} />
<br/>

_Actions:_
- 1.
- 2.

_Options:_
- A.
- B.

</div>
<br/>

<div className="alert alert--secondary">

### A. General information {#general-information}

<img alt="link group" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_links_05.png')} />
<br/>

</div>
<br/>

<div className="alert alert--secondary">

### B. Icon {#icon}

<img alt="link group" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_links_06.png')} />
<br/>

</div>
<br/>

| Field | Description | Notes | 
| ---- | ----------- | ----- | 
| Name | The visual name of the group | It doesn't have to be unique. |
| Code | The identifier of the group | It only accepts lowercase, number and underscore and start with the letters. Once you create and save the code, you cannot change it.|
| Weight | A relative number that positions the group on the main bar. A small number accommodates the group at the beginning, therefore a large one at the end. | If you don't type a number, the system will assign one. |
| Parent Group | You can choose a group to position itself within it. | The group you choose must already be created |
| URL | The url as a hyperlink |  |
| Open Link in a new tab | If it is active, it will open the URL in a new browser tab; otherwise, it will open in the app. |  |

<br/>
To illustrate the parent group, the following image is shown:
<img alt="" src={useBaseUrl('img/admin_group_parent.png')} />
As you can see I+D is the parent group shown in the main bar. Once you are there, you can see the subgroups. 

<br/><br/>
The icon section configures the group symbol shown on the main bar. The description of the icon fields is as follows:
<br/><br/>

| Field | Description | Notes | 
| ---- | ----------- | ----- | 
| Select icon | You can choose between personalized or once of the premade |  |
| Color | You can choose from the list of colors that is shown |  |
| Path | It's populated with Scalable Vector Graphics. If the icon is personalized, it must be completed manually, otherwise it will be completed automatically |  |


The description of each button on the page where the group is created can be found in the [Overview section](admin_overview).
