---
id: groups_channels
title: Groups & Channels

---
import useBaseUrl from '@docusaurus/useBaseUrl'; 
import Mermaid from '@theme/Mermaid';

<img alt="design" class="img_sizing" src={useBaseUrl('img/design/Groups_and_Channels.svg')} />

## Groups {#groups}
Displayed in the main menu bar, _groups_ are the primary places to share information among users. _Groups_ –which can only be created by administrators– are classified into three kinds: _communication_, _workflow_, and _links_. 

- _Communication Groups_: They incorporate a list of users and include _channels_, which are chat rooms for messaging and answering surveys. Groups can have subgroups and more than one channel. Normally, we refer to _communication groups_ simply as _groups_.

- _Workflow Groups_: These are made up of _tasks_ and can incorporate _channels_. _Tasks_, _channels_, and subgroups can be multiple within a group. We shall later look into how _tasks_ function within the workflow.

- _Link Groups_: Finally, a group can also be a _link_ which redirects the user to another source of information, whether it be another webpage, a document, a dashboard, or pretty much anything else.



## Channels {#channels}

A _channel_ is primarily a *chatroom* for a specific group's users, allowing quick and transparent communication between people working on a _task_ or project. Apart from messaging, _channels_ can also include _surveys_. We will look into _surveys_ in the next section; for now, _surveys_ help gather data from users, improving procedures within the company.

The *messaging service* in _channels_ permits sending texts, emojis, links, images, and videos.
<!-- TODO ##### image with text input and paper clip -->

Within certain _groups_, users are allowed to create _channels_. The _user_ can then choose what _users_ to include in the newly made _channel_. 
<!-- TODO ##### image of the top of channels list with "plus sign" shown here -->

When there are multiple _channels_ in a group, it is recommended to use the *search bar*, which permits finding a _channel_ by its name.
<!-- TODO ##### image of the top of the channels list with a magnifying glass -->

*Direct messages* for other users can be made through the _contacts_ button at the top of the _main menu_.
<!-- TODO ##### image of contact button on top of the main menu bar -->


### View of Channels inside of a group {#view-of-channels-inside-of-a-group}
<img alt="" src={useBaseUrl('img/channellistweb.jpg')} />

### View of Chat Channel {#view-of-chat-channel}
<img alt="" src={useBaseUrl('img/channelopen.jpg')} />

### Chat Message Options

Right-click (or long-press on mobile devices) chat message bubbles in the channel to open up a menu with the following options:
- **React**: Add an emoji reaction to a message. You can also click on an already given emoji to sum yourself on the counter. To retract from a _reaction_, on the message bubble press on the emoji you sent. The following emojis are available: 👍 👎 😄 🎉 😕 ❤️ 🚀 👀
- **Reply**: Send a message with the original message and author embedded. Only the first three lines of the original message will be displayed. You can reply to more than one message at a time. You can respond to anything sent through the chat, i.e., files, media, surveys, etc.
- **Copy**: Copy text messages to your clipboard.
- **Delete**: Delete a message _you_ have sent. This option is available only up to 24 hours after you have sent the message.

_Examples of replies to text, video, and surveys, respectively:_
<img alt="chat response text" className="img_sizing item shadow--tl" src={useBaseUrl('img/client_groups_chatresponse_03.png')} />
<br/>

_Example of emoji reactions:_
<img alt="chat response text" className="img_sizing_small item shadow--tl" src={useBaseUrl('img/client_groups_chatresponse_emoji.png')} />
<br/>

### Task Menus within Channel {#task-menus-within-channel}
From within the respective _channel_, you can change a _task's_ state. Simply hover over the task in the group's channel list and left-click over the icon that appears to the right.

_The following image shows how to open the pop-up menu:_
<img alt="task change state menu" class="img_sizing item shadow--tl" src={useBaseUrl('img/client_channel_task_popup_00.png')} />
<br/>

You can also open up a side panel with all the task info by clicking anywhere on the task's channel title bar found on the top of the screen.

_The following image shows how to open the side panel:_
<img alt="task change state menu" class="img_sizing item shadow--tl" src={useBaseUrl('img/client_channel_task_sidepanel_00.png')} />
<br/>

### Actions Button {#floating-action-button-fab}
Within a group's channel panel, there is a green button floating near the bottom. _Action buttons_ can perform the following actions:
- In _workflow groups_, create tasks with surveys.
- In _communication/regular groups_, create new channels.
- In all groups, there can be links to any URL.

_The **actions button** will look something like the image below:_
<img alt="fab secondary actions" class="img_sizing item shadow--lw" src={useBaseUrl('img/admin_groups_fab_secondary_actions.png')} />
<br/>