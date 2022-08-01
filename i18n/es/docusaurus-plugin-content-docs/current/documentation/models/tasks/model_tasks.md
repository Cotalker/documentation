---
title: Tasks Data Model
sidebar_label: COTTask
---

:::caution Advertencia
Esta página aún no se encuentra traducida al español.
:::
import useBaseUrl from '@docusaurus/useBaseUrl';

<span className="hero__subtitle"><em>COTTask</em></span>
<br/>

## Description

Tasks are hosted within [Task Groups (COTTaskGroup)](/docs/documentation/models/tasks/model_taskgroup) and carry out their lifecycle through a [workflow](/docs/documentation/admin/workflows/admin_workflow_overview). The task data model (COTTask) contains a task's settings information.


## JSON Sample

```json
{
    "__v": 9,
    "_id": "617928f1d50f83209fc4c9a2",
    "activeSlas": [
        "61794f9d7e2207607dea305d"  //COTAccessRole
    ],
    "answers": [
        "61792e75437145ca48a1d5cd",  //COTAnswer
        "61792e7c63bf434aabe08105",  //COTAnswer
        "61792e8cc031f322c5090275"  //COTAnswer
    ],
    "asset": "61792ea734f892fa71f1bea3",  //COTProperty
    "assignee": "61792ea18b81afb8b9d02898",  //COTUser
    "channel": "61792eb01011d273cdadd371",  //COTChannel
    "closedAt": null,
    "company": "61792eb79f70471601d5239c",  //COTCompany
    "createdAt": "2021-06-23T18:52:43.650Z",
    "createdBy": "61792ea18b81afb8b9d02898",  //COTUser
    "editors": [
        "61792ea18b81afb8b9d02898",  //COTUser
        "61792eed7e632ed745423227"  //COTUser
    ],
    "endDate": "2021-08-31T04:00:00.000Z",
    "estimatedTime": 5,
    "extensions": {  //Additional fields
        "birthdays_00": {
            "birthdate_00": "2021-10-01T03:00:00.000Z"
        }
    },
    "followers": [
        "61792ef89c0dc2f1f67c8ba6"  //COTUser
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
    "name": "Sales Report",
    "owner": "manual",
    "relativeWeight": 1,
    "serial": 28,
    "smState": "6179356dcb7a69311a26bb80",  //State settings (COTSMState)
    "smStateMachine": "61793577a8d46e736bdcd129",  // Workflow settings (COTSMStateMachine)
    "startDate": "2021-07-01T04:00:00.000Z",
    "status": "6179366b1361882699b18e27",  //Current state (COTProperty)
    "status1": "61793672a2bd931f8838cd5a",  //Additional field nº1 (COTProperty)
    "status2": "61793678aebac07bfb11d587",  //Additional fields nº2 (COTProperty)
    "status3": "6179367ecb7ab1e467fe092f", //Additional field nº3 (COTProperty)
    "status4": null, //Additional field nº4 (COTProperty)
    "status5": null, //Additioanl field nº5 (COTProperty)
    "taskGroup": "6179368883ddbe5b0ac30c2d",  //COTTaskGroup
    "userList": [
        "61792ea18b81afb8b9d02898",  //COTUser
        "61792eed7e632ed745423227",  //COTUser
        "61792ef89c0dc2f1f67c8ba6",  //COTUser
        "617936ae27e055c29d00d823"  //COTUser
    ],
    "visibility": [
        "617936ae27e055c29d00d823"  //COTUser
    ],
    "weight": 0,

}
```

## Fields {#fields}

