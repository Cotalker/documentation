---
title: Settings Panel
---

:::caution Advertencia
Esta página aún no se encuentra traducida al español.
:::
import useBaseUrl from '@docusaurus/useBaseUrl';
import Components, {toc as Title1TOC} from '/docs/documentation/admin/survey/components/_component_list.mdx'; 


## Access the Forms Section {#access-surveys-section}

To access the **Form** panel:

1. Press the <span className="badge badge--primary">Administrator</span> button.
2. In the **Administrative Panel**, select <span className="badge badge--primary">Surveys</span>.
3. The **Forms** settings panel opens up.

<div className="img_sizing">

![access](/img/admin_surveys_overview_00.png)

</div>
<br/>

<div className="alert alert--secondary">

## Forms Section Layout {#forms-section-layout}
In the **Forms** section, you can find a list of all active surveys. From here, you can also create, edit, search, and even download surveys.

<div className="img_sizing">

![form section layout](/img/admin_surveys_overview_01.png)

</div>

_Actions:_
- **1. Create survey**: Opens the [**Create form**](#create-edit-form-layout) settings panel.
- **2. Find survey**: Search for surveys.
- **3. More options**: Gives the option to open a list of disabled surveys.

_Table Display and Options:_
- **A. Name**: The survey's display name.
- **B. Code**: The survey's identification code.
- **C. Access roles**: Access roles users need to view the survey.
- **D. Last modified**: Indicates the last time the survey was modified.
- **E. Download | Edit**: The respective icons permite downloading or [editing the corresponding survey](#create-edit-form-layout).

</div>
<br/>


## Create or Edit a Survey {#editcreate-single-surveyform}
To **create a new survey**, press the <span className="badge badge--primary">+</span> button. The [**Create form**](#create-edit-form-layout) settings panel opens up.

<div className="img_sizing">

![create survey](/img/admin_surveys_overview_02.png)

</div>

To **edit an existing survey**, press the edit icon of the corresponding survey in the list. The [**Edit form**](#create-edit-form-layout) settings panel opens up.

<div className="img_sizing">

![access survey section](/img/admin_surveys_overview_03.png)

</div>

<div className="alert alert--secondary">

## Create/Edit Form Settings Panel Layout {#create-edit-form-layout}
Both the **Create form** and **Edit form** settings panels have the same layout which is described below.

<div className="container">
<div className="row">
<div className="col col--6">

<div className="img_sizing">

![access survey section](/img/admin_surveys_overview_04.png)

</div>

</div>
<div className="col col--6 margin-top--lg">

_Actions:_
- **1. Save**: Save current survey settings.

_Settings:_
- [**A. General information**](#general-information): Survey identification settings.
- [**B. Access**](#access): Survey access settings.
- [**C. Form template**](#form-template): Template and components for setting up your survey.

</div>
</div>
</div>
</div>
<br/>

<div className="alert alert--secondary">

### A. General information {#general-information}

<div className="img_sizing">

![general information](/img/admin_surveys_overview_05.png)

</div>

<div className="container box">
<div className="row table-row-1">
<div className="col col--2"><b>Name:</b></div>
<div className="col col--4">The survey's display name.</div>
<div className="col col--6"><em>Any character can be used. We recommend using short descriptive names.</em></div>
</div>
<div className="row table-row-2">
<div className="col col--2"><b>Code:</b></div>
<div className="col col--4">The survey's identification code.</div>
<div className="col col--6"><em>Only lowercase letters, numbers, and underscores are accepted; the code must start with a letter. Once you create and save a code, it cannot be modified.</em></div>
</div>
</div>

</div>
<br/>

<div className="alert alert--secondary">

### B. Access {#access}
_User access to surveys can be configured through three types of filters: groups, user access roles, and elements associated with channels. They can be used in conjunction to limit which users can access a survey. [**See the diagram below to see how access settings work**](#example)._

<div className="img_sizing">

![access](/img/admin_surveys_overview_06.png)

</div>

<div className="container box">
<div className="row table-row-1">
<div className="col col--3"><b>Group Permission:</b></div>
<div className="col col--5">

Select the [group](/docs/documentation/client/groups) that will be allowed to view and answer the survey.

</div>
<div className="col col--4"><em></em></div>
</div>
<div className="row table-row-2">
<div className="col col--3"><b>Access Role:</b></div>
<div className="col col--5">

Indicates the [_access roles_](/docs/documentation/admin/admin_accessrole) users need to be able to fill out the survey.

</div>
<div className="col col--4"><em>If multiple access roles are selected, users must have at least one of them to access the survey form.</em></div>
</div>
<div className="row table-row-title">
<div className="col col--12">CHANNEL ELEMENTS</div>
</div>
<div className="row table-row-1">
<div className="col col--3"><b>Developer Mode</b></div>
<div className="col col--5">Allows the use of custom code to program the logic that determines if a survey is available.</div>
<div className="col col--4"><em>

Go to the [**Developer Mode Survey Access**](/docs/documentation/automation/surveys/survey_hidden_code) section for details on about using developer mode.

</em></div>
</div>
<div className="row table-row-2">
<div className="col col--3"><b>+ Add Element:</b></div>
<div className="col col--5">

Assigns the [collection and element](/docs/documentation/admin/database/admin_database_overview) of a [channel](/docs/documentation/admin/groups/admin_channels#elements) to serve as a survey display filter.

</div>
<div className="col col--4"><em></em></div>
</div>
<div className="row table-row-1">
<div className="col col--3"><b>Collection</b></div>
<div className="col col--5">The collection that holds the elements to be used as filters.</div>
<div className="col col--4"><em>One collection can be selected every time the <b>+ Add Element</b> option has been selected.</em></div>
</div>
<div className="row table-row-2">
<div className="col col--3"><b>Elements</b></div>
<div className="col col--5">The chosen elements used to show the survey only on the channels that have the same elements assigned.</div>
<div className="col col--4"><em>This field appears when the <b>+ Add Element</b> option has been selected.</em></div>
</div>
<div className="row table-row-title">
<div className="col col--12"></div>
</div>
<div className="row table-row-1">
<div className="col col--3"><b>Editable</b></div>
<div className="col col--5">

Determines whether a survey can be edited once it is submitted. Options are: 
- _Yes_ : Allows the survey to be edited after submission.
- _No_ : Sets the survey to read-only mode.
- _Developer Mode_ : Allows the use of custom code to program the logic that determines if the survey is editable or not.

</div>
<div className="col col--4"><em>

By default, surveys are not editable, except for surveys created before the release of this feature (June 2022).

Go to the [**Developer Mode Survey Editability**](/docs/documentation/automation/surveys/survey_editable_code) section for details about using the developer mode.

</em></div>
</div>
</div>

<br/>

<div className="container">
<div className="row">
<div className="col col--6">

#### Survey Access Example {#example}
_The diagram below represents a survey using the three access filters._

<div className="img_sizing">

![survey access](/img/survey_access_settings_00.png)

</div>


</div>
<div className="col col--6">

#### Example Explanation {#example-explanation}
_In the diagram:_
- The group filter is used first, indicating that the survey can only appear within the _Red_ group.  
- The _Red_ group has three channels. Initially, the survey could be available in the three channels.
- The second filter used is for channels associated with the "X" element.  
- Only two of the group's channels are associated with the "X" element.  
- This means that the survey is available in only those two groups.  
- Finally, the user access role filter is used.  
- In this case, only users with the "Supervisor" access role can use the survey form.  
- In the example, only _user B_ has the "Supervisor" access role.  
- In conclusion, the survey is available in the _Red_ group's _channel 1_ and _channel 2_ only for _user B_.  
- User B cannot access the survey from channel 3.

</div>
</div>
</div>

</div>
<br/>

<div className="alert alert--secondary">

### C. Form Template and Components {#form-template}

Set up the form using different components or input types for setting up questions.  

<div className="img_sizing">

![template and components](/img/admin_surveys_overview_07.png)

</div>


- [**a. Form Template**](#template): Create and organize your survey form here.
- [**b. Components**](#form-components): List of available input types for your survey form.

#### a. Form Template {#template}

The template permits you to preview how the _user_ will visualize the _survey_ and its _components_. Bear in mind, a _user's_ visualization might change slightly depending on their web browser.

To **add a _component_** to the _survey_, just drag the <span className="badge badge--warning">component</span> to the _template_.

<div className="img_sizing">

![components](/img/admin_surveys_overview_08.gif)

</div>



#### b. Components {#form-components}

Form components are different input types that can be used and configured to make your survey questions. 

Press the <span className="badge badge--info">components</span> button on the upper right side of the section to make the **list appear or disappear**.

<Components/>

:::tip
Go to the [Components](/docs/documentation/admin/survey/components_overview) section for more information.
:::

</div>
<br/>


---

## Best Practices {#best-practices}
### State Change Survey Trigger {#state-change-survey-trigger}
If you need a _survey_ to determine the next _state_ of a _task_, use [_survey triggers_](/docs/documentation/admin/workflows/settings_panels/create_edit_state#survey-trigger) that can be configured from the [create/edit state settings panel](/docs/documentation/admin/workflows/settings_panels/create_edit_state). For example, if a user is asked to validate a job through a _survey_, whether it gets validated or not will affect the status of the task.

### Survey Triggered Routines {#survey-triggered-routines}
_Survey-triggered routines_ unassociated with _task states_ should be initiated through [_global bots_](/docs/documentation/admin/admin_bots#functions). If, for example, you wish to plan a Cotalker video call meeting, use a bot to schedule it since there are no state changes involved.

### Surveys Associated to Task States {#survey-task-states}
If a survey is to be made available only within a specific task state, the element that represents the state must be associated with the survey. In case the survey has to be available in more than one task state, a collection with elements that are to be required to view the survey should be created.

For example, you can use an element to make a survey available in a channel at a specific moment. First, create the element and associate it manually to the survey. Then you can associate the element to the desired channel through a routine.  Afterward, when the state has changed, the associated element can be taken off the channel through another routine to make the survey no longer visible.

### Required Fields {#required-fields}
When a _survey_ gathers information used by a [bot](/docs/documentation/admin/admin_bots#functions), the fields that provide the data for the _routine_ should be set to _required_. Fields are set to as _required_ by pressing the _required_ icon found in the [form component tabs](/docs/documentation/admin/survey/components_overview#icon-descriptions).
