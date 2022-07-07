---
title: Setup
sidebar_label: Master Data
---

import useBaseUrl from '@docusaurus/useBaseUrl'; 

<span className="hero__title">Master Data</span>
<br/>
<br/>

<img alt="database" className="img_sizing item shadow--tl" src={useBaseUrl('img/products/products_database_00.png')} />
<br/>

## Overview {#overview}
Adding your master data on Cotalker's platform permits you to use and update asset information automatically. For example, when field workers use the [_notification survey form_](/docs/products/workflows/notifications/surveys) to report an incident, the form accesses a collection of assets that include information about equipment, models, failure types, and location. Similarly, using the _close work order_ form, maintenance personnel can choose warehouse materials used in the operation, which is automatically subtracted from the warehouse stock database.

The Cotalker platform uses non-relational databases, allowing companies to create flexible data structures and relationships. The database is made up of _collections_, which group _elements_ by types. Elements can be customized to each company's asset requirements.

Adding elements to your collections can be done either manually or automatically. Here we will only discuss how to add elements manually. 

:::tip
Talk to your Cotalker representative on how to use our [API tools](/docs/documentation/api/overview_api) to update your database.
:::

## Accessing the Database {#database}
To access the **Database**:

<img alt="database" className="img_sizing item shadow--tl" src={useBaseUrl('img/products/products_notifications_masterdata_00.png')} />
<br/>

<div className="margin-left--lg">

1. In the **Main Menu Bar**, press the **Database** button.
2. From the **Database** section, choose the _collection_ you wish to view.

</div>
<br/>

<img alt="database" className="img_sizing item shadow--tl" src={useBaseUrl('img/products/products_notifications_masterdata_01.png')} />
<br/>

<div className="margin-left--lg">

3. Within the _collection_, choose an _element_ to view or edit.
4. The element's details are displayed on the right-hand panel.
    - **A. General information**: Indicates the name, identification code, and the collection the element belongs to.
    - **B. Additional fields**: Displays the data added to the additional fields that are proper to the elements in the collection.
    - **C. Associated elements**: This tab displays a collection and its elements associated with the element.

:::note
Elements can be added to a collection by pressing the <span className="badge badge--secondary">+</span> icon.
:::

</div>

----

## Related Resources {#resources}
- [**Database Panel Overview**](/docs/documentation/admin/database/admin_database_overview): _Administrative Panel_ documentation
- [**Database Tool**](/docs/documentation/client/database): _Getting Started_ documentation