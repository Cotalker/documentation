---
title: Database Panel
sidebar_label: Database
---
import useBaseUrl from '@docusaurus/useBaseUrl';
import Highlight from '@theme/Highlight';

<img alt="design" class="img_sizing" src={useBaseUrl('img/design/Database.svg')} />
<br/>

## Overview {#database-overview}

The _Database_ panel is a registry of all the _collections_ found in your company's Cotalker environment. _Collections_ contain data in the form of _elements_. 

_Collections_ can be thought of as database tables and can determine the table columns, while elements can be considered the items that make up the rows of the table. Yet, the versatility of _collections_ and _elements_ can expand the limits of tabular data and should be considered within the scopes of a non-relational database.

_Elements_ can represent almost anything and are flexible enough to store all types of information.
They can be used to establish a relationship or define something. That's why you can use _elements_ sometimes as a resource and others as an asset.

For example, you can associate an _element_ with a [_user_](/docs/documentation/admin/users). In this case, you could send a message to all the _users_ who have the "Team A" _element_ associated to them. 

You can also use [_additional fields_](/docs/documentation/admin/database/admin_collections#additional-fields) to add more information to your _elements_. The fields are created through a _collection_ and applied to all its _elements_. Then each _element_ can assign a value to its additional fields.

Furthermore, [_workflows_ use _elements_ to define their states](/docs/documentation/admin/workflows/settings_panels/create_edit_state#how-to-create-a-state). For example, let's say a _workflow_ has to have a "backlog", "doing", "done", and "unable to complete" _state_. You must first create a _collection_ containing _elements_ that represent the before-mentioned _states_ and then associate the _collection_ with the _workflow_.

_Elements_ can also be associated with other _elements_, creating a chain or hierarchy of parent and child _elements_.

As you can see, the versatility of _collections_ and their _elements_ is quite significant.

:::tip
At the backend level of Cotalker, _collections_ are called [property types](/docs/documentation/models/databases/model_propertytypes), and _elements_ are known as [properties](/docs/documentation/models/databases/model_properties).
:::

<br/>


## Accessing the Database Panel {#accessing}
To access the the <span className="badge badge--primary">Database</span> section:

<img alt="Database" class="img_sizing item shadow--tl" src={useBaseUrl('img/admin_database_section_00.png')} />
<br/>

1. Press the <span className="badge badge--primary">Administrator</span> in the **Main Menu Bar**.
2. Select <span className="badge badge--primary">Database</span> from the **Administrative Panel**.
3. The [**Collections Panel**](#collections-layout) will open up.

<br/>

## Collections {#collections}

<div className="alert alert--secondary">

### Collections Panel Layout {#collections-layout}
Once inside the <span class="badge badge--primary">Database</span> panel in the **Administrative Panel**, you can find the entire list of _collections_ that have been created in the _company_. From this panel, you can also create and edit _collections_.

<img alt="collections list" class="img_sizing item shadow--tl" src={useBaseUrl('img/admin_collections_00.png')} />
<br/>
<br/>

_Actions:_
- **1. [Create collection](#create-collection)**: Create a new collection within the database.
- **2. Find collection**: Search through the database to find a collection.

_Table Display and Options:_
- **A. Name**: Display name.
- **B. Code**: Identification code.
- **C. Last modified**: Last time the collection was edited.
- **D. Elements | Edit**: Options for either [viewing the collection's elements](#elements) or [editing the collection's settings](#edit-collection).

</div>
<br/>

### Creating a Collection {#create-collection}
Pressing the <span class="badge badge--primary">+</span> icon will create a new _collection_ and bring you to the new collection's [settings panel](#edit--create-collection).

<img alt="create collection" class="img_sizing item shadow--tl" src={useBaseUrl('img/admin_collections_01.png')} />
<br/>

### Editing a Collection {#edit-collection}
To edit an existing collection, press the corresponding _pen_ icon. The collection's [settings panel](#edit--create-collection) will open up.

<img alt="create collection" class="img_sizing item shadow--tl" src={useBaseUrl('img/admin_collections_02.png')} />
<br/>

<div className="alert alert--secondary">

### Collection Settings Panel Layout {#edit--create-collection}
When creating or editing a collection, you will see this settings panel:

<img alt="collestion settings panel" class="img_sizing item shadow--tl" src={useBaseUrl('img/admin_collections_03.png')} />
<br/>

_Actions:_
- **1. Activate/Deactivate**: Activates or deactivates the collection. Deactivating the collection makes it disappear from the database and could be re-activated through an API request.
- **2. Save**: Saves the current collection settings.

_Settings:_
- [**A. General information**](#collection-settings-general): name, identification, and accesibility.
- [**B. Fields**](#fields): Add, edit, and configure _additional fields_ for all the elements in the collection.

</div>
<br/>

<div className="alert alert--secondary">

#### A. General information {#collection-settings-general}

<img alt="general info" className="img_sizing item shadow--tl" src={useBaseUrl('/img/admin_collections_04.png')} />
<br/>

<div className="container box">

<div className="row table-row-1">
<div className="col col--3"><strong>Name</strong></div>
<div className="col col--4">The display name of the collection.</div>
<div className="col col--5"><em>It doesn't have to be unique, but it is recommended. Any character can be used.</em></div>
</div>

<div className="row table-row-2">
<div className="col col--3"><strong>Code</strong></div>
<div className="col col--4">The identifier of the collection.</div>
<div className="col col--5"><em>

Only lowercase letters, numbers, and underscores are accepted. The _code_ must start with a letter. Once you create and save the collection, you cannot change the _code_.

</em></div>
</div>

<div className="row table-row-1">
<div className="col col--3"><strong>Don't show this collection in the database section</strong></div>
<div className="col col--4">

Toggling the bar off makes the collection available in the [Database section](/docs/documentation/client/database).

</div>
<div className="col col--5"><em>

If off, authorized non-admin-users will be able to view the collections and their data through the [Database section's](/docs/documentation/client/database) user-friendly interface.

</em></div>
</div>

</div>

</div>
<br/>

<div className="alert alert--secondary">

#### B. Fields {#fields}

<img alt="fields" className="img_sizing item shadow--tl" src={useBaseUrl('/img/admin_collections_05.png')} />
<br/>

<div className="container box">
<div className="row table-row-1">
<div className="col col--3"><strong>+ Add Field</strong></div>
<div className="col col--4">Opens the settings to configure a new additional field for the elements in the collection.</div>
<div className="col col--5"><em>

More details about [creating additional fields](#additional-fields) are explained below.

</em>
</div>
</div>
<div className="row table-row-2">
<div className="col col--3"><strong>Code</strong></div>
<div className="col col--4">This is the unique code that identifies the Additional Field.</div>
<div className="col col--5"><em>Only lowercase letters, numbers, and underscores are permitted.</em></div>
</div>
<div className="row table-row-1">
<div className="col col--3"><strong>Name</strong></div>
<div className="col col--4">The Additional Field's name that will be visible to users.</div>
<div className="col col--5"><em>The default is set to "Field". It doesn't have to be unique and can use any characters.</em></div>
</div>
<div className="row table-row-2">
<div className="col col--3"><strong>Description</strong></div>
<div className="col col--4">Describes the Additional Field. For internal use only.</div>
<div className="col col--5"><em>It is not required to add a description.</em></div>
</div>
<div className="row table-row-1">
<div className="col col--3"><strong>Array</strong></div>
<div className="col col--4">This toggle bar sets the Additional Field into an array.</div>
<div className="col col--5"><em>By switching it on, you can set the minimum and maximum number of elements in the array.</em></div>
</div>
<div className="row table-row-2">
<div className="col col--3"><strong>Type</strong></div>
<div className="col col--4">Designates the type or format of the data that will be inserted in the Additional Field. Options include: string, number, date, boolean, link, file, element, and user. </div>
<div className="col col--5"><em>The "file" option has a subtype which can be set to "video", "picture", or "file". The "element" option can be set to any collection stored in the database. If the collections are not seen in the subtype dropdown menu, you can start typing the name of the collection and it will shortly display itself along with any other similarly named collections. The "link" option will request to specify how the URL will be displayed: embedded, internal or external.</em></div>
</div>
<div className="row table-row-1">
<div className="col col--3"><strong>Required</strong></div>
<div className="col col--4">Turning this toggle bar on makes it mandatory for users to fill in the Additional Field with a value when creating or editing elements within the collection.</div>
<div className="col col--5"><em>If unmarked, it will be optional to input a value in this Additional Field when creating or editing elements within the collection.</em></div>
</div>
</div>

</div>
<br/>


## Elements {#elements}

### Elements List {#elements-list}
From the _collections list_, by clicking on an individual _collection_, this settings panel opens up, where you can find the list of that collection's _elements_.

<img alt="" class="img_sizing item shadow--tl" src={useBaseUrl('img/admin_element.png')} />
<br/>
<br/>

_The information shown in the table shown above is as follows:_
- **Name**: Element's display name.
- **Code**: Element's code name.
- **Number of sub-elements**: Element's amount of child elements.
- **Last modified**: Last time the element was edited.

:::note
The descriptions of the icons are in the [Overview section](admin_overview).
:::

### Edit / Create Element {#edit--create-element}
From within a _collection's_ settings panel you can create a new _element_ by pressing the <span class="badge badge--primary">+</span> icon. This will open up the following section, where you can edit or create a single _element_.

<img alt="edit/create element" class="img_sizing item shadow--tl" src={useBaseUrl('img/admin_element_create.png')} />
<br/><br/>

_Below, you will find the description and notes for each field of the **Create element** settings panel shown above._

| Field | Description | Notes |
| ---- | ----------- | ----- |
| Name | The visual name of the element. | It doesn't have to be unique. |
| Code | The identifier of the element. | Only lowercase letters, numbers, and underscores are accepted. The _code_ must start with a letter. Once you create and save the collection, you cannot change the _code_. |
| Collection | The collection the element belongs to. | Automatically fills |
| Elements | Element Addition | Add the collection and element. The element that the sub-element is being added to, will become the parent element.|
| Attributes | Adicional field | Add a name and value for the new field. |

<br/><br/>

---

## About Additional Fields {#additional-fields}
### Overview {#additional-fields-overview}

An _additional field_ is a generic term for supplementary fields you can create to associate extra data within Cotalker [data models](/docs/documentation/models/overview_model). You can use them on _elements_, _tasks_, _users_, or _job titles_. To set up _additional fields_, create a _collection_ that will contain and relate all the _elements_ with their additional field values.

For example, suppose a company desires to store specific employee information, like address, birthday, secondary email, etcetera. In that case, they can create a _collection_ that will host the **additional fields** corresponding to the data they want to collect from their _users_. When the **additional fields** are filled in with values in one of the _user_ profiles, the data gets stored in an automatically created _element_ in the _collection_ hosting the **additional fields**.

### Create Additional Fields {#creating-an-additional-fields-collection}

To create _additional fields_, create a new _collection_ or choose the one that will host the _additional fields_ and then go to the [Collection Settings Panel](/docs/documentation/admin/admin_properties#edit--create-collection) to set them up. 

<div className="alert alert--secondary">

<span className="hero__subtitle">Step-by-step configuration:</span>
<br/>
<br/>

1. Under the **Fields** tab, press the <span class="badge badge--primary">+ Add Field</span> button.
2. A **Field** component will appear. Pressing it will open up a settings panel.
3. Configure the settings.
4. If more fields are required, press the <span class="badge badge--primary">+ Add Field</span> button again and complete the configuration.
5. Save.

<img alt="create additional fields" class="img_sizing item shadow--tl" src={useBaseUrl('img/admin_additional_fields_00.png')} />
<br/>

:::note
The **additional field** components can be dragged and dropped to sort them in the order you wish them to appear in the "element" settings.
:::

</div>
<br/>

### Enter Values on Additional Fields {#input-values}

Once you save the _collection_, with its _additional fields_ configured, the _additional fields_ will be available to all the _elements_ created within the _collection_ and to all other models associated with the _collection_, such as [_users_](/docs/documentation/admin/users#additional-fields), [_workflows_](/docs/documentation/admin/workflows/settings_panels/workflow_create_edit#workflow-additional-fields), or [_job titles_](/docs/documentation/admin/admin_jobtitles#create_edit_job_titles).

You can enter values directly to the _additional fields_ when creating or editing the _elements_ belonging to the _collection_. As for the models associated with the _collection_, you can input values when creating or editing the "elements" related to them. For example, the _additional fields_ associated with [_workflows_](/docs/documentation/admin/workflows/settings_panels/workflow_create_edit#workflow-additional-fields) will be available for the _tasks_ you create upon them. The [_job title additional fields_](/docs/documentation/admin/admin_jobtitles#create_edit_job_titles) will be applied to the _users_ associated with them. And [_users_](/docs/documentation/admin/users#additional-fields) directly associated with the _additional fields_ will have them available in their settings.

---

## Best Practices {#best-practices}
### Adding Extra Information to Elements {#adding-fields-globally}
When additional information needs to be added to _elements_, the [**additional fields**](/docs/documentation/admin/database/admin_collections#additional-fields) feature should be used. **Additional fields** serve as columns of database tables, which allows your information to be well organized and makes it easier to search through.

Avoid using the **additional attributes** option to add information on _elements_. **Additional attributes** for _elements_ are only used on legacy systems. The **additional attributes** that are added affect only individual _elements_, unlike **additional fields**, which create the fields in all the _elements_ in the _collection_.

_Prefer **Additional fields**(A) over **Additional attributes**(B):_
<img alt="element settings" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_properties_bestpractices_00.png')} />