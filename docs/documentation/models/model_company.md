---
title: Company
sidebar_label: Company
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<span className="hero__subtitle">COTCompany</span>

## Description

The Company Data Model (COTCompany) is the underlying configuration for the platform. It contains basic company information, such as name, tax identification number, and country. It also establishes platform display settings such as language, icon display, initial groups, and much more.

## JSON Sample {#json-sample}

```json
{
    "_id" : ObjectId("5bc9f2fbda1094525699894a"),
    "subdomain" : "testco",
    "displayName" : "TESTCO",
    "legalName" : "TESTCO_legal",
    "legalIdentifierCode" : "cl_RUT",
    "legalIdentifier" : "testco",
    "accessRolesVersion" : "v.1.0",
    "allowUserCreation" : true,
    "contactMode" : "default",
    "permissions" : {
        "receiveNotifications" : true,
        "readLocation" : true,
        "showTos" : {
            "value" : true
        }
    },
    "modifiedAt" : ISODate("2021-08-20T19:35:11.648Z"),
    "createdAt" : ISODate("2018-10-19T15:06:35.726Z"),
    "appContacts" : true,
    "appFiles" : false,
    "appLogo" : "/assets/images/cotalker.png",
    "newsPropertyTypes" : [ 
        "NOTICIAS"
    ],
    "propertyTypes" : [ 
        "PAIS", 
        "CIUDAD", 
        "CAPITAL"
    ],
    "jobs" : [ 
        "TESTER", 
        "GERENTE", 
        "ADMINISTRADOR"
    ],
    "isActive" : true,
    "defaultLanguage" : "es",
    "defaultCountry" : "CL",
    "plan" : "normal",
    "maxUsers" : -1,
    "admin" : [ 
        ObjectId("5bc9f2fbda10945256998957")
    ],
    "__v" : 14,
    "help" : ObjectId("5bc9f2fbda1094525699896c"),
    "system" : ObjectId("5bc9f2fbda10945256998963"),
    "emailDomains" : [ 
        "cotalker.com"
    ],
    "signatureDuration" : 604800,
    "appSearch" : true,
    "offline" : {
        "isActive" : false,
        "maxSyncTimeMs" : 0
    }
}
```

## Elements {#elements}

