---
id: groups_channels
title: Groups & Channels

---
import useBaseUrl from '@docusaurus/useBaseUrl'; 
import Mermaid from '@theme/Mermaid';

<img alt="design" class="img_sizing" src={useBaseUrl('img/design/Groups_and_Channels.svg')} />

## Groups {#groups}
Displayed in the main menu bar, _groups_ are the primary places to share information among users. _Groups_ – which can only be created by administrators – are classified into three kinds: _communication_, _workflow_, and _links_. 

- _Communication Groups_: They incorporate a list of users and include _channels_ – chat rooms for messaging and answering surveys. Groups can have subgroups and more than one channel.

- _Workflow Groups_: These are made up of _tasks_ and can incorporate _channels_. _Tasks_, _channels_, and subgroups can be multiple within a group. We shall later look into how _tasks_ function within the workflow.

- _Link Groups_: Finally, a group can also be a _link_ which redirects the user to another source of information, whether it be another webpage, a document, a dashboard, or pretty much anything else.



## Channels {#channels}

A _channel_ is primarily a *chatroom* for a specific group's users, allowing quick and transparent communication between people working on a _task_ or project. Apart from messaging, _channels_ can also include _surveys_. We will look into _surveys_ in the next section; for now, _surveys_ help gather data from users, improving procedures within the company.

The *messaging service* in _channels_ permits sending texts, emojis, links, images, and videos.
<!-- TODO ##### image with text input and paper clip -->

Within certain _groups_, users are allowed to create _channels_. The _user_ can then choose what _users_ to include in the newly made _channel_. 
<!-- TODO ##### image of the top of channels list with "plus sign" shown here -->

When there are multiple _channels_ in a group, it is recommended to use the *search bar* which permits finding a _channel_ by its name.
<!-- TODO ##### image of the top of the channels list with a magnifying glass -->

*Direct messages* for other users can be made through the _contacts_ button at the top of the _main menu_.
<!-- TODO ##### image of contact button on top of the main menu bar -->


### View of Channels inside of a group {#view-of-channels-inside-of-a-group}
<img alt="" src={useBaseUrl('img/channellistweb.jpg')} />

### View of Chat Channel {#view-of-chat-channel}
<img alt="" src={useBaseUrl('img/channelopen.jpg')} />

### Chat Message Options

Right-click (or long-press on mobile devices) chat message bubbles in the channel to open up a menu with three options:

- **Reply**: Send a message with the original message and author embedded. Only the first three lines of the original message will be displayed. You can reply to more than one message at a time.
- **Copy**: Copy text messages to your clipboard.
- **Delete**: Delete a message you have sent. This option is available only for a limited time after you have sent the message.

<!-- TODO insert image with message menu and/or a reply example-->

### Task Menus within Channel {#task-menus-within-channel}
From within the respective _channel_, you can change a _task's_ state. Simply hover over the task in the group's channel list and left-click over the icon that appears to the right.

_The following image shows how to open the pop-up menu:_
<img alt="task change state menu" class="img_sizing item shadow--tl" src={useBaseUrl('img/client_channel_task_popup_00.png')} />
<br/>

You can also open up a side panel with all the task info by clicking anywhere on the task's channel title bar found on the top of the screen.

_The following image shows how to open the side panel:_
<img alt="task change state menu" class="img_sizing item shadow--tl" src={useBaseUrl('img/client_channel_task_sidepanel_00.png')} />
<br/>

### "Actions" Button {#floating-action-button-fab}
Within a group's channel panel, you might see a green button floating near the bottom. The _Actions_ button that can be configured for a group's specific needs. This button can let you create a new channel, answer a survey, create a task, redirect to another URL, among others.

_The FAB and the enabled actions will look something like the image below:_
<img alt="fab secondary actions" class="img_sizing item shadow--lw" src={useBaseUrl('img/admin_groups_fab_secondary_actions.png')} />
<br/>