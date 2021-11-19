---
title: Job Titles
---
import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Overview {#overview}

[_Job titles_](/docs/documentation/admin/admin_jobtitles/) assigned to _users_ indicate their job or position within the _company_. With this endpoint, _users_ can be grouped into "pools" according to their _job titles_. A _job title_ can also grant _attributes or additional fields_ to _users_ associated with it.

## Get Job Titles
_Returns all job titles within the company._

<span className="hero__subtitle"><span className="badge badge--success">GET</span> /jobtitles</span>

#### Endpoint URL {#get-all-url}
`GET https://www.coltaker.com/api/v2/jobtitles`

#### Headers {#get-all-headers}
Header | Description | Required | Values
--- | --- | --- | ---
**Authorization** | Sends your _access token_ to make an API request.<br/>[Click here to see how to obtain an _access token_.](/docs/documentation/api/auth#how-to) | Required | Bearer $ACCESS_TOKEN
**Admin** | Grants access to the endpoint. | Required | true

#### Query Parameters {#query-get-all}

Parameter | Description | Type | Required | Notes
--- | --- | --- | ---- | ----
**limit** | Limits the amount of _job titles_ returned in the response. | number | Optional | 
**page** | Makes the response display data from the indicated page number. | number | Optional | Best used in combination with the "limit" parameter.
**count** | Adds the `counter` field with the total amount of job titles. | boolean | Optional | 
**isActive** | Returns _job titles_ according to their [_jobtitles.active_](/docs/documentation/models/users/model_jobtitles) status. | string | Optional | Options are: `all`, `true`, `false`
**ids** | Returns _job titles_ with the indicated ObjectIds in their `jobtitles._id` field. | [ObjectId<COTJobTitle\>[ ]](/docs/documentation/models/users/model_jobtitles) | Optional |
**search** | Returns job titles that match the keyword. Searches through the values of `jobtitles.name`, `jobtitles.permissions`, and `jobtitles.description` fields. | string | Optional | See [COTJobTitle](/docs/documentation/models/users/model_jobtitles) for data model details.
**debug** | Adds the `debug` field with error notifications and query values. | string | Optional | Option: `true`

#### Request Sample {#get-all-request}

<Tabs defaultValue="curl-get-all" values={[ {label: 'cURL (default)', value: 'curl-get-all'}, {label: 'cURL (query)', value: 'curl-query'}]}>
<TabItem value="curl-get-all">

_Request returns all job titles:_
```bash
curl --location --request GET 'https://www.cotalker.com/api/v2/jobtitles' \
--header 'Admin: true' \
--header 'Authorization: Bearer $ACCESS_TOKEN'
```

</TabItem>
<TabItem value="curl-query">

_Returns job titles that match search query along with a count of results:_
```bash
curl --location --request GET 'https://www.cotalker.com/api/v2/jobtitles?search=chief&count=true' \
--header 'Admin: true' \
--header 'Authorization: Bearer $ACCESS_TOKEN'
```

</TabItem>
</Tabs>

#### Response Sample {#get-jobtitle-id-response}
The response follows the [COTJobTitle](/docs/documentation/models/users/model_jobtitles) data model.

---

## Get a Job Title by Id {#get-jobtitle-id}
_Returns the job title indicated by the Id._

<span className="hero__subtitle"><span className="badge badge--success">GET</span> /jobtitles/&#123;id&#125;</span>

#### Endpoint URL {#get-jobtitle-id-url}
`GET https://www.coltaker.com/api/v2/jobtitles/{id}`

#### Path Parameters {#patch-jobtitle-path}
Parameter | Description | Type | Required | Notes
--- | --- | --- | --- | ---
**id** | The ObjectId of the _job title_ that is to be returned. | [ObjectId<COTJobTitle\>](/docs/documentation/models/users/model_jobtitles) | Required |

#### Headers {#get-jobtitle-id-headers}
Header | Description | Required | Values
--- | --- | --- | ---
**Authorization** | Sends your _access token_ to make an API request.<br/>[Click here to see how to obtain an _access token_.](/docs/documentation/api/auth#how-to) | Required | Bearer $ACCESS_TOKEN
**Admin** | Grants administrative access to view the _job title_. | Required | true

#### Request Sample {#get-jobtitle-id-request}
```bash
curl --location --request GET 'https://www.cotalker.com/api/v2/jobtitles/619648a6f27b4eb1a9e319ba' \
--header 'Admin: true' \
--header 'Authorization: Bearer $ACCESS_TOKEN'
```

#### Response Sample {#get-jobtitle-id-response}
The response follows the [COTJobTitle](/docs/documentation/models/users/model_jobtitles) data model.


---

## Create a Job Title {#post-jobtitle}
_Creates a new job title within the company._

<span className="hero__subtitle"><span className="badge badge--info">POST</span> /jobtitles</span>

#### Endpoint URL {#post-jobtitle-url}
`https://www.cotalker.com/api/v2/jobtitles`

#### Headers {#post-jobtitle-headers}

Header | Description | Required | Values
--- | --- | --- | ---
**Authorization** | Sends your _access token_ to make an API request.<br/>[Click here to see how to obtain an _access token_.](/docs/documentation/api/auth#how-to) | Required | Bearer $ACCESS_TOKEN
**Admin** | Grants administrative access to create a _job title_. | Required | true 

#### Query Parameters {#post-jobtitle-query}
Parameter | Description | Type | Required | Notes
--- | --- | --- | --- | ---
**debug** | Adds the `debug` field with error notifications. | string | Optional | Option: `true`

#### Request Body {#post-jobtitle-body}
_Only required fields are listed below. For a complete schema description, please go to the [COTJobTitle data model](/docs/documentation/models/users/model_jobtitles). Unrequired fields that are not submitted are either filled in automatically or left blank._

Element | Description | Type | Required | Notes
--- | --- | --- | --- | ---
**code** | The job title's unique ID name | string | Required | Maximum 60 characters; only lowercase letters, numbers, and underscore allowed; must be unique.
**display** | The job title's display name | string | Required |

#### Request Sample {#post-jobtitle-request}
_Job title created with the minimum required fields:_
```bash
curl --location --request POST 'https://www.cotalker.com/api/v2/jobtitles?debug=true' \
--header 'Admin: true' \
--header 'Authorization: Bearer $ACCESS_TOKEN' \
--header 'Content-Type: application/json' \
--data-raw '{
    "code": "senior_technical_writer",
    "display": "senior technical writer"
}'
```

#### Response Sample {#post-jobtitle-response}
Go to [COTJobTitle](/docs/documentation/models/users/model_jobtitles) for a complete description of the response.
```json
{
    "_id": "61966da4ac5644318a6c77c6",
    "isActive": true,
    "allowedExtensions": [],
    "search": [
        "senior",
        "technical",
        "writer",
        "seniortechnicalwriter"
    ],
    "code": "senior_technical_writer",
    "display": "senior technical writer",
    "company": "61966d9b217c9eb47cb35f8d",
    "createdAt": "2021-11-18T14:07:35.519Z",
    "modifiedAt": "2021-11-18T14:07:35.520Z"
}
```
---

## Update a Job Title {#patch-jobtitle}
_Updates or edits an existing job title._

<span className="hero__subtitle"><span className="badge badge--warning">PATCH</span> /jobtitles/&#123;id&#125;</span>

#### Endpoint URL {#patch-jobtitle-url}
`https://www.cotalker.com/api/v2/jobtitles/{id}`

#### Path Parameters {#patch-jobtitle-path}
Parameter | Description | Type | Required | Notes
--- | --- | --- | --- | ---
**id** | The ObjectId of the _job title_ that is to be modified. | [ObjectId<COTJobTitle\>](/docs/documentation/models/users/model_jobtitles) | Required |

#### Headers {#patch-jobtitle-headers}
Header | Description | Required | Values
--- | --- | --- | ---
**Authorization** | Sends your _access token_ to make an API request.<br/>[Click here to see how to obtain an _access token_.](/docs/documentation/api/auth#how-to) | Required | Bearer $ACCESS_TOKEN
**Admin** | Grants administrative access to modify the _job title_. | Required | true 

#### Query Parameters {#patch-jobtitle-query}
Parameter | Description | Type | Required | Notes
--- | --- | --- | --- | ---
**debug** | Adds the `debug` field with error notifications. | string | Optional | Option: `true`

#### Request Body {#patch-jobtitle-body}
_Only the fields that are being updated or added are required to put into the body. For a complete schema description, please go to the [COTJobTitle data model](/docs/documentation/models/users/model_jobtitles)._

#### Request Sample {#patch-jobtitle-request}
```bash
curl --location --request PATCH 'https://www.cotalker.com/api/v2/jobtitles/61965e277c131a0007a6b111' \
--header 'Admin: true' \
--header 'Authorization: Bearer $ACCESS_TOKEN' \
--header 'Content-Type: application/json' \
--data-raw '{
    "allowedExtensions": [
        "6192276efd8ef0bfb1176b0a",
        "61922776ace7e2f9e5a9327a"
    ]
}'
```

#### Response Sample {#patch-jobtitle-response}
Go to [COTJobTitle](/docs/documentation/models/users/model_jobtitles) for a complete description of the response.
```json
{
    "_id": "61966da4ac5644318a6c77c6",
    "isActive": true,
    "allowedExtensions": [
        "6192276efd8ef0bfb1176b0a",
        "61922776ace7e2f9e5a9327a"
    ],
    "search": [
        "senior",
        "technical",
        "writer",
        "seniortechnicalwriter"
    ],
    "code": "senior_technical_writer",
    "display": "senior technical writer",
    "company": "61966d9b217c9eb47cb35f8d",
    "createdAt": "2021-11-18T14:07:35.519Z",
    "modifiedAt": "2021-11-18T15:09:52.623Z"
}
```
---