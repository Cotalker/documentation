---
title: Workflow Group Channels
---
import useBaseUrl from '@docusaurus/useBaseUrl'; 

<span className="hero__subtitle">Settings Panel Guide</span>

_Within workflowgroups, task have an associated channel that permits user interaction with the task configuration, state updates, and communication with other users within the [channel's workspace](/docs/documentation/client/channels)._


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
- [**A. General information**](#general-information)
- [**B. Participants**](#participants)
- [**C. Elements**](#elements)
- [**D. Options**](#options)

</div>
<br/>

<div className="alert alert--secondary">

### A. General information {#general-information}

<img alt="general info" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_workflowgroup_channel_03.png')} />
<br/>

| Item | Description | Note |
|----|----|----|
| Name | Indicates the channel's displayed name. | |
| Code | Indicates the channel's unique code. | Task channels automatically assign the code. |
| Group | Indicates the workflow group the channels belongs to. | Users will be able to access the channel through the [group's panel](/docs/documentation/client/groups). |

</div>
<br/>

<div className="alert alert--secondary">

### B. Participants {#participants}

<img alt="participants" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_workflowgroup_channel_04.png')} />
<br/>

| Item | Description | Note |
|----|----|----|
| Users | Indicates the users that have access to the channel. | |
| Bots | Indicates bots that have permission to run in the channel. Only needed if the bot does not have global access. | _See [this tutorial](/docs/tutorials/intermediate/create_survey_bot) on how to make a bot that works within the channel._ |

</div>
<br/>

<div className="alert alert--secondary">

### C. Elements {#elements}

<img alt="elements" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_workflowgroup_channel_05.png')} />
<br/>

| Item | Description | Note |
|----|----|----|
| + Add Element | Lets you add an element to your channel. Some elements are automatically added in channels associated with a task. Add elements associated with a survey to make the survey available through the [actions button found in the channel's workspace](/docs/documentation/client/channels#task-menus-within-channel). | _After pressing the **+ Add Element** button, the collections and element fields will be displayed._ |
| Collection | Indicates which [collections](/docs/documentation/admin/admin_properties#collection) (property types) are associated with the channel. Used for classifying channels or making surveys availible, among others. | When a task is created through a survey form, collections corresponding to submitted answers are added automatically. |
| Elements | Indicates the collection's [elements](/docs/documentation/admin/admin_properties#elements) (properties) which have been chosen for the channel. Used for classifying channels or making surveys availible, among others. | When a task is created through a survey form, elements corresponding to submitted answers are added automatically.  |

</div>
<br/>

<div className="alert alert--secondary">

### D. Options {#options}

<img alt="general info" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_workflowgroup_channel_06.png')} />
<br/>

| Item | Description | Note |
|----|----|----|
| Permissions for sending messages | Indicates if users can write messages in the channel. | Options are `all` or `none`. |
| First element overrides channel name | Indicates if the display name is overridden by the channel's first elements | If off, the manually added display name is used, otherwise the display name is overriden. |
| Activate video call on this channel | Enables users to start video calls within the channel | A small video icon will appear in the upper-right corner of the channel workspace if active. |

</div>
<br/>

## Related Topics {#related-topics}
- [**Groups**](/docs/documentation/admin/admin_group)
- [**Channel Workspace**](/docs/documentation/client/channels)