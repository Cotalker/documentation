---
title: State Machine Data Model
sidebar_label: COTSMStateMachine
---
import useBaseUrl from '@docusaurus/useBaseUrl';

## Description {#description}

_State machines_, also know as [_workflows_](/docs/documentation/client/basic_concepts#workflows), are definitions of how [tasks](/docs/documentation/client/basic_concepts#tasks) behave. They define a workflow's initial [state](/docs/documentation/client/basic_concepts#state), the other states they can change to, what [triggers](/docs/documentation/automation/triggers_and_contexts) are executed, if [reminders](/docs/documentation/automation/sla) are sent, and more. A [state machine's or workflow's settings](/docs/documentation/admin/workflows/settings_panels/workflow_create_edit) are stored in the _COTSMStateMachine_ data model explained below.

## JSON Sample {#json-sample}

```json
{
        "_id": "6179f1900f434fa685f7a857",
        "hooks": {
            "onCreate": [
                {  // COTParamertrizedBot
                    "maxIterations": 0,
                    "stages": [
                      {
                        "customNetworkRequest": [
                          {
                            "body": {},
                            "endpoint": [
                              "string"
                            ],
                            "findOne": true,
                            "keyOutput": "string",
                            "method": "GET",
                            "query": {}
                          }
                        ],
                        "data": {},
                        "key": "string",
                        "name": "string",
                        "next": {},
                        "version": "string"
                      }
                    ],
                    "start": "string",
                    "version": 0
                }
            ]
        },
        "dynamicPropertyTypes": {  //Additional fields
            "status1": "6179f19c0af69ae6681dbba0",  //COTPropertyType
            "status2": "6179f1a2963af3b56fd04d93",  //COTPropertyType
            "status3": "6179f1a963b531035f7e5065",  //COTPropertyType
            "status4": null,
            "status5": null,
            "isActive": [
                "status1",
                "status2",
                "status3"
            ]
        },
        "isActive": true,
        "taskGroup": "6179f1b04f04ff1c7f7cf01a", //COTTaskGroup
        "name": "Task Manager Flow",
        "code": "taskmanagerflow_05",
        "initialState": "6179f1b9ff2235eb2120565e",  //COTProperty
        "propertyType": "6179f1cb4f1389218162fe05",  //States collection (COTPropertyType)
        "asset": {
            "type": "generic",
            "propertyType": "6179f1d155753e932b4cb08c", //COTProperyType
            "property": "6179f1d8a1d9328faf5e2855" //COTProperty
        },
        "requiredSurvey": {  //Start Form
            "surveyId": "6179f1df620c1bc7c7865862", //COTSurvey
            "permissions": null,
            "parametrizedBot": [  //COTPrametrizedBot – Routine
                {
                    "_id": "6179f1e36f9e1e18a765b799", //COTParametrizedBot
                    "default": {
                        "stages": []
                    },
                    "start": "create_task",
                    "maxIterations": 1,
                    "stages": [
                        {
                            "_id": "6179f1e7322edcb34b77ec6d",
                            "key": "create_task",
                            "name": "PBCreateTask",
                            "version": "2.0.0",
                            "data": {
                                "name": [
                                    "$VALUE#answer|data|[find=>identifier=nametask_00]|process|0"
                                ],
                                "taskGroup": "$VALUE#meta|taskGroup",
                                "user": "$VALUE#answer|user",
                                "channel": "$VALUE#answer|channel",
                                "answers": [
                                    "$VALUE#answer|uuid"
                                ]
                            },
                            "next": {
                                "SUCCESS": "",
                                "ERROR": ""
                            },
                            "customNetworkRequest": []
                        }
                    ],
                    "version": "v3"
                }
            ]
        },
        "company": "6179f1ee6ec8b62d2406ec46",  //COTCompany
        "createdAt": "2021-02-23T11:54:44.287Z",
        "__v": 3,
        "allowedExtensions": [  //Additional Field (adds an additional field to Task Details)
            "6179f1f6bb1f957abdd723b5" //COTPropertyType
        ]
    }
```

| Field | Description | [Type](/docs/documentation/models/overview_model#data-types) | Note |
| --- | --- | --- | --- |
| **asset** | Indicates the asset the task represents through a property and its property type. | object |
| **asset.property** | The property ID of the asset. | [ObjectId<COTProperty\> ](/docs/documentation/models/databases/model_properties) |
| **asset.propertyType** | | [ObjectId<COTPropertyType\>](/docs/documentation/models/databases/model_propertytypes) |
| **asset.type** | Use the `generic` type for tasks that need to be repeated. Use `unique` for one-time tasks. | string | Enum: [ "generic", "unique" ]
| **code** | The state machine's unique identification name | string | Maximum 60 characters; only lowercase letters, numbers, and underscore allowed; must be unique.
| **company** | Indicates the company the survey is found in. | [ObjectId<COTCompany\>](/docs/documentation/models/model_company) |
| **createdAt** | Date the workflow was created. | ISODate | YYYY-MM-DDTHH:mm:ss.SSSZ
| **dynamicPropertyTypes** | Indicates the collections (property types) set as [additional fields](/docs/documentation/admin/workflows/settings_panels/workflow_create_edit#additional-fields). Users will be able to select elements from the collections to give further details about the task. | object | This option can be used to filter tasks, establish permissions, set priorities, among others.
| **dynamicPropertyTypes.isActive** | Lists the statuses associated with a _collection (property type)_. | string[ ] | Enum: [ "status1", "status2", "status3", "status4", "status5"]
| **dynamicPropertyTypes.status1** | Collection used as an [additional field](/docs/documentation/admin/workflows/settings_panels/workflow_create_edit#additional-fields). | [ObjectId<COTPropertyType\>](/docs/documentation/models/databases/model_propertytypes) |
| **dynamicPropertyTypes.status2** | Collection used as an [additional field](/docs/documentation/admin/workflows/settings_panels/workflow_create_edit#additional-fields). | [ObjectId<COTPropertyType\>](/docs/documentation/models/databases/model_propertytypes) |
| **dynamicPropertyTypes.status3** | Collection used as an [additional field](/docs/documentation/admin/workflows/settings_panels/workflow_create_edit#additional-fields). | [ObjectId<COTPropertyType\>](/docs/documentation/models/databases/model_propertytypes) |
| **dynamicPropertyTypes.status4** | Collection used as an [additional field](/docs/documentation/admin/workflows/settings_panels/workflow_create_edit#additional-fields). | [ObjectId<COTPropertyType\>](/docs/documentation/models/databases/model_propertytypes) |
| **dynamicPropertyTypes.status5** | Collection used as an [additional field](/docs/documentation/admin/workflows/settings_panels/workflow_create_edit#additional-fields). | [ObjectId<COTPropertyType\>](/docs/documentation/models/databases/model_propertytypes) |
| **hooks** | | object |
| **hooks.onCreate** |  | COTParametrizedBot[ ] |
| **initialState** | Indicates the state the workflow begins in. | [ObjectId<COTProperty\>](/docs/documentation/models/databases/model_properties) |
| **isActive** | Indicates whether the workflow is active or not. | boolean |
| **modifiedAt** | Indicates the last time the workflow was modified | ISODate | YYYY-MM-DDTHH:mm:ss.SSSZ
| **name** | The workflow's display name | string | 
| **propertyType** | Indicates the _collection (property type)_ that contains the _elements_ that represent the [workflow's states](/docs/documentation/admin/workflows/settings_panels/create_edit_state). | [ObjectId<COTPropertyType\>](/docs/documentation/models/databases/model_propertytypes) |
| **requiredSurvey** | Represents a [_start form_](/docs/documentation/admin/workflows/admin_workflow_required_survey), used for initializing a workflow. | object |
| **requiredSurvey.parametrizedBot** | Configuration of the [routine](/docs/documentation/automation/admin_routine) that accompanies the _start form_. | [COTParametrizedBot[ ]](/docs/documentation/models/tasks/model_parametrizedbot) |
| **requiredSurvey.permissions** | Lists the access roles users need to have for [start form permission](/docs/documentation/admin/workflows/settings_panels/workflow_create_edit#states). | [ObjectId<COTAccessRole\>[ ]](/docs/documentation/models/users/model_accessroles) |
| **requiredSurvey.surveyId** | Workflow start form ID | [ObjectId<COTSurvey\>](/docs/documentation/models/surveys/model_surveys) |
| **taskGroup** | The workflow group thats hosts all the tasks created upon the workflow. | [ObjectId<COTTaskGroup\>](/docs/documentation/models/tasks/model_taskgroup |


## Deprecated {#deprecated}

| Field | Description | [Type](/docs/documentation/models/overview_model#data-types) | Note |
| --- | --- | --- | --- |
| **taskChannelType** | Refers to the [relationship](/docs/documentation/admin/tips/chat_channels_workflows) task's and their channels.<br/>Enum: ["bound", "unbound", "unbound-hierarchy"]<br/>SHOULD ALWAYS BE ON `BOUND` | string | DEPRECATED.

## Additional Resources {#resources}

- [Workflow Configuration](/docs/documentation/client/basic_concepts#tasks): Worflow configurations through the Administrative Panel
- ["State Machines" REST API documentation](/docs/documentation/api/tasks/statemachines): basic "State Machines" API requests
- [API documentation in Swagger](https://www.cotalker.com/swagger/core/?key=woubtjf4olr0t4zgutuwn6scbcm6hd3qh1cgl5obmohpbm3mfublnwcvv67lodgjvd3h86s9ppshtvmf95gepsqh6nizq9liu7f): complete with data models (schemas)
- [COTLang](/docs/documentation/automation/admin_cotlang): use COTLang for extracting data from models in routines
- [Triggers and Contexts](/docs/documentation/automation/triggers_and_contexts): more information on using data models within routines

## Help {#help}

- [Cotalker Platform Community](https://github.com/Cotalker/documentation/discussions): post your questions or search for previous answers given in the forum