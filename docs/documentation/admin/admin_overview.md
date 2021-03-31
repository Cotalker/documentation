---
title: Overview
sidebar_label: Overview
---
import useBaseUrl from '@docusaurus/useBaseUrl';
import Highlight from '@theme/Highlight';

<img alt="design" class="img_sizing" src={useBaseUrl('img/design/overview.svg')} />

## Introduction {#introduction}
Cotalker customers will find themselves with different _data models_.
One of these _models_ is the _user_, the basic unit of a company, which can:
- Be assigned an _access role_ which defines what information they can read or edit.
- Interact through _channels_ using _surveys_ or _messages_ with other _users_ in a particular _group_.
- Participate in a company process modeled by a _workflow_ guided by a _task_. For example, a workflow can be the rendering of expenses. In the _group channel_, _users_ can send a request to have it managed as a _task_. The _task_ is then sent to each of the bosses – through the use of _surveys_ – for their approval. Each created _task_ will be housed in its own unique _channel_, where the respective responses of the people involved will be found.
The **workflow** requires the creation of a _state machine_ to configure the process. It is built upon relations (represented by arrows) and states (represented by nodes), as you can see in the following image:
<img alt="" src={useBaseUrl('img/admin_overview_statemachine.png')} />

Furthermore, it is important to know that:
- Creating a _routine_ is necessary for the state machine to perform any action, such as changing from one state to another, sending an email, or sending a standard message to a channel.
- A _bot_ corresponds to the _model_ that executes a _routine_ to start a state machine or a standard activity in a company.
- Finally, the _scheduler_ works to execute a routine periodically in the company. For example: sending the pending task of the week every Monday.

_Elements_ are a state machine's basic unit because they determine the states a _state machine_ can have. Each _element_ corresponds to a unit derived from a _collection_. Following the example above, the _elements_ of the state machine (Headquarters Review, CEOs reviews, Management Review, Rejected Requests, and Accepted Requests) belong to the same _collection_ ("Expenses Report").

_Elements_ can also be used with different data models (_surveys_, _channels_, _users_, and others). The concepts used in each model are specified accordingly in the documentation.


## Icons {#icons}
When using the _administrative panel_, various icons will appear to offer possible actions or options in the different windows.


Below, we find the descriptions of the buttons used for **element lists in all _models_**:

| Action Name | Image | Description |
| ---- | ----- | ----------- |
| Search | <img alt="" src={useBaseUrl('img/icon_search.png')} /> | Search for a specific element |
| Create | <img alt="" src={useBaseUrl('img/icon_plus.png')} /> | Create a new element |
| Edit | <img alt="" src={useBaseUrl('img/icon_edit.png')} /> | Edit a specific element |
| Download | <img alt="" src={useBaseUrl('img/icon_download.png')} /> | Open download menu|
| Import | <img alt="" src={useBaseUrl('img/icon_import.png')} /> | Open import menu. (This is not available for all models) |
| Change Page | <img alt="" src={useBaseUrl('img/icon_arrows.png')} /> | Moves user list backward / forward |
| Change the whole Page | <img alt="" src={useBaseUrl('img/icon_firstone.png')} /> <img alt="" src={useBaseUrl('img/icon_lastone.png')} /> | Moves user list to the first / last page |



The description of the _page buttons_ for **creating or editing an _element_** can be found in the following table:

| Action Name | Image | Description |
| ---- | ----- | ----------- |
| Save | <img alt="" src={useBaseUrl('img/icon_save.png')} /> | Save current configuration |
| Deactivate | <img alt="" src={useBaseUrl('img/icon_deactivate.png')} /> | Deactivate the element |
| Camera | <img width="50" alt="" src={useBaseUrl('img/icon_camera.png')} /> | Set image |
| Back | <img width="50" alt="" src={useBaseUrl('img/icon_back.png')} /> | Back to all elements list |
| Disable | <img width="50" alt="" src={useBaseUrl('img/icon_disabled.png')} /> | Show disabled items |
| Checkbox | <img width="50" alt="" src={useBaseUrl('img/icon_checkbox.png')} /> | Select the item to disable |
| Disable Button | <img width="50" alt="" src={useBaseUrl('img/icon_disablebutton.png')} /> | If it is blue, it activates the item, otherwise it deactivates it. |


The buttons used when **downloading a list of items** are found in the next table:

| Action Name | Image | Description |
| ---- | ----- | ----------- |
| Download | <img width="80" alt="" src={useBaseUrl('img/icon_download_1.png')} /> | Download the list |
| Cancel | <img width="80" alt="" src={useBaseUrl('img/icon_cancel.png')} /> | Retract the download |


In the next table, buttons for when a **list of items is imported**:

| Action Name | Image | Description |
| ---- | ----- | ----------- |
| Select | <img width="80" alt="" src={useBaseUrl('img/icon_select.png')} /> | Select a file from your finder |
| Cancel | <img width="80" alt="" src={useBaseUrl('img/icon_cancel_import.png')} /> | Retract the import |
