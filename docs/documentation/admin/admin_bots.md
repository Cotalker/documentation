---
id: admin_bots
title: Bot Section
sidebar_label: Bots
---
import useBaseUrl from '@docusaurus/useBaseUrl';
import Highlight from '@theme/Highlight';

<img alt="design" class="img_sizing" src={useBaseUrl('img/design/Bots.svg')} />

## Overview {#bot-overview}
<br />
<img alt="" src={useBaseUrl('img/admin_bot.png')} width= "20%" height= "20%" align="left"/>

_Bots_ are used to configure a _routine_ in a company. For example, a _bot_ could initialize a _state machine_ because it would handle the lifting of requests from an administrative request process. A _bot_ could also be used to make a global routine. For example, every time a user sends  "/giphy some word" to a _channel_, the system will respond with the first _gif image_ found with the written word.

<br/>

In this section of the _administration panel_ you can create and edit the company's _bots_.

<br clear="left" />


## All Bots {#all-bots}
In this section you can find the entire list of _bots_ that have been created.
<img alt="" src={useBaseUrl('img/admin_bot_list.png')} />
<br/><br/>

The description of the icons are in the [Overview section](/docs/documentation/admin/admin_overview).

The information shown in the list is as follows:
- **Bot Name**: Element visual name.
- **Description**: Bot description
- **Commands**: The command to initialize the bot. The options are survey, channel (slash), global, or none.
- **Active**: If the bot is active, it is set to _true_. Otherwise, it is _false_.
- **Created at**: Bot creation date


## Edit / Create Single Group {#edit--create-single-group}
In this section, you can edit or create a single group.
<br />
<img alt="" src={useBaseUrl('img/admin_bot_create_1.png')} />
<img alt="" src={useBaseUrl('img/admin_bot_create_2.png')} />
<br/><br/>
The description of the general information fields is as follows:
<br/><br/>

| Field | Description | Notes |
| ---- | ----------- | ----- |
| Name | The visual name of the bot | It doesn't have to be unique. |
| User bot name | Represents the bot. It will automatically create a user with that name and an invented email. | All API requests will be made under the user's bot name, so the user bot will be assigned the bot's access roles. |
| Description | Description of what the bot does. |
| Access Role | The access roles define what the user can do in the routine. | Warning: A bot can run a routine without proper access roles, but it will not be able to render the desired results.  |
| Global | A _global bot_ works across all groups and channels in the company. |
| It's a survey command | The bot uses a survey to initialize. | For example, a request survey to lift a administrative request. |
| It's a slash command | The bot uses a slash command to initialize. | For example, "/giphy" to search for a gif. |

The Routine builder is explained in the [Routine Section](/docs/documentation/automation/admin_routine).
