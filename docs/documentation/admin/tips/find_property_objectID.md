---
title: How to Find a State's ObjectId
---
import useBaseUrl from '@docusaurus/useBaseUrl'; 
import Highlight from '@theme/Highlight';

Here are some ways you can find a workflow state's ObjectID.

First, we must remember that a [_workflow state_](/docs/documentation/client/basic_concepts#state) is an [_element_](/docs/documentation/client/basic_concepts#elements) within a [_collection_](/docs/documentation/client/basic_concepts#collection). In the backend, _Elements_ are also known as _properties_, and _collections_ as _property types_.

Second, to find out which states are available in a workflow, go to the corresponding [Create/Edit Workflow Settings Panel](/docs/documentation/admin/workflows/settings_panels/workflow_create_edit#states). Scroll down the settings panel to find the list of available states. The _State list_ field indicates the _collection_ the _states_ belong to.

<img alt="find states" className="img_sizing item shadow--tl" src={useBaseUrl('img/find_state_properties_00.png')} />
<div className="text-center"><em>In the area within the dotted-line box you can find a list of the available states.</em></div>
<br/>

Once you have the state names, you can search for their objectId in some of the following ways:

- Use the [search tool](/docs/documentation/client/client_search) to find the corresponding _property (element)_:  
<img alt="search states" className="img_sizing item shadow--tl" src={useBaseUrl('img/find_state_properties_01.png')} />
<div className="text-center"><em>Use the search tool to find the state and then open it to find all its details.</em></div>
<br/>

- Go to _Database_ tool in the **Main Menu Bar**:
<img alt="database tool" className="img_sizing item shadow--tl" src={useBaseUrl('img/find_state_properties_02.png')} />
<div className="text-center"><em>Once you find the element, you can find its objectID embedded in the browser's address bar.</em></div>
<br/>


- Enter the [database admin section](/docs/documentation/admin/admin_properties): 
<img alt="admin section" className="img_sizing item shadow--tl" src={useBaseUrl('img/find_state_properties_03.png')} />
<div className="text-center"><em>In the area within the dotted-line box you can find a list of the available states.</em></div>
<br/>

- Use [GET /properties API request](/docs/documentation/api/databases/properties) to get [COTProperty](/docs/documentation/models/databases/model_properties): 
<img alt="api" className="img_sizing item shadow--tl" src={useBaseUrl('img/find_state_properties_04.png')} />
<div className="text-center"><em>Search throuth the API response to find the state's ObjectId.</em></div>
<br/>

- Search through an [SQL database](/docs/documentation/sql_bi/overview):
<img alt="sql" className="img_sizing item shadow--tl" src={useBaseUrl('img/find_state_properties_05.png')} />
<div className="text-center"><em>If you have proper access, you can search through the SQL database.</em></div>
<br/>


- Return to:  
[Task Permissions for Unassociated Users](/docs/documentation/api/tasks/tasks#task-permissions-for-unassociated-users)