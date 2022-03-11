---
title: Product-Related Tools
sidebar_label: Workflow Description
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<span className="hero__title">Notifications: Workflow Description</span>
<br/>
<br/>

<div className="container">
<div className="row">
<div className="col col--6">

<img alt="notifications" className="img_sizing_narrow" src={useBaseUrl('img/products/products_notifications_workflow_00.png')} />
<br/>

</div>
<div className="col col--6">

<span className="hero__subtitle">Workflow States (process steps):</span>

1. **Reported**: The _Report New Incident_ form has been sent by a field worker indicating a failure that requires maintenance.
2. **In process**: A supervisor has validated the report. After this, the supervisor can submit corresponding work orders that initiate parallel workflows addressing the notified incident.
3. **Completed tasks**: After maintenance workers have closed the work orders, supervisors can put the _notification_ in the _Completed tasks_ state, thus ending the workflow process.
4. **Rejected**: After the _notification_ has been sent, i.e., during the _Reported_ workflow state, supervisors can also choose to reject the incident, putting the _notification_ in the _Rejected_ state, thus ending the workflow process.

</div>
</div>
</div>