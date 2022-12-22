---
title: Notes
sidebar_label: Notes
---
import useBaseUrl from '@docusaurus/useBaseUrl';
import EditorHtml, {toc as Title1TOC} from '/docs/documentation/api/notes/_html_example.mdx'; 


## Overview {#overview}
[Notes](/docs/documentation/client/notes) are documents created within the Cotalker platform. These documents can also be created as [task notes](/docs/documentation/client/notes#task-notes), allowing users to build knowledge bases within specific tasks. 

## Get Notes {#get-notes}
_Returns notes and their relevant data._

<span className="hero__subtitle"><span className="badge badge--success">GET</span> /notes</span>

#### Endpoint URL {#get-notes-url}
`https://www.cotalker.com/api/v3/notes`

#### Headers {#get-notes-header}
Header | Description | Required | Values
--- | --- | --- | ---
**Authorization** | Sends your _access token_ to make an API request.<br/>[Click here to see how to obtain an _access token_.](/docs/documentation/api/auth#how-to) | Required | Bearer $ACCESS_TOKEN

#### Query Parameters {#get-notes-parameters}

Parameter | Description | Type | Required | Notes
--- | --- | --- | --- | ---
**count** | Returns the number of notes returned. | boolean | Optional |
**createdBy** | Returns documents created by the indicated user. | [ObjectId<COTUser\>](/docs/documentation/models/users/model_users) | Optional |
**isActive** | Displays either active or deleted documents. | boolean | Optional | If the parameter is not used, both active and deleted documents are displayed.
**limit** | Limts the number of notes returned per response page. | number | Optional | Best if used in conjunction with the `page` parameter.
**orderBy** | Returns responses in either of the following orders:<br/>- `asc`: Ascending order, i.e., displays documents from first to last.<br/>- `desc`: Descending order, i.e., displays documentos from last to first. | string | Optional | Must be used in conjunction with the `sortBy` parameter.
**owner** | Displays notes belonging to: <br/>`all`: all the users<br/>`me`: the user making the request<br/>`other`: all users other than the one making the request | string | Optional | If no option is selected, the `me` option is used as default.
**page** | Makes the response display data from the indicated page number. | number | Optional | Used best with the `limit` parameter.
**sortBy** | Sort results by the following options: <br/>- `createdAt`: Date and time the note was created.<br/>- `modifiedAt`: Last time the note was modified. | string | Optional | By default, notes are sorted by `createdAt` field.
**taskGroupId** | Allows displaying notes associated with a task. | [ObjectId<COTTaskGroup\>](/docs/documentation/models/tasks/model_taskgroup) | Optional | Must be used inconjunction with the `taskId` parameter.
**taskId** | Allows displaying notes associated with a task. | [ObjectId<COTTask\>](/docs/documentation/models/tasks/model_tasks) | Optional | Must be used inconjunction with the `taskGroupId` parameter.


## Open Note Editor {#get-notes-editor}
_Returns HTML of note editor._

<span className="hero__subtitle"><span className="badge badge--success">GET</span> /notes/&#123;id&#125;/editor</span>

#### Endpoint URL {#get-notes-editor-url}
`https://www.cotalker.com/api/v3/notes/{id}/editor`

#### Headers {#get-notes-editor-header}
Header | Description | Required | Values
--- | --- | --- | ---
**Authorization** | Sends your _access token_ to make an API request.<br/>[Click here to see how to obtain an _access token_.](/docs/documentation/api/auth#how-to) | Required | Bearer $ACCESS_TOKEN

#### Path Parameters {#get-notes-editor-parameters}
Parameter | Description | Type | Required | Notes
--- | --- | --- | --- | ---
id | The ObjectId of the note that is to be returned. | [ObjectId<COTNote\>](/docs/documentation/models/notes/model_notes) | Required |

#### Request Sample {#request-editor-sample}
```bash
curl --location --request GET 'https://www.cotalker.com/api/v3/notes/63a4723af9809143fa5440a0/editor' \
--header 'Authorization: Bearer $ACCESS_TOKEN'
```

#### Response Sample {#response-editor-sample}

The request returns an HTML document that represents the note editor.

---

## Open Note Viewer {#get-notes-viewer}
_Returns HTML of note viewer._

<span className="hero__subtitle"><span className="badge badge--success">GET</span> /notes/&#123;id&#125;/viewer</span>

#### Endpoint URL {#get-notes-viewer-url}
`https://www.cotalker.com/api/v3/notes/{id}/viewer`

#### Headers {#get-notes-viewer-header}
Header | Description | Required | Values
--- | --- | --- | ---
**Authorization** | Sends your _access token_ to make an API request.<br/>[Click here to see how to obtain an _access token_.](/docs/documentation/api/auth#how-to) | Required | Bearer $ACCESS_TOKEN

#### Path Parameters {#get-notes-viewer-parameters}
Parameter | Description | Type | Required | Notes
--- | --- | --- | --- | ---
id | The ObjectId of the note that is to be returned. | [ObjectId<COTNote\>](/docs/documentation/models/notes/model_notes) | Required |

#### Request Sample {#request-viewer-sample}
```bash
curl --location --request GET 'https://www.cotalker.com/api/v3/notes/63a4723af9809143fa5440a0/viewer' \
--header 'Authorization: Bearer $ACCESS_TOKEN'
```

#### Response Sample {#response-viewer-sample}

The request returns an HTML document that represents the note viewer.

---

## Download Note PDF Document {#get-notes-download}
_Returns a PDF version of the note document._

<span className="hero__subtitle"><span className="badge badge--success">GET</span> /notes/&#123;id&#125;/download</span>

#### Endpoint URL {#get-notes-download-url}
`https://www.cotalker.com/api/v3/notes/{id}/download`

#### Headers {#get-notes-download-header}
Header | Description | Required | Values
--- | --- | --- | ---
**Authorization** | Sends your _access token_ to make an API request.<br/>[Click here to see how to obtain an _access token_.](/docs/documentation/api/auth#how-to) | Required | Bearer $ACCESS_TOKEN

#### Path Parameters {#get-notes-download-parameters}
Parameter | Description | Type | Required | Notes
--- | --- | --- | --- | ---
id | The ObjectId of the note that is to be returned. | [ObjectId<COTNote\>](/docs/documentation/models/notes/model_notes) | Required |

#### Request Sample {#request-editor-sample}
```bash
curl --location --request GET 'https://www.cotalker.com/api/v3/notes/63a4723af9809143fa5440a0/download' \
--header 'Authorization: Bearer $ACCESS_TOKEN'
```

#### Response Sample {#response-editor-sample}

The request returns a PDF document of the note.

---

## Create Note {#post-note}
_Creates a new note._

<span className="hero__subtitle"><span className="badge badge--info">POST</span> /notes</span>

#### Endpoint URL {#post-note-url}
`https://www.cotalker.com/api/v3/notes`

#### Headers {#post-note-header}
Header | Description | Required | Values
--- | --- | --- | ---
**Authorization** | Sends your _access token_ to make an API request.<br/>[Click here to see how to obtain an _access token_.](/docs/documentation/api/auth#how-to) | Required | Bearer $ACCESS_TOKEN
**Content-Type** | Sets the body's format. | Required | application/json

#### Request Body {#request-body-post-note}
Element | Description | Type | Required | Notes
--- | --- | --- | --- | ---
**title** | The title of the document. | string | Required | 
**description** | A brief description of the note written by the document's author. | string | Optional | 
**context** | Indicates the task, and its corresponding task group, the document is associated with. | object | Optional |  
**context.task** | Associated task details. | object | Optional | 
**context.task.taskGroupId** | The objectId of the task group the document is found in. | [ObjectId<COTTaskGroup\>](/docs/documentation/models/tasks/model_taskgroup) | Optional | 
**context.task.taskId** | The objectId of the task the document is found in. | [ObjectId<COTTask\>](/docs/documentation/models/tasks/model_tasks) | Optional | 
**content** | Displays a string with the document's content in [markdown](/docs/documentation/client/notes_markdown) format. | string | Optional | 

#### Request Sample {#request-post-note-sample}
_Request with the minimum required body._

```bash
curl --location --request POST 'https://www.cotalker.com/api/v3/notes' \
--header 'Authorization: Bearer $ACCESS_TOKEN' \
--header 'Content-Type: application/json' \
--data-raw '{
    "title": "Hello, World!"
}'
```

#### Response Sample {#response-post-note-sample}
The request returns the created note in [COTNote](/docs/documentation/models/notes/model_notes) data model structure.

---

## Update Note {#patch-note}
_Updates a note._

<span className="hero__subtitle"><span className="badge badge--warning">PATCH</span> /notes/&#123;id&#125;</span>

#### Endpoint URL {#post-note-url}
`https://www.cotalker.com/api/v3/notes/{id}`

#### Headers {#post-note-header}
Header | Description | Required | Values
--- | --- | --- | ---
**Authorization** | Sends your _access token_ to make an API request.<br/>[Click here to see how to obtain an _access token_.](/docs/documentation/api/auth#how-to) | Required | Bearer $ACCESS_TOKEN
**Content-Type** | Sets the body's format. | Required | application/json

#### Request Body {#request-body-post-note}
Element | Description | Type | Required | Notes
--- | --- | --- | --- | ---
**title** | The title of the document. | string | Optional | 
**description** | A brief description of the note written by the document's author. | string | Optional | 
**context** | Indicates the task, and its corresponding task group, the document is associated with. | object | Optional |  
**context.task** | Associated task details. | object | Optional | 
**context.task.taskGroupId** | The objectId of the task group the document is found in. | [ObjectId<COTTaskGroup\>](/docs/documentation/models/tasks/model_taskgroup) | Optional | 
**context.task.taskId** | The objectId of the task the document is found in. | [ObjectId<COTTask\>](/docs/documentation/models/tasks/model_tasks) | Optional | 
**content** | Displays a string with the document's content in [markdown](/docs/documentation/client/notes_markdown) format. | string | Optional | 


#### Request Sample {#request-post-note-sample}
_This is a sample request that changes the task the note is associated with._
```bash
curl --location --request PATCH 'https://www.cotalker.com/api/v3/notes/63a47e71ab0560c59dfe9652' \
--header 'Authorization: Bearer $ACCESS_TOKEN' \
--header 'Content-Type: application/json' \
--data-raw '{
    "context": {
        "task": {
            "taskId": "63a43f06e44e0a000817ca5d",
            "taskGroupId": "6398b1c56a2c1e56cde86301"
        }
    }
}'
```

#### Response Sample {#response-post-note-sample}
The request returns the updated note in [COTNote](/docs/documentation/models/notes/model_notes) data model structure.
