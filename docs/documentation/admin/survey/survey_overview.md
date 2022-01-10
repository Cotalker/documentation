---
title: Surveys Overview
sidebar_label: Overview
---
import useBaseUrl from '@docusaurus/useBaseUrl';
import Highlight from '@theme/Highlight';

<img alt="design" class="img_sizing" src={useBaseUrl('img/design/Surveys.svg')} />
<br/>

<div className="shadow--tl alert alert--secondary">

## Summary {#survey-overview}
A _survey_ is a way of capturing information from users through _workflows_, _channels_, _bots_, or even [_public surveys_ outside the Cotalker environment](/docs/documentation/admin/workflows/admin_workflow_public_survey). 

Configure survey questions to receive information from different **input sources** and **formats**, e.g., _text, dates, GPS, signatures, QR codes, NFC, digital cameras, file attachments, collections, and elements_. See the [Form Components](#form-components) section for more information.

_Surveys_ can also be programmed to respond to certain answers or contexts. For example, you can: 
- make **dynamic surveys** that with certain answers display new [questions](#conditional-display) or [options](/docs/documentation/admin/survey/components/multiple_choice#tree-selector), 
- lead a _workflow_ to **[trigger](/docs/documentation/admin/workflows/admin_workflow_required_survey) a new state or create a new task**; these last surveys can be even made [**public**](/docs/documentation/admin/workflows/admin_workflow_public_survey) for users outside the Cotalker environment,
- automate your surveys with [**Javascript code**](/docs/documentation/automation/question_exec), e.g., loading the current users information when opening a survey, validating input information, or automatically sending an email after responding a survey. 


**NOTE:** If you wish to **download** the results of a _survey_, go to the [_Reports_](/docs/documentation/client/reports) section.


</div>
<br/>

## Create or Edit a Survey {#editcreate-single-surveyform}
To create or edit surveys, go to _survey_ section in the _administrative panel_, where the _Forms_ settings panel will open up.

<img alt="survey section" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_survey_00.png')} />
<br/>
<br/>

From the _Forms_ settings panel, by pressing the <span className="badge badge--secondary">+</span> icon or choosing an existing _survey_/_form_, you can open the _Create form_ settings panel to create or edit a _survey_, respectively.

<img alt="survey section" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_survey_01.png')} />
<br/>

Below you will find the description and notes for each field of the _Create form_ settings panel shown above.

<div className="container box">
<div className="row table-row-title">
<div className="col col--12"><b>General information</b></div>
</div>
<div className="row table-row-1">
<div className="col col--3"><b>Name:</b></div>
<div className="col col--5">The survey's display name.</div>
<div className="col col--4"><em></em></div>
</div>
<div className="row table-row-2">
<div className="col col--3"><b>Code:</b></div>
<div className="col col--5">The survey's identification code.</div>
<div className="col col--4"><em>Only lowercase letters, numbers, and underscores are accepted; the code must start with a letter. Once you create and save a code, it cannot be modified.</em></div>
</div>
<div className="row table-row-title">
<div className="col col--12"><b>Access</b></div>
</div>
<div className="row table-row-1">
<div className="col col--3"><b>Group Permission:</b></div>
<div className="col col--5">Select the group that will be allowed to view and answer the survey.</div>
<div className="col col--4"><em></em></div>
</div>
<div className="row table-row-2">
<div className="col col--3"><b>Access Role:</b></div>
<div className="col col--5">List of access roles.</div>
<div className="col col--4"><em>At least one access role must be chosen. If multiple access roles are selected, users must have one of them.</em></div>
</div>
<div className="row table-row-1">
<div className="col col--3"><b>Add Element:</b></div>
<div className="col col--5">Assigns the collection and element of a channel.</div>
<div className="col col--4"><em>The element will be used to show the survey only on the channels that have the same element assigned.</em></div>
</div>
<div className="row table-row-title">
<div className="col col--3"><b>Form Template:</b></div>
<div className="col col--5">Set up the form using different components or input types for setting up questions.</div>
<div className="col col--4"><em>

More information in the [Form Components](#form-components) section.

</em></div>
</div>

</div>
<br/>

## Form Template
### Form Components {#form-components}
Form components are different input types that can be used and configured to make your survey questions. 

#### Icon Descriptions: {#icon-descriptions}
The following icons are used in most of the form components for setup and configuration options.

| Action Name | Image | Description |
| ---- | ----- | ----------- |
| Drag | <img alt="" src={useBaseUrl('img/icon_drag.png')} /> | Hold click to drag component |
| Required | <img alt="" src={useBaseUrl('img/icon_required.png')} /> | Click to force user response on the component. |
| Writing not permitted | <img alt="" src={useBaseUrl('img/icon_idw.png')} /> | Users cannot answer the question but will still be visible in the survey. |
| Duplicate | <img alt="" src={useBaseUrl('img/icon_duplicate.png')} /> | Duplicate the component. It will not duplicate the identifier. |
| Delete | <img alt="" src={useBaseUrl('img/icon_delete.png')} /> | Delete the component |

<div className="alert alert--secondary">

#### Available Form Components: {#form-components-list}

- [**Text**](/docs/documentation/admin/survey/components/text_component): _Inserts text into the survey. Usually used as instructions._ 
- [**Written Answer**](/docs/documentation/admin/survey/components/written_answer): _Users can write a reply to the question. This component can also be configured to read QR Codes or NFC input on mobile devices._
- [**Multiple choice**](/docs/documentation/admin/survey/components/multiple_choice): _Give users multiple choice questions. This component can be configured as a dynamic survey, i.e., to display more options as certain answers are given._
- [**Rating**](docs/documentation/admin/survey/components/rating): _Users can rate an item with "stars"._
- [**Date and time**](/docs/documentation/admin/survey/components/date_and_time): _Answers are received in date or date & time format._
- [**Location**](/docs/documentation/admin/survey/components/location): _GPS location is given as answer. Only available in mobile applications."_
- [**Attachment**](/docs/documentation/admin/survey/components/attachment): _Send almost any type of file through the survey._
- [**Camera**](/docs/documentation/admin/survey/components/camera): _Send pictures directly from camera or gallery._
- [**Signature**](/docs/documentation/admin/survey/components/signature): _Freestyle brush that permits handwriting. Useful for signatures._
- [**Survey**](/docs/documentation/admin/survey/components/survey): _Adds an existing survey into the survey._

</div>
<br/>

#### Form components are available in the _form template_ section of the _Create Form_ settings panel:


<img alt="form components" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_survey_02.png')} />
<br /><br />

<div className="alert alert--secondary">

The above image shows us how the _form template_ looks with the _components_ list.

The template permits you to preview how the _user_ will visualize the _survey_ and its _components_. Bear in mind, a _user's_ visualization might change slightly depending on their web browser.

Press the <span className="badge badge--primary">components</span> button on the upper right side of the template to make the **list appear or disappear**.

To **add a _component_** to the _survey_, just drag the <span className="badge badge--warning">component</span> to the yellow background area.

You can **edit** a <span className="badge badge--warning">component</span> by clicking it once it is on the template.

Each component has three sections (tabs) that can be configured: _General_, _Conditional display_, and _Automation_.

<img alt="tabs" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_survey_03.png')} />
<br/>

_Each configuration tab will be explained below._

</div>
<br/>

### General Tab

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

It will be needed if working with APIs, dashboards, routines, or [conditional display](#conditional-display).

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

From the **automation** tab, you can add Javascript code to customize your surveys even more. For complete information and examples, go to the [QuestionExec](/docs/documentation/automation/question_exec) section.

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