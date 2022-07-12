---
id: tutorial_approval_flow
title: Setup an Approval Flow
author: Valentina Martinez
---

:::caution Advertencia
Esta página aún no se encuentra traducida al español.
:::
import useBaseUrl from '@docusaurus/useBaseUrl'; 

Time to complete: 120 minutes.

## Company Requests {#company-requests}
Ruanda wants to implement another project: the Approval flow for a product requested by a client. The actual problem is that they need a easy way to handle the requests, because for the moment all is by paper and it could be much easier and quick. This solution will agilize the approval papers of the company, reducing time.<br/><br/>
The company explains the following flow:
1. An executive raises a product request from a client. They upload the information to their database and, in return, give a score to the customer.
2. The request goes up to the chief executive. If it is below a certain amount, you can approve it directly, otherwise it must be evaluated by the risk department.
3. Risk can approve, reject and conditionally reject the request. They also decide if the client applies the condition of appeal to the commercial area, which analyzes the case with other factors in addition to the score.
4. Then the client reviews the request and can accept, reject or appeal to the commercial area.
5. The commercial area can approve, approve with condition or reject.
6. Finally, the client can check the purpose of the commercial area, being able to accept or reject it.
 
## Funtional Requirements {#funtional-requirements}

**Access Role**
* User with the permission `admin-*-write`, which allows all above. 
* User with the permissions `web-admin-write` and `web-admin-read` to set up in the admin.
* User with the access role `read admin`.
* Create the following access role:

    | Name | permission |
    |------|------------|
    | executive | executive |
    | commercial | commercial |
    | headexecutive | headexecutive |

**User**
* Create the following employees:

    | Name | Lastname | email | Job Title | Access Role |
    |------|-------|-----|----|---|
    | Miley | Cyrus | miley@ruanda.com | executive | executive |
    | Mon | Laferte | mon@ruanda.com | head of risk control | |
    | Sam | Smith | sam@ruanda.com | risk analyst | |
    | Jorge | Drexler | jorge@ruanda.com | commercial | commercial |
    | Diego | Lorenzini | diego@ruanda.com | head executive | headexecutive |

**Database**
* Create the state asset: a collection named *Approval States* with the following elements:

| Name | Code |
|------|------|
| 0. Lifting of Request | liftingrequeststate |
| 1. Pending by executive Head | headstate |
| 2. Pending by Risk Committee | riskcomitteestate |
| 3.a First proposal | firstproposalastate |
| 3.b First proposal | firstproposalbstate |
| 4. Accepted Requests | acceptedrequestsstate |
| 5. Rejected Requests | rejectedrequestsstate |
| 6. Pending Commercial Area | commercialstate |
| 7. Second proposal | secondproposalbstate |

* Create the asset of the task: a collection named *Approval Asset* with the element named *Request*

* Create the collection of the banking producto named *Banking Products* with the following generic elements:

| Name | Code |
|------|------|
| Product 1 | product_1 |
| Product 2 | product_2 |
| Product 3 | product_3 |


**GROUP**
* Create a group in the *Workflow* section with the following instruction:
    1. `Name`: *Approval Manager*
    2. `Code`: *approvalmanager_1*
    3. Set up the icon section as you like.
    4. Active `Allow channel creation`
    :::note Save the group id. With the *group_id* tag we will refer to it.
    :::

