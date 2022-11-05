---
title: Crear un Aviso
displayed_sidebar: products_landing
---

import useBaseUrl from '@docusaurus/useBaseUrl'; 
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Resumen {#overview}
Por medio de un formulario, [usuarios](/docs/products/corrective_maintenance/master_data/users) pueden crear **avisos** que alertan supervisores de fallas en equipos o activos e inician un proceso de mantenimiento correctivo.  

## Requisitos {#requirements}
<details>
<summary>Usuario</summary>
<div>

El [**usuario**](/docs/products/corrective_maintenance/master_data/users) debe tener, al menos, las siguientes características:
- [**Cargo**](/docs/products/corrective_maintenance/master_data/job_title): `Levantador`, `Supervisor`, `Jefe`, `Administrador` o `Técnico`
- [**Puestos de trabajo**](/docs/products/corrective_maintenance/master_data/workstation): _Según corresponda al sector de equipamiento en que se encuentra el activo o equipo._

</div>
</details>

<details>
<summary>Equipo</summary>
<div>

El [**equipo**](/docs/products/corrective_maintenance/master_data/equipment) que ha sufrido un incidente debe estar correctamente agregado a la data maestra. El _equipo_ debe estar también asociado a lo siguiente:
- [**Sectores de Equipamiento**](/docs/products/corrective_maintenance/master_data/equipment_sector): Los sectores de equipamiento agrupan equipos según criterios funcionales, relativos al proceso o espaciales. Por defecto, existen tres niveles de sectores de equipamientos.
- [**Fallas**](/docs/products/corrective_maintenance/master_data/failure_catalog): Descripción de la avería específica de cómo puede fallar un equipo según su grupo. Las fallas que se pueden reportar deben estar asociadas a _grupo de fallas_, _causas_, _síntomas_ y _prioridad_. 

</div>
</details>

## Pasos para Crear un Aviso {#steps}

<Tabs>
<TabItem value="desktop" label="Escritorio" default>

1. Seleccionar Aviso.

<!-- <span className="hero__subtitle"><b>1. Seleccionar Aviso.</b></span>
<br/>
<br/> -->

<div className="margin-left--lg">

![first-step](/img/productos_es/products_cm_create_notification_01.png)

:::note Nota
_La sección **Aviso** se encuentra en el menú principal, normalmente dentro de **Mantención**._
:::

</div>
<br/>

2. Apretar el botón de acciones.

<!-- <span className="hero__subtitle"><b>2. Apretar el botón de acciones.</b></span>
<br/>
<br/> -->

<div className="margin-left--lg">

![second-step](/img/productos_es/products_cm_create_notification_02.png)

</div>
<br/>

3. Apretar el botón Crear Aviso.

<!-- <span className="hero__subtitle"><b>3. Apretar el botón Crear Aviso.</b></span>
<br/>
<br/> -->

<div className="margin-left--lg">

![third-step](/img/productos_es/products_cm_create_notification_03.png)

</div>
<br/>

4. Rellenar y enviar el formulario.

<!-- <span className="hero__subtitle"><b>4. Rellenar y enviar el formulario.</b></span>
<br/>
<br/> -->

<div className="margin-left--lg">

![fourth-step](/img/productos_es/products_cm_create_notification_04.png)

:::note Más detalles
📋 [Formulario Crear Nuevo Aviso](/docs/products/corrective_maintenance/forms/form_notify)
:::

</div>
<br/>
 
</TabItem>

<TabItem value="mobile" label="Versión Móvil">

1. Seleccionar **Aviso** bajo **Mantención** en el _menú principal_.
2. Apretar el _botón de acciones_.
3. Apretar el botón **Crear Aviso**.
4. Rellenar y enviar el formulario.

<div className="align-center">

![aviso](/img/productos_es/product_cm_notification_01m.png)

</div>

:::note Más detalles
📋 [Formulario Crear Nuevo Aviso](/docs/products/corrective_maintenance/forms/form_notify)
:::

</TabItem>
</Tabs>

## Resultados Esperados {#results}
Al enviar el **Aviso**, se genera automáticamente la orden de trabajo correspondiente con toda la información entregada. Esta aparece como _Reportada_ en la sección _Órdenes de Trabajo_.

Personal administrativo y de mantenimiento son agregados al flujo.

<Tabs>
<TabItem value="desktop" label="Escritorio" default>

<div className="img_sizing">

![fifth-step](/img/productos_es/products_cm_wo_00.png)

</div>

</TabItem>
<TabItem value="mobile" label="Versión Móvil">

<div className="img_sizing_50">

![results](/img/productos_es/products_cm_wo_00a.png)

</div>

</TabItem>
</Tabs>

## Siguientes pasos {#next-steps}
Según sus cargos, los usuarios podrán realizar las siguientes acciones después de que el aviso fue creado y la orden de trabajo generada:
- _Técnico_: Indica si va a [**aceptar la orden de trabajo**](/docs/products/corrective_maintenance/actions/wo_accept) o no.  
- _Supervisor_, _Administrador_, _Jefe_: Pueden hacer un [**cierre rápido**](/docs/products/corrective_maintenance/actions/wo_fast_close) o hacer una [**solicitud de rechazo**](/docs/products/corrective_maintenance/actions/wo_reject_request) respecto a la orden.



<!-- ## Temas relacionados {#related}
- [**Mantenimiento Correctivo**](/docs/products/corrective_maintenance/landing/overview). Producto que conduce y conecta a los usuarios en un proceso de mantenimiento correctivo.
- [**Aceptar Orden de Trabajo**](/docs/products/corrective_maintenance/actions/wo_accept): Personal de mantenimiento acepta la orden de trabajo.
- [**Cierre Rápido**](/docs/products/corrective_maintenance/actions/wo_fast_close): Utilizado para cerrar la tarea inmediatamente indicando que se completó exitosamente.
- [**Solicitud de Rechazo**](/docs/products/corrective_maintenance/actions/wo_reject_request): Petición para descartar la tarea por falta de tiempo o por ser innecesaria. -->