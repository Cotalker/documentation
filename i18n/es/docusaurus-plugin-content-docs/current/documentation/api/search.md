---
title: Search
sidebar_label: Search
---
import useBaseUrl from '@docusaurus/useBaseUrl';

## Overview {#overview}
Use API to carry out search queries through different scopes.


## Search {#search}
_Returns search query results._

<span className="hero__subtitle"><span className="badge badge--success">GET</span> /search/search</span>

#### Endpoint URL {#endpoint}

`https://www.cotalker.com/api/v3/search/search`

#### Headers {#headers}

Headers | Description | Required | Values
--- | --- | --- | ---
**Authorization** | Sends your access token to make an API request.<br/>[Click here to see how to obtain an access token.](/docs/documentation/api/auth#how-to) | Required | Bearer $ACCESS_TOKEN

#### Query Parameters {#query-parameters}

Parameter | Description | Type | Required | Notes
--- | --- | --- | --- | --- 
**search** | Indicates the keywords to search for in the query. | string | Required |
**engines** | An array of objects containing search engine parameters. The array follows the [Search Engine Model](/docs/documentation/models/search/searchengine). | [Search Engine Model[ ]](/docs/documentation/models/search/searchengine)<br/>_Must be encoded in Base64 format._ | Required | To encode the array, you can use a tool like [Base64 Decode and Encode](https://www.base64encode.org/).

#### Request Sample {#request-sample}
_The request sample below returns documents and users with the word "lorem"._
```bash
curl --location --request GET 'https://www.cotalker.com/api/v3/search/search?search=lorem&engines=WwogICAgIHsKICAgICAgICAgICAgICAibmFtZSI6ICJ1c2VycyIsCiAgICAgICAgICAgICAgICJvcHRpb25zIjogewogICAgICAgICAgICAgICAgICJvcmRlckJ5IjogImFzYyIsCiAgICAgICAgICAgICAgICAgICJsaW1pdCI6IDEwMAogICAgICAgICAgICB9CiAgICB9Cl0=' \
--header 'Authorization: Bearer $ACCESS_TOKEN'
```


#### Response Sample {#response-sample}
Responses follow the [Search Category Results Model](/docs/documentation/models/search/searchresult).