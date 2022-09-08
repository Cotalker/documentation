---
title: Categories
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img alt="design" className="img_title" src={useBaseUrl('img/design/Main_menu.svg')} />

## Overview {#overview}

In the **Categories** section, you can set up _groups_ that act as sub-menus within the _Main Menu Bar_. _Category groups_ are sets of _standard_, _link_, and/or _workflow_ groups categorized together.

_Category groups appear on the Main Menu Bar as shown below:_

<img alt="categories" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_categories_00a.gif')} />
<br/>

:::note
- _Category groups_ can only be one level deep.
- Groups nested within a _parent group_, i.e., groups not displayed in the _Main Menu Bar_ but within a _group panel_, cannot be placed into categories.
- Sub-menus appear initially in the closed position but will always reappear in the last position in which the user left them.
:::

## Access the Categories Section {#access}
_To access the Categories section:_

<img alt="categories" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_categories_00.png')} />
<br/>

<div className="margin margin-left--lg">

1. From the **Main Menu Bar**, select <span className="badge badge--primary">Administrador</span>.
2. In the **Administrative Panel**, choose <span className="badge badge--info">Categories</span>.
3. The **Categories** section opens up. From there, you can create or edit _category groups_ to set up sub-menus.

</div>
<br/>

## Categories Panel Layout {#layout}

<div className="alert alert--secondary">

The **Categories** panel contains a list of all existing _category groups_, along with the options to create and edit them.

<img alt="categories" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_categories_01.png')} />
<br/>

<div className="margin margin-left--lg">

_Actions:_
- **1. Create new group**: [Create a category group](#create) that will be displayed as a sub-menu in the Main Menu Bar.

_Options:_
- **A. Icon**: Displays the category's icon.
- **B. Name**: The category's name.
- **C. Last modified**: Indicates when the category was last modified.
- **D. Edit**: The _pen icon_ lets you [edit the group](#edit).

</div>

</div>
<br/>

## Create a New Group {#create}
To create a new category, press the <span className="badge badge--secondary">+</span> icon found in the upper right-hand corner. Afterward, the [Create Category settings panel](#settings) will open up.

<img alt="categories" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_categories_03.png')} />
<br/>

## Edit a Group {#edit}
To edit an existing _category_, press its corresponding _pen icon_. Afterward, the [Edit Category settings panel](#settings) will open up.

<img alt="categories" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_categories_04.png')} />
<br/>
<br/>

<div className="alert alert--secondary">

## Create/Edit Group Settings Panel Layout {#settings}
_Whether creating or editing a category, the following settings panel opens up:_

<img alt="categories" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_categories_02.png')} />
<br/>

_Actions:_
- **1. Deactivate**: Makes the category group unavailable.
- **2. Save**: Saves the last changes made to the category group.

_Options:_
- **A. General Information**: Indicate the category group's basic settings.
- **B. Icon**: Set the icon representing the category group on the _Main Menu Bar_.

</div>
<br/>

<div className="alert alert--secondary">

### A. General Information {#general}
_Set up the category group's basic settings._

<img alt="categories" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_categories_05.png')} />
<br/>

<div className="container box">
<div className="row table-row-1">
<div className="col col--3"><strong>Name</strong>:</div>
<div className="col col--4">The category group's display name.</div>
<div className="col col--5"><em>It doesn't have to be unique and can contain any characters.</em></div>
</div>


<div className="row table-row-2">
<div className="col col--3"><strong>Code</strong>:</div>
<div className="col col--4">The category group's identification code name.</div>
<div className="col col--5"><em>This field is automatically completed with the text input in the Name field, but can be manually changed before saving. The code only allows lowercase letters, numbers, underscores, and must always begin with a letter.</em></div>
</div>

<div className="row table-row-1">
<div className="col col--3"><strong>Weight</strong>:</div>
<div className="col col--4">A relative number that positions the group on the Main Menu Bar or Group Panel. Smaller numbers accommodate the group near the top and larger numbers towards the bottom.</div>
<div className="col col--5"><em>If left empty, the system will automatically determine a value which can be edited later on.</em></div>
</div>

<div className="row table-row-2">
<div className="col col--3"><strong>Nested groups</strong>:</div>
<div className="col col--4">Use the dropdown menu to select the groups you wish to include in the category.</div>
<div className="col col--5"><em>Groups nested within parent groups, along with those placed in other categories, are not displayed as options in the drop-down menu.</em></div>
</div>

</div>
</div>
<br/>

<div className="alert alert--secondary">

### B. Icon {#icon}
_Configure the category's icon displayed on the Main Menu Bar._

<img alt="categories" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_categories_06.png')} />
<br/>

<div className="container box">
<div className="row table-row-1">
<div className="col col--3"><b>Select icon:</b></div>
<div className="col col--5">Choose personalized or pre-designed icon from the menu.</div>
<div className="col col--4"><em>Personalized icons are configured in the "Path" field.</em></div>
</div>
<div className="row table-row-2">
<div className="col col--3"><b>Color:</b></div>
<div className="col col--5">Choose the icon's color.</div>
<div className="col col--4"><em></em></div>
</div>
<div className="row table-row-1">
<div className="col col--3"><b>Path:</b></div>
<div className="col col--5">Must be filled with Scalable Vector Graphics (SVG) code.</div>
<div className="col col--4"><em>The path is completed automatically when a pre-designed icon is chosen. For personalized icons, SVG code must be inserted manually.</em></div>
</div>
</div>
<br/>

</div>
<br/>

---
## Related Resources {#related}
- [COTGroup Data Model](/docs/documentation/models/communication/model_groups): The `isCategory` and `nestedGroups` fields are used in conjunction to establish a _group_ as a _category_.
- [Group API Reference](/docs/documentation/api/communication/groups): The `hasCatergories` parameter filters category groups.