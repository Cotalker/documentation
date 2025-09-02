---
title: Workflows
sidebar_label: Introduction
---
import useBaseUrl from '@docusaurus/useBaseUrl'; 
import Highlight from '@theme/Highlight';

<span className="hero__subtitle">Settings Panel Guide</span>


<img alt="design" className="img_sizing_small" src={useBaseUrl('img/design/Workflows.svg')} />
<br/>
<br/>

<div className="alert alert--primary">

## What is a "Workflow"? {#description}

Usually, a company will need to assign a [_task_](/docs/documentation/client/basic_concepts#tasks) in relation to an asset. A _workflow_ is the process your _tasks_ have to go through. Inside the workflow, the _task_ can pass through different _states_. This configuration of available _states_ is referred to as a _state machine_. 

_Workflows_ are used to create _tasks_ and their corresponding processes. For example, suppose an administrative request must be approved by a CEO, a manager, and an administrator. In that case, whenever an administrative request needs approval, a _workflow_ could be set up to create a _task_ that would ask each one of them, one after another, for approval. If along the line, one of them doesn't approve, the request gets rejected and doesn't continue down the chain.

A _workflow_ is made up of one or more _state machines_. In a state machine, all states through which the _task_ could pass are specified, as well as each [_routine_](/docs/documentation/automation/admin_routine). Following the example given above, a _routine_ can be programmed to send an email notifying the CEO once the administrator and manager have approved the request.

Workflows are hosted inside a [_workflow group_](/docs/documentation/client/groups#workflow-groups). _Workflow groups_ can host multiple workflows and permit interaction among them.

</div>
<br/>

## Accessing the Workflows Section {#workflows}
To access <span className="badge badge--primary">Workflows</span> section:

<img alt="overview image" className="img_sizing img_format item shadow--tl" src={useBaseUrl('img/admin_workflows_00.png')} />
<br/>

1. Press <span className="badge badge--primary">Administrator</span> in the **Main Menu Bar**.
2. Select <span className="badge badge--primary">Workflows</span> from the **Administrative Panel**.
3. The [**Workflows settings panel**](#layout) will open up.
4. From this [initial settings panel](#layout), you can access all the other workflows section panels.

<div className="alert alert--secondary">

## Initial Settings Panel Layout {#layout}
The **Workflow Settings Panel** opens up as the _initial settings panel_ in the <span className="badge badge--primary">Workflows</span> section. From here, you can access all of the section's settings panels.

_This is the layout of the workflow settings panel:_

<img alt="workflow group" className="img_sizing img_format item shadow--tl" src={useBaseUrl('img/admin_workflowgroups_00.png')} />
<br/>

1. [**Create New Workflow**](/docs/documentation/admin/workflows/settings_panels/workflowgroup-create-edit)
2. **Workflow List**
    1. [**Channel Manager**](/docs/documentation/admin/workflows/settings_panels/workflowgroup_channels)
    2. [**Edit Workflow**](/docs/documentation/admin/workflows/settings_panels/workflowgroup-create-edit)

:::note
- **Workflow groups** unite workflows with tasks and users. Each workflow group hosts at least one workflow. 
- End-users interact with workflow groups through the [groups panel](/docs/documentation/client/groups#workflow-groups).
:::

</div>
<br/>

## Settings Panels {#settings-panels}
- [**Create/Edit Workflow**](/docs/documentation/admin/workflows/settings_panels/workflowgroup-create-edit)
- [**Workflow-group Channels**](/docs/documentation/admin/workflows/settings_panels/workflowgroup_channels)
- [**Create/Edit State**](/docs/documentation/admin/workflows/settings_panels/create_edit_state)


## Basic Operations {#basic-operations}
<!-- - Create a workflow -->
- [**Set up Start Forms**](/docs/documentation/admin/workflows/admin_workflow_required_survey)
- [**Set up a Public Survey**](/docs/documentation/admin/workflows/admin_workflow_public_survey)

## Advanced Operations {#advanced-operations}
- [**Routine Builder**](/docs/documentation/automation/admin_routine)
- [**SLAs**](/docs/documentation/automation/sla)

<br/>
<br/>

_[Go back to Table of Contents](#table-of-contents)_ -->