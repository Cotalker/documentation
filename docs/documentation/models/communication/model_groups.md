---
title: Groups Data Modal
sidebar_label: COTGroup
---
import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem'; 

<span className="hero__subtitle">COTGroup</span>

## Description {#description}

[Groups](/docs/documentation/client/groups) are the standard form of interacting within the Cotalker environment and are primarily accessed through the Main Menu Bar and Group Panel. There are three types of groups. _Regular groups_ contain channels used for communicating with other users. _Workflow groups_, like regular groups, have communication channels but are associated with workflow tasks and their states. _Link groups_ direct you to anywhere within or outside the Cotalker environment.

## JSON Sample {#json-sample}
```json
{
    "_id": "618a9a1c881d93046349c820",
    "actions": [
        {
            "auth": false,
            "display": "Go to statistics page",
            "external": true,
            "icon": "M17.9,17.39C17.64,16.59 16.89,16 16,16H15V13A1,1 0 0,0 14,12H8V10H10A1,1 0 0,0 11,9V7H13A2,2 0 0,0 15,5V4.59C17.93,5.77 20,8.64 20,12C20,14.08 19.2,15.97 17.9,17.39M11,19.93C7.05,19.44 4,16.08 4,12C4,11.38 4.08,10.78 4.21,10.21L9,15V16A2,2 0 0,0 11,18M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z",
            "url": "https://www.mystatistics.com"
        }
    ],
    "color": "#ffffff",
    "company": "618a9a23a1e8b667232eda73",
    "createChannels": {
        "active": true,
        "requiredPermission": [],
        "requiredPermissionsV2": [
            "admin-groups-write"
        ],
    },
    "createdAt": "2021-08-31T15:07:24.955Z",
    "groupBy": null,
    "groupSort": "weight",
    "groupSortDirection": "desc",
    "help": {
        "animation": "",
        "faqUrl": "https://www.companyfaq.com",
        "isActive": true,
        "onboarding": true,
        "text": "Call Saul for help."
    },
    "icon": "M17,12V3A1,1 0 0,0 16,2H3A1,1 0 0,0 2,3V17L6,13H16A1,1 0 0,0 17,12M21,6H19V15H6V17A1,1 0 0,0 7,18H18L22,22V7A1,1 0 0,0 21,6Z",
    "isActive": true,
    "innerSort": "createdAt",
    "innerSortDirection": "desc",
    "link": {
        "requiredPermission": [],
        "requiredPermissionsV2": null
    },
    "modifiedAt": "2021-09-08T17:48:55.709Z",
    "nameCode": "team_chat_00",
    "nameDisplay": "Team Chats",
    "parent": null,
    "weight": 2
}
```

## Fields {#fields}

