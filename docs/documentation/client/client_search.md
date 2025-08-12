---
title: Search Tool
---
import useBaseUrl from '@docusaurus/useBaseUrl'; 

<img alt="title image" className="img_sizing" src={useBaseUrl('img/design/Database.svg')} />
<br/>

## Overview {#overview}

Search queries are carried out through different fields of the Cotalker environment, making it easier and more efficient to find and display results. Search fields include: _user_, _channel_, _properties_, _task names_, _additional task information_, and _shared documents_.

## Global Search {#global-search}
When accessed through the **Tool Bar**, search queries are global, i.e., made throughout the entire environment.

<img alt="global search icon" className="img_sizing item shadow--tl" src={useBaseUrl('img/client_search_01.gif')} /> 
<br/>

:::tip
**Global Search** _shortcut key_: **F3**
_When summoned with the shortcut key, a new search window pops up._
:::

<img alt="search types" className="img_sizing item shadow--tl" src={useBaseUrl('img/client_search_09.png')} /> 
<br/>


## Search Query Scope {#search-fields}

The scope of search queries is bounded to the following fields:

- **Users**: Search through the _user_ names found in the company's Cotalker environment. Bots also have _user_ accounts.
- **Channels**: Search through _channel_ names.
- **Properties**: Search by names of _properties_, also known as _elements_. _Properties_ (_elements_) are the components of _collections_ (_databases_ or _property types_).
- **Tasks**: Queries search through task _names_ and the _additional information_ field. When searching through tasks' _additional information_, a process called stemming – which reduces words to their stem or root – is used, allowing a broader range of results.

<!-- ## Additional Features {#additional} 

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
<br/> -->