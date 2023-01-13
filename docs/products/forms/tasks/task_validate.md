---
title: Validar Tarea
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

import Workflow, {toc as Title1TOC} from '/i18n/es/docusaurus-plugin-content-docs/current/products/forms/tasks/_task_workflow.mdx';
import Validate, {toc as Title2TOC} from '/i18n/es/docusaurus-plugin-content-docs/current/products/forms/tasks/_task_validate_intro.mdx';

:::caution WE'RE SORRY... 😢
Our English version is not yet available.
:::

## Introducción {#intro}

<Validate/>

<details>
<summary>Detalle de Flujo de Trabajo</summary>
<div>

<Workflow/>

</div>
</details>

## Requisitos {#requirements}
Para que la opción de validación esté activa:
- se debe haber indicado en el [formulario para crear tareas](/docs/products/forms/tasks/task_create).

Puede validar una tarea:
- usuario designado a través del [formulario para crear tareas](/docs/products/forms/tasks/task_create)
- coordinador de tareas
- administrador de tareas


## Pasos para Validar una Tarea {#steps}

<Tabs>
<TabItem value="desktop" label="Escritorio" default>

1. Desde el _menu principal_, selecciona **Tareas**.
2. En el panel de _Tareas_, selecciona desde la lista de **Validación** la tarea que se desea validar.

<div className="img_sizing">

![validate task](/img/productos_es/product_forms_tasks_validate_03.png)

</div>

3. Completa y envía el formulario.

<div className="img_sizing">

![validate task](/img/productos_es/product_forms_tasks_validate_04.png)

</div>

</TabItem>
<TabItem value="mobile" label="Versión Móvil" default>

1. Desde el _menu principal_, selecciona **Tareas**.
2. En el panel de _Tareas_, selecciona desde la lista de **Validación** la tarea que se desea validar.
3. Completa y envía el formulario.

<div className="img_sizing">

![validata task](/img/productos_es/product_forms_tasks_validate_03m.png)

</div>

</TabItem>
</Tabs>


## Detalles del Formulario {#details}

<details>
<summary>Validación de la Tarea</summary>
<div className="container">
<div className="row">
<div className="col col--6">

<div className="img_sizing_narrow">

![validate task](/img/productos_es/product_forms_tasks_validate_05.png)


</div>
</div>
<div className="col col--6">

- **<span className="badge badge--danger">1.</span> ¿Esta tarea fue ejecutada correctamente?**: 
  - **<span className="badge badge--danger">a.</span> Sí**: La tarea ha sido completada y se cierra.
  - **<span className="badge badge--danger">b.</span> No**: La tarea no sido completada satisfactoriamente. En este caso, existen dos alternativas:  
    - _Rechazar y dar por finalizada la tarea_  
    - _Reabrir tarea para que asignado vuelva a responder el formulario_ 
- **<span className="badge badge--danger">2.</span> Firma validador**: El validador dibuja su firma en el recuadro.
- **<span className="badge badge--danger">3.</span> Enviar**: Al enviar, la tarea pasa al estado correspondiente al resultado de la validación.

</div>

</div>
</div>
</details>

## Resultados Esperados {#results}

### Validado {#validated}
La tarea ha sido completada y se cierra satisfactoriamente.
<div className="img_sizing">

![validate task](/img/productos_es/product_forms_tasks_validate_06.png)

</div>

### No Validado - Reabrir {#redo}
La tarea no ha sido completada satisfactoriamente y se le pide al asignado a rehacer la tarea.

<div className="img_sizing">

![validate task](/img/productos_es/product_forms_tasks_validate_07.png)

</div>

### No Validado - Cerrar {#close}
La tarea no ha sido completada satisfactoriamente y se cierra definitivamente.

<div className="img_sizing">

![validate task](/img/productos_es/product_forms_tasks_validate_08.png)

</div>