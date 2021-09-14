---
title: Companies Data Model
sidebar_label: COTCompany
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<span className="hero__subtitle">COTCompany</span>

## Description

The _Companies_ Data Model (COTCompany) is the underlying configuration for the platform. Most data models are associated with it. It contains basic company information, such as name, tax identification number, and country. It also establishes platform display settings such as language, icon display, initial groups, and much more.

## JSON Sample {#json-sample}

```json
{
    "__v" : 14,
    "_id" : "6136968b580aaf2b0e49d844",
    "admin" : [ 
        "6136969432d0379f7490cdf3"
    ],
    "appContacts" : true,
    "contactMode" : "default",
    "createdAt" : "2018-10-19T15:06:35.726Z",
    "defaultCountry" : "US",
    "defaultLanguage" : "en",
    "displayName" : "ACME",
    "emailDomains" : [ 
        "cotalker.com"
    ],
    "help" : "6136969de063469044d87926",
    "hideSummary": false,
    "isActive" : true,
    "legalName" : "ACME INC.",
    "legalIdentifierCode": "EIN",
    "legalIdentifier": "123-45-6789",
    "modifiedAt" : "2021-08-20T19:35:11.648Z",
    "offline" : {
        "isActive" : false,
        "maxSyncTimeMs" : 0
    },
    "permissions" : {
        "receiveNotifications" : true,
        "readLocation" : true,
        "showTos" : {
            "value" : true
        }
    },
    "subdomain" : "acme",
    "system" : "613696a4a43cf12cb25c7de5"
}
```

## Fields {#fields}

