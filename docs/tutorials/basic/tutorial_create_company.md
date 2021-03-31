---
id: create_company
title: Configure Company
author: Edward Alvarado & Valentina Martinez
---
import useBaseUrl from '@docusaurus/useBaseUrl'; 

Tutorial on how to configure a _company_. For now, you can only edit a company.<br/>
Time: 7 minutes

## Business Requirements {#business-requirements}
Our mock company, _Ruanda_, has different job positions that you want to add to the software, such as:
- CEO
- head of financial control
- financial controller
- developer
- chief of cyber security
- secretary
- head of commercial division
- executive
- head of the treasury division
- accounting
- head of the marketing division
- advertiser
- head of risk control
- risk analyst
- head of human resources
- psychologist
- IT boss

They request that when a new user logs into the app for the first time, their own terms of services are displayed. And, only if necessary, access to personal information such as a contact list and location will be required.

The company resides in Chile, so its language preference is Spanish.

## Pre-Requisites {#pre-requisites}
**ACCESS ROLE**
* User with the permission *admin-company-write*, *web-admin-write* and *web-admin-read* to edit a company.
* User with the access role *read admin*.

## Steps {#steps}
1. Access the `administrator` and open `company`.
:::note The name of the mock company could be different in your tutorial session.
:::
2. Under **Features => Job categories**, add the desired job titles: just type the name of the following jobs and hit enter.
    - CEO
    - head of financial control
    - financial controller
    - developer
    - chief of cyber security
    - secretary
    - etc

:::caution Once the job title is created it will be not possible to delete or modify it.
:::
:::note Adding the first five job titles is enough for the tutorial.
:::
3. Activate the following options: *Show contact list*, *Read user's geolocation* and *Read user's contacts list*
:::note By activating theses options, when using the app from a mobile device, permission to access contacts and geolocation will be asked for.
:::
4. Add their terms of service's link (https://tos.cotalker.com/en.html) and activate the button *Show terms of service*.
5. Under **Apperance**, set the default language to Spanish.
6. Save. (The _save_ button on the upper right corner.)
:::note All changes will be saved only if the _save_ button is pressed.
:::


## Result {#result}
The changes from the previous step will look like the image:
<img alt="" src={useBaseUrl('img/tutorial_company1.png')} /> 
<img alt="" src={useBaseUrl('img/tutorial_company2.png')} /> 

