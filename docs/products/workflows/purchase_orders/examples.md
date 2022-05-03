---
title: Purchase Orders Workflow
sidebar_label: Use Case Examples
---

import useBaseUrl from '@docusaurus/useBaseUrl'; 

<span className="hero__title">Use Case Examples</span>
<br/>
<br/>

Jennifer works in the logistics department of her company. She's been put in charge of office supplies in her sector. Since they're running low on paper and ink for their printers, she has decided to make a purchase order. She wants to make a big purchase, so they're going to have it all delivered directly to the warehouse.

<span className="hero__subtitle"><em>View each step of the process in 30-second screen recordings:</em></span>
<br/>
<br/>

## Create Purchase Order {#create}

<div className="alert alert--secondary">

She starts out by creating the purchase order and sending it out for approval. To do that, she simply goes to the **Purchase Order** tool and presses the _action button_ to open up the corresponding form. 

<img alt="create purchase order" className="img_sizing item shadow--tl" src={useBaseUrl('img/products/video_purchase_order_00.gif')} />
<br/>

Since the form is connected to the company's master data, all relevant options for her user role are made available. Once she submits the form, it is automatically sent to the corresponding reviewers for approval.

</div>
<br/>

## Release Level 1 {#release-one}

<div className="alert alert--secondary">

Mario is the first level releaser. This means that all purchases equal to or above $100 must get his approval. Jennifer's purchase request costs $900, so Mario has to review it before it can go to the next release level.

<img alt="release level 1" className="img_sizing item shadow--tl" src={useBaseUrl('img/products/video_purchase_order_01.gif')} />
<br/>

Once the approval form is signed and submitted, it is sent to the next release level. Since Mario's work here is done, he is automatically taken off from the purchase order's channel.

</div>
<br/>

## Release Level 2 {#release-two}

<div className="alert alert--secondary">

Sarah has now received Jennifer's purchase order request. She's the second level releaser, i.e., she reviews all purchase requests over $500. She approves the request by signing and submitting the form.

<img alt="second release level" className="img_sizing item shadow--tl" src={useBaseUrl('img/products/video_purchase_order_02.gif')} />
<br/>

Since the purchase order is less than $1000, it does not have to pass through the third release level. It is now fully approved. A purchase order document is generated in PDF format and automatically sent to the supplier.

</div>
<br/>

## Declare Receipt (first delivery) {#receipt-one}

<div className="alert alert--secondary">

We find ourselves now in the warehouse, where Luis is in charge of receiving deliveries from suppliers. He gets a big delivery of paper and some ink.  

<img alt="partial receipt" className="img_sizing item shadow--tl" src={useBaseUrl('img/products/video_purchase_order_03.gif')} />
<br/>

After checking the purchase order, he notices that this is not the total amount of goods purchased. It turns out the supplier had some stock and logistics problems, and will be segmenting the delivery. Luis registers what he has received so far from the supplier with the _Declare Receipt_ form.

Luis will then pass the invoice he received to Christina in accounting.

</div>
<br/>

## Billing (first invoice) {#billing-one}

<div className="alert alert--secondary">

Christina works in accounting. Luis gave her the partial delivery invoice, and now she must register it. She goes to the purchase order channel and fills out the _Billing Form_.

<img alt="partial billing" className="img_sizing item shadow--tl" src={useBaseUrl('img/products/video_purchase_order_04.gif')} />
<br/>

The _Billing Form_ is connected to the company's master data and the purchase order. This helps Christina easily select the supplier's billing information. It also keeps track of the total costs to be paid according to the goods and services received.

</div>
<br/>

## Declare Receipt (second delivery) {#receipt-two}

<div className="alert alert--secondary">

The final shipment of paper and ink arrives. Luis checks purchase order information and past reception registries. The _Declare Receipt_ form also reminds Luis the amounts previously received.

<img alt="receipt complete" className="img_sizing item shadow--tl" src={useBaseUrl('img/products/video_purchase_order_05.gif')} />
<br/>

He enters the data, all the purchased goods have arrived. He sends Christina the invoice.

</div>
<br/>

## Billing (second invoice) {#billing-two}

<div className="alert alert--secondary">

After receiving the new invoice, Christina starts filling out the _Billing Form_. While doing so, she accidentally entered a higher cost than expected. The system instantly corrects her error and notifies her of what the maximum payment should be based on the goods already received and paid for.

<img alt="billing complete" className="img_sizing item shadow--tl" src={useBaseUrl('img/products/video_purchase_order_06.gif')} />
<br/>

After Christina submitted the form, the process is complete. Now, Jennifer or her supervisor can finally close the purchase order workflow.

</div>
<br/>

## Close the Purchase Order {#close}

<div className="alert alert--secondary">

Jennifer has been following the entire purchase order process. Now, only she is left in the channel. With nothing more to do, and after checking that everything is in order, she can close the purchase order workflow.

<img alt="workflow closed" className="img_sizing item shadow--tl" src={useBaseUrl('img/products/video_purchase_order_07.gif')} />
<br/>

_And that's it! Easily automate and keep track of the entire purchase order process in just one place._

</div>
<br/>