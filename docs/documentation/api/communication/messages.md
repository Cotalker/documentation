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
`https://www.coltaker.com/api/v1/messages/channel/{id}/modified/{modified}`

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
**contentType** | Indicates content type, for example: `text/plain` (user text input), `application/vnd.cotalker.survey` (answered survey), `application/pdf` (pdf file), `image/gif` (uploaded gif image) | string | Required | For a complete list of content types, go to [COTMessageContentType](/docs/documentation/models/communication/model_messageContent).
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
