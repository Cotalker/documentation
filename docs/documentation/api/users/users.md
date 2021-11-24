---
title: Users
---
import useBaseUrl from '@docusaurus/useBaseUrl'; 
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Overview {#overview}

A _user_ represents a person or bot that can perform actions within a _company_ and execute client-side actions such as participating in _tasks_, entering _channels_, answering _surveys_, and sending _messages_.

The _users_ endpoint can be used to search for users, retrieve information, or group them by filtering their data. All this allows using _user_ information for further automations.

## Get Users {#view-all-users}
_Returns data from all users in the company._

<span className="hero__subtitle"><span className="badge badge--success">GET</span> /users</span>

#### Endpoint URL {#get-all-url}
`https://www.coltaker.com/api/v2/users`

#### Headers {#get-all-headers}
Header | Description | Required | Values
--- | --- | --- | ---
**Authorization** | Sends your _access token_ to make an API request.<br/>[Click here to see how to obtain an _access token_.](/docs/documentation/api/auth#how-to) | Required | Bearer $ACCESS_TOKEN

#### Query Parameters {#query-get-all}

Parameter | Description | Type | Required | Notes
--- | --- | --- | ---- | ----
**search** | Returns _users_ that match the keywords in the [`users.search`](/docs/documentation/models/users/model_users) array. | string | Optional |
**limit** | Limits the amount of _users_ returned in the response. | number | Optional | By default, the _limit_ is set to 10.
**page** | Makes the response display data from the indicated page number. | number | Optional | Best used in combination with the "limit" parameter.
**count** | Adds the `counter` field with the total amount of users. | boolean | Optional | 
**orderBy** | Orders the _users_ by ascendeing or descending order according to the [`users.modifiedAt`](/docs/documentation/models/users/model_users) field. | string | Optional | Options: `asc`, `desc`
**sortBy** | For the _user_ endpoint, the response is sorted only by its default, i.e., the [`users.modifiedAt`](/docs/documentation/models/users/model_users) field. | string | Optional |
**isActive** | Returns _users_ according to their [_users.isActive_](/docs/documentation/models/users/model_users) status. | string | Optional | Options are: `all`, `true`, `false`
**email** | Returns _users_ with the _emails_ contained in the array. | string[ ] | Optional |
**bot** | Returns _users_ with the indicated [COTBot](/docs/documentation/models/automations/model_bots) ObjectIds in their `users.bot` field. | [ObjectId<COTBot\>[ ]](/docs/documentation/models/users/model_users) | Optional |
**id** | Returns _users_ with the indicated ObjectIds in their `users._id` field. | [ObjectId<COTUser\>[ ]](/docs/documentation/models/users/model_users) | Optional |
**relatedUser** | Returns _users_ related to the indicated _user_ according the `users.companies.hierarchy` field. | [ObjectId<COTUser\>](/docs/documentation/models/users/model_users) | Optional |
**property** | Returns _users_ associated with the indicated _property_: `users.properties`. | [ObjectId<COTProperty\>](/docs/documentation/models/databases/model_properties) | Optional |
**accessRole** | Returns _users_ with the indicated _access role_: `users.accessRoles`. | [ObjectID<COTAccessRole\>](/docs/documentation/models/users/model_accessroles) | Optional |
**job** | Returns _users_ associated with the indicated _job title_: `users.job`. | [ObjectId<COTJobTitle\>](/docs/documentation/models/users/model_jobtitles) | Optional |
**modified** | Returns _users_ with the indicated modification date: [`users.modifiedAt`](/docs/documentation/models/users/model_users) | ISODate | Optional | YYYY-MM-DDTHH:mm:ss.SSSZ
**modified_gt** | Returns _users_ modified after the indicated date and time. | ISODate | Optional | YYYY-MM-DDTHH:mm:ss.SSSZ
**modified_gte** | Returns _users_ with a [`users.modifiedAt`](/docs/documentation/models/users/model_users) equal to or greater than the indicated date and time. | ISODate | Optional | YYYY-MM-DDTHH:mm:ss.SSSZ
**created** | Returns _users_ with the indicated creation date: [`users.createdAt`](/docs/documentation/models/users/model_users) | ISODate | Optional | YYYY-MM-DDTHH:mm:ss.SSSZ
**created_gt** | Returns _users_ created after the indicated date and time. | ISODate | Optional | YYYY-MM-DDTHH:mm:ss.SSSZ
**created_gte** | Returns _users_ with a [`users.createdAt`](/docs/documentation/models/users/model_users) equal to or greater than the indicated date and time. | ISODate | Optional | YYYY-MM-DDTHH:mm:ss.SSSZ
**created_lt** | Returns _users_ created before the indicated date and time. | ISODate | Optional | YYYY-MM-DDTHH:mm:ss.SSSZ
**created_lte** | Returns _users_ with a [`users.createdAt`](/docs/documentation/models/users/model_users) equal to or less than the indicated date and time. | ISODate | Optional | YYYY-MM-DDTHH:mm:ss.SSSZ
**debug** | Adds the `debug` field with error notifications. | string | Optional | Option: `true`

#### Request Samples {#get-all-request-sample}

<Tabs defaultValue="curl-get-all" values={[ {label: 'cURL (default)', value: 'curl-get-all'}, {label: 'cURL (query)', value: 'curl-email'}, {label: 'Typescript (query)', value: 'typescript'} ]}>
<TabItem value="curl-get-all">

_This default request gets all the user data in the company._
```bash
curl --location --request GET 'https://www.cotalker.com/api/v2/users' \
--header 'Authorization: Bearer $ACCESS_TOKEN' 
```

</TabItem>
<TabItem value="curl-email">

_This example uses the email query parameter to get matching users._
```bash
curl --location --request GET 'https://www.cotalker.com/api/v2/users?email=nick%40wuxi.com&email=yanxiang%40wuxi.com' \
--header 'Authorization: Bearer $ACCESS_TOKEN' 
```

</TabItem>
<TabItem value="typescript" example="api_user_admin.ts">

_This example uses the email query parameter to get matching users._
```typescript
// $ACCESS_TOKEN stored in .env file.

import { Configuration, UserGetCollectionUsers, V2UsersApi } from "@cotalker/cotalker-api";

const api = new V2UsersApi(new Configuration({
    basePath: 'https://www.cotalker.com/api',
    accessToken: process.env.ACCESS_TOKEN,
    apiKey: 'true',
}));

async function getUsersByEmail(): Promise<UserGetCollectionUsers[] | undefined> {
    const response = await api.getV2Users({ email: ["nick@wuxi.com", "yanxiang@wuxi.com"] });  //query parameters used here
    return response.data?.data?.users;
}

getUsersByEmail().then(users => console.log(users)).catch(e=>console.log(e))

``` 

</TabItem>
</Tabs>


#### Response Sample {#get-all-response-sample}
Responses follow the [COTUser](/docs/documentation/models/users/model_users#sample-json) data model.

---

## Get Current User {#get-me}
_Returns the current user data._

<span className="hero__subtitle"><span className="badge badge--success">GET</span> /users/me</span>

#### Endpoint URL {#get-me-url}
`https://www.coltaker.com/api/v2/users/me`

#### Headers {#get-me-headers}
Header | Description | Required | Values
--- | --- | --- | ---
**Authorization** | Sends your _access token_ to make an API request.<br/>[Click here to see how to obtain an _access token_.](/docs/documentation/api/auth#how-to) | Required | Bearer $ACCESS_TOKEN

#### Request Sample {#get-me-request}

<Tabs defaultValue="curl" values={[ {label: 'cURL', value: 'curl'}, {label: 'Typescript', value: 'typescript'} ]}>
<TabItem value="curl">

```bash
curl --location --request GET 'https://www.cotalker.com/api/v2/users/me' \
--header 'Authorization: Bearer $ACCESS_TOKEN'
``` 

</TabItem>
<TabItem value="typescript" example="api_user.ts">

```typescript
import { Configuration, COTUser, V2UsersApi } from "@cotalker/cotalker-api";

const api = new V2UsersApi(new Configuration({
    basePath: 'https://www.cotalker.com/api',
    accessToken: process.env.ACCESS_TOKEN,
}));


async function getMe(): Promise<COTUser | undefined> {
    const response = await api.getV2UsersMe();
    return response.data?.data;
}

getMe().then(user => console.log(user)).catch(e=>console.log(e))

``` 

</TabItem>
</Tabs>

#### Response Sample {#get-all-users-response-sample}
Response follows the [COTUser](/docs/documentation/models/users/model_users#sample-json) data model.

---

## Get User by Id {#get-user-id}
_Returns the user indicated by the Id._

<span className="hero__subtitle"><span className="badge badge--success">GET</span> /users/&#123;id&#125;</span>

#### Endpoint URL {#get-user-id-url}
`https://www.coltaker.com/api/v2/users/{id}`

#### Path Parameters {#patch-user-path}
Parameter | Description | Type | Required | Notes
--- | --- | --- | --- | ---
**id** | The ObjectId of the _user_ that is to be returned. | [ObjectId<COTUser\>](/docs/documentation/models/users/model_users) | Required |

#### Headers {#get-user-id-headers}
Header | Description | Required | Values
--- | --- | --- | ---
**Authorization** | Sends your _access token_ to make an API request.<br/>[Click here to see how to obtain an _access token_.](/docs/documentation/api/auth#how-to) | Required | Bearer $ACCESS_TOKEN

#### Query Parameters {#get-channel-id}
Header | Description | Required | Values
--- | --- | --- | ---
**debug** | Adds the `debug` field with error notifications. | string | Optional | true

#### Request Sample {#get-user-id-request}
```bash
curl --location --request GET 'https://www.cotalker.com/api/v2/users/6194f0345923b62967d7ba46' \
--header 'Authorization: Bearer $ACCESS_TOKEN' 
```

#### Response Sample {#get-user-id}
Response follows the [COTUser](/docs/documentation/models/users/model_users#sample-json) data model.

---

## Create a New User {#post-user}
_Creates a new user in the company following the COTUser data model._

<span className="hero__subtitle"><span className="badge badge--info">POST</span> /users</span>

#### Endpoint URL {#post-user-url}
`https://www.cotalker.com/api/v2/users`

#### Headers {#post-user-headers}

Header | Description | Required | Values
--- | --- | --- | ---
**Authorization** | Sends your _access token_ to make an API request.<br/>[Click here to see how to obtain an _access token_.](/docs/documentation/api/auth#how-to) | Required | Bearer $ACCESS_TOKEN
**Admin** | Grants administrative access to create a _user_. | Required | true 
**Content-Type** | Sets the body's format. | Required | application/json

#### Query Parameters {#post-user-query}
Parameter | Description | Type | Required | Notes
--- | --- | --- | --- | ---
**notifyEmail** | Sends an email notification to the newly created user. | string | Optional | Option: `true`
**debug** | Adds the `debug` field with error notifications. | string | Optional | Option: `true`

#### Request Body {#post-user-body}
_Only required fields are listed below. For a complete schema description, please go to the [COTUser data model](/docs/documentation/models/users/model_users). Unrequired fields that are not submitted are either filled in automatically or left blank._

Element | Description | Type | Required | Notes
--- | --- | --- | --- | ---
| **accessRoles** | The [access roles](/docs/documentation/admin/admin_accessrole) the user has been designated. | [ObjectID<COTAccessRole\>[ ]](/docs/documentation/models/users/model_accessroles) | Required |
| **email** | The user's email. | string | Required | The email cannot be changed. |
| **name** | User's full name. | object | |
| **name.displayName** | Displayed name on channel. | string | Required |
| **name.names** | The user's first and second names.  | string | Required |
| **name.lastName** | The user's surname. | string | Required |
| **name.secondLastName** | The user's second surname. | string | Required |

#### Request Sample {#post-user-request}
_User created with minimum fields required:_
```bash
curl --location --request POST 'https://www.cotalker.com/api/v2/users?debug=true' \
--header 'Admin: true' \
--header 'Authorization: Bearer $ACCESS_TOKEN' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": {
        "displayName": "Ma Tianbo",
        "names": "Tianbo",
        "lastName": "Ma",
        "secondLastName": ""
    },
    "email": "apple@jingmen.com",
    "accessRoles": [
        "619538262eebe7f03bde3db0",
        "6195382e7fde7e397f8b1f88",
        "61953833306b4481a5f5a34b"
    ]
}'
```

#### Response Sample {#post-user-response}
Go to [COTUser](/docs/documentation/models/users/model_users#sample-json) for a complete description of the response.
```json
{
    "_id": "61953bf9bdc3558a4966e54d",  // automatically generated ObjectId
    "name": {
        "displayName": "",
        "names": "Tianbo",
        "lastName": "Ma",
        "secondLastName": ""
    },
    "properties": [],
    "accessRoles": [  // ObjectId<COTAccessRole>[ ]
        "619538262eebe7f03bde3db0",
        "6195382e7fde7e397f8b1f88",
        "61953833306b4481a5f5a34b"
    ],
    "isActive": true,
    "termsConditions": false,
    "search": [  // automatically generated keywords
        "tianbo",
        "ma",
        "apple",
        "jingmen",
        "com",
        "applejingmencom"
    ],
    "isOnline": false,
    "email": "apple@jingmen.com",
    "companies": [
        {
            "hierarchy": {
                "boss": [],
                "peers": [],
                "subordinate": []
            },
            "_id": "61953bd8a1dd11a1943c28be",  // automatically generated ObjectId
            "companyId": "61953bd2155295659c76859c"  // ObjectId<COTCompany>
        }
    ],
    "lastRequestDate": "2021-11-17T15:34:42.171Z",
    "createdAt": "2021-11-17T15:34:42.171Z",
    "modifiedAt": "2021-11-17T15:34:42.206Z",
    "extensions": {}
}
```
---

## Update a User {#patch-user}
_Adds, updates, or edits an existing user's information._

<span className="hero__subtitle"><span className="badge badge--warning">PATCH</span> /users/&#123;id&#125;</span>

#### Endpoint URL {#patch-user-url}
`https://www.cotalker.com/api/v2/users/{id}`

#### Path Parameters {#patch-user-path}
Parameter | Description | Type | Required | Notes
--- | --- | --- | --- | ---
**id** | The ObjectId of the _user_ that is to be modified. | [ObjectId<COTUser\>](/docs/documentation/models/users/model_users) | Required |

#### Headers {#patch-user-headers}
Header | Description | Required | Values
--- | --- | --- | ---
**Authorization** | Sends your _access token_ to make an API request.<br/>[Click here to see how to obtain an _access token_.](/docs/documentation/api/auth#how-to) | Required | Bearer $ACCESS_TOKEN
**Admin** | Grants administrative access to modify a _user_. | Required | true 
**Content-Type** | Sets the body's format. | Required | application/json

#### Query Parameters {#patch-user-query}
Parameter | Description | Type | Required | Notes
--- | --- | --- | --- | ---
**debug** | Adds the `debug` field with error notifications. | string | Optional | Option: `true`

#### Request Body {#patch-user-body}
_Only the fields that are being updated or added are required to be put into the body. For a complete schema description, please go to the [COTUser data model](/docs/documentation/models/users/model_users)._

#### Request Sample {#patch-user-request}
_Updating a user's phone number:_
```bash
curl --location --request PATCH 'https://www.cotalker.com/api/v2/users/61953bf9bdc3558a4966e54d' \
--header 'Admin: true' \
--header 'Authorization: Bearer $ACCESS_TOKEN' \
--header 'Content-Type: application/json' \
--data-raw '{
    "phone": "8675309"
}'
```

#### Response Sample {#patch-user-response}
Go to [COTUser](/docs/documentation/models/users/model_users#sample-json) for a complete description of the response.
```json {41}
{
    "_id": "61953bf9bdc3558a4966e54d",  // automatically generated ObjectId
    "name": {
        "displayName": "",
        "names": "Tianbo",
        "lastName": "Ma",
        "secondLastName": ""
    },
    "properties": [],
    "accessRoles": [  // ObjectId<COTAccessRole>[ ]
        "619538262eebe7f03bde3db0",
        "6195382e7fde7e397f8b1f88",
        "61953833306b4481a5f5a34b"
    ],
    "isActive": true,
    "termsConditions": false,
    "search": [  // automatically generated keywords
        "tianbo",
        "ma",
        "apple",
        "jingmen",
        "com",
        "applejingmencom"
    ],
    "isOnline": false,
    "email": "apple@jingmen.com",
    "companies": [
        {
            "hierarchy": {
                "boss": [],
                "peers": [],
                "subordinate": []
            },
            "_id": "61953bd8a1dd11a1943c28be",  // automatically generated ObjectId
            "companyId": "61953bd2155295659c76859c"  // ObjectId<COTCompany>
        }
    ],
    "lastRequestDate": "2021-11-17T15:34:42.171Z",
    "createdAt": "2021-11-17T15:34:42.171Z",
    "modifiedAt": "2021-11-17T15:34:42.206Z",
    "phone": "8675309",
    "extensions": {}
}
```
---