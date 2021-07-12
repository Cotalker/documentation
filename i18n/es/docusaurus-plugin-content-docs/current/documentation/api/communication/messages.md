---
title: Messages
sidebar_label: Messages
---
import useBaseUrl from '@docusaurus/useBaseUrl';

## Model {#model}

| Field | Type | Description | Notes |
| ----  | ---- | ----------- | ----  |
| _id   | id   | Unique Identifier   | Unique. Exactly 24 chars. Valid chars [0-9a-f] |
| sentBy | id | User who sent the message | |
| content  | string | data to display | Required |
| contentType | string | how to display data | Required | 
| modifiedAt | date | Last modification date
| createdAt | date | Entry creation date
NOTE: This is a simplified version. Please check the [API](https://www.cotalker.com/swagger/core/?key=woubtjf4olr0t4zgutuwn6scbcm6hd3qh1cgl5obmohpbm3mfublnwcvv67lodgjvd3h86s9ppshtvmf95gepsqh6nizq9liu7f) docs for the full model.

## Client {#client}

### Channel with text messages {#channel-with-text-messages}

<img alt="" src={useBaseUrl('img/channelopen.jpg')} />

### Channel with with survey {#channel-with-with-survey}

<img alt="" src={useBaseUrl('img/channelform.jpg')} />

### Channel with system messages {#channel-with-system-messages}

<img alt="" src={useBaseUrl('img/channelsystem.jpg')} />

### Channel with images {#channel-with-images}

<img alt="" src={useBaseUrl('img/channelimg.jpg')} />

