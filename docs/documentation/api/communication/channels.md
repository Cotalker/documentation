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
**search** | Returns endpoints that match the keywords in the [`channels.search`](/docs/documentation/models/communication/model_channels) array. | string | Optional |
**limit** | Limits the amount of _channels_ returned in the response. | number | Optional | 
**page** | Makes the response display data from the indicated page number. | number | Optional | Best used in combination with the "limit" parameter.
**count** | Adds the `counter` field with the total amount of _channels_ within the company. | boolean | Optional | 
**orderBy** | Orders the _channels_ by ascendeing or descending order according to the [`channels.modifiedAt`](/docs/documentation/models/users/model_users) field. | string | Optional | Options: `asc`, `desc`
**sortBy** | Sorts _channels_ in the response according to the chosen field: `nameCode`, `modifiedAt`, or `createdAt`. | string | Optional | Details about the [Channel Data Model](/docs/documentation/models/communication/model_channels)
**group** | Returns all _channels_ found within a _group_. | [ObjectId<COTGroup\>](/docs/documentation/models/communication/model_groups)
**isActive** | Returns _users_ according to their [_users.isActive_](/docs/documentation/models/users/model_users) status. | string | Optional | Options are: `all`, `true`, `false`
**user** | | ObjectId<COTUser\> | Optional |
**userIsAdmin** | | boolean | Optional |
**directChannels** | | | Optional | Options are: `all`, `true`, `false`
**modified** | Returns _channels_ with the indicated modification date: [`channels.modifiedAt`](/docs/documentation/models/communication/model_channels) | ISODate | Optional | YYYY-MM-DDTHH:mm:ss.SSSZ
**modified_gt** | Returns _channels_ modified after the indicated date and time. | ISODate | Optional | YYYY-MM-DDTHH:mm:ss.SSSZ
**modified_gte** | Returns _channels_ with a [`channels.modifiedAt`](/docs/documentation/models/communication/model_channels) equal to or greater than the indicated date and time. | ISODate | Optional | YYYY-MM-DDTHH:mm:ss.SSSZ
**created** | Returns _channels_ with the indicated creation date: [`channels.createdAt`](/docs/documentation/models/communication/model_channels) | ISODate | Optional | YYYY-MM-DDTHH:mm:ss.SSSZ
**created_gt** | Returns _channels_ created after the indicated date and time. | ISODate | Optional | YYYY-MM-DDTHH:mm:ss.SSSZ
**created_gte** | Returns _channels_ with a [`channels.createdAt`](/docs/documentation/models/communication/model_channels) equal to or greater than the indicated date and time. | ISODate | Optional | YYYY-MM-DDTHH:mm:ss.SSSZ
**created_lt** | Returns _channels_ created before the indicated date and time. | ISODate | Optional | YYYY-MM-DDTHH:mm:ss.SSSZ
**created_lte** | Returns _channels_ with a [`channels.createdAt`](/docs/documentation/models/communication/model_channels) equal to or less than the indicated date and time. | ISODate | Optional | YYYY-MM-DDTHH:mm:ss.SSSZ
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









<Tabs defaultValue="curl" values={[ {label: 'Shell', value: 'curl'}, {label: 'Typescript', value: 'typescript'} ]}>
<TabItem value="curl">

```bash
curl --location --request GET 'https://www.cotalker.com/api/v2/channels' \
--header 'Authorization: Bearer TOKEN'
``` 

</TabItem>
<TabItem value="typescript" example="api_channel.ts">

