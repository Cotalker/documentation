---
title: Written Answer Component
sidebar_label: Written Answer
---

:::caution Advertencia
Esta página aún no se encuentra traducida al español.
:::
import useBaseUrl from '@docusaurus/useBaseUrl';
import Highlight from '@theme/Highlight';

The **Written Answer** component lets _users_ type a response to the survey question in a text box.

<img alt="" src={useBaseUrl('img/admin_survey_writtenanswer.png')} />
<br/><br/>

Other than the general fields, the **Written answer** component has the following field:

| Field | Description | Notes |
| ---- | ----------- | ----- |
| Input Type | The option are long text, short text and number. |  |

:::note
On the mobile app, QR Code scans and NFC input can also be used to add text into the form. To make this option available, refer to the [API documentation on _survey questions_](/docs/documentation/api/surveys/questions#qr-code--nfc-function).
:::
