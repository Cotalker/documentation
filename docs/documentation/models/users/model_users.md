---
title: Users Data Model
sidebar_label: COTUser
---

<span className="hero__subtitle">COTUser</span>


## Description {#description}

A [__user__](/docs/documentation/admin/users) represents a person or [bot](/docs/documentation/admin/admin_bots) that can perform actions within a company's Cotalker environment and execute client-side actions such as sending messages and accessing channels. Their [access roles](/docs/documentation/admin/admin_accessrole) will determine which (administrative) endpoint they may use.

## Sample JSON {#sample-json}

```json
{
    "_id": "611421cd644dce40703f02e5",
    "name": {
        "displayName": "",
        "names": "Jane",
        "lastName": "Doe",
        "secondLastName": ""
    },
    "properties": [
        "611a7d2f174df70491261623",
        "611a7d54f13f3d03e631f990"
    ],
    "accessRoles": [
        "611421cd644dce40703f02e5",
        "611421e627bec7f78be84cb0",
        "611421ef613b523cb41fbf28"
    ],
    "isActive": true,
    "termsConditions": true,
    "search": [
        "jane",
        "doe",
        "tester",
        "company",
        "com",
        "janecompanycom"
    ],
    "isOnline": false,
    "avatar": {
        "small": "https://cotalker-us-files.s3.amazonaws.com/certificationworld/image/v4_611421cd644dce40703f02e5/small/profile-jane-doe.jpeg",
        "square": "https://cotalker-us-files.s3.amazonaws.com/certificationworld/image/v4_611421cd644dce40703f02e5/square/profile-jane-doe.jpeg",
        "original": "https://cotalker-us-files.s3.amazonaws.com/certificationworld/image/v4_611421cd644dce40703f02e5/original/profile-jane-doe.jpeg"
    },
    "companies": [
        {
            "hierarchy": {
                "boss": ["611a9211cb6c51cec3ebf018"],
                "peers": ["611a92411d1ecb35d8c21fbc", "611a9251de115d3d72041b24"],
                "subordinate": ["611a92639477c85297135de6", "611a92738822372137e26c70"]
            },
            "_id": "611422012f7c43ed7097a2d8",
            "companyId": "6114220950eea66250fb3727"
        }
    ],
    "email": "jane@company.com",
    "jobTitle": "technical writer",
    "settings": {
        "hideSummary": false,
        "hideContacts": false
    },
    "phone": "2018653676",
    "lastRequestDate": "2021-06-12T10:19:41.707Z",
    "createdAt": "2021-06-12T10:19:41.707Z",
    "modifiedAt": "2021-07-30T15:05:28.900Z",
    "job": "61142214ca7cd07784e262c1",
    "extensions": {
            "birthdays_00": {
                "birthdate_00": "1985-06-01T04:00:00.000Z"
            }
        },
    "permissionsV2": [
        "admin-groups-write",
        "admin-channels-write",
        "admin-bots-write",
        "admin-properties-write",
        "admin-access"
    ]
}
```


## Fields {#fields}