```typescript
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

Expected network result:
_Note: This is a simplified example._

```json
{
    "data": {
        "channels": [
            {
                "_id": "5fb4324f2d8a0df350d08b85",
                "group": "5fb4326b13e16501861ee68e",
                "userIds": [
                    "5fb43304d59b01c7b1153ec9",
                    "5fb4331d97081d7b189bde3b",
                    "5fb43328d39a68d0a81e6e04"
                ],
                "propertyIds": [
                    "5fb43357db8c4eee6df656dd",
                    "5fb43366d4025f010312bb69"
                ],
                "nameDisplay": "NYC Workgroup",
                "nameCode": "workgroup_01",
                "modifiedAt": "2020-10-15T16:06:09.813Z",
                "createdAt": "2018-05-24T14:41:42.957Z"
            },
            {
                "_id": "5fb434eadaf347f938e1f3a4",
                "group": "5fb434f5df57219c8ba948b6",
                "userIds": [
                    "5fb434fc1d8928aa51f8275a",
                    "5fb4350559582e91a2fa2fa9",
                    "5fb4350c8a892f4b30954e74"
                ],
                "propertyIds": [
                    "5fb43514a4b74d16c7529672",
                    "5fb4351b62405e8bb4c1c207"
                ],
                "nameDisplay": "Beijing Workgroup",
                "nameCode": "workgroup_02",
                "modifiedAt": "2020-03-31T22:14:34.722Z",
                "createdAt": "2019-04-06T14:46:07.797Z"
                
            }
        ]
    }
}
```
### Client-API GET channel/{id} {#client-api-get-channelid}

You can get the data from a specific channel.

[A valid access-token is required to perform the request.](/docs/documentation/api/auth)

<Tabs defaultValue="curl" values={[ {label: 'Shell', value: 'curl'}, {label: 'Typescript', value: 'typescript'} ]}>
<TabItem value="curl">

```bash
curl --location --request GET 'https://www.cotalker.com/api/v2/channels/5fb4324f2d8a0df350d08b85' \
--header 'Authorization: Bearer TOKEN'
``` 

</TabItem>
<TabItem value="typescript" example="api_channel.ts">

```typescript
import { ChannelGetCollectionChannels, Configuration, V2ChannelsApi } from "@cotalker/cotalker-api";

const api = new V2ChannelsApi(new Configuration({
    basePath: 'https://www.cotalker.com/api',
    accessToken: process.env.ACCESS_TOKEN,
    apiKey: 'true',
}));

async function getChannel(): Promise<ChannelGetCollectionChannels | undefined> {
    const response = await api.getV2ChannelsId( { id: "5fb4324f2d8a0df350d08b85" } );
    return response.data?.data;
}

getChannel().then(channel => console.log(channel)).catch(e=>console.log(e))

``` 

</TabItem>
</Tabs>

Expected network result:
_Note: This example includes the entire model._
```json
{
    "data": {
        "_id": "60763b7635f4dce29576ca3b",
        "settings": {
            "write": "all"
        },
        "visibility": {
            "all": false
        },
        "info": {
            "users": [],
            "properties": [],
            "action": [],
            "startDate": "2021-02-17T18:32:18.611Z"
        },
        "videoCall": {
            "start": {
                "any": true,
                "permissions": []
            },
            "isActive": false,
            "duration": [],
            "publishVideo": [],
            "publishAudio": []
        },
        "propertyIds": [
            "60763b86a3a006e8a6969076"
        ],
        "userIds": [
            "60763b94311700076381884e",
            "60763b9a62d42f25b8b51472",
            "60763ba052cdbabe57dcaf36",
            "607641909e295236456e78d0",
            "6076419972a220c3d1087dd6",
            "607641a2f27301d229ad9060",
            "6076427e9b83d158d8838410",
            "6076428629d5d9f025a59347"
        ],
        "archive": [],
        "groupOwnerIds": [
            "60764297e685a063a98fecf3"
        ],
        "isPrivate": true,
        "isDirect": false,
        "isActive": true,
        "pinned": [],
        "bots": [],
        "search": [
            "company",
            "chat"
        ],
        "group": "607642a09bb5549d61fc06d0",
        "image": {
            "small": "",
            "square": "",
            "original": ""
        },
        "nameCode": "company_chat",
        "nameDisplay": "Company Chat",
        "overrideName": true,
        "company": "607642aab927150e82077ee7",
        "createdAt": "2021-02-17T18:32:18.611Z",
        "modifiedAt": "2021-02-19T15:33:16.360Z",
        "autocomplete": [],
        "actionButton": [],
        "lastMessage": {
            "content": "📩 Email sent ✅",
            "date": "2021-02-19T19:16:22.087Z",
            "sender": "607642b4b209ce10c3c0b65c",
            "contentType": "text/system"
        }
    }
}

```
