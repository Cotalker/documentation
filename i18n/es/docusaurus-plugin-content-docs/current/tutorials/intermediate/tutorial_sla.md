---
id: sla
title: SLA Setup
author: Valentina Martínez
---

:::caution Advertencia
Esta página aún no se encuentra traducida al español.
:::
import useBaseUrl from '@docusaurus/useBaseUrl'; 

Tutorial on how to set up a reminder to finish a task.

Time: 15 minutes


## Company Requirements {#company-requirements}
Ruanda really liked what you did with the Task Manager. But they are worried that, with so many tasks, some team members might forget to finish them or might extend reply time too long. To solve this problem, you are to set up the _service-level agreement_ (SLA) option in the workflow. As we had seen before, the best way to contact Ruanda's workers was through email. So we will create an email reminder when the SLA is overdue.

## Pre-Requisites {#pre-requisites}
#### Access Role
- _User_ with the `admin-*-write` permission, which allows full access to the _admin_.
- _User_ with the `read admin` access role.

#### Workflows
- Having completed the [Create a Workflow Tutorial](/docs/tutorials/basic/create_state_machines).

## Steps {#steps}

<div className="alert alert--secondary">

1. Access the <span className="badge badge--primary">Administrator</span> and open <span className="badge badge--primary">Workflows</span>.

</div>
<br/>

<div className="alert alert--secondary">

2. Press the **Task Manager** workflow-group and then the **Task Manager Flow** workflow.

</div>
<br/>

<div className="alert alert--secondary">

3. Scroll down the settings panel and in the <span className="badge badge--primary">SLAs</span> section, press the <span className="badge badge--primary">+</span> icon to create a new SLA. 

<img alt="create sla" className="img_sizing item shadow--tl" src={useBaseUrl('img/tutorial_intermediate_sla_01.png')} />
<br/>

_A new settings panel will open up._

<img alt="create sla" className="img_sizing item shadow--tl" src={useBaseUrl('img/tutorial_intermediate_sla_01a.png')} />
<br/>


</div>
<br/>

<div className="alert alert--secondary">

4. Set up  <span className="badge badge--primary">General information</span>:
    - **Name**: `Reminder`
    - **Code**: `reminder_00`
    ----
    _Start section_
    - **State Type**: `in-progress`
    - **States**: `Doing`
    ----
    _End section_
    - **State Type**: `in-progress`
    - **States**: `Ready`
    ----
    _Time section_
    - **Time Type**: `Dynamic`
    - **Time**: `DATE|endDate`
    ----
    - Activate the **Reset** button.
    - Deactivate the **Repeat** button.

</div>
<br/>

<div className="alert alert--secondary">

5. Set up the <span className="badge badge--primary">Routine builder</span>:
    
    1. Press the <span className="badge badge--primary">+ Add Stage</span> button. New fields appear. Set the following:
        - **code**: `email`
        - **type**: `Send email` 
        ----
        - **Subject**: `Task Reminder`
        ----
        - **Data**: `{"recipientName":"($CODE#users#_id#($OUTPUT#task_request#data|assignee))|name|names","recipientEmail":"","companyName":"Ruanda","title":["Pending Task"],"action":"","code":"","messageA":"$JOIN# #(Task number)#($OUTPUT#task_request#data|serial)#($OUTPUT#task_request#data|name)#is still pending.","messageB":"Please complete the task or modify its end-date."}`
        ----
        - In the **To** section, press <span className="badge badge--primary">+ Add Item</span>and set the following:
            - **Item**: `($CODE#users#_id#($OUTPUT#task_request#data|assignee))|email`
        ----
        * Activate the **Individual send** button.
        ----

    :::note Cotlang script descriptions 
    - `$OUTPUT#task_request#data|assignee`: _Get the task assignee Id_
    - `($CODE#users#_id#($OUTPUT#task_request#data|assignee))|name|names`: _Get the name of the assignee_
    - `$OUTPUT#task_request#data|serial`: _unique number of the task_
    - `$OUTPUT#task_request#data|name`: _get the name of the task_
    :::

    ----
    
    2. Scroll back up and press <span className="badge badge--primary">+ Add Stage</span> again. Set the following:
        - **code**: `task_request`
        - **type**: `Network Request` 

        ----

        - **URL**: `$JOIN#/#($ENV#BASEURL)#api#tasks#($VALUE#taskGroupId)#task#($VALUE#taskId)`

        :::note
        _The Cotlang script gets the task's URL._
        :::

        ----

        - **Method**: `GET`
        
        ----

        - Activate the **Default authentication** button.
        
        :::note
        _This option needs to be active in order for it to work with the Cotalker API._
        :::
        
        ----

        - **Success**: `email`
    
    ----

    3. `Max. Iterations`: *10*
    
    ----

    4. `Initial Stage`: *task_request*
    
    ----

    _The routine should look like this:_

    <img alt="sla routine" src={useBaseUrl('img/tutorial_intermediate_sla_02.png')} />

</div>
<br/>

<div className="alert alert--secondary">

6. Save the _SLA_.

</div>
<br/>

<div className="alert alert--secondary">

7. Save the _workflow_.

</div>
<br/>

<div className="hero shadow--lw">
<div className="container">
<h1 className="hero__title">Ta-da! All done!</h1>
<p className="hero__subtitle">

Now go and create or edit a task. Set the end-date to today's date, and set its state to _Doing_. In a matter of minutes, you should be receiving an email reminding you to finish the task.

</p>

<br/>
</div>
</div>


## Result {#result}
The SLA will be saved in the **SLAs** section of the _workflow_ configuration:
<img alt="sla in workflow config" className="img_sizing item shadow--tl" src={useBaseUrl('img/tutorial_sla.png')} />
<br/>
<br/>

The task reminder email will look something like this : 

<img alt="email" className="img_sizing item shadow--tl" src={useBaseUrl('img/tutorial_sla_email.png')} />

