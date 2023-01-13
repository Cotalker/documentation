---
title: Realizar Tarea
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

import Workflow, {toc as Title1TOC} from '/i18n/es/docusaurus-plugin-content-docs/current/products/forms/tasks/_task_workflow.mdx';
import Execute, {toc as Title2TOC} from '/i18n/es/docusaurus-plugin-content-docs/current/products/forms/tasks/_task_execute_intro.mdx';

:::caution WE'RE SORRY... 😢
Our English version is not yet available.
:::

## Introducción {#intro}

<Execute/>

<details>
<summary>Detalle de Flujo de Trabajo</summary>
<div>

<Workflow/>

</div>
</details>

## Requisitos {#requirements}

El usuario debe tener al menos el cargo de [_realizador_](/docs/products/forms/configuration/users/user_types#executor) para ver y ejecutar tareas. 

[_Coordinadores_](/docs/products/forms/configuration/users/user_types#coordinator) y [_administradores_](/docs/products/forms/configuration/users/user_types#admin) también pueden ver y ejecutar tareas.

## Pasos para Realizar una Tarea

<Tabs>
<TabItem value="desktop" label="Escritorio" default>

1. Desde el _menú prinicipal_, selecciona **Tareas**.
2. En el panel de _Tareas_, escoge la tarea que deseas completar.
3. En el área de trabajo de la tarea, presiona el _botón de acciones_ para abrir el formulario correspondiente.

<div className="img_sizing">

![execute task](/img/productos_es/product_forms_tasks_execute_01.png)

</div>

4. Completa y envía el formulario.

<div className="img_sizing">

![execute task](/img/productos_es/product_forms_tasks_execute_02.png)

</div>

</TabItem>
<TabItem value="mobile" label="Versión Móvil" default>

1. Desde el _menú prinicipal_, selecciona **Tareas**.
2. En el panel de _Tareas_, escoge la tarea que deseas completar.
3. En el área de trabajo de la tarea, presiona el _botón de acciones_ para abrir el formulario correspondiente.
4. Completa y envía el formulario.

<div className="img_sizing">

![execute task](/img/productos_es/product_forms_tasks_execute_01m.png)

</div>

</TabItem>
</Tabs>


## Resultados Esperados
Dependiendo de la [_configuración de la tarea_](/docs/products/forms/tasks/task_create), la tarea puede o no requerir validación por un tercero.

### Sin validación
Si la tarea fue configurada para no tener _validación_, entonces pasa a estar _terminanda_ una vez que se envía el formulario.

<div className="img_sizing">

![validation](/img/productos_es/product_forms_tasks_validate_01.png)

_La imagen arriba muestra el mensaje de sistema correspondiente para indicar que la tarea no requiere validación y está terminada._

</div>




### Con validación
Si la tarea fue configurada con _validación_, entonces el usuario designado como validador debe enviar el formulario de validación para poder seguir a la siguiente etapa.

<div className="img_sizing">

![validation](/img/productos_es/product_forms_tasks_validate_02.png)

_La imagen arriba muestra el mensaje de sistema correspondiente para indicar que la tarea requiere validación y muestra el formulario que debe enviar el validador._

</div>