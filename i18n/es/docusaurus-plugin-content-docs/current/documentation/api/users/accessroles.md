---
id: accessroles
title: Access Roles
sidebar_label: Access Roles
---
import useBaseUrl from '@docusaurus/useBaseUrl';

Access roles are a set permissions that can be assigned to users.
They can limit access to groups, state machines, surveys and others elements.

## Model {#model}

| Field | Type | Description | Notes |
| ----  | ---- | ----------- | ----  |
| _id   | id   | Unique Identifier   | Unique. Exactly 24 chars. Valid chars [0-9a-f] |
| name  | string | Display   | Required |
| code  | string | Code Name | Unique. Max 60 chars. Valid chars [a-z0-9_] |
| permissions | Array\<string\> | List of permissions 
| modifiedAt | date | Last modification date
| createdAt | date | Entry creation date
NOTE: This is a simplified version. Please check the [API](https://api.cotalker.com) docs for the full model.
