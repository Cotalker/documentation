---
title: Channels Data Model
sidebar_label: COTChannel
---
import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<span className="hero__subtitle">COTChannel</span>


## Description {#description}

[Channels](/docs/documentation/client/channels) are the workspace where users can interact with workflows, surveys, bots, and other users. Channels exist within either [regular](/docs/documentation/admin/admin_group#channels) or [workflow groups](/docs/documentation/admin/workflows/settings_panels/workflowgroup_channels).


## Sample JSON {#sample-json}

```json
{
    "_id" : "6127d4d58ae12fc65e0a1ee0",
    "__v" : 0,
    "bots" : [
        "6127d4e62b2c8b1d073fa35a", 
        "6127d4ec8ae7617c3fc5583a"
        ],
    "company" : "6127d4f60690186a424492d1",
    "createdAt" : "2021-08-24T03:06:57.019Z",
    "group" : "6127d4ff8ef33cc66adc0c38",
    "groupOwnerIds" : [ 
        "6127d5050f901439615a55b3", 
        "6127d5203350c801ce880a62"
    ],
    "image" : {
        "small": "https://cotalker-us-files.s3.amazonaws.com/certificationworld/image/6127d53288c2199d5f896c67/small/update-multiplechoice-subproperty.png",
        "square": "https://cotalker-us-files.s3.amazonaws.com/certificationworld/image/6127d53ab60b7c04a51e5153/square/update-multiplechoice-subproperty.png",
        "original": "https://cotalker-us-files.s3.amazonaws.com/certificationworld/image/6127d54044219124dca4d97a/original/update-multiplechoice-subproperty.png"
    },
    "isActive" : true,
    "isDirect" : false,
    "isPrivate" : true,
    "lastMessage": {
        "content": "Jane Doe: Here's the report!",
        "date": "2021-07-05T20:56:13.232Z",
        "sender": "6127d54bff638c40c90e3fc8",
        "contentType": "text/plain"
    },
    "modifiedAt" : "2021-08-24T03:06:57.019Z",
    "nameCode" : "team_chat",
    "nameDisplay" : "Team Chat",
    "overrideName" : true,
    "pinned" : [
        "6127d5d4e55cccfb28e6d966"
    ],
    "propertyIds" : [ 
        "6127d5e33fa7d912eea24f22"
    ],
    "search": [
            "team",
            "chat",
            "teamchat"
    ],
    "settings" : {
        "write" : "all",
        "writeUserIds" : [
            "6127d64e411cf3db278a958a"
        ]
    },
    "userIds" : [ 
        "6127d5050f901439615a55b3", 
        "6127d5203350c801ce880a62",
        "61246250e415b1bb58070a20", 
        "61246250e415b149d3070a1a"
    ],
    "videoCall": {
        "start": {
            "any": false,
            "permissions": [
                "web-access"
            ]
        },
        "isActive": true,
        "publishVideo": [
            "web-access"
        ],
        "publishAudio": [
            "web-access"
        ]
    }
}
```

## Fields {#Fields}

| Field | Description | [Type](/docs/documentation/models/overview_model#data-types) | Notes |
| ----  | ---- | ----------- | ----  |
| **_id** | Channel ID number | ObjectId<COTChannel\> | |
| **__v** | Document version | number | Cannot be modified and should never be used. |
| **bots** | Array with the IDs of the bots assigned to the channel | ObjectId<COTBot\>[ ] | [Bot Data Model](/docs/documentation/models/automations/model_bots) |
| **company** | Company ID number | ObjectId<COTCompany\> | [Channel Data Model](/docs/documentation/models/model_company) |
| **createdAt** | Channel creation date | ISODate | YYYY-MM-DDTHH:mm:ss.SSSZ |
| **group** | The channel's group ID number | ObjectId<COTGroup\> | [Group Data Model](/docs/documentation/models/communication/model_groups) |
| **groupOwnerIds** | Array of user ID numbers, including creator and initial users | ObjectId<COTUser\>[ ] | [User Data Model](/docs/documentation/models/users/model_users) |
| **image** | Channel avatar | object | |
| **image.small** | Small image size | string | URL |
| **image.square** | Square shaped avatar | string | URL |
| **image.original** | Original image size | string | URL |
| **isActive** | Indicates if the channel is still active or if it has been deactivated | boolean | |
| **isDirect** | Indicates if the channel is a chat of direct messages between two users. | boolean | |
| **isPrivate** | | boolean | |
| **lastMessage** | Displays the last message sent in the channel | object | |
| **lastMessage.content** | Message text | string | |
| **lastMessage.date** | The date the message was sent | ISODate | YYYY-MM-DDTHH:mm:ss.SSSZ |
| **lastMessage.sender** | The user ID of the message sender | ObjectId<COTUser\> | [User Data Model](/docs/documentation/models/users/model_users) |
| **lastMessage.contentType** | Content types include text, survey or multimedia files | string | |
| **modifiedAt** | Indicates the last time channel settings were modified | ISODate | YYYY-MM-DDTHH:mm:ss.SSSZ |
| **nameCode** | The channel's unique identification name | string | Maximum 60 characters; only lowercase letters, numbers, and underscores allowed; must be unique. |
| **nameDisplay** | The channel name users will see in the platform | string | |
| **overrideName** | Indicates if the display name is overridden by the channel's first elements | boolean | False indicates the name has been overridden; true indicates that the manually added display name is being used |
| **pinned** | Indicates if the channel is pinned to the group panel | ObjectId | An empty array indicates the channel is not pinned |
| **propertyIds** | An array of element/property IDs associated with the channel | ObjectId<COTProperty\>[ ] | [Element Data Property](/docs/documentation/models/databases/model_properties) |
| **search** | Array of keywords for search engine | string[ ] | Automatically generated |
| **settings** |  | object | |
| **settings.write** | Indicates if users can write messages in the channel | string | Options are `all` or `none` |
| **userIds** | Array of the IDs of the users in the channel | ObjectId<COTUser\>[ ] | |
| **videoCall** | Enables users to start video calls within the channel | object | |
| **videoCall.start** | Indicates if permissions are required to initiate a video call | object | |
| **videoCall.start.any** | Indicates if any user within the channel can initiate a video call | boolean | If `true`, no permissions are needed |
| **videoCall.start.permissions** | Array of permissions needed to initiate a video call | string[ ] | If video.start.any is `false`, permissions must be indicated |
| **videoCall.isActive** | Indicates if the video calls can be initiated within the channel | boolean | If `true`, calls are permitted |
| **videoCall.publishVideo** | Indicates permissions needed to use the video | string[ ] | |
| **videoCall.publishAudio** | Indicates permissions needed to use the audio | string[ ] | |

## Deprecated Elements {#deprecated}
_The following deprecated items might still be found in the model:_

| Field | Description | [Type](/docs/documentation/models/overview_model#data-types) | Notes |
| ----  | ---- | ----------- | ----  |
| **actionButton** | Adds a button with links to the channel workspace | array |  DEPRECATED |
| **archive** | Indicates if a channel has been archived | string[ ] | DEPRECATED |
| **autocomplete** | Autocompletes type input; for system use only | object[ ] | DEPRECATED |
| **groupNumber** | | | DEPRECATED |
| **info** | | object | DEPRECATED |
| **lightProperty** | | [ ] | DEPRECATED |
| **settings.display** | | string | DEPRECATED |
| **settings.read** | | string | DEPRECATED |
| **settings.readUserIds** | | ObjectId[ ] | DEPRECATED |
| **systemPinned** | | boolean | DEPRECATED |
| **videoCall.duration** | Array of allowed times for video calls | number[ ] | DEPRECATED |
| **visibility** | | object | DEPRECATED |

## Additional Resources {#resources}
- [Channel Settings Panel](/docs/documentation/admin/admin_group#channels): Channel settings in the Administrative Panel
- ["Channel" REST API documentation](/docs/documentation/api/communication/channels): basic "Channel" API requests
- [API documentation in Swagger](https://www.cotalker.com/swagger/core/?key=woubtjf4olr0t4zgutuwn6scbcm6hd3qh1cgl5obmohpbm3mfublnwcvv67lodgjvd3h86s9ppshtvmf95gepsqh6nizq9liu7f): complete with data models (schemas)
- [COTLang](/docs/documentation/automation/cotlang/admin_cotlang): use COTLang for extracting data from models in routines
- [Triggers and Contexts](/docs/documentation/automation/cotlang/triggers_and_contexts): more information on using data models within routines

## Help {#help}
- [Cotalker Platform Community](https://github.com/Cotalker/documentation/discussions): post your questions or search for previous answers given in the forum