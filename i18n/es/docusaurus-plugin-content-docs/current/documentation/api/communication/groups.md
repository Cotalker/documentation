---
title: Groups
sidebar_label: Groups
---

:::caution Advertencia
Esta página aún no se encuentra traducida al español.
:::
import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem'; 

## Overview {#overview}
[Groups](/docs/documentation/client/groups) are the standard form of interacting within the Cotalker environment and are primarily accessed through the Main Menu Bar and Group Panel. 

Group types: 
- _Standard groups_ contain channels used for communicating with other users. 
- _Workflow or Task groups_, like standard groups, have communication channels but are associated with workflow tasks and their states. 
- _Link groups_ direct you to anywhere within or outside the Cotalker environment.
- _Category groups_ bring together other groups to form sub-menus on the Main Menu Bar.


## Get Groups {#get-all-groups}
_Returns all channels within the company._

<span className="hero__subtitle"><span className="badge badge--success">GET</span> /groups</span>

#### Endpoint URL {#get-all-url}
`https://www.cotalker.com/api/v2/groups`

#### Headers {#get-all-headers}
Header | Description | Required | Values
--- | --- | --- | ---
**Authorization** | Sends your _access token_ to make an API request.<br/>[Click here to see how to obtain an _access token_.](/docs/documentation/api/auth#how-to) | Required | Bearer $ACCESS_TOKEN

#### Query Parameters {#query-get-all}

Parameter | Description | Type | Required | Notes
--- | --- | --- | ---- | ----
**created** | Returns _groups_ with the indicated creation date in the `createdAt` field. | ISODate | Optional | YYYY-MM-DDTHH:mm:ss.SSSZ
**created_gt** | Returns _groups_ created after the indicated date and time. | ISODate | Optional | YYYY-MM-DDTHH:mm:ss.SSSZ
**created_gte** | Returns _groups_ with a value in the `createdAt` field equal to or greater than the indicated date and time. | ISODate | Optional | YYYY-MM-DDTHH:mm:ss.SSSZ
**created_lt** | Returns _groups_ created before the indicated date and time. | ISODate | Optional | YYYY-MM-DDTHH:mm:ss.SSSZ
**created_lte** | Returns _groups_ with a value in the `createdAt` field equal to or less than the indicated date and time. | ISODate | Optional | YYYY-MM-DDTHH:mm:ss.SSSZ
**count** | Adds the `counter` field with the total amount of _groups_ within the company. | boolean | Optional | 
**groupType** | Returns groups specified by type. | string | Optional | Available values: `link` (link groups), `task` (workflow or task groups), and `channel` (standard groups)
**hasCatergories** | Filters [category groups](/docs/documentation/admin/admin_categories), i.e., groups displayed in sub-menus on the Main Menu Bar. | boolean | Optional | `true` displays categorized groups. `false` displays uncategorized groups.
**isActive** | Returns _groups_ according to their `isActive` status. | string | Optional | Options are: `all`, `true`, `false`
**isLink** | Returns all _link groups_ found in the company. | boolean | Optional |
**isTaskGroup** | Returns all _task groups_ found in the company. | boolean | Optional |
**debug** | Adds the `debug` field with error notifications. | string | Optional | Option: `true`
**limit** | Limits the amount of _groups_ returned in the response. | number | Optional | By default, the _limit_ is set to 10.
**modified** | Returns _groups_ with the indicated modification date in the `modifiedAt` field. | ISODate | Optional | YYYY-MM-DDTHH:mm:ss.SSSZ
**modified_gt** | Returns _groups_ modified after the indicated date and time. | ISODate | Optional | YYYY-MM-DDTHH:mm:ss.SSSZ
**modified_gte** | Returns _groups_ with a value in the `modifiedAt` field equal to or greater than the indicated date and time. | ISODate | Optional | YYYY-MM-DDTHH:mm:ss.SSSZ
**orderBy** | Orders the _groups_ by ascendeing or descending order according to their `modifiedAt` field. | string | Optional | Options: `asc`, `desc`
**page** | Makes the response display data from the indicated page number. | number | Optional | Best used in combination with the "limit" parameter.
**sortBy** | Sorts _groups_ in the response according to the `modifiedAt` field. | string | Optional | `modifiedAt` is the only value available.
**search** | Returns _groups_ that match the keywords in the `groups.search` field array. | string | Optional |


#### Request Samples {#get-all-request-sample}

<Tabs defaultValue="curl-get-all" values={[ {label: 'cURL (default)', value: 'curl-get-all'}, {label: 'cURL (query)', value: 'curl-group'}, {label: 'Typescript (default)', value: 'typescript'} ]}>
<TabItem value="curl-get-all">

_This default request gets all the groups in the company._
```bash
curl --location --request GET 'https://www.cotalker.com/api/v2/groups' \
--header 'Authorization: Bearer $ACCESS_TOKEN'
```

</TabItem>
<TabItem value="curl-group">

_This example uses the groupType query parameter to get all task groups within the company._
```bash
curl --location --request GET 'https://www.cotalker.com/api/v2/groups?groupType=task' \
--header 'Authorization: Bearer $ACCESS_TOKEN'
```

</TabItem>
<TabItem value="typescript" example="api_channel.ts">

_This example gets all groups in the company._
```typescript
// $ACCESS_TOKEN stored in .env file.
import { Configuration, GroupGetCollection, V2GroupsApi } from "@cotalker/cotalker-api";

const api = new V2GroupsApi(new Configuration({
    basePath: 'https://www.cotalker.com/api',
    accessToken: process.env.ACCESS_TOKEN,
}));

async function getGroups(): Promise<GroupGetCollection | undefined> {
    const response = await api.getV2Groups();
    return response.data?.data;
}

getGroups().then(groups => console.log(groups)).catch(e=>console.log(e))
``` 
</TabItem>
</Tabs>

#### Response Sample {#get-all-response-sample}
Responses follow the [COTGroup](/docs/documentation/models/communication/model_groups) data model.

---

## Get a Group by Id {#get-by-id}
_Returns the group indicated by the Id._

<span className="hero__subtitle"><span className="badge badge--success">GET</span> /groups/&#123;id&#125;</span>

#### Endpoint URL {#get-by-id-url}
`https://www.cotalker.com/api/v2/groups/{id}`

#### Path Parameters {#get-by-path}
Parameter | Description | Type | Required | Notes
--- | --- | --- | --- | ---
**id** | The ObjectId of the _group_ that is to be returned. | [ObjectId<COTGroup\>](/docs/documentation/models/communication/model_groups) | Required |

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
curl --location --request GET 'https://www.cotalker.com/api/v2/groups/618a9a1c881d93046349c820' \
--header 'Admin: true' \
--header 'Authorization: Bearer $ACCESS_TOKEN'
```

#### Response Sample {#get-by-id-response}
The response follows the [COTGroup](/docs/documentation/models/communication/model_groups) data model.

---

## Create a New Group {#post-new}
_Creates a new group within the company._

<span className="hero__subtitle"><span className="badge badge--info">POST</span> /groups</span>

#### Endpoint URL {#post-new-url}
`https://www.cotalker.com/api/v2/groups`

#### Headers {#post-new-headers}

Header | Description | Required | Values
--- | --- | --- | ---
**Authorization** | Sends your _access token_ to make an API request.<br/>[Click here to see how to obtain an _access token_.](/docs/documentation/api/auth#how-to) | Required | Bearer $ACCESS_TOKEN
**Admin** | Grants administrative access to create a _group_. | Required | true 
**Content-Type** | Indicates the body's format. | Required | application/json

#### Query Parameters {#post-new-query}
Parameter | Description | Type | Required | Notes
--- | --- | --- | --- | ---
**debug** | Adds the `debug` field with error notifications. | string | Optional | Option: `true`

#### Request Body {#post-new-body}
_Only required fields are listed below. For a complete schema description, please go to the [COTGroup data model](/docs/documentation/models/communication/model_groups). Unrequired fields that are not submitted are either filled in automatically or left blank._

Element | Description | Type | Required | Notes
--- | --- | --- | --- | ---
**nameDisplay** | The _Group_ name _users_ will see on the platform. | string | Required |
**nameCode** | The _group's_ unique identification name. | string | Required | Maximum 60 characters; only lowercase letters, numbers, and underscores allowed; must be unique.

#### Request Sample {#post-new-request}
_Channel created with the minimum required fields:_
```bash
curl --location --request POST 'https://www.cotalker.com/api/v2/groups' \
--header 'Admin: true' \
--header 'Authorization: Bearer $ACCESS_TOKEN' \
--header 'Content-Type: application/json' \
--data-raw '{
    "nameDisplay": "The Best Group Ever!",
    "nameCode": "best_group"
}'
```

#### Response Sample {#post-new-response}
Go to [COTGroup](/docs/documentation/models/communication/model_groups) for a complete description of the response.
```json {31-32}
{
    "apperance": {
        "textColor": "#ffffff"
    },
    "image": {
        "icon": "https://placeholdit.imgix.net/~text?txtsize=50&bg=ffeeeetxtclr=bbcccc&txt=i%20CoTalker&w=20&h=20"
    },
    "createChannels": {
        "requiredPermission": [],
        "requiredPermissionsV2": [],
    },
    "link": {
        "requiredPermission": [],
        "requiredPermissionsV2": []
    },
    "isActive": true,
    "color": "#000000",
    "search": [
        "the",
        "best",
        "group",
        "ever"
    ],
    "hideChannelsByProperties": [],
    "channelsWithoutCategoryLocation": "top",
    "groupSort": "a-z",
    "groupSortDirection": "asc",
    "innerSort": "lastMessage",
    "innerSortDirection": "desc",
    "_id": "619e51fee8b60a63b678aa94",
    "nameDisplay": "The Best Group Ever!",
    "nameCode": "best_group",
    "company": "619e51f3e7e198f18fe56a01",
    "createdAt": "2021-11-24T14:11:26.195Z",
    "actions": [],
    "modifiedAt": "2021-11-24T14:11:26.199Z",
    "weight": 135,
    "__v": 0
}
```
---

## Update a Group {#patch-update}
_Updates or edits an existing channel's information._

<span className="hero__subtitle"><span className="badge badge--warning">PATCH</span> /groups/&#123;id&#125;</span>

#### Endpoint URL {#patch-update-url}
`https://www.cotalker.com/api/v2/groups/{id}`

#### Path Parameters {#patch-update-path}
Parameter | Description | Type | Required | Notes
--- | --- | --- | --- | ---
**id** | The ObjectId of the _group_ that is to be modified. | [ObjectId<COTGroup\>](/docs/documentation/models/communication/model_groups) | Required |

#### Headers {#patch-update-headers}
Header | Description | Required | Values
--- | --- | --- | ---
**Admin** | Grants administrative access to modify a _group_. | Required | true 
**Authorization** | Sends your _access token_ to make an API request.<br/>[Click here to see how to obtain an _access token_.](/docs/documentation/api/auth#how-to) | Required | Bearer $ACCESS_TOKEN
**Content-Type** | Sets the body's format. | Required | application/json

#### Query Parameters {#patch-update-query}
Parameter | Description | Type | Required | Notes
--- | --- | --- | --- | ---
**debug** | Adds the `debug` field with error notifications. | string | Optional | Option: `true`

#### Request Body {#patch-update-body}
_Only the fields that are being updated or added are required to be put into the body. For a complete schema description, please go to the [COTGroup data model](/docs/documentation/models/communication/model_groups)._

#### Request Sample {#patch-update-request}
_Updating a group's channel creation settings:_
```bash
curl --location --request PATCH 'https://www.cotalker.com/api/v2/groups/619e51fee8b60a63b678aa94' \
--header 'Admin: true' \
--header 'Authorization: Bearer $ACCESS_TOKEN' \
--header 'Content-Type: application/json' \
--data-raw '{
    "createChannels": {
        "active": true,
        "requiredPermissionsV2": [
            "admin-groups-write"
        ]
    }
}'
```

#### Response Sample {#patch-update-response}
Go to [COTGroup](/docs/documentation/models/communication/model_groups) for a complete description of the response.
```json {8-14}
{
    "apperance": {
        "textColor": "#ffffff"
    },
    "image": {
        "icon": "https://placeholdit.imgix.net/~text?txtsize=50&bg=ffeeeetxtclr=bbcccc&txt=i%20CoTalker&w=20&h=20"
    },
    "createChannels": {
        "requiredPermission": [],
        "requiredPermissionsV2": [
            "admin-groups-write"
        ],
        "active": true
    },
    "link": {
        "requiredPermission": [],
        "requiredPermissionsV2": []
    },
    "isActive": true,
    "color": "#000000",
    "search": [
        "the",
        "best",
        "group",
        "ever"
    ],
    "hideChannelsByProperties": [],
    "channelsWithoutCategoryLocation": "top",
    "groupSort": "a-z",
    "groupSortDirection": "asc",
    "innerSort": "lastMessage",
    "innerSortDirection": "desc",
    "_id": "619e51fee8b60a63b678aa94",
    "nameDisplay": "The Best Group Ever!",
    "nameCode": "best_group",
    "company": "619e51f3e7e198f18fe56a01",
    "createdAt": "2021-11-24T14:11:26.195Z",
    "actions": [],
    "modifiedAt": "2021-11-24T14:11:26.199Z",
    "weight": 135,
    "__v": 0
}
```
---


