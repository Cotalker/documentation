---
title: Edit Workflow Group Settings Panel
---

import useBaseUrl from '@docusaurus/useBaseUrl'; 

## Accessing the Panel {#accessing}

From the [Initial Settings Panel (Workflow Groups)](/docs/documentation/admin/workflows/settings_panels/workflowgroups-initial), press the corresponding icon from the _workflow group list_.

<img alt="edit workflow group" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_workflowgroup_edit_00a.png')} />
<br/>

<div className="alert alert--secondary">

## Settings Panel Layout {#panel-layout}
After choosing the workflow group to edit, the following settings panel opens up:

<img alt="settings panel" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_workflowgroup_edit_00.png')} />
<br/>

_Options:_
1. **Deactivate**: Deactivate the group.
2. **Save**: Save current configuration.

_Configurations:_
- [**A. General information**](#general-information-section)
- [**B. Icon**](#icon-section)
- [**C. Help**](#help-section)
- [**D. Layout**](#layout-section)
- [**E. Secondary actions**](#secondary-actions-section)

</div>
<br/>

<div className="alert alert--secondary">

### A. General Information {#general-information-section}
_Basic setup and display options._

<img alt="general info" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_workflowgroup_create_01.png')} />
<br/>

<div className="container box">
<div className="row table-row-1">
<div className="col col--3"><b>Name:</b></div>
<div className="col col--5">The group's display name.</div>
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
<div className="col col--5">The group can be positioned within another group as a child. The parent group must already exist.</div>
<div className="col col--4"><em>

[Learn more about parent groups](/docs/documentation/admin/tips/parent_group)

</em></div>
</div>
</div>
<br/>

</div>
<br/>


<div className="alert alert--secondary">

### B. Icon Fields {#icon-section}
_Configures the group symbol shown on the Main Menu Bar._

<img alt="icon" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_workflowgroup_create_02.png')} />
<br/>

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

</div>
<br/>

<div className="alert alert--secondary">

### C. Help Fields {#help-section}
_Sets up onboarding when users log in to the app or website._

<img alt="help" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_workflowgroup_create_03.png')} />
<br/>

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


</div>
<br/>

<div className="alert alert--secondary">

### D. Layout Fields {#layout-section}
_Configures how channels are displayed in a workflow group._

<img alt="layout" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_workflowgroup_create_04.png')} />
<br/>

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


</div>
<br/>

<div className="alert alert--secondary">

### E. Secondary Actions {#secondary-actions-section}

_This section allows you to set up the ***secondary actions*** which are made available for end-users through a group's ***actions button***. With secondary actions users can access URLs, which can be configured to go to different channels or even open external websites._

_Learn more about the [workflow group actions button](/docs/documentation/admin/tips/action_button)._

<img alt="add new action" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_workflowgroup_create_05a.png')} />
<br/>

**+ ADD NEW ACTION**: creates an _action_ that can be accessed through the _actions button_.



Pressing this button opens up a **New action** pad. Press the pad to open the new action's settings panel.
<img alt="add new action" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_workflowgroup_create_05b.png')} />
<br/>

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


</div>
<br/>
