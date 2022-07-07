---
title: Customizations
sidebar_label: Customizing Surveys (PM)
---


import useBaseUrl from '@docusaurus/useBaseUrl'; 

<span className="hero__title">Customizing Surveys</span>
<br/>
<span className="hero__subtitle">Preventive Maintenance</span>
<br/>
<br/>

**Available on:** <span className="badge badge--danger">Professional Plans</span> <span className="badge badge--info">Enterprise Plans</span> <span className="badge badge--warning">Unlimited Plans</span>
<br/>

## Introduction {#intro}
[Preventive Maintenance Plans](/docs/products/preventive_maintenance/pm_overview) use _checklists_ for each maintenance check. Therefore, companies will need a checklist for each type of preventive maintenance check they wish to carry out.

This section provides a step-by-step use case example of how to create a customized checklist for a preventive maintenance plan. For more in-depth information, visit the [_Surveys_](/docs/documentation/admin/survey/survey_overview) section in the Admin documentation.

## Use Case Sample {#use-case}
The ACME company wants to include its smoke detectors within its preventive maintenance plan. Among the requirements, they need to do a monthly check on their smoke detectors as part of this plan. This maintenance check requires a checklist with the following specifications:

Item | Description
--- | ---
Maintenance Check Type | Smoke Detector
Frecuency | Monthly
Indicators | Do indicator lights show that the machine is functioning correctly? 
Sensors | General cleaning and maintenance.

Below you will find how to incorporate these specifications into a preventive maintenance plan.

## Step-by-Step Instructions {#step-by-step}
This section covers the steps you need to take to create the checklist and make it part of the preventive maintenance plan.

:::note
You will need a user profile with an [_access role_](/docs/documentation/admin/admin_accessrole) containing permissions to configure the **Administrative Panel**.
:::

#### Summary {#summary}

<div className="margin-left--lg">

