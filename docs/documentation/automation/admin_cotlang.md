---
id: admin_cotlang
title: COTLang
sidebar_label: COTLang
---
import useBaseUrl from '@docusaurus/useBaseUrl'; 
import Highlight from '@theme/Highlight';

# Cotlang Overview {#cotlang-overview}
Language created by Cotalker. <br/>

It is used to extract data from different contexts in Cotalker. It is useful to configure the routine.

## Context of the data {#context-of-the-data}
This table contains the data to which the different sources have access. For example, if you are using cotlang in a survey trigger routine, you will have direct access to the task. <br/>

| Source | Context | Notes |
| ---- | --------- | ----  |
| Global Message Trigger | <pre>{<br>  channel: COTChannel,<br>  message: COTMessage,<br>  cmdArgs: Array[string]<br>}</pre> | The source is a global bot that is trigger with a slash command. |
| Channel Message Trigger	| <pre>{<br>  channel: COTChannel,<br>  message: COTMessage,<br>  cmdArgs: Array[string]<br>}</pre> | The source is a bot that is trigger with a slash command and is associated with particular channels. |	
| Global Survey Trigger | 	<pre>{<br>  ...COTAnswer,<br>  messages: COTMessage,<br>}</pre>| Message have to be active to use. <br/> The source is a global bot that is trigger with a survey. |
| Channe Survey Trigger	|	<pre>{<br>  ...COTAnswer,<br>  messages: COTMessage<br>}</pre>| Message have to be active to use. The source is a bot that is trigger with a survey and is associated with particular channels. |
| SM SurveyTrigger	|	<pre>{<br>  ...COTTask,<br>  sentAnswer: COTAnswer<br>}</pre>|   |
| SM Change State |	<pre>{<br>  ...COTTask<br>}</pre>| |
| SM - New Subtask	|	<pre>{<br>  task: COTTask,<br>  parent: COTTask<br>}</pre>| |
| SM - New Task	|	<pre>{<br>  task: COTTask,<br>  parent: COTTask<br>}</pre>| |
| SLA	|	<pre>{<br>  taskId: ObjectId[COTTask]<br>  taskGroupId: ObjectId[COTTaskGroup]<br>}</pre>| |
| Scheduler | <pre> custom body </pre>|	|	
| SM - RequiredSurvey | <pre>{<br>  answer: COTAnswer,<br>  meta: {<br>    parentTask: ObjectId[COTTask],<br>    taskGroup: ObjectId[COTTaskGroup]<br>  }<br>}</pre>|
 
 ### Context language description {#context-language}
1. `...` Destructuring Operator: each key is merged into the parent object.
For example:
```
if COTExample is { _id: ObjectId, content: String } 
then             { ...COTExample,                  someKeyName: Number } 
represents       { _id: ObjectId, content: String, someKeyName: Number }
```
2. Array[T]: is an array of type T.
For example:
```
model       { commands: Array[String] }
can contain { commands: ["hello", "world"] } 
```
3. [COTChannel Data model](/docs/documentation/api/communication/channels)
4. [COTMessage Data model](/docs/documentation/api/communication/messages)
5. [COTAnswer Data model](/docs/documentation/api/surveys/answers)
6. [COTTask Data model](/docs/documentation/api/tasks/tasks) 
7. [COTTaskGroup Data model](/docs/documentation/api/tasks/task_groups)
8. ObjectID[T]: 24-character unique identifier that represents an object of type T


## How to use Cotlang {#how-to-use-cotlang}
To configure the type of stages, COTlang is useful to easily get information from the database.

| Cotlang | Description | Format |
| ---- | --------- | ------- |
| VALUE | Extracts data from external data | $VALUE#[EXTRACTOR] |
| OUTPUT | Extracts data from stages data of a routine. | $OUTPUT#[stage-name]#[EXTRACTOR] |
| ENV | Access the environment variable | $ENV# environment-var |
| CODE | Transform the code into an object |  $CODE#[model]#[EXTRACTOR]#[INPUT] |
| JOIN | Concatenate values |  $JOIN#[Some char to join]#[ARG A]#[ARG B]#...#[ARG N] |
| TIME | Generates date, relative to the current date. | $$TIME#[PARAM1]#[PARAM2] |
| META | Extracts data from message.meta (Questions). | $META#[EXTRACTOR] |
| EXTRACTOR | Token values: (1) *Values*: Dive into value or (2) *Operators*: Apply funtion to current data. |

### Examples {#examples}

