---
title: Company
sidebar_label: Company
---

:::caution Advertencia
Esta página aún no se encuentra traducida al español.
:::
import useBaseUrl from '@docusaurus/useBaseUrl';

## Overview {#overview}
A _company_, as an object, encompasses and unites all the data, activity, and users in an organization's Cotalker Platform. Through the `/companies` endpoint, you can configure the company's basic configurations.

_Users_ only have access to the _company_ they are associated with.

## Get a Company {#get-company}
_Returns the data of the company the user is associated with._

<span className="hero__subtitle"><span className="badge badge--success">GET</span> /companies</span>

#### Endpoint URL {#get-all-url}
`https://www.cotalker.com/api/v1/companies`

#### Headers {#get-all-headers}
Header | Description | Required | Values
--- | --- | --- | ---
**Authorization** | Sends your _access token_ to make an API request.<br/>[Click here to see how to obtain an _access token_.](/docs/documentation/api/auth#how-to) | Required | Bearer $ACCESS_TOKEN

#### Query Parameters {#query-get-all}

Parameter | Description | Type | Required | Notes
--- | --- | --- | ---- | ----
**populate** | Fills the indicated fields containing ObjectIds with the data model they represent, e.g., the `admin` field would be filled with the COTUser it represents. This query parameter accepts a comma-separated field string. | string | Optional | Syntax example: `GET /companies?populate=admin, help, conversationGroup`

#### Request Sample {#get-all-request}
```bash
curl --location --request GET 'https://www.cotalker.com/api/v1/companies' \
--header 'Authorization: Bearer $ACCESS_TOKEN'
```

#### Response Sample {#get-company-id-response}
The response follows the [COTCompany](/docs/documentation/models/company/model_company) data model.

---

## Get a Company by Id {#get-company-id}
_Returns the company indicated by the Id._

<span className="hero__subtitle"><span className="badge badge--success">GET</span> /companies/&#123;id&#125;</span>

#### Endpoint URL {#get-company-id-url}
`https://www.cotalker.com/api/v1/companies/{id}`

#### Path Parameters {#patch-company-path}
Parameter | Description | Type | Required | Notes
--- | --- | --- | --- | ---
**id** | The ObjectId of the _company_ that is to be returned. | [ObjectId<COTCompany\>](/docs/documentation/models/company/model_company) | Required |

#### Headers {#get-company-id-headers}
Header | Description | Required | Values
--- | --- | --- | ---
**Authorization** | Sends your _access token_ to make an API request.<br/>[Click here to see how to obtain an _access token_.](/docs/documentation/api/auth#how-to) | Required | Bearer $ACCESS_TOKEN

#### Request Sample {#get-company-id-request}
```bash
curl --location --request GET 'https://www.cotalker.com/api/v1/companies/61976ce4a1f102deb014a0c3' \
--header 'Authorization: Bearer $ACCESS_TOKEN'
```

#### Response Sample {#get-company-id-response}
The response follows the [COTCompany](/docs/documentation/models/company/model_company) data model.

---

## Update a Company {#patch-company}
_Updates or edits an existing job title._

<span className="hero__subtitle"><span className="badge badge--warning">PATCH</span> /companies/&#123;id&#125;</span>

#### Endpoint URL {#patch-company-url}
`https://www.cotalker.com/api/v1/companies/{id}`

#### Path Parameters {#patch-company-path}
Parameter | Description | Type | Required | Notes
--- | --- | --- | --- | ---
**id** | The ObjectId of the _company_ that is to be modified. | [ObjectId<COTCompany\>](/docs/documentation/models/company/model_company) | Required |

#### Headers {#patch-company-headers}
Header | Description | Required | Values
--- | --- | --- | ---
**Authorization** | Sends your _access token_ to make an API request.<br/>[Click here to see how to obtain an _access token_.](/docs/documentation/api/auth#how-to) | Required | Bearer $ACCESS_TOKEN
**Admin** | Grants administrative access to modify the _job title_. | Required | true 
**Content-Type** | Sets the body's format. | Required | application/json

#### Query Parameters {#patch-company-query}
Parameter | Description | Type | Required | Notes
--- | --- | --- | --- | ---
**debug** | Adds the `debug` field with error notifications. | string | Optional | Option: `true`

#### Request Body {#patch-company-body}
_Only the fields that are being updated or added are required to be put into the body. For a complete schema description, please go to the [COTCompany data model](/docs/documentation/models/company/model_company)._

#### Request Sample {#patch-company-request}
```bash
curl --location --request PATCH 'https://staging.cotalker.com/api/v1/companies/600ac7d8df5461626aac89c0' \
--header 'Authorization: Bearer $ACCESS_TOKEN' \
--header 'Content-Type: application/json' \
--data-raw '{
    "defaultCountry": "US",
    "defaultLanguage": "en"
}'
```

#### Response Sample {#patch-company-response}
Go to [COTCompany](/docs/documentation/models/company/model_company) for a complete description of the response.
```json {11-12}
{
    "__v" : 14,
    "_id" : "6136968b580aaf2b0e49d844",
    "admin" : [ 
        "6136969432d0379f7490cdf3"
    ],
    "appContacts" : true,
    "contactMode" : "default",
    "conversationGroup": "6197b98d6b60e7b6db7a61cf",
    "createdAt" : "2018-10-19T15:06:35.726Z",
    "defaultCountry" : "US",
    "defaultLanguage" : "en",
    "displayName" : "ACME",
    "emailDomains" : [ 
        "company.com"
    ],
    "help" : "6136969de063469044d87926",
    "hideSummary": false,
    "isActive" : true,
    "legalName" : "ACME INC.",
    "legalIdentifierCode": "EIN",
    "legalIdentifier": "123-45-6789",
    "modifiedAt" : "2021-08-20T19:35:11.648Z",
    "offline" : {
        "isActive" : false,
        "maxSyncTimeMs" : 0
    },
    "permissions" : {
        "receiveNotifications" : true,
        "readLocation" : true,
        "showTos" : {
            "value" : true
        }
    },
    "subdomain" : "acme",
    "system" : "613696a4a43cf12cb25c7de5"
}
```
---
