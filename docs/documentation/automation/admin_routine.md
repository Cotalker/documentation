---
id: admin_routine
title: Routine Builder
sidebar_label: Routine Builder
---
import useBaseUrl from '@docusaurus/useBaseUrl';
import Highlight from '@theme/Highlight';

<img alt="design" class="img_sizing" src={useBaseUrl('img/design/routines.svg')} />

## Overview {#routine-overview}

The _Routine Builder_ is used to build routines in _Workflows_, _Bots_, _Schedules_ and _SLAs_. This section explains how to build a routine within the mentioned processes.

_Routines_ are used to configure various actions within a company. For example, you can automate the sending of an email or a message, create a task, or change a workflow from one state to another.

- Checkout the [list](#stage-type-list) of automations that you can include in your _routines_.

- Test your _routines_ with the [automation log](#run-routine).


<div className="alert alert--secondary">

#### Routine builder in settings panels:


<img alt="routine builder" className="img_sizing_narrow item shadow--tl" src={useBaseUrl('img/automations_routines_00.png')} />
<br/>
<br/>

#### Routine builder in workflows:

<img alt="routine builder" className="img_sizing_narrow item shadow--tl" src={useBaseUrl('img/automations_routines_01.png')} />
<br/>
<br/>

The settings panel shows a visualization of the _routine_ that has been created. A _routine_ is built by a set of _stages_ or _steps_ that can function in different ways according to the chosen type. In general, [stage types](#stage-type-list) can do the following:

* help with configuration
* make decisions based on context
* network request
* interact with the user
* edit workflow components
* update workflow components

</div>
<br/>

## Routine Setup {#setup-the-routine}

Below you will find the description and notes for each field in the Routine Builder's settings panel.

| Field | Description | Notes | 
| ---- | ----------- | ----- | 
| Initial State | Select the stage that initializes the routine. | The list shows the stages that have been created so far in this particular routine. You can fill in this field after you have added the stage or stages. |
| Max Iterations | Specifies the number of stages iterated. | Make sure looping stages are taken into account when specifying maximum number of iterations. |
| Add Stage | Adds a stage to the routine. | The code and the type of stage must be specified. After that, the settings for the selected stage type will be displayed. |
| Code | Stage identification name | This field only allows lowercase letters, underscores and should always start with a letter.  |
| Type | Select the stage type. | [Stage type descriptions](#stage-type-list) are listed below. |
| Version | Select the stage type version. | Available versions will appear in the dropdown menu. For more information, [click here](#stage-type-versions).|

## Stage Type Configuration {#configure-stage-types}
After selecting <span className="badge badge--primary">+ Add Stage</span>, there are various _stages_ or _steps_ that can be chosen and configured. The **Type** field has a dropdown menu with a list of all the available _stage bots_. If you hover over the name, a brief explanation of the function will be displayed. <br/>


<div className="alert alert--secondary">

Once the type is selected, its specific settings fields will be displayed.

_For example, if you chose the **Send gif** stage type, you will see the following fields appear:_

<img alt="type fields" className="img_sizing_narrow item shadow--tl" src={useBaseUrl('img/automations_routines_02.png')} />
<br/>

- **Options**: In this example, the **Send gif** stage type has three options or fields: _Search_, _Channel_, and _User_.
- **Required Fields**: The _required_ fields are outlined by a red box (_Search_ and _Channel_).
- **General Field Description**: The field highlighted in red has its name at the top left (in this case: "CHANNEL"). Next to it, you can find the field's _specifications_ ("REQUIRED") and the _input type_ ([COTCHANNELID](admin_cotlang)). At the bottom of the box, in italic letters, is the explanation of the expected input ("ID OF THE CHANNEL TO WHICH THE GIF WILL BE SENT").

**Note:** _It's common to use [COTLang](admin_cotlang) (Cotalker Script Language) for getting automatized data for fields._

</div>
<br/>

### Stage Types List {#stage-type-list}
Stage Types will be explained in the following table:

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
| [Google Calendar Integration](/docs/documentation/automation/bots/pbgooglecalendar) | Domain wide integration | _PBGoogleCalendar_ |
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
| [WhatsApp Integration](/docs/documentation/automation/bots/pbwhatsapp) | Send message via WhatsApp | _PBWhatsApp_ |


<!-- | Field | Description | Notes | 
| ---- | ----------- | ----- | 
| Iterar | Itera sobre un Array |  | 
| Condicional | Ejecuta la siguiente etapa condicionalmente en función de la mano izquierda y derecha del operador |  | 
| Switch múltiple | Ejecuta condicionalmente y en paralelo todas las etapas en función de la mano izquierda y derecha del operador |  | 
| Switch | Ejecuta condicionalmente la siguiente etapa en función de la mano izquierda y derecha del operador |  | 
| Ejecutar bot legado | Hace una solicitud de red para ejecutar un bot legado |  | 
| Solicitud de red | Hace una solicitud de red |  | 
| Esperar | Ejecuta la siguiente etapa después de los milisegundos definidos |  | 
| Buscar respuestas | Busca respuestas de formularios |  | 
| Cambiar estado de Tarea | Cambia el estado de una Tarea |  | 
| Editar usuarios de Canal | Añade o remueve usuarios de un Canal |  | 
| Obtener Tarea de un Canal | Obtiene la Tarea asociada a un Canal (en caso de que exista) |  | 
| Limpiar canales | Elimina los mensajes que tengan los canales indicados |  | 
| Copiar mensajes | Copia mensajes de un Canal a otro |  | 
| Crear Canal | Crea un nuevo Canal |  | 
| Crear Propiedad | Crea una nueva Propiedad |  | 
| Crear Tarea | Crear una nueva Tarea |  | 
| Crear Usuario | Crea un nuevo Usuario |  | 
| Cambiar Formulario a modo edición | Cambia un conjunto de formularios a modo edición |  | 
| Enviar email | Envía un email |  | 
| Enviar gif | Envía un gif a un Canal |  | 
| Ocultar mensajes | Oculta mensajes de un Canal |  | 
| Enviar mensaje | Envía un mensaje a un conjunto de canales |  | 
| Crear PDF | Crea un PDF a partir de un archivo local o una URL |  | 
| Generar código QR | Genera un código QR |  | 
| Enviar Formulario | Envía un Formulario a un Canal |  | 
| Editar usuarios de una Tarea | Añade o remueve los usuarios de una Tarea |  | 
| Generar HTML | Genera un HTML a partir de una plantilla y un objeto con datos |  | 
| Actualizar Canal | Actualiza un Canal |  | 
| Actualizar Propiedad | Actualiza una Propiedad |  | 
| Actualizar Tarea | Actualiza una Tarea |  | 
| Actualizar Usuario | Actualizar un Usuario |  |  -->

### Stage Type Versions {#stage-type-versions}

_Stage types_ are actually predefined system bots. Every once in a while, we update these bots, adding new features and options, or just improving automations. But, because these changes might affect your existing _routines_, access to older versions are available.

You can see where the _version_ field is located and how versions can have different settings in the following image:

<img alt="stage type versions" className="img_sizing_narrow item shadow--tl" src={useBaseUrl('img/automations_routines_stage_type_version_00.png')} />
<br/>
<br/>

:::caution Attention
- In case a new version is available, an alert message will appear in the settings panel.
- If you change the version of a stage type, you will not be able to go back to previous versions after saving.
  :::

## Run Routine {#run-routine}

<img alt="run routine" className="img_sizing item shadow--tl" src={useBaseUrl('img/automations_log_06.png')} />
<br/>

The <span className="badge badge--primary">Run Routine</span> button is a blue button found in the *Routine Builder*. This button opens up an automation log that will help you test and debug your routines while you are building them.

For more information about the log information shown in **Run Routine**, please refer to [Automation Log](/docs/documentation/automation/automation_log).

:::warning
*Run Routine* is **not** a "playground" or "sandbox". The routine will actually execute all the steps. So, for example, if you program the routine to send an email, it will really send the email.
You can insert mock data into the *Context* editor to avoid mishaps.
:::
