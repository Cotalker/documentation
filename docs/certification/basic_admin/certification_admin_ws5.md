---
title: Workshop 5 - Workflows
author: Valentina Martinez
---
import useBaseUrl from '@docusaurus/useBaseUrl';

# Intro {#intro}

### Goals {#goals}

Understanding of the basics elements of the Admin:
*  Workflow
*  Routines

### Prerequirements {#prerequirements}

* Have completed [Workshop 4](certification_admin_ws4)


# Workshop {#workshop}

### Introduction {#introduction}
**WORKFLOW** <br/>
Workflow is used to perform a process in cotalker. For example: the administrative request must be accepted by the CEO, boss and administrator. Therefore, there is a workflow that takes the request from one channel to another. It first asks the boss, then the CEO, and finally the manager for acceptance, if one of them doesn't approve, the request doesn't switch to the next channel and remains in a rejected state.<br/>
The Workflow is made up of one or more State Machine. In the state machine, all states through which the task must pass are specified, as well as each routine. For example: once the request changes to the CEO channel, the system sends an email to notify him.<br/>
For more details, go to the [admin's Workflow section](/docs/documentation/admin/workflows/admin_workflow_overview). <br/>

**ROUTINE** <br/>
Routine is not a module of the admin, but it is used in Statemachine, Bot, Scheduler and SLA. So, this section will explain the routine. <br/>
The routine is used to configure various action in a company in Cotalker. For example, you can automate the sending of an email or a message. But it also is used to run a workflow, bot or scheduler, for example, changing from one state to another or creating / updating tasks.
<br/>
A routine looks like the following image:
<br /><br/>
<img alt="" src={useBaseUrl('img/admin_routine.png')} />
<br /><br />
On the right side is the visualization of the routine that has been created. A routine is build by a set of stage and its functionality is chosen based on the type. You will find types of stages that can:

* help with configuration
* make decisions based on context
* network request
* interact with the user
* edit workflow components
* update workflow components

<br/>

For more details, go to the [admin's routine section](/docs/documentation/automation/admin_routine).

**COTLANG**
To build the routine, is often and useful to use Cotlang. It is a language created by Cotalker to extract data from different contexts in a routine. 
For example, to build the routine, that every time a user requests a vacation through Cotalker's administrative management solution, an email is sent to the boss. Then each email will contain a different reason and will be sent by a different transmitter, which depends on the subject. **So this is when cotlang is used.** It helps to generalize the actions (send an email) to personalize the content. Then a single routine is used for each time a user wants to request vacations and not a different routine for each person with their own data. <br/>
This is scalable! <br/>
Among other examples! It can be useful to get information from the database, display the date in a specific format, etc. <br/>
For more details, go to the [admin's cotlang section](/docs/documentation/automation/admin_cotlang).

### What to build {#what-to-build}
In this workshop we will simulate that we are working with a client of a financial company.. <br/>
Redirect to the [Documentation Tutorial](/docs/tutorials/tutorial_overview) and do the follows basic tutorial:
* [Workflow Tutorial](/docs/tutorials/basic/create_state_machines)
* [Routine Tutorial](/docs/tutorials/basic/create_bot)

### Evaluation {#evaluation}
There will be a final evaluation.
