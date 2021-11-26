---
title: File Data Model
sidebar_label: COTFile
---
import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# WIP

<span className="hero__subtitle">COTFile</span>

## Description {#description}

## Fields {#fields}

| Field | Description | Type | Notes |
| --- | --- | --- | --- |
| **company** | The ID of the company the file is found in. | [ObjectId<COTCompany\>](/docs/documentation/models/model_company) | |
| **contentType** | Indicates the category the file belongs to. | string | Options are: _image_, _video_, _document_ | DEPRECATED |
| **createdAt** | Date and time the file was uploaded. | ISODate | YYYY-MM-DDTHH:mm:ss.SSSZ |
| **fileName** | Indicates the file's name and extension. | string | |
| **key** | Indicates the relative path of the file. | string | The _key_ is needed to get the signed file URL. |
| **mimeType** | Indicates the file's type and format, e.g., `image/jpeg`, `video/mp4`, `application/pdf`. | string | [Click here](/docs/documentation/models/communication/model_messageContent) for more details about content types. |
| **modifiedAt** | Last time the file was modified. | ISODate | YYYY-MM-DDTHH:mm:ss.SSSZ |
| **size** | Indicates the byte size of the file. | number | |
| **status** | Indicates the files current status in the server. | string | Possible answers: _pending_, _processing_, _uploaded_, _deleted_, _error_ |
| **user** | User that sent the file. | [ObjectId<COTUser\>](/docs/documentation/models/users/model_users) | DEPRECATED |


## Deprecated {#deprecated}

| Field | Description | Type | Notes |
| --- | --- | --- | --- |
| **context** | | object | DEPRECATED |
| **data** | | object | DEPRECATED |
| **debug** | | object | DEPRECATED |
| **extension** | | string | DEPRECATED |
| **public** | | boolean | DEPRECATED |
| **totalSize** | | number | DEPRECATED |
| **url** | | string | DEPRECATED |
