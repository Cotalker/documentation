---
title: Product-Related Tools
sidebar_label: Customizations
---


import useBaseUrl from '@docusaurus/useBaseUrl'; 

<span className="hero__title">Notifications: Customization</span>

**Available on:** <span className="badge badge--danger">Professional Plans</span> <span className="badge badge--info">Enterprise Plans</span> <span className="badge badge--warning">Unlimited Plans</span>
<br/>


<img alt="customization" className="img_sizing item shadow--tl" src={useBaseUrl('img/products/products_notifications_customization.png')} />
<br/>

You can easily re-configure the **Notification workflow** to adapt it to your company's needs. Below you will see how to access the _administrative panel_ and edit the workflow's settings.

:::note
_Workflow groups_ contain one or more _workflow_ within them. **Notifications** is a _workflow group_ that has one _workflow_ called **Notification**.
:::

## Accessing the Settings Panel {#admin-panel}

_To access the workflow's settings panel:_

<img alt="notifications" className="img_sizing item shadow--tl" src={useBaseUrl('img/products/products_notifications_configuration_00.png')} />
<br/>

1. In the **Main Menu**, press <span className="badge badge--primary">Administrator</span> to open the **Administrative Panel**.
2. From the **Administrative Panel**, select <span className="badge badge--primary">Workflow</span>. The **Workflows groups** panel opens up.
3. In the **Workflow groups** panel, on the **Notifications** row, select the indicated icon to open up the _workflows settings panel_.

<img alt="notifications" className="img_sizing item shadow--tl" src={useBaseUrl('img/products/products_notifications_configuration_01.png')} />
<br/>

4. From the _Notifications_ **Workflows**, select the row displaying the **Notification** workflow. The _workflow settings panel_ opens up, as shown below.

## Workflow Settings Panel {#settings-panel}

_On the settings panel, you can modify the process following each state, add routines, configure SLA routines, and other automations._

<div className="container">
<div className="row">
<div className="col col--6">


<img alt="notifications" className="img_sizing item shadow--tl" src={useBaseUrl('img/products/products_notifications_configuration_02.png')} />
<br/>

</div>
<div className="col col--6">

1. **Name**: The workflow's name.
2. **Initial state**: Indicates the state the workflow starts in.
3. **Start form**: Indicates the survey form used to create a notification.
4. **Start form permissions**: Only users with this permission can use the survey form to create a new notification.
5. **Workflow states** table: The states or steps of the process. Clicking on them permits editing their configuration.
6. **Workflow SLAs**: Displays SLA routines that are triggered to help complete deadlines. SLAs can be created or edited from this table.

</div>
</div>
</div>

---
## Related Topics {#related-topics}
- **[Create/Edit Workflow](/docs/documentation/admin/workflows/settings_panels/workflow_create_edit)**: Administrative Panel Documentation
- **[Create a Workflow Tutorial](/docs/tutorials/basic/create_state_machines)**: Tutorial on how to create a workflow that can process tasks through five different states.