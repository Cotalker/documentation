---
title: Auth
sidebar_label: Auth
---

import useBaseUrl from '@docusaurus/useBaseUrl'; 
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Introduction {#introduction}

To use the API through a script or integration it is simple as calling an endpoint, e.g., getting users: GET /api/v3/users. These endpoints MUST be called with the corresponding authorization. 

### Authentication {#authentication}

Authentication can be done by various methods as User/Password or Google Sign-in. Currently, only User/Password can be executed via API calls.

#### User/Password {#userpassword}
 
This type of authentification is done with a [user](/docs/documentation/api/users/) calling the POST /auth/local endpoint with the user's email and password. The obtained access-token has the same permissions as the user, and if the user is deactivated, downgraded, or upgraded so is the associated access-token. 

|   Parameter    |  Value | 
|-----------|-----------------|
| URL       | /auth/local     | 
| Method    | POST            |
| Headers   | Content-Type: application/json; charset=utf-8   |
| Body      | { "email": "email@cotalker.com", "password": "secret-password" }  |

### Authorization {#authorization}

Each network request to the API must include the HTTP-header: __"Authorization: Bearer \[access-token]"__  and may include the HTTP-header: __"Admin: true"__ to call the administrative version of the endpoint.

## Example {#example}

<Tabs defaultValue="curl" values={[ {label: 'Shell', value: 'curl'}, {label: 'Typescript', value: 'typescript'} ]}>
<TabItem value="curl">

```bash
curl -XPOST https://www.cotalker.com/auth/local \
-H "Content-Type: application/json; charset=utf-8" \
-d '{ "email": "email@cotalker.com", "password": "secret-password" }'
``` 

</TabItem>
<TabItem value="typescript">

```typescript
import { ConfigurationParameters, CotalkerApi, Configuration } from "./index";

const config: ConfigurationParameters = {
    // TODO MISSING KEYS
    basePath: 'https://www.cotalker.com/api/v3',
};

const api = new CotalkerApi(new Configuration(config));

(async () => {
    const user = 'email@cotalker.com';
    const password = 'secret-password';
    const response = await api.login(email, password);
    console.log(response);
})();
``` 

</TabItem>
</Tabs>

Expected network result 
```json
{ "token":" abcdefghijklmnopqurstuvwxyz01234567891234567890" }
```
