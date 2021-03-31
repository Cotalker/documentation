---
title: Surveys Section
sidebar_label: Surveys
---
import useBaseUrl from '@docusaurus/useBaseUrl';
import Highlight from '@theme/Highlight';

## Survey Overview {#survey-overview}
<img alt="" src={useBaseUrl('img/admin_survey.png')} width= "20%" height= "20%" align="left" />

A _survey_ is a way of capturing information for a _state machine_, _channel_ or _bot_. For example, a _survey_ could lead a _state machine_ to trigger a new state or simply to store new information.

Through the _survey_ button in the _administrative panel_ you will open the _Forms_ settings panel where you can create, search, check and download the _surveys_ of the company.

<br clear="left" />

## All Surveys {#all-surveys}
In the _Forms_ settings panel, you can find the entire list of _surveys_ that have been created.
<br />
<img alt="" src={useBaseUrl('img/admin_survey_list.png')} />
<br /><br />

You will find the description of each button in the [Overview Section](admin_overview).

<br/>

## Edit/Create Single Survey(Form) {#editcreate-single-surveyform}
From the _Forms_ settings panel, by choosing an existing _survey_/_form_ or pressing the _create element_ button, you can open the _Create form_ settings panel to edit or create a single _survey_.
<br />
<img alt="" src={useBaseUrl('img/admin_survey_create_1.png')} />
<img alt="" src={useBaseUrl('img/admin_survey_create_2.png')} />
<br />
<br />
<br />

Below you will find the description and notes for each field of the _Create form_ settings panel shown above.


| Field | Description | Notes |
| ---- | ----------- | ----- |
| Name | The visual name of the Survey | |
| Code | The identifier of the Survey | It only accepts lowercase letters, numbers, and underscore; and it must start with a letter. Once you create and save the code, you cannot change it. |
| Group Permission | Select the group permission to allow displaying the survey in the group| |
| Access Role | List of access roles. | It is enough that the user has one of them to have the survey enabled. At least one access role must be added |
| Add Elements | Element Addition | Add the Collection and elements of a channel. If the group channel doesn't have the specified element, the survey won't display. |
| Form Template | Set up the form using the components |  Each component is explained below |
<br />

The description of each button on the page where the _survey_ is created can be found in the [Overview section](admin_overview).

### Components of the Form {#components-of-the-form}
From the _Forms_ settings panel, by selecting an existing _survey_/_form_ or by clicking the _create new element_ button, the _Form Template_ panel appears. There you can configure the _survey_ using several different components.
<img alt="" src={useBaseUrl('img/admin_survey_components.png')} />
<br /><br />

The above image shows us how the _form template_ looks with the _components_ list.

**Press the blue _components_ button** on the upper right side of the template to make the list appear or disappear.

To **add a _component_** to the _survey_, just drag the _component_ to the yellow background area.

You can **edit a _component_** by clicking it on the template.

The template permits you to preview how the responding _user_ will visualize the _components_ put in a _survey_. Bear in mind, a _user's_ visualization might change slightly depending on their web browser.

<br />
<img alt="" src={useBaseUrl('img/admin_survey_c_prev.png')} />
<br />

The description of the buttons in the **_Form Template_** section is as follow:

<br />

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

Also, each _component_ has the **conditional display** button which allows you to make a _conditional component_. For example, if the response of component *X* is *A*, component *Y* will be displayed, otherwise it will remain hidden. <br/>
The following image shows what the **conditional display** looks like.

<img alt="" src={useBaseUrl('img/admin_survey_c_conditional.png')} />
<br/>
The descriptions of the fields are found below:

| Field | Description | Notes |
| ---- | ----------- | ----- |
| Commander | Select the dependent component. All identifiers are displayed |  |
| Criteria | The operator of the conditional. It could be: *Is equal to*, *Greater than or equal*, *Less than or equal* or *Regular expression*.  |  |
| Value | Write down the value that the commander compares. |  |

#### Text {#text}
The **text** component is used to display a text on the _form_. Its fields are described in the **generally repeated fields** above.
<img alt="" src={useBaseUrl('img/admin_survey_text.png')} />

#### Written Answer {#written-answer}
The **Written Answer** component is used for the _user_ to respond in a text box.
<img alt="" src={useBaseUrl('img/admin_survey_writtenanswer.png')} />
<br/><br/>

The field(s) unique to the **Written answer** component are described in the following table:
<br/><br/>

| Field | Description | Notes |
| ---- | ----------- | ----- |
| Input Type | The option are long text, short text and number. |  |

