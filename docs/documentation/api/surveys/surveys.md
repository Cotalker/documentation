---
title: Surveys
---
import useBaseUrl from '@docusaurus/useBaseUrl';
import Highlight from '@theme/Highlight';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Surveys are a list of questions. Each question has a `type` and `identifier`. 

:::note
_Surveys_ are built by [messages](/docs/documentation/api/communication/messages), automatically setting the fields.
:::

## Survey Model {#survey-model}

| Field | Type | Description | Notes |
| ----  | ---- | ----------- | ----  |
| _id   | id   | Unique Identifier   | Unique. Exactly 24 chars. Valid chars [0-9a-f] |
| display  | string | Display Name | Required |
| code  | string | Code Name | Unique. Max 60 chars. Valid chars [a-z0-9_] |
| propertiesChannel | Array<string\> | Array of Database Types
| propertiesLimit | Array<string\> | Array of Properties Codes
| permissions | Array<id\> | Array of access roles
| modifiedAt | date | Last modification date
| createdAt | date | Entry creation date
NOTE: This is a simplified version. Please check the [API](https://api.cotalker.com) docs for the full model.


## Client Survey-API {#client-survey-api}
* List all surveys

## Examples {#examples}
[A valid access-token is required to perform the request.](/docs/documentation/api/auth)

<Tabs defaultValue="curl" values={[ {label: 'Shell', value: 'curl'}, {label: 'Typescript', value: 'typescript'} ]}>
<TabItem value="curl">

```bash
curl --location --request GET 'https://www.cotalker.com/api/v2/surveys/' \
--header 'Authorization: Bearer ACCESS-TOKEN'
``` 

</TabItem>
<TabItem value="typescript" example="api_properties.ts">

```typescript
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

Expected network result 
<!-- response=api_user.json -->
```json
{
    "data": {
        "surveys": [
            {
                "_id": "5fb5c65463a7331eb6059ddb",
                "display": "Customer Survey",
                "code": "customer_survey",
                "propertiesChannel": [],
                "propertiesLimit": [],
                "permissions": [],
                "modifiedAt": "2020-10-29T14:20:40.786Z",
                "createdAt": "2020-10-29T14:20:40.786Z"
            },
            {
                "_id": "5fb5c7be20e367f5358565da",
                "display": "Employee Survey",
                "code": "employee_survey",
                "propertiesChannel": [],
                "propertiesLimit": [],
                "permissions": [],
                "modifiedAt": "2020-11-17T13:37:26.238Z",
                "createdAt": "2020-07-27T20:21:55.650Z"
            }   
        ]
    }
}
``` 




### Survey in channel {#survey-in-channel}
<img alt="" src={useBaseUrl('img/models_surveys_2.png')} />
