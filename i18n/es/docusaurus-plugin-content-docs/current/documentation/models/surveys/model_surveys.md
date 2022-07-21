---
title: Surveys Data Model
sidebar_label: COTSurvey
---

:::caution Advertencia
Esta página aún no se encuentra traducida al español.
:::
import useBaseUrl from '@docusaurus/useBaseUrl';
import Highlight from '@theme/Highlight';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Mermaid from '@theme/Mermaid';

<span className="hero__subtitle">COTSurvey</span>

## Description {#description}
Surveys are used to gather data from users. The _Surveys Data Model_ (COTSurvey) is the main information of a survey and consolidates its other parts: [COTSurveyChat](/docs/documentation/models/surveys/model_surveychats), [COTQuestion](/docs/documentation/models/surveys/model_questions), [COTAnswer](/docs/documentation/models/surveys/model_answers).

<Mermaid chart={`
	graph LR;
        S[COTSurvey] --> C1[COTSurveyChat #1]
        S --> C2[COTSurveyChat #2]
        S --> C3[COTSurveyChat]
        C1 --> Q1T[COTQuestion - Field Label]
        C1 --> Q1I[COTQuestion - Input Settings]
        C2 --> Q2T[COTQuestion - Field Label]
        C2 --> Q2I[COTQuestion - Input Settings]
        Q2I --> QE[COTQuestionExec]
        C3 --> Q3[COTQuestion - Label & Input]
`}/>

## JSON Sample {#json-sample}

```json
{
    "_id" : "614117b1dd1e5a64b1f93771",
    "__v" : 0,
    "code" : "maintenance_001",
    "company" : "614117afdd1e5a3086f92020",
    "createdAt" : "2021-09-14T21:44:17.778Z",
    "groupPermission" : "61438ed076b99e7941b8ff09",
    "groupPermissionsV2" : ["61439155467286620370b2a2", "6143916555dedbe9efe9baf0"],
    "isActive" : true,
    "isSystemModel" : false,
    "modifiedAt" : "2021-09-14T21:44:17.778Z",
    "name" : "Maintenance Order",
    "onlyChannelCreation" : false,
    "onlySubSurvey" : false,
    "permissions" : ["614391becb12b21c7f6adc75"],
    "permissionsV2" : ["report-surveys-read"],
    "propertiesChannel" : ["equipment_section_01"],
    "propertiesLimit" : ["machines_01"],
    "responders" : [
        {
            "filter" : "accessrole",
            "value" : "614393df19e63208e49d2297"
        }
    ],
    "skipCodeValidation" : false,
    "version" : 1
}
```

## Fields {#fields}

