---
title: Survey Chats
---
import useBaseUrl from '@docusaurus/useBaseUrl'; 
import Highlight from '@theme/Highlight';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Subtitle {#subtitle}
## Survey Chats Model TEMP {#survey-chats-model-temp}

| Field | Type | Description | Notes |
| ----  | ---- | ----------- | ----  |
| _id   | id   | Unique Identifier   | Unique. Exactly 24 chars. Valid chars [0-9a-f] |
| sender | string | sender name 
| survey  | id | survey linked to | Unique. Exactly 24 chars. Valid chars [0-9a-f] |
| order  | number |
| contentType  | string | application/vnd.cotalker.survey'
| content | string | 
| contentArray | Array | Question id's
| isActive | boolean | 
| modifiedAt | date |
| isSystemModel | boolean |
NOTE: This is a simplified version. Please check the [API](https://www.cotalker.com/swagger/core/?key=woubtjf4olr0t4zgutuwn6scbcm6hd3qh1cgl5obmohpbm3mfublnwcvv67lodgjvd3h86s9ppshtvmf95gepsqh6nizq9liu7f) docs for the full model.


## Client Survey_Chats-API {#client-survey_chats-api}
* List all survey_chats

## Examples {#examples}
[A valid access-token is required to perform the request.](/docs/documentation/api/auth)

<Tabs defaultValue="curl" values={[ {label: 'Shell', value: 'curl'}, {label: 'Typescript', value: 'typescript'} ]}>
<TabItem value="curl">

```bash
curl --location --request GET 'https://www.cotalker.com/api/v2/surveychats/' \
--header 'Authorization: Bearer ACCESS-TOKEN'
``` 

</TabItem>
<TabItem value="typescript" example="api_properties.ts">

```typescript
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

Expected network result 
<!-- response=api_user.json -->
```json
{
    "data": {
        "surveyChats": [
            {
                "_id": "5fb6ddd3b3f9054d87f493f2",
                "sender": "#user",
                "survey": "5fb6dddbad035ed3ff1e6820",
                "order": 0,
                "contentType": "application/vnd.cotalker.survey",
                "content": "",
                "contentArray": [
                    "5fb6dde6aaaa391d9cc3051e",
                    "5fb6ddefa18dbf0d528a888d"
                ],
                "isActive": true,
                "modifiedAt": "2017-08-31T16:05:25.634Z",
                "isSystemModel": "<boolean>"
            },
            {
                "_id": "5fb6ddfbfe00bf1ffa879417",
                "sender": "#user",
                "survey": "5fb6de03ebcc365bc127c730",
                "order": 0,
                "contentType": "application/vnd.cotalker.survey",
                "content": "",
                "contentArray": [
                    "5fb6de11ccbfa4b0e2355260",
                    "5fb6de1c42223cfd0536fe9e"
                ],
                "isActive": true,
                "modifiedAt": "2017-10-17T15:47:36.848Z",
                "isSystemModel": "<boolean>"
            }
        ]
    }
}



``` 