---
id: admin_workflow_public_survey
title: IV. Public Survey
sidebar_label: IV. Public Survey
---
import useBaseUrl from '@docusaurus/useBaseUrl'; 
import Highlight from '@theme/Highlight';

<img alt="design" className="img_sizing" src={useBaseUrl('img/design/Workflows.svg')} />
<br/>

<div className="alert alert--secondary">

## Summary {#summary}
Sometimes companies might want to give people outside the Cotalker environment the opportunity to create a task. For example, by sharing a link, customers who recur for support can fill out a form with their issue and automatically create a Cotalker task that would act as a support ticket. We call this feature a _public survey_.

</div>
<br/>


:::important
Public Surveys only work with _initial workflow start surveys_. Nonetheless, we offer a [workaround](#public-survey-subtask) for associating public surveys with _subtask start forms_. Some manual tweaking is required. We wish to have this integrated into our GUI sometime soon.
:::

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

3. Press the <span className="badge badge--primary">Share</span> button. A _Share survey_ dialog box will appear. The **Share** field has two options: _Restricted_ and _Any People with the Link_.

<img alt="share dialog box" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_survey_share_01.png')} />
<br/>

:::note
  - The public access link, _Anybody with the Link_ option, only works if there is no open Cotalker session in the browser. 
  - The _Restricted_ access option is not fully operational. For now, users can open the link, but cannot send the survey.
:::

:::caution Take into account:
When the _Anybody with the Link_ option is used, the collections required to answer the survey questions will be publicly accessible.
:::

</div>
<br/>

<div className="alert alert--secondary">

4. After selecting the option, copy the URL. Now you can share the link, add it to an email, or copy it into a webpage, or whatever suits you best to let people outside the Cotalker environment answer your survey.

:::note
- For security reasons, the following [survey components](/docs/documentation/admin/admin_survey) do not function in the public survey: _properties_, _user_, and _files_.
- Survey embedding has not yet been developed, but is in our backlog for future updates.
:::

</div>
<br/>

#### Expected Results
_Here is an example of what users might see when they access public surveys:_


<img alt="public survey" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_survey_share_02.png')} />
<br/>


_And this is what users are expected to see when the survey is sent successfully:_


<img alt="send success" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_survey_share_03.png')} />
<br/>

## Public Survey for Subtasks {#public-survey-subtask}

Public surveys work ideally with initial workflows, but we offer here a workaround to associate a public survey with a subtask.

<div className="alert alert--secondary">

1. Encode the following body, with the corresponding task ID, at https://www.base64encode.org/:
```json
  {
      "parentTask": "abcdefgh1234567890"
  }
```

</div>
<br/>

<div className="alert alert--secondary">

2. Copy the generated code.

</div>
<br/>

<div className="alert alert--secondary">

3. Get the public link.

</div>
<br/>

<div className="alert alert--secondary">

4. Add the following parameter to the public link: `?data=[base64token]`, where _base64token_ is the generated code obtained through https://www.base64encode.org/.

</div>
<br/>

<div className="alert alert--secondary">

5. You can now share the modified URL to allow visitors complete the subtask's public survey.

</div>
<br/>

## Adding a Message {#adding-message}

Once visitors respond the survey, a screen appears indicating that the survey was sent successfully. You may add a message to this screen by following the indicated steps:

<div className="alert alert--secondary">

1. Encode the following body, with the corresponding ID, at https://www.base64encode.org/:
```json
  {
      "parentTask": "abcdefgh1234567890"
      "sentMessage": "We have received your message."
  }
```

</div>
<br/>

<div className="alert alert--secondary">

2. Copy the generated code.

</div>
<br/>

<div className="alert alert--secondary">

3. Get the public link.

</div>
<br/>

<div className="alert alert--secondary">

4. Add the following parameter to the public link: `?data=[base64token]`, where _base64token_ is the generated code obtained through https://www.base64encode.org/.

</div>
<br/>

<div className="alert alert--secondary">

5. Visitors will see your message once they send the form.

</div>
<br/>
