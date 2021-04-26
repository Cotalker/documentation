---
title: File Sharing
sidebar_label: File Sharing
---
import useBaseUrl from '@docusaurus/useBaseUrl'; 
import Highlight from '@theme/Highlight';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Users can easily share files through channels and surveys. But administrators should take into consideration the following aspects of file sharing in Cotalker.

:::note
API/V1/FILE has been deprecated.
:::

## Security Features
For security reasons, uploaded files are digitally signed and require user verification in order to be viewed. Only users from the same company can view the uploaded files. In future updates, access to files will be configurable to more limited circles of users.

As a default, verified users will have only 15 minute access to files. Once that time passes, the file must be requested again. Access time is configurable.

## File Formats & Size

**Compatible file formats include:**

| Type | Format |
| --- | ---- |
| videos: | .mpeg, .mpg, .mov, .mp4, .avi |
| images: | .gif, .jpg, .jpeg, .png |
| documents: | .xlsx, .xls, .xlsm, .ods, .docx, .doc, .odt, .ppt, .pptx, .odp, .key, .rtf, .pdf, .csv, .ics, .txt, .zip, .log, .md |

**Maximum file size:** 25 MB

## File Upload API

Upload a file and return the COTFile instance.

`POST https://cotalker.com/api/file/upload`


### Request Body
_multipart/form-data_

| Key | Value | Example |
| --- | --- | --- |
| uploadInput | object | `{ "uploadInput": { "public": true } }` |
| context | object | |
| file | string($binary) | `@/folder/image.png` |

### _Summary of asynchronous upload process:_

| Request | Action |
| ----- | ----- |
| Request 1 | File is uploaded. |
| Request 2 | Loop. Verifies if file upload is ready. |
| Request 3 | Receives file URL. |

### Example
<Tabs defaultValue="typescript" values={[ {label: 'Typescript', value: 'typescript'}, {label: 'Shell', value: 'curl'} ]}>

<TabItem value="typescript">

```typescript

const uploadingFile = await api.uploadFile(filePath);
let isReady = false;
let uploadedFile;

while (!isReady) {
  // timeout 1s
  await sleep(1000);
  // get file status
  uploadedFile = await api.getFileById(uploadingFile.id);
  // check if ready
  isReady = uploadedFile.status == 'uploaded';
}

const signedUrl = await api.signUrl(uploadedFile.url);

```

</TabItem>
<TabItem value="curl">

```curl

curl -X POST "https://cotalker.com/api/file/upload" -H  "accept: text/html; charset=utf-8" -H  "Content-Type: multipart/form-data" -F "uploadInput="public": true" -F "file=@image.png;type=image/png" \ --header 'Authorization: Bearer TOKEN'

```

</TabItem>
</Tabs>

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



## File Request API

Requests file with signature for user verification. Returns the signed URL.

`POST https://cotalker.com/api/signature`

### Request Body
_application/json_

SignUrlInput
```json
{
  "key": "string",
  "expires": 0,
  "disposition": "inline",
  "fileName": "string"
}
```

