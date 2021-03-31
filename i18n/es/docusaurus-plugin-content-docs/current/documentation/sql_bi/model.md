---
id: model
title: SQL Model
sidebar_label: Model
---
import useBaseUrl from '@docusaurus/useBaseUrl'; 

# SQL Tables and Columns {#sql-tables-and-columns}
## channels {#channels}
Table with all company channels  
  
* Number 1
* Naming n/a

**Columns**
```
_id               varchar(24) not null primary key,
display           varchar(1000),
code              varchar(1000),
isactive          boolean,
modifiedat        timestamp,
modifiedat_unixms bigint
```

## cp_* {#cp_}
Channel Property Relations

* Number: equal to property types
* Naming: cp_[property-type-code] e.g., cp_products, cp_stores, cp_engines, ...
 
**Columns**
```
property varchar(24) not null,
channel  varchar(24) not null,
```

**Primary Key**
```
primary key (channel, property)
```

## cu {#cu}
Channel User Relations
  
* Number: 1
* Naming: n/a

**Columns**
```
channel varchar(24) not null,
userid  varchar(24) not null,
```

**Modifiers**   
```
primary key (channel, userid)
```

## data_* {#data_}
Short description  
  
* Number: equal to number of surveys
* Naming: data_responses, data_new_issue, ...

**Columns**
```
cot_user          varchar(24),
channel           varchar(24),
createdat         timestamp,
startdate         timestamp,
enddate           timestamp,
modifiedat        timestamp,
modifiedat_unixms bigint,
__DYNAMIC__         __DYNAMIC__,
uuid              varchar(1000) not null primary key
```

NOTE: DYNAMIC Columns depend on SURVEY MODEL.

## etl_* {#etl_}
Custom ETL Tables (enterprise version only)  
  
* Number: equal to ETL functions
* Naming: etl_active_user, etl_montly_review, ...

**Columns**
```
__DYNAMIC__         __DYNAMIC__,
```
NOTE: DYNAMIC Columns depend on ETL Definition.


## properties_* {#properties_}
Properties Table.
  
* Number: Equal to Property Types
* Naming: properties_clients, properties_*

**Columns**
```
_id               varchar(24) not null primary key,
display           varchar(1000),
code              varchar(1000),
isactive          boolean,
propertytype      varchar(1000),
modifiedat        timestamp,
modifiedat_unixms bigint
__DYNAMIC__         __DYNAMIC__
```

NOTE: DYNAMIC Columns depend on Properties Extra Data


## sessions {#sessions}
Sessions Table  
  
* Number: 1
* Naming: n/a

**Columns**
```
_id               varchar(24) not null primary key,
userid            varchar(24),
device            varchar(1000),
createdat         timestamp,
endedat           timestamp,
modifiedat_unixms bigint
```


## sl {#sl}
Survey List Relations  
  
* Number: 1
* Naming: n/a

**Columns**
```
uuid       varchar(1000),
identifier varchar(1000),
value      varchar(1000)
```


## sp_* {#sp_}
Survey Property Relations  
  
* Number: Same as property types
* Naming: sp_clients, sp_colors, sp_cells, ...

**Columns**
```
uuid       varchar(1000),
property   varchar(24),
identifier varchar(1000)
```


## ss {#ss}
Survey Survey Relations  
  
* Number: 1
* Naming: n/a

**Columns**
```
parent   varchar(1000) not null,
child    varchar(1000) not null,
surveyid varchar(24),
code     varchar(1000),
constraint ss_pkey
```
**Modifiers**   
```
primary key (parent, child)
```


## su {#su}
Survey User Relations  
  
* Number: 1
* Naming: n/a

**Columns**
```
uuid       varchar(1000),
identifier varchar(1000),
userid     varchar(24)
```
**Modifiers**
```
(uuid, identifier)
```



## subproperties {#subproperties}
Properties Properties Parent Child Relations  
  
* Number: 1
* Naming: n/a

**Columns**
```
parent varchar(24) not null
parent varchar(24) not null
child varchar(24) not null
parent_propertytype varchar(1000)
child_propertytype  varchar(1000)
```



## ta {#ta}
Task Answer Relations

* Number: 1
* Naming: n/a

**Columns**
```
task_id     varchar(24)   not null,
answer_uuid varchar(1000) not null,
constraint ta_pkey
```
**Modifiers**
```
primary key (task_id, answer_uuid)
```


## tasklogs {#tasklogs}
Task Log Table  
  
* Number: 1
* Naming: n/a

**Columns**
```
_id                 varchar(24) not null primary key,
task                varchar(24),
taskgroup           varchar(24),
currentstate        varchar(24),
currentstatemachine varchar(24),
changedby           varchar(24),
createdat           timestamp,
createdat_unixms    bigint
```


## tasks_* {#tasks_}
Tasks Table  
  
* Number: Same as Workflows
* Naming: task_engineering, task_issues, task_bugs, task_machines, ...

**Columns**
```
_id               varchar(24) not null primary key,
name              varchar(1000),
assignee          varchar(24),
smstate           varchar(24),
status            varchar(24),
asset             varchar(24),
status1           varchar(24),
status2           varchar(24),
status3           varchar(24),
status4           varchar(24),
status5           varchar(24),
createdat         timestamp,
modifiedat        timestamp,
modifiedat_unixms bigint,
owner             varchar(1000),
startdate         timestamp,
enddate           timestamp,
resolutiondate    timestamp,
createdby         varchar(24),
smstatemachine    varchar(24),
taskgroup         varchar(24),
survey            varchar(24),
channeltype       varchar(100),
indentation       integer,
weight            bigint,
relativeweight    bigint,
projectcode       varchar(24),
parent            varchar(24),
isactive          boolean,
channel           varchar(24),
info              varchar(1000),
closedat          timestamp,
serial            integer
```


## users {#users}
User table  
  
* Number: 1
* Naming: n/a

**Columns**
```
_id               varchar(24) not null primary key,
email             varchar(1000),
name              varchar(1000),
isactive          boolean,
jobtitle          varchar(100),
phone             varchar(100),
createdat         timestamp,
modifiedat        timestamp,
modifiedat_unixms bigint,
__DYNAMIC__         __DYNAMIC__
```
NOTE: DYNAMIC Columns depend on User Extra Data

