---
title: Service Orders Workflow
sidebar_label: Updating and Closing Forms
---

import useBaseUrl from '@docusaurus/useBaseUrl'; 

<span className="hero__title">Updating and Closing Forms</span>
<br/>
<br/>

Once the service order is released, field workers, i.e., those involved in carrying out the requested service, can update the service order's status. Status updates include _closing_, _modifying_, or _not performing_ the service order. These status updates are informed through the _actions button_ at the bottom of the channel workspace. All these updates aim ultimately at closing the workflow.

## Updating Service Order Status {#status}

<div className="alert alert--secondary">

_To update the status of a released service order:_

<img alt="status update" className="img_sizing item shadow--tl" src={useBaseUrl('img/products/product_serviceorder_survey_07.png')} />
<br/>

<div className="margin margin-left--lg">

1. Press <span className="badge badge--primary">Service orders</span> on the **Main Menu Bar**.
2. Choose the released service order to be updated from the **Service orders** panel.
3. In the channel workspace, press the _actions buttons_ to open **Actions** menu.
4. The **Actions** menu has the following update options to choose from:
    - [**A. Create confirmation**](#confirmation): Opens a form used to modify the service order in case of unforeseen issues. This action can be repeated as many times as necessary. When no more modifications are to be introduced, the service order can be closed through this form.
    - [**B. Fast close**](#close): Opens a form to close the service order when no modifications are to be introduced to the service order.
    - [**C. Not performed**](#not-performed): When the field workers cannot perform the job, they can press this button to close the workflow immediately and set its status to _Not performed_.

</div>
</div>
<br/>

## A. Create Confirmation {#confirmation}

<div className="alert alert--secondary">

_Field workers can fill out this form to modify the service order if new specifications or unforeseen events arise._

<img alt="confirmation form" className="img_sizing item shadow--tl" src={useBaseUrl('img/products/product_serviceorder_survey_09.png')} />
<br/>

<div className="margin margin-left--lg">

1. **Products**: Press **+ Add** to include revised material and service information.
2. **Workers**: Press **+ Add** to update staff information.
3. **Last confirmation**: Select **Yes** to close the service order with the latest modifications and pass it on to the _Finally confirmed_ workflow state. Select **No** to leave the service order open to new updates that could be added later on, leaving it in the _Partially confirmed_ workflow state.
4. **SEND**: Click here to submit the form and apply the updates.

:::caution Attention
The first _confirmation_ deletes the original service order's product and staff details. But each sequential _confirmation_ adds upon the first _confirmation_.
:::

</div>

</div>
<br/>

## B. Fast Close {#close}

<div className="alert alert--secondary">

_The Fast Close form is used to close the service order when the job has been completed as initially stipulated._

<img alt="confirmation form" className="img_sizing item shadow--tl" src={useBaseUrl('img/products/product_serviceorder_survey_08.png')} />
<br/>

If the answer is **Yes**, the service order is closed with the same values it was initiated with and passed on to the _Finally confirmed_ workflow state. If **No**, the service continues in the same workflow state.

</div>

## C. Not Performed {#not-performed}

<div className="alert alert--secondary">

The **Not Performed** option is used to close the service order and pass it to the _Not Performed_ workflow state. 

:::caution Use with Caution
This option cancels all service costs and terminates the service order.
:::

</div>