**SURVEY**
* Create the following Survey for each of the state. They must to be assocated to the created group *Approval Manager*:
    1. Survey named *(AF) Banking Product Request*, for the state 0:

    | Name | Component | Specification | Identifier |
    |------|-----------|---------------|------------|
    | Date of the Request | Date and Time | Type: Date and Max/min: Disable | dateapproval |
    | Client Name | Written Answer | Type: Short Text | nameclientapproval |
    | Product | Multiple choice | Collection type: *Banking Products* | productapproval |
    | Amount | Multiple choice | List of item type: (1) More than $$ or (2) Less than or equal to $$. | The id of the component is *amountapproval*, for the first option is *more* and for the other *less* |
    | Client Score | Written Answer | Type: number | scoreapproval |
    | Attach | Attachment | Allow all file type | attachapproval |
    
    2. Survey named *(AF) Executive Head Validation*, for state 1

    | Name | Component | Specification | Identifier |
    |------|-----------|---------------|------------|
    | Do you agree with the request? | Type: Multiple Choice | List of item type: (1) Agree (2) Disagree. | The id of the component is *headapproval*, for the first option is *agree* and for the other *disagree* |
    | Comments | Written Answer | Type: Long text | commentheadapproval |
    | Attach | Attachment | Allow all file type | attachheadapproval |

    3. Survey named *(AF) Risk Committee Validation* for state 2:

    | Name | Component | Specification | Identifier |
    |------|-----------|---------------|------------|
    | Do you agree with the request? | Type: Multiple Choice | List of item type: (1) Agree, (2) Agree with Condition and (3) Disagree. | The id of the component is *riskapproval*, for the first option is *agree*, for the second *condition* and for the other *disagree* |
    | Does the client meet the conditions? | List of item type: (1) Yes and (2) No | The id of the component is *conditionriskapproval*, for the first option is *yes* and for the second *no*
    | Comments | Written Answer | Type: Long text | commentriskapproval |
    | Attach the email | Attachment | Allow all file type | attachriskapproval |

    4. Survey named *(AF) First Proposal a*, for state 3.a:

    | Name | Component | Specification | Identifier |
    |------|-----------|---------------|------------|
    | Does the client agree with the proposal? | Type: Multiple Choice | List of item type: (1) Agree (2) Disagree. | The id of the component is *firstproposalaapproval*, for the first option is *agree* and for the other *disagree* |
    | Comments | Written Answer | Type: Long text | commentfirstproposalaapproval |
    | Attach the email | Attachment | Allow all file type | attachfirstproposalaapproval |

    5. Survey named *(AF) First Proposal b*, for state 3.b:

    | Name | Component | Specification | Identifier |
    |------|-----------|---------------|------------|
    | Does the client agree with the proposal? | Type: Multiple Choice | List of item type: (1) Agree, (2) Disagree and (3)Commercial Area Appeal. | The id of the component is *firstproposalbapproval*, for the first option is *agree*, for the second *disagree* and for the third *appeal* |
    | Comments | Written Answer | Type: Long text | commentfirstproposalbapproval |
    | Attach the email | Attachment | Allow all file type | attachfirstproposalbapproval |

    6. Survey named *(AF) Commercial Area Validation*, for state 6:

    | Name | Component | Specification | Identifier |
    |------|-----------|---------------|------------|
    | Do you agree with the request? | Type: Multiple Choice | List of item type: (1) Agree, (2) Disagree and (3) Agree with Condition. | The id of the component is *commercialapproval*, for the first option is *agree*, for the second *disagree* and for the third *condition* |
    | Comments | Written Answer | Type: Long text | commentcommercialapproval |
    | Attach | Attachment | Allow all file type | attachcommercialapproval |

    7. Survey named *(AF) Second Proposal*, for state 7:

    | Name | Component | Specification | Identifier |
    |------|-----------|---------------|------------|
    | Does the client agree with the second proposal? | Type: Multiple Choice | List of item type: (1) Agree and (2) Disagree | The id of the component is *secondproposalapproval*, for the first option is *agree* and for the second *disagree* |
    | Comments | Written Answer | Type: Long text | commentsecondproposalapproval |
    | Attach the email | Attachment | Allow all file type | attachsecondproposalapproval |

## Steps {#steps}
### Workflow {#workflow}
1. Access the `administrator` and open `Workflow`.
2. Press the group *Approval Manager*.
3. Press `+` button to create a new State Machine.
4. Fill the following field:
    * `Name`: *Approval Manager Flow*
    * `Code`: *approvalmanagerflow_1*
    * `Collection`: _Approval Asset_
    * `Element`: _Request_
    * `Additional Fields`(1): _Banking Products_
    * `States List`: _Approval States_   
5. Save

