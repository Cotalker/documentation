---
id: tutorial_scheduler
title: Create a Scheduled Routine
author: Valentina Martínez
---

:::caution Advertencia
Esta página aún no se encuentra traducida al español.
:::
import useBaseUrl from '@docusaurus/useBaseUrl'; 

:::caution
Tutorial under review due to updates in data schemes.
:::


## Company Requirements {#company-requirements}

Ruanda's Human Resources department wants to implement a bot that reminds team members of upcoming birthdays. The idea is to have a monthly reminder of all the birthdays on that month so that everyone has them in mind.

To make it even more fun, have the company's mascot send the message.

## Pre-Requisites {#pre-requisites}
#### Access Role
- _User_ with the `admin-*-write` permission, which allows complete access to the admin.
- _User_ with the `read admin` access role.

#### Channel
- Create a channel that has the entire team on it. Save the _channel id_, we'll refer to it as `channel_id`. 
- You might already have a _channel_ like this from the [Create Groups & Channels Tutorial](/docs/tutorials/basic/create_group) or [Create Survey Tutorial](/docs/tutorials/basic/create_survey).
- You can easily get the _id_ by going to the channel's page and coping the serial number that appears in the URL.

#### User
- Create a _user_ (company mascot), who will send the birthday message on the team channel. Save the _user id_, we'll refer to it as `user_id`.
- You might already have a _user_ that serves as a company mascot from  the [Create Survey-Triggered Parameterized Bot Survey](/docs/tutorials/intermediate/create_survey_bot).
- You can easily get the _id_ by going to the user's settings page and coping the serial number that appears in the URL.

## Steps {#steps}

<!-- @maurice despues que revisamos este tutorial  tenemos que 

1. Cambiar los extras por los nuevos SchemaNodes
2. Cambiar en la forma que funciona en general, porque schema nodes no permite objectos anidados (ya hablaremos de  esto) igual es un gran contra de modelar muchas cosas (vamos a hablar con @alfredo por si tiene alguna buena idea)
3.  Modificar el bot para usar el nuevo modelo
4. Esperar bots con codigo custom para poder adaptar los formatos -->

### I. Create a Collection

<div className="alert alert--secondary">

1. Create the _birthdays_ collection.

<!--  First proposal:
    - Create the collection.
    - Use Additional Fields for birthday date
    - Then create an element for each team member and use additional field to add birthdate.
 -->
<!-- Second proposal:
    - Add Additional Field in Users for birthdate -->
<!-- Third proposal: 
    - ???
-->

</div>
<br/>

<div className="alert alert--secondary">

2. Add **Elements** to add person and birthdate. 



</div>
<br/>

<div className="alert alert--secondary">

3. Use the following data for this exercise:

<!-- This was taken from the former version, for use with (soon to be deprecated Attributes) -->

<div className="container">
<div className="row table-row-1">
<div className="col col--4">Name:</div>
<div className="col col--4">Code:</div>
<div className="col col--4">Display:</div>
</div>
<div className="row table-row-2">
<div className="col col--4">January</div>
<div className="col col--4">month_01</div>
<div className="col col--4">Andrew [2], Sergio [3], Ariel [12], Gwen [20] and Julie [23]</div>
</div>
<div className="row table-row-1">
<div className="col col--4">February</div>
<div className="col col--4">month_02</div>
<div className="col col--4">Mario [2] and Will Smith [12]</div>
</div>
<div className="row table-row-2">
<div className="col col--4">March</div>
<div className="col col--4">month_03</div>
<div className="col col--4">Valentina [15] and Aron Piper [22]</div>
</div>
<div className="row table-row-1">
<div className="col col--4">May</div>
<div className="col col--4">month_05</div>
<div className="col col--4">Javiera [16] and Christian[15]</div>
</div>
<div className="row table-row-2">
<div className="col col--4">June</div>
<div className="col col--4">month_06</div>
<div className="col col--4">Tom Holland [18]</div>
</div>
<div className="row table-row-1">
<div className="col col--4">July</div>
<div className="col col--4">month_07</div>
<div className="col col--4">Joaquin [30]</div>
</div>
<div className="row table-row-2">
<div className="col col--4">August</div>
<div className="col col--4">month_08</div>
<div className="col col--4">Robert [13]</div>
</div>
<div className="row table-row-1">
<div className="col col--4">September</div>
<div className="col col--4">month_09</div>
<div className="col col--4">Zac Efron [7]</div>
</div>
<div className="row table-row-2">
<div className="col col--4">October</div>
<div className="col col--4">month_10</div>
<div className="col col--4">Lily Collins [3]</div>
</div>
<div className="row table-row-1">
<div className="col col--4">November</div>
<div className="col col--4">month_11</div>
<div className="col col--4">Tom Cruise [5]</div>
</div>
<div className="row table-row-2">
<div className="col col--4">December</div>
<div className="col col--4">month_12</div>
<div className="col col--4">Harry Styles [20] and LeBron James [30]</div>
</div>
</div>
<br/>

