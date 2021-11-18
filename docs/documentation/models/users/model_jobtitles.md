---
title: Job Titles Data Model
sidebar_label: COTJobTitle
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<span className="hero__subtitle">COTJobTitle</span>

## Description {#description}

_Job titles_ can group _users_ in "pools" and give them special attributes according to their job title. 

## JSON Sample {#json-sample}
```json
{
    "_id": "619227686e893056e8264999",
    "isActive": true,
    "allowedExtensions": [
        "6192276efd8ef0bfb1176b0a",
        "61922776ace7e2f9e5a9327a"
    ],
    "search": [
        "technical",
        "writer"
    ],
    "display": "technical writer",
    "code": "technical writer",
    "company": "6192275ef9531df898ac73b5",
    "createdAt": "2021-07-19T16:42:02.513Z",
    "modifiedAt": "2021-11-15T09:17:50.391Z"
}
```

## Fields {#fields}

| Field | Description | [Type](/docs/documentation/models/overview_model#data-types) | Notes |
| ----  | -------- | ---- | ---- |
| \_id | The job title's ID. | ObjectId<COTJobtitle\> |
| isActive | Indicates is the job title is active or not. | boolean |
| allowedExtensions | Attributes or additional fields added that will be associated with users that have the job title. | [ObjectId<COTPropertyType\>[ ]](/docs/documentation/models/databases/model_propertytypes) |
| search | System-generated search keys. | string[ ] | Do not modify.
| display | The job title's display name. | string |
| code | The job title's unique ID name | string |
| company | The company the job titles belong in. | [ObjectId<COTCompany\>](/docs/documentation/models/model_company) |
| createdAt | Date the job title was created. | ISODate | YYYY-MM-DDTHH:mm:ss.SSSZ
| modifiedAt | Indicates the last time the job title was modified. | ISODate | YYYY-MM-DDTHH:mm:ss.SSSZ

## Additional Resources {#resources}

- [Job Titles Admin Documentation](/docs/documentation/admin/admin_jobtitles): Job title settings from the administrative panel
- ["Job Titles" REST API documentation](/docs/documentation/api/users/jobtitles): basic "Job Titles" API requests
- [API documentation in Swagger](https://www.cotalker.com/swagger/core/?key=woubtjf4olr0t4zgutuwn6scbcm6hd3qh1cgl5obmohpbm3mfublnwcvv67lodgjvd3h86s9ppshtvmf95gepsqh6nizq9liu7f): complete with data models (schemas)
- [COTLang](/docs/documentation/automation/admin_cotlang): use COTLang for extracting data from models in routines
- [Triggers and Contexts](/docs/documentation/automation/triggers_and_contexts): more information on using data models within routines

## Help {#help}

- [Cotalker Platform Community](https://github.com/Cotalker/documentation/discussions): post your questions or search for previous answers given in the forum