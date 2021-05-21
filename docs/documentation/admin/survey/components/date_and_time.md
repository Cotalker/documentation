---
title: Date & Time Component
sidebar_label: Date & Time
---
import useBaseUrl from '@docusaurus/useBaseUrl';
import Highlight from '@theme/Highlight';


The **Date and Time** component permits users to send a specific date and/or time.
_Answers are received in date or date & time format._

<img alt="" src={useBaseUrl('img/admin_survey_date.png')} />
<br/><br/>

The fields unique to the **Date and Time** component are described in the following table:

| Field | Description | Notes |
| ---- | ----------- | ----- |
| Type | The options are *date* or *date and hour*. Specifies what to show the user. | |
| Max/Min Type | The options are *disable*, *relative to send time*, *relative to response time* or *absolute*. | Depending on what is chosen, new fields will be displayed. |
| Minimum Date | The minimum time allowed. Next to the field, you can specify the time of the date. | If the *absolute* type is chosen, this field will be added |
| Maximum Date | The maximum time allowed. Next to the field, you can specify the time of the date. | If the *absolute* type is chosen, this field will be added |
| Days prior | Previous days to the relative date allowed. | If the *relative to response time* or *relative to send time* type is chosen, this field will be added |
| Days after | days after to the relative date allowed. | If the *relative to response time* or *relative to send time* type is chosen, this field will be added |
| 