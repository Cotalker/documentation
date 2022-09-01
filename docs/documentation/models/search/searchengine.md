---
title: Search Engine Model
sidebar_label: Search Engine Model
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<span className="hero__subtitle">Search Parameters for use with Search API</span>

## Description {#description}
The Search Engine Model is an array of objects containing search engine parameters. These parameters allow customizing searches made through Cotalker's [Search API](/docs/documentation/api/search).

The Search Engine Model has the following general structure: `[{"name": string, "options": object}]`.

:::caution important
The Search Engine Model must be converted to Base64 format for it to be used in the Search API.
:::

## JSON Sample {#json}
```json
[
    {
        "name": "tasksElastic",
        "options": {
            "entityType": "hedgedoc", 
            "limit":2
            }
    },
    {
        "name": "users",
        "options": {
            "limit":10
            }
    }
]
```

_Encoded sample:_
```
W3sibmFtZSI6InRhc2tzRWxhc3RpYyIsIm9wdGlvbnMiOnsiZW50aXR5VHlwZSI6ImhlZGdlZG9jIiwgImxpbWl0IjoyfX0seyJuYW1lIjoidXNlcnMiLCJvcHRpb25zIjp7ImxpbWl0IjoxMH19XQ==
```

:::tip
To encode the array into Base 64 format, you can use a tool like [Base 64](https://www.base64encode.org/).
:::


## Fields {#fields}
Field | Description | Type | Notes
---|---|---|---
**name** | Indicates the search category or type that is being configured.<br/>_Options are:_ <br/>`users` \| `tasks` \| `public-tasks` \| `channels` \| `properties` \| `tasksElastic` | string | `public-tasks` is still in beta.
**options** | Indicates the parameters used to filter searches in the given category or type. | object | Parameters are relative to the category, e.g., the parameters for searching _properties_ follow the descriptions of parameters available in the _Properties API_.
**options.limit** | Limits the number of search results returned in a single page. | number | By default, `limit` is set to `2`.
**options.page** | Displays the results of the indicated page. | number | Used best with the `limit` parameter.
**options.count** | Adds a | boolean |
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
**options.debug** | | boolean |
**options.admin** | Available only on `tasksElastic`, `tasks`, `channels`, `properties`, `users`. | boolean | 
**options.disableSerial** | By default, if a query begins with a number, e.g., `#18` or `18`, tasks with that serial number will be returned in the response. If activated, this behavoir is disabled. | boolean | This allows you to search through task names that have numbers in them and avoid including the automatically generated task serial number.
**options.entityType** | Available only on `tasksElastic`. Indicates the type of _| string | _Options are:_ <br/>`task` \| `hedgedoc` \| `property` \| `channel` \| `user`
**options.groups** | Available only on `tasksElastic`, `tasks`, `channels`. | string[ ] |
