---
title: Service Quotations Workflow
sidebar_label: Create Service Quote
---

import useBaseUrl from '@docusaurus/useBaseUrl'; 

<span className="hero__title">Create Service Quote</span>
<br/>
<br/>

## Overview {#overview}
Once the request has been accepted, the service provider can create the quotation. The form is connected with the company's master data, providing materials, services, and worker details to help automate generating the quote. After submission, an email is automatically sent to the client with a PDF version of the quote and a link to accept or reject the quotation. The quote's PDF version will also be available in the channel workspace.

## Accessing the Form {#access}
To access the Create Service Quote form:

<img alt="create service quote" className="img_sizing item shadow--tl" src={useBaseUrl('img/products/product_sq_03.png')} />
<br/>

1. From the **Main Menu Bar**, select <span className="badge badge--primary">Service Quotations</span>.
2. In the **Service quotations** group panel, choose the corresponding _task_ under the <span className="badge badge--info">Processed</span> label.
3. At the bottom of the channel workspace, click the <span className="badge badge--success">Create quote</span> button to open the form. The form appears as shown below.


<div className="alert alert--secondary">

## Layout {#layout}
The **Create Service Quote** form looks initially like this:

<img alt="create service quote" className="img_sizing item shadow--tl" src={useBaseUrl('img/products/product_sq_04.png')} />
<br/>

<div className="margin margin-left--lg">

**A. Add Product**: Allows you to add _materials_ and _services_ registered in the master data along with the quantities needed for each one. Availability of _materials_ depends on inventory registered in the database.  
**B. Add Worker**: Allows you to add _workers_ registered in the database and the number of hours each one will work.

</div>

:::note
Add as many _products_ (_materials_, _services_) and _workers_ as needed.
:::
_A filled-out form looks something like this:_

<img alt="create service quote" className="img_sizing item shadow--tl" src={useBaseUrl('img/products/product_sq_04a.png')} />
<br/>

_A. Add Product (1 & 2):_
- Press the **+ Add** button to add a product to the quotation. Add as many products as you need.
- Choose **material** or **services** for the _Product type_.
- Choose specific _materials_ or _services_ found in the master data.
- Insert the required **quantity**. Costs will be automatically calculated when generating the quote.  

_B. Add Workers (3 & 4):_
- Press the **+ Add** button to add person-hours per worker. Add as many workers as you need.
- Choose a **worker** from the list.
- Insert the number of hours the worker will dedicate to the service. Costs will be automatically calculated when generating the quote.


</div>
<br/>


## After Submission {#after}

<img alt="create service quote" className="img_sizing_small item shadow--tl" src={useBaseUrl('img/products/product_sq_04b.png')} />
<br/>

After submitting the form, three actions are automatically carried out:
- A link to the PDF version of the service quote is posted on the channel.
- An email is sent to the client with the quote and a link to the approval form.
- The workflow passes to the following state, awaiting a response from the client.

:::info Next step
In the [following step of the process](/docs/products/service_quotations/survey-approve), we view the email sent to the client, which includes a PDF of the quotation and a link to the approval form.
:::
