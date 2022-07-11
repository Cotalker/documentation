---
title: Service Quotations Workflow
sidebar_label: Quotation Request Acceptance
---

import useBaseUrl from '@docusaurus/useBaseUrl'; 

<span className="hero__title">Quotation Request Acceptance</span>
<br/>
<br/>

## Overview {#overview}
The service provider receives a notification in the **Main Menu Bar** of the new request sent by the client. By selecting the _Service Quotations_ workflow from the **Main Menu Bar**, the service provider can access the _channel workspace_. Once inside the _channel workspace_, the quotation request can be viewed, and a form can be filled out to either accept or reject the request.

## Accessing the Workspace {#accessing}

To view the request and fill out the acceptance form:

<img alt="acceptance form" className="img_sizing item shadow--tl" src={useBaseUrl('img/products/product_sq_01.png')} />
<br/>

<div className="margin margin-left--lg">

1. From the **Main Menu Bar**, choose <span className="badge badge--primary">Service quotations</span>.
2. In the **Service quotations** group panel, go to the <span className="badge badge--info">Requested</span> section and choose the request you wish to view to open the _channel workspace_.
3. On the _channel workspace_, you can view the request sent by the client with all its details.
4. At the bottom of the _channel workspace_, press the <span className="badge badge--success">Accept quote request</span> button to open the corresponding acceptance form. The form is displayed below.

</div>


## Layout {#layout}

<div className="alert alert--secondary">

_The **Accept quote request** form allows you to accept or reject the request:_

<img alt="acceptance form" className="img_sizing item shadow--tl" src={useBaseUrl('img/products/product_sq_02.png')} />
<br/>

<div className="margin margin-left--lg">

Select **Yes** to accept the request. After submitting the form, the workflow passes on to the [following stage of the workflow](/docs/products/service_quotations/survey-create).

</div>


<img alt="acceptance form" className="img_sizing item shadow--tl" src={useBaseUrl('img/products/product_sq_02a.png')} />
<br/>

<div className="margin margin-left--lg">

Select **No** to reject the request. A field will appear on the form asking for an explanation as to why the request was denied. Once the form is submitted, the explanation is inserted into an automatically generated email sent to the client.

</div>

</div>
<br/>

:::info Next step
In case the request is accepted, the workflow passes on to the next stage where the service provider can [create the service quotation](/docs/products/service_quotations/survey-create).

If the request is denied, then the workflow comes to its end.
:::
