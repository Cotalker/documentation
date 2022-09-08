---
title: Job Titles
---

:::caution Advertencia
Esta página aún no se encuentra traducida al español.
:::

import useBaseUrl from '@docusaurus/useBaseUrl';

<img alt="design" className="img_title" src={useBaseUrl('img/design/Groups_and_Channels.svg')} />
<br/>


## Overview {#overview}

Administrators are able to create "pools" of _users_ using **job titles**. Each **job title** can have [_attributes_](#attributes), [_access roles_](#access-roles), and [_elements_](#elements) extended to the associated [_users_](/docs/documentation/admin/users). 


## Accessing the Job Titles Section {#access}

_To access the **Job Titles** section:_

<img alt="company" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_jobtitles_00.png')} />
<br/>

1. Press <span className="badge badge--primary">Administrator</span> in the **Main Menu Bar**.
2. Select <span className="badge badge--info">Job Titles</span> from the **Administrative Panel**.
3. The **Job Titles** panel will open up.

<div className="alert alert--secondary">

## Job Titles Panel Layout {#layout}

<img alt="job title" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_jobtitles_01.png')} />
<br/>

<div className="margin margin-left--lg">

_Actions:_
- [**1. Create Job Title**](#create_edit_job_titles): Opens the settings panel to create a new _job title_.
- **2. Search**: Opens a search bar for finding _job titles_ by name.
- **3. More Options**: Allows viewing disabled _job titles_.

_Table and Options:_
- **A. Name**: The name of the _job title_.
- **B. Code**: The _job title's_ identification code.
- **C. Last modified**: Indicates the last time the _job title_ was modified.
- [**D. Edit**](#create_edit_job_titles): Opens the _settings panel_ so the _job title_ can be edited.

</div>

</div>
<br/>

## Create/Edit Job Titles {#create_edit_job_titles}

From the **Job Titles** settings panel, either: 

- Create a new _job title_ by pressing the <span className="badge badge--secondary">+</span> icon:

<img alt="company" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_jobtitles_01a.png')} />
<br/>

- Edit an existing _job title_ by pressing the edit icon.

<img alt="company" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_jobtitles_01b.png')} />
<br/>

After choosing to create or edit a _job title_, the **Settings Panel** opens up. 

_The **Settings Panel** is described below:_

<div className="alert alert--secondary">

## Settings Panel Layout {#layout}

<img alt="job title" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_jobtitles_02.png')} />
<br/>

<div className="margin margin-left--lg">

_Actions:_
- **1. Activate/Deactivate**: Deactivates or activates the current _job title_.
- **2. Save**: Saves the current changes made to the _job title_.

_Table and Options:_
- [**A. General information**](#general-information): Basic identifications settings.
- [**B. Attributes**](#attributes): Sets _collections_ to be used as additional fields on associated users.
- [**C. Access Roles**](#access-roles): Indicates the _access roles_ included with the _job title_ and shared with associated users.
- [**D. Elements**](#elements): Indicates the _elements_ included with the _job title_ and shared with associated users.

</div>

</div>
<br/>

<div className="alert alert--secondary">

### A. General information {#general-information}

<img alt="job title" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_jobtitles_02a.png')} />
<br/>

<div className="container box">
<div className="row table-row-1">
<div className="col col--3"><b>Name</b></div>
<div className="col col--5">The job title's displayed name. This is a required field.</div>
<div className="col col--4"><em>Use any characters.</em></div>
</div>
<div className="row table-row-2">
<div className="col col--3"><b>Code</b></div>
<div className="col col--5">Indicates the job title's identification code. This is a required field.</div>
<div className="col col--4"><em>Use only lowecase letters, numbers, and underscores. Must begin with a letter.</em></div>
</div>
</div>

</div>
<br/>



<div className="alert alert--secondary">

### B. Attributes {#attributes}

<img alt="job title" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_jobtitles_02b.png')} />
<br/>

<div className="container box">
<div className="row table-row-1">
<div className="col col--3"><b>Additional fields</b></div>
<div className="col col--5">

The _attributes_ added to the **job title** act like [_additional fields_](/docs/documentation/admin/users#additional-fields) and are assigned to all users belonging to that **job title** along with the ones they already have.

</div>
<div className="col col--4"><em>

Just like _additional fields_, _attributes_ are selected from existing collections in the database. Go to the [Database](/docs/documentation/admin/database/admin_collections#additional-fields) panel for more setup information.

</em></div>
</div>
</div>

</div>
<br/>


<div className="alert alert--secondary">

### C. Access Roles {#access-roles}

<img alt="job title" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_jobtitles_02c.png')} />
<br/>

<div className="container box">
<div className="row table-row-1">
<div className="col col--3"><b>Access Roles</b></div>
<div className="col col--5">

Contains the [access roles](/docs/documentation/admin/admin_accessrole) that are shared with all [users](/docs/documentation/admin/users#access) associated with the job title. These _access roles_ cannot be removed from a user profile while the _user_ is associated with the _job title_.

</div>
<div className="col col--4"><em>Individual users can also obtain other access roles along with those shared through the job title.</em></div>
</div>
</div>

</div>
<br/>


<div className="alert alert--secondary">

### D. Elements {#elements}

<img alt="job title" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_jobtitles_02d.png')} />
<br/>

<div className="container box">
<div className="row table-row-1">
<div className="col col--3"><b>+ Add Element</b></div>
<div className="col col--5">

Opens the dialog boxes for adding [database elements with their respective collections](/docs/documentation/admin/database/admin_database_overview).

</div>
<div className="col col--4"><em>

Elements can be used for sorting and granting [users](/docs/documentation/admin/users#elements) certain permissions.

</em></div>
</div>
<div className="row table-row-2">
<div className="col col--3"><b>Collection</b></div>
<div className="col col--5">

A collection which holds the elements that are shared among [users](/docs/documentation/admin/users#elements) with the job title.

</div>
<div className="col col--4"><em>

If another collection is needed, press the **+ Add Element** button.

</em></div>
</div>
<div className="row table-row-1">
<div className="col col--3"><b>Elements</b></div>
<div className="col col--5">

The _elements_ of a _collection_ to be shared among [users](/docs/documentation/admin/users#elements) associated with the _job title_. These _elements_ cannot be removed from a user profile while the _user_ is associated with the _job title_.

</div>
<div className="col col--4"><em>

Press **+ Add Element** if elements from another collection are needed.

</em></div>
</div>
</div>

</div>
<br/>

## Related Topics {#related-topics}

- [COTJobTitle data model documentation.](/docs/documentation/models/users/model_jobtitles)
- ["Job Titles" REST API documentation](/docs/documentation/api/users/jobtitles)
- [User Admin Documentation](/docs/documentation/admin/users)

