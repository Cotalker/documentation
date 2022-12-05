---
title: Tasks (v1)
---

:::caution Advertencia
Esta página aún no se encuentra traducida al español.
:::
import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::info New version available
Some requests are also available through version 2 endpoints: [`/v2/task-groups/`](/docs/documentation/api/tasks)  
Version 2 endpoints provide a more comprehensive path structure.

:::

## Overview {#overview}

A [_task_](/docs/documentation/client/basic_concepts#tasks) is the representation of an asset and its state. In other words, a task is created within a workflow group and can follow a workflow process, passing from one state to another.

A [_Task group_](/docs/documentation/models/tasks/model_taskgroup) contains the [_tasks_](/docs/documentation/models/tasks/model_tasks) that are processed through a specific _workflow group_. _Task group_ and _workflow group_ are sometimes used synonymously. Users can access _task groups_ through the [_group panel_](/docs/documentation/client/groups#group-panel).

:::tip additional resources
These are just some of the most basic API requests. For a complete list of endpoints, consult our [API documentation on Swagger](https://www.cotalker.com/swagger/core/?key=woubtjf4olr0t4zgutuwn6scbcm6hd3qh1cgl5obmohpbm3mfublnwcvv67lodgjvd3h86s9ppshtvmf95gepsqh6nizq9liu7f#/).
:::


## Get Task Groups {#get-task-groups}
_Lists the task groups in the company._

<span className="hero__subtitle"><span className="badge badge--success">GET</span> /tasks/group/</span>

#### Endpoint URL {#get-task-groups-url}
`https://www.cotalker.com/api/v1/tasks/group`

#### Headers {#get-task-groups-headers}
Header | Description | Required | Values
--- | --- | --- | ---
**Authorization** | Sends your _access token_ to make an API request.<br/>[Click here to see how to obtain an _access token_.](/docs/documentation/api/auth#how-to) | Required | Bearer $ACCESS_TOKEN
**Admin** | Grants administrative access to view _tasks_. | Required | true

#### Query Parameters {#get-task-groups-parameters}
Parameter | Description | Type | Required | Notes
--- | --- | --- | --- | ---
**limit** | Limits the amount of _tasks_ that are returned in the response. | number | Optional | By default, the _limit_ is set to 10.
**page** | Makes the response display data from the indicated page number. | number | Optional | 
**count** | Adds the `counter` field with the total amount of _tasks_.| boolean | Optional | 
**orderBy** | Orders the _tasks_ by ascending or descending order according to the value of the `sortBy` field. | string | Optional | Options: `asc`, `desc`
**sortBy** | Sorts the _tasks_ by the indicated value. | string | Optional | Options: <br/>`createdAt`, `modifiedAt`, `collectionName`
**isActive** | Returns _tasks_ that are active according to their _isActive_ field. | string | Optional | `all`, `true`, `false`
**debug** | Adds the `debug` field with error notificaciones. | string | Optional | Option: `true`

#### Request Sample {#get-task-groups-sample}
```bash
curl --location --request GET 'https://www.cotalker.com/api/v1/tasks/group' \
--header 'Admin: true' \
--header 'Authorization: Bearer $ACCESS_TOKEN'
```

#### Response Sample {#get-task-groups-response}
Responses follow the [**COTTaskGroup**](/docs/documentation/models/tasks/model_taskgroup) data model.

---

## Get Task Group by Id {#get-taskgroup-by-id}
_Returns the inidicated task group._

<span className="hero__subtitle"><span className="badge badge--success">GET</span> /tasks/group/&#123;groupId&#125;</span>

#### Endpoint URL {#get-taskgroup-by-id-url}
`https://www.cotalker.com/api/v1/tasks/group/{groupId}`

#### Path Parameters {#get-taskgroup-by-id-path}
Parameter | Description | Type | Required | Notes
--- | --- | --- | --- | ---
**groupId** | The ObjectId of the _task group_ that is to be returned. | [ObjectId<COTTaskGroup\>](/docs/documentation/models/tasks/model_taskgroup) | Required |

#### Headers {#get-taskgroup-by-id-headers}
Header | Description | Required | Values
--- | --- | --- | ---
**Admin** | Gives administrative access to the endpoint. | Optional | true
**Authorization** | Sends your _access token_ to make an API request.<br/>[Click here to see how to obtain an _access token_.](/docs/documentation/api/auth#how-to) | Required | Bearer $ACCESS_TOKEN

#### Query Parameters {#get-taskgroup-by-id}
Parameter | Description | Type | Required | Notes
--- | --- | --- | --- | ---
**debug** | Adds the `debug` field with error notifications. | string | Optional | Option: `true`

#### Request Sample {#get-taskgroup-by-id-request}
```bash
curl --location --request GET 'https://www.cotalker.com/api/v1/tasks/group/61a8b233685ed3562e7cfdeb' \
--header 'Authorization: Bearer $ACCESS_TOKEN'
```

#### Response Sample {#get-taskgroup-by-id-response}
The response follows the [COTTaskGroup](/docs/documentation/models/tasks/model_taskgroup) data model.

---


## Create New Task Group {#post-taskgroup}
_Create a new a task group._

<span className="hero__subtitle"><span className="badge badge--info">POST</span> /tasks/group</span>

#### Endpoint URL {#create-taskgroup-url}
`https://www.cotalker.com/api/v1/tasks/group`

#### Headers {#create-taskgroup-headers}
Header | Description | Required | Values
--- | --- | --- | ---
**Authorization** | Sends your _access token_ to make an API request.<br/>[Click here to see how to obtain an _access token_.](/docs/documentation/api/auth#how-to) | Required | Bearer $ACCESS_TOKEN
**Content-Type** | Indicates the body's format. | Required | application/json

#### Request Body {#create-taskgroup-body}
_Only required fields are listed below. For a complete schema description, please go to the [COTTaskGroup data model](/docs/documentation/models/tasks/model_taskgroup). Unrequired fields that are not submitted are either filled in automatically or left blank._

Element | Description | Type | Required | Notes
--- | --- | --- | --- | ---
| **group** | Indicates the workflow group associated with the task group. | [ObjectId<COTGroup\>](/docs/documentation/models/communication/model_groups) | Required | The _group_ must be exclusively assigned to the _task group_.



#### Request Sample {#create-taskgroup-request}
```bash
curl --location --request POST 'https://www.cotalker.com/api/v1/tasks/group' \
--header 'Authorization: Bearer $ACCESS_TOKEN' \
--header 'Content-Type: application/json' \
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

## Update Task Group {#patch-task-group}
_Updates or edits the indicated task group._

<span className="hero__subtitle"><span className="badge badge--warning">PATCH</span> /tasks/group/&#123;groupId&#125;</span>

#### Endpoint URL {#patch-taskgroup-permissions-url}
`https://www.cotalker.com/api/v1/tasks/group/{groupId}`

#### Path Parameters {#permissions-parameters}
Parameter | Description | Type | Required | Notes
--- | --- | --- | --- | ---
**groupId** | The task group's ID | [ObjectId<COTTaskGroup\>](/docs/documentation/models/tasks/model_taskgroup) | Required |

#### Headers {#permissions-headers}
Header | Description | Required | Values
--- | --- | --- | ---
**Authorization** | Sends your _access token_ to make an API request.<br/>[Click here to see how to obtain an _access token_.](/docs/documentation/api/auth#how-to) | Required | Bearer $ACCESS_TOKEN
**Admin** | Grants administrative access to edit _tasks_. | Required | true
**Content-Type** | Sets the body's format. | Required | application/json

#### Request Body {#permissions-body}
_Only the fields that are being updated or added are required to be put into the body. For a complete schema description, please go to the [COTTaskGroup data model](/docs/documentation/models/tasks/model_taskgroup)._


#### Request Sample {#permissions-sample}

```bash
curl --location --request PATCH 'https://www.cotalker.com/api/v1/tasks/group/616eafbda973cd46d72fb841' \
--header 'Admin: true' \
--header 'Authorization: Bearer $ACCESS_TOKEN' \
--header 'Content-Type: application/json' \
--data-raw '{
    "defaultView": "list"
}'
```

#### Response Sample {#permissions-response}
Go to [COTTaskGroup](/docs/documentation/models/tasks/model_taskgroup) for a complete description of the response.
```json {7}
{
    "_id" : "616eafbda973cd46d72fb841",
    "botUser" : "616eafc8c5b117753c1ae35c",
    "collectionName" : "projects",
    "company" : "613eafd572343ecb53cc8ccc",
    "createdAt" : "2021-10-18T21:53:27.028Z",
    "defaultView" : "list",
    "flowType" : "state-machine",
    "group" : "616eafea86d8203cfb2c8c6b",
    "hideClosedAfterDays" : 7,
    "initialStateMachine" : "616eb003c91d4c15104cc1fb",
    "isActive" : true,
    "levelConfig" : [],
    "modifiedAt" : "2021-10-18T21:53:27.028Z",
    "readPermissions" : ["app-access"],
    "taskEditorPermissions" : ["admin-task-write"],
    "taskFollowerPermissions" : ["admin-task-read", "admin-channels-read"],
    "taskPropertyPermissions" : [{
      "property" : "616eb3a8e59baa38b250da97",
      "editor" : ["admin-groups-write", "admin-properties-write"],
      "follower" : ["admin-groups-read"]
    }],
    "writePermissions" : ["admin-*-write"]
}
```

---

## Get Tasks for User within Group {#get-tasks-for-user}
_Returns all active tasks the user can view within the specified task group._

<span className="hero__subtitle"><span className="badge badge--success">GET</span> /tasks/&#123;groupId&#125;/task</span>

#### Endpoint URL {#get-tasks-for-user-url}
`https://www.cotalker.com/api/v1/tasks/{groupId}/task`

#### Path Parameters {#get-tasks-for-user-path}
Parameter | Description | Type | Required | Notes
--- | --- | --- | --- | ---
**groupId** | The ObjectId of the _task group_ that is to be searched through. | [ObjectId<COTTaskGroup\>](/docs/documentation/models/tasks/model_taskgroup) | Required |

#### Headers {#get-tasks-for-user-headers}
Header | Description | Required | Values
--- | --- | --- | ---
**Admin** | Grants a wider range of available tasks. | Optional |true
**Authorization** | Sends your _access token_ to make an API request.<br/>[Click here to see how to obtain an _access token_.](/docs/documentation/api/auth#how-to) | Required | Bearer $ACCESS_TOKEN

#### Query Parameters {#get-tasks-for-user}
Parameter | Description | Type | Required | Notes
--- | --- | --- | --- | ---
**limit** | Limits the amount of _tasks_ that are returned per response page. | number | Optional | By default, the _limit_ is set to 10.
**page** | Makes the response display data from the indicated page number. | number | Optional | Best used in combination with the "limit" parameter.
**search** | Searches for the keywords through all task fields. | string | Optional | Allows comma separated values, e.g., `/task?search=sales, report`
**assignee** | Returns tasks with the specified assignee. | [ObjectId<COTUser\>](/docs/documentation/models/users/model_users) | Optional |
**status** | Returns tasks that are in the indicated state or status. | [ObjectId<COTProperty\>](/docs/documentation/models/databases/model_properties) | Optional |
**limitBy** | | string | Optional | Options are: "all", "group", or "none".
**smStateMachine** | Lists all the tasks in the group that belong to the indicated state machine (workflow). | [ObjectId<COTSMStateMachine\>](/docs/documentation/models/tasks/model_statemachine) | Optional |
**filter** | Returns tasks ordered by the indicated [_task view_ filter](/docs/documentation/client/tasks/filter_tasks). | ObjectId | Optional | The _filter_ ObjectId is stored in the `defaultFilter` field of the [COTTaskGroup](/docs/documentation/models/tasks/model_taskgroup) data model.
**modifiedAt** | Lists tasks modified after the indicated date. | number | Optional | Date and time must be in Unix Epoch Timestamp format (with milliseconds), e.g., 1638219703000 = Monday, November 29, 2021 9:01:43 PM. |

#### Request Sample {#get-tasks-for-user-request}
```bash
curl --location --request GET 'https://www.cotalker.com/api/v1/tasks/61a8b233685ed3562e7cfdeb/task' \
--header 'Authorization: Bearer $ACCESS_TOKEN'
```

#### Response Sample {#get-tasks-for-user-response}
The response follows the [COTTask](/docs/documentation/models/tasks/model_tasks) data model.

---


## Get All Tasks within a Group {#get-all-tasks}
_Returns all tasks within the task group, regardless if the user is associated to them._

<span className="hero__subtitle"><span className="badge badge--info">POST</span> /tasks/&#123;groupId&#125;/task/all</span>

#### Endpoint URL {#get-taskgroup-by-id-url}
`https://www.cotalker.com/api/v1/tasks/{groupId}/task/all`

#### Path Parameters {#get-by-path}
Parameter | Description | Type | Required | Notes
--- | --- | --- | --- | ---
**groupId** | The ObjectId of the _task group_ that is to be searched through. | [ObjectId<COTTaskGroup\>](/docs/documentation/models/tasks/model_taskgroup) | Required |

#### Headers {#get-by-id-headers}
Header | Description | Required | Values
--- | --- | --- | ---
**Authorization** | Sends your _access token_ to make an API request.<br/>[Click here to see how to obtain an _access token_.](/docs/documentation/api/auth#how-to) | Required | Bearer $ACCESS_TOKEN

#### Request Sample {#get-by-id-request}
```bash
curl --location --request POST 'https://www.cotalker.com/api/v1/tasks/61a8b233685ed3562e7cfdeb/task/all' \
--header 'Authorization: Bearer $ACCESS_TOKEN' \
```

#### Response Sample {#get-all-tasks-response}
The response follows the [COTTask](/docs/documentation/models/tasks/model_tasks) data model.

---

## Get Specific Task {#get-specific-task}
_Returns the indicated task._

<span className="hero__subtitle"><span className="badge badge--success">GET</span> /tasks/&#123;groupId&#125;/task/&#123;taskId&#125;</span>

#### Endpoint URL {#get-taskgroup-by-id-url}
`https://www.cotalker.com/api/v1/tasks/{groupId}/task/{taskId}`

#### Path Parameters {#get-by-path}
Parameter | Description | Type | Required | Notes
--- | --- | --- | --- | ---
**groupId** | The ObjectId of the _task group_ that is to be searched through. | [ObjectId<COTTaskGroup\>](/docs/documentation/models/tasks/model_taskgroup) | Required |
**taskId** | The ObjectId of the _task_ that is to be returned. | [ObjectId<COTTask\>](/docs/documentation/models/tasks/model_tasks) | Required |

#### Headers {#get-by-id-headers}
Header | Description | Required | Values
--- | --- | --- | ---
**Authorization** | Sends your _access token_ to make an API request.<br/>[Click here to see how to obtain an _access token_.](/docs/documentation/api/auth#how-to) | Required | Bearer $ACCESS_TOKEN

#### Request Sample {#get-by-id-request}
```bash
curl --location --request GET 'https://www.cotalker.com/api/v1/tasks/61a8b233685ed3562e7cfdeb/task/61a9045c49cb12c5f92f9ed4' \
--header 'Authorization: Bearer $ACCESS_TOKEN'
```

#### Response Sample {#get-specific-task-response}
The response follows the [COTTask](/docs/documentation/models/tasks/model_tasks) data model.

---

## Create Task {#create-task}
_Create a task within a group._

<span className="hero__subtitle"><span className="badge badge--info">POST</span> /tasks/&#123;groupId&#125;/task/create</span>

#### Endpoint URL {#create-task-url}
`https://www.cotalker.com/api/v1/tasks/{groupId}/task/create`

#### Path Parameters {#create-task-path}
Parameter | Description | Type | Required | Notes
--- | --- | --- | --- | ---
**groupId** | The ObjectId of the _task group_ where the task is to be created. | [ObjectId<COTTaskGroup\>](/docs/documentation/models/tasks/model_taskgroup) | Required |

#### Headers {#create-task-headers}
Header | Description | Required | Values
--- | --- | --- | ---
**Authorization** | Sends your _access token_ to make an API request.<br/>[Click here to see how to obtain an _access token_.](/docs/documentation/api/auth#how-to) | Required | Bearer $ACCESS_TOKEN
**Content-Type** | Indicates the body's format. | Required | application/json

#### Request Body {#create-task-body}
_Only required fields are listed below. For a complete schema description, please go to the [COTTask data model](/docs/documentation/models/tasks/model_tasks). Unrequired fields that are not submitted are either filled in automatically or left blank._

Element | Description | Type | Required | Notes
--- | --- | --- | --- | ---
**name** | The task's display name. | string | Required |

#### Request Sample {#create-task-request}
```bash
curl --location --request POST 'https://www.cotalker.com/api/v1/tasks/616eafbda973cd46d72fb841/task/create' \
--header 'Authorization: Bearer $ACCESS_TOKEN' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "API TASK!"
}'
```

#### Response Sample {#create-task-response}
Go to [COTTask](/docs/documentation/models/tasks/model_tasks) for a complete description of the response.
```json {17}
{
    "answers": [],
    "indentation": 0,
    "isActive": true,
    "activeSlas": [],
    "editors": [
        "61b9b7a9d258d731520fc846"
    ],
    "followers": [],
    "visibility": [],
    "subscribers": [],
    "userList": [
        "61b9b7a9d258d731520fc846"
    ],
    "language": "english",
    "_id": "61b9b7b4efad20915c6f40fb",
    "name": "API TASK!",
    "createdBy": "61b9b7a9d258d731520fc846",
    "company": "61792eb79f70471601d5239c",
    "taskGroup": "61b9b80b8539e6cae2450552",
    "owner": "manual",
    "weight": 0,
    "relativeWeight": 0,
    "createdAt": "2021-12-02T17:44:06.313Z",
    "status": "61b9b803b8cf489071f6f6a6",
    "smState": "61b9b7fdac349679d0e2f26b",
    "smStateMachine": "61b9b7f72b810c1adc8b1e31",
    "modifiedStateAt": "2021-12-02T17:44:06.327Z",
    "closedAt": null,
    "asset": "61b9b7f06231d52cb9b341ea",
    "assignee": "61b9b7a9d258d731520fc846",
    "channel": "61b9b7e901bc6589f06def08",
    "serial": 47,
    "modifiedAt": "2021-12-02T17:44:06.388Z",
    "__v": 0,
    "extensions": {}
}
```

---

## Update Task {#update-task}
_Updates or edits the indicated task._
`PATCH /v1/tasks/{groupId}/task/{taskId}`

<span className="hero__subtitle"><span className="badge badge--warning">PATCH</span> /tasks/&#123;groupId&#125;/task/&#123;taskId&#125;</span>

#### Endpoint URL {#patch-taskgroup-permissions-url}
`https://www.cotalker.com/api/v1/tasks/{groupId}/task/{taskId}`

#### Path Parameters {#permissions-parameters}
Parameter | Description | Type | Required | Notes
--- | --- | --- | --- | ---
**groupId** | The ObjectId of the _task group_ that is to be searched through. | [ObjectId<COTTaskGroup\>](/docs/documentation/models/tasks/model_taskgroup) | Required |
**taskId** | The ObjectId of the _task_ that is to be updated. | [ObjectId<COTTask\>](/docs/documentation/models/tasks/model_tasks) | Required |

#### Headers {#permissions-headers}
Header | Description | Required | Values
--- | --- | --- | ---
**Authorization** | Sends your _access token_ to make an API request.<br/>[Click here to see how to obtain an _access token_.](/docs/documentation/api/auth#how-to) | Required | Bearer $ACCESS_TOKEN
**Content-Type** | Sets the body's format. | Required | application/json

#### Request Body {#permissions-body}
_Only the fields that are being updated or added are required to be put into the body. For a complete schema description, please go to the [COTTask data model](/docs/documentation/models/tasks/model_tasks)._


#### Request Sample {#permissions-sample}

```bash
curl --location --request PATCH 'https://www.cotalker.com/api/v1/tasks/616eafbda973cd46d72fb841/task/617928f1d50f83209fc4c9a2' \
--header 'Authorization: Bearer $ACCESS_TOKEN' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "Monthly Sales Report"
}'
```

#### Response Sample {#permissions-response}
Go to [COTTask](/docs/documentation/models/tasks/model_tasks) for a complete description of the response.
```json {44}
{
    "__v": 9,
    "_id": "617928f1d50f83209fc4c9a2",
    "activeSlas": [
        "61794f9d7e2207607dea305d"  
    ],
    "answers": [
        "61792e75437145ca48a1d5cd",  
        "61792e7c63bf434aabe08105",  
        "61792e8cc031f322c5090275"  
    ],
    "asset": "61792ea734f892fa71f1bea3",  
    "assignee": "61792ea18b81afb8b9d02898",  
    "channel": "61792eb01011d273cdadd371",  
    "closedAt": null,
    "company": "61792eb79f70471601d5239c",  
    "createdAt": "2021-06-23T18:52:43.650Z",
    "createdBy": "61792ea18b81afb8b9d02898",  
    "editors": [
        "61792ea18b81afb8b9d02898",  
        "61792eed7e632ed745423227"  
    ],
    "endDate": "2021-08-31T04:00:00.000Z",
    "estimatedTime": 5,
    "extensions": {
        "birthdays_00": {
            "birthdate_00": "2021-10-01T03:00:00.000Z"
        }
    },
    "followers": [
        "61792ef89c0dc2f1f67c8ba6"  
    ],
    "image": {
        "small": "https://mysite.com/image_small.png",
        "square": "https://mysite.com/image_square.png",
        "original": "https://mysite.com/image_original.png"
    },
    "indentation": 0,
    "info": "Elaborate and distribute this month's sales report.",
    "isActive": true,
    "language": "english",
    "modifiedAt": "2021-10-07T10:33:34.350Z",
    "modifiedStateAt": "2021-09-21T18:25:56.787Z",
    "name": "Monthly Sales Report",
    "owner": "manual",
    "relativeWeight": 1,
    "serial": 28,
    "smState": "6179356dcb7a69311a26bb80", 
    "smStateMachine": "61793577a8d46e736bdcd129", 
    "startDate": "2021-07-01T04:00:00.000Z",
    "status": "6179366b1361882699b18e27", 
    "status1": "61793672a2bd931f8838cd5a", 
    "status2": "61793678aebac07bfb11d587", 
    "status3": "6179367ecb7ab1e467fe092f",
    "status4": null,
    "status5": null,
    "taskGroup": "6179368883ddbe5b0ac30c2d",  
    "userList": [
        "61792ea18b81afb8b9d02898",  
        "61792eed7e632ed745423227",  
        "61792ef89c0dc2f1f67c8ba6",  
        "617936ae27e055c29d00d823"  
    ],
    "visibility": [
        "617936ae27e055c29d00d823"  
    ],
    "weight": 0,

}
```

---

<span className="hero__subtitle">⚠️ The following feature is still in BETA stage.</span>

## Task Permissions for Unassociated Users {#patch-taskgroup-permissions}
_Users can be given permission to follow or edit the tasks within a group without being associated to any of them._

:::note
- Permissions can be given, either globally by task group, i.e., on all tasks within the group at any given time, or according to a task's state or status.
- Users that are not associated to the task but have _following_ or _editing_ permissions will not receive push notifications when messages are sent to the channels within the task group. 
:::

<span className="hero__subtitle"><span className="badge badge--warning">PATCH</span> /tasks/group/&#123;groupId&#125;</span>

#### Endpoint URL {#patch-taskgroup-permissions-url}
`https://www.cotalker.com/api/v1/tasks/group/{groupId}`

#### Path Parameters {#permissions-parameters}
Parameter | Description | Type | Required | Notes
--- | --- | --- | --- | ---
**groupId** | The task group's ID | [ObjectId<COTTaskGroup\>](/docs/documentation/models/tasks/model_taskgroup) | Required |

#### Headers {#permissions-headers}
Header | Description | Required | Values
--- | --- | --- | ---
**Authorization** | Sends your _access token_ to make an API request.<br/>[Click here to see how to obtain an _access token_.](/docs/documentation/api/auth#how-to) | Required | Bearer $ACCESS_TOKEN
**Content-Type** | Sets the body's format. | Required | application/json

#### Request Body {#permissions-body}

Element | Description | Type | Required | Notes
--- | --- | --- | --- | ---
| **taskEditorPermissions** | [Permissions](/docs/documentation/admin/admin_accessrole#default-permissions) that allow unassociated users to edit the tasks in the group. | string[ ] | optional | Users need at least one of the permissions in the array.
| **taskFollowerPermissions** | [Permissions](/docs/documentation/admin/admin_accessrole#default-permissions) that allow unassociated users to view the tasks in the group.  | string[ ] | optional | Users need at least one of the permissions in the array.
| **taskPropertyPermissions** | Enables unassociated users –with the proper [permissions](/docs/documentation/admin/admin_accessrole#default-permissions)– to view or edit tasks when a task within the group is in a certain [state](/docs/documentation/client/basic_concepts#state) or has a specific [status (additional field)](/docs/documentation/admin/workflows/settings_panels/workflow_create_edit#additional-fields). | object[ ] | optional | Add an extra object for each state or status you wish to include as a permission filter.
| **taskPropertyPermissions.property** | Indicates either the [additional field or status](/docs/documentation/admin/workflows/settings_panels/workflow_create_edit#additional-fields) that the task must have or the [state](/docs/documentation/client/basic_concepts#state) the task has to be in to enable unassociated users to view or edit them. | [ObjectId<COTProperty\>](/docs/documentation/models/databases/model_properties) | optional | Available **task statuses** can be found in the task's `status{1,5}` fields as described in the [COTTask](/docs/documentation/models/tasks/model_tasks). <br/>Obtaining **task states'** objectIDs is [described here](/docs/documentation/admin/tips/find_property_objectID).
| **taskPropertyPermissions.editor** | [Permissions](/docs/documentation/admin/admin_accessrole#default-permissions) that allow unassociated users to edit tasks with the previously indicated _status_ or _state_. | string[ ] | optional | Users need at least one of the permissions in the array.
| **taskPropertyPermissions.follower** | [Permissions](/docs/documentation/admin/admin_accessrole#default-permissions) that allow unassociated users to view tasks with the previously indicated _status_ or _state_. | string[ ] | optional | Users need at least one of the permissions in the array.


#### Request Sample {#permissions-sample}

```bash
curl -X PATCH 'https://www.cotalker.com/api/v1/tasks/group/61700090de1525a97d9aeca4' \
--header 'Admin: true' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer $ACCESS_TOKEN' \
--data-raw '{
    "taskEditorPermissions": ["default", "app-access"]
}'
```

#### Response Sample {#permissions-response}
Go to [COTTaskGroup](/docs/documentation/models/tasks/model_taskgroup) for a complete description of the response.
```json {5-12,28-39}
{
    "_id": "61700090de1525a97d9aeca4",
    "isActive": true,
    "readonly": false,
    "taskEditorPermissions": [
        "default",
        "app-access"
    ],
    "taskFollowerPermissions": [
        "permission1",  
        "permission2"
    ],
    "writePermissions": [],
    "readPermissions": [],
    "flowType": "free",
    "hideClosedAfterDays": 7,
    "defaultView": "kanban",
    "levelConfig": [
        20,
        20,
        10
    ],
    "group": "61700082cba758ff69c7afbf",
    "initialStateMachine": null,
    "collectionName": "task_manager_00",
    "company": "611ab7d8df4561626abc90c0",
    "createdAt": "2021-10-20T10:25:53.978Z",
    "taskPropertyPermissions": [
        {
          "property": "6170674bd7b0913204188260",  //  e.g., 'high-priority'
          "editor": ["permission4"],
          "follower": []
        },
        {
          "property": "617068e8532452a7e5432b73",  // e.g.,  'backlog' 
          "editor": [],
          "follower": ["permission5"]
         }
    ],
    "modifiedAt": "2021-10-20T10:50:59.650Z",
    "__v": 1,
    "botUser": "61700126e7ced9cec474f87c",
    "defaultFilter": null
}
```
:::note In the example above:
*  Users with _permission1_ or _permission2_ can FOLLOW all tasks within the group.
*  Users with _default_ or _app-access_ permissions can EDIT all tasks within the group.
*  Users with _permission4_ can EDIT a task when it's in the designated state or status, i.e., "6170674bd7b0913204188260" // e.g.,'high-priority'.
*  Users with _permission5_ can FOLLOW a task when it's in the designated state or status, "617068e8532452a7e5432b73",  // e.g.,  'backlog' 
:::

---


