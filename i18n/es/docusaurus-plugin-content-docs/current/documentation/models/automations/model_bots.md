---
title: Bots Data Model
sidebar_label: COTBot
---

:::caution Advertencia
Esta página aún no se encuentra traducida al español.
:::
import useBaseUrl from '@docusaurus/useBaseUrl'; 

<span className="hero__subtitle"><em>COTBot</em></span>
<br/>

## Description {#description}

[_Bots_](/docs/documentation/admin/admin_bots) initialize _routines_ and can be triggered either through a _survey_ or _slash command_. The _COTBot_ data model contains the bot's settings and corresponding [_parametrized bot (routine stages)_](/docs/documentation/models/automations/model_parametrizedbot).


## JSON Sample {#json-sample}
```json
    {
        "_id": "618a69512c7cae88b3aa2fe3",  //ObjectId<COTBot>
        "commands": [
            {
                "_id": "618a695a6359f4e3aef2f5a8",  //Command ObjectId
                "isActive": true,
                "isSlash": true,
                "isSurvey": false,
                "slashCmd": "sendemail",
                "surveyIds": []
            }
        ],
        "company": "618a696218446b289ab7b847",  //ObjectId<COTCompany>
        "createdAt": "2021-05-12T18:24:20.405Z",
        "description": "Send an automated email",
        "global": true,
        "isActive": true,
        "name": "Send Email",
        "parametrizedBot": {  //COTParametrizedBot
            "maxIterations": 2,
            "stages": [
                {
                    "_id": "618a6968eec811dbba542170",  //Routine stage objectId
                    "key": "email",
                    "name": "PBEmail",
                    "version": null,
                    "data": {
                        "subject": "Hey! We need to talk to you.",
                        "content": {
                            "recipientName": "",
                            "recipientEmail": "",
                            "companyName": "ACME",
                            "title": [
                                "Your team is looking for you."
                            ],
                            "action": "",
                            "code": "",
                            "messageA": "$JOIN# #Your presence is requested in the #($VALUE#channel|nameDisplay)# channel.",
                            "messageB": ""
                        },
                        "targets": [
                            "$VALUE#cmdArgs"
                        ]
                    },
                    "next": {
                        "DEFAULT": "message"
                    },
                    "customNetworkRequest": []
                },
                {
                    "_id": "618a6974b4b9f668deab7b3e",  //Routine stage objectId
                    "key": "message",
                    "name": "PBMessage",
                    "data": {
                        "content": "📩 Email sent ✅",
                        "contentType": "text/system",
                        "sentBy": "$VALUE#user|_id",
                        "channelIds": "$VALUE#channel|_id"
                    },
                    "next": {},
                    "customNetworkRequest": []
                }
            ],
            "start": "email",
            "version": "v3"
        },
        "version": 3
    }
```

## Fields {#fields}
| Field | Description | [Type](/docs/documentation/models/overview_model#data-types) | Note |
| --- | --- | --- | --- |
| **\_id** | System generated bot ID. | ObjectId<COTBot\> |
| **commands** | Bot trigger settings. | object[ ] |
| **commands[index].\_id** | System generated _command_ object ID. | ObjectId |
| **commands[index].isActive** | | boolean | if false, setting will not be used.
| **commands[index].isSlash** | Indicates if the bot is triggered by a slash command or not. | boolean |
| **commands[index].isSurvey** | Indicates if the bot is triggered by a survey or not. | boolean | 
| **commands[index].slashCmd** | Indicates the string that, along with a preceeding slash, triggers the bot, e.g., `/string`. | string | `isSlash` must be `true`.
| **commands[index].surveyIds** | Points to the surveys that trigger that bot. | [ObjectId<COTSurvey\>[ ](/docs/documentation/models/surveys/model_surveys)] | `isSurvey` must be `true`.
| **company** | The ID of the company the bot is found in. | [ObjectId<COTCompany\>](/docs/documentation/models/model_company) |
| **createdAt** | Indicates when the bot was created. | ISODate | YYYY-MM-DDTHH:mm:ss.SSSZ
| **description** | A brief description of what the bot does. | string |
| **global** | Indicates if the bot is available globally, i.e., in all the channels of the company. | boolean |
| **isActive** | Indicates if the bot is active or not. | boolean |
| **modifiedAt** | Indicates the last time the property's configuration was modified. | ISODate | YYYY-MM-DDTHH:mm:ss.SSSZ
| **name** | | string |
| **parametrizedBot** | Contains the routine that is set off by the bot. | [COTParametrizedBot](/docs/documentation/models/automations/model_parametrizedbot) |
| **version** | Indicates the current version of the bot tool. | number | The `version` should be set at `3`.

## Deprecated {#deprecated}
| Field | Description | [Type](/docs/documentation/models/overview_model#data-types) | Note |
| --- | --- | --- | --- |
| **__v** | System generated version. | DEPRECATED
| **commands[index].showHelp** | | boolean | DEPRECATED
| **commands[index].description** | | string | DEPRECATED
| **commands[index].arguments** | | [ ] | DEPRECATED
| **extraData** | | string[ ] | DEPRECATED
| **process** | | string | DEPRECATED


## Additional Resources {#resources}

- [Bot Section](/docs/documentation/admin/admin_bots): Bot administrative panel settings
- [Create a Bot Tutorial](/docs/tutorials/basic/create_bot): Tutorial on how to create a bot
- [API documentation in Swagger](https://www.cotalker.com/swagger/core/?key=woubtjf4olr0t4zgutuwn6scbcm6hd3qh1cgl5obmohpbm3mfublnwcvv67lodgjvd3h86s9ppshtvmf95gepsqh6nizq9liu7f): complete with data models (schemas)
- [COTLang](/docs/documentation/automation/admin_cotlang): use COTLang for extracting data from models in routines
- [Triggers and Contexts](/docs/documentation/automation/triggers_and_contexts): more information on using data models within routines

## Help {#help}

- [Cotalker Platform Community](https://github.com/Cotalker/documentation/discussions): post your questions or search for previous answers given in the forum
