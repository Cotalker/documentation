---
title: Basic Concepts / Glossary
sidebar_label: Basic Concepts
---

:::caution Advertencia
Esta página aún no se encuentra traducida al español.
:::
import useBaseUrl from '@docusaurus/useBaseUrl'; 
import Tasks, {toc as Title1TOC} from '/i18n/es/docusaurus-plugin-content-docs/current/documentation/client/glossary/_task.mdx';
import Workflows, {toc as Title2TOC} from '/docs/documentation/client/glossary/_workflows.mdx';



<div className="alert alert--primary">

## Overview {#overview}

In this section, we introduce basic concepts and vocabulary used in the Cotalker environment. 

- For general setup instructions, see the [Admin Docs](/docs/documentation/documentation_overview).
- For step-by-step, real-world examples, check out our [Tutorial](/docs/tutorials/tutorial_overview) section.
- For basic tools and section descriptions, go to [The Basics](/docs/documentation/client/client_overview).

</div>
<br/>

<div className="alert alert--secondary">

## Administration {#administration}
<span className="hero__subtitle">Monitor, create, and expand the Cotalker environment.</span>

Admins have the power to customize and adapt the Cotalker environment through the [administrative panel](/docs/documentation/admin/admin_overview). Create and edit workflows, databases, users, surveys, routines, and much more. 

</div>
<br/>

<div className="alert alert--secondary">

## Automation {#automation}
<span className="hero__subtitle">Build routines triggered by events.</span>

With our routine builder, you can set diverse automations triggered by surveys, bots, commands, SLA, task state changes, and more.

</div>
<br/>

<div className="alert alert--secondary">

## Channel {#channel}
<span className="hero__subtitle">Chat, send files, fill out forms, interact with bots, trigger events, view task information, change task status.</span>

The [channel workspace](/docs/documentation/client/channels) is a frontend for interacting and triggering different systems, e.g., a survey within the chat can call a bot and extract data from the sales database. This interface simplifies human-machine interactions into a generic chat and normalizes all systems into a simple view.

In channels associated with tasks, you can view and change a task's state or status, assign users and determine deadlines.

_Channel with messages and file sharing:_
<img alt="chat messages" className="img_sizing item shadow--tl" src={useBaseUrl('img/concepts_chat_00.png')} />
<br/>
<br/>

_Channel with filled out form and automated bot response:_
<img alt="chat survey" className="img_sizing item shadow--tl" src={useBaseUrl('img/concepts_chat_01.png')} />
<br/>

_Channel with task info side panel:_
<img alt="chat survey" className="img_sizing item shadow--tl" src={useBaseUrl('img/concepts_chat_02.png')} />
<br/>

</div>
<br/>

<div className="alert alert--secondary">

## Collection {#collection}
<span className="hero__subtitle">A collection is like a database table.</span>

A collection – sometimes referred to as a _property type_ – is a set of [elements](#elements) (_properties_). Collections – and their elements – have vast possibilities and permit organizing and connecting everything in the Cotalker environment.

</div>
<br/>

<div className="alert alert--secondary">

## Element {#elements}
<span className="hero__subtitle">Elements are like the rows of a database table, but much more.</span>

Elements (or _properties_) are contained within a collection. They are used to establish a relationship or define something. That's why you can use elements sometimes as a resource and others as an asset.

For example, you can send a specific text to all the users that have the "Special Message" element. Since each user is simply a collection, you can add elements to them.

Additionally, workflows use elements to define their states.

As you can see, the versatility of elements is quite significant.

</div>
<br/>


<div className="alert alert--secondary">

## State {#state}
<span className="hero__subtitle">A state is a status a task can assume within a workflow.</span>

[Tasks](#tasks) or assets assume and change states in the workflow process.

[Workflow](#workflows) states are set up through the [elements](#elements) of a collection.

:::note Further details for admins:
- [Create a Workflow Tutorial](/docs/tutorials/basic/create_state_machines)
- [Create/Edit State Settings Panel](/docs/documentation/admin/workflows/settings_panels/create_edit_state)
:::

</div>
<br/>

<div className="alert alert--secondary">

## Surveys {#surveys}
<span className="hero__subtitle">Create forms for getting data or initiating processes..</span>

Surveys are the base tool for workflows. Among other things, surveys allow users to start processes, make reports, change data, assign tasks, and execute any custom process adapted to your workflow.

_Workflow Start Form:_

<img alt="surveys" className="img_sizing item shadow--tl" src={useBaseUrl('img/concepts_survey_00.png')} />

</div>
<br/>

## Tasks {#tasks}

<Tasks/>

## Workflows {#workflows}

<Workflows/>











