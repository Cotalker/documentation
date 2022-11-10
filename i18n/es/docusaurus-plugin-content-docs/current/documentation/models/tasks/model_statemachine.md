---
title: State Machine Data Model
sidebar_label: COTSMStateMachine
---
import useBaseUrl from '@docusaurus/useBaseUrl';

:::caution Advertencia
Esta página aún no se encuentra traducida al español.
:::

<span className="hero__subtitle"><em>COTSMStateMachine</em></span>
<br/>
<br/>

## Description {#description}

The _COTSMStateMachine_ data model explained below stores a [state machine's (workflow's) settings](/docs/documentation/admin/workflows/settings_panels/workflow_create_edit).

_State machines_, also know as [_workflows_](/docs/documentation/admin/workflows/admin_workflow_overview), are definitions of how [tasks](/docs/documentation/client/tasks/overview) behave. They define a workflow's initial [state](/docs/documentation/client/basic_concepts#state), the other states they can change to, what [triggers](/docs/documentation/automation/cotlang/triggers_and_contexts) are executed, if [reminders](/docs/documentation/automation/sla) are sent, and more.

## JSON Sample {#json-sample}

```json
{
        "__v": 3,
        "_id": "6179f1900f434fa685f7a857",
        "allowedExtensions": [  //Additional Fields
            "6179f1f6bb1f957abdd723b5" //COTPropertyType (Collection)
        ],
        "asset": {
            "propertyType": "6179f1d155753e932b4cb08c", //COTProperyType (Collection)
        },
        "code": "taskmanagerflow_05",
        "company": "6179f1ee6ec8b62d2406ec46",  //COTCompany
        "createdAt": "2021-02-23T11:54:44.287Z",
        "dynamicPropertyTypes": {  //Additional fields
            "status1": "6179f19c0af69ae6681dbba0",  //COTPropertyType (Collection)
            "status2": "6179f1a2963af3b56fd04d93",  //COTPropertyType (Collection)
            "status3": "6179f1a963b531035f7e5065",  //COTPropertyType (Collection)
            "status4": null,
            "status5": null,
            "isActive": [
                "status1",
                "status2",
                "status3"
            ]
        },
        "hooks": {
            "onCreate": []  //COTParametrizedBot (Routine)
        },
        "initialState": "6179f1b9ff2235eb2120565e",  //COTSMState
        "isActive": true,
        "taskGroup": "6179f1b04f04ff1c7f7cf01a", //COTTaskGroup (Workflow Group)
        "name": "Task Manager Flow",
        "propertyType": "6179f1cb4f1389218162fe05",  //COTPropertyType (States' Collection)
        "requiredSurvey": {  //Workflow Start Form
            "surveyId": "6179f1df620c1bc7c7865862", //COTSurvey
            "permissions": null,
            "parametrizedBot": []  //COTPrametrizedBot (Routine)
        }
    }
```

