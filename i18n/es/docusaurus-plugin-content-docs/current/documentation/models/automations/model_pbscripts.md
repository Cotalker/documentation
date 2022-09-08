---
title: Parametrized Bot Scripts Data Model
sidebar_label: COTPBScript
---
import useBaseUrl from '@docusaurus/useBaseUrl'; 
import Highlight from '@theme/Highlight';

<span className="hero__subtitle"><em>COTPBScript</em></span>
<br/>

## Description {#description}

[Parametrized Bot Scripts (PBScripts) are routines](/docs/documentation/admin/routines/) that can be created and saved for later use as a stage in any [routine builder](/docs/documentation/automation/admin_routine).

## JSON Sample {#json-sample}
```json
{
    "_id": "618a8c46d64cf5d6c0a9139a",
    "code": "iterate2",
    "company": "618a8c3c346c88bfa0a2081e",
    "createdAt": "2021-09-30T00:29:14.800Z",
    "documentation": {
        "key": "iterate2",
        "type": "flowcontrol",
        "display": "Iterate2",
        "description": "Iterate over an Array",
        "dataType": [
            {
                "key": "control",
                "display": "Array",
                "description": "Array in which iterations will be performed",
                "required": true,
                "type": "array"
            },
            {
                "key": "target",
                "display": "Key",
                "description": "Name of the variable under which the current iteration value will be available",
                "required": true,
                "type": "string"
            },
            {
                "key": "true_false",
                "display": "true or false",
                "description": "",
                "required": false,
                "type": "boolean"
            }
        ],
        "nextType": [
            {
                "key": "SUCCESS",
                "display": "Stage to execute when the operation is successful",
                "description": "Stage to execute when the operation is successful",
                "context": "normal"
            },
            {
                "key": "ERROR",
                "display": "Stage to execute when the operation has error",
                "description": "Stage to execute when the operation has error",
                "context": "normal"
            }
        ]
    },
    "isActive": true,
    "modifiedAt": "2021-09-30T00:29:14.804Z",
    "parametrizedBot": {
        "default": {
            "stages": []
        },
        "start": "use_fceach",
        "maxIterations": 100,
        "stages": [
            {
                "next": {
                    "STEP": "",
                    "DONE": ""
                },
                "key": "use_fceach",
                "name": "FCEach",
                "data": {},
                "customNetworkRequest": []
            }
        ],
        "version": "v3"
    }
}
```

## Fields {#fields}

| Field | Description | [Type](/docs/documentation/models/overview_model#data-types) | Note |
| --- | --- | --- | --- |
| **code** | The routine's unique code name. | string | Maximum 60 characters; only lowercase letters, numbers, and underscores allowed; must be unique.
| **company** | The ID of the company the routine is found in. | [ObjectID<COTCompany\>](/docs/documentation/models/company/model_company) |
| **createdAt** | The date the routine was created. | ISODate | YYYY-MM-DDTHH:mm:ss.SSSZ
| **documentation** | Contains the structure and descriptions of the various fields used to set up the routine.  | object | WIP
| **isActive** | Indicates if the routine is active or not. | boolean |
| **modifiedAt** | Indicates the last time the routine was modified. | ISODate | YYYY-MM-DDTHH:mm:ss.SSSZ
| **parametrizedBot** | Contains the routine stages. | [COTParametrizedBot](/docs/documentation/models/automations/model_parametrizedbot) |

## Additional Resources {#resources}

- [Routines Section](/docs/documentation/admin/routines/): Routines administrative panel settings
- [API documentation in Swagger](https://www.cotalker.com/swagger/core/?key=woubtjf4olr0t4zgutuwn6scbcm6hd3qh1cgl5obmohpbm3mfublnwcvv67lodgjvd3h86s9ppshtvmf95gepsqh6nizq9liu7f): complete with data models (schemas)
- [COTLang](/docs/documentation/automation/cotlang/admin_cotlang): use COTLang for extracting data from models in routines
- [Triggers and Contexts](/docs/documentation/automation/cotlang/triggers_and_contexts): more information on using data models within routines

## Help {#help}

- [Cotalker Platform Community](https://github.com/Cotalker/documentation/discussions): post your questions or search for previous answers given in the forum

