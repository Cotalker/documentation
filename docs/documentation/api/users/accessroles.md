---
id: accessroles
title: Access Roles
sidebar_label: Access Roles
---
import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Overview {#overview}

[_Access roles_](/docs/documentation/admin/admin_accessrole) are sets of permissions that are assigned to _users_.

They limit users' read and write access on endpoints.

## Get Access Roles {#get-accessroles}
_Returns data from all access roles._

<span className="hero__subtitle"><span className="badge badge--success">GET</span> /accessroles</span>

#### Endpoint URL {#get-all-url}
`https://www.coltaker.com/api/v2/accessroles`

#### Headers {#get-all-headers}
Header | Description | Required | Values
--- | --- | --- | ---
**Authorization** | Sends your _access token_ to make an API request.<br/>[Click here to see how to obtain an _access token_.](/docs/documentation/api/auth#how-to) | Required | Bearer $ACCESS_TOKEN
**Admin** | Grants access to the endpoint. | Required | true

#### Query Parameters {#query-get-all}

Parameter | Description | Type | Required | Notes
--- | --- | --- | ---- | ----
**limit** | Limits the amount of _access roles_ returned in the response. | number | Optional | By default, the _limit_ is set to 10.
**page** | Makes the response display data from the indicated page number. | number | Optional | Best used in combination with the "limit" parameter.
**count** | Adds the `counter` field with the total amount of access roles. | boolean | Optional | 
**isActive** | Returns _access roles_ according to their [_accessroles.active_](/docs/documentation/models/users/model_accessroles) status. | string | Optional | Options are: `all`, `true`, `false`
**ids** | Returns _access roles_ with the indicated ObjectIds in their `accessroles._id` field. | [ObjectId<COTAccessRole\>[ ]](/docs/documentation/models/users/model_accessroles) | Optional |
**search** | Returns access roles that match the keyword. Searches through the values of `accessroles.name`, `accessroles.permissions`, and `accessroles.description` fields. | string | Optional | See [COTAccessRole](/docs/documentation/models/users/model_accessroles) for data model details.
**debug** | Adds the `debug` field with error notifications and query values. | string | Optional | Option: `true`

#### Request Sample {#request-get-all}

<Tabs defaultValue="curl-get-all" values={[ {label: 'cURL (default)', value: 'curl-get-all'}, {label: 'cURL (query)', value: 'curl-query'}]}>
<TabItem value="curl-get-all">

_Request returns all access roles:_
```bash
curl --location --request GET 'https://www.cotalker.com/api/v2/accessroles' \
--header 'Admin: true' \
--header 'Authorization: Bearer $ACCESS_TOKEN'
```

</TabItem>
<TabItem value="curl-query">

_Returns access roles that match search query:_
```bash
curl --location --request GET 'https://www.cotalker.com/api/v2/accessroles?debug=true&search=admin access' \
--header 'Admin: true' 
--header 'Authorization: Bearer $ACCESS_TOKEN' 
```

</TabItem>
</Tabs>


#### Response Sample {#get-all-response-sample}
Responses follow the [COTAccessRole](/docs/documentation/models/users/model_accessroles#sample) data model.

---

## Get an Access Role by Id {#get-accessrole-id}
_Returns the access role indicated by the Id._

<span className="hero__subtitle"><span className="badge badge--success">GET</span> /accessroles/&#123;id&#125;</span>

#### Endpoint URL {#get-accessrole-id-url}
`https://www.coltaker.com/api/v2/accessroles/{id}`

#### Path Parameters {#patch-accessrole-path}
Parameter | Description | Type | Required | Notes
--- | --- | --- | --- | ---
**id** | The ObjectId of the _access role_ that is to be returned. | [ObjectId<COTAccessRole\>](/docs/documentation/models/users/model_accessroles) | Required |

#### Headers {#get-accessrole-id-headers}
Header | Description | Required | Values
--- | --- | --- | ---
**Authorization** | Sends your _access token_ to make an API request.<br/>[Click here to see how to obtain an _access token_.](/docs/documentation/api/auth#how-to) | Required | Bearer $ACCESS_TOKEN
**Admin** | Grants administrative access to view the _access role_. | Required | true

#### Query Parameters {#get-channel-id}
Parameter | Description | Type | Required | Notes
--- | --- | --- | --- | ---
**debug** | Adds the `debug` field with error notifications. | string | Optional | Option: `true`

#### Request Sample {#get-accessrole-id-request}
```bash
curl --location --request GET 'https://www.cotalker.com/api/v2/accessroles/619648a6f27b4eb1a9e319ba' \
--header 'Admin: true' \
--header 'Authorization: Bearer $ACCESS_TOKEN' 
```

#### Response Sample {#get-accessrole-id-response}
The response follows the [COTAccessRole](/docs/documentation/models/users/model_accessroles#sample) data model.

---

## Create a New Access Role {#post-accessrole}
_Creates a new access role within the company._

<span className="hero__subtitle"><span className="badge badge--info">POST</span> /accessroles</span>

#### Endpoint URL {#post-accessrole-url}
`https://www.cotalker.com/api/v2/accessroles`

#### Headers {#post-accessrole-headers}

Header | Description | Required | Values
--- | --- | --- | ---
**Authorization** | Sends your _access token_ to make an API request.<br/>[Click here to see how to obtain an _access token_.](/docs/documentation/api/auth#how-to) | Required | Bearer $ACCESS_TOKEN
**Admin** | Grants administrative access to create an _access role_. | Required | true 
**Content-Type** | Sets the body's format. | Required | application/json

#### Query Parameters {#post-accessrole-query}
Parameter | Description | Type | Required | Notes
--- | --- | --- | --- | ---
**debug** | Adds the `debug` field with error notifications. | string | Optional | Option: `true`

#### Request Body {#post-accessrole-body}
_Only required fields are listed below. For a complete schema description, please go to the [COTAccessRole data model](/docs/documentation/models/users/model_accessroles). Unrequired fields that are not submitted are either filled in automatically or left blank._

Element | Description | Type | Required | Notes
--- | --- | --- | --- | ---
**name** | Indicates the access role's name. | string | Required |
**permissions** | Set of permissions assigned to the access role. | string[ ] | Required | [List of default permissions](/docs/documentation/admin/admin_accessrole#default-permissions)

#### Request Sample {#post-accessrole-request}
_Access role created with the minimum required fields:_
```bash
curl --location --request POST 'https://www.cotalker.com/api/v2/accessroles' \
--header 'Admin: true' \
--header 'Authorization: Bearer $ACCESS_TOKEN' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "audit",
    "permissions": [
        "admin-access"
    ]
}'
```

#### Response Sample {#post-accessrole-response}
Go to [COTAccessRole](/docs/documentation/models/users/model_accessroles) for a complete description of the response.
```json
{
    "active": true,
    "permissions": [
        "admin-access"
    ],
    "_id": "619648a6f27b4eb1a9e319ba",
    "name": "audit",
    "company": "6196489edb1ac3d5da55e198",
    "__v": 0
}
```

---

## Update an Access Role {#patch-accessrole}
_Updates, edits, or adds information to an existing access role._

<span className="hero__subtitle"><span className="badge badge--warning">PATCH</span> /accessroles/&#123;id&#125;</span>

#### Endpoint URL {#patch-accessrole-url}
`https://www.cotalker.com/api/v2/accessroles/{id}`

#### Path Parameters {#patch-accessrole-path}
Parameter | Description | Type | Required | Notes
--- | --- | --- | --- | ---
**id** | The ObjectId of the _access role_ that is to be modified. | [ObjectId<COTAccessRole\>](/docs/documentation/models/users/model_accessroles) | Required |

#### Headers {#patch-accessrole-headers}
Header | Description | Required | Values
--- | --- | --- | ---
**Authorization** | Sends your _access token_ to make an API request.<br/>[Click here to see how to obtain an _access token_.](/docs/documentation/api/auth#how-to) | Required | Bearer $ACCESS_TOKEN
**Admin** | Grants administrative access to modify the _access role_. | Required | true 
**Content-Type** | Sets the body's format. | Required | application/json

#### Query Parameters {#patch-accessrole-query}
Parameter | Description | Type | Required | Notes
--- | --- | --- | --- | ---
**debug** | Adds the `debug` field with error notifications. | string | Optional | Option: `true`

#### Request Body {#patch-accessrole-body}
_Only the fields that are being updated or added are required to be put into the body. For a complete schema description, please go to the [COTAccessRole data model](/docs/documentation/models/users/model_accessroles)._

#### Request Sample {#patch-accessrole-request}
```bash
curl --location --request PATCH 'https://www.cotalker.com/api/v2/accessroles/619648a6f27b4eb1a9e319ba' \
--header 'Admin: true' \
--header 'Authorization: Bearer $ACCESS_TOKEN' \
--header 'Content-Type: application/json' \
--data-raw '{
    "description": "Grants auditors read-only permissions to specific endpoints.",
    "permissions": ["admin-access", "admin-groups-read"]
}'
```

#### Response Sample {#patch-accessrole-response}
Go to [COTAccessRole](/docs/documentation/models/users/model_accessroles) for a complete description of the response.
```json {3-6,11}
{
    "active": true,
    "permissions": [
        "admin-access",
        "admin-groups-read"
    ],
    "_id": "619647ffda52400007d7ffdc",
    "name": "audit",
    "company": "5f5a74a8fdf77a0008a6349a",
    "__v": 2,
    "description": "Grants auditors read-only permissions to specific endpoints."
}
```

---