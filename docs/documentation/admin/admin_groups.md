---
id: admin_group
title: Groups Section
sidebar_label: Groups
---
import useBaseUrl from '@docusaurus/useBaseUrl';
import Highlight from '@theme/Highlight';

<img alt="design" classNames="img_title" src={useBaseUrl('img/design/Groups.svg')} />

## Overview {#group-overview}

[_Regular Groups_](/docs/documentation/client/groups#regular-groups), simply referred to as _"groups"_, are to be differentiated from _workflow (task) groups_ and _link groups_. As the other group types, _regular groups_ can be accessed through the **Main Menu Bar** or in the **Group Panel** as sub-groups of other groups. _Regular groups_ are mainly used for communication purposes. Users can be added as participants in the group, allowing them to use the group panel's _actions button_, access _sub-groups_, open _link groups_, access the group's _channels_, and other resources that can be added to a group and its channels. 

Through _Channel Workspaces_ within _Regular Groups_, users associated to a  channel can send messages, share files, answer surveys, and view other users participating in the channel.

## Accessing Groups Section {#access-groups}
To access the <span className="badge badge--primary">Groups</span> section:

<img alt="accessing groups" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_group_00.png')} />
<br/>

1. Press the <span className="badge badge--primary">Administrator</span> in the **Main Menu Bar**.
2. Select <span className="badge badge--primary">Groups</span> in the **Administrative Panel**.
3. The [**Groups**](#group-section-layout) section opens up.

<div className="alert alert--secondary">

## Groups Section Layout {#group-section-layout}
_The Groups section consists of a table displaying all the regular groups that exist within the company._

<img alt="accessing groups" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_group_01.png')} />
<br/>

_Actions:_
- **1. Create group**: Press the <span className="badge badge--primary">+</span> icon to open a [group settings panel](##createedit-single-regular-group) to create a new group.
- **2. More actions**: Shows option for displaying disabled groups.

_Settings and Options:_
- **A. Icon**: Displays the icon that represents the group in the **Main Menu Bar** or **Group Panel**.
- **B. Name**: Indicates the group's display name.
- **C. Channel creation**: Indicates if channels can be created in the group.
- **D. Last modified**: Indicates the last time the group was edited.
- **E. Channels | Edit**: The respective icons permit either [viewing all the channels within the group](#channels) or [editing the group](##createedit-single-regular-group).


</div>
<br/>

## Create a Group {#create-group}
From the [Groups Section](#group-section-layout), press the <span className="badge badge--primary">+</span> icon to create a new group. The [**group settings panel**](#createedit-single-regular-group) opens up to configure and save the new group.

## Edit a Group {#edit-group}
From the [Groups Section](#group-sectionlayout), press the corresponding **pen** icon to edit a group. The [**group settings panel**](##createedit-single-regular-group) opens up to configure and save the new group.

<div className="alert alert--secondary">

## Group Settings Panel Layout {#createedit-single-regular-group}
_The following settings panel opens up when creating or editing a group._

<img alt="group settings panel" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_group_02.png')} />
<br/>

_Actions:_
- **1. Deactivate**: Disables (or enables) the group's availability.
- **2. Save**: Saves current changes made to the group.

_Settings:_
- [**A. General information**](#group-general-information): Basic group settings.
- [**B. Icon**](#group-icon): Configures the group icon shown on the Main Menu Bar or Group Panel.
- [**C. Help**](#group-help): Sets up onboarding.
- [**D. Layout**](#group-layout): Configures how channels are displayed in the group.
- [**E. Channel creation**](#group-channel-creation): Allows _users_ to create new channels within the group.
- [**F. Secondary actions**](#group-secondary-actions): Configures the [_actions button_ in the _group panel_](/docs/documentation/client/actions_button#group-panel).


</div>
<br/>

<div className="alert alert--secondary">

### A. General information {#group-general-information}
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

### B. Icon {#group-icon}
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

### C. Help {#group-help}
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

### D. Layout {#group-layout}
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

### E. Channel creation {#group-channel-creation}
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

### F. Secondary actions {#group-secondary-actions}
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

<img alt="fab secondary actions" class="img_sizing item shadow--lw" src={useBaseUrl('img/client_actionsbutton_01.png')} />
<br/>

"Actions" in the _actions button menu_ are usually used as links to important tools or information, either within the Cotalker platform or on the web.

Only in _regular groups_ can users create new channels.

<div className="alert alert--secondary">

### Create Channels {#create-channels-button}
To allow users to create new channels through the _actions button_, do the following:

1. Go to the [Channel Creation](#group-channel-creation) section.
2. Turn on the **Allow channel creation** option.
3. Save when done configuring the _group_.

<img alt="create channel" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_group_02i.png')} />
<br/>

### Create URL links {#create-links}
To add links to the _actions button menu_, do the following:

1. Go to the [**secondary actions**](#group-secondary-actions) section.
2. Press the <span className="badge badge--primary">+ Add New Action</span> button to open up more settings:_
3. A field component representing the new action appears. Press on the component to open up the settings panel.
4. Configure the _action's_ settings.
5. If more _actions_ need to be added, press the <span className="badge badge--primary">+ Add New Action</span> button again and complete the configuration
6. Save when done configuring the _group_.

<img alt="create links" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_group_02g.png')} />
<br/>

:::note
- Go to the [**secondary fields**](#group-secondary-fields) section for more information on settings.
- The **action** components can be dragged and dropped to sort them in the order you wish them to appear on the _actions button menu_.
:::

</div>
<br/>

## Access the Channels Panel {#access-channels}
To access the _channels_ within a _group_:

<img alt="accessing channels" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_group_channels_00a.png')} />
<br/>

1. Go to the [Groups](/docs/documentation/admin/groups/overview_groups#access-groups) section.
2. Select the _list icon_ of the _group_ containing the _channels_ you wish to view.
3. The [_Channels Panel_](#channels) will open up displaying a table with all the _channels_ within the _group_.

<div className="alert alert--secondary">

## Channels Panel Layout {#channels}
_The Channels Panel is a table that displays all existing channels within a group._

<img alt="channel settings panel" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_group_channels_00.png')} />
<br/>

_Actions:_
- **1. [Create channel](#create-channel)**: Opens the [channel settings panel](##edit--create-single-channel) to create a new channel.
- **2. Search**: Search for channels within the group.
- **3. More options**: Allows viewing disabled channels.

_Settings and Options:_
- **A. Icon**: Displays the avatar that represents the channel.
- **B. Name**: The channel's display name.
- **C. Code**: The channel's unique identification code.
- **D. Number of participants**: Amount of users associated to the channel.
- **E. [Edit](#edit-channel)**: Opens the [channel settings panel](##edit--create-single-channel) to edit the corresponding channel.

</div>
<br/>

## Create Channel within a Group {#create-channel}
From within the [_Channels Panel_](#channels), you can create a new _channel_ by pressing the <span className="badge badge--secondary">+</span> icon. This will open up the [Channel Settings Panel](##edit--create-single-channel), where you can configure and save a new _channel_.

<img alt="create channel" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_group_channels_00b.png')} />
<br/>

## Edit a Channel within a Group {#edit-channel}
From within the [_Channels Panel_](#channels), you can edit an existing _channel_ by pressing the _pen_ icon. This will open up the [Channel Settings Panel](##edit--create-single-channel), where you can configure and save a new _channel_.

<img alt="edit channel" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_group_channels_00c.png')} />
<br/>


<div className="alert alert--secondary">

## Channel Settings Panel Layout {##edit--create-single-channel}
Whether creating or editing a _channel_, the following settings panel will appear.

<img alt="group settings panel" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_group_channels_01.png')} />
<br/>

_Actions:_
- **1. Save**: Saves current channel configuration.

_Settings:_
- [**A. General information**](#channel-general-information): Basic channel setup information.
- [**B. Participants**](#channel-participants): Sets the users that can participate in the channel.
- [**C. Elements**](#channel-elements): Indicates elements associated with the channel.
- [**D. Options**](#channel-options): Configures special channel options.

</div>
<br/>

<div className="alert alert--secondary">

### A. General information {#channel-general-information}
_Basic channel setup information._

<img alt="general info" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_group_channels_01a.png')} />
<br/>

<div className="container box">
<div className="row table-row-1">
<div className="col col--3"><strong>Name</strong>:</div>
<div className="col col--4">Indicates the channel's displayed name.</div>
<div className="col col--5"><em></em></div>
</div>
<div className="row table-row-2">
<div className="col col--3"><strong>Code</strong>:</div>
<div className="col col--4">The channel's unique identification name.</div>
<div className="col col--5"><em>Only lowercase letters, numbers, and underscores are accepted. The code must start with a letter. Once you create and save the collection, you cannot change the code.</em></div>
</div>
<div className="row table-row-1">
<div className="col col--3"><strong>Group</strong>:</div>
<div className="col col--4">Indicates the group the channel belongs to.</div>
<div className="col col--5"><em>Users will be able to access the channel through the [group's panel](/docs/documentation/client/groups).</em></div>
</div>

</div>
<br/>

</div>
<br/>

<div className="alert alert--secondary">

### B. Participants {#channel-participants}
_Sets the users that can participate in the channel._

<img alt="participants" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_group_channels_01b.png')} />
<br/>

<div className="container box">
<div className="row table-row-1">
<div className="col col--3"><strong>Users</strong>:</div>
<div className="col col--4">Indicates the users that have access to the channel.</div>
<div className="col col--5"><em></em></div>
</div>
<div className="row table-row-2">
<div className="col col--3"><strong>Bots</strong>:</div>
<div className="col col--4">Indicates bots that have permission to run in the channel. Only needed if the bot does not have global access.</div>
<div className="col col--5"><em>

See [this tutorial](/docs/tutorials/intermediate/create_survey_bot) on how to make a bot that works within the channel.

</em></div>
</div>
</div>
<br/>

</div>
<br/>

<div className="alert alert--secondary">

### C. Elements {#channel-elements}
_Lets you add an element to your channel. Useful when setting up a routine or survey associated with a particular _element_. For example, if you add elements associated with a survey to the channel, the survey will be available through the [actions button found in the channel's workspace](/docs/documentation/client/channels#task-menus-within-channel)._

<img alt="elements" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_group_channels_01c.png')} />
<br/>

<div className="container box">
<div className="row table-row-1">
<div className="col col--3"><strong>+ Add Element</strong>:</div>
<div className="col col--5">Opens up a settings panel that permits you to select the elements and their corresponding collections.</div>
<div className="col col--4"><em></em></div>
</div>
<div className="row table-row-2">
<div className="col col--3"><strong>Collection</strong>:</div>
<div className="col col--5">

Indicates which [collections](/docs/documentation/admin/database/admin_collections) (property types) are associated with the channel. Used for classifying channels or making surveys available, among others.

</div>
<div className="col col--4"><em></em></div>
</div>
<div className="row table-row-1">
<div className="col col--3"><strong>Elements</strong>:</div>
<div className="col col--5">

Indicates the collection's [elements](/docs/documentation/admin/database/admin_elements) (properties) which have been chosen for the channel. Used for classifying channels or making surveys available, among others.

</div>
<div className="col col--4"><em></em></div>
</div>
</div>
<br/>

</div>
<br/>

<div className="alert alert--secondary">

### D. Options {#channel-options}
_Configures special channel options._

<img alt="general info" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_group_channels_01d.png')} />
<br/>

<div className="container box">
<div className="row table-row-1">
<div className="col col--3"><strong>Permissions for sending messages</strong>:</div>
<div className="col col--4">Indicates if users can write messages in the channel.</div>
<div className="col col--5"><em>Options are `all` or `none`.</em></div>
</div>
<div className="row table-row-2">
<div className="col col--3"><strong>First element overrides channel name</strong>:</div>
<div className="col col--4">Indicates if the display name is overridden by the channel's first elements</div>
<div className="col col--5"><em>If off, the manually added display name is used; otherwise, the display name is overridden.</em></div>
</div>
<div className="row table-row-1">
<div className="col col--3"><strong>Activate video call on this channel</strong>:</div>
<div className="col col--4">Enables users to start video calls within the channel.</div>
<div className="col col--5"><em>A small video icon will appear in the upper-right corner of the channel workspace if active.</em></div>
</div>

</div>
<br/>

</div>
<br/>