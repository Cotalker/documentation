---
title: Survey Component
sidebar_label: Survey
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import Highlight from '@theme/Highlight';

## Overview {#overview}

The **Survey** component functions as a sub-survey. It is used to add an existing _survey_ into the _survey_ you are creating or editing.

Users will see a button on the main survey form to open the sub-survey questions and fill them out. Depending on the settings, users can add the sub-survey questions more than once.


## Description {#description}

<img alt="" src={useBaseUrl('img/admin_survey_form.png')} />
<br/><br/>

The fields unique to the **Survey** component are described in the following table:<br/><br/>

| Field | Description | Notes |
| ---- | ----------- | ----- |
| Survey | Select a survey from a list of all existing surveys. | A dropdown menu with checkboxes will appear when the field is clicked. More than one option can be chosen. |
| Minimum | Indicates the minimum amount of times users must add the sub-survey to the main survey. | If set to zero, the sub-survey is not required to submit the main survey.
| Maximum | Indicates the maximum amount of times users can add the sub-survey to the main survey. |

:::note
Standard fields are described in the [**general field descriptions**](/docs/documentation/admin/survey/survey_overview/#field-descriptions) section.
:::

## Examples {#example}

### Survey Component Setup {#setup}

_Here's a form template used to request goods as a sub-form. This form only requires selecting the material and the quantity:_

<img alt="first survey" className="img_sizing_small img_format item shadow--tl" src={useBaseUrl('img/admin_survey_survey_00.png')} />
<br/>

_Then the form –called **(WS) Add Material**– is incorporated as a survey component within the main form called **Material Request**:_

<img alt="embed survey" className="img_sizing_small img_format item shadow--tl" src={useBaseUrl('img/admin_survey_survey_01.png')} />
<br/>

### End-User Interface {#end-user}
_To answer a sub-form within a form, users must:_

<img alt="add survey" className="img_sizing survey_format item" src={useBaseUrl('img/admin_survey_survey_02.png')} />
<br/>

<div className="margin-left--lg">

1. Press the <span className="badge badge--warning">+ Add</span> button to open the sub-form.
2. The sub-form is embedded within the main form.
3. Click delete to remove this sub-form.
4. Click "collapse" to stop editing this sub-form and collapse the information.
5. To open another instance of the sub-form, users can press the <span className="badge badge--warning">+ Add New</span> button as needed and permitted by the form's configuration.

</div>

<div className="margin-left--lg">

When submitting the main form, it is sent with all the information from the sub-forms within. Each sub-form can also be re-edited or deleted at any time, even from its collapsed view.

</div>

<img alt="form with multiple sub-forms" className="img_sizing_small survey_format item shadow--tl" src={useBaseUrl('img/admin_survey_survey_03.png')} />
<br/>

<div className="margin-left--lg">
</div>

---
## Related Topics {#related}
- [Survey API Reference](/docs/documentation/api/surveys/): Information on how to get and configure surveys through our API tools.
- [COTSurvey](/docs/documentation/models/surveys/model_surveys): Survey data model documentation.
