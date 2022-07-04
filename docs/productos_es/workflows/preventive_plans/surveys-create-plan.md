---
title: Preventive Plans Workflow
sidebar_label: Create a Preventive Plan Form
---

import useBaseUrl from '@docusaurus/useBaseUrl'; 

<span className="hero__title">Create a Preventive Plan Form</span>


With this form, you can create and configure a preventive maintenance plan for one of your assets.

<div className="alert alert--primary">

## Access the Form {#access}

_To open the form:_

<img alt="access form" className="img_sizing item shadow--tl" src={useBaseUrl('img/products/product_preventive_surveys_00.png')} />
<br/>

<div className="margin-left--lg">

1. On the **Main Menu Bar**, go to <span className="badge badge--primary">Preventive Plans</span>.
2. From the **Preventive Plans** panel, select **Create Preventive Plan**.
3. Press the <span className="badge badge--success">Create Preventive Plan</span> found at the bottom of the channel workspace to open the form shown below.

</div>
</div>
<br/>

<div className="alert alert--primary">


## Form Layout {#layout}


### General Layout {#general-layout}

_Below is the initial view of the **Create a New Preventive Plan** form:_

<img alt="access form" className="img_sizing item shadow--tl" src={useBaseUrl('img/products/product_preventive_surveys_01.png')} />
<br/>

<div className="margin-left--lg">

The form is associated with your company's [_master data_](/docs/products/setup/master_data), making lists of equipment and users available in the corresponding fields.

The _Checklist_, a survey with maintenance requirements for equipment, must be previously created. Visit the [Create Survey Tutorial](/docs/tutorials/basic/create_survey) or the [Admin Docs](/docs/documentation/admin/survey/survey_overview) for more information on surveys.

</div>
<br/>

### Time-Based Plan {#time-based}

_When you select to create a time-based plan, the following fields will appear:_

<img alt="access form" className="img_sizing item shadow--tl" src={useBaseUrl('img/products/product_preventive_surveys_02.png')} />
<br/>

<div className="margin-left--lg">

Remember that _frequency_ is measured in hours. For example, daily checks require a value of 24; weekly checks, 168; monthly checks, 730; yearly checks, 8760; and so forth.

</div>
<br/>

### Value-Based Plan {#value-based}
_When you select to create a value-based plan, the following fields will appear:_

<img alt="access form" className="img_sizing item shadow--tl" src={useBaseUrl('img/products/product_preventive_surveys_03.png')} />
<br/>

<div className="margin-left--lg">

- In the **units** field, specify the metric's unit system, e.g., miles, kilometers, gallons, liters, etc.
- **Frequency** indicates the metric value intervales to prompt a maintenance check.
- **Current value** is the value the equipment or asset's metric is currently at. This value will be constantly updated by the _assignee_.
- **Initial reference value** indicates the metric's value the last time a maintenance check was performed, i.e., the value the planner starts counting from.



</div>
</div>
<br/>