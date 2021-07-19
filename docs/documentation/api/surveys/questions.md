---
title: Questions
---
import useBaseUrl from '@docusaurus/useBaseUrl'; 
import Highlight from '@theme/Highlight';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::info
Click here for [data model descriptions](/docs/documentation/models/surveys/model_questions)

Click here for complete [API and model specifications](https://www.cotalker.com/swagger/core/?key=woubtjf4olr0t4zgutuwn6scbcm6hd3qh1cgl5obmohpbm3mfublnwcvv67lodgjvd3h86s9ppshtvmf95gepsqh6nizq9liu7f).
:::

## Client Questions-API {#client-questions-api}

### QR Code & NFC function {#qr-code--nfc-function}
#### "Code": ["scan": {...}] {#code-scan-}
_For mobile apps only._

|Field |Type |Description |
|:---:|:---:|---|
|enabled |boolean | `True` activates the feature.
|source |Array of strings |Valid options: `qr` and/or `nfc`|
|force |boolean |`True` allows only QR Code or NFC input. `False` permits manual text input, also.|

_Example:_
```typescript
code = [ "{ \"scan\": { \"enabled\": true,\"source\": [ \"qr\", \"nfc\" ], \"force\": true } }" ]
```


## Examples {#examples}
[A valid access-token is required to perform the request.](/docs/documentation/api/auth)

<Tabs defaultValue="curl" values={[ {label: 'Shell', value: 'curl'}, {label: 'Typescript', value: 'typescript'} ]}>
<TabItem value="curl">

```bash
curl --location --request GET 'https://www.cotalker.com/api/v2/questions/' \
--header 'Authorization: Bearer ACCESS-TOKEN'
``` 

</TabItem>
<TabItem value="typescript" example="api_properties.ts">

```typescript
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

Expected network result 
<!-- response=api_user.json -->
```json
{
    "data": {
        "questions": [
            {
                "id": "5fb68280d8adfd131961999c",
                "identifier": "to_whom_it_may_concern",
                "contentType": "application/vnd.cotalker.survey+text",
                "code": [],
                "display": [
                    "entered text"
                ],
                "modifiedAt": "2017-08-09T22:17:54.843Z",
                "createdAt": "2017-08-09T22:17:54.843Z"
            },
            {
                "id": "5fb683f0c8deee136d054dcc",
                "identifier": "comments_and_suggestions",
                "contentType": "application/vnd.cotalker.survey+text",
                "code": [],
                "display": [
                    "entered text"
                ],
                "modifiedAt": "2018-01-01T22:17:54.843Z",
                "createdAt": "2018-02-03T00:10:25.542Z"
            }
        ]
    }
}

```