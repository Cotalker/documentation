---
title: Elements (Properties)
sidebar_label: Elements
---
import useBaseUrl from '@docusaurus/useBaseUrl';
import Highlight from '@theme/Highlight';

<span className="hero__subtitle">Settings Panel Guide</span>

_List of elements within a collection; create and edit elements._

## Accessing the Elements Panel {#accessing-elements-panel}
To access the **Elements Panel**:

<img alt="elements panel" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_elements_00.png')} />
<br/>

1. Go to the [**Database Panel**](/docs/documentation/admin/database/admin_database_overview#accessing).
2. Select the _list icon_ of the _collection_ containing the _elements_ you wish to view.
3. The [**Elements Panel**](#elements-panel-layout) will open up displaying all the _elements_ within the _collection_.

<div className="alert alert--secondary">

## Elements Panel Layout {#elements-panel-layout}
Once the **Elements Panel** opens up, you will see a list of all the _elements_ within the _collection_. From here, you can view, create, and edit _elements_.

_Example of a collection of cities:_
<img alt="" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_elements_01.png')} />
<br/>
<br/>

_Actions:_
- **1. Create an Element**: Creates a new element within the collection.
- **2. Find an Element**: Searches for an element within the collection.
- **3. Disabled Elements**: Opens the elements panel displaying disabled elements within the collection.

_Table and Options:_
- **A. Name**: Element's display name.
- **B. Code**: Element's code name.
- **C. Number of sub-elements**: Element's amount of child elements.
- **D. Last modified**: Last time the element was edited.
- **E. Edit**: Opens the [element's settings panel](#edit--create-element) for editing.

</div>
<br/>

## Create an Element {#create-element}
From within the _Elements Panel_, you can create a new _element_ by pressing the <span className="badge badge--primary">+</span> icon. This will open up the [**Element Settings Panel**](#edit--create-element), where you can create a single _element_.

<img alt="create element" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_elements_02.png')} />


## Edit an Element {#edit-element}
From within the _Elements Panel_, you can edit an existing _element_ by pressing the corresponding _pen_ icon. This will open up the [**Element Settings Panel**](#edit--create-element), where you can edit the _element_.

<img alt="edit element" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_elements_03.png')} />
<br/>

<div className="alert alert--secondary">

## Element Settings Panel Layout {#edit--create-element}
The following settings panel appears either if you choose to create or edit an element.

<img alt="edit/create element" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_elements_04.png')} />
<br/>

_NOTE: When creating a new element, only the **General information** and **Additional fields** tabs are available for configuration._

_Actions:_
- **1. Deactivate/Activate**: Makes the element available or unavailable in the collection.
- **2. Save**: Saves the element with the latest changes made.

_Settings:_
- [**A. General information**](#general-information): Basic element information.
- [**B. Additional fields**](#additional-fields): Set or edit additional field values.
- [**C. Additional attributes**](#additinal-attributes): Adds extra information. Deprecated, only used on legacy systems.
- [**D. Elements**](#add-elements): Adds child elements (sub-properties).
- [**E. Channels**](#channels): Displays channels associated with the element.
- [**F. Associated surveys**](#associated-surveys): Displays survey answers associated with the element.
- [**G. Child elements**](#child-elements): Displays a list of any child elements.
- [**H. Parent elements**](#parent-elements): Displays a list of any parent elements.

</div>
<br/>

<div className="alert alert--secondary">

### A. General information {#general-information}

<img alt="gnrl info" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_elements_4a.png')} />
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
<div className="col col--3"><strong>Collection</strong>:</div>
<div className="col col--4">The collection the element belongs to.</div>
<div className="col col--5"><em></em></div>
</div>
</div>

</div>
<br/>

<div className="alert alert--secondary">

### B. Additional fields {#additional-fields}

_NOTE: Additional fields vary upon each element._
<img alt="gnrl info" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_elements_4b.png')} />
<br/>

<div className="container box">

<div className="row table-row-1">
<div className="col col--3"><strong>Customized fields</strong>:</div>
<div className="col col--5">Each additional field has a customized field name. The type of valid input values also depends on the settings of each additional field. Additional fields created in a collection are available to all its elements.</div>
<div className="col col--4"><em>

[More information about Additional fields.](/docs/documentation/admin/database/admin_collections#additional-fields)

</em></div>
</div>

</div>

</div>
<br/>

<div className="alert alert--secondary">

### C. Additional attributes {#additional-attributes}
_NOTE: Additional attributes are deprecated and should only be used with legacy systems._

<img alt="gnrl info" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_elements_4c.png')} />
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

### D. Elements {#add-elements}

<img alt="add elements" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_elements_4d.png')} />
<br/>

<div className="container box">

<div className="row table-row-1">
<div className="col col--3"><strong>+ Add Element</strong>:</div>
<div className="col col--5">Opens the settings to add child elements associated with the element.</div>
<div className="col col--4"><em>Child elements are also known as subproperties.</em></div>
</div>
<div className="row table-row-2">
<div className="col col--3"><strong>Collection</strong>:</div>
<div className="col col--5">The collection the child element belongs to.</div>
<div className="col col--4"><em></em></div>
</div>
<div className="row table-row-1">
<div className="col col--3"><strong>Elements</strong>:</div>
<div className="col col--5">The element or elements set up as child elements.</div>
<div className="col col--4"><em></em></div>
</div>
</div>

</div>
<br/>

<div className="alert alert--secondary">

### E. Channels {#channels}

<img alt="channels" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_elements_4e.png')} />
<br/>

<div className="container box">

<div className="row table-row-1">
<div className="col col--3"><strong>Icon</strong>:</div>
<div className="col col--5">Displays the icon of the channel associated with the element.</div>
<div className="col col--4"><em></em></div>
</div>
<div className="row table-row-2">
<div className="col col--3"><strong>Channel</strong>:</div>
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

### F. Associated surveys {#associated-surveys}

<img alt="associated surveys" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_elements_4f.png')} />
<br/>

<div className="container box">

<div className="row table-row-1">
<div className="col col--3"><strong>1. Survey Name</strong>:</div>
<div className="col col--5">Displays the name of the survey in which the element is associated with the survey answer.</div>
<div className="col col--4"><em>

[More on surveys.](/docs/documentation/client/surveys)

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

### G. Child elements {#child-elements}

<img alt="child elements" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_elements_4g.png')} />
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

### H. Parent elements {#parent-elements}

<img alt="parent elements" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_elements_4h.png')} />
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

## Related Topics {#related-topics}

- [Tutorial on how to create a collection and its elements.](/docs/tutorials/basic/create_database)
- [Collections (Property Types) Data Model](/docs/documentation/models/databases/model_propertytypes)
- [Elements (Properties) Data Model](/docs/documentation/models/databases/model_properties)