6. Re-enter the newly created *Approval Manager Flow* state machine for editing.
7. Configure *States* section:
    * __Firstable, you will create each of the states that the task could be.__
    1. Create the following state: 

        | Type | Element |
        |------|---------|
        | NEW | 1. Pending by Executive Head |
        | IN-PROGRESS | 2. Pending by Risk Committee |
        | IN-PROGRESS | 3.a First proposal |
        | IN-PROGRESS | 3.b First proposal |
        | IN-PROGRESS | 6. Pending Commercial Area |
        | IN-PROGRESS | 7. Second proposal |
        | CLOSED | 4. Accepted Requests |
        | CLOSED | 5. Rejected Requests |

    2. `Initial State`: *1. Pending by Executive Head* <br/><br/>

    * __Secondly, you will relate each of the states and surveys.__
    3. Configure the following state:
        1. Set up *1. Pending by Executive Head*

            | State Change | Can Change |
            |------|---------|
            | 2. Pending by Risk Committee | * |
            | 3.a First proposal | * |
            | 5. Rejected Requests | * |

            And add the survey trigger: *(AF) Executive Head Validation*

        2. Set up *2. Pending by Risk Committee*

            | State Change | Can Change |
            |------|---------|
            | 3.a First proposal | * |
            | 3.b First proposal | * |

            And add the survey trigger: *(AF) Risk Committee Validation*

        3. Set up *3.a First proposal*

            | State Change | Can Change |
            |------|---------|
            | 4. Accepted Requests | * |
            | 5. Rejected Requests | * |

            And add the survey trigger: *(AF) First Proposal a*
        
        4. Set up *3.b First proposal*

            | State Change | Can Change |
            |------|---------|
            | 4. Accepted Requests | * |
            | 5. Rejected Requests | * |

            And add the survey trigger: *(AF) First Proposal b*

        5. Set up *6. Pending Commercial Area*

            | State Change | Can Change |
            |------|---------|
            | 7. Second Proposal | * |
            | 5. Rejected Requests | * |

            And add the survey trigger: *(AF) Commercial Area Validation*

        6. Set up *7. Second Proposal*

            | State Change | Can Change |
            |------|---------|
            | 4. Accepted Requests | * |
            | 5. Rejected Requests | * |

            And add the survey trigger: *(AF) Second Proposal*

8. Save
9. Edit the Configuration of the workflow:
    * `Flow Type`: State-machine
    * `Initial Workflow`: Approval Manager
    * `Hide closed task after`: 100
    * `Default view`: Kanban View

__Now we will configure the approval manager routine.__ <br/>

### Bot {#bot}
__Firstable, we will start with the routine that initializes the workflow.__

9. Access the `administrator` and open `Bot`
10. Press `+` button to create a new Bot.
11. Set up general information, access and function section: 
    * `Name`: *Approval Manager Launcher*
    * `Code`: *approvalmanagerlauncherbot*
    * `User bot name`: *approvalmanagerlauncheruser*
    * `Access Roles`: *default*
    * Active `It's a survey command`
    * `Form`: *(AF) Banking Product Request*

12. Set up the routine builder:

