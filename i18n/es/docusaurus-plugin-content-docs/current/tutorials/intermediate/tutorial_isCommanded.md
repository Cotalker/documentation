---
id: isCommanded
title: Setup is Commanded
author: Valentina Martinez
---
import useBaseUrl from '@docusaurus/useBaseUrl'; 

## Company Requests {#company-requests}
Ruanda Company have a little problem with the task manager that have been shown before. It is that for technical areas of the company, would like to have another field called *difficulty rating* (number field), however, it isn´t necessary for the other department to show it.<br/>
So Cotalker offer a dynamic survey, where the answer of the department will be filter the the field.

## Functional Request {#functional-request}
**Access Role**
* User with the permission `admin-statemachines-write`, `admin-bots-write`, `admin-properties-write` and `admin-groups-write` to create and modify state machine, bot, proeperty and group. 
* Or`admin-*-write` which allows all above. 
* User with the permissions `web-admin-write` and `web-admin-read` to set up in the admin.
* User with the access role `read admin`.

**Survey**
* Having completed the [Survey that trigger a State Machine Tutorial](create_survey_sm).

## Step {#step}
1. Access the `administrator` and open `Survey`
2. Look for the *Task Creator* survey and press it.
3. Drag the `Written Answer` component to the form template:
    * `Field Label`: *Difficulty Rating*.
    * `Input Type`: *Number*
    * `Identifier` : *ratingtask*.
    * Press `Conditional Display`:
        * `Commander`: *departamenttask*
        * `Criteria`: *Regular expression*
        * `Value`: *(cybersecurity)|(it)*
4. Save
    
## Result {#result}

The result must be seen like the following picture:
* When Cybersecurity or IT is selected:
<img alt="" src={useBaseUrl('img/iscommanded_not.png')} /> 


* When another area is selected:
<img alt="" src={useBaseUrl('img/iscommanded_yes.png')} /> 