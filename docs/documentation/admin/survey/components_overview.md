---
title: Components
---
import useBaseUrl from '@docusaurus/useBaseUrl';
import Components, {toc as Title1TOC} from '/docs/documentation/admin/survey/components/_component_list.mdx'; 

## Introduction {#intro}
Create form templates with the use of **Components**. Components are the building blocks of your customizable survey forms. They can be easily added or configured either from the _Form_ settings panel or through the _Edit_ button found on the header of the survey.

<div className="img_sizing">

![components](/img/admin_surveys_overview_08.gif)

</div>

Below is a list of available survey components.

<Components/>

## Configuring Form Components {#configuring-components}
General component configuration is discussed here.

_Icons and each configuration tab are explained below._

### Icon Descriptions: {#icon-descriptions}
The following icons are used in most of the form components for setup and configuration options.

| Action Name | Image | Description |
| ---- | ----- | ----------- |
| Drag | <img alt="" src={useBaseUrl('img/icon_drag.png')} /> | Hold click to drag component |
| Required | <img alt="" src={useBaseUrl('img/icon_required.png')} /> | Click to make the component a required field that the user must fill out. |
| Writing not permitted | <img alt="" src={useBaseUrl('img/icon_idw.png')} /> | Users cannot answer the question but will still be visible in the survey. |
| Duplicate | <img alt="" src={useBaseUrl('img/icon_duplicate.png')} /> | Duplicate the component. It will not duplicate the identifier. |
| Delete | <img alt="" src={useBaseUrl('img/icon_delete.png')} /> | Delete the component |

You can **edit** a <span className="badge badge--warning">component</span> by clicking on it once it is on the template.

Each component has three sections (tabs) that can be configured: _General_, _Conditional display_, and _Automation_.

<div className="img_sizing">

![tab](/img/admin_survey_03.png)

</div>


### General Tab {#general-tab}

From the **General** tab, configure basic _component_ settings. Each component will display in this tab its specific basic configuration. Some _components_ might also require creating _collections_ and _elements_. Go to a [component's page](#form-components-list) for specific field descriptions, configuration, and requirements.

<div className="img_sizing">

![general tab](/img/admin_survey_04.png)

</div>

_General Field Descriptions:_

<div className="container box">
<div className="row table-row-1">
<div className="col col--3"><b>Field label:</b></div>
<div className="col col--5">The visual name of the component</div>
<div className="col col--4"><em></em></div>
</div>
<div className="row table-row-2">
<div className="col col--3"><b>Identifier:</b></div>
<div className="col col--5">The unique id of the component.</div>
<div className="col col--4"><em>

It will be needed if working with APIs, dashboards, routines, [conditional display](#conditional-display), or [automations](#automation).

</em></div>
</div>
<div className="row table-row-1">
<div className="col col--3"><b>Minimum:</b></div>
<div className="col col--5">Indicates a minimum of responses that the component requires.</div>
<div className="col col--4"><em>In the case of a written response, each character will be taken into account.</em></div>
</div>
<div className="row table-row-2">
<div className="col col--3"><b>Maximum:</b></div>
<div className="col col--5">Indicates the maximum number of responses the component can accept.</div>
<div className="col col--4"><em>In the case of a written response, each character will be taken into account.</em></div>
</div>
</div>

### Conditional Display Tab {#conditional-display}

Each _component_ has the **conditional display** tab, which allows you to make a _dynamic survey_, i.e., depending on the answers given to a certain question, new questions relative to the answer will appear. For example, if the response of component *X* is *A*, component *Y* will be displayed; otherwise, it will remain hidden.

_The conditional display settings panel:_

<div className="img_sizing">

![conditional display](/img/admin_survey_05.png)

</div>

The descriptions of the fields are found below:

<div className="container box">
<div className="row table-row-1">
<div className="col col--3"><b>Commander:</b></div>
<div className="col col--5">

Select the _commander identifier_, i.e., the [_identifier_](#field-descriptions) of the **component** that will determine if the _conditionally displayed component_ opens up.

</div>
<div className="col col--4"><em>

All existing component _identifiers_ of the present survey are displayed.

</em></div>
</div>
<div className="row table-row-2">
<div className="col col--3"><b>Criteria:</b></div>
<div className="col col--5">Select the comparison criteria, i.e., the operator of the conditional.</div>
<div className="col col--4"><em>

Options are: *Is equal to*, *Greater than or equal*, *Less than or equal* or *Regular expression*.

</em></div>
</div>
<div className="row table-row-1">
<div className="col col--3"><b>Value:</b></div>
<div className="col col--5">

Write the `identifier` related to the commanding answer.

</div>
<div className="col col--4"><em>

For multiple answers, use the following syntax: `(example1)|(example2)`

</em></div>
</div>

</div>


### Automation Tab {#automation}

From the **automation** tab, you can add Javascript code to customize your surveys even more. For complete information and examples, go to the [QuestionExec](/docs/documentation/automation/surveys/question_exec) section.

<div className="img_sizing">

![automation tab](/img/admin_survey_06.png)

</div>