| Field | Description | [Type](/docs/documentation/models/overview_model#data-types) | Notes |
| ---- | ---- | ---- | ---- |
| **id** | The survey's unique identification code. | ObjectId<COTSurvey\> | | 
| **__v** | Version number. | number | For internal system use only |
| **code** | The survey's unique identification name. | string | Maximum 60 characters; only lowercase letters, numbers, and underscore allowed; must be unique. |
| **company** | Indicates the company the survey is found in. | ObjectId<COTCompany\> | |
| **createdAt** | Date the survey was created. | ISODate | YYYY-MM-DDTHH:mm:ss.SSSZ |
| **editable** | Determines if a survey can be edited after being submitted. | object | Go to the [**Developer Mode Survey Editability**](/docs/documentation/automation/surveys/survey_editable_code) section for more details on adding custom code to determine if a survey can be edited. |
| **editable.mode** | Indicates the option selected to handle survey editability. | string | _Options are_: <br/>`enabled`: Allows the survey to be edited after submission.<br/>`disabled`: Prevents the survey from being edited.<br/>`advanced`: Allows the use of custom code to program the logic that determines the survey's editability. |
| **editable.context** | Indicates the _context_ from which data is extracted. | string | Currently, only the `channel#task` context is available which permits retriving data from the task channel associated with survey. |
| **editable.src** | Contains [custom Javascript code](/docs/documentation/automation/surveys/survey_editable_code) used to program the logic that determines survey editability. | string | The Javascript code is contained in string format. |
| **groupPermission** | Limits the use of the survey to the specified group. | ObjectId<COTGroup\> | Soon to be deprecated and replaced by `groupPermissionsV2`. |
| **groupPermissionsV2** | List of group object IDs, indicating the groups where the survey may be used. If empty, and `groupPermission` is not being used, the survey can be used in any group. | ObjectId<COTGroup\>[ ] | |
| **hidden** | Allows including custom coded logic to determine survey availability. | object | Go to the [**Developer Mode Survey Access**](/docs/documentation/automation/surveys/survey_hidden_code) section for further details.
| **hidden.context** | Indicates the _context_ from which data is extracted. | string | Currently, only the `channel#task` context is available which permits retriving data from the task channel associated with survey.
| **hidden.src** | Contains [custom Javascript code](/docs/documentation/automation/surveys/survey_hidden_code) used to program the logic that determines survey visibility. | string | The Javascript code is contained in string format.
| **isActive** | Indicates if the survey is available for use. | boolean | |
| **isSystemModel** | If true, the survey cannot be changed, even by admins. | boolean | |
| **modifiedAt** | Indicates the last time the survey was modified. | ISODate | YYYY-MM-DDTHH:mm:ss.SSSZ |
| **name** | The survey's displayed name in the administrative panel. | string | |
| **onlySubSurvey** | If set as true, the survey can _only_ be used within another survey, i.e., [COTQuestionContentType](/docs/documentation/models/surveys/model_questionContentType) `survey+survey`. | boolean | [Survey Component](/docs/documentation/admin/survey/components/survey) |
| **permissions** | Users with at least one of the [access roles](/docs/documentation/models/users/model_accessroles) listed can answer the survey. | ObjectId<COTAccessRole\>[ ] | Soon to be deprecated and replaced by `permissionsV2`. |
| **permissionsV2** | Users with at least one of the permissions listed can access the survey. | string[ ] | [List of default permissions](/docs/documentation/admin/admin_accessrole#default-permissions) |
| **propertiesChannel** | List of property types' (collection) `code`, indicating the property types (collections) that host the properties (elements) serving as filters. Must be used along with `propertiesLimit` to show the survey only on the channels that have the same property types and properties assigned. | string[ ] | |
| **propertiesLimit** | List of properties' (element) `name.code`, indicating the properties (elements) that serve as filters for displaying the survey. Must be used along with `propertiesChannel` to show the survey only on the channels that have the same collections and elements assigned. | string[ ] | |
| **responders** | Designates which users can answer the survey | object[ ] | |
| **responders[index].filter** | Indicates the category or filter by which users will be selected | string | Options: `job`, `email`, `accessrole` |
| **responders[index].value** | List of filter values | string[ ] | |
| **skipCodeValidation** | Internal flag for legacy surveys | boolean | |
| **version** | Indicates the survey version and determines what fields should be used; `1` uses fields prior to January 2019; `2` uses fields created after January 2019 | number | Fields prior to January 2019: `permissions`, `group`, `groupPermissions`. Fields created after January 2019: `permissionsV2`, `groupPermissionsV2`, `onlySubSurvey`. |


## Deprecated {#deprecated}

| Field | Description | [Type](/docs/documentation/models/overview_model#data-types) | Notes |
| ---- | ---- | ---- | ---- |
| cc | Sends a copy of the survey results to the indicated recipients | string[ ] | DEPRECATED |
| editChannel | | string[ ] | DEPRECATED |
| etls | | [ ] | DEPRECATED |
| group | Replaced by `groupPermissionV2` | ObjectId<COTGroup\> | DEPRECATED |
| identifiersNeeded | | string[ ] | DEPRECATED |
| onlyChannelCreation | Limits where the survey can be summoned from. | boolean | DEPRECATED |
| post | Specifies changes that occur _after_ a survey-instance is saved or modified | object | DEPRECATED |
| post.changeNotice | `default` or `null` (send notification to channel about change); `none` (do not send modification notice) | string | DEPRECATED |
| propagateSql | | boolean | DEPRECATED |
| propertiesNeeded | | string[ ] | DEPRECATED |
| src | | string | DEPRECATED |

## Additional Resources {#resources}

- [Surveys Overview](/docs/documentation/admin/survey/survey_overview): Complete description about surveys
- ["Survey" REST API documentation](/docs/documentation/api/surveys/): basic "Survey" API requests
- [API documentation in Swagger](https://www.cotalker.com/swagger/core/?key=woubtjf4olr0t4zgutuwn6scbcm6hd3qh1cgl5obmohpbm3mfublnwcvv67lodgjvd3h86s9ppshtvmf95gepsqh6nizq9liu7f): complete with data models (schemas)
- [COTLang](/docs/documentation/automation/admin_cotlang): use COTLang for extracting data from models in routines
- [Triggers and Contexts](/docs/documentation/automation/triggers_and_contexts): more information on using data models within routines

## Help {#help}

- [Cotalker Platform Community](https://github.com/Cotalker/documentation/discussions): post your questions or search for previous answers given in the forum
