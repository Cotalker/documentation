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

**Data models** are the backbone of the Cotalker environment. Almost everything in Cotalker sustains itself inside a _data model_. 

Model settings allow building custom workflows. Knowing _data model_ structures is especially important for admins and developers when using [API](/docs/documentation/api/overview_api) tools and understanding [contexts](/docs/documentation/automation/triggers_and_contexts#context-language) when extracting data.

There are a limited set of internal _data models_ which are explained below.

</div>
<br/>

## Model Descriptions {#descriptions}

Data Model (Context) | Description | Endpoint
--- | --- | ---
[COTAccessRole](/docs/documentation/models/users/model_accessroles) | access roles that grant user permissions | /accessroles 
[COTAnswer](/docs/documentation/models/surveys/model_answers) | answers represent the submitted survey response | /answers
[COTAnswerData](/docs/documentation/models/surveys/model_answer_data) | contains an answer's submitted data and is found in COTAnswer | N/A
[COTBot](/docs/documentation/models/automations/model_bots) | bots carry out diverse programmable routines | /bots , 
[COTChannel](/docs/documentation/models/communication/model_channels) | workspace channels where users can view task information, answer surveys, or chat with other users associated with the channel | /channels
[COTCompany](/docs/documentation/models/model_company) | company configuration and settings | /companies
[COTGroup](/docs/documentation/models/communication/model_groups) | groups hold together tasks and channels or act as links to URLs | /groups
[COTJobTitle](/docs/documentation/models/users/model_jobtitles) | job titles group users and give them special attributes | /jobtitles
[COTMessage](/docs/documentation/models/communication/model_messages) | messages correspond to chat messages users send to each in channels, responses submitted in a survey, or system-generated messages | /messages
[COTMessageContentType](/docs/documentation/models/communication/model_messageContent) | Indicates the content type of the message and is found in COTMessage | N/A
[COTParametrizedBot](/docs/documentation/models/automations/model_parametrizedbot) | Holds an automated routine and is found in COTSMStateMachine, COTSMState, COTSMSLA, COTBot, COTPBScipt, and COTSchedule. | N/A
[COTPBScript](/docs/documentation/models/automations/model_pbscripts) | corresponds to saved routine stages that can be later incorporated to any routine | /pbscripts
[COTProperty](/docs/documentation/models/databases/model_properties) | properties (elements) make up the property types and can be used to act as assets or even states | /properties
[COTPropertyType](/docs/documentation/models/databases/model_propertytypes) | property types (collections) are like tables that can store all kinds of data | /propertyTypes
[COTQuestion](/docs/documentation/models/surveys/model_questions) | The individual survey [component](/docs/documentation/admin/survey/survey_overview#form-components) | /questions
[COTQuestionContentType](/docs/documentation/models/surveys/model_questionContentType) | The question's or survey component's content type. | N/A
[COTQuestionExec](/docs/documentation/models/surveys/model_questionExec) | Javascript automation that runs within the survey and is found in COTQuestion | N/A
[COTSchedule](/docs/documentation/models/automations/model_scheduler) | schedules are automated scheduled routines | /schedules
[COTSMSLA](/docs/documentation/models/tasks/model_sla) | automated SLA routines associated to State Machines (workflow groups) | /tasks/{id}/sla
[COTSMState](/docs/documentation/models/tasks/model_state) | the state of workflow or task | /tasks/{id}/sm/smstate
[COTSMStateMachine](/docs/documentation/models/tasks/model_statemachine) | a state machine is the workflow process a task goes through | /tasks/{id}/sm/smstatemachine
[COTSurvey](/docs/documentation/models/surveys/model_surveys) | surveys gather different types of input from users | /surveys
[COTSurveyChat](/docs/documentation/models/surveys/model_surveychats) | each survey chat holds _questions_ that correspond to a survey [_component_](/docs/documentation/admin/survey/survey_overview#form-components) | /surveychats
[COTTask](/docs/documentation/models/tasks/model_tasks) | a task is the representation of an asset and its state | /tasks/{id}/task
[COTTaskGroup](/docs/documentation/models/tasks/model_taskgroup) | a task group contains the tasks of the same workflow group | /tasks/group
[COTUser](/docs/documentation/models/users/model_users) | users in your company, both humans and bots | /users


<!-- 
* [__Users__](/docs/documentation/models/users/model_users): Represents a person or bot that can perform actions within a company.
* [__Access Roles__](/docs/documentation/models/users/model_accessroles): Set of permissions
* [__Channels__](/docs/documentation/models/communication/model_channels): Represents a space where users can communicate
* [__Messages__](/docs/documentation/models/communication/model_messages): Has content and contentType that determines how to represent the element
* [__Groups__](/docs/documentation/models/communication/model_groups): Represents a workflow, may contain channels and/or tasks or a link.
* [__Collections (Property Types)__](/docs/documentation/models/databases/model_propertytypes): Custom tables for companies. E.g., Products, Offices, Customers, Colors, SKUs, States, etc
* [__Elements (Properties)__](/docs/documentation/models/databases/model_properties): Items that fill or make up a _collection_.
* [__Surveys__](/docs/documentation/models/surveys/model_surveys): Format of a form
* [__Survey Chats__](/docs/documentation/models/surveys/model_surveychats): References all the questions asked in a survey
* [__Questions__](/docs/documentation/models/surveys/model_questions): The individual questions asked in a survey
* [__Answers__](/docs/documentation/models/surveys/model_answers): An _answer_ is created each time a _survey_ is filled.
* [__State Machine__](/docs/documentation/models/tasks/model_statemachine): Rules of how tasks are created and managed
* [__Tasks__](/docs/documentation/models/tasks/model_tasks): Element that represents a task or asset
* [__Scheduler__](/docs/documentation/models/automations/model_scheduler): Time based, or repetitive action
* [__Bots__](/docs/documentation/models/automations/model_bots): Represents an action that is triggered based on its configuration.
* [__Company__](/docs/documentation/models/model_company): The underlying data model that connects all other elements, contains basic company configuration -->

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
