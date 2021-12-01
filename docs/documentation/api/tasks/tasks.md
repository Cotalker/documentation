---
title: Tasks
sidebar_label: Tasks
---
import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


## Overview {#overview}
A [_task_](/docs/documentation/client/basic_concepts#tasks) is the representation of an asset and its state. In other words, a task is created within a workflow group and can follow a workflow process, passing from one state to another.

A _Task group_ contains the tasks that are processed through a specific _workflow group_. _Task group_ and _workflow group_ are sometimes used synomously. Users can access _task groups_ through the [_group panel_](/docs/documentation/client/groups#group-panel).

A _task group model_ ([COTTaskGroup](/docs/documentation/models/tasks/model_taskgroup)) contains a workflow group's configuration.

---

## Get Task Groups {#list-task-groups}
_Lists the tasks groups in the company._

<span className="hero__subtitle"><span className="badge badge--success">GET</span> /tasks/group/</span>

#### Endpoint URL {#get-taskgroups-url}
`https://www.cotalker.com/api/v1/tasks/group`

#### Query Parameters {#get-task-groups-parameters}
Parameter | Description | Type | Required | Notes
--- | --- | --- | --- | ---
**limit** | | number | Optional | By default, the _limit_ is set to 10.
**page** | | number | Optional | 
**count** | | boolean | Optional | 
**orderBy** | | string | Optional | Options: `asc`, `desc`
**sortBy** | | string | Optional | Options: <br/>`createdAt`, `modifiedAt`, `collectionName`
**isActive** | | string | Optional | `all`, `true`, `false`
**debug** | | string | Optional | Option: `true`

#### Headers {#get-task-groups-headers}
Header | Description | Required | Values
--- | --- | --- | ---
**Authorization** | Sends your _access token_ to make an API request.<br/>[Click here to see how to obtain an _access token_.](/docs/documentation/api/auth#how-to) | Required | Bearer $ACCESS_TOKEN
**Admin** | Grants administrative access to view _tasks_. | Required | true


#### Request Sample {#get-task-groups-sample}
```bash
curl --location --request GET 'https://www.cotalker.com/api/v1/tasks/group' \
--header 'Admin: true' \
--header 'Authorization: Bearer $ACCESS_TOKEN'
```

#### Response Sample {#get-task-groups-response}
Responses follow the [**COTTaskGroup**](/docs/documentation/models/tasks/model_taskgroup) data model.

---

<span className="hero__subtitle">⚠️ The following feature is still in BETA stage.</span>

## Get Tasks for User within Task Group
`GET /v1/tasks/{groupId}/task`

## Get All Tasks within Task Group
`POST /v1/tasks/{groupId}/task/all`

## Get Specific Task
`GET /v1/tasks/{groupId}/task/{taskId}`

## Create Task
`POST /v1/tasks/{groupId}/task/create`

## Get SLA
`GET /v1/tasks/{groupId}/sla/{slaId}`
**Note** Requires `slaId`. There's no way of getting all SLAs.

## Get All State Machines within Group
`GET /v1/tasks/{groupId}/sm/smstatemachine`

## Get All States within Group
`GET /v1/tasks/{groupId}/sm/smstate`

## Get All States within Company
`GET /v1/tasks/{groupId}/sm/smstate/all`

## Edit Task Group
`PATCH /v1/tasks/{groupId}`

## Task Permissions for Unassociated Users {#patch-taskgroup-permissions}
_Users can be given permission to follow or edit the tasks within a group without being associated to any of them._

:::note
- Permissions can be given, either globally by task group, i.e., on all tasks within the group at any given time, or according to a task's state or status.
- Users that are not associated to the task but have _following_ or _editing_ permissions will not recieve push notifications when messages are sent to the channels within the task group. 
:::

<span className="hero__subtitle"><span className="badge badge--warning">PATCH</span> /tasks/group/&#123;id&#125;</span>

#### Endpoint URL {#patch-taskgroup-permissions-url}
`https://www.cotalker.com/api/v1/tasks/{groupId}`

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

Go to [**COTTaskGroup**](/docs/documentation/models/tasks/model_taskgroup) for a complete description of the response data model.


---

