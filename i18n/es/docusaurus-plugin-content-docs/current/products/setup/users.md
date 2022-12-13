---
title: Setup
sidebar_label: Users and Access Roles
---

:::caution Advertencia
Esta página aún no se encuentra traducida al español.
:::

import useBaseUrl from '@docusaurus/useBaseUrl'; 

<span className="hero__title">Users and Access Roles</span>

<img alt="user example" className="img_sizing item shadow--tl" src={useBaseUrl('img/products/product_user_00a.png')} />
<br/>

## Overview {#overview}
Create _user accounts_ for all those involved in your operational processes. Depending on their _access roles_, _users_ can login into the Cotalker platform to interact with other _users_, read notifications, submit forms, share information, manage workflows, and edit configurations.

_Access roles_ are sets of _permissions_ put together to grant _users_ specific authorizations to view and edit content, channels, workflows, configurations, and much more. _Users_ can have more than one _access role_, allowing complex access customizations that fulfil company needs.

_Users_ are also given _job titles_, which help group users and can grant them special attributes that associate extra data.

Create and edit _users_, _access roles_, and _job titles_ either through the _Administrative Panel_ or by using our [API tools](/docs/documentation/api/overview_api).

:::tip
The [_Create New User API request_](/docs/documentation/api/users/#post-user) can be used with [_Postman_](https://www.postman.com) to create _users_ using spreadsheet data. This permits creating large amounts of _users_ from your database records. Ask your Cotalker representative for more information.
:::

## Examples {#examples}

<div className="container">
<div className="row">
<div className="col col--6">

Ahmed is a field service manager. He manages a group of employees while they work on a site. His Cotalker _user account_ has been configured with: 
- _access roles_ that allow him to start workflows by creating new tasks, standard access, and can view reports of gathered survey information;
- _job title_ that indicates his position in the company and allows extra data to be associated with this account;
- _elements_ are also associated with his account, in this case, with the department he belongs to, i.e., Field Service 1;
- _related users_ indicates the users that are in his team and under his command.

His user profile doesn't only store his personal data, but it can be used within automated workflows [routines](/docs/documentation/automation/admin_routine) and for gathering information used in [survey forms](/docs/documentation/client/surveys/overview).

</div>
<div className="col col--6">

<img alt="user example" className="img_sizing item shadow--tl" src={useBaseUrl('img/products/product_user_00.png')} />

</div>
</div>
</div>


---- 

## Related Topics {#related-topics}
- [**Users Panel**](/docs/documentation/admin/users): _Administrative Panel_ documentation.
- [**Create User Tutorial**](/docs/tutorials/basic/create_user): Tutorial on how to create and configure user accounts.
- [**Access Roles**](/docs/documentation/admin/admin_accessrole): _Administrative Panel_ documentation.
- [**Job Titles**](/docs/documentation/admin/admin_jobtitles): _Administrative Panel_ documentation.
