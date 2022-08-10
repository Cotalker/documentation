---
title: Search Engines Object Data Model
sidebar_label: COTCompanySearchEngines
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<span className="hero__subtitle">COTCompanySearchEngines</span>

## Description {#description}
Within the COTCompany data model, the `companies.searchEngines` field is an array of objects that permits configuring search query responses made through the platform's UI [search tool](/docs/documentation/client/client_search).

## JSON Sample {#json}
The `searchEngines` object has the following general structure: `[{"name": string, "options": object}]`.

In the `companies` sample found below, you can find the `searchEngines` object array on lines 11 to 20.

```json {11} showLineNumbers
{
    "defaultCountry": "US",
    "defaultLanguage": "es",
    "isActive": true,
    "_id": "62f2b06e9682bd2711a27c46",
    "subdomain": "kohannya",
    "displayName": "kohannya",
    "legalName": "kohannya",
    "createdAt": "2022-05-23T14:12:24.879Z",
    "modifiedAt": "2022-08-09T19:01:27.828Z",
    "searchEngines": [
        {
            "_id": "62f2b079921d0d5fc4c2c79b",
            "name": "users",
            "options": {
                "orderBy": "asc",
                "limit": 10
            }
        }
    ]
}
```

## Fields {#fields}
Field | Description | Type | Notes
---|---|---|---
**name** | Indicates the search field or type that is being configured. | string | _Options are:_ <br/>`users` \| `tasks` \| `public-tasks` \| `channels` \| `properties` \| `tasksElastic`
**options** | Indicates the parameter used to filter searches in the given field or type. | object | 
**options.limit** | | number |
**options.page** | | number |
**options.count** | | boolean |
**options.orderBy** | | `asc` or `desc`,
**options.sortBy** | | string |
**options.isActive** | | boolean or `all`,
**options.modified** | | Date |
**options.modifiedGt** | | Date |
**options.modifiedGte** | | Date |
**options.modifiedLt** | | Date |
**options.modifiedLte** | | Date |
**options.created** | | Date |
**options.createdGt** | | Date |
**options.createdGte** | | Date |
**options.createdLt** | | Date |
**options.createdLte** | | Date |
**options.debug** | | boolean |
**options.admin** | Available only on `taskElastic`. | boolean | 
**options.groups** | Available only on `taskElastic`. | string[ ] | 
**options.entityType** | Available only on `taskElastic`. | string | _Options are:_ <br/>`task` \| `hedgedoc` \| `property` \| `channel` \| `user`
