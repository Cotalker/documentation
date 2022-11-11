---
title: Solicitud de Rechazo
---

import useBaseUrl from '@docusaurus/useBaseUrl'; 
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Resumen {#overview}
[_Usuarios_](/docs/products/corrective_maintenance/master_data/users) autorizados pueden solicitar que una orden de trabajo sea rechazada y cerrar la orden completamente.

## Requisitos {#requirements}
<details>
<summary>Estado</summary>
<div>

Sólo se puede solicitar un _rechazo_ cuando una _orden de trabajo_ está en el estado **Reportado**.

</div>
</details>

<details>
<summary>Usuario</summary>
<div>

Sólo los[ _usuarios_](/docs/products/corrective_maintenance/master_data/users) con los [_cargos_](/docs/products/corrective_maintenance/master_data/job_title) de `supervisor`, `administrador` o `jefe` pueden solicitar un rechazo.

</div>
</details>

## Pasos para Solicitar Rechazo {#steps}

<Tabs>
<TabItem value="desktop" label="Escritorio" default>

1.	Seleccionar **Órdenes de Trabajo** desde el _menú principal_.
2.	Seleccionar la _orden de trabajo_ correspondiente en la sección **Reportado**.
3.	Apretar el _botón de acciones_.
4.	Seleccionar **Cierre Rápido** desde el menú de _acciones_.

<div className="img_sizing">

![request](/img/productos_es/product_cm_wo_reject_01.png)

</div>

5.	Rellenar el formulario que aparece en el área de trabajo.

<div className="img_sizing_small">

![request](/img/productos_es/product_cm_wo_reject_02.png)

</div>

</TabItem>
<TabItem value="mobile" label="Versión Móvil">

1.	Seleccionar **Órdenes de Trabajo** desde el _menú principal_.
2.	Seleccionar la _orden de trabajo_ correspondiente en la sección **Reportado**.
3.	Apretar el _botón de acciones_.
4.	Seleccionar **Cierre Rápido** desde el menú de _acciones_.
5.	Rellenar el formulario que aparece en el área de trabajo.

<div className="img_sizing">

![request](/img/productos_es/product_cm_wo_reject_01m.png)

</div>

</TabItem>
</Tabs>

## Resultados Esperados {#results}
Después de enviar la _solicitud de rechazo_, la orden de trabajo pasa al estado **Pendiente a Rechazo** a la espera de una [_respuesta_](/docs/products/corrective_maintenance/actions/wo_reject_accept).

Al solicitar el rechazo de la orden de trabajo, un mensaje similar al que aparece abajo es enviado al área del chat.

<div className="img_sizing">

![request](/img/productos_es/product_cm_wo_reject_03.png)

</div>

_En el ejemplo señalado abajo, se ve que la orden de trabajo ha pasado al estado **Pendiente a Rechazo**._

<Tabs>
<TabItem value="desktop" label="Escritorio" default>



<div className="img_sizing">

![request](/img/productos_es/product_cm_wo_reject_04.png)

</div>

</TabItem>
<TabItem value="mobile" label="Versión Móvil">

<div className="img_sizing_extra_small">

![request](/img/productos_es/product_cm_wo_reject_04m.png)

</div>

</TabItem>
</Tabs>

## Siguientes Pasos {#next-steps}
La solicitud debe ser ahora aceptada o rechazada a través de una [**respuesta**](/docs/products/corrective_maintenance/actions/wo_reject_accept) por parte de un usuario autorizado.


:::info Pasos Alternativos
En vez de hacer una _solicitud de rechazo_, durante el estado _Reportado_, se puede:
- [**Aceptar la Orden de Trabajo**](/docs/products/corrective_maintenance/actions/wo_accept) para permitir al personal de mantenimiento gestionarla.
- Hacer un [**Cierre Rápido**](/docs/products/corrective_maintenance/actions/wo_fast_close), saltándose la etapa de validación.
:::

