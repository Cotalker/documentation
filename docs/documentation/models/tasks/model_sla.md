---
title: SLA Data Model
sidebar_label: COTSMSLA
---
import useBaseUrl from '@docusaurus/useBaseUrl'; 
import Highlight from '@theme/Highlight';

<span className="hero__subtitle"><em>COTSMSla</em></span>
<br/>
<br/>

## Description {#description}

The COTSMSLA data model contains the settings of a [service-level agreement (SLAs)](/docs/documentation/automation/sla) within a workflow.

## JSON Sample {#json-sample}
```json
{
    "_id": "605fa3ace2170f000818ac09",
    "start": {
        "types": [],
        "states": [
            "6034ee3ceafb030009e2a0ad"
        ]
    },
    "end": {
        "types": [],
        "states": [
            "6034ee53a5dc970008680b2a",
            "6034ee62a5dc970008680c19"
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
    "stateMachine": "6034ed042719f80008d89f00",
    "taskGroup": "6034ec90eafb030009e2998d",
    "code": "reminder_00",
    "display": "Reminder",
    "pb": {  //COTParametrizedBot – Routine
        "_id": "61794f1ab51dce00073daf64",
        "stages": [
            {
                "_id": "6061d26ef3013a000816c964",
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
                "_id": "605fb534e2170f000818d863",
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
        "maxIterations": 10,
        "version": "v3"
    },
    "company": "5f5a74a8fdf77a0008a6349a",
    "createdAt": "2021-03-27T21:29:16.756Z",
    "modifiedAt": "2021-10-27T13:07:38.906Z",
    "__v": 0
}
```

## Fields {#fields}

