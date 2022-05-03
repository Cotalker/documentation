---
title: Purchase Orders Workflow
sidebar_label: Release Form
---

import useBaseUrl from '@docusaurus/useBaseUrl'; 

<span className="hero__title">Release Form</span>
<br/>
<br/>


Purchase orders will be put under the rules of a specific release strategy for approval before being sent to a supplier. The release strategy applied to the purchase order will depend on the company area in which it was created.

The workflow is currently set to carry purchase order requests through up to three levels of approval if they fall within certain price ranges. Price ranges can be easily set to your company's needs.

A different _releaser_, i.e., person in charge of approving purchase orders, can be assigned to each company's release levels. Every time a purchase order enters a release level, the corresponding releaser is added to the channel.

:::info
For more information on release strategies and how to configure them, go to the [Release Strategy Configuration](/docs/products/workflows/purchase_orders/release-strategy) section.
:::

## Accessing the Form {#access}

<div className="alert alert--secondary">

_When releasers are needed to review a purchase order request, they can open the following **Release Form**:_

<img alt="survey form" className="img_sizing item shadow--tl" src={useBaseUrl('img/products/product_purchase_survey_02.png')} />
<br/>

<div className="margin-left--xl">

1. On the **Main Menu Bar**, press <span className="badge badge--primary">Purchase Orders</span>.
2. Choose the purchase order to be reviewed from the **Purchase Orders** panel.
3. From the channel workspace, press the <span className="badge badge--success">Release Purchase Order</span> button.

</div>

</div>
<br/>

## Form Layout {#layout}

<div className="alert alert--secondary">

_The **Release Purchase Order** form appears as shown below:_

<img alt="survey form" className="img_sizing item shadow--tl" src={useBaseUrl('img/products/product_purchase_survey_03.png')} />
<br/>

_After choosing either to approve or reject the purchase order request, a field for the releaser's signature appears:_

<img alt="survey form" className="img_sizing item shadow--tl" src={useBaseUrl('img/products/product_purchase_survey_04.png')} />
<br/>

If approved, the signature will appear on the automatically generated purchase order PDF document.

</div>
<br/>