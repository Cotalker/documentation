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

- **<span className="badge badge--warning">1.</span> System Message**: Whenever a task undergoes a change, like a change of state or setting, a system message appears on the chat indicating the change. Some automations also send system messages to alert users of actions that are taking place automatically.
- **<span className="badge badge--primary">2.</span> User Message**: Users associated with the task can send messages and files into the chat area. Some tasks may be configured to have users can [initiate a bot's routine with a slash command](/docs/tutorials/basic/create_bot#result) in the chat area.
- **<span className="badge badge--danger">3.</span> Send File**: You can send various types of files that can be downloaded or viewed by users through the chat area.
- **<span className="badge badge--danger">4.</span> Actions Button**: Opens the _Actions Menu (7)_. If configured, users can change the task's state either manually or by filling out a form.
- **<span className="badge badge--danger">5.</span> Text Input Area**: Users can write, place emojis, and even paste images through this area.
- **<span className="badge badge--danger">6.</span> Emoji**: Add emojis to your messages.
- **<span className="badge badge--success">7.</span> Actions Menu**: Actions, such as state change or opening a survey form, can appear on this menu. The actions vary, depending on the workflow's configuration.


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
