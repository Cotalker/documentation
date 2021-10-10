---
title: Questions Data Model
sidebar_label: COTQuestions
---
import useBaseUrl from '@docusaurus/useBaseUrl'; 
import Mermaid from '@theme/Mermaid';

<span className="hero__subtitle">COTQuestion</span>

## Description {#description}
_Questions_ make up survey forms; their wide variety allows different forms for gathering input. Apart from their different input types, _questions_ are usually divided up into pairs: one COTQuestion represents the _field label_ displayed in the survey form and another corresponds to the data input configuration.

<Mermaid chart={`
	graph LR;
        S[COTSurvey] --> C1[COTSurveyChat #1]
        S --> C2[COTSurveyChat #2]
        S --> C3[COTSurveyChat #3]
        C1 --> Q1T[COTQuestion - Field Label]
        C1 --> Q1I[COTQuestion - Input Settings]
        C2 --> Q2T[COTQuestion - Field Label]
        C2 --> Q2I[COTQuestion - Input Settings]
        Q2I --> QE[COTQuestionExec]
        C3 --> Q3[COTQuestion - Label & Input]
`}/>

## JSON Sample {#json-sample}
```json
[
    // COTQuestion that represents the field label displayed in the survey form
    {
        "_id": "615af821b0ca3100073e4f18",
        "command": {
          "commands": [],
          "resetIdentifiers": [],
          "values": []
        },
        "display": [
          "Example Title Display"
        ],
        "code": [],
        "isActive": true,
        "isSystemModel": false,
        "contentType": "application/vnd.cotalker.survey+text",
        "identifier": "unique_identifier_1633351713434",
        "modifiedAt": "2021-10-04T12:48:33.669Z",
        "textAlign": "left"
    },
    // COTQuestion that represents the question's data input configuration
    {
        "_id": "615af821b0ca3100073e4f19",
        "command": {
          "commands": [],
          "resetIdentifiers": [],
          "isCommanded": "item_list",
          "values": [
            {
              "_id": "615af821b0ca3100073e4f1a",
              "op": "eq",
              "target": "op_1"
            }
          ]
        },
        "display": [],
        "code": [],
        "isActive": true,
        "isSystemModel": false,
        "contentType": "application/vnd.cotalker.survey+textinput",
        "help": null,
        "identifier": "unique_identifier",
        "isReadOnly": false,
        "max": 5000,
        "min": 0,
        "required": false,
        "subtype": "short_text",
        "modifiedAt": "2021-10-04T12:48:33.674Z"
    }
]
```



## Fields {#fields}

