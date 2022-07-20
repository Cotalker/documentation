---
title: Webhook Log
sidebar_label: COTWebhookLog
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<span className="hero__subtitle">COTWebhookLog</span>

## Description {#description}
_COTWebhookLog_ objects contain all of an event's webhook log data. The data sent through the webhook and received by the server is stored within the `COTWebhookLog.event` field. The `COTWebhookLog` can also be accessed in the [webhook logs](/docs/documentation/admin/admin_webhooks#logs).

## JSON Sample {#sample}
_Below is a sample of a returned COTWebhookLog object:_
```json
{
    "_id": "62742dd824c886d54e60f02b",
    "company": "625bcbdcc9a8e3a86dbf041c",
    "createdAt": "2022-05-05T20:04:40.084Z",
    "status": 409,
    "retry": 3,
    "response": "connect ETIMEDOUT 67.225.146.248:443",
    "event": {
        "company": "625bcbdcc9a8e3a86dbf041c",
        "type": "COTTask",
        "extraData": null,
        "createdAt": "2022-05-05T19:54:29.924Z",
        "data": {
            "public": {
                "isActive": false,
                "language": "english",
                "title": "",
                "response": ""
            },
            "answers": [
                "62742b57612dc2ecc1219d98"
            ],
            "indentation": 0,
            "isActive": true,
            "isValid": false,
            "activeSlas": [],
            "validators": [],
            "editors": [
                "6261612d9fa3b40007c2ecc1"
            ],
            "followers": [],
            "visibility": [],
            "subscribers": [],
            "userList": [
                "6261612d9fa3b40007c2ecc1"
            ],
            "color": "none",
            "formMessage": [],
            "language": "english",
            "_id": "62742b7562f37034d9399914",
            "name": " Equipment sector 1 - Equipment 1-A",
            "relativeWeight": 1,
            "assignee": "6261612d9fa3b40007c2ecc1",
            "startDate": "2022-05-05T19:54:29.117Z",
            "endDate": "2022-05-19T13:00:00.000Z",
            "channel": "62742b759d46b3000797f1a0",
            "status1": "6261612a8f1e997b825c8c10",
            "status3": "6261612a8f1e993e995c8c2e",
            "status4": "6261612a8f1e9941ba5c8c0e",
            "status5": "6261612a8f1e99e6925c8c44",
            "createdBy": "6261612a8f1e99b1875c8bed",
            "company": "625bcbdcc9a8e3a86dbf041c",
            "taskGroup": "6261612a8f1e99002e5c8cce",
            "owner": "manual",
            "weight": 0,
            "projectCode": "62742b759d46b3000797f201",
            "createdAt": "2022-05-05T19:54:29.819Z",
            "status": "6261612a8f1e99872d5c8c00",
            "smState": "6261612a8f1e99c4365c8ce5",
            "smStateMachine": "6261612a8f1e993d065c8cd5",
            "modifiedStateAt": "2022-05-05T19:54:29.838Z",
            "closedAt": null,
            "asset": "62742b759d46b3000797f1fc",
            "serial": 5,
            "modifiedAt": "2022-05-05T19:54:29.899Z",
            "__v": 0
        },
        "event": "create"
    },
    "subscription": "62685990d918fb5557f9f992",
    "__v": 0
}
```

## Fields {#fields}

Field | Description | Type | Notes
--- | --- | --- | ---
**company** | Displays the ObjectId of the company in which the triggering event was set off. | [ObjectId<COTCompany\>](/docs/documentation/models/model_company)
**createdAt** | Indicates the date and time the webhook sent the data to the server. | ISODate | YYYY-MM-DDTHH:mm:ss.SSSZ
**event** | Contains the triggering event data that is sent to the external server. | [COTEvent](/docs/documentation/models/webhooks/event) |
**retry** | Indicates the number of times the webhook has tried to send the data to the external server. | number | If a webhook fails to successfully send data to the external server, it will resend the data in thirty seconds and will try it up to three times.
**subscription** | Indicates the webhook the logged event is related to. | [ObjectId<Webhook\>](/docs/documentation/models/webhooks/webhook) |
**response** | Displays the external server response. | string |
**status** | Displays the status code returned by the external server. | number | Status codes ranging from 200-209 are interpreted as a SUCCESS. Returned status codes in the range of 300's, 400's, 500's are considered as FAILED.


## Additional Resources {#additional-resources}
- [Webhooks Section](/docs/documentation/admin/admin_webhooks): Administrative Panel Settings
- [Webhook REST API Documentation](/docs/documentation/api/automations/webhooks): Webhook API requests

## Help {#help}

- [Cotalker Platform Community](https://github.com/Cotalker/documentation/discussions): post your questions or search for previous answers given in the forum