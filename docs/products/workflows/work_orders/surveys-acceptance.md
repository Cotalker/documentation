---
title: Work Orders Workflow
sidebar_label: Acceptance of Work Form
id: wo_wf_acceptance_form
---

import useBaseUrl from '@docusaurus/useBaseUrl'; 

<span className="hero__title">Survey Forms</span>
<br/>

## Acceptance of Work {#accpetance-of-work}

After technical teams and contractors send the **Close Work Order** form, supervisors must fill out the **Acceptance of Work** form to validate that the job has been properly completed.

<div className="alert alert--primary">
<div className="margin-left--lg">

_To open the form:_

<img alt="acceptance of work" className="img_sizing item shadow--tl" src={useBaseUrl('img/products/products_work_orders_workflow_forms_11.png')} />
<br/>

1. Press <span className="badge badge--primary">Work Orders</span> in the **Main Menu Bar**.
2. Select the corresponding work order from the **Work Orders** panel.
3. Press the _Acceptance_ button in the channel workspace. The **Acceptance of Work** form opens up as shown below.


<img alt="acceptance of work" className="img_sizing item shadow--tl" src={useBaseUrl('img/products/products_work_orders_workflow_forms_12.png')} />
<br/>

The **Acceptance of Work** form allows supervisors to accept or reject a request to close a work order. When accepted, the workflow passed to the _closed_ state. If not accepted, the workflow goes back to the _pending_ state.

</div>
</div>
<br/>

:::info Next step
Immediately after closing the workflow, supervisors can fill out the [**Feedback**](/docs/products/workflows/work_orders/surveys-feedback) form that appears on the channel.
:::

