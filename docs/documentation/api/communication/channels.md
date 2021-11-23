---
title: Channels
sidebar_label: Channels
---
import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Overview {#overview}
_Channels_ are workspaces where _users_ can get _task_ information, change _task_ states, submit _surveys_, summon _bots_, chat with other _users_, and share files. 

_Channels_ exist within either [_regular or workflow groups_](/docs/documentation/client/groups).

## Get Channels {#get-all-channels}
_Returns all channels within the company._

<span className="hero__subtitle"><span className="badge badge--success">GET</span> /channels</span>

#### Endpoint URL {#get-all-url}
`https://www.coltaker.com/api/v2/channels`

#### Headers {#get-all-headers}
Header | Description | Required | Values
--- | --- | --- | ---
**Authorization** | Sends your _access token_ to make an API request.<br/>[Click here to see how to obtain an _access token_.](/docs/documentation/api/auth#how-to) | Required | Bearer $ACCESS_TOKEN

#### Query Parameters {#query-get-all}

Parameter | Description | Type | Required | Notes
--- | --- | --- | ---- | ----
**search** | Returns endpoints that match the keywords in the array in the channel's `search` field. | string | Optional |
**limit** | Limits the amount of _channels_ returned in the response. | number | Optional | By default, the _limit_ is set to 10.
**page** | Makes the response display data from the indicated page number. | number | Optional | Best used in combination with the "limit" parameter.
**count** | Adds the `counter` field with the total amount of _channels_ within the company. | boolean | Optional | 
**orderBy** | Orders the _channels_ by ascendeing or descending order according to their `modifiedAt` field. | string | Optional | Options: `asc`, `desc`
**sortBy** | Sorts _channels_ in the response according to the chosen field: `nameCode`, `modifiedAt`, or `createdAt`. | string | Optional | Details about the [Channel Data Model](/docs/documentation/models/communication/model_channels)
**group** | Returns all _channels_ found within the indicated _group_. | [ObjectId<COTGroup\>](/docs/documentation/models/communication/model_groups)
**isActive** | Returns _channels_ according to their `isActive` status. | string | Optional | Options are: `all`, `true`, `false`
**user** | Returns _channels_ in which the indicated _user_ and the current _user_ are found in. | [ObjectId<COTUser\>](/docs/documentation/models/users/model_users) | Optional |
**userIsAdmin** | Returns _channels_ in which the indicated _user_ is found in the `groupOwnerIds` | boolean | Optional | Must be used in conjunction with the _user query parameter_.
**directChannels** | Returns _channels_ according to the setting of their `isDirect` field and in which the current _user_ or any indicated _user_ are found in. | string | Optional | Options are: `all`, `true`, `false`.<br/>Can be used with the _user query parameter_ to include other _users_ in the search. 
**modified** | Returns _channels_ with the indicated modification date in the `modifiedAt` field. | ISODate | Optional | YYYY-MM-DDTHH:mm:ss.SSSZ
**modified_gt** | Returns _channels_ modified after the indicated date and time. | ISODate | Optional | YYYY-MM-DDTHH:mm:ss.SSSZ
**modified_gte** | Returns _channels_ with a value in the `modifiedAt` field equal to or greater than the indicated date and time. | ISODate | Optional | YYYY-MM-DDTHH:mm:ss.SSSZ
**created** | Returns _channels_ with the indicated creation date in the `createdAt` field. | ISODate | Optional | YYYY-MM-DDTHH:mm:ss.SSSZ
**created_gt** | Returns _channels_ created after the indicated date and time. | ISODate | Optional | YYYY-MM-DDTHH:mm:ss.SSSZ
**created_gte** | Returns _channels_ with a value in the `createdAt` field equal to or greater than the indicated date and time. | ISODate | Optional | YYYY-MM-DDTHH:mm:ss.SSSZ
**created_lt** | Returns _channels_ created before the indicated date and time. | ISODate | Optional | YYYY-MM-DDTHH:mm:ss.SSSZ
**created_lte** | Returns _channels_ with a value in the `createdAt` field equal to or less than the indicated date and time. | ISODate | Optional | YYYY-MM-DDTHH:mm:ss.SSSZ
**debug** | Adds the `debug` field with error notifications. | string | Optional | Option: `true`

#### Request Samples {#get-all-request-sample}

<Tabs defaultValue="curl-get-all" values={[ {label: 'cURL (default)', value: 'curl-get-all'}, {label: 'cURL (query)', value: 'curl-group'}, {label: 'Typescript (default)', value: 'typescript'} ]}>
<TabItem value="curl-get-all">

_This default request gets all the channels in the company._
```bash
curl --location --request GET 'https://www.cotalker.com/api/v2/channels' \
--header 'Authorization: Bearer $ACCESS_TOKEN'
```

</TabItem>
<TabItem value="curl-group">

_This example uses the group query parameter to get channels within a group._
```bash
curl --location --request GET 'https://www.cotalker.com/api/v2/channels?group=61984c6f68a78ccc932d67f8' \
--header 'Authorization: Bearer $ACCESS_TOKEN'
```

</TabItem>
<TabItem value="typescript" example="api_channel.ts">

_This example gets all channels in the company._
```typescript
// $ACCESS_TOKEN stored in .env file.

import { ChannelGetCollection, Configuration, V2ChannelsApi} from "@cotalker/cotalker-api";

const api = new V2ChannelsApi(new Configuration({
    basePath: 'https://www.cotalker.com/api',
    accessToken: process.env.ACCESS_TOKEN,
    apiKey: 'true',
}));

async function getChannels(): Promise<ChannelGetCollection | undefined> {
    const response = await api.getV2Channels();
    return response.data?.data;
}

getChannels().then(channels => console.log(channels)).catch(e=>console.log(e))

``` 
</TabItem>
</Tabs>

#### Response Sample {#get-all-response-sample}
Responses follow the [COTChannel](/docs/documentation/models/communication/model_channels) data model.

---

## Get a Channel by Id {#get-channel-id}
_Returns the channel indicated by the Id._

<span className="hero__subtitle"><span className="badge badge--success">GET</span> /channels/&#123;id&#125;</span>

#### Endpoint URL {#get-channel-id-url}
`https://www.coltaker.com/api/v2/channels/{id}`

#### Path Parameters {#get-channel-path}
Parameter | Description | Type | Required | Notes
--- | --- | --- | --- | ---
**id** | The ObjectId of the _channel_ that is to be returned. | [ObjectId<COTChannel\>](/docs/documentation/models/communication/model_channels) | Required |

#### Headers {#get-channel-id-headers}
Header | Description | Required | Values
--- | --- | --- | ---
**Authorization** | Sends your _access token_ to make an API request.<br/>[Click here to see how to obtain an _access token_.](/docs/documentation/api/auth#how-to) | Required | Bearer $ACCESS_TOKEN

#### Query Parameters {#get-channel-id}
Header | Description | Required | Values
--- | --- | --- | ---
**debug** | Adds the `debug` field with error notifications. | string | Optional | true

#### Request Sample {#get-channel-id-request}

<Tabs defaultValue="curl" values={[ {label: 'cURL', value: 'curl'}, {label: 'Typescript', value: 'typescript'} ]}>
<TabItem value="curl">

```bash
curl --location --request GET 'https://www.cotalker.com/api/v2/channels/619648a6f27b4eb1a9e319ba' \
--header 'Authorization: Bearer $ACCESS_TOKEN' 
```

</TabItem>
<TabItem value="typescript" example="api_channel.ts">

```typescript
// $ACCESS_TOKEN stored in .env file.
import { ChannelGetCollectionChannels, Configuration, V2ChannelsApi } from "@cotalker/cotalker-api";

const api = new V2ChannelsApi(new Configuration({
    basePath: 'https://www.cotalker.com/api',
    accessToken: process.env.ACCESS_TOKEN,
    apiKey: 'true',
}));

async function getChannel(): Promise<ChannelGetCollectionChannels | undefined> {
    const response = await api.getV2ChannelsId( { id: "619648a6f27b4eb1a9e319ba" } );  // ObjectId<COTChannel>
    return response.data?.data;
}

getChannel().then(channel => console.log(channel)).catch(e=>console.log(e))
``` 

</TabItem>
</Tabs>

#### Response Sample {#get-channel-id-response}
The response follows the [COTChannel](/docs/documentation/models/communication/model_channels) data model.

---

## Create a New Channel {#post-channel}
_Creates a new channel within the company._

<span className="hero__subtitle"><span className="badge badge--info">POST</span> /channels</span>

#### Endpoint URL {#post-channel-url}
`https://www.cotalker.com/api/v2/channels`

#### Headers {#post-channel-headers}

Header | Description | Required | Values
--- | --- | --- | ---
**Authorization** | Sends your _access token_ to make an API request.<br/>[Click here to see how to obtain an _access token_.](/docs/documentation/api/auth#how-to) | Required | Bearer $ACCESS_TOKEN
**Admin** | Grants administrative access to create a _channel_. | Required | true 
**Content-Type** | Indicates the body's format. | Required | application/json

#### Query Parameters {#post-channel-query}
Parameter | Description | Type | Required | Notes
--- | --- | --- | --- | ---
**debug** | Adds the `debug` field with error notifications. | string | Optional | Option: `true`

#### Request Body {#post-channel-body}
_Only required fields are listed below. For a complete schema description, please go to the [COTChannel data model](/docs/documentation/models/communication/model_channels). Unrequired fields that are not submitted are either filled in automatically or left blank._

Element | Description | Type | Required | Notes
--- | --- | --- | --- | ---
**nameDisplay** | The _channel_ name _users_ will see in the platform. | string | Required |
**nameCode** | The _channel's_ unique identification name. | string | Required | Maximum 60 characters; only lowercase letters, numbers, and underscores allowed; must be unique.

#### Request Sample {#post-channel-request}
_Channel created with the minimum required fields:_
```bash
curl --location --request POST 'https://www.cotalker.com/api/v2/channels' \
--header 'Admin: true' \
--header 'Authorization: Bearer $ACCESS_TOKEN' \
--header 'Content-Type: application/json' \
--data-raw '{
    "nameDisplay": "Maintenance",
    "nameCode": "maintenance_channel",
    "group": "619b8b9f026233d770d7ef0a"
}'
```

#### Response Sample {#post-channel-response}
Go to [COTChannel](/docs/documentation/models/communication/model_channels) for a complete description of the response.
```json {29-31}
{
    "_id": "619b8cf2107bbec0876cddf2",
    "settings": {
        "write": "all"
    },
    "videoCall": {
        "start": {
            "any": false,
            "permissions": []
        },
        "isActive": false,
        "duration": [],
        "publishVideo": [],
        "publishAudio": []
    },
    "propertyIds": [],
    "userIds": [],
    "groupOwnerIds": [],
    "isPrivate": true,
    "isDirect": false,
    "isActive": true,
    "pinned": [],
    "bots": [],
    "search": [
        "maintenance",
        "channel",
        "maintenancechannel"
    ],
    "nameDisplay": "Maintenance",
    "nameCode": "maintenance_channel",
    "group": "619b8b9f026233d770d7ef0a",
    "company": "6136968b580aaf2b0e49d844",
    "createdAt": "2021-11-22T11:52:26.975Z",
    "modifiedAt": "2021-11-22T11:52:26.977Z",
}
```

---

## Update a Channel {#patch-channel}

_Updates or edits an existing channel's information._

<span className="hero__subtitle"><span className="badge badge--warning">PATCH</span> /channels/&#123;id&#125;</span>

#### Endpoint URL {#patch-channel-url}
`https://www.cotalker.com/api/v2/channels/{id}`

#### Path Parameters {#patch-channel-path}
Parameter | Description | Type | Required | Notes
--- | --- | --- | --- | ---
**id** | The ObjectId of the _channel_ that is to be modified. | [ObjectId<COTChannel\>](/docs/documentation/models/communication/model_channels) | Required |

#### Headers {#patch-channel-headers}
Header | Description | Required | Values
--- | --- | --- | ---
**Authorization** | Sends your _access token_ to make an API request.<br/>[Click here to see how to obtain an _access token_.](/docs/documentation/api/auth#how-to) | Required | Bearer $ACCESS_TOKEN
**Admin** | Grants administrative access to modify a _user_. | Required | true 
**Content-Type** | Sets the body's format. | Required | application/json

#### Query Parameters {#patch-channel-query}
Parameter | Description | Type | Required | Notes
--- | --- | --- | --- | ---
**debug** | Adds the `debug` field with error notifications. | string | Optional | Option: `true`

#### Request Body {#patch-channel-body}
_Only the fields that are being updated or added are required to be put into the body. For a complete schema description, please go to the [COTChannel data model](/docs/documentation/models/communication/model_channels)._

#### Request Sample {#patch-channel-request}
_Updating a user's phone number:_
```bash
curl --location --request PATCH 'https://www.cotalker.com/api/v2/channels/619b8cf2107bbec0876cddf2?debug=true' \
--header 'Admin: true' \
--header 'Authorization: Bearer $ACCESS_TOKEN' \
--header 'Content-Type: application/json' \
--data-raw '{
    "nameDisplay": "Maintenance Report"
}'
```

#### Response Sample {#patch-channel-response}
Go to [COTChannel](/docs/documentation/models/communication/model_channels) for a complete description of the response.
```json {29}
{
    "_id": "619b8cf2107bbec0876cddf2",
    "settings": {
        "write": "all"
    },
    "videoCall": {
        "start": {
            "any": false,
            "permissions": []
        },
        "isActive": false,
        "duration": [],
        "publishVideo": [],
        "publishAudio": []
    },
    "propertyIds": [],
    "userIds": [],
    "groupOwnerIds": [],
    "isPrivate": true,
    "isDirect": false,
    "isActive": true,
    "pinned": [],
    "bots": [],
    "search": [
        "maintenance",
        "channel",
        "maintenancechannel"
    ],
    "nameDisplay": "Maintenance Report",
    "nameCode": "maintenance_channel",
    "group": "619b8b9f026233d770d7ef0a",
    "company": "6136968b580aaf2b0e49d844",
    "createdAt": "2021-11-22T11:52:26.975Z",
    "modifiedAt": "2021-11-22T11:52:26.977Z",
}
```
---

