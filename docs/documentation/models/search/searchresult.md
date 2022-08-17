---
title: Search Category Results Model
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<span className="hero__subtitle">API Search Tool Results</span>



```json
{
    "categories": [
        {
            "name": "tasks",
            "results": [
                {
                    "_id": "62dacec2a134e617d5d449f1",
                    "name": "dolor",
                    "image": null,
                    "type": "hedgedoc",
                    "action": {
                        "elasticId": "hedgedoc_62f6c6ae6cafbf99af90cefa",
                        "task": "62dacec2a134e617d5d449f1",
                        "taskGroup": "62bf5e03654e96999b00e474",
                        "channel": "62dacebf9aca6500088ee40e",
                        "fileId": "62f6c6ae6cafbf99af90cefa"
                    },
                    "weight": 6.2053347,
                    "modifiedAt": "2022-08-12T21:41:40.888Z",
                    "tags": [
                        {
                            "type": "main",
                            "color": "#1133558f",
                            "display": "# 5",
                            "value": "62dacec2a134e617d5d449f1"
                        },
                        {
                            "type": "group",
                            "value": "62bf5e03654e962fdb00e468"
                        }
                    ],
                    "highlights": [
                        "dolor\n\n<em>Lorem</em> ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore"
                    ]
                }
            ],
            "facets": []
        },
        {
            "name": "users",
            "results": [
                {
                    "tags": [
                        {
                            "display": "Admin",
                            "color": "rgba(51, 204, 68, 1)",
                            "value": "Admin",
                            "type": "main"
                        }
                    ],
                    "_id": "62bf5ddc654e96f03700ad81",
                    "name": "Admin ",
                    "type": "user",
                    "action": {
                        "user": "62bf5ddc654e96f03700ad81"
                    },
                    "weight": 1,
                    "modifiedAt": "2022-07-01T20:50:18.772Z",
                    "highlights": []
                }
            ],
            "facets": []
        }
    ]
}
```