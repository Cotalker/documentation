---
id: bots
title: Bots
sidebar_label: Bots
---
import useBaseUrl from '@docusaurus/useBaseUrl'; 
import Mermaid from '@theme/Mermaid';


Bots Represents a actions that triggers based on its configuration.

## Model {#model}

| Field | Type | Description | Notes |
| ----  | ---- | ----------- | ----  |
| _id   | id   | Unique Identifier   | Unique. Exactly 24 chars. Valid chars [0-9a-f] |
| name  | string | Display   | Required |
| parametrizedBot | PBModel | Automatization |
| commands | CommModel | Who triggers this bot |  
| global | boolean | If is company-wide 
| modifiedAt | date | Last modification date
| createdAt | date | Entry creation date
NOTE: This is a simplified version. Please check the [API](https://api.cotalker.com) docs for the full model.

### CommModel {#commmodel}

| Field | Type | Description | Notes |
| ----  | ---- | ----------- | ----  |
| surveysId | Array\<id\> | Surveys that trigger bot | |
| slashCmd | string | Word that triggers bot e.g., giphy |
| isSlash | boolean | Activated by "/cmd" | 
| isSurvey | boolean | Activated by some survey | 
NOTE: This is a simplified version. Please check the [API](https://api.cotalker.com) docs for the full model.

### PBModel {#pbmodel}

| Field | Type | Description | Notes |
| ----  | ---- | ----------- | ----  |
| start | string | first step 
| stages | Array\<StageModel\> | | |
| stages[].key | string | stage code | |
| stages[].name | string | parametrized bot | |
| stages[].data | Object | step input data | |
| stages[].next | Object | possible next steps | | 

NOTE: This is a simplified version. Please check the [API](https://api.cotalker.com) docs for the full model.

<!--
## Parametrized Bots {#parametrized-bots}
<img alt="Docusaurus with Keytar" src={useBaseUrl('img/bot_flow.png')} />

Parametrized bots is programming language for Cotalker that allows

| Parametrized Bots        | Description |
| ------------- | ----- | 
|  PBAnswerChecker | Checks the value of a survey |
|  PBChangeState| Changes the state of a task |
|  PBChannelAddUser| Modify channel users |
|  PBChannelToTaskSE| Modify task channel |
|  PBCleanChannel| Removes message from channel  |
|  PBConditional| Flow execution depending on condition |
|  PBCopySurvey| Copy survey to channel |
|  PBCreateChannel| Creates a new channel  |
|  PBCreateProperty| Creates a new property |
|  PBCreateTask| Create a new task |
|  PBCreateUser| Create a new User  |
|  PBEmail| Send an email |
|  PBCalendar| Create a ICS |
|  PBGiphy| Send image from [giphy](https://giphy.com) |
|  PBHideMessages| Remove messages from channel |
|  PBMessage| Send message to channel |
|  PBPdf| Convert HTML to PDF |
|  PBQRCode| Generate QR-code image |
|  PBSendSurvey| Send survey to channel |
|  PBSwitchList| Conditional flow execution | 
|  PBTaskAddEditor| Edit Task editors |
|  PBTemplate | Create HTML from template and data |
|  PBUpdateChannel| Modify channel |
|  PBUpdateProperty| Modify property |
|  PBUpdateTask| Modify Task |
|  PBUpdateUser| Modify User |
|  FCEach| Flow Control: Execute rountine for each data |
|  FCIfElse| Flow Control: Conditional execution |
|  FCSwitchAll| Flow Control: Exectute all matching |
|  FCSwitchOne| Flow Control: Execute first matching |
|  FCSleep| Flow Control: Wait N seconds before continuing |
|  NWRequest| Perform custom network request |
|  COTScript | Cotalker custom script |
 -->