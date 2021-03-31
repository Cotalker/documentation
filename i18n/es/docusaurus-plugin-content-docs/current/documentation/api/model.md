---
id: model
title: Model Overview
sidebar_label: Overview
---
import Mermaid from '@theme/Mermaid';

# Interactions {#interactions}

Cotalker has a limted set a internal models. The settings of these models allow to build custom workflows.

* __Users__ Represents persons o bots that can perform actions within a company.
* __Groups__ Represents a workflow, may contain channels and/or tasks or a link.
* __Channels__ Represents a space where users can communicate
* __Databases__ Custom tables for companies. E.g., Products, Offices, Custumers, Colors, SKUs, States, etc
* __Messages__ Has a content and contentType that determines how to represent the element
* __Surveys__ Format of a form
* __Access Roles__ Set of permissions
* __State Machine__ Rules of how tasks are created and manipulated
* __Tasks__ Element that represents a task or active
* __Scheduler__ Time based, or repetitive action
* __Bots__ Represents a actions that triggers based on its configuration.
* __Answers__ An answer is created each time a survey is filled.

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
