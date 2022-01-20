---
id: create_survey
title: Create Survey
---
import useBaseUrl from '@docusaurus/useBaseUrl'; 

<span className="hero__subtitle">

Tutorial on how to create a survey to gather data from users and share it on a channel .

</span>

Time: 12 minutes

:::tip Vocabulary Note:
- A _survey_ is a customized form used to gather information from _users_. They are usually used through _channel workspaces_, but can also be used to initiate a task from the group panel. Furthermore, _surveys_ can be made public, i.e., available for users not registered in the company's Cotalker ecosystem.
- Sometimes the terms _survey_ and _form_ are used interchangeably. Others, a _survey_ will be the blank template and a _form_ an answered _survey_.
:::

## Company Requirements {#company-requirements}
The company's human resources department has a good idea for welcoming new people to the team. 
New employees are asked to fill out a survey with questions for the team to get to know them better. The information is then displayed in the team's _channel workspace_ so that everyone can warmly welcome new participants.

They want to capture the following data from _users_:
- Nickname
- Birthday
- Where are they from?
- Departament
- A fun fact about them.

## Tutorial Objectives {#tutorial-objectives}
- Create a Survey.

## Pre-Requisites {#pre-requisites}
#### Access Role {#access-role}
- Due to the extension of a survey's capabilities, it is best if your _user_ profile's [_access role_](/docs/documentation/admin/admin_accessrole) counts with the `admin-*-write` permission that grants access to the entire **Administrative Panel**.

#### Database {#database}
- Before creating the _survey_, you must have a _collection_ with an _element_ that will serve to associate the _survey_ with the corresponding _channels_.

:::tip Tutorial Advice
- For this tutorial, we recommend creating a **collection** called _New Employees_ with an **element** called _New Pal Form_.

_The collection's element list would look something like this:_

<img alt="element" className="img_sizing item shadow--tl" src={useBaseUrl('img/tutorials/tutorial_basic_survey_00a.png')} />
<br/>

_For help on creating a colleciton with its corresponding element, please refer to the [Create Database](/docs/tutorials/basic/create_database) tutorial._

:::

#### Group {#group}
- Before creating the _survey_ and after creating the previously mentioned _collection_ and _element_, you will need a _group_ and _channel_ where the survey will be filled out and shared.
- The _channel_ must be associated to the _element_ that will also be associated with the _survey_.

:::tip Tutorial Advice
- For this tutorial, we suggest creating a **group** called _Company Chat_ with a **channel** called _Welcome!_.
- The channel contains all existing **users** as participants.
- The channel is associated with the _New Pal Form_ **element** belonging to the _New Employees_ **collection**.

_The channel's settings should look something like this:_

<img alt="channel" className="img_sizing item shadow--tl" src={useBaseUrl('img/tutorials/tutorial_basic_survey_00b.png')} />
<br/>

_For help on creating a group with its respective channel, go to the [Create Group](/docs/tutorials/basic/create_group) tutorial._

:::

## Steps {#steps}

#### Create a Survey: {#create-survey}

<div className="alert alert--secondary">

### I. Go to the Forms section. {#forms-section}

<img alt="survey section" className="img_sizing item shadow--tl" src={useBaseUrl('img/tutorials/tutorial_basic_survey_01.png')} />
<br/>

1. From the **Main Menu Bar**, press the <span className="badge badge--primary">Administrator</span> button.
2. Select <span className="badge badge--primary">Surveys</span>.
3. The **Forms** section opens up.

</div>
<br></br>

<div className="alert alert--secondary">

### II. Open the Create Form settings panel. {#open-create-form}

<img alt="create survey" className="img_sizing item shadow--tl" src={useBaseUrl('img/tutorials/tutorial_basic_survey_02.png')} />
<br/>

- Press the <span className="badge badge--primary">+</span> icon to open the **Create form** settings panel.


</div>
<br></br>

<div className="alert alert--secondary">

### III. Set up basic form settings. {#basic-settings}

<img alt="survey settings" className="img_sizing item shadow--tl" src={useBaseUrl('img/tutorials/tutorial_basic_survey_03.png')} />
<br/>

1. **Name**: _New pal_
2. **Code**: _new\_pal\_00_
3. **Group permission**: _Company Chat_
4. **Access Role**:_default_
5. Press the <span className="badge badge--primary">+ Add Element</span> button. _Collection_ and _Elements_ fields appear.
6. **Collection**: _New Employees_
7. **Elements**: _New Pal Form_

