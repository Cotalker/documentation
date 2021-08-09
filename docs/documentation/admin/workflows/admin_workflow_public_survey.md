---
id: admin_workflow_public_survey
title: Public Survey
sidebar_label: Public Survey
---
import useBaseUrl from '@docusaurus/useBaseUrl'; 
import Highlight from '@theme/Highlight';

<img alt="design" className="img_sizing" src={useBaseUrl('img/design/Workflows.svg')} />
<br/>


## Overview {#overview}
Sometimes companies might want to give people outside the Cotalker environment the opportunity to create a task. For example, through a _shared link_, customers who recur for support can fill out a form with their issue and automatically create a Cotalker task that would act as a support ticket. We call this feature a _public survey_.


## Basic Setup {#basic-setup}
<div className="alert alert--secondary">

1. From <span className="badge badge--primary">Administration</span>, go to <span className="badge badge--primary">Workflows</span> section, select a **workflow group**, and finally choose the corresponding **workflow**.

  The [workflow settings panel](/docs/documentation/admin/workflows/admin_workflow_configure#edit-a-single-workflow) will open up.

</div>
<br/>

<div className="alert alert--secondary">

2. In the **Start Form** field, choose the desired survey. Once a _survey_ has been selected, the <span className="badge badge--primary">Share</span> button appears.

<img alt="share survey" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_survey_share_00.png')} />
<br/>

</div>
<br/>

<div className="alert alert--secondary">

3. Press the <span className="badge badge--primary">Share</span> button. A _Share survey_ dialog box will appear. The **Share** field has three options: _Restricted_, _Anybody with the Link_, and _Disabled_.

<img alt="share dialog box" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_survey_share_01.png')} />
<br/>

:::note Sharing Options
  - _Anyone with the Link_: Public link. Accessible to all, except if a user is logged into a Cotalker account from a different company than the one that made the survey. 
  - _Restricted_: Limited to Cotalker users from the same company. Requires users to log in.
  - _Disabled_: Disables the _sharing_ option, even if a link was previously given to a user.
:::

:::tip Adding a Message
Once visitors respond the survey, a screen appears indicating that the survey was sent successfully. You may add a custom message to this screen by simply filling out the _message_ field.
:::

:::caution Take into account:
When the _Anyone with the Link_ option is used, the collections required to answer the survey questions will be publicly accessible.
:::

</div>
<br/>

<div className="alert alert--secondary">

4. After selecting the option, copy the URL. Now you can share the link by email, as webpage link, or even embed it, whatever suits you best to let users –even outside the Cotalker environment– answer your survey.

:::note
- For security reasons, the _usergit_ collections do not function in [survey components](/docs/documentation/admin/survey/survey_overview) for public surveys.
:::

</div>
<br/>

## Public Surveys for Subtasks
Public surveys work ideally with initial workflows, but can be made to work with subtasks (or _child_ workflows). A reference note will appear when trying to share a subtask survey, indicating that a _parameter_ with the parent task ID number has to be added to the link: `?parentTask=[task-id]`.


## Expected Results
_Here is an example of what users might see when they access public surveys:_


<img alt="public survey" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_survey_share_02.png')} />
<br/>


_And this is what users are expected to see when the survey is sent successfully:_


<img alt="send success" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_survey_share_03.png')} />
<br/>

:::note
- Mobile versions might look slightly different.
- When the survey is unavailable –either because it has been disabled, it doesn't exist, or any other error– a splash screen will appear indicating the error.
:::