| Field | Type | Description | Notes |
| ----  | ---- | ----------- | ----  |
|  \_id | Company ID number | ObjectId<COTCompany\> | |
| subdomain | ____ | string | ____ |
| displayName | Company Name as viewed by users | string | |
| legalName | The official name of the company | string | |
| legalIdentifierCode | Indicate taxpayer ID number type | string | For examlple, `RUT` in Chile, `EIN` or `TIN` in the USA **????** |
| legalIdentifier | Company's legal identification number | string | Format examples: `123-45-6789` (EIN); `12.345.678-9` (RUT) **????** |
| contactMode | This option will limit users' ability to see other users in their contact lists, and other places, like surveys where user lists are used as options for answering survey questions. | string | `default` + 2 more **accpeta 3 valores - pending** |
| permissions | | object | |
| permissions.showTos | ____ | object | **???** |
| permissions.showTos.value | ____ | boolean | ____ | **esto es raro, porque un value? - revisar**
| modifiedAt | Last modification date | ISODate | YYYY-MM-DDTHH:mm:ss.SSSZ |
| createdAt | Creation date | ISODate | YYYY-MM-DDTHH:mm:ss.SSSZ |
| appContacts | Displays contact button in the main menu bar | boolean | [View Main Menu Bar](/docs/documentation/client/main_menu) | 
| jobs | Array of job titles that can be assigned to users | string[ ] | **DEPRECATED WITH NEW JOB TITLES COLLECTION???** |
| isActive | Indicates if a company is active or if it has been desactivated | boolean | |
| defaultLanguage | Determines the language the platform displays responses. This option is independant of the device or web browser language. For example, bot names will be displayed in the chosen language but generic displays will be in the web browser's language. | string | `en` (English) or `es` (Spanish) |
| defaultCountry | Country where the company resides. | string | `CL`(Chile) or `US` (United States of America) **NO ACEPTA MAS QUE ESOS DOS PAISES (ADEMÁS EN GUI FALTAN PAISES ENTRE "A-B")** |
| admin | List of admin users | ObjectId<COTUser\>[ ] | **ANY SPECIAL FUNCTION OR ATTRIBUTE?** |
| help | Indicates the user ID of help contact | ObjectId<COTUser\> | **ANY SPECIAL FUNCTION OR ATTRIBUTE?** |
| system | Indicates the user ID of system manager contact | ObjectId<COTUser\> | **ANY SPECIAL FUNCTION OR ATTRIBUTE?** |
| emailDomains | Indicates company's email address domains | string[ ] | Example: `company.com` |
| signatureDuration | ??? | number | ??? |
| offline | ??? | object | ??? |
| offline.isActive | ??? | boolean | **TESTED: NO APPARENT CHANGE** |
| offlines.maxSyncTimeMs | number | ??? |
| hideSummary | If `false`, displays the home icon in the Main Menu Bar. | boolean | Pressing the _home_ icon shows all recent conversations in the _group panel_. |
| hideHome | |boolean | **TESTED: NO APPARENT CHANGE, EXCEPT FOR SOME INITIAL CONFLICTS WITH 'HIDESUMMARY'** DEPRECATED??? |
| startGroup | Indicates which _group_ appears in the [group panel](/docs/documentation/client/groups#group-panel) at start up | ObjectId<COTGroup\> | If left `null`, a summary of most recent conversations will show up in the [group panel](/docs/documentation/client/groups#group-panel). 


## Additional Resources {#resources}

- ["Company" REST API documentation](/docs/documentation/api/company): basic "Company" API requests
- [API documentation in Swagger](https://www.cotalker.com/swagger/core/?key=woubtjf4olr0t4zgutuwn6scbcm6hd3qh1cgl5obmohpbm3mfublnwcvv67lodgjvd3h86s9ppshtvmf95gepsqh6nizq9liu7f): complete with data models (schemas)
- [COTLang](/docs/documentation/automation/admin_cotlang): use COTLang for extracting data from models in routines
- [Triggers and Contexts](/docs/documentation/automation/triggers_and_contexts): more information on using data models within routines

## Help {#help}

- [Cotalker Platform Community](https://github.com/Cotalker/documentation/discussions): post your questions or search for previous answers given in the forum

## Deprecated Elements {#deprecated}
_The following deprecated items might still be found in the model:_

## NOT IN USE OR COULD BE REVIVED
| Field | Description | [Type](/docs/documentation/models/overview_model#data-types) | Notes |
| ----  | ---- | ----------- | ----  |
- [ ] plan | ____ | string | ____ | // no en uso - pero deberia 
- [ ] maxUsers | ____ | number | ____ | // no en uso - pero deberia 
- [ ] appFiles | ____ | boolean | ____ |  // creo que deprecado - podría revivir con notes 
- [ ] appLogo | ____ | string | URL | // creo que muerto - pero sería bueno revivirlo

## UNKNOWN
| Field | Description | [Type](/docs/documentation/models/overview_model#data-types) | Notes |
| ----  | ---- | ----------- | ---- |
- [ ] accessRolesVersion | ____ | string | ____ | not sure...
- [ ] allowUserCreation | ____ | boolean | ____ | not sure...
- [ ] permissions.receiveNotifications | _____ | boolean | ____ | posiblemente no funciona - quizás deprecado
- [ ] permissions.readLocation | ____ | boolean | ____ | ya no funciona creo... - pending
- [ ] newsPropertyTypes | array | [ ] | ____ | <--- possiblemente muerto
- [ ] appSearch | ____ | boolean | ____ |  // creo que deprecado...

## SHOULD NOT BE USED
| Field | Description | [Type](/docs/documentation/models/overview_model#data-types) | Notes |
| ----  | ---- | ----------- | ----  |
- [ ] __v | version number | number | ____ | 
- [ ] propertyTypes | ____ | string[ ] | ____ |  <-- no deberia usarse.0


## DEPRECATED

| Field | Description | [Type](/docs/documentation/models/overview_model#data-types) | Notes |
| ----  | ---- | ----------- | ----  |
| specs| array | [ ] | DEPRECATED |
| permissions.readContacts | Contacts search on device | boolean | DEPRECATED |
| messages | Sends a welcome message | object | DEPRECATED |
| products | Integration for special products | object | DEPRECATED |
| sidemenu | Side menu configuration | object | DEPRECATED |
| appBadge | | boolean | DEPRECATED |
| appToolbarText | Toolbar text color (hex color code) | string | DEPRECATED |
| appToolbarColor | Toolbar background color (hex color code) | string | DEPRECATED |
| hierarchyLevel | | string | DEPRECATED |
| hierarchy | array | [ ] | DEPRECATED |