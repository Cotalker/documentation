---
title: State Machines
sidebar_label: State Machines
---
import useBaseUrl from '@docusaurus/useBaseUrl';


## Overview {#overview}
[_State machines_, also known as _workflows_](/docs/documentation/admin/workflows/admin_workflow_overview), are definitions of how tasks behave. They define the initial state, what state they can change to, what triggers are executed, send reminders, and more.

:::tip additional resources
These are just some of the most basic API requests. For a complete list of endpoints, consult our [API documentation on Swagger](https://www.cotalker.com/swagger/core/?key=woubtjf4olr0t4zgutuwn6scbcm6hd3qh1cgl5obmohpbm3mfublnwcvv67lodgjvd3h86s9ppshtvmf95gepsqh6nizq9liu7f#/).
:::

## Get All State Machines within Group {#get-all-sm}
_Returns all state machines that exist within the specified task group._

<span className="hero__subtitle"><span className="badge badge--success">GET</span> /tasks/&#123;groupId&#125;/sm/smstatemachine</span>

#### Endpoint URL {#get-task-groups-url}
`https://www.cotalker.com/api/v1/tasks/{groupId}/sm/smstatemachine`

#### Path Parameters {#get-taskgroup-by-id-path}
Parameter | Description | Type | Required | Notes
--- | --- | --- | --- | ---
**groupId** | The ObjectId of the _task group_ that is to be searched through. | [ObjectId<COTTaskGroup\>](/docs/documentation/models/tasks/model_taskgroup) | Required |

#### Headers {#get-task-groups-headers}
Header | Description | Required | Values
--- | --- | --- | ---
**Authorization** | Sends your _access token_ to make an API request.<br/>[Click here to see how to obtain an _access token_.](/docs/documentation/api/auth#how-to) | Required | Bearer $ACCESS_TOKEN

#### Request Sample {#get-task-groups-sample}
```bash
curl --location --request GET 'https://www.cotalker.com/api/v1/tasks/616eafbda973cd46d72fb841/sm/smstatemachine' \
--header 'Authorization: Bearer $ACCESS_TOKEN'
```

#### Response Sample {#get-task-groups-response}
Responses follow the [**COTSMStateMachine**](/docs/documentation/models/tasks/model_statemachine) data model.

---

## Get State Machine by Id {#get-statemachine-id}
_Returns the state machine indicated by its Id._

<span className="hero__subtitle"><span className="badge badge--success">GET</span> /tasks/&#123;groupId&#125;/sm/smstatemachine/&#123;stateMachineId&#125;</span>

#### Endpoint URL {#get-tstatemachine-url}
`https://www.coltaker.com/api/v1/tasks/{groupId}/sm/smstatemachine/{stateMachineId}`

#### Path Parameters {#get-statemachine-path}
Parameter | Description | Type | Required | Notes
--- | --- | --- | --- | ---
**groupId** | The ObjectId of the _task group_ that is to be searched through. | [ObjectId<COTTaskGroup\>](/docs/documentation/models/tasks/model_taskgroup) | Required |
**stateMachineId** | The ObjectId of the state machine that is to be returned. | [ObjectId<COTSMStateMachine\>](/docs/documentation/models/tasks/model_statemachine)

#### Headers {#get-statemachine-headers}
Header | Description | Required | Values
--- | --- | --- | ---
**Authorization** | Sends your _access token_ to make an API request.<br/>[Click here to see how to obtain an _access token_.](/docs/documentation/api/auth#how-to) | Required | Bearer $ACCESS_TOKEN

#### Request Sample {#get-statemachine-request}
```bash
curl --location --request GET 'https://www.cotalker.com/api/v1/tasks/616eafbda973cd46d72fb841/sm/smstatemachine/616eafbda973cd46d72fb841' \
--header 'Authorization: Bearer $ACCESS_TOKEN'
```

#### Response Sample {#get-statemachine-response}
The response follows the [COTSMStateMachine](/docs/documentation/models/tasks/model_statemachine) data model.

---


## Create New State Machine {#post-statemachine}
_Create a new state machine within a task group._

<span className="hero__subtitle"><span className="badge badge--info">POST</span> /tasks/&#123;groupId&#125;/sm/smstatemachine</span>

#### Endpoint URL {#create-statemachine-url}
`https://www.coltaker.com/api/v1/tasks/{groupId}/sm/smstatemachine`

#### Path Parameters {#create-statemachine-path}
Parameter | Description | Type | Required | Notes
--- | --- | --- | --- | ---
**groupId** | The ObjectId of the _task group_ where the state machine is to be created. | [ObjectId<COTTaskGroup\>](/docs/documentation/models/tasks/model_taskgroup) | Required |

#### Headers {#create-statemachine-headers}
Header | Description | Required | Values
--- | --- | --- | ---
**Authorization** | Sends your _access token_ to make an API request.<br/>[Click here to see how to obtain an _access token_.](/docs/documentation/api/auth#how-to) | Required | Bearer $ACCESS_TOKEN
**Content-Type** | Indicates the body's format. | Required | application/json

#### Request Body {#create-statemachine-body}
_Only required fields are listed below. For a complete schema description, please go to the [COTSMStateMachine data model](/docs/documentation/models/tasks/model_statemachine). Unrequired fields that are not submitted are either filled in automatically or left blank._

Element | Description | Type | Required | Notes
--- | --- | --- | --- | ---
| **asset** | Indicates the asset the task represents through a property and its property type. | object | Required |
| **asset.property** | The asset's property (element) ID. | [ObjectId<COTProperty\> ](/docs/documentation/models/databases/model_properties) | Required | 
| **asset.propertyType** | The asset's property type (collection) ID. | [ObjectId<COTPropertyType\>](/docs/documentation/models/databases/model_propertytypes) | Required | 
| **asset.type** | Use the `generic` type for tasks that need to be repeated. Use `unique` for one-time tasks. | string | Required | Enum: [ "generic", "unique" ]
| **code** | The state machine's unique identification name. | string | Required | Maximum 60 characters; only lowercase letters, numbers, and underscore allowed; must be unique.
| **name** | The workflow's display name | string | Required | 
| **propertyType** | Indicates the _collection (property type)_ that contains the _elements_ that represent the [workflow's states](/docs/documentation/admin/workflows/settings_panels/create_edit_state). | [ObjectId<COTPropertyType\>](/docs/documentation/models/databases/model_propertytypes) | Required | 


#### Request Sample {#create-statemachine-request}
```bash
curl --location --request POST 'https://www.cotalker.com/api/v1/tasks/6179f1b04f04ff1c7f7cf01a/sm/smstatemachine' \
--header 'Authorization: Bearer $ACCESS_TOKEN' \
--header 'Content-Type: application/json' \
--data-raw '{
    "propertyType": "6179f1cb4f1389218162fe05",
    "asset": {
        "type": "generic",
        "propertyType": "6179f1d155753e932b4cb08c",
        "property": "6179f1d8a1d9328faf5e2855"
    },
    "code": "work_order_00",
    "name": "Work Order"
 }'
```

#### Response Sample {#create-statemachine-response}
Go to [COTSMStateMachine](/docs/documentation/models/tasks/model_statemachine) for a complete description of the response.
```json {16-23}
{
    "hooks": {
        "onCreate": []
    },
    "requiredSurvey": {
        "permissions": [],
        "parametrizedBot": []
    },
    "dynamicPropertyTypes": {
        "isActive": []
    },
    "isActive": true,
    "taskChannelType": "unbound-hierarchy",
    "allowedExtensions": [],
    "_id": "61aa141d45ac56f638e4c75f",
    "propertyType": "6179f1cb4f1389218162fe05",
    "asset": {
        "type": "generic",
        "propertyType": "6179f1d155753e932b4cb08c",
        "property": "6179f1d8a1d9328faf5e2855"
    },
    "code": "work_order_00",
    "name": "Work Order",
    "company": "6179f1ee6ec8b62d2406ec46",
    "taskGroup": "6179f1b04f04ff1c7f7cf01a",
    "createdAt": "2021-12-03T12:47:05.723Z",
    "__v": 0
}
```

---

## Update State Machine {#patch-statemachine}
_Updates or edits the indicated state machine._

<span className="hero__subtitle"><span className="badge badge--warning">PATCH</span> /tasks/&#123;groupId&#125;/sm/smstatemachine/&#123;stateMachineId&#125;</span>

#### Endpoint URL {#patch-statemachine-url}
`https://www.cotalker.com/api/v1/tasks/{groupId}/sm/smstatemachine/{stateMachineId}`

#### Path Parameters {#statemachine-parameters}
Parameter | Description | Type | Required | Notes
--- | --- | --- | --- | ---
**groupId** | The ObjectId of the _task group_ that is to be searched through. | [ObjectId<COTTaskGroup\>](/docs/documentation/models/tasks/model_taskgroup) | Required |
**stateMachineId** | The ObjectId of the _state machine_ that is to be updated. | [ObjectId<COTSMStateMachine\>](/docs/documentation/models/tasks/model_statemachine) | Required |

#### Headers {#statemachine-headers}
Header | Description | Required | Values
--- | --- | --- | ---
**Authorization** | Sends your _access token_ to make an API request.<br/>[Click here to see how to obtain an _access token_.](/docs/documentation/api/auth#how-to) | Required | Bearer $ACCESS_TOKEN
**Content-Type** | Sets the body's format. | Required | application/json

#### Request Body {#statemachine-body}
_Only the fields that are being updated or added are required to be put into the body. For a complete schema description, please go to the [COTSMStateMachine data model](/docs/documentation/models/tasks/model_statemachine)._


#### Request Sample {#statemachine-sample}

```bash
curl --location --request PATCH 'https://www.cotalker.com/api/v1/tasks/6179f1b04f04ff1c7f7cf01a/sm/smstatemachine/61aa141d45ac56f638e4c75f' \
--header 'Authorization: Bearer $ACCESS_TOKEN' \
--header 'Content-Type: application/json' \
--data-raw '{
    "dynamicPropertyTypes": {
        "status1": "61aa196190615805ca094a6d",
        "status2": "61aa1969db7d9fbf9992f460",
        "status3": "61aa197138404ad7fd09a218",
        "status4": null,
        "status5": null,
        "isActive": [
            "status1",
            "status2",
            "status3"
        ]
    }
}'
```

#### Response Sample {#statemachine-response}
Go to [COTSMStateMachine](/docs/documentation/models/tasks/model_statemachine) for a complete description of the response.
```json {14-25}
{
    "hooks": {
        "onCreate": []
    },
    "requiredSurvey": {
        "permissions": [],
        "parametrizedBot": []
    },
    "asset": {
        "type": "generic",
        "propertyType": "6179f1d155753e932b4cb08c",
        "property": "6179f1d8a1d9328faf5e2855"
    },
    "dynamicPropertyTypes": {
        "status1": "61aa196190615805ca094a6d",
        "status2": "61aa1969db7d9fbf9992f460",
        "status3": "61aa197138404ad7fd09a218",
        "status4": null,
        "status5": null,
        "isActive": [
            "status1",
            "status2",
            "status3"
        ]
    },
    "isActive": true,
    "taskChannelType": "unbound-hierarchy",
    "allowedExtensions": [],
    "_id": "61aa141d45ac56f638e4c75f",
    "propertyType": "6179f1cb4f1389218162fe05",
    "code": "work_order_00",
    "name": "Work Order",
    "company": "6179f1ee6ec8b62d2406ec46",
    "taskGroup": "6179f1b04f04ff1c7f7cf01a",
    "createdAt": "2021-12-03T12:47:05.723Z",
    "__v": 0
}
```

---


## Get All States within Group {#get-states}
_Returns all the states that exist within the group._

<span className="hero__subtitle"><span className="badge badge--success">GET</span> /tasks/&#123;groupId&#125;/sm/smstate</span>

#### Endpoint URL {#get-states-url}
`https://www.cotalker.com/api/v1/tasks/{groupId}/sm/smstate`

#### Path Parameters {#get-states-path}
Parameter | Description | Type | Required | Notes
--- | --- | --- | --- | ---
**groupId** | The ObjectId of the _task group_ that is to be searched through. | [ObjectId<COTTaskGroup\>](/docs/documentation/models/tasks/model_taskgroup) | Required |

#### Headers {#get-states-headers}
Header | Description | Required | Values
--- | --- | --- | ---
**Authorization** | Sends your _access token_ to make an API request.<br/>[Click here to see how to obtain an _access token_.](/docs/documentation/api/auth#how-to) | Required | Bearer $ACCESS_TOKEN

#### Request Sample {#get-tstates-sample}
```bash
curl --location --request GET 'https://www.cotalker.com/api/v1/tasks/616eafbda973cd46d72fb841/sm/smstate' \
--header 'Authorization: Bearer $ACCESS_TOKEN'
```

#### Response Sample {#get-states-response}
Responses follow the [**COTSMState**](/docs/documentation/models/tasks/model_state) data model.

---

## Get All States (extended data) {#get-states-all}
_Returns all the states the exist within the group with more fields and extended data._

<span className="hero__subtitle"><span className="badge badge--success">GET</span> /tasks/&#123;groupId&#125;/sm/smstate/all</span>

#### Endpoint URL {#get-states-all-url}
`https://www.cotalker.com/api/v1/tasks/{groupId}/sm/smstate/all`

#### Path Parameters {#get-states-all-path}
Parameter | Description | Type | Required | Notes
--- | --- | --- | --- | ---
**groupId** | The ObjectId of the _task group_ that is to be searched through. | [ObjectId<COTTaskGroup\>](/docs/documentation/models/tasks/model_taskgroup) | Required |

#### Headers {#get-states-all-headers}
Header | Description | Required | Values
--- | --- | --- | ---
**Authorization** | Sends your _access token_ to make an API request.<br/>[Click here to see how to obtain an _access token_.](/docs/documentation/api/auth#how-to) | Required | Bearer $ACCESS_TOKEN

#### Request Sample {#get-states-all-sample}
```bash
curl --location --request GET 'https://www.cotalker.com/api/v1/tasks/616eafbda973cd46d72fb841/sm/smstate/all' \
--header 'Authorization: Bearer $ACCESS_TOKEN'
```

#### Response Sample {#get-states-all-response}
Responses follow the [**COTSMState**](/docs/documentation/models/tasks/model_state) data model.

---

## Get State Machine by Id {#get-stateid}
_Returns the state indicated by its Id._

<span className="hero__subtitle"><span className="badge badge--success">GET</span> /tasks/&#123;groupId&#125;/sm/smstate/&#123;stateId&#125;</span>

#### Endpoint URL {#get-stateid-url}
`https://www.coltaker.com/api/v1/tasks/{groupId}/sm/smstate/{stateId}`

#### Path Parameters {#get-stateid-path}
Parameter | Description | Type | Required | Notes
--- | --- | --- | --- | ---
**groupId** | The ObjectId of the _task group_ that is to be searched through. | [ObjectId<COTTaskGroup\>](/docs/documentation/models/tasks/model_taskgroup) | Required |
**stateMachineId** | The ObjectId of the state machine that is to be returned. | [ObjectId<COTSMState\>](/docs/documentation/models/tasks/model_state)

#### Headers {#get-stateid-headers}
Header | Description | Required | Values
--- | --- | --- | ---
**Authorization** | Sends your _access token_ to make an API request.<br/>[Click here to see how to obtain an _access token_.](/docs/documentation/api/auth#how-to) | Required | Bearer $ACCESS_TOKEN

#### Request Sample {#get-stateid-request}
```bash
curl --location --request GET 'https://www.cotalker.com/api/v1/tasks/6179f1b04f04ff1c7f7cf01a/sm/smstate/61aa3f81442b6a4e3a1f7def' \
--header 'Authorization: Bearer $ACCESS_TOKEN'
```

#### Response Sample {#get-stateid-response}
The response follows the [COTSMState](/docs/documentation/models/tasks/model_state) data model.

---

## Create New State {#post-state}
_Create a new state within a state machine._

<span className="hero__subtitle"><span className="badge badge--info">POST</span> /tasks/&#123;groupId&#125;/sm/smstate</span>

#### Endpoint URL {#create-state-url}
`https://www.coltaker.com/api/v1/tasks/{groupId}/sm/smstate`

#### Path Parameters {#create-state-path}
Parameter | Description | Type | Required | Notes
--- | --- | --- | --- | ---
**groupId** | The ObjectId of the _task group_ where the state is to be created. | [ObjectId<COTTaskGroup\>](/docs/documentation/models/tasks/model_taskgroup) | Required |

#### Headers {#create-state-headers}
Header | Description | Required | Values
--- | --- | --- | ---
**Authorization** | Sends your _access token_ to make an API request.<br/>[Click here to see how to obtain an _access token_.](/docs/documentation/api/auth#how-to) | Required | Bearer $ACCESS_TOKEN
**Content-Type** | Indicates the body's format. | Required | application/json

#### Request Body {#create-state-body}
_Only required fields are listed below. For a complete schema description, please go to the [COTSMState data model](/docs/documentation/models/tasks/model_state). Unrequired fields that are not submitted are either filled in automatically or left blank._

Element | Description | Type | Required | Notes
--- | --- | --- | --- | ---
| **property** | The state's _property_ or _element_ ID. | [ObjectId<COTProperty\>](/docs/documentation/models/databases/model_properties) | Required |
| **stateMachine** | The _state machine_ or _workflow_ the state belongs to. | [ObjectId<COTSMStateMachine\>](/docs/documentation/models/tasks/model_statemachine) | Required |


#### Request Sample {#create-state-request}
```bash
curl --location --request POST 'https://www.cotalker.com/api/v1/tasks/61aa3f5be1f8a394d17cead9/sm/smstate' \
--header 'Authorization: Bearer $ACCESS_TOKEN' \
--header 'Content-Type: application/json' \
--data-raw '{
    "property": "61aa3fa76b5879d7637a433d",
    "stateMachine": "61aa141d45ac56f638e4c75f"
}'
```

#### Response Sample {#create-state-response}
Go to [COTSMState](/docs/documentation/models/tasks/model_state) for a complete description of the response.
```json {8-9}
{
    "subtask": {
        "triggers": []
    },
    "isActive": true,
    "type": "in-progress",
    "_id": "61aa3f81442b6a4e3a1f7def",
    "property": "61aa3fa76b5879d7637a433d",
    "stateMachine": "61aa141d45ac56f638e4c75f",
    "company": "61825e70d775394b54bc9801",
    "taskGroup": "61aa3f5be1f8a394d17cead9",
    "createdAt": "2021-12-03T14:40:37.890Z",
    "next": [],
    "surveyTriggers": [],
    "modifiedAt": "2021-12-03T14:40:37.909Z",
    "__v": 0
}
```

---

## Update State {#patch-state}
_Updates or edits the indicated state._

<span className="hero__subtitle"><span className="badge badge--warning">PATCH</span> /tasks/&#123;groupId&#125;/sm/smstate/&#123;stateId&#125;</span>

#### Endpoint URL {#patch-taskgroup-permissions-url}
`https://www.cotalker.com/api/v1/tasks/{groupId}/sm/smstate/{stateId}`

#### Path Parameters {#permissions-parameters}
Parameter | Description | Type | Required | Notes
--- | --- | --- | --- | ---
**groupId** | The ObjectId of the _task group_ that is to be searched through. | [ObjectId<COTTaskGroup\>](/docs/documentation/models/tasks/model_taskgroup) | Required |
**stateId** | The ObjectId of the _state_ that is to be updated. | [ObjectId<COTSMState\>](/docs/documentation/models/tasks/model_state) | Required |

#### Headers {#permissions-headers}
Header | Description | Required | Values
--- | --- | --- | ---
**Authorization** | Sends your _access token_ to make an API request.<br/>[Click here to see how to obtain an _access token_.](/docs/documentation/api/auth#how-to) | Required | Bearer $ACCESS_TOKEN
**Content-Type** | Sets the body's format. | Required | application/json

#### Request Body {#permissions-body}
_Only the fields that are being updated or added are required to be put into the body. For a complete schema description, please go to the [COTSMState data model](/docs/documentation/models/tasks/model_state)._


#### Request Sample {#permissions-sample}

```bash
curl --location --request PATCH 'https://www.cotalker.com/api/v1/tasks/61aa3f5be1f8a394d17cead9/sm/smstate/61aa3f81442b6a4e3a1f7def' \
--header 'Authorization: Bearer $ACCESS_TOKEN' \
--data-raw '{
    "type": "closed"
}'
```

#### Response Sample {#permissions-response}
Go to [COTSMState](/docs/documentation/models/tasks/model_state) for a complete description of the response.
```json {6}
{
    "subtask": {
        "triggers": []
    },
    "isActive": true,
    "type": "closed",
    "_id": "61aa3f81442b6a4e3a1f7def",
    "property": "61aa3fa76b5879d7637a433d",
    "stateMachine": "61aa141d45ac56f638e4c75f",
    "company": "61825e70d775394b54bc9801",
    "taskGroup": "61aa3f5be1f8a394d17cead9",
    "createdAt": "2021-12-03T14:40:37.890Z",
    "next": [],
    "surveyTriggers": [],
    "modifiedAt": "2021-12-03T14:47:35.777Z",
    "__v": 0
}
```

---


## Get All SLAs in State Machine {#get-all-slas}
_Returns all SLAs found in the indicated state machine._

<span className="hero__subtitle"><span className="badge badge--success">GET</span> /tasks/&#123;groupId&#125;/sla/smstatemachine/&#123;stateMachineId&#125;</span>

#### Endpoint URL {#get-taskgroup-by-id-url}
`https://www.coltaker.com/api/v1/tasks/{groupId}/sla/smstatemachine/{stateMachineId}`

#### Path Parameters {#get-taskgroup-by-id-path}
Parameter | Description | Type | Required | Notes
--- | --- | --- | --- | ---
**groupId** | The ObjectId of the _task group_ that is to be searched through. | [ObjectId<COTTaskGroup\>](/docs/documentation/models/tasks/model_taskgroup) | Required |
**stateMachineId** | The ObjectId of the state machine that is to be searched through. | [ObjectId<COTSMStateMachine\>](/docs/documentation/models/tasks/model_statemachine)

#### Headers {#get-taskgroup-by-id-headers}
Header | Description | Required | Values
--- | --- | --- | ---
**Authorization** | Sends your _access token_ to make an API request.<br/>[Click here to see how to obtain an _access token_.](/docs/documentation/api/auth#how-to) | Required | Bearer $ACCESS_TOKEN

#### Request Sample {#get-taskgroup-by-id-request}
```bash
curl --location --request GET 'https://www.cotalker.com/api/v1/tasks/616eafbda973cd46d72fb841/sla/smstatemachine/616eafbda973cd46d72fb841' \
--header 'Authorization: Bearer $ACCESS_TOKEN'
```

#### Response Sample {#get-taskgroup-by-id-response}
The response follows the [COTSMSLA](/docs/documentation/models/tasks/model_sla) data model.

---

## Get SLA by Id {#get-sla-by-id}
_Returns the SLA indicated by its Id._

<span className="hero__subtitle"><span className="badge badge--success">GET</span> /tasks/&#123;groupId&#125;/sla/&#123;slaId&#125;</span>

#### Endpoint URL {#get-taskgroup-by-id-url}
`https://www.coltaker.com/api/v1/tasks/{groupId}/sla/smstatemachine/{stateMachineId}`

#### Path Parameters {#get-taskgroup-by-id-path}
Parameter | Description | Type | Required | Notes
--- | --- | --- | --- | ---
**groupId** | The ObjectId of the _task group_ that is to be searched through. | [ObjectId<COTTaskGroup\>](/docs/documentation/models/tasks/model_taskgroup) | Required |
**slaId** | The ObjectId of the SLA that is to be returned. | [ObjectId<COTSMSLA\>](/docs/documentation/models/tasks/model_sla)

#### Headers {#get-taskgroup-by-id-headers}
Header | Description | Required | Values
--- | --- | --- | ---
**Authorization** | Sends your _access token_ to make an API request.<br/>[Click here to see how to obtain an _access token_.](/docs/documentation/api/auth#how-to) | Required | Bearer $ACCESS_TOKEN

#### Request Sample {#get-taskgroup-by-id-request}
```bash
curl --location --request GET 'https://www.cotalker.com/api/v1/tasks/616eafbda973cd46d72fb841/sla/605fa3ace2170f000818ac09' \
--header 'Authorization: Bearer $ACCESS_TOKEN'
```

#### Response Sample {#get-taskgroup-by-id-response}
The response follows the [COTSMSLA](/docs/documentation/models/tasks/model_sla) data model.

---

## Create SLA {#post-sla}
_Create a new SLA within a state machine._

<span className="hero__subtitle"><span className="badge badge--info">POST</span> /tasks/&#123;groupId&#125;/sla</span>

#### Endpoint URL {#create-task-url}
`https://www.coltaker.com/api/v1/tasks/{groupId}/sla`

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
_Only required fields are listed below. For a complete schema description, please go to the [COTSLA data model](/docs/documentation/models/tasks/model_sla). Unrequired fields that are not submitted are either filled in automatically or left blank._

Element | Description | Type | Required | Notes
--- | --- | --- | --- | ---
| **code** | The SLA's code name | string | Required | Maximum 60 characters; only lowercase letters, numbers, and underscores allowed; must be unique.
| **data** | Date and time configuration for the SLA. | object | Required | 
| **data.time** | Specifies the date or time that the task is supposed to go from its initial to final state. | string | Required | [Details available here.](/docs/documentation/automation/sla#time)
| **data.timeType** | Indicates how time is calculated. Options are `dynamic` or `static`. | string | Required | [Details available here.](/docs/documentation/automation/sla#time-type)
| **display** | The SLA's display name | string | Required | 
| **end** | Specifies when an SLA should be considered completed. | object | Required | Either `states` or `types` can be used to specify SLA completion, but it is not recommended to use both.
| **end.states** | Specifies the task states in which the SLA is completed. | [ObjectId<COTSMStates\>[ ]](/docs/documentation/models/tasks/model_state) | Required if `end.types` not used. |
| **end.types** | Specifies the task types in which the SLA is completed. | string[ ] | Required if `end.states` not used. | Enum: ["new", "in-progress", "closed"]
| **pb** | Contains the routine that sets off with the SLA. | [COTParametrizedBot](/docs/documentation/models/automations/model_parametrizedbot) | Required |
| **start** | Specifies when an SLA should initiate. | object | Required | Either `states` or `types` can be used to specify SLA initiation, but it is not recommended to use both.
| **start.states** | Specifies the task states in which the SLA is initialized. |[ObjectId<COTSMStates\>[ ]](/docs/documentation/models/tasks/model_state) | Required if `start.types` not used. | 
| **start.types** | Specifies the task types in which the SLA is initialized.| string[ ] | Required if `start.states` not used. | Enum: ["new", "in-progress", "closed"]
| **stateMachine** | The _state machine_ or _workflow_ the state belongs to. | [ObjectId<COTSMStateMachine\>](/docs/documentation/models/tasks/model_statemachine) | Required |


#### Request Sample {#create-task-request}
```bash
curl --location --request POST 'https://www.cotalker.com/api/v1/tasks/61827e87b9c09c7f7e121596/sla' \
--header 'Authorization: Bearer $ACCESS_TOKEN' \
--header 'Content-Type: application/json' \
--data-raw '{
    "pb": {},
    "data": {
        "timeType": "dynamic",
        "time": "DATE|endDate"
    },
    "display": "Customer Support SLA",
    "code": "customer_support_sla",
    "stateMachine": "61aa0cd673f97ba87978c855",
    "start": {
        "types": "new"
    },
    "end": {
        "types": "closed"
    }
}'
```

#### Response Sample {#create-task-response}
Go to [COTSLA](/docs/documentation/models/tasks/model_sla) for a complete description of the response.
```json {2-18,23-32}
{
    "start": {
        "types": [
            "new"
        ],
        "states": []
    },
    "end": {
        "types": [
            "closed"
        ],
        "states": []
    },
    "data": {
        "baseDate": "default",
        "timeType": "dynamic",
        "time": "DATE|endDate"
    },
    "isActive": true,
    "reset": true,
    "repeat": false,
    "_id": "61aa0d46224412d597aba341",
    "pb": {
        "default": {
            "stages": []
        },
        "_id": "61aa0d4dc759a32f408d74a6",
        "stages": []
    },
    "display": "Customer Support SLA",
    "code": "customer_support_sla",
    "stateMachine": "61827e81855c63e18d38be7a",
    "company": "61827e8fb10fe5e98e1438ef",
    "taskGroup": "61827e87b9c09c7f7e121596",
    "createdAt": "2021-12-03T11:51:41.034Z",
    "modifiedAt": "2021-12-03T11:51:41.036Z",
    "__v": 0
}
```

---


## Update SLA {#patch-sla}
_Updates or edits the indicated SLA._

<span className="hero__subtitle"><span className="badge badge--warning">PATCH</span> /tasks/&#123;groupId&#125;/sla/&#123;slaId&#125;</span>

#### Endpoint URL {#patch-taskgroup-permissions-url}
`https://www.cotalker.com/api/v1/tasks/{groupId}/sla/{slaId}`

#### Path Parameters {#permissions-parameters}
Parameter | Description | Type | Required | Notes
--- | --- | --- | --- | ---
**groupId** | The ObjectId of the _task group_ that is to be searched through. | [ObjectId<COTTaskGroup\>](/docs/documentation/models/tasks/model_taskgroup) | Required |
**slaId** | The ObjectId of the _SLA_ that is to be updated. | [ObjectId<COTSLA\>](/docs/documentation/models/tasks/model_sla) | Required |

#### Headers {#permissions-headers}
Header | Description | Required | Values
--- | --- | --- | ---
**Authorization** | Sends your _access token_ to make an API request.<br/>[Click here to see how to obtain an _access token_.](/docs/documentation/api/auth#how-to) | Required | Bearer $ACCESS_TOKEN
**Content-Type** | Sets the body's format. | Required | application/json

#### Request Body {#permissions-body}
_Only the fields that are being updated or added are required to be put into the body. For a complete schema description, please go to the [COTSLA data model](/docs/documentation/models/tasks/model_sla)._


#### Request Sample {#permissions-sample}

```bash
curl --location --request PATCH 'https://www.cotalker.com/api/v1/tasks/61827e87b9c09c7f7e121596/sla/61aa0d46224412d597aba341' \
--header 'Authorization: Bearer $ACCESS_TOKEN' \
--header 'Content-Type: application/json' \
--data-raw '{
    "start": {
        "states": "61827e102e8b30db66f7ef63"
    }
}'
```

#### Response Sample {#permissions-response}
Go to [COTSLA](/docs/documentation/models/tasks/model_sla) for a complete description of the response.
```json {2-6}
{
    "start": {
        "states": [
            "61827e102e8b30db66f7ef63"
        ]
    },
    "end": {
        "types": [
            "closed"
        ],
        "states": []
    },
    "data": {
        "baseDate": "default",
        "timeType": "dynamic",
        "time": "DATE|endDate"
    },
    "isActive": true,
    "reset": true,
    "repeat": false,
    "_id": "61aa0d46224412d597aba341",
    "pb": {
        "default": {
            "stages": []
        },
        "_id": "61aa0d4dc759a32f408d74a6",
        "stages": []
    },
    "display": "Customer Support SLA",
    "code": "customer_support_sla",
    "stateMachine": "61827e81855c63e18d38be7a",
    "company": "61827e8fb10fe5e98e1438ef",
    "taskGroup": "61827e87b9c09c7f7e121596",
    "createdAt": "2021-12-03T11:51:41.034Z",
    "modifiedAt": "2021-12-03T12:25:21.283Z",
    "__v": 0
}
```

---