:::note
On the mobile app, QR code scans and NFC input can also be used to add text into the form. To make this option available, refer to the [API documentation on _survey questions_](../api/surveys/questions#qr-code--nfc-function).
:::

#### Multiple Choice {#multiple-choice}
The **Multiple Choice** component is used to display options to the _user_ in the _survey_.
<img alt="" src={useBaseUrl('img/admin_survey_multiplechoice.png')} />
<br/><br/>

The fields unique to the **Multiple choice** component are described in the following table:

| Field | Description | Notes |
| ---- | ----------- | ----- |
| Type | The options are *collection*, *users*, *item list* or *API*. | Depending on what is chosen, new fields will be displayed |
| Collection | Choose the collection that contains the elements to display as an option. | If the collection type is chosen, this field will be added |
| Filter Type | The filter could be by job title, subordinates, boss, peer or without one. | If the users type is chosen, this field will be added |
| Job Title | The selected position is the one that will have the users shown as an option. | If the users type is chosen, this field will be added |
| Add item | Add an option to the dropdown list. The visual name (*visualization*) and its identifier (*value*) must be added. | If the item list type is chosen, this field will be added |
| Source | The options are *external URL* or *Cotalker*. Choosing *Cotalker* adds a relative Cotalker path, otherwise an absolute address. | If the *API* type is chosen, this field will be added | 
| Method | The options are *POST* or *GET*. It's POST by default.  | If the *API* type is chosen, this field will be added |
| Path | Field that receives the external url or the relative path. | If the *API* type is chosen, this field will be added |
| Identifiers | The values ​​of the form that you want to pass to the API.  | If the *API* type is chosen, this field will be added |

#### Rating {#rating}
The **Rating** component is used to rank with stars. Its fields are described in the **generally repeated fields** above.
<img alt="" src={useBaseUrl('img/admin_survey_rating.png')} />

#### Date and Time {#date-and-time}
The **Date and Time** component is used to save a specific date and/or time.
<img alt="" src={useBaseUrl('img/admin_survey_date.png')} />
<br/><br/>

The fields unique to the **Date and Time** component are described in the following table:
<br/>

| Field | Description | Notes |
| ---- | ----------- | ----- |
| Type | The options are *date* or *date and hour*. Specifies what to show the user. | |
| Max/Min Type | The options are *disable*, *relative to send time*, *relative to response time* or *absolute*. | Depending on what is chosen, new fields will be displayed |
| Minimum Date | The minimum time allowed. Next to the field, you can specify the time of the date. | If the *absolute* type is chosen, this field will be added |
| Maximum Date | The maximum time allowed. Next to the field, you can specify the time of the date. | If the *absolute* type is chosen, this field will be added |
| Days prior | Previous days to the relative date allowed. | If the *relative to response time* or *relative to send time* type is chosen, this field will be added |
| Days after | days after to the relative date allowed. | If the *relative to response time* or *relative to send time* type is chosen, this field will be added |

#### Location {#location}
The **Location** component is used to save the position of a _user_. For now, it only works on mobile applications. Its fields are described in the **generally repeated fields** above.
<img alt="" src={useBaseUrl('img/admin_survey_location.png')} />

#### Attachment {#attachment}
The **Attachment** component is used to save a _user's_ file(s).
<img alt="" src={useBaseUrl('img/admin_survey_attachment.png')} />
<br/><br/>

The fields unique to the **Attachment** component are described in the following table:

| Field | Description | Notes |
| ---- | ----------- | ----- |
| Allow all known file types | If it's active, it wil allow all known formats. Otherwise, it will not. | |
| Allowed file types | Specify the allowed file types. The options are: *PDF document*, *Word Document*, *Spreadsheet document*, *Powerpoint document*, *Text document*, *HTML document*, *Markdown document*, *Video Document*, *Any image document*, *Any Office Document* and *Any Text Document* | |

#### Camera {#camera}
The **Camera** component is used to save a user's picture.
<img alt="" src={useBaseUrl('img/admin_survey_camera.png')} />
<br/><br/>
The field(s) unique to the **Camera** component are described in the following table:<br/><br/>

| Field | Description | Notes |
| ---- | ----------- | ----- |
| Source | Specify the source of the image. The options are: *Any Source*, *Cellhpone's camera*, *Cellhpone's camera and web files* or *Cellhpone's gallery and web files*  | WIP |

#### Signature {#signature}
The **Signature** component is used to save the user's signature. Its fields are described in the **generally repeated fields** above.
<img alt="" src={useBaseUrl('img/admin_survey_firm.png')} />

#### Survey {#survey}
The **Survey** component is used to add an existing _survey_ into the _survey/form_ you are editing.
<img alt="" src={useBaseUrl('img/admin_survey_form.png')} />
<br/><br/>

The fields unique to the **Survey** component are described in the following table:<br/><br/>

| Field | Description | Notes |
| ---- | ----------- | ----- |
| Survey | Select a survey from a list of all existing surveys. |  |

## Download Answered Surveys {#download-answered-surveys}
From the _Forms_ settings panel, you can download the reponses to a _survey_ by pressing the **download button** found on each survey's row.
This opens up the **Export data** dialog box. The **criteria** is the start date and you can specify the time frame. <br/>
The encoding field options are Windows, Macintosh, and UTF-8, and are downloaded in CSV format.
<br />
<img alt="" src={useBaseUrl('img/admin_survey_download.png')} />
<br />
<br />

The description of the icons are in the [Overview section](admin_overview).
