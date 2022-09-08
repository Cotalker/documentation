---
title: Search Tool
---

:::caution Advertencia
Esta página aún no se encuentra traducida al español.
:::
import useBaseUrl from '@docusaurus/useBaseUrl'; 

<img alt="title image" className="img_sizing" src={useBaseUrl('img/design/Database.svg')} />
<br/>

## Overview {#overview}

Search queries are carried out through different fields of the Cotalker environment, making it easier and more efficient to find and display results. Search fields include: _user_, _channel_, _action_, _properties_, _task names_, _additional task information_, and _shared documents_.


There are two types of searches:

<img alt="search types" className="img_sizing item shadow--tl" src={useBaseUrl('img/client_search_00.png')} /> 
<br/>

<div className="margin-left--lg">

1. [Global](#global-search): searches through the entire Cotalker environment.
2. [Group](#group-search): searches within the context of a _group_.

</div>

:::note
Admins can [filter search results](/docs/documentation/models/company/company_searchengine) to display information according to company needs.
:::

## Global Search {#global-search}
When accessed through the **Tool Bar**, search queries are global, i.e., made throughout the entire environment.

<img alt="global search icon" className="img_sizing item shadow--tl" src={useBaseUrl('img/client_search_01.gif')} /> 
<br/>

_Search window:_

<img alt="global search window" className="img_sizing item shadow--tl" src={useBaseUrl('img/client_search_02.png')} /> 
<br/>

<div className="margin-left--lg">

1. Input field
2. All _actions_ available in the company
3. Search results

</div>

:::tip
**Global Search** _shortcut key_: **F3**
_When summoned with the shortcut key, a new search window pops up._
:::

## Group Search {#group-search}
But, if the search tool is summoned through a _group's panel_, queries will only be carried out inside the _group_. 

<img alt="main_menu" className="img_sizing item shadow--tl" src={useBaseUrl('img/client_search_03.gif')} /> 
<br/>

When searching through a _group_, a window pops up:

<img alt="search global" className="img_sizing item shadow--tl" src={useBaseUrl('img/client_search_04.png')} /> 
<br/>

<div className="margin-left--lg">

1. Input field
2. A _tag_ with the group's name will show up, indicating that a filter has been put in place to search only in that _group_.
3. All _actions_ available in the group
4. Search results

</div>

## Search Query Scope {#search-fields}

The scope of search queries is bounded to the following fields:

- **Actions**: When summoned, the search tool will automatically show all available _actions_, i.e., links or _tasks_ that can be opened through the [_Actions button_](/docs/documentation/client/actions_button). Queries will search through _action_ names.
- **Users**: Search through the _user_ names found in the company's Cotalker environment. Bots also have _user_ accounts.
- **Channels**: Search through _channel_ names.
- **Properties**: Search by names of _properties_, also known as _elements_. _Properties_ (_elements_) are the components of _collections_ (_databases_ or _property types_).
- **Tasks**: Queries search through task _names_ and the _additional information_ field. When searching through tasks' _additional information_, a process called stemming – which reduces words to their stem or root – is used, allowing a broader range of results.

## Additional Features {#additional} 

### Smart Search {#smart-search}
_Automatically search for root words in task descriptions. In the example below, the query for the word "distribution" returned a result with the word "distribute" found in a task's additional information._

<img alt="search global" className="img_sizing item shadow--tl" src={useBaseUrl('img/client_search_06.png')} /> 
<br/>

### Compact Results {#results}
_Press the **SEE MORE** option to find more search query results in a specific field._

<img alt="search global" className="img_sizing item shadow--tl" src={useBaseUrl('img/client_search_05.png')} /> 
<br/>

### Shared Documents {#shared-documents}
_Shared file and [note](/docs/documentation/client/notes) content is also searched through._

<img alt="search document" className="img_sizing item shadow--tl" src={useBaseUrl('img/client_search_07.png')} /> 
<br/>

### Search History {#history}
A user's previous search queries are stored in the global search bar and accessed from a dropdown menu. Only searches with used results are stored, i.e., queries in which a response was clicked upon. The last five queries are automatically stored in the dropdown menu.

<img alt="search history" className="img_sizing item shadow--tl" src={useBaseUrl('img/client_search_08.gif')} />
<br/>
