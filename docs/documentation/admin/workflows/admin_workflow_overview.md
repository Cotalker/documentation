---
id: admin_workflow_overview
title: Workflows Overview
sidebar_label: Overview
---
import useBaseUrl from '@docusaurus/useBaseUrl'; 
import Highlight from '@theme/Highlight';

<img alt="design" className="img_sizing" src={useBaseUrl('img/design/Workflows.svg')} />
<br/>
<br/>



<div className="alert alert--secondary">

## Table of Contents {#table-of-contents}

0. [Introduction](#introduction)
1. [Workflow Groups](/docs/documentation/admin/workflows/admin_workflow_groups)
    1. [Initial Settings Panel](/docs/documentation/admin/workflows/admin_workflow_groups#initial-settings-panel)
    2. [Create/Edit a Workflow Group](/docs/documentation/admin/workflows/admin_workflow_groups#create-edit-a-workflow-group)
2. [Workflow Configuration](/docs/documentation/admin/workflows/admin_workflow_configure)
    1. [Workflows Settings Panel](/docs/documentation/admin/workflows/admin_workflow_configure#workflows-settings-panel)
    2. [Create a Workflow](/docs/documentation/admin/workflows/admin_workflow_configure#create-a-single-workflow)
    3. [Edit a Workflow](/docs/documentation/admin/workflows/admin_workflow_configure#edit-a-single-workflow)
3. [Required Surveys](/docs/documentation/admin/workflows/admin_workflow_required_survey)
    1. [Setting up a required survey for a new task](/docs/documentation/admin/workflows/admin_workflow_required_survey#setting-up-a-required-survey-for-a-new-task_)
    2. [Required survey for modifying task states](/docs/documentation/admin/workflows/admin_workflow_required_survey#required-survey-for-modifying-task-states)

</div>
<br/>



## Introduction {#introduction}

<img alt="overview image" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_workflows_00.png')} />
<br/>
<br/>

[_Workflows_](/docs/documentation/admin/workflows/admin_workflow_configure) are used to create _tasks_ and their corresponding processes. For example, suppose an administrative request must be approved by a CEO, a manager, and an administrator. In that case, whenever an administrative request needs approval, a _workflow_ could be set up to create a _task_ that would ask each one of them, one after another, for approval. If, along the line, one of them doesn't approve, the request gets rejected and doesn't continue down the chain.

A _Workflows_ is made up of one or more _State Machines_. In a state machine, all states through which the _task_ could pass are specified, as well as each [_routine_](/docs/documentation/automation/admin_routine). Following the example given above, a _routine_ can be programmed to send an email notifying the CEO once the administrator and manager have approved the request.

Workflows are hosted inside a [_workflow group_](/docs/documentation/admin/workflows/admin_workflow_groups). _Workflow groups_ can host multiple workflows and permit interaction among them.


<br/>
<br/>

_[Go back to Table of Contents](#table-of-contents)_