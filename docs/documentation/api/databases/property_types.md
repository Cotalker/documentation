---
title: Collections (Property Types)
---
import useBaseUrl from '@docusaurus/useBaseUrl'; 
import Highlight from '@theme/Highlight';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Companies can have many databases where they can store all kind of data. Some are company assets, other might be describe states.

For example "Store Locations", "Company Departments", "Products", "Clients", "Contacts", "Brands", "Task States" are Database examples.

Each Database may hay rows, elements or properties. Each property has at least a <Highlight text="Name" color="rgb(26, 188, 156)"/>  a <Highlight text="Code" color="rgb(46, 204, 113)"/> and a <Highlight text="Unique Id" color="rgb(52, 152, 219)"/>. Each database may have more columns, so that the properties can be more descriptive e.g., "Store Locations" might have an Address, number of employees, size of store, performance indicators, and any other. 

:::info
Click here for [data model descriptions](/docs/documentation/models/databases/model_propertytypes)

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
curl --location --request GET 'https://www.cotalker.com/api/v2/propertyTypes/' \
--header 'Authorization: Bearer ACCESS-TOKEN'
``` 

</TabItem>
<TabItem value="typescript" example="api_properties.ts">

```typescript
import { PropertyTypeGetCollection, Configuration, V2PropertyTypesApi} from "@cotalker/cotalker-api";

const api = new V2PropertyTypesApi(new Configuration({
    basePath: 'https://www.cotalker.com/api',
    accessToken: process.env.ACCESS_TOKEN,
    apiKey: 'true',
}));

async function getPropertyTypes(): Promise<PropertyTypeGetCollection | undefined> {
    const response = await api.getV2PropertyTypes();
    return response.data?.data;
}

getPropertyTypes().then(propertyTypes => console.log(propertyTypes)).catch(e=>console.log(e))

``` 

</TabItem>
</Tabs>

Expected network result 
<!-- response=api_user.json -->
```json
{
    "propertyTypes": [
        {
            "_id": "5fb5bcb927098059d5ceb1fe",
            "display": "Warehouse products",
            "code": "warehouse_products",
            "extra": {
                "item1": "name 01",
                "quantity": 105
            },
            "modifiedAt": "2020-11-17T13:37:26.238Z",
            "createdAt": "2020-11-17T13:37:26.238Z"
        },
        {
            "_id": "5fb5bd79a43fdeb83c61c781",
            "display": "Catalog items",
            "code": "catalog_items",
            "extra": {
                "item4": "name 02",
                "quantity": 10
            },
            "modifiedAt": "2020-10-29T14:20:40.786Z",
            "createdAt": "2019-12-12T17:30:18.401Z"
        }
    ]
}
```
<!-- end-response -->