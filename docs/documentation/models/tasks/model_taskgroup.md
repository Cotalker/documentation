---
title: Task Group Data Model
sidebar_label: COTTaskGroup
---
import useBaseUrl from '@docusaurus/useBaseUrl'; 
import Highlight from '@theme/Highlight';

<span className="hero__subtitle"><em>COTTaskGroup</em></span>
<br/>
<br/>

## Description
A _task group_ stores a [workflow group's configuration](/docs/documentation/admin/workflows/settings_panels/workflows-setup#configuration) and contains the tasks that are processed through the workflow group.

## JSON Sample {#json-sample}

```json
{
    "_id" : "616eafbda973cd46d72fb841",
    "botUser" : "616eafc8c5b117753c1ae35c",
    "collectionName" : "projects",
    "company" : "613eafd572343ecb53cc8ccc",
    "createdAt" : "2021-10-18T21:53:27.028Z",
    "defaultView" : "kanban",
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

## Fields {#fields}

| Field | Description | [Type](/docs/documentation/models/overview_model#data-types) | Note |
| --- | --- | --- | --- |
| **\_id** | The task group's identification code | ObjectId | For internal use only. Do not modify.
| **botUser** | Code name of automatically-created bot associated with the workflow group. | [ObjectId<COTUser\>](/docs/documentation/models/users/model_users) | For internal use only. Do not modify.
| **collectionName** | The workflow group's _code_ name: [`groups.nameCode`](/docs/documentation/models/communication/model_groups) | string | For internal use only. Do not modify. |
| **company** | The _company_ the task is found in | [ObjectId<COTCompany\>](/docs/documentation/models/company/model_company) | For internal use only. Do not modify.
| **createdAt** | Date and time the group was created | ISODate | YYYY-MM-DDTHH:mm:ss.SSSZ
| **defaultFilter** | [Filter](/docs/documentation/client/tasks/filter_tasks) used to sort tasks in the task view. | ObjectId | 
| **defaultView** | Indicates the default view in the [_task view_](/docs/documentation/client/tasks/taskview) section. | string | Options: `list`, `kanban`, `calendar`, `gantt`, `grid`
| **flowType** | Determines how tasks transition from one state to another.  | string | `state-machine`: state transitions must be predetermined in the setup. <br/>`free`: freely change from one state to another.
| **group** | Indicates the workflow group associated with the task group. | [ObjectId<COTGroup\>](/docs/documentation/models/communication/model_groups) | For internal use only. Do not modify.
| **hideClosedAfterDays** | Closed tasks will disappear from the _task view_ after the amount of days indicated. | number |
| **initialStateMachine** | Indicates which workflow the group initiates in. | [ObjectID<COTSMStateMachine\>](/docs/documentation/models/tasks/model_statemachine) | 
| **isActive** | Indicates whether the task group is active or not. | boolean |
| **levelConfig** | Used to configure the amount of sub-tasks per levels that are permitted. A maximum of 50 bits can be distributed in up to 5 levels. <br/>Example: `[20, 20, 10]`, i.e., 2<sup>20</sup> on the first level, 2<sup>20</sup> on the second, and 2<sup>10</sup> on the third and last level. | number[ ] | Must be configured before any tasks exist, cannot be modified afterwards.
| **modifiedAt** | Indicates date and time of last modification. | ISODate | YYYY-MM-DDTHH:mm:ss.SSSZ
| **readPermissions** | [Permissions](/docs/documentation/admin/admin_accessrole#default-permissions) that allow users associated to the task to view task information settings. | string[ ] | Users need at least one of the permissions in the array.
| **taskEditorPermissions** | [Permissions](/docs/documentation/admin/admin_accessrole#default-permissions) that allow unassociated users to edit the tasks in the group. | string[ ] | Users need at least one of the permissions in the array.
| **taskFollowerPermissions** | [Permissions](/docs/documentation/admin/admin_accessrole#default-permissions) that allow unassociated users to view the tasks in the group.  | string[ ] | Users need at least one of the permissions in the array.
| **taskPropertyPermissions** | Enables unassociated users –with the proper [permissions](/docs/documentation/admin/admin_accessrole#default-permissions)– to view or edit tasks when a task within the group is in a certain [state](/docs/documentation/client/basic_concepts#state) or has a specific [status (additional field)](/docs/documentation/admin/workflows/settings_panels/workflow_create_edit#additional-fields). | object[ ] | Each object represents a state or status used as a permission filter.
| **taskPropertyPermissions.property** | Indicates either the [additional field or status](/docs/documentation/admin/workflows/settings_panels/workflow_create_edit#additional-fields) that the task must have or the [state](/docs/documentation/client/basic_concepts#state) the task has to be in to enable unassociated users to view or edit them. | [ObjectId<COTProperty\>](/docs/documentation/models/databases/model_properties) | Available **task statuses** can be found in the task's `status{1,5}` fields as described in the [COTTask](/docs/documentation/models/tasks/model_tasks). <br/>Obtaining **task states'** objectIDs is [described here](/docs/documentation/admin/tips/find_property_objectID).
| **taskPropertyPermissions.editor** | [Permissions](/docs/documentation/admin/admin_accessrole#default-permissions) that allow unassociated users to edit tasks with the previously indicated _status_ or _state_. | string[ ] | Users need at least one of the permissions in the array.
| **taskPropertyPermissions.follower** | [Permissions](/docs/documentation/admin/admin_accessrole#default-permissions) that allow unassociated users to view tasks with the previously indicated _status_ or _state_. | string[ ] | Users need at least one of the permissions in the array.
| **writePermissions** | [Permissions](/docs/documentation/admin/admin_accessrole#default-permissions) that allow users associated to the task to edit task settings. | string[ ] | Users need at least one of the permissions in the array.


## Deprecated {#deprecated}

| Field | Description | [Type](/docs/documentation/models/overview_model#data-types) | Note |
| --- | --- | --- | --- |
| readonly | | boolean | 

## Additional Resources {#resources}

- [Task Basics](/docs/documentation/client/basic_concepts#tasks): basic description about tasks and links to more information
- ["Tasks" REST API documentation](/docs/documentation/api/tasks/): basic "Task" API requests
- [API documentation in Swagger](https://www.cotalker.com/swagger/core/?key=woubtjf4olr0t4zgutuwn6scbcm6hd3qh1cgl5obmohpbm3mfublnwcvv67lodgjvd3h86s9ppshtvmf95gepsqh6nizq9liu7f): complete with data models (schemas)
- [COTLang](/docs/documentation/automation/cotlang/admin_cotlang): use COTLang for extracting data from models in routines
- [Triggers and Contexts](/docs/documentation/automation/cotlang/triggers_and_contexts): more information on using data models within routines

## Help {#help}

- [Cotalker Platform Community](https://github.com/Cotalker/documentation/discussions): post your questions or search for previous answers given in the forum