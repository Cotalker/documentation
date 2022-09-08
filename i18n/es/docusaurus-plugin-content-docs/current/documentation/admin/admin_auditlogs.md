---
title: Audit Logs
---

:::caution Advertencia
Esta página aún no se encuentra traducida al español.
:::

import useBaseUrl from '@docusaurus/useBaseUrl'; 

## Description: {#description}

With **audit logs**, admins can monitor the _creation_, _modification_, _activation_, and _deactivation_ of: 
- **users**
- **access roles**

-----

## Accessing Audit Logs {#accessing}

1. Go to **Audit Logs** from the administrative panel:

<img alt="go to audit logs" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_auditlogs_00.png')} />
<br/>

2. From the logs table, click on the _view icon_ of the specific log for more detailed information:

<img alt="go to specific audit log" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_auditlogs_02.png')} />
<br/>


3. Once selected, you will be taken to the chosen audit log, displaying the following information:



<div className="container box">
<div className="row table-row-2">
<div className="col col--12">
<br/>
<img alt="audit log" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_auditlogs_01.png')} />
<br/>
</div>
</div>
<div className="row table-row-1">
<div className="col col--3">1. <b>Event</b>:</div>
<div className="col col--5">

Indicates the event action: 

</div>
<div className="col col--4"><em>create, modify, disable, enable</em></div>
</div>
<div className="row table-row-2">
<div className="col col--3">2. <b>User</b>:</div>
<div className="col col--5">

Indicates the _user_ that performed the action. 

</div>
<div className="col col--4"><em>The user is identified by their email.</em></div>
</div>
<div className="row table-row-1">
<div className="col col--3">3. <b>IP Address</b>:</div>
<div className="col col--5">

Indicates the user's IP address.

</div>
<div className="col col--4"><em></em></div>
</div>
<div className="row table-row-2">
<div className="col col--3">4. <b>Model</b>:</div>
<div className="col col--5">

Indicates the data model created or modified: 

</div>
<div className="col col--4"><em>user, access role</em></div>
</div>
<div className="row table-row-1">
<div className="col col--3">5. <b>Created at</b>:</div>
<div className="col col--5">

Indicates the date and time of the event, whether it was created, modified, disabled or enabled.

</div>
<div className="col col--4"><em></em></div>
</div>
<div className="row table-row-1">
<div className="col col--3">6. <b>Created/Modified Item</b>:</div>
<div className="col col--5">

Indicates the name of the user or access role created or modified. 

</div>
<div className="col col--4"><em>Press the name of the item to view its configuration panel.</em></div>
</div>
<div className="row table-row-1">
<div className="col col--3">7. <b>Result</b>:</div>
<div className="col col--5">

Displays the created or modified items data.

</div>
<div className="col col--4"><em></em></div>
</div>

</div>
<br/>

------


## Filtering 
_To filter the list of logs displayed:_

1. Press the _filter icon_.

<img alt="filtering" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_auditlogs_03.png')} />
<br/>

2. Select filter options.

<img alt="filtering" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_auditlogs_04.png')} />
<br/>

3. Press <span className="badge badge--secondary">Filter</span> to apply selected filters.

