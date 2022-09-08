# Submit Form  
import useBaseUrl from '@docusaurus/useBaseUrl';

<img alt="design" className="img_title" src={useBaseUrl('img/design/Dashboards.svg')} />

## Overview {#overview}

This parameterized bot automatically fills out forms and sends them to the channel of your preference.

:::caution Take note
This bot is not retro-compatible. Use the latest version for best results.
:::

## Special Inputs {#special-inputs}
_Description of special parameters and formats for configuring the bot._



<div className="alert alert--secondary">

### Required ObjectIds {#required-objectid}

**Either of the following fields is required:**
  
<div className="padding-left--lg">

- [Survey ID](#1-survey-id-key-surveyid) field – `surveyId: MongooseObjectId;`

OR

- [Survey Code](#2-survey-code-key-surveycode) field – `surveyCode: string;`

:::note
Obtain ObjectIds from [COTSurvey](/docs/documentation/models/surveys/model_surveys) data model.
:::

</div>

---------

**Either of the following fields is required:**

<div className="padding-left--lg">

- [Channel Id](#3-channel-id-key-channelid) field – `channelId: MongooseObjectId;`

OR

- [Task Id](#4-task-id-key-taskid) field – `taskId: MongooseObjectId;`
- [Task Group Id](#5-task-group-id-key-taskgroupid) field – `taskGroupId: MongooseObjectId;`

:::note
Obtain ObjectIds from [COTChannel](/docs/documentation/models/communication/model_channels), [COTTask](/docs/documentation/models/tasks/model_tasks), and [COTTaskGroup](/docs/documentation/models/tasks/model_taskgroup), respectively.
:::

</div>
</div>
<br/>

<div className="alert alert--secondary">

### Prefilled Format {#prefilled-format}

The [_Prefilled_](#9-prefilled-key-prefilled) field has a [custom format, depending on the survey](#data-type). 
The general format is `{ identifier-1: value-1, identifier-2: value-2 ... } `.

For example, if a survey has two fields, a text-input ("name") and a number-input ("age"), the correct format would be: 

```json
prefilled: {
    "name": "Trinidad",
    "age": 1
}
```

#### Data Types per Question Type {#data-type}
_Data types for prefilled surveys depend on the question type or survey component._

| Survey Question Type | Data Type |
| ---- | ----- |
| Text: | (label) cannot be set |
| Listquestion: | string[ ] (array of ON codes) e.g., [ "chile", "usa" ] |
| Textinput: | string |
| Textnumber: | number |
| Datetime: | Date (Not yet implemented) |
| Property: | string[ ]  (array of codes)  or  ObejctId<COTProperty\>[ ] |
| Person: | string[ ]  (array of emails)  or  ObejctId<COTUser\>[]  (NYI) |
| Calendar: | Not yet implemented |
| GPS: | Not yet implemented |
| Image: |  Not yet implemented |
| Signature: | Not yet implemented |
| File: | Not yet implemented |
| Api: | Not yet implemented |
| SurveySurvey: | Prefill[ ]   // surveys-surveys are defined as as an array of objects. [See example](#survey-survey). |

#### Survey-Survey Example {#survey-survey}
If the same _survey_ "name" and "age" is used as a _survey-survey,_ with the identifier `user_records`, this would create 3 _survey-surveys_, the first empty, the second with only the name, and the third with both name and age. |

```json
{
  "user_records": 
  [ 
    { },
    {
      "name": "Freddy"
    },
    {
     "name": "Kurt",
     "age": 27
    }
  ]
}
```

:::note
For more information on question types see: 
- [Survey Components](/docs/documentation/admin/survey/survey_overview#form-components)
- [Question Data Model](/docs/documentation/models/surveys/model_questions)
:::

</div>



---------

  
**Send a Form to a Channel**  
key: PBSendSurvey  
## Inputs  
### 1. Form (key: survey)  
Code of the Form to be sent  
Required: true  
Data Type: string   
### 2. Channel (key: channel)  
Id of the Channel where the Form will be sent  
Required: true  
Data Type: CotChannelId   
### 3. Sent by (key: sender)  
Id of the User submitting the Form  
Required: no  
Data Type: CotUserId   
### 4. Received by (key: recipient)  
Id of the User who receives the Form  
Required: true  
Data Type: CotUserId   
### 5. Saved (key: saved)  
Indicates whether the Submit Form should be marked as saved  
Required: no  
Data Type: boolean   
### 6. Prefilled fields (key: field)  
Prefilled fields of the Form  
Required: no  
Data Type: dictionary any  
### 7. Hidden Questions (key: hide)  
Hidden Form Questions  
Required: no  
Data Type: dictionary boolean  
## Next Stages  
### 1. SUCCESS  
  
### 2. ERROR  
  
## Outputs  
### 1. Status (key: status)  
  
Required: no  
Data Type: boolean   
### 2. Errors (key: errors)  
  
Required: no  
Data Type: array string