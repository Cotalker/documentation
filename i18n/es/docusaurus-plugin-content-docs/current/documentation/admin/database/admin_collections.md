---
title: Collections (Property Types)
sidebar_label: Collections
---

:::caution Advertencia
Esta página aún no se encuentra traducida al español.
:::
import useBaseUrl from '@docusaurus/useBaseUrl';
import Highlight from '@theme/Highlight';

<span className="hero__subtitle">Settings Panel Guide</span>

_Basic collection settings_

## Create a Collection {#create-collection}
From the [Collections Panel](/docs/documentation/admin/database/admin_database_overview), press the <span className="badge badge--primary">+</span> icon to create a new _collection_. The new collection's [settings panel](#edit--create-collection) will open up.

<img alt="create collection" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_collections_01.png')} />
<br/>

## Edit a Collection {#edit-collection}
From the [Collections Panel](/docs/documentation/admin/database/admin_database_overview), press the corresponding _pen_ icon. The collection's [settings panel](#edit--create-collection) will open up.

<img alt="create collection" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_collections_02.png')} />
<br/>

<div className="alert alert--secondary">

## Settings Panel Layout {#edit--create-collection}
When creating or editing a collection, you will see this settings panel:

<img alt="collestion settings panel" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_collections_03.png')} />
<br/>

_Actions:_
- **1. Activate/Deactivate**: Activates or deactivates the collection. Deactivating the collection makes it disappear from the database and could be re-activated through an API request.
- **2. Save**: Saves the current collection settings.

_Settings:_
- [**A. General information**](#collection-settings-general): name, identification, and accessibility.
- [**B. Fields**](#fields): Add, edit, and configure _additional fields_ for all the elements in the collection.

</div>
<br/>

<div className="alert alert--secondary">

### A. General information {#collection-settings-general}

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
<div className="col col--4">The collection's unique identification name.</div>
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

### B. Fields {#fields}

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
<div className="col col--5"><em>

The `file` option has a **subtype** which can be set to `video`, `picture`, or `file`.  
The `element` option allows choosing among elements in a collection. The element **subtype** must be set to the corresponding collection.  
The `link` option will request to specify how the URL will be displayed: `embedded`, `internal` or `external`.

</em></div>
</div>
<div className="row table-row-1">
<div className="col col--3"><strong>Required</strong></div>
<div className="col col--4">Turning this toggle bar on makes it mandatory for users to fill in the Additional Field with a value when creating or editing elements within the collection.</div>
<div className="col col--5"><em>If unmarked, it will be optional to input a value in this Additional Field when creating or editing elements within the collection.</em></div>
</div>
</div>

</div>
<br/>

## About Additional Fields {#additional-fields}
### Overview {#additional-fields-overview}

An _additional field_ is a generic term for supplementary fields you can create to associate extra data within Cotalker [data models](/docs/documentation/models/overview_model). You can create them for use on _elements_, _tasks_, or _users_. To set up _additional fields_, simply create a _collection_ that will contain and relate all the _elements_ with their additional field values.

For example, suppose a company desires to store specific employee information, like address, birthday, secondary email, etcetera. In that case, they can create a _collection_ that will host the **additional fields** corresponding to the data they want to collect from their _users_. The **additional fields** will be available in the _user_ profiles, and when they are filled in with values the data gets stored in an automatically created _element_ in the _collection_ hosting the **additional fields**.

### Create Additional Fields {#creating-an-additional-fields-collection}

To create _additional fields_, create a new _collection_ or choose the one that will host the _additional fields_ and then go to the [Collection Settings Panel](/docs/documentation/admin/database/admin_collections#edit--create-collection) to set them up. 

<div className="alert alert--secondary">

<span className="hero__subtitle">Step-by-step configuration:</span>
<br/>
<br/>

1. Under the **Fields** tab, press the <span className="badge badge--primary">+ Add Field</span> button.
2. A **Field** component will appear. Pressing it will open up a settings panel.
3. Configure the [settings](/docs/documentation/admin/database/admin_collections#fields).
4. If more fields are required, press the <span className="badge badge--primary">+ Add Field</span> button again and complete the configuration.
5. Save.

<img alt="create additional fields" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_additional_fields_00.png')} />
<br/>
<br/>

:::note
- See the [Fields section in the Collection Settings Panel](#fields) for additional field settings.
- The **additional field** components can be dragged and dropped to sort them in the order you wish them to appear in the "element" settings.
:::

</div>
<br/>

### Enter Values on Additional Fields {#input-values}

Once you save the _collection_, with its _additional fields_ configured, the _additional fields_ will be available to all the _elements_ created within the _collection_ and to all other models associated with the _collection_, such as [_users_](/docs/documentation/admin/users#additional-fields), [_workflows_](/docs/documentation/admin/workflows/settings_panels/workflow_create_edit#workflow-additional-fields), or [_job titles_](/docs/documentation/admin/admin_jobtitles#create_edit_job_titles).

You can enter values directly to the _additional fields_ when creating or editing the _elements_ belonging to the _collection_. As for the models associated with the _collection_, you can input values when creating or editing the "elements" related to them. For example, the _additional fields_ associated with [_workflows_](/docs/documentation/admin/workflows/settings_panels/workflow_create_edit#workflow-additional-fields) will be available for the _tasks_ you create upon them. The [_job title additional fields_](/docs/documentation/admin/admin_jobtitles#create_edit_job_titles) will be applied to the _users_ associated with them. And [_users_](/docs/documentation/admin/users#additional-fields) directly associated with the _additional fields_ will have them available in their settings.

---

## Related Topics {#related-topics}

- [Tutorial on how to create a collection and its elements.](/docs/tutorials/basic/create_database)
- [Collections (Property Types) Data Model](/docs/documentation/models/databases/model_propertytypes)
- [Elements (Properties) Data Model](/docs/documentation/models/databases/model_properties)
