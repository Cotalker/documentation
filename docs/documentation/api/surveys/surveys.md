---
title: Surveys
---
import useBaseUrl from '@docusaurus/useBaseUrl';
import Highlight from '@theme/Highlight';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Overview {#overview}

A [_survey_](/docs/documentation/admin/survey/survey_overview) is a way of gathering information from users through _workflows_, _channels_, _bots_, or even _public surveys_ outside the Cotalker environment.

The `/surveys` API request works with [_survey data models_ (COTSurvey)](/docs/documentation/models/surveys/model_surveys), which consolidate other data models: [COTSurveyChat](/docs/documentation/models/surveys/model_surveychats), [COTQuestion](/docs/documentation/models/surveys/model_questions), [COTAnswer](/docs/documentation/models/surveys/model_answers).

## Get Properties {#get-all}
_Returns all properties within the company._

<span className="hero__subtitle"><span className="badge badge--success">GET</span> /surveys</span>

#### Endpoint URL {#get-all-url}
`https://www.coltaker.com/api/v2/surveys`

#### Headers {#get-all-headers}
Header | Description | Required | Values
--- | --- | --- | ---
**Authorization** | Sends your _access token_ to make an API request.<br/>[Click here to see how to obtain an _access token_.](/docs/documentation/api/auth#how-to) | Required | Bearer $ACCESS_TOKEN

#### Query Parameters {#query-get-all}

Parameter | Description | Type | Required | Notes
--- | --- | --- | ---- | ----
**limit** | Limits the amount of _surveys_ returned in the response. | number | Optional | By default, the _limit_ is set to 10.
**page** | Makes the response display data from the indicated page number. | number | Optional | Best used in combination with the "limit" parameter.
**count** | Adds the `counter` field with the total amount of _surveys_ within the company. | boolean | Optional | 
**answer** | Returns the ObjectId of the _survey_ associated with the indicated _answer_. | string[ ] | Optional | _Answers_ are identified by the [ObjectId in their `uuid` field](/docs/documentation/models/surveys/model_answers).
**select** | | string[ ] | Optional |
**isActive** | Returns _surveys_ according to their `isActive` status. | string | Optional | Options are: `all`, `true`, `false`
**search** | Returns _surveys_ with field values that begin with the search query. | string | Optional |
**debug** | Adds the `debug` field with error notifications. | string | Optional | Option: `true`

#### Request Samples {#get-all-request-sample}

<Tabs defaultValue="curl-get-all" values={[ {label: 'cURL (default)', value: 'curl-get-all'}, {label: 'cURL (query)', value: 'curl-group'}, {label: 'Typescript (default)', value: 'typescript'} ]}>
<TabItem value="curl-get-all">

_This default request gets all the surveys in the company._
```bash
curl --location --request GET 'https://www.cotalker.com/api/v2/surveys' \
--header 'Authorization: Bearer $ACCESS_TOKEN'
```

</TabItem>
<TabItem value="curl-group">

_This request gets the survey related to the indicated answer._
```bash
curl --location --request GET 'https://www.cotalker.com/api/v2/surveys?answer=61a4f900cafd3b3a5cfd8cc3' \
--header 'Authorization: Bearer $ACCESS_TOKEN'
```

</TabItem>
<TabItem value="typescript" example="api_surveys.ts">

_This example gets all the surveys in the company._
```typescript
// $ACCESS_TOKEN stored in .env file.
import { SurveyGetCollection, Configuration, V2SurveysApi} from "@cotalker/cotalker-api";

const api = new V2SurveysApi(new Configuration({
    basePath: 'https://www.cotalker.com/api',
    accessToken: process.env.ACCESS_TOKEN,
    apiKey: 'true',
}));

async function getSurveys(): Promise<SurveyGetCollection | undefined> {
    const response = await api.getV2Surveys();
    return response.data?.data;
}

getSurveys().then(surveys => console.log(surveys)).catch(e=>console.log(e))
``` 
</TabItem>
</Tabs>

#### Response Sample {#get-all-response-sample}
Responses follow the [COTSurvey](/docs/documentation/models/surveys/model_surveys) data model.

---

## Get a Survey by Id {#get-by-id}
_Returns the survey indicated by the Id._

<span className="hero__subtitle"><span className="badge badge--success">GET</span> /surveys/&#123;id&#125;</span>

#### Endpoint URL {#get-by-id-url}
`https://www.coltaker.com/api/v2/surveys/{id}`

#### Path Parameters {#get-by-path}
Parameter | Description | Type | Required | Notes
--- | --- | --- | --- | ---
**id** | The ObjectId of the _survey_ that is to be returned. | [ObjectId<COTSurvey\>](/docs/documentation/models/surveys/model_surveys) | Required |

#### Headers {#get-by-id-headers}
Header | Description | Required | Values
--- | --- | --- | ---
**Admin** | Grants access to request the endpoint. | Required | true
**Authorization** | Sends your _access token_ to make an API request.<br/>[Click here to see how to obtain an _access token_.](/docs/documentation/api/auth#how-to) | Required | Bearer $ACCESS_TOKEN

#### Query Parameters {#get-by-id}
Parameter | Description | Type | Required | Notes
--- | --- | --- | --- | ---
**debug** | Adds the `debug` field with error notifications. | string | Optional | Option: `true`
**populate** | Returns the survey with the `chat` field which contains all the survey's [_survey chats_](/docs/documentation/models/surveys/model_surveychats), i.e., all of the the [survey's components](/docs/documentation/admin/survey/survey_overview#form-components). | boolean | Optional |

#### Request Sample {#get-by-id-request}
```bash
curl --location --request GET 'https://www.cotalker.com/api/v2/surveys/61a500049cf5178a9a6c1abe' \
--header 'Admin: true' \
--header 'Authorization: Bearer $ACCESS_TOKEN'
```

#### Response Sample {#get-by-id-response}
The response follows the [COTSurvey](/docs/documentation/models/surveys/model_surveys) data model.

---

## Create a New Survey {#post-new}
_Creates a new survey within the company._

<span className="hero__subtitle"><span className="badge badge--info">POST</span> /surveys</span>

#### Endpoint URL {#post-new-url}
`https://www.cotalker.com/api/v2/surveys`

#### Headers {#post-new-headers}

Header | Description | Required | Values
--- | --- | --- | ---
**Admin** | Grants administrative access to create a new _survey_. | Required | true 
**Authorization** | Sends your _access token_ to make an API request.<br/>[Click here to see how to obtain an _access token_.](/docs/documentation/api/auth#how-to) | Required | Bearer $ACCESS_TOKEN
**Content-Type** | Indicates the body's format. | Required | application/json

#### Query Parameters {#post-new-query}
Parameter | Description | Type | Required | Notes
--- | --- | --- | --- | ---
**debug** | Adds the `debug` field with error notifications. | string | Optional | Option: `true`

#### Request Body {#post-new-body}
_Only required fields are listed below. For a complete schema description, please go to the [COTSurvey data model](/docs/documentation/models/surveys/model_surveys). Unrequired fields that are not submitted are either filled in automatically or left blank._

Element | Description | Type | Required | Notes
--- | --- | --- | --- | ---
| **code** | The survey's unique identification name | string | Required | Maximum 60 characters; only lowercase letters, numbers, and underscore allowed; must be unique. |
| **name** | The survey's displayed name in the administrative panel | string | Required |
| **version** | Indicates the survey version and determines what fields should be used; `1` uses fields prior to January 2019; `2` uses fields created after January 2019 | number | Required | Fields prior to January 2019: `permissions`, `group`, `groupPermissions`. Fields created after January 2019: `permissionsV2`, `groupPermissionsV2`, `onlySubSurvey`. |

#### Request Sample {#post-new-request}
_Survey created with the minimum required fields:_
```bash
curl --location --request POST 'https://www.cotalker.com/api/v2/surveys?debug=true' \
--header 'Admin: true' \
--header 'Authorization: Bearer $ACCESS_TOKEN' \
--header 'Content-Type: application/json' \
--header 'Cookie: APISESSION=b57bff89da46e4cf1592fc9f6ca9d013' \
--data-raw '{
    "name": "Work Order",
    "code": "work_order_survey",
    "version": 1
}'
```

#### Response Sample {#post-new-response}
Go to [COTSurvey](/docs/documentation/models/surveys/model_surveys) for a complete description of the response.
```json {10,12-13}
{
    "permissions": [],
    "permissionsV2": [],
    "groupPermissionsV2": [],
    "onlySubSurvey": false,
    "propertiesChannel": [],
    "propertiesLimit": [],
    "isActive": true,
    "isSystemModel": false,
    "version": 1,
    "_id": "61a50f928843af3e1332c67f",
    "name": "Work Order",
    "code": "work_order_survey",
    "company": "6136968b580aaf2b0e49d844",
    "createdAt": "2021-11-29T16:58:27.044Z",
    "responders": [],
    "modifiedAt": "2021-11-29T16:58:27.045Z",
    "__v": 0
}
```
---

## Update a Survey {#patch-update}
_Updates or edits an existing survey._

<span className="hero__subtitle"><span className="badge badge--warning">PATCH</span> /surveys/&#123;id&#125;</span>

#### Endpoint URL {#patch-update-url}
`https://www.cotalker.com/api/v1/surveys/{id}`

#### Path Parameters {#patch-update-path}
Parameter | Description | Type | Required | Notes
--- | --- | --- | --- | ---
**id** | The ObjectId of the _survey_ that is to be modified. | [ObjectId<COTSurvey\>](/docs/documentation/models/surveys/model_surveys) | Required |

#### Headers {#patch-update-headers}
Header | Description | Required | Values
--- | --- | --- | ---
**Admin** | Grants administrative access to modify a _survey_. | Required | true 
**Authorization** | Sends your _access token_ to make an API request.<br/>[Click here to see how to obtain an _access token_.](/docs/documentation/api/auth#how-to) | Required | Bearer $ACCESS_TOKEN
**Content-Type** | Sets the body's format. | Required | application/json

#### Query Parameters {#patch-update-query}
Parameter | Description | Type | Required | Notes
--- | --- | --- | --- | ---
**debug** | Adds the `debug` field with error notifications. | string | Optional | Option: `true`

#### Request Body {#patch-update-body}
_Only the fields that are being updated or added are required to be put into the body. For a complete schema description, please go to the [COTSurvey data model](/docs/documentation/models/surveys/model_surveys)._

#### Request Sample {#patch-update-request}
_This sample adds an access role objectId to the permissions field:_

```bash
curl --location --request PATCH 'https://www.cotalker.com/api/v2/surveys/61a50f928843af3e1332c67f?debug=true' \
--header 'Admin: true' \
--header 'Authorization: Bearer $ACCESS_TOKEN' \
--header 'Content-Type: application/json' \
--data-raw '{
    "permissions": "61a51e04e98c389d90eea21d"
}'
```

#### Response Sample {#patch-update-response}
Go to [COTProperty](/docs/documentation/api/databases/properties) for a complete description of the response.
```json {2-4}
{
    "permissions": [
        "61a51e04e98c389d90eea21d"
    ],
    "permissionsV2": [],
    "groupPermissionsV2": [],
    "onlySubSurvey": false,
    "propertiesChannel": [],
    "propertiesLimit": [],
    "isActive": true,
    "isSystemModel": false,
    "version": 1,
    "_id": "61a50f928843af3e1332c67f",
    "name": "Work Order",
    "code": "work_order_survey",
    "company": "6136968b580aaf2b0e49d844",
    "createdAt": "2021-11-29T16:58:27.044Z",
    "responders": [],
    "modifiedAt": "2021-11-29T18:38:15.394Z",
    "__v": 2
}
```
---

