---
title: Companies Data Model
sidebar_label: COTCompany
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<span className="hero__subtitle">COTCompany</span>

## Description

The _Companies_ Data Model (COTCompany) is the underlying configuration for the platform. Most data models are associated with it. It contains basic company information, such as its name, tax identification number, and country. It also establishes platform display settings such as language, icon display, colors, authentification, and other branding options.

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
    "conversationGroup": "6197b98d6b60e7b6db7a61cf",
    "createdAt" : "2018-10-19T15:06:35.726Z",
    "defaultCountry" : "US",
    "defaultLanguage" : "en",
    "displayName" : "ACME",
    "emailDomains" : [ 
        "company.com"
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

| Field | Description | [Type](/docs/documentation/models/overview_model#data-types) | Notes |
| ----  | ---- | ----------- | ----  |
|  \_id | System generated company ID number. | ObjectId<COTCompany\> | Only lowercase letters are accepted. |
| admin | List of admin users' ID number | [ObjectId<COTUser\>[ ]](/docs/documentation/models/users/model_users) | |
| appContacts | Displays contact button in the main menu bar | boolean | [View Main Menu Bar](/docs/documentation/client/main_menu) |
| contactMode | This option will limit users' ability to see other users in their contact lists and other places, like surveys where user lists are used as options for answering survey questions. | string | Valid options are:`default` and `local` (allows users to view only contacts in their current channels); `all` (permits viewing all company users) |
| conversationGroup | Group that holds quick access to important company channels | [ObjectId<COTGroup\>](/docs/documentation/models/communication/model_groups) | |
| createdAt | Creation date | ISODate | YYYY-MM-DDTHH:mm:ss.SSSZ |
| displayName | Company Name as viewed by users | string | |
| defaultCountry | Country where the company resides. | string | Use ISO 3166-1 alpha-2 country codes, e.g., `US`, `CL`.  |
| defaultLanguage | Determines the language the platform displays responses. This option is independent of the device or web browser language. For example, bot names will be displayed in the chosen language, but generic displays will be in the web browser's language. | string | `en` (English) or `es` (Spanish) |
| emailDomains | Indicates company's email address domains | string[ ] | Example: `company.com` |
| help | Indicates the user ID of help contact | [ObjectId<COTUser\>](/docs/documentation/models/users/model_users) | |
| hideSummary | If `false`, it displays the home icon in the Main Menu Bar. | boolean | Pressing the _home_ icon shows all recent conversations in the _group panel_. |
| isActive | Indicates if a company is active or if it has been deactivated | boolean | |
| legalName | The official name of the company | string | |
| legalIdentifierCode | Indicates a country's taxpayer identifier; doesn't have to be exact. | string | For example, `RUT` in Chile, `EIN` or `TIN` in the USA |
| legalIdentifier | Company's legal identification number; any legal format is valid. | string | Format examples: `123-45-6789` (EIN); `12.345.678-9` (RUT) |
| modifiedAt | Last modification date | ISODate | YYYY-MM-DDTHH:mm:ss.SSSZ |
| offline | Sets offline mode for mobile apps | object | Only available in enterprise edition |
| offline.isActive | Turns offline mode on or off | boolean | |
| offline.maxSyncTimeMs | Indicates object synchronization time | number | |
| permissions | | object | |
| permissions.showTos | Displays "terms of service" document when new users log in for the first time | object | |
| permissions.showTos.value | Determines whether or not to display the "terms of service" | boolean | If no URL is indicated, Cotalker will display its generic terms of service. |
| permissions.showTos.url | Indicates the URL of the "terms of service" document to display; a Google document will work just fine | string | URL |
| startGroup | Indicates which _group_ appears in the [group panel](/docs/documentation/client/groups#group-panel) at startup | [ObjectId<COTGroup\>](/docs/documentation/models/communication/model_groups) | If left `null`, a summary of most recent conversations will show up in the [group panel](/docs/documentation/client/groups#group-panel).
| subdomain | Used to internally reference the company; also used to indicate subdomain name for web client | string | |
| system | Indicates the user ID of system manager contact | [ObjectId<COTUser\>](/docs/documentation/models/users/model_users) | |
| branding | Allows customizing certain aspects of Cotalker's UI, i.e., platform colors, images, and text. Also enables login authentification with an organization's Google and Microsoft accounts. | object | Visit the [Branding Settings](/docs/documentation/admin/special_configurations/branding) section for examples and tips. |
| branding.isActive | Activates the use of custom images. If `true`, the custom images contained in the `images` object are displayed. | boolean | |
| branding.names | Allows overriding the default platform name. | object | |
| branding.names.name | Corresponds to the environment build name, i.e., the code name by which the system identifies the customized version of the platform. | string |  |
| branding.names.shortName | Customized name to be displayed externally, such as in the web browser tab. | string | |
| branding.urls | Indicates the organization's Cotalker platform URLs. | string | |
| branding.urls.app | The organization's web app URL. | string | Example: `"https://company.cotalker.com"` |
| branding.urls.api | The REST API URL. | string | Example: `"https://www.cotalker.com"` |
| branding.style | Contains platform color and button configurations. | object | |
| branding.style.customCss | CSS code in string format. | string | Check the [Branding Settings](/docs/documentation/admin/special_configurations/branding#css) section for CSS examples. |
| branding.auth | Contains settings to enable external credential login. | object | |
| branding.auth.azureAD | Settings needed to enable Microsoft Azure login. | object | Go to [Microsoft Azure AD Sign-in Configuration](/docs/documentation/admin/special_configurations/azure_config) for complete setup information. |
| branding.auth.azureAD.isActive | Activates Azure login settings. | boolean | |
| branding.auth.azureAD.clientId | Contains the Application (client) ID. | string | Check step 15 of the [Microsoft Azure AD Sign-in Configuration](/docs/documentation/admin/special_configurations/azure_config) for information on how to obtain this value. |
| branding.auth.azureAD.authority | Contains the Directory (tenant) ID. | string | Check step 15 of the [Microsoft Azure AD Sign-in Configuration](/docs/documentation/admin/special_configurations/azure_config) for information on how to obtain this value. |
| branding.auth.azureAD.redirectUri | Indicates the redirect URI used for enabling Azure login. | string | Please ask your Cotalker sales representative or support team to supply the redirect URI. |
| branding.auth.googleSignIn | Settings to enable Google Gmail login. | object | |
| branding.auth.gooogleSignIn.isActive | Indicates if Google Gmail login is enabled. | boolean | |
| branding.images | Indicates images used to replace the defaults. | object | |
| branding.images.login | Contains the ObjectId of the custom image to be used on the righthand side of the login screen. | [ObjectId<COTFile\>](/docs/documentation/models/communication/file) | |
| branding.images.email | Contains the ObjectId of a custom image to be used as a logo on automatically generated emails. | [ObjectId<COTFile\>](/docs/documentation/models/communication/file) | |
| branding.images.logotype | Contains the ObjectId of a title-with-logo image to be used on the login screen and above the main menu bar. | [ObjectId<COTFile\>](/docs/documentation/models/communication/file) | |
| branding.images.isotype | Contains the ObjectId of a custom image used to replace the hamburger icon of the retracted main menu bar. | [ObjectId<COTFile\>](/docs/documentation/models/communication/file) | |
| branding.images.icon512 | Contains the ObjectId of a custom image to be used as the in-progress icon. | [ObjectId<COTFile\>](/docs/documentation/models/communication/file) | |
| branding.translations | Allows overriding default app text with customized versions or translations into other languages. <br/>The `key`, i.e., text section identifier, can be obtained through your Cotalker representative or support team. | object | **Format:** `"translations": {"en": {[key]: string}}` <br/>**Example:** `"translations": {"en": {"subjects.link_groups": "Групи посилань", "subjects.group_other": "Групи"}}`. |
| branding.translations.en | This object overrides the default English platform texts with custom translations or versions. | object | |
| branding.translations.en.[key] | Indicates the new text to be used in the indicated key or text section. | string | |
| branding.translations.es | This object overrides the default Spanish platform texts with custom translations or versions. | object | |
| branding.translations.es.[key] | Indicates the new text to be used in the indicated key or text sections | string | |



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
