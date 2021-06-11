---
id: model
title: SQL Data Model
sidebar_label: SQL Data Model
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img alt="design" className="img_sizing" src={useBaseUrl('img/design/Database.svg')} />
<br/>
<br/>

## Summary {#summary}

This section describes the basic data model –how data is organized– of a company's SQL database. Each database contains one or various **tables** (also known as _collections_ or _property types_). Each **table** represents a data type and is made up of **columns** and **rows**. Each **row** is an _element_ or _property_ in the table. The **columns** indicate how the data of each _element_ is organized and related to other tables. Some **tables** also include _dynamic_ columns for adding extra data.

<div className="alert alert--secondary">

### Table name structure

We have structured **table names** in such a manner to make it visually easier to understand the content in your database. The following list shows the possible structures for table names:
1. [model]
2. [model]_subtype
3. [model]_[model]
4. [model]_[model]_subtype

:::note
- _Model_ indicates the data type.
- Singular names are normally used. Plural names are used when there are various table relations.
- Examples are provided in the section below.
:::

</div>
<br/>


------

<span className="hero__title">Data Types and Models:</span>

## channels {#channels}
_Table with all company channels_

* Number: 1
* Naming: n/a

**Columns**
```json
_id:                varchar(24) not null primary key,
display:            varchar(1000),
code:               varchar(1000),
isactive:           boolean,
modifiedat:         timestamp,
modifiedat_unixms:  bigint
```

------

## channel_property_* {#channel_property}
_Channel Property Relations_

* Number: equal to property types
* Naming: channel_property_[model] e.g., channel_property_products, channel_property_stores, channel_property_engines, etc.

**Columns**
```json
property: varchar(24) not null,
channel:  varchar(24) not null,
```

**Primary Key**
```json
primary key (channel, property)
```

------

## channel_user {#cu}
_Channel User Relations_

* Number: 1
* Naming: n/a

**Columns**
```json
channel: varchar(24) not null,
userid:  varchar(24) not null,
```

**Modifiers**   
```json
primary key (channel, userid)
```

------

## data_* {#data}
_Short description_

* Number: equal to the number of surveys
* Naming: data_responses, data_new_issue, etc.

**Columns**
```json
cot_user:           varchar(24),
channel:            varchar(24),
createdat:          timestamp,
startdate:          timestamp,
enddate:            timestamp,
modifiedat:         timestamp,
modifiedat_unixms:  bigint,
__DYNAMIC__:        __DYNAMIC__,
uuid:               varchar(1000) not null primary key
```

**NOTE**: DYNAMIC columns depend on SURVEY models.


------

## properties_* {#properties}
_Properties Table_

* Number: Equal to Collections or Property Types
* Naming: properties_clients, properties_*

**Columns**
```json
_id:                 varchar(24) not null primary key,
display:             varchar(1000),
code:                varchar(1000),
isactive:            boolean,
propertytype:        varchar(1000),
modifiedat:          timestamp,
modifiedat_unixms:   bigint
__DYNAMIC__:         __DYNAMIC__
```

**NOTE**: DYNAMIC Columns are schema nodes, i.e., a sub-table or collection that stores extra data. They can be manually created in the Admin as [**additional fields**](/docs/documentation/admin/admin_properties#additional-fields) of a collection.


------

## sessions {#sessions}
_Sessions Table_  

* Number: 1
* Naming: n/a

**Columns**
```json
_id:                varchar(24) not null primary key,
userid:             varchar(24),
device:             varchar(1000),
createdat:          timestamp,
endedat:            timestamp,
modifiedat_unixms:  bigint
```


------

## sl {#sl}
_Survey List Relations_

* Number: 1
* Naming: n/a

**Columns**
```json
uuid:        varchar(1000),
identifier:  varchar(1000),
value:       varchar(1000)
```


------

## sp_* {#sp}
_Survey Property Relations_

* Number: Same as property types
* Naming: sp_clients, sp_colors, sp_cells, etc.

**Columns**
```json
uuid:        varchar(1000),
property:    varchar(24),
identifier:  varchar(1000)
```


------

## ss {#ss}
_Survey Survey Relations_

* Number: 1
* Naming: n/a

**Columns**
```json
parent:      varchar(1000) not null,
child:       varchar(1000) not null,
surveyid:    varchar(24),
code:        varchar(1000),
constraint:  ss_pkey
```
**Modifiers**   
```json
primary key (parent, child)
```


------

## su {#su}
_Survey User Relations_

* Number: 1
* Naming: n/a

**Columns**
```json
uuid:         varchar(1000),
identifier:   varchar(1000),
userid:       varchar(24)
```
**Modifiers**
```json
(uuid, identifier)
```


------

## subproperties {#subproperties}
_Properties Properties Parent Child Relations_

* Number: 1
* Naming: n/a

**Columns**
```json
parent:               varchar(24) not null
parent:               varchar(24) not null
child:                varchar(24) not null
parent_propertytype:  varchar(1000)
child_propertytype:   varchar(1000)
```


------

## ta {#ta}
_Task Answer Relations_

* Number: 1
* Naming: n/a

**Columns**
```json
task_id:       varchar(24)   not null,
answer_uuid:   varchar(1000) not null,
constraint:    ta_pkey
```
**Modifiers**
```json
primary key (task_id, answer_uuid)
```


------

## tasklogs {#tasklogs}
_Task Log Table_

* Number: 1
* Naming: n/a

**Columns**
```json
_id:                  varchar(24) not null primary key,
task:                 varchar(24),
taskgroup:            varchar(24),
currentstate:         varchar(24),
currentstatemachine:  varchar(24),
changedby:            varchar(24),
createdat:            timestamp,
createdat_unixms:     bigint
```


------

## tasks_* {#tasks}
_Tasks Table_

* Number: Same as Workflows
* Naming: task_engineering, task_issues, task_bugs, task_machines, etc.

**Columns**
```json
_id:                varchar(24) not null primary key,
name:               varchar(1000),
assignee:           varchar(24),
smstate:            varchar(24),
status:             varchar(24),
asset:              varchar(24),
status1:            varchar(24),
status2:            varchar(24),
status3:            varchar(24),
status4:            varchar(24),
status5:            varchar(24),
createdat:          timestamp,
modifiedat:         timestamp,
modifiedat_unixms:  bigint,
owner:              varchar(1000),
startdate:          timestamp,
enddate:            timestamp,
resolutiondate:     timestamp,
createdby:          varchar(24),
smstatemachine:     varchar(24),
taskgroup:          varchar(24),
survey:             varchar(24),
channeltype:        varchar(100),
indentation:        integer,
weight:             bigint,
relativeweight:     bigint,
projectcode:        varchar(24),
parent:             varchar(24),
isactive:           boolean,
channel:            varchar(24),
info:               varchar(1000),
closedat:           timestamp,
serial:             integer
```


------

## users {#users}
_User table_

* Number: 1
* Naming: n/a

**Columns**
```json
_id:                varchar(24) not null primary key,
email:              varchar(1000),
name:               varchar(1000),
isactive:           boolean,
jobtitle:           varchar(100),
phone:              varchar(100),
createdat:          timestamp,
modifiedat:         timestamp,
modifiedat_unixms:  bigint,
```

**NOTE**: Extra user elements can be added through [_properties_](#properties) tables.

------
