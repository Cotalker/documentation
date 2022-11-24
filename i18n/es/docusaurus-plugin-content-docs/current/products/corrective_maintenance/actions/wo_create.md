---
title: Crear Orden de Trabajo
---

import useBaseUrl from '@docusaurus/useBaseUrl'; 
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Resumen {#overview}
Una orden de trabajo indica un equipo o activo que necesita mantención y es enviada al personal de mantenimiento responsable. 

:::info Importante
Un [**aviso**](/docs/products/corrective_maintenance/actions/create_notification) de mantenimiento correctivo puede genear automáticamente una orden de trabajo cuando hay personal de mantenimiento asignado al [_puesto de trabajo_](/docs/products/corrective_maintenance/master_data/workstation) correspondiente. Es decir, este paso es realizado por el sistema y los usuarios no tendrán que enviar este formulario.

Pero en caso contrario, el supervisor tendrá que crear la orden de trabajo manualmente después de recibir aviso.
:::

## Requisitos {#requirements}

<details>
<summary>Usuario</summary>
<div>

Para poder crear una Orden de Trabajo manualmente, los usuarios deben tener uno de los siguientes [_cargos_](/docs/products/corrective_maintenance/master_data/job_title):
`supervisor`, `administrador` o `jefe`

</div>
</details>

## Pasos para Crear una Orden de Trabajo {#steps}

<Tabs>
<TabItem value="desktop" label="Escritorio" default>

1.	En el _menú principal_, bajo **Mantención**, seleccionar **Órdenes de Trabajo**.
2.	Apretar el _botón de acciones_.

<div className="img_sizing">

![close](/img/productos_es/product_cm_wo_create_01.png)

</div>

3.	Apretar el botón **Crear Orden de Trabajo**.

<div className="img_sizing">

![close](/img/productos_es/product_cm_wo_create_02.png)

</div>

4.	Rellenar y enviar el formulario.

<div className="img_sizing">

![close](/img/productos_es/product_cm_wo_create_03.png)

</div>

</TabItem>
<TabItem value="mobile" label="Versión Móvil">

1.	En el _menú principal_, bajo **Mantención**, seleccionar **Órdenes de Trabajo**.
2.	Apretar el _botón de acciones_.
3.	Apretar el botón **Crear Orden de Trabajo**.
4.	Rellenar y enviar el formulario.

<div className="img_sizing">

![close](/img/productos_es/product_cm_wo_create_01m.png)

</div>

</TabItem>
</Tabs>

:::note Más detalles
📋 [Formulario Crear Orden de Trabajo](/docs/products/corrective_maintenance/forms/form_create_wo)
:::

## Resultados Esperados {#results}
Al crear la orden de trabajo, un mensaje de sistema es enviando al área de chat con el nombre, número e información de la orden de trabajo:

<div className="img_sizing_small">

![close](/img/productos_es/product_cm_wo_create_04.png)

</div>

La orden de trabajo aparece en el estado **Reportado** como se muestra en el ejemplo abajo:

<Tabs>
<TabItem value="desktop" label="Escritorio" default>

<div className="img_sizing">

![close](/img/productos_es/product_cm_wo_create_05.png)

</div>

</TabItem>
<TabItem value="mobile" label="Versión Móvil">

<div className="img_sizing_extra_small">

![close](/img/productos_es/product_cm_wo_create_05m.png)

</div>

</TabItem>
</Tabs>

## Siguientes Pasos {#next-steps}
Desde el estado **Reportado**, personal de mantenimiento puede abrir el formulario [Aceptar Orden de Trabajo](/docs/products/corrective_maintenance/actions/wo_accept) para indicar si acepta o no el trabajo.

:::info Pasos Alternativos
Desde el estado **Reportado**, los usuarios con los cargos de `supervisor`, `administrador` o `jefe` podrán además hacer una [_solicitud de rechazo_](/docs/products/corrective_maintenance/actions/wo_reject_request) o [_cierre rápido_](/docs/products/corrective_maintenance/actions/wo_fast_close) de la orden de trabajo.
:::