---
id: configure_company
title: Configure Company Basics
author: Edward Alvarado & Valentina Martinez
---
import useBaseUrl from '@docusaurus/useBaseUrl';
import Highlight from '@theme/Highlight'; 

Tutorial on how to set up basic _company_ settings. 

Time: 7 minutes

:::tip Vocabulary note:
- In the [_Administrative Panel_](/docs/documentation/admin/admin_overview#layout), the **company** subdivision has three sections: [_Users_](/docs/documentation/admin/users), [_Job titles_](/docs/documentation/admin/admin_jobtitles), and [_Configuration_](/docs/documentation/admin/admin_company).
- In other parts of the documentation, we refer to a [**company**](/docs/documentation/models/model_company) as a data model that represents the business or organization and unites all other data models.
:::

## Company Requirements {#company-requirements}
#### Tutorial Objectives {#tutorial-objectives}

As mentioned in the [Overview](../tutorial_overview), we will be working with a make-believe company called _Ruanda_ for this tutorial. The company's first requirements are described below:

[**A. Change basic company settings**](#change-company-settings): The company resides in Chile, but they work oversees, so its language preference should be set to English.

[**B. Create _job titles_**](#create-job-titles): They have the following job positions that need to be integrated:
  - CEO
  - finance manager
  - project manager
  - customer success manager
  - secretary
  - accounting
  - marketing analyst
  - field service representative
  - human resources manager
  - IT manager


## Pre-Requisites {#pre-requisites}
For simplicity's sake, use a [_User_](/docs/documentation/admin/users) account with an [_access role_](/docs/documentation/admin/admin_accessrole) containing the `admin-*-write` permission.  
:::caution  
The `admin-*-write` permission enables writing in the entire **Administrative Panel**. Use with caution.  
:::  
:::tip
- If you do not have this permission, ask your admin for help.
- Below, you can see (1) an image of a [user's settings](/docs/documentation/admin/users#user-settings-panel) highlighting their access roles, then (2) an image of the [access role's   settings](/docs/documentation/admin/admin_accessrole#edit--create-single-access-role) indicating the permissions associated with it.

<img alt="permissions" className="img_sizing item shadow--tl"   src={useBaseUrl('img/tutorials/tutorial_basic_company_00.png')  } />
<br/>
:::

## Steps {#steps}
### A. Change Basic Company Settings {#change-company-settings}

<div className="alert alert--secondary">

**I. Go to the Company Settings Panel.**

<img alt="access company" className="img_sizing item shadow--tl" src={useBaseUrl('img/tutorials/tutorial_basic_company_01.png')} /> 
<br/>

1. From the **Main Menu Bar**, press <span className="badge badge--primary">Administrator</span> button.
2. In the Administrative Panel, select <span className="badge badge--primary">Configuration</span>.
3. The [_Company Settings Panel_](/docs/documentation/admin/admin_company) opens up.

:::note 
_The mock company settings could be different in your tutorial session._
:::

</div>
<br/>

<div className="alert alert--secondary">

**II. Change the company settings.** 

<img className="img_sizing item shadow--tl" alt="edit company" src={useBaseUrl('img/tutorials/tutorial_basic_company_02.png')} /> 
<br/>

1. Open the <span className="badge badge--primary">Billing information</span> tab.
2. Set the _country_ to _Chile_.
3. Open the <span className="badge badge--primary">Appearance</span> tab.
4. Set the _language_ to _English_. 

:::note
In general, the Cotalker platform is displayed in the language of the navegation browser it is being used on. The _language_ option in the _company settings_ sets the language used for certain variables, such as bots.
:::

</div>
<br/>

<div className="alert alert--secondary">

**III. Save the current changes.**

<img className="img_sizing item shadow--tl" alt="save company" src={useBaseUrl('img/tutorials/tutorial_basic_company_03.png')} /> 
<br/>

Press the <span className="badge badge--primary">Save</span> button on the upper right-hand corner.

:::caution 
_Don't leave the settings panel without saving. All changes will be lost if not saved before leaving._
:::

:::tip
Feel free to play around with the settings and save a different company configuration.
:::

</div>
<br/>


### B. Create Job Titles {#create-job-titles}

<div className="alert alert--secondary">

**I. Go to the Job Titles section.**

<img className="img_sizing item shadow--tl" alt="access job titles" src={useBaseUrl('img/tutorials/tutorial_basic_company_04.png')} /> 
<br/>

1. From the **Main Menu Bar**, press <span className="badge badge--primary">Administrator</span> button.
2. In the Administrative Panel, select <span className="badge badge--primary">Job titles</span>.
3. The [_Job Titles Sections_](/docs/documentation/admin/admin_jobtitles) opens up.

</div>
<br/>

<div className="alert alert--secondary">

**II. Open a Job Titles Settings Panel.**

<img className="img_sizing item shadow--tl" alt="open job titles settings panel" src={useBaseUrl('img/tutorials/tutorial_basic_company_05.png')} /> 
<br/>

To open the _job titles settings panel_, press the <span className="badge badge--primary">+</span> icon in the upper right-hand corner.

</div>
<br/>

<div className="alert alert--secondary">

**III. Set up and Save New Job Title.**

<img className="img_sizing item shadow--tl" alt="save job titles" src={useBaseUrl('img/tutorials/tutorial_basic_company_06.png')} /> 
<br/>

From the _Job Titles settings panel_,

1. Enter the job title's **name**. This is the name will be viewed by other users.
2. Enter the job title's **code**. This code must be unique and will be used by the system to identify the job title.
3. Save when done.

</div>
<br/>

<div className="alert alert--secondary">

**IV. Repeat.**

Repeat the procedure with the remaining job titles until done.

:::tip
Feel free to add more or less job titles.
:::

</div>
<br/>

## Expected Results {#expected-results}

A. When finished, your company configuration should look something like this:

<img className="img_sizing item shadow--tl" alt="check company settings" src={useBaseUrl('img/tutorials/tutorial_basic_company_07.png')} /> 
<br/>

B. Your _Job titles_ section should be similar to the image below.

<img className="img_sizing item shadow--tl" alt="check job titles" src={useBaseUrl('img/tutorials/tutorial_basic_company_08.png')} /> 
<br/>

---

## Related Topics {#related-topics}
- [Company configuration](/docs/documentation/admin/admin_company): Administrative Panel documentation
- [Job titles](/docs/documentation/admin/admin_jobtitles): Administrative Panel documentation