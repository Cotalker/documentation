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
    "allowedExtensions": [
        "6192276efd8ef0bfb1176b0a",
        "61922776ace7e2f9e5a9327a"
    ],
    "code": "customer_success_manager",
    "company": "6192275ef9531df898ac73b5",
    "createdAt": "2021-07-19T16:42:02.513Z",
    "display": "Customer Success Manager",
    "elements": [
        "62a2250d909b9618797ea6d6",
        "62a2251b3afd597815569449",
        "62a2251f0329e7e6677c6ae1"
    ],
    "isActive": true,
    "modifiedAt": "2021-11-15T09:17:50.391Z",
    "search": [
        "customer",
        "success",
        "manager"
    ]
}
```

## Fields {#fields}

| Field | Description | [Type](/docs/documentation/models/overview_model#data-types) | Notes |
| ----  | -------- | ---- | ---- |
| \_id | The job title's ID. | ObjectId<COTJobtitle\> |
| allowedExtensions | Attributes or additional fields added that will be associated with users that have the job title. | [ObjectId<COTPropertyType\>[ ]](/docs/documentation/models/databases/model_propertytypes) |
| code | The job title's unique ID name | string | Maximum 60 characters; only lowercase letters, numbers, and underscore allowed; must be unique.
| company | The company the job titles belong in. | [ObjectId<COTCompany\>](/docs/documentation/models/model_company) |
| createdAt | Date the job title was created. | ISODate | YYYY-MM-DDTHH:mm:ss.SSSZ
| display | The job title's display name. | string |
| elements | Array of elements (properties) shared with all users associated with the job title. | [ObjectId<COTProperty\>[ ]](/docs/documentation/models/databases/model_properties)
| isActive | Indicates is the job title is active or not. | boolean |
| modifiedAt | Indicates the last time the job title was modified. | ISODate | YYYY-MM-DDTHH:mm:ss.SSSZ
| search | System-generated search keys. | string[ ] | Do not modify.

## Additional Resources {#resources}

- [Job Titles Admin Documentation](/docs/documentation/admin/admin_jobtitles): Job title settings from the administrative panel
- ["Job Titles" REST API documentation](/docs/documentation/api/users/jobtitles): basic "Job Titles" API requests
- [API documentation in Swagger](https://www.cotalker.com/swagger/core/?key=woubtjf4olr0t4zgutuwn6scbcm6hd3qh1cgl5obmohpbm3mfublnwcvv67lodgjvd3h86s9ppshtvmf95gepsqh6nizq9liu7f): complete with data models (schemas)
- [COTLang](/docs/documentation/automation/admin_cotlang): use COTLang for extracting data from models in routines
- [Triggers and Contexts](/docs/documentation/automation/triggers_and_contexts): more information on using data models within routines

## Help {#help}

- [Cotalker Platform Community](https://github.com/Cotalker/documentation/discussions): post your questions or search for previous answers given in the forum