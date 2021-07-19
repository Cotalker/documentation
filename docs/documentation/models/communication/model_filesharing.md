---
title: File Sharing Modal
sidebar_label: File Sharing
---

### Response Schema
_The new instance of a COTFile is returned._

| Field | Type | Description | Notes |
| ----- | ----- | ----- | ----- |
| company | string |  |  |
| user | string | | |
| status | string | Possible answers: _pending_, _processing_, _uploaded_, _deleted_, _error_ | |
| createdAt | string | ($date) or ($date-time) | |
| modifiedAt | string | ($date) or ($date-time) | |
| contentType | string | Possible answers: _image_, _video_, _document_ | |
| public | boolean | | |
| url | string | | |
| extension | string | | |
| mimeType | string | | |
| fileName | string | | |
| key | string | | |
| data | object | | |
| debug | object | | |
| context | object | | |
| totalSize | number | | |
| size | number | | |