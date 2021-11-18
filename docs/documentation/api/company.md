---
title: Company
sidebar_label: Company
---
import useBaseUrl from '@docusaurus/useBaseUrl';

## Overview {#overview}
A _company_, as an object, encompasses and unites all the data, activity, and users in an organization's Cotalker Platform. Through the `/companies` endpoint, you can configure the company's basic configurations.

_Users_ only have access to the _company_ they are associated with.

## Get a Company {#get-company}
_Returns the data of the company the user is associated with._

<span className="hero__subtitle"><span className="badge badge--success">GET</span> /companies</span>

#### Endpoint URL {#get-all-url}
`GET https://www.coltaker.com/api/v1/companies`

#### Headers {#get-all-headers}
Header | Description | Required | Values
--- | --- | --- | ---
**Authorization** | Sends your _access token_ to make an API request.<br/>[Click here to see how to obtain an _access token_.](/docs/documentation/api/auth#how-to) | Required | Bearer $ACCESS_TOKEN

#### Query Parameters {#query-get-all}

Parameter | Description | Type | Required | Notes
--- | --- | --- | ---- | ----
**populate** | | string | Optional |

#### Request Sample {#get-all-request}

```bash
curl --location --request GET 'https://www.cotalker.com/api/v1/companies' \
--header 'Authorization: Bearer $ACCESS_TOKEN' \
```

#### Response Sample {#get-jobtitle-id-response}
The response follows the [COTCompany](/docs/documentation/models/model_company) data model.

---