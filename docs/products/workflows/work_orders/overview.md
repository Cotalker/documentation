---
title: Product-Related Tools
sidebar_label: Overview
---

import useBaseUrl from '@docusaurus/useBaseUrl'; 

<span className="hero__title">Work Orders Workflow</span>
<br/>
<br/>

<img alt="title image" className="img_sizing item shadow--tl" src={useBaseUrl('img/products/products_work_orders_overview_00.png')} />

## Overview {#overview}

With Cotalker's survey forms, the **Work Orders** workflow lets you easily manage your _work orders_ from start to finish. Supervisors can create _work orders_, either from scratch or from a _notification_ in a Corrective Maintenance process. The _work order_ is then sent to technical teams and contractors, requesting them to fill out a form to accept it or not. If accepted, they can send a quote, exchange information, and close the work order. Once maintenance personnel request to close the work order, a supervisor reviews the completed job. If satisfied, they fill out the **Acceptance of Work** form, and the work order is officially closed.

## Workflow and Form Examples {#example}
### Create Work Order {#create-wo}
Layla is a supervisor in her company. She just received a _notification_ about a water leak in the northern premises through the Cotalker platform. She will use the same Cotalker channel to create a work order requesting a contractor's services. To do this, she will fill out the **Create Work Order** form, as shown below.

<img alt="create work order" className="img_sizing item shadow--tl" src={useBaseUrl('img/products/video_create_work_order.gif')} />
<br/>

Once submitted, the _Work Order_ workflow is initiated, and the work order is sent to contractors.

### Accept Work Order {#accept-wo}
Thomas, a contractor, received the work order Layla submitted. After checking out the details of the maintenance issue, he chooses to accept the task. On the same channel he received the work order, he submits the **Accept Work Order** form.

<img alt="accept work ordere" className="img_sizing item shadow--tl" src={useBaseUrl('img/products/video_accept_work_order.gif')} />
<br/>

Layla will be able to see in the channel that Thomas accepted the work order.

### Send Quote {#send-quote}
After reviewing the details of the incident, Thomas sends a first quote using the **New Quote** form. 

<img alt="send quote" className="img_sizing item shadow--tl" src={useBaseUrl('img/products/video_new_quote.gif')} />
<br/>

Layla can see the quote in the work order's channel. Additionally, a new workflow is initiated with the company's budget manager.

### Close Work Order {#close-wo}
Thomas was able to finish the job on time. Now he wants to close the work order, so he fills out the corresponding form.

<img alt="close work order" className="img_sizing item shadow--tl" src={useBaseUrl('img/products/video_close_work_order.gif')} />
<br/>

The workflow now passes to the _validate_ state. Layla's approval is required to close the workflow.

### Acceptance of Work {#acceptance-of-work}
We are a step away from officially closing the work order. Layla sees on the channel that Thomas has submitted the **Close Work Order** form. So now she must check if the job was done correctly. Seeing that everything was done satisfactorily, she sends the **Acceptance of Work** form.

<img alt="acceptance of work" className="img_sizing item shadow--tl" src={useBaseUrl('img/products/video_acceptance_of_work.gif')} />
<br/>

Once the work has been accepted, the workflow is closed. Afterwards, a _feedback_ form appears so the supervisor can evaluate the contractor's service. Layla can fill out the form, and Thomas will be able to see its result on the channel.

----

## Glossary {#glossary}
- **Work Order (WO)**: An authorized request to complete a maintenance task containing relative information for the job.
- **Form**: A dynamic survey form generated within the Cotalker platform. It is linked to the company's master data, enabling users to choose failures according to section and equipment.
- **Notification**: A automatically generated message sent within the corrective maintenance group, where users have access to a workspace to respond to notifications and other messages. Depending on the business or industrial sector, _notifications_ can also be known as _alerts_ or _incidents_.

----

## Related Topics {#related-topics}
- [Work Order Product](/docs/products/work_order_product/wo_overview)
- [Corrective Maintenance Product](/docs/products/corrective_maintenance/cm_overview)