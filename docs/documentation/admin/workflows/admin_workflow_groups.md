---
id: admin_workflow_groups
title: I. Workflow Groups
sidebar_label: I. Workflow Groups
---
import useBaseUrl from '@docusaurus/useBaseUrl'; 
import Highlight from '@theme/Highlight';

<img alt="design" className="img_sizing" src={useBaseUrl('img/design/Workflows.svg')} />



### Initial Settings Panel {#initial-settings-panel}
From the initial settings panel, you can find the entire list of _workflow groups_ that have been created. 

_Workflow groups settings panel shown below:_

<img alt="workflow group" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_workflows_groups_00.png')} />
<br/><br/>

New _workflow groups_ can be created by pressing the <span class="badge badge--secondary">+</span> icon found in the upper right-hand corner. 

Further icon descriptions can be found in the [Overview section](/docs/documentation/admin/admin_overview).

_The table information is explained below:_
- **Icon**: Group icon
- **Name**: Visible group name.
- **Initial Workflow**: Workflow which starts off the task.
- **Options**: _Configure Workflows_ - _View Channels_ - _Edit Workflow Group_

:::note
  _[**Configure Workflows**](#configure-workflows), [**View Channels**](/docs/documentation/admin/admin_channels#edit--create-single-channel), and [**Edit Workflow Group**](#create-edit-a-workflow-group) options are represented respectively by the following icons:_

<img alt="workflow group" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_workflows_options_00.png')} />
<br/>

:::

<br/>

### Create/Edit a Workflow Group {#create-edit-a-workflow-group}
After choosing to create or edit a _workflow group_ from the [initial settings panel](#initial-settings-panel), you will see the following settings panel:

<img alt="workflow group settings panel" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_workflows_create_group_00.png')} />
<br/><br/>


#### In the following sub-sections, we will review each section of the settings panel in detail: {#sub-sections}



### - <span className="badge badge--secondary">General Information</span> {#general-information}
_Basic setup and display options._

<div className="container box">
<div className="row table-row-1">
<div className="col col--3"><b>Name:</b></div>
<div className="col col--5">The visual name of the group.</div>
<div className="col col--4"><em>It doesn't have to be unique.</em></div>
</div>
<div className="row table-row-2">
<div className="col col--3"><b>Code:</b></div>
<div className="col col--5">Group identification name. Must be unique. Only lowercase letters, numbers, and underscores are accepted. The first character must be a letter.</div>
<div className="col col--4"><em>The code cannot be edited once it is saved.</em></div>
</div>
<div className="row table-row-1">
<div className="col col--3"><b>Weight:</b></div>
<div className="col col--5">A relative number that positions the group on the list. Smaller numbers accommodate the group near the top, larger numbers towards the end.</div>
<div className="col col--4"><em>If you don't type a number, the system will assign one.</em></div>
</div>
<div className="row table-row-2">
<div className="col col--3"><b>Parent Group:</b></div>
<div className="col col--5">The group can be related or positioned within another group as a child.</div>
<div className="col col--4"><em>The parent group must already exist.</em></div>
</div>
</div>
<br/>

:::note
A _parent group_ with a direct access icon in the _main menu bar_ would host a child or sub-group like the image shown below:

<img alt="parent group" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_workflows_parent_00.png')} />
<br/>

:::

### - <span className="badge badge--secondary">Icon Fields</span> {#icon-section}
_Configures the group symbol shown on the Main Menu Bar._

<div className="container box">
<div className="row table-row-1">
<div className="col col--3"><b>Select icon:</b></div>
<div className="col col--5">Choose personalized or pre-designed icon from the menu.</div>
<div className="col col--4"><em>Personalized icons are configured in the "Path" field.</em></div>
</div>
<div className="row table-row-2">
<div className="col col--3"><b>Color:</b></div>
<div className="col col--5">Choose from the menu the icon's color.</div>
<div className="col col--4"><em></em></div>
</div>
<div className="row table-row-1">
<div className="col col--3"><b>Path:</b></div>
<div className="col col--5">Must be filled with Scalable Vector Graphics (SVG) code.</div>
<div className="col col--4"><em>The path is completed automatically when a pre-designed icon is chosen. For personalized icons, SVG code must be inserted manually.</em></div>
</div>
</div>
<br/>

### - <span className="badge badge--secondary">Help Fields</span> {#help-section}
_Sets up onboarding when users log in to the app or website._

<div className="container box">
<div className="row table-row-1">
<div className="col col--3"><b>Activate help for this group:</b></div>
<div className="col col--5">This function is for mobile apps only.</div>
<div className="col col--4"><em>Currently unavailable.</em></div>
</div>
<div className="row table-row-2">
<div className="col col--3"><b>Display in onboarding:</b></div>
<div className="col col--5">Will display onboarding instructions when users log into the app or website.</div>
<div className="col col--4"></div>
</div>
<div className="row table-row-1">
<div className="col col--3"><b>Instructions:</b></div>
<div className="col col--5">Text that will be displayed.</div>
<div className="col col--4"><em>Instructions will be displayed below the animation.</em></div>
</div>
<div className="row table-row-2">
<div className="col col--3"><b>Frequently asked questions' URL</b></div>
<div className="col col--5">This function is for mobile apps.</div>
<div className="col col--4"><em>Currently unavailable.</em></div>
</div>
<div className="row table-row-1">
<div className="col col--3"><b>Animation:</b></div>
<div className="col col--5">Animated image shown in group onboarding. JSON animation format only.</div>
<div className="col col--4"><em>

We recommend using [Lottie File](https://lottiefiles.com/).
</em></div>
</div>

</div>
<br/>

### - <span className="badge badge--secondary">Layout Fields</span> {#design-section}
_Configures how channels are displayed in a workflow group._

<div className="container box">
<div className="row table-row-1">
<div className="col col--3"><b>Additional sorting:</b></div>
<div className="col col--5">Permits you to configure the order in which workflow group channels are displayed.</div>
<div className="col col--4"><em>The default option is to sort channels by name, and then by the last message sent.</em></div>
</div>
<div className="row table-row-2">
<div className="col col--3"><b>Collection:</b></div>
<div className="col col--5">Channels will be sorted by the selected property type. The default option is to sort related channels by property.</div>
<div className="col col--4"><em>If the channels are not related to the selected property type, they will not be sorted.</em></div>
</div>
<div className="row table-row-1">
<div className="col col--3"><b>Order elements by:</b></div>
<div className="col col--5">Elements will be sorted by the selected option.</div>
<div className="col col--4"><em>Available options are: Created At, Weight, Modified At, and Name</em></div>
</div>
<div className="row table-row-2">
<div className="col col--3"><b>Order channels by:</b></div>
<div className="col col--5">Channels will be sorted by the selected option.</div>
<div className="col col--4"><em>Available options are: Created At, Last Message, Modified, At and Name</em></div>
</div>

</div>
<br/>

### - <span className="badge badge--secondary">Channel Creation Fields</span> {#channel-creation-section}
The description of the _channel creation_ fields is as follows:

<div className="container box">
<div className="row table-row-1">
<div className="col col--3"><b>Allow channel creation:</b></div>
<div className="col col--5">Allows users to create channels in the group by pressing the "Actions" button.</div>
<div className="col col--4"><em>The "Actions" button is a green round button found at the bottom of the workflow groups channel panel.
</em></div>
</div>
<div className="row table-row-2">
<div className="col col--3"><b>Permissions:</b></div>
<div className="col col--5">Specific user permissions needed to create a channel in the group.</div>
<div className="col col--4"><em>Although the button may be visible, without the necessary permissions, users will not be allowed to create channels.</em></div>
</div>
</div>
<br/>

### - <span className="badge badge--secondary">Secondary Actions</span> {#secondary-actions}

Here you can configure the _Actions_ button –a green floating button that appears at the bottom of the group's channel panel– where users can access URLs, which can be configured to open external websites, go to different sections of the app, answer surveys, and create tasks.

_The Actions button and its corresponding Actions Menu will look something like the image below:_
<img alt="fab secondary actions" className="img_sizing item shadow--lw" src={useBaseUrl('img/admin_groups_fab_secondary_actions.png')} />
<br/>

:::note
New channels can also be created through the _Action_ button. That option is activated in the [Channel Creation Section](admin_workflow#channel-creation-section)
:::

<br/>

Descriptions of the fields and options in the _secondary actions_ section are explained below:

The <span className="badge badge--secondary">+ ADD NEW ACTION</span>: creates an _action_ that can be accessed through the _Actions_ button.
<img alt="add new action" className="img_sizing item shadow--lw" src={useBaseUrl('img/admin_groups_secondary_actions_00.png')} />
<br/>

Pressing this button opens up a <span className="badge badge--secondary">New action #1</span> pad. Press the pad to open the new action's settings panel.
<img alt="add new action" className="img_sizing item shadow--lw" src={useBaseUrl('img/admin_groups_secondary_actions_01.png')} />
<br/>

The action's settings panel fields are described below:

<div className="container box">
<div className="row table-row-1">
<div className="col col--3"><b>Name:</b></div>
<div className="col col--5">Name given to the action. The name will appear as an option in the Actions Menu.</div>
<div className="col col--4"><em>You can use any characters.</em></div>
</div>
<div className="row table-row-2">
<div className="col col--3"><b>Url:</b></div>
<div className="col col--5">Indicates de URL that will be accessed. URLs can point to external or internal pages. They can also point to sections within the app, surveys, and tasks by indicating their URL.</div>
<div className="col col--4"><em>You can obtain the URLs for surveys, tasks, and other app objects by going directly to them and copying the address directly from your navigator's URL bar.</em></div>
</div>
<div className="row table-row-1">
<div className="col col--3"><b>Use authentication:</b></div>
<div className="col col--5">Sends the user's authentication token to external sites.</div>
<div className="col col--4"><em>This is needed for external sites that require Cotalker authentication. For security reasons, use only on trusted sites.</em></div>
</div>
<div className="row table-row-2">
<div className="col col--3"><b>Open link in a new tab:</b></div>
<div className="col col--5">If activated, the URL will be opened in a new tab in your browser. Otherwise, it will open inside the Cotalker app window.</div>
<div className="col col--4"><em></em></div>
</div>
<div className="row table-row-1">
<div className="col col--3"><b>Select icon:</b></div>
<div className="col col--5">You can choose between personalized or pre-designed icons.</div>
<div className="col col--4"><em>The color cannot be changed.</em></div>
</div>
<div className="row table-row-2">
<div className="col col--3"><b>Path:</b></div>
<div className="col col--5">Must be filled with Scalable Vector Graphics (SVG) code.</div>
<div className="col col--4"><em>If the icon was selected from the list of pre-designed icons, the path will be completed automatically. If a personalized SVG is desired, its code must be inserted manually.</em></div>
</div>

</div>
<br/>

