---
title: Users Model
sidebar_label: Users
---

A __User__ represents a person or bot that can perform actions within a company and execute client-side actions as sending messages and getting channels. Their access roles will determine which (administrative) endpoint they may use. 

## User main fields (COTUser) {#user-main-fields-cotuser}

| Field | Type | Description | Notes |
| ----  | ---- | ----------- | ----  |
| _id   | id   | Unique Identifier   | [ObjectId](/docs/getting_started/temp/glossary#ObjectId ) |
| email | string | Login email | Unique
| jobTitle | string | Job | deprecated |
| isActive | boolean | Can user login and user the API |
| name.names | string | User names |
| name.lastname | string | User last name | 
| modifiedAt | date | Last modification date
| createdAt | date | Entry creation date
| accessroles | array-id | List of access roles | [Access Roles API](/docs/documentation/api/users/accessroles)
| job | objectId | Indicates the user's job title. | This job title has assigned other values which will grant the user certain access or permit certain behavior. |

NOTE: This is a simplified version. Please check the [API](https://www.cotalker.com/swagger/core/?key=woubtjf4olr0t4zgutuwn6scbcm6hd3qh1cgl5obmohpbm3mfublnwcvv67lodgjvd3h86s9ppshtvmf95gepsqh6nizq9liu7f) docs for the full data model.