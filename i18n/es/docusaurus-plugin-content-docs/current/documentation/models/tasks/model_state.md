---
title: State Data Model
sidebar_label: COTSMState
---
import useBaseUrl from '@docusaurus/useBaseUrl'; 

<span className="hero__subtitle"><em>COTSMState</em></span>
<br/>

## Description {#description}
[_States_](/docs/documentation/admin/workflows/settings_panels/create_edit_state) are different statuses or stages a task goes through in a workflow or state machine. The _COTSMState_ data model contains a state's settings which detail how it passes to a next _state_.


## JSON Sample {#json-sample}
```json
{
    "__v": 3,
    "_id": "61825dc53d5a23c4de1c5891",
    "company": "61825e70d775394b54bc9801",  //COTCompany
    "createdAt": "2021-02-23T11:59:09.774Z",
    "isActive": true,
    "modifiedAt": "2021-10-29T18:07:56.959Z",
    "next": [
        {
            "canChange": [
                "manual"
            ],
            "permissions": null,
            "_id": "61825e3c4f81079320a7f394",
            "target": "61825e4d2e6213cc574404ed",  //COTSMState (Workflow)
            "triggers": [],  //COTParametrizedBot (Routine)
            "requiredSurvey": null  //COTSurvey (Survey)
        },
    ],
    "property": "61825e1fdf69d71cd50f28d5",  //COTProperty (Element)
    "stateMachine": "61825e1288d560b8d79c4bd5",  //COTSMStateMachine (Workflow)
    "subtask": {
        "target": null,  //COTSMStateMachine (Workflow)
        "triggers": []  //COTParametrizedBot (Routine)
    },
    "surveyTriggers": [
        {
            "surveyId": "618261e9b754d9b1132b5a15",  //COTSurvey (Survey)
            "triggers": []  //COTParametrizedBot (Routine)
        }
    ],
    "taskGroup": "61825e1ab0a7fb03de08bdc2",  //COTTaskGroup (Workflow Group)
    "type": "new",
}
```

## Fields {#fields}

| Field | Description | [Type](/docs/documentation/models/overview_model#data-types) | Note |
| --- | --- | --- | --- |
| **company** | The ID of the company the state is found in. | [ObjectId<COTCompany\>](/docs/documentation/models/model_company) |
| **createdAt** | Indicates when the state was created | ISODate | YYYY-MM-DDTHH:mm:ss.SSSZ
| **isActive** | Indicates if the state is active or not. | boolean |
| **modifiedAt** | Indicates the last time the state's configuration was modified. | ISODate | YYYY-MM-DDTHH:mm:ss.SSSZ
| **next** | List of the possible states the task can change into from the current state. | object[ ] | Each object in the array represents a state the task can assume.
| **next[index].canChange** | Indicates if and how a state change can occurr. | string[ ] | Enum: ["survey", "manual", "none"]<br/>[Option details.] (/docs/documentation/admin/workflows/settings_panels/create_edit_state/#state-changes)
| **next[index].requiredSurvey** | Points to a survey used for changing a task's state. Option available only is `canChange` is set to _survey_. | [ObjectId<COTSurvey\>](/docs/documentation/models/surveys/model_surveys) | Setup information for [State Start Forms] (/docs/documentation/admin/workflows/admin_workflow_required_survey#required-survey-for-modifying-task-states)
| **next[index].target** | The state the task changes into. | ObjectId<COTSMState\> |
| **next[index].triggers** | Configuration of the routine that accompanies the state change. | [COTParametrizedBot[ ]](/docs/documentation/models/automations/model_parametrizedbot) | NOTE: If this routine is set, it is up to the routine to change the state.
| **property** | The state's _property_ or _element_ ID. | [ObjectId<COTProperty\>](/docs/documentation/models/databases/model_properties) |
| **stateMachine** | The _state machine_ or _workflow_ the state belongs to. | [ObjectId<COTSMStateMachine\>](/docs/documentation/models/tasks/model_statemachine)
| **subtask** | Represents an available subtask. | object | 
| **subtask.target** | Points to a workflow used as a subtask. | ObjectId<COTSMStateMachine\> | 
| **subtask.triggers** | Configuration of the routine that accompanies the subtask creation. | [COTParametrizedBot[ ]](/docs/documentation/models/automations/model_parametrizedbot) |
| **surveyTriggers** | Surveys that accompany a workflow's state change. | object[ ] |
| **surveyTriggers[index].surveyId** | Survey ID | [ObjectId<COTSurvey\>](/docs/documentation/models/surveys/model_surveys) |
| **surveyTriggers[index].triggers** | Configuration of the routine that accompanies the survey trigger. | [COTParametrizedBot[ ]](/docs/documentation/models/automations/model_parametrizedbot) |
| **taskGroup** | The _task group_ or _workflow group_ the state belongs to. | [ObjectId<COTTaskGroup\>](/docs/documentation/models/tasks/model_taskgroup)
| **type** | Indicates the state type. | string | Enum: ["new", "in-progress", or "closed"]<br/>[Option details](/docs/documentation/admin/workflows/settings_panels/create_edit_state#create-state-general-information)


## Deprecated {#deprecated}

| Field | Description | [Type](/docs/documentation/models/overview_model#data-types) | Note |
| --- | --- | --- | --- |
**icon** | | string | DEPRECATED

## Additional Resources {#resources}

- [Workflow State Configuration](/docs/documentation/admin/workflows/settings_panels/create_edit_state): Worflow configurations through the Administrative Panel
- [Create Workflow Tutorial](/docs/tutorials/basic/create_state_machines): Basic tutorial on how to create a workflow
- ["State Machines" REST API documentation](/docs/documentation/api/tasks/statemachines): basic "State Machines" API requests
- [API documentation in Swagger](https://www.cotalker.com/swagger/core/?key=woubtjf4olr0t4zgutuwn6scbcm6hd3qh1cgl5obmohpbm3mfublnwcvv67lodgjvd3h86s9ppshtvmf95gepsqh6nizq9liu7f): complete with data models (schemas)
- [COTLang](/docs/documentation/automation/admin_cotlang): use COTLang for extracting data from models in routines
- [Triggers and Contexts](/docs/documentation/automation/triggers_and_contexts): more information on using data models within routines

## Help {#help}

- [Cotalker Platform Community](https://github.com/Cotalker/documentation/discussions): post your questions or search for previous answers given in the forum