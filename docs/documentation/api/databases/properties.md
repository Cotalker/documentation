---
title: Elements (Properties)
---
import useBaseUrl from '@docusaurus/useBaseUrl'; 
import Highlight from '@theme/Highlight';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

__Elements__ or __Properties__ of a database...

:::info
Click here for [data model descriptions](/docs/documentation/models/databases/model_properties)

Click here for complete [API and model specifications](https://www.cotalker.com/swagger/core/?key=woubtjf4olr0t4zgutuwn6scbcm6hd3qh1cgl5obmohpbm3mfublnwcvv67lodgjvd3h86s9ppshtvmf95gepsqh6nizq9liu7f).
:::


## API {#api}

The main features of the API are:

### Client Properties-API {#client-properties-api}

* List all properties

## Examples {#examples}
[A valid access-token is required to perform the request.](/docs/documentation/api/auth)

<Tabs defaultValue="curl" values={[ {label: 'Shell', value: 'curl'}, {label: 'Typescript', value: 'typescript'} ]}>
<TabItem value="curl">

```bash
curl --location --request GET 'https://www.cotalker.com/api/v2/properties/' \
--header 'Authorization: Bearer ACCESS-TOKEN'
``` 

</TabItem>
<TabItem value="typescript" example="api_properties.ts">

```typescript
import { PropertyGetCollection, Configuration, V2PropertiesApi} from "@cotalker/cotalker-api";

const api = new V2PropertiesApi(new Configuration({
    basePath: 'https://www.cotalker.com/api',
    accessToken: process.env.ACCESS_TOKEN,
    apiKey: 'true',
}));

async function getProperties(): Promise<PropertyGetCollection | undefined> {
    const response = await api.getV2Properties();
    return response.data?.data;
}

getProperties().then(properties => console.log(properties)).catch(e=>console.log(e))

``` 

</TabItem>
</Tabs>

Expected network result 
<!-- response=api_user.json -->
```json
{
    "properties": [
        {
            "_id": "5fb59e1e1bd45143e4a5711e",
            "display": "Random stuff",
            "code": "random_stuff_01",
            "extra": {
                "object1": "name 01",
                "object2": 50
            },
            "modifiedAt": "2017-12-12T22:59:48.774Z",
            "createdAt": "2017-11-12T22:30:37.800Z"
        },
        {
            "_id": "5fb59fb398988da8b7b1e1d9",
            "display": "More random stuff",
            "code": "random_stuff_02",
            "extra": {
                "object3": "name 02",
                "object4": 45
            },
            "modifiedAt": "2017-12-12T22:59:48.909Z",
            "createdAt": "2017-11-12T22:30:37.803Z"
        }
    ]
}
```
<!-- end-response -->