---
title: Message Content Type Data Models
sidebar_label: COTMessageContentType
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<span className="hero__subtitle">COTMessageContentType</span>

## Description {#description}
Message content types are part of the [COTMessage](/docs/documentation/models/communication/model_messages) data model: `messages.contentType`. The field's value is in string format. The following contains a list of the possible values and examples. Along with `messages.contentType`, `messages.content` contains the text or file data. In case the message is a survey, `messages.contentArray` is used.

## FileObject Sample

```json
"contentType" : "video/mp4",
"content" : { 
    "_id" : "618a9aaf6e1714a568ae69bb", 
    "modifiedAt" : 1506538650245.0, 
    "company" : "618a9abb12371b84357570ce", 
    "name" : "VID_20170927_155716.mp4", 
    "url" : "https://s3-sa-east-1.amazonaws.com/cotalker/cotalkerreframe/u_6981187fda281cad276780c8/video/P3ZXyNxie1506538644457_converted_.mp4", 
    "createdBy" : "6901187fda281cad276780c8", 
    "contentType" : "video/mp4", 
    "createdAt" : "2017-09-27T18:57:30.241+0000", 
    "version" : 1, 
    "screenshots" : [
        "https://mysite.com/image_3.png", 
        "https://mysite.com/image_4.png", 
        "https://mysite.com/image_.png", 
        "https://mysite.com/image_1.png", 
        "https://mysite.com/image_5.png"
    ], 
    "isActive" : true, 
    "__v" : 0
   }
```
## Content Types {#content-types}

### Plain Text
`text/plain`
```json
{ 
"contentType" : "text/plain",
"content" : "Hello, world!",
}
```

### System Messages with Markdown Format
`text/system`
```json
{ 
"contentType" : "text/system", 
"content" : "**content with md**", 
}
```

### MP4 Video
`video/mp4`
```json
    { 
    "contentType" : "video/mp4",
    "content" : "{\"__v\":0,\"modifiedAt\":1506538650245,\"company\":\"618a9abb12371b84357570ce\",    \"name\":\"VID_20170927_155716.mp4\",\"url\":\"https://mysite.com/video_converted_.mp4\",    \"createdBy\":\"618a9b943c1787577dfe69c3\",\"contentType\":\"video/mp4\",    \"_id\":\"618a9b9b335dbf10afbda34f\",\"createdAt\":\"2017-09-27T18:57:30.241Z\",\"version\":1,    \"screenshots\":[\"https://mysite.com/image_3.png\",\"https://mysite.com/image_4.png\",\"https://mysite.com/image_2.png\",\"https://mysite.com/image_1.png\",\"https://mysite.com/image_5.png\"],\"isActive\":true}", 
    }
```

### Image
`image/jpg` `image/jpeg` `image/png` `image/gif`
```json
{ 
"contentType" : "image/*",
"meta" : "{\"display\":\"/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dA\\nRkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8\\nfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAoAB4DASIA\\nAhEBAxEB/8QAGAAAAwEBAAAAAAAAAAAAAAAAAAIEAQP/xAArEAABAgQEBQQDAQAAAAAAAAABAhEA\\nAwQhEjFBURMiYdHwMnGB8QUjQpH/xAAVAQEBAAAAAAAAAAAAAAAAAAAAAf/EABURAQEAAAAAAAAA\\nAAAAAAAAAAAR/9oADAMBAAIRAxEAPwC/iqSOa7uHNi+R86nd4mKsNWCbMxDe223jxnFIUxukqdT6\\nQqykTv1KJQ7YiLfcRVKZaVLSAzFLli9xnf4z6xq2VyiYFNqUl9u0KFpOIJyZn1bvk8OkpwkmYJTF\\nhZx9wRHLGNSc2KXcfzpCAuUqOrvb1DT5zgUXLKB6ufqEVMyPnnaA7o5Uh1ALez7dYcra5S7WYtb2\\neJ0zOXCfSdh4YbiPYcx+IB5NHWTwSimUSN1p7xNWS51GVCpkqRhSFlyk2JYGx3ggixD0VLPrpPGp\\nZJmIcgnGkX2Z47zPx1VKQDNkiWHZ1TEAP/sEEIV//9k\\u003d\\n\",\"name\":\"\"}",
"content" : "{\"original\":\"https://mysite.com/image_original.png\",\"small\":\"https://mysite.com/image_small.png\",\"square\":\"https://mysite.com/image_square.png\"}",
}
```

