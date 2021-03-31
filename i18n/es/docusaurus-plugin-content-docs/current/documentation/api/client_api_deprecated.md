---
title: API
sidebar_label: API
---
import useBaseUrl from '@docusaurus/useBaseUrl'; 
import Mermaid from '@theme/Mermaid';

# Cotalker API Methods {#cotalker-api-methods}

The full API documentation can be found at [api.cotalker.com](https://api.cotalker.com)

# Example {#example}

Get a token:
```
curl -XPOST https://www.cotalker.com/auth/local \
-H 'Content-Type: application/json; charset=utf-8' \
-d '{ "email":"example@cotalker.com", "password": "secret" }' \
```
Return:
```
{ "token": "secret-token" }
``` 

# Documentation {#documentation}
This token can be used to call the API

```
curl https://www.cotalker.com/api/v1/users/me -H "Authorization: Bearer secret-token"
```
And this call returns a [User Object.](/docs/documentation/api/users/users)

<img alt="" src={useBaseUrl('img/admin_swagger_1.png')} />

<img alt="" src={useBaseUrl('img/admin_swagger_2.png')} />
