---
title: Respuesta a Solicitud de Rechazo
---

import useBaseUrl from '@docusaurus/useBaseUrl'; 
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Resumen {#overview}
Después de [_solicitar el rechazo_](/docs/products/corrective_maintenance/actions/wo_reject_request) a una orden de trabajo, un [_usuario_](/docs/products/corrective_maintenance/master_data/users) autorizado tendrá que responder aceptando o rechazando la solicitud.

## Requisitos {#requirements}

<details>
<summary>Estado</summary>
<div>

Esta opción está sólo disponible cuando la orden de trabajo está en el estado **Pendiente a Rechazo**.

</div>
</details>

<details>

<summary>Usuario</summary>
<div>

Sólo los [_usuarios_](/docs/products/corrective_maintenance/master_data/users) con los [_cargos_](/docs/products/corrective_maintenance/master_data/job_title) `administrador` o `jefe` podrán responder a la _solicitud de rechazo_.

</div>
</details>

## Pasos para Responder a la Solicitud {#steps}

<Tabs>
<TabItem value="desktop" label="Escritorio" default>

1.	Seleccionar **Órdenes de Trabajo** desde el _menú principal._
2.	Seleccionar la _orden de trabajo_ correspondiente en la sección **Pendiente a Rechazo**.
3.	Apretar el _botón de acciones_.

<div className="img_sizing">

![request](/img/productos_es/product_cm_wo_reject_response_01.png)

</div>

4.	Rellenar el formulario que aparece en el área de trabajo.

<div className="img_sizing_small">

![request](/img/productos_es/product_cm_wo_reject_response_02.png)

</div>

</TabItem>
<TabItem value="mobile" label="Versión Móvil">

1.	Seleccionar **Órdenes de Trabajo** desde el _menú principal._
2.	Seleccionar la _orden de trabajo_ correspondiente en la sección **Pendiente a Rechazo**.
3.	Apretar el _botón de acciones_.
4.	Rellenar el formulario que aparece en el área de trabajo.

<div className="img_sizing">

![request](/img/productos_es/product_cm_wo_reject_response_01m.png)

</div>

</TabItem>
</Tabs>


## Resultados Esperados {#results}
Si la solicitud _es_ aceptada, la orden de trabajo pasa al estado **Rechazado**.

_Después de enviar el formulario, debería aparecer un mensaje del sistema similar al de abajo:_

<div className="img_sizing_small">

![request](/img/productos_es/product_cm_wo_reject_response_03.png)

</div>

Si la solicitud de rechazo _no es_ aceptada, el formulario cambia para reasignar la tarea y modificar las condiciones. 

_Al seleccionar **no**, el formulario presenta nuevas preguntas como es señalizado en la imagen abajo:_

<div className="img_sizing_small">

![request](/img/productos_es/product_cm_wo_reject_response_03a.png)

</div>

_Abajo aparece la orden de trabajo en el estado **Rechazado** en caso de que fue aceptada la solicitud:_

<Tabs>
<TabItem value="desktop" label="Escritorio" default>

<div className="img_sizing">

![request](/img/productos_es/product_cm_wo_reject_response_04.png)

</div>

</TabItem>
<TabItem value="mobile" label="Versión Móvil">

<div className="img_sizing_extra_small">

![request](/img/productos_es/product_cm_wo_reject_response_04m.png)

</div>

</TabItem>
</Tabs>

## Siguientes Pasos {#next-steps}
Si la [_solicitud de rechazo_](/docs/products/corrective_maintenance/actions/wo_reject_request) **es aceptada**, entonces la orden de trabajo ha llegado a su fin. Si un [_aviso_](/docs/products/corrective_maintenance/actions/create_notification) creó la orden de trabajo, éste pasa al estado **Rechazado**.

Si la [_solicitud de rechazo_](/docs/products/corrective_maintenance/actions/wo_reject_request) **no fue aceptada**, entonces la orden vuelve al estado **Reportado**, donde los usuarios involucrados, según su cargo, podrán:
- [**Aceptar la Orden de Trabajo**](/docs/products/corrective_maintenance/actions/wo_accept) para permitir al personal de mantenimiento gestionarla.
- Hacer un [**Cierre Rápido**](/docs/products/corrective_maintenance/actions/wo_fast_close), saltándose la etapa de validación.
- Hacer una [**Solicitar de Rechazo**](/docs/products/corrective_maintenance/actions/wo_reject_request) para cerrar la orden sin completar el trabajo.
