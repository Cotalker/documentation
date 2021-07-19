---
title: Scheduler
sidebar_label: Scheduler
---
import useBaseUrl from '@docusaurus/useBaseUrl';

Schedules are automatizied tasks.
They can run once at a certain date or the can run with programmed frequency.
For example you can check if everybody has completed thier tasks at the end of the week.

## Model {#model}

| Field | Type | Description | Notes |
| ----  | ---- | ----------- | ----  |
| _id   | id   | Unique Identifier   | Unique. Exactly 24 chars. Valid chars [0-9a-f] |
| code  | string | Code Name | Required
| time | date | When to execute |
| cron | string | Program recurrence
| body | Object | Custom execution | See bot for structure
| modifiedAt | date | Last modification date
| createdAt | date | Entry creation date
NOTE: This is a simplified version. Please check the [API](https://www.cotalker.com/swagger/core/?key=woubtjf4olr0t4zgutuwn6scbcm6hd3qh1cgl5obmohpbm3mfublnwcvv67lodgjvd3h86s9ppshtvmf95gepsqh6nizq9liu7f) docs for the full model.
