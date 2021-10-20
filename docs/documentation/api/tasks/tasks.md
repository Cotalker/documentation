---
title: Tasks
sidebar_label: Tasks
---
import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::tip Swagger
Go to our Swagger page for complete [API and model specifications](https://www.cotalker.com/swagger/core/?key=woubtjf4olr0t4zgutuwn6scbcm6hd3qh1cgl5obmohpbm3mfublnwcvv67lodgjvd3h86s9ppshtvmf95gepsqh6nizq9liu7f).
:::

## Overview {#overview}
A [_task_](/docs/documentation/client/basic_concepts#tasks) is the representation of an asset and its state. In other words, a task is created within a workflow group and can follow a workflow process, passing from one state to another.

A _Task group_ contains the tasks that are processed through a specific _workflow group_. _Task group_ and _workflow group_ are sometimes used synomously. Users can access _task groups_ through the [_group panel_](/docs/documentation/client/groups#group-panel).

A _task group model_ ([COTTaskGroup](/docs/documentation/models/tasks/model_taskgroup)) contains a workflow group's configuration.

---

## List Task Groups {#list-task-groups}
_Lists the tasks groups in the company._

<span className="hero__subtitle"><span className="badge badge--success">GET</span> /tasks/group/</span>

#### Query Parameters: {#get-task-groups-parameters}

Parameter | Description | Type | Required | Notes
--- | --- | --- | --- | ---
Limit | | number | Optional | 
page | | number | Optional | 
count | | boolean | Optional | 
orderBy | | string | Optional | Options: `asc`, `desc`
sortBy | | string | Optional | Options: <br/>`createdAt`, `modifiedAt`, `collectionName`
isActive | | string | Optional | `all`, `true`, `false`
debug | | string | Optional | Option: `true`

#### Headers: {#get-task-groups-headers}

Header Name | Description | Required | Values
--- | --- | --- | --- 
Admin | User has admin privledges | Required | true | 
Authorization | Access-Token | Required | Bearer [{ACCESS-TOKEN}](/docs/documentation/api/auth)

#### Sample: {#get-task-groups-sample}

```bash
curl --location --request GET 'https://www.cotalker.com/api/v2/tasks/group' \
--header 'Admin: true' \
--header 'Authorization: Bearer {ACCESS-TOKEN}'
```

#### Response: {#get-task-groups-response}

[**COTTaskGroup**](/docs/documentation/models/tasks/model_taskgroup): Response sample and complete description of data model.

---

<span className="hero__subtitle">⚠️ The following feature is still in BETA stage.</span>

## Task Permissions for Unassociated Users
_Users can be given permission to follow or edit the tasks within a group without being associated to any of them._

:::note
- Permissions can be given, either globally by task group, i.e., on all tasks within the group at any given time, or according to a task's state or status.
- Users that are not associated to the task but have _following_ or _editing_ permissions will not recieve push notifications when messages are sent to the channels within the task group. 
:::

<span className="hero__subtitle"><span className="badge badge--warning">PATCH</span> /tasks/group/&#123;ObjectId&lt;COTTaskGroup&gt;&#125;</span>

#### Path Parameters: {#permissions-parameters}

Parameter | Description | Type | Required | Notes
--- | --- | --- | --- | ---
ObjectId<COTTaskGroup\> | The task group's ID | ObjectId | Required | [Task Group Data Model (COTTaskGroup)](/docs/documentation/models/tasks/model_taskgroup)


#### Headers: {#permissions-headers}

Header Name | Description | Required | Values
--- | --- | --- | --- 
Admin | User has admin privledges | Required | true | 
Authorization | Access-Token | Required | Bearer [{ACCESS-TOKEN}](/docs/documentation/api/auth)

#### Request Body: {#body}

Element | Description | Type | Required | Notes
--- | --- | --- | --- | ---
taskPropertyPermissions | Enables unassociated users to view or edit tasks when a task within the group is in a certain [state or status](/docs/documentation/client/basic_concepts#state), granted they have the proper [permissions](/docs/documentation/admin/admin_accessrole#default-permissions). | object[ ] | Optional |
taskPropertyPermissions.property | Indicates the task state or status in which permitted unassociated users are enabled to view or edit tasks within the group. | [ObjectId<COTProperty\>](/docs/documentation/models/databases/model_properties) | Optional | Availible task statuses to choose from can be found in the task's `status{1,5}` fields as described in the [COTTask](/docs/documentation/models/tasks/model_tasks) data model.
taskPropertyPermissions.editor | [Permissions](/docs/documentation/admin/admin_accessrole#default-permissions) that allow unassociated users to edit the task during the indicated state or status. | string[ ] | Optional | Users need at least one of the permissions in the array.
taskPropertyPermissions.follower | [Permissions](/docs/documentation/admin/admin_accessrole#default-permissions) that allow unassociated users to view the task during the indicated state or status. | string[ ] | Optional | Users need at least one of the permissions in the array.


#### Request Sample: {#permissions-sample}

<Tabs defaultValue="curl" values={[ {label: 'Shell', value: 'curl'}, {label: 'Typescript', value: 'typescript'} ]}>
<TabItem value="curl">

```bash
curl -XPATCH https://www.cotalker.com/api/v3/tasks/group/61700090de1525a97d9aeca4 -H "Authorization: Bearer {ACCESS-TOKEN}" -H "Content-Type: application/json"  -d ' { "taskEditorPermissions": ["default", "app-access"]} '  
```

</TabItem>
<TabItem value="typescript">

```typescript
// SETUP
// *  Users with permission1 or permission2 can FOLLOW all tasks within the group
// *  Users with permission3 can EDIT all tasks within the group
// *  Users with permission4 can EDIT a task when it's in the designated state or status, e.g.,'high-priority'
// *  Users with permission5 can FOLLOW a task when it's in the designated state or status, e.g., 'backlog' 

taskGroup.taskFollowerPermissions = [permission1, permission2];
taskGroup.taskEditorPermissions =  [permission3]
taskGroup.taskPropertyPermissions = [{
 property: '6170674bd7b0913204188260' , //  e.g., 'high-priority'
 editor: [permission4],
 follower: []
},{
 property: '617068e8532452a7e5432b73', // e.g.,  'backlog' 
 editor: [],
 follower: [permission5]
}]

``` 

</TabItem>
</Tabs>



#### Response Sample: {#permissions-response}
[**COTTaskGroup**](/docs/documentation/models/tasks/model_taskgroup): Complete description of the response data model.  
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
          "property": "6170674bd7b0913204188260",
          "editor": ["permission4"],
          "follower": []
        },
        {
          "property": "617068e8532452a7e5432b73",
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



---

