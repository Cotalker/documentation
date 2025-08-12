---
title: Task Chat
sidebar_label: Chat
---
import useBaseUrl from '@docusaurus/useBaseUrl'; 

Every task counts with its own chat area through which associated users can communicate with each other and interact with the workflow.

The task chat area is available on the **Task View's** _List_ and _Kanban_ views, as well as on the **Group View**.

_Here's an example of the chat area:_

<img alt="task workspace" className="img_sizing item shadow--tl" src={useBaseUrl('img/task_workspace_access_01.gif')} />
<br/>

Through the Chat Area, depending on user permissions and workflow configurations, users associated with a task can:
- read and write messages
- send files
- answer survey forms
- read system messages
- summon bots or predefined automations
- change task state


## Chat Area Layout {#layout}

<img alt="task chat" className="img_sizing_small item shadow--tl" src={useBaseUrl('img/task_chat_00.png')} />
<br/>

- **<span className="badge badge--warning">1.</span> System Message**: Whenever a task undergoes a change, like a change of state or setting, a 
system message appears on the chat indicating the change. Some automations also send system messages to alert users of actions that are taking place 
automatically.
- **<span className="badge badge--primary">2.</span> User Message**: Users associated with the task can send messages and files into the chat area. 
Some tasks may be configured to have users can [initiate a bot's routine with a slash command](/docs/tutorials/basic/create_bot#result) in the chat 
area.
- **<span className="badge badge--danger">3.</span> Action Button**: Opens the actions menu, allowing users to perform actions like changing the task state or opening a survey form.
- **<span className="badge badge--danger">4.</span> Text Input Area**: Area where users can type messages, insert emojis, or paste images.
- **<span className="badge badge--danger">5.</span> Emojis**: Add emojis to your messages to express emotions or reactions.
- **<span className="badge badge--danger">6.</span> Attach File**: Attach and send files for other users to download or view.
- **<span className="badge badge--danger">7.</span> Attach Photo**: Attach and send photos directly in the chat area.


## New Message Notifications {#new-message}

<img alt="task message notification" className="img_sizing item shadow--tl" src={useBaseUrl('img/task_chat_01.png')} />
<br/>

<div className="margin-left--lg">

**New message notification icons** appear on the _Main Menu_ and **tasks** on either _task_ or _group views_. Both new **user** and **system messages** display the notification icon. By simply clicking on the _task_, you open the chat area to read and respond messages.

</div>
<br/>

:::tip
For more information, please check out the [Channel Workspace](/docs/documentation/client/channels) section.
:::
