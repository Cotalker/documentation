---
title: Collections (Property Types) Data Model
sidebar_label: COTPropertyType
---
import useBaseUrl from '@docusaurus/useBaseUrl'; 


[_Property types_, also know as _collections_](/docs/documentation/admin/admin_properties#collection), are versatile databases that can be set up to carry out diverse functions in the Cotalker environment. _Property types_ can store company assets, describe workflow states, act as a filter, contain options for multiple-choice questions in surveys, grant permissions, and much more. Some common examples include "Store Locations", "Company Departments", "Products", "Clients", "Contacts", "Brands", "Task States", among others.

_Property types_ contain [_properties_ or _elements_](/docs/documentation/admin/admin_properties#elements), which can be thought of as the rows in a table or better yet, as the documents in a MongoDB collection. Each _property_ has at least a "Name", a "Code" and a "Unique Id". Each collection may have more columns, i.e., additional fields, so that the _properties_ can be more descriptive, e.g., "Store Locations" might have an address, number of employees, store size, performance indicators, or any other information that needs to be associated with the _property_.

```json
{
        "code": "string",
        "company": "string",
        "create": {
          "active": true,
          "requiredPermission": [
            "string"
          ]
        },
        "createdAt": "2021-10-28T09:53:52.837Z",
        "display": "string",
        "hierarchyLevel": 0,
        "isActive": true,
        "modifiedAt": "2021-10-28T09:53:52.837Z",
        "newsLevel": 0,
        "schemaNodes": [
          {
            "basicType": "string",
            "default": {},
            "description": "string",
            "display": "string",
            "isActive": true,
            "isArray": true,
            "key": "string",
            "subType": "string",
            "validators": {
              "arrayMax": 0,
              "arrayMin": 0,
              "max": 0,
              "min": 0,
              "required": true,
              "validator": "string"
            },
            "visualization": {
              "displayAs": {}
            },
            "weight": 0
          }
        ],
        "skipCodeValidation": true
      }
```

## Database Model {#database-model}

| Field | Type | Description | Notes |
| ----  | ---- | ----------- | ---- |
| _id   | id   | Unique Identifier   | Unique. Exactly 24 chars. Valid chars [0-9a-f] |
| display  | string | Display Name | Required |
| code  | string | Code Name | Unique. Max 60 chars. Valid chars [a-z0-9_] |
| modifiedAt | date | Last modification date | |
| createdAt | date | Entry creation date | |

NOTE: This is a simplified version. Please check the [API](https://www.cotalker.com/swagger/core/?key=woubtjf4olr0t4zgutuwn6scbcm6hd3qh1cgl5obmohpbm3mfublnwcvv67lodgjvd3h86s9ppshtvmf95gepsqh6nizq9liu7f) docs for the full model.

## Property Model {#property-model}

| Field | Type | Description | Notes |
| ----  | ---- | ----------- | ----  |
| _id   | id   | Unique Identifier   | Unique. Exactly 24 chars. Valid chars [0-9a-f] |
| display  | string | Display Name | Required |
| code  | string | Code Name | Unique. Max 60 chars. Valid chars [a-z0-9_] |
| extra | Object | Custom/dynamic columns for data | 
| modifiedAt | date | Last modification date
| createdAt | date | Entry creation date
NOTE: This is a simplified version. Please check the [API](https://www.cotalker.com/swagger/core/?key=woubtjf4olr0t4zgutuwn6scbcm6hd3qh1cgl5obmohpbm3mfublnwcvv67lodgjvd3h86s9ppshtvmf95gepsqh6nizq9liu7f) docs for the full model.