| Code | Type | Setting |
|--|------|---------|
| get_users | Network Request | `URL`: *$JOIN#/#($ENV#BASEURL)#api#v2#users#relations#boss#($VALUE#user)* <br/> `Method`: *GET* <br/> `header`: *{"admin":true}* <br/> `Default authentication`: Active |
| get_property | Network Request | `URL`: $JOIN#/#($ENV#BASEURL)#(api)#(properties)#($VALUE#data&#124;[find=>identifier=productapproval]&#124;process&#124;0)<br/> `Method`: *GET* <br/> `Default authentication`: Active | 
| create_task | create task | `Item` of the `Name`: *$JOIN# - #(Solicitud )#($OUTPUT#get_property#data&#124;name&#124;display)#($VALUE#data&#124;[find=>identifier=dateapproval]&#124;process&#124;0&#124;[date=>format=DD-MM-YYYY])* <br/> `Group` : *group_id* <br/> `User`: *$VALUE#user* <br/> `Dynamic Field 1` : $VALUE#data&#124;[find=>identifier=productapproval]&#124;process&#124;0 |
| copy_survey | copy message | `Messages`: $VALUE#messages <br/> `channel` : $OUTPUT#create_task#task&#124;channel |
| invite_boss | Edit task users | `Criteria`: *boss* <br/> `Users`: Active *advanced mode* and fill with *$VALUE#user* <br/> `Property`: *null* <br/> `Group`: *group_id* <br/> `Operation`: *eq* |
| update_task | Update Task | `Task`: *$OUTPUT#create_task#task&#124;_id* <br/> `Group`: *group_id* <br/> `Active` the task <br/> `Name`: *$JOIN# - #($OUTPUT#create_task#task&#124;serial)#(Solicitud )#($OUTPUT#get_property#data&#124;name&#124;display)#($VALUE#data&#124;[find=>identifier=dateapproval]&#124;process&#124;0&#124;[date=>format=DD-MM-YYYY])* |
| send_ack | send message | `Content`: *Tu solicitud se ha ingresado correctamente, ahora debes esperar la revisión por jefatura de la sucursal.* <br/> `Type of Content`:*text/system* <br/> `Users`: *$VALUE#user* <br/> `Channel`: Active *Advanced mode* and fill *$VALUE#channel* |
| message_add_boss | send message | `Content`: *$JOIN# #(Se ha añadido)#($OUTPUT#get_user#data&#124;data&#124;users&#124;0&#124;name&#124;names)#($OUTPUT#get_user#data&#124;data&#124;users&#124;0&#124;name&#124;lastName)* <br/> `Type of Content`:*text/system* <br/> `Users`: *$VALUE#user* <br/> `Channel`: Add an item and fill it with *$OUTPUT#create_task#task&#124;channel* |
| send_nack | send message | `Content`: *No se ha podido crear tu solicitud.* <br/> `Type of Content`:*text/system* <br/> `Users`: *$VALUE#user* <br/> `Channel`: Active *Advanced mode* and fill *$VALUE#channel* |

<br/>
And now it only remains to relate each of the stages. The idea is to follow the following image:
<img alt="" src={useBaseUrl('img/tutorial_approval_bot.png')} width= "25%" height= "25%" /><br/>
<img alt="" src={useBaseUrl('img/tutorial_approval_bot1.png')} width= "25%" height= "25%" />

### Channel {#channel}
Now we have to relate the bot to the channel, to use it. 

13. Create a new channel:
    * `Name`: Product Request Lift
    * `Code`: productrequestlift
    * `Users`: Miley Cyrus
    * `Bots` : Approval Manager Launcher
    * Add an Element:
        * `Collection`: Approval States
        * `Element`: liftingrequeststate
14. Save

### Workflow Routine {#workflow-routine}
If you stop the tutorial at this point, you can manage approval from the task view, but the idea is to use the surveys. So it's time to set up the routines of the states triggered by a form. <br/>

