---
title: Channel Settings
sidebar_label: Channel Settings
---
import useBaseUrl from '@docusaurus/useBaseUrl';
import Highlight from '@theme/Highlight';

<span className="hero__subtitle">Settings Panel Guide</span>

_View, create, and edit group channels._

## Access the Channels Panel {#access-channels}
To access the _channels_ within a _group_:

<img alt="accessing channels" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_group_channels_00a.png')} />
<br/>

1. Go to the [Groups](/docs/documentation/admin/groups/overview_groups#access-groups) section.
2. Select the _list icon_ of the _group_ containing the _channels_ you wish to view.
3. The [_Channels Panel_](#channels-panel-layout) will open up displaying a table with all the _channels_ within the _group_.

<div className="alert alert--secondary">

## Channels Panel Layout {#channels-panel-layout}
_The Channels Panel is a table that displays all existing channels within a group._

<img alt="channel settings panel" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_group_channels_00.png')} />
<br/>

_Actions:_
- **1. [Create channel](#create-channel)**: Opens the [channel settings panel](#channel-settings-panel-layout) to create a new channel.
- **2. Search**: Search for channels within the group.
- **3. More options**: Allows viewing disabled channels.

_Settings and Options:_
- **A. Icon**: Displays the avatar that represents the channel.
- **B. Name**: The channel's display name.
- **C. Code**: The channel's unique identification code.
- **D. Number of participants**: Amount of users associated to the channel.
- **E. [Edit](#edit-channel)**: Opens the [channel settings panel](#channel-settings-panel-layout) to edit the corresponding channel.

</div>
<br/>

## Create Channel within a Group {#create-channel}
From within the [_Channels Panel_](#channels-panel-layout), you can create a new _channel_ by pressing the <span className="badge badge--primary">+</span> icon. This will open up the [Channel Settings Panel](#channel-settings-panel-layout), where you can configure and save a new _channel_.

<img alt="create channel" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_group_channels_00b.png')} />
<br/>

## Edit a Channel within a Group {#edit-channel}
From within the [_Channels Panel_](#channels-panel-layout), you can edit an existing _channel_ by pressing the _pen_ icon. This will open up the [Channel Settings Panel](#channel-settings-panel-layout), where you can configure and save a new _channel_.

<img alt="edit channel" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_group_channels_00c.png')} />
<br/>


<div className="alert alert--secondary">

## Channel Settings Panel Layout {#channel-settings-panel-layout}
Whether creating or editing a _channel_, the following settings panel will appear.

<img alt="group settings panel" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_group_channels_01.png')} />
<br/>

_Actions:_
- **1. Save**: Saves current channel configuration.

_Settings:_
- [**A. General information**](#general-information): Basic channel setup information.
- [**B. Participants**](#participants): Sets the users that can participate in the channel.
- [**C. Elements**](#elements): Indicates elements associated with the channel.
- [**D. Options**](#options): Configures special channel options.

</div>
<br/>

<div className="alert alert--secondary">

### A. General information {#general-information}
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

### B. Participants {#participants}
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

### C. Elements {#elements}
_Lets you add an element to your channel. Useful when setting up a routine or survey associated with a particular element. For example, if you add elements associated with a survey to the channel, the survey will be available through the [actions button found in the channel's workspace](/docs/documentation/client/channels#task-menus-within-channel)._

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

### D. Options {#options}
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

---

## Related Topics {#related-topics}

- [Channel Workspace Basics](/docs/documentation/client/channels)
- [Channel Data Model (COTChannel)](/docs/documentation/models/communication/model_channels)
- [Channel API Requests](/docs/documentation/api/communication/channels)
