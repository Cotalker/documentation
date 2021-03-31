---
id: admin_company
title: Company Section
sidebar_label: Company
---
import useBaseUrl from '@docusaurus/useBaseUrl'; 
import Highlight from '@theme/Highlight';

# Company Overview {#company-overview}
<img alt="" src={useBaseUrl('img/admin_company.png')} width= "20%" height= "20%" align="left"/>
The company is where the created users belong. For now, the user can only be related to one company, but in the future it could be more than one. <br/> In this section you can only edit aspects of the company.
<br clear="left" />

# Company editor {#company-editor}
In this section you can edit or creat a single company.
<img alt="" src={useBaseUrl('img/admin_company_edit_1.png')} />
<img alt="" src={useBaseUrl('img/admin_company_edit_2.png')} />

<br/><br/>

Below you will find the description and notes for each field in the pictures above.

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
| Read user's contacts list | Ask the user if the application can access their contacts. | For mobile Users |
| Read user's geolocation | Ask the user if the application can access their geolocation. | For mobile Users |