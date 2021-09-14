---
title: Message Content Type Data Models
sidebar_label: COTMessageContentType
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<span className="hero__subtitle">COTMessageContentType</span>

## Description {#description}
Message content types are part of the [COTMessage](/docs/documentation/models/communication/model_messages) data model: `messages.contentType`. The field's value are in string format. The following contains a list of the possible values and examples.

## JSON Sample (video)
```json
{ 
    "_id" : ObjectId("59cbf49aece8902250a72d09"), 
    "modifiedAt" : 1506538650245.0, 
    "company" : ObjectId("58fe83eda8b7259625b9b15d"), 
    "name" : "VID_20170927_155716.mp4", 
    "url" : "https://s3-sa-east-1.amazonaws.com/cotalker/cotalkerreframe/u_5901187fda281cad276780c8/video/P3ZXyNxie1506538644457_converted_.mp4", 
    "createdBy" : ObjectId("5901187fda281cad276780c8"), 
    "contentType" : "video/mp4", 
    "createdAt" : ISODate("2017-09-27T18:57:30.241+0000"), 
    "version" : NumberInt(1), 
    "screenshots" : [
       "https://s3-sa-east-1.amazonaws.com/cotalker/video_screenshots/P3ZXyNxie1506538644457_ss_3.png", 
        "https://s3-sa-east-1.amazonaws.com/cotalker/video_screenshots/P3ZXyNxie1506538644457_ss_4.png", 
        "https://s3-sa-east-1.amazonaws.com/cotalker/video_screenshots/P3ZXyNxie1506538644457_ss_2.png", 
        "https://s3-sa-east-1.amazonaws.com/cotalker/video_screenshots/P3ZXyNxie1506538644457_ss_1.png", 
        "https://s3-sa-east-1.amazonaws.com/cotalker/video_screenshots/P3ZXyNxie1506538644457_ss_5.png"
    ], 
    "isActive" : true, 
    "__v" : NumberInt(0)
}
```

## text/plain
```json
{ 
"contentType" : "text/plain",
"content" : "Hello, world!",
}
```

## text/system
```json
{ 
"contentType" : "text/system", 
"content" : "**content with md**", 
}
```

## video/mp4
```json
    { 
    "contentType" : "video/mp4",
    "content" : "{\"__v\":0,\"modifiedAt\":1506538650245,\"company\":\"58fe83eda8b7259625b9b15d\",    \"name\":\"VID_20170927_155716.mp4\",\"url\":\"https://s3-sa-east-1.amazonaws.com/cotalker/    cotalkerreframe/u_5901187fda281cad276780c8/video/P3ZXyNxie1506538644457_converted_.mp4\",    \"createdBy\":\"5901187fda281cad276780c8\",\"contentType\":\"video/mp4\",    \"_id\":\"59cbf49aece8902250a72d09\",\"createdAt\":\"2017-09-27T18:57:30.241Z\",\"version\":1,    \"screenshots\":[\"https://s3-sa-east-1.amazonaws.com/cotalker/video_screenshots/    P3ZXyNxie1506538644457_ss_3.png\",\"https://s3-sa-east-1.amazonaws.com/cotalker/video_screenshots/    P3ZXyNxie1506538644457_ss_4.png\",\"https://s3-sa-east-1.amazonaws.com/cotalker/video_screenshots/    P3ZXyNxie1506538644457_ss_2.png\",\"https://s3-sa-east-1.amazonaws.com/cotalker/video_screenshots/    P3ZXyNxie1506538644457_ss_1.png\",\"https://s3-sa-east-1.amazonaws.com/cotalker/video_screenshots/    P3ZXyNxie1506538644457_ss_5.png\"],\"isActive\":true}", 
    }
```

## image/jpg image/jpeg image/png image/gif
```json
{ 
"contentType" : "image/*",
"meta" : "{\"display\":\"/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dA\\nRkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8\\nfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAoAB4DASIA\\nAhEBAxEB/8QAGAAAAwEBAAAAAAAAAAAAAAAAAAIEAQP/xAArEAABAgQEBQQDAQAAAAAAAAABAhEA\\nAwQhEjFBURMiYdHwMnGB8QUjQpH/xAAVAQEBAAAAAAAAAAAAAAAAAAAAAf/EABURAQEAAAAAAAAA\\nAAAAAAAAAAAR/9oADAMBAAIRAxEAPwC/iqSOa7uHNi+R86nd4mKsNWCbMxDe223jxnFIUxukqdT6\\nQqykTv1KJQ7YiLfcRVKZaVLSAzFLli9xnf4z6xq2VyiYFNqUl9u0KFpOIJyZn1bvk8OkpwkmYJTF\\nhZx9wRHLGNSc2KXcfzpCAuUqOrvb1DT5zgUXLKB6ufqEVMyPnnaA7o5Uh1ALez7dYcra5S7WYtb2\\neJ0zOXCfSdh4YbiPYcx+IB5NHWTwSimUSN1p7xNWS51GVCpkqRhSFlyk2JYGx3ggixD0VLPrpPGp\\nZJmIcgnGkX2Z47zPx1VKQDNkiWHZ1TEAP/sEEIV//9k\\u003d\\n\",\"name\":\"\"}",
"content" : "{\"original\":\"https://s3-sa-east-1.amazonaws.com/cotalker/image/1506542197895_original.png\",\"small\":\"https://s3-sa-east-1.amazonaws.com/cotalker/image/1506542197889_small.png\",\"square\":\"https://s3-sa-east-1.amazonaws.com/cotalker/image/1506542197894_square.png\"}",
}
```

