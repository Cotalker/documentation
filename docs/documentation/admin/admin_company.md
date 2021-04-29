---
id: admin_company
title: Company Section
sidebar_label: Company
---
import useBaseUrl from '@docusaurus/useBaseUrl'; 
import Highlight from '@theme/Highlight';

<img alt="design" class="img_sizing" src={useBaseUrl('img/design/Company.svg')} />

## Overview {#company-overview}
The _company_ is where the created users belong. For now, the user can only be related to one company, but in the future it could be more than one. 

_In this section you can only edit aspects of the company._


<img alt="company" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_company_00.png')} />
<br/>



## Company Settings Panel {#company-editor}
In this section you can edit or create a single company.

<img alt="settings panel" className="img_sizing_narrow item shadow--tl" src={useBaseUrl('img/admin_company_01.png')} />
<br/>



## Field Descriptions
_Below are the settings panel's field description:_

| Field | Description | Notes | 
| ---- | ----------- | ----- | 
| Name | Visual Name of the Company | |
| Legal identifier | The Rut of the company in Chile or another foreign identifier. | |
| Legal Company name | The official name of the company | |
| Country | Country where the company resides |  |
| Taxpayer ID number | It could be the rut or another one. | |
| Default language | You can choose between english or spanish. | Determines the language of the message sent by the server and does not depend on the device. For example: send an email. |
| Email Image | WIP | |
| News propertie's categories | WIP | |
| Job categories | Job addition. | If you add a job category, you won't be able to delete it later. |
| Show terms of service | The TOS will be displayed the first time the user enters to Cotalker. | When active, the TOS will be the assigned URL. Otherwise it will display a default cotalker URL. |
| Terms of service's URL | The URL displayed in the terms of Service. |  |
| Show contact list | If it's active, it show the contact of a user in the main bar. | You can still see the conversations with the users you chatted with previously. |
| Contact display mode | Available options: _All company users_, _All user with whom you have activities in Cotalker_, and _All the users with whom you have activities in cotalker and the colleagues that you have in your contacts_. | This option will limit users' ability to see other users in their contact lists and other places, like surveys where _user lists_ are used as options for answering survey questions.
| Read user's contacts list | Ask the user if the application can access their contacts. | For mobile Users |
| Read user's geolocation | Ask the user if the application can access their geolocation. | For mobile Users |
| Initial section | Enables to force starting the session from a specific group. | Only groups in the Main Menu Bar are available. |
| News properties' categories | | |