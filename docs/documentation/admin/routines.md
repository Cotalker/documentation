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

Routines are the automations that you can create and save for later use. They're perhaps one of our most valuable tools because they make automations easier to replicate throughout your processes. They can be recycled or modified by other users and applied to any operation, bringing a lot of scalability to all your processes.

For example, let's say that in many of your workflows you need to send a system message and an email in each state change. You can create a _routine_ with that specific automation sequence and add it as a stage through any [routine builder](/docs/documentation/automation/admin_routine). You can reuse the routine in any and as many processes as you need. If you need a similar routine but with some slight differences, open the existing routine, make the chagnes, and save it with another name, conserving both routines for later use.

## Accessing Routines {#accessing}

To access the <span className="badge badge--primary">Routines</span> section:

<img alt="access" class="img_sizing" src={useBaseUrl('img/admin_routines_00.png')} />
<br/>

1. Press <span className="badge badge--primary">Administrator</span> in the **Main Menu Bar**.
2. Select <span className="badge badge--primary">Routines</span> from the **Administrative Panel**.
3. The **Routines** settings panel will open up.

<div className="alert alert--secondary">

## Create Routine Settings Panel Layout {#layout}

Create or edit a routine from the **Routines** settings panel:

<img alt="access" class="img_sizing" src={useBaseUrl('img/admin_routines_00a.png')} />
<br/>

_Press:_
1. Create a new routine
2. Edit an existing routine

After choosing an option, the following settings panel opens up:

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

- [Routine Builder](/docs/documentation/automation/admin_routine): Read how routines are added to processes.
- [Routine Stage Types](/docs/documentation/automation/existing_routines): Learn more about the Routine Stage Types that can be used to make your routines.
