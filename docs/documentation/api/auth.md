---
title: Authorization
---

import useBaseUrl from '@docusaurus/useBaseUrl'; 
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Overview {#overview}

To call an endpoint, users must provide an _API Token_ or _Access Token_ in the **authorization header** (except when requesting an access token: `POST /auth/local`). 

The **admin header** is required for viewing some endpoints and must be present for modifying any endpoint.

Additionally, your [_access roles_](/docs/documentation/admin/admin_accessrole) will also determine which endpoints you may view and modify.

## Authorization & Admin Headers {#authorization-and-admin-headers}

_Remember to keep these headers in mind when making any API request:_

Header | Description | Required | Values
--- | --- | --- | ---
**Authorization** | Sends your _Access Token_ to make an API request.<br/>[**How to obtain an _Access Token_ is explained below.**](#how-to) | Required | Bearer $ACCESS_TOKEN
**Admin** | Grants administrative access to view and modify an endpoint. | Depends on the endpoint | Must be set to `true`. 

<br/>


## How to Obtain an Access Token {#how-to}
- Any Cotalker _user_ can obtain an _Access Token_ by calling the [_authentication method_](#auth): `POST /auth/local` (explained below).
- Additionally, admins can give external users an [API Token](/docs/documentation/admin/admin_token) that enables them to make some requests.

## Authentication Method {#auth}
This method obtains a user's _access token_. You must include the user's email and password in the body, add the corresponding headers, and then copy the _access token_ from the response.

<span className="hero__subtitle"><span className="badge badge--warning">POST</span> /auth/local</span>
<br/>

#### Endpoint URL: 
`POST https://www.cotalker.com/auth/local`

_In case you're using a free-trial version of Cotalker:_  
`POST https://demo.cotalker.com/auth/local`

#### Headers {#headers}
Header | Description | Required | Values
--- | --- | --- | ---
**Content-Type** | Sets the body's format. | Required | application/json
**Accept-Charset** | Character set of the sent content. | Required | utf-8

#### Request Body {#body}
Field | Description | Type | Required | Notes
--- | --- | --- | --- | ---
**email** | The email of the user who's access token is requested. | string | Required | The email must be registered in Cotalker.
**password** | The user's registered password. | string | Required | 

#### Request Sample {#request-sample}

```bash
curl --location --request POST 'https://www.cotalker.com/auth/local' \
--header 'Content-Type: application/json' \
--header 'Accept-Charset: utf-8' \
--data-raw '{
    "email": "name@company.com",
    "password": "thisIsMyPassword!"
}'
```

#### Response Sample
```bash
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2V4YW1wbGUuYXV0aDAuY29tLyIsImF1ZCI6Imh0dHBzOi8vYXBpLmV4YW1wbGUuY29tL2NhbGFuZGFyL3YxLyIsInN1YiI6InVzcl8xMjMiLCJpYXQiOjE0NTg3ODU3OTYsImV4cCI6MTQ1ODg3MjE5Nn0.CA7eaHjIHz5NxeIJoFK9krqaeZrPLwmMmgI_XiQiIkQ"
}
```
