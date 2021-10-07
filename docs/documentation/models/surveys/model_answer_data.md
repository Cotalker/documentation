---
title: Answer-Data Data Model
sidebar_label: COTAnswerData
---
import useBaseUrl from '@docusaurus/useBaseUrl'; 

<span className="hero__subtitle">COTAnswerData</span>

## Description {#description}

The Answer-Data Data Model (COTAnswerData) an object that correspondes to the `answers.data` array field found in the [Answers Data Model](/docs/documentation/models/surveys/model_answers) (COTAnswer). It contains all the data gathered through a survey form submitted by a _user_.

Data objects go in pairs. The first represents the survey question's displayed field label. The second, the input data.

## JSON Sample {#json-sample}

```json
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
        },
        {
            "code": [],
            "display": [
                "Choose City"
            ],
            "responses": [],
            "process": [],
            "_id": "615c8c3bb478e900079e607a",
            "user": "600ac7d8df54617a28ac89ff",
            "question": "615ae3e7b0ca3100073e467c",
            "contentType": "application/vnd.cotalker.survey+text",
            "identifier": "cities_00_1633346534779",
            "diff": []
        },
        {
            "code": [
                "{\"allow\":\"propertyType\",\"value\":\"location\",\"filter\":\"*\"}"
            ],
            "display": [],
            "responses": [
                "{\"_id\":\"613fd0154a8541000782eb14\",\"subproperty\":[],\"isActive\":true,\"name\":nyc_00\",\"display\":\"New York\"},\"propertyType\":\"location\",\"600ac7d8df5461626aac89c0\",\"createdAt\":\"2021-09-13T22:26:29.673Z\",\":\"2021-09-13T22:26:29.686Z\"}"
            ],
            "process": [
                "613fd0154a8541000782eb14"
            ],
            "_id": "615c8c3bb478e900079e607b",
            "user": "600ac7d8df54617a28ac89ff",
            "question": "615ae3e7b0ca3100073e467d",
            "contentType": "application/vnd.cotalker.survey+property",
            "identifier": "cities_00",
            "diff": [
                {
                    "_id": "615c8c3bb478e900079e607c",
                    "op": "remove",
                    "path": "/responses/0",
                    "modifiedAt": "2021-10-05T17:32:43.598Z"
                }
            ]
        }
    ],
```

## Fields {#fields}

| Field | Description | [Type](/docs/documentation/models/overview_model#data-types) | Notes |
| ---- | ---- | ---- | ---- |
| code | Displays code parameters according to the [content type](/docs/documentation/models/surveys/model_questionContentType). | [string] | |
| contentType | Indicates the question's [content type](/docs/documentation/models/surveys/model_questionContentType). | string | |
| diff | Each `diff` object indicates changes or modifications made to an _answer_ after the form was submitted. | object[ ] | |
| diff[index].from | | string | |
| diff[index].modifiedAt | Indicates when the modification took place.| ISODate | YYYY-MM-DDTHH:mm:ss.SSSZ |
| diff[index].op | Indicates the type of modification carried out. | string | `remove`, `replace`, `add` |
| diff[index].path | Points to the `responses` or `code` path that was modified. | string | |
| diff[index].value | Depending on the content type, shows the previous value that was modified. | string | |
| display | Indicates the displayed field label in the survey. | [string] | Only present in objects that represent the survey field labels. |
| group | | string | |
| identifier | Indicates the question's unique identification name. | string | |
| process | Shows the input data that will be processed. | [string] | |
| question | References the asked survey question. | ObjectId<COTQuestion\> | [Questions Data Model](/docs/documentation/models/surveys/model_questions) |
| responses | Shows the input data after being processed. | [string] | |
| user | Indicates the _user_ that submitted the form. | ObjectId<COTUser\> | [Users Data Group](/docs/documentation/models/users/model_users) |


## Additional Resources {#resources}

- [Surveys Overview](/docs/documentation/admin/survey/survey_overview): complete description about surveys
- [Reports](/docs/documentation/client/reports): view submitted survey answers 
- ["Answers" REST API documentation](docs/documentation/api/surveys/answers): basic "Answers" API requests
- [API documentation in Swagger](https://www.cotalker.com/swagger/core/?key=woubtjf4olr0t4zgutuwn6scbcm6hd3qh1cgl5obmohpbm3mfublnwcvv67lodgjvd3h86s9ppshtvmf95gepsqh6nizq9liu7f): complete with data models (schemas)
- [COTLang](/docs/documentation/automation/admin_cotlang): use COTLang for extracting data from models in routines
- [Triggers and Contexts](/docs/documentation/automation/triggers_and_contexts): more information on using data models within routines

## Help {#help}

- [Cotalker Platform Community](https://github.com/Cotalker/documentation/discussions): post your questions or search for previous answers given in the forum
