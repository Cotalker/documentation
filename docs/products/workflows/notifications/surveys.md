---
title: Product-Related Tools
sidebar_label: Surveys
---

import useBaseUrl from '@docusaurus/useBaseUrl'; 

<span className="hero__title">Notification Surveys</span>

## Overview {#overview}

<div className="container">
<div className="row">
<div className="col col--6">

<img alt="notifications" className="img_sizing_narrow item shadow--tl" src={useBaseUrl('img/products/products_notifications_00.png')} />
<br/>

</div>
<div className="col col--6">

Notification survey forms make it easy to report and validate incidents on the field. Survey forms are integrated with master data, allowing users to choose assets, failure types, and incident locations from database lists.

Once a _notification survey form_ is submitted, the _notification_ or _alert_ is created, and the [_notification workflow_](/docs/products/workflows/notifications/workflow) is initiated. A supervisor will then have to fill out the [validate incident notification](#validate) form. Afterwards, they will be able to create [work orders](/docs/products/workflows/work_orders/overview) to summon technical personnel to fix the issue.

</div>
</div>
</div>
<br/>


## How to Report an Incident {#report}

:::note
- Notification surveys might appear slightly differently on your device. 
- Screenshots taken from the **Cotalker mobile app** are shown below.
:::

To report an incident:

<div className="margin-left--lg">

- **A.** Go to the **Notifications** section.
- **B.** Press the **Action Button**.
- **C.** Select **Report Incident** to open the survey form.

</div>

<img alt="notifications" className="img_sizing item shadow--tl" src={useBaseUrl('img/products/products_notifications_surveys_01.png')} />
<br/>

<div className="margin-left--lg">

- **D.** Fill out the form.
- **E.** Press **Send**.

</div>

<img alt="notifications" className="img_sizing_small item shadow--tl" src={useBaseUrl('img/products/products_notifications_surveys_03.png')} />
<br/>

## Incident Validation Form{#validate}

Once the incident is reported, a supervisor gets notified and has the option of validating or rejecting the issue.

_In the example below, a supervisor gets a notification on their mobile device. Within the notification, the supervisor can review the report, use the channel workspace to chat and share information, and finally, validate or reject the report._

<img alt="notifications" className="img_sizing item shadow--tl" src={useBaseUrl('img/products/products_notifications_surveys_04.png')} />
<br/>

<div className="margin-left--lg">

- **A.** After pressing the <span className="badge badge--success">⏍ Validate incident</span> button found at the bottom of the _Notification_ workspace, the **Validate Incident Notification** form opens up. 

</div>

<img alt="notifications" className="img_sizing_50 item shadow--tl" src={useBaseUrl('img/products/products_notifications_surveys_05.png')} />
<br/>

<div className="margin-left--lg">

- **B.** Here, supervisors can either validate or reject the report. If rejected, the workflow stops right here. But, if accepted, the workflow continues, allowing to the supervisor to create all the necessary [_Work Orders_](/docs/products/workflows/work_orders/overview) to address the maintenance incident.

</div>

---

## Related Topics {#related-topics}
- [**Surveys**](/docs/documentation/client/surveys): _Getting Started_ user documentation.
- [**Surveys Overview**](/docs/documentation/admin/survey/survey_overview): _Administrative Panel_ documentation.
- [**Create Survey Tutorial**](/docs/tutorials/basic/create_survey): Tutorial on how to create a survey to gather data from users and share it on a channel.