| Field | Description | [Type](/docs/documentation/models/overview_model#data-types) | Note |
| --- | --- | --- | --- |
| _id | The user's ID number | ObjectId<COTUser\> | |
| accessRoles | The [access roles](/docs/documentation/admin/admin_accessrole) the user has been designated | ObjectID<COTAccessRole\>[ ] | [Access Roles Model](/docs/documentation/models/users/model_accessroles) |
| avatar | User's profile picture | object | |
| avatar.small | Small profile picture | string | URL |
| avatar.square | Square profile picture | string | URL |
| avatar.original | Original profile picture | string | URL |
| companies | Company Cotalker workspaces the user belongs to | object[ ] | |
| companies[index].hierarchy | | object | |
| companies[index].hierarchy.boss | The ID number of the user's boss | ObjectId<COTUser\>[ ] | |
| companies[index].hierarchy.peers | The ID number of the user's peers | ObjectId<COTUser\>[ ] | |
| companies[index].hierarchy.subordinate | The ID number of the user's subordinates | ObjectId<COTUser\>[ ] | |
| companies[index]._id | Internal system ID. | ObjectId | Ignore this field. |
| companies[index].companyId | The company's ID number | ObjectId<COTCompany\> | [Company Model](/docs/documentation/models/model_company) |
| createdAt | The date the _user_ was created | ISODate | YYYY-MM-DDTHH:mm:ss.SSSZ |
| email | The user's email. | string | The email cannot be changed. |
| extensions | Collections used to store user information | object | [Additional fields](/docs/documentation/admin/users#additional-fields) |
| isActive | Indicates if the user is still active or if it has been deactivated | boolean | |
| isOnline | | boolean | |
| job | ObjectId of the [job title](/docs/documentation/admin/admin_jobtitles) assigned to the user | ObjectId<COTJobTitles\> | [Job Title Data Model](/docs/documentation/models/users/model_jobtitles) |
| jobTitle | The user's job title | string | |
| lastRequestDate | | ISODate | YYYY-MM-DDTHH:mm:ss.SSSZ |
| modifiedAt | Last time the user's data was modified | ISODate | YYYY-MM-DDTHH:mm:ss.SSSZ |
| name | User's full name | object | |
| name.displayName | | string | |
| name.names | User's first and second names | string | |
| name.lastName | User's surname | string | |
| name.secondLastName | User's second surname | string | |
| permissionsV2 | Permissions the user has been granted | string[ ] | [List of default permissions](/docs/documentation/admin/admin_accessrole#default-permissions) |
| phone | The user's registered phone number | string | |
| properties | [Properties (elements)](/docs/documentation/client/basic_concepts#elements) assigned to the user | ObjectID<COTProperty\>[ ] | [Property(Elements) Model](/docs/documentation/models/databases/model_properties) |
| search | Search engine keywords to let other users locate them | string[ ] | Automatically created |
| settings | | object | |
| settings.hideSummary | | boolean | |
| settings.hideContacts | | boolean | |
| termsConditions | Displays the company's terms of conditions to new users | boolean | |

## Deprecated Fields {#deprecated}
_The following deprecated items might still be found in the model:_

| Field | Description | [Type](/docs/documentation/models/overview_model#data-types) | Note |
| --- | --- | --- | --- |
| badge | | string[ ] | DEPRECATED |
| devices | The devices or platforms the user has installed | DevicesModel | DEPRECATED |
| emailIsVerified | | boolean | DEPRECATED |
| extra | Additional attributes; Additional fields (_user.extensions_) takes its place | object | DEPRECATED |
| hierarchyLevel | | string | DEPRECATED |
| isPhoneVerified | | boolean | DEPRECATED |
| messagesUnread | | string[ ] | DEPRECATED |
| needPasswordChange | | boolean | DEPRECATED |
| notifications | Notification options | NotificationModel | DEPRECATED |
| notifications.general | Options: `all, none, work` | string | DEPRECATED |
| notifications.turnOffGroup | | strings[ ] | DEPRECATED |
| notifications.turnOffChannel| | strings[ ] | DEPRECATED |
| notifications.work | User's workhours during the week | UserWorkModel[ ] | DEPRECATED |
| notifications.work[index].day | Indicates the workday `mon, tue, wed, thu, fri, sat, sun` | string | DEPRECATED |
| notifications.work[index].active | Indicates if the user works on this day | boolean | DEPRECATED |
| notifications.work[index].start | Indicates the hour the user begins their workday | string (HH:MM) | DEPRECATED |
| notifications.work[index].end | Indicates the hour the user ends their workday | string (HH:MM | DEPRECATED |
| permissions | | string[ ] | DEPRECATED |
| profileInfo | | ProfileSettingsModel | DEPRECATED |
| provider | | string | DEPRECATED |
| requiredChanges | | string[ ] | DEPRECATED |
| role | Options: `user, admin, super` | string | DEPRECATED |
| taskManager | | boolean | DEPRECATED |

## Additional Resources {#resources}

- ["Users" REST API documentation](/docs/documentation/api/users/users): basic "Users" API requests
- [API documentation in Swagger](https://www.cotalker.com/swagger/core/?key=woubtjf4olr0t4zgutuwn6scbcm6hd3qh1cgl5obmohpbm3mfublnwcvv67lodgjvd3h86s9ppshtvmf95gepsqh6nizq9liu7f): complete with data models (schemas)
- [COTLang](/docs/documentation/automation/admin_cotlang): use COTLang for extracting data from models in routines
- [Triggers and Contexts](/docs/documentation/automation/triggers_and_contexts): more information on using data models within routines

## Help {#help}

- [Cotalker Platform Community](https://github.com/Cotalker/documentation/discussions): post your questions or search for previous answers given in the forum

