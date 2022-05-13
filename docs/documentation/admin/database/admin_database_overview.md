---
title: Database Panel Overview
sidebar_label: Overview
---
import useBaseUrl from '@docusaurus/useBaseUrl';
import Highlight from '@theme/Highlight';

<img alt="design" className="img_sizing" src={useBaseUrl('img/design/Database.svg')} />
<br/>

## Overview {#database-overview}

The _Database_ section is a registry of all the [_collections_](/docs/documentation/admin/database/admin_collections) found in your company's Cotalker environment. _Collections_ contain data in the form of [_elements_](/docs/documentation/admin/database/admin_elements). 

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


## Accessing the Collections Panel {#accessing}
To access the the <span className="badge badge--primary">Collections</span> panel:

<img alt="Database" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_database_section_00.png')} />
<br/>

1. Press the <span className="badge badge--primary">Administrator</span> in the **Main Menu Bar**.
2. Select <span className="badge badge--primary">Database</span> from the **Administrative Panel**.
3. The [**Collections Panel**](#database-panel-layout) will open up.

<br/>

<div className="alert alert--secondary">

## Collections Panel Layout {#database-panel-layout}
Once inside the **Collections** panel, you can find the entire list of _collections_ that have been created in the _company_. From this panel, you can also create and edit _collections_.

<img alt="collections list" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_collections_00.png')} />
<br/>
<br/>

_Actions:_
- **1. [Create collection](/docs/documentation/admin/database/admin_collections#create-collection)**: Create a new collection within the database.
- **2. Find collection**: Search through the database to find a collection.

_Table Display and Options:_
- **A. Name**: Display name.
- **B. Code**: Identification code.
- **C. Last modified**: Last time the collection was edited.
- **D. Elements | Edit**: Options for either [viewing the collection's elements](/docs/documentation/admin/database/admin_elements#elements-panel-layout) or [editing the collection's settings](/docs/documentation/admin/database/admin_collections#edit-collection).

</div>
<br/>


---

## Related Topics {#related-topics}

- [Tutorial on how to create a collection and its elements.](/docs/tutorials/basic/create_database)
- [Collections (Property Types) Data Model](/docs/documentation/models/databases/model_propertytypes)
- [Elements (Properties) Data Model](/docs/documentation/models/databases/model_properties)