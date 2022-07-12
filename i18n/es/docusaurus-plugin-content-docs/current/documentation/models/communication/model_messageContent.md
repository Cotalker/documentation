---
title: Message Content Type Data Models
sidebar_label: COTMessageContentType
---

:::caution Advertencia
Esta página aún no se encuentra traducida al español.
:::
import useBaseUrl from '@docusaurus/useBaseUrl';

<span className="hero__subtitle">COTMessageContentType</span>

## Description {#description}
Message content types are part of the [COTMessage](/docs/documentation/models/communication/model_messages) data model: `messages.contentType`. The field's value is in string format. The following contains a list of the possible values and examples. 

Along with `messages.contentType`, `messages.content` contains the text or file data. In case the message is a survey, `messages.contentArray` is used. Enriched messages use `messages.contentParts` instead.

## FileObject Sample

```json
{
  "contentType" : "video/mp4",
  "content": "{\"url\":\"https://cotalker-us-files.s3.amazonaws.com/acme_inc/video/v4_619f7a989b5de1d2d55f4b7b/default/video.mp4\",\"name\":\"new-file-name.mp4\",\"contentType\":\"video\",\"screenshots\": []}",
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
  "content" : "**content with markdown**", 
}
```

### Enriched Message
`text/enriched`
```json
{
  "contentType": "text/enriched",
  "contentParts": [
      {
          "type": "text",
          "content": "Welcome! Check out the following video:"
      },
      {
          "type": "link",
          "content": "Funny cats",
          "payload": {
              "url": "https://www.youtube.com/watch?v=gSFXMtdqSdU"
          } 
      },
      {
          "type": "hover",
          "content": "Hover over this text",
          "payload": {
              "card": {
                  "image": "https://placekitten.com/200/200",
                  "text": "Lorem ipsum..."
              }
          }
      },
      {
          "type": "task",
          "content": "Task #45", 
          "payload": {
              "company": "623b0752bc5a412dadd224a5", //COTCompany ObjectId
              "task": "623b076114e289dfd4f708ac", //COTTask ObjectId
              "taskGroup": "623b07694222b57e2ad7e23c" //COTTaskGroup ObjectId
          }
      }
  ]
}
```

### MP4 Video
`video/mp4`
```json
{ 
  "content": "{\"url\":\"https://cotalker-us-files.s3.amazonaws.com/acme_inc/video/v4_619f70b29b5de13dee5f4b79/default/2021-04-23-09-09-43.mp4\",\"name\":\"test1.mp4\",\"contentType\":\"video\",\"screenshots\": []}",
  "contentType": "video/mp4"
}
```
_* Other video formats, e.g., Quicktime videos (*.mov), are also supported, but their contentType must be set to "video/mp4" to be viewed in the channel workspace._

### Image
`image/jpg` `image/jpeg` `image/png` `image/gif`
```json
{ 
  "contentType" : "image/jpeg",
  "content": "{\"original\":\"https://cotalker-us-files.s3.amazonaws.com/acme_inc/image/v4_619e70899b5de1914b5f4ad4/original/d3y9um697me01.jpeg\",\"square\":\"https://cotalker-us-files.s3.amazonaws.com/certificationworld/image/v4_619e70899b5de1914b5f4ad4/square/d3y9um697me01.jpeg\",\"small\":\"https://cotalker-us-files.s3.amazonaws.com/certificationworld/image/v4_619e70899b5de1914b5f4ad4/small/d3y9um697me01.jpeg\"}",
}
```

### MS Word Document
`application/word`
```json
{ 
  "contentType" : "application/msword",
  "content" : "{\"url\":\"http://docs.google.com/gview?embedded=true&url=file.doc\",\"name\":\"file.doc\",\"createdBy\":\"618a9c24ded6d2dc31509cac\",\"contentType\":\"application/msword\",\"screenshots\":[\"https://mysite.com/image_1.png\"]}"
}
```

### Office Open XML Document
`application/vnd.openxmlformats-officedocument.wordprocessingml.document`
```json
{ 
  "contentType" : "application/vnd.openxmlformats-officedocument.
wordprocessingml.document",
  "content" : "{\"url\":\"http://docs.google.com/gview?embedded=true&url=file.docx\",\"name\":\"file.docx\",\"createdBy\":\"5901187fda281cad276780c8\",\"contentType\":\"application/vnd.openxmlformats-officedocument.wordprocessingml.document\",\"screenshots\":[\"https://mysite.com/image_1.png\"]}",
}
```

### MS Excel Spreadsheet
`application/vnd.ms-excel`
```json
{ 
  "contentType" : "application/vnd.ms-excel",
  "content" : "{\"url\":\"https://mysite.com/file.xls\",\"name\":\"file.xls\", \"createdBy\":\"5901187fda281cad276780c8\",\"contentType\":\"application/vnd.ms-excel\",\"screenshots\":[\"https://mysite.com/image_1.png\"]}", 
}
```

### Office Open XML Workbook
`application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`
```json
{ 
  "contentType" : "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "content" :"{\"url\":\"https://mysite.com/file.xlsx\",\"name\":\"file.xlsx\",\"createdBy\":\"5901187fda281cad276780c8\",\"contentType\":\"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet\",\"screenshots\":[\"https://mysite.com/image_1.png\"]}", 
}
```

### MS Powerpoint Presentation
`application/vnd.ms-powerpoint`
```json
{ 
  "contentType" : "application/vnd.ms-powerpoint",
  "content" : "{\"url\":\"https://mysite.com/file.ppt\",\"name\":\"file.ppt\",\"createdBy\":\"5901187fda281cad276780c8\",\"contentType\":\"application/vnd.ms-powerpoint\",\"screenshots\":[\"https://mysite.com/image_1.png\"]}", 
}
```

### Office Open XML Presentation
`application/vnd.openxmlformats-officedocument.presentationml.presentation`
```json
{ 
  "contentType" : "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "content" : "{\"url\":\"https://mysite.com/file.pptx\",\"name\":\"file.pptx\",\"createdBy\":\"5901187fda281cad276780c8\",\"contentType\":\"application/vnd.openxmlformats-officedocument.presentationml.presentation\",\"screenshots\":[\"https://mysite.com/image_1.png\"]}", 
}
```

### PDF Document
`application/pdf`
```json
{ 
  "contentType" : "application/pdf",
  "content": "{\"name\":\"Haidt (2001) - Emotional dog rational tail.pdf\",\"url\":\"https://cotalker-us-files.s3.amazonaws.com/acme_inc/document/v4_6170c45e9b5de166995f24d7/default/haidt-2001-emotional-dog-rational-tail.pdf\",\"codeType\":\"pdf\",\"contentType\":\"application/pdf\",\"screenshots\":[]}" 
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

