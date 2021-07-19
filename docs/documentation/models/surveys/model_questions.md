---
title: Questions Model
---
import useBaseUrl from '@docusaurus/useBaseUrl'; 
import Highlight from '@theme/Highlight';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


| Field | Type | Description | Notes |
| ----  | ---- | ----------- | ----  |
| _id   | id   | Unique Identifier   | Unique. Exactly 24 chars. Valid chars [0-9a-f] |
| identifier | string | Unique Identifier | 
| contentType | string | Question Type
| code | Array<string\> | Array of settings. Depends on content type
| display | Array<string\> | Array of settings. Depends on content type
| modifiedAt | date | Last modification date
| createdAt | date | Entry creation date

:::note 
This is a simplified version. The complete model will be published soon.
:::