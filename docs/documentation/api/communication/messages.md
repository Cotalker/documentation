---
title: Messages
sidebar_label: Messages
---
import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Overview {#overview}
_Messages_ are sent through the [_channel workspace chat_](/docs/documentation/client/channels#channel-workspace-layout). _Messages_ can contain text, multimedia files, answered surveys, or system-generated responses.

Through this endpoint, you can access message content sent in your company's channels. 

:::tip additional resources
These are just some of the most basic API requests. For a complete list of endpoints, consult our [API documentation on Swagger](https://www.cotalker.com/swagger/core/?key=woubtjf4olr0t4zgutuwn6scbcm6hd3qh1cgl5obmohpbm3mfublnwcvv67lodgjvd3h86s9ppshtvmf95gepsqh6nizq9liu7f#/).
:::

## Get Messages Sent After Modified Date {#get-messages-modified}
_Get all the messages in a channel modified after the indicated date and time.._

<span className="hero__subtitle"><span className="badge badge--success">GET</span> /messages/channel/&#123;id&#125;/modified/&#123;modified&#125;</span>

#### Endpoint URL {#get-messages-modified-url}
`https://www.cotalker.com/api/v1/messages/channel/{id}/modified/{modified}`

#### Path Parameters {#get-messages-modified-path}
Parameter | Description | Type | Required | Values
--- | --- | --- | --- | ---
**id** | The ObjectId of the _channel_ to retrieve the _messages_ from. | [ObjectId<COTChannel\>](/docs/documentation/models/communication/model_channels) | Required | 
**modified** | Indicates the date and time from which sent messages are retrieved. | ISODate | Required | YYYY-MM-DDTHH:mm:ss.SSSZ

#### Headers {#get-messages-modified-headers}
Header | Description | Required | Values
--- | --- | --- | ---
**Authorization** | Sends your _access token_ to make an API request.<br/>[Click here to see how to obtain an _access token_.](/docs/documentation/api/auth#how-to) | Required | Bearer $ACCESS_TOKEN

#### Request Samples {#get-messages-modified-request-sample}

_This request returns all messages sent on and after September 6, 2021 in the specified channel._
```bash
curl --location --request GET 'https://www.cotalker.com/api/v1/messages/channel/60d382fbd5f06600095531c8/modified/2021-09-06T00:00:00.000Z' \
--header 'Authorization: Bearer $ACCESS_TOKEN'
```

#### Response Sample {#get-messages-modified-response-sample}
Responses follow the [COTMessage](/docs/documentation/models/communication/model_messages) data model.

---

## Send a Message {#post-message}
_Sends a message to a channel._

<span className="hero__subtitle"><span className="badge badge--info">POST</span> /messages</span>

#### Endpoint URL {#post-channel-url}
`https://www.cotalker.com/api/v1/messages`

#### Headers {#post-channel-headers}

Header | Description | Required | Values
--- | --- | --- | ---
**Authorization** | Sends your _access token_ to make an API request.<br/>[Click here to see how to obtain an _access token_.](/docs/documentation/api/auth#how-to) | Required | Bearer $ACCESS_TOKEN
**Content-Type** | Indicates the body's format. | Required | application/json

#### Request Body {#post-channel-body}
_Only required fields are listed below. For a complete schema description, please go to the [COTChannel data model](/docs/documentation/models/communication/model_channels). Unrequired fields that are not submitted are either filled in automatically or left blank._

Element | Description | Type | Required | Notes
--- | --- | --- | --- | ---
**channel** | The channel the message is sent in. | [ObjectId<COTChannel\>](/docs/documentation/models/communication/model_channels) | Required |
**content** | Displayed data; could be user text input, system message, or file object. | string | Required<br/>(for all messages that are not surveys) | For details about the type of content allowed, go to [COTMessageContentType](/docs/documentation/models/communication/model_messageContent).
| **contentArray** | Array of answered survey _questions_ | [ObjectId<COTQuestion\>[ ]](/docs/documentation/models/surveys/model_questions) | Required<br/>(if sending a survey) |
**contentType** | Indicates content type, for example: `text/plain` (user text input), `application/vnd.cotalker.survey` (answered survey), `application/pdf` (pdf file), `image/gif` (uploaded gif image) | string | Required | For a complete list of content types, go to [COTMessageContentType](/docs/documentation/models/communication/model_messageContent). See below for [enriched messages](#enriched-message).
**isSaved** | Used to indicate the message state. `2` is used for sending a regular message; `8` is used for sending unanswered surveys; `16` is used to indicate a message has already been delivered. | number | Required | Use with precaution; consult the [Cotalker Platform Community](https://github.com/Cotalker/documentation/discussions) for further details. 
**sentBy** | ID of the _user_ that sends the message. | [ObjectId<COTUser\>](/docs/documentation/models/users/model_users) | Required |

#### Request Sample {#post-channel-request}
_Message sent with the minimum required fields:_
```bash
curl --location --request POST 'https://www.cotalker.com/api/v1/messages' \
--header 'Authorization: Bearer $ACCESS_TOKEN' \
--header 'Content-Type: application/json' \
--data-raw '{
    "channel": "619b8cf2107bbec0876cddf2",
    "content": "Hello, world!",
    "contentType": "text/plain",
    "isSaved": 2,
    "sentBy": "61953bf9bdc3558a4966e54d"
}'
```

#### Response Sample {#post-channel-response}
Go to [COTMessage](/docs/documentation/models/communication/model_messages) for a complete description of the response.
```json {5,9-12}
{
    "form": {
        "modifiedAt": []
    },
    "content": "Hello, world!",
    "contentArray": [],
    "reply": [],
    "_id": "619cd2c9df0b22b7e8f9d556",
    "channel": "619b8cf2107bbec0876cddf2",
    "contentType": "text/plain",
    "isSaved": 16,
    "sentBy": "61953bf9bdc3558a4966e54d",
    "createdAt": 1637664207913,
    "modifiedAt": "2021-11-23T10:43:27.922Z"
}
```

---

## Edit a Message {#patch-message}
_Edits the indicated message._

<span className="hero__subtitle"><span className="badge badge--warning">PATCH</span> /messages/&#123;id&#125;</span>

#### Endpoint URL {#patch-messages-url}
`https://www.cotalker.com/api/v1/messages/{id}`

#### Path Parameters {#patch-messages-path}
Parameter | Description | Type | Required | Notes
--- | --- | --- | --- | ---
**id** | The ObjectId of the _message_ to be modified. | [ObjectId<COTMessage\>](/docs/documentation/models/communication/model_messages) | Required |

#### Headers {#patch-messages-headers}
Header | Description | Required | Values
--- | --- | --- | ---
**Authorization** | Sends your _access token_ to make an API request.<br/>[Click here to see how to obtain an _access token_.](/docs/documentation/api/auth#how-to) | Required | Bearer $ACCESS_TOKEN
**Content-Type** | Sets the body's format. | Required | application/json

#### Request Body {#patch-messages-body}
_Fields that are being edited or added are required to be put into the body. Additionally, the following fields **must** also be in the body. For a complete schema description, please go to the [COTMessage data model](/docs/documentation/models/communication/model_messages)._

Element | Description | Type | Required | Notes
--- | --- | --- | --- | ---
**channel** | The channel the message is sent in. | [ObjectId<COTChannel\>](/docs/documentation/models/communication/model_channels) | Required |
**isSaved** | Used to indicate the message state. `2` is used for sending a regular message; `8` is used for sending unanswered surveys; `16` is used to indicate a message has already been delivered. | number | Required | Use with precaution; consult the [Cotalker Platform Community](https://github.com/Cotalker/documentation/discussions) for further details.

#### Request Sample {#patch-messages-request}
_Edit a sent message:_
```bash
curl --location --request PATCH 'https://www.cotalker.com/api/v1/messages/619cd2c9df0b22b7e8f9d556' \
--header 'Authorization: Bearer $ACCESS_TOKEN' \
--header 'Content-Type: application/json' \
--data-raw '{
    "content": "I am editing this message with an API request!",
    "isSaved": 2,
    "channel": "619b8cf2107bbec0876cddf2"
}'
```

#### Response Sample {#patch-messages-response}
Go to [COTMessage](/docs/documentation/models/communication/model_messages) for a complete description of the response.
```json {5,9,11}
{
    "form": {
        "modifiedAt": []
    },
    "content": "I am editing this message with an API request!",
    "contentArray": [],
    "reply": [],
    "_id": "619cd2c9df0b22b7e8f9d556",
    "channel": "619b8cf2107bbec0876cddf2",
    "contentType": "text/plain",
    "isSaved": 16,
    "sentBy": "61953bf9bdc3558a4966e54d",
    "createdAt": 1637664207913,
    "modifiedAt": "2021-11-23T10:43:27.922Z"
}
```
---

## Remove a Message {#remove-message}
_Removes the indicated message from the channel. Can be reverted._

<span className="hero__subtitle"><span className="badge badge--warning">PATCH</span> /messages/&#123;id&#125;/remove</span>

#### Endpoint URL {#patch-messages-url}
`https://www.cotalker.com/api/v1/messages/{id}/remove`

#### Path Parameters {#patch-messages-path}
Parameter | Description | Type | Required | Notes
--- | --- | --- | --- | ---
**id** | The ObjectId of the _message_ to be removed. | [ObjectId<COTMessage\>](/docs/documentation/models/communication/model_messages) | Required |

#### Headers {#patch-messages-headers}
Header | Description | Required | Values
--- | --- | --- | ---
**Authorization** | Sends your _access token_ to make an API request.<br/>[Click here to see how to obtain an _access token_.](/docs/documentation/api/auth#how-to) | Required | Bearer $ACCESS_TOKEN

#### Request Sample {#patch-messages-request}
_Remove a message from a channel:_
```bash
curl --location --request PATCH 'https://www.cotalker.com/api/v1/messages/619cd2c9df0b22b7e8f9d556/remove' \
--header 'Authorization: Bearer $ACCESS_TOKEN'
```

#### Response Sample {#patch-messages-response}
Go to [COTMessage](/docs/documentation/models/communication/model_messages) for a complete description of the response.
```json {15}
{
    "form": {
        "modifiedAt": []
    },
    "content": "I am editing this message with an API request!",
    "contentArray": [],
    "reply": [],
    "_id": "619cd2c9df0b22b7e8f9d556",
    "channel": "619b8cf2107bbec0876cddf2",
    "contentType": "text/plain",
    "isSaved": 16,
    "sentBy": "61953bf9bdc3558a4966e54d",
    "createdAt": 1637664207913,
    "modifiedAt": "2021-11-23T13:06:14.066Z",
    "isHidden": true
}
```

:::note
To revert the removal of a message from the channel, [edit the message](#patch-message) and change the value of the `isHidden` field to _false_.
:::

---

## Send an Enriched Message {#enriched-message}
_Special syntax for sending enriched messages._

<span className="hero__subtitle"><span className="badge badge--info">POST</span> /messages</span>

#### Endpoint URL {#post-channel-url}
`https://www.cotalker.com/api/v1/messages`

#### Headers {#post-channel-headers}

Header | Description | Required | Values
--- | --- | --- | ---
**Authorization** | Sends your _access token_ to make an API request.<br/>[Click here to see how to obtain an _access token_.](/docs/documentation/api/auth#how-to) | Required | Bearer $ACCESS_TOKEN
**Content-Type** | Indicates the body's format. | Required | application/json

#### Request Body {#post-channel-body}
_Only required fields are listed below. For a complete schema description, please go to the [COTChannel data model](/docs/documentation/models/communication/model_channels). Unrequired fields that are not submitted are either filled in automatically or left blank._

Element | Description | Type | Required | Notes
--- | --- | --- | --- | ---
**channel** | The channel the message is sent in. | [ObjectId<COTChannel\>](/docs/documentation/models/communication/model_channels) | Required |
**contentType** | Use the `text/enriched` option to send enriched messeages. | string | Required | Notes
**contentParts** | Indicates the format and content to use in each part of the sent message. | Object[ ] | Required | [See samples](/docs/documentation/models/communication/model_messageContent#enriched-message).
**contentParts[x].type** | Content part types include: `text`, `link`, `hover`, and `task`. | string | Required |
**contentParts[x].content** | The text displayed in the message. In case of `link`, `hover`, and `task` types, the text is linked to the respective `payload` data. | string | Required |
**contentParts[x].payload** | The data linked to the text in `contentParts.content`. Each `contentParts.type` has a specific `payload` object. | object | Required |
**contentParts[x].payload.url** | Indicates the linked URL when using the `link` type. | string | Required when using the `link` type. |
**contentParts[x].payload.card** | The data displayed when hovering over `hover` type content. | object | Required when using the `hover` type. |
**contentParts[x].payload.card.image** | URL of the image that is displayed on the pop-up card. | string | Required when using the `hover` type. | 
**contentParts[x].payload.card.text** | The text that is displayed on the pop-up card. | string | Required when using the `hover` type. |
**contentParts[x].payload.company** | ObjectId of the company in which the message is sent. | [ObjectId<COTCompany\>](/docs/documentation/models/model_company) | Required when using the `task` type. | 
**contentParts[x].payload.task** | ObjectId of the task that is linked to the `contentParts.content` text. | [ObjectId<COTTask\>](/docs/documentation/models/tasks/model_tasks) | Required when using the `task` type. |
**contentParts[x].payload.taskGroup** | ObjectId of the task group in which the task is found. | [ObjectId<COTTaskGroup\>](/docs/documentation/models/tasks/model_taskgroup) | Required when using the `task` type.
**isSaved** | This field must be set to `2` to send the message. | number | Required |
**sentBy** | ID of the _user_ that sends the message. | [ObjectId<COTUser\>](/docs/documentation/models/users/model_users) | Required |


#### Request Sample {#post-channel-request}
_Message sent with the minimum required fields:_
```bash
curl --location --request POST 'https://dev.cotalker.com/api/v1/messages' \
--header 'Admin: true' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjJhYjE2MzVhODcwMjAwMDdjMjA1MzMiLCJyb2xlIjoidXNlciIsImNvbXBhbnkiOiI2MjJhYjE0ZjcxYjEyZDdkNDExMjhkOGUiLCJkYXRlIjoxNjQ3NTIyNjc5ODk2LCJpcnQiOnRydWUsImlhdCI6MTY0NzUyMjY3OSwiZXhwIjoxNjUwMTE0Njc5fQ.qsQbBk8-4lqEcvmTv-D34x0N6gXjwAp_EWC2QbBFITQ' \
--header 'Content-Type: application/json' \
--data-raw '{
    "channel": "623b136680753a589460c368",
    "contentType": "text/enriched",
    "isSaved": 2,
    "sentBy": "623b137046abafdd25f1e88c",
    "contentParts": [
        {
            "type": "text",
            "content": "This is an automatically-generated message regarding the"
        },
        {
            "type": "task",
            "content": "Fix Pipes Work Order.",
            "payload": {
                "company": "623b1332d6bf5d4380821b7d",
                "task": "623b137c3f85e5110df8cd59",
                "taskGroup": "623b138279d4089a60cf2984"
            }
        },
        {
            "type": "user",
            "content": "@Thomas Gardner",
            "payload": {
                "user": "623b138df83745aa22ba6462",
                "company": "623b1332d6bf5d4380821b7d"
            }
        },
        {
            "type": "text",
            "content": "has requested to"
        },
        {
            "type": "hover",
            "content": "close the work order.",
            "payload": {
                "card": {
                    "image": "https://doc.cotalker.com/img/products/products_work_orders_workflow_forms_10.png",
                    "text": "When contractors request to close a work order, supervisors receive a copy of the Close Work Order form. They must then inspect the completed job and fill out the Acceptance of Work form, where they indicate whether the job can be accepted. If accepted, the job is officially completed and the work order is closed."
                }
            }
        },
        {
            "type": "text",
            "content": "Please fill out the Acceptance of Work form."
        },
        {
            "type": "link",
            "content": "Click here for more information.",
            "payload": {
                "url": "https://doc.cotalker.com/docs/products/workflows/work_orders/surveys-acceptance"
            }
        }
    ]
}'
```

#### Response Sample {#post-channel-response}
Go to [COTMessage](/docs/documentation/models/communication/model_messages) for a complete description of the response.
```json {13-17,19,21,24,26-30,34,36-39,43,45,48,50-54,59,61,64,66-68}
{
    "form": {
        "modifiedAt": []
    },
    "cmd": {
        "ids": []
    },
    "content": "This is an automatically-generated message regarding the Fix Pipes Work Order. @Thomas Gardner has requested to close the work order. Please fill out the Acceptance of Work form. Click here for more information.",
    "contentArray": [],
    "isActive": true,
    "reply": [],
    "_id": "623b16340a0e75cc2a6d5819",
    "channel": "623b136680753a589460c368",
    "contentType": "text/enriched",
    "isSaved": 16,
    "sentBy": "623b137046abafdd25f1e88c",
    "contentParts": [
        {
            "type": "text",
            "_id": "623b16af2baa9c957d5ce07c",
            "content": "This is an automatically-generated message regarding the"
        },
        {
            "type": "task",
            "_id": "623b16ba766ca92429381bb6",
            "content": "Fix Pipes Work Order.",
            "payload": {
                "company": "623b1332d6bf5d4380821b7d",
                "task": "623b137c3f85e5110df8cd59",
                "taskGroup": "623b138279d4089a60cf2984"
            }
        },
        {
            "type": "user",
            "_id": "623b16c0e8bbb2e9750816c4",
            "content": "@Thomas Gardner",
            "payload": {
                "user": "623b138df83745aa22ba6462",
                "company": "623b1332d6bf5d4380821b7d"
            }
        },
        {
            "type": "text",
            "_id": "623b16c838100f2362b52363",
            "content": "has requested to"
        },
        {
            "type": "hover",
            "_id": "623b16d18a9b122102c770f6",
            "content": "close the work order.",
            "payload": {
                "card": {
                    "image": "https://doc.cotalker.com/img/products/products_work_orders_workflow_forms_10.png",
                    "text": "When contractors request to close a work order, supervisors receive a copy of the Close Work Order form. They must then inspect the completed job and fill out the Acceptance of Work form, where they indicate whether the job can be accepted. If accepted, the job is officially completed and the work order is closed."
                }
            }
        },
        {
            "type": "text",
            "_id": "623b16d80cd4f139d3c70aee",
            "content": "Please fill out the Acceptance of Work form."
        },
        {
            "type": "link",
            "_id": "623b16df08635dfb42c8c57b",
            "content": "Click here for more information.",
            "payload": {
                "url": "https://dev.cotalker.com/api/redirect/r/623a065fc6bed20007066384",
                "ogMetadata": {
                    "title": "Work Orders Workflow | Cotalker Technical Documentation",
                    "image": "https://doc.cotalker.com/img/products/products_work_orders_workflow_forms_11.png",
                    "url": "https://doc.cotalker.com/docs/products/workflows/work_orders/surveys-acceptance",
                    "description": "Survey Forms",
                    "video": null,
                    "audio": null,
                    "logo": null,
                    "publisher": null,
                    "author": null,
                    "date": null
                }
            }
        }
    ],
    "createdAt": 1648038890202,
    "responses": [],
    "readBy": [],
    "modifiedAt": "2022-03-23T12:34:50.714Z"
}
```

:::tip
[See how enriched messages are displayed on channel workspaces.](/docs/documentation/client/channels#enriched-messages)
:::