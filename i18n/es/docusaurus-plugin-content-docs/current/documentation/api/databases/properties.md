---
title: Properties (Elements)
---

:::caution Advertencia
Esta página aún no se encuentra traducida al español.
:::
import useBaseUrl from '@docusaurus/useBaseUrl'; 
import Highlight from '@theme/Highlight';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Overview {#overview}

[_Properties_ (_also known as _elements_)](/docs/documentation/admin/database/admin_elements) are like the rows of a database table, but much more. Properties are contained within [_property types_ (_collections_)](/docs/documentation/admin/database/admin_collections). 

They are used to establish a relationship or define something. That's why you can use _properties_ sometimes as a resource and others as an asset. For example, you can send a specific text to all the users that have the "Special Message" _property_. Since each _user_ is simply a _collection or property type_, you can add _properties_ to them.

Additionally, [workflows use _properties_ to define their states](/docs/documentation/admin/workflows/settings_panels/workflow_create_edit#additional-fields).

As you can see, the versatility of _properties_ is quite significant.

:::tip additional resources
These are just some of the most basic API requests. For a complete list of endpoints, consult our [API documentation on Swagger](https://www.cotalker.com/swagger/core/?key=woubtjf4olr0t4zgutuwn6scbcm6hd3qh1cgl5obmohpbm3mfublnwcvv67lodgjvd3h86s9ppshtvmf95gepsqh6nizq9liu7f#/).
:::

## Get Properties {#get-all}
_Returns all properties within the company._

<span className="hero__subtitle"><span className="badge badge--success">GET</span> /properties</span>

#### Endpoint URL {#get-all-url}
`https://www.cotalker.com/api/v2/properties`

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
**propertyTypes** | Returns all the _properties_ that belong to the indicated property type. The property type is identified by its `code`. | string[ ] | Optional | `code` is found in the [COTProperyType](/docs/documentation/models/databases/model_propertytypes) data model.
**codes** | Returns _properties_ that have the `name.code` fields indicated in the array. | string[ ] | Optional | `name.code` is found in the [COTPropery](/docs/documentation/models/databases/model_properties) data model.
**isActive** | Returns _properties_ according to their `isActive` status. | string | Optional | Options are: `all`, `true`, `false`
**owner** | Gets properties that are associated to a _user_ or _task_ as an additional field. The query is done through the `owner` field in the [COTProperty](/docs/documentation/models/databases/model_properties) data model. | object | Optional | Sample:<br/>'GET /properties?owner[$ref]=users<br/>&owner[$id]=61a77fc936d18897da3e8fa5'
**modified** | Returns _properties_ with the indicated modification date in the `modifiedAt` field. | ISODate | Optional | YYYY-MM-DDTHH:mm:ss.SSSZ
**modified_gt** | Returns _properties_ modified after the indicated date and time. | ISODate | Optional | YYYY-MM-DDTHH:mm:ss.SSSZ
**modified_gte** | Returns _properties_ with a value in the `modifiedAt` field equal to or greater than the indicated date and time. | ISODate | Optional | YYYY-MM-DDTHH:mm:ss.SSSZ
**modified_lt** | Returns _properties_ modified before the indicated date and time. | ISODate | Optional | YYYY-MM-DDTHH:mm:ss.SSSZ
**modified_lte** | Returns _properties_ with a value in the `modifiedAt` field equal to or less than the indicated date and time. | ISODate | Optional | YYYY-MM-DDTHH:mm:ss.SSSZ
**created** | Returns _properties_ with the indicated creation date in the `createdAt` field. | ISODate | Optional | YYYY-MM-DDTHH:mm:ss.SSSZ
**created_gt** | Returns _properties_ created after the indicated date and time. | ISODate | Optional | YYYY-MM-DDTHH:mm:ss.SSSZ
**created_gte** | Returns _properties_ with a value in the `createdAt` field equal to or greater than the indicated date and time. | ISODate | Optional | YYYY-MM-DDTHH:mm:ss.SSSZ
**created_lt** | Returns _properties_ created before the indicated date and time. | ISODate | Optional | YYYY-MM-DDTHH:mm:ss.SSSZ
**created_lte** | Returns _properties_ with a value in the `createdAt` field equal to or less than the indicated date and time. | ISODate | Optional | YYYY-MM-DDTHH:mm:ss.SSSZ
**debug** | Adds the `debug` field with error notifications. | string | Optional | Option: `true`

#### Request Samples {#get-all-request-sample}

<Tabs defaultValue="curl-get-all" values={[ {label: 'cURL (default)', value: 'curl-get-all'}, {label: 'cURL (query)', value: 'curl-group'}, {label: 'Typescript (default)', value: 'typescript'} ]}>
<TabItem value="curl-get-all">

_This default request gets all the properties in the company._
```bash
curl --location --request GET 'https://www.cotalker.com/api/v2/properties' \
--header 'Authorization: Bearer $ACCESS_TOKEN
```

</TabItem>
<TabItem value="curl-group">

_This request gets properties by their code names._
```bash
curl --location --request GET 'https://www.cotalker.com/api/v2/properties?codes=ny_00&codes=stgo_00' \
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
Responses follow the [COTProperty](/docs/documentation/models/databases/model_properties) data model.

---

## Get a Property by Id {#get-by-id}
_Returns the property indicated by the Id._

<span className="hero__subtitle"><span className="badge badge--success">GET</span> /properties/&#123;id&#125;</span>

#### Endpoint URL {#get-by-id-url}
`https://www.cotalker.com/api/v2/properties/{id}`

#### Path Parameters {#get-by-path}
Parameter | Description | Type | Required | Notes
--- | --- | --- | --- | ---
**id** | The ObjectId of the _property_ that is to be returned. | [ObjectId<COTProperty\>](/docs/documentation/models/databases/model_properties) | Required |

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
curl --location --request GET 'https://www.cotalker.com/api/v2/properties/61a4b60ce8bbb302b9579440' \
--header 'Admin: true' \
--header 'Authorization: Bearer $ACCESS_TOKEN'
```

#### Response Sample {#get-by-id-response}
The response follows the [COTProperty](/docs/documentation/models/databases/model_properties) data model.

---

## Create a New Property {#post-new}
_Creates a new property within a collection._

<span className="hero__subtitle"><span className="badge badge--info">POST</span> /properties</span>

#### Endpoint URL {#post-new-url}
`https://www.cotalker.com/api/v2/properties`

#### Headers {#post-new-headers}

Header | Description | Required | Values
--- | --- | --- | ---
**Admin** | Grants administrative access to create a new _property_. | Required | true 
**Authorization** | Sends your _access token_ to make an API request.<br/>[Click here to see how to obtain an _access token_.](/docs/documentation/api/auth#how-to) | Required | Bearer $ACCESS_TOKEN
**Content-Type** | Indicates the body's format. | Required | application/json

#### Query Parameters {#post-new-query}
Parameter | Description | Type | Required | Notes
--- | --- | --- | --- | ---
**debug** | Adds the `debug` field with error notifications. | string | Optional | Option: `true`

#### Request Body {#post-new-body}
_Only required fields are listed below. For a complete schema description, please go to the [COTProperty data model](/docs/documentation/models/databases/model_properties). Unrequired fields that are not submitted are either filled in automatically or left blank._

Element | Description | Type | Required | Notes
--- | --- | --- | --- | ---
**name** | Name settings. | object | Required |
**name.code** | The property's identification code. | string | Required | Maximum 60 characters; only lowercase letters, numbers, and underscores allowed; must be unique.
**name.display** | The property's displayed name. | string | Required |
**propertyType** | The `code` of the [COTPropertyType](/docs/documentation/models/databases/model_propertytypes) associated with the property. | string | Required | 

#### Request Sample {#post-new-request}
_Property created with the minimum required fields:_
```bash
curl --location --request POST 'https://www.cotalker.com/api/v2/properties' \
--header 'Admin: true' \
--header 'Authorization: $ACCESS_TOKEN' \
--header 'Content-Type: application/json' \
--data-raw '{
    "propertyType": "warehouse_supplies_00",
    "name": {
        "code": "paper_letter",
        "display": "letter paper 8.5x11"
    }
}'
```

#### Response Sample {#post-new-response}
Go to [COTProperty](/docs/documentation/models/databases/model_properties) for a complete description of the response.
```json {5-9}
{
    "_id": "61a4bbf40035762d5549c781",
    "subproperty": [],
    "isActive": true,
    "propertyType": "warehouse_supplies_00",
    "name": {
        "code": "paper_letter",
        "display": "letter paper 8.5x11"
    },
    "company": "6136968b580aaf2b0e49d844",
    "createdAt": "2021-11-29T11:34:12.992Z",
    "modifiedAt": "2021-11-29T11:34:13.010Z"
}
```
---

## Update a Property {#patch-update}
_Updates or edits an existing property's data._

<span className="hero__subtitle"><span className="badge badge--warning">PATCH</span> /properties/&#123;id&#125;</span>

#### Endpoint URL {#patch-update-url}
`https://www.cotalker.com/api/v2/properties/{id}`

#### Path Parameters {#patch-update-path}
Parameter | Description | Type | Required | Notes
--- | --- | --- | --- | ---
**id** | The ObjectId of the _property_ that is to be modified. | [ObjectId<COTProperty\>](/docs/documentation/api/databases/property_types) | Required |

#### Headers {#patch-update-headers}
Header | Description | Required | Values
--- | --- | --- | ---
**Admin** | Grants administrative access to modify a _property_. | Required | true 
**Authorization** | Sends your _access token_ to make an API request.<br/>[Click here to see how to obtain an _access token_.](/docs/documentation/api/auth#how-to) | Required | Bearer $ACCESS_TOKEN
**Content-Type** | Sets the body's format. | Required | application/json

#### Query Parameters {#patch-update-query}
Parameter | Description | Type | Required | Notes
--- | --- | --- | --- | ---
**debug** | Adds the `debug` field with error notifications. | string | Optional | Option: `true`

#### Request Body {#patch-update-body}
_Only the fields that are being updated or added are required to be put into the body. For a complete schema description, please go to the [COTProperty data model](/docs/documentation/api/databases/properties)._

#### Request Sample {#patch-update-request}
_This sample adds a values to additional fields:_

```bash
curl --location --request PATCH 'https://www.cotalker.com/api/v2/properties/61a4bbf40035762d5549c781?debug=true' \
--header 'Admin: true' \
--header 'Authorization: Bearer $ACCESS_TOKEN' \
--header 'Content-Type: application/json' \
--data-raw '{
    "schemaInstance": {
        "description_1": "white",
        "description_2": "plain",
        "quantity": "100 reams"
    }
}'
```

#### Response Sample {#patch-update-response}
Go to [COTProperty](/docs/documentation/api/databases/properties) for a complete description of the response.
```json {13-17}
{
    "_id": "61a4bbf40035762d5549c781",
    "subproperty": [],
    "isActive": true,
    "propertyType": "warehouse_supplies_00",
    "name": {
        "code": "paper_letter",
        "display": "letter paper 8.5x11"
    },
    "company": "6136968b580aaf2b0e49d844",
    "createdAt": "2021-11-29T11:34:12.992Z",
    "modifiedAt": "2021-11-29T12:45:48.923Z",
    "schemaInstance": {
        "description_1": "white",
        "description_2": "plain",
        "quantity": "100 reams"
    }
}
```
---


