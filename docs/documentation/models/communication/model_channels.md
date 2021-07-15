---
title: Channels Model
sidebar_label: Channels
---
import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

A __channel__ is a space where users and bots can communicate through messages.

## Model {#model}

| Field | Type | Description | Notes |
| ----  | ---- | ----------- | ----  |
| _id   | id   | Unique Identifier   | Unique. Exactly 24 chars. Valid chars [0-9a-f] |
| group   | id   | Channel belongs to this group   | Exactly 24 chars. Valid chars [0-9a-f] |
| userIds   | Array\<id\>   | List of users in channel   | 
| propertyIds   | Array\<id\>   | List of channel properties   | 
| nameDisplay  | string | Display name   | Required |
| nameCode  | string | Identification code | Unique. Max 60 chars. Valid chars [a-z0-9_] |
| modifiedAt | date | Last modification date
| createdAt | date | Entry creation date
NOTE: This is a simplified version. Please check the [API](https://www.cotalker.com/swagger/core/?key=woubtjf4olr0t4zgutuwn6scbcm6hd3qh1cgl5obmohpbm3mfublnwcvv67lodgjvd3h86s9ppshtvmf95gepsqh6nizq9liu7f) docs for the full model.