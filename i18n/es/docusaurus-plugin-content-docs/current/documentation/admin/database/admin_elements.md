---
title: Elements (Properties)
sidebar_label: Elements
---

:::caution Advertencia
Esta página aún no se encuentra traducida al español.
:::
import useBaseUrl from '@docusaurus/useBaseUrl';
import Create, {toc as Title2TOC} from '/docs/documentation/admin/database/_asset_create.mdx';
import Edit, {toc as Title1TOC} from '/docs/documentation/admin/database/_asset_viewer.mdx';



<span className="hero__subtitle">Settings Panel Guide</span>

_List of elements within a collection; create and edit elements._

## Accessing the Elements Panel {#accessing-elements-panel}
To access the **Elements Panel**:

<img alt="elements panel" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_elements_00.png')} />
<br/>

1. Go to the [**Collections Panel**](/docs/documentation/admin/database/admin_database_overview#accessing).
2. Select the _list icon_ of the _collection_ containing the _elements_ you wish to view.
3. The [**Elements Panel**](#elements-panel-layout) will open up displaying all the _elements_ within the _collection_.

<div className="alert alert--secondary">

## Elements Panel Layout {#elements-panel-layout}
Once the **Elements Panel** opens up, you will see a list of all the _elements_ within the _collection_. From here, you can view, create, and edit _elements_.

_Example of a collection of cities:_
<img alt="" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_elements_01.png')} />
<br/>
<br/>

_Options:_
- **1. Create an Element**: Creates a new element within the collection.
- **2. Find an Element**: Searches for an element within the collection.
- **3. Disabled Elements**: Opens the elements panel displaying disabled elements within the collection.

_Table:_
- **A. Name**: Element's display name.
- **B. Code**: Element's code name.
- **C. # subelements**: Element's amount of child elements.
- **D. Last modified**: Last time the element was edited.
- **E. Actions**: Opens the [element's settings panel](#edit--create-element) for editing.
- **a, b, c**: Sub-elements.

</div>
<br/>

## Create an Element {#create-element}
From within the _Elements Panel_, you can create a new _element_ by pressing the <span className="badge badge--primary">+</span> icon. 

<img alt="create element" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_elements_02.png')} />
<br/>

_The following **Create** settings panel opens up:_

<Create/>

## Edit an Element {#edit-element}
From within the _Elements Panel_, you can edit an existing _element_ by pressing the corresponding icon.

<img alt="edit element" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_elements_03.png')} />
<br/>


_The [asset viewer](/docs/documentation/admin/database/asset_viewer) opens up when you choose to edit an element:_

<Edit layout={useBaseUrl('img/asset_viewer_00.png')} />

---

## Related Topics {#related-topics}

- [Tutorial on how to create a collection and its elements.](/docs/tutorials/basic/create_database)
- [Collections (Property Types) Data Model](/docs/documentation/models/databases/model_propertytypes)
- [Elements (Properties) Data Model](/docs/documentation/models/databases/model_properties)
