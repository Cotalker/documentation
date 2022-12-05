---
title: Search Category Results Model
---

:::caution Advertencia
Esta página aún no se encuentra traducida al español.
:::

import useBaseUrl from '@docusaurus/useBaseUrl';

<span className="hero__subtitle">API Search Category Results</span>

## Description {#description}
The _Search Category Results Model_ is used by the system for returning results when using the Search API.


## JSON Sample {#json}
The `categories` field is an array of objects that contain returned search results by category.

```json
{
    "categories": [
        {
            "name": "channels",
            "results": [
                {
                    "_id": "62fe8218a1a3eb0008eb0432",
                    "name": "chat",
                    "image": "",
                    "type": "channel",
                    "action": {
                        "channel": "62fe8218a1a3eb0008eb0432",
                        "group": "62ebcc5c5c14300008d38063"
                    },
                    "weight": 1,
                    "modifiedAt": "2022-08-18T18:16:56.473Z",
                    "tags": [
                        {
                            "type": "group",
                            "value": "62ebcc5c5c14300008d38063"
                        }
                    ],
                    "highlights": []
                },
                {
                    "_id": "62fe81b5a1a3eb0008eb03be",
                    "name": "chat 0",
                    "image": "",
                    "type": "channel",
                    "action": {
                        "channel": "62fe81b5a1a3eb0008eb03be",
                        "group": "62ebcc5c5c14300008d38063"
                    },
                    "weight": 0.6666666666666666,
                    "modifiedAt": "2022-08-18T18:15:17.699Z",
                    "tags": [
                        {
                            "type": "group",
                            "value": "62ebcc5c5c14300008d38063"
                        }
                    ],
                    "highlights": []
                },
                {
                    "_id": "62fe819ba1a3eb0008eb0384",
                    "name": "chat 1",
                    "image": "",
                    "type": "channel",
                    "action": {
                        "channel": "62fe819ba1a3eb0008eb0384",
                        "group": "62ebcc5c5c14300008d38063"
                    },
                    "weight": 0.3333333333333333,
                    "modifiedAt": "2022-08-18T18:14:51.829Z",
                    "tags": [
                        {
                            "type": "group",
                            "value": "62ebcc5c5c14300008d38063"
                        }
                    ],
                    "highlights": []
                }
            ],
            "facets": []
        }
    ]
}
```

## Fields {#fields}

Field | Description | Type | Notes
--- | --- | --- | ---
**name** | Indicates the search type or category. | string |
**results** | Array of results returned according to the category. | object[ ] | 
**results[x]._id** | Id of the returned search result. | string |
**results[x].name** | Corresponds to the display name of the returned result. | string | 
**results[x].image** | Indicates an image associated with the result. | string | 
**results[x].type** | Indicates the type or category of the search query. | string | 
**results[x].action** | Object containing result context data, i.e., the ObjectIds related to the result. | object | The object's fields vary depending on the result type.
**results[x].weight.** | Number that indicates the result's position in the list of returned results. | number |
**results[x].modifiedAt** | Indicates the date and time the result was last modified. | ISODate | "YYYY-MM-DDTHH:mm:ss.SSSZ"
**results[x].tags** | Array of result data. | object[ ] | Objects depend on the result type.
**results[x].highlights** | Array displaying snippets of found keywords in their context. |
**facets** | Returns details of search results based on tags, e.g., how many results have the same tag. | [ ] |

