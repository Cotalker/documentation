---
title: Notes
sidebar_label: Notes
---
import useBaseUrl from '@docusaurus/useBaseUrl';

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
**createdBy** | CURRENTLY NOT WORKING | string | Optional |
**isActive** | Displays either active or deleted documents. | boolean | Optional | If the parameter is not used, both active and deleted documents are displayed.
**limit** | Limts the number of notes returned per response page. | number | Optional | Best if used in conjunction with the `page` parameter.
**orderBy** | CURRENTLY NOT WORKING | string | Optional |
**owner** | Displays notes belonging to: <br/>`all`: all the users<br/>`me`: the user making the request<br/>`other`: all users other than the one making the request | string | Optional | If no option is selected, the `me` option is used as default.
**page** | Makes the response display data from the indicated page number. | number | Optional | Used best with the `limit` parameter.
**sortBy** | Sort results by the following options: <br/>- `createdAt`: Date and time the note was created.<br/>- `modifiedAt`: Last time the note was modified. | string | Optional | By default, notes are sorted by `createdAt` field.
**taskGroupId** | Allows displaying notes associated with a task. | [ObjectId<COTTaskGroup\>](/docs/documentation/models/tasks/model_taskgroup) | Optional | Must be used inconjunction with the `taskId` parameter.
**taskId** | Allows displaying notes associated with a task. | [ObjectId<COTTask\>](/docs/documentation/models/tasks/model_tasks) | Optional | Must be used inconjunction with the `taskGroupId` parameter.