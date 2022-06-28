---
title: Surveys Overview
sidebar_label: Overview
---
import useBaseUrl from '@docusaurus/useBaseUrl';
import Highlight from '@theme/Highlight';

<img alt="design" className="img_sizing" src={useBaseUrl('img/design/Surveys.svg')} />
<br/>

## Summary {#survey-overview}
A _survey_ is a way of gathering information from users through _workflows_, _channels_, _bots_, or even [_public surveys_ outside the Cotalker environment](/docs/documentation/admin/workflows/admin_workflow_public_survey). 

Configure survey questions to receive information from different **input sources** and **formats**, e.g., _text, dates, GPS, signatures, [QR codes, NFC](/docs/documentation/api/surveys/questions#qr-code--nfc-function), digital cameras, file attachments, collections, and elements_. See the [Form Components](#form-components) section for more information.

_Surveys_ can also be programmed to respond to certain answers or contexts. For example, you can: 
- make **dynamic surveys** that with certain answers display new [questions](#conditional-display) or [options](/docs/documentation/admin/survey/components/multiple_choice#tree-selector), 
- lead a _workflow_ to **[trigger](/docs/documentation/admin/workflows/admin_workflow_required_survey) a new state or create a new task**; these last surveys can be even made [**public**](/docs/documentation/admin/workflows/admin_workflow_public_survey) for users outside the Cotalker environment,
- automate your surveys with [**Javascript code**](/docs/documentation/automation/surveys/question_exec), e.g., loading the current user's information when opening a survey, validating input information, or automatically sending an email after submitting a survey form. 


:::note
- The terms _survey_ and _form_ are usually used interchangeably. But sometimes, a _survey_ will be the blank template with questions or components, while a _form_ is an answered survey.
- _Survey_ results can be downloaded either through the **Forms** section in the **Administrative Panel** or the [_Reports_](/docs/documentation/client/reports) section accessed through the **Main Menu Bar**.
:::

## Access the Forms Section {#access-surveys-section}

To access the **Form** panel:

<img alt="access survey section" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_surveys_overview_00.png')} />
<br/>

1. Press the <span className="badge badge--primary">Administrator</span> button.
2. In the **Administrative Panel**, select <span className="badge badge--primary">Surveys</span>.
3. The **Forms** settings panel opens up.


<div className="alert alert--secondary">

## Forms Section Layout {#forms-section-layout}
In the **Forms** section, you can find a list of all active surveys. From here, you can also create, edit, search, and even download surveys.

<img alt="form section layout" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_surveys_overview_01.png')} />
<br/>

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

<img alt="create survey" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_surveys_overview_02.png')} />
<br/>

To **edit an existing survey**, press the edit icon of the corresponding survey in the list. The [**Edit form**](#create-edit-form-layout) settings panel opens up.

<img alt="access survey section" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_surveys_overview_03.png')} />
<br/>

<div className="alert alert--secondary">

## Create/Edit Form Settings Panel Layout {#create-edit-form-layout}
Both the **Create form** and **Edit form** settings panels have the same layout which is described below.

<div className="container">
<div className="row">
<div className="col col--6">

<img alt="access survey section" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_surveys_overview_04.png')} />
<br/>

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

<img alt="general information" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_surveys_overview_05.png')} />
<br/>

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

<img alt="access" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_surveys_overview_06.png')} />
<br/>

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

Go to the [**Survey Visibility Code**](/docs/documentation/automation/surveys/survey_hidden_code) section for details on about using developer mode.

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

<img alt="survey access" className="img_sizing item shadow--tl" src={useBaseUrl('img/survey_access_settings_00.png')} />
<br/>

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

<img alt="template and components" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_surveys_overview_07.png')} />
<br/>

- [**a. Form Template**](#template): Create and organize your survey form here.
- [**b. Components**](#form-components): List of available input types for your survey form.

#### a. Form Template {#template}

The template permits you to preview how the _user_ will visualize the _survey_ and its _components_. Bear in mind, a _user's_ visualization might change slightly depending on their web browser.

To **add a _component_** to the _survey_, just drag the <span className="badge badge--warning">component</span> to the _template_.

<img alt="template" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_surveys_overview_08.gif')} />
<br/>



#### b. Components {#form-components}

Form components are different input types that can be used and configured to make your survey questions. 

Press the <span className="badge badge--info">components</span> button on the upper right side of the section to make the **list appear or disappear**.

<span className="hero__subtitle">List of available form components:</span>

- [**Text**](/docs/documentation/admin/survey/components/text_component): _Inserts text into the survey. Usually used as instructions._ 
- [**Written Answer**](/docs/documentation/admin/survey/components/written_answer): _Users can write a reply to the question. This component can also be configured to read QR Codes or NFC input on mobile devices._
- [**Multiple choice**](/docs/documentation/admin/survey/components/multiple_choice): _Give users multiple-choice questions. This component can be configured as a dynamic survey, i.e., to display more options as certain answers are given._
- [**Rating**](docs/documentation/admin/survey/components/rating): _Users can rate an item with "stars"._
- [**Date and time**](/docs/documentation/admin/survey/components/date_and_time): _Answers are received in date or date & time format._
- [**Location**](/docs/documentation/admin/survey/components/location): _Current or other GPS location is obtained through an embedded Google Map._
- [**Attachment**](/docs/documentation/admin/survey/components/attachment): _Send almost any type of file through the survey._
- [**Camera**](/docs/documentation/admin/survey/components/camera): _Send pictures directly from a camera or gallery._
- [**Signature**](/docs/documentation/admin/survey/components/signature): _Freestyle brush that permits handwriting. Useful for signatures._
- [**Survey**](/docs/documentation/admin/survey/components/survey): _Adds an existing survey into the survey._

:::note General Component Configuration
Below you will find more information regarding [component configuration in general](#configuring-components).
:::

</div>
<br/>

## Configuring Form Components {#configuring-components}
General component configuration is discussed here. For specific component configuration, refer to the [component list shown above](#form-components).

_Icons and each configuration tab are be explained below._

### Icon Descriptions: {#icon-descriptions}
The following icons are used in most of the form components for setup and configuration options.

| Action Name | Image | Description |
| ---- | ----- | ----------- |
| Drag | <img alt="" src={useBaseUrl('img/icon_drag.png')} /> | Hold click to drag component |
| Required | <img alt="" src={useBaseUrl('img/icon_required.png')} /> | Click to make the component a required field that the user must fill out. |
| Writing not permitted | <img alt="" src={useBaseUrl('img/icon_idw.png')} /> | Users cannot answer the question but will still be visible in the survey. |
| Duplicate | <img alt="" src={useBaseUrl('img/icon_duplicate.png')} /> | Duplicate the component. It will not duplicate the identifier. |
| Delete | <img alt="" src={useBaseUrl('img/icon_delete.png')} /> | Delete the component |

You can **edit** a <span className="badge badge--warning">component</span> by clicking on it once it is on the template.

Each component has three sections (tabs) that can be configured: _General_, _Conditional display_, and _Automation_.

<img alt="tabs" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_survey_03.png')} />
<br/>

### General Tab {#general-tab}

From the **General** tab, configure basic _component_ settings. Each component will display in this tab its specific basic configuration. Some _components_ might also require creating _collections_ and _elements_. Go to a [component's page](#form-components-list) for specific field descriptions, configuration, and requirements.

<img alt="general tab" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_survey_04.png')} />
<br/>

#### General Field Descriptions: {#field-descriptions}

<div className="container box">
<div className="row table-row-1">
<div className="col col--3"><b>Field label:</b></div>
<div className="col col--5">The visual name of the component</div>
<div className="col col--4"><em></em></div>
</div>
<div className="row table-row-2">
<div className="col col--3"><b>Identifier:</b></div>
<div className="col col--5">The unique id of the component.</div>
<div className="col col--4"><em>

It will be needed if working with APIs, dashboards, routines, [conditional display](#conditional-display), or [automations](#automation).

</em></div>
</div>
<div className="row table-row-1">
<div className="col col--3"><b>Minimum:</b></div>
<div className="col col--5">Indicates a minimum of responses that the component requires.</div>
<div className="col col--4"><em>In the case of a written response, each character will be taken into account.</em></div>
</div>
<div className="row table-row-2">
<div className="col col--3"><b>Maximum:</b></div>
<div className="col col--5">Indicates the maximum number of responses the component can accept.</div>
<div className="col col--4"><em>In the case of a written response, each character will be taken into account.</em></div>
</div>
</div>

### Conditional Display Tab {#conditional-display}

Each _component_ has the **conditional display** tab, which allows you to make a _dynamic survey_, i.e., depending on the answers given to a certain question, new questions relative to the answer will appear. For example, if the response of component *X* is *A*, component *Y* will be displayed; otherwise, it will remain hidden.

_The conditional display settings panel:_

<img alt="conditional tab" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_survey_05.png')} />
<br/>

The descriptions of the fields are found below:

<div className="container box">
<div className="row table-row-1">
<div className="col col--3"><b>Commander:</b></div>
<div className="col col--5">

Select the _commander identifier_, i.e., the [_identifier_](#field-descriptions) of the **component** that will determine if the _conditionally displayed component_ opens up.

</div>
<div className="col col--4"><em>

All existing component _identifiers_ of the present survey are displayed.

</em></div>
</div>
<div className="row table-row-2">
<div className="col col--3"><b>Criteria:</b></div>
<div className="col col--5">Select the comparison criteria, i.e., the operator of the conditional.</div>
<div className="col col--4"><em>

Options are: *Is equal to*, *Greater than or equal*, *Less than or equal* or *Regular expression*.

</em></div>
</div>
<div className="row table-row-1">
<div className="col col--3"><b>Value:</b></div>
<div className="col col--5">

Write the `identifier` related to the commanding answer.

</div>
<div className="col col--4"><em>

For multiple answers, use the following syntax: `(example1)|(example2)`

</em></div>
</div>

</div>


### Automation Tab {#automation}

From the **automation** tab, you can add Javascript code to customize your surveys even more. For complete information and examples, go to the [QuestionExec](/docs/documentation/automation/surveys/question_exec) section.

<img alt="automation tab" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_survey_06.png')} />
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
When a _survey_ gathers information used by a [bot](/docs/documentation/admin/admin_bots#functions), the fields that provide the data for the _routine_ should be set to _required_. Fields are set to as _required_ by pressing the _required_ icon found in the [form component tabs](/docs/documentation/admin/survey/survey_overview#icon-descriptions).