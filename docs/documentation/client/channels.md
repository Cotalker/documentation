---
title: Channel Workspace
---

import useBaseUrl from '@docusaurus/useBaseUrl'; 

## Introduction {#introduction}
Channel Workspaces allow quick and transparent communication between people working on a _task_ or project. At first, a _channel_ looks primarily like a *chatroom*, but they are much more than that:

- Chat channels exist within [regular and workflow groups](/docs/documentation/client/taskview).
- If the chat channel is found within a [workflow group](/docs/documentation/client/groups#workflow-groups) and is associated with a [task](/docs/documentation/client/taskview), you can configure the task, change its state, and interact with those involved.
- All channel workspaces can contain [surveys](/docs/documentation/client/surveys) that users can fill out and send.
- Depending on access roles, users can include other users into the channel workspace.

:::note How to create new channels
- In [standard groups](/docs/documentation/client/groups#regular-groups), new chat channels can be created using the [group panel's](/docs/documentation/client/groups#group-panel) [_actions button_](/docs/documentation/client/actions_button).
- In [workflow (task) groups](/docs/documentation/client/groups#workflow-groups), new chat channels are automatically created along with [tasks](/docs/documentation/client/taskview).
:::

## Accessing the Channel Workspace

### From Workflow Groups {#access-task}
_To access a channel workspace from the task group:_

<img alt="layout" className="img_sizing item shadow--tl" src={useBaseUrl('img/client_task_channel_workspace_00.png')} />
<br/>

<div className="margin-left--lg">

1. Go to the **Main Menu Bar** and select the desired task group.
2. Select the task to be viewed.
3. The channel workspace opens up.

</div>

### From Standard Groups {#access-standard}
_To access a channel from the group view:_

<img alt="layout" className="img_sizing item shadow--tl" src={useBaseUrl('img/client_channels_00a.png')} />
<br/>

<div className="margin-left--lg">

1. Go the **Main Menu Bar**, select the _standard group_ the channel is found in to open the [_group panel_](/docs/documentation/client/groups#group-panel).
2. From the **group panel**, select a _channel_ from the list.
3. The channel's workspace will then open up. The layout is explained below.

</div>

<br/>

## Channel Workspace Layout {#layout}

<div className="alert alert--secondary">

### In Workflow Groups {#task-layout}

<img alt="layout" className="img_sizing item shadow--tl" src={useBaseUrl('img/client_task_channel_workspace_01.png')} />
<br/>

<div className="margin-left--lg">

1. **Title Bar**: Displays the task's name and users associated with it.
2. **Files**: Access [_notes_](/docs/documentation/client/notes#accessing-task-notes) associated with the task.
3. **Chat**: Access the task's _channel workspace_.
4. **Details**: Open the task's [settings panel](/docs/documentation/client/taskview#modifying-tasks).
5. **Chat Area**: Displays messages, files, images, emojis, system messages, bot interactions, and more. [Click here for more details.](#chat-message-options)
6. **Attachment Icon**: Press to add files you wish to share. Or you can simply drag and drop files in the chat area.
7. **Actions Button**: Direct access to allowed task actions. Actions can include filling out a survey or changing a task's state. [Click here for more details.](#task-menus-within-channel)
8. **Text Input Area**: Send text messages to chat; emojis can be added. HTML code can also be used to format text. Some channels can be configured to accept slash commands, e.g., `/command` can be programmed to summon a bot that will carry out a preconfigured automated routine.


</div>

</div>
<br/>

<div className="alert alert--secondary">

### In Standard Groups {#standard-layout}

<img alt="layout" className="img_sizing item shadow--tl" src={useBaseUrl('img/client_channels_00.png')} />
<br/>

<div className="margin-left--lg">

1. **Title Bar**: Displays channel name and users. Press the title bar to slide open the settings panel.
2. **Chat Area**: Displays messages, files, images, emojis, system messages, bot interactions, and more. [Click here for more details.](#chat-message-options)
3. **Attachment Icon**: Press to add files you wish to share. Or you can simply drag and drop files in the chat area.
4. **Actions Button**: Direct access to actions allowed in the channel. Actions can include filling out a survey or changing a task's state. [Click here for more details.](#task-menus-within-channel)
5. **Text Input Area**: Send text messages to chat; emojis can be added. HTML code can also be used to format text. Some channels can be configured to accept slash commands, e.g., `/command` can be programmed to summon a bot that will carry out a preconfigured automated routine.
6. **General information**: Appears on the settings panel. Lists users on the channel and permits changing the workspace's avatar. The settings panel is accessed by clicking the workspace's _title bar_.
7. **Images, Videos, Files**: Access files, images, and videos shared on the channel.

</div>

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
If configured, you can also answer any survey associated with the channel by pressing the _actions button_.

_The actions button is found near the bottom of the channel workspace:_
<img alt="task change state menu" className="img_sizing item shadow--tl" src={useBaseUrl('img/client_channels_actions_00.png')} />
<br/>

</div>
<br/>

<div className="alert alert--secondary">

### Settings Side Panel {#task-side-panel}
Click anywhere on the title bar found on the top of the channel workspace to slide open the settings panel.

_The following image shows how to open the side panel:_
<img alt="task change state menu" className="img_sizing item shadow--tl" src={useBaseUrl('img/client_channels_taskpanel_00.png')} />
<br/>

From the settings panel: 
- View and edit task and channel settings.
- View shared media and files.

</div>
<br/>

:::tip
Changing task states or configurations requires appropriate access roles. Ask your admin for more details in case you need access to these options.
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