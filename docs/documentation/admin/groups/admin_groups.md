---
title: Group Settings
sidebar_label: Group Settings
---
import useBaseUrl from '@docusaurus/useBaseUrl';
import Highlight from '@theme/Highlight';

<span className="hero__subtitle">Settings Panel Guide</span>

_View, create and edit regular groups._

## Create a Group {#create-group}
From the [Groups Section](/docs/documentation/admin/groups/overview_groups#layout), press the <span className="badge badge--primary">+</span> icon to create a new group. The [**group settings panel**](#group-settings-panel-layout) opens up to configure and save the new group.

## Edit a Group {#edit-group}
From the [Groups Section](/docs/documentation/admin/groups/overview_groups#layout), press the corresponding **pen** icon to edit a group. The [**group settings panel**](#group-settings-panel-layout) opens up to configure and save the new group.

<div className="alert alert--secondary">

## Group Settings Panel Layout {#group-settings-panel-layout}
_The following settings panel opens up when creating or editing a group._

<img alt="group settings panel" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_group_02.png')} />
<br/>

_Actions:_
- **1. Deactivate**: Disables (or enables) the group's availability.
- **2. Save**: Saves current changes made to the group.

_Settings:_
- [**A. General information**](#general-information): Basic group settings.
- [**B. Icon**](#icon): Configures the group icon shown on the Main Menu Bar or Group Panel.
- [**C. Help**](#help): Sets up onboarding.
- [**D. Layout**](#layout): Configures how channels are displayed in the group.
- [**E. Channel creation**](#channel-creation): Allows _users_ to create new channels within the group.
- [**F. Secondary actions**](#secondary-actions): Configures the [_actions button_ in the _group panel_](/docs/documentation/client/actions_button#group-panel).


</div>
<br/>

<div className="alert alert--secondary">

### A. General information {#general-information}
_Basic group settings._

<img alt="general information" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_group_02a.png')} />
<br/>

<div className="container box">
<div className="row table-row-1">
<div className="col col--3"><strong>Name</strong>:</div>
<div className="col col--4">The group's display name.</div>
<div className="col col--5"><em>It doesn't have to be unique and can contain any characters.</em></div>
</div>
<div className="row table-row-2">
<div className="col col--3"><strong>Code</strong>:</div>
<div className="col col--4">Group identification name. Must be unique. Only lowercase letters, numbers, and underscores are accepted. The first character must be a letter.</div>
<div className="col col--5"><em>The code cannot be edited once it is saved.</em></div>
</div>
<div className="row table-row-1">
<div className="col col--3"><strong>Weight</strong>:</div>
<div className="col col--4">A relative number that positions the group on the Main Menu Bar or Group Panel. Smaller numbers accommodate the group near the top, larger numbers towards the end.</div>
<div className="col col--5"><em>If you don't type a number, the system will assign one.</em></div>
</div>
<div className="row table-row-2">
<div className="col col--3"><strong>Parent group</strong>:</div>
<div className="col col--4">The group can be positioned within another group as a child. The parent group must already exist.</div>
<div className="col col--5"><em>

View an [example of a parent–child groups](/docs/documentation/admin/tips/parent_group).

</em></div>
</div>
</div>

</div>
<br/>

<div className="alert alert--secondary">

### B. Icon {#icon}
_Configures the group icon shown on the Main Menu Bar or Group Panel._

<img alt="general information" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_group_02b.png')} />
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

<div className="alert alert--secondary">

### C. Help {#help}
_Sets up onboarding when users log in to the app or website._

<img alt="general information" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_group_02c.png')} />
<br/>

<div className="container box">
<div className="row table-row-1">
<div className="col col--3"><b>Activate help for this group:</b></div>
<div className="col col--5">This function is for mobile apps only.</div>
<div className="col col--4"><em>Currently unavailable.</em></div>
</div>
<div className="row table-row-2">
<div className="col col--3"><b>Display in onboarding:</b></div>
<div className="col col--5">Will display onboarding instructions when users log into the app or website.</div>
<div className="col col--4"></div>
</div>
<div className="row table-row-1">
<div className="col col--3"><b>Instructions:</b></div>
<div className="col col--5">Text that will be displayed.</div>
<div className="col col--4"><em>Instructions will be displayed below the animation.</em></div>
</div>
<div className="row table-row-2">
<div className="col col--3"><b>Frequently asked questions' URL</b></div>
<div className="col col--5">This function is for mobile apps.</div>
<div className="col col--4"><em>Currently unavailable.</em></div>
</div>
<div className="row table-row-1">
<div className="col col--3"><b>Animation:</b></div>
<div className="col col--5">Animated image shown in group onboarding. JSON animation format only.</div>
<div className="col col--4"><em>

We recommend using [Lottie File](https://lottiefiles.com/).
</em></div>
</div>

</div>
<br/>

</div>
<br/>

<div className="alert alert--secondary">

### D. Layout {#layout}
_Configures how channels are displayed in the group._

<img alt="general information" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_group_02d.png')} />
<br/>

<div className="container box">
<div className="row table-row-1">
<div className="col col--3"><b>Additional sorting:</b></div>
<div className="col col--5">Permits you to configure the order in which channels are displayed.</div>
<div className="col col--4"><em>The default option is to sort channels by name, and then by the last message sent.</em></div>
</div>
<div className="row table-row-2">
<div className="col col--3"><b>Collection:</b></div>
<div className="col col--5">Channels will be sorted by the elements (properties) contained within the selected collection (property type).</div>
<div className="col col--4"><em>If the channels are not related to the selected property type, they will not be sorted.</em></div>
</div>
<div className="row table-row-1">
<div className="col col--3"><b>Order elements by:</b></div>
<div className="col col--5">Elements will be sorted by the selected option.</div>
<div className="col col--4"><em>Available options are: Created At, Weight, Modified At, and Name</em></div>
</div>
<div className="row table-row-2">
<div className="col col--3"><b>Order channels by:</b></div>
<div className="col col--5">Channels will be sorted by the selected option.</div>
<div className="col col--4"><em>Available options are: Created At, Last Message, Modified, At and Name</em></div>
</div>

</div>

</div>
<br/>

<div className="alert alert--secondary">

### E. Channel creation {#channel-creation}
_Allows users to create new channels within the group. The new channels are created using the actions button on the group panel._

<img alt="general information" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_group_02e.png')} />
<br/>

<div className="container box">
<div className="row table-row-1">
<div className="col col--3"><strong>Allow channel creation</strong>:</div>
<div className="col col--4">Allows users to create new channels within the group.</div>
<div className="col col--5"><em></em></div>
</div>
<div className="row table-row-2">
<div className="col col--3"><strong>Permissions</strong>:</div>
<div className="col col--4">Indicates the permissions a user must have in order to create a new channel.</div>
<div className="col col--5"><em>Users require at least one of the selected permissions.</em></div>
</div>
</div>

</div>
<br/>

<div className="alert alert--secondary">

### F. Secondary actions {#secondary-actions}
_Configures the [actions button in the group panel](/docs/documentation/client/actions_button#group-panel). See below to learn more about [actions button setup](#actions-button)._

<img alt="general information" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_group_02f.png')} />
<br/>

<div className="container box">
<div className="row table-row-1">
<div className="col col--3"><strong>+ Add New Action</strong>:</div>
<div className="col col--4">Adds a component in the section for configuring a new "action".</div>
<div className="col col--5"><em>

[Step-by-step configuration](#create-links)

</em></div>
</div>
<div className="row table-row-2">
<div className="col col--3"><b>Name:</b></div>
<div className="col col--5">Name given to the action. The name will appear as an option in the Actions Menu.</div>
<div className="col col--4"><em>You can use any characters.</em></div>
</div>
<div className="row table-row-1">
<div className="col col--3"><b>Url:</b></div>
<div className="col col--5">Indicates de URL that will be accessed. URLs can point to external or internal pages. They can also point to sections within the app, surveys, and tasks by indicating their URL.</div>
<div className="col col--4"><em>You can obtain the URLs for surveys, tasks, and other app objects by going directly to them and copying the address directly from your navigator's URL bar.</em></div>
</div>
<div className="row table-row-2">
<div className="col col--3"><b>Use authentication:</b></div>
<div className="col col--5">Sends the user's authentication token to external sites.</div>
<div className="col col--4"><em>This is needed for external sites that require Cotalker authentication. For security reasons, use only on trusted sites.</em></div>
</div>
<div className="row table-row-1">
<div className="col col--3"><b>Open link in a new tab:</b></div>
<div className="col col--5">If activated, the URL will be opened in a new tab in your browser. Otherwise, it will open inside the Cotalker app window.</div>
<div className="col col--4"><em></em></div>
</div>
<div className="row table-row-2">
<div className="col col--3"><b>Select icon:</b></div>
<div className="col col--5">You can choose between personalized or pre-designed icons.</div>
<div className="col col--4"><em>The color cannot be changed.</em></div>
</div>
<div className="row table-row-1">
<div className="col col--3"><b>Path:</b></div>
<div className="col col--5">Must be filled with Scalable Vector Graphics (SVG) code.</div>
<div className="col col--4"><em>If the icon was selected from the list of pre-designed icons, the path will be completed automatically. If a personalized SVG is desired, its code must be inserted manually.</em></div>
</div>
</div>

</div>
<br/>

---

## About the Actions Button {#actions-button}
### Overview {#actions-button-overview}
In _regular groups_, through the [_actions button_](/docs/documentation/client/actions_button#group-panel) –a green floating button that appears at the bottom of the group panel– users can create new channels and choose from a list of links to external or internal URLs. 

_The **actions button** and its corresponding **actions menu** will look something like the image below:_

<img alt="fab secondary actions" className="img_sizing item shadow--lw" src={useBaseUrl('img/client_actionsbutton_01.png')} />
<br/>

"Actions" in the _actions button menu_ are usually used as links to important tools or information, either within the Cotalker platform or on the web.

Only in _regular groups_ can users create new channels.

<div className="alert alert--secondary">

### Create Channels {#create-channels-button}
To allow users to create new channels through the _actions button_, do the following:

1. Go to the [Channel Creation](#channel-creation) section.
2. Turn on the **Allow channel creation** option.
3. Save when done configuring the _group_.

<img alt="create channel" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_group_02i.png')} />
<br/>

### Create URL links {#create-links}
To add links to the _actions button menu_, do the following:

1. Go to the [**secondary actions**](#secondary-actions) section.
2. Press the <span className="badge badge--primary">+ Add New Action</span> button to open up more settings:_
3. A field component representing the new action appears. Press on the component to open up the settings panel.
4. Configure the _action's_ settings.
5. If more _actions_ need to be added, press the <span className="badge badge--primary">+ Add New Action</span> button again and complete the configuration
6. Save when done configuring the _group_.

<img alt="create links" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_group_02g.png')} />
<br/>

:::note
- Go to the [**secondary fields**](#secondary-fields) section for more information on settings.
- The **action** components can be dragged and dropped to sort them in the order you wish them to appear on the _actions button menu_.
:::

</div>
<br/>

---

## Related Topics {#related-topics}

- [Group Basics](/docs/documentation/client/groups)
- [Group Data Model (COTGroup)](/docs/documentation/models/communication/model_groups)
- [Group API Requests](/docs/documentation/api/communication/groups)
