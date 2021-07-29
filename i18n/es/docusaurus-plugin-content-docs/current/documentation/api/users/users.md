---
title: Users
---
import useBaseUrl from '@docusaurus/useBaseUrl'; 
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

A __User__ represents a person or bot that can perform actions within a company and execute client-side actions as sending messages and getting channels. Their access roles will determine which (administrative) endpoint they may use. 

## User main fields (COTUser) {#user-main-fields-cotuser}

| Field | Type | Description | Notes |
| ----  | ---- | ----------- | ----  |
| _id   | id   | Unique Identifier   | [ObjectId](/docs/getting_started/temp/glossary#ObjectId ) |
| email | string | Login email | Unique
| jobTitle | string | Job | 
| isActive | boolean | Can user login and user the API |
| name.names | string | User names |
| name.lastname | string | User last name | 
| modifiedAt | date | Last modification date
| createdAt | date | Entry creation date
| accessroles | array-id | List of access roles | [Access Roles API](/docs/documentation/api/users/accessroles)

NOTE: This is a simplified version. Please check the [API](https://www.cotalker.com/swagger/core/?key=woubtjf4olr0t4zgutuwn6scbcm6hd3qh1cgl5obmohpbm3mfublnwcvv67lodgjvd3h86s9ppshtvmf95gepsqh6nizq9liu7f) docs for the full data model.
## API {#api}

The user API has a _client_ and _admin_ version. The former allows us to perform actions and gather data as a regular user (e.g., using the mobile app to change their password), the latter allows company-wide as disabling multiple users.  

The main features of the API are:

### Client User-API {#client-user-api}
*  Get self-user data
*  Modify self

### Admin User-API {#admin-user-api}
*  Get any user data
*  Modify users 
*  Create users
*  Disable users
*  Set user access-roles

NOTE: To use the Admin User-API the HTTP-header __Admin: true__ must be sent in the request.

For all endpoints and parameters please check the [API](https://www.cotalker.com/swagger/core/?key=woubtjf4olr0t4zgutuwn6scbcm6hd3qh1cgl5obmohpbm3mfublnwcvv67lodgjvd3h86s9ppshtvmf95gepsqh6nizq9liu7f)

## Examples {#examples}

### Client-API GET /users/me {#client-api-get-usersme}
 
A frequent action is to get the current user data, so we can use their parameters for other actions such as sending messages. 

[A valid access-token is required to perform the request.](/docs/documentation/api/auth)

<Tabs defaultValue="curl" values={[ {label: 'Shell', value: 'curl'}, {label: 'Typescript', value: 'typescript'} ]}>
<TabItem value="curl">

```bash
curl -XGET https://www.cotalker.com/api/v3/users/me \
-H "Authorization: Bearer TOKEN" 
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

Expected network result 
<!-- response=api_user.json -->
```json
{
  "data": {
    "_id": "5fb589b607ae0d8647792ec0",
    "email": "john.doe@example.com",
    "jobTitle": "full-stack developer",
    "isActive": true,
    "accessRoles": ["5fb58a84444beecfca50a2b4"],
    "name": {
      "names": "John",
      "lastName": "Doe"
    },
    "modifiedAt": "2020-10-26T14:08:48.220Z",
    "createdAt": "2019-04-26T22:00:31.263Z"
  }
}
```
<!-- end-response -->






### Admin-API GET /users/:id {#admin-api-get-usersid}
 
A frequent action is to get the current user data, so we can use their parameters for other actions as sending messages. 

[A valid access-token is required to perform the request.](/docs/documentation/api/auth)

<Tabs defaultValue="curl" values={[ {label: 'Shell', value: 'curl'}, {label: 'Typescript', value: 'typescript'} ]}>
<TabItem value="curl">

```bash
curl -XGET https://www.cotalker.com/api/v3/users/581118cf1dabccc92616be4f \
-H "Admin: true"
-H "Authorization: Bearer [ACCESS-TOKEN]" 
``` 

</TabItem>
<TabItem value="typescript" example="api_user_admin.ts">

```typescript
import { Configuration, UserGetCollectionUsers, V2UsersApi } from "@cotalker/cotalker-api";

const api = new V2UsersApi(new Configuration({
    basePath: 'https://www.cotalker.com/api',
    accessToken: process.env.ACCESS_TOKEN,
    apiKey: 'true',
}));
    

async function getUsersByEmail(): Promise<UserGetCollectionUsers[] | undefined> {
    const response = await api.getV2Users({ email: ["edward@cotalker.com", "guillermo@cotalker.com"] });
    return response.data?.data?.users;
}

getUsersByEmail().then(users => console.log(users));


``` 

</TabItem>
</Tabs>

Expected network result (fields were removed) 
<!-- response=api_user_admin.json -->
```json
{
  "data": {
    "users": [
      {
        "_id": "5fb589b607ae0d8647792ec0",
        "email": "john.doe@example.com",
        "jobTitle": "full-stack developer",
        "isActive": true,
        "accessRoles": ["5fb58a84444beecfca50a2b4"],
        "name": {
          "names": "John",
          "lastName": "Doe"
        },
        "modifiedAt": "2020-10-26T14:08:48.220Z",
        "createdAt": "2019-04-26T22:00:31.263Z"
      },
      {
        "_id": "5fb58a5c0175468479dacaa5",
        "email": "william.tell@example.com",
        "jobTitle": "front-end developer",
        "isActive": true,
        "accessRoles": ["5fb58a933fb872b7b7c28faa"],
        "name": {
          "names": "William",
          "lastName": "Tell"
        },
        "modifiedAt": "2020-10-26T14:08:48.220Z",
        "createdAt": "2019-04-26T22:00:31.263Z"
      }
    ]
  }
}
```
<!-- end-response -->





## Permissions {#permissions}

Administrative users can view and perform changes, depending on their permissions.

| API Version | Permission | Description |
|-------------|------------|-------------|
| client   | none | Allows to view self | 
| admin    | __admin-user-read__ or __admin-*-read__ | Allows to view all users |
| admin    | __admin-user-write__ | Allows modify all fields, except access-roles |
| admin    | __admin-accesscontrol-write__ | Allow to modify user access-roles |
| admin    | __admin-*-write__ | Allows modify all user fields |
