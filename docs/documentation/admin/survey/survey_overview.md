---
title: Surveys Overview
sidebar_label: Overview
---
import useBaseUrl from '@docusaurus/useBaseUrl';
import Highlight from '@theme/Highlight';

<img alt="design" class="img_sizing" src={useBaseUrl('img/design/Surveys.svg')} />

<div className="alert alert--secondary">

:::warning
Update links to components!
:::

## Summary {#survey-overview}
A _survey_ is a way of capturing information for a _workflow_, _channel_ or _bot_. 

Configure survey questions to receive information from **different input sources**: _text, GPS, signatures, QR codes, NFC, digital cameras, file attachments_. See the [Form Components](#form-components) section for more information.

_Surveys_ can also be programmed to respond to certain answers or contexts. For example, you can: 
- make **dynamic surveys** that with certain answers display new [questions](#isCommanded) or [options](#tree-selector), 
- lead a _workflow_ to **[trigger](/docs/documentation/admin/workflows/admin_workflow_required_survey) a new state or create a new task**; these last surveys can be even made [**public**](/docs/documentation/admin/workflows/admin_workflow_public_survey) for users outside the Cotalker environment,
- automate your surveys with [**Javascript code**](/docs/documentation/automation/question_exec), e.g., loading the current users information when opening a survey, validating input information, or automatically sending an email after responding a survey. 

:::note
If you wish to **download** the results of a _survey_, go to the [_Reports_](/docs/documentation/client/reports) section.
:::

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
<div className="row table-row-2">
<div className="col col--3"><b>Form Template:</b></div>
<div className="col col--5">Set up the form using different components or input types for setting up questions.</div>
<div className="col col--4"><em>

More information in the [Form Components](#form-components) section.

</em></div>
</div>

</div>
<br/>




## Form Components {#form-components}
Form components are different input types that can be used and configured to make your survey questions. 

<div className="alert alert--secondary">

<span className="hero__subtitle">Available Form Components:</span>

- **Text**: _Inserts text into the survey. Usually used as instructions._ 
- **Written Answer**: _Users can write a reply to the question._
- **Multiple choice**: _Users have multiple choice answers. This component can be configured to display more options as certain answers are given._
- **Rating**: _Users can rate an item with "stars"._
- **Date and time**: _Answers are received in date or date & time format._
- **Location**: _GPS location is given as answer. Only available in mobile applications."_
- **Attachment**: _Send almost any type of file through the survey._
- **Camera**: _Send pictures directly from camera or gallery._
- **Signature**: _Freestyle brush that permits handwriting. Useful for signatures._
- **Survey**: _Adds an existing survey into the survey._

</div>
<br/>

#### Form components are available in the _form template_ section of the _Create Form_ settings panel:


<img alt="" src={useBaseUrl('img/admin_survey_components.png')} />
<br /><br />

<div className="alert alert--secondary">

The above image shows us how the _form template_ looks with the _components_ list.

Press the <span className="badge badge--primary">components</span> button on the upper right side of the template to make the **list appear or disappear**.

To **add a _component_** to the _survey_, just drag the <span className="badge badge--warning">component</span> to the yellow background area.

You can **edit** a <span className="badge badge--warning">component</span> by clicking it once it is on the template.

The template permits you to preview how the _user_ will visualize the _survey_ and its _components_. Bear in mind, a _user's_ visualization might change slightly depending on their web browser.

</div>
<br/>

<img alt="" src={useBaseUrl('img/admin_survey_c_prev.png')} />
<br/>

The description of the buttons in the **_Form Template_** section is as follow:


| Action Name | Image | Description |
| ---- | ----- | ----------- |
| Drag | <img alt="" src={useBaseUrl('img/icon_drag.png')} /> | Hold click to drag component |
| Required | <img alt="" src={useBaseUrl('img/icon_required.png')} /> | Click to force user response on the component. |
| WIP | <img alt="" src={useBaseUrl('img/icon_idw.png')} /> | WIP |
| Duplicate | <img alt="" src={useBaseUrl('img/icon_duplicate.png')} /> | Duplicate the component. It will not duplicate the identifier. |
| Delete | <img alt="" src={useBaseUrl('img/icon_delete.png')} /> | Delete the component |

<br/>

There are also some **generally repeated fields**, their descriptions are as follows:

<br/><br/>

| Field | Description | Notes |
| ---- | ----------- | ----- |
| Field label | The visual name of the component |  |
| Identifier | The id of the component. It must be unique in the form | It will be useful when analyzing the data for a dashboard or routine |
| Minimum | Lower Limit. Could indicate a minimum of component responses.  | In the case of a written response, each character will be counted. |
| Maximum | Upper Limit. Could indicate a maximum of component responses.  | In the case of a written response, each character will be counted. |

### Conditional Display {#conditional-display}

Each _component_ has the **conditional display** tab which allows you to make a _dynamic survey_, i.e., depending on the answers given to a certain question, new questions relative to the answer will appear. For example, if the response of component *X* is *A*, component *Y* will be displayed, otherwise it will remain hidden.
The following image shows what the **conditional display** looks like.

<img alt="" src={useBaseUrl('img/admin_survey_c_conditional.png')} />
<br/>
The descriptions of the fields are found below:

| Field | Description | Notes |
| ---- | ----------- | ----- |
| Commander | Select the dependent component. All identifiers are displayed |  |
| Criteria | The operator of the conditional. It could be: *Is equal to*, *Greater than or equal*, *Less than or equal* or *Regular expression*.  |  |
| Value | Write down the value that the commander compares. |  |

