---
title: Webhooks Section
sidebar_label: Webhooks
---

:::caution Advertencia
Esta página aún no se encuentra traducida al español.
:::
import useBaseUrl from '@docusaurus/useBaseUrl';

<img alt="design" className="img_title" src={useBaseUrl('img/design/Main_menu.svg')} />


## Overview {#overview}

Configure _webhooks_ to set triggers that automatically send event data to another server in real time. This feature allows data collected by Cotalker to be sent and used in other systems. For example, a user can submit a form powered by Cotalker, and the data is immediately sent to an external server for further use. Things like purchase orders, maintenance notifications, and much more can be easily shared with other systems. Webhooks expand Cotalker's capabilities, making it the all-in-one solution your company needs.

Webhooks can be set for various types of triggers: _users_, _tasks_, _surveys_, and _elements_. The webhook sends the event's data to the specified server whenever the selected type is created, modified, or removed. _User logout_ can also be set as a webhook trigger.

:::info
- Sequential webhook triggers are always sent and received in the corresponding order in case of a server failure. Let's say an event type is set off more than once, the events will be sent in linear order. This means that following events will be sent only after the previous event is received by the server. For example, let's say three tasks have been created, the first task event is sent automatically, the second is sent after the server receives the first one, and the third after the second.
- If a webhook fails, after 30 seconds it will try –up to two more times– to send the triggered event data to the server.
:::

:::note
External servers must be configured by their corresponding admins to receive the webhook data.
:::

## Accessing Webhooks {#access}

_To access the **Webhooks** sections:_

<img alt="access webhooks" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_webhooks_00.png')} />
<br/>

<div className="margin-left--lg">

