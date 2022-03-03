---
title: Product-Related Tools
sidebar_label: Surveys
---

import useBaseUrl from '@docusaurus/useBaseUrl'; 

<span className="hero__title">Notification Surveys</span>

Notification survey forms make it easy to report and validate incidents. Survey forms are integrated with master data, allowing users to choose assets, failure types, and incident locations from database lists.

Once a _notification survey form_ is submitted, the _notification_ or _alert_ is created, and the [_notification workflow_](/docs/products/workflows/notifications/workflow) is initiated. A supervisor will then have to fill out the [validate incident notification](#validate) form. Afterwards, they will be able to create [work orders](/docs/products/workflows/work_orders/overview) to summon technical personnel to fix the issue.

## How to Report an Incident {#report}

:::note
- Notification surveys might appear slightly differently on your device. Screenshots of the **Cotalker mobile app** are shown below.
:::

To report an incident:

<div className="margin-left--lg">

1. Go to the **Notifications** section.
2. Press the **Action Button**.
3. Select **Report Incident** to open the survey form.

</div>

<img alt="notifications" className="img_sizing item shadow--tl" src={useBaseUrl('img/products/products_notifications_surveys_01.png')} />
<br/>

<div className="margin-left--lg">

4. Fill out the form.
5. Press **Send**.

</div>

<img alt="notifications" className="img_sizing item shadow--tl" src={useBaseUrl('img/products/products_notifications_surveys_03.png')} />
<br/>

## Incident Validation Form{#validate}

Once the incident is reported, a supervisor gets notified and has the option of validating or rejecting the issue.

_Below, from a mobile device, a supervisor gets a notification. Within the notification, the supervisor can review the report, chat, and validate or reject the report._

<img alt="notifications" className="img_sizing item shadow--tl" src={useBaseUrl('img/products/products_notifications_surveys_04.png')} />
<br/>

<div className="margin-left--lg">

1. After pressing the <span className="badge badge--success">⏍ Validate incident</span> button found at the bottom of the _Notification_ workspace, the **Validate Incident Notification** form opens up. 

</div>

<img alt="notifications" className="img_sizing_small item shadow--tl" src={useBaseUrl('img/products/products_notifications_surveys_05.png')} />
<br/>

<div className="margin-left--lg">

2. Here, supervisors can either validate or reject the report. If rejected, the workflow stops right here. But, if accepted, the workflow continues, allowing to the supervisor to create all the necessary [_Work Orders_](/docs/products/workflows/work_orders/overview) to address the maintenance incident.

</div>

---

## Related Topics {#related-topics}
- [**Surveys**](/docs/documentation/client/surveys): _Getting Started_ user documentation.
- [**Surveys Overview**](/docs/documentation/admin/survey/survey_overview): _Administrative Panel_ documentation.
- [**Create Survey Tutorial**](/docs/tutorials/basic/create_survey): Tutorial on how to create a survey to gather data from users and share it on a channel.