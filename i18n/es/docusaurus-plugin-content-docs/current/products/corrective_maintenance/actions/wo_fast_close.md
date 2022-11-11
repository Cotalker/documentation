---
title: Cierre Rápido
---

import useBaseUrl from '@docusaurus/useBaseUrl'; 
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Resumen {#overview}
Una orden de trabajo puede ser cerrada rápidamente, es decir, se pueden saltar los pasos de informe detallado del cierre y su validación.

Una vez que se envíe este _cierre rápido_, la orden de trabajo será cambiada a _cerrada_.
Se asumirá que el problema fue resuelto y no se incurrieron en costos.

## Requisitos {#requirements}

<details>
<summary>Tipo de Órdenes de Trabajo</summary>
<div>

Sólo los siguientes _tipos_ de órdenes de trabajo incluyen esta opción:
-	**Normativo**: Orden de Trabajo creada manualmente.
-	**Correctivo**: Orden de Trabajo creada automáticamente a través de un aviso de mantenimiento correctivo.

</div>
</details>

<details>
<summary>Estado</summary>
<div>

Sólo las órdenes de trabajo, _normativas_ o _correctivas_, que están en el estado **Reportado** tienen esta opción.

</div>
</details>

<details>
<summary>Usuario</summary>
<div>

Cumpliéndose los requisitos de _tipo_ y _estado_ de la orden de trabajo, sólo los usuarios con uno de los siguientes cargos podrá acceder a esta opción:  
`supervisor`, `administrador` o `jefe`

</div>
</details>



## Pasos para Cierre Rápido {#steps}

<Tabs>
<TabItem value="desktop" label="Escritorio" default>

1.	Seleccionar **Órdenes de Trabajo** desde el _menú principal_.
2.	Seleccionar la _orden de trabajo_ correspondiente en la sección **Reportado**.
3.	Apretar el _botón de acciones_.
4.	Seleccionar **Cierre Rápido** desde el menú de _acciones_.

<div className="img_sizing">

![results](/img/productos_es/product_cm_fast_close_01.png)

</div>

5.	Rellenar el formulario que aparece en el área de trabajo.


<div className="img_sizing_small">

![results](/img/productos_es/product_cm_fast_close_02.png)

</div>

</TabItem>
<TabItem value="mobile" label="Versión Móvil">

1.	Seleccionar **Órdenes de Trabajo** desde el _menú principal_.
2.	Seleccionar la _orden de trabajo_ correspondiente en la sección **Reportado**.
3.	Apretar el _botón de acciones_.
4.	Seleccionar **Cierre Rápido** desde el menú de acciones.
5.	Rellenar el formulario que aparece en el área de trabajo.

<div className="img_sizing_narrow">

![results](/img/productos_es/product_cm_fast_close_01m.png)

</div>

</TabItem>
</Tabs>

## Resultados Esperados {#results}
Al enviar el formulario, la orden de trabajo pasará directamente al estado **Cerrado**.

Al hacer el _cierre rápido_, debería aparecer un mensaje de sistema como el señalado abajo:

<div className="img_sizing">

![results](/img/productos_es/product_cm_fast_close_03.png)

</div>

_En el ejemplo señalado abajo, se ve que la orden de trabajo ha pasado al estado **Cerrado**._

<Tabs>
<TabItem value="desktop" label="Escritorio" default>

<div className="img_sizing">

![results](/img/productos_es/product_cm_fast_close_04.png)

</div>

</TabItem>
<TabItem value="mobile" label="Versión Móvil">

<div className="img_sizing_extra_small">

![results](/img/productos_es/product_cm_fast_close_04m.png)

</div>

</TabItem>
</Tabs>

## Pasos Siguientes {#next steps}
Con el _Cierre Rápido_ se concluye el ciclo de vida la orden de trabajo. No hay formulario de [_Feedback_]( /docs/products/corrective_maintenance/actions/wo_feedback) como cuando se cierre la orden de trabajo normalmente.

Paralelamente, en los casos que corresponda, se cierra de forma automática el [_aviso_](/docs/products/corrective_maintenance/actions/create_notification) que generó la orden de trabajo.

:::info Pasos Alternativos
En vez de hacer un _cierre rápido_ durante el estado _Reportado_, los _supervisores_, _administradores_ y _jefes_ podrán además:
- [**Aceptar la Orden de Trabajo**](/docs/products/corrective_maintenance/actions/wo_accept) para permitir al personal de mantenimiento gestionarla.
- Hacer una [**Solicitar de Rechazo**](/docs/products/corrective_maintenance/actions/wo_reject_request) para cerrar la orden sin completar el trabajo.
:::