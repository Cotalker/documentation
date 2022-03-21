---
title: Work Orders Workflow
sidebar_label: Close WO Form
id: wo_wf_close_form
---

import useBaseUrl from '@docusaurus/useBaseUrl'; 

<span className="hero__title">Survey Forms</span>
<br/>

## Close Work Order {#close-work-order}

Once the job has been completed, technical teams and contractors can submit the **Close Work Order** form. 

<div className="alert alert--primary">

_To submit the Close Work Order form:_

<img alt="close work order" className="img_sizing item shadow--tl" src={useBaseUrl('img/products/products_work_orders_workflow_forms_09.png')} />
<br/>

1. Press <span className="badge badge--primary">Work Orders</span> in the **Main Menu Bar**.
2. Select the corresponding work order from the **Work Orders** panel.
3. Press the _action button_ in the channel workspace to open the actions menu.
4. Press the **Create Work Order**. The corresponding form appears as shown below.

<img alt="close work order" className="img_sizing item shadow--tl" src={useBaseUrl('img/products/products_work_orders_workflow_forms_10.png')} />
<br/>

The **Close Work Order** form contains database elements, permitting maintenance personnel to choose services and materials from lists. In the database, the quantity of materials in stock is registered, and services include costs. Once the form is submitted, chosen materials are deducted from warehouse materials. Additionally, service costs are calculated and displayed.

After submission, the workflow passes to the _validate_ state.

</div>
<br/>

:::info Next step
Supervisors review the submitted **Close Work Order** and fill out the [**Acceptance of Work**](/docs/products/workflows/work_orders/surveys-acceptance) form.
:::