1. Press <span className="badge badge--primary">Administrator</span> on the **Main Menu Bar**.
2. In the **Administrative Panel**, select <span className="badge badge--primary">Webhooks</span>.
3. The [**Webhooks Panel**](#layout) opens up.

</div>

<div className="alert alert--secondary">

## Webhooks Panel Layout {#layout}

From this panel, you can create, edit, and disable _webhooks_.

<img alt="main panel layout" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_webhooks_01.png')} />
<br/>

<div className="margin-left--lg">

_Actions:_
- **1. Create Webhook**: Allows you to [create a webhook](#create).
- **2. More options**: Allows displaying disabled webhooks.

_Table and Options:_
- **A. Checkbox**: Permits selecting one or more webhooks for deactivation.
- **B. Name**: The Webhook's name. Descriptive names are recommended.
- **C. Trigger**: Indicates the type of event that triggers the webhook.
- **D. Url**: Indicates the server URL to which the webhook sends the data.
- **E. Edit**: Allows you to [edit a webhook](#edit).

</div>

</div>
<br/>


## Create Webhook {#create}
To create a webhook, press the <span className="badge badge--primary">+</span> icon in the upper right corner. The [**Settings Panel**](#settings) opens up.

<img alt="create webhook" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_webhooks_02.png')} />
<br/>


## Edit Webhook {#edit}
To edit an existing webhook, press the _pen_ icon on the corresponding row. The [**Settings Panel**](#settings) opens up.

<img alt="edit webhooks" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_webhooks_03.png')} />
<br/>

<div className="alert alert--secondary">

## Settings Panel {#settings}

_The webhooks settings panel is described below:_

<img alt="settings panel" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_webhooks_04.png')} />
<br/>

<div className="margin-left--lg">

_Actions:_
- **1. Activate/Deactivate**: Permits activating disabled webhooks and vice versa.
- **2. Save**: Saves the current configuration.

_Configuration:_
- [**A. General information**](#general-information): Basic webhook settings.
- [**B. Logs**](#logs): Registers each time an event triggers the webhook.

</div>

</div>
<br/>

<div className="alert alert--secondary">

### A. General information {#general-information}

<img alt="" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_webhooks_05.png')} />
<br/>

<div className="container box">
<div className="row table-row-1">
<div className="col col--3"><b>Name</b></div>
<div className="col col--5">Indicates the webhook's name.</div>
<div className="col col--4"><em>We recommend always using descriptive names.</em></div>
</div>
<div className="row table-row-2">
<div className="col col--3"><b>Code</b></div>
<div className="col col--5">

This is the webhooks unique identification. Only lowercase letters, numbers, and underscores are allowed. After filling out the `Name` field, the system automatically generates a suggestion for the `Code`.

</div>
<div className="col col--4"><em>Once saved, the Code cannot be modified.</em></div>
</div>
<div className="row table-row-1">
<div className="col col--3"><b>Url</b></div>
<div className="col col--5">Indicates the server that receives the data from the webhook.</div>
<div className="col col--4"><em>Ask your admin or company's IT support for the proper URL.</em></div>
</div>
<div className="row table-row-2">
<div className="col col--3"><b>Description</b></div>
<div className="col col--5">Provides a brief description of what the webhook does.</div>
<div className="col col--4"><em>Keep this item simple for future reference.</em></div>
</div>
<div className="row table-row-1">
<div className="col col--3"><b>Trigger</b></div>
<div className="col col--5">

Indicates the type of event that triggers the webhook.  
Events are classified into three groups: 
- Create/Edit/Remove User
- Create/Edit/Remove Task
- Create/Edit/Remove Survey  
- Create/Edit/Remove Element
- User Logout

Upon any change, i.e., creation, modification, or deletion of the indicated event, the webhook is automatically triggered and sends the event data to the server.

</div>
<div className="col col--4"><em>

When _task_ events are chosen, the **Workflow** field appears to indicate the workflows to be monitored.  
When _survey_ events are chosen, the **Survey** and **Group** fields appear to indicate the groups and surveys to monitor.

</em></div>
</div>
<div className="row table-row-2">
<div className="col col--3"><b>Identifier</b></div>
<div className="col col--5">Indicates the webhook's ObjectId. It is useful to have when working with API webhook tools.</div>
<div className="col col--4"><em>The identifier is automatically generated and cannot be configured manually.</em></div>
</div>
</div>

</div>
<br/>

<div className="alert alert--secondary">

### B. Logs {#logs}

<img alt="logs" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_webhooks_06.png')} />
<br/>

<div className="container box">
<div className="row table-row-1">
<div className="col col--3"><b>Result</b></div>
<div className="col col--5">Returns either a SUCCESS or FAILED response indicating whether the webhook event was successfully received by the server or not.</div>
<div className="col col--4"><em></em></div>
</div>
<div className="row table-row-2">
<div className="col col--3"><b>Execution Date</b></div>
<div className="col col--5">This is the date and time the webhook event was triggered</div>
<div className="col col--4"><em>Events are displayed in according to their execution date, from newest to oldest.</em></div>
</div>
<div className="row table-row-1">
<div className="col col--3"><b>Status</b></div>
<div className="col col--5">Inicates the status code the server returned after being contacted by the webhook.</div>
<div className="col col--4"><em>

Status codes ranging from 200-209 are interpreted as a SUCCESS.  
Returned status codes in the range of 300's, 400's, 500's are considered as FAILED.

</em></div>
</div>
<div className="row table-row-2">
<div className="col col--3"><b>Logs</b></div>
<div className="col col--5">

Opens a panel with event data that was sent and the response from the server. Event data is sent in JSON format and follow the [COTTask](/docs/documentation/models/tasks/model_tasks), [COTUser](/docs/documentation/models/users/model_users), and [COTSurveyExecution](/docs/documentation/models/webhooks/survey_execution) data model structures, respectively.

</div>
<div className="col col--4"><em>

Log data can be easily copied to your clipboard for further use.  
Below are some log examples taken from _user_ and _task_ triggers.

</em></div>
</div>
<br/>

_Log sample of **user** event trigger:_

<img alt="user log sample" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_webhooks_07.png')} />
<br/>

<div className="margin-left--lg">

In this case, a user's name and avatar were changed. Only the edited [COTUser](/docs/documentation/models/users/model_users) fields are sent.

</div>
<br/>

_Task event log:_

<img alt="task log sample" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_webhooks_08.png')} />
<br/>

<div className="margin-left--lg">

This log contains a [COTTask](/docs/documentation/models/tasks/model_tasks) data model and was triggered by the creation of a task within the specific workflow.

</div>
<br/>

</div>

</div>
<br/>


## Related Topics {#related-topics}
- [Webhooks API Documentation](/docs/documentation/api/automations/webhooks): API tools for configuring webhooks and obtaining the data they send.
- [COTWebhook](/docs/documentation/models/webhooks/webhook): Data model in which a webhook's configuration is stored.
