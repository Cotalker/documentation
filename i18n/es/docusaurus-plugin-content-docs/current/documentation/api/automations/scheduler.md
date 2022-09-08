---
title: Schedules
---

:::caution Advertencia
Esta página aún no se encuentra traducida al español.
:::
import useBaseUrl from '@docusaurus/useBaseUrl';


## Overview {#overview}
[Schedules](/docs/documentation/admin/admin_scheduler) are automated tasks that can run on a scheduled date and time, either once or recurrently.

:::tip additional resources
These are just some of the most basic API requests. For a complete list of endpoints, consult our [API documentation on Swagger](https://www.cotalker.com/swagger/core/?key=woubtjf4olr0t4zgutuwn6scbcm6hd3qh1cgl5obmohpbm3mfublnwcvv67lodgjvd3h86s9ppshtvmf95gepsqh6nizq9liu7f#/).
:::

## Get All Schedules {#get-all}
_Returns all the schedules that exist within the company._

<span className="hero__subtitle"><span className="badge badge--success">GET</span> /schedules</span>

#### Endpoint URL {#get-task-groups-url}
`https://www.cotalker.com/api/v2/schedules`

#### Headers {#get-all-headers}
Header | Description | Required | Values
--- | --- | --- | ---
**Admin** | Authorizes access to the data. | Required | true
**Authorization** | Sends your _access token_ to make an API request.<br/>[Click here to see how to obtain an _access token_.](/docs/documentation/api/auth#how-to) | Required | Bearer $ACCESS_TOKEN

#### Query Parameters {#query-get-all}
Parameter | Description | Type | Required | Notes
--- | --- | --- | ---- | ----
**limit** | Limits the amount of _schedules_ returned in the response. | number | Optional | By default, the _limit_ is set to 10.
**page** | Makes the response display data from the indicated page number. | number | Optional | Best used in combination with the "limit" parameter.
**count** | Adds the `counter` field with the total amount of _schedules_. | boolean | Optional | 
**code** | Returns the _schedule_ with the indicated `code` name. | string | Optional | The schedule's code is found in the [COTSchedule](/docs/documentation/models/automations/model_scheduler) data model.

#### Request Sample {#get-all-request}
```bash
curl --location --request GET 'https://www.cotalker.com/api/v2/schedules' \
--header 'admin: true' \
--header 'Authorization: Bearer $ACCESS_TOKEN'
```

#### Response Sample {#get-all-response}
Responses follow the [**COTSchedule**](/docs/documentation/models/automations/model_scheduler) data model.

---



