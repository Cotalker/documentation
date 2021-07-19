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
 
:::info
Click here for [data model descriptions](/docs/documentation/models/communication/model_groups)

Click here for complete [API and model specifications](https://www.cotalker.com/swagger/core/?key=woubtjf4olr0t4zgutuwn6scbcm6hd3qh1cgl5obmohpbm3mfublnwcvv67lodgjvd3h86s9ppshtvmf95gepsqh6nizq9liu7f).
:::

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