---
title: API Overview
sidebar_label: Overview
---
import useBaseUrl from '@docusaurus/useBaseUrl';
import Highlight from '@theme/Highlight';
import Mermaid from '@theme/Mermaid';

<img alt="design" className="img_title" src={useBaseUrl('img/design/Main_menu.svg')} />
<br/>

## Introduction {#introduction}

<span className="hero__subtitle">Make the most out of Cotalker's potential for your automation processes using its API tools.</span>

Everything available in Cotalker's GUI is accessible through API requests. This permits developers add extra layers of automatization and ability to integrate other systems with Cotalker.
_Here are some examples of what you can do with Cotalker's API tools:_
- easily upload large amounts of data
- scale and automate the work of admins
- integrate ERP, CRM, Satellites, and IoT
- externally automate processes
- gather data from different endpoints
- configure user, group, and other platform settings
- quickly modify user permissions and access roles
- configure workflows and tasks
- manage the data in your collections
- and much more!

_Learn more about the different endpoints and start taking your company's automation process to the next level!_

## Getting Started {#getting-started}

Using the web API through a script or integration is as simple as calling an endpoint, e.g., getting all users:  
`GET https://www.cotalker.com/api/v2/users`.

All endpoints MUST be called with the corresponding [authorization or access-token](/docs/documentation/api/auth).

## URLs {#urls}
URLs are used based on the endpoint that is called. The documentation for each endpoint indicates the appropriate URL.  

_Available URLs:_
- `https://www.cotalker.com/api/v1`
- `https://www.cotalker.com/api/v2`
- `https://www.cotalker.com/api/v3`

## Endpoints {#endpoints}
In this documentation, you can find basic REST API requests with samples and references to their [data models](/docs/documentation/models/overview_model). For a complete schematic guide to our APIs, please consult our [API documentation in Swagger](https://www.cotalker.com/swagger/core/?key=woubtjf4olr0t4zgutuwn6scbcm6hd3qh1cgl5obmohpbm3mfublnwcvv67lodgjvd3h86s9ppshtvmf95gepsqh6nizq9liu7f#/).

_Here's a list of the endpoints we cover in this documentation:_

Endpoint | Description | Data Model(s)
--- | --- | ---
[/auth/local](/docs/documentation/api/auth) | authentication token | N/A
[/companies](/docs/documentation/api/company) | company configuration and settings | [COTCompany](/docs/documentation/models/model_company)
[/users](/docs/documentation/api/users/) | users in your company, both humans and bots | [COTUser](/docs/documentation/models/users/model_users)
[/accessroles](/docs/documentation/api/users/accessroles) | set of permissions granted to users | [COTAccessRole](/docs/documentation/models/users/model_accessroles)
[/jobtitles](/docs/documentation/api/users/jobtitles) | job titles can group users and give them special attributes | [COTJobTitle](/docs/documentation/models/users/model_jobtitles)
[/groups](/docs/documentation/api/communication/groups) | groups hold together tasks and channels or act as links to URLs | [COTGroup](/docs/documentation/models/communication/model_groups)
[/channels](/docs/documentation/api/communication/channels) | workspace channels where users can view task information, answer surveys, or chat with other users associated with the channel | [COTChannel](/docs/documentation/models/communication/model_channels)
[/propertyTypes](/docs/documentation/api/databases/property_types) | property types (collections) are like tables that can store all kinds of data | [COTPropertyType](/docs/documentation/models/databases/model_propertytypes)
[/properties](/docs/documentation/api/databases/properties) | properties (elements) make up the property types and can be used to act as assets or even states | [COTProperty](/docs/documentation/models/databases/model_properties)
[/messages](/docs/documentation/api/communication/messages) | messages correspond to chat messages users send to each in channels, responses submitted in a survey, or system-generated messages | [COTMessage](/docs/documentation/models/communication/model_messages), [COTMessageContentType](/docs/documentation/models/communication/model_messageContent)
[/media/file](/docs/documentation/api/communication/files) | upload and retrieve files |
[/surveys](/docs/documentation/api/surveys/) | surveys gather different types of input from users | [COTSurvey](/docs/documentation/models/surveys/model_surveys)
[/surveychats](/docs/documentation/api/surveys/survey_chats) | each survey chat holds _questions_ that correspond to a survey[_component_](/docs/documentation/admin/survey/survey_overview#form-components) | [COTSurveyChat](/docs/documentation/models/surveys/model_surveychats)
[/questions](/docs/documentation/api/surveys/questions) | questions form part of survey [components](/docs/documentation/admin/survey/survey_overview#form-components) | [COTQuestion](/docs/documentation/models/surveys/model_questions), [COTQuestionContentType](/docs/documentation/models/surveys/model_questionContentType), [COTQuestionExec](/docs/documentation/models/surveys/model_questionExec)
[/answers](/docs/documentation/api/surveys/answers) | answers represent the input submitted through surveys | [COTAnswer](/docs/documentation/models/surveys/model_answers), [COTAnswerData](/docs/documentation/models/surveys/model_answer_data)
[/tasks](/docs/documentation/api/tasks/) | this endpoint holds together everything related to tasks: _tasks_, _task groups_, _state machines_, _states_, and _SLAs_ | [COTTask](/docs/documentation/models/tasks/model_tasks), [COTTaskGroup](/docs/documentation/models/tasks/model_taskgroup), [COTSMStateMachine](/docs/documentation/models/tasks/model_statemachine), [COTSMState](/docs/documentation/models/tasks/model_state), [COTSMSLA](/docs/documentation/models/tasks/model_sla)
[/bots](/docs/documentation/api/automations/bots) | bots carry out diverse programmable routines | [COTBot](/docs/documentation/models/automations/model_bots), [COTParametrizedBot](/docs/documentation/models/automations/model_parametrizedbot)
[/schedules](/docs/documentation/api/automations/scheduler) | schedules are automated scheduled routines | [COTSchedule](/docs/documentation/models/automations/model_scheduler), [COTParametrizedBot](/docs/documentation/models/automations/model_parametrizedbot)
[/pbscripts](/docs/documentation/api/automations/pbscripts) | corresponds to saved routine stages that can be later incorporated to any routine | [COTPBScript](/docs/documentation/models/automations/model_pbscripts), [COTParametrizedBot](/docs/documentation/models/automations/model_parametrizedbot)



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
