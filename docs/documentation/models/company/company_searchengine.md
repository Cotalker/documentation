---
title: Search Engines Data Model
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<span className="hero__subtitle">COTCompany</span>

## Description {#description}
Within the COTCompany data model, the `companies.searchEngines` field is an array of objects that permits configuring search query responses made through the platform's UI [search tool](/docs/documentation/client/client_search).

:::info
- If left blank, all search engines will be searched through.
- When search engine objects are placed in the array, only the specified search engines will be used in the UI search tool.
:::

## JSON Sample {#json}
The `searchEngines` object has the following general structure: `[{"name": string, "options": object}]`.

_In the `companies` sample below, you can find the `searchEngines` object array on lines 11 to 27._
```json {11} showLineNumbers
{
    "defaultCountry": "US",
    "defaultLanguage": "en",
    "isActive": true,
    "_id": "62fcdc16e341c5b6f2a23992",
    "subdomain": "lorem",
    "displayName": "lorem",
    "legalName": "lorem",
    "createdAt": "2022-07-01T20:49:32.158Z",
    "modifiedAt": "2022-08-17T12:03:42.726Z",
    "searchEngines": [
        {
            "_id": "62fcdc22739ece121e506876",
            "name": "users",
            "options": {
                "limit": 100,
                "orderBy": "asc"
            }
        },
        {
            "_id": "62fcdc297daf1a16d4c6e78c",
            "name": "tasksElastic",
            "options": {
                "entityType": "hedgedoc"
            }
        }
    ]
}
```

## Fields {#fields}
Field | Description | Type | Notes
---|---|---|---
**name** | Indicates the search category or type that is being configured.<br/>_Options are:_ <br/>`users` \| `public-tasks` \| `channels` \| `properties` \| `tasksElastic` | string | `public-tasks` is still in beta.
**options** | Indicates the parameters used to filter searches in the given category or type. | object | Parameters are relative to the category, e.g., the parameters for searching for _properties_ recur to the query parameters available in the [Properties API](/docs/documentation/api/databases/properties#get-all).
**options.limit** | Limits the number of search results returned in a single page. | number | By default, `limit` is set to `2`.
**options.orderBy** | Orders results in ascending or descending order. | `asc` or `desc`, |
**options.sortBy** | Sorts results by the indicated field. Sorting is carried out using the available parameter options in the respective API request, i.e., channels can be sorted according to the `sortBy` options in the [Channels API](/docs/documentation/api/communication/channels#get-all-channels). | string |
**options.isActive** | Displays results depending on their `isActive` status. | boolean or `all`, |
**options.modified** | Displays results based on the date and time they were modified. | Date |
**options.modifiedGt** | Displays results modified after the indicated date and time. | Date |
**options.modifiedGte** | Displays results modified on or after the indicated date and time. | Date |
**options.modifiedLt** | Displays results modified before the indicated date and time. | Date |
**options.modifiedLte** | Displays results modified on or before the indicated date and time. | Date |
**options.created** | Displays results created on the indicated date and time. | Date |
**options.createdGt** | Displays results created after the indicated date and time. | Date |
**options.createdGte** | Displays results created on or after the indicated date and time. |
**options.createdLt** | Displays results created before the indicated date and time. | Date |
**options.createdLte** | Displays results created on or before the indicated date and time. | Date |
**options.disableSerial** | By default, if a query begins with a number, e.g., `#18` or `18`, tasks with that serial number will be returned in the response. If activated, this behavoir is disabled. | boolean | This allows you to search through task names that have numbers in them and avoid including the automatically generated task serial number.
**options.entityType** | Available only on `tasksElastic`. Indicates the type or category to search through. | string | _Options are:_ <br/>`task` \| `hedgedoc` \| `property` \| `channel` \| `user`
**options.groups** | Available only on `tasksElastic`, `channels`. | string[ ] |

## Additional Resources {#resources}
- [Search Tool (UI)](/docs/documentation/client/client_search)
- [Search API](/docs/documentation/api/search)
- [Search Engine Model](/docs/documentation/models/search/searchengine)
- [Search Category Results Model](/docs/documentation/models/search/searchresult)