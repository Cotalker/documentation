---
id: tasks
title: Tasks
sidebar_label: Tasks
---
import useBaseUrl from '@docusaurus/useBaseUrl';

A task is the representation of an asset and its state.

Some examples:

| Asset | States | 
| ----- | ------ | 
| Task | Open, Closed |
| Job posting | Scouting, Interviews, Position Filled |
| Client | Lead, First Meeting, Deal Closed |
| Issue | Open, Verified, Fixed |
| Contact | Pending, Responded |
| Machine | Working, broken, At maintenance |
| Store | Good, Average, Bad | 

## Model {#model}

| Field | Type | Description | Notes |
| ----  | ---- | ----------- | ----  |
| _id   | id   | Unique Identifier   | Unique. Exactly 24 chars. Valid chars [0-9a-f] |
| name | string | Name of task | 
| assignee | id | Task Assignee | 
| status | id | Current State Property |
| asset | id | Task asset representation |  
| modifiedAt | date | Last modification date
| createdAt | date | Entry creation date
NOTE: This is a simplified version. Please check the [API](https://api.cotalker.com) docs for the full model.

