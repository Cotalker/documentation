---
title: State Data Model
sidebar_label: COTSMState
---
import useBaseUrl from '@docusaurus/useBaseUrl'; 

<span className="hero__subtitle"><em>COTSMState</em></span>
<br/>
<br/>

## Description {#description}
[_States_](/docs/documentation/admin/workflows/settings_panels/create_edit_state) are different statuses or stages a task goes through in a workflow or state machine. The _COTSMState_ data model contains a state's settings which detail how it passes to a next _state_.


## JSON Sample {#json-sample}
```json
{
    "_id": "6034ee0deafb030009e2a003",
    "isActive": true,
    "type": "new",
    "stateMachine": "6034ed042719f80008d89f00",
    "taskGroup": "6034ec90eafb030009e2998d",
    "property": "5fbd2479bc66360009cdba2a",
    "subtask": {
        "target": null,
        "triggers": []
    },
    "next": [
        {
            "canChange": [
                "manual"
            ],
            "permissions": null,
            "_id": "617c387c1f9fd10007e7df46",
            "target": "6034ee295a63b70008afd365",
            "triggers": [
                {
                    "_id": "617c387c1f9fd10007e7df47",
                    "start": "test_workflow_state_change",
                    "maxIterations": 1,
                    "stages": [
                        {
                            "_id": "617c387c1f9fd10007e7df48",
                            "key": "test_workflow_state_change",
                            "name": "PBGiphy",
                            "version": null,
                            "data": {
                                "search": [
                                    "workflow"
                                ],
                                "channel": "6052c3f5f2970a8b35f91589"
                            },
                            "next": {
                                "DEFAULT": ""
                            },
                            "customNetworkRequest": []
                        }
                    ],
                    "version": "v3"
                }
            ],
            "requiredSurvey": null
        },
    ],
    "surveyTriggers": [],
    "company": "5f5a74a8fdf77a0008a6349a",
    "createdAt": "2021-02-23T11:59:09.774Z",
    "modifiedAt": "2021-10-29T18:07:56.959Z",
    "__v": 3
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
| **next[index].triggers** | Configuration of the routine that accompanies the state change. | [COTParametrizedBot[ ]](/docs/documentation/models/tasks/model_parametrizedbot) | NOTE: If this routine is set, it is up to the routine to change the state.
| **property** | The state's _property_ or _element_ ID. | [ObjectId<COTProperty\>](/docs/documentation/models/databases/model_properties) |
| **stateMachine** | The _state machine_ or _workflow_ the state belongs to. | [ObjectId<COTSMStateMachine\>](/docs/documentation/models/tasks/model_statemachine)
| **subtask** | Represents an available subtask. | object | 
| **subtask.target** | Points to a workflow used as a subtask. | ObjectId<COTSMStateMachine\> | 
| **subtask.triggers** | Configuration of the routine that accompanies the subtask creation. | [COTParametrizedBot[ ]](/docs/documentation/models/tasks/model_parametrizedbot) |
| **surveyTriggers** | Surveys that accompany a workflow's state change. | object[ ] |
| **surveyTriggers[index].surveyId** | Survey ID | [ObjectId<COTSurvey\>](/docs/documentation/models/surveys/model_surveys) |
| **surveyTriggers[index].triggers** | Configuration of the routine that accompanies the survey trigger. | [COTParametrizedBot[ ]](/docs/documentation/models/tasks/model_parametrizedbot) |
| **taskGroup** | The _task group_ or _workflow group_ the state belongs to. | [ObjectId<COTTaskGroup\>](/docs/documentation/models/tasks/model_taskgroup)
| **type** | Indicates the state type. | string | Enum: ["new", "in-progress", or "closed"]<br/>[Option details](/docs/documentation/admin/workflows/settings_panels/create_edit_state#create-state-general-information)


## Deprecated {#deprecated}

| Field | Description | [Type](/docs/documentation/models/overview_model#data-types) | Note |
| --- | --- | --- | --- |
**icon** | | string | DEPRECATED