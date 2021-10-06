---
title: Question Execution
sidebar_label: COTQuestionsExec
---
import useBaseUrl from '@docusaurus/useBaseUrl'; 
import Highlight from '@theme/Highlight';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Mermaid from '@theme/Mermaid';

<span className="hero__subtitle">COTQuestionExec</span>

## Description {#description}

This model is a Javascript-automated question that runs within a [component lifecycle stage](/docs/documentation/automation/question_exec#component-lifecycle-stages). It can be found as part of a [COTQuestion](/docs/documentation/models/surveys/model_questions) within an `exec` field, i.e., `exec.onChange`, `exec.onDisplay`, `exec.preload`, `exec.presave`, `exec.postsave`, `exec.validate`. It specifies the [parameters or context variables](/docs/documentation/automation/question_exec#parameters-context-variables) and source code used in [Javascript-automated survey components](/docs/documentation/automation/question_exec). 

<Mermaid chart={`
	graph LR;
        S[COTSurvey] --> C1[COTSurveyChat #1]
        S --> C2[COTSurveyChat #2]
        C1 --> Q1T[COTQuestion - Field Label]
        C1 --> Q1I[COTQuestion - Input Settings]
        C2 --> Q2T[COTQuestion - Field Label]
        C2 --> Q2I[COTQuestion - Input Settings]
        Q2I --> QE[COTQuestionExec]
`}/>

## JSON Sample {#json-sample}

```json
{
    "exec" : {
        "validate" : {
            "context" : "responses#self",
            "src" : "function run() { const email = context['responses#self'][0] ; if (!email.match(/@/)) return [ { cmd: 'RESULT', result: false, value: 'The input must have an @' } ]; return [{ cmd: 'RESULT', result: true }]; }"
        }
    }
}
```

## Fields {#fields}

| Field | Description | [Type](/docs/documentation/models/overview_model#data-types) | Notes |
| ---- | ---- | ---- | ---- |
| context | Indicates the Cotalker Data Model or *context* from where to extract the data. | string | See [Execution Context](#context) table below for more details.  |
| src | The Javascript code used for the automation | string | See the [Coding Guide](/docs/documentation/automation/question_exec#coding-guide) for details.


## Execution Context {#context}
Functions must be able to have access to some contextual variables: This context must be set so that the JS code has access to these variables. Format: KEY1#VALUE1,KEY2#VALUE2,...

_Examples:_

| Context | Type |
| ---- | ---- |
| respones#self: | string
| responses#<identifier\> | string
| user#me | [COTUser](/docs/documentation/models/users/model_users)
| user#responder | [COTUser](/docs/documentation/models/users/model_users)
| user#creator | [COTUser](/docs/documentation/models/users/model_users)
| user#<id\> | [COTUser](/docs/documentation/models/users/model_users)
| group#self | [COTGroup](/docs/documentation/models/communication/model_groups)
| group#<id\> | [COTGroup](/docs/documentation/models/communication/model_groups)
| channel#self | [COTChannel](/docs/documentation/models/communication/model_channels)
| channel#<id\> | [COTChannel](/docs/documentation/models/communication/model_channels)
| property#channel | [COTProperty](/docs/documentation/models/databases/model_properties)
| property#user: | [COTProperty](/docs/documentation/models/databases/model_properties)
| property#<id\> | [COTProperty](/docs/documentation/models/databases/model_properties)
| survey#self | [COTSurvey](/docs/documentation/models/surveys/model_surveys)
| survey#<id\> | [COTSurvey](/docs/documentation/models/surveys/model_surveys)
| question#self | [COTQuestion](/docs/documentation/models/surveys/model_questions)
| time#unixms | number
| location#latlon | string, e.g. (17.21323:21:21323) |

## Additional Resources {#resources}

- [Question Exec](/docs/documentation/automation/question_exec): Overview and examples of Javascript-automated questions
- [COTQuestion](/docs/documentation/models/surveys/model_questions): Questions data model
- ["Questions" REST API documentation](/docs/documentation/api/surveys/questions): basic "Questions" API requests
- [API documentation in Swagger](https://www.cotalker.com/swagger/core/?key=woubtjf4olr0t4zgutuwn6scbcm6hd3qh1cgl5obmohpbm3mfublnwcvv67lodgjvd3h86s9ppshtvmf95gepsqh6nizq9liu7f): complete with data models (schemas)
- [COTLang](/docs/documentation/automation/admin_cotlang): use COTLang for extracting data from models in routines
- [Triggers and Contexts](/docs/documentation/automation/triggers_and_contexts): more information on using data models within routines

## Help {#help}

- [Cotalker Platform Community](https://github.com/Cotalker/documentation/discussions): post your questions or search for previous answers given in the forum
