---
title: Create Element
sidebar_label: Create Element
---
import useBaseUrl from '@docusaurus/useBaseUrl';
import Component1, {toc as Title1TOC} from '/docs/documentation/admin/database/_asset_create.mdx';

Elements (assets) can be created from within the [_Elements Panel_](/docs/documentation/admin/database/admin_elements#create-element) or [_Database Viewer_](/docs/documentation/client/database).

The **Create** settings panel allows authorized users to create a single element.

## Settings Panel Layout {#layout}

<Component1/>

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

