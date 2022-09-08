---
title: Search Engine Model
sidebar_label: Search Engine Model
---

:::caution Advertencia
Esta página aún no se encuentra traducida al español.
:::

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
[{
        "name": "tasksElastic",
        "options": {
            "entityType": "hedgedoc",
            "limit": 10,
            "groups": ["62bf5e03654e964e3800e461"]
        }
    },
    {
        "name": "users",
        "options": {
            "limit": 10
        }
    }

]
```

_Encoded sample:_
```
W3sKICAgICAgICAibmFtZSI6ICJ0YXNrc0VsYXN0aWMiLAogICAgICAgICJvcHRpb25zIjogewogICAgICAgICAgICAiZW50aXR5VHlwZSI6ICJoZWRnZWRvYyIsCiAgICAgICAgICAgICJsaW1pdCI6IDEwLAogICAgICAgICAgICAiZ3JvdXBzIjogWyI2MmJmNWUwMzY1NGU5NjRlMzgwMGU0NjEiXQogICAgICAgIH0KICAgIH0sCiAgICB7CiAgICAgICAgIm5hbWUiOiAidXNlcnMiLAogICAgICAgICJvcHRpb25zIjogewogICAgICAgICAgICAibGltaXQiOiAxMAogICAgICAgIH0KICAgIH0KCl0=
```

:::tip
To encode the array into Base 64 format, you can use a tool like [Base64](https://www.base64encode.org/).
:::


## Fields {#fields}

Field | Description | Type | Notes
---|---|---|---
**name** | Indicates the search category or type that is being configured.<br/>_Options are:_ <br/>`users` \| `tasks` \| `public-tasks` \| `channels` \| `properties` \| `tasksElastic` | string | `tasksElastic` is a "smarter" search engine, i.e., it enables flexible search rules that allows the engine to return additional results that are not exact but similar to the search query. <br/><br/>`public-tasks` is still in beta.
**options** | Indicates the parameters used to filter searches in the given category or type. | object | Parameters are relative to the category, e.g., the parameters for searching _properties_ follow the descriptions of parameters available in the _Properties API_.
**options.admin** | Available only when `name` is set to `tasksElastic`, `tasks`, `channels`, `properties`, `users`. | boolean | 
**options.created** | Displays results created on the indicated date and time. | Date | Accepts either ISODate or Unix Epoch Time formats.
**options.createdGt** | Displays results created after the indicated date and time. | Date | Accepts either ISODate or Unix Epoch Time formats.
**options.createdGte** | Displays results created on or after the indicated date and time. | Date |Accepts either ISODate or Unix Epoch Time formats.
**options.createdLt** | Displays results created before the indicated date and time. | Date | Accepts either ISODate or Unix Epoch Time formats.
**options.createdLte** | Displays results created on or before the indicated date and time. | Date | Accepts either ISODate or Unix Epoch Time formats.
**options.disableSerial** | By default, if a query begins with a number, e.g., `#18` or `18`, tasks with that serial number will be returned in the response. If activated, this behavoir is disabled. | boolean | This allows you to search through task names that have numbers in them and avoid including the automatically generated task serial number.
**options.entityType** | Available only when `name` is set to `tasksElastic`. Indicates the task-associated category or type in which to carry out the "elastic" (smart) search. If no entityType is given, the `taskElastic` engine will search through all its categories. | string | _Options are:_ <br/>`task` \| `hedgedoc` \| `property` \| `channel` \| `user` <br/><br/>`hedgedoc` refers to [notes](/docs/documentation/client/notes) contained within tasks.
**options.groups** | Limits search within the [groups](/docs/documentation/models/communication/model_groups) specified in the array. | "COTGroup<\ObjectId>"[ ] | Available only when `name` is set to `tasksElastic`, `tasks`, `channels`.
**options.isActive** | Displays results depending on their `isActive` status. | boolean or `all`, |
**options.limit** | Limits the number of search results returned in a single page. | number | By default, `limit` is set to `2`.
**options.orderBy** | Orders results in ascending or descending order. | `asc` or `desc`, |
**options.page** | Displays the results of the indicated page. | number | Used best with the `limit` parameter.
**options.modified** | Displays results based on the date and time they were modified. | Date | Accepts either ISODate or Unix Epoch Time formats.
**options.modifiedGt** | Displays results modified after the indicated date and time. | Date | Accepts either ISODate or Unix Epoch Time formats.
**options.modifiedGte** | Displays results modified on or after the indicated date and time. | Date | Accepts either ISODate or Unix Epoch Time formats.
**options.modifiedLt** | Displays results modified before the indicated date and time. | Date | Accepts either ISODate or Unix Epoch Time formats.
**options.modifiedLte** | Displays results modified on or before the indicated date and time. | Date | Accepts either ISODate or Unix Epoch Time formats.
**options.sortBy** | Sorts results by the indicated field. Sorting is carried out using the available parameter options in the respective API request, i.e., channels can be sorted according to the `sortBy` options in the [Channels API](/docs/documentation/api/communication/channels#get-all-channels). | string |


