---
title: Surveys Overview
---
import useBaseUrl from '@docusaurus/useBaseUrl';
import Highlight from '@theme/Highlight';

<div className="img_title">

![design](/img/design/Surveys.svg)

</div>
<br/>

## Summary {#survey-overview}
A [_survey_](/docs/documentation/client/surveys/overview) is a way of gathering information from users through _workflows_, _channels_, _bots_, or even [_public surveys_ outside the Cotalker environment](/docs/documentation/admin/workflows/admin_workflow_public_survey). 

Create form templates for each of your surveys. Form templates are made of [_components_](/docs/documentation/admin/survey/components_overview) that let you structure questions, inputs, and text on your surveys.

Configure _components_ so that your survey questions can receive information from different **input sources** and **formats**, e.g., _text, dates, GPS, signatures, QR codes, NFC, digital cameras, file attachments, collections, elements, and even API_.

_Surveys_ can also be programmed to respond to certain answers or contexts. For example, you can: 
- make **dynamic surveys** that with certain answers display new [questions](/docs/documentation/admin/survey/components_overview#conditional-display) or [options](/docs/documentation/admin/survey/components/multiple_choice#tree-selector), 
- lead a _workflow_ to **[trigger](/docs/documentation/admin/workflows/admin_workflow_required_survey) a new state or create a new task**; these last surveys can be even made [**public**](/docs/documentation/admin/workflows/admin_workflow_public_survey) for users outside the Cotalker environment,
- automate your surveys with [**Javascript code**](/docs/documentation/automation/surveys/question_exec), e.g., loading the current user's information when opening a survey, validating input information, or automatically sending an email after submitting a survey form. 

With the [_bulk loader_](/docs/documentation/client/surveys/bulkloader), users can submit multiple forms at once, importing data from their spreadsheets.

:::note
- The terms _survey_ and _form_ are usually used interchangeably. But sometimes, a _survey_ will be the blank template with questions or components, while a _form_ is an answered survey.
- _Survey_ results can be downloaded either through the **Forms** section in the **Administrative Panel** or the [_Reports_](/docs/documentation/client/reports) section accessed through the **Main Menu Bar**.
:::

## Creating and Editing Surveys {#create}
Survey forms can be created through the [_forms settings panel_](/docs/documentation/admin/survey/settings). Some Cotalker plans include automated assistance for creating survey forms.

To edit an existing survey form, you can either access the [_forms settings panel_](/docs/documentation/admin/survey/settings) or [edit the survey directly](/docs/documentation/admin/survey/edit_template) when it is opened, granted you have permission to do so.
