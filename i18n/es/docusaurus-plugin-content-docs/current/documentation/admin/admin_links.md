---
id: admin_links
title: Links Groups Section
sidebar_label: Links Groups
---
import useBaseUrl from '@docusaurus/useBaseUrl'; 
import Highlight from '@theme/Highlight';

# Group Overview {#group-overview}
<br />
<img alt="" src={useBaseUrl('img/admin_linkgroup.png')} width= "20%" height= "20%" align="left"/>
The links group is as a hyperlink, which when you click on it redirects you to the specific link. For example, when you click on the documentation group, you are redirected to this web page. https://doc.cotalker.com/docs/intro_overview. <br/> In this section of the admin you can creat, search, check and downloads the groups of the company. <br clear="left" />
<br/> <br/>
The following image shows how it looks in the application.
<br/><br/>
<img alt="" src={useBaseUrl('img/admin_groups_link.png')} /> 
<br/><br/>
The hyperlink is this documentation. An other option is to open a new tab. 

# All Links Groups {#all-links-groups}
In this part, you can find the entire list of groups that have been created.
<img alt="" src={useBaseUrl('img/admin_linksgroup.png')} /> 
<br/><br/>

The description of the icons are in the [Overview section](admin_overview).

The information shown in the list are:
- Icon: Group figure
- Name: Group visual name.
- Last Modified: Last time the group was edited.

# Edit / Create Single Group {#edit--create-single-group}
In this section you can edit or creat a single group.
<br />
<img alt="" src={useBaseUrl('img/admin_group_link.png')} /> 
<br/><br/>
The description of the general information fields is as follows:
<br/><br/>

| Field | Description | Notes | 
| ---- | ----------- | ----- | 
| Name | The visual name of the group | It dosen't have to be unique. |
| Code | The identifier of the group | It only accept lowercase, number and underscore and start with the letters. Once you create and save the code, you cannot change it.|
| Weight | A relative number that positions the group on the main bar. A small number accommodates the group at the beginning, therefore a large one at the end. | If you don't type a number, the system will assign one. |
| Parent Group | You can choose a group to position itself within it. | The group you choose must already be created |
| URL | The url as a hyperlink |  |
| Open Link in a new tab | If it is active it will open the URL in a new browser tab, otherwise it will open in the app. |  |

<br/>
To illustrate the parent group, the following image is shown:
<img alt="" src={useBaseUrl('img/admin_group_parent.png')} />
As you can see I+D is the parent group shown in the main bar. Once you are there, you can see the subgroups. 

<br/><br/>
The icon section configures the group symbol shown on the main bar. The description of the icon fields is as follows:
<br/><br/>

| Field | Description | Notes | 
| ---- | ----------- | ----- | 
| Select icon | You can choose between personalized or once of the premade |  |
| Color | You can choose from the list of colors that is shown |  |
| Path | It's populated with Scalable Vector Graphics. If the icon is personalized, it must be completed manually, otherwise it will be completed automatically |  |


The description of each button on the page where the group is created can be found in the [Overview section](admin_overview).
