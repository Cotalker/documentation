---
title: Workflow Group Channels
---
import useBaseUrl from '@docusaurus/useBaseUrl'; 

<span className="hero__subtitle">Settings Panel Guide</span>

_Within workflow groups, tasks have an associated channel that permits user interaction with the task configuration, state updates, and communication with other users within the [channel's workspace](/docs/documentation/client/channels)._


## Access settings panel {#access}

To access a workflow-group channel's settings panel:

1. From the workflow groups (initial) setting panel, select the channel manager icon of the corresponding workflow.

<img alt="channel manager" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_workflowgroup_channel_00.png')} />
<br/>

2. A list of all the channels available in the workflow group opens up. Choose the channel you wish to edit.

<img alt="channel manager" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_workflowgroup_channel_01.png')} />
<br/>

<div className="alert alert--secondary">

## Settings Panel Layout {#layout}

<img alt="channel layout" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_workflowgroup_channel_02.png')} />
<br/>

_Options:_
1. Deactivate: Makes the channel invisible until activated again.
2. Save: saves the current configuration.

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

<img alt="general info" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_workflowgroup_channel_03.png')} />
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
<div className="col col--5"><em>Task channel codes are automatically assigned.</em></div>
</div>
<div className="row table-row-1">
<div className="col col--3"><strong>Group</strong>:</div>
<div className="col col--4">Indicates the workflow group the channel belongs to.</div>
<div className="col col--5"><em>

Users will be able to access the channel through the [group's panel](/docs/documentation/client/groups).

</em></div>
</div>
</div>
<br/>

</div>
<br/>

<div className="alert alert--secondary">

### B. Participants {#participants}
_Sets the users that can participate in the channel._

<img alt="participants" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_workflowgroup_channel_04.png')} />
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
_Lets you add an element to your channel. Some elements are automatically added in channels associated with a task. You can, for example, add elements associated with a survey to make the survey available through the [actions button found in the channel's workspace](/docs/documentation/client/channels#task-menus-within-channel)._

<img alt="elements" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_workflowgroup_channel_05.png')} />
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
<div className="col col--4"><em>When a task is created through a survey form, collections corresponding to submitted answers are added automatically.</em></div>
</div>
<div className="row table-row-1">
<div className="col col--3"><strong>Elements</strong>:</div>
<div className="col col--5">

Indicates the collection's [elements](/docs/documentation/admin/database/admin_elements) (properties) which have been chosen for the channel. Used for classifying channels or making surveys available, among others.

</div>
<div className="col col--4"><em>When a task is created through a survey form, elements corresponding to submitted answers are added automatically.</em></div>
</div>
</div>
<br/>

</div>
<br/>

<div className="alert alert--secondary">

### D. Options {#options}
_Configures special channel options._

<img alt="general info" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_workflowgroup_channel_06.png')} />
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

## Related Topics {#related-topics}
- [**Groups**](/docs/documentation/admin/admin_group)
- [**Channel Workspace**](/docs/documentation/client/channels)