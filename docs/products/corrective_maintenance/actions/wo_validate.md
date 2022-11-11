---
title: Recepción de Orden de Trabajo
---

import useBaseUrl from '@docusaurus/useBaseUrl'; 
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::caution WE'RE SORRY... 😢
Our English version is not yet available.
:::

## Resumen {#overview}
Una vez que personal de mantenimiento ha cerrado la orden de trabajo, ésta requiere ser validada por un supervisor o personal administrativo. El trabajo realizado se puede aceptado o no, llevando así a la orden al estado Cerrado o Pendiente, respectivamente.

## Requisitos {#requirements}
<details>
<summary>Usuario</summary>
<div>

El [_usuario_](/docs/products/corrective_maintenance/master_data/users) encargado de la recepción de la orden de trabajo debe tener uno de los siguientes [_cargos_](/docs/products/corrective_maintenance/master_data/job_title):
`supervisor`, `administrador` o `jefe`

</div>
</details>

<details>
<summary>Estado</summary>
<div>

Sólo en el estado de **Validación** se podrá hacer la recepción de la orden de trabajo.

</div>
</details>

## Pasos para la Recepción una Orden de Trabajo {#steps}
1.	Seleccionar **Órdenes de Trabajo** desde el _menú principal._
2.	Seleccionar la _orden de trabajo_ correspondiente en la sección **Validación**.
3.	Apretar el _botón de acciones_.

<Tabs>
<TabItem value="desktop" label="Escritorio" default>

<div className="img_sizing">

![close](/img/productos_es/product_cm_wo_validate_01.png)

</div>

4.	Rellenar el formulario que aparece en el área de trabajo.

<div className="img_sizing_small">

![close](/img/productos_es/product_cm_wo_validate_02.png)

</div>

</TabItem>
<TabItem value="mobile" label="Versión Móvil">

1.	Seleccionar **Órdenes de Trabajo** desde el _menú principal._
2.	Seleccionar la _orden de trabajo_ correspondiente en la sección **Validación**.
3.	Apretar el _botón de acciones_.
4.	Rellenar el formulario que aparece en el área de trabajo.

<div className="img_sizing">

![close](/img/productos_es/product_cm_wo_validate_01m.png)

</div>

</TabItem>
</Tabs>

## Resultados Esperados {#results}
En caso de que se aceptó el trabajo realizado, la orden de trabajo concluye su ciclo de vida pasando al estado **Cerrado**. 

Enseguida se genera un _documento en format PDF_ con todos los detalles de la orden de trabajo. Si la orden fue creada a través de un [_aviso_](/docs/products/corrective_maintenance/actions/create_notification) de mantenimiento correctivo, entonces ese aviso pasa al estado de Tareas Completadas. 

Aparece, además, un formulario que permite enviar [**feedback**](/docs/products/corrective_maintenance/actions/wo_feedback) de forma opcional.

_Enviada la validación de la orden de trabajo, el sistema envía mensajes indicando las acciones realizadas:_

<div className="img_sizing_50">

![close](/img/productos_es/product_cm_wo_validate_03.png)

</div>

Si no se aceptó el trabajo realizado, la orden de trabajo vuelve al estado **Pendiente**.

_Cuando la orden de trabajo pasa al estado **Cerrado**, aparece de forma similar a lo que aparece abajo:_

<Tabs>
<TabItem value="desktop" label="Escritorio" default>

<div className="img_sizing">

![close](/img/productos_es/product_cm_wo_validate_04.png)

</div>

</TabItem>
<TabItem value="mobile" label="Versión Móvil">

<div className="img_sizing_extra_small">

![close](/img/productos_es/product_cm_wo_validate_04m.png)

</div>

</TabItem>
</Tabs>

## Siguientes Pasos {#next-steps}
De forma opcional, al validar el cierre de la orden de trabajo se podrá enviar [**Feedback**](/docs/products/corrective_maintenance/actions/wo_feedback), es decir un formulario de evaluación sobre el trabajo completado.

Si el trabajo realizado no fue aceptado y se volvió al estado **Pendiente**, entonces se podrá volver a solicitar a [**cerrar la orden de trabajo**](/docs/products/corrective_maintenance/actions/wo_close). 
