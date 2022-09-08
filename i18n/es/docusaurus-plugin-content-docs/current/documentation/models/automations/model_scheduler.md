---
title: Schedules Data Model
sidebar_label: COTSchedule
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<span className="hero__subtitle"><em>COTSchedule</em></span>
<br/>

## Description {#description}
The [Scheduler](/docs/documentation/admin/admin_scheduler) creates _schedules_ or automated _scheduled routines_, and their settings are stored in the _COTSchedule_ data model.  Scheduled routines can be programmed to run once or recurrently. For example, you can check if everybody has completed their tasks at the end of each week.

## JSON Sample {#json-sample}
```json
        {
            "_id": "618a808163a6cf3425f886cd",  //ObjectId<COTSchedule>
            "body": {  //COTParametrizedBot
                "start": "send_message",
                "maxIterations": 1,
                "stages": [
                    {
                        "key": "send_message",
                        "name": "PBMessage",
                        "data": {
                            "content": "Hi, team! This a recurrent message sent to the channel every Monday at 10:00 AM.",
                            "contentType": "text/plain",
                            "sentBy": "618a808634a3abddd5f71385",  //ObjectId<COTUser>
                            "channelIds": [
                                "618a80a4c004dced3105ecfe"  //ObjectId<COTChannel>
                            ]
                        },
                        "customNetworkRequest": [],
                        "next": {
                            "DEFAULT": ""
                        }
                    }
                ],
                "version": "v2"
            },
            "code": "remember_producto",
            "company": "618a807795079af3748ba9cb",  //ObjectId<COTCompany>
            "createdAt": "2020-04-01T19:44:15.439Z",
            "cron": "0 10 * * 1",
            "cronTimeZone": "America/Santiago",
            "endDate": null,
            "hooks": [],
            "isSystem": false,
            "killMeTime": null,
            "modifiedAt": "2021-11-01T13:00:00.161Z",
            "owner": "AdminSchedules",
            "runVersion": "v2",
            "startedAt": "2020-08-23T07:13:14.441Z",
            "status": "idle",
            "time": "2020-04-06T11:00:00.000Z",
            "timeoutMinutes": 60,
            "user": "618a808634a3abddd5f71385",  //ObjectId<COTUser>
        }
```

## Fields {#fields}

| Field | Description | [Type](/docs/documentation/models/overview_model#data-types) | Note |
| --- | --- | --- | --- |
| **\_id** | System generated scheduler ID. | ObjectId<COTSchedule\>
| **body** | Contains the scheduled routine. | [COTParametrizedBot](/docs/documentation/models/automations/model_parametrizedbot) | 
| **code** | The _schedule's_ name code. | Maximum 60 characters; only lowercase letters, numbers, and underscores allowed; must be unique.
| **company** | The ID of the company the schedule is found in. | [ObjectId<COTCompany\>](/docs/documentation/models/company/model_company) | 
| **createdAt** | Indicates the date the scheduled routine was created. | ISODate | YYYY-MM-DDTHH:mm:ss.SSSZ
| **cron** | Scheduled routine recurrence indicated in _cron_ format, e.g., `00 30 08 * * 1,4,5` | string | Cron format : <br/>Seconds: 0-59<br/>Minutes: 0-59<br/>Hours: 0-23<br/>Day of Month: 1-31<br/>Months: 0-11 (Jan-Dec)<br/>Day of Week: 0-6 (Sun-Sat)
| **cronTimeZone** | Indicates the time zone using _TZ database name_. | string | Default: `America/Santiago`
| **endDate** | Indicates the end date of the scheduled routine. | ISODate | YYYY-MM-DDTHH:mm:ss.SSSZ
| **hooks** | Makes an API request when triggered by an event. | object[ ] |
| **hooks[index].event** | Indicates the type of event. | string | Enum: ["on-error", "on-success", "on-finish", "on-start"]
| **hooks[index].api** | Indicates the source type of the API request. | string | Enum: ["cotalker", "url"]
| **hooks[index].url** | Indicates the API URL path. | string |
| **isSystem** | If true, the scheduled routine cannot be changed, even by admins. | boolean |
| **killMeTime** | Indicates execution time deadline. Depends on `timeoutMinutes`. | ISODate | WIP
| **modifiedAt** | Indicates the last time the scheduled routine was modified.| ISODate | YYYY-MM-DDTHH:mm:ss.SSSZ
| **owner** | Specifies ownership. | string | Default: `AdminSchedules`
| **runVersion** | Indicates the scheduler's version. | string | Default: `v2`
| **startedAt** | Time when the routine first ran. | ISODate | YYYY-MM-DDTHH:mm:ss.SSSZ
| **status** | Indicates the scheduled automation's status. | string | Enum: ["pending", "done", "running", "canceled", "error"]
| **time** | Indicates the start date of the scheduled routine. | ISODate | YYYY-MM-DDTHH:mm:ss.SSSZ
| **timeoutMinutes** | Number of minutes before timeout. | number |
| **user** | The ID of the user that created the scheduled routine. | [ObjectId<COTUser\>](/docs/documentation/models/users/model_users) | 


## Deprecated {#deprecated}
| Field | Description | [Type](/docs/documentation/models/overview_model#data-types) | Note |
| --- | --- | --- | --- |
| **execPath** | Default:<br/>`./../scripts/parametrizedBots/pb.controller.js` | string | DEPRECATED
| **__v** | Version number. | number | DEPRECATED


## Additional Resources {#resources}

- [Scheduler Section](/docs/documentation/admin/admin_scheduler): Scheduler administrative panel settings
- [Create a Scheduled Routine Tutorial](/docs/tutorials/intermediate/tutorial_scheduler): Tutorial on how to create a scheduled routine
- [API documentation in Swagger](https://www.cotalker.com/swagger/core/?key=woubtjf4olr0t4zgutuwn6scbcm6hd3qh1cgl5obmohpbm3mfublnwcvv67lodgjvd3h86s9ppshtvmf95gepsqh6nizq9liu7f): complete with data models (schemas)
- [COTLang](/docs/documentation/automation/cotlang/admin_cotlang): use COTLang for extracting data from models in routines
- [Triggers and Contexts](/docs/documentation/automation/cotlang/triggers_and_contexts): more information on using data models within routines

## Help {#help}

- [Cotalker Platform Community](https://github.com/Cotalker/documentation/discussions): post your questions or search for previous answers given in the forum

