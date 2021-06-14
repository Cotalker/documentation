---
id: existing_routines
title: Routine Stage Types
sidebar_label: Routine Stage Types
---
import useBaseUrl from '@docusaurus/useBaseUrl'; 
import Highlight from '@theme/Highlight';

## Overview {#overview}

**Routine stage types** can be thought of as _stage bots_ or _predefined_. By using these bots, you can easily automate processes by being part of [routines](/docs/documentation/automation/admin_routine) summoned through surveys, slash commands, SLAs, workflows, and others.


## Stage Types List {#stage-list}
Stage Types are explained in the following table:

:::tip
- Click links for more detailed information.
- When using _automation logs_, stage types will be referred to by the _key_ indicated in this table.
:::

| Stage Type Name (Bot) | Description | Key |
| ---- | ---- | ---- |
| [Custom Javascript Code](/docs/documentation/automation/bots/ccjs) | Sandboxed JS runner. | _CCJS_ |
| [Iterate](/docs/documentation/automation/bots/fceach) | Iterate over an Array | _FCEach_ |
| [Conditional](/docs/documentation/automation/bots/fcifelse) | Execute the next stage conditionally based on the operator's left and right hand | _FCIfElse_ |
| [Wait](/docs/documentation/automation/bots/fcsleep) | Execute the next stage after the defined milliseconds | _FCSleep_ |
| [Multiple switch](/docs/documentation/automation/bots/fcswitchall) | Execute all stages conditionally and in parallel according to the operator's left and right hand | _FCSwitchAll_ |
| [Switch](/docs/documentation/automation/bots/fcswitchone) | Conditionally executes the next stage based on the left and right hand of the operator | _FCSwitchOne_ |
| [Run legacy bot](/docs/documentation/automation/bots/nwbotv2v3) | Makes a network request to execute a legacy bot | _NWBotV2V3_ |
| [Network request](/docs/documentation/automation/bots/nwrequest) | Makes a network request | _NWRequest_ |
| [Action Button](/docs/documentation/automation/bots/pbactionbutton) |  | _PBActionButton_ |
| [Search for answers](/docs/documentation/automation/bots/pbanswerchecker) | Search for form responses | _PBAnswerChecker_ |
| [Change Task Status](/docs/documentation/automation/bots/pbchangestate) | Change the status of a Task | _PBChangeState_ |
| [Edit Channel Users](/docs/documentation/automation/bots/pbchanneladduser) | Add or remove users from a Channel | _PBChannelAddUser_ |
| [Get Task from a Channel](/docs/documentation/automation/bots/pbchanneltotaskse) | Gets the Task associated with a Channel (if any) | _PBChannelToTaskSE_ |
| [Clean channels](/docs/documentation/automation/bots/pbcleanchannel) | Delete the messages that have the indicated channels | _PBCleanChannel_ |
| [Copy messages](/docs/documentation/automation/bots/pbcopysurvey) | Copy messages from one Channel to another | _PBCopySurvey_ |
| [Create Channel](/docs/documentation/automation/bots/pbcreatechannel) | Create a new Channel | _PBCreateChannel_ |
| [Create Property](/docs/documentation/automation/bots/pbcreateproperty) | Create a new Property | _PBCreateProperty_ |
| [Create Task](/docs/documentation/automation/bots/pbcreatetask) | Create a new Task | _PBCreateTask_ |
| [Create User](/docs/documentation/automation/bots/pbcreateuser) | Create a new User | _PBCreateUser_ |
| [Duplicate Task](/docs/documentation/automation/bots/pbduplicatetask) |  | _PBDuplicateTask_ |
| [Change Form to edit mode](/docs/documentation/automation/bots/pbeditablesurvey) | Change a set of forms to edit mode | _PBEditableSurvey_ |
| [Send email](/docs/documentation/automation/bots/pbemail) | Send an email | _PBEmail_ |
| [Get Channel Messages](/docs/documentation/automation/bots/pbgetchannelmessages) |  | _PBGetChannelMessages_ |
| [Send gif](/docs/documentation/automation/bots/pbgiphy) | Send a gif to a Channel | _PBGiphy_ |
| [Google Calendar Integration](/docs/documentation/automation/bots/pbgooglecalendar) | Send Google Calendar invitations. Domain wide integration; Google Workspace required. | _PBGoogleCalendar_ |
| [Hide messages](/docs/documentation/automation/bots/pbhidemessages) | Hide messages from a Channel | _PBHideMessages_ |
| [Send message](/docs/documentation/automation/bots/pbmessage) | Send a message to a set of channels | _PBMessage_ |
| [Payments](/docs/documentation/automation/bots/pbpayments) |  | _PBPayments_ |
| [Create PDF](/docs/documentation/automation/bots/pbpdf) | Create a PDF from a local file or a URL | _PBPdf_ |
| [Generate QR code](/docs/documentation/automation/bots/pbqrcode) | Generate a QR code | _PBQRCode_ |
| [Script](/docs/documentation/automation/bots/pbscript) |  | _PBScript_ |
| [Submit Form](/docs/documentation/automation/bots/pbsendsurvey) | Send a Form to a Channel | _PBSendSurvey_ |
| [Edit users of a Task](/docs/documentation/automation/bots/pbtaskaddeditor) | Add or remove users from a Task | _PBTaskAddEditor_ |
| [Generate HTML](/docs/documentation/automation/bots/pbtemplate) | Generates an HTML from a template and an object with data | _PBTemplate_ |
| [Update Channel](/docs/documentation/automation/bots/pbupdatechannel) | Update a Channel | _PBUpdateChannel_ |
| [Update Property](/docs/documentation/automation/bots/pbupdateproperty) | Update a Property | _PBUpdateProperty_ |
| [Update Task](/docs/documentation/automation/bots/pbupdatetask) | Update a Task | _PBUpdateTask_ |
| [Update User](/docs/documentation/automation/bots/pbupdateuser) | Update a User | _PBUpdateUser_ |
| [WhatsApp Integration](/docs/documentation/automation/bots/pbwhatsapp) | Send automated messages via WhatsApp | _PBWhatsApp_ |


## Stage Type Versions {#stage-type-versions}

_Stage types_ are actually predefined system bots. Every once in a while, we update these bots, adding new features and options, or just improving automations. But, because these changes might affect your existing _routines_, access to older versions are available.

You can see where the _version_ field is located and how versions can have different settings in the following image:

<img alt="stage type versions" className="img_sizing_narrow item shadow--tl" src={useBaseUrl('img/automations_routines_stage_type_version_00.png')} />
<br/>
<br/>

:::caution Attention
- In case a new version is available, an alert message will appear in the settings panel.
- If you change the version of a stage type, you will not be able to go back to previous versions after saving.
:::
