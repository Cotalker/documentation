---
title: Multiple Choice Component
sidebar_label: Multiple Choice
---
import useBaseUrl from '@docusaurus/useBaseUrl';
import Highlight from '@theme/Highlight';

<div className="alert alert--secondary">

## Summary {#summary}

The <span className="badge badge--warning">multiple choice</span> component lets you give _users_ multiple choice questions in the _survey_. This component can also be configured as a dynamic survey, i.e., it can display certain options or choices as corresponding answers are responded.

_Initial **multiple choice** component settings panel:_
<img alt="form template" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_survey_multiplechoice_00.png')} />
<br/>

Apart from the [general fields](/docs/documentation/admin/survey/survey_overview#field-descriptions), the initial **multiple choice** component settings panel lets you choose the **type**. There are four different _types_ of **multiple choice** components you can choose from: 
- [Collection](#collection-type): Make the elements of a collection the choices or options available.
- [Users](#users-type): Users in the company's Cotalker database can be selected as answers. Useful for delegating or summoning purposes.
- [Item list](#list-of-items-type): Make a simple list of possible answers.
- [API](#api-type): Obtains data to display from an external URL or from a Cotalker module.

:::note
Depending on what _type_ is chosen, new fields will be displayed in the settings panel. Each _type_ and its corresponding fields are explained below.
:::

</div>
<br/>



## 1. Collection Type {#collection-type}
This option lets you choose the collection that contains the elements to be displayed as options. 
You must have the _collection_ with its _elements_ previously created in the [_Database_](/docs/documentation/admin/admin_properties) section of the _Administrator_. 

<div className="alert alert--primary">

The _collection_ type has the following fields for setup:

- **Filter by**: Filtering allows the question to display only certain choices or _elements_. It can also be used to set up a dynamic survey. [Setup information.](#collection-filters)
- **Hierarchy selection**: Creates a dynamic survey. When selected, concatenating collections with their respective elements can be set up as possible answers. [Setup information.](#tree-selector)

</div>
<br/>

### 1.1 Filter By {#collection-filters}
Mainly, filtering allows the question to display only certain choices or _elements_.

<div className="alert alert--secondary">

Available options in the **Filter by** field are: 
- **No filter**: No filter is applied.
- **Subproperty**: Filters the sub-properties of a _collection_ based on a previously chosen _element_ from a _collection type_ **multiple choice** component in the same _survey_. [More information.](#subproperty-example)
- **Subproperty-channel**: Displays the sub-properties of a collection associated with the channel as options. [More information.](#subproperty-channel-example)
- **Subproperty-user**: Displays the sub-properties of a collection associated with the user as options.

</div>
<br/>

#### <span className="hero__subtitle">- Subproperty Example</span> {#subproperty-example}

The _subproperty_ filter lets us create dynamic surveys by filtering a collection's subproperties through at least one other **multiple choice** component in the same survey.

:::tip
Usually, the [hierarchy selection](#tree-selector) option is easier to use for concatenating collections, but there are instances when you might want to customize or tweak your dynamic surveys in relation to the _elements_ that will be shown as options. For these instances, you can use the _subproperty_ filter.
:::

<div className="alert alert--secondary">

<span className="hero__subtitle">Example</span>

For example, if you have a collection that is associated with two other collections, you can use the subproperty filter to display options from both collections of subproperties based on an initial response from another survey question.

_In the following example, a collection of mammals has two elements: land and sea mammals. The collection is also associated with two other collections of mammal species for its subproperties. The survey will let users choose either land or sea mammals, and depending on their answer, choose a corresponding mammal species from the two different collections._

<img alt="subproperties survey example" class="img_sizing item shadow--tl" src={useBaseUrl('img/admin_survey_multiplechoice_subproperty_00.png')} />
<br/>

<span className="hero__subtitle">Setup</span>

1. First, add a **multiple choice** component with the following settings:

<img alt="subproperties survey example" class="img_sizing item shadow--tl" src={useBaseUrl('img/admin_survey_multiplechoice_subproperty_01.png')} />
<br/>

  - **Type**: `Collection`
  - **Identifier**: In this example, we chose `mammal_select`. This _identifier_ will be used in the next steps to reference the other components to this one.
  - **Collection**: Here we chose the `Mammals`collection. This should be your most general collection. In this example, the collection has two elements: `Land Mammals` and `Sea Mammals`. Each element has two other collections associated with them: `Species` and `Other Species`. The _elements_ of these last two _collections_ will be the _subproperties_ that will appear as options. We will use these in the following steps.
  - **Filter by**: `No filter`




2. Next, add another **multiple choice** component with the following settings:

<img alt="subproperties survey example" class="img_sizing item shadow--tl" src={useBaseUrl('img/admin_survey_multiplechoice_subproperty_02.png')} />
<br/>

  - **Type**: `Collection`
  - **Identifier**: In this example, we chose `species_001`.
  - **Collection**: For this example, `Species` contains the subproperties of the `Mammals` collection.
  - **Filter by**: `subproperty`
  - **Filter data**: Here we wrote `mammal_select`, which is the _identifier_ of the previous component that references the greater collection.

3. _Optional step_: Add another **multiple choice** component with the following settings:

<img alt="subproperties survey example" class="img_sizing item shadow--tl" src={useBaseUrl('img/admin_survey_multiplechoice_subproperty_03.png')} />
<br/>

  - **Type**: `Collection`
  - **Identifier**: In this example, we chose `species_002`.
  - **Collection**: For this example, `Other Species` is a second collection associated with the `Mammals` collection.
  - **Filter by**: `subproperty`
  - **Filter data**: Once again we wrote `mammal_select`, which is the _identifier_ of the first component that references the greater collection.

4. Press <span className="badge badge--primary">Save</span>. You're good to go!

</div>
<br/>

#### <span className="hero__subtitle">- Subproperty-channel Example</span> {#subproperty-channel-example}
Fill the **Filter Data** field with the _code_ of the _collection_ to look for in the _channel_. The available options will be its sub-properties. 

<div className="alert alert--secondary">

Lets take the following settings for example:
- **Collection**: a collection named `Brands`
- **Filter by**: set to _subproperty-channel_
- **Filter data**: a collection named `category_suv`

This will display as options only _elements_ that: 
- are `Brands`
- and sub-properties of any property of the channel –in which the survey is called– that has the `category_suv` type.

This is particularly useful since a _channel_ can have many properties assigned to it, but we need to know what type of filter to use in the **Filter data** field.

</div>
<br/>

### 1.2 Hierarchy Selection {#tree-selector}

Creates dynamic surveys, i.e., users' choice in one question will determine the options available in the following question. When selected, concatenating _collection_ trees with their respective elements can be set up as answers. This means that each answer takes you to more specific options, like choosing a _country_, then a _region_, and finally a _city_.

<img alt="Survey Tree Selector" class="img_sizing item shadow--lw" src={useBaseUrl('img/admin_survey_tree_selector_01.png')} />
<br/>

<div className="alert alert--secondary">

<span className="hero__subtitle">Setup</span>
<br/>

:::note Pre-Requisites
First, you must create the collections and have them associated with each other through their _Elements_. For example, if you have a _countries_ collection, in its _Elements_ section add the _collection_ corresponding to _regions_. And do the same with regards to the _regions_ and the _cities_ collection.
:::

- Create a survey with a **multiple choice** component. 
- Set the **type** to _Collection_.
- Activate the **Hierarchy selection** option. 
- Set **Collection** to the first and most general collection. 
- Set **Target collection** to the last and most specific of the collections. 

<img alt="Survey Tree Selector" class="img_sizing_narrow item shadow--tl" src={useBaseUrl('img/admin_survey_tree_selector_00.png')} />
<br/>
<br/>

:::note
No matter how many collections, if they are all associated with each other through their _elements_ section, then the _survey_ will concatenate them accordingly, from first to last.
:::

</div>
<br/>

:::tip
_Hierarchy selection_ has its own **Filter by** field. You can select multiple collections to filter what elements will be displayed. All the collections that should be displayed must be selected in order for the question to work properly.
:::

## 2. Users Type {#users-type}

The choices available when using the _users_ option will depend on the company's [_contact display mode_](/docs/documentation/admin/admin_company#field-descriptions) configuration. 

### 2.1 Filter Type {#user-filter-type}
Filtering allows the question to display only certain choices or _elements_. Available filters for _users_ are: 
- No filter
- Jobs title
- Subordinates
- Bosses
- Peers

### 2.2 Job Title {#job-title}
Company job categories can be selected to act as filters. For information on how to add job categories refer to the [Company](/docs/documentation/admin/admin_company#company-overview) section.

## 3. List of Items Type {#list-of-items-type}
Easily create a list of items or options to choose from. 

_Example of how a user will see the list of items in a survey:_
<img alt="list of items" class="img_sizing item shadow--tl" src={useBaseUrl('img/admin_survey_multiplechoice_list_00.png')} />
<br/>

<div className="alert alert--secondary">

<span className="hero__subtitle">Setup</span>

From the settings panel, press the <span className="badge badge--primary">+ Add Item</span> button to create a new option and set the following fields:

- **Display**: Text that will be shown to the user.
- **Value**: The item's identification code.

_The settings panel should look something like this:_

<img alt="list of items" class="img_sizing_narrow item shadow--tl" src={useBaseUrl('img/admin_survey_multiplechoice_list_01.png')} />
<br/>

</div>
<br/>

## 4. API Type {#api-type}


- **Source**: The options are *external URL* or *Cotalker*. Choosing *Cotalker* adds a relative Cotalker path, otherwise an absolute address.
- **Method**: The options are *POST* or *GET*. It's POST by default.
- **Path**: Field that receives the external url or the relative path.
- **Identifiers**: The values ​​of the form that you want to pass to the API.


