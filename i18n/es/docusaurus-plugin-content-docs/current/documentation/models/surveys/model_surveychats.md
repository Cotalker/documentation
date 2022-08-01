---
title: Survey Chats Data Model
sidebar_label: COTSurveyChat
---

:::caution Advertencia
Esta página aún no se encuentra traducida al español.
:::
import useBaseUrl from '@docusaurus/useBaseUrl'; 
import Highlight from '@theme/Highlight';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Mermaid from '@theme/Mermaid';

<span className="hero__subtitle">COTSurveyChat</span>

## Description {#description}
Each Survey Chat data model (COTSurveyChat) represents a [component](/docs/documentation/admin/survey/survey_overview#form-components) on a survey form. Usually, through the `contentArray` field, two [COTQuestion](/docs/documentation/models/surveys/model_questions) ObjectIds are paired together. One pertains to the component's _title_ or displayed text, the other to the area for data input.

<Mermaid chart={`
	graph LR;
        S[COTSurvey] --> C1[COTSurveyChat #1]
        S --> C2[COTSurveyChat #2]
        S --> C3[COTSurveyChat]
        C1 --> Q1T[COTQuestion - Field Label]
        C1 --> Q1I[COTQuestion - Input Settings]
        C2 --> Q2T[COTQuestion - Field Label]
        C2 --> Q2I[COTQuestion - Input Settings]
        Q2I --> QE[COTQuestionExec]
        C3 --> Q3[COTQuestion - Label & Input]
`}/>

## JSON Sample {#json-sample}

```json
{
    "_id" : "61436eb4dd1e5a60a302ea9a",
    "__v" : 0,
    "content" : "",
    "contentArray" : [ 
        "61436eb4dd1e5af41302eab6", 
        "61436eb4dd1e5a1e8302eab7"
    ],
    "contentType" : "application/vnd.cotalker.survey",
    "isActive" : true,
    "isSystemModel" : false,
    "modifiedAt" : "2021-09-16T16:20:04.438Z",
    "order" : 0,
    "sender" : "#system",
    "survey" : "61436eb4dd1e5a023102ea8b"
}
```



## Fields {#fields}
| Field | Description | [Type](/docs/documentation/models/overview_model#data-types) | Notes |
| ---- | ---- | ---- | ---- |
| **\_id** | The Survey Chat data model's ID code | ObjectId<COTSurveyChat\> |
| **__v** | Version number | number | For internal system use only. |
| **content** | This field stays empty | string | |
| **contentArray** | Pairs the two parts of a survey _component_ or _question_: one corresponds to the _question_ title, the other to data input configuration | ObjectId<COTQuestion\>[ ] | [Question data model](/docs/documentation/models/surveys/model_questions)
| **contentType** | Indicates the content type | string | Default value: `application/vnd.cotalker.survey` 
| **isActive** | Indicates if it is available for use | boolean | 
| **isSystemModel** | If true, it cannot be changed, even by admins | boolean 
| **modifiedAt** | Indicates the last time it was modified | ISODate | YYYY-MM-DDTHH:mm:ss.SSSZ
| **order** | Indicates the represented _question's_ place on the survey form | number | Lower numbers are higher on top
| **sender** | Indicates origin | string | Options: `#system`, `#user`
| **survey** | Indicates the survey the question corresponds to | ObjectId<COTSurvey\> | [Survey data model](/docs/documentation/models/surveys/model_surveys)

## Additional Resources {#resources}

- [Surveys Overview](/docs/documentation/admin/survey/survey_overview): Complete description about surveys
- ["Survey Chat" REST API documentation](/docs/documentation/api/surveys/survey_chats): basic "Survey Chat" API requests
- [API documentation in Swagger](https://www.cotalker.com/swagger/core/?key=woubtjf4olr0t4zgutuwn6scbcm6hd3qh1cgl5obmohpbm3mfublnwcvv67lodgjvd3h86s9ppshtvmf95gepsqh6nizq9liu7f): complete with data models (schemas)
- [COTLang](/docs/documentation/automation/cotlang/admin_cotlang): use COTLang for extracting data from models in routines
- [Triggers and Contexts](/docs/documentation/automation/cotlang/triggers_and_contexts): more information on using data models within routines

## Help {#help}

- [Cotalker Platform Community](https://github.com/Cotalker/documentation/discussions): post your questions or search for previous answers given in the forum

