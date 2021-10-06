---
id: admin_bots
title: Bots Section
sidebar_label: Bots
---
import useBaseUrl from '@docusaurus/useBaseUrl';
import Highlight from '@theme/Highlight';

<img alt="design" class="img_sizing" src={useBaseUrl('img/design/Bots.svg')} />
<br/>

:::tip
Cotalker has two different types of **bots**: _predefined_ and _customized_. In this section, we deal with _customized bots_. For information on all the _predefined bots_ available for use in routines, please consult the [Routine Stage Types](/docs/documentation/automation/existing_routines#stage-list) section.
:::

## Overview {#bot-overview}

Customized _bots_ initialize _routines_ through _surveys_ or _slash commands_. For example, a _bot_ could initialize a _workflow_ through an administrative request process sent in by a _survey_. A _bot_ could also be used to make a global routine. For example, every time a user sends `/giphy keyword` to a _channel_, the system responds with the first _gif image_ found with the written `keyword`.


## Settings Panel {#settings-panel}

_Access the **bots** section through the Administrative Panel:_

<img alt="bot section" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_bots_00.png')} />
<br/>

In this section, you can find the entire list of _bots_ that have been created.

Icon descriptions are availible in the [Overview section](/docs/documentation/admin/admin_overview).

The information shown in the table is as follows:
- **Bot Name**: Element visual name.
- **Description**: Bot description
- **Commands**: How the bot is initialized: _survey_, _channel_ (slash command), _global_, or none.
- **Active**: If the bot is active, it is set to _true_. Otherwise, it is _false_.
- **Created at**: Bot creation date
- **Edit**: Opens the bot's settings for editing.


## Create/Edit a Bot {#edit-create-bot}
In this settings panel, you can edit or create a single group.

<img alt="edit bot" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_bots_01.png')} />
<br/>

The description of the general information fields is as follows:

<div className="container box">

<div className="row table-row-title"><b>General Information</b></div>

<div className="row table-row-1">
<div className="col col--3"><b>Name:</b></div>
<div className="col col--5">The bot's display name</div>
<div className="col col--4"><em>It doesn't have to be unique.</em></div>
</div>

<div className="row table-row-2">
<div className="col col--3"><b>User bot name:</b></div>
<div className="col col--5">

The _user bot name_ is the name of the _user_ and email address that is automatically created to represent and relate the bot within the Cotalker environment.

</div>
<div className="col col--4"><em>API requests for the bot must use this name. The bot's access roles are assigned to the bot's created 'user'.</em></div>
</div>

<div className="row table-row-1">
<div className="col col--3"><b>Description:</b></div>
<div className="col col--5">Description of what the bot does.</div>
<div className="col col--4"><em>Displayed on the 'bots settings panel'.</em></div>
</div>

<div className="row table-row-title">
<div className="col col--12"><b>Access</b></div>
</div>

<div className="row table-row-2">
<div className="col col--3"><b>Access Roles:</b></div>
<div className="col col--5">

The access roles define what the bot's _user_ can do in the routine.

</div>
<div className="col col--4"><em>Attention: A 'bot' can run a routine without proper access roles but will not render the desired results.</em></div>
</div>

<div className="row table-row-title">
<div className="col col--12"><b>Functions</b></div>
</div>

<div className="row table-row-1">
<div className="col col--3"><b>Global:</b></div>
<div className="col col--5">

Allows a _bot_ to work across all groups and channels in the company.

</div>
<div className="col col--4"><em></em></div>
</div>

<div className="row table-row-2">
<div className="col col--3"><b>It's a survey command:</b></div>
<div className="col col--5">

This switch indicates that a _survey_ initializes the _bot_.

</div>
<div className="col col--4"><em></em></div>
</div>

<div className="row table-row-1">
<div className="col col--3"><b>Form:</b></div>
<div className="col col--5">

Indicates the _survey_ that initializes the _bot_. Any _survey_ can be selected.

</div>
<div className="col col--4"><em>This field only appears when the 'It's a survey command' option is activated.</em></div>
</div>

<div className="row table-row-2">
<div className="col col--3"><b>Save form response:</b></div>
<div className="col col--5">

If set, then information sent through the _survey_ is added to the [context](/docs/documentation/automation/triggers_and_contexts#channel-survey-trigger) response as _messages_ ([COTMessage](/docs/documentation/models/communication/model_messages) Array) and can be read with COTLang using `$VALUE#messages`.

**NOTE:** This feature is deprecated, now messages retrieved by [_messages.form.id_](/docs/documentation/models/communication/model_messages) can be obtained through [_answers.formId_](/docs/documentation/models/surveys/model_answers).

</div>
<div className="col col--4"><em>This slide button only appears when the 'It's a survey command' option is activated.</em></div>
</div>

<div className="row table-row-1">
<div className="col col--3"><b>It's a slash command:</b></div>
<div className="col col--5">The bot uses a slash command to initialize.</div>
<div className="col col--4"><em>

For example, `/giphy` to search for a gif.

</em></div>
</div>

<div className="row table-row-title">
<div className="col col--12"><b>Routine builder</b></div>
</div>

<div className="row table-row-2">
<div className="col col--3"><b>+ Add Routine:</b></div>
<div className="col col--5">Configuration of the routine executed by the bot.</div>
<div className="col col--4"><em>

For more information, go to the [Routine builder](/docs/documentation/automation/admin_routine) section.

</em></div>
</div>

</div>
<br/>
