---
title: Users Model
sidebar_label: Users
---

<span className="hero__subtitle">COTUser</span>

_A [__user__](/docs/documentation/admin/users) represents a person or [bot](/docs/documentation/admin/admin_bots) that can perform actions within a company's Cotalker environment and execute client-side actions such as sending messages and accessing channels. Their [access roles](/docs/documentation/admin/admin_accessrole) will determine which (administrative) endpoint they may use._

## Description {#description}

Returns the complete data of a _user_.

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
```


## Elements {#elements}

| Element | Description | [Type](/docs/documentation/models/overview_model#data-types) | Note |
| --- | --- | --- | --- |
| _id | The user's ID number | ObjectId<COTUser\> | |
| name | User's full name | UserNameModel | |
| name.displayName | | string | |
| name.names | User's first and second names | string | |
| name.lastName | User's surname | string | |
| name.secondLastName | User's second surname | string | |
| notifications | Notification options | NotificationModel | DEPRECATED |
| notifications.general | Options: `all, none, work` | string | DEPRECATED |
| notifications.turnOffGroup | | strings[ ] | DEPRECATED |
| notifications.turnOffChannel| | strings[ ] | DEPRECATED |
| notifications.work | User's workhours during the week | UserWorkModel[ ] | DEPRECATED |
| notifications.work.day | Indicates the workday `mon, tue, wed, thu, fri, sat, sun` | string | DEPRECATED |
| notifications.work.active | Indicates if the user works on this day | boolean | DEPRECATED |
| notifications.work.start | Indicates the hour the user begins their workday | string (HH:MM) | DEPRECATED |
| notifications.work.end | Indicates the hour the user ends their workday | string (HH:MM | DEPRECATED |
| devices | The devices or platforms the user has installed | DevicesModel | DEPRECATED |
| properties | [Properties (elements)](/docs/documentation/client/basic_concepts#elements) assigned to the user | ObjectID<COTProperty\>[ ] | [Property(Elements) Model](/docs/documentation/models/databases/model_properties) |
| accessRoles | The [access roles](/docs/documentation/admin/admin_accessrole) the user has been designated | ObjectID<COTAccessRole\>[ ] | [Access Roles Model](/docs/documentation/models/users/model_accessroles) |
| permissions | | string[ ] | |
| emailIsVerified | | boolean | DEPRECATED |
| requiredChanges | | string[ ] | DEPRECATED |
| isPhoneVerified | | boolean | DEPRECATED |
| isActive | | boolean | |
| termsConditions | | boolean | |
| search | Search engine keywords to let other users locate them | string[ ] | |
| isOnline | | boolean | |
| role | Options: `user, admin, super` | string | DEPRECATED |
| needPasswordChange | | boolean | DEPRECATED |
| hierarchyLevel | | string | DEPRECATED |
| taskManager | | boolean | DEPRECATED |
| avatar | User's profile picture | UserAvatarModel | |
| avatar.small | Small profile picture | string | URL |
| avatar.square | Square profile picture | string | URL |
| avatar.original | Original profile picture | string | URL |
| companies | Company Cotalker workspaces the user belongs to | UserCompanyModel[ ] | |
| companies.hierarchy | | hierachy data object | |
| companies.hierarchy.boss | | ObjectId<COTUser\>[ ] | |
| companies.hierarchy.peers | | ObjectId<COTUser\>[ ] | |
| companies.hierarchy.subordinate | | ObjectId<COTUser\>[ ] | |
| companies._id | | ObjectId<UserCompany\> | |
| companies.companyId | The company's ID number | ObjectId<COTCompany\> | [Company Model](/docs/documentation/models/model_company) |
| email | The user's email. | string | The email cannot be changed. |
| jobTitle | The user's job title | string | DEPRECATED |
| settings | | UserSettingsModel | |
| settings.hideSummary | | boolean | |
| settings.hideContacts | | boolean | |
| phone | The user's registered phone number | string | |
| messagesUnread | | string[ ] | DEPRECATED |
| lastRequestDate | | ISODate | YYYY-MM-DDTHH:mm:ss.SSSZ |
| createdAt | The date the _user_ was created | ISODate | YYYY-MM-DDTHH:mm:ss.SSSZ |
| modifiedAt | Last time the user's data was modified | ISODate | YYYY-MM-DDTHH:mm:ss.SSSZ |
| badge | | string[ ] | DEPRECATED |
| profileInfo | | ProfileSettingsModel | DEPRECATED |
| provider | | string | DEPRECATED |
| extra | [Additional fields](/docs/documentation/admin/users#additional-fields) added to the user | UserAdditionalFieldsModel | |
| job | ID number of the [job title](/docs/documentation/admin/admin_company#job-titles) assigned to the user | ObjectId<COTJobTitles\> | |
| extensions | | UserExtensionModel | |
| permissionsV2 | Permissions the user has been granted | string[ ] | [List of default permissions](/docs/documentation/admin/admin_accessrole#default-permissions) |



## Additional Resources {#resources}

- ["Users" REST API documentation](/docs/documentation/api/users/users): basic "Users" API requests
- [API documentation in Swagger](https://www.cotalker.com/swagger/core/?key=woubtjf4olr0t4zgutuwn6scbcm6hd3qh1cgl5obmohpbm3mfublnwcvv67lodgjvd3h86s9ppshtvmf95gepsqh6nizq9liu7f): complete with data models (schemas)
- [COTLang](/docs/documentation/automation/admin_cotlang): use COTLang for extracting data from models in routines
- [Triggers and Contexts](/docs/documentation/automation/triggers_and_contexts): more information on using data models within routines

## Help {#help}

- [Cotalker Platform Community](https://github.com/Cotalker/documentation/discussions): post yours questions or search for previous answers given in the forum
