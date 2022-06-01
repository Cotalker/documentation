---
title: Service Orders Workflow
sidebar_label: Create Service Order Form
---

import useBaseUrl from '@docusaurus/useBaseUrl'; 

<span className="hero__title">Create Service Order Form</span>
<br/>
<br/>

The first step consists in creating a service order which will then be sent to a supervisor or coordinator for review. The **Create Service Order** form is connected to the company's master data, allowing to complete the service order with previously-entered client data and service costs.

Only authorized users can create a service order. The data gathered to make the service order can be used for further analysis and displayed on the _service orders dashboard_. The service order can be updated later with unforeseen expenses and costs.

## Accessing the Form {#access}

<div className="alert alert--secondary">

To access the **Create Service Order** form:

<img alt="create survey" className="img_sizing item shadow--tl" src={useBaseUrl('img/products/product_serviceorder_survey_00.png')} />
<br/>

<div className="margin margin-left--lg">

1. Select <span className="badge badge--primary">Service Orders</span> from the **Main Menu Bar**.
2. In the **Service orders** panel, press the green _action button_.
3. Select the **Create service order** option to open the form. The form will open up, as shown below.

</div>

</div>

## Basic Form Layout {#layout}

<div className="alert alert--secondary">

_Below is an example of the form being filled out._

#### General data of the order {#general-data}

<img alt="create survey" className="img_sizing item shadow--tl" src={useBaseUrl('img/products/product_serviceorder_survey_01.png')} />
<br/>

<div className="margin margin-left--lg">

1. **Order type**: Indicate the type of service to be performed. Available options are previously set through the company's master data.
2. **Client**: Choose the client requesting the service. The list of clients and their respective information is previously set through the company's master data. The information associated with the chosen client is internally fetched and used to generate the service order.
3. **Order name**: Give the service order a reference name.
4. **Order description**: Give a brief description of the service to be provided and its context.
5. **Work start date**: Indicate the date and time the service should commence.
6. **Work completion data**: Indicate the date and time the service should be concluded.

</div>
<br/>

#### Necessary products, Staff needed, Additional information {#survey-surveys}

<img alt="create survey" className="img_sizing item shadow--tl" src={useBaseUrl('img/products/product_serviceorder_survey_02.png')} />
<br/>

<div className="margin margin-left--lg">

7. **Necessary products**: Press the **+ Add** button to indicate any products to be used in the service order. Product types are divided into _materials_ and _services_. Each product type is connected to the company's master data, allowing users to choose from a list of the specific products, i.e., materials or services, to be used. The cost of the chosen services and materials are added to the service order.
8. **Staff needed**: Press the **+ Add** button to indicate the workers assigned to the task and the number of hours it should take them to complete the job. 
9. **Additional information**: Press the **+ Add** button to attach files that contain any necessary information to complete the job. Files can be in any format.
10. **SEND**: Click here to create the service order and submit it for review.

</div>

</div>
<br/>

:::info Contact us
Visit the [customization page](/docs/products/setup/customization) or contact a [Cotalker Sales Representative](/docs/support/commercial) for more information on how to customize surveys for your company's needs.
:::