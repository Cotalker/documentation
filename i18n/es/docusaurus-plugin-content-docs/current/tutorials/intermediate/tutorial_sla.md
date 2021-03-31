---
id: sla
title: Setup SLAs
author: Valentina Martínez
---
import useBaseUrl from '@docusaurus/useBaseUrl'; 

## Company Request {#company-request}
Ruanda Company have a little bit angiuts 

## Functional Requirements {#functional-requirements}
**Access Role**
* User with the permission `admin-*-write`, which allows all to access to the admin.
* User with the permissions `web-admin-write` and `web-admin-read` to set up in the admin.
* User with the access role `read admin`.

**Workflows**
* Having completed the [State Machine Tutorial](/docs/tutorials/basic/create_state_machines).

## Steps {#steps}
1. Access the `administrator` and open `Workflows`
2. Press the *Task Manager* group and then the *Task Manager Flow* state machine.
3. Go to the bottom and in the *SLA section*, press `+` button to create a new sla.
4. Set up the general information:
    * `Name`: Reminder
    * Set up the start section:
        * `State Type`: *in-progress*
        * `States`: *Doing*
    * Set up the end section:
        * `State Type`: *in-progress*
        * `States`: *Ready*
    * `Time Type`: *Dynamic*
    * `Time`: *DATE|endDate*
    * Active the `Reset` button
    * Active the `Repeat` button
5. Set up the *Routine builder*
    1. Press `+ Add Stage`
        * `code`: *email*
        * `type`: *Send Email* 
        * `Subject`: *Task Reminder*
        * `Data`: *{"recipientName":"($CODE#users#_id#($OUTPUT#task_request#data|assignee))|name|names","recipientEmail":"","companyName":"Ruanda","title":["Pending Task"],"action":"","code":"","messageA":"$JOIN# #(You have pending the task number)#($OUTPUT#task_request#data|serial)#($OUTPUT#task_request#data|name)","messageB":"Please check it or change the related date."}*
        :::note The Cotlang meaning:
        *$OUTPUT#task_request#data|assignee* : Get the task asignee id.<br/>
        *($CODE#users#_id#($OUTPUT#task_request#data|assignee))|name|names* : Get the name of the asignee<br/>
        *$OUTPUT#task_request#data|serial* : unique number of the task<br/>
        *$OUTPUT#task_request#data|name* : get the name of the task
        :::
        * In the *to* label, press `+ Add Item`:
            * `Item`: *($CODE#users#_id#($OUTPUT#task_request#data|assignee))|email*
        * Active the `individual send` button
    2. Press `+ Add Stage`
        * `code`: *task_request*
        * `type`: *Network Request* 
        :::note is necesary to have the information of the task, but we have in context the id of the *Task Group* and of the *Task*.
        :::
        * `URL`: *$JOIN#/#($ENV#BASEURL)#api#tasks#($VALUE#taskGroupId)#task#($VALUE#taskId)*
        * `Method`: *GET*
        * Active the button `Default authentication`
        :::note It needs to be active to use the cotalker api.
        :::
        * `Success`: *email*
    3. `Max. Iterations`: *10*
    4. `Initial Stage`: *task_request*
    * The routine have to look like this: <img alt="" src={useBaseUrl('img/tutorial_sla_routine.png')} width= "20%" height= "20%" />
5. Save the SLA.
6. Save the State Machine.


## Result {#result}
The SLA will be saved in the sla section of the state machine configuration:
<img alt="" src={useBaseUrl('img/tutorial_sla.png')} />
<br/><br/>
The email of the sla will look like this : 
<img alt="" src={useBaseUrl('img/tutorial_sla_email.png')} />
