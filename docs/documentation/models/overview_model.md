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

## Descriptions {#descriptions}

* [__Users__](/docs/documentation/models/model_users) Represents a person or bot that can perform actions within a company.
* [__Groups__](/docs/documentation/models/model_groups) Represents a workflow, may contain channels and/or tasks or a link.
* [__Channels__](/docs/documentation/models/model_channels) Represents a space where users can communicate
* [__Databases__](/docs/documentation/models/model_propertytypes) Custom tables for companies. E.g., Products, Offices, Customers, Colors, SKUs, States, etc
* [__Messages__](/docs/documentation/models/model_messages) Has a content and contentType that determines how to represent the element
* [__Surveys__](/docs/documentation/models/model_surveys) Format of a form
* [__Access Roles__](/docs/documentation/models/model_accessroles) Set of permissions
* [__State Machine__](/docs/documentation/models/model_statemachine) Rules of how tasks are created and manipulated
* [__Tasks__](/docs/documentation/models/model_tasks) Element that represents a task or active
* [__Scheduler__](/docs/documentation/models/model_scheduler) Time based, or repetitive action
* [__Bots__](/docs/documentation/models/model_bots) Represents an action that is triggered based on its configuration.
* [__Answers__](/docs/documentation/models/model_answers) An _answer_ is created each time a _survey_ is filled.

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
