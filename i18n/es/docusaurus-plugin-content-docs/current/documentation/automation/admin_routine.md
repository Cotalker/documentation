---
id: admin_routine
title: Routines Builder
sidebar_label: Routine Builder
---
import useBaseUrl from '@docusaurus/useBaseUrl'; 
import Highlight from '@theme/Highlight';

# Routine Overview {#routine-overview}
<br/>
Routine is not a module of the admin, but it is used in Statemachine, Bot, Scheduler and SLA. So, this section will explain the routine. <br/>
The routine is used to configure various action in a company in Cotalker. For example, you can automate the sending of an email or a message. But it also is used to run a workflow, bot or scheduler, for example, changing from one state to another or creating / updating tasks.
<br/>
A routine looks like the following image:
<br /><br/>
<img alt="" src={useBaseUrl('img/admin_routine.png')} />
<br /><br />
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

# Setup the routine {#setup-the-routine}
A routine setup looks like the following image:
<br /><br/>
<img alt="" src={useBaseUrl('img/admin_routine_setup.png')} />
<br /><br />
Below you will find the description and notes for each field in the pictures above.

| Field | Description | Notes | 
| ---- | ----------- | ----- | 
| Initial State | Select the stage that initialize the routine | The list is of the stages that have been created so far in this particular routine |
| Max Itertations | Specifies the iteration of stages. | Make sure this number is greater than the stages it has, this way the routine iterates all the stages. |
| Add Stage | Add a Stage | The code and the type of stage must be specified. After that, it will show the settings for the selected stage type. |
| Code | Stage identification | |
| Type | Select the type of the stage. | The function of the types will be explained below |

## Configure Stage Types {#configure-stage-types}
There are various action that can be configured, desplayed in a list. If you hover over the name, a brief explination of the function will be displayed. <br/>

When adding a stage, once the type is selected, the field to make the bot work will be displayed.<br/>
For example:
<img alt="" src={useBaseUrl('img/admin_routine_field.png')} /> <br/><br/>
The name of the field is at the top left [CHANNEL]. Next to it is the specifition of the 

*requierd* field and *input type* [COTCHANNELID](admin_cotlang). And in the italic letter is the explanation of the expected input [ID OF THE CHANNEL TO WICH THE GIFWILL BE SENT].

It's common to use COTLANG to get the info for the fields. 

### Stage Type List {#stage-type-list}

The Stage Types will be explained in the following table:<br/>

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
  
