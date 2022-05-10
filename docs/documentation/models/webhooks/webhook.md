---
title: Webhook Event
sidebar_label: COTWebhook
---
import useBaseUrl from '@docusaurus/useBaseUrl';

## Description {#description}

[Webhooks](/docs/documentation/admin/admin_webhooksd) are set up to send specified event data to an indicated server. When the specified event occurs, the webhook trigger is activated and the event's data is sent to the server. Webhooks can be triggered by _user_, _task_, or _survey_ events.

A webhook's configuration is stored within a COTWebhook object. The COTWebhook contains the webhook's name, information regarding the triggering event, and the server URL to which the data is sent.

## Response Sample: {#sample}

```json
{
   "_id": "62685990d918fb5557f9f992",
   "company": "626161128f1e9939e05c6ae5",
   "isActive": true,
   "trigger": "create-edit-delete-survey",
   "url": "https://www.test.com",
   "name": "test",
   "code": "test",
   "context": {
       "survey": "6261612a8f1e99e93f5c8d03",
       "group": "6261612a8f1e994b765c8cc8",
       "taskGroup": ""
       },
   "__v": 0
   }
```
Field | Description | Type | Notes
--- | --- | --- | ---
**_id** | The webhook's ObjectId. The ObjectId is used to identify the webhook. | ObjectId<COTWebhook\> | 
**company** | Indicates the ObjectId of the company in which the webhook is found in. | [ObjectId<COTCompany\>](/docs/documentation/models/model_company) |
**isActive** | Indicates whether the webhook is active or not. | boolean | 
**trigger** | Specifies the type of event that triggers the webhook. Triggers can be set to go off when a user, task, or survey is created, modified, or deactivated. <br/>Available options include: <br/>- `create-edit-delete-user`<br/>- `create-edit-delete-task`<br/>- `create-edit-delete-survey` | string | 
**url** | Indicates the URL address of the server to which the event data is sent. | string | Server URLs are provided by external systems or third-parties.
**name** | Indicates the webhook's name. | string | We recommend using a descriptive name for the webhook.
**code** | Indicates the webhook's identification code. The code must be unique. Only lowercase letters, numbers, and underscores can be used. | string |
**context** | Contains the event trigger's details. The fields used will depend on the selected event type.| object | 
**context.survey** |
**context.group** |
**context.taskGroup** |
