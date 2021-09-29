---
id: routines
title: Routines Section
sidebar_label: Routines
---
import useBaseUrl from '@docusaurus/useBaseUrl'; 
import Highlight from '@theme/Highlight';


<img alt="design" class="img_title" src={useBaseUrl('img/design/routines.svg')} />
<br/>

## Overview {#overview}

Routines are the automations that you create and perhaps one of the most valuable tools. They can be recycled by other users or other processes. Everything you create –such as an integration with another system or some other automation– can be recycled, bringing a lot of scalability to all your processes.

## Accessing Routines {#accessing}

To access the <span className="badge badge--primary">Routines</span> section:

<img alt="access" class="img_sizing" src={useBaseUrl('img/admin_routines_00.png')} />
<br/>

1. Press <span className="badge badge--primary">Administrator</span> in the **Main Menu Bar**.
2. Select <span className="badge badge--primary">Routines</span> from the **Administrative Panel**.
3. The [Routines settings panel](#layout) will open up.

<div className="alert alert--secondary">

## Routines Settings Panel Layout {#layout}

After selecting <span className="badge badge--primary">Routines</span> from the **Administrative Panel**, the following settings panel opens up:

<img alt="access" class="img_sizing" src={useBaseUrl('img/admin_routines_01.png')} />
<br/>

1. **Save**: Saves the current configuration
- [**A. General information**](#general): basic identification settings
- [**B. Input**](#input): Indicates the different input types that will be requested
- [**C. Routine Builder**](#routine-builder): Creates an automation with the gathered data

</div>
<br/>

<div className="alert alert--secondary">

### A. General {#general}

<img alt="access" class="img_sizing" src={useBaseUrl('img/admin_routines_02.png')} />
<br/>

<div className="container box">

<div className="row table-row-1">
<div className="col col--3"><b>Name:</b></div>
<div className="col col--5">The routine's display name</div>
<div className="col col--4"><em>It doesn't have to be unique.</em></div>
</div>
<div className="row table-row-2">
<div className="col col--3"><b>Code:</b></div>
<div className="col col--5">The routine's unique identification code</div>
<div className="col col--4"><em>Only lowercase letters, numbers, and underscore accepted.</em></div>
</div>
<div className="row table-row-1">
<div className="col col--3"><b>Category:</b></div>
<div className="col col--5">Indicates the routine's category</div>
<div className="col col--4"><em>

Options are: `Flowcontrol`, `Network`, or `Normal`

</em></div>
</div>
<div className="row table-row-2">
<div className="col col--3"><b>Description:</b></div>
<div className="col col--5">Brief description of the routine</div>
<div className="col col--4"><em></em></div>
</div>

</div>

</div>
<br/>

<div className="alert alert--secondary">

### B. Inputs {#inputs}

<img alt="access" class="img_sizing" src={useBaseUrl('img/admin_routines_03.png')} />
<br/>

<div className="container box">
<div className="row table-row-1">
<div className="col col--3"><b>+ Add inputs:</b></div>
<div className="col col--5">Adds new input fields into the routine.</div>
<div className="col col--4"><em>When pressed, the input options will be displayed.</em></div>
</div>
<div className="row table-row-2">
<div className="col col--3"><b>Display:</b></div>
<div className="col col--5">The input field's display name</div>
<div className="col col--4"><em>It doesn't have to be unique.</em></div>
</div>
<div className="row table-row-1">
<div className="col col--3"><b>Code:</b></div>
<div className="col col--5">The input's identification code</div>
<div className="col col--4"><em>Only lowercase letters, numbers, and underscores are accepted.</em></div>
</div>
<div className="row table-row-2">
<div className="col col--3"><b>Input Type:</b></div>
<div className="col col--6">

Indicates the input's data type. Options include: `String`, `Number`, `Boolean`, `Date`, `Object`, `Any`, `Array`, `Dictionary`, `CotTaskId`, `CotUserId`, `CotChannelId`, `CotGroupId`, `CotAnswerId`, `CotGroupId`, `CotAccessRoleId`, `CotPropertyTypeId`, `CotPropertyId`, `CotStateMachineStateId`, `CotSurveyId`.

</div>
<div className="col col--3"><em>

Go to the [Data Models](/docs/documentation/models/overview_model) section for more information about the COT* data types.

</em></div>
</div>
<div className="row table-row-1">
<div className="col col--3"><b>Required:</b></div>
<div className="col col--5">The toogle switch indicates whether it is a required field or not.</div>
<div className="col col--4"><em>Required fields must be filled out.</em></div>
</div>
<div className="row table-row-2">
<div className="col col--3"><b>Description:</b></div>
<div className="col col--5">Brief description or important information relavant to the input field.</div>
<div className="col col--4"><em>This discription will be displayed below the input field.</em></div>
</div>

</div>

</div>
<br/>

<div className="alert alert--secondary">

### C. Routine Builder {#routine-builder}

For setup information, go to the [Routine Builder](/docs/documentation/automation/admin_routine) section.

</div>
<br/>

## Related Topics {#related}

[Routine Stage Types](/docs/documentation/automation/existing_routines): Learn more about the Routine Stage Types that appear in the list of routines. 
