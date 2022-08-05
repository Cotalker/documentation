---
title: Messages Data Model
sidebar_label: COTMessage
---

:::caution Advertencia
Esta página aún no se encuentra traducida al español.
:::
import useBaseUrl from '@docusaurus/useBaseUrl';

<span className="hero__subtitle">COTMessage</span>

## Description {#description}

A message model (COTMessage) contains all the information concerning a particular message sent through the [channel workspace chat](/docs/documentation/client/channels#channel-workspace-layout). Messages can contain text, multimedia files, answered surveys, or system-generated responses. 

When displaying a form, i.e., a submitted survey, there is a _message_ for each answered survey _question_ displayed in the chat. If a submitted survey has two _questions_, two corresponding _messages_ are sent.


## JSON Samples {#json-sample}

### Text Message {#text-message}
```json
{
    "_id": "6140e8a49d0ad6efd374ab7f",
    "channel": "6140e8bafaddd3a2f4fc743c",
    "content": "Hello, world!",
    "contentType": "text/plain",
    "createdAt": 1630947233455,
    "isActive": true,
    "isHidden": false,
    "isSaved": 16,
    "modifiedAt": "2021-09-06T16:54:14.517Z",
    "sentBy": "6140e8c5745ce660679a3da4",
}
```

### Survey Message {#survey-message}
```json
{
    "_id": "6140e8df7ba70ee0d3e7aaba",
    "answer": "613fd15cc7d8ac89ff82d9c9#613fd0e14a8541000782ed58",
    "channel": "6140e8bafaddd3a2f4fc743c",
    "contentArray": [
        "613fd0e14a8541000782ed5c",
        "613fd0e14a8541000782ed5d"
    ],
    "contentType": "application/vnd.cotalker.survey",
    "createdAt": 1631572327913,
    "form": {
        "modifiedAt": [
            "2021-09-13T22:32:07.911Z"
        ],
        "id": "613fd1674a8541000782f29e",
        "createdAt": "2021-09-13T22:32:07.911Z"
    },
    "isActive": true,
    "isSaved": 16,
    "modifiedAt": "2021-09-13T22:32:07.926Z",
    "modifiedLocal": 1631572327639,
    "responses": [
        {
            "cdata": [],
            "_id": "613fd1674a8541000782f2a3",
            "cref": "613fd0e14a8541000782ed5c"
        },
        {
            "cdata": [
                "{\"_id\":\"613fd0154a8541000782eb14\",\"subproperty\":[],\"isActive\":true,\"name\":{\"code\":\"nyc_00\",\"display\":\"New York\"},\"propertyType\":\"location\",\"company\":\"600ac7d8df5461626aac89c0\",\"createdAt\":\"2021-09-13T22:26:29.673Z\",\"modifiedAt\":\"2021-09-13T22:26:29.686Z\"}"
            ],
            "_id": "613fd1674a8541000782f2a4",
            "cref": "613fd0e14a8541000782ed5d"
        }
    ],
    "sentBy": "600ac7d8df54617a28ac89ff"
}
```



## Field {#fields}

| Field | Description | [Type](/docs/documentation/models/overview_model#data-types) | Notes |
| ----  | ---- | ----------- | ----  |
| **\_id** | Message ID number | ObjectId<COTMessage\> | |
| **answer** | A survey _answer_ that is sent back as a message in the channel workspace | ObjectId<COTAnswer.uuid\> #ObjectId<COTSurvey\> | [Answers Model](/docs/documentation/models/surveys/model_answers), [Survey Model](/docs/documentation/models/surveys/model_surveys) |
| **channel** | The channel the message is sent in | ObjectId<COTChannel\> | [Channel Model](/docs/documentation/models/communication/model_channels) |
| **content** | Displayed data; could be user text input, system message, or file object. | string | For details about the type of content allowed, go to [COTMessageContentType](/docs/documentation/models/communication/model_messageContent). |
| **contentArray** | Array of answered survey _questions_ | COTQuestion[ ] | [Questions Model](/docs/documentation/models/surveys/model_questions) |
| **contentParts** | Indicates the format and content to use in each part of an enriched message. Required with `text/enriched` content types. | Object[ ] | [See samples](/docs/documentation/models/communication/model_messageContent#enriched-message).
| **contentParts[x].type** | Content part types include: `text`, `link`, `hover`, and `task`. | string | Required with `text/enriched` content types. |
| **contentParts[x].content** | The text displayed in the message. In case of `link`, `hover`, and `task` types, the text is linked to the respective `payload` data. | string | Required with `text/enriched` content types. |
| **contentParts[x].payload** | The data linked to the text in `contentParts.content`. Each `contentParts.type` has a specific `payload` object. | object | Required with `text/enriched` content types.
| **contentParts[x].payload.url** | Indicates the linked URL when using the `link` type. | string | Required when using the `link` enriched message type. |
| **contentParts[x].payload.card** | The data displayed when hovering over `hover` type content. | object | Required when using the `hover` enriched message type. |
| **contentParts[x].payload.card.image** | URL of the image that is displayed on the pop-up card. | string | Required when using the `hover` enriched message type. | 
| **contentParts[x].payload.card.text** | The text that is displayed on the pop-up card. | string | Required when using the `hover` enriched message type. |
| **contentParts[x].payload.company** | ObjectId of the company in which the message is sent. | [ObjectId<COTCompany\>](/docs/documentation/models/company/model_company) | Required when using the `task` enriched message type. | 
| **contentParts[x].payload.task** | ObjectId of the task that is linked to the `contentParts.content` text. | [ObjectId<COTTask\>](/docs/documentation/models/tasks/model_tasks) | Required when using the `task` enriched message type. |
| **contentParts[x].payload.taskGroup** | ObjectId of the task group in which the task is found. | [ObjectId<COTTaskGroup\>](/docs/documentation/models/tasks/model_taskgroup) | Required when using the `task` enriched message type.
| **contentType** | Indicates content type, for example: `text/plain` (user text input), `application/vnd.cotalker.survey` (answered survey), `application/pdf` (pdf file), `image/gif` (uploaded gif image) | string | For a complete list of content types, go to [COTMessageContentType](/docs/documentation/models/communication/model_messageContent). |
| **createdAt** | The date and time the message was created | number | Unix epoch time format |
| **extendsAnswer** | Extra information added to a survey question's answer through another survey | string | Superseded by [COTQuestionContentType](/docs/documentation/models/surveys/model_questionContentType#survey) `survey+survey` available through `messages.contentArray`. |
| **form** | General information of a submitted form. | object | A copy of the question responses can be found in `messages.responses` |
| **form.createdAt** | Date the form was originally submitted | ISODate | YYYY-MM-DDTHH:mm:ss.SSSZ |
| **form.id** | Contains the main-survey ID, unique for the entire submitted survey. | ObjectId | This ID is present in all the _messages_ corresponding to answered survey _questions_. It is also present in the corresponding [Answers Data Models](/docs/documentation/models/surveys/model_answers) as `answers.formId`. |
| **form.modifiedAt** | List of dates the form was modified | ISODate[ ] | YYYY-MM-DDTHH:mm:ss.SSSZ  |
| **form.subid** | contains the sub-survey ID, unique per sub-survey (null for the non-sub-survey parts) | ObjectId | |
| **isHidden** | Used to hide sent messages from the view of other users in the chat room | boolean | When users choose to delete a message from the channel's workspace, this option is set to `true`; messages are never truly deleted, just hidden. |
| **isSaved** | Used to indicate the message state. `2` is used for sending a regular message; `8` is used for sending unanswered surveys; `16` is used to indicate a message has already been delivered. | number | Use with precaution; consult the [Cotalker Platform Community](https://github.com/Cotalker/documentation/discussions) for further details |
| **reply** | List of messages this message is replying to | ObjectID<COTMessage\>[ ] | |
| **modifiedAt** | Date and time last modified | ISODate | YYYY-MM-DDTHH:mm:ss.SSSZ  |
| **modifiedLocal** | Date and time last modified | number | Unix epoch time format |
| **responses** | Responses refer to an answered survey question. Sometimes, responses come in pairs, the first response object contains the field label, the second, the submitted data. | object[ ] | Check `messages.form` for the forms identification data | 
| **responses[x].cdata** | Contains the responses submitted to a given survey question | string[ ] | |
| **responses[x].cref** | References the question | ObjectId<COTQuestion\> | [Question Model](/docs/documentation/models/surveys/model_questions) |
| **reactions** | Emoji reactions to message | object | Emojis used on message appear as object keys, e.g., `reactions.laugh`, `reactions.rocket` |
| **sentBy** | Indicates the ID number of the user that sent the message | ObjectId<COTUser\> | [User Model](/docs/documentation/models/users/model_users) |

## Deprecated or Not to be used {#deprecated}
| Field | Description | [Type](/docs/documentation/models/overview_model#data-types) | Notes |
| ----  | ---- | ----------- | ----  |
| **cmd** | Used in mobile apps to calculate and save commanded message visibility | object | DEPRECATED |
| **cmd.ids** | List of users I can command | ObjectID<COTUser\>[ ] | DEPRECATED |
| **cmd.by** | User that commands me | ObjectId<COTUser\> | DEPRECATED |
| **cmd.status** | `1`: _ids_ calculated; `2`: _by_ calculated; `3`: both | number | DEPRECATED |
| **cmd.visibility** | My current state | boolean | DEPRECATED |
| **isActive** | Used for hiding messages; replaced by `messages.isHidden` | boolean | DEPRECATED |
| **responses[x].\_id** | Automatically generated internal system code | ObjectId | Not to be used |
| **readBy** | Users that have read the message | ObjectId<COTUser\>[ ] | DEPRECATED |


# Additional Resources {#resources}

- ["Message" REST API documentation](/docs/documentation/api/communication/messages): basic "Message" API requests
- [API documentation in Swagger](https://www.cotalker.com/swagger/core/?key=woubtjf4olr0t4zgutuwn6scbcm6hd3qh1cgl5obmohpbm3mfublnwcvv67lodgjvd3h86s9ppshtvmf95gepsqh6nizq9liu7f): complete with data models (schemas)
- [COTLang](/docs/documentation/automation/cotlang/admin_cotlang): use COTLang for extracting data from models in routines
- [Triggers and Contexts](/docs/documentation/automation/cotlang/triggers_and_contexts): more information on using data models within routines

## Help {#help}

- [Cotalker Platform Community](https://github.com/Cotalker/documentation/discussions): post your questions or search for previous answers given in the forum