13.  Access the `administrator` and open `Workflow`
14. Press the group *Approval Manager*.
15. Press the group *Approval Manager Flow*.
16. Set up each one of the state:
    :::note Remind
    Remember to save the routine, the state, and the state machine, once you finish configuring. <br/>
    The stage marked with an *, means that it is the initial stage
    :::
    1. Press the state *1. Pending by Executive Head* and build the following routine in the survey trigger:

    | Code | Type | Setting |
    |--|------|---------|
    | validation_boss* | Switch | `Left side`: *$VALUE#sentAnswer&#124;data&#124;[find=>identifier=headapproval]&#124;process&#124;0* <br/> `Right side A`: *agree* <br/> `Right side B`: *disagree* <br/> `Right side C`: *null* <br/> `Right side D`: *null* <br/> `Right side E`: *null* <br/> `Operator`: *eq* <br/> `Case A`: nwr_answers <br/> `Case B`: case_rejected |
    | case_approved | update task state | `task`: $VALUE#_id <br/> `State`: *&#60;id of 2.Pending by Risk Committee&#62;* <br/> `Group`: *group_id* <br/> `Output by default`: *send_email* |
    | case_rejected | update task state | `task`: $VALUE#_id <br/> `State`: *&#60;id of 5. Rejected Requests&#62;* <br/> `Group`: *group_id* <br/> `Output by default`: *message_rejected* |
    | message_approved | send message | `Content`: *Su solicitud fue aceptada por Jefatura. Dado que supera el monto $$, se le envió mail al Comité de Riesgo y ahora debes esperar su aprobación.* <br/> `Type of Content`:*text/system* <br/> `Users`: *$VALUE#user* <br/> `Channel`: Add an item and fill it with *$VALUE#channel* |
    | message_rejected | send message | `Content`: *Su solicitud fue rechazada por Jefatura.* <br/> `Type of Content`:*text/system* <br/> `Users`: *$VALUE#user* <br/> `Channel`: Add an item and fill it with *$VALUE#channel* |
    | nwr_answers | network request | `URL`: *$JOIN#/#($ENV#BASEURL)#api#v1#answers#uuid#($VALUE#answers&#124;0)* <br/> `Method`: *GET* <br/> `header`: *{}* <br/> `Default authentication`: Active <br/> `Output by success`: *condition_amount* |
    | send_email | send email | `Subject`: *Se ha solicitado un nuevo producto bancario* <br/> `Data`: *{"recipientName":"Comité de Riesgo","recipientEmail":"Comité de Riesgo","companyName":"tratton","title":["Se ha solicitado un nuevo producto bancario"],"action":"","code":"","messageA":"$JOIN##(Se le solicita que se revise el caso de )#($OUTPUT#nwr_answers#data&#124;data&#124;[find=>identifier=nameclientapproval]&#124;process&#124;0)#(, que solicitó )#($OUTPUT#nwr_property_producto#data&#124;name&#124;display)#( a un monto de )#($OUTPUT#nwr_answers#data&#124;data&#124;[find=>identifier=amountapproval]&#124;[cotanswer_list=>array]&#124;[toString=>_])#( y bajo sus condiciones obtuvo el siguiente puntaje )#($OUTPUT#nwr_answers#data&#124;data&#124;[find=>identifier=scoreapproval]&#124;process&#124;0)","messageB":"$JOIN##(La solicitud fue levantada en la fecha: )#($OUTPUT#nwr_answers#data&#124;data&#124;[find=>identifier=dateapproval]&#124;process&#124;0&#124;[date=>format=DD-MM-YYYY])#(. Muchas gracias de antemano.)"}* <br/> `Attachment`: *$OUTPUT#nwr_answers#data&#124;data&#124;[find=>identifier=attachapproval]&#124;process&#124;0* <br/> `To`: add two items and fill them with *mon@ruanda.com* and *sam@ruanda.com* <br/> `Output by default`: *message_approved* |
    | condition_amount | Conditional | `Left Side`: $OUTPUT#nwr_answers#data&#124;data&#124;[find=>identifier=amountapproval]&#124;process&#124;0 &#124; <br/> `Right Side`: *more* <br/> `Operator`: *eq* <br/> `Output condition true`: *case_fast_approved* <br/> `Output condition false`: *nwr_property_product* |
    | case_fast_approved | Update Task State | `Task`: *$VALUE#_id* <br/> `State`: *&#60;id of 3.a First proposal&#62;* <br/> `Group`: *group_id* <br/> `Output by default`: *message_fast_approved* |
    | message_fast_approved | send message | `Content`: *Su solicitud fue aprobada por Jefatura. Dado que era de un monto menor a $$, ahora solo debe presentar la primera propuesta al cliente.* <br/> `Type of Content`:*text/system* <br/> `Users`: *$VALUE#user* <br/> `Channel`: Add an item and fill it with *$VALUE#channel* |
    | nwr_property_product | Network Request | `URL`: *$JOIN#/#($ENV#BASEURL)#api#v1#properties#($OUTPUT#nwr_answers#data&#124;data&#124;[find=>identifier=prdct]&#124;process&#124;0)* <br/> `Method`: *GET* <br/> `header`: *{}* <br/> `Default authentication`: Active <br/> `Output by success`: *case_approved* |

    2. Press the state *2. Pending by Risk Committee* and build the following routine in the survey trigger:

    | Code | Type | Setting |
    |--|------|---------|
    | validation_risk* | switch | `Left side`: *$VALUE#sentAnswer&#124;data&#124;[find=>identifier=riskapproval]&#124;process* <br/> `Right side A`: *agree* <br/> `Right side B`: *disagree* <br/> `Right side C`: *condition* <br/> `Right side D`: *null* <br/> `Right side E`: *null* <br/> `Operator`: *eq* <br/> `Case A`: massage_approved <br/> `Case B`: message_rejected <br/> `Case C`: message_condition |
    | message_approved | send message | `Content`: *Su solicitud fue aceptada por riesgo, se puede presentar la primera propuesta al cliente.* <br/> `Type of Content`:*text/system* <br/> `Users`: *$VALUE#user* <br/> `Channel`: Add an item and fill it with *$VALUE#channel* |
    | message_condition | send message | `Content`: *Su solicitud fue aceptada con condiciones por riesgo, se puede presentar la primera propuesta al cliente.* <br/> `Type of Content`:*text/system* <br/> `Users`: *$VALUE#user* <br/> `Channel`: Add an item and fill it with *$VALUE#channel* |
     | message_approved | send message | `Content`: *Su solicitud fue aceptada por riesgo, se puede presentar la primera propuesta al cliente.* <br/> `Type of Content`:*text/system* <br/> `Users`: *$VALUE#user* <br/> `Channel`: Add an item and fill it with *$VALUE#channel* |
    | message_rejected | send message | `Content`: *Su solicitud fue rechazada por riesgo, debe conversar con el cliente para los siguientes pasos.* <br/> `Type of Content`:*text/system* <br/> `Users`: *$VALUE#user* <br/> `Channel`: Add an item and fill it with *$VALUE#channel* |
    | case_appeled | Update Task State | `Task`: *$VALUE#_id* <br/> `State`: *&#60;id of 3.b First proposal&#62;* <br/> `Group`: *group_id* <br/> `Output by default`: *validation_risk* |
    | validation_appealed | Conditional | `Left Side`: $VALUE#sentAnswer&#124;data&#124;[find=>identifier=conditionriskapproval]&#124;process <br/> `Right Side`: *yes* <br/> `Operator`: *eq* <br/> `Output condition true`: *case_appeled* <br/> `Output condition false`: *case_not_appeled* |
    | case_not_appeled | Update Task State | `Task`: *$VALUE#_id* <br/> `State`: *&#60;id of 3.a First proposal&#62;* <br/> `Group`: *group_id* <br/> `Output by default`: *validation_risk* |

    3. Press the state *3.a First Proporsal* and build the following routine in the survey trigger:

    | Code | Type | Setting |
    |--|------|---------|
    | validation_proporsal* | Conditional | `Left Side`: $VALUE#sentAnswer&#124;data&#124;[find=>identifier=firstproposalaapproval]&#124;process <br/> `Right Side`: *agree* <br/> `Operator`: *eq* <br/> `Output condition true`: *case_approved* <br/> `Output condition false`: *case_rejected* |
    | case_approved | Update Task State | `Task`: *$VALUE#_id* <br/> `State`: *&#60;id of 4. Accepted Requests&#62;* <br/> `Group`: *group_id* <br/> `Output by default`: *message_approved* |
    | case_rejected | Update Task State | `Task`: *$VALUE#_id* <br/> `State`: *&#60;id of 5. Rejected Requests&#62;* <br/> `Group`: *group_id* <br/> `Output by default`: *message_rejected* |
    | message_rejected | send message | `Content`: *La primera propuesta fue rechazada por el cliente* <br/> `Type of Content`:*text/system* <br/> `Users`: *$VALUE#user* <br/> `Channel`: Add an item and fill it with *$VALUE#channel* |
    | message_approved | send message | `Content`: *La primera propuesta fue aceptada por el cliente.* <br/> `Type of Content`:*text/system* <br/> `Users`: *$VALUE#user* <br/> `Channel`: Add an item and fill it with *$VALUE#channel* |

    4. Press the state *3.b First Proporsal* and build the following routine in the survey trigger:

    | Code | Type | Setting |
    |--|------|---------|
    | validation_proposal* | switch | `Left side`: *$VALUE#sentAnswer&#124;data&#124;[find=>identifier=firstproposalbapproval]&#124;process*
    <br/> `Right side A`: *agree* <br/> `Right side B`: *disagree* <br/> `Right side C`: *appeal* <br/> `Right side D`: *null* <br/> `Right side E`: *null* <br/> `Operator`: *eq* <br/> `Case A`: case_approved <br/> `Case B`: case_rejected <br/> `Case C`: case_appealed |
    | case_approved | Update Task State | `Task`: *$VALUE#_id* <br/> `State`: *&#60;id of 4. Accepted Requests&#62;* <br/> `Group`: *group_id* <br/> `Output by default`: *message_approved* |
    | case_rejected | Update Task State | `Task`: *$VALUE#_id* <br/> `State`: *&#60;id of 5. Rejected Requests&#62;* <br/> `Group`: *group_id* <br/> `Output by default`: *message_rejected* |
    | case_appealed | Update Task State | `Task`: *$VALUE#_id* <br/> `State`: *&#60;id of 6. Pending Commercial Area&#62;* <br/> `Group`: *group_id* <br/> `Output by default`: *message_appealed* |
    | message_approved | send message | `Content`: *La primera propuesta fue aceptada por el cliente.* <br/> `Type of Content`:*text/system* <br/> `Users`: *$VALUE#user* <br/> `Channel`: Add an item and fill it with *$VALUE#channel* <br/> `Output`: invite_commercial |
    | invite_commercial | Edit channel users | `Criteria`: null <br/> `Users`: Active *advanced mode* and fill with *null* <br/> `Access Role`: commercial <br/> `Property`: *null* <br/> `Task`: $VALUE#_id <br/> `Group`: *group_id* <br/> `Operation`: *eq* |
    | message_rejected | send message | `Content`: *La primera propuesta fue rechazada por el cliente* <br/> `Type of Content`:*text/system* <br/> `Users`: *$VALUE#user* <br/> `Channel`: Add an item and fill it with *$VALUE#channel* |
    | message_appealed | send message | `Content`: *Su Solicitud está en proceso de revisión por el Área Comercial.* <br/> `Type of Content`:*text/system* <br/> `Users`: *$VALUE#user* <br/> `Channel`: Add an item and fill it with *$VALUE#channel* |
    
    5. Press the state *6. Pending Commercial Area* and build the following routine in the survey trigger:

    | Code | Type | Setting |
    |--|------|---------|
    | validation_commercial* | switch | `Left side`: $VALUE#sentAnswer&#124;data&#124;[find=>identifier=commercialapproval]&#124;process <br/> `Right side A`: *agree* <br/> `Right side B`: *disagree* <br/> `Right side C`: *condition* <br/> `Right side D`: *null* <br/> `Right side E`: *null* <br/> `Operator`: *eq* <br/> `Case A`: message_approved <br/> `Case B`: message_rejected <br/> `Case C`: message_condition |
    | message_approved | send message | `Content`: *Su solicitud fue aprobada por el área comercial, ahora deberás presentarle la segunda propuesta al cliente.* <br/> `Type of Content`:*text/system* <br/> `Users`: *$VALUE#user* <br/> `Channel`: Add an item and fill it with *$VALUE#channel* <br/> `Output`: *case_approved* |
    | message_rejected | send message | `Content`: *Su solicitud fue rechazada por área comercial.* <br/> `Type of Content`:*text/system* <br/> `Users`: *$VALUE#user* <br/> `Channel`: Add an item and fill it with *$VALUE#channel* <br/> `Output`: *case_rejected* |
    | message_condition | send message | `Content`: *Su solicitud fue aprobada con condiciones por área comercial, ahora deberás presentarle la segunda propuesta al cliente.* <br/> `Type of Content`:*text/system* <br/> `Users`: *$VALUE#user* <br/> `Channel`: Add an item and fill it with *$VALUE#channel* <br/> `Output`: *case_approved* |
    | case_approved | Update Task State | `Task`: *$VALUE#_id* <br/> `State`: *&#60;id of 4. Second proposal&#62;* <br/> `Group`: *group_id* |
    | case_rejected | Update Task State | `Task`: *$VALUE#_id* <br/> `State`: *&#60;id of 5. Rejected Requests&#62;* <br/> `Group`: *group_id* |

    6. Press the state *7. Second Proporsal* and build the following routine in the survey trigger:

    | Code | Type | Setting |
    |--|------|---------|
    | validation_proporsal* | switch | `Left side`: *$VALUE#sentAnswer&#124;data&#124;[find=>identifier=secondproposalapproval]&#124;process* <br/> `Right side A`: *agree* <br/> `Right side B`: *disagree* <br/> `Right side C`: *null* <br/> `Right side D`: *null* <br/> `Right side E`: *null* <br/> `Operator`: *eq* <br/> `Case A`: *case_approved* <br/> `Case B`: case_rejected |
    | case_approved | Update Task State | `Task`: *$VALUE#_id* <br/> `State`: *&#60;id of 4. Accepted Requests&#62;* <br/> `Group`: *group_id* <br/> `Output by default`: *message_approved* |
    | case_rejected | Update Task State | `Task`: *$VALUE#_id* <br/> `State`: *&#60;id of 5. Rejected Requests&#62;* <br/> `Group`: *group_id* <br/> `Output by default`: *message_rejected* |
    | message_rejected | send message | `Content`: *La propuesta fue rechazada por el cliente* <br/> `Type of Content`:*text/system* <br/> `Users`: *$VALUE#user* <br/> `Channel`: Add an item and fill it with *$VALUE#channel* |
    | message_approved | send message | `Content`: *La propuesta fue aceptada por el cliente.* <br/> `Type of Content`:*text/system* <br/> `Users`: *$VALUE#user* <br/> `Channel`: Add an item and fill it with *$VALUE#channel* |


