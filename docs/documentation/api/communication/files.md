---
title: File Sharing
sidebar_label: File Sharing
---
import useBaseUrl from '@docusaurus/useBaseUrl'; 
import Highlight from '@theme/Highlight';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Overview {#overview}
Users can easily share files through channels and surveys. But administrators should take into consideration the file-sharing aspects explained below to take full advantage of the possibilities the API tools can grant.

<div className="alert alert--primary">

### Security Features
For security reasons, uploaded files are digitally signed. Only verified users from the same _company_ can access the uploaded files and are required to provide the digitally signed file URL each time they wish to access a file.

By default, _users_ on the platform have a maximum of 15-minute access to files. Once that time passes, the file must be signed again. Through the API request, access time can be set between 1 to 15 minutes.

### File Specifications

**Compatible file formats include:**

- videos: _.mpeg, .mpg, .mov, .mp4, .avi_
- images: _.gif, .jpg, .jpeg, .png_
- documents: _.xlsx, .xls, .xlsm, .ods, .docx, .doc, .odt, .ppt, .pptx, .odp, .key, .rtf, .pdf, .csv, .ics, .txt, .zip, .log, .md_

**Maximum file size:** 25 MB

### File Destination
Files are uploaded to our servers and stored in company folders according to their content type, i.e., video, image, document. Files are also processed according to their content type, e.g., image files are processed and stored in different folders with their original and thumbnail files, respectively.

</div>
<br/>


## Upload a File {#post-new}
_Uploads a file and returns a COTFile instance._

:::note Summary of asynchronous upload process:
- Request 1 => File is uploaded.  
- Request 2 => Loop. Verifies if file upload is ready.
- Request 3 => File URL is generated.
:::

<span className="hero__subtitle"><span className="badge badge--info">POST</span> /media/file/upload</span>

#### Endpoing URL {#post-new-url}
`https://www.cotalker.com/api/v3/media/file/upload`

#### Headers {#post-new-headers}

Header | Description | Required | Values
--- | --- | --- | ---
**Authorization** | Sends your _access token_ to make an API request.<br/>[Click here to see how to obtain an _access token_.](/docs/documentation/api/auth#how-to) | Required | Bearer $ACCESS_TOKEN
**Content-Type** | Indicates the body's format. | Required | multipart/form-data

#### Request Body {#post-new-body}
_multipart/form-data_

Key | Description | Type | Required | Example
--- | --- | --- | --- | ---
| **uploadInput** | Posts a value in a response field | object | Optional | `{ "public": true }` |
| **context** | | object | Optional |
| **file** | The path of the file you want to upload to the server. | string($binary) | Required | `@"/folder/image.png"` |


#### Request Sample {#post-new-request}
<Tabs defaultValue="curl" values={[ {label: 'cURL', value: 'curl'}, {label: 'Typescript', value: 'typescript'} ]}>

<TabItem value="curl">

_Uploads an image file:_
```bash
curl --location --request POST 'https://www.cotalker.com/api/v3/media/file/upload' \
--header 'Content-Type: multipart/form-data' \
--form 'file=@"images/0_g05f8USWpxeQ4fkU.jpeg"' \
--form 'uploadInput="{ \"public\": true }"'
```

</TabItem>
<TabItem value="typescript">

_Uploads file and obtains a signed file URL:_
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
</Tabs>

### Response Sample {#post-new-response}
_The new instance of a COTFile (file object) is returned._

```json
{
    "_id": "619f94139b5de187825f4b94",
    "status": "pending",
    "public": true,
    "company": "6136968b580aaf2b0e49d844",
    "size": 46671,
    "fileName": "0_g05f8USWpxeQ4fkU.jpeg",
    "mimeType": "image/jpeg",
    "key": "acme_inc/image/v4_619f94139b5de187825f4b94/original/0-g05f8uswpxeq4fku.jpeg",
    "extension": ".jpeg",
    "contentType": "image",
    "user": "60c48a3db79c0f000867dfa2",
    "createdAt": "2021-11-25T13:48:03.226Z",
    "modifiedAt": "2021-11-25T13:48:03.226Z",
    "__v": 0
}
```

#### Response Data Model {#post-new-schema}
_application/json_

| Field | Description | Type | Notes |
| --- | --- | --- | --- |
| **company** | The ID of the company the file is found in. | [ObjectId<COTCompany\>](/docs/documentation/models/model_company) |  |
| **contentType** | Indicates the category the file belongs to. | string | Options are: _image_, _video_, _document_ | |
| **context** | | object | |
| **createdAt** | Date and time the file was uploaded. | ISODate | YYYY-MM-DDTHH:mm:ss.SSSZ |
| **data** | | object | |
| **debug** | | object | |
| **extension** | string | | |
| **fileName** | Indicates the file's name and extension. | string | |
| **key** | Indicates the relative path of the file. | string | The _key_ is needed to get the signed file URL. |
| **mimeType** | Indicates the file's type and format, e.g., `image/jpeg`, `video/mp4`, `application/pdf`. | string | [Click here](/docs/documentation/models/communication/model_messageContent) for more details about content types. |
| **modifiedAt** | Last time the file was modified. | ISODate | YYYY-MM-DDTHH:mm:ss.SSSZ |
| **public** | boolean | | |
| **size** | Indicates the byte size of the file. | number | |
| **status** | Indicates the files current status in the server. | string | Possible answers: _pending_, _processing_, _uploaded_, _deleted_, _error_ |
| **totalSize** | | number | |
| **user** | User that sent the file. | [ObjectId<COTUser\>](/docs/documentation/models/users/model_users) | |
| **url** | | string | |


## Obtain Signed File URL {#post-get}
_Requests a signed file URL that grants the user time-limited access to the file._

<span className="hero__subtitle"><span className="badge badge--info">POST</span> /media/signature</span>

#### Endpoing URL {#post-get-url}
`https://www.cotalker.com/api/v3/media/signature`

#### Headers {#post-get-headers}

Header | Description | Required | Values
--- | --- | --- | ---
**Authorization** | Sends your _access token_ to make an API request.<br/>[Click here to see how to obtain an _access token_.](/docs/documentation/api/auth#how-to) | Required | Bearer $ACCESS_TOKEN
**Content-Type** | Indicates the body's format. | Required | application/json

#### Request Body {#post-get-body}
_application/json_

Element | Description | Type | Required | Notes
--- | --- | --- | --- | ---
**key** | Indicates the relative path of the file. | string | Required | Obtained through the `POST /media/file/upload` response.
**expires** | Indicates the number of seconds the file is available to the user before needing to get another signed URL. | number | Required | Minimum: 60 (1 minute)<br/>Maximum: 900 (15 minutes)
**disposition** | | string | Optional | Set to "inline".
**fileName** | Gives the file a new name. | string | Optional | Should include the proper extenstion.

#### Request Sample {#post-get-request}
_Requests a signed file URL for a jpeg image.
```bash
curl --location --request POST 'https://www.cotalker.com/api/v3/media/signature' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer $ACCESS_TOKEN' \
--data-raw '{
    "key": "acme_inc/image/v4_619e70899b5de1914b5f4ad4/square/d3y9um697me01.jpeg",
    "expires": 900,
    "disposition": "inline",
    "fileName": "new-name.jpeg"
}'
```

#### Response Sample {#post-get-response}
_Signed URL that lasts 15 minutes:_

```
"https://cotalker-us-files.s3.amazonaws.com/acme_inc/image/v4_619e70899b5de1914b5f4ad4/square/d3y9um697me01.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJ27XMZVIFCIAPLHA%2F20211125%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20211125T172501Z&X-Amz-Expires=900&X-Amz-Signature=a9f0bf2f4769811b58dffa93799535c027b6c66395eb237d95793ce9269d0caf&X-Amz-SignedHeaders=host&response-content-disposition=inline%3B%20filename%3Dnew-name.jpeg"
```