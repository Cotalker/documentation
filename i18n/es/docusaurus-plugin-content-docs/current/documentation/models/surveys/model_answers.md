---
title: Answers Data Model
sidebar_label: COTAnswer
---

:::caution Advertencia
Esta página aún no se encuentra traducida al español.
:::
import useBaseUrl from '@docusaurus/useBaseUrl'; 

<span className="hero__subtitle">COTAnswer</span>

## Description {#description}

Each time a _survey_ is submitted, a unique _answer_ is created to store the gathered data. Meaning that one _survey_ can have as many _answers_ as times it has been filled out and submitted. When submitted surveys are edited or modified, the changes are stored over the original _answer_.

## JSON Sample {#json-sample}
```json
{
    "_id": "615c6a3eb478e900079e5250",
    "properties": [
        "613fd05e4a8541000782ec84",
        "613fd0154a8541000782eb14",
        "613fd0224a8541000782eb25"
    ],
    "propertyTypes": [
        "branch_survey_00",
        "location"
    ],
    "extendsAnswer": [],
    "rExtendsAnswer": [
        "615c8c3bb478e900079e606e"
    ],
    "data": [
        {
            "code": [],
            "display": [
                "Date of Arrival"
            ],
            "responses": [],
            "process": [],
            "_id": "615c8c3bb478e900079e6076",
            "user": "600ac7d8df54617a28ac89ff",
            "question": "613fd2304a8541000782f313",
            "contentType": "application/vnd.cotalker.survey+text",
            "identifier": "date_arrival_00_1631572528245",
            "diff": []
        },
        {
            "code": [
                "date",
                "timezone=America/New_York"
            ],
            "display": [
                "Date"
            ],
            "responses": [
                "2021/10/4",
                "14:00"
            ],
            "process": [
                "1633363200000"
            ],
            "_id": "615c8c3bb478e900079e6077",
            "user": "600ac7d8df54617a28ac89ff",
            "question": "613fd2304a8541000782f314",
            "contentType": "application/vnd.cotalker.survey+datetime",
            "identifier": "date_arrival_00",
            "diff": []
        }
    ],
    "uuid": "615c6a2bc7d8ac89ff9dbac2",
    "survey": "613fd2304a8541000782f312",
    "formId": "615c6a3eb478e900079e521d",
    "company": "600df3e8b0ee1ab411a09fdd",
    "user": "601df3c0853682a8d9395336",
    "createdAt": "2021-10-05T15:07:42.617Z",
    "modifiedAt": "2021-10-05T17:32:43.637Z",
    "channel": "612e468581155c0007baa084",
}
```



## Fields {#fields}

| Field | Description | [Type](/docs/documentation/models/overview_model#data-types) | Notes |
| ---- | ---- | ---- | ---- |
| channel | The _channel_ in which the survey was answered | ObjectId<COTChannel\> | [Channel Data Model](/docs/documentation/models/communication/model_channels)
| company | The _company_ in which the survey was answered | ObjectId<COTCompany\> | [Companies Data Model](/docs/documentation/models/company/model_company)
| createdAt | Date answer was submitted | ISODate | YYYY-MM-DDTHH:mm:ss.SSSZ
| data | This is where all the data of answered surveys is stored. | COTAnswerData[ ] | [Answer Data Data Model](/docs/documentation/models/surveys/model_answer_data)
| extendsAnswer | Extends or adds information through an _answer_ of an [embedded survey](/docs/documentation/admin/survey/components/survey) | ObjectId<COTAnswer\> | Superseded by `answers.rExtendsAnswer` |
| formId | Unique ID for the submitted survey; referenced in `messages.form.id`, i.e., [Messages Data Model](/docs/documentation/models/communication/model_messages) | ObjectId | |
| modifiedAt | Indicates when last modified | ISODate | YYYY-MM-DDTHH:mm:ss.SSSZ
| properties | Properties (elements) used in the survey | ObjectId<COTProperty\>[ ] | See [Properties Data Model](/docs/documentation/models/databases/model_properties)
| propertyTypes | Property Types (Collections) the used properties belong to | string[ ] | Strings refer to property types' identifier name: `propertyType.code`. See [Property Types Data Model](/docs/documentation/models/databases/model_propertytypes)
| rExtendsAnswer | Extends or adds information through an _answer_ of an [embedded survey](/docs/documentation/admin/survey/components/survey) | ObjectId<COTAnswer\> | 
| survey | Survey the answer responds to | ObjectId<COTSurvey\> | See [Survey Data Model](/docs/documentation/models/surveys/model_surveys)
| user | User that submitted the form | ObjectId<COTUser\> | See [Users Data Model](/docs/documentation/models/users/model_users)
| uuid | Answer's identification code; used as reference key by other models | ObjectId | System generated code |


## Deprecated {#deprecated}

| Field | Description | [Type](/docs/documentation/models/overview_model#data-types) | Notes |
| ---- | ---- | ---- | ---- |
| endDate | | ISODate | DEPRECATED
| endsAt | | ISODate | DEPRECATED
| identifiersNeeded | | string[ ] | DEPRECATED
| isAuto | Allows _messages_ and _importer_ to write into answers | boolean | DEPRECATED
| meta | | object | DEPRECATED
| meta.action | | string | DEPRECATED
| meta.payload | | object | DEPRECATED
| meta.payload.group | | ObjectId | DEPRECATED
| propertiesNeeded | | ObjectId[ ] | DEPRECATED
| score | | object[ ] | DEPRECATED
| score[index].main | | number | DEPRECATED
| score[index].scores | | object[ ] | DEPRECATED
| score[index].scores[index].key | | string | DEPRECATED
| score[index].scores[index].value | | object | DEPRECATED
| startDate | | ISODate | DEPRECATED
| tag | | string | DEPRECATED
| target | | ObjectId | DEPRECATED

## Additional Resources {#resources}

- [Surveys Overview](/docs/documentation/admin/survey/survey_overview): complete description about surveys
- [Reports](/docs/documentation/client/reports): view submitted survey answers 
- ["Answers" REST API documentation](/docs/documentation/api/surveys/answers): basic "Answers" API requests
- [API documentation in Swagger](https://www.cotalker.com/swagger/core/?key=woubtjf4olr0t4zgutuwn6scbcm6hd3qh1cgl5obmohpbm3mfublnwcvv67lodgjvd3h86s9ppshtvmf95gepsqh6nizq9liu7f): complete with data models (schemas)
- [COTLang](/docs/documentation/automation/cotlang/admin_cotlang): use COTLang for extracting data from models in routines
- [Triggers and Contexts](/docs/documentation/automation/cotlang/triggers_and_contexts): more information on using data models within routines

## Help {#help}

- [Cotalker Platform Community](https://github.com/Cotalker/documentation/discussions): post your questions or search for previous answers given in the forum

