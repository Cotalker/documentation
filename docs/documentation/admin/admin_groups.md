---
id: admin_group
title: Groups Section
sidebar_label: Groups
---
import useBaseUrl from '@docusaurus/useBaseUrl';
import Highlight from '@theme/Highlight';

<img alt="design" class="img_title src={useBaseUrl('img/design/Groups.svg')} />

## Overview {#group-overview}



### General Information Section {#general-information-section}
The description of the general information fields is as follows:

| Field | Description | Notes |
| ---- | ----------- | ----- |
| Name | The visual name of the group | It doesn't have to be unique. |
| Code | The identifier of the group | It only accepts lowercase letters, numbers, and underscore; and starts with a letter. Once you create and save the _code_, you cannot change it.|
| Weight | A relative number that positions the group on the main bar. A small number accommodates the group at the beginning, therefore a large one at the end. | If you don't type a number, the system will assign one. |
| Parent Group | You can choose a group to position itself within it. | The group you choose must be already created. |
<br/>

The following image illustrates what a parent group looks like:

<img alt="" src={useBaseUrl('img/admin_group_parent.png')} />

As you can see, I+D is the parent group shown in the main bar. Once you are there, you can see the subgroups.

### Icon Section {#icon-section}
The icon section configures the group symbol shown on the main bar. The description of the icon fields is as follows:

| Field | Description | Notes |
| ---- | ----------- | ----- |
| Select icon | You can choose between personalized or pre-designed icons.|  |
| Color | You can choose from the list of colors that is shown |  |
| Path | It's populated with Scalable Vector Graphics (SVG). If the icon is personalized, it must be completed manually, otherwise it will be completed automatically |  |
<br/>

### Help Section {#help-section}
The help section sets up the onboarding when you log in to the App or Website. The description of the help fields is as follows:

| Field | Description | Notes |
| ---- | ----------- | ----- |
| Activate help for this group | This function is for the mobile application | For now it is not being used |
| Display in onboarding | If it is active it will show up after you log in the App or Website |  |
| Instructions | Texts that explain whatever you want in the onboarding. | It will show below the animation |
| Frequently asked question's URL | This function is for the mobile application | For now it is not being used |
| Animation | It is the animated image shown in the onboarding of the group. It's filled with an animation json. | We recommend using Lottie File. |
<br/>

### Design Section {#design-section}
The _design_ section configures how channels are displayed in the group. The description of the layout fields is as follows:

| Field | Description | Notes |
| ---- | ----------- | ----- |
| Additional sorting | If active, you can configure the position of the channel where it is displayed. Otherwise, the default option is to sort by the state name and then by the last message sent. |  |
| Collection | Channels will appear in the channel list sorted by the selected collection. The default option is to sort by the element by which channels are related. | If the channels are not related to the selected collection, they will not be sorted. |
| Order elements by | Elements are sorted by the selected option. You can choose between Created At, Weight, Modified At, and Name |  |
| Order channels by | Channels are sorted by the selected option. You can choose between Created At, Last Message, Modified At, and Name |  |
<br/>

### Channel Creation Section {#channel-creation-section}
_Users_ can be given the option to create new _channels_ within the _group_.

Below are the descriptions of the fields found in this section:

| Field | Description | Notes |
| ---- | ----------- | ----- |
| Allow channel creation | When activated, it will allow users to create channels in the group. | Once active, the "Actions" button – a green floating button near the bottom of the group's panel – will appear. Pressing the button slides open a list of possible actions.|
| Permissions | Specific user permissions needed to create a channel in the group. | Although the button will be visible if activated, without the necessary permissions, users will not be allowed to create channels. |
<br/>

_If activated, users will be able to create new channels through the Actions button seen below:_

<img alt="fab" class="img_sizing item shadow--lw" src={useBaseUrl('img/admin_groups_fab_communication_group.png')} />
<br/>

### Secondary Actions {#secondary-actions}
Through the _Actions_ button – a green floating button that appears at the bottom of the group panel – users can access URLs, which can be configured to open external websites, go to different sections of the app, and answer surveys.

_The Actions button and its corresponding Actions Menu will look something like the image below:_
<img alt="fab secondary actions" class="img_sizing item shadow--lw" src={useBaseUrl('img/admin_groups_fab_secondary_actions.png')} />
<br/>

