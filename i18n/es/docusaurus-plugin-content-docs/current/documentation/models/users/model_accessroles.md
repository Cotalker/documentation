---
title: Access Roles Data Model
sidebar_label: COTAccessRole
---

:::caution Advertencia
Esta página aún no se encuentra traducida al español.
:::
import useBaseUrl from '@docusaurus/useBaseUrl';

<span className="hero__subtitle">COTAccessRole</span>


## Description {#description}
An [access role](/docs/documentation/admin/admin_accessrole) is a set of permissions that can be assigned to a [user](/docs/documentation/admin/users).
Permissions grant access to read or write in the [administrative panel](/docs/documentation/admin/admin_overview), [database](/docs/documentation/client/database), and [reports](/docs/documentation/client/reports). They can also allow access to some [surveys](/docs/documentation/admin/survey/survey_overview).

## Sample JSON {#sample}

```json
{
    "_id": "611aa34dd0f0f9fa10b52dd3",
    "active": true,
    "permissions": [
        "admin-access",
        "admin-accesscontrol-read",
        "admin-answers-read",
        "admin-groups-read"
    ],
    "name": "Tester",
    "description": "Restricted admin access",
    "company": "611aa342e9f6fe9c2c13ce72"
}
```

## Fields {#fields}

| Field | Description | [Type](/docs/documentation/models/overview_model#data-types) | Notes |
| ----  | -------- | ---- | ---- |
| _id | The access role's unique ID number | ObjectId<COTAccessRole\> | |
| active | Indicates if the access role is active or not | boolean | |
| permissions | Set of permissions available in the accessrole | string[ ] | [List of default permissions](/docs/documentation/admin/admin_accessrole#default-permissions)
| name  | Display name | string | |
| description | Discription given to the access role | string | |
| company | Company's ID number | objectID<COTCompany\> | [Company Model](/docs/documentation/models/model_company) |


## Additional Resources {#resources}

- [Access Roles Settings Panel](/docs/documentation/admin/admin_accessrole): Access Roles settings in Administrative Panel
- ["Access Role" REST API documentation](/docs/documentation/api/users/accessroles): basic "Access Roles" API requests
- [API documentation in Swagger](https://www.cotalker.com/swagger/core/?key=woubtjf4olr0t4zgutuwn6scbcm6hd3qh1cgl5obmohpbm3mfublnwcvv67lodgjvd3h86s9ppshtvmf95gepsqh6nizq9liu7f): complete with data models (schemas)
- [COTLang](/docs/documentation/automation/admin_cotlang): use COTLang for extracting data from models in routines
- [Triggers and Contexts](/docs/documentation/automation/triggers_and_contexts): more information on using data models within routines

## Help {#help}

- [Cotalker Platform Community](https://github.com/Cotalker/documentation/discussions): post your questions or search for previous answers given in the forum
