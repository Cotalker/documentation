---
title: Channel Workspace
---

import useBaseUrl from '@docusaurus/useBaseUrl'; 

## Introduction {#introduction}
Channels allow quick and transparent communication between people working on a _task_ or project. At first, a _channel_ looks primarily like a *chatroom*, but they are much more than that:

- All channels exist within [regular or workflow groups](/docs/documentation/client/taskview).
- If the channel is found within a [workflow group](/docs/documentation/client/groups#workflow-groups) and is associated with a [task](/docs/documentation/client/taskview), you can configure a task, change its state, and interact with those involved.
- All channels can be set up with [surveys](/docs/documentation/client/surveys) that users can fill out and send.
- Depending on access roles, users can include other users into the channel.

:::note How to create new channels
- In [standard groups](/docs/documentation/client/groups#regular-groups), new channels can be created using the [group panel's](/docs/documentation/client/groups#group-panel) [_actions button_](/docs/documentation/client/actions_button).
- In [workflow groups](/docs/documentation/client/groups#workflow-groups), new channels are created along with [tasks](/docs/documentation/client/taskview).
:::

## How to access a Channel
_From the [group panel](/docs/documentation/client/groups#group-panel), select a channel from the list, the channel's workspace will then open up:_

<img alt="layout" className="img_sizing item shadow--tl" src={useBaseUrl('img/client_channels_00a.png')} />
<br/>
<br/>

<div className="alert alert--secondary">

## Channel Workspace Layout

<img alt="layout" className="img_sizing item shadow--tl" src={useBaseUrl('img/client_channels_00.png')} />
<br/>

1. **Title Bar**: Displays channel name and users. If a task is associated with a channel, press the title bar to slide open the task's configuration panel. If the channel is part of a standard group, press the title bar to contact other users directly or view shared media and files.
2. **Chat Area**: Displays messages, files, images, emojis, task state updates, bot interactions, and more. [Click here for more details.](#chat-message-options)
3. **Attachment Icon**: Press to add files you wish to share. Or you can simply drag and drop files in the chat area.
4. **Actions Button**: Direct access to actions allowed in the channel. Actions can be filling out a survey or changing a task's state. [Click here for more details.](#task-menus-within-channel)
5. **Text Input Area**: Send text messages to chat; emojis can be added. HTML code can also be used to format text. Some channels can be configured to accept slash commands, e.g., `/command` can be programmed to summon a bot that will carry out a preconfigured automated routine.

</div>
<br/>

## Channel Workspace Details {#channel-workspace-details}
_Further details about options available in the channel workspace._

<div className="alert alert--secondary">

### Chat Message Options {#chat-message-options}

Right-click (or long-press on mobile devices) chat message bubbles in the channel to open up a menu with the following options:
- **React**: Add an emoji reaction to a message. Click on emojis given by other users to add your reaction to the counter. To retract from a _reaction_, find the emoji you sent on the message bubble and click on it. There is also an emoji _search_ option and a _recently used_ section. 👍 👎 😄 🎉 😕 ❤️ 🚀 👀
- **Reply**: Send a message with the original message and author embedded. Only the first three lines of the original message will be displayed. You can reply to more than one message at a time. You can respond to anything sent through the chat, i.e., files, media, surveys, etc.
- **Copy**: Copy text messages to your clipboard.
- **Delete**: Delete a message _you_ have sent. This option is available only up to 24 hours after you have sent the message.

_Examples of replies to text, video, and surveys, respectively:_
<img alt="chat response text" className="img_sizing item shadow--tl" src={useBaseUrl('img/client_groups_chatresponse_03.png')} />
<br/>

_Examples of emoji reactions:_
<img alt="chat response text" className="img_sizing_small item shadow--tl" src={useBaseUrl('img/client_channels_emoji_list.png')} />
<br/>

<img alt="chat response text" className="img_sizing_small item shadow--tl" src={useBaseUrl('img/client_groups_chatresponse_emoji.png')} />
<br/>

</div>
<br/>

<div className="alert alert--secondary">

### Actions Button {#task-menus-within-channel}
In channels associated with a task, you can change a _task's_ state from the channel's _actions button_.
If configured, you can answer any survey associated with the channel by pressing the _actions button_.

_The actions button is found near the bottom of the channel workspace:_
<img alt="task change state menu" className="img_sizing item shadow--tl" src={useBaseUrl('img/client_channels_actions_00.png')} />
<br/>

</div>
<br/>

<div className="alert alert--secondary">

### Task Side Panel {#task-side-panel}
In channels associated with tasks, click anywhere on the title bar found on the top of the channel workspace to slide open the task configuration panel.

_The following image shows how to open the side panel:_
<img alt="task change state menu" className="img_sizing item shadow--tl" src={useBaseUrl('img/client_channels_taskpanel_00.png')} />
<br/>

From the task configuration panel: 
- view and edit task settings
- view shared media and files 

</div>
<br/>

:::tip
Changing task states or configurations require appropriate access roles. Ask your admin for more details in case you need access to these options.
:::

<div className="alert alert--secondary">

### Enriched Messages {#enriched-messages}

Enriched messages contain extra information that pops over certain words when the mouse cursor hovers over them, i.e., links, keywords, contacts, and tasks.

When _users_ send a URL link (with the _http://_ or _https://_ prefix included) in a message, it is automatically converted to the enriched format. See example below:

<img alt="url enriched" className="img_sizing item shadow--tl" src={useBaseUrl('img/client_channel_message_00.gif')} />
<br/>

---

:::info
The following enriched message types can be viewed in any channel but can **only** be sent by [posting an API request to the message endpoint](/docs/documentation/api/communication/messages).
:::

_Example of an enriched message sent by a system bot:_

<img alt="url enriched" className="img_sizing item shadow--tl" src={useBaseUrl('img/client_channel_message_01.gif')} />
<br/>

#### Enriched Task Message Type

<img alt="url enriched" className="img_sizing item shadow--tl" src={useBaseUrl('img/client_channel_message_02.png')} />
<br/>

<div className="margin-left--lg">

- **A. Highlighted text**: Task information pops up when hovering over the text. Click on the text to go to the task workspace.
- **B. Go to task**: Press this button to go to the task's workspace.
- **C. Chat icon**: Press the icon to send a direct message to the task assignee.

</div>
<br/>

#### Enriched Contact Message Type

<img alt="url enriched" className="img_sizing item shadow--tl" src={useBaseUrl('img/client_channel_message_03.png')} />
<br/>

<div className="margin-left--lg">

- **A. Highlighted text**: Contact information pops up when hovering over the text. Click the text to send a direct message to the contact.
- **B. Direct message**: Press this button to send a message to the contact.
- **C. Copy icon**: Press the icon to copy the contact's email to the clipboard.

</div>
<br/>

#### Enriched Hover Message Type

<img alt="url enriched" className="img_sizing item shadow--tl" src={useBaseUrl('img/client_channel_message_04.png')} />
<br/>

<div className="margin-left--lg">

- **A. Highlighted text**: Special information concerning the highlighted word pops up when hovering over the text. 
- **B. Card**: The card contains images and text. A scroll bar is included for longer texts.

</div>
<br/>

#### Enriched Link Message Type

<img alt="url enriched" className="img_sizing item shadow--tl" src={useBaseUrl('img/client_channel_message_05.png')} />
<br/>

<div className="margin-left--lg">

- **A. Highlighted text**: Web page information appears when hovering over the text. Click the text to open the link.
- **B. Go to site**: Press the button to open the link in a new tab.

</div>
<br/>

</div>
<br/>