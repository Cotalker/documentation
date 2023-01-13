---
title: Agregar Ubicaciones
---

import TabItem from '@theme/TabItem';
import Tabs from '@theme/Tabs';

:::caution WE'RE SORRY... 😢
Our English version is not yet available.
:::

## Introducción {#intro}
Agrega las **ubicaciones** de los lugares donde se deben realizar tareas. 

La _ubicación_ incluye información de contacto y localización.

Una _ubicación_ es siempre requerida al momento de crear una tarea.

## Requisitos {#requirements}
Sólo usuarios con el cargo de [_administrador_](/docs/products/forms/configuration/users/user_types#admin) pueden agregar ubicaciones.

## Pasos para Agregar una Ubicación {#steps}

<Tabs>
<TabItem value="desktop" label="Escritorio" default>

1. Selecciona **Ubicaciones** desde **Configuración** en el _menu principal_.
2. Presiona el botón de acciones desde el panel de **Ubicaciones**.

<div className="img_sizing">

![add location](/img/productos_es/product_forms_locations_01.png)

</div>

3. Elije la opción **Nuevo ubicación**.

<div className="img_sizing">

![add location](/img/productos_es/product_forms_locations_02.png)

</div>

4. Completa y envía el formulario.

<div className="img_sizing">

![add location](/img/productos_es/product_forms_locations_03.png)

</div>

</TabItem>
<TabItem value="mobile" label="Versión Móvil" default>

1. Selecciona **Ubicaciones** desde **Configuración** en el _menu principal_.
2. Presiona el botón de acciones desde el panel de **Ubicaciones**.
3. Elije la opción **Nuevo ubicación**.
4. Completa y envía el formulario.

<div className="img_sizing">

![add location](/img/productos_es/product_forms_locations_01m.png)

</div>

</TabItem>
</Tabs>


## Detalles del Formulario {#details}

<details>
<summary>Nueva Ubicación</summary>
<div className="container">
<div className="row">
<div className="col col--6">

<div className="img_sizing_narrow padding-vert--lg">

![add location](/img/productos_es/product_forms_locations_04.png)

</div>
</div>
<div className="col col--6">

- **<span className="badge badge--danger">1.</span> Nombre de la ubicación**: Este nombre representará la ubicación en todos los formularios.
- **<span className="badge badge--danger">2.</span> Ingresa ubicación en el mapa**: Escribe la dirección, indica en el mapa o utiliza la ubicación GPS actual.
- **<span className="badge badge--danger">3.</span> Nombre o Razón Social**: Este el nombre de la persona o empresa responsable de la ubicación.
- **<span className="badge badge--danger">4.</span> Correo electrónico**: El correo electrónico de la persona o empresa responsable de la ubicación. Al completar una tarea, se puede enviar automáticamente a este correo un PDF con el resumen de la tarea.
- **<span className="badge badge--danger">5.</span> Teléfono**: Número telefónico de la persona o empresa responsable de la ubicación. Sólo para uso de referencia.
- **<span className="badge badge--danger">6.</span> Enviar**: Al enviar el formulario, la ubicación es agregada a la base de datos y puede ser utilizada al [crear tareas](/docs/products/forms/tasks/task_create).

</div>

</div>
</div>
</details>


## Resultado Esperado {#results}
Al enviar el formulario, la ubicación es agregada y podrás ver los siguientes comprobantes de éxito:

- A. Mensaje de Sistema
- B. Nueva ubicación presente en panel de _Ubicaciones_.


<Tabs>
<TabItem value="desktop" label="Escritorio" default>

<div className="img_sizing">

![add location](/img/productos_es/product_forms_locations_05.png)

</div>

</TabItem>
<TabItem value="mobile" label="Versión Móvil" default>

<div className="img_sizing_small">

![add location](/img/productos_es/product_forms_locations_05m.png)

</div>
</TabItem>
</Tabs>