:::note 
- _In this example, the survey will only be available to users with the `default` access role. If your user account doesn't have the `default` access role, you may add whatever **access role** you have in order to test the **survey**._
- _Make sure the **element** is the same one chosen for the **channel** in the [pre-requisites](#group) section. The **survey** will only be available on **channels** associated with the same **element**._

:::

</div>
<br></br>

<div className="alert alert--secondary">

### IV. Set up the Form Template. {#form-template}

<img alt="form template" className="img_sizing item shadow--tl" src={useBaseUrl('img/tutorials/tutorial_basic_survey_04.png')} />
<br/>

_Drag & drop and set up the following **components** into the **Form template** area:_

#### i. **Text** {#text}

<img alt="text" className="img_sizing item shadow--tl" src={useBaseUrl('img/tutorials/tutorial_basic_survey_05.png')} />
<br/>

1. **Identifier**: _welcome_
2. **Text area**: _Welcome to Ruanda! Please fill out the following survey so the rest of the team can get to know you._

---

#### ii. Written answer {#written-answer-nickname}

<img alt="written answer" className="img_sizing item shadow--tl" src={useBaseUrl('img/tutorials/tutorial_basic_survey_06.png')} />
<br/>

1. **Field Label**: _Nickname_
2. **Identifier**: _nickname_
3. **Maximum** : _50_

:::note Technical Tip:
_**Identifiers** are important because they can be used in a [routine](/docs/documentation/automation/admin_routine) to reference the component and retrieve the response given to the survey question._
:::

---

#### iii. Date and time {#date-and-time}

<img alt="date and time" className="img_sizing item shadow--tl" src={useBaseUrl('img/tutorials/tutorial_basic_survey_07.png')} />
<br/>

1. **Field Label** : _Birthday_
2. **Identifier**: _birthday_
3. **Type**: _Date_

---

#### iv. Written answer {#written-answer-origin}

<img alt="written answer" className="img_sizing item shadow--tl" src={useBaseUrl('img/tutorials/tutorial_basic_survey_08.png')} />
<br/>

1. **Field label**: _Where are you from?_
2. **Identifier**: _hometown_

---

#### v. Multiple choice {#multiple-choice}

<img alt="text" className="img_sizing item shadow--tl" src={useBaseUrl('img/tutorials/tutorial_basic_survey_09.png')} />
<br/>

1. **Field label** : _Area or Departament_
2. **Identifier** : _area\_departament_
3. **Type**: _Collection_
4. **Collection**: _General Department_

---

#### vi. Written Answer {#written-answer-fun-fact}

<img alt="text" className="img_sizing item shadow--tl" src={useBaseUrl('img/tutorials/tutorial_basic_survey_10.png')} />
<br/>

1. **Field Label**: _Tell us a fun fact about yourself._
2. **Identifier**: _fun\_fact_

</div>
<br></br>

<div className="alert alert--secondary">

### V. Save {#save}

<img alt="save" className="img_sizing item shadow--tl" src={useBaseUrl('img/tutorials/tutorial_basic_survey_101.png')} />
<br/>

- Once finished, press <span className="badge badge--primary">Save</span>. You will be taken back to the **Survey** section.

</div>
<br></br>

## Expected Result {#result}

After completing the setup, the survey can be accessed through the _Welcome_ channel's [action button](/docs/documentation/client/actions_button#task-menus-within-channel):

<img alt="channel action button" className="img_sizing item shadow--tl" src={useBaseUrl('img/tutorials/tutorial_basic_survey_11.png')} />
<br/>

Once the action button is pressed, the survey appears in the channel workspace:

<img alt="survey channel workspace" className="img_sizing item shadow--tl" src={useBaseUrl('img/tutorials/tutorial_basic_survey_12.png')} />
<br/>

After submitting the form, it is published in the channel workspace, where other channel participants can react and respond to the shared information:

<img alt="text" className="img_sizing item shadow--tl" src={useBaseUrl('img/tutorials/tutorial_basic_survey_13.png')} />
<br/>

<div className="align-center">

<span className="hero__subtitle">Well done!</span>

<iframe src="https://giphy.com/embed/l3q2XhfQ8oCkm1Ts4" width="90%" height="90%" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/oscars-academy-awards-oscars1990-l3q2XhfQ8oCkm1Ts4">via GIPHY</a></p>

</div>
<br/>
---

## Related Topics {#related-topics}

- [Survey Overview](/docs/documentation/admin/survey/survey_overview): Administrative Panel documentation
- [COTSurvey](/docs/documentation/models/surveys/model_surveys): Survey data model
- [Survey API](/docs/documentation/api/surveys/): REST API documentation