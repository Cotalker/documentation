---
title: Users Model
sidebar_label: Users
---

_A [__user__](/docs/documentation/admin/users) represents a person or [bot](/docs/documentation/admin/admin_bots) that can perform actions within a company's Cotalker environment and execute client-side actions such as sending messages and accessing channels. Their [access roles](/docs/documentation/admin/admin_accessrole) will determine which (administrative) endpoint they may use._

## Description {#description}

Returns the complete data of a _user_.

## Sample JSON {#sample-json}

```json
{
    "data": {
        "_id": "611421cd644dce40703f02e5",
        "name": {
            "displayName": "",
            "names": "Jane",
            "lastName": "Doe",
            "secondLastName": ""
        },
        "notifications": {
            "general": "all",
            "turnOffGroup": [],
            "turnOffChannel": [],
            "work": [
                {
                    "day": "mon",
                    "active": true,
                    "start": "00:00",
                    "end": "23:59"
                },
                {
                    "day": "tue",
                    "active": true,
                    "start": "00:00",
                    "end": "23:59"
                },
                {
                    "day": "wed",
                    "active": true,
                    "start": "00:00",
                    "end": "23:59"
                },
                {
                    "day": "thu",
                    "active": true,
                    "start": "00:00",
                    "end": "23:59"
                },
                {
                    "day": "fri",
                    "active": true,
                    "start": "00:00",
                    "end": "23:59"
                },
                {
                    "day": "sat",
                    "active": false,
                    "start": "00:00",
                    "end": "23:59"
                },
                {
                    "day": "sun",
                    "active": false,
                    "start": "00:00",
                    "end": "23:59"
                }
            ]
        },
        "devices": {
            "iphone": [],
            "android": []
        },
        "properties": [],
        "accessRoles": [
            "611421cd644dce40703f02e5",
            "611421e627bec7f78be84cb0",
            "611421ef613b523cb41fbf28"
        ],
        "permissions": [],
        "emailIsVerified": false,
        "requiredChanges": [],
        "isPhoneVerified": false,
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
        "role": "user",
        "needPasswordChange": true,
        "hierarchyLevel": "",
        "taskManager": false,
        "avatar": {
            "small": "https://cotalker-us-files.s3.amazonaws.com/certificationworld/image/v4_60c49b53bcf9fe6633d8f3f6/small/profile-jane-doe.jpeg",
            "square": "https://cotalker-us-files.s3.amazonaws.com/certificationworld/image/v4_60c49b53bcf9fe6633d8f3f6/square/profile-jane-doe.jpeg",
            "original": "https://cotalker-us-files.s3.amazonaws.com/certificationworld/image/v4_60c49b53bcf9fe6633d8f3f6/original/profile-jane-doe.jpeg"
        },
        "companies": [
            {
                "hierarchy": {
                    "boss": [],
                    "peers": [],
                    "subordinate": []
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
        "phone": "",
        "messagesUnread": [],
        "lastRequestDate": "2021-06-12T10:19:41.707Z",
        "createdAt": "2021-06-12T10:19:41.707Z",
        "modifiedAt": "2021-07-30T15:05:28.900Z",
        "badge": [],
        "profileInfo": [],
        "provider": "local",
        "extra": {},
        "job": "61142214ca7cd07784e262c1",
        "extensions": {},
        "permissionsV2": [
            "admin-users-write",
            "web-admin-read",
            "web-admin-write",
            "modify-permissions",
            "web-survey-read",
            "admin-groups-write",
            "admin-channels-write",
            "admin-bots-write",
            "admin-properties-write",
            "admin-accesscontrol-write",
            "admin-company-write",
            "admin-schedules-write",
            "admin-states-machines-write",
            "admin-surveys-write",
            "admin-*-write",
            "admin-*-read",
            "app-access",
            "report-*-write",
            "web-dashboard",
            "create-invites",
            "news-write",
            "web-access",
            "admin-tasks-write"
        ]
    }
}
```


## Elements {#elements}

