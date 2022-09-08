---
title: Date & Time Component
sidebar_label: Date & Time
---

:::caution Advertencia
Esta página aún no se encuentra traducida al español.
:::
import useBaseUrl from '@docusaurus/useBaseUrl';
import Highlight from '@theme/Highlight';


The **Date and Time** component permits users to send a specific date and/or time.
_Answers are received in date or date & time format._

<img alt="" src={useBaseUrl('img/admin_survey_date_and_time_00a.png')} />
<br/><br/>

The fields unique to the **Date and Time** component are described in the following table:

| Field | Description | Notes |
| ---- | ----------- | ----- |
| Type | Options are *date* or *date and hour*. Indicates how the user will be able to answer the question. | |
| Max/Min Type | Options are *disable*, *absolute*, *relative to send time*, or *relative to answered time*. | Depending on what is chosen, new fields will be displayed. |
| Minimum Date | Lets you specify a start date.  | Appears if the *absolute* type is chosen. |
| Maximum Date | Lets you sepcify an end date. | Appears if the *absolute* type is chosen. |
| Days prior | Amount of days prior to the relative date. | Appears if the *relative to answered time* or *relative to sent time* type have been chosen. |
| Days after | Amount of days after the relative date. | Appears if the *relative to answered time* or *relative to send time* type is chosen. |
| Time zone | Indicates the timezone answers will be set in. | This option permits exporting dates and times through different timezones. |
