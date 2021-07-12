---
id: databases
title: Databases
sidebar_label: Databases
---
import useBaseUrl from '@docusaurus/useBaseUrl'; 
import Highlight from '@theme/Highlight';

Companies can have many databases where they can store all kind of data. Some are company assets, other might be describe states.

For example "Store Locations", "Company Departments", "Products", "Clients", "Contacts", "Brands", "Task States" are Database examples.
<!--
<Highlight text="Green Sea" color="rgb(22, 160, 133)"/>

<Highlight text="Nephrtis" color="rgb(39, 174, 96)"/>

<Highlight text="Belize Hole" color="rgb(41, 128, 185)"/>

<Highlight text="Amethyst" color="rgb(155, 89, 182)"/>
<Highlight text="Wisteria" color="rgb(142, 68, 173)"/>

<Highlight text="Wet Asphalt" color="rgb(52, 73, 94)"/>
<Highlight text="Midnight Blue" color="rgb(44, 62, 80)"/>

<Highlight text="Sun Flower" color="rgb(241, 196, 15)"/>
<Highlight text="Orange" color="rgb(243, 156, 18)"/>

<Highlight text="Carrot" color="rgb(230, 126, 34)"/>
<Highlight text="Pumpkin" color="rgb(211, 84, 0)"/>

<Highlight text="Alizarin" color="rgb(231, 76, 60)"/>
<Highlight text="Pomegranate" color="rgb(192, 57, 43)"/>

<Highlight text="Clouds" color="rgb(236, 240, 241)"/>
<Highlight text="Silver" color="rgb(189, 195, 199)"/>

<Highlight text="Concrete" color="rgb(149, 165, 166)"/>
<Highlight text="Asbestos" color="rgb(127, 140, 141)"/>
-->
Each Database may hay rows, elements or properties. Each property has at least a <Highlight text="Name" color="rgb(26, 188, 156)"/>  a <Highlight text="Code" color="rgb(46, 204, 113)"/> and a <Highlight text="Unique Id" color="rgb(52, 152, 219)"/>. Each database may have more columns, so that the properties can be more descriptive e.g., "Store Locations" might have an Address, number of employees, size of store, performance indicators, and any other. 

## Database Model {#database-model}

| Field | Type | Description | Notes |
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
