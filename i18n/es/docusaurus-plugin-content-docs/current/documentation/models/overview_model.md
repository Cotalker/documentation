---
title: Data Models Overview
sidebar_label: Overview
---

:::caution Advertencia
Esta página aún no se encuentra traducida al español.
:::
import Mermaid from '@theme/Mermaid';


<div className="alert alert--primary">

## Introduction {#introduction}

**Data models** are the backbone of the Cotalker environment. All data in Cotalker is sustained within _data models_. 

_Data model_ structures are important for admins and developers in understanding data [contexts](/docs/documentation/automation/cotlang/triggers_and_contexts#context-language), especially when using [automated routines](/docs/documentation/automation/admin_routine) and making [API](/docs/documentation/api/overview_api) requests.

Available data models are explained below.

</div>
<br/>

## Model Descriptions {#descriptions}

### 1. Company & Users {#company-users}
Data Model (Context) | Description | Endpoint
--- | --- | ---
[COTCompany](/docs/documentation/models/company/model_company) | Company configuration and settings | /companies
[COTUser](/docs/documentation/models/users/model_users) | Users in your company, both humans and bots | /users
[COTJobTitle](/docs/documentation/models/users/model_jobtitles) | Job titles group users and give them special attributes | /jobtitles
[COTAccessRole](/docs/documentation/models/users/model_accessroles) | Access roles that grant user permissions | /accessroles 


### 2. Groups & Messages {#group-messages}
Data Model (Context) | Description | Endpoint
--- | --- | ---
[COTChannel](/docs/documentation/models/communication/model_channels) | Workspace channels where users can view task information, answer surveys, or chat with other users associated with the channel | /channels
[COTGroup](/docs/documentation/models/communication/model_groups) | Groups hold together tasks and channels or act as links to URLs | /groups
[COTMessage](/docs/documentation/models/communication/model_messages) | Messages correspond to chat messages users send to each in channels, responses submitted in a survey, or system-generated messages | /messages
[COTMessageContentType](/docs/documentation/models/communication/model_messageContent) | Indicates the content type of the message and is found in COTMessage | N/A


### 3. Survey Forms {#survey-forms}
Data Model (Context) | Description | Endpoint
--- | --- | ---
[COTAnswer](/docs/documentation/models/surveys/model_answers) | Answers represent the submitted survey response | /answers
[COTAnswerData](/docs/documentation/models/surveys/model_answer_data) | Contains an answer's submitted data and is found in COTAnswer | N/A
[COTQuestion](/docs/documentation/models/surveys/model_questions) | The individual survey [component](/docs/documentation/admin/survey/components_overview) | /questions
[COTQuestionContentType](/docs/documentation/models/surveys/model_questionContentType) | The question's or survey component's content type. | N/A
[COTQuestionExec](/docs/documentation/models/surveys/model_questionExec) | Javascript automation that runs within the survey and is found in COTQuestion | N/A
[COTSurvey](/docs/documentation/models/surveys/model_surveys) | Surveys gather different types of input from users | /surveys
[COTSurveyChat](/docs/documentation/models/surveys/model_surveychats) | Each survey chat holds _questions_ that correspond to a survey [_component_](/docs/documentation/admin/survey/components_overview) | /surveychats


### 4. Database {#database}
Data Model (Context) | Description | Endpoint
--- | --- | ---
[COTProperty](/docs/documentation/models/databases/model_properties) | Properties (elements) make up the property types and can be used to act as assets or even states | /properties
[COTPropertyType](/docs/documentation/models/databases/model_propertytypes) | Property types (collections) are like tables that can store all kinds of data | /propertyTypes


### 5. Tasks & Workflows {#tasks-workflows}
Data Model (Context) | Description | Endpoint
--- | --- | ---
[COTSMSLA](/docs/documentation/models/tasks/model_sla) | Automated SLA routines associated to State Machines (workflow groups) | /tasks/{id}/sla
[COTSMState](/docs/documentation/models/tasks/model_state) | The state of workflow or task | /tasks/{id}/sm/smstate
[COTSMStateMachine](/docs/documentation/models/tasks/model_statemachine) | A state machine is the workflow process a task goes through | /tasks/{id}/sm/smstatemachine
[COTTask](/docs/documentation/models/tasks/model_tasks) | A task is the representation of an asset and its state | /tasks/{id}/task
[COTTaskGroup](/docs/documentation/models/tasks/model_taskgroup) | A task group contains the tasks of the same workflow group | /tasks/group


### 6. Automations {#automations}
Data Model (Context) | Description | Endpoint
--- | --- | ---
[COTBot](/docs/documentation/models/automations/model_bots) | Bots carry out diverse programmable routines | /bots , 
[COTParametrizedBot](/docs/documentation/models/automations/model_parametrizedbot) | Holds an automated routine and is found in COTSMStateMachine, COTSMState, COTSMSLA, COTBot, COTPBScipt, and COTSchedule. | N/A
[COTPBScript](/docs/documentation/models/automations/model_pbscripts) | Corresponds to saved routine stages that can be later incorporated to any routine | /pbscripts
[COTSchedule](/docs/documentation/models/automations/model_scheduler) | Schedules are automated scheduled routines | /schedules
[COTWebhook](/docs/documentation/models/webhooks/webhook) | Webhook settings for sending event data when triggered. | /webhook/subscription
[COTWebhookLog](/docs/documentation/models/webhooks/webhooklog) | Webhook logs contain all the webhook data at the moment of triggering. | /webhook/subscription/logs/{id}
[COTEvent](/docs/documentation/models/webhooks/event) | The triggering event's data. | /webhook/subscription/logs/{id}
[COTSurveyExecution](/docs/documentation/models/webhooks/survey_execution) | Survey data associated with triggering events. | /webhook/subscription/logs/{id}

### 7. Search {#search}
Data Model (Context) | Description | Endpoint
--- | --- | ---
[Search Engine Model](/docs/documentation/models/search/searchengine) | Settings for data search made through an API request. | /search/search
[Search Category Results Model](/docs/documentation/models/search/searchresult) | Returned search results. | /search/search

## Interactions {#interactions}

<Mermaid chart={`
	graph LR;
        U[Users] --> C
        U --> A
        U --> P
        G[Groups] --> C
        C[Channels] --> P
        C --> B
        P[Databases] 
        M[Messages] --> C
        S[Surveys] --> P
        S --> A     
        A[Access Roles]
        X[State Machine]
        X --> G
        T[Tasks] --> X
        T --> C
        R[Scheduler]
        Z[Company]
        B[Bots]
        W[Answer] 
        S --> W
        U --> W
        C --> W
`}/>

## Data Types {#data-types}
_Data types used in the models._

- **string**
- **number**
- **boolean**
- **ISO date**: YYYY-MM-DDTHH:mm:ss.SSSZ 
- **ObjectId<T\>**:  
  ObjectId: a data object's unique 24 character hexadecimal (a-f 0-9) ID number, e.g., 507f1f77bcf86cd799439011
  
  <T\> = indicates a data model: COT* (examples: COTUser, COTCompany, COTGroup)
- **[ ]** : indicates an array
- **object**: indicates an internal object

