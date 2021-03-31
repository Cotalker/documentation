---
title: Groups
sidebar_label: Groups
---
import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem'; 

Groups are represented as a link in the main menu.
There are 3 types of groups.
* Standard: Has channels
* Tasks: Has a state machine, tasks and channels
* Link: Opens or redirects user
 
## Model {#model}

| Field | Type | Description | Notes |
| ----  | ---- | ----------- | ----  |
| _id   | id   | Unique Identifier   | Unique. Exactly 24 chars. Valid chars [0-9a-f] |
| name  | string | Display   | Required |
| code  | string | Code Name | Unique. Max 60 chars. Valid chars [a-z0-9_] |
| modifiedAt | date | Last modification date
| createdAt | date | Entry creation date
NOTE: This is a simplified version. Please check the [API](https://api.cotalker.com) docs for the full model.

## API {#api}
The main features of the API are:

### Client Group-API {#client-group-api}
* Get all groups and their data

## Examples {#examples}

### Client-API GET Groups {#client-api-get-groups}
[A valid access-token is required to perform the request.](/docs/documentation/api/auth)

<Tabs defaultValue="curl" values={[ {label: 'Shell', value: 'curl'}, {label: 'Typescript', value: 'typescript'} ]}>
<TabItem value="curl">

```bash
curl --location --request GET 'https://www.cotalker.com/api/v2/groups/' \
--header 'Authorization: Bearer TOKEN'
``` 

</TabItem>
<TabItem value="typescript" example="api_user.ts">

```typescript
import { Configuration, GroupGetCollection, V2GroupsApi } from "@cotalker/cotalker-api";

const api = new V2GroupsApi(new Configuration({
    basePath: 'https://www.cotalker.com/api',
    accessToken: process.env.ACCESS_TOKEN,
}));


async function getGroups(): Promise<GroupGetCollection | undefined> {
    const response = await api.getV2Groups();
    return response.data?.data;
}

getGroups().then(groups => console.log(groups));

``` 

</TabItem>
</Tabs>

Expected network result 
<!-- response=api_group.json -->
```json
{
    "data": {
        "groups": [
            {
                "_id": "5fb43a565ee842ad20f69751",
                "name": "South Pacific Sales (2020)",
                "code": "south_pacific_sales_2020",
                "createdAt": "2020-11-12T15:39:33.001Z",
                "modifiedAt": "2020-11-12T15:39:33.005Z"
            },
            {
                "_id": "5fb43aedb4508f03e1d9916b",
                "name": "Northern Division - Projections 2021",
                "code": "north_division_2021",
                "createdAt": "2020-10-14T19:38:39.585Z",
                "modifiedAt": "2020-11-12T14:21:28.358Z"
            }
        ]
    }
}
```
<!-- end-response -->