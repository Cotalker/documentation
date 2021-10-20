---
title: Tasks Data Model
sidebar_label: COTTask
---
import useBaseUrl from '@docusaurus/useBaseUrl';

:::caution WIP
Please check the [API](https://www.cotalker.com/swagger/core/?key=woubtjf4olr0t4zgutuwn6scbcm6hd3qh1cgl5obmohpbm3mfublnwcvv67lodgjvd3h86s9ppshtvmf95gepsqh6nizq9liu7f) docs for the full model.
:::

A task is the representation of an asset and its state.

## Model {#model}

| Field | Type | Description | Notes |
| ----  | ---- | ----------- | ----  |
| _id   | id   | Unique Identifier   | Unique. Exactly 24 chars. Valid chars [0-9a-f] |
| name | string | Name of task | 
| assignee | id | Task Assignee | 
| status | id | Current State Property |
| status1 | id | State Property |
| status2 | id | State Property |
| status3 | id | State Property |
| status4 | id | State Property |
| status5 | id | State Property |
| asset | id | Task asset representation |  
| modifiedAt | date | Last modification date
| createdAt | date | Entry creation date



