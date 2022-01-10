---
title: How to Find a State's ObjectId
---
import useBaseUrl from '@docusaurus/useBaseUrl'; 
import Highlight from '@theme/Highlight';

Here are some ways you can find a workflow state's ObjectID.

First, we must remember that a [_workflow state_](/docs/documentation/client/basic_concepts#state) is an [_element_](/docs/documentation/client/basic_concepts#elements) within a [_collection_](/docs/documentation/client/basic_concepts#collection). In the backend, _Elements_ are also known as _properties_, and _collections_ as _property types_. An _element's_ data model is called [COTProperty](/docs/documentation/models/databases/model_properties), therefore its identification code is referred to as ObjectId<COTProperty\>.

Second, to find out which states are available in a workflow, go to the corresponding [Create/Edit Workflow Settings Panel](/docs/documentation/admin/workflows/settings_panels/workflow_create_edit#states). Scroll down the settings panel to find the list of available states. The _State list_ field indicates the _collection_ the _states_ belong to.

<img alt="find states" className="img_sizing item shadow--tl" src={useBaseUrl('img/find_state_properties_00.png')} />
<div className="text-center"><em>In the area within the dotted-line box you can find a list of the available states.</em></div>
<br/>

Once you have the state names, you can search for their objectId in some of the following ways:

- Use the [search tool](/docs/documentation/client/client_search) to find the corresponding _property (element)_:  
<img alt="search states" className="img_sizing item shadow--tl" src={useBaseUrl('img/find_state_properties_01.png')} />
<div className="text-center"><em>Use the search tool to find the state and then open it to find all its details.</em></div>
<br/>

- View the _collection_ from the _Database_ section:
<img alt="database tool" className="img_sizing item shadow--tl" src={useBaseUrl('img/find_state_properties_02.png')} />
<div className="text-center"><em>Once you find the element in the collection, you can find its objectID embedded in the browser's address bar.</em></div>
<br/>


- Enter the [database admin section](/docs/documentation/admin/database/admin_database_overview): 
<img alt="admin section" className="img_sizing item shadow--tl" src={useBaseUrl('img/find_state_properties_03.png')} />
<div className="text-center"><em>Select the corresponding collection that hosts the elements that represent the available states.</em></div>
<br/>

- Use an [API request](/docs/documentation/api/tasks/statemachines) to get all the task states:  
<span className="badge badge--success">GET</span> /tasks/&#123;ObjectId&#60;COTTaskGroup&#62;&#125;/sm/smstate/all

<img alt="api" className="img_sizing item shadow--tl" src={useBaseUrl('img/find_state_properties_04.png')} />
<div className="text-center"><em>Find the property field to get each state's ObjectId&#60;COTProperty&#62;.</em></div>
<br/>

- Search through an [SQL database](/docs/documentation/sql_bi/overview):
<img alt="sql" className="img_sizing item shadow--tl" src={useBaseUrl('img/find_state_properties_05.png')} />
<div className="text-center"><em>If you have proper access, you can search through the SQL database.</em></div>
<br/>


- Return to:  
[Task Permissions for Unassociated Users](/docs/documentation/api/tasks#patch-taskgroup-permissions)