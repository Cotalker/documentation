---
title: Mantenimiento Preventivo
displayed_sidebar: products
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<span className="hero__title">Resumen del Producto</span>
<br/>
<br/>

<img alt="preventive maintenance" className="img_sizing item shadow--tl" src={useBaseUrl('/img/productos_es/products_preventive_maintenance_00.png')} />
<br/>

## ¿Por qué utilizar nuestro producto de Mantenimiento Preventivo? {#why}
Es mejor prevenir que lamentar. Con el producto de **Mantenimiento Preventivo** de Cotalker, podrá realizar todos sus controles de mantenimiento de rutina al día. Elija entre métricas de tiempo o valor para activar notificaciones de mantenimiento. Una vez que se alcanza el tiempo o valor determinados, se envía automáticamente una orden de trabajo al personal de mantenimiento y/o contratistas externos.


## ¿Cómo funciona? {#how}
**Mantenimiento Preventivo** tiene dos tipos de _planes preventivos_ para que se mantenga al día en todas sus tareas de mantenimiento. Los planes se pueden configurar para realizar mantenimiento guiado por métricas de tiempo o valores predeterminados. Cuando se cumplen las métricas de mantenimiento, se activa el flujo de _órdenes de trabajo_.

### Plan de Tiempo {#time}
Por ejemplo, si una máquina requiere mantenimiento cada día, se puede configurar el plan para activarse diariamente. Cada 24 horas se iniciará el [flujo de órdenes de trabajo](/docs/products/workflows/work_orders/related-product/pm/overview_intro). Se enviará automáticamente una orden de trabajo al contratista o al personal de mantenimiento. Si eligen aceptar la orden de trabajo, pueden enviar una cotización, enviar mensajes a las partes interesadas y solicitar cerrar la orden de trabajo. Para cerrar el flujo de trabajo, el supervisor debe evaluar el trabajo de mantenimiento completado e enviar el formulario de _Aceptación de trabajo_.

### Plan de Valor {#value}
Digamos que se quiere un plan para un vehículo que necesita mantenimiento cada 10.000 kilómetros. En este caso, se puede utilizar el plan de valor. Una vez que se crea el plan, el personal de mantenimiento utilizará periódicamente la aplicación para registrar métricas de valor, como el kilometraje o los niveles de un vehículo. Cuando el kilometraje registrado del automóvil alcance los 20.000 km, se activará el plan y preparará todo para la segunda revisión de mantenimiento del automóvil. En este punto, se iniciará el [flujo órdenes de trabajo](/docs/products/workflows/work_orders/related-product/pm/overview_intro) y se enviará una orden de trabajo a la persona a cargo del mantenimiento del automóvil.

## Flujos de Trabajo Involucrados {#workflows}
_Para más información, consulte los flujos de trabajo descritos abajo:_

<img alt="workflows" className="img_sizing" src={useBaseUrl('img/productos_es/products_preventive_maintenance_01.png')} />
<br/> 

<div className="container">
<div className="row">

<div className="col col--12 margin-bottom--lg">
<a className="card2 padding--lg cardContainer_qNfC" href="/docs/products/workflows/preventive_plans/overview">

<span className="hero__subtitle"><b>🧰 Planes Preventivos</b></span> 

Inicia un plan de tiempo o valor con el formulario **Crear un nuevo plan preventivo**. El formulario permite establecer todas las configuraciones del plan preventivo. Por ejemplo, asignar a los responsables de la tarea, agregar un checklist de mantenimiento, establecer la prioridad de la tarea y designar la frecuencia en función del tiempo o los valores del equipo.

</a>
</div>

<div className="col col--12 margin-bottom--lg">
<a className="card2 padding--lg cardContainer_qNfC" href="/docs/products/workflows/work_orders/related-product/pm/overview_intro">

<span className="hero__subtitle"><b>🧾 Flujo de Órdenes de Trabajo</b></span> 

Una vez que se alcanza el tiempo o valor indicado en el plan, se envía automáticamente una _orden de trabajo_ a las partes interesadas. Al recibir la orden de trabajo, los contratistas pueden revisar los detalles y decidir si aceptan o no el trabajo. Luego, los contratistas pueden enviar un formulario de _presupuesto_ que se comparte con las partes interesadas para su revisión. Los contratistas envían el formulario de _cierre de orden de trabajo_ al finalizar el trabajo para la aprobación del supervisor.

</a>
</div>

<div className="col col--12 margin-bottom--lg">
<a className="card2 padding--lg cardContainer_qNfC" href="/docs/products/workflows/budget_management/related-product/pm/overview">

<span className="hero__subtitle"><b>💲 Flujo de Cotizaciones</b></span> 

A través del formulario de cotización, contratistas pueden enviar cotizaciones automáticamente a los responsables en aprobar presupuestos. Los responsables, al revisar la cotización, la pueden aprobar o rechazar.

</a>
</div>

</div>
</div>
<br/>
