---
id: project_manager
title: Setup a Project Manager
author: Edward Alvarado & Valentina Martínez
---

:::caution Advertencia
Esta página aún no se encuentra traducida al español.
:::
import useBaseUrl from '@docusaurus/useBaseUrl'; 
import Highlight from '@theme/Highlight';
import Mermaid from '@theme/Mermaid';

Time to complete: 120 minutes.

## Company Request {#company-request}
Congratulation! After showing the demo of Task Manager and what can it do, Ruanda Company requests for implement the Project and Task Manager, with automatic notifications and a dashboard. <br/>

Their requests are the following:
* Task Manager that allows the creation of <Highlight text="projects" color="rgb(155, 89, 182)"/> with <Highlight text="tasks" color="#2ecc71"/>
    * Projects can be `Active`, `Canceled` or `Finished`
    * Tasks can be `Open`, `inProgress`, `Roadblock`, `Finished` or in `Backlog`
    * We will setup a _single_ communication per <Highlight text="projects" color="rgb(155, 89, 182)"/> (In the "simple Task Manger" tutorial, there is one channel per task).
* Rules to manage the tasks
    * Open <Highlight text="tasks" color="#2ecc71"/> must be `closed` or set to `backlog` before 7 days, otherwise the assignee manager is notified.
* Bots
    * <Highlight text="projects" color="rgb(155, 89, 182)"/> are created from a survey
    * <Highlight text="tasks" color="#2ecc71"/> are created from a survey
* Dashboards
    * <Highlight text="projects" color="rgb(155, 89, 182)"/> and `tasks` charts and KPIs


:::note This is an advanced Cotalker configuration. If you have any issues following this tutorial please let us know at docs@cotalker.com
:::

## Funtional Requirements {#funtional-requirements}

**Access Role**
* User with the permission `admin-*-write` which allows all above. 
* User with the permissions `web-admin-write` and `web-admin-read` to set up in the admin.
* User with the access role `read admin`.

:::important 
If you don't have your Cotalker Partner Account. Please contact us at partners@cotalker.com 
:::

## Steps {#steps}

### Overview of step dependency {#overview-of-step-dependency}

<img src="https://docs.google.com/drawings/d/e/2PACX-1vT2-sFAxJhWgSGvIZnJXAgz9hFh6wOzKj83nK_zvPXaLKIUkJ-HTvWlUclCAoCxrTOAldU1L0RrZoDP/pub?w=715&amp;h=642" />

### Company Edition {#company-edition}
1. Create two Job Titles in the company: `Manager` and `Operator`.

[View this tutorial for more information on company edition](/docs/tutorials/basic/configure_company) 


### Create Access Roles {#create-access-roles}

Create two acesss roles

| Access Role   | Permissions  | Notes |  
| ------------- | ------------ | ----- | 
| Project Creator | taskmanager_access <br/> taskmanager_create_project | This will allow to create new projects |
| Task Creator | taskmanager_access <br/> taskmanager_create_task | This will allow to create new tasks |

[View this tutorial for more information on access role creation](/docs/tutorials/basic/create_accessroles)
     
### Create Databases {#create-databases}

| Database Display Name | Properties Display Name  |  
| --------------------- | ------------------------ | 
| Project Assets `project_assets` | `empty` | 
| Project States `project_states` |  1. Active `ps_active`<br/> 2. Finished `ps_finished`<br/> 3. Canceled `ps_canceled`
| Generic Assets `generic_assets`| Generic Task `generic_task` | |
| Task States `task_states`| 1. Backlog `ts_backlog`<br/> 2. Open `ts_open`<br/> 3. In Progress `ts_in_progress`<br/> 4. Roadblock `ts_roadblock`<br/> 5. Closed `ts_closed`<br/> | |
| Task Priority `task_priority`| 1. High `tp_high`<br/> 2. Normal `tp_normal`<br/> 3. Low `tp_low`| |
| PM Control `pm_control`| Create Project `pm_create_project`<br/> Create Task `pm_create_task`| |

[View this tutorial for more information on database creation](/docs/tutorials/basic/create_database)

