---
title: Tasks (v2)
---
import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::info Version 2
- _Version 2_ endpoints provide a more comprehensive path structure than _version 1_.
- Some task-related API requests should still be done using **version 1 endpoints**: [`/v1/tasks`](/docs/documentation/api/tasks/tasks-v1).
:::

## Overview {#overview}
A [_task_](/docs/documentation/client/tasks/overview) is the representation of an asset and its state. In other words, a task is created within a workflow group and can follow a workflow process, passing from one state to another.

A [_Task group_](/docs/documentation/models/tasks/model_taskgroup) contains the [_tasks_](/docs/documentation/models/tasks/model_tasks) that are processed through a specific _workflow group_. The terms _task groups_ and _workflow groups_ are sometimes used synonymously. Users can [access _task groups_ through either the task or group view](/docs/documentation/client/tasks/access_task).

:::tip additional resources
- These are just some of the most basic API requests. For a complete list of endpoints, consult our [API documentation on Swagger](https://www.cotalker.com/swagger/core/?key=woubtjf4olr0t4zgutuwn6scbcm6hd3qh1cgl5obmohpbm3mfublnwcvv67lodgjvd3h86s9ppshtvmf95gepsqh6nizq9liu7f#/).
:::

## Get Task Groups {#get-task-groups}
_Lists the task groups in the company._

<span className="hero__subtitle"><span className="badge badge--success">GET</span> /tasks-groups/</span>

#### Endpoint URL {#get-task-groups-url}
`https://www.cotalker.com/api/v2/task-groups`

#### Headers {#get-task-groups-headers}
Header | Description | Required | Values
--- | --- | --- | ---
**Authorization** | Sends your _access token_ to make an API request.<br/>[Click here to see how to obtain an _access token_.](/docs/documentation/api/auth#how-to) | Required | Bearer $ACCESS_TOKEN

#### Query Parameters {#get-task-groups-parameters}
Parameter | Description | Type | Required | Notes
--- | --- | --- | --- | ---
**count** | Adds the `counter` field which returns the total amount of _task groups_.| boolean | Optional | 
**createdAt** | Returns task groups created on the specified date and time. | ISODate | Optional | 
**createdAt_gte** | Returns _task groups_ created on or after the specified date and time. | ISODate | Optional | 
**createdAt_lte** | Returns _task groups_ created on or before the specified date and time. | ISODate | Optional | 
**createdAt_gt** | Returns _task groups_ created after the specified date and time. | ISODate | Optional | 
**createdAt_lt** | Returns _task groups_ created before the specified date and time. | ISODate | Optional | 
**groupIds** | Returns _task groups_ according to the [COTGroup](/docs/documentation/api/communication/groups) they are associated with. | [ObjectId<COTGroup\>](/docs/documentation/api/communication/groups) | Optional | 
**ids** | Returns _task group_ with the specified ObjectId | [COTTaskGroup](/docs/documentation/models/tasks/model_taskgroup) | Optional | 
**isActive** | Returns _task groups_ that are active according to their _isActive_ field. | string | Optional | `all`, `true`, `false`
**limit** | Limits the amount of _task groups_ that are returned in the response. | number | Optional | By default, the _limit_ is set to 10.
**modifiedAt** | Returns _tasks groups_ modified on the indicated date. | ISODate | Optional | 
**modifiedAt_gte** | Returns _task groups_ modified on or after the specified date and time. | ISODate | Optional | 
**modifiedAt_lte** | Returns _task groups_ modified on or before the specified date and time. | ISODate | Optional | 
**modifiedAt_gt** | Returns _task groups_ modified after the specified date and time. | ISODate | Optional | 
**modifiedAt_lt** | Returns _task groups_ modified befoire the specified date and time. | ISODate | Optional | 
**orderBy** | Orders _task groups_ by ascending or descending order according to the value of the `sortBy` field. | string | Optional | Options: `asc`, `desc`
**page** | Makes the response display data from the indicated page number. | number | Optional | 
**sortBy** | Sorts _tasks groups_ by the indicated value. | string | Optional | Options: <br/>`createdAt`, `modifiedAt`, `collectionName`


#### Request Sample {#get-task-groups-sample}
```bash
curl --location --request GET 'https://www.cotalker.com/api/v2/task-groups' \
--header 'Authorization: Bearer $ACCESS_TOKEN'
```

#### Response Sample {#get-task-groups-response}
Responses follow the [**COTTaskGroup**](/docs/documentation/models/tasks/model_taskgroup) data model.

---


## Get Task Group by Id {#get-taskgroup-by-id}
_Returns the inidicated task group._

<span className="hero__subtitle"><span className="badge badge--success">GET</span> /task-groups/&#123;taskGroupId&#125;</span>

#### Endpoint URL {#get-taskgroup-by-id-url}
`https://www.cotalker.com/api/v2/task-groups/{taskGroupId}`

#### Path Parameters {#get-taskgroup-by-id-path}
Parameter | Description | Type | Required | Notes
--- | --- | --- | --- | ---
**taskGroupId** | The ObjectId of the _task group_ that is to be returned. | [ObjectId<COTTaskGroup\>](/docs/documentation/models/tasks/model_taskgroup) | Required |

#### Headers {#get-taskgroup-by-id-headers}
Header | Description | Required | Values
--- | --- | --- | ---
**Admin** | Gives administrative access to the endpoint. | Required | true
**Authorization** | Sends your _access token_ to make an API request.<br/>[Click here to see how to obtain an _access token_.](/docs/documentation/api/auth#how-to) | Required | Bearer $ACCESS_TOKEN

#### Request Sample {#get-taskgroup-by-id-request}
```bash
curl --location --request GET 'https://www.cotalker.com/api/v2/task-groups/62bf5e03654e96017e00e46a' \
--header 'Admin: true' \
--header 'Authorization: Bearer $ACCESS_TOKEN'
```

#### Response Sample {#get-taskgroup-by-id-response}
The response follows the [COTTaskGroup](/docs/documentation/models/tasks/model_taskgroup) data model.

---


## Create New Task Group {#post-taskgroup}
_Create a new task group._

<span className="hero__subtitle"><span className="badge badge--info">POST</span> /task-groups</span>

#### Endpoint URL {#create-taskgroup-url}
`https://www.cotalker.com/api/v2/task-groups`

#### Headers {#create-taskgroup-headers}
Header | Description | Required | Values
--- | --- | --- | ---
**Admin** | Gives administrative access to the endpoint. | Required | true
**Authorization** | Sends your _access token_ to make an API request.<br/>[Click here to see how to obtain an _access token_.](/docs/documentation/api/auth#how-to) | Required | Bearer $ACCESS_TOKEN
**Content-Type** | Indicates the body's format. | Required | application/json

#### Request Body {#create-taskgroup-body}
_Only required fields are listed below. For a complete schema description, please go to the [COTTaskGroup data model](/docs/documentation/models/tasks/model_taskgroup). Unrequired fields that are not submitted are either filled in automatically or left blank._

Element | Description | Type | Required | Notes
--- | --- | --- | --- | ---
| **group** | Indicates the workflow group associated with the task group. | [ObjectId<COTGroup\>](/docs/documentation/models/communication/model_groups) | Required | The _group_ must be exclusively assigned to the _task group_.



#### Request Sample {#create-taskgroup-request}
```bash
curl --location --request POST 'https://www.cotalker.com/api/v2/task-groups' \
--header 'Admin: true' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer $ACCESS_TOKEN' \
--data-raw '{
    "group": "61ae5eb11f130a35a73e2e06"
}'
```

#### Response Sample {#create-taskgroup-response}
Go to [COTTaskGroup](/docs/documentation/models/tasks/model_taskgroup) for a complete description of the response.
```json {20}
{
    "isActive": true,
    "readonly": false,
    "taskEditorPermissions": [],
    "taskFollowerPermissions": [],
    "writePermissions": [],
    "readPermissions": [],
    "flowType": "free",
    "hideClosedAfterDays": 30,
    "defaultView": "list",
    "levelConfig": [
        20,
        20,
        10
    ],
    "availableViews": [
        "list"
    ],
    "_id": "61ae5f2ebb6c6f1869625b90",
    "group": "61ae5eb11f130a35a73e2e06",
    "company": "613eafd572343ecb53cc8ccc",
    "createdAt": "2021-12-06T19:03:39.932Z",
    "taskPropertyPermissions": [],
    "collectionName": "task_manager",
    "modifiedAt": "2021-12-06T19:03:39.943Z",
    "__v": 0
}
```

---



## Get Tasks within a Task Group {#get-tasks-for-user}
_Returns tasks the user can view within the specified task group._

<span className="hero__subtitle"><span className="badge badge--success">GET</span> /task-groups/&#123;taskGroupId&#125;/tasks</span>

#### Endpoint URL {#get-tasks-for-user-url}
`https://www.cotalker.com/api/v2/task-groups/{taskGroupId}/tasks`

#### Path Parameters {#get-tasks-for-user-path}
Parameter | Description | Type | Required | Notes
--- | --- | --- | --- | ---
**taskGroupId** | The ObjectId of the _task group_ that is to be searched through. | [ObjectId<COTTaskGroup\>](/docs/documentation/models/tasks/model_taskgroup) | Required |

#### Headers {#get-tasks-for-user-headers}
Header | Description | Required | Values
--- | --- | --- | ---
**Admin** | Grants a wider range of available tasks. | Optional |true
**Authorization** | Sends your _access token_ to make an API request.<br/>[Click here to see how to obtain an _access token_.](/docs/documentation/api/auth#how-to) | Required | Bearer $ACCESS_TOKEN

#### Query Parameters {#get-tasks-for-user}
Parameter | Description | Type | Required | Notes
--- | --- | --- | --- | ---
**count** | When activated, returns the `count` field with the number of tasks returned by the request. | boolean | Optional | 
**createdAt** | Returns _tasks_ created on the indicated date. | ISODate | Optional | 
**createdAt_gte** | Returns _tasks_ created on or after the indicated date. | ISODate | Optional | 
**createdAt_lte** | Returns _tasks_ created on or before the indicated date. | ISODate | Optional | 
**createdAt_gt** | Returns _tasks_ created after the indicated date. | ISODate | Optional | 
**createdAt_lt** | Returns _tasks_ created before the indicated date. | ISODate | Optional | 
**isActive** | Returns either active or deactivated tasks. | boolean | Optional | In the [COTTask](/docs/documentation/models/tasks/model_tasks) data model, the `isActive` field indicates the task's active status.
**limit** | Limits the number of _tasks__ that are returned per response page. | number | Optional | By default, the _limit_ is set to 10.
**modifiedAt** | Returns _tasks_ modified on the indicated date. | ISODate | Optional | 
**modifiedAt_gte** | Returns _tasks_ modified on or after the indicated date. | ISODate | Optional | 
**modifiedAt_lte** | Returns _tasks_ modified on or before the indicated date. | ISODate | Optional | 
**modifiedAt_gt** | Returns _tasks_ modified after the indicated date. | ISODate | Optional | 
**modifiedAt_lt** | Returns _tasks_ modified before the indicated date. | ISODate | Optional | 
**orderBy** | Returns results in ascending or descending order. | string | Optional | Options: `asc` or `desc`.
**page** | Displays data from the indicated page number. | number | Optional | Best used in combination with the "limit" parameter.
**sortBy** | Sorts results by indicated attribute. |  | Optional | Only `name` attribute currently available.


#### Request Sample {#get-tasks-for-user-request}
```bash
curl --location --request GET 'https://www.cotalker.com/api/v2/tasks/61a8b233685ed3562e7cfdeb/task' \
--header 'Authorization: Bearer $ACCESS_TOKEN'
```

#### Response Sample {#get-tasks-for-user-response}
The response follows the [COTTask](/docs/documentation/models/tasks/model_tasks) data model.

---


## Get Tasks by Relations {#get-tasks-by-relations}
_Returns tasks related by the indicated parameters._

<span className="hero__subtitle"><span className="badge badge--success">GET</span> /task-groups/&#123;taskGroupId&#125;/tasks/relations</span>

#### Endpoint URL {#get-tasks-for-user-url}
`https://www.cotalker.com/api/v2/task-groups/{taskGroupId}/tasks/relations`

#### Path Parameters {#get-tasks-for-user-path}
Parameter | Description | Type | Required | Notes
--- | --- | --- | --- | ---
**taskGroupId** | The ObjectId of the _task group_ that is to be searched through. | [ObjectId<COTTaskGroup\>](/docs/documentation/models/tasks/model_taskgroup) | Required |

#### Headers {#get-tasks-for-user-headers}
Header | Description | Required | Values
--- | --- | --- | ---
**Admin** | Gives administrative access to the endpoint. | Required | true
**Authorization** | Sends your _access token_ to make an API request.<br/>[Click here to see how to obtain an _access token_.](/docs/documentation/api/auth#how-to) | Required | Bearer $ACCESS_TOKEN

#### Query Parameters {#get-tasks-for-user}
Parameter | Description | Type | Required | Notes
--- | --- | --- | --- | ---
**assignee** | Returns tasks assigned to the specified user. | [ObjectId<COTUser\>](/docs/documentation/models/users/model_users) | Optional |
**count** | When activated, returns the `count` field with the number of tasks returned by the request. | boolean | Optional | 
**isActive** | Returns either active or deactivated tasks. | boolean | Optional | In the [COTTask](/docs/documentation/models/tasks/model_tasks) data model, the `isActive` field indicates the task's active status.
**limit** | Limits the number of _tasks__ that are returned per response page. | number | Optional | By default, the _limit_ is set to 10.
**orderBy** | Returns results in ascending or descending order. | string | Optional | Options: `asc` or `desc`.
**page** | Displays data from the indicated page number. | number | Optional | Best used in combination with the "limit" parameter.
**property** | Returns tasks associated with the indicated property (element). | [ObjectId,<COTProperty\>](/docs/documentation/models/databases/model_properties) | Optional | 
**sortBy** | Sorts results by indicated attribute. |  | Optional | Only `name` attribute currently available.


#### Request Sample {#get-tasks-for-user-request}
```bash
curl --location --request GET 'https://www.cotalker.com/api/v2/task-groups/61a8b233685ed3562e7cfdeb/tasks/relations' \
--header 'Admin: true' \
--header 'Authorization: Bearer $ACCESS_TOKEN'
```

#### Response Sample {#get-tasks-for-user-response}
The response follows the [COTTask](/docs/documentation/models/tasks/model_tasks) data model.

---

