---
title: Survey Chats
---
import useBaseUrl from '@docusaurus/useBaseUrl'; 
import Highlight from '@theme/Highlight';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Overview {#overview}

_Survey chats_ represent a [survey's _components_](/docs/documentation/admin/survey/survey_overview#form-components) and hold together the [_questions_](/docs/documentation/models/surveys/model_questions) that make up each specific _component_ in a _survey_.

## Get Survey Chats {#get-all}
_Returns all survey chats within the company._

<span className="hero__subtitle"><span className="badge badge--success">GET</span> /surveychats</span>

#### Endpoint URL {#get-all-url}
`https://www.coltaker.com/api/v2/surveychats`

#### Headers {#get-all-headers}
Header | Description | Required | Values
--- | --- | --- | ---
**Authorization** | Sends your _access token_ to make an API request.<br/>[Click here to see how to obtain an _access token_.](/docs/documentation/api/auth#how-to) | Required | Bearer $ACCESS_TOKEN

#### Query Parameters {#query-get-all}

Parameter | Description | Type | Required | Notes
--- | --- | --- | ---- | ----
**limit** | Limits the amount of _survey chats_ returned in the response. | number | Optional | By default, the _limit_ is set to 10.
**page** | Makes the response display data from the indicated page number. | number | Optional | Best used in combination with the "limit" parameter.
**count** | Adds the `counter` field with the total amount of _survey chats_ within the company. | boolean | Optional | 
**survey** | Returns _survey chats_ that correspond to the indicated _survey_. | [ObjectId<COTSurvey\>[ ]](/docs/documentation/models/surveys/model_surveys) |
**ids** | Returns _survey chats_ with the IDs indicated in the array. | [ObjectId<COTSurveyChats\>[ ]](/docs/documentation/models/surveys/model_surveychats) | Optional |
**modified** | Returns _survey chats_ with the indicated modification date in the `modifiedAt` field. | ISODate | Optional | YYYY-MM-DDTHH:mm:ss.SSSZ
**modified_gt** | Returns _survey chats_ modified after the indicated date and time. | ISODate | Optional | YYYY-MM-DDTHH:mm:ss.SSSZ
**modified_gte** | Returns _survey chats_ with a value in the `modifiedAt` field equal to or greater than the indicated date and time. | ISODate | Optional | YYYY-MM-DDTHH:mm:ss.SSSZ
**modified_lt** | Returns _survey chats_ modified before the indicated date and time. | ISODate | Optional | YYYY-MM-DDTHH:mm:ss.SSSZ
**modified_lte** | Returns _survey chats_ with a value in the `modifiedAt` field equal to or less than the indicated date and time. | ISODate | Optional | YYYY-MM-DDTHH:mm:ss.SSSZ
**isActive** | Returns _survey chats_ according to their `isActive` status. | string | Optional | Options are: `all`, `true`, `false`
**debug** | Adds the `debug` field with error notifications. | string | Optional | Option: `true`

#### Request Samples {#get-all-request-sample}

<Tabs defaultValue="curl-get-all" values={[ {label: 'cURL (default)', value: 'curl-get-all'}, {label: 'cURL (query)', value: 'curl-group'}, {label: 'Typescript (default)', value: 'typescript'} ]}>
<TabItem value="curl-get-all">

_This default request gets all the survey chats in the company._
```bash
curl --location --request GET 'https://www.cotalker.com/api/v2/surveychats' \
--header 'Authorization: Bearer $ACCESS_TOKEN'
```

</TabItem>
<TabItem value="curl-group">

_This request gets the survey chats related to the indicated survey._
```bash
curl --location --request GET 'https://www.cotalker.com/api/v2/surveychats?survey=61a56d18d4ffd1354af8f4cd' \
--header 'Authorization: Bearer $ACCESS_TOKEN' \
```

</TabItem>
<TabItem value="typescript" example="api_surveys.ts">

_This example gets all the survey chats in the company._
```typescript
// $ACCESS_TOKEN stored in .env file.
import { SurveyChatGetCollection, Configuration, V2SurveychatsApi} from "@cotalker/cotalker-api";

const api = new V2SurveychatsApi(new Configuration({
    basePath: 'https://www.cotalker.com/api',
    accessToken: process.env.ACCESS_TOKEN,
    apiKey: 'true',
}));

async function getSurveyChats(): Promise<SurveyChatGetCollection | undefined> {
    const response = await api.getV2Surveychats();
    return response.data?.data;
}

getSurveyChats().then(surveyChats => console.log(surveyChats)).catch(e=>console.log(e))
```
</TabItem>
</Tabs>

#### Response Sample {#get-all-response-sample}
Responses follow the [COTSurveyChat](/docs/documentation/models/surveys/model_surveychats) data model.

---

## Get a Survey by Id {#get-by-id}
_Returns the survey chat indicated by the Id._

<span className="hero__subtitle"><span className="badge badge--success">GET</span> /surveychats/&#123;id&#125;</span>

#### Endpoint URL {#get-by-id-url}
`https://www.coltaker.com/api/v2/surveychats/{id}`

#### Path Parameters {#get-by-path}
Parameter | Description | Type | Required | Notes
--- | --- | --- | --- | ---
**id** | The ObjectId of the _survey chat_ that is to be returned. | [ObjectId<COTSurveyChat\>](/docs/documentation/models/surveys/model_surveychats) | Required |

#### Headers {#get-by-id-headers}
Header | Description | Required | Values
--- | --- | --- | ---
**Authorization** | Sends your _access token_ to make an API request.<br/>[Click here to see how to obtain an _access token_.](/docs/documentation/api/auth#how-to) | Required | Bearer $ACCESS_TOKEN

#### Query Parameters {#get-by-id}
Parameter | Description | Type | Required | Notes
--- | --- | --- | --- | ---
**debug** | Adds the `debug` field with error notifications. | string | Optional | Option: `true`

#### Request Sample {#get-by-id-request}
```bash
curl --location --request GET 'https://www.cotalker.com/api/v2/surveychats/61a5ee4b54951757297e38de' \
--header 'Authorization: Bearer $ACCESS_TOKEN'
```

#### Response Sample {#get-by-id-response}
The response follows the [COTSurveyChat](/docs/documentation/models/surveys/model_surveychats) data model.

---
