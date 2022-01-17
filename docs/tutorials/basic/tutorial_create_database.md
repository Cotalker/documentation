---
id: create_database
title: Create Database
---
import useBaseUrl from '@docusaurus/useBaseUrl'; 

<span className="hero__subtitle">

Tutorial on how to create database _collections_ and _elements_.

</span>

Time: 10 minutes

:::tip Vocabulary Note:
_Collections_ are like database tables and _elements_ are like the rows of the table. Yet they are are not bound to columns or fields, making them very flexible and adaptable to all sorts of data that needs to be stored and interacted with.
:::

## Company Requirements {#company-requirements}
Our mock company is organized in different areas, each having specific activities and needs. For example, an employee from the technology division doesn't have to attest incurred expenses while visiting a client as a field service representative would have to do.<br/>

The areas within the company are:

- board of directors
- finance
- cybersecurity
- commercial
- treasury
- risk management
- human resources
- IT

A reliable way to implement this requirement would be to create a _collection_ containing _elements_ that represent each area. This arrangement will allow you to organize interdependencies with other _elements_, _collections_, and components of the Cotalker environment (e.g. _surveys_, _users_, _tasks_).

## Tutorial Objectives {#tutorial-objectives}
- [A. Create a collection](#create-collection)
- [B. Create elements](#create-elements)


## Pre-Requistes {#pre-requistes}
#### Access Role {#access-role}
Your _user_ profile's _access role_ **must** have at least the following [permissions](/docs/documentation/admin/admin_accessrole#default-permissions): 
- `admin-access` (permission to access the Administrative Panel)
- `admin-properties-write` (permission to create _collections_ and _elements_)

:::tip Vocabulary note:
In backend vocabulary, _elements_ are referred to as _properties_ and _collections_ as _property types_.
:::


## Steps {#steps}
### A. Create Collection {#create-collection}

<div className="alert alert--secondary">

**I. Go to the Database panel.**

<img alt="database panel" className="img_sizing item shadow--tl" src={useBaseUrl('img/tutorials/tutorial_basic_database_00.png')} />
<br/>

1. From the **Main Menu Bar**, press the <span className="badge badge--primary">Administrator</span> button.
2. In the Administrative Panel, select <span className="badge badge--primary">Database</span>.
3. The **Database** panel opens up with a list existing collections.

</div>
<br></br>

<div className="alert alert--secondary">

**II. Open the Create Collection settings panel.**

<img alt="create collection" className="img_sizing item shadow--tl" src={useBaseUrl('img/tutorials/tutorial_basic_database_01.png')} />
<br/>


- Press the <span className="badge badge--primary">+</span> icon to open the **Create collection** settings panel.


</div>
<br/>

<div className="alert alert--secondary">

**III. Set up the new collection.**

<img alt="set up collection" className="img_sizing item shadow--tl" src={useBaseUrl('img/tutorials/tutorial_basic_database_02.png')} />
<br/>

_Complete the settings as indicated:_
1. **Name**: _Department_
2. **Code**: department_00
3. **Don't show this collection in the database section**: Toggle on.
4. Press <span className="badge badge--primary">Save</span>. (You will be taken back to the _collections_ list in the **Database Panel**.)

:::note Notes
- In step 2, **Code** is an identifier that must be unique and only allows lower case letters, numbers, and underscores.
- The "database section" mentioned in step 3 is accessible to some users to view collections and elements without having to enter the Administrative Panel.
:::

</div>
<br></br>


### B. Create Elements {#create-elements}

<div className="alert alert--secondary">

**I. Go to the collection's elements panel.**

<img alt="go to elements" className="img_sizing item shadow--tl" src={useBaseUrl('img/tutorials/tutorial_basic_database_03.png')} />
<br/>

- From the **Database Panel**, press the _list_ icon corresponding to the _General Departments_ collection to go to the **Elements panel**.

</div>
<br/>

<div className="alert alert--secondary">

**II. Open the Create Element settings panel.**

<img alt="create element" className="img_sizing item shadow--tl" src={useBaseUrl('img/tutorials/tutorial_basic_database_04.png')} />
<br/>

- From the **Elements Panel**, press the <span className="badge badge--primary">+</span> icon to open the **Create element** settings panel.

</div>
<br/>

<div className="alert alert--secondary">

**III. Set up the new element.**

<img alt="set up element" className="img_sizing item shadow--tl" src={useBaseUrl('img/tutorials/tutorial_basic_database_05.png')} />
<br/>

_Complete the settings as indicated:_
1. **Name**: `Board of Directors`
2. **Code**: `board_of_directors`
3. Press <span className="badge badge--primary">Save</span>. (You will be taken back to the _elements_ list.)

:::tip Remember
The **Code** must be unique.
:::

</div>
<br/>

<div className="alert alert--secondary">

**IV. Create the remaining elements.**

- Repeat the process for all company areas: 
  - board of directors
  - finance
  - cybersecurity
  - commercial
  - treasury
  - risk management
  - human resources
  - IT

:::tip Tutorial advice
Make sure to create all the elements representing company areas. We will be using them in the following tutorials.
:::

</div>
<br></br>


## Expected Results {#result}

_From the **Database Panel**, you should see the recently created _collection_ within the **Collections** table._

<img alt="result collection" className="img_sizing item shadow--tl" src={useBaseUrl('img/tutorials/tutorial_basic_database_06.png')} />
<br/>

_Within the **Department** collection, you should see all the elements you have created._

<img alt="create collection" className="img_sizing item shadow--tl" src={useBaseUrl('img/tutorials/tutorial_basic_database_07.png')} />
<br/>


<div className="align-center">

<iframe src="https://giphy.com/embed/qanrUMM3x50mA" width="480" height="311" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/chuck-norris-qanrUMM3x50mA">via GIPHY</a></p>

</div>
<br/>



-----

## Related Topics {#related-topics}
- [Database](/docs/documentation/admin/database/admin_database_overview): Administrative Panel documentation
- [COTPropertyType](/docs/documentation/models/databases/model_propertytypes): Collections data model
- [COTProperty](/docs/documentation/models/databases/model_properties): Elements data model
- [Property Types API](/docs/documentation/api/databases/property_types): Collections API documentation
- [Properties API](/docs/documentation/api/databases/properties): Elements API documentation
- [Database Section](/docs/documentation/client/database): Database viewer for non-admin users.