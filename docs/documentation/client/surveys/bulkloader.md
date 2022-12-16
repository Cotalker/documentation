---
title: Bulk Loader
---
import useBaseUrl from '@docusaurus/useBaseUrl'; 

## Introduction {#intro}

The **Bulk Loader** automates survey form submissions. It automatically fills out a survey form multiple times using the data gathered from a spreadsheet provided by you. 

For example, if you have a survey form to enter user information, you can use the _Bulk Loader_ to submit multiple user forms using the data provided on the survey. Every column in the spreadsheet represents a survey field or question. And in this example, every row represents a user with the data to be included in each field. Thus, you can add huge amounts of data to your database by automating survey submissions with the spreadsheets you provide. 

:::caution Attention
This feature is only available on [workflow start forms](/docs/documentation/admin/workflows/admin_workflow_required_survey#required-survey-for-a-new-task), i.e., survey forms that initiate a task.

If the option is not available on your Cotalker platform, please consult with a Cotalker representative to _toggle_ on this feature.
:::

## Accessing the Bulk Loader {#access}
To open the survey form you wish to submit multiple times: 

1. Choose a workflow or task group that initiates tasks with a survey form.
2. Select the _actions button_.
3. Press the _survey icon_ of the form you wish to submit.

<div className="img_sizing">

![access](/img/survey_bulkloader_01.png)

</div>

4. Click the **Create multiple {form name}** button on the header of the survey form.

<div className="img_sizing">

![access](/img/survey_bulkloader_02.png)

</div>

5. The _bulk loader_ dialog box appears.

<div className="img_sizing">

![access](/img/survey_bulkloader_03.png)

</div>

## Bulk Loader Dialog Box {#dialog-box}
From the _bulk loader_ dialog box, you have four available actions:
1. [Download Form Template](#template)
2. [Download Fields](#dynamic)
3. [Browse](#browse)
4. [Continue](#continue)

<div className="img_sizing">

![access](/img/survey_bulkloader_04.png)

</div>

:::tip
- We recommend you proceed using the dialog box in the order specified. 

- The first two steps may be skipped if you don't need to download the files because, either you already have the template or you don't need dynamic field information.
:::

### 1. Download Form Template {#template}
Click this button to download a spreadsheet in XLSX format with all the necessary columns to fill out the form. The columns contain the name of the form fields and indicate their value type (text or numeric). 

A row with examples for each column is also provided.

You can use the downloaded file as a template where you can save your data and then upload it for processing. Each row will correspond to the data for a form to be submitted.

Every time the form is modified, it will be necessary to download the latest version of the template.

### 2. Download Fields {#dynamic}
Some forms contain dynamic fields with access to the collections on your database or other data sources. The content or options available for these fields are attainable through the **Download Fields** button. 

By pressing the button, a spreadsheet in XLSX format is downloaded to your computer with the available options for each dynamic field.

### 3. Browse {#browse}
The **Browse** button lets you choose the spreadsheet to process. Make sure the file follows the structure of the latest template version.

Spreadsheets only in XLSX, XLS, or CSV formats are accepted.

### 4. Continue {#continue}
Once the file is chosen, press **Continue** to process the spreadsheet and upload the data.

## Process Forms {#process}
After pressing the [**Continue**](#continue) button from the _Bulk Loader Dialog Box_, the **Processing File** dialog box appears indicating bulk load progress in which the data from each row is used to fill out a form.

<div className="img_sizing">

![access](/img/survey_bulkloader_05.png)

</div>

The dialog box indicates the number of spreadsheet rows going through the _processing_ and _processed_ stages. These stages correspond to row validation and form submission respectively.

The Bulk Loader also indicates if errors were encountered while processing a row. Press the **Download Error Logs** button to obtain a JSON file with a data object for each error.

:::info
Even if you close the dialog box, the processing will continue in the background.
:::

:::caution
As a safety measure, if more than 5 errors are encountered during the processing, the process will halt.
:::

## Expected Result {#result}
After a row is processed, its data is used as programmed on the survey form. 

For example, if the form is used to create an element within a collection, you should be able to see the element created with the provided data. Or if the survey form is used to create a user, the new user profile with the provided data will be among the current users found on the company platform.