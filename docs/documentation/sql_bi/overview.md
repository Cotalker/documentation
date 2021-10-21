---
id: overview
title: Business Intelligence & SQL
sidebar_label: Overview
---
import useBaseUrl from '@docusaurus/useBaseUrl'; 
import Highlight from '@theme/Highlight';

<img alt="design" className="img_title" src={useBaseUrl('img/design/Dashboards.svg')} />
<br/>
<br/>

Cotalker integrates SQL and Business Intelligence (BI) tools to transform raw data into information businesses and organizations can visualize to monitor processes and make informed decisions.


<img alt="metabase" className="img_sizing_small item shadow--tl" src={useBaseUrl('img/admin_bi.png')} />
<div className="text-center"><em>Using Metabase, we help you search and visualize your data.</em></div>
<br/>

Our software generates a **read-only SQL database** from the data stored in our servers and visualized using [Metabase](https://www.metabase.com/), a third-party BI platform. With Metabase, you can create customized searches and displays that will truly enhance what you can do with your data.



:::info Additional information
- The exact [**data model**](model) varies from company to company but is basically based on _users_, _surveys_, _channels_,  _collections_ (databases), _tasks_, and _sessions_.
- For **enterprise plans**, it is possible to have direct access to the SQL Database from a third-party BI platform. _Contact your Cotalker sales representative for more information._
:::

:::warning
Do not write directly to the database because **changes are not saved**. The data you see in the database is routinely refreshed and imported from our servers, where your data is kept safe. If you need to modify your database directly, consult your admin or sales representative.
:::