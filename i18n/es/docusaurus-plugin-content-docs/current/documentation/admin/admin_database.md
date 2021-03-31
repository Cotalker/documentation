---
id: admin_properties
title: Database Section
sidebar_label: Database
---
import useBaseUrl from '@docusaurus/useBaseUrl';
import Highlight from '@theme/Highlight';


## Database Overview {#database-overview}

<img alt="Database" class="img_sizing item shadow--tl" src={useBaseUrl('img/admin_database_00.png')} />
<br/>
<br/>

The _Database_ is information set up in _collections_. And each _collection_ can be composed with specific and unique _elements_.

_Elements_ are used to establish a relationship or define something. That's why you can use _elements_ sometimes as a resource and others as an asset.

For example, you can send a specific text to all the _users_ who have the "Special Message" _element_. Since each _user_ is simply a _collection_, you can add _elements_ to them. You can see in the [Users Section](/docs/documentation/admin/users) how to add elements to an individual _user_.

Additionally, _workflows_ use _elements_ to define their states. In the image of the [Overview section](admin_overview), "Headquarters Review", "CEOs Reviews", "Management Review", "Rejected Requests", and "Accepted Requests" are all _elements_ in the _workflow collection_.

As you can see, the versatility of _elements_ is quite significant.

## Collection {#collection}

### Collections List {#collections-list}
Once inside the <span class="badge badge--primary">Database</span> option in the _Administrative Panel_, you can find the entire list of _collections_ that have been created.

<img alt="collections list" class="img_sizing item shadow--tl" src={useBaseUrl('img/admin_collection.png')} />
<br/><br/>

_The information shown in the table columns of the image above is as follows:_
- **Name**: Collection visual name.
- **Code**: Collection code
- **Last modified**: Last time the collection was edited.

:::note
The descriptions of the icons are in the [Overview section](admin_overview).
:::

### Edit / Create Collection {#edit--create-collection}
Pressing the <span class="badge badge--primary">+</span> icon will create a new _collection_ and bring you to the following settings panel, where you can edit or create a single _collection_.

<img alt="" class="img_sizing item shadow--tl" src={useBaseUrl('img/admin_collection_create.png')} />
<br />
<br />

_Below you will find the description and notes for each field in the **Create collection** settings panel shown above._

| Field | Description | Notes |
| ---- | ----------- | ----- |
| Name | The visual name of the collection | It doesn't have to be unique. |
| Code | The identifier of the collection | It only accepts lowercase letter, numbers, and underscore; and it must start with a letter. Once you create and save the collection, you cannot change it.|

<br/><br/>

## Elements {#elements}

### Elements List {#elements-list}
From the _collections list_, by clicking on an individual _collection_, this settings panel opens up, where you can find the list of that collection's _elements_.

<img alt="" class="img_sizing item shadow--tl" src={useBaseUrl('img/admin_element.png')} />
<br/>
<br/>

_The information shown in the table shown above is as follows:_
- **Name**: Element visual name.
- **Code**: Element code
- **Number of subelements**: How many son element, the element has.
- **Last modified**: Last time the element was edited.

:::note
The descriptions of the icons are in the [Overview section](admin_overview).
:::

### Edit / Create Element {#edit--create-element}
From within a _collection's_ settings panel you can create a new _element_ by pressing the <span class="badge badge--primary">+</span> icon. This will open up the following section, where you can edit or create a single _element_.

<img alt="edit/create element" class="img_sizing item shadow--tl" src={useBaseUrl('img/admin_element_create.png')} />
<br/><br/>

_Below you will find the description and notes for each field of the **Create element** settings panel shown above._

| Field | Description | Notes |
| ---- | ----------- | ----- |
| Name | The visual name of the element | It doesn't have to be unique. |
| Code | The identifier of the element | It only accepts lowercase letters, numbers, and underscore; and it must start with a letter. Once you create and save the element, you cannot change it.|
| Collection | The collection the element belongs to. | Automatically fills |
| Elements | Element Addition | Add the collection and element. The element that the sub-element is being added to, will become the parent element.|
| Attributes | Adicional field | Add a name and value for the new field |

<br/><br/>

## Download Collection {#download-collection}

You can download the _elements_ of a _collection_ only in CSV format. The encoding field options are _Windows_, _Macintosh_ and _UTF-8_.

