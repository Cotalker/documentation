---
title: Properties (Elements)
---
import useBaseUrl from '@docusaurus/useBaseUrl'; 
import Highlight from '@theme/Highlight';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Overview {#overview}

[_Properties_ (_also known as _elements_)](/docs/documentation/admin/admin_properties#elements) are like the rows of a database table, but much more. Properties are contained within [_property types_ (_collections_)](/docs/documentation/models/databases/model_propertytypes). 

They are used to establish a relationship or define something. That's why you can use _properties_ sometimes as a resource and others as an asset. For example, you can send a specific text to all the users that have the "Special Message" _property_. Since each _user_ is simply a _collection or property type_, you can add _properties_ to them.

Additionally, [workflows use _properties_ to define their states](/docs/documentation/admin/workflows/settings_panels/workflow_create_edit#additional-fields).

As you can see, the versatility of _properties_ is quite significant.

## Get Properties {#get-all}
_Returns all properties within the company._

<span className="hero__subtitle"><span className="badge badge--success">GET</span> /properties</span>

#### Endpoint URL {#get-all-url}
`https://www.coltaker.com/api/v2/properties`

#### Headers {#get-all-headers}
Header | Description | Required | Values
--- | --- | --- | ---
**Authorization** | Sends your _access token_ to make an API request.<br/>[Click here to see how to obtain an _access token_.](/docs/documentation/api/auth#how-to) | Required | Bearer $ACCESS_TOKEN

#### Query Parameters {#query-get-all}

Parameter | Description | Type | Required | Notes
--- | --- | --- | ---- | ----
**search** | Returns _properties_ with field values that match the query. | string | Optional |
**limit** | Limits the amount of _properties_ returned in the response. | number | Optional | By default, the _limit_ is set to 10.
**page** | Makes the response display data from the indicated page number. | number | Optional | Best used in combination with the "limit" parameter.
**count** | Adds the `counter` field with the total amount of _properties_ within the company. | boolean | Optional | 
**orderBy** | Orders the _properties_ by ascendeing or descending order according to their `modifiedAt` field. | string | Optional | Options: `asc`, `desc`
**sortBy** | Sorts _properties_ in the response according to the last time they were modified. | string | Optional | Option: `modifiedAt`.
**ids** | Returns _properties_ with the IDs indicated in the array. | [ObjectId<COTProperty\>[ ]](/docs/documentation/models/databases/model_properties) | Optional |
**parent** | Returns _properties_ that have the properties indicated in the array as their parents. | [ObjectId<COTProperties\>[ ]](/docs/documentation/models/databases/model_properties) | Optional |
**propertyTypes** | Returns all the _properties_ that belong to the indicated property type. The property type is identified by its `code`. | string[ ] | Optional | `code` is found in the [COTPropery](/docs/documentation/models/databases/model_properties) data model.
**codes** | Returns _properties_ that have the `code` fields indicated in the array. | string[ ] | Optional | `code` is found in the [COTPropery](/docs/documentation/models/databases/model_properties) data model.
**isActive** | Returns _properties_ according to their `isActive` status. | string | Optional | Options are: `all`, `true`, `false`
**extra** | | object | Optional |
**owner** | | object | Optional |
**modified** | Returns _property types_ with the indicated modification date in the `modifiedAt` field. | ISODate | Optional | YYYY-MM-DDTHH:mm:ss.SSSZ
**modified_gt** | Returns _property types_ modified after the indicated date and time. | ISODate | Optional | YYYY-MM-DDTHH:mm:ss.SSSZ
**modified_gte** | Returns _property types_ with a value in the `modifiedAt` field equal to or greater than the indicated date and time. | ISODate | Optional | YYYY-MM-DDTHH:mm:ss.SSSZ
**created** | Returns _property types_ with the indicated creation date in the `createdAt` field. | ISODate | Optional | YYYY-MM-DDTHH:mm:ss.SSSZ
**created_gt** | Returns _property types_ created after the indicated date and time. | ISODate | Optional | YYYY-MM-DDTHH:mm:ss.SSSZ
**created_gte** | Returns _property types_ with a value in the `createdAt` field equal to or greater than the indicated date and time. | ISODate | Optional | YYYY-MM-DDTHH:mm:ss.SSSZ
**created_lt** | Returns _property types_ created before the indicated date and time. | ISODate | Optional | YYYY-MM-DDTHH:mm:ss.SSSZ
**created_lte** | Returns _property types_ with a value in the `createdAt` field equal to or less than the indicated date and time. | ISODate | Optional | YYYY-MM-DDTHH:mm:ss.SSSZ
**debug** | Adds the `debug` field with error notifications. | string | Optional | Option: `true`

#### Request Samples {#get-all-request-sample}

<Tabs defaultValue="curl-get-all" values={[ {label: 'cURL (default)', value: 'curl-get-all'}, {label: 'cURL (query)', value: 'curl-group'}, {label: 'Typescript (default)', value: 'typescript'} ]}>
<TabItem value="curl-get-all">

_This default request gets all the properties in the company._
```bash
curl --location --request GET 'https://www.cotalker.com/api/v2/properties' \
--header 'Admin: true' \
--header 'Authorization: Bearer $ACCESS_TOKEN
```

</TabItem>
<TabItem value="curl-group">

_This request gets properties by their code names._
```bash
curl --location --request GET 'https://www.cotalker.com/api/v2/properties?codes=ny_00&codes=stgo_00' \
--header 'Admin: true' \
--header 'Authorization: Bearer $ACCESS_TOKEN
```

</TabItem>
<TabItem value="typescript" example="api_channel.ts">

_This example gets all the properties in the company._
```typescript
// $ACCESS_TOKEN stored in .env file.
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

#### Response Sample {#get-all-response-sample}
Responses follow the [COTPropertyType](/docs/documentation/models/databases/model_propertytypes) data model.

---

