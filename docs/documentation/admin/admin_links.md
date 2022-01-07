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
- **1. Deactivate**: Makes the link group unavailable. 
- **2. Save**: Saves changes made to the link group.

_Options:_
- **A. General information**: The link group's basic configuration settings.
- **B. Icon**: Permits customizing the icon that represents the link group.

</div>
<br/>

<div className="alert alert--secondary">

### A. General information {#general-information}
_The link group's basic configuration settings._

<img alt="link group" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_links_05.png')} />
<br/>

<div className="container box">

<div className="row table-row-1">
<div className="col col--3"><strong>Name</strong>:</div>
<div className="col col--4">The link group's displayed name on the Main Menu Bar or Group Panel.</div>
<div className="col col--5"><em>It doesn't have to be unique and any characters can be used.</em></div>
</div>
<div className="row table-row-2">
<div className="col col--3"><strong>Code</strong>:</div>
<div className="col col--4">The link group's identification code. Once it is saved, it cannot be changed.</div>
<div className="col col--5"><em>Only lowercase letters, numbers, and underscores are permitted.</em></div>
</div>
<div className="row table-row-1">
<div className="col col--3"><strong>Weight</strong>:</div>
<div className="col col--4">A relative number that positions the link 
group on the Main Menu Bar or Group Panel list. Smaller numbers accommodate the group near the top, larger numbers towards the end.</div>
<div className="col col--5"><em>If you don't type a number, the system will assign one.</em></div>
</div>
<div className="row table-row-2">
<div className="col col--3"><strong>Parent group</strong>:</div>
<div className="col col--4">Displays a link group as a sub-group within the indicated parent group.</div>
<div className="col col--5"><em>If left blank, the link group appears in the Main Menu Bar.</em></div>
</div>
<div className="row table-row-1">
<div className="col col--3"><strong>Use authentication</strong>:</div>
<div className="col col--4">If active, user authentication data is sent.</div>
<div className="col col--5"><em>Used for some URLs that require user authentication.</em></div>
</div>
<div className="row table-row-2">
<div className="col col--3"><strong>Open link in new tab</strong>:</div>
<div className="col col--4">If active, the linked webpage is opened in a new web browser tab.</div>
<div className="col col--5"><em>By default, the linked webpage opens in a pop-up window that hover over the platform.</em></div>
</div>
<div className="row table-row-1">
<div className="col col--3"><strong>Open link embedded</strong>:</div>
<div className="col col--4">If active, the linked webpage is displayed embedded within the Cotalker platform.</div>
<div className="col col--5"><em>By default, the linked webpage opens in a pop-up window that hover over the platform.</em></div>
</div>
<div className="row table-row-2">
<div className="col col--3"><strong>URL</strong>:</div>
<div className="col col--4">Indicates the URL of the webpage that the link group opens.</div>
<div className="col col--5"><em></em></div>
</div>
<div className="row table-row-1">
<div className="col col--3"><strong>Access roles</strong>:</div>
<div className="col col--4">Indicates access roles users must have to view the link group.</div>
<div className="col col--5"><em>Users must have at least one of the access roles.</em></div>
</div>
</div>
</div>
<br/>

<div className="alert alert--secondary">

### B. Icon {#icon}
_Permits customizing the icon that represents the link group._

<img alt="link group" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_links_06.png')} />
<br/>

<div className="container box">
<div className="row table-row-1">
<div className="col col--3"><b>Select icon:</b></div>
<div className="col col--5">Choose personalized or pre-designed icon from the menu.</div>
<div className="col col--4"><em>Personalized icons are configured in the "Path" field.</em></div>
</div>
<div className="row table-row-2">
<div className="col col--3"><b>Color:</b></div>
<div className="col col--5">Choose from the menu the icon's color.</div>
<div className="col col--4"><em></em></div>
</div>
<div className="row table-row-1">
<div className="col col--3"><b>Path:</b></div>
<div className="col col--5">Must be filled with Scalable Vector Graphics (SVG) code.</div>
<div className="col col--4"><em>The path is completed automatically when a pre-designed icon is chosen. For personalized icons, SVG code must be inserted manually.</em></div>
</div>
</div>
<br/>



</div>
<br/>
