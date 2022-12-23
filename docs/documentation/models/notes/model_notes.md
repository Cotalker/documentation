---
title: Notes Data Model
sidebar_label: 8. Notes
---
import useBaseUrl from '@docusaurus/useBaseUrl'; 

<span className="hero__subtitle"><em>COTNotes</em></span>
<br/>
<br/>

## Description {#description}
COTNotes represent all the data related to documents created with Cotalker's [Notes](/docs/documentation/client/notes) tool.

## Sample JSON {#json}
```json
{
    "_id": "6160da37c169e281e3b5b630",
    "description": "This is a description of the notes tool",
    "isActive": true,
    "title": "What's New: Try Out the New Notes Tool",
    "company": "58fe83eda8b7259625b9b15d",
    "context": {
                "task": {
                    "taskId": "638654d403ff9bbf5e6033c6",
                    "taskGroupId": "637e8bfc3fc08a000877ad06"
                }
            },
    "createdBy": "5fa95476f617b300080254b3",
    "createdAt": "2021-10-08T23:54:31.461Z",
    "modifiedAt": "2021-10-14T18:07:34.836Z",
    "__v": 0,
    "content": "# What's New: Try Out the New Notes Tool\n\n## Build knowledge collaboratively\n\n![Notes](https://s3.amazonaws.com/cotalker-us-files-hedgedoc/uploads/upload_e8f903afdf7d7e20f0f7d9b22d043c35.png)\n\n\n\n📝 Easily create _notes_ that you can share and edit in real time with other users on the Cotalker platform. With **Notes**, users can collaborate with all sorts of information to build your company's knowledge base. \n\nThe **Notes** tool uses [markdown syntax](/docs/documentation/client/notes_markdown) to help you focus on writing the text and forget about formatting. _Notes_ can be incorporated into _tasks_, shared through hyperlinks, managed in the _Notes dashboard_, and submitted through _surveys_. Furthermore, _notes_ associated with _tasks_ are included in _search queries_, making your shared knowledge accessible to all users within your company's Cotalker platform.\n\n**Notice:** While _notes_ are fully available in _tasks_, the _Notes dashboard_ is still in its _alpha_ phase and is subject to change.\n\n-------"
}
```


## Fields {#fields}

Field | Description | Type | Notes
--- | --- | --- | ---
**_id** | Indicates the documents's ObjectId by which it is identified. | ObjectId<COTNote\> |
**title** | The title of the document. | string |
**description** | A brief description of the note written by the document's author. | string |
**createdBy** | The objectId of the user that created the document. | [ObjectId<COTUser\>](/docs/documentation/models/users/model_users) |
**isActive** | Indicates whether the document is active or has been deleted. | boolean | Deleted documents are hidden from users in the platform, but they are still available through the backend.
**company** | The objectId of the company where the documents were created. | [ObjectId<COTCompany\>](/docs/documentation/models/company/model_company) |
**createdAt** | The time and date the document was created. | ISODate |
**modifiedAt** | Time and date of the last modification of the document. | ISODate |
**context** | Indicates the task, and its corresponding task group, the document is associated with. | object | 
**context.task** | Associated task details. | object |
**context.task.taskGroupId** | The objectId of the task group the document is found in. | [ObjectId<COTTaskGroup\>](/docs/documentation/models/tasks/model_taskgroup) |
**context.task.taskId** | The objectId of the task the document is found in. | [ObjectId<COTTask\>](/docs/documentation/models/tasks/model_tasks) |
**content** | Displays a string with the document's content in [markdown](/docs/documentation/client/notes_markdown) format. | string |

## Additional Resources {#additional-fields}
- [Notes tool documentation](/docs/documentation/client/notes)
- [Notes API documentation](/docs/documentation/api/notes/)

## Help {#help}
- [Cotalker Platform Community](https://github.com/Cotalker/documentation/discussions): post your questions or search for previous answers given in the forum