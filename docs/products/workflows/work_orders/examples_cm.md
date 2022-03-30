---
title: Work Orders Workflow
sidebar_label: Use Case Examples
displayed_sidebar: workflow_workorders
pagination_next: products/workflows/work_orders/workflow
pagination_prev: products/workflows/work_orders/examples
---

import useBaseUrl from '@docusaurus/useBaseUrl'; 

<span className="hero__title">Use Case Examples</span>
<br/>
<br/>

## Create Work Order {#create-wo}

<div className="alert alert--primary">

Layla is a supervisor in her company. She just received a _notification_ about a water leak in the northern premises through the Cotalker platform. She will use the same Cotalker channel to create a work order requesting a contractor's services. To do this, she will fill out the **Create Work Order** form, as shown below.

<img alt="create work order" className="img_sizing item shadow--tl" src={useBaseUrl('img/products/video_create_work_order.gif')} />
<br/>

Once submitted, the _Work Order_ workflow is initiated, and the work order is sent to contractors.

</div>
<br/>

## Accept Work Order {#accept-wo}

<div className="alert alert--primary">

Thomas, a contractor, received the work order Layla submitted. After checking out the details of the maintenance issue, he chooses to accept the task. He can then submit the **Accept Work Order** form on the same channel he received the work order.

<img alt="accept work ordere" className="img_sizing item shadow--tl" src={useBaseUrl('img/products/video_accept_work_order.gif')} />
<br/>

Layla will be able to see on the channel that Thomas accepted the work order.

</div>
<br/>

## Send Quote {#send-quote}

<div className="alert alert--primary">

After reviewing the details of the incident, Thomas sends a first quote using the **New Quote** form. 

<img alt="send quote" className="img_sizing item shadow--tl" src={useBaseUrl('img/products/video_new_quote.gif')} />
<br/>

Layla can see the quote in the work order's channel. Additionally, the [quotes workflow](/docs/products/workflows/budget_management/overview) is initiated with the company's budget manager.

</div>
<br/>


## Close Work Order {#close-wo}

<div className="alert alert--primary">

Thomas was able to finish the job on time. Now he wants to close the work order, so he fills out the corresponding form.

<img alt="close work order" className="img_sizing item shadow--tl" src={useBaseUrl('img/products/video_close_work_order.gif')} />
<br/>

The workflow now passes to the _validate_ state. Layla's approval is required to close the workflow.

</div>
<br/>

## Acceptance of Work {#acceptance-of-work}

<div className="alert alert--primary">

We are a step away from officially closing the work order. Layla sees on the channel that Thomas has submitted the **Close Work Order** form. So now she must check if the job was done correctly. Seeing that everything was done satisfactorily, she sends the **Acceptance of Work** form.

<img alt="acceptance of work" className="img_sizing item shadow--tl" src={useBaseUrl('img/products/video_acceptance_of_work.gif')} />
<br/>

Once the work has been accepted, the workflow is closed. 

Afterward, a _feedback_ form appears so the supervisor can evaluate the contractor's service. Layla can fill out the form, and Thomas will be able to see its result on the channel.

</div>
<br/>

