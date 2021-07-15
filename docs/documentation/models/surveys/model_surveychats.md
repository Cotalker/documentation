---
title: Survey Chats
---
import useBaseUrl from '@docusaurus/useBaseUrl'; 
import Highlight from '@theme/Highlight';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Subtitle {#subtitle}
## Survey Chats Model TEMP {#survey-chats-model-temp}

| Field | Type | Description | Notes |
| ----  | ---- | ----------- | ----  |
| _id   | id   | Unique Identifier   | Unique. Exactly 24 chars. Valid chars [0-9a-f] |
| sender | string | sender name 
| survey  | id | survey linked to | Unique. Exactly 24 chars. Valid chars [0-9a-f] |
| order  | number |
| contentType  | string | application/vnd.cotalker.survey'
| content | string | 
| contentArray | Array | Question id's
| isActive | boolean | 
| modifiedAt | date |
| isSystemModel | boolean |
NOTE: This is a simplified version. Please check the [API](https://www.cotalker.com/swagger/core/?key=woubtjf4olr0t4zgutuwn6scbcm6hd3qh1cgl5obmohpbm3mfublnwcvv67lodgjvd3h86s9ppshtvmf95gepsqh6nizq9liu7f) docs for the full model.