### Create Users {#create-users}
For ilustrate the project manager we will create only two users `Eva` and `John`. `Eva` will be `John's` manager.

1. Manager  
   name: __Eva__  
   surname: __Sample__  
   email: __eva@ruanda.com__  
   Job: __manager__  
   Access Roles: __Project Creator__, __Task Creator__ and __default__
2. Operator  
   name: __John__  
   surname: __Sample__  
   email: __john@ruanda.com__  
   Job: __operator__  
   Access Roles: __Task Creator__ and __default__  
   Boss: __Eva__

[View this tutorial for more information on user creation](/docs/tutorials/basic/create_user)

### Create New Groups {#create-new-groups}
1. name __Projects & Tasks__  
   code __projects__  
   group type __Tasks__  
   read permission __taskmanager_access__
   
2. name __Project Dashboard__  
   code __project_dashboard__  
   group type __Link__  
   parent __Projects & Tasks__
   
     
[View this tutorial for more information on Create Group](/docs/tutorials/basic/create_group)

### Create State Machine {#create-state-machine}
1. name __Projects__  
  code __projects__  
  type __BOUND__  
  asset.type __UNIQUE__  
  asset.propertytype __Project Assets__  
  state list __Project States__  
2. name __Tasks__  
   code __tasks__  
   type __UNBOUND-HIERARCHY__  
   asset.type __GENERIC__  
   asset.propertytype __Generic Assets__  
   asset.proeprty __Generic Task__  
   additional field 1 __Task Priority__  
   states __Tasks States__  
   
### Setup State Machine States {#setup-state-machine-states}

1. For state machine __Projects__  
    
    | Type | Property  | State Changes |
    | ---  | --------- | ---- | 
    | new  | 1. Active | 2. Finished <br/> 3. Canceled |
    | closed | 2. Finished | 1. Active |
    | closed | 3. Canceled | 1. Active |

    Initial state __1. Active__

2. For state machine __Tasks__

    | Type | Property  | State Changes |  
    | ---  | --------- | ---- | 
    | new  | 2. Open | 3. In Progress <br/> 4. Roadblock <br/> 5. Closed <br/> 1. Backlog |
    | in progress | 3. In Progress | 2. Open 
    | in progress | 4. Roadblock | 2. Open 
    | closed | 5. Closed | 2. Open 
    | in progress | 1. Backlog | 2. Open |
    
    Initial state __1. Open__

### Connect State Machines {#connect-state-machines}

1. At group __Projects & Tasks__   
    Set Initial state machine as __Projects__   
2. For state machine __Projects__ for state __1. Active__  
    Set subtask as __Tasks__

This is final result of this setup

<img alt="" src={useBaseUrl('img/blog_project_manager_sm.png')} />

[View this tutorial for more information on Create State Machine](/docs/tutorials/basic/create_state_machines)

### SLA: 7 days to close the task {#sla-7-days-to-close-the-task}

For state machine __Tasks__ add a SLA
*  name __Follow up__
*  code __follow_up__
*  start __new__
*  end __closed__
*  time type: __Static__
*  time : __DAYS|7__ 
*  reset: on
*  repeat: off

Routine:

| Code | Type  | Settings |  
| ---  | ----- | -------- | 
| notify | PBMessage | Content: __["$VALUE#task\|name", "TEST"]__ <br/> JoinContentBy _leave 1 white space_ <br/> contentType __text_plain__ <br/> sentBy __$VALUE#task\|assignee__ <br/> channelIds: __["$VALUE#task\|channel"]__

Initial Stage: __notify__

[View this tutorial for more information on Create SLA](/docs/tutorials/intermediate/sla)

### Create Surveys {#create-surveys}
1. name __Create new Project__  
   code __create_new_project__  
   permissions: __Project Creator__  
   properties required: __PM Control__ @ __Create Project__  
   
    | Type | Identifier | Settings |
    | ---- | ---------- | -------- |  
    | Plain Text | cs_text |  "Create new Project" |
    | Text | cs_project_name | min 3, max 140 | 