:::note
New channels can also be created through the _Actions_ button. That option is activated in the [Channel Creation Section](admin_group#channel-creation-section)
:::

<br/>

Descriptions of the fields and options in the _secondary actions_ section are explained below:

The <span class="badge badge--secondary">+ ADD NEW ACTION</span>: creates an _action_ that can be accessed through the _Actions_ button.
<img alt="add new action" class="img_sizing item shadow--lw" src={useBaseUrl('img/admin_groups_secondary_actions_00.png')} />
<br/>

Pressing this button opens up a <span class="badge badge--secondary">New action #1</span> pad. Press the pad to open the new action's settings panel.
<img alt="add new action" class="img_sizing item shadow--lw" src={useBaseUrl('img/admin_groups_secondary_actions_01.png')} />
<br/>

The action's settings panel fields are described below:

| Field | Description | Notes |
| ----- | ------- | ------- |
| Name | Name given to the action. The name will appear as an option in the Actions Menu. | You can use any characters. |
| Url | Indicates de URL that will be accessed. URLs can point to external or internal pages. They can also point to sections within the app, surveys, and tasks by indicating their URL. | URLs for surveys, tasks, and other app objects can copied through your navegator's URL bar by first going directly to the destination.
| Use authentication | Sends the user's authentication token to external sites. | This is needed for external sites that require Cotalker authentication. For security reasons, use only on trusted sites. |
| Open link in a new tab | If activated, the URL will be opened in a new tab in your browser. Otherwise, it will open inside the Cotalker app window. | |
| Select icon | You can choose between personalized or pre-designed icons.| The color cannot be changed. |
| Path | Must be filled with Scalable Vector Graphics (SVG) code. | If the icon is selected from the list of pre-designed icons, the path will be completed automatically. If a personalized SVG is desired, it must be completed manually. |
<br/>


## Channels {#channels}
_Channels_ are components of the _groups_.


_Workflow groups_ and _regular groups_ can have _channels_. A _channel_ is where two or more Cotalker _users_ can interact with each other, or where one or more _users_ can answer and send a _survey_ to a state machine, in other words, upload information that is used in a company process. Or it could be used to progress through all the task/opportunity/asset states of a process.

<!-- TODO add reference to workgroup channels -->

### Regular Group Channels {#regular-group-channels}
Within the **Groups** option - under _sections_ in the _administrative panel_ – you can find the entire list of _regular groups_ that have been created. By pressing an individual _regular group_ (indicated in the settings panel simply as **groups**), you will see all the _channels_ created in that group. If you would like to create a _channel_ within the _group_, please refer to the next section.
<img alt="" src={useBaseUrl('img/admin_channel_list.png')} />
<br/><br/>

The description of the icons are in the [Overview section](admin_overview).

The information shown in the list is as follows:
- Icon: Channel figure
- Name: Channel visual name.
- Code: Channel code
- Number of participants: how many users are in the channel.


### Edit / Create Single Channel {#edit--create-single-channel}
To create a new _channel_, once you have selected the corresponding _regular group_, press the _create new element_ icon for a new settings dialog panel to open up. Ensure that in the _group_ settings, the **Allow channel creation** button has been previously activated.
<img alt="" src={useBaseUrl('img/admin_channel_create_1.png')}  />
<img alt="" src={useBaseUrl('img/admin_channel_create_2.png')} />
<br />
<br />
Below you will find the description and notes for each field of the **Create channel** settings panel shown above.

| Field | Description | Notes |
| ---- | ----------- | ----- |
| Name | The visual name of the Channel | It doesn't have to be unique|
| Code | The identifier of the Channel | It only accepts lowercase letters, numbers, and underscore; and it must start with a letter. Once you create and save the code, you cannot change it.|
| Group | The group to which the channel belongs | The group you are in is the default. |
| First Property overrides channel name | WIP |  |
| Users | Users who participate in the channel. |  |
| Bots | Bots that run in the channel. |  |
| Properties | Property Addition | Add the _collection_ and _elements_. Useful when setting up a routine or survey associated with a particular _element_. |
| Permission for sending messages | You can choose between "all" or "none" for users allowed to send messages on the channel |  |


The description of each button in the **Create channel** settings panel can be found in the [Overview section](admin_overview).
