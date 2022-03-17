---
title: Product-Related Tools
sidebar_label: Work Order Forms
---

import useBaseUrl from '@docusaurus/useBaseUrl'; 

<span className="hero__title">Work Order Forms</span>
<br/>

## Overview {#overview}

Getting the job done is easy with the different _survey forms_ that make up the **Work Order** workflow. Each step of the process is initiated with a special survey form that gathers the information stakeholders need to carry out their responsibilities. Answered survey forms are posted in the work order channel, keeping the entire team up to date with all the information.

Below we present in sequential order all the survey forms used in the workflow.

## Create Work Order {#create-work-order}
The _Create Work Order_ form is the first form and initiates the workflow once submitted.

There are two types of _Create Work Order_ forms: _stand-alone_ and _integrated_.

<div className="alert alert--primary">

### Stand-alone Work Order {#stand-alone}

<div className="margin-left--lg">

If you are using the _Work Order_ workflow as a stand-alone product, then the **Create Work Order** form is accessed as shown below.

<img alt="create work order" className="img_sizing item shadow--tl" src={useBaseUrl('img/products/products_work_orders_workflow_forms_01.png')} />
<br/>

1. Press <span className="badge badge--primary">Work Orders</span> in the **Main Menu Bar**.
2. In the **Work Orders** panel, press the green _action button_.
3. Press the _Create Work Order_ button. The corresponding form appears as shown below.

<img alt="create work order" className="img_sizing item shadow--tl" src={useBaseUrl('img/products/products_work_orders_workflow_forms_02.png')} />
<br/>

The form asks for detailed information concerning the maintenance task at hand. Once submitted, the workflow passes to the _reported_ state and the form is sent to technical teams or contractors to request their services.

</div>
</div>
<br/>

<div className="alert alert--primary">

### Integrated Work Order {#integrated}

<div className="margin-left--lg">

If you are using the _Work Order_ workflow as an integral part of the [Corrective Maintenance](/docs/products/corrective_maintenance/cm_overview) product, then the **Create Work Order** form is accessed as shown below.

<img alt="create work order" className="img_sizing item shadow--tl" src={useBaseUrl('img/products/products_work_orders_workflow_forms_03.png')} />
<br/>

1. Press <span className="badge badge--primary">Notifications</span> in the **Main Menu Bar**.
2. Select the corresponding incident report from the **Notifications** panel.
3. From the channel workspace, press the _action button_ to open the actions menu.
4. Press **Create Work Order**. The corresponding form will appear as shown below.

<img alt="create work order" className="img_sizing item shadow--tl" src={useBaseUrl('img/products/products_work_orders_workflow_forms_04.png')} />
<br/>

When using [Corrective Maintenance](/docs/products/corrective_maintenance/cm_overview), the form is brief due to the fact that the details are already registered in the [notification](/docs/products/workflows/notifications/overview).

Once submitted, the workflow passes to the _reported_ state and the form is sent to technical teams or contractors to request their services.

</div>
</div>
<br/>

## Accept Work Order {#accpet-work-order}

Once the **Create Work Order** form has been submitted by a supervisor, technical teams or contractors will receive the work order with access to the details of the maintenance issue. They can choose to either accept or reject the work order.

<div className="alert alert--primary">

<div className="margin-left--lg">

_To accept or reject the work order:_

<img alt="accept work order" className="img_sizing item shadow--tl" src={useBaseUrl('img/products/products_work_orders_workflow_forms_05.png')} />
<br/>

1. Press <span className="badge badge--primary">Work Orders</span> in the **Main Menu Bar**.
2. Select the work order to reviewed from the **Work Orders** panel.
3. Review the work order's details.
4. Press the action button to open the **Accept Work Order** form. The form appears as shown below.

<img alt="accept work order" className="img_sizing item shadow--tl" src={useBaseUrl('img/products/products_work_orders_workflow_forms_06.png')} />
<br/>

Contractors and technical teams can either accept or reject the work order. If accepted, the workflow passes to the _pending_ state. If not, the workflow continues in the _reported_ state until a someone accepts the work order.

</div>
</div>
<br/>


## Send Quote {#send-quote}

Once contractors have accepted a work order, they can send a quote through the same channel. 

<div className="alert alert--primary">
<div className="margin-left--lg">

_To send a new quote:_

<img alt="send quote" className="img_sizing item shadow--tl" src={useBaseUrl('img/products/products_work_orders_workflow_forms_07.png')} />
<br/>

1. Press <span className="badge badge--primary">Work Orders</span> in the **Main Menu Bar**.
2. Select the corresponding work order from the **Work Orders** panel.
3. Press the _actions button_ in the channel workspace to open the actions menu.
4. Press **New Quote**. The corresponding form appears as shown below.

<img alt="send quote" className="img_sizing item shadow--tl" src={useBaseUrl('img/products/products_work_orders_workflow_forms_08.png')} />
<br/>

After submitting the **New Quote** form, the quote is posted in the channel and simultaneously opens a parallel workflow that incorporates the company's budget manager.

</div>
</div>
<br/>


## Close Work Order {#close-work-order}

Once the work order has been completed, technical teams and contractors can submit the **Close Work Order** form. 

<div className="alert alert--primary">
<div className="margin-left--lg">

_To submit the Close Work Order form:_

<img alt="close work order" className="img_sizing item shadow--tl" src={useBaseUrl('img/products/products_work_orders_workflow_forms_09.png')} />
<br/>

1. Press <span className="badge badge--primary">Work Orders</span> in the **Main Menu Bar**.
2. Select the corresponding work order from the **Work Orders** panel.
3. Press the _action button_ in the channel workspace to open the actions menu.
4. Press the **Create Work Order**. The corresponding form appears as shown below.

<img alt="close work order" className="img_sizing item shadow--tl" src={useBaseUrl('img/products/products_work_orders_workflow_forms_10.png')} />
<br/>

The **Close Work Order** form contains database elements, permitting maintenance personnel to choose services and materials from lists. In the database, the quantity of materials in stock is registered and services include costs. Once the form is submitted, chosen materials are deducted from warehouse materials. Additionaly, service costs are calculated and displayed.

After submission, the workflow passes to the _validate_ state.

</div>
</div>
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

## Feedback {#feedback}

Once the work order is closed, supervisors are asked to send feedback. The feedback will be available for maintenance personnel.

<div className="alert alert--primary">
<div className="margin-left--lg">

The **Feedback** form appears in the channel immediately after the work order is closed.

<img alt="feedback" className="img_sizing item shadow--tl" src={useBaseUrl('img/products/products_work_orders_workflow_forms_13.png')} />
<br/>

:::note
If the work order is part of a Corrective Maintence routine, then the [_notification_](/docs/products/workflows/notifications/overview) that initiated the process must be manually closed.
:::

</div>
</div>
<br/>

