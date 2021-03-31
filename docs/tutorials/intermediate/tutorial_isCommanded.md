---
id: isCommanded
title: Dynamic Survey
author: Valentina Martinez
---
import useBaseUrl from '@docusaurus/useBaseUrl'; 

Tutorial on using the _conditional display_ option to make a dynamic survey.

Time: 10 minutes

## Company Requirements {#company-requirements}
Our mock company, Ruanda, has a little problem with the task manager shown previously. The company's technical areas would like to have another field in the survey called *difficulty rating* (number field), but it isn´t necessary for the other departments.<br/>
We will now work to offer a dynamic survey, where the user's department will act as a filter for opening other fields.

## Pre-Requistes {#pre-requisites}
#### Access Role
* _User_ with the `admin-statemachines-write`, `admin-bots-write`, `admin-properties-write`, and `admin-groups-write` permissions to create and modify workflows, bots, elements, and groups. 
* Or`admin-*-write` which allows all of the above. 
* User with the `read admin` access role.

#### Survey
* Having completed the [Survey that Starts a Workflow Tutorial](create_survey_sm).


## Steps {#steps}

<div class="alert alert--secondary">

1. Access the <span class="badge badge--primary">Administrator</span> and open <span class="badge badge--primary">Surveys</span>.

</div>
<br/>

<div class="alert alert--secondary">

2. Look for the **Task Creator** survey and open it.

:::note
This survey was created in the [Survey that Starts a Workflow Tutorial](create_survey_sm).
:::

</div>
<br/>

<div class="alert alert--secondary">

3. From the <span class="badge badge--primary">Components</span> column, drag and drop the <span class="badge badge--warning">Written Answer</span> component to the _form template_. and set the options according to the next steps.

</div>
<br/>

<div class="alert alert--secondary">

4. In the **General** tab, set following options:
    - **Field Label**: `Difficulty Rating`
    - **Input Type**: `Number`
    - **Identifier** : `ratingtask`

</div>
<br/>

<div class="alert alert--secondary">

5. Select the **Conditional Display** tab and set the following options:
    - **Commander**: `departamenttask`
    - **Criteria**: `Regular expression`
    - **Value**: `(cybersecurity)|(it)`

</div>
<br/>

<div class="alert alert--secondary">

6. Press <span class="badge badge--primary">Save</span>.

</div>
<br/>


<div class="hero shadow--lw">
<div class="container">
<h1 class="hero__title">Well done!</h1>
<p class="hero__subtitle">

Now let's head to the _Task Manager_ workflow group and create a new task with the survey button to see what happens...

</p>

<br/>
<div>
</div>
</div>
</div>




## Result {#result}

Once you call the survey, the form will look something like images below. Depending on whether or not you selected the Cybersecurity or IT departments, the Difficulty rating field will appear.

<img alt="result" class="img_sizing item shadow--tl" src={useBaseUrl('img/tutorial_intermediate_isCommand_result.png')} /> 
