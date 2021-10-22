---
title: Tasks Data Model
sidebar_label: COTTask
---
import useBaseUrl from '@docusaurus/useBaseUrl';

:::caution WIP
Please check the [API](https://www.cotalker.com/swagger/core/?key=woubtjf4olr0t4zgutuwn6scbcm6hd3qh1cgl5obmohpbm3mfublnwcvv67lodgjvd3h86s9ppshtvmf95gepsqh6nizq9liu7f) docs for the full model.
:::

A task is the representation of an asset and its state.

## Description {#description}


## JSON Sample {#json-sample}

```json
{
    "_id": "60d382fb605133307c558b97",
    "public": {
        "isActive": false,
        "language": "english",
        "title": "",
        "response": ""
    },
    "answers": [
        "60d382868a3d67dfa2d811b7",
        "60fec6c61e80193a8ceec05f",
        "60ffe3be8a3d67dfa260a7e8"
    ],
    "indentation": 0,
    "isActive": true,
    "isValid": false,
    "activeSlas": [],
    "validators": [],
    "editors": [
        "60c48a3db79c0f000867dfa2",
        "60271e80e0e5be0008193a8c",
        "602d17ffff65030008c937f4"
    ],
    "followers": [],
    "visibility": [
        "602fda1c2032cb0008b937e1"
    ],
    "userList": [
        "60c48a3db79c0f000867dfa2",
        "60271e80e0e5be0008193a8c",
        "602d17ffff65030008c937f4",
        "602fda1c2032cb0008b937e1"
    ],
    "color": "none",
    "formMessage": [],
    "language": "english",
    "name": " Sales Report",
    "relativeWeight": 1,
    "assignee": "602fda1c2032cb0008b937e1",
    "status1": "5fbd250588b0c00008c7577d",
    "status2": "6006d7ff3d588c0008cc207f",
    "info": "Elaborate and distribute this month's sales report.",
    "createdBy": "6046c66ce8068800084fc70c",
    "company": "5f5a74a8fdf77a0008a6349a",
    "taskGroup": "6034ec90eafb030009e2998d",
    "owner": "manual",
    "weight": 0,
    "projectCode": "60d382fbd5f06600095531c9",
    "createdAt": "2021-06-23T18:52:43.650Z",
    "status": "5fbd249288b0c00008c74c0c",
    "smState": "6034ee295a63b70008afd365",
    "smStateMachine": "6034ed042719f80008d89f00",
    "modifiedStateAt": "2021-09-21T18:25:56.787Z",
    "closedAt": null,
    "asset": "5fbd245abc66360009cdb7fb",
    "channel": "60d382fbd5f06600095531c8",
    "serial": 28,
    "modifiedAt": "2021-10-07T10:33:34.350Z",
    "__v": 9,
    "endDate": "2021-08-31T04:00:00.000Z",
    "estimatedTime": 5,
    "startDate": "2021-07-01T04:00:00.000Z",
    "status3": null,
    "status4": null,
    "status5": null,
    "image": {
        "small": "https://cotalker-us-files.s3.amazonaws.com/certificationworld/image/v4_60e373bdbcf9fe7f09d9014f/small/update-multiplechoice-subproperty.png",
        "square": "https://cotalker-us-files.s3.amazonaws.com/certificationworld/image/v4_60e373bdbcf9fe7f09d9014f/square/update-multiplechoice-subproperty.png",
        "original": "https://cotalker-us-files.s3.amazonaws.com/certificationworld/image/v4_60e373bdbcf9fe7f09d9014f/original/update-multiplechoice-subproperty.png"
    },
    "extensions": {}
}
```

## Model {#model}

| Field | Description | [Type](/docs/documentation/models/overview_model#data-types) | Note |
| --- | --- | --- | --- |
| _id   | id   | Unique Identifier   | Unique. Exactly 24 chars. Valid chars [0-9a-f] |
| name | string | Name of task | 
| assignee | id | Task Assignee | 
| status | id | Current State Property |
| status1 | id | State Property |
| status2 | id | State Property |
| status3 | id | State Property |
| status4 | id | State Property |
| status5 | id | State Property |
| asset | id | Task asset representation |  
| modifiedAt | date | Last modification date
| createdAt | date | Entry creation date



