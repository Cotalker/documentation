---
title: Webhook
sidebar_label: COTWebhook
---

:::caution Advertencia
Esta página aún no se encuentra traducida al español.
:::
import useBaseUrl from '@docusaurus/useBaseUrl';

<span className="hero__subtitle">COTWebhook</span>

## Description {#description}

[Webhooks](/docs/documentation/admin/admin_webhooks) are set up to send specified event data to an indicated server. When the specified event occurs, the webhook trigger is activated, and the event's data is sent to the server. Webhooks can be triggered by _user_, _task_, _survey_, _elements_, or _user logout_ events.

A webhook's configuration is stored within a _COTWebhook_ object. The _COTWebhook_ contains the webhook's name, information regarding the triggering event, and the server URL to which the data is sent.

## JSON Sample: {#sample}

```json
{
    "_id": "62685990d918fb5557f9f992",
    "company": "625be93a286ef83c1c0e845f",
    "isActive": true,
    "trigger": "create-edit-delete-task",
    "url": "https://www.server.com",
    "name": "Work Orders Update",
    "code": "wo_update",
    "context": {
        "survey": "",
        "group": "",
        "taskGroup": "6261612a8f1e99002e5c8cce"
    },
    "__v": 0,
    "description": "Sends updates on Work Orders"
}
```
Field | Description | Type | Notes
--- | --- | --- | ---
**_id** | The webhook's ObjectId. The ObjectId is used to identify the webhook. | ObjectId<COTWebhook\> | 
**company** | Indicates the ObjectId of the company in which the webhook is found in. | [ObjectId<COTCompany\>](/docs/documentation/models/company/model_company) |
**isActive** | Indicates whether the webhook is active or not. | boolean | 
**trigger** | Specifies the type of event that triggers the webhook. Triggers can be set to go off when a _user_, _task_, ,_survey_, or _property_ is created, modified, or deactivated. _User logouts_ can also be set as triggers. <br/><br/>**Options are:** <br/>– `create-edit-delete-user` <br/>– `create-edit-delete-task` <br/>– `create-edit-delete-survey` <br/>– `create-edit-delete-property`<br/>– `logout-user` | string | Some triggers can be configured with special pararmeters. See the `contexts` field for details.
**url** | Indicates the URL address of the server to which the event data is sent. | string | Server URLs are provided by external systems or third-parties.
**name** | Indicates the webhook's name. | string | We recommend using a descriptive name for the webhook.
**code** | Indicates the webhook's identification code. The code must be unique. Only lowercase letters, numbers, and underscores can be used. | string |
**context** | Contains the event trigger's details. The fields used will depend on the selected event type.| object | 
**context.survey** | Contains the ObjectId of the survey to be monitored. | [ObjectId<COTSurvey\>](/docs/documentation/models/surveys/model_surveys) | This field is left with empty quotes when the trigger is not a survey.
**context.group** | Indicates the ObjectId of the group in which the survey to be monitored is found in. | [ObjectId<COTGroup\>](/docs/documentation/models/communication/model_groups) | This field is left with empty quotes when the trigger is not a survey.
**context.taskGroup** | This is the ObjectId of the task group in which tasks will be monitored. | [ObjectId<COTTaskGroup\>](/docs/documentation/models/tasks/model_taskgroup) | This field is left with empty quotes when the trigger is not a task.


## Additional Resources {#additional-resources}
- [Webhooks Section](/docs/documentation/admin/admin_webhooks): Administrative Panel Settings
- [Webhook REST API Documentation](/docs/documentation/api/automations/webhooks): Webhook API requests

## Help {#help}

- [Cotalker Platform Community](https://github.com/Cotalker/documentation/discussions): post your questions or search for previous answers given in the forum
