---
title: Databases (Property Types)
---
import useBaseUrl from '@docusaurus/useBaseUrl'; 
import Highlight from '@theme/Highlight';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Companies can have many databases where they can store all kind of data. Some are company assets, other might be describe states.

For example "Store Locations", "Company Departments", "Products", "Clients", "Contacts", "Brands", "Task States" are Database examples.

Each Database may hay rows, elements or properties. Each property has at least a <Highlight text="Name" color="rgb(26, 188, 156)"/>  a <Highlight text="Code" color="rgb(46, 204, 113)"/> and a <Highlight text="Unique Id" color="rgb(52, 152, 219)"/>. Each database may have more columns, so that the properties can be more descriptive e.g., "Store Locations" might have an Address, number of employees, size of store, performance indicators, and any other. 

## Database Model {#database-model}


| ----  | ---- | ----------- | ----  |
| _id   | id   | Unique Identifier   | Unique. Exactly 24 chars. Valid chars [0-9a-f] |
| display  | string | Display Name | Required |
| code  | string | Code Name | Unique. Max 60 chars. Valid chars [a-z0-9_] |
| modifiedAt | date | Last modification date
| createdAt | date | Entry creation date
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