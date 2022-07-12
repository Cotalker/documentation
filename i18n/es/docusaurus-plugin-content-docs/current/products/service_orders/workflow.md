---
title: Service Orders Workflow
sidebar_label: Workflow Description
---

:::caution Advertencia
Esta página aún no se encuentra traducida al español.
:::

import useBaseUrl from '@docusaurus/useBaseUrl'; 

<span className="hero__title">Workflow Description</span>
<br/>
<br/>

<div className="container">
<div className="row">
<div className="col col--6">

<img alt="workflow" className="img_sizing_narrow" src={useBaseUrl('img/products/product_serviceorders_workflow_00.png')} />

</div>
<div className="col col--6">


_Description of the different states or stages of the process:_

1. **Created**: The first state is initiated with the creation of a service order using the _Create Service Order_ form. Once created, the _Release Service Order_ form is made available so supervisors can approve the service order for release and pass it on to the next stage (_Released_). The service order can also be rejected and sent to the _Not performed_ state.
2. **Released**: Once in the released state, field workers can be incorporated into the workflow. Field workers can use the _fast close_ form to confirm that the job was completed as indicated in the service order, passing the process to the _Finally confirmed_ state. They can also pass the to the _Partially confirmed_ state by submitting the _Create confirmation_ form if they need to apply modifications to the service order. If the job was not performed, the field workers can pass the service order into the _Not performed_ state by selecting the respective option.
3. **Partially confirmed**: Service orders that field workers or other involved stakeholders have modified after they were released are found in this state. Those involved can resubmit the _Create confirmation_ form as many times as necessary, and once finished, they can close the service order through the same form.
4. **Finally confirmed**: All service orders that have been completed, with or without modifications after release, are sent to this state.
5. **Not performed**: Service orders that were rejected by supervisors or not initiated by field workers after release are found here.

</div>

</div>
</div>
