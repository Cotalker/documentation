---
id: admin_routine
title: Routine Builder
sidebar_label: Routine Builder
---
import useBaseUrl from '@docusaurus/useBaseUrl'; 
import Highlight from '@theme/Highlight';

## Overview {#routine-overview}

The _Routine Builder_ is used to build routines in _Workflows_, _Bots_, _Schedules_ and _SLAs_. This section explains how to build a routine within the mentioned processes.

_Routines_ are used to configure various actions within a company. For example, you can automate the sending of an email or a message. But it also is used to run a workflow, bot or scheduler, for example, changing from one state to another or creating and updating tasks.

_A routine looks like the following image:_

<img alt="" src={useBaseUrl('img/admin_routine.png')} />
<br/>

On the right side is the visualization of the routine that has been created. A routine is build by a set of stage and its functionality is chosen based on the type. You will find types of stages that can:

* help with configuration
* make decisions based on context
* network request
* interact with the user
* edit workflow components
* update workflow components

<br /><br />
The buttons in this section will be explained in the following table.<br /><br />

| Action Name | Image | Description |
| ---- | ----- | ----------- |
| Delete | <img alt="" src={useBaseUrl('img/icon_deleteroutine.png')} /> | Delete the stage |
| Test | <img alt="" src={useBaseUrl('img/icon_testroutine.png')} /> | Test the whole routine |

## Routine Setup {#setup-the-routine}
A routine setup looks like the following image:

<img alt="" src={useBaseUrl('img/admin_routine_setup.png')} />
<br /><br />

Below you will find the description and notes for each field in the pictures above.

| Field | Description | Notes | 
| ---- | ----------- | ----- | 
| Initial State | Select the stage that initializes the routine. | The list shows the stages that have been created so far in this particular routine. You can fill in this field after you have added the stage or stages. |
| Max Iterations | Specifies the number of stages iterated. | Make sure looping stages are taken into account when specifying maximum number of iterations. |
| Add Stage | Adds a stage to the routine. | The code and the type of stage must be specified. After that, it will show the settings for the selected stage type. |
| Code | Stage identification name | This field only allows lowercase letters, underscores and should always start with a letter.  |
| Type | Select the stage type. | [Stage type descriptions](#stage-type-list) are listed below. |
| Version | Select the stage type version. | Available versions will appear in the dropdown menu. For more information, [click here](#stage-type-versions).|

## Stage Type Configuration {#configure-stage-types}
There are various actions that can be configured, displayed in a list. If you hover over the name, a brief explanation of the function will be displayed. <br/>

When adding a stage, once the type is selected, the field to make the bot work will be displayed.

_For example:_

<img alt="" src={useBaseUrl('img/admin_routine_field.png')} />
<br/>

Field box has its name at the top left (in this case: "CHANNEL"). Next to it, you can find the field's _specifications_ ("REQUIRED") and the _input type_ ([COTCHANNELID](admin_cotlang)). At the bottom of the box, in italic letter, is the explanation of the expected input (_ID OF THE CHANNEL TO WHICH THE GIF WILL BE SENT_).

It's common to use COTLANG to get data for the fields. 

### Stage Types List {#stage-type-list}

The Stage Types will be explained in the following table:

:::tip
Click links for more detailed information.
:::

<br/>

| Stage Type Name (Bot) | Description |
| ---- | ---- | 
| [Custom Javascript Code](/docs/documentation/automation/bots/ccjs) | Sandboxed JS runner. Returns an object. |
| [Iterate](/docs/documentation/automation/bots/fceach) | Iterate over an array. |
| [Conditional](/docs/documentation/automation/bots/fcifelse) | Executes the next stage conditionally based on the operator's left and right hand. |
| [Wait](/docs/documentation/automation/bots/fcsleep) | Executes the next stage after the defined milliseconds. |
| [Multiple Switch](/docs/documentation/automation/bots/fcswitchall) | Executes all stages conditionally and in parallel according to the operator's left and right hand. |
|[ Switch](/docs/documentation/automation/bots/fcswitchone) | Conditionally executes the next stage based on the left and right hand of the operator. |
| [Run Legacy Bot](/docs/documentation/automation/bots/nwbotv2v3) | Makes a network request to execute a legacy bot. |
| [Network Request](/docs/documentation/automation/bots/nwrequest) | Makes a network request (URL) using an HTTP method. |
| [Action Button](/docs/documentation/automation/bots/pbactionbutton) | |


| Field | Description | Notes | 
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
| Actualizar Usuario | Actualizar un Usuario |  | 
  
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