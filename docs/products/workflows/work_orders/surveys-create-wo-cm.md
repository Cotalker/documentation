---
title: Work Orders Workflow
sidebar_label: Create WO Form
id: wo_wf_cm_create_form
---

import useBaseUrl from '@docusaurus/useBaseUrl'; 

<span className="hero__title">Survey Forms</span>
<br/>

## Create Work Order {#create-work-order}
The _Create Work Order_ form is the first form and initiates the workflow once submitted.

<div className="alert alert--primary">

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
<br/>

:::info Next Step
After creating the work order, maintenance personnel review it and can choose to accept it or not with the [**Accept Work Order**](/docs/products/workflows/work_orders/surveys-accept-wo) form.
:::