[A. Create Checklist](#checklist)  
[B. Connect to Database](#database)  
[C. Create a Preventive Maintenance Plan](#create-pm)  
[D. Maintenance Work Order](#work-order)

</div>

### A. Create Checklist {#checklist}
_Create a survey used as the maintenance checklist users fill out when carrying out the preventive maintenance plan._

<div className="alert alert--secondary">

_Create a survey._

<img alt="create checklist" className="img_sizing item shadow--tl" src={useBaseUrl('img/products/product_setup_survey_pm_00.png')} />
<br/>

<div className="margin-left--lg">

1. Select <span className="badge badge--primary">Administrator</span> on the **Main Menu Bar**.
2. From the **Administrative Panel**, press <span className="badge badge--info">Surveys</span>.
3. Press the <span className="badge badge--secondary">+</span> icon to create a new survey form.

</div>

</div>
<br/>

<div className="alert alert--secondary">

_Set up the survey's general information._

<img alt="create checklist" className="img_sizing item shadow--tl" src={useBaseUrl('img/products/product_setup_survey_pm_01.png')} />
<br/>

<div className="margin-left--lg">

4. Type the title for your checklist in the **Name** field.
5. After writing in the **Name** field, a suggestion will automatically appear in the **Code** field. The _code_ is used to identify the resource and cannot be modified after saving. This _code_ will be needed later along the setup process.
6. After writing the checklist title in the **Name** field, it will automatically appear on the **Form template**.

</div>

</div>
<br/>

<div className="alert alert--secondary">

_Choose and set up survey components to be used in the checklist. Each component serves as a field or question users will see displayed in the maintenance checklist._

<img alt="create checklist" className="img_sizing item shadow--tl" src={useBaseUrl('img/products/product_setup_survey_pm_02.png')} />
<br/>

<div className="margin-left--lg">

7. Drag & drop the <span className="badge badge--primary">Rating</span> component onto the **Form template**.
8. In the **Field label**, enter the name of the item to be rated. This name will be seen by the user when they fill out the survey.
9. Enter a unique code name for the component. The **identifier** must begin with a letter. Only lowercase letters, numbers, and underscores are allowed.
10. The field can be set as _required_ for users to answer by clicking the asterisk icon. By default, fields are optional.

- _a. Preview of how the field will be displayed to users in the survey form._

</div>

</div>
<br/>

<div className="alert alert--secondary">

_Complete setting up the survey form and save._

<img alt="create checklist" className="img_sizing item shadow--tl" src={useBaseUrl('img/products/product_setup_survey_pm_03.png')} />
<br/>

<div className="margin-left--lg">

11. Repeat the previous steps to add any other fields that should be on the checklist.
12. Once you've completed setting up the survey form, press **Save**.

</div>

</div>
<br/>

### B. Connect to the Database {#database}
_After creating the survey form, we need to set up the database to collect the information users submit when completing the maintenance checklist._

<div className="alert alert--secondary">

_Open the Checklist collection which contains all company maintenance checklists._

<img alt="create checklist" className="img_sizing item shadow--tl" src={useBaseUrl('img/products/product_setup_survey_pm_04.png')} />
<br/>

<div className="margin-left--lg">

13. Select <span className="badge badge--primary">Administrator</span> on the **Main Menu Bar**.
14. From the **Administrative Panel**, press <span className="badge badge--info">Database</span>.
15. On the **Checklist** collection row, press the _list_ icon to open the collection's element list.

</div>

</div>
<br/>

<div className="alert alert--secondary">

_Add a new maintenance checklist to collection._

<img alt="create checklist" className="img_sizing item shadow--tl" src={useBaseUrl('img/products/product_setup_survey_pm_05.png')} />
<br/>

<div className="margin-left--lg">

16. The **Checklist** collection opens up displaying a list of the maintenance checklists created within the company.
17. Press the <span className="badge badge--secondary">+</span> icon to create a new element that will represent the monthly smoke detector maintenance checklist.

</div>

</div>
<br/>

<div className="alert alert--secondary">

_In the **Create** element window, set up the new checklist._

<img alt="create checklist" className="img_sizing item shadow--tl" src={useBaseUrl('img/products/product_setup_survey_pm_06.png')} />
<br/>

<div className="margin-left--lg">

18. Enter a name for the element that will represent the checklist.
19. A suggestion for the **Code** will be automatically filled in after completing the **Name** field. 
20. Under the **Additional fields** tab, in the **Survey code** field, enter the maintenance checklist survey form's code. 
:::note
The survey form and its **code** were created on _step 5_ of this tutorial.
:::
21. Press **SAVE** when done.  
  _The Checklist collection should look something like shown below:_

<img alt="create checklist" className="img_sizing item shadow--tl" src={useBaseUrl('img/products/product_setup_survey_pm_07.png')} />
<br/>


</div>

</div>
<br/>

<div className="alert alert--secondary">

_Find the collection containing the equipment to be associated with the maintenance checklist._

<img alt="create checklist" className="img_sizing item shadow--tl" src={useBaseUrl('img/products/product_setup_survey_pm_08.png')} />
<br/>

<div className="margin-left--lg">

22. From the **Administrative Panel**, press <span className="badge badge--info">Database</span> to open the **Collections** panel.
23. On the **Equipment** collection row, press the _list_ icon to open a list of all the registered company equipment.

</div>

</div>
<br/>

<div className="alert alert--secondary">

_Find and edit the equipment to associate with the maintenance checklist._

<img alt="create checklist" className="img_sizing item shadow--tl" src={useBaseUrl('img/products/product_setup_survey_pm_09.png')} />
<br/>

<div className="margin-left--lg">

24. The **Equipment** collection opens up displaying a list of all the equipment registered on the company database.
25. On the **Smoke Detector** row, press the _kebab_ icon to edit the element.
- _**a**. In case the item is not found in the collection, it can be created by pressing the <span className="badge badge--secondary">+</span> icon. The settings for the new element are displayed in the example shown in the following step._

</div>

</div>
<br/>

<div className="alert alert--secondary">

_Associate the checklist to the equipment._

<img alt="create checklist" className="img_sizing item shadow--tl" src={useBaseUrl('img/products/product_setup_survey_pm_10.png')} />
<br/>

<div className="margin-left--lg">

26. The **Smoke Detector** element contains the **Workstation** field within the **Additional fields** tab. The **Workstation** field is a required field containing elements that represent user workstations. Only users associated with these same elements can access the checklist.
27. Press the **+ ADD ELEMENTS** button to associate this equipment element with the elements representing the corresponding checklists. The **Child Elements** fields appear after pressing the button.
28. In the **Collection** field, choose the **Checklist** collection, which we configured previously.
29. In the **Elements** field, choose all the elements that represent smoke detector maintenance checks. For this example, we chose the **Smoke Detector Monthly Maintenance** element, which we created earlier, plus the **Smoke Detector Six Months Maintenance** element, which was already found in our collection.
30. Press **SAVE** to finsih.

</div>

</div>
<br/>

### C. Create a Preventive Maintenance Plan {#create-pm}
_Create a new preventive maintenance plan for monthly smoke detector checks._

<div className="alert alert--secondary">

_Open the **Create Preventive Plan** form to set up a new preventive plan._

<img alt="create checklist" className="img_sizing item shadow--tl" src={useBaseUrl('img/products/product_setup_survey_pm_11.png')} />
<br/>

<div className="margin-left--lg">

31. Select <span className="badge badge--primary">Preventive Plans</span> on the **Main Menu Bar**.
32. From the **Preventive Plans** panel, press **Create Preventive Plan** to open the channel workspace.
33. Press the <span className="badge badge--success">Create Preventive Plan</span> button found at the bottom of the channel workspace to open the corresponding form.

</div>

</div>
<br/>

<div className="alert alert--secondary">

_Configure the new preventive maintenance plan by filling out the form: **General Information**._

<img alt="create checklist" className="img_sizing item shadow--tl" src={useBaseUrl('img/products/product_setup_survey_pm_12.png')} />
<br/>

<div className="margin-left--lg">

34. In the **Equipment** field, choose the item on which the maintenance check will be performed. The available options are all the elements found in the _Equipment_ collection. For this example, we chose _Smoke Detector_.
35. The **Assignee** field indicates the user that will fill out the checklist when it is time to perform the maintenance check.
36. **Editors** are users who can follow and edit the preventive maintenance plan and work order details.
37. In the **Checklist** field, a list of available checklists for the chosen _equipment_ is displayed. Here we will see the smoke detector maintenance checklists we associated with the _smoke detector_ element. For this example, we chose _Smoke Detector Monthly Maintenance_.
38. **Priority** can be set to _High_, _Medium_, or _Low_. Priority is used to filter the tasks.

</div>

</div>
<br/>

<div className="alert alert--secondary">

_Configure the new preventive maintenance plan by filling out the form: **Frecuency details**._

<img alt="create checklist" className="img_sizing item shadow--tl" src={useBaseUrl('img/products/product_setup_survey_pm_12a.png')} />
<br/>

<div className="margin-left--lg">

39. Under **Frecuency details**, chose between time or value plans. Time plans are triggered when the programmed time lapse is completed. Value plans are triggered every time a determined equipment metric is met, for example, performing vehicle maintenance every 6,000 miles. For this example, we chose _Time Plan_ to set up a monthly maintenance check.
40. **Frecuency** is measured in hours. To perform a monthly maintenance check, we multiple 24 hours by 30 days, to get a total of 720 hours.
41. **Date of the last maintenance** indicates the starting date of the maintenance plan.
42. Indicate the time the maintenance check was performed.
43. Press **SEND**.

</div>

</div>
<br/>

<div className="alert alert--secondary">

_Verify that the maintenance plan has been activated._

<img alt="create checklist" className="img_sizing item shadow--tl" src={useBaseUrl('img/products/product_setup_survey_pm_13.png')} />
<br/>

<div className="margin-left--lg">

44. After submitting the form, verify that the preventive maintenance plan has been activated by ensuring it is listed in the panel under the **Active plan** list.

</div>

</div>
<br/>

### D. Maintenance Work Order {#work-order}
_Once the preventive maintenance plan has been set, a work order will be automatically created and sent to the corresponding stakeholders when the programmed time or value metrics are met._

<div className="alert alert--secondary">

_Once it is time to perform the maintenance check, the assignee is alerted with a work order._

<img alt="create checklist" className="img_sizing item shadow--tl" src={useBaseUrl('img/products/product_setup_survey_pm_14.png')} />
<br/>

<div className="margin-left--lg">

45. The assigee must select <span className="badge badge--primary">Work orders</span> from the **Main Menu Bar**.
46. In the **Work orders** panel, the assignee must select the corresponding alert under the **Reported** list.
47. Details of the maintenance check to be performed are posted in the alert's channel workspace.
48. The assignee can choose to accept or reject the maintenance request by pressing the <span className="badge badge--success">Accept the work order</span> button. The **Accept Work Order** form will appear as shown in the next step.

</div>

</div>
<br/>

<div className="alert alert--secondary">

_The assignee must either accept or reject the work order._

<img alt="create checklist" className="img_sizing item shadow--tl" src={useBaseUrl('img/products/product_setup_survey_pm_15.png')} />
<br/>

<div className="margin-left--lg">

49. Through this form, the assignee can either accept or reject the work order. If rejected, the work order remains in the **Reported** state. If accepted, the work order passes to the **Pending** state and the assignee will receive the _maintenance checklist_ through the channel workspace.

</div>

</div>
<br/>

<div className="alert alert--secondary">

_Complete the maintenance checklist._

<img alt="create checklist" className="img_sizing item shadow--tl" src={useBaseUrl('img/products/product_setup_survey_pm_16.png')} />
<br/>

<div className="margin-left--lg">

50. The work order is set to the **Pending** state.
51. The [maintenance checklist created at the beginning of this tutorial](#checklist) appears in the channel workspace. The assignee must fill it out when inspecting the equipment.

</div>

</div>
<br/>

<div className="alert alert--secondary">

_Once the maintenance check is complete, the assignee or any other designated stakeholder can request to close the work order._

<img alt="create checklist" className="img_sizing item shadow--tl" src={useBaseUrl('img/products/product_setup_survey_pm_17.png')} />
<br/>

<div className="margin-left--lg">

52. Press the _Actions_ button found at the bottom of the channel workspace.
53. The **Actions** menu opens up and gives the user the _Close work order_ option.

:::note
During the maintenance process, stakeholders can communicate with each through the channel workspace.
:::

</div>

</div>
<br/>

<div className="alert alert--secondary">

_Fill out and submit the **Close work order** form._

<img alt="create checklist" className="img_sizing item shadow--tl" src={useBaseUrl('img/products/product_setup_survey_pm_18.png')} />
<br/>

<div className="margin-left--lg">

54. Fill out the form. Services and materials are connected to the company's master data. Therefore, used materials will be discounted from company stock, while service costs will be summed and informed through the channel.
55. Press **SEND** to submit the report and request the closure of the work order. 

</div>

</div>
<br/>

<div className="alert alert--secondary">

_The work order report and closure request are sent._

<img alt="create checklist" className="img_sizing item shadow--tl" src={useBaseUrl('img/products/product_setup_survey_pm_19.png')} />
<br/>

<div className="margin-left--lg">

56. The work order is set to the **Validation** state. Channel members are notified of the costs of services and materials used to carry out the maintenance procedure.

</div>

</div>
<br/>

<div className="alert alert--secondary">

_After reviewing the information submitted by the assignee, the supervisor can validate the work order closure request._

<img alt="create checklist" className="img_sizing item shadow--tl" src={useBaseUrl('img/products/product_setup_survey_pm_20.png')} />
<br/>

<div className="margin-left--lg">

57. The supervisor is notified that the work order is now in the **Validation** state.
58. Press the <span className="badge badge--success">Work order reception</span> to open the corresponding form.

</div>

</div>
<br/>

<div className="alert alert--secondary">

_The supervisor fills out the **Work order reception** to either approve or reject the performed maintenance check._

<img alt="create checklist" className="img_sizing item shadow--tl" src={useBaseUrl('img/products/product_setup_survey_pm_21.png')} />
<br/>

<div className="margin-left--lg">

59. The supervisor fills out the form to inform approval or rejection of the request to close the work order. If approved, the work order is closed, if not, it goes back to the **Pending** state. On the form, supervisors can inform their reasons for rejecting the work performed. They can also stipulate if the work carried out falls under a guarantee that assumes all costs.
60. Press **SEND** to submit the form and inform stakeholders of the status of the work order.

</div>

</div>
<br/>

<div className="alert alert--secondary">

_Once validated, the work order is closed._

<img alt="create checklist" className="img_sizing item shadow--tl" src={useBaseUrl('img/products/product_setup_survey_pm_22.png')} />
<br/>

<div className="margin-left--lg">

61. After submitting the approval form, the work order passes to the **Closed** state.

:::note
In this preventive maintenance plan, a new work order for a maintenance check on the smoke detector will be created in 30 more days, and the [process](#work-order) will begin again.
:::

</div>

</div>
<br/>