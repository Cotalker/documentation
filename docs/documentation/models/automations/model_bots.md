---
title: Bots Data Model
sidebar_label: COTBot
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
NOTE: This is a simplified version. Please check the [API](https://www.cotalker.com/swagger/core/?key=woubtjf4olr0t4zgutuwn6scbcm6hd3qh1cgl5obmohpbm3mfublnwcvv67lodgjvd3h86s9ppshtvmf95gepsqh6nizq9liu7f) docs for the full model.

### CommModel {#commmodel}

| Field | Type | Description | Notes |
| ----  | ---- | ----------- | ----  |
| surveysId | Array\<id\> | Surveys that trigger bot | |
| slashCmd | string | Word that triggers bot e.g., giphy |
| isSlash | boolean | Activated by "/cmd" | 
| isSurvey | boolean | Activated by some survey | 
NOTE: This is a simplified version. Please check the [API](https://www.cotalker.com/swagger/core/?key=woubtjf4olr0t4zgutuwn6scbcm6hd3qh1cgl5obmohpbm3mfublnwcvv67lodgjvd3h86s9ppshtvmf95gepsqh6nizq9liu7f) docs for the full model.

### PBModel {#pbmodel}

| Field | Type | Description | Notes |
| ----  | ---- | ----------- | ----  |
| start | string | first step 
| stages | Array\<StageModel\> | | |
| stages[].key | string | stage code | |
| stages[].name | string | parametrized bot | |
| stages[].data | Object | step input data | |
| stages[].next | Object | possible next steps | | 

NOTE: This is a simplified version. Please check the [API](https://www.cotalker.com/swagger/core/?key=woubtjf4olr0t4zgutuwn6scbcm6hd3qh1cgl5obmohpbm3mfublnwcvv67lodgjvd3h86s9ppshtvmf95gepsqh6nizq9liu7f) docs for the full model.