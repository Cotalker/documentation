---
title: Purchase Orders Workflow
sidebar_label: Release Strategy Configuration
---

:::caution Advertencia
Esta página aún no se encuentra traducida al español.
:::

import useBaseUrl from '@docusaurus/useBaseUrl'; 

<span className="hero__title">Release Strategy Configuration</span>
<br/>
<br/>

## Overview {#overview}

Depending on the company area in which the _purchase order_ was created, a specific set of _release strategy_ rules is applied to carry out the approval process before sending the _purchase order_ to a supplier. The workflow is currently set to carry _purchase order_ requests through up to three _release levels_ for approval if they fall within certain cost ranges. Cost ranges can be easily set to your company's needs. Each _release level_ counts with an assigned user to review _purchase orders_ for approval.

## Access Release Strategy Settings {#access}

<div className="alert alert--secondary">

_Authorized users can configure the release strategy settings as follows:_

<img alt="access release settings" className="img_sizing item shadow--tl" src={useBaseUrl('img/products/product_purchase_release_00.png')} />
<br/>

<div className="margin-left--xl">

1. On the **Main Menu Bar**, select <span className="badge badge--primary">Database</span> to open the **Database Collections** panel.
2. In **Database Collections** panel, choose **Release strategies** to open the settings panel.

</div>
<br/>

_Once the **Release strategies** item has been selected:_

<img alt="access release settings" className="img_sizing item shadow--tl" src={useBaseUrl('img/products/product_purchase_release_01.png')} />
<br/>

<div className="margin-left--xl">

1. In the **Release strategies** panel, chose the company area you which to configure to open the corresponding settings panel.
2. From the company area's settings panel, go to the **Additional Fields** tab to modify [**Amount Levels**](#level) and [**Releasers**](#releasers).

</div>

</div>
<br/>

## Level Cost Amounts {#level}

The release strategy is guided by amounts set for purchase costs. By default, the purchase order workflow includes three release levels. Each release level has a minimum cost amount. If a purchase is equal to or above a set amount, it must pass through all the corresponding release levels for approval.

Let's say we have a release strategy that has its level amounts set at 100, 500, and 1000, respectively. If a purchase has a total cost of $900, it must sequentially pass through the first and second release levels for approval. 

Rejection in any of the release levels completely cancels the purchase order.


## Releasers {#releasers}

Releasers, i.e., users designated to review purchase orders for approval, are configured by company area. Meaning that each company area can have its own releasers for every release level.

When a purchase order request arrives at a release level, the corresponding releaser is automatically added to the channel. Once in the channel, they can view all the data and submit the _Release Purchase Order_ form. Once they submit the form, whether they approved or rejected the order, they are automatically removed from the channel.

---

## Related Topics {#related}
- [**Release Form**](/docs/products/purchase_order_product/surveys-release): Survey form used by releasers to approve or reject a purchase order request.
- [**Workflow Description**](/docs/products/purchase_order_product/workflow): Describes how release levels act within the Purchase Orders Workflow.
