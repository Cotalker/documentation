---
title: Questions
---
import useBaseUrl from '@docusaurus/useBaseUrl'; 
import Highlight from '@theme/Highlight';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Overview {#overview}
[_Questions_](/docs/documentation/models/surveys/model_questions) make up the parts of [_survey or form components_](/docs/documentation/admin/survey/survey_overview#form-components). They are contained within [surveys](/docs/documentation/models/surveys/model_surveys) through [survey chats](/docs/documentation/models/surveys/model_surveychats).

## Get Questions {#get-all}
_Returns all questions within the company._

<span className="hero__subtitle"><span className="badge badge--success">GET</span> /questions</span>

#### Endpoint URL {#get-all-url}
`https://www.coltaker.com/api/v2/questions`

#### Headers {#get-all-headers}
Header | Description | Required | Values
--- | --- | --- | ---
**Admin** | Authorizes the use of some options. | Depends on the query parameters. | true
**Authorization** | Sends your _access token_ to make an API request.<br/>[Click here to see how to obtain an _access token_.](/docs/documentation/api/auth#how-to) | Required | Bearer $ACCESS_TOKEN

#### Query Parameters {#query-get-all}

Parameter | Description | Type | Required | Notes
--- | --- | --- | ---- | ----
**limit** | Limits the amount of _questions_ returned in the response. | number | Optional | By default, the _limit_ is set to 10.
**page** | Makes the response display data from the indicated page number. | number | Optional | Best used in combination with the "limit" parameter.
**count** | Adds the `counter` field with the total amount of _questions_ within the company. | boolean | Optional | 
**ids**<br/>OR<br/>**\_id** | Returns _questions_ with the IDs indicated in the array. | [ObjectId<COTQuestion\>[ ]](/docs/documentation/models/surveys/model_questions) | Optional |
**modified** | Returns _questions_ with the indicated modification date in the `modifiedAt` field. | ISODate | Optional | YYYY-MM-DDTHH:mm:ss.SSSZ
**modified_gt** | Returns _questions_ modified after the indicated date and time. | ISODate | Optional | YYYY-MM-DDTHH:mm:ss.SSSZ
**modified_gte** | Returns _questions_ with a value in the `modifiedAt` field equal to or greater than the indicated date and time. | ISODate | Optional | YYYY-MM-DDTHH:mm:ss.SSSZ
**modified_lt** | Returns _questions_ modified before the indicated date and time. | ISODate | Optional | YYYY-MM-DDTHH:mm:ss.SSSZ
**modified_lte** | Returns _questions_ with a value in the `modifiedAt` field equal to or less than the indicated date and time. | ISODate | Optional | YYYY-MM-DDTHH:mm:ss.SSSZ
**created** | Returns _questions_ with the indicated creation date in the `createdAt` field. | ISODate | Optional | YYYY-MM-DDTHH:mm:ss.SSSZ
**created_gt** | Returns _questions_ created after the indicated date and time. | ISODate | Optional | YYYY-MM-DDTHH:mm:ss.SSSZ
**created_gte** | Returns _questions_ with a value in the `createdAt` field equal to or greater than the indicated date and time. | ISODate | Optional | YYYY-MM-DDTHH:mm:ss.SSSZ
**created_lt** | Returns _questions_ created before the indicated date and time. | ISODate | Optional | YYYY-MM-DDTHH:mm:ss.SSSZ
**created_lte** | Returns _questions_ with a value in the `createdAt` field equal to or less than the indicated date and time. | ISODate | Optional | YYYY-MM-DDTHH:mm:ss.SSSZ
**isActive** | Returns _questions_ according to their `isActive` status. | string | Optional | Options are: `all`, `true`, `false`<br/>Requires the "Admin" header.
**debug** | Adds the `debug` field with error notifications. | string | Optional | Option: `true`

#### Request Samples {#get-all-request-sample}

<Tabs defaultValue="curl-get-all" values={[ {label: 'cURL (default)', value: 'curl-get-all'}, {label: 'cURL (query)', value: 'curl-group'}, {label: 'Typescript (default)', value: 'typescript'} ]}>
<TabItem value="curl-get-all">

_This default request gets all the questions in the company._
```bash
curl --location --request GET 'https://www.cotalker.com/api/v2/questions' \
--header 'Authorization: Bearer $ACCESS_TOKEN'
```

</TabItem>
<TabItem value="curl-group">

_This request gets the questions modified on or after the indicated date and time._
```bash
curl --location --request GET 'https://www.cotalker.com/api/v2/questions?modified_gte=2020-11-24T14:59:40.366Z' \
--header 'Authorization: Bearer $ACCESS_TOKEN'
```

</TabItem>
<TabItem value="typescript" example="api_surveys.ts">

_This example gets all the questions in the company._
```typescript
// $ACCESS_TOKEN stored in .env file.
import { QuestionGetCollection, Configuration, V2QuestionsApi} from "@cotalker/cotalker-api";

const api = new V2QuestionsApi(new Configuration({
    basePath: 'https://www.cotalker.com/api',
    accessToken: process.env.ACCESS_TOKEN,
    apiKey: 'true',
}));

async function getQuestions(): Promise<QuestionGetCollection | undefined> {
    const response = await api.getV2Questions();
    return response.data?.data;
}

getQuestions().then(questions => console.log(questions)).catch(e=>console.log(e))
```
</TabItem>
</Tabs>

#### Response Sample {#get-all-response-sample}
Responses follow the [COTQuestion](/docs/documentation/models/surveys/model_questions) data model.

---


## Get a Question by Id {#get-by-id}
_Returns the question indicated by the Id._

<span className="hero__subtitle"><span className="badge badge--success">GET</span> /questions/&#123;id&#125;</span>

#### Endpoint URL {#get-by-id-url}
`https://www.coltaker.com/api/v2/questions/{id}`

#### Path Parameters {#get-by-path}
Parameter | Description | Type | Required | Notes
--- | --- | --- | --- | ---
**id** | The ObjectId of the _question_ that is to be returned. | [ObjectId<COTQuestion\>](/docs/documentation/models/surveys/model_questions) | Required |

#### Headers {#get-by-id-headers}
Header | Description | Required | Values
--- | --- | --- | ---
**Admin** | Authorizes the use of some options. | Depends on the query parameters. | true
**Authorization** | Sends your _access token_ to make an API request.<br/>[Click here to see how to obtain an _access token_.](/docs/documentation/api/auth#how-to) | Required | Bearer $ACCESS_TOKEN

#### Query Parameters {#get-by-id}
Parameter | Description | Type | Required | Notes
--- | --- | --- | --- | ---
**debug** | Adds the `debug` field with error notifications. | string | Optional | Option: `true`
**isActive** | Returns the _question_ if it coincides with the selected `isActive` status. | string | Optional | Options are: `all`, `true`, `false`.<br/>Requires the "Admin" header.

#### Request Sample {#get-by-id-request}
```bash
curl --location --request GET 'https://www.cotalker.com/api/v2/questions/61a635c023ddfab3c0184c42' \
--header 'Admin: true' \
--header 'Authorization: Bearer $ACCESS_TOKEN'
```

#### Response Sample {#get-by-id-response}
The response follows the [COTQuestion](/docs/documentation/models/surveys/model_questions) data model.

---

## Create a New Question {#post-new}
_Creates a new question._

<span className="hero__subtitle"><span className="badge badge--info">POST</span> /questions</span>

#### Endpoint URL {#post-new-url}
`https://www.cotalker.com/api/v2/questions`

#### Headers {#post-new-headers}

Header | Description | Required | Values
--- | --- | --- | ---
**Admin** | Grants administrative access to create a new _survey chat_. | Required | true 
**Authorization** | Sends your _access token_ to make an API request.<br/>[Click here to see how to obtain an _access token_.](/docs/documentation/api/auth#how-to) | Required | Bearer $ACCESS_TOKEN
**Content-Type** | Indicates the body's format. | Required | application/json

#### Query Parameters {#post-new-query}
Parameter | Description | Type | Required | Notes
--- | --- | --- | --- | ---
**debug** | Adds the `debug` field with error notifications. | string | Optional | Option: `true`

#### Request Body {#post-new-body}
_Only required fields are listed below. For a complete schema description, please go to the [COTQuestion data model](/docs/documentation/models/surveys/model_questions). Unrequired fields that are not submitted are either filled in automatically or left blank._

Element | Description | Type | Required | Notes
--- | --- | --- | --- | ---
**contentType** | Indicates _COTQuestionContentType_, i.e. [survey component type](/docs/documentation/admin/survey/survey_overview#form-components) | string | Required | [List of question content types](/docs/documentation/models/surveys/model_questionContentType)
**display** | Displayed question title or _field label_ | string[ ] | Required | Its contents depend on the `contentType` and whether the data model corresponds to the _title_ section of the question.

#### Request Sample {#post-new-request}
_Survey chat created with the minimum required fields:_
```bash
curl --location --request POST 'https://www.cotalker.com/api/v2/questions' \
--header 'Admin: true' \
--header 'Authorization: Bearer $ACCESS_TOKEN' \
--header 'Content-Type: application/json' \
--data-raw '{
    "display": [
        "Input 4"
    ],
    "contentType": "application/vnd.cotalker.survey+text"
}'
```

#### Response Sample {#post-new-response}
Go to [COTQuestion](/docs/documentation/models/surveys/model_questions) for a complete description of the response.
```json {7-9,14}
{
    "command": {
        "commands": [],
        "resetIdentifiers": [],
        "values": []
    },
    "display": [
        "Input 4"
    ],
    "code": [],
    "isActive": true,
    "isSystemModel": false,
    "_id": "61a65dfd61adbedb7d7511c3",
    "contentType": "application/vnd.cotalker.survey+text",
    "company": "6136968b580aaf2b0e49d844",
    "identifier": "1638291417215hoo28",
    "modifiedAt": "2021-11-30T16:56:57.219Z",
    "textAlign": "left",
    "__v": 0
}
```
---



## QR Code & NFC function {#qr-code--nfc-function}
_Gather information for your surveys through QR code scan and NFC by adding the corresponding values in the question's `code` field._

:::note
- Only functional on mobile devices.
- Configurable only through API requests.
:::

<span className="hero__subtitle"><span className="badge badge--info">POST</span> /questions</span>

#### Endpoint URL {#post-new-url}
`https://www.cotalker.com/api/v2/questions`

#### Headers {#post-new-headers}

Header | Description | Required | Values
--- | --- | --- | ---
**Admin** | Grants administrative access to create a new _question_. | Required | true 
**Authorization** | Sends your _access token_ to make an API request.<br/>[Click here to see how to obtain an _access token_.](/docs/documentation/api/auth#how-to) | Required | Bearer $ACCESS_TOKEN
**Content-Type** | Indicates the body's format. | Required | application/json

#### Query Parameters {#post-new-query}
Parameter | Description | Type | Required | Notes
--- | --- | --- | --- | ---
**debug** | Adds the `debug` field with error notifications. | string | Optional | Option: `true`

#### Request Body {#post-new-body}

Field | Description | Type | Required | Notes
--- | --- | --- |--- | ---
**code** | Code depends on the content type. Below is the code for scanning QR & NFC in surveys. | string[ ] | Required | Objects within the array must be written in string format.
**code[index].scan** | | object | Required |
**code[index].scan.enabled** | `true` activates the feature. | boolean | Required |
**code[index].scan.source** | Indicates the input source. | string[ ] | Required | Valid options: `qr` and/or `nfc`.
**code[index].scan.force** | `true` allows only QR Code or NFC input. `false` permits manual text input, also. | boolean | Required |
**contentType** | Indicates how the system should interpret the data. | string | Required | Must be set to: `application/vnd.cotalker.survey+text`

#### Request Sample

```bash
"code": ["{ \"scan\": {\"enabled\": true,\"source\": [ \"qr\", \"nfc\" ], \"force\": true }}"]
```



## Update a Question {#patch-update}
_Updates or edits an existing question._

<span className="hero__subtitle"><span className="badge badge--warning">PATCH</span> /questions/&#123;id&#125;</span>

#### Endpoint URL {#patch-update-url}
`https://www.cotalker.com/api/v2/questions/{id}`

#### Path Parameters {#patch-update-path}
Parameter | Description | Type | Required | Notes
--- | --- | --- | --- | ---
**id** | The ObjectId of the _question_ that is to be modified. | [ObjectId<COTQuestion\>](/docs/documentation/api/surveys/questions) | Required |

#### Headers {#patch-update-headers}
Header | Description | Required | Values
--- | --- | --- | ---
**Admin** | Grants administrative access to modify a _question_. | Required | true 
**Authorization** | Sends your _access token_ to make an API request.<br/>[Click here to see how to obtain an _access token_.](/docs/documentation/api/auth#how-to) | Required | Bearer $ACCESS_TOKEN
**Content-Type** | Sets the body's format. | Required | application/json

#### Query Parameters {#patch-update-query}
Parameter | Description | Type | Required | Notes
--- | --- | --- | --- | ---
**debug** | Adds the `debug` field with error notifications. | string | Optional | Option: `true`

#### Request Body {#patch-update-body}
_Only the fields that are being updated or added are required to be put into the body. For a complete schema description, please go to the [COTQuestion data model](/docs/documentation/models/surveys/model_questions)._

#### Request Sample {#patch-update-request}
_This sample sets up conditional display questions inserting a command object:_

```bash
curl --location --request PATCH 'https://www.cotalker.com/api/v2/questions/61a66fdc9e7c38b758a0b93d?debug=true' \
--header 'Admin: true' \
--header 'Authorization: Bearer $ACCESS_TOKEN' \
--header 'Content-Type: application/json' \
--data-raw '{
    "command": {
        "commands": [],
        "resetIdentifiers": [],
        "isCommanded": "item_list",
        "values": [
            {
                "_id": "615af821b0ca3100073e4f1a",
                "op": "eq",
                "target": "op_1"
            }
        ]
    }
}'
```

#### Response Sample {#patch-update-response}
Go to [COTQuestion](/docs/documentation/models/surveys/model_questions) for a complete description of the response.
```json {2-13}
{
    "command": {
        "commands": [],
        "resetIdentifiers": [],
        "values": [
            {
                "_id": "615af821b0ca3100073e4f1a",
                "op": "eq",
                "target": "op_1"
            }
        ],
        "isCommanded": "item_list"
    },
    "display": [
        "Input 1"
    ],
    "code": [],
    "isActive": true,
    "isSystemModel": false,
    "_id": "61a66fdc9e7c38b758a0b93d",
    "contentType": "application/vnd.cotalker.survey+text",
    "company": "5f5a74a8fdf77a0008a6349a",
    "identifier": "1638287705330orcsk",
    "modifiedAt": "2021-11-30T18:21:24.335Z",
    "textAlign": "left",
    "__v": 0,
    "isReadOnly": false
}
```
---

