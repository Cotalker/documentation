---
id: admin_company
title: Company Section
sidebar_label: Company
---
import useBaseUrl from '@docusaurus/useBaseUrl'; 
import Highlight from '@theme/Highlight';

<img alt="design" class="img_sizing" src={useBaseUrl('img/design/Company.svg')} />

## Overview {#company-overview}
The _company_ represents your organization in which all your workflows, groups, databases, users, access roles, surveys, and automations exist and relate with each other. 

From the <span className="badge badge--primary">Company</span> section in the **Administration Panel**, you can create [job titles](#job-titles), edit [general](#general-information) and [billing](#billing-information) information, change some [appearance](#apperance) values of the Cotalker environment, and tweek other [features](#features) as well.


_Access the Company section from the Administrative Panel:_

<img alt="company" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_company_00.png')} />
<br/>


<!-- Waiting for PROD image -->
<!-- <img alt="settings panel" className="img_sizing_narrow item shadow--tl" src={useBaseUrl('img/admin_company_01.png')} />
<br/> -->

## Job Titles {#job-titles}
Administrators are able to create "pools" of _users_ using **job titles**. Each **job title** may have _attributes_ that are extended to the _users_.

<div className="alert alert--secondary">

### Create/Edit Job Titles {#create_edit_job_titles}

_To create or edit **job titles**, press the <span className="badge badge--primary">Job Titles</span> button in the upper righthand corner:_

<img alt="company" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_jobtitles_00.png')} />
<br/>

From the **Job Titles** settings panel, either: 

- Create a new _job title_ by press the <span className="badge badge--primary">+</span> icon:

<img alt="company" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_jobtitles_01a.png')} />
<br/>

- Edit an existing _job title_ by pressing the edit icon.

<img alt="company" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_jobtitles_01b.png')} />
<br/>

When creating or editing **job titles**, you will find the following settings panel:

<img alt="company" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_jobtitles_02.png')} />
<br/>

:::note
- The _attributes_ added to the **job title** act like [_additional fields_](/docs/documentation/admin/users#additional-fields) and are assigned to all users belonging to that **job title** along with the ones they already have.
- Just like _additional fields_, _attributes_ are selected from existing collections in the database. Go to the [Database](/docs/documentation/admin/admin_properties#creating-an-additional-fields-collection) section for more setup information.
:::

</div>
<br/>

## Field Descriptions
_Below are the settings panel's field description:_

<div className="container box">

<div className="row table-row-title">
<div className="col col--12"><b>

#### General information {#general-information}

</b></div>
</div>
<div className="row table-row-1">
<div className="col col--3"><b>Name</b>:</div>
<div className="col col--5">Company's display name.</div>
<div className="col col--4"><em></em></div>
</div>

<div className="row table-row-2">
<div className="col col--3"><b>Legal identifier</b>:</div>
<div className="col col--5"></div>
<div className="col col--4"><em></em></div>
</div>

<div className="row table-row-title">
<div className="col col--12"><b>

#### Billing information {#billing-information}

</b></div>
</div>
<div className="row table-row-1">
<div className="col col--3"><b>Legal Company name</b>:</div>
<div className="col col--5">The official name of the company.</div>
<div className="col col--4"><em></em></div>
</div>

<div className="row table-row-2">
<div className="col col--3"><b>Country</b>:</div>
<div className="col col--5">Country where the company resides.</div>
<div className="col col--4"><em></em></div>
</div>

<div className="row table-row-1">
<div className="col col--3"><b>Taxpayer ID number</b>:</div>
<div className="col col--5">For example: Employer Identification Number (EIN) in the U.S.; R.U.T. in Chile.</div>
<div className="col col--4"><em></em></div>
</div>

<div className="row table-row-title">
<div className="col col--12"><b>

#### Appearance {#apperance}

</b></div>
</div>
<div className="row table-row-2">
<div className="col col--3"><b>Default language</b>:</div>
<div className="col col--5">You can choose between English or Spanish.</div>
<div className="col col--4"><em>Determines the language sent by the server and does not depend on the device. For example, bot names will be in the chosen language.</em></div>
</div>

<div className="row table-row-1">
<div className="col col--3"><b>Email Image</b>:</div>
<div className="col col--5">Work in progress.</div>
<div className="col col--4"><em></em></div>
</div>

<div className="row table-row-title">
<div className="col col--12"><b>

#### Features {#features}

</b></div>
</div>

<div className="row table-row-2">
<div className="col col--3"><b>Show terms of service</b>:</div>
<div className="col col--5">The TOS will be displayed the first time the user enters Cotalker.</div>
<div className="col col--4"><em>When active, the TOS are taken the assigned URL. Otherwise, default Cotalker URL will be displayed.</em></div>
</div>

<div className="row table-row-1">
<div className="col col--3"><b>Terms of service's URL</b>:</div>
<div className="col col--5">The URL displayed in the Terms of Service.</div>
<div className="col col--4"><em></em></div>
</div>

<div className="row table-row-2">
<div className="col col--3"><b>Show contact list</b>:</div>
<div className="col col--5">

If active, the _contacts_ icon will appear in the **Main Menu Bar**.

</div>
<div className="col col--4"><em>If not active, you can still see other users throught previous conversations.</em></div>
</div>

<div className="row table-row-1">
<div className="col col--3"><b>Contact display mode</b>:</div>
<div className="col col--5">

Available options: _All company users_, _All users with whom you have activities in Cotalker_, and _All the users with whom you have activities in Cotalker and the colleagues that you have in your contacts_.

</div>
<div className="col col--4"><em>

This option will limit users' ability to see other users in their contact lists, and other places, like surveys where **user lists** are used as options for answering survey questions.

</em></div>
</div>

<div className="row table-row-2">
<div className="col col--3"><b>Read user's contacts list</b>:</div>
<div className="col col--5">Ask the user if the application can access their contacts.</div>
<div className="col col--4"><em>For mobile Users.</em></div>
</div>

<div className="row table-row-1">
<div className="col col--3"><b>Read user's geolocation</b>:</div>
<div className="col col--5">Ask the user if the application can access their geolocation.</div>
<div className="col col--4"><em>For mobile Users.</em></div>
</div>

<div className="row table-row-2">
<div className="col col--3"><b>Initial section</b></div>
<div className="col col--5">Enables to force starting the session from a specific group.</div>
<div className="col col--4"><em>Only groups in the Main Menu Bar are available.</em></div>
</div>

<div className="row table-row-1">
<div className="col col--3"><b>News properties' categories</b>:</div>
<div className="col col--5">Work in progress.</div>
<div className="col col--4"><em></em></div>
</div>

</div>