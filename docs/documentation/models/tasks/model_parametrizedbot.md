---
title: Parametrized Bot Data Model
sidebar_label: COTParametrizedBot
---
import useBaseUrl from '@docusaurus/useBaseUrl'; 
import Highlight from '@theme/Highlight';

<span className="hero__subtitle"><em>COTParametrizedBot</em></span>
<br/>
<br/>


| Field | Description | [Type](/docs/documentation/models/overview_model#data-types) | Note |
| --- | --- | --- | --- |
| **maxIterations** | | number |
| **stages** | | object[ ] | 
| **stages[index].customNetworkRequest** | | object[ ]
| **stages[index].customNetworkRequest[index].body** | | object |
| **stages[index].customNetworkRequest[index].endpoint** | | string[ ]
| **stages[index].customNetworkRequest[index].findOne** | | boolean |
| **stages[index].customNetworkRequest[index].keyOutput** | | string |
| **stages[index].customNetworkRequest[index].method** | | string | Enum: ["GET", "Post"]
| **stages[index].customNetworkRequest[index].query** | | object |
| **stages[index].data** | | object |
| **stages[index].key** | | string |
| **stages[index].name** | string |
| **stages[index].next** | object |
| **stages[index].version** | | string |
| **start** | | string |
| **version** | | number |
