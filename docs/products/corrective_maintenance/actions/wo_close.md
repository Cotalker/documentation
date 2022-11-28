---
title: Close Work Order
---

import useBaseUrl from '@docusaurus/useBaseUrl'; 
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CloseWO, {toc as Title1TOC} from '/i18n/es/docusaurus-plugin-content-docs/current/products/corrective_maintenance/forms/_form_close_wo.mdx'; 

:::caution WE'RE SORRY... 😢
Our English version is not yet available.
:::

## Resumen {#overview}
La opción **Cerrar Orden de Trabajo** permite al personal de mantenimiento dar aviso de que su labor ha concluido y el trabajo está listo para ser validado por un supervisor.

El cierre de la orden permite indicar si se pudo o no solucionar el problema e indicar los [servicios](/docs/products/corrective_maintenance/master_data/service) y [materiales](/docs/products/corrective_maintenance/master_data/material) involucrados. Los _servicios_ y los _materiales_ están registrados en la data maestra, permitiendo incluir en el informe los costos de los _servicios_ y los _materiales_ descontados del stock.

## Requisitos {#requirements}

<details>
<summary>Usuario</summary>
<div>

Sólo pueden cerrar la orden de trabajo [_usuarios_](/docs/products/corrective_maintenance/master_data/users) asociados a la tarea y con uno de los siguientes [_cargos_](/docs/products/corrective_maintenance/master_data/job_title):  
`técnico`, `supervisor`, `administrador` o `jefe`

</div>
</details>

<details>
<summary>Estado</summary>
<div>

La orden de trabajo deber estar en el estado **Pendiente**.

</div>
</details>

## Pasos para Cerrar una Orden de Trabajo {#steps}

<Tabs>
<TabItem value="desktop" label="Escritorio" default>

1.	Seleccionar **Órdenes de Trabajo** desde el _menú principal._
2.	Seleccionar la _orden de trabajo_ correspondiente en la sección **Pendiente**.
3.	Apretar el _botón de acciones_.

<div className="img_sizing">

![close](/img/productos_es/product_cm_wo_close_01.png)

</div>

4.	Rellenar el formulario que aparece en el área de trabajo.

<div className="img_sizing_small">

![close](/img/productos_es/product_cm_wo_close_02.png)

</div>

</TabItem>
<TabItem value="mobile" label="Versión Móvil">

1.	Seleccionar **Órdenes de Trabajo** desde el _menú principal._
2.	Seleccionar la _orden de trabajo_ correspondiente en la sección **Pendiente**.
3.	Apretar el _botón de acciones_.
4.	Rellenar el formulario que aparece en el área de trabajo.

<div className="img_sizing">

![close](/img/productos_es/product_cm_wo_close_01m.png)

</div>

</TabItem>
</Tabs>

## Detalles del Formulario {#details}

<details>
<summary>📋 Formulario Cerrar Orden de Trabajo</summary>
<div>

<CloseWO/>

</div>
</details>

## Resultados Esperados {#results}
Independiente de si el trabajo pudo completarse o no, al cerrar la orden de trabajo ésta pasa al estado Validación. Los costos de los servicios son sumados y la cantidad de materiales son descontados del stock.

_Un mensaje similar al que aparece abajo es enviado por el sistema indicando los detalles de los servicios y materiales asociados:_

<div className="img_sizing_small">

![close](/img/productos_es/product_cm_wo_close_03.png)

</div>

_La orden de trabajo aparece en el estado **Validación** como se muestra en el ejemplo abajo:_

<Tabs>
<TabItem value="desktop" label="Escritorio" default>

<div className="img_sizing">

![close](/img/productos_es/product_cm_wo_close_04.png)

</div>

</TabItem>
<TabItem value="mobile" label="Versión Móvil">

<div className="img_sizing_extra_small">

![close](/img/productos_es/product_cm_wo_close_04m.png)

</div>

</TabItem>
</Tabs>

## Siguientes Pasos {#next-steps}
Una vez que la orden es cerrada por personal de mantenimiento, se requiere de su validación.
El supervisor procede a la [**recepción de la orden de trabajo**](/docs/products/corrective_maintenance/actions/wo_validate), donde indicará si acepta el trabajo realizado.
