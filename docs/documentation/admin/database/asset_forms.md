---
title: Task Forms
sidebar_label: Task Forms
---
import useBaseUrl from '@docusaurus/useBaseUrl';
import Highlight from '@theme/Highlight';

<span className="hero__subtitle">Reports & Actions</span>

**Asset Forms** let users view the asset's (element's) raw data as stored in the SQL database. The form can be set to filter data.

## Settings {#settings}
_SQL commands are used to set up the report:_

<img alt="forms" className="img_sizing item shadow--tl" src={useBaseUrl('img/asset_forms_00.png')} />
<br/>
<br/>

- **<span className="badge badge--danger">1.</span> Report Name**: Write a name to identify the report.
- **<span className="badge badge--danger">2.</span> Collection Name**: Choose the collection from where to gather data.

_SQL Commands:_

- **<span className="badge badge--danger">3.</span> Joins**: Combines rows from other collections based on related columns between them.
- **<span className="badge badge--danger">4.</span> Where**: Returns only elements that fulfill the specified values.
- **<span className="badge badge--danger">5.</span> Select**: Selects the table rows to display in the report.

_Settings:_
- **<span className="badge badge--danger">6.</span> Limit**: Sets the limit of elements to display in the report.
- **<span className="badge badge--danger">7.</span> Order By**: Selects a column used to order the results.
- **<span className="badge badge--danger">8.</span> Asc/Desc**: Indicates if the order of results is ascending or descending.
- **<span className="badge badge--danger">9.</span> Offset**: Sets the row from where to start returning data.

_Options:_
- **<span className="badge badge--primary">A.</span>** Closes the settings panel. Clicking outside the panel returns you to the previous window.
- **<span className="badge badge--primary">B.</span>** Displays a preview of the report with the current settings.
- **<span className="badge badge--primary">C.</span>** Saves the report, making it accessible through the _asset viewer_.


## Example {#example}
This is a simple report that returns all the assets found within a specific collection.

The columns to be displayed are _selected_.

<img alt="forms" className="img_sizing item shadow--tl" src={useBaseUrl('img/asset_forms_01.png')} />
<br/>

_The report returns the results as shown below:_

<img alt="forms" className="img_sizing item shadow--tl" src={useBaseUrl('img/asset_forms_02.png')} />
<br/>