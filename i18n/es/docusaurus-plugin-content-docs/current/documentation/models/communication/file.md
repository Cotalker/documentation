---
title: File Data Model
sidebar_label: COTFile
---

:::caution Advertencia
Esta página aún no se encuentra traducida al español.
:::
import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<span className="hero__subtitle">COTFile</span>

## Description {#description}
Uploaded files are categorized into three content types: _images_, _videos_, and _documents_.

## JSON Sample {#json-sample}
_Sample of an uploaded file._
```json
{
    "_id": "61b243bdc8f27b93e2cd12ef",
    "status": "uploaded",
    "public": false,
    "company": "61b24350d5474205a39f9e66",
    "context": {
        "avatar": false,
        "_id": "61b2435a5cbc0fa23c98e464",
        "channel": "61b243637ade123500e73f06",
        "group": "61b2436808be63e2facd087f"
    },
    "size": 529644,
    "fileName": "SQL Data Model _ Partner & Technical Consultants Documentation.pdf",
    "mimeType": "application/pdf",
    "key": "acme_inc/document/v4_61b243bdc8f27b93e2cd12ef/default/sql-data-model-partner-technical-consultants-d.pdf",
    "extension": ".pdf",
    "contentType": "document",
    "user": "61b243b010de5e3a7a37d540",
    "createdAt": "2021-06-12T16:22:41.022Z",
    "modifiedAt": "2021-06-12T16:22:41.161Z",
    "__v": 0,
    "data": null,
    "totalSize": 529644,
    "url": "https://cotalker-us-files.s3.amazonaws.com/acme_inc/document/v4_61b243bdc8f27b93e2cd12ef/default/sql-data-model-partner-technical-consultants-d.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJ27XMZVIFCIAPLHA%2F20211209%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20211209T175044Z&X-Amz-Expires=900&X-Amz-Signature=725e080587bea916dd5b1829c309cd572165083525d28f32555dd9a1d818d9e4&X-Amz-SignedHeaders=host&response-content-disposition=inline%3B%20filename%3D"
}
```

## Fields {#fields}

| Field | Description | Type | Notes |
| --- | --- | --- | --- |
| **company** | The ObjectId of the company where the file is stored. | [ObjectId<COTCompany\>](/docs/documentation/models/model_company) | |
| **contentType** | Indicates the category the file belongs to. | string | Options are: _image_, _video_, _document_ | DEPRECATED |
| **context** | Holds information about the file's contexts, i.e., the related data models. | object | The object fields vary depending on the file.
| **createdAt** | Date and time the file was uploaded. | ISODate | YYYY-MM-DDTHH:mm:ss.SSSZ |
| **data** | Adds screenshot information in "video" files and thumbnail data in "image" files. | object | 
| **extension** | Indicates the file's format extension. | string | 
| **fileName** | Indicates the file's name and extension. | string | |
| **key** | Indicates the relative path of the file. | string | The _key_ is needed to get the signed file URL. |
| **mimeType** | Indicates the file's type and format, e.g., `image/jpeg`, `video/mp4`, `application/pdf`. | string | [Click here](/docs/documentation/models/communication/model_messageContent) for more details about content types. |
| **modifiedAt** | The last time the file was modified. | ISODate | YYYY-MM-DDTHH:mm:ss.SSSZ |
| **public** | Enables the file to be viewed or shared outside channels. | boolean | Must be set to true for images used for [branding](/docs/documentation/admin/special_configurations/branding). |
| **size** | Indicates the original byte size of the file. | number | |
| **status** | Indicates the file's current status on the server. | string | Possible answers: _pending_, _processing_, _uploaded_, _deleted_, _error_ |
| **totalSize** | Indicates the file's byte size after compression. | number |
| **user** | User that sent the file. | [ObjectId<COTUser\>](/docs/documentation/models/users/model_users) | DEPRECATED |
| **url** | The file's URL with signature included. | string | Not present in the response given when a file is just uploaded.


## Deprecated {#deprecated}

| Field | Description | Type | Notes |
| --- | --- | --- | --- |
| **debug** | | object | DEPRECATED |

## Additional Resources {#additional-resources}
- ["File Sharing" REST API documentation](/docs/documentation/api/communication/files): basic API requests for uploading and viewing files
