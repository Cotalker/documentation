---
id: surveys
title: Surveys
sidebar_label: Surveys
---
import useBaseUrl from '@docusaurus/useBaseUrl'; 

Surveys are a list of questions. Each question has a `type` and `identifier`. 

## Survey Model {#survey-model}

| Field | Type | Description | Notes |
| ----  | ---- | ----------- | ----  |
| _id   | id   | Unique Identifier   | Unique. Exactly 24 chars. Valid chars [0-9a-f] |
| display  | string | Display Name | Required |
| code  | string | Code Name | Unique. Max 60 chars. Valid chars [a-z0-9_] |
| propertiesChannel | Array<string\> | Array of Database Types
| propertiesLimit | Array<string\> | Array of Properties Codes
| permissions | Array<id\> | Array of access roles
| modifiedAt | date | Last modification date
| createdAt | date | Entry creation date
NOTE: This is a simplified version. Please check the [API](https://www.cotalker.com/swagger/core/?key=woubtjf4olr0t4zgutuwn6scbcm6hd3qh1cgl5obmohpbm3mfublnwcvv67lodgjvd3h86s9ppshtvmf95gepsqh6nizq9liu7f) docs for the full model.

## Question Model {#question-model}
| Field | Type | Description | Notes |
| ----  | ---- | ----------- | ----  |
| _id   | id   | Unique Identifier   | Unique. Exactly 24 chars. Valid chars [0-9a-f] |
| identifier | string | Unique Identifier | 
| contentType | string | Question Type
| code | Array<string\> | Array of settings. Depends on content type
| display | Array<string\> | Array of settings. Depends on content type
| modifiedAt | date | Last modification date
| createdAt | date | Entry creation date
NOTE: This is a simplified version. Please check the [API](https://www.cotalker.com/swagger/core/?key=woubtjf4olr0t4zgutuwn6scbcm6hd3qh1cgl5obmohpbm3mfublnwcvv67lodgjvd3h86s9ppshtvmf95gepsqh6nizq9liu7f) docs for the full model.


## Client {#client}
### Survey in channel {#survey-in-channel}
<img alt="" src={useBaseUrl('img/models_surveys_2.png')} />
