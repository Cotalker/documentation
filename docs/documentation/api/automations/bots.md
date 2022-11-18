---
title: Bots
sidebar_label: Bots
---
import useBaseUrl from '@docusaurus/useBaseUrl'; 
import Mermaid from '@theme/Mermaid';


## Overview {#overview}
A [_bot_](/docs/documentation/admin/admin_bots) is an automation that can be triggered either through a _survey_ or _slash command_ in the _channel workspace_. Once triggered, a bot runs a [routine](/docs/documentation/automation/admin_routine) based on the [stages or steps](/docs/documentation/automation/existing_routines) that were programmed.


:::tip additional resources
These are just some of the most basic API requests. For a complete list of endpoints, consult our [API documentation on Swagger](https://www.cotalker.com/swagger/core/?key=woubtjf4olr0t4zgutuwn6scbcm6hd3qh1cgl5obmohpbm3mfublnwcvv67lodgjvd3h86s9ppshtvmf95gepsqh6nizq9liu7f#/).
:::

## Get All Bots {#get-all}
_Returns all the bots that exist within the company._

<span className="hero__subtitle"><span className="badge badge--success">GET</span> /bots</span>

#### Endpoint URL {#get-task-groups-url}
`https://www.cotalker.com/api/v1/bots`

#### Headers {#get-all-headers}
Header | Description | Required | Values
--- | --- | --- | ---
**Authorization** | Sends your _access token_ to make an API request.<br/>[Click here to see how to obtain an _access token_.](/docs/documentation/api/auth#how-to) | Required | Bearer $ACCESS_TOKEN

#### Request Sample {#get-all-request}
```bash
curl --location --request GET 'https://www.cotalker.com/api/v1/bots' \
--header 'Authorization: Bearer $ACCESS_TOKEN'
```

#### Response Sample {#get-all-response}
Responses follow the [**COTBots**](/docs/documentation/models/automations/model_bots) data model.

---

## Get Bot by Id {#get-by-id}
_Returns the bot indicated by its Id._

<span className="hero__subtitle"><span className="badge badge--success">GET</span> /bots/&#123;id&#125;</span>

#### Endpoint URL {#get-by-id-url}
`https://www.cotalker.com/api/v1/bots/{id}`

#### Path Parameters {#get-by-id-path}
Parameter | Description | Type | Required | Notes
--- | --- | --- | --- | ---
**id** | The ObjectId of the _bot_ that is to be returned. | [ObjectId<COTBot\>](/docs/documentation/models/automations/model_bots) | Required |

#### Headers {#get-by-id-headers}
Header | Description | Required | Values
--- | --- | --- | ---
**Authorization** | Sends your _access token_ to make an API request.<br/>[Click here to see how to obtain an _access token_.](/docs/documentation/api/auth#how-to) | Required | Bearer $ACCESS_TOKEN

#### Request Sample {#get-by-id-request}
```bash
curl --location --request GET 'https://www.cotalker.com/api/v1/bots/618a69512c7cae88b3aa2fe3' \
--header 'Authorization: Bearer ACCESS_TOKEN'
```

#### Response Sample {#get-by-id-response}
The response follows the [COTBot](/docs/documentation/models/automations/model_bots) data model.

---

## Create a New Bot {#post-new}
_Creates a new bot within the company._

<span className="hero__subtitle"><span className="badge badge--info">POST</span> /bots</span>

#### Endpoint URL {#create-statemachine-url}
`https://www.cotalker.com/api/v1/bots`

#### Headers {#create-statemachine-headers}
Header | Description | Required | Values
--- | --- | --- | ---
**Authorization** | Sends your _access token_ to make an API request.<br/>[Click here to see how to obtain an _access token_.](/docs/documentation/api/auth#how-to) | Required | Bearer $ACCESS_TOKEN
**Content-Type** | Indicates the body's format. | Required | application/json

#### Request Body {#create-statemachine-body}
_Only required fields are listed below. For a complete schema description, please go to the [COTBot data model](/docs/documentation/models/automations/model_bots). Unrequired fields that are not submitted are either filled in automatically or left blank._

Element | Description | Type | Required | Notes
--- | --- | --- | --- | ---
**name** | The bot's name. | string | Required |


#### Request Sample {#create-statemachine-request}
_Bot created with the minimum required fields._

```bash
curl --location --request POST 'https://www.cotalker.com/api/v1/bots' \
--header 'Authorization: Bearer $ACCESS_TOKEN' \
--data-raw '{
    "name": "test bot"
}'
```

#### Response Sample {#create-statemachine-response}
Go to [COTBot](/docs/documentation/models/automations/model_bots) for a complete description of the response.
```json {14}
{
    "parametrizedBot": {
        "default": {
            "stages": []
        },
        "stages": []
    },
    "version": 0,
    "process": "none",
    "isActive": true,
    "global": false,
    "extraData": [],
    "_id": "61adff87cc298ff6f5050283",
    "name": "test bot",
    "company": "6136968b580aaf2b0e49d844",
    "createdAt": "2021-12-06T12:14:17.323Z",
    "commands": [],
    "__v": 0
}
```

---

## Update State Machine {#patch-statemachine}
_Updates or edits the indicated bot._

<span className="hero__subtitle"><span className="badge badge--warning">PATCH</span> /bots/&#123;id&#125;</span>

#### Endpoint URL {#patch-statemachine-url}
`https://www.cotalker.com/api/v1/bots/{id}`

#### Path Parameters {#statemachine-parameters}
Parameter | Description | Type | Required | Notes
--- | --- | --- | --- | ---
**id** | The ObjectId of the _bot_ that is to be modified. | [ObjectId<COTBot\>](/docs/documentation/models/automations/model_bots) | Required |

#### Headers {#statemachine-headers}
Header | Description | Required | Values
--- | --- | --- | ---
**Authorization** | Sends your _access token_ to make an API request.<br/>[Click here to see how to obtain an _access token_.](/docs/documentation/api/auth#how-to) | Required | Bearer $ACCESS_TOKEN
**Content-Type** | Sets the body's format. | Required | application/json

#### Request Body {#statemachine-body}
_Only the fields that are being updated or added are required to be put into the body. For a complete schema description, please go to the [COTBot data model](/docs/documentation/models/automations/model_bots)._


#### Request Sample {#statemachine-sample}
_This request adds the way the bot is summoned and the routine it follows._
```bash
curl --location --request PATCH 'https://www.cotalker.com/api/v1/bots/61adff87cc298ff6f5050283' \
--header 'Authorization: Bearer $ACCESS_BOT' \
--header 'Content-Type: application/json' \
--data-raw '{
    "commands": [
        {
            "surveyIds": [],
            "isActive": true,
            "showHelp": true,
            "_id": "61ae063c2a3aad0d189d5f27",
            "description": "",
            "slashCmd": "sendemail",
            "isSlash": true,
            "isSurvey": false,
            "arguments": []
        }
    ],
    "parametrizedBot": {
        "start": "email",
        "maxIterations": 2,
        "stages": [
            {
                "_id": "61ae064f3ed2961e152dcddc",
                "key": "email",
                "name": "PBEmail",
                "version": null,
                "data": {
                    "subject": "Hey! We need to talk to you",
                    "content": {
                        "recipientName": "",
                        "recipientEmail": "",
                        "companyName": "ACME",
                        "title": [
                            "Your team is looking for you."
                        ],
                        "action": "",
                        "code": "",
                        "messageA": "$JOIN# #Your presence is requested in the #($VALUE#channel|nameDisplay)# channel.",
                        "messageB": ""
                    },
                    "targets": [
                        "$VALUE#cmdArgs"
                    ],
                    "cc": []
                },
                "next": {
                    "DEFAULT": "message"
                },
                "customNetworkRequest": []
            },
            {
                "_id": "61ae067aa58401211950b7f3",
                "key": "message",
                "name": "PBMessage",
                "data": {
                    "content": "📩 Email sent ✅",
                    "contentType": "text/system",
                    "sentBy": "$VALUE#user|_id",
                    "channelIds": "$VALUE#channel|_id"
                },
                "next": {},
                "customNetworkRequest": []
            }
        ],
        "version": "v3"
    }
}'
```

#### Response Sample {#statemachine-response}
Go to [COTBot](/docs/documentation/models/automations/model_bots) for a complete description of the response.
```json {2,60}
{
    "parametrizedBot": {
        "start": "email",
        "maxIterations": 2,
        "stages": [
            {
                "_id": "61ae064f3ed2961e152dcddc",
                "key": "email",
                "name": "PBEmail",
                "version": null,
                "data": {
                    "subject": "Hey! We need to talk to you",
                    "content": {
                        "recipientName": "",
                        "recipientEmail": "",
                        "companyName": "ACME",
                        "title": [
                            "Your team is looking for you."
                        ],
                        "action": "",
                        "code": "",
                        "messageA": "$JOIN# #Your presence is requested in the #($VALUE#channel|nameDisplay)# channel.",
                        "messageB": ""
                    },
                    "targets": [
                        "$VALUE#cmdArgs"
                    ],
                    "cc": []
                },
                "next": {
                    "DEFAULT": "message"
                },
                "customNetworkRequest": []
            },
            {
                "_id": "609c1d542f0eac0008ee17ce",
                "key": "message",
                "name": "PBMessage",
                "data": {
                    "content": "📩 Email sent ✅",
                    "contentType": "text/system",
                    "sentBy": "$VALUE#user|_id",
                    "channelIds": "$VALUE#channel|_id"
                },
                "next": {},
                "customNetworkRequest": []
            }
        ],
        "version": "v3"
    },
    "version": 0,
    "process": "none",
    "isActive": true,
    "global": false,
    "extraData": [],
    "_id": "61adff87cc298ff6f5050283",
    "name": "test bot",
    "company": "618a696218446b289ab7b847",
    "createdAt": "2021-12-06T12:14:17.323Z",
    "commands": [
        {
            "surveyIds": [],
            "isActive": true,
            "showHelp": true,
            "_id": "61ae063c2a3aad0d189d5f27",
            "description": "",
            "slashCmd": "sendemail",
            "isSlash": true,
            "isSurvey": false,
            "arguments": []
        }
    ],
    "__v": 1
}
```

---


