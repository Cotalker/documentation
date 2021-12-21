---
title: Property Types (Collections)
---
import useBaseUrl from '@docusaurus/useBaseUrl'; 
import Highlight from '@theme/Highlight';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Overview {#overview}
[_Property types_, also know as _collections_](/docs/documentation/admin/database/admin_collections), are versatile databases that can be set up to carry out diverse functions in the Cotalker environment. _Property types_ can store company assets, describe workflow states, act as a filter, contain options for multiple-choice questions in surveys, grant permissions, and much more. Some common examples include "Store Locations", "Company Departments", "Products", "Clients", "Contacts", "Brands", "Task States", among others.

_Property types_ contain [_properties_ or _elements_](/docs/documentation/models/databases/model_properties), which can be thought of as the rows in a table or better yet, as the documents in a MongoDB collection. Each _property_ has at least a "Name", a "Code" and a "Unique Id". These fields are the basic columns of the table. But each _collection_ may have more columns by [adding fields](/docs/documentation/admin/database/admin_collections#additional-fields), making _properties_ more descriptive. For example, a _collection_ that holds "store locales" can have _additional fields_ that contain address, employee number, store size, performance indicators, or any other information that needs to be associated with the collection's _properties_.

:::tip additional resources
These are just some of the most basic API requests. For a complete list of endpoints, consult our [API documentation on Swagger](https://www.cotalker.com/swagger/core/?key=woubtjf4olr0t4zgutuwn6scbcm6hd3qh1cgl5obmohpbm3mfublnwcvv67lodgjvd3h86s9ppshtvmf95gepsqh6nizq9liu7f#/).
:::

## Get Property Types {#get-all}
_Returns all property types within the company._

<span className="hero__subtitle"><span className="badge badge--success">GET</span> /propertyTypes</span>

#### Endpoint URL {#get-all-url}
`https://www.coltaker.com/api/v2/propertyTypes`

#### Headers {#get-all-headers}
Header | Description | Required | Values
--- | --- | --- | ---
**Authorization** | Sends your _access token_ to make an API request.<br/>[Click here to see how to obtain an _access token_.](/docs/documentation/api/auth#how-to) | Required | Bearer $ACCESS_TOKEN

#### Query Parameters {#query-get-all}

Parameter | Description | Type | Required | Notes
--- | --- | --- | ---- | ----
**search** | Returns _property types_ with field values that match the query. | string | Optional |
**limit** | Limits the amount of _property types_ returned in the response. | number | Optional | By default, the _limit_ is set to 10.
**page** | Makes the response display data from the indicated page number. | number | Optional | Best used in combination with the "limit" parameter.
**count** | Adds the `counter` field with the total amount of _property types_ within the company. | boolean | Optional | 
**orderBy** | Orders the _property types_ by ascendeing or descending order according to their `modifiedAt` field. | string | Optional | Options: `asc`, `desc`
**sortBy** | Sorts _property types_ in the response according to the their creation date or the last time they were modified. | string | Optional | Options are: `createdAt`, `modifiedAt`.
**ids** | Returns _property types_ with the IDs indicated in the array. | [ObjectId<COTPropertyType\>[ ]](/docs/documentation/models/databases/model_propertytypes) | Optional |
**codes** | Returns _property types_ with the code names indicated in the array. | string[ ] | Optional | Code names are stored in the `code` field within the [COTPropertyType](/docs/documentation/models/databases/model_propertytypes) data model.
**isActive** | Returns _property types_ according to their `isActive` status. | string | Optional | Options are: `all`, `true`, `false`
**viewPermissions** | Returns _property types_ based on whether they have or don't have viewing permissions. | boolean | Optional | Viewing permissions are indicated in the `viewPermissions` field in the [COTPropertyType](/docs/documentation/models/databases/model_propertytypes) data model.
**modified** | Returns _property types_ with the indicated modification date in the `modifiedAt` field. | ISODate | Optional | YYYY-MM-DDTHH:mm:ss.SSSZ
**modified_gt** | Returns _property types_ modified after the indicated date and time. | ISODate | Optional | YYYY-MM-DDTHH:mm:ss.SSSZ
**modified_gte** | Returns _property types_ with a value in the `modifiedAt` field equal to or greater than the indicated date and time. | ISODate | Optional | YYYY-MM-DDTHH:mm:ss.SSSZ
**modified_lt** | Returns _property types_ modified before the indicated date and time. | ISODate | Optional | YYYY-MM-DDTHH:mm:ss.SSSZ
**modified_lte** | Returns _property types_ with a value in the `modifiedAt` field equal to or less than the indicated date and time. | ISODate | Optional | YYYY-MM-DDTHH:mm:ss.SSSZ
**created** | Returns _property types_ with the indicated creation date in the `createdAt` field. | ISODate | Optional | YYYY-MM-DDTHH:mm:ss.SSSZ
**created_gt** | Returns _property types_ created after the indicated date and time. | ISODate | Optional | YYYY-MM-DDTHH:mm:ss.SSSZ
**created_gte** | Returns _property types_ with a value in the `createdAt` field equal to or greater than the indicated date and time. | ISODate | Optional | YYYY-MM-DDTHH:mm:ss.SSSZ
**created_lt** | Returns _property types_ created before the indicated date and time. | ISODate | Optional | YYYY-MM-DDTHH:mm:ss.SSSZ
**created_lte** | Returns _property types_ with a value in the `createdAt` field equal to or less than the indicated date and time. | ISODate | Optional | YYYY-MM-DDTHH:mm:ss.SSSZ
**debug** | Adds the `debug` field with error notifications. | string | Optional | Option: `true`

#### Request Samples {#get-all-request-sample}

<Tabs defaultValue="curl-get-all" values={[ {label: 'cURL (default)', value: 'curl-get-all'}, {label: 'cURL (query)', value: 'curl-group'}, {label: 'Typescript (default)', value: 'typescript'} ]}>
<TabItem value="curl-get-all">

_This default request gets all the property types in the company._
```bash
curl --location --request GET 'https://www.cotalker.com/api/v2/propertyTypes' \
--header 'Authorization: Bearer $ACCESS_TOKEN' \
```

</TabItem>
<TabItem value="curl-group">

_This request gets property types by their code names._
```bash
curl --location --request GET 'https://www.cotalker.com/api/v2/propertyTypes?codes=mammals_00&codes=sea_mammals&codes=land_mammals_00&debug=true&count=true' \
--header 'Authorization: Bearer $ACCESS_TOKEN' \
```

</TabItem>
<TabItem value="typescript" example="api_channel.ts">

_This example gets all the property types in the company._
```typescript
// $ACCESS_TOKEN stored in .env file.
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

#### Response Sample {#get-all-response-sample}
Responses follow the [COTPropertyType](/docs/documentation/models/databases/model_propertytypes) data model.

---

## Get a Property Type by Id {#get-by-id}
_Returns the property type indicated by the Id._

<span className="hero__subtitle"><span className="badge badge--success">GET</span> /propertyTypes/&#123;id&#125;</span>

#### Endpoint URL {#get-by-id-url}
`https://www.coltaker.com/api/v2/propertyTypes/{id}`

#### Path Parameters {#get-by-path}
Parameter | Description | Type | Required | Notes
--- | --- | --- | --- | ---
**id** | The ObjectId of the _property type_ that is to be returned. | [ObjectId<COTPropertyType\>](/docs/documentation/models/databases/model_propertytypes) | Required |

#### Headers {#get-by-id-headers}
Header | Description | Required | Values
--- | --- | --- | ---
**Admin** | Grants access to request the endpoint. | Required | true
**Authorization** | Sends your _access token_ to make an API request.<br/>[Click here to see how to obtain an _access token_.](/docs/documentation/api/auth#how-to) | Required | Bearer $ACCESS_TOKEN

#### Query Parameters {#get-by-id}
Parameter | Description | Type | Required | Notes
--- | --- | --- | --- | ---
**debug** | Adds the `debug` field with error notifications. | string | Optional | Option: `true`

#### Request Sample {#get-by-id-request}

```bash
curl --location --request GET 'https://www.cotalker.com/api/v2/propertyTypes/61a0cd6dc8f28f266b614d60' \
--header 'Admin: true' \
--header 'Authorization: Bearer $ACCESS_TOKEN'
```

#### Response Sample {#get-by-id-response}
The response follows the [COTPropertyType](/docs/documentation/models/databases/model_propertytypes) data model.

---

## Create a New Property Type {#post-new}
_Creates a new property type within the company._

<span className="hero__subtitle"><span className="badge badge--info">POST</span> /propertyTypes</span>

#### Endpoint URL {#post-new-url}
`https://www.cotalker.com/api/v2/propertyTypes`

#### Headers {#post-new-headers}

Header | Description | Required | Values
--- | --- | --- | ---
**Authorization** | Sends your _access token_ to make an API request.<br/>[Click here to see how to obtain an _access token_.](/docs/documentation/api/auth#how-to) | Required | Bearer $ACCESS_TOKEN
**Admin** | Grants administrative access to create a new _property type_. | Required | true 
**Content-Type** | Indicates the body's format. | Required | application/json

#### Query Parameters {#post-new-query}
Parameter | Description | Type | Required | Notes
--- | --- | --- | --- | ---
**debug** | Adds the `debug` field with error notifications. | string | Optional | Option: `true`

#### Request Body {#post-new-body}
_Only required fields are listed below. For a complete schema description, please go to the [COTPropertyType data model](/docs/documentation/models/communication/model_groups). Unrequired fields that are not submitted are either filled in automatically or left blank._

Element | Description | Type | Required | Notes
--- | --- | --- | --- | ---
**display** | The _property type_ name _users_ will see on the platform. | string | Required |
**code** | The _property type's_ unique identification name. | string | Required | Maximum 60 characters; only lowercase letters, numbers, and underscores allowed; must be unique.

#### Request Sample {#post-new-request}
_Property type_ created with the minimum required fields:_
```bash
curl --location --request POST 'https://www.cotalker.com/api/v2/propertyTypes' \
--header 'Admin: true' \
--header 'Authorization: Bearer $ACCESS_TOKEN' \
--header 'Content-Type: application/json' \
--data-raw '{
    "display": "Warehouse Supplies",
    "code": "warehouse_supplies_00"
}'
```

#### Response Sample {#post-new-response}
Go to [COTPropertyType](/docs/documentation/models/databases/model_propertytypes) for a complete description of the response.
```json {5-6}
{
    "isActive": true,
    "viewPermissions": [],
    "_id": "61a0cd6dc8f28f266b614d60",
    "display": "warehouse supplies",
    "code": "warehouse_supplies_00",
    "company": "6136968b580aaf2b0e49d844",
    "createdAt": "2021-11-26T11:55:38.190Z",
    "modifiedAt": "2021-11-26T11:55:38.190Z",
    "schemaNodes": [],
    "__v": 0
}
```
---

## Update a Property Type {#patch-update}
_Updates or edits an existing property type's data._

<span className="hero__subtitle"><span className="badge badge--warning">PATCH</span> /propertyTypes/&#123;id&#125;</span>

#### Endpoint URL {#patch-update-url}
`https://www.cotalker.com/api/v2/propertyTypes/{id}`

#### Path Parameters {#patch-update-path}
Parameter | Description | Type | Required | Notes
--- | --- | --- | --- | ---
**id** | The ObjectId of the _property type_ that is to be modified. | [ObjectId<COTPropertyType\>](/docs/documentation/models/databases/model_propertytypes) | Required |

#### Headers {#patch-update-headers}
Header | Description | Required | Values
--- | --- | --- | ---
**Admin** | Grants administrative access to modify a _property type_. | Required | true 
**Authorization** | Sends your _access token_ to make an API request.<br/>[Click here to see how to obtain an _access token_.](/docs/documentation/api/auth#how-to) | Required | Bearer $ACCESS_TOKEN
**Content-Type** | Sets the body's format. | Required | application/json

#### Query Parameters {#patch-update-query}
Parameter | Description | Type | Required | Notes
--- | --- | --- | --- | ---
**debug** | Adds the `debug` field with error notifications. | string | Optional | Option: `true`

#### Request Body {#patch-update-body}
_Only the fields that are being updated or added are required to be put into the body. For a complete schema description, please go to the [COTPropertyType data model](/docs/documentation/models/databases/model_propertytypes)._

#### Request Sample {#patch-update-request}
_This sample adds a viewing permission to a property type:_

```bash
curl --location --request PATCH 'https://www.cotalker.com/api/v2/propertyTypes/61a0d8729726b9c9fd398846?debug=true' \
--header 'Admin: true' \
--header 'Authorization: Bearer $ACCESS_TOKEN' \
--header 'Content-Type: application/json' \
--data-raw '{
    "viewPermissions": ["admin-properties-read"]
}'
```

#### Response Sample {#patch-update-response}
Go to [COTPropertyType](/docs/documentation/models/databases/model_propertytypes) for a complete description of the response.
```json {3-5}
{
    "isActive": true,
    "viewPermissions": [
        "admin-properties-read"
    ],
    "_id": "61a0cb3a2c62a400076efa0f",
    "display": "Warehouse Supplies",
    "code": "warehouse_supplies_00",
    "company": "5f5a74a8fdf77a0008a6349a",
    "createdAt": "2021-11-26T11:55:38.190Z",
    "modifiedAt": "2021-11-26T11:55:38.190Z",
    "schemaNodes": [],
    "__v": 1
}
```
---

