---
title: Crear Tarea
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Create, {toc as Title1TOC} from '/i18n/es/docusaurus-plugin-content-docs/current/products/forms/tasks/_task_create_intro.mdx';

:::caution WE'RE SORRY... 😢
Our English version is not yet available.
:::

## Introducción {#intro}

<Create/>

## Requisitos {#requirements}
Para la creación de una tarea se requiere al menos lo siguiente:
- Un [usuario](/docs/products/forms/configuration/users/overview) con el cargo de [coordinador](/docs/products/forms/configuration/users/user_types#coordinator) o [administrador](/docs/products/forms/configuration/users/user_types#admin)
- Una [ubicación](/docs/products/forms/configuration/locations/overview)
- Un [formulario](/docs/products/forms/configuration/forms/overview)


## Pasos para Crear una Tarea {#steps}

<Tabs>
<TabItem value="desktop" label="Escritorio" default>

1. Selecciona **Tareas** en el _menu principal_.
2. Presiona el _botón de acciones_ desde el panel de **Tareas**.

<div className="img_sizing">

![create task](/img/productos_es/product_forms_tasks_create_01.png)

</div>

3. Elije la opción **Nueva Tarea**.

<div className="img_sizing">

![create task](/img/productos_es/product_forms_tasks_create_02.png)

</div>

4. Completa y envía el formulario.

<div className="img_sizing">

![create task](/img/productos_es/product_forms_tasks_create_03.png)

</div>

</TabItem>
<TabItem value="mobile" label="Versión Móvil" default>

1. Selecciona **Tareas** en el _menu principal_.
2. Presiona el _botón de acciones_ desde el panel de **Tareas**.
3. Elije la opción **Nuevo Tarea**.
4. Completa y envía el formulario.

<div className="img_sizing">

![create task](/img/productos_es/product_forms_tasks_create_01m.png)

</div>

</TabItem>
</Tabs>

## Detalles del Formulario {#details}

<details>
<summary>Asignación de Nueva Tarea</summary>
<div className="container">
<div className="row">
<div className="col col--6">

<div className="img_sizing_narrow">

![create task](/img/productos_es/product_forms_tasks_create_04.png)

</div>
</div>
<div className="col col--6">

- **<span className="badge badge--danger">1.</span> Usuario asignado**: Selecciona el [usuario](/docs/products/forms/configuration/users/overview) que estará a cargo de la tarea y de rellenar el formulario. El usuario debe existir dentro de actual plataforma de Cotalker y tener al menos el cargo de _realizador_.
- **<span className="badge badge--danger">2.</span> Formulario**: Selecciona el [formulario](/docs/products/forms/configuration/forms/overview) que se usará para completar la tarea. El formulario debe estar ya creado.
- **<span className="badge badge--danger">3.</span> Ubicación**: Selecciona la [ubicación](/docs/products/forms/configuration/locations/overview) en que se realizará la tarea. La ubicación debe estar ya ingresada a la plataforma.
- **<span className="badge badge--danger">4.</span> Fecha de inicio**: Indica cuando la tarea debe comenzar a realizarse. Se puede usar esta fecha para configurar un [SLA](/docs/documentation/automation/sla).
- **<span className="badge badge--danger">5.</span> Fecha de término**: Indica la fecha en que la tarea debe estar completada. Se puede usar esta fecha para configurar un [SLA](/docs/documentation/automation/sla).
- **<span className="badge badge--danger">6.</span> Duración (Horas)**: Indica la cantidad de horas que la tarea dura. Campo opcional.
- **<span className="badge badge--danger">7.</span> Notas**: Agregar algún comentario. Campo opcional.
- **<span className="badge badge--danger">8.</span> Requiere Validación**: Indica si un tercero debe validar que la tarea se ha completado satisfactoriamente. Se puede escoger cualquier usuario registrado en la plataforma.
- **<span className="badge badge--danger">9.</span> Enviar correo a contacto de ubicación al terminar tarea**: Si esta opción se escoge, al terminar la tarea, se le envía automáticamente un email al encargado de la ubicación en que se realizó la tarea con toda la data relevante.
- **<span className="badge badge--danger">10.</span> Enviar**: Al enviar el formulario, un PDF con la data es enviada al canal. Si se requiere, la tarea pasa al estado de _validación_. Si no requiere validación, la tarea se cierra.


</div>
</div>
</div>
</details>

## Resultado Esperado {#results}

Una vez enviado el formulario, la tarea es creada y luego: 
- **<span className="badge badge--danger">A.</span>** La tarea aparece en el panel de _Tareas_. 
- **<span className="badge badge--danger">B.</span>** Un mensaje de sistema parece en el canal de la tarea indicando que se ha credo exitosamente.

<Tabs>
<TabItem value="desktop" label="Escritorio" default>

<div className="img_sizing">

![create task](/img/productos_es/product_forms_tasks_create_05.png)

</div>

</TabItem>
<TabItem value="mobile" label="Versión Móvil" default>

<div className="img_sizing_small">

![create task](/img/productos_es/product_forms_tasks_create_05m.png)

</div>

</TabItem>
</Tabs>

:::info Importante
El [_realizador_](/docs/products/forms/configuration/users/user_types#executor) o usuario encargado ahora puede [**ejecutar la tarea**](/docs/products/forms/tasks/task_execute) seleccionándola desde el panel de _Tareas_.

El realizador tendrá que completar la tarea dentro de los plazos establecidos en el formulario. Si no, se activará un [SLA](/docs/documentation/automation/sla) que puede ser programado dar una alerta.
:::