### Survey {#survey}
Now we must allow only authorized people to answer the survey and relate the corresponding element of the collection *Approval States* to view the survey in the corresponding channel. 

17. Set the access role of the survey like follows:

    | Survey | Element | Access Role | Note |
    |--------|---------|-------------|------|
    | (AF) Banking Product Request | 0. Lifting of Request |executive | |
    | (AF) Executive Head Validation | 1. Pending by executive Head | headexecutive | |
    | (AF) Risk Committee Validation | 2. Pending by Risk Committee | executive | |
    | (AF) First Proposal a | 3.a First proposal | executive | The executive will report the client's response through the platform. |
    | (AF) First Proposal b | 3.b First proposal | executive | The executive will report the client's response through the platform. |
    | (AF) Commercial Area Validation | 6. Pending Commercial Area | commercial | |
    | (AF) Second Proposal | 7. Second proposal | executive | |

### SLA {#sla}
At the moment we have the process configured, it remains to add the reminder, which is executed when the Executive Head does not respond in 24 hours.

18. Add a new SLA:
    * `Name`: Reminder Executive Head
    * `Code`: reminderexecutivehead
    * In Start:
        * `States`: 1. Pending by executive Head
    * In End:
        * `States`: 2. Pending by Risk Committee, 3.a First proposal and 5. Rejected Requests
    * `Time Type`: Static
    * `Time`: HOURS|24
    * Routine:

    | Code | Type | Setting |
    |--|------|---------|
    | email | send email | `Subject`: *Recordatorio: Responder Solicitudes de Producto Pendiente* <br/> `Data`: *{"recipientName":"Jefe Ejecutivo","recipientEmail":"Jefe Ejecutivo","companyName":"Ruanda","title":["Estamos esperando tu respuesta"],"action":"","code":"","messageA":"$JOIN##(La Solicitud levantada con el nombre )#($OUTPUT#task_request#data&#124;name)#( no tiene respuesta aún)","messageB":""}* <br/> `To`: add an item and fill it with *diego@ruanda.com* |
    | task_request* | Network Request | `URL`: $JOIN#/#($ENV#BASEURL)#api#tasks#($VALUE#taskGroupId)#task#($VALUE#taskId) <br/> `Method`: GET <br/> Active the button `Default authentication` <br/> `Success`: email |


## Results {#results}
As a guide, the image shown is the same workflow but with the names in Spanish: 
<img alt="" src={useBaseUrl('img/tutorial_approval.png')} /> <br/> <br/>
And the state machine follows the following proccess:
<img alt="" src={useBaseUrl('img/tutorial_approval_sm.png')} />

*The pictures will be updated soon.*

