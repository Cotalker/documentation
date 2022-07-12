---
title: Service Quotations Workflow
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

<img alt="workflow" className="img_sizing" src={useBaseUrl('img/products/product_sq_states.png')} />

</div>
<div className="col col--6">

_Description of the different states or stages of the process:_

1. **Requested**: The client has sent a _Request Quotation_ form and is awaiting a response from the service provider.

2. **Processed**: The service provider has accepted the request but has still not sent the quotation.

3. **Shipped**: The quotation has been generated and sent to the client.

<div className="margin margin-left--lg">

_Note: The child workflow corresponds to a parallel process in which the quotation is sent via email to the client._

</div>

4. **Accepted**: The client has accepted the quotation, initiating the [service order workflow](/docs/products/service_orders/so_overview) in parallel. The service quotations workflow has ended.

5. **Rejected**: The client has not accepted the quotation, thus ending the workflow.

6. **Not processed**: The service provider has not accepted the quotation request. An email is sent to the client providing the reasons the request was not accepted.

</div>
</div>
</div>
<br/>

:::info
See the [customization section](/docs/products/setup/customization_examples/workflow_cm) to see how to access the workflow's settings panel.
:::