**META** <br/>
question.display = ["$META#somekey"]<br/> 
message.meta = '{"somekey":"Happy New Year"}' <br/> 
When a value is required, question.display should return ["$META#somekey"] <br/>

**EXTRACTOR** <br/>
- Operators: ... |[find => identifier = keyname]|...  | [TOKEN1]|[TOKEN2]|...|[TOKEN-N]
- General Example: 
{a: { b: { c1: 'Hola', c2: 'Mundo' }  }  } <br/> To access the info of variable c1, use the following token: *a|b|c1* . It wil respond with *Hola* 

## Function {#function}
The format of the function is as follows: <br/>
[ function_name => token = Syntax | token ]
<br/>

The following list shows the available cotlang functions:
- **size**: Return the size of an array. <br/>
Example: $VALUE#array|[size=>*] <br/><br/>
- **toString**: Returns the input in string type. <br/><br/>
- **cast**:  Returns the input in float or boolean type. <br/>
Example: $VALUE#anyValue|[cast=>parseFloat]<br/><br/>
- **map**: Map elements from one type to another. <br/>
Example: $VALUE#populatedChannelUsers|[map=>email]<br/><br/>
- **arrayToObject**: Returns the object in array. <br/>
Example:$VALUE#data|[arrayToObject=>key=value]...<br/><br/>
- **isDefinedFilter**: Return only values that are not *0*,*""*,*null* or *undefined*. <br/>
Example: $VALUE#data|[isDefinedFilter=>meta]<br/><br/>
- **filter**: Return all the arguments that apply to the condition. <br/>
Example: $VALUE#data|[filter=>contentType=application/vnd.cotalker.survey+text]<br/><br/>
- **notEqualFilter**: Filter the unequal values ​​of an array.<br/>
Example: $VALUE#data|[notEqualFilter=>contentType=application/vnd.cotalker.survey+text] <br/><br/>
- **simpleNotEqualFilter**: Filter unequal values ​​from an array to a condition. <br/>
Example: $VALUE#data|[simpleNotEqualFilter=>125938f23295sd0]<br/><br/>
- **simpleEqualFilter**: Filter equal values ​​from an array to a condition.<br/>
Example: $VALUE#data|[simpleEqualFilter=>125938f23295sd0]<br/><br/>
- **concat**: Concatenate values. <br/><br/>
- **find**: Return a particular element of the array. <br/>
Example: $VALUE#data|[find=>identifier=minuta-fecha]<br/><br/>
- **push**: Add an element on the back. <br/>
Example: $VALUE#populatedChannelUsers|[map=>email]|[push=>string=ignacio@cotalker.com]<br/><br/>
- **add**: Add an element on the back, if it doesn't exists. <br/>
Example: $VALUE#populatedChannelUsers|[map=>email]|[add=>string=ignacio@cotalker.com]<br/><br/>
- **math**: Perform a mathematical operation on the values. The operation ar *add* or *subtract*. <br/>
Example: $VALUE#answer|anyNumber|[math=>add=2]<br/><br/>
- **date**: Allows parsing dates. <br/>
Example: $VALUE#createdAt|[date=>format=DD-MM-YYYY]<br/><br/>
- **every**: Perform the operation on each element of the array. The operator can be *>= x*, *> x*, *< x*, *<= x* or *=== x*. And the key are *gte*, *gt*, *lt*, *lte* or *eq*, respectively.<br/>.
Example: $VALUE#data|[filter=>contentType=application/vnd.cotalker.survey+textnumber]|[map=>responses]|[every=>lte=2] <br/><br/>
- **some**: Return the values that apply to one of the following conditions: *>= x*, *> x*, *< x*, *<= x* or *=== x*. And the key are *gte*, *gt*, *lt*, *lte* or *eq*, respectively. <br/>
Example $VALUE#data|[filter=>contentType=application/vnd.cotalker.survey+textnumber]|[map=>responses]|[some=>lte=2]<br/><br/>
- **json**: Convert a Json to string. <br/>
Example: $VALUE#populatedChannelUsers|[json=>parse]<br/><br/>
- **querystring**: Generate a querystring form an object. <br/>
Example: $VALUE#someValue|[querystring=>string]<br/><br/>
- **cotanswer_list**: Generate text answer from an array. <br/>
Example: $VALUE#answer_data|[cotanswer_list=>array]<br/><br/>
- **gencode**: Generate a code from a string. <br/>
Example: $VALUE#path|to|string|[gencode=>*]<br/><br/>


