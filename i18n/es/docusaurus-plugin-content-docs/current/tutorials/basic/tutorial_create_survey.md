---
id: create_survey
title: Create Survey
---
import useBaseUrl from '@docusaurus/useBaseUrl'; 

Tutorial on how to create a survey.

Time: 12 minutes

:::tip Vocabulary Note:
A _survey_ is a customized form to gather information from _users_ through _channels_.
:::

## Company Requirements {#company-requirements}
Human Resources has a good idea for welcoming new people to the team. 
New employees are sent a survey with questions to get to know them better. The information is then displayed in the team's _group_ so that everyone can warmly welcome new participants.

They want to capture the following data from the _users_:
- Nickname
- Birthday
- Where are they from?
- Departament
- A fun fact about them.

## Pre-Requisites {#pre-requisites}
#### Users & Access Role {#users--access-role}
* _User_ with the `admin-surveys-write`, `admin-properties-write`, and `admin-groups-write` permissions to create and modify surveys, databases and groups. 
* Or the `admin-*-write` permission which allows all of the above. 
* _User_ with the `web-admin-write` and `web-admin-read` permissions to set up the _Admin_.
* _User_ with the `read admin` access role.
* A _user_ for each employee of the company.

#### Group {#group}
* Having completed the [_Create Groups & Channels Tutorial_](create_group).
* Have a previously made _group_ with a _channel_.
* The _channel_ must include all employees.

#### Database {#database}
* Having completed the [_Create Collection Tutorial_](create_database).
* Have a previously made _collection_ with the following characteristics:
    * Name: `New Pal Form` 
    * Must contain an _element_ named `Welcome Form`


## Steps {#steps}

:::tip Vocabulary Note:
- _"Survey" and "Form" are used synonymously._
:::

### I. Create Survey/Form {#i-create-surveyform}

<div className="alert alert--secondary">

1. From the **Main Menu Bar**, access the <span className="badge badge--primary">Administrator</span> and open <span className="badge badge--primary">Survey</span>.

</div>
<br></br>

<div className="alert alert--secondary">

2. Press the <span className="badge badge--primary">+</span> button to create a new _Survey/Form_.

<img alt="" className="img_sizing item shadow--tl" src={useBaseUrl('img/tutorial_surveys_00.png')} />
<br/>

  _The following settings panel will show up:_

<img alt="" className="img_sizing item shadow--tl" src={useBaseUrl('img/tutorial_surveys_01.png')} />
<br/>

</div>
<br></br>

<div className="alert alert--secondary">

3. Under <span className="badge badge--primary">General Information</span> set the following:
    * **Name**: `New pal`
    * **Code**: `newpal_1`

  Under the <span className="badge badge--primary">Access</span> tab, set the following:
    * **Group permission**: _Select a previously created Channel Group_.
    * **Access Role**: *default*
    * Press the <span className="badge badge--primary">+ Add Element</span> button:
        * **Collection**: `New Pal Form`
        * **Elements**: `Welcome Form`

:::note 
- _The **element** will be used to show the **survey** only on the **channel** that has the same **element** assigned._
- _In this case, only the **users** with the **default** access role will be able to respond the **survey**. If your **user** account doesn't have the **default** access role, you may add whatever **access role** you have in order to test the **survey**._
:::

_So far, your screen should look something like this:_

<img alt="" className="img_sizing item shadow--tl" src={useBaseUrl('img/tutorial_survey_create1.png')}/>

</div>
<br></br>

<div className="alert alert--secondary">

4. Set up the **Form**:

  ![survey](/img/tutorial_survey_create2.png)

  _Under the **Form Template** section, do the following:_

  A. Drag and drop from the _Components_ column the <span className="badge badge--warning">Written Answer</span> component to the _form template_ and fill the fields with the following:
    * **Field Label**: `Nickname`
    * **Identifier**: `nickname`
    * **Maximum** : `50`
  
  :::note Technical note:
  _The identifiers are used in a routine to reference them and get a survey response._
  :::
  
  B. Drag and drop the <span className="badge badge--warning">Date and Time</span> component to the _form template_.
    * **Field Label** : `Birthday`
    * **Identifier**: `birthday`
    * **Type**: `Date`
    * **Max/Min Type**: `Disable`
    
  C. Repeat _Step A_ with the `Where are you from?` question in the **Field Label** and with `natalplace` in **Identifier**.
    
  D. Drag and drop the <span className="badge badge--warning">Multiple Choice</span> component to the _form template_.
    * **Field Label** : `Departament`
    * **Identifier** : `departament`
    * **Type**: `Collection`
    * **Collection**: `Department`

  :::note Tip
  _Using **collection** as the **type** will be useful to group the **task** in the **task view** and also on the dashboard._
  :::

  E. Repeat _Step A_ with the `Fun fact` question in the **Field Label** and `funfact` as the **Identifier**. 

</div>
<br></br>

<div className="alert alert--secondary">

5. Press <span className="badge badge--primary">Save</span>.

</div>
<br></br>

### II. Edit the Channel. {#ii-edit-the-channel}

<div className="alert alert--secondary">

6. From the **Main Menu Bar**, access the <span className="badge badge--primary">Administrator</span> and open <span className="badge badge--primary">Group</span>.

</div>
<br></br>

<div className="alert alert--secondary">

7. Press the _group_ which has the _channel_ of the whole team.

</div>
<br></br>

<div className="alert alert--secondary">

8. Press the _channel_ where the whole team is included.

</div>
<br></br>

<div className="alert alert--secondary">

9. Edit the _channel_:

    Under the <span className="badge badge--primary">Elements</span> tab, press the   <span className="badge badge--primary">+ Add Element</span> button, and fill the following fields:
      * **Collection**: `New Pal Form`
      * **Element**: `Welcome Form`

    :::note 
    - _The assigned element is the same as the one in the survey._
    :::

_Your screen should look something like this:_

<img alt="" className="img_sizing item shadow--tl" src={useBaseUrl('img/tutorial_survey_create3.png')}/>

</div>
<br></br>

<div className="alert alert--secondary">

10. Press <span className="badge badge--primary">Save</span>.

</div>
<br></br>


## Result {#result}



The <span className="badge badge--success">survey</span> can be answered in the assigned _channel_:


<img alt="" className="img_sizing item shadow--tl" src={useBaseUrl('img/tutorial_survey_result_00.png')}/>
<br/>
<br/>

Here you can see how the <span className="badge badge--success">survey</span> looks like when you are going to answer it:

<img alt="" className="img_sizing item shadow--tl" src={useBaseUrl('img/tutorial_survey_result_01.png')}/>
<br/>
<br/>


Here's what the _channel_ looks like when the <span className="badge badge--success">survey</span> is sent:

<img alt="" className="img_sizing item shadow--tl" src={useBaseUrl('img/tutorial_survey_result_02.png')}/>
<br/>
<br/>