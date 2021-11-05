---
title: Parametrized Bot Data Model
sidebar_label: COTParametrizedBot
---
import useBaseUrl from '@docusaurus/useBaseUrl'; 
import Highlight from '@theme/Highlight';

<span className="hero__subtitle"><em>COTParametrizedBot</em></span>
<br/>

## Description {#description}

A _parametrized bot_ is an [automated routine](/docs/documentation/automation/admin_routine) with a [bot that executes a task in each stage](/docs/documentation/automation/existing_routines).

The COTParametrizedBot data model contains a routine's settings. This data model is used within other data models, such as [COTSMStateMachine](/docs/documentation/models/tasks/model_statemachine), [COTSMState](/docs/documentation/models/tasks/model_state), [COTSMSLA](/docs/documentation/models/tasks/model_sla), [COTBot](/docs/documentation/models/automations/model_bots), among others.

## JSON Sample {#json-sample}

_Sample taken from an SLA Routine:_
```json
{
        "_id": "61829b0ecc13e1ff490c8547",
        "maxIterations": 10,
        "stages": [
            {
                "_id": "61829b17bfbdc5e41e3fb653",
                "key": "email",
                "name": "PBEmail",
                "data": {
                    "subject": "Task Reminder",
                    "content": {
                        "recipientName": "($CODE#users#_id#($OUTPUT#task_request#data|assignee))|name|names",
                        "recipientEmail": "",
                        "companyName": "ACME",
                        "title": [
                            "Pending Task"
                        ],
                        "action": "",
                        "code": "",
                        "messageA": "$JOIN# #(Task number)#($OUTPUT#task_request#data|serial)#($OUTPUT#task_request#data|name)#is still pending.",
                        "messageB": "Please complete the task or modify its end-date."
                    },
                    "targets": [
                        "($CODE#users#_id#($OUTPUT#task_request#data|assignee))|email"
                    ],
                    "singleRecipient": true
                },
                "next": {
                    "DEFAULT": ""
                },
                "customNetworkRequest": []
            },
            {
                "_id": "61829b287076806e3559a796",
                "key": "task_request",
                "name": "NWRequest",
                "data": {
                    "url": "$JOIN#/#($ENV#BASEURL)#api#tasks#($VALUE#taskGroupId)#task#($VALUE#taskId)",
                    "method": "GET",
                    "defaultAuth": true,
                    "headers": {
                        "admin": true
                    }
                },
                "next": {
                    "SUCCESS": "email",
                    "ERROR": ""
                },
                "customNetworkRequest": []
            }
        ],
        "start": "task_request",
        "version": "v3"
    },
```


## Fields {#fields}

| Field | Description | [Type](/docs/documentation/models/overview_model#data-types) | Note |
| --- | --- | --- | --- |
| **maxIterations** | Specifies the maximum number of stages the routine can go through. | number | Make sure looping stages are taken into account when specifying the maximum number of iterations.
| **stages** | Represents the different stages or steps the routine goes through. Each routine stage is designated a _stage type_ or bot that is called upon to carry out a specific task. | object[ ] | [A complete list of stage types can be found here.](/docs/documentation/automation/existing_routines)
| **stages[index].customNetworkRequest** | Indicates the parameters for making a customized _network request_ within the routine stage. | object[ ] |
| **stages[index].data** | Contains the _stage type_ parameters or configuration. The required data format depends on the _stage type_ and its version. | object | Format example: [_Wait_ stage type](https://doc.cotalker.com/docs/documentation/automation/bots/fcsleep) data includes time with the following format: `{ milliseconds: number }`
| **stages[index].key** | Indicates the stage's custom code name. | string | Maximum 60 characters; only lowercase letters, numbers, and underscore allowed; must be unique. | (used to connect stages)
| **stages[index].name** | Indicates the standard name of the stage type (bot), e.g., PBMessage, PBCreateTask, etc.. | string |
| **stages[index].next** | `next` is a custom `{[key]: string}` object that indicates the next step in the routine. `key` is defined by the [stage type](/docs/documentation/automation/existing_routines). | object | Object keys usually follow IF/ELSE logic and can include keys such as `SUCCESS`, `ERROR`, or `DEFAULT`.
| **stages[index].version** | Stage version. | string | For internal use only.
| **start** | Indicates the stage the routine initiates in. | string | Valid options include any routine `stages[index].key` value.
| **version** | The routine's version number. | number | For internal use only. | This value specifies the engine version. NOTE: This should always be 'v3' or something like that.

## Deprecated {#deprecated}

 Field | Description | [Type](/docs/documentation/models/overview_model#data-types) | Note |
| --- | --- | --- | --- |
| **stages[index].customNetworkRequest[index].body** | The customized network request's body. | object | DEPRECATED 
| **stages[index].customNetworkRequest[index].endpoint** | The customized network request's endpoint. | string[ ] | DEPRECATED
| **stages[index].customNetworkRequest[index].findOne** | | boolean | DEPRECATED
| **stages[index].customNetworkRequest[index].keyOutput** | | string | DEPRECATED
| **stages[index].customNetworkRequest[index].method** | Indicates the request method. Enum: ["GET", "POST"] | string | DEPRECATED
| **stages[index].customNetworkRequest[index].query** | | object | DEPRECATED


## Additional Resources {#resources}

- [Routine Builder](/docs/documentation/automation/admin_routine): How to add a routine using the Routine Builder
- [Routine Stage Types](/docs/documentation/automation/existing_routines): Complete list of stage types and their configuration
- [API documentation in Swagger](https://www.cotalker.com/swagger/core/?key=woubtjf4olr0t4zgutuwn6scbcm6hd3qh1cgl5obmohpbm3mfublnwcvv67lodgjvd3h86s9ppshtvmf95gepsqh6nizq9liu7f): complete with data models (schemas)
- [COTLang](/docs/documentation/automation/admin_cotlang): use COTLang for extracting data from models in routines
- [Triggers and Contexts](/docs/documentation/automation/triggers_and_contexts): more information on using data models within routines

## Help {#help}

- [Cotalker Platform Community](https://github.com/Cotalker/documentation/discussions): post your questions or search for previous answers given in the forum