| Field | Description | [Type](/docs/documentation/models/overview_model#data-types) | Notes |
| ---- | ---- | ---- | ---- |
| code | Depends on the `contentType` | string[ ] |
| command | [Conditional Display](/docs/documentation/admin/survey/survey_overview#conditional-display) settings | object |
| command.commands | Indicates which questions are commanded or depend on this question, i.e. questions using the `command.isCommanded` field.  | string[ ] | The strings in the array corresponde to the questions `identifier`.
| commmand.isCommanded | Indicates if the question has [Conditional Display](/docs/documentation/admin/survey/survey_overview#conditional-display) settings. | string | The string correspondes to the commanding question's `identifier`. |
| command.restItentifiers | string[ ] | 
| command.values | Sets the expected answers to activate the hidden question. | object[ ] |
| command.values.op | Select the comparison criteria, i.e., the operator of the conditional. | string | Options are: `=`, `eq`: Is equal to; `gte`: Greater than or equal; `lte`: Less than or equal; `regex`: Regular expression.
| command.values.target | Write the `identifier` related to the commanding answer. | string | For multiple answers, use the following syntax: *(example1)\|(example2)*
| company | Company identification code | ObjectId<COTCompany\> |
| contentType | Indicates COTQuestionContentType, i.e. [survey component type](/docs/documentation/admin/survey/survey_overview#form-components) | string | [List of question content types](/docs/documentation/models/surveys/model_questionContentType)
| display | Displayed question title or _field label_ | string[ ] | Its contents depend on the `contentType` and whether the data model corresponds to the _title_ section of the question.
| exec | [Javascript-automated questions (QuestionExec)](/docs/documentation/automation/question_exec) | object | 
| exec.filter | Currently not in use. | object<COTQuestionExecFilter\> |
| exec.onChange | Code runs after _validate_, but not after initial value is set. | object<COTQuestionExec\> | See [Question Execution Data Model](/docs/documentation/models/surveys/model_questionExec) for more information.
| exec.onDisplay | Code executes when a survey is in editing mode, i.e., when a user opens the survey from the channel, and it is displayed for answering. | object<COTQuestionExec\> | See [Question Execution Data Model](/docs/documentation/models/surveys/model_questionExec) for more information.
| exec.preload | The code executes when the survey is created. | object<COTQuestionExec\> | See [Question Execution Data Model](/docs/documentation/models/surveys/model_questionExec) for more information.
| exec.presave | Run code just before sending. | object<COTQuestionExec\> | See [Question Execution Data Model](/docs/documentation/models/surveys/model_questionExec) for more information.
| exec.postsave |  If custom and internal validations are passed, the code executes after the survey is sent. | object<COTQuestionExec\> | See [Question Execution Data Model](/docs/documentation/models/surveys/model_questionExec) for more information.
| exec.validate | Code executes before internal validations and before sending the survey. This permits adding additional levels of validation (business guidelines, protocols, etc.). | object<COTQuestionExec\> | See [Question Execution Data Model](/docs/documentation/models/surveys/model_questionExec) for more information.
| identifier | Unique identification name | string | Maximum 60 characters; only lowercase letters, numbers, and underscore allowed; must be unique.
| isActive | Indicates if whether the question is active or not | boolean |
| isReadOnly | Users cannot enter or fill out a respone | boolean | 
| isSystemModel | If true, it cannot be changed, even by admins | boolean |
| max | Depending on the type of question, it could represent the maximum number of components or characters permitted | number | 
| min | Depending on the type of question, it could represent the minimum number of components or characters permitted | number |
| modifiedAt | Indicates when the question was last modified | ISODate | YYYY-MM-DDTHH:mm:ss.SSSZ
| required | Users must answer the question in order to submit the form | boolean |
| responses | Contains submitted data | string[ ] | Appended to model only in some contexts |
| skipCodeValidation | Internal flag for legacy surveys | boolean | |
| subtype | Indicates the component's input type. | string | Options depend on the [survey component type](/docs/documentation/admin/survey/survey_overview#form-components) or `contentType` |
| textAlign | Indicates alignment for displayed text | string |


## Deprecated {#deprecated}

| Field | Description | [Type](/docs/documentation/models/overview_model#data-types) | Notes |
| ---- | ---- | ---- | ---- |
| symbolizes | | string |
| group | | ObjectId<COTGroup\> |
| hideEmpty | | boolean |

## Additional Resources {#resources}

- [Surveys Overview](/docs/documentation/admin/survey/survey_overview): Complete description about surveys and their components (questions)
- ["Questions" REST API documentation](/docs/documentation/api/surveys/questions): basic "Questions" API requests
- [API documentation in Swagger](https://www.cotalker.com/swagger/core/?key=woubtjf4olr0t4zgutuwn6scbcm6hd3qh1cgl5obmohpbm3mfublnwcvv67lodgjvd3h86s9ppshtvmf95gepsqh6nizq9liu7f): complete with data models (schemas)
- [COTLang](/docs/documentation/automation/admin_cotlang): use COTLang for extracting data from models in routines
- [Triggers and Contexts](/docs/documentation/automation/triggers_and_contexts): more information on using data models within routines

## Help {#help}

- [Cotalker Platform Community](https://github.com/Cotalker/documentation/discussions): post your questions or search for previous answers given in the forum
