---
title: Channels
sidebar_label: Channels
---
import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

A __channel__ is a space where users and bots can communicate through messages.

## Model {#model}

| Field | Type | Description | Notes |
| ----  | ---- | ----------- | ----  |
| _id   | id   | Unique Identifier   | Unique. Exactly 24 chars. Valid chars [0-9a-f] |
| group   | id   | Channel belongs to this group   | Exactly 24 chars. Valid chars [0-9a-f] |
| userIds   | Array\<id\>   | List of users in channel   | 
| propertyIds   | Array\<id\>   | List of channel properties   | 
| nameDisplay  | string | Display name   | Required |
| nameCode  | string | Identification code | Unique. Max 60 chars. Valid chars [a-z0-9_] |
| modifiedAt | date | Last modification date
| createdAt | date | Entry creation date
NOTE: This is a simplified version. Please check the [API](https://api.cotalker.com) docs for the full model.

## API {#api}

The main features of the API are:

### Client Channel-API {#client-channel-api}
* Get list of all channels
* Get data of specific channel

## Examples {#examples}

### Client-API GET /channels {#client-api-get-channels}
Listing all channels and their properties.

[A valid access-token is required to perform the request.](/docs/documentation/api/auth)

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