## application/word
```json
{ 
"contentType" : "application/msword",
"content" : '{"url":"http://docs.google.com/gview?embedded=true&url=archivo.doc","name":"archivo.doc","createdBy":"5901187fda281cad276780c8","contentType":"application/msword","screenshots":["https://s3-sa-east-1.amazonaws.com/cotalker/file_screenshots/archivo_1.png"]}'
}
```

## application/vnd.openxmlformats-officedocument.wordprocessingml.document
```json
{ 
"contentType" : "application/vnd.openxmlformats-officedocument.
wordprocessingml.document",
"content" : '{"url":"http://docs.google.com/gview?embedded=true&url=archivo.docx","name":"archivo.docx","createdBy":"5901187fda281cad276780c8","contentType":"application/vnd.openxmlformats-officedocument.wordprocessingml.document","screenshots":["https://s3-sa-east-1.amazonaws.com/cotalker/file_screenshots/archivo_1.png"]}',
}
```

## application/vnd.ms-excel
```json
{ 
"contentType" : "application/vnd.ms-excel",
"content" : '{"url":"https://s3-sa-east-1.amazonaws.com/cotalker/cotalkerreframe/archivo.xls","name":"archivo.xls","createdBy":"5901187fda281cad276780c8","contentType":"application/vnd.ms-excel","screenshots":["https://s3-sa-east-1.amazonaws.com/cotalker/file_screenshots/archivo_1.png"]}', 
}
```

## application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
```json
{ 
"contentType" : "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
"content" :'{"url":"https://s3-sa-east-1.amazonaws.com/cotalker/cotalkerreframe/archivo.xlsx","name":"archivo.xlsx","createdBy":"5901187fda281cad276780c8","contentType":"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet","screenshots":["https://s3-sa-east-1.amazonaws.com/cotalker/file_screenshots/archivo_1.png"]}', 
}
```

## application/vnd.ms-powerpoint
```json
{ 
"contentType" : "application/vnd.ms-powerpoint",
"content" : '{"url":"https://s3-sa-east-1.amazonaws.com/cotalker/cotalkerreframe/archivo.ppt","name":"archivo.ppt","createdBy":"5901187fda281cad276780c8","contentType":"application/vnd.ms-powerpoint","screenshots":["https://s3-sa-east-1.amazonaws.com/cotalker/file_screenshots/archivo_1.png"]}', 
}
```

## application/vnd.openxmlformats-officedocument.presentationml.presentation
```json
{ 
"contentType" : "application/vnd.openxmlformats-officedocument.presentationml.presentation",
"content" : '{"url":"https://s3-sa-east-1.amazonaws.com/cotalker/cotalkerreframe/archivo.pptx","name":"archivo.pptx","createdBy":"5901187fda281cad276780c8","contentType":"application/vnd.openxmlformats-officedocument.presentationml.presentation","screenshots":["https://s3-sa-east-1.amazonaws.com/cotalker/file_screenshots/archivo_1.png"]}', 
}
```

## application/pdf
```json
{ 
"contentType" : "application/pdf",
"content" : '{"url":"https://s3-sa-east-1.amazonaws.com/cotalker/cotalkerreframe/archivo.pdf","name":"archivo.pdf","createdBy":"5901187fda281cad276780c8","contentType":"application/pdf","screenshots":["https://s3-sa-east-1.amazonaws.com/cotalker/file_screenshots/archivo_1.png"]}', 
}
```

## application/vnd.cotalker.contact
```json
{
"contentType" : "application/vnd.cotalker.contact",
"content" : "{ \"userid\": \"1234567890abcdef\", \"external\": \"https://www.google.com\", \"externalLabel\": \"Google\" }",
// content model { userid: MongooseObjectId, external?: string, externalLabel?: string }
}
```