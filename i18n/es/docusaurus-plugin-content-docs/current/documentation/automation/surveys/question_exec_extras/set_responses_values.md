---
title: Value Types for SET_RESPONSES command
displayed_sidebar: documentation
---

:::caution Advertencia
Esta página aún no se encuentra traducida al español.
:::

import useBaseUrl from '@docusaurus/useBaseUrl'; 

## Summary {#description}

The SET\_RESPONSES command is an object used by [Question Code Automation](/docs/documentation/automation/surveys/question_exec) functions to return specified values and insert them to answer the indicated survey question.

SET\_RESPONSES must return [_values_](#value-types) in the data type or format of the [survey question's content type](/docs/documentation/models/surveys/model_questionContentType).

## Micro-Tutorial {#tutorial}
In this micro-tutorial, we made a survey form that automatically selects options in a multiple-choice question. We can pre-select options by returning a SET\_RESPONSES command and indicating the _target_ and _values_.

<iframe src={useBaseUrl('img/automation_questionexec_set_responses.mp4')} height="450" width="100%" title="tutorial"></iframe>
<br/>
<br/>

You can add further logic to set the answers with variables and predefined _contexts_.

_For example, you can use variables to call other predefined survey values:_

<img alt="variable example" className="img_sizing item shadow--tl" src={useBaseUrl('img/automation_questionexec_set_responses_00.png')} />
<br/>


_The code displayed above will give the following result:_

<img alt="variable example" className="img_sizing item shadow--tl" src={useBaseUrl('img/automation_questionexec_set_responses_01.png')} />
<br/>

---

## Command Field Descriptions {#field-descriptions}

_Sample:_

```javascript
{
    cmd: 'SET_RESPONSES`, 
    target: 'question_01',
    value: '5'
}
```

Field | Description | Values 
--- | --- | ---
**cmd**  | Indicates the command type. | SET_RESPONSES
**target** | Indicates survey question where the value will be placed. | 'self' \| '[Identifier of the survey question](/docs/documentation/admin/survey/survey_overview#field-descriptions)'
**value** | The value to be placed in the target field. | The value must correspond to the question's [content type](/docs/documentation/models/surveys/model_questionContentType). Value type examples are shown below.

## Value Types {#value-types}

### Text
**Description**: Used for [text components](/docs/documentation/admin/survey/components/text_component).  
**Content Type Code**: `application/vnd.cotalker.survey+text`  
**Notes**: Any characters in string format.

_Example:_

```javascript
{
    cmd: 'SET_RESPONSES',
    target: 'question_05', 
    value: 'Hello world!' 
}
```

### Text Input
**Description**: Used on a [written answer component](/docs/documentation/admin/survey/components/written_answer).  
**Content Type Code**: `application/vnd.cotalker.survey+textinput`  
**Notes**: Any characters in string format.

_Example:_

```javascript
{
    cmd: 'SET_RESPONSES',
    target: 'question_02', 
    value: 'Hello world!' 
}
```

### Text Number
**Description**: Used on [rating components](/docs/documentation/admin/survey/components/rating) for evaluating with a number-star system.  
**Content Type Code**: `application/vnd.cotalker.survey+textnumber`  
**Notes**: Number in string format. The number must be within the rating range that was set up.

_Example:_

```javascript
{
    cmd: 'SET_RESPONSES',
    target: 'question_01', 
    value: '5'
}
```

<!-- 
### Date Time
**Description**: Used on the [date and time component](/docs/documentation/admin/survey/components/date_and_time) used to choose a date and time from a pop-up calendar and clock.  
**Content Type Code**: `application/vnd.cotalker.survey+datetime`  
**Notes**: Value can be a [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) object.

_Example:_

```javascript
{
    cmd: 'SET_RESPONSES',
    target: 'self', 
    value: Date 
}
```
-->

### List Question
**Description**: Used on [multiple choice component item list type](/docs/documentation/admin/survey/components/multiple_choice#list-of-items-type). Choose items from a list made during survey setup.  
**Content Type Code**: `application/vnd.cotalker.survey+listquestion`  
**Notes**: The value is an array of strings, where the strings are the **"values"** indicated in the [component setup](/docs/documentation/admin/survey/components/multiple_choice#list-of-items-type).

_Example:_

```javascript
{
    cmd: 'SET_RESPONSES',
    target: 'self', 
    value: ['b', 'c'] 
}
```


### Property
**Description**: Used on [multiple-choice component collection types](/docs/documentation/admin/survey/components/multiple_choice#collection-type) when the elements of the indicated collection are given as options.  
**Content Type Code**: `application/vnd.cotalker.survey+property`  
**Notes**: Use an [ObjectId<COTProperty\>](/docs/documentation/models/databases/model_properties) array, i.e., the `_id` of the [elements (properties)](/docs/documentation/models/databases/model_properties) to return as values.

_Example:_

```javascript
{
    cmd: 'SET_RESPONSES',
    target: 'question_03', 
    value: ['6185cfe1ef46d0aee4c2b653', '6185cfe8b420610501b280d8']
}
```
