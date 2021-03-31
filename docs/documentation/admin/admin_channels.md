---
title: Channels Section
sidebar_label: Channels
---
import useBaseUrl from '@docusaurus/useBaseUrl';
import Highlight from '@theme/Highlight';

<img alt="design" class="img_sizing" src={useBaseUrl('img/design/Channels.svg')} />

## Channels {#channels}
_Workflow groups_ and _communication groups_ can have _channels_. A _channel_ is where two or more Cotalker _users_ can interact with each other, or where one or more _users_ can answer and send a _survey_ to a state machine, in other words, upload information that is used in a company process. Or it could be used to progress through all the task/opportunity/asset states of a process.

<!-- TODO add reference to workgroup channels -->

### Communication Group Channels {#communication-group-channels}
Within the **Groups** option - under _sections_ in the _administrative panel_ – you can find the entire list of _communication groups_ that have been created. By pressing an individual _communication group_ (indicated in the settings panel simply as **groups**), you will see all the _channels_ created in that group. If you would like to create a _channel_ within the _communication group_, please refer to the next section.
<img alt="" src={useBaseUrl('img/admin_channel_list.png')} />
<br/><br/>

The description of the icons are in the [Overview section](admin_overview).

The information shown in the list is as follows:
- Icon: Channel figure
- Name: Channel visual name.
- Code: Channel code
- Number of participants: how many users are in the channel.


### Edit / Create Single Channel {#edit--create-single-channel}
To create a new _channel_, once you have selected the corresponding _communication group_, press the _create new element_ icon for a new settings dialog panel to open up. Ensure that in the _group_ settings, the **Allow channel creation** button has been previously activated.
<img alt="" src={useBaseUrl('img/admin_channel_create_1.png')}  />
<img alt="" src={useBaseUrl('img/admin_channel_create_2.png')} />
<br />
<br />
Below you will find the description and notes for each field of the **Create channel** settings panel shown above.

| Field | Description | Notes |
| ---- | ----------- | ----- |
| Name | The visual name of the Channel | It doesn't have to be unique|
| Code | The identifier of the Channel | It only accepts lowercase letters, numbers, and underscore; and it must start with a letter. Once you create and save the code, you cannot change it.|
| Group | The group to which the channel belongs | The group you are in is the default. |
| First Property overrides channel name | WIP |  |
| Users | Users who participate in the channel. |  |
| Bots | Bots that run in the channel. |  |
| Properties | Property Addition | Add the _collection_ and _elements_. Useful when setting up a routine or survey associated with a particular _element_. |
| Permission for sending messages | You can choose between "all" or "none" for users allowed to send messages on the channel |  |


The description of each button in the **Create channel** settings panel can be found in the [Overview section](admin_overview).

### Download Channel List {#download-channel-list}
You can only download _channels_ in CSV format. The encoding field options are Windows, Macintosh and UTF-8.
<br />
<img alt="" src={useBaseUrl('img/admin_channel_download.png')} />
<br />
<br />

The description of the icons are in the [Overview section](admin_overview).

### Import Channel List {#import-channel-list}
You can import a _channel_ list in CSV format. The encoding field options are Windows, Macintosh and UTF-8.
<br />
<img alt="" src={useBaseUrl('img/admin_channel_import.png')} />
<br />
<br />

The description of the icons are in the [Overview section](admin_overview).
