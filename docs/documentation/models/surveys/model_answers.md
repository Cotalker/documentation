---
title: Answers Model
sidebar_label: Answers
---
import useBaseUrl from '@docusaurus/useBaseUrl'; 

An answer is the representation of a filled survey.
It contains the latest version of the survey data.

## Model {#model}

| Field | Type | Description | Notes |
| ----  | ---- | ----------- | ----  |
| uuid   | string   | Unique Identifier   | Unique. Exactly 24 chars. Valid chars [0-9a-f] |
| channel  | id | Unique Identifier   | Unique. Exactly 24 chars. Valid chars [0-9a-f] |
| user | id | Unique Identifier   | Unique. Exactly 24 chars. Valid chars [0-9a-f] |
| survey | id | Unique Identifier   | Unique. Exactly 24 chars. Valid chars [0-9a-f] |
| formId | id | Refers to `messages.form.id`. | Used for retriving [_messages_](/docs/documentation/api/communication/messages) |
| modifiedAt | date | Last modification date
| createdAt | date | Entry creation date
| data | Array<DataModel\> | List of Data
NOTE: This is a simplified version. Please check the [API](https://www.cotalker.com/swagger/core/?key=woubtjf4olr0t4zgutuwn6scbcm6hd3qh1cgl5obmohpbm3mfublnwcvv67lodgjvd3h86s9ppshtvmf95gepsqh6nizq9liu7f) docs for the full model.

### DataModel {#datamodel}
 | Field | Type | Description | Notes |
 | ----  | ---- | ----------- | ----  |
 | identifier   | string   | Question Identifier | 
 | process | Array<string\> | Processed Data |
 | contentType | string | Question Type
NOTE: This is a simplified version. Please check the [API](https://www.cotalker.com/swagger/core/?key=woubtjf4olr0t4zgutuwn6scbcm6hd3qh1cgl5obmohpbm3mfublnwcvv67lodgjvd3h86s9ppshtvmf95gepsqh6nizq9liu7f) docs for the full model.