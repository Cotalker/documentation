---
title: Messages Model
sidebar_label: Messages
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<span className="hero__subtitle">COTMessage</span>

## Description {#description}

A message model (COTMessage) contains all the information concerning a particular message sent through the [channel workspace chat](/docs/documentation/client/channels#channel-workspace-layout). Messages can contain text, multimedia files, answered surveys, or system generated responses.

## JSON Sample {#json-sample}


## Field {#fields}

| Field | Description | [Type](/docs/documentation/models/overview_model#data-types) | Notes |
| ----  | ---- | ----------- | ----  |
| \_id | Message ID number | ObjectId<COTMessage\> | |
| answer | A survey _answer_ that is sent back as a message in the channel workspace | ObjectId<COTAnswer.uuid\>#ObjectId<COTSurvey\> | [Answers Model](/docs/documentation/models/surveys/model_answers), [Survey Model](/docs/documentation/models/surveys/model_surveys) |
| channel | The channel the message is sent in | ObjectId<COTChannel\> | [Channel Model](/docs/documentation/models/communication/model_channels) |
| cmd | ____ | object |  |
| cmd.ids | array | [ ] | |
| cmd.by | ____ | ObjectId | ____ |
| cmd.status | ____ | number | ____ |
| cmd.visibility | ____ | boolean | ____ |
| content | Displayed data; could be user text input, system message, or file. | string | Required |
| contentArray | ID number of survey _questions_ answered | ObjectId<COTQuestion\>[ ] | [Question Model](/docs/documentation/models/surveys/model_questions) |
| contentType | Indicates content type, for example: `text/plain` (user text input), `text/system` (system generated text), `application/vnd.cotalker.survey` (answered survey), `application/pdf` (system generated file), `image/gif` (uploaded gif image) | string | Required |
| createdAt | The date and time the message was created | double |  |
| extendsAnswer | ____ | string | |
| form | General information of a submitted form. | object | A copy of the question responses can be found in `messages.responses` |
| form.createdAt | Date the form was submitted originally submitted | ISODate | YYYY-MM-DDTHH:mm:ss.SSSZ |
| form.id | Contains the main-survey id, unique for the entire survey. | ObjectId | |
| form.modifiedAt | List of dates the form was modified | ISODate[ ] | YYYY-MM-DDTHH:mm:ss.SSSZ  |
| form.subid | contains the sub-survey id, unique per sub-survey (null for the non-sub-survey parts) | ObjectId | |
| isActive | ____ | boolean | ____ |
| isHidden | Used to hide sent messages from the view of other users in the chat room | boolean | When users choose to delete a message from the channel's workspace, this option is set to `true`; messages are never truly deleted, just hidden. |
| isSaved | | number | ??? **EN LA BASE DE DATOS SOLO APARECE EL NUMERO '16' COMO 'VALUE'.** |
| reply | Array of message IDs this message is replying to | ObjectID<COTMessage\>[ ] | |
| modifiedAt | Date and time last modified | ISODate | YYYY-MM-DDTHH:mm:ss.SSSZ  |
| modifiedLocal | Date and time last modified | double | |
| responses | List of responses filled out in a form | object[ ] | Check `message.form` for the forms identification data | 
| responses[index].cdata | Contains the responses to a given survey question | string[ ] | |
| responses[index].cref | References the question | ObjectId<COTQuestion\> | [Question Data Model](/docs/documentation/models/surveys/model_questions) |
| reactions | Emoji reactions to message | object | Emojis used on message appear as object keys, e.g., `reactions.laugh`, `reactions.rocket` |
| sentBy | Indicates the ID number of the user that sent the message | ObjectId<COTUser\> | [User Model](/docs/documentation/models/users/model_users) |


# Additional Resources {#resources}

- ["Message" REST API documentation](/docs/documentation/api/communication/messages): basic "Message" API requests
- [API documentation in Swagger](https://www.cotalker.com/swagger/core/?key=woubtjf4olr0t4zgutuwn6scbcm6hd3qh1cgl5obmohpbm3mfublnwcvv67lodgjvd3h86s9ppshtvmf95gepsqh6nizq9liu7f): complete with data models (schemas)
- [COTLang](/docs/documentation/automation/admin_cotlang): use COTLang for extracting data from models in routines
- [Triggers and Contexts](/docs/documentation/automation/triggers_and_contexts): more information on using data models within routines

## Help {#help}

- [Cotalker Platform Community](https://github.com/Cotalker/documentation/discussions): post your questions or search for previous answers given in the forum



## Deprecated or Not to be used {#deprecated}
| Field | Description | [Type](/docs/documentation/models/overview_model#data-types) | Notes |
| ----  | ---- | ----------- | ----  |
| responses[index].\_id | Automatically generated internal system code | ObjectId | Not to be used |
| readBy | Users that have read the message | ObjectId<COTUser\>[ ] | Deprecated |
