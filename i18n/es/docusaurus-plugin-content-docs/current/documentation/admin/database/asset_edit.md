---
title: Edit Element
sidebar_label: Edit Element
---

:::caution Advertencia
Esta página aún no se encuentra traducida al español.
:::
import useBaseUrl from '@docusaurus/useBaseUrl';
import Highlight from '@theme/Highlight';

<span className="hero__subtitle">Asset Viewer</span>

You can edit an _element_ (_asset_) from within the [asset viewer](/docs/documentation/admin/database/asset_viewer).


## Settings Panel Layout {#settings_panel}

_Below is a representation of an element's settings displayed within the Asset Viewer:_

<img alt="edit/create element" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_elements_04.png')} />
<br/>

_Special Features:_
- **<span className="badge badge--success">a.</span>** Displays the element's [**QR code**](/docs/documentation/admin/database/asset_qr). 
- **<span className="badge badge--success">b.</span>** Displays previously created [**reports or actions**](/docs/documentation/admin/database/asset_reports_actions).
- **<span className="badge badge--success">c.</span>** Creates a [**report or action**](/docs/documentation/admin/database/asset_reports_actions) associated with the element.

_Actions:_
- **<span className="badge badge--primary">1.</span> Close**: Closes the settings panel without saving changes.
- **<span className="badge badge--primary">2.</span> Deactivate/Activate**: Makes the element available or unavailable in the collection.
- **<span className="badge badge--primary">3.</span> Save**: Saves the element with the latest changes made.