| Field | Description | [Type](/docs/documentation/models/overview_model#data-types) | Note |
| --- | --- | --- | --- |
| **\_id** | The task's ID. | ObjectId<COTTask\> |
| **activeSlas** | Indicates SLAs that are in course. | [ObjectId<COTSMSla\>[ ]](/docs/documentation/models/tasks/model_sla) |
| **answers** | Array of _answer_ IDs of surveys responded in the task channel workspace. | [ObjectId<COTAnswer\>[ ]](/docs/documentation/models/surveys/model_answers) |
| **asset** | Indicates the _element_ used to classify the task by asset type. | [ObjectId<COTProperty\>](/docs/documentation/models/databases/model_properties/) | 
| **assignee** | Indicates the _user_ assigned responsible for the task. | [ObjectId<COTUser\>](/docs/documentation/models/users/model_users) | Only one _user_ at a time can be designated the _assignee_. By default, the creator is designated as the _assignee_, but later can be changed.
| **channel** | The task's [channel workspace](/docs/documentation/client/channels) | [ObjectId<COTChannel\>](/docs/documentation/models/communication/model_channels) |
| **child** | Array of child tasks. | ObjectId<COTTask\>[ ] | |
| **closedAt** | Indicates the resolution date, i.e., when the task was closed. If not yet closed, the value is `null`. | ISODate | YYYY-MM-DDTHH:mm:ss.SSSZ
| **company** | Indicates the company in which the task is found. | [ObjectId<COTCompany\>](/docs/documentation/models/model_company) |
| **createdAt** | Date the task was created. | ISODate | YYYY-MM-DDTHH:mm:ss.SSSZ
| **createdBy** | The _user_ (human or bot) that created the task. | [ObjectId<COTUser\>](/docs/documentation/models/users/model_users) | By default, the creator is designated as the `assignee`, but can later be changed.
| **editors** | Users tagged as `editors`. Editors can read and write on all task details and participate in the chat area. | [ObjectId<COTUser\>[ ]](/docs/documentation/models/users/model_users) | 
| **endDate** | Indicates the task's deadline. | ISODate | YYYY-MM-DDTHH:mm:ss.SSSZ
| **estimatedTime** | Indicates the estimated number of days to finish the task. | number |
| **extensions** | Displays collections set as additional fields and their values. | object | The difference between the additional fields displayed here and the ones that appear as `task.status{1,5}` is explained in the [administrative panel documentation](/docs/documentation/admin/workflows/settings_panels/workflow_create_edit#workflow-additional-fields).
| **followers** | Users tagged as `followers`. Followers can read task details and participate in the chat area but cannot modify task states or details. | [ObjectId<COTUser\>[ ]](/docs/documentation/models/users/model_users) |
| **image** | Contains URLs to uploaded images used as the task's avatar. | object |
| **image.small** | Small-sized avatar | URL |
| **image.square** | Original-sized, square-shaped avatar | URL |
| **image.original** | Original image used for avatar | URL |
| **indentation** | This number represents the depth of the node. If it is a root node, it's value is 0; a first child is equal to 1; a child of a child has a value of 2. | number |  
| **info** | Additional information field displayed in the task details setting panel. | string |
| **isActive** | Indicates if the task is active or not. | boolean | 
| **modifiedAt** | Indicates when the task settings were last modified. | ISODate | YYYY-MM-DDTHH:mm:ss.SSSZ
| **modifiedStateAt** | Indicates the last state change. | ISODate | YYYY-MM-DDTHH:mm:ss.SSSZ
| **name** | The task's display name. | string |
| **owner** | Free-field-value to store who created the task | string | Default value is `manual`.
| **parent** | Parent task ID | ObjectId<COTTask\> |
| **relativeWeight** | Temporal value used to determine _weight_ in relation to same-level nodes. | number | 
| **resolutionDate** | Indicates when a task entered a closed state. | ISODate | 
| **serial** | The task's _serial number_. Numbers are assigned in sequential order. | number |
| **smState** | Indicates de ID of the current workflow state. | [ObjectId<COTSMState\>](/docs/documentation/models/tasks/model_state) |
| **smStateMachine** | Points to the [workflow settings](/docs/documentation/admin/workflows/settings_panels/workflow_create_edit#layout). | [ObjectId<COTSMStateMachine\>](/docs/documentation/models/tasks/model_statemachine) |
| **startDate** | The date the task begins. | ISODate | YYYY-MM-DDTHH:mm:ss.SSSZ
| **status** | Indicates the ID of the _element_ that represents the current workflow state. | [ObjectId<COTProperty\>](/docs/documentation/models/databases/model_properties) |
| **status1** | Indicates the ID of an _element_ that represents an [additional field](/docs/documentation/admin/workflows/settings_panels/workflow_create_edit#additional-fields) put into the task. | [ObjectId<COTProperty\>](/docs/documentation/models/databases/model_properties) | Additional fields characterize tasks by using them to indicate things like priority, department, or permissions. They can also be used to group, filter, or sort tasks in the task view.
| **status2** | Indicates the ID of an _element_ that represents an [additional field](/docs/documentation/admin/workflows/settings_panels/workflow_create_edit#additional-fields) put into the task. | [ObjectId<COTProperty\>](/docs/documentation/models/databases/model_properties) | Additional fields characterize tasks by using them to indicate things like priority, department, or permissions. They can also be used to group, filter, or sort tasks in the task view.
| **status3** | Indicates the ID of an _element_ that represents an [additional field](/docs/documentation/admin/workflows/settings_panels/workflow_create_edit#additional-fields) put into the task. | [ObjectId<COTProperty\>](/docs/documentation/models/databases/model_properties) | Additional fields characterize tasks by using them to indicate things like priority, department, or permissions. They can also be used to group, filter, or sort tasks in the task view.
| **status4** | Indicates the ID of an _element_ that represents an [additional field](/docs/documentation/admin/workflows/settings_panels/workflow_create_edit#additional-fields) put into the task. | [ObjectId<COTProperty\>](/docs/documentation/models/databases/model_properties) | Additional fields characterize tasks by using them to indicate things like priority, department, or permissions. They can also be used to group, filter, or sort tasks in the task view.
| **status5** | Indicates the ID of an _element_ that represents an [additional field](/docs/documentation/admin/workflows/settings_panels/workflow_create_edit#additional-fields) put into the task. | [ObjectId<COTProperty\>](/docs/documentation/models/databases/model_properties) | Additional fields characterize tasks by using them to indicate things like priority, department, or permissions. They can also be used to group, filter, or sort tasks in the task view.
| **taskGroup** | Indicates the _task group_ the task belongs to. | [ObjectId<COTTaskGroup\>](/docs/documentation/models/tasks/model_taskgroup) |
| **userList** | This is an automatically generated list of all users associated with the task (editor/follower/visibility/assignee). | [ObjectId<COTUser\>[ ]](/docs/documentation/models/users/model_users) | This list is READ ONLY and cannot be manually modified.
| **visibility** | Users with the `visibility` tag can view limited task details. They can participate in the chat area and view _notes_, but they cannot change the task's state. | [ObjectId<COTUser\>[ ]](/docs/documentation/models/users/model_users) | 
| **weight** | Indicates the task's place within the group panel. | number |

## Deprecated {#deprecated}

| Field | Description | [Type](/docs/documentation/models/overview_model#data-types) | Note |
| --- | --- | --- | --- |
| **channelType** | Refers to the [relationship](/docs/documentation/admin/tips/chat_channels_workflows) task's and their channels.<br/>Enum: ["bound", "unbound", "unbound-hierarchy"]<br/>SHOULD ALWAYS BE ON `BOUND`. | string[ ] | DEPRECATED 
| **color** | Changes color.<br/>Enum: ["none", "red", "blue", "green", "yellow"] | string | DEPRECATED
| **formMessage** | | string[ ] | DEPRECATED
| **insertAtEnd** | | boolean |
| **isValid** | | boolean |
| **projectCode** | Indicates the project a task belongs to. A project contains the shared data between parent and children tasks. Superseded by `parent`. | ObjectId<COTTaskProject\> | DEPRECATED
| **public** | | object | DEPRECATED
| **public.isActive** | | boolean | DEPRECATED
| **public.language** | Indicates the company language.<br/>Enum: ["spanish", "english"] | string | DEPRECATED
| **public.response** | | string | DEPRECATED
| **public.title** | | string | DEPRECATED
| **representation** | | object | DEPRECATED
| **representation.status** | | string | DEPRECATED
| **survey** | | ObjectId | DEPRECATED
| **validators** | | ObjectId[ ] | DEPRECATED

## Additional Resources {#resources}

- [Task Basics](/docs/documentation/client/basic_concepts#tasks): basic description about tasks and links to more information
- ["Tasks" REST API documentation](/docs/documentation/api/tasks/): basic "Task" API requests
- [API documentation in Swagger](https://www.cotalker.com/swagger/core/?key=woubtjf4olr0t4zgutuwn6scbcm6hd3qh1cgl5obmohpbm3mfublnwcvv67lodgjvd3h86s9ppshtvmf95gepsqh6nizq9liu7f): complete with data models (schemas)
- [COTLang](/docs/documentation/automation/cotlang/admin_cotlang): use COTLang for extracting data from models in routines
- [Triggers and Contexts](/docs/documentation/automation/cotlang/triggers_and_contexts): more information on using data models within routines

## Help {#help}

- [Cotalker Platform Community](https://github.com/Cotalker/documentation/discussions): post your questions or search for previous answers given in the forum
