---
title: Multiple Choice Component
sidebar_label: Multiple Choice
---
import useBaseUrl from '@docusaurus/useBaseUrl';
import Highlight from '@theme/Highlight';

The **Multiple Choice** component is used to display options to the _user_ in the _survey_.

<img alt="" src={useBaseUrl('img/admin_survey_multiplechoice.png')} />
<br/><br/>

## Field Descriptions {#field-descriptions}

The fields unique to the **Multiple choice** component are described in the following table:

| Field | Description | Notes |
| ---- | ----------- | ----- |
| Type | The options are *collection*, *users*, *item list* or *API*. Depending on what is chosen, new fields will be displayed. | The choices available when using the _users_ option will depend on the company's [_contact display mode_](/docs/documentation/admin/admin_company#field-descriptions) configuration. |
| Collection | Choose the collection that contains the elements to display as an option. | You must have the _collection_ previously created in the _Database_ section of the _Administrator_. |
| Hierarchy selection | Appears when _collection_ type is chosen. When selected, concatenating collections with their respective elements can be set up as answers. | For setup information, see [Tree Selector](#tree-selector). |
| Filter Type | _User_ and _collection_ options allow filtering. | Filtering options will depende on the _type_ selected. |
| Job Title | Apears when _users_ type is chosen. Selected options will appear in the survey. | |
| Add item | Add an option to the dropdown list. The visual name (*visualization*) and its identifier (*value*) must be added. | If the item list type is chosen, this field will be added |
| Source | The options are *external URL* or *Cotalker*. Choosing *Cotalker* adds a relative Cotalker path, otherwise an absolute address. | If the *API* type is chosen, this field will be added | 
| Method | The options are *POST* or *GET*. It's POST by default.  | If the *API* type is chosen, this field will be added |
| Path | Field that receives the external url or the relative path. | If the *API* type is chosen, this field will be added |
| Identifiers | The values ​​of the form that you want to pass to the API.  | If the *API* type is chosen, this field will be added |

## Tree Selector {#tree-selector}

The [multiple choice](#multiple-choice) component can be set up so that users can select answers from concatenating _collection_ trees, which means that each answer takes you to more specific options, like choosing a _country_, then a _region_, and finally a _city_.

<img alt="Survey Tree Selector" class="img_sizing item shadow--lw" src={useBaseUrl('img/admin_survey_tree_selector_01.png')} />
<br/>

:::info Pre-Requisite
First, you must create the collections and have them associated with each other through their _Elements_. For example, if you have a _countries_ collection, in its _Elements_ section add the _collection_ corresponding to _regions_. And do the same with regards to the _regions_ and the _cities_ collection.
:::

**Steps:**
- Create a survey with a [multiple choice](#multiple-choice) component. 
- Set the **type** to `Collection`  
- Activate the **Hierarchy selection** option. 
- Set **Collection** to the first and most general collection. 
- Set **Target collection** to the last and most specific of the collections. 

<img alt="Survey Tree Selector" class="img_sizing_narrow item shadow--lw" src={useBaseUrl('img/admin_survey_tree_selector_00.png')} />
<br/>

:::note
If the collections are all associated with each other through their _elements_ section, then the _survey_ will concatenate them accordingly, from first to last.
:::

:::tip
Filters can also be used. Select collections to define what elements will be displayed. All the collections that should be displayed must be selected in order for the question to work properly.
:::