<br />
<img alt="download collection" class="img_sizing item shadow--tl" src={useBaseUrl('img/admin_element_download.png')} />
<br />
<br />



:::note
- The encoding field is currently disabled.
- The descriptions of the icons are in the [Overview section](admin_overview).
:::

<br/><br/>

## Import Collection {#import-collection}

You can import an _element_ list to a _collection_ in CSV format. The encoding field options are _Windows_, _Macintosh_ and _UTF-8_.

<img alt="import collection" class="img_sizing item shadow--tl" src={useBaseUrl('img/admin_element_import.png')} />
<br />
<br />

:::note
The descriptions of the icons are in the [Overview section](admin_overview).
:::

<br/><br/>

## Additional Fields {#additional-fields}

**Additional fields** are a special feature we have incorporated to help associate extra information with _models_. For example, if a company desires to store certain employee information, it can create a _collection_ with **additional fields** corresponding to the data it wants to collect from its _users_. When **additional fields** are used in a _user_ profile, a new _element_ is created in the **additional fields collection** with the information corresponding to the _user_.

:::note
Here you can find [instructions](users#additional-fields) on using **Additional Fields** from the **Users** section.
:::

### Creating an Additional Fields Collection {#creating-an-additional-fields-collection}

To create a _collection_ that will host the additional fields, go to the <span class="badge badge--primary">Create/edit Collection</span> settings panel. Under the <span class="badge badge--primary">Fields</span> tab, press the <span class="badge badge--primary">+ Add Field</span>.

<img alt="add additional fields" class="img_sizing item shadow--tl" src={useBaseUrl('img/admin_database_additional_00.png')} />
<br/>
<br/>

A <span class="badge badge--info">Field</span> mat will show up. Pressing it will open up the following settings panel:

<img alt="add additional fields" class="img_sizing item shadow--tl" src={useBaseUrl('img/admin_database_additional_01.png')} />
<br/>
<br/>

### Field Descriptions {#field-descriptions}

Below you will find the description and notes for each option in the <span class="badge badge--info">Field</span> settings panel:

<div class="container">
  <div class="row table-row-1">
  <div class="col col--4"><strong>Code</strong></div>
    <div class="col col--4">This is the unique code that identifies the Additional Field.</div>
    <div class="col col--4">Only lowercase letters, numbers, and underscores are permitted.</div>
  </div>
  <div class="row table-row-2">
    <div class="col col--4"><strong>Name</strong></div>
    <div class="col col--4">The Additional Field's name that will be visible to users.</div>
    <div class="col col--4">The default is set to "Field". It doesn't have to be unique and can use any characters.</div>
  </div>
  <div class="row table-row-1">
    <div class="col col--4"><strong>Description</strong></div>
    <div class="col col--4">Describes the Additional Field. For internal use only.</div>
    <div class="col col--4">It is not required to add a description.</div>
  </div>
  <div class="row table-row-2">
    <div class="col col--4"><strong>Array</strong> Toogle Bar</div>
    <div class="col col--4">This button sets the Additional Field into an array.</div>
    <div class="col col--4">By switching it on, you can set the minimum and maximum number of elements in the array.</div>
  </div>
  <div class="row table-row-1">
    <div class="col col--4"><strong>Type*</strong></div>
    <div class="col col--4">Designates the type or format of the data that will be inserted in the Additional Field. Options include: string, number, date, boolean, link, file, element, and user. </div>
    <div class="col col--4">The "file" option has a subtype which can be set to "video", "picture", or "file". The "element" option can be set to any collection stored in the database. If the collections are not seen in the subtype dropdown menu, you can start typing the name of the collection and it will shortly display itself along with any other similarly named collections. The "link" option will request to specify how the URL will be displayed: embedded, internal or external.</div>
  </div>
  <div class="row table-row-2">
    <div class="col col--4"><strong>Required</strong> Toggle Bar</div>
    <div class="col col--4">Makes it mandatory to fill in the Additional Field.</div>
    <div class="col col--4">If unmarked, the Additional Field is left optional.</div>
  </div>
</div>
<br/>

---------
Once the _collection_ is configured with the **Additional Fields** and saved, you can add _elements_ to it directly in ths <span class="badge badge--primary">Database</span> section or through specific modules, like <span class="badge badge--primary">Users</span>.
