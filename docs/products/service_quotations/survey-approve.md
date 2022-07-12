---
title: Service Quotations Workflow
sidebar_label: Approve Quotation
---

import useBaseUrl from '@docusaurus/useBaseUrl'; 

<span className="hero__title">Approve Quotation</span>
<br/>
<br/>

## Overview {#overview}
This step of the process starts with the email sent to the client. The email comes attached with a PDF version of the quotation for the client to review. A link to an approval form is also found in the email. The link opens a public survey which allows the client to communicate their approval or rejection of the service quotation to the service provider. If approved, the [service order workflow](/docs/products/service_orders/so_overview) can begin to initiate its process with the data provided by the service quotation.

## Email Sent to Client {#email}
_The email sent to the client should look something like this:_

<img alt="email" className="img_sizing_small item shadow--tl" src={useBaseUrl('img/products/product_sq_06.png')} />
<br/>

<div className="margin margin-left--lg">

The email comes with: 
- A PDF attachment of the service quotation.
- A link to the PDF document.
- A link to a form where the client can approve or reject the quotation.

</div>
<br/>

## PDF Document {#pdf}
_The automatically generated PDF of the quote sent to the client should look something like this:_

<img alt="pdf" className="img_sizing_small item shadow--tl" src={useBaseUrl('img/products/product_sq_07.png')} />
<br/>

<div className="margin margin-left--lg">

The document includes: 
- Client information
- Provider information
- Start date
- Order description
- Service performer costs
- Service costs
- Material costs
- Total cost

</div>
<br/>

## Approval Form {#approval}
_The Approval form made available for the client should look something like this:_

<img alt="form" className="img_sizing item shadow--tl" src={useBaseUrl('img/products/product_sq_08.png')} />
<br/>

<div className="margin margin-left--lg">

If **Yes**, the service provider gets notified upon form submission and the [_service order workflow_](/docs/products/service_orders/so_overview) is initiated.

If **No**, a field for feedback appears. Upon submission, the service provider gets notified and receives the feedback message. And the workflow comes to its end.

</div>

:::info Workflow End
The workflow has come to its end. If the service quotation was approved by the client, then proceed to the [service orders workflow](/docs/products/service_orders/so_overview).
:::



