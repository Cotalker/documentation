---
title: Question Content Type Data Model
sidebar_label: COTQuestionContentType
---
import useBaseUrl from '@docusaurus/useBaseUrl'; 
import Mermaid from '@theme/Mermaid';

<span className="hero__subtitle">COTQuestionContentType</span>

## Description {#description}

Surveys are made up of _questions_ and each _question_ is represented by a [form component](/docs/documentation/admin/survey/survey_overview#form-components). In a question's data model ([COTQuestions](/docs/documentation/models/surveys/model_questions)), the [form component](/docs/documentation/admin/survey/survey_overview#form-components) type is indicated by the _Question Content Type_.

<Mermaid chart={`
	graph LR;
        S[COTSurvey] --> C1[COTSurveyChat #1]
        S --> C2[COTSurveyChat #2]
        S --> C3[COTSurveryChat #3]
        C1 --> Q1T[COTQuestion - Field Label]
        C1 --> Q1I[COTQuestion - Input Settings]
        C2 --> Q2T[COTQuestion - Field Label]
        C2 --> Q2I[COTQuestion - Input Settings]
        C3 --> Q3[COTQuestion - Label & Input]
        Q1T --> QC1[COTQuestionContentType]
        Q1I --> QC2[COTQuestionContentType]
        Q2T --> QC3[COTQuestionContentType]
        Q2I --> QC4[COTQuestionContentType]
        Q3 --> QC5[COTQuestionContentType]
`}/>

## Content Types {#content-types}

<div className="alert alert--secondary">

### Text {#text}
`application/vnd.cotalker.survey+text`

Used for [Text components](/docs/documentation/admin/survey/components/text_component) and [COTQuestions](/docs/documentation/models/surveys/model_questions) that represent the field labels displayed in the survey form.

</div>
<br/>

<div className="alert alert--secondary">

### Text Input {#text-input}
`application/vnd.cotalker.survey+textinput`

Indicates a [Written Answer](/docs/documentation/admin/survey/components/written_answer) component.

</div>
<br/>

<div className="alert alert--secondary">

### Text Number {#textnumber}
`application/vnd.cotalker.survey+textnumber`

Indicates a [Rating](/docs/documentation/admin/survey/components/rating) component used for evaluating with a five-star system.

</div>
<br/>

<div className="alert alert--secondary">

### Date Time {#datetime}
`application/vnd.cotalker.survey+datetime`

Indicates the [Date and time](/docs/documentation/admin/survey/components/date_and_time) component used to choose a date and time from a pop-up calendar and clock.

</div>
<br/>

<div className="alert alert--secondary">

### List Question {#listquestion}
`application/vnd.cotalker.survey+listquestion`

Indicates the [Item List](/docs/documentation/admin/survey/components/multiple_choice#list-of-items-type) type of the Multiple Choice component to choose items from a list made during survey setup.

</div>
<br/>

<div className="alert alert--secondary">

### Property {#property}
`application/vnd.cotalker.survey+property`

Indicates the [Collection](/docs/documentation/admin/survey/components/multiple_choice#collection-type) type of the Multiple Choice component to choose among the elements of a collection.

</div>
<br/>

<div className="alert alert--secondary">

### Person {#person}
`application/vnd.cotalker.survey+person`

Indicates the [Users](/docs/documentation/admin/survey/components/multiple_choice#users-type) type of the Multiple Choice component to choose among _users_.

</div>
<br/>

<div className="alert alert--secondary">

### API {#api}
`application/vnd.cotalker.survey+api`

Indicates the [API](/docs/documentation/admin/survey/components/multiple_choice#api-type) type of the Multiple Choice component that permits gathering data through API request.

</div>
<br/>

<div className="alert alert--secondary">

### GPS {#gps}
`application/vnd.cotalker.survey+gps`

Indicates a [Location](/docs/documentation/admin/survey/components/location) button component that returns GPS coordinates displayed on an embedded Google Map.

</div>
<br/>

<div className="alert alert--secondary">

### Image {#image}
`application/vnd.cotalker.survey+image`

Refers to the [Camera](/docs/documentation/admin/survey/components/camera) component to get photos from a device's camera or gallery.

</div>
<br/>

<div className="alert alert--secondary">

### Signature {#signature}
`application/vnd.cotalker.survey+signature`

Indicates a [Signature](/docs/documentation/admin/survey/components/signature) component to capture a hand or mouse written drawing.

</div>
<br/>

<div className="alert alert--secondary">

### File {#file}
`application/vnd.cotalker.survey+file`

Used to indicate the [Attachment](/docs/documentation/admin/survey/components/attachment) component when sharing files or notes.

</div>
<br/>

<div className="alert alert--secondary">

### Survey
`application/vnd.cotalker.survey+survey`

The [survey](/docs/documentation/admin/survey/components/survey) component is used when embedding a survey into the survey.

</div>
<br/>

<div className="alert alert--secondary">

### Calendar
`application/vnd.cotalker.survey+calendar`

_Not yet implemented._

</div>
<br/>