### MS Word Document
`application/word`
```json
{ 
"contentType" : "application/msword",
"content" : '{"url":"http://docs.google.com/gview?embedded=true&url=file.doc","name":"file.doc","createdBy":"618a9c24ded6d2dc31509cac","contentType":"application/msword","screenshots":["https://mysite.com/image_1.png"]}'
}
```

### Office Open XML Document
`application/vnd.openxmlformats-officedocument.wordprocessingml.document`
```json
{ 
"contentType" : "application/vnd.openxmlformats-officedocument.
wordprocessingml.document",
"content" : '{"url":"http://docs.google.com/gview?embedded=true&url=file.docx","name":"file.docx","createdBy":"5901187fda281cad276780c8","contentType":"application/vnd.openxmlformats-officedocument.wordprocessingml.document","screenshots":["https://mysite.com/image_1.png"]}',
}
```

### MS Excel Spreadsheet
`application/vnd.ms-excel`
```json
{ 
"contentType" : "application/vnd.ms-excel",
"content" : '{"url":"https://mysite.com/file.xls","name":"file.xls","createdBy":"5901187fda281cad276780c8","contentType":"application/vnd.ms-excel","screenshots":["https://mysite.com/image_1.png"]}', 
}
```

### Office Open XML Workbook
`application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`
```json
{ 
"contentType" : "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
"content" :'{"url":"hhttps://mysite.com/file.xlsx","name":"file.xlsx","createdBy":"5901187fda281cad276780c8","contentType":"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet","screenshots":["https://mysite.com/image_1.png"]}', 
}
```

### MS Powerpoint Presentation
`application/vnd.ms-powerpoint`
```json
{ 
"contentType" : "application/vnd.ms-powerpoint",
"content" : '{"url":"https://mysite.com/file.ppt","name":"file.ppt","createdBy":"5901187fda281cad276780c8","contentType":"application/vnd.ms-powerpoint","screenshots":["https://mysite.com/image_1.png"]}', 
}
```

### Office Open XML Presentation
`application/vnd.openxmlformats-officedocument.presentationml.presentation`
```json
{ 
"contentType" : "application/vnd.openxmlformats-officedocument.presentationml.presentation",
"content" : '{"url":"https://mysite.com/file.pptx","name":"file.pptx","createdBy":"5901187fda281cad276780c8","contentType":"application/vnd.openxmlformats-officedocument.presentationml.presentation","screenshots":["https://mysite.com/image_1.png"]}', 
}
```

### PDF Document
`application/pdf`
```json
{ 
"contentType" : "application/pdf",
"content" : '{"url":"https://mysite.com/file.pdf","name":"file.pdf","createdBy":"618a9cde78e1a2ce394d162c","contentType":"application/pdf","screenshots":["https://mysite.com/file.png"]}', 
}
```
### Cotalker Answered Survey
`application/vnd.cotalker.survey`
```json
{
    "contentType": "application/vnd.cotalker.survey",
    "contentArray": [
        "613fd0e14a8541000782ed5c",
        "613fd0e14a8541000782ed5d"
    ]
}
```

### Cotalker User Contacts
`application/vnd.cotalker.contact`
```json
{
"contentType" : "application/vnd.cotalker.contact",
"content" : "{ \"userid\": \"618a9d0b3a562186911eafb1\", \"external\": \"https://www.google.com\", \"externalLabel\": \"Google\" }",
}
```
