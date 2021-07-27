---
title: Search Tool
---
import useBaseUrl from '@docusaurus/useBaseUrl'; 

<img alt="title image" className="img_sizing" src={useBaseUrl('img/design/Database.svg')} />
<br/>

## Overview {#overview}

<div className="alert alert--secondary">

Search queries are carried out through different fields of the Cotalker environment, making it easier and more efficient to find and display results. Search fields include: _user_, _channel_, _action_, _properties_, and _task_ names; task _additional information_ field.

:::note
There are basically two types of searches:
- [Global](#global-search): searches through the entire Cotalker environment.
- [Group](#group-search): searches within the context of a communication or workflow group.
:::

</div>
<br/>

### Global Search {#global-search}
When accessed through the **Main Menu Bar**, search queries will be global, i.e., made throughout the entire environment.

<img alt="global search icon" className="img_sizing item shadow--tl" src={useBaseUrl('img/client_mainmenu_search_03.png')} /> 
<br/>

_Search window:_

<img alt="global search window" className="img_sizing item shadow--tl" src={useBaseUrl('img/client_mainmenu_search_03a.png')} /> 
<br/>

:::tip
**Global Search** _shortcut key_: **F3**
:::

### Group Search {#group-search}
But, if the search tool is summoned through a _group's panel_, queries will only be carried out inside the _group_. 

<img alt="main_menu" className="img_sizing item shadow--tl" src={useBaseUrl('img/client_mainmenu_search_03b.png')} /> 
<br/>

When searching through a _group_, a _tag_ with the group's name will show up, indicating that a filter has been put in place to search only in that _group_.

<img alt="search global" className="img_sizing item shadow--tl" src={useBaseUrl('img/client_search_01.png')} /> 
<br/>

### Search Fields {#search-fields}

Each search query goes through all the following fields:

- **Actions**: When summoned, the search tool will automatically show all available _actions_, i.e., links or _tasks_ that can be opened through the [_Actions button_](/docs/documentation/client/actions_button.md). Queries will search through _action_ names.
- **Users**: Search through the _user_ names found in the company's Cotalker environment. Bots also have _user_ accounts.
- **Channels**: Search through _channel_ names.
- **Properties**: Search by names of _properties_, also known as _elements_. _Properties_ (_elements_) are the components of _collections_ (_databases_ or _property types_).
- **Tasks**: Queries search through task _names_ and the _additional information_ field. When searching through tasks' _additional information_, a process called stemming – which reduces words to their stem or root – is used, allowing a broader range of results.

_Actions are displayed automatically when the search tool is opened._

<img alt="search global" className="img_sizing item shadow--tl" src={useBaseUrl('img/client_search_00.png')} /> 
<br/>

_Automatically search for root words in task descriptions. In the example below, the search for the word "distribution" gave a result with the word "distribute" found in a task's additional information._

<img alt="search global" className="img_sizing item shadow--tl" src={useBaseUrl('img/client_search_02.png')} /> 
<br/>

_Press the **SEE MORE** option to find more search query results in a specific field._

<img alt="search global" className="img_sizing item shadow--tl" src={useBaseUrl('img/client_search_03.png')} /> 
<br/>