| Field | Type | Description | Notes |
| ----  | ---- | ----------- | ----  |
|  \_id | System generated company ID number. | ObjectId<COTCompany\> | Only lowercase letters are accepted. |
| admin | List of admin users' ID number | ObjectId<COTUser\>[ ] | [User Data Model](/docs/documentation/models/users/model_users) |
| appContacts | Displays contact button in the main menu bar | boolean | [View Main Menu Bar](/docs/documentation/client/main_menu) |
| contactMode | This option will limit users' ability to see other users in their contact lists and other places, like surveys where user lists are used as options for answering survey questions. | string | Valid options are:`default` and `local` (allows users to view only contacts in their current channels); `all` (permits viewing all company users) |
| createdAt | Creation date | ISODate | YYYY-MM-DDTHH:mm:ss.SSSZ |
| displayName | Company Name as viewed by users | string | |
| defaultCountry | Country where the company resides. | string | Use ISO 3166-1 alpha-2 country codes, e.g., `US`, `CL`.  |
| defaultLanguage | Determines the language the platform displays responses. This option is independent of the device or web browser language. For example, bot names will be displayed in the chosen language, but generic displays will be in the web browser's language. | string | `en` (English) or `es` (Spanish) |
| emailDomains | Indicates company's email address domains | string[ ] | Example: `company.com` |
| help | Indicates the user ID of help contact | ObjectId<COTUser\> | [User Data Model](/docs/documentation/models/users/model_users) |
| hideSummary | If `false`, it displays the home icon in the Main Menu Bar. | boolean | Pressing the _home_ icon shows all recent conversations in the _group panel_. |
| isActive | Indicates if a company is active or if it has been deactivated | boolean | |
| legalName | The official name of the company | string | |
| legalIdentifierCode | Indicates a country's taxpayer identifier; doesn't have to be exact. | string | For example, `RUT` in Chile, `EIN` or `TIN` in the USA |
| legalIdentifier | Company's legal identification number; any legal format is valid. | string | Format examples: `123-45-6789` (EIN); `12.345.678-9` (RUT) |
| modifiedAt | Last modification date | ISODate | YYYY-MM-DDTHH:mm:ss.SSSZ |
| offline | Sets offline mode for mobile apps | object | Only available in enterprise edition |
| offline.isActive | Turns offline mode on or off | boolean | |
| offlines.maxSyncTimeMs | Indicates object synchronization time | number | number indicates |
| permissions | | object | |
| permissions.showTos | Displays "terms of service" document when new users log in for the first time | object | |
| permissions.showTos.value | Determines whether or not to display the "terms of service" | boolean | If no URL is indicated, Cotalker will display its generic terms of service. |
| permissions.showTos.url | Indicates the URL of the "terms of service" document to display; a Google document will work just fine | string | URL |
| startGroup | Indicates which _group_ appears in the [group panel](/docs/documentation/client/groups#group-panel) at startup | ObjectId<COTGroup\> | If left `null`, a summary of most recent conversations will show up in the [group panel](/docs/documentation/client/groups#group-panel).
| subdomain | Used to internally reference the company; also used to indicate subdomain name for web client | string | |
| system | Indicates the user ID of system manager contact | ObjectId<COTUser\> | [User Data Model](/docs/documentation/models/users/model_users) |


## Fields Currently on Standby {#standby}
| Field | Description | [Type](/docs/documentation/models/overview_model#data-types) | Notes |
| ----  | ---- | ----------- | ----  |
| plan | | string | |
| maxUsers | | number | |
| appFiles | | boolean | |
| appLogo | | string | URL |

## SHOULD NOT BE USED
| Field | Description | [Type](/docs/documentation/models/overview_model#data-types) | Notes |
| ----  | ---- | ----------- | ----  |
| __v | version number | number | |
| propertyTypes | | string[ ] | |

## Soon to be deprecated {#soon-to-be-deprecated}
| Field | Description | [Type](/docs/documentation/models/overview_model#data-types) | Notes |
| ----  | ---- | ----------- | ---- |
| accessRolesVersion | | string | |
| allowUserCreation | | boolean | |
| hideHome | |boolean | |
| permissions.receiveNotifications | Notification pop-ups | boolean | |
| permissions.readLocation | Obtain GPS location data | boolean | |
| appSearch | | boolean | |

## DEPRECATED

| Field | Description | [Type](/docs/documentation/models/overview_model#data-types) | Notes |
| ----  | ---- | ----------- | ----  |
| specs| array | [ ] | DEPRECATED |
| permissions.readContacts | Contact search on device | boolean | DEPRECATED |
| messages | Sends a welcome message | object | DEPRECATED |
| products | Integration for special products | object | DEPRECATED |
| sidemenu | Side menu configuration | object | DEPRECATED |
| appBadge | | boolean | DEPRECATED |
| appToolbarText | Toolbar text color (hex color code) | string | DEPRECATED |
| appToolbarColor | Toolbar background color (hex color code) | string | DEPRECATED |
| hierarchyLevel | | string | DEPRECATED |
| hierarchy | array | [ ] | DEPRECATED |
| jobs | Array of job titles that can be assigned to users | string[ ] | DEPRECATED |
| newsPropertyTypes | array | [ ] | DEPRECATED |
| signatureDuration | Indicates the time period for which the authentication signature is valid | number; the value is in seconds; default is `604800`, i.e., seven days. | DEPRECATED |

## Additional Resources {#resources}

- [Configuration](/docs/documentation/admin/admin_company): Configure some of the company settings from the Administrative Panel
- ["Company" REST API documentation](/docs/documentation/api/company): basic "Company" API requests
- [API documentation in Swagger](https://www.cotalker.com/swagger/core/?key=woubtjf4olr0t4zgutuwn6scbcm6hd3qh1cgl5obmohpbm3mfublnwcvv67lodgjvd3h86s9ppshtvmf95gepsqh6nizq9liu7f): complete with data models (schemas)
- [COTLang](/docs/documentation/automation/admin_cotlang): use COTLang for extracting data from models in routines
- [Triggers and Contexts](/docs/documentation/automation/triggers_and_contexts): more information on using data models within routines

## Help {#help}

- [Cotalker Platform Community](https://github.com/Cotalker/documentation/discussions): post your questions or search for previous answers given in the forum
