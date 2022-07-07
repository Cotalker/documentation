---
title: Purchase Orders
displayed_sidebar: products
---

import useBaseUrl from '@docusaurus/useBaseUrl'; 

<span className="hero__title">Product Overview</span>
<br/>

<img alt="purchase orders" className="img_sizing item shadow--tl" src={useBaseUrl('img/products/product_purchase_overview_00.png')} />
<br/>

## What can I do with Purchase Orders? {#what}

With our **Purchase Orders** product you can eliminate paperwork and automate the entire process for requesting, authorizing, receiving, and registering purchases. 

- Let company stakeholders get automatically involved in the process. 
- Design release strategies and program release levels according to amounts, company areas, and releasers. 
- With survey forms that are connected to your master data, you can create purchase order documents that include supplier details, items, costs, and releaser approval signatures.
- Automatically send purchase orders to suppliers once they are approved.
- Register total or partial receptions of goods and services.
- Registered partial receptions are discounted from the expected total, allowing further receptions of expected goods or services.
- Register invoice and billing details.
- Registration of invoice and billing details are connected with the original purchase order and reception registration, which helps control payments of partial receptions.

## How does it work? {#how}
The Purchase Order product consists of a single workflow. 

<img alt="workflow" className="img_sizing" src={useBaseUrl('img/products/product_purchase_overview_01.png')} />
<br/>

- It starts off with the creation of a purchase order by an authorized user. The purchase order creation form is connected with master data, allowing users to select among designated suppliers, goods, and services.
- Depending on the cost of the purchase, the company area, and the pre-established release strategy, the purchase order is sent to the area's first level releaser. (If the cost is under the programmed first level amount, then the purchase order is automatically approved and sent to the supplier.)
- If the purchase order was approved by the first level releaser and its costs is under the second level value, then the purchase order is automatically sent to the supplier. But, if the approved purchase order is equal to or above the second level release value, then the area's second level releaser must approve it before it can be sent to the supplier.
- The same process is followed for a third level release if it were necessary.
- Once the supplier has provided the goods or services, a _receptionist_, declares receipt of the goods or services upon inspection.
- In case the supplier did not provide all the expected goods or services, a partial receipt of goods or services can be declared. If the supplier sends more than one partial delivery, all receipts are registered and discounted from the expected total.
- After the supplier provides an invoice, even if it is an invoice for the partiality of the expected goods or services, the corresponding user can register the invoice and billing details.
- Billing details are connected with master data, the purchase order, and received goods and services registry, allowing a control over expected and received goods or services, partial and total payments, along with a detail of the supplier's banking information.
- Once all received goods and services are registered and paid for, the workflow can be closed.

## Workflow Details {#workflow}
_For in-depth product details and examples, view the information below:_

<div className="container">
<div className="row">

<div className="col col--12 margin-bottom--lg">
<a className="card2 padding--lg cardContainer_qNfC" href="/docs/products/purchase_order_product/workflow_overview">

<span className="hero__subtitle"><b>📦 Purchase Order Workflow</b></span> 

The **Purchase Orders workflow** is the essence of the _Purchase Order product_. In this section, you can discover and learn more about use case examples, workflow configuration, automations, master data, survey forms, release strategies, and stakeholder involvement.

</a>
</div>
</div>
</div>
<br/>