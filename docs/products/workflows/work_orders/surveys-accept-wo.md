---
title: Work Orders Workflow
sidebar_label: Accept WO Form
id: wo_wf_accept_form
---

import useBaseUrl from '@docusaurus/useBaseUrl'; 

<span className="hero__title">Survey Forms</span>
<br/>

## Accept Work Order {#accpet-work-order}

Once the **Create Work Order** form has been submitted by a supervisor, technical teams or contractors will receive the work order with access to the details of the maintenance issue. They can choose to either accept or reject the work order.

<div className="alert alert--primary">

_To accept or reject the work order:_

<img alt="accept work order" className="img_sizing item shadow--tl" src={useBaseUrl('img/products/products_work_orders_workflow_forms_05.png')} />
<br/>

1. Press <span className="badge badge--primary">Work Orders</span> in the **Main Menu Bar**.
2. Select the work order to be reviewed from the **Work Orders** panel.
3. Review the work order's details.
4. Press the action button to open the **Accept Work Order** form. The form appears as shown below.

<img alt="accept work order" className="img_sizing item shadow--tl" src={useBaseUrl('img/products/products_work_orders_workflow_forms_06.png')} />
<br/>

Contractors and technical teams can either accept or reject the work order. If accepted, the workflow passes to the _pending_ state. If not, the workflow continues in the _reported_ state until someone accepts the work order.

</div>
<br/>

:::info Next steps
- After accepting the work order, contractors can also submit the [**New Quote**](/docs/products/workflows/budget_management/overview) form. This form is tied to master data to help easily choose services and available materials, along with their costs and stocks, respectively.
- Once the job has been completed, maintenance personnel can request to close the work order by submitting the [**Close Work Order**](/docs/products/workflows/work_orders/surveys-close-wo) form.
