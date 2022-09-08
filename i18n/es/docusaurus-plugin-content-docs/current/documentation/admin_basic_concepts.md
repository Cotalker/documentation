---
title: Admin Basics
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img alt="design" className="img_title" src={useBaseUrl('img/design/Main_menu.svg')} />
<br/>

_Brief introduction to Cotalker concepts for admins._

## Users {#users}

Cotalker _users_ will find themselves with different [_data models_](/docs/documentation/models/overview_model).

An example of these _data models_ is the _user_ – the basic unit of a company – which can:
- Be assigned an [_access role_](/docs/documentation/admin/admin_accessrole) which defines what information a _user_ can read or edit.
- Interact through [_channels_](/docs/documentation/client/basic_concepts#channel) using [_surveys_](/docs/documentation/client/basic_concepts#surveys) or _message_ other _users_ in a particular in a [_group_](/docs/documentation/admin/admin_group).
- Participate in a company process modeled by a [_workflow_](/docs/documentation/admin/workflows/admin_workflow_overview) guided by a [_task_](/docs/documentation/client/basic_concepts#tasks). For example, a workflow can be the rendering of expenses. _Users_ can send a request through the groups panel to create a _task_. The _task_ is then sent to each of the bosses – through the use of [_surveys_](/docs/documentation/admin/survey/survey_overview) – for their approval. Each created _task_ will have its own unique _channel_, where the respective responses of the people involved will be found.

## Workflows {#workflows}

A [**workflow**](/docs/documentation/admin/workflows/admin_workflow_overview) requires the creation of a _state machine_ to configure the process. It is built upon relations (represented by arrows) and states (represented by nodes), as you can see in the following image:
<img alt="workflow example" className="img_sizing_narrow item shadow--tl" src={useBaseUrl('img/admin_overview_statemachine.png')} />
<br/>


## Automations {#automations}

Furthermore, it is important to know that:
- Creating a [_routine_](/docs/documentation/automation/admin_routine) is necessary for the state machine to perform any action, such as changing from one state to another, sending an email, or sending a standard message to a channel.
- A [_customized bot_](/docs/documentation/admin/admin_bots) corresponds to the _model_ that executes a _routine_ to start a state machine or a standard activity in a company.
- Finally, the [_scheduler_](/docs/documentation/admin/admin_scheduler) works to execute a routine periodically in the company. For example: sending the pending task of the week every Monday.

_Elements_ are a state machine's basic unit because they determine the states a _state machine_ can have. Each _element_ corresponds to a unit derived from a _collection_. Following the example above, the _elements_ of the state machine (Headquarters Review, CEOs reviews, Management Review, Rejected Requests, and Accepted Requests) belong to the same _collection_ ("Expenses Report").

_Elements_ can also be used with different data models (_surveys_, _channels_, _users_, and others). The concepts used in each model are specified accordingly in the documentation.