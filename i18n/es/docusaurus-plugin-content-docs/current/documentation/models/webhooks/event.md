---
title: Triggering Event
sidebar_label: COTEvent
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<span className="hero__subtitle">COTEvent</span>

## Description {#description}

The COTEvent data model is the information that the webhook sends to the external server. COTEvent data can be viewed in [webhook logs](/docs/documentation/admin/admin_webhooks#logs) or as an object within [COTWebhookLog.event](/docs/documentation/models/webhooks/webhooklog).


## JSON Sample {#sample}
_Below is a sample of a user modification event that triggered a webhook:_

```json
{
    "company": "625bc5429a54e8868bd89be2",
    "type": "COTUser",
    "extraData": null,
    "createdAt": "2022-04-27T21:28:15.186Z",
    "data": {
        "_id": "6261612a8f1e9999775c8be4",
        "accessRoles": [
            "6261612a8f1e995c115c8cbb"
        ],
        "avatar": {
            "small": "",
            "square": "",
            "original": ""
        },
        "companies": [
            {
                "hierarchy": {
                    "boss": [],
                    "peers": [],
                    "subordinate": []
                },
                "_id": "612ea6594846150009ef2dc0",
                "companyId": "626161128f1e9939e05c6ae5"
            }
        ],
        "createdAt": "2022-04-21T13:50:34.390Z",
        "email": "mechanic@acme.com",
        "emailIsVerified": false,
        "job": "6261612a8f1e99006c5c8eea",
        "jobTitle": "mechanic",
        "modifiedAt": "2022-04-21T13:50:34.390Z",
        "name": {
            "displayName": "",
            "names": "Mechanic Profile I",
            "lastName": "",
            "secondLastName": ""
        },
        "password": "XW1879594653754399642348==",
        "phone": "",
        "properties": [
            "6261612a8f1e996a815c8c0d",
            "6261612a8f1e992c5e5c8c3e",
            "6261612a8f1e991f545c8c25"
        ],
    },
    "event": "edit",
    "diff": {
        "/name/names": {
            "previous": "Mechanic Profile I",
            "changedTo": "Thomas"
        },
        "/name/lastName": {
            "previous": "",
            "changedTo": "Gardner"
        },
        "/properties": {
            "previous": [
                "6261612a8f1e996a815c8c0d",
                "6261612a8f1e992c5e5c8c3e",
                "6261612a8f1e991f545c8c25"
            ],
            "changedTo": [
                "627bc5a506dd19c495586ab2",
                "627bc5ac63e69ded582c9f2c",
                "627bc5b13040edfcdee4a499"
            ]
        }
    }
}
```

## Fields {#fields}

Field | Description | [Type](/docs/documentation/models/overview_model#data-types) | Notes
--- | --- | --- | ---
**company** | Indicates the ObjectId of the company in which the event was triggered. | [ObjectId<COTCompany\>](/docs/documentation/models/model_company) |
**createdAt** | Displays the time and date the event was created. | ISODate | YYYY-MM-DDTHH:mm:ss.SSSZ
**data** | Contains the corresponding event data that triggered the webhook. Depending on the trigger type, the data is structured with either task, user, or survey data models. | [COTTask](/docs/documentation/models/tasks/model_tasks), [COTUser](/docs/documentation/models/users/model_users), or [COTSurveyExecution](/docs/documentation/models/webhooks/survey_execution) |
**diff** | When the triggering object is modified, this field displays its current and previous data. | object | The `diff` field consists of an object containing the changed fields, and each changed field is an object itself with the previous and current changes.
**event** | Indicates the event type, i.e., whether an object was created, modified, or removed. | string | Options are `create`, `edit`, or `delete`.
**extraData** | Contains any extra data the webhook sends. | Depends on the type of data sent. | Usually set to `Null`.|
**type** | Indicates the type of object that triggered the webhook, i.e., task, user, or survey. | string | Options are `COTTask`, `COTUser`, or `COTSurvey`



## Additional Resources {#additional-resources}
- [Webhooks Section](/docs/documentation/admin/admin_webhooks): Administrative Panel Settings
- [Webhook REST API Documentation](/docs/documentation/api/automations/webhooks): Webhook API requests

## Help {#help}

- [Cotalker Platform Community](https://github.com/Cotalker/documentation/discussions): post your questions or search for previous answers given in the forum