| Fields | Description | [Type](/docs/documentation/models/overview_model#data-types) | Notes |
| ----- | ----- | ----- | ----- |
| \_id | Group ID number | ObjectId<COTGroup\> | |
| actions | List of links that can be opened from the [group panel's action button](/docs/documentation/admin/admin_group#secondary-actions) | object[ ] | |
| actions[index].\_id | System generated ID | ObjectId | |
| actions[index].display | Text displayed to indicate the link to be opened | string | |
| actions[index].auth | Indicates if authentication data is sent | boolean | |
| actions[index].external | Indicates if the link opens in another tab or not; if not, the link will be embedded in a window that opens up over the platform | boolean | Not all URLs will open up in the embedded pop-up window |
| actions[index].icon | The link's icon in the actions button's menu | string | svg code |
| actions[index].url | The link's address | string | URL |
| actions[index].weight | Indicates the link's place in the menu | number | Numbers do not have to be in consecutive order; lower numbers go first |
| channelsWithoutCategoryLocation | | string | Options are: `top` or `hide` | 
| color | The color of the group icon in the Main Menu Bar | string | Hex color code |
| company | Company ObjectId | ObjectId<COTCompany\> | [Company Data Model](/docs/documentation/models/model_company) |
| createChannels | Allows users to create new channels within the group | object | |
| createChannels.active | Indicates whether or not users can create new channels within the group | boolean | |
| createChannels.requiredPermission | Array of the access role IDs users need to create new channels | ObjectId<COTAccessRole\>[ ] | [Access Roles Data Model](/docs/documentation/models/users/model_accessroles) |
| createChannels.requiredPermissionsV2 | Array of permission names users need to create new channels | string[ ] | [List of default persmission names](/docs/documentation/admin/admin_accessrole#default-permissions) |
| createdAt | Group creation date| ISODate | YYYY-MM-DDTHH:mm:ss.SSSZ |
| groupBy | Sorts channels within group by collection elements; useful for sorting task channels by their current state | ObjectId<COTPropertyType\> | [Collection Data Model](/docs/documentation/models/databases/model_propertytypes) |
| groupSort | Sorts the collection elements through which channels will be arranged | string | Options: `weight`, `modifiedAt`, `createdAt`, `a-z` |
| groupSortDirection | The direction of sorted elements | string | `asc` or `desc` |
| help | Sets up help and onboarding | object | |
| help.animation | Animated image (JSON) shown in the group's onboarding | string | We recommend using Lottie File |
| help.faqUrl | Indicates the FAQ's address | string | URL |
| help.isActive | Indicates if help option is activated | boolean | |
| help.onboarding | If it is active it will show up after you log in the App or Website | boolean | |
| help.text | Text to be displayed in the onboarding | string | Will be displayed below the animation |
| hideChannelsByProperties | Array of elements or properties; channels with these elements will be hidden | ObjectId<COTProperty\> | [Elements Data Model](/docs/documentation/models/databases/model_properties) |
| icon | Icon that represents the group on the Main Menu Bar | string | SVG code |
| innerSort | Sorts channels within the group| string | `modifiedAt`, `createdAt`, `a-z`, `lastMessage` |
| innerSortDirection | Indicates whether sorting order is _ascending_ or _descending_. | string | Options are: `asc` or `desc` |
| isActive | Indicates if group is active or has been deactivated | boolean | |
| link | Settings for [link groups](/docs/documentation/admin/admin_links) that appear on the Main Menu Bar | object | |
| link.auth | Sends user's [authentication token](/docs/documentation/api/auth) |boolean | |
| link.cmd | | string | |
| link.embedded | Embeds link into the platform window | boolean | |
| link.external | Opens link in new tab | boolean | |
| link.linkType | Indicates the type of link | string | Options are: `URL`, `APK` |
| link.requiredPermission | Array of access role IDs users must have to access the link | ObjectId<COTAccessRole\>[ ] | [Access Roles Data Model](/docs/documentation/models/users/model_accessroles) |
| link.requiredPermissionsV2 | Array of permission names users need to access the link | string[ ] | [Default persmissions](/docs/documentation/admin/admin_accessrole#default-permissions) |
| link.tokenKey | | string | |
| link.url | Complete web address link | string | URL |
| modifiedAt | Last date and time the group was modified | ISODate | YYYY-MM-DDTHH:mm:ss.SSSZ |
| nameCode | The group's unique identification name | string | Maximum 60 characters; only lowercase letters, numbers, and underscore allowed; must be unique. |
| nameDisplay | The group name users see on the platform  | string | |
| parent | Indicates parent group | ObjectId<COTGroup\> | [Group Data Model](/docs/documentation/models/communication/model_groups) |
| search | Array of automatically generated search keywords | string [ ] | |
| weight | Indicates the group's place in the Main Menu Bar | number | Numbers do not have to be in consecutive order; lower numbers go first |



## Deprecated or not to be used {#deprecated}

| Fields | Description | [Type](/docs/documentation/models/overview_model#data-types) | Notes |
| ----- | ----- | ----- | ----- |
| __v | Version number | number | Not to be modified |
| apperance | | object | DEPRECATED |
| canViewChannelsConfig | | object | DEPRECATED |
| channels | Array of channels found in the group | ObjectId<COTChannel\>[ ] | DEPRECATED |
| createChannels.allowedContentTypes | Array | string[ ] | DEPRECATED |
| createChannels.openChannel | | boolean | DEPRECATED |
| defaultChannel | | object | DEPRECATED |
| defaultOpenBehavior | | string | `channel`, `link` or `task` | DEPRECATED |
| filters | Array | object[ ] | DEPRECATED |
| groupNumber | | number | DEPRECATED |
| groupOwnerIds | Array | [ ] | DEPRECATED |
| help.image | | string | DEPRECATED |
| image | | object | DEPRECATED |
| propertyLevelsConfig | Array | object[ ] | DEPRECATED |
| propertyTypes | Array | | DEPRECATED |
| settings | | object | DEPRECATED |
| skipChannelSelection | | boolean | DEPRECATED |
| showByLevel | | boolean | DEPRECATED |
| sortActive | | boolean | DEPRECATED |
| subdisplay | Subtitle | string | DEPRECATED |
| taskManager | | object | DEPRECATED |
| task | | object | DEPRECATED |
| userFilter | | boolean | DEPRECATED |
| viewSettings | | object | DEPRECATED |
| visibility | | object | DEPRECATED |

## Additional Resources {#resources}
- [Groups](/docs/documentation/client/groups): Admin documentation on groups
- ["Group" REST API documentation](/docs/documentation/api/communication/groups): basic "Group" API requests
- [API documentation in Swagger](https://www.cotalker.com/swagger/core/?key=woubtjf4olr0t4zgutuwn6scbcm6hd3qh1cgl5obmohpbm3mfublnwcvv67lodgjvd3h86s9ppshtvmf95gepsqh6nizq9liu7f): complete with data models (schemas)
- [COTLang](/docs/documentation/automation/admin_cotlang): use COTLang for extracting data from models in routines
- [Triggers and Contexts](/docs/documentation/automation/triggers_and_contexts): more information on using data models within routines

## Help {#help}
- [Cotalker Platform Community](https://github.com/Cotalker/documentation/discussions): post your questions or search for previous answers given in the forum