| Field | Description | [Type](/docs/documentation/models/overview_model#data-types) | Note |
| --- | --- | --- | --- |
| **allowedExtensions** | An array of collections used as additional fields for the workflow. | [ObjectId<COTPropertyType\>](/docs/documentation/models/databases/model_propertytypes)[ ] | The additional fields created by these collections are similar to the additional fields created by the collections in the `dynamicPropertyTypes` field. But the later should be preferred. See ["Best Practices"](/docs/documentation/admin/workflows/settings_panels/workflow_create_edit#workflow-additional-fields) for more information.
| **asset** | Indicates the asset used to represent the tasks created through the workflow (state machine). | object |
| **asset.propertyType** | The collection (property type) associated with the asset. The indicated collection can store relavant task data. | [ObjectId<COTPropertyType\>](/docs/documentation/models/databases/model_propertytypes) | Furthermore, the [collection's additional fields](/docs/documentation/admin/database/admin_collections#additional-fields) are shared with all the tasks beloning to the task group. |
| **code** | The state machine's unique identification name. | string | Maximum 60 characters; only lowercase letters, numbers, and underscore allowed; must be unique.
| **company** | Indicates the company the survey is found in. | [ObjectId<COTCompany\>](/docs/documentation/models/company/model_company) |
| **createdAt** | Date the workflow was created. | ISODate | YYYY-MM-DDTHH:mm:ss.SSSZ
| **dynamicPropertyTypes** | Indicates the collections (property types) set as _statuses_ in the [additional fields](/docs/documentation/admin/workflows/settings_panels/workflow_create_edit#additional-fields) section of workflow settings. Users will be able to select elements from the collections to give further details about the task. | object | This option can be used to filter tasks, establish permissions, set priorities, among others.
| **dynamicPropertyTypes<br/>.isActive** | Lists the statuses associated with a _collection (property type)_. | string[ ] | Enum: [ "status1", "status2", "status3", "status4", "status5"]
| **dynamicPropertyTypes<br/>.status1** | Collection used as an [additional field](/docs/documentation/admin/workflows/settings_panels/workflow_create_edit#additional-fields). | [ObjectId<COTPropertyType\>](/docs/documentation/models/databases/model_propertytypes) |
| **dynamicPropertyTypes<br/>.status2** | Collection used as an [additional field](/docs/documentation/admin/workflows/settings_panels/workflow_create_edit#additional-fields). | [ObjectId<COTPropertyType\>](/docs/documentation/models/databases/model_propertytypes) |
| **dynamicPropertyTypes<br/>.status3** | Collection used as an [additional field](/docs/documentation/admin/workflows/settings_panels/workflow_create_edit#additional-fields). | [ObjectId<COTPropertyType\>](/docs/documentation/models/databases/model_propertytypes) |
| **dynamicPropertyTypes<br/>.status4** | Collection used as an [additional field](/docs/documentation/admin/workflows/settings_panels/workflow_create_edit#additional-fields). | [ObjectId<COTPropertyType\>](/docs/documentation/models/databases/model_propertytypes) |
| **dynamicPropertyTypes<br/>.status5** | Collection used as an [additional field](/docs/documentation/admin/workflows/settings_panels/workflow_create_edit#additional-fields). | [ObjectId<COTPropertyType\>](/docs/documentation/models/databases/model_propertytypes) |
| **hooks** | Used for running routines triggered by an event. | object |
| **hooks.onCreate** | Routine that runs on the creation of a task. | [COTParametrizedBot[ ]](/docs/documentation/models/automations/model_parametrizedbot) |
| **initialState** | Indicates the state the workflow begins in. | [ObjectId<COTSMState\>](/docs/documentation/models/tasks/model_state) |
| **isActive** | Indicates whether the workflow is active or not. | boolean |
| **modifiedAt** | Indicates the last time the workflow was modified. | ISODate | YYYY-MM-DDTHH:mm:ss.SSSZ
| **name** | The workflow's display name | string | 
| **propertyType** | Indicates the _collection (property type)_ that contains the _elements_ that represent the [workflow's states](/docs/documentation/admin/workflows/settings_panels/create_edit_state). | [ObjectId<COTPropertyType\>](/docs/documentation/models/databases/model_propertytypes) |
| **requiredSurvey** | Represents a [_start form_](/docs/documentation/admin/workflows/admin_workflow_required_survey), used for initializing a workflow. | object |
| **requiredSurvey<br/>.parametrizedBot** | Configuration of the [routine](/docs/documentation/automation/admin_routine) that accompanies the _start form_. | [COTParametrizedBot[ ]](/docs/documentation/models/automations/model_parametrizedbot) |
| **requiredSurvey<br/>.permissions** | List of [start form permissions](/docs/documentation/admin/workflows/settings_panels/workflow_create_edit#states) users need to initiate the workflow. | string[ ] | Users need at least one of the permissions listed. Users are designated permissions through their [access roles](/docs/documentation/admin/admin_accessrole#default-permissions).
| **requiredSurvey<br/>.surveyId** | Workflow start form ID | [ObjectId<COTSurvey\>](/docs/documentation/models/surveys/model_surveys) |
| **taskGroup** | The workflow group thats hosts all the tasks created upon the workflow. | [ObjectId<COTTaskGroup\>](/docs/documentation/models/tasks/model_taskgroup) |


## Deprecated {#deprecated}

| Field | Description | [Type](/docs/documentation/models/overview_model#data-types) | Note |
| --- | --- | --- | --- |
| **asset.property** | The asset's property (element) ID. | [ObjectId<COTProperty\> ](/docs/documentation/models/databases/model_properties) | DEPRECATED
| **asset.type** | Use the `generic` type for tasks that need to be repeated. Use `unique` for one-time tasks. | string | DEPRECATED
| **taskChannelType** | Refers to the [relationship](/docs/documentation/admin/tips/chat_channels_workflows) task's and their channels.<br/>Enum: ["bound", "unbound", "unbound-hierarchy"]<br/>SHOULD ALWAYS BE ON `BOUND` | string | DEPRECATED.

## Additional Resources {#resources}

- [Workflow Configuration](/docs/documentation/admin/workflows/settings_panels/workflow_create_edit): Worflow configurations through the Administrative Panel
- [Create Workflow Tutorial](/docs/tutorials/basic/create_state_machines): Basic tutorial on how to create a workflow
- ["State Machines" REST API documentation](/docs/documentation/api/tasks/statemachines): basic "State Machines" API requests
- [API documentation in Swagger](https://www.cotalker.com/swagger/core/?key=woubtjf4olr0t4zgutuwn6scbcm6hd3qh1cgl5obmohpbm3mfublnwcvv67lodgjvd3h86s9ppshtvmf95gepsqh6nizq9liu7f): complete with data models (schemas)
- [COTLang](/docs/documentation/automation/cotlang/admin_cotlang): use COTLang for extracting data from models in routines
- [Triggers and Contexts](/docs/documentation/automation/cotlang/triggers_and_contexts): more information on using data models within routines

## Help {#help}

- [Cotalker Platform Community](https://github.com/Cotalker/documentation/discussions): post your questions or search for previous answers given in the forum