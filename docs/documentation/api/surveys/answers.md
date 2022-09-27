---
id: answers
title: Answers
sidebar_label: Answers
---
import useBaseUrl from '@docusaurus/useBaseUrl'; 


## Overview {#overview}
An answer is the representation of a submitted survey. It contains the latest version of the survey data.

:::tip additional resources
These are just some of the most basic API requests. For a complete list of endpoints, consult our [API documentation on Swagger](https://www.cotalker.com/swagger/core/?key=woubtjf4olr0t4zgutuwn6scbcm6hd3qh1cgl5obmohpbm3mfublnwcvv67lodgjvd3h86s9ppshtvmf95gepsqh6nizq9liu7f#/).
:::

## Get Answers {#get-all}
_Returns answers within the specified criteria. To get _answers_ you must provide either an _answer uuid_, a _survey id_, or _property id_ in the query parameters. You can also use the query parameters to filter and find _answers_ according to _users_ or _modified date_.
_

<span className="hero__subtitle"><span className="badge badge--success">GET</span> /answers</span>

#### Endpoint URL {#get-all-url}
`https://www.cotalker.com/api/v2/answers`

#### Headers {#get-all-headers}
Header | Description | Required | Values
--- | --- | --- | ---
**Admin** | Authorizes access to answers. | Required | true
**Authorization** | Sends your _access token_ to make an API request.<br/>[Click here to see how to obtain an _access token_.](/docs/documentation/api/auth#how-to) | Required | Bearer $ACCESS_TOKEN

#### Query Parameters {#query-get-all}

Parameter | Description | Type | Required | Notes
--- | --- | --- | ---- | ----
**extra** | Adds extra information in the response regarding associated objects. | string[ ] | Optional | Options are: "channels", "properties", "users", "surveys", "questions", and "surveychats". More than one `extra` query parameter can be user per request.
**user** | Returns answers submitted by the indicated _user_ in regards to the specified criteria in one of the following query parameters: _surveys_, _answer uuids_, or _properties_. | [ObjectId<COTUser\>[ ]](/docs/documentation/models/users/model_users) | Optional |
**survey** | Returns answers from the specified _survey_. | [ObjectId<COTSurvey\>](/docs/documentation/models/surveys/model_surveys) | Required if neither `surveyIds`, `properties`, nor `answerUuids` query parameters are being used. | 
**surveyIds** | Returns answers from the specified _surveys_. | [ObjectId<COTSurvey\>[ ]](/docs/documentation/models/surveys/model_surveys) | Required if neither `survey`, `properties`, nor `answerUuids` query parameters are being used. | 
**properties** | Returns answers with the specified _properties_. | [ObjectId<Property\>[ ]](/docs/documentation/models/databases/model_properties) | Required if neither `survey`, `surveyIds`, nor `answerUuids` query parameters are being used. | 
**answerUuids** | Returns answers with the specified _answer uuids_. | [ObjectId<COTAnswer\>[ ]](/docs/documentation/models/surveys/model_answers) | Required if neither `survey`, `surveyIds`, nor `properties` query parameters are being used. | 
**modifiedAtGte** | Returns _answers_ with a value in the `modifiedAt` field equal to or greater than the indicated date and time. | ISODate | Optional | YYYY-MM-DDTHH:mm:ss.SSSZ
**modifiedAtLte** | Returns _answers_ with a value in the `modifiedAt` field equal to or less than the indicated date and time. | ISODate | Optional | YYYY-MM-DDTHH:mm:ss.SSSZ
**fullMatchProperties** | Returns _answers_ that contain all the properties searched for through the query parameters. | boolean | Optional | Must be used in conjunction with the `properties` query parameter.
**limit** | Limits the amount of _answers_ returned in the response. | number | Optional | By default, the _limit_ is set to 10.
**page** | Makes the response display data from the indicated page number. | number | Optional | Best used in combination with the `limit` parameter.
**count** | Adds the `counter` field with the total amount of _questions_ within the company. | boolean | Optional | 
**orderBy** | Returns _answers_ in ascending or descending order. | string | Optional | Must be used in conjunction with the `sortBy` query parameter.
**sortBy** | Sorts _answers_ by date created. | string | Optional | Must be used in conjunction with the `orderBy` query parameter.
**debug** | Adds the `debug` field with error notifications. | string | Optional | Option: `true`

#### Request Samples {#get-all-request-sample}

_This request gets all the answers submitted by a specific user on the indicated survey._
```bash
curl --location --request GET 'https://www.cotalker.com/api/v2/answers?survey=61a50f928843af3e1332c67f&user=61953bf9bdc3558a4966e54d' \
--header 'Admin: true' \
--header 'Authorization: Bearer $ACCESS_TOKEN' \
```

#### Response Sample {#get-all-response-sample}
Responses follow the [COTAnswer](/docs/documentation/models/surveys/model_answers) data model.

---


## Get an Answer by Id {#get-by-id}
_Returns the answer indicated by the Id._

<span className="hero__subtitle"><span className="badge badge--success">GET</span> /answers/&#123;id&#125;</span>

#### Endpoint URL {#get-by-id-url}
`https://www.cotalker.com/api/v2/answers/{id}`

#### Path Parameters {#get-by-path}
Parameter | Description | Type | Required | Notes
--- | --- | --- | --- | ---
**id** | Either the `_id` or `_uuid_` of the _answer_ that is to be returned. | [ObjectId<COTAnswer\>](/docs/documentation/models/surveys/model_answers) | Required |

#### Headers {#get-by-id-headers}
Header | Description | Required | Values
--- | --- | --- | ---
**Admin** | Authorizes the use of the endpoint. | Required | true
**Authorization** | Sends your _access token_ to make an API request.<br/>[Click here to see how to obtain an _access token_.](/docs/documentation/api/auth#how-to) | Required | Bearer $ACCESS_TOKEN

#### Query Parameters {#get-by-id}
Parameter | Description | Type | Required | Notes
--- | --- | --- | --- | ---
**debug** | Adds the `debug` field with error notifications. | string | Optional | Option: `true`

#### Request Sample {#get-by-id-request}
```bash
curl --location --request GET 'https://www.cotalker.com/api/v2/answers/61a7c1df03ffa8e4ee2df904' \
--header 'Admin: true' \
--header 'Accept: application/json' \
--header 'Authorization: Bearer $ACCESS_TOKEN'
```

#### Response Sample {#get-by-id-response}
The response follows the [COTAnswer](/docs/documentation/models/surveys/model_answers) data model.

---