| Element | Description | Type | Note |
| --- | --- | --- | --- |
| data | Top level | user data object | |
| _id | The user's ID number | string | The ID number's format is [ObjectId](/docs/getting_started/temp/glossary#ObjectId ) |
| name | User's full name | name data object | |
| displayName | | string | |
| names | User's first and second names | string | |
| lastName | User's surname | string | |
| secondLastName | User's second surname | string | |
| notifications | Notification options | notification data object | |
| general |  | string | Options: `all, none, work` |
| turnOffGroup | | array of strings | |
| turnOffChannel| | array of strings | |
| work | User's workhours during the week | array of workday data objects | |
| day | Indicates the workday | string | options: `mon, tue, wed, thu, fri, sat, sun` |
| active | Indicates if the user works on this day | boolean | |
| start | Indicates the hour the user begins their workday | string | HH:MM |
| end | Indicates the hour the user ends their workday | string | HH:MM |
| devices | The devices or platforms the user has installed | devices data object | [Consult Swagger for COTUserDeviceType](https://www.cotalker.com/swagger/core/?key=woubtjf4olr0t4zgutuwn6scbcm6hd3qh1cgl5obmohpbm3mfublnwcvv67lodgjvd3h86s9ppshtvmf95gepsqh6nizq9liu7f#:~:text=COTUserDevice-,COTUserDevicesType,-%7B) |
| properties | [Properties (elements)](/docs/documentation/client/basic_concepts#elements) assigned to the user | array of properties | [Elements Model](/docs/documentation/models/databases/model_properties) |
| accessRoles | The [access roles](/docs/documentation/admin/admin_accessrole) the user has been designated | array of access roles | [Access Roles Model](/docs/documentation/models/users/model_accessroles) |
| permissions | | array | |
| emailIsVerified | | boolean | |
| requiredChanges | | array | |
| isPhoneVerified | | boolean | |
| isActive | | boolean | |
| termsConditions | | boolean | |
| search | Search engine keywords to let other users locate them | array of keywords | |
| isOnline | | boolean | |
| role | | string | Options: `user, admin, super` |
| needPasswordChange | | boolean | |
| hierarchyLevel | | string | |
| taskManager | | boolean | |
| avatar | User's profile picture | avatar data object | Three URLs for avatar variations: `small, square, original` |
| companies | Company Cotalker workspaces the user belongs to | array of company data objects | Objects correspond to [Company Model](/docs/documentation/models/model_company) |
| hierarchy | | hierachy data object | |
| boss | | array of user IDs | |
| peers | | array of user IDs | |
| subordinate | | array of user IDs | |
| _id | | string | The ID number's format is [ObjectId](/docs/getting_started/temp/glossary#ObjectId ) |
| companyId | The company's ID number | string | The ID number's format is [ObjectId](/docs/getting_started/temp/glossary#ObjectId ) |
| email | The user's email. | string | The email cannot be changed. |
| jobTitle | The user's job title | string | DEPRECATED |
| settings | | settings data object | |
| hideSummary | | boolean | |
| hideContacts | | boolean | |
| phone | The user's registered phone number | string | |
| messagesUnread | | array | |
| lastRequestDate | | string | YYYY-MM-DDTHH:mm:ss.SSSZ |
| createdAt | | string | YYYY-MM-DDTHH:mm:ss.SSSZ |
| modifiedAt | | string | YYYY-MM-DDTHH:mm:ss.SSSZ |
| badge | | array | |
| profileInfo | | array of profile settings data object | [Consult Swagger for COTProfileInfo](https://www.cotalker.com/swagger/core/?key=woubtjf4olr0t4zgutuwn6scbcm6hd3qh1cgl5obmohpbm3mfublnwcvv67lodgjvd3h86s9ppshtvmf95gepsqh6nizq9liu7f#:~:text=%23/components/schemas/-,COTProfileInfo,COTProfileInfo,-%7B) |
| provider | | string | Only available option: `local` |
| extra | [Additional fields](/docs/documentation/admin/users#additional-fields) added to the user | additional fields data object | |
| job | ID number of the [job title](/docs/documentation/admin/admin_company#job-titles) assigned to the user | string | The ID number's format is [ObjectId](/docs/getting_started/temp/glossary#ObjectId ) |
| extensions | | data object | |
| permissionsV2 | Permissions the user has been granted | array of permissions | [List of default permissions](/docs/documentation/admin/admin_accessrole#default-permissions) |



## Resources {#swagger}

- ["Users" REST API documentation](/docs/documentation/api/users/users): basic "Users" API requests
- [API documentation in Swagger](https://www.cotalker.com/swagger/core/?key=woubtjf4olr0t4zgutuwn6scbcm6hd3qh1cgl5obmohpbm3mfublnwcvv67lodgjvd3h86s9ppshtvmf95gepsqh6nizq9liu7f): complete with data models (schemas)
- [COTLang](/docs/documentation/automation/admin_cotlang): use COTLang for extracting data from models in routines
- [Triggers and Contexts](/docs/documentation/automation/triggers_and_contexts): more information on using data models within routines

## Help {#help}

- [Cotalker Platform Community](https://github.com/Cotalker/documentation/discussions): post yours questions or search for previous answers given in the forum