2. name __Create new Task__  
   code __create_new_task__  
   permissions: __Task Creator__  
   properties required: __Project State__ @ __*__  
   
    | Type | Identifier | Settings |
    | ---- | ---------- | -------- |  
    | Plain Text | ct_text |  "Create new Project" |
    | Text | ct_task_name | min 3, max 140 | 

[View this tutorial for more information on Create Survey](/docs/tutorials/basic/create_survey)

### Create Channel {#create-channel}
1. name __Create Projects__  
  code __create_project__  
  group __Projects & Tasks__  
  users __Eva Sample__  
  properties __PM Control__ @ __Create Project__  
  First property overrides channel name __off__

[View this tutorial for more information on Create Channel](/docs/tutorials/basic/create_group)

### Create Bots {#create-bots}

1. Bot that creates projects
    
    * name __ProjectBot__
    * description __Creates projects from a survey__
    * global __on__
    * it's a survey command __on__
    * form __Create new Project__
    * it's a slash command __off__
    * Max iterations __2__
    
    Routine:
    
    | Code | Type  | Settings |  
    | ---  | ----- | -------- | 
    | create_project | PBCreateTask | name: __$VALUE#data\|[find=>identifier=cs_project_name]\|process__ <br/> taskGroup __5e726b9dcc12880037ba7e0f__ <br/> assignee: __["$VALUE#user"]__ <br/> output.created __send_ok__ (Cannot be set until next stage is created) 
    | send_ok | PBMessage | content: __$JOIN# #The project#($OUTPUT#create_project#task\|name)#has been created successfully__ <br/> contentType __text/system__ <br/> sentBy: __$VALUE#user__ <br/> channelIds __["$VALUE#channel"]__
    
    Initial Stage: __create_project__

1. Bot that creates projects
    
    * name __TaskBot__
    * description __Creates Tasks in Project__
    * global __on__
    * it's a survey command __on__
    * form __Create new Task__
    * it's a slash command __off__
    * Max iterations __2__
    
    Routine:
    
    Max iterations: 2
    
    | Code | Type  | Settings |  
    | ---  | ----- | -------- | 
    | create_task | PBCreateTask | name: __$VALUE#data\|[find=>identifier=ct_task_name]\|process__ <br/> taskGroup __5e726b9dcc12880037ba7e0f__ <br/> assignee: __["$VALUE#user"]__ <br/> ParentChannel __$VALUE#channel__ <br/> output.created __send_ok__ (Cannot be set until next stage is created) 
    | send_ok | PBMessage | content: __$JOIN# #The task#($OUTPUT#create_task#task\|name)#, code number:#($OUTPUT#create_task#task\|serial)#has been successfully created.__ <br/> contentType __text/system__ <br/> sentBy: __$VALUE#user__ <br/> channelIds __["$VALUE#channel"]__
    
    Initial Stage: __create_project__
    
    :::important 
    The bot's access roles must be upgraded to allow `ParentChannel` parameter to work. This requires the bot to read the channel and tasks
    :::
    
<img alt="" src={useBaseUrl('img/blog_project_manager_create_project.png')} />


[View this tutorial for more information on Create Bot](/docs/tutorials/basic/create_bot)

### Configure Kanban View {#configure-kanban-view}

First go to the kanban view:
1. Click on the main menu on __Project & Tasks__
2. Then click on the __task view__ icon on the top right of the channel list
3. Select __kanban view__ from the top bar

Now let's create 2 views

1. All Tasks by Status
   * Click on the __gear icon__  
   * preset: __Status__ (Any name is OK)  
   * group by, field: __Status__  
   * filter by, condition __All criteria__  
   * press at filter by "add filter"  
   * filter by, Field __State Machine__  
   * filter by, Condition __Equal__  
   * filter by, Value __Tasks__  
   * Public filter __on__    
2. Open Tasks by Assignee  
   * Select at Filters, Preset, "New..."  
   * preset: __Assignee__ (Any name is OK)  
   * group by, field: __Assignee__  
   * filter by, condition __All criteria__  
   * press at filter by "add filter"  
   * filter by, Field __State Machine__  
   * filter by, Condition __Equal__  
   * filter by, Value __Tasks__  
   * press at filter by "add filter"  
   * filter by, Field __Status__  
   * filter by, Condition __Equal__  
   * filter by, Value __2. Open__, __3. In Progress__, __4. Roadblock__  
   * Public filter __on__


