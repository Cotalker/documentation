---
title: Surveys
---
import useBaseUrl from '@docusaurus/useBaseUrl'; 
import Mermaid from '@theme/Mermaid';


<img alt="design" className="img_title" src={useBaseUrl('img/design/Videocall.svg')} />

<br/>

## Overview {#overview}

_Surveys_ are a significant feature inside the Cotalker environment that help gather data from _users_. Usually created by _admins_, _surveys_ have a form-like aspect that makes it easier for _users_ to fill them out.

<div className="alert alert--secondary">

_Example of a survey used for creating a corrective maintenance task:_

<img alt="accessing a survey" className="img_sizing item shadow--tl" src={useBaseUrl('img/client_survey_00.png')} />
<br/>

</div>
<br/>

Diverse data can be entered through _surveys_, such as written text, multiple-choice questions, date and time, ratings, location, images, and even QR Code and NFC input on mobile apps.

A _survey_ can even require you to sign your name using a pointing device, such as a mouse or your finger if you're using a mobile device.

Answered surveys appear within the corresponding _channel workspace_, they can also be retrieved in the [Reports](/docs/documentation/client/reports) section.

Surveys can also be made public, allowing them to be answered and submitted outside the Cotalker environment by any user.

<div className="alert alert--secondary">

_Below is an example of a submitted survey displayed in the task's channel. The task and its channel were automatically created with the submission of the survey:_

<img alt="survey in channel" className="img_sizing_small item shadow--tl" src={useBaseUrl('img/client_survey_01.png')} />
<br/>

In the channel, all _users_ associated with the task can reference the data submitted through the survey. _Users_ can continue to communicate with each other through the channel to ask for specifications, add more context, share updates, or anything else relevant to the task.

</div>
<br/>

## How to access a survey {#access-survey}
Available surveys can be found through [_group panel_](/docs/documentation/client/actions_button) and [_channel workspace_](/docs/documentation/client/channels#task-menus-within-channel) action buttons.

_Opening a survey from the group panel usually means a task will be created once it is submitted:_
<img alt="group panel survey" className="img_sizing item shadow--tl" src={useBaseUrl('img/client_survey_04.png')} />
<br/>

_Opening a survey from a task's channel workspace can be used to change the state of the task._
<img alt="group panel survey" className="img_sizing item shadow--tl" src={useBaseUrl('img/client_survey_05.png')} />
<br/>


## Dynamic Surveys {#dynamic-surveys}
_Surveys_ can also be dynamic. Depending on the answer given to a question, new questions can appear on the survey.

<div className="alert alert--secondary">

_In the example below, anserwing "yes" to a question displays new questions to gather further data to initiate a work order._
<img alt="dynamic survey" className="img_sizing item shadow--tl" src={useBaseUrl('img/client_survey_02.png')} />
<br/>

</div>
<br/>

## Surveys with Automations {#automations-surveys}

Automations can also be built into the survey, allowing automatic actions or data gathering to take place either when the survey is being filled out or when it has been finally submitted. For example, notifications can be sent to interested parties, data can be used to calculate costs, and much more.

<div className="alert alert--secondary">

_Below is a simple example of a bot that sends to the channel an automatic message and a GIF image from an external website after a new employee submits a personal information survey._

<img alt="surveys with bots" className="img_sizing item shadow--tl" src={useBaseUrl('img/client_survey_03.png')} />
<br/>

_Notice how, in the example above, the bot takes data from the survey answers to carry out its routine._

</div>
<br/>









