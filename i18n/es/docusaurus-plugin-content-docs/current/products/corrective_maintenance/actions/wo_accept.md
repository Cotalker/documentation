---
title: Aceptar Orden de Trabajo
displayed_sidebar: products_landing
---

import useBaseUrl from '@docusaurus/useBaseUrl'; 
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

import Related, {toc as Title1TOC} from '/i18n/es/docusaurus-plugin-content-docs/current/products/corrective_maintenance/landing/_relatedTopics.mdx'; 
import Configuration, {toc as Title2TOC} from '/i18n/es/docusaurus-plugin-content-docs/current/products/corrective_maintenance/landing/_configurationTopics.mdx'; 

## Resumen {#overview}
Una vez que un [**aviso**](/docs/products/corrective_maintenance/actions/create_notification) de mantenimiento es creado, una _orden de trabajo_ es generada automáticamente y entra en el estado _Reportado_. Todo el personal de mantenimiento relacionado con el equipo que presenta una falla es agregada al flujo de la _orden de trabajo_. El personal de mantenimiento puede elegir _aceptar_ o _rechazar_ la orden de trabajo a través del formulario **Aceptar la orden de trabajo**.

## Requisitos {#requirements}

<details>
<summary>Usuario</summary>
<div>

El sistema se encargará de agregar automáticamente a la _orden de trabajo_ a todos los [_usuarios_](/docs/products/corrective_maintenance/master_data/users) con el [_puesto de trabajo_](/docs/products/corrective_maintenance/master_data/workstation) y [_cargos_](/docs/products/corrective_maintenance/master_data/job_title) correspondientes.

#### Cargos {#job-titles}
Sólo los [_usuarios_](/docs/products/corrective_maintenance/master_data/users) con los siguientes [_cargos_](/docs/products/corrective_maintenance/master_data/job_title) podrán estar en esta etapa y enviar el formulario para aceptar o rechazar la orden de trabajo:  
`supervisor`, `técnico`, `jefe` o `administrador`

####  Puesto de Trabajo {#workstation}
Los usuarios con los cargos de _supervisor_ o _técnico_ tienen que además estar asociados al [_puesto de trabajo_](/docs/products/corrective_maintenance/master_data/workstation) en que se encuentra el [_equipo_](/docs/products/corrective_maintenance/master_data/equipment) que ha fallado. 

Por su parte, los usuarios con los cargos de _administrador_ o _jefe_ no necesitan estar asociados al _puesto de trabajo_ ni a la orden de trabajo.



</div>
</details>


## Pasos para Aceptar una Orden de Trabajo {#steps}

<Tabs>
<TabItem value="desktop" label="Escritorio" default>

1. Seleccionar **Órdenes de Trabajo** desde el _menú principal_.
2. Seleccionar la _orden de trabajo_ correspondiente en la sección **Reportado**.
3. Apretar el _botón de acciones_.
4. Seleccionar **Aceptar la orden de trabajo** desde el menú de _acciones_.

<div className="img_sizing">

![accept](/img/productos_es/products_cm_wo_accept_01.png)

</div>

5. Rellenar el formulario que aparece en el área de trabajo.

<div className="img_sizing_small">

![accept](/img/productos_es/products_cm_wo_accept_02.png)

</div>

</TabItem>
<TabItem value="mobile" label="Versión Móvil">

1. Seleccionar **Órdenes de Trabajo** desde el _menú principal_.
2. Seleccionar la _orden de trabajo_ correspondiente en la sección **Reportado**.
3. Apretar el _botón de acciones_.
4. Seleccionar **Aceptar la orden de trabajo** desde el menú de _acciones_.
5. Rellenar el formulario que aparece en el área de trabajo.

<div className="align-center">

![accept](/img/productos_es/products_cm_wo_accept_01m.png)

</div>


</TabItem>
</Tabs>

## Resultados Esperados {#results}
El primer usuario en aceptar la orden es asignado a la tarea de mantenimiento y tendrá que cerrar la orden una vez que el trabajo es completado.
Al ser aceptada, la orden de trabajo pasa al siguiente estado (_Pendiente_). 

El resto del personal de mantenimiento a quien le llegó la orden de trabajo son removidos del flujo, quedando sólo el trabajador asignado y supervisores.

Cuando un usuario rechaza la orden de trabajo, éste es removido del flujo. La orden de trabajo sigue abierta, dando a los otros usuarios la posibilidad de aceptarla.

_En el ejemplo señalado abajo, la orden de trabajo ha pasado al estado **Pendiente**._

<Tabs>
<TabItem value="desktop" label="Escritorio" default>

<div className="img_sizing">

![results](/img/productos_es/products_cm_wo_accept_03.png)

</div>

</TabItem>
<TabItem value="mobile" label="Versión Móvil">

<div className="img_sizing_extra_small">

![results](/img/productos_es/products_cm_wo_accept_03m.png)

</div>

</TabItem>
</Tabs>

## Siguientes Pasos {#next-steps}

Después de aceptar la orden, los usuarios involucrados en el flujo podrán [**cerrar la orden**](/docs/products/corrective_maintenance/actions/wo_close) y luego esperar su [**validación**](/docs/products/corrective_maintenance/actions/wo_validate).


:::info Pasos Alternativos
En vez aceptar o rechazar la orden a través del formulario visto arriba, los _supervisores_, _administradores_ y _jefes_ podrán además:
- Hacer un [**Cierre Rápido**](/docs/products/corrective_maintenance/actions/wo_fast_close), saltándose la etapa de validación.
- Hacer una [**Solicitar de Rechazo**](/docs/products/corrective_maintenance/actions/wo_reject_request) para cerrar la orden sin completar el trabajo.
:::

