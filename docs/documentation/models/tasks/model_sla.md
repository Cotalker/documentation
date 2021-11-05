---
title: SLA Data Model
sidebar_label: COTSMSLA
---
import useBaseUrl from '@docusaurus/useBaseUrl'; 
import Highlight from '@theme/Highlight';

<span className="hero__subtitle"><em>COTSMSLA</em></span>
<br/>
<br/>

## Description {#description}

The COTSMSLA data model contains the settings of a [service-level agreement (SLAs)](/docs/documentation/automation/sla) within a workflow.

## JSON Sample {#json-sample}
```json
{
    "_id": "61827e0978b92cfb95ce66b6",
    "start": {
        "types": [],
        "states": [
            "61827e102e8b30db66f7ef63"  //COTSMState (Workflow State)
        ]
    },
    "end": {
        "types": [],
        "states": [
            "61827e6ede16c588a66e3b42",  //COTSMState (Workflow State)
            "61827e74fe6d5bde4134a1f1"  //COTSMState (Workflow State)
        ]
    },
    "data": {
        "timeType": "dynamic",
        "time": "DATE|endDate",
        "baseDate": "startDate"
    },
    "isActive": true,
    "reset": false,
    "repeat": true,
    "stateMachine": "61827e81855c63e18d38be7a",  //COTSMStateMachine (Workflow)
    "taskGroup": "61827e87b9c09c7f7e121596",  //COTTaskGroup (Workflow Group)
    "code": "reminder_00",
    "display": "Reminder",
    "pb": {},  //COTParametrizedBot (Routine)
    "company": "61827e8fb10fe5e98e1438ef",  //COTCompany
    "createdAt": "2021-03-27T21:29:16.756Z",
    "modifiedAt": "2021-10-27T13:07:38.906Z",
    "__v": 0
}
```

## Fields {#fields}

| Field | Description | [Type](/docs/documentation/models/overview_model#data-types) | Note |
| --- | --- | --- | --- |
| **code** | The SLA's code name | string | Maximum 60 characters; only lowercase letters, numbers, and underscores allowed; must be unique.
| **company** | The ID of the company the SLA is found in. | [ObjectId<COTCompany\>](/docs/documentation/models/model_company) |
| *createdAt* | Date the SLA was created. | ISODate | YYYY-MM-DDTHH:mm:ss.SSSZ
| **data** | Date and time configuration for the SLA. | object |
| **data.baseDate** | Sets _static_ and _dynamic_ `time` reference. | string | Enum: ["endDate", "startDate", "resolutionDate", "default"]<br/>[Details availible here.](/docs/documentation/automation/sla#base-date)
| **data.time** | Specifies the date or time that the task is supposed to go from its initial to final state. | string | [Details available here.](/docs/documentation/automation/sla#time)
| **data.timeType** | Indicates how time is calculated. Options are `dynamic` or `static`. | string | [Details available here.](/docs/documentation/automation/sla#time-type)
| **display** | The SLA's display name |string | 
| **end** | Specifies when an SLA should be considered completed. | object | Either `states` or `types` can be used to specify SLA completion, but it is not recommended to use both.
| **end.states** | Specifies the task states in which the SLA is completed. | [ObjectId<COTSMStates\>[ ]](/docs/documentation/models/tasks/model_state)
| **end.types** | Specifies the task types in which the SLA is completed. | string[ ] | Enum: ["new", "in-progress", "closed"]
| **isActive** | Indicates if the SLA is active or not. | boolean |
| **modifiedAt** | Indicates the last time the SLA was modified. | ISODate | YYYY-MM-DDTHH:mm:ss.SSSZ
| **pb** | Contains the routine that sets off with the SLA. | [COTParametrizedBot](/docs/documentation/models/automations/model_parametrizedbot) |
| **repeat** | If "true", time will cycle infinitely until the condition is met. Therefore, the SLA routine will be executed as many times as necessary. Otherwise, the SLA will only run once. | boolean | Use with precaution to avoid undesired looping activity.
| **reset** | If "true", time will start again when the task returns to `start.states` or `start.types`. | boolean |
| **start** | Specifies when an SLA should initiate. | object | Either `states` or `types` can be used to specify SLA initiation, but it is not recommended to use both.
| **start.states** | Specifies the task states in which the SLA is initialized. |[ObjectId<COTSMStates\>[ ]](/docs/documentation/models/tasks/model_state) |
| **start.types** | Specifies the task types in which the SLA is initialized.| string[ ] | Enum: ["new", "in-progress", "closed"]
| **stateMachine** | The _state machine_ or _workflow_ the state belongs to. | [ObjectId<COTSMStateMachine\>](/docs/documentation/models/tasks/model_statemachine) |
| **taskGroup** | The _task group_ or _workflow group_ the state belongs to. | [ObjectId<COTTaskGroup\>](/docs/documentation/models/tasks/model_taskgroup) |

## Additional Resources {#resources}

- [SLA Routine](/docs/documentation/automation/sla): How to add an SLA Routine to a workflow
- ["State Machines" REST API documentation](/docs/documentation/api/tasks/statemachines): basic "State Machines" API requests
- [API documentation in Swagger](https://www.cotalker.com/swagger/core/?key=woubtjf4olr0t4zgutuwn6scbcm6hd3qh1cgl5obmohpbm3mfublnwcvv67lodgjvd3h86s9ppshtvmf95gepsqh6nizq9liu7f): complete with data models (schemas)
- [COTLang](/docs/documentation/automation/admin_cotlang): use COTLang for extracting data from models in routines
- [Triggers and Contexts](/docs/documentation/automation/triggers_and_contexts): more information on using data models within routines

## Help {#help}

- [Cotalker Platform Community](https://github.com/Cotalker/documentation/discussions): post your questions or search for previous answers given in the forum