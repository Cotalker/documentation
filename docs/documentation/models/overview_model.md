---
title: Data Models Overview
sidebar_label: Overview
---
import Mermaid from '@theme/Mermaid';


<div className="alert alert--primary">

## Introduction {#introduction}

**Data models** are the backbone of the Cotalker environment. Almost everything in Cotalker sustains itself inside a _data model_. 

Model settings allow building custom workflows. Knowing _data model_ structures is especially important for admins and developers when using [API](/docs/documentation/api/overview_api) tools and understanding [contexts](/docs/documentation/automation/triggers_and_contexts#context-language) when extracting data.

There are a limited set of internal _data models_ which are explained below.

</div>
<br/>

## Model Descriptions {#descriptions}

* [__Users__](/docs/documentation/models/users/model_users) Represents a person or bot that can perform actions within a company.
* [__Access Roles__](/docs/documentation/models/users/model_accessroles) Set of permissions

* [__Channels__](/docs/documentation/models/communication/model_channels) Represents a space where users can communicate
* [__Messages__](/docs/documentation/models/communication/model_messages) Has a content and contentType that determines how to represent the element
* [__Groups__](/docs/documentation/models/communication/model_groups) Represents a workflow, may contain channels and/or tasks or a link.
* [__File Sharing__](/docs/documentation/models/communication/model_filesharing)

* [__Collections (Property Types)__](/docs/documentation/models/databases/model_propertytypes) Custom tables for companies. E.g., Products, Offices, Customers, Colors, SKUs, States, etc
* [__Elements (Properties)__](docs/documentation/models/databases/model_properties) Items that fill or make up a _collection_.

* [__Surveys__](/docs/documentation/models/surveys/model_surveys) Format of a form
* [__Survey Chats__](/docs/documentation/models/surveys/model_surveychats) 
* [__Questions__](/docs/documentation/models/surveys/model_questions)
* [__Answers__](/docs/documentation/models/surveys/model_answers) An _answer_ is created each time a _survey_ is filled.


* [__State Machine__](/docs/documentation/models/tasks/model_statemachine) Rules of how tasks are created and manipulated
* [__Tasks__](/docs/documentation/models/tasks/model_tasks) Element that represents a task or active

* [__Scheduler__](/docs/documentation/models/automations/model_scheduler) Time based, or repetitive action
* [__Bots__](/docs/documentation/models/automations/model_bots) Represents an action that is triggered based on its configuration.

* [__Company__](/docs/documentation/models/model_company)

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
