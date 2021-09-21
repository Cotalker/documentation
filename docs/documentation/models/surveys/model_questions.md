---
title: Questions Data Model
sidebar_label: COTQuestions
---
import useBaseUrl from '@docusaurus/useBaseUrl'; 
import Highlight from '@theme/Highlight';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<span className="hero__subtitle">COTQuestion</span>

## Description {#description}
Questions make up survey forms; their wide variety allows different forms for gathering input. Apart from their different content types, questions are divided up into pairs, one part represents its title or displayed text, and the other corresponds to the data input configuration.

## JSON Sample {#json-sample}

## Fields {#fields}

| Field | Description | [Type](/docs/documentation/models/overview_model#data-types) | Notes |
| ---- | ---- | ---- | ---- |
| contentType | Indicates COTQuestionContentType | string | [List of question content types](/docs/documentation/models/surveys/model_questionContentType)
| display | Displayed question title or _field label_ | string[ ] | Its contents depend on the `contentType` and whether the data model corresponds to the _title_ section of the question.
| code | Depends on the `contentType` | string[ ] |
| identifier | Unique identification name | string | Maximum 60 characters; only lowercase letters, numbers, and underscore allowed; must be unique.
| company | Company identification code | ObjectId<COTCompany\> |
| min | Depending on the type of question, it could represent the minimum number of components or characters permitted | number |
| max | Depending on the type of question, it could represent the maximum number of components or characters permitted | number | 
| isActive | Indicates if whether the question is active or not | boolean |
| modifiedAt | Indicates when the question was last modified | ISODate | YYYY-MM-DDTHH:mm:ss.SSSZ
| isSystemModel | If true, it cannot be changed, even by admins | boolean |
| isReadOnly | Users cannot enter or fill out a respone | boolean | 
| required | Users must answer the question in order to submit the form | boolean |
| textAlign | Indicates alignment for displayed text | string |
| responses |  | string[ ] |
| command | ____ | object |
| command.commands | ____ | string[ ] |
| commmand.isCommanded | Conditional display identifier | string |
| command.restItentifiers | string[ ] | 
| command.values | ____ | object[ ] |
| command.values.op | ____ | string | 
| command.values.target | ____ | string |
| exec | Javascript automated questions (QuestionExec) | object | 
| exec.preload | Preload lifecycle stage | object<COTQuestionExec\> |
| exec.onDisplay | onDisplay lifecycle stage | object<COTQuestionExec\> |
| exec.filter | ____ | object<COTQuestionExecFilter\> |
| exec.validate | Validate lifecycle stage | | object<COTQuestionExec\> |
| exec.onChange | ____ | object<COTQuestionExec\> |
| exec.presave | ____ | object<COTQuestionExec\> |
| exec.postsave | Postsave lifecycle stage | object<COTQuestionExec\> |


## Deprecated {#deprecated}

| symbolizes | ____ | string |
| group | ____ | ObjectId<COTGroup\> |
| hideEmpty | ____ | boolean |



| Field | Type | Description | Notes |
| ----  | ---- | ----------- | ----  |
| _id   | id   | Unique Identifier   | Unique. Exactly 24 chars. Valid chars [0-9a-f] |
| identifier | string | Unique Identifier | 
| contentType | string | Question Type
| code | Array<string\> | Array of settings. Depends on content type
| display | Array<string\> | Array of settings. Depends on content type
| modifiedAt | date | Last modification date
| createdAt | date | Entry creation date

:::note 
This is a simplified version. The complete model will be published soon.
:::