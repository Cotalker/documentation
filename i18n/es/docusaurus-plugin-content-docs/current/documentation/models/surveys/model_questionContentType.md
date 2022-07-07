---
title: Question Content Type Data Model
sidebar_label: COTQuestionContentType
---
import useBaseUrl from '@docusaurus/useBaseUrl'; 
import Mermaid from '@theme/Mermaid';

<span className="hero__subtitle">COTQuestionContentType</span>

## Description {#description}

Surveys are made up of _questions_ and each _question_ is represented by a [form component](/docs/documentation/admin/survey/survey_overview#form-components). In a question's data model ([COTQuestions](/docs/documentation/models/surveys/model_questions)), the [form component](/docs/documentation/admin/survey/survey_overview#form-components) type is indicated by the _Question Content Type_.

:::note
The **COTQuestionContentType** is also used on survey answers within the [COTAnswerData](/docs/documentation/models/surveys/model_answer_data) model.
:::

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

:::info
On each _content type_ card displayed below, a **content type code**, **data type**, and **description** are indicated. 
- **Content Type Code**: Corresponds to the system code used to indicate the question content type.
- **Answer Data Type**: Indicates the input type and format the question field handles. For example, the [Text Number](#textnumber) content type used for _rating_ components processes _number_ values. Submitted answers are found in the [`answers.data.process`](/docs/documentation/models/surveys/model_answer_data) field.
- **Description**: Indicates the related survey component and other uses.
:::

<div className="alert alert--secondary">

### Text {#text}
**Content Type Code**: `application/vnd.cotalker.survey+text`  
**Description**: Used for [text components](/docs/documentation/admin/survey/components/text_component) and [COTQuestions](/docs/documentation/models/surveys/model_questions) that represent the field labels displayed in the survey form.  
**Answer Data Type**: Any characters. Example: `Hello world!`  

</div>
<br/>

<div className="alert alert--secondary">

### Text Input {#text-input}
**Content Type Code**: `application/vnd.cotalker.survey+textinput`  
**Description**: Indicates a [written answer component](/docs/documentation/admin/survey/components/written_answer).  
**Answer Data Type**: Any characters. Example: `Hello world!`  

- _**QR or NFC inputs** can be used with the **text input** content type. In those cases, the following fields are used in the COTQuestion model:_

<div className="margin-left--lg">

#### QR & NFC Fields
Field | Description | Type | Required | Notes
--- | --- | --- |--- | ---
**code** | Code depends on the content type. Below is the code for scanning QR & NFC in surveys. | string[ ] | Required | Objects within the array must be written in string format.
**code[index].scan** | | object | Required |
**code[index].scan.enabled** | `true` activates the feature. | boolean | Required |
**code[index].scan.source** | Indicates the input source. | string[ ] | Required | Valid options: `qr` and/or `nfc`.
**code[index].scan.force** | `true` allows only QR Code or NFC input. `false` permits manual text input, also. | boolean | Required |
**contentType** | Indicates how the system should interpret the data. | string | Required | Must be set to: `application/vnd.cotalker.survey+textinput`
**identifier** | Unique identification name | string | Required | Maximum 60 characters; only lowercase letters, numbers, and underscore allowed; must be unique.

#### JSON Sample
_Text Input with QR and NFC inputs:_
```json
{
    "code": [
        "{\"scan\":{\"enabled\":true,\"source\":[\"qr\",\"nfc\"],\"force\":true}}"
    ],
    "identifier": "qr_test",
    "contentType": "application/vnd.cotalker.survey+textinput",
    ...
}
```
</div>

</div>
<br/>

<div className="alert alert--secondary">

### Text Number {#textnumber}
**Content Type Code**: `application/vnd.cotalker.survey+textnumber`  
**Description**: Used on [rating components](/docs/documentation/admin/survey/components/rating) for evaluating with a five-star system.  
**Answer Data Type**: Number. Example: `5`  

</div>
<br/>

<div className="alert alert--secondary">

### Date Time {#datetime}
**Content Type Code**: `application/vnd.cotalker.survey+datetime`  
**Description**: Indicates the [date and time component](/docs/documentation/admin/survey/components/date_and_time) used to choose a date and time from a pop-up calendar and clock.  
**Answer Data Type**: Number in Unix Epoch time format. Example: `1654895560`  

</div>
<br/>

<div className="alert alert--secondary">

### List Question {#listquestion}
**Content Type Code**: `application/vnd.cotalker.survey+listquestion`  
**Description**: Indicates the [multiple choice component item list type](/docs/documentation/admin/survey/components/multiple_choice#list-of-items-type) used to choose items from a list made during survey setup.  
**Answer Data Type**: Array of "values" of the selected options, i.e., the _value_ assigned to the _item_. See the [list of items type](/docs/documentation/admin/survey/components/multiple_choice#list-of-items-type) for further details. Example: `["value1", "value2"]` 



</div>
<br/>

<div className="alert alert--secondary">

### Property {#property}
**Content Type Code**: `application/vnd.cotalker.survey+property`  
**Description**: Corresponds to a [multiple choice component collection type](/docs/documentation/admin/survey/components/multiple_choice#collection-type) used to provide the elements of the indicated collection as options.  
**Answer Data Type**: [ObjectId<COTProperty\>](/docs/documentation/models/databases/model_properties) array. Example: `["6185cfe1ef46d0aee4c2b653", "6185cfe8b420610501b280d8"]`

</div>
<br/>

<div className="alert alert--secondary">

### Person {#person}
**Content Type Code**: `application/vnd.cotalker.survey+person`  
**Description**: Indicates the [multiple choice component users type](/docs/documentation/admin/survey/components/multiple_choice#users-type) to choose among _users_.  
**Answer Data Type**: [ObjectId<COTUsers\>](/docs/documentation/models/users/model_users) array. Example: `["611a7d2f174df70491261623", "611a7d54f13f3d03e631f990"]`  

</div>
<br/>

<div className="alert alert--secondary">

### API {#api}
**Content Type Code**: `application/vnd.cotalker.survey+api`  
**Description**: Indicates the [ multiple choice component API type](/docs/documentation/admin/survey/components/multiple_choice#api-type) that permits gathering data through API request.  
**Answer Data Type**: Varies.  

</div>
<br/>

<div className="alert alert--secondary">

### GPS {#gps}
**Content Type Code**: `application/vnd.cotalker.survey+gps`  
**Description**: Refers to the [location component](/docs/documentation/admin/survey/components/location) that returns GPS coordinates displayed on an embedded Google Map.  
**Answer Data Type**: Latitud and longitude array. Example: `["-33.0419355", "-71.4323595"]`  

_When this content type is used, the following fields are used in COTQuestion model:_

<div className="margin-left--lg">

#### Fields
| Field | Description | Type | Required | Notes |
|-----|-----|-----|-----|----|
| code | Contains special component details | string[ ] | Required | Objects within the array must be written in string format. |
| code[x].type | Indicates the map type. | string | Required | Available options: `currentLocation`, `freeLocation` |
| display | Indicates the map button label within the survey form. | string[ ] | Required | 
| contentType | Sets the form component type. For maps, it must be set to `application/vnd.cotalker.survey+gps`. | string | Required |
| identifier | Indicates the components identification code. | string | Required | Can only contain lowercase letters, underscores, and numbers. Must begin with a letter. |

#### JSON Sample
```json
{
    "display": [
        "Choose Map Location"
    ],
    "code": [
        "{\"type\":\"freeLocation\"}"
    ],
    "contentType": "application/vnd.cotalker.survey+gps",
    ...
}
```
</div>

</div>
<br/>

<div className="alert alert--secondary">

### Image {#image}
**Content Type Code**: `application/vnd.cotalker.survey+image`  
**Description**: Refers to the [camera component](/docs/documentation/admin/survey/components/camera) to get photos from a device's camera or gallery.  
**Answer Data Type**: URL of file uploaded to Cotalker server.  

</div>
<br/>

<div className="alert alert--secondary">

### Signature {#signature}
**Content Type Code**: `application/vnd.cotalker.survey+signature`  
**Description**: Indicates a [signature component](/docs/documentation/admin/survey/components/signature) to capture a hand or mouse written drawing.  
**Answer Data Type**: Captured signature image code.  

</div>
<br/>

<div className="alert alert--secondary">

### File {#file}
**Content Type Code**: `application/vnd.cotalker.survey+file`  
**Description**: Used to indicate the [attachment component](/docs/documentation/admin/survey/components/attachment) when sharing files or notes.  
**Answer Data Type**: URL of uploaded file or note. 

</div>
<br/>

<div className="alert alert--secondary">

### Survey {#survey}
**Content Type Code**: `application/vnd.cotalker.survey+survey`  
**Description**: The [survey component](/docs/documentation/admin/survey/components/survey) is used when embedding a survey into the survey.  
**Answer Data Type**: Object which includes [`answer.uuid`](/docs/documentation/models/surveys/model_answers), [`survey._id`](/docs/documentation/models/surveys/model_surveys), and [`survey.code`](/docs/documentation/models/surveys/model_surveys). The data within the object must be in string format. Example: `"{\"uuids\":[\"62a4730d71d581cb11c5197c\"],\"survey\":\"62a473166e323e750390b2de\",\"code\":\"location_list_00\"}"`  

</div>
<br/>

<!-- <div className="alert alert--secondary">

### Calendar
**Content Type Code**: `application/vnd.cotalker.survey+calendar`  
**Description**: _Not yet implemented._  
**Answer Data Type**: N/A  

</div>
<br/> -->
