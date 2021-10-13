---
title: Attachment Component
sidebar_label: Attachment
---
import useBaseUrl from '@docusaurus/useBaseUrl';
import Highlight from '@theme/Highlight';

The **Attachment** component permits users to share files and notes through a survey form.

<img alt="" src={useBaseUrl('img/admin_survey_attachment.png')} />
<br/><br/>

The fields unique to the **Attachment** component are described in the following table:

| Field | Description | Notes |
| ---- | ----------- | ----- |
| Document type | Indicates the type of attachment. Options are `Files` or `Notes`. | Allowed file formats are indicated below. Notes are explained in the [Notes tool](/docs/documentation/client/notes) section.
| Allow all known file types | If active, attached files can be any of the allowed formats. Otherwise, permitted file formats must be specified in the **Allowed file types** field. | This option is only available if the **Document type** is set to `Files`. |
| Allowed file types | Specify the allowed file types. The options are: *PDF document*, *Word Document*, *Spreadsheet document*, *Powerpoint document*, *Text document*, *HTML document*, *Markdown document*, *Video Document*, *Any image document*, *Any Office Document* and *Any Text Document* | A dropdown menu will appear when the field is clicked upon. |
