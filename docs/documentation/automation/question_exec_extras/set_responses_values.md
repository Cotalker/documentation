---
title: Value Types for SET_RESPONSES command
displayed_sidebar: documentation
---

import useBaseUrl from '@docusaurus/useBaseUrl'; 

## Summary {#description}

The SET_RESPONSES command is an object used by [Question Code Automation](/docs/documentation/automation/question_exec) functions to return specified values and insert them to answer the indicated survey question.

SET_RESPONSES must return [_values_](#value-types) in the data type or format of the [survey question's content type](/docs/documentation/models/surveys/model_questionContentType).

## Field Descriptions {#field-descriptions}

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
    value: '5'
}
```

### Date Time
**Description**: Used on the [date and time component](/docs/documentation/admin/survey/components/date_and_time) used to choose a date and time from a pop-up calendar and clock.  
**Content Type Code**: `application/vnd.cotalker.survey+datetime`  
**Notes**: Use [Date (ECMAScript or Unix epoch)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) format.


_Example:_

```javascript
{
    cmd: 'SET_RESPONSES', 
    value: 1654895560 
}
```

### List Question
**Description**: Used on [multiple choice component item list type](/docs/documentation/admin/survey/components/multiple_choice#list-of-items-type) used to choose items from a list made during survey setup.  
**Content Type Code**: `application/vnd.cotalker.survey+listquestion`  
**Notes**: Array of "values" of the selected options. See the [list of items type](/docs/documentation/admin/survey/components/multiple_choice#list-of-items-type) for further details.


_The value can be an array of `__ON__` and `__OFF__` strings:_

```javascript
{
    cmd: 'SET_RESPONSES', 
    value: ['__OFF__', '__ON__', '__ON__'] 
}
```

OR

_The value can be an array of strings, where the strings are the **"values"** indicated in the [component setup](/docs/documentation/admin/survey/components/multiple_choice#list-of-items-type)._

```javascript
{
    cmd: 'SET_RESPONSES', 
    value: ['b', 'c'] 
}
```


### Property
**Description**: Used on [multiple choice component collection types](/docs/documentation/admin/survey/components/multiple_choice#collection-type) when the elements of the indicated collection are given as options.  
**Content Type Code**: `application/vnd.cotalker.survey+property`  
**Notes**: Use an [ObjectId<COTProperty\>](/docs/documentation/models/databases/model_properties) array, i.e., the `_id` of the [elements (properties)](/docs/documentation/models/databases/model_properties) to return as values.

_Example:_

```javascript
{
    cmd: 'SET_RESPONSES', 
    value: ["6185cfe1ef46d0aee4c2b653", "6185cfe8b420610501b280d8"]
}
```