_Settings:_
- [**<span className="badge badge--danger">A.</span> General information**](#general-information): Basic element information and associated child elements.
- [**<span className="badge badge--danger">B.</span> Additional fields**](#additional-fields): Set or edit additional field values.
- [**<span className="badge badge--danger">C.</span> Additional attributes**](#additinal-attributes): Adds extra information. Deprecated, only used on legacy systems.
- [**<span className="badge badge--danger">D.</span> Channels**](#channels): Displays channels associated with the element.
- [**<span className="badge badge--danger">E.</span> Associated surveys**](#associated-surveys): Displays survey answers associated with the element.
- [**<span className="badge badge--danger">F.</span> Child elements**](#child-elements): Displays a list of any child elements.
- [**<span className="badge badge--danger">G.</span> Parent elements**](#parent-elements): Displays a list of any parent elements.

:::info Special Features
Go to the [**Asset Viewer**](/docs/documentation/admin/database/asset_viewer) section for more details about _special features_: 
- [QR Code](/docs/documentation/admin/database/asset_qr)
- [Reports & Actions](/docs/documentation/admin/database/asset_reports_actions)
:::

## Settings Details {#settings}

<div className="alert alert--secondary">

### A. General information {#general-information}

<img alt="gnrl info" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_elements_04a.png')} />
<br/>

<div className="container box">

<div className="row table-row-1">
<div className="col col--3"><strong>Name</strong>:</div>
<div className="col col--4">The element's display name.</div>
<div className="col col--5"><em>Can contain any character. Doesn't have to be unique, but it is recommended.</em></div>
</div>
<div className="row table-row-2">
<div className="col col--3"><strong>Code</strong>:</div>
<div className="col col--4">The element's unique identification name.</div>
<div className="col col--5"><em>

Only lowercase letters, numbers, and underscores are accepted. The _code_ must start with a letter. Once you create and save the collection, you cannot change the _code_.

</em></div>
</div>
<div className="row table-row-1">
<div className="col col--3"><strong>+ Add Element</strong>:</div>
<div className="col col--4">Opens the settings to add child elements associated with the element.</div>
<div className="col col--5"><em>Child elements are also known as subproperties.</em></div>
</div>
<div className="row table-row-2">
<div className="col col--3"><strong>Collection</strong>:</div>
<div className="col col--4">The collection the child element belongs to.</div>
<div className="col col--5"><em></em></div>
</div>
<div className="row table-row-1">
<div className="col col--3"><strong>Elements</strong>:</div>
<div className="col col--4">The element or elements set up as child elements.</div>
<div className="col col--5"><em></em></div>
</div>
</div>

</div>
<br/>

<div className="alert alert--secondary">

### B. Additional fields {#additional-fields}

_NOTE: Additional fields vary upon each collection and their values depends on each particular element._
<img alt="gnrl info" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_elements_04b.png')} />
<br/>

<div className="container box">

<div className="row table-row-1">
<div className="col col--3"><strong>Customized fields</strong>:</div>
<div className="col col--5">

Each additional field has a customized field name.  
The type of valid input values also depends on the settings of each additional field.  
Additional fields created in a collection are available to all its elements.

</div>
<div className="col col--4"><em>

[More information about Additional fields.](/docs/documentation/admin/database/admin_collections#additional-fields)

</em></div>
</div>

</div>

</div>
<br/>

<div className="alert alert--secondary">

### C. Additional attributes {#additional-attributes}
_NOTE: Additional attributes are deprecated and should only be used with legacy systems. [See more below](#adding-fields-globally)._

<img alt="gnrl info" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_elements_04c.png')} />
<br/>

<div className="container box">

<div className="row table-row-1">
<div className="col col--3"><strong>+ Add Additional Attributes</strong>:</div>
<div className="col col--5">Opens the settings to configure a new additional attribute in the element.</div>
<div className="col col--4"><em></em></div>
</div>
<div className="row table-row-2">
<div className="col col--3"><strong>Name</strong>:</div>
<div className="col col--5">The attribute's name.</div>
<div className="col col--4"><em></em></div>
</div>
<div className="row table-row-1">
<div className="col col--3"><strong>Value</strong>:</div>
<div className="col col--5">The value stored by the named attribute.</div>
<div className="col col--4"><em></em></div>
</div>
</div>

</div>
<br/>



<div className="alert alert--secondary">

### D. Channels {#channels}
_Click on Channel rows to open their corresponding settings panel._

<img alt="channels" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_elements_04d.png')} />
<br/>

<div className="container box">

<div className="row table-row-1">
<div className="col col--3"><strong>Icon</strong>:</div>
<div className="col col--5">Displays the icon of the channel associated with the element.</div>
<div className="col col--4"><em></em></div>
</div>
<div className="row table-row-2">
<div className="col col--3"><strong>Channel name</strong>:</div>
<div className="col col--5">Displays the name of the channel associated with the element.</div>
<div className="col col--4"><em></em></div>
</div>
<div className="row table-row-1">
<div className="col col--3"><strong>Group</strong>:</div>
<div className="col col--5">Indicates the group the channel belongs to.</div>
<div className="col col--4"><em></em></div>
</div>
</div>

</div>
<br/>

<div className="alert alert--secondary">

### E. Associated surveys {#associated-surveys}

<img alt="associated surveys" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_elements_04e.png')} />
<br/>

<div className="container box">

<div className="row table-row-1">
<div className="col col--3"><strong>1. Survey Name</strong>:</div>
<div className="col col--5">Displays the name of the survey in which the element is associated with the survey answer.</div>
<div className="col col--4"><em>

[More on surveys.](/docs/documentation/client/surveys/overview)

</em></div>
</div>
<div className="row table-row-2">
<div className="col col--3"><strong>2. Submitted Answer Number</strong>:</div>
<div className="col col--5">Indicates the answered survey's number in sequential order of submission.</div>
<div className="col col--4"><em></em></div>
</div>
<div className="row table-row-1">
<div className="col col--3"><strong>3. Submission Date</strong>:</div>
<div className="col col--5">The date and time the answered survey was submitted.</div>
<div className="col col--4"><em></em></div>
</div>
<div className="row table-row-2">
<div className="col col--3"><strong>4. Viewing Options</strong>:</div>
<div className="col col--5">Permits viewing an image or PDF of the answered survey.</div>
<div className="col col--4"><em></em></div>
</div>
</div>

</div>
<br/>

<div className="alert alert--secondary">

### F. Child elements {#child-elements}

<img alt="child elements" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_elements_04f.png')} />
<br/>

<div className="container box">

<div className="row table-row-1">
<div className="col col--3"><strong>1. Type</strong>:</div>
<div className="col col--5">Indicates the collection (property type) the element belongs to.</div>
<div className="col col--4"><em></em></div>
</div>
<div className="row table-row-2">
<div className="col col--3"><strong>2. Element name</strong>:</div>
<div className="col col--5">Indicates the name of the child element.</div>
<div className="col col--4"><em></em></div>
</div>
<div className="row table-row-1">
<div className="col col--3"><strong>3. Eye icon</strong></div>
<div className="col col--5">Clicking on the eye icon takes you to the child element's settings panel.</div>
<div className="col col--4"><em></em></div>
</div>

</div>

</div>
<br/>

<div className="alert alert--secondary">

### G. Parent elements {#parent-elements}

<img alt="parent elements" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_elements_04g.png')} />
<br/>

<div className="container box">

<div className="row table-row-1">
<div className="col col--3"><strong>1. Type</strong>:</div>
<div className="col col--5">Indicates the collection (property type) the parent element belongs to.</div>
<div className="col col--4"><em></em></div>
</div>
<div className="row table-row-2">
<div className="col col--3"><strong>2. Element name</strong>:</div>
<div className="col col--5">Indicates the name of the parent element.</div>
<div className="col col--4"><em></em></div>
</div>
<div className="row table-row-1">
<div className="col col--3"><strong>3. Eye icon</strong></div>
<div className="col col--5">Clicking on the eye icon takes you to the parent element's settings panel.</div>
<div className="col col--4"><em></em></div>
</div>

</div>

</div>
<br/>



---

## Best Practices {#best-practices}
### Adding Extra Information to Elements {#adding-fields-globally}
When additional information needs to be added to _elements_, the [**additional fields**](/docs/documentation/admin/database/admin_collections#additional-fields) feature should be used. **Additional fields** serve as columns of database tables, which allows your information to be well organized and makes it easier to search through.

Avoid using the **additional attributes** option to add information on _elements_. **Additional attributes** for _elements_ are only used on legacy systems. The **additional attributes** that are added affect only individual _elements_, unlike **additional fields**, which create the fields in all the _elements_ in the _collection_.

_Prefer **Additional fields**(A) over **Additional attributes**(B):_
<img alt="element settings" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_properties_bestpractices_00.png')} />

---