[View this tutorial for more information on Setup taskvoew](/docs/tutorials/basic/tutorial_taskview)

### Configure BI {#configure-bi}

:::important 
BI Access requires a PRO account.
:::

1. Create the first chart
    * Access the BI
    * Create a new question
    * Set this native query (SQL)
    ```
    SELECT code, count(code) 
    FROM tasks_projects
    LEFT JOIN properties_task_states on tasks_projects.status = properties_task_states._id
    WHERE smstatemachine = '5e73fb31eb0a0b00676e620c'
    GROUP BY code
    ```
    * Set as Pie Chart
    * img alt="" src={useBaseUrl('img/blog_project_manager_bi_1.png')} />
    * Save the question
    * Create and add the question to a dashboard
2. Create the second question
    * Create a new question
    * Set this native query (SQL)
    ```
    SELECT name, code
    FROM tasks_projects
    LEFT JOIN properties_project_states on tasks_projects.status = properties_project_states._id
    WHERE smstatemachine <> '5e73fb31eb0a0b00676e620c'
    ```
   * Set as Table
   * Save the question
   * Add question to same dashbaord
3. Set the dashboard to Public and copy the link
    * <img alt="" src={useBaseUrl('img/blog_project_manager_bi_share.png')} />
    * Go to groups, edit Project Dashboard
    * Set URL to the link you copied
    * Save
    * <img alt="" src={useBaseUrl('img/blog_project_manager_bi_dashboard.png')} />
    

<!--
[View this tutorial for more information on SAMPLE](create_)


### Create Schedule {#create-schedule}
Automatic project status update
[View this tutorial for more information on SAMPLE](create_)
-->

## Result {#result}

<iframe src="https://giphy.com/embed/dWy2WwcB3wvX8QA1Iu" width="480" height="298" frameBorder="0" className="giphy-embed" allowFullScreen></iframe>

Eva assigns a task to John, and he responds through the chat

<img alt="" src={useBaseUrl('img/blog_project_manager_final3.png')} />

  
Eva views tasks by current __state__

<img alt="" src={useBaseUrl('img/blog_project_manager_final1.png')} />

  
Eva view tasks by current __assignee__

<img alt="" src={useBaseUrl('img/blog_project_manager_final2.png')} />


<!--
<Highlight text="Turquoise" color="#1abc9c"/>
<Highlight text="Green Sea" color="rgb(22, 160, 133)"/>

<Highlight text="Emerald" color="#2ecc71"/>
<Highlight text="Nephrtis" color="rgb(39, 174, 96)"/>

<Highlight text="Peter River" color="#3498db"/>
<Highlight text="Belize Hole" color="rgb(41, 128, 185)"/>

<Highlight text="Amethyst" color="rgb(155, 89, 182)"/>
<Highlight text="Wisteria" color="rgb(142, 68, 173)"/>

<Highlight text="Wet Asphalt" color="rgb(52, 73, 94)"/>
<Highlight text="Midnight Blue" color="rgb(44, 62, 80)"/>

<Highlight text="Sun Flower" color="rgb(241, 196, 15)"/>
<Highlight text="Orange" color="rgb(243, 156, 18)"/>

<Highlight text="Carrot" color="rgb(230, 126, 34)"/>
<Highlight text="Pumpkin" color="rgb(211, 84, 0)"/>

<Highlight text="Alizarin" color="rgb(231, 76, 60)"/>
<Highlight text="Pomegranate" color="rgb(192, 57, 43)"/>

<Highlight text="Clouds" color="rgb(236, 240, 241)"/>
<Highlight text="Silver" color="rgb(189, 195, 199)"/>

<Highlight text="Concrete" color="rgb(149, 165, 166)"/>
<Highlight text="Asbestos" color="rgb(127, 140, 141)"/>
-->
<!--
* Automatization
    * Send a summary at the end of day 
-->


