---
title: Introduction
---
import useBaseUrl from '@docusaurus/useBaseUrl'; 
import Highlight from '@theme/Highlight';

<span className="hero__subtitle">Settings Panel Guide</span>


<img alt="design" className="img_title" src={useBaseUrl('img/design/Workflows.svg')} />
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

## Settings Panels {#settings-panels}
- [**Initial Settings Panel / Workflow Groups**](/docs/documentation/admin/workflows/settings_panels/workflowgroups-initial)
- [**Create/Edit Workflow Group**](/docs/documentation/admin/workflows/settings_panels/workflowgroup-create-edit)
- [**Workflow-group Channels**](/docs/documentation/admin/workflows/settings_panels/workflowgroup_channels)
- [**Set Up Workflows**](/docs/documentation/admin/workflows/settings_panels/workflows-setup)
- [**Create/Edit State**](/docs/documentation/admin/workflows/settings_panels/create_edit_state)


## Basic Operations {#basic-operations}
<!-- - Create a workflow -->
- [**Set up Start Forms**](/docs/documentation/admin/workflows/admin_workflow_required_survey)
- [**Set up a Public Survey**](/docs/documentation/admin/workflows/admin_workflow_public_survey)

## Advanced Operations {#advanced-operations}
- [**Routine Builder**](/docs/documentation/automation/admin_routine)
- [**SLAs**](/docs/documentation/automation/sla)



## Related Tutorials {#tutorials}
- [Create a Workflow Tutorial](/docs/tutorials/basic/create_state_machines)
- [Create a Survey that Starts a Workflow](/docs/tutorials/intermediate/create_survey_sm)









<br/>
<br/>

_[Go back to Table of Contents](#table-of-contents)_ -->