</div>
<br/>

### II. Create Scheduler

<!-- This has to be redone and adapted to Scheme Nodes. -->

<div className="alert alert--secondary">

4. Access the <span className="badge badge--primary">Administrator</span> and open <span className="badge badge--primary">Schedules</span>.

</div>
<br/>

<div className="alert alert--secondary">

5. Press <span className="badge badge--primary">+</span> button to create a new scheduler.

</div>
<br/>

<div className="alert alert--secondary">

6. Set up the <span className="badge badge--primary">General information</span> section:
    - **Code**: `birthday_reminder`
    - Activate the **Recurrence** button.
    - Select the **Monthly** option
    - **Every**: 1
    - **Day**: 1
    - **Hour**: 9
    - **Minute**: 0

</div>
<br/>

<div className="alert alert--secondary">

7. Set up the <span className="badge badge--primary">Routine builder</span> and set the following:

    1. Press <span className="badge badge--primary">+ Add Stage</span>
        - **Code**: `get_date`
        - **Type**: `Network Request` 
        - **URL**: `http://worldtimeapi.org/api/timezone/America/Santiago`
        * **Method**: `GET`
    ----

    2. Press <span className="badge badge--primary">+ Add Stage</span> and set the following:
        - **Code**: `property`
        - **Type**: `Network Request` 
        - **URL**: `$JOIN#/#($ENV#BASEURL)#api#properties#findByCode#($JOIN##month_#($OUTPUT#get_date#data|datetime|[date=>format=MM]))`
        - **Method**: `GET`
        - Activate the **Default authentication** button.
        :::note 
        Default authentication must be be active in order for it to work with the Cotalker API.
        :::
    ----

    3. Press <span className="badge badge--primary">+ Add Stage</span> and set the following:
        - **Code**: `message`
        - **Type**: `Send Message` 
        - **Content**: `$JOIN##(🎈 This month we celebrate the following birthdays! 🎈)#($OUTPUT#property#data|extra|display)`
        - **Content Type**: `text/plain`
        - **User**: *user_id*\*
        - In *Channel* press **+ Add Item**:
          - **Item**: *channel_id*\*
        :::note
        *_Remember to use the mascot's and channel's id as explained [above](#pre-requisites)._
    ----
    
    4. Press <span className="badge badge--primary">+ Add Stage</span> and set the following:
        - **Code**: `empty_condition`
        - **Type**: `Conditional`
        - **Left side**: `$OUTPUT#property#data`
        - **Right side**: `$CODE#users#email#asdasd@cotalker.com`
        - **Operator**: `neq`
        - **True Condition**: `message`
    ----

    5. **Max. Iterations**: `10`
    ----

    6. **Initial Stage**: `get_date`
    ----
    
    7. Set up the **Outputs** section of the *get_date* stage:
        - `Succed`: *property*
    ----

    8. Set up the **Outputs** section of the *property* stage:
        - **Succed**: `conditional`

</div>
<br/>

<div className="alert alert--secondary">

8. Press <span className="badge badge--primary">Save</span>.

</div>
<br/>

## Result {#result}

