---
title: 🧾 Órdenes de Trabajo
displayed_sidebar: products
---

import useBaseUrl from '@docusaurus/useBaseUrl'; 

<img alt="corrective maintenance" className="img_sizing item shadow--tl" src={useBaseUrl('img/productos_es/products_work_orders_01.png')} />
<br/>

## ¿Qué es el Producto de Órdenes de Trabajo {#what-does}

Con el producto **Órdenes de trabajo**, puedes crear flujos de trabajo para sus _órdenes de trabajo_, lo que le permite tener control total sobre todo el proceso. En resumen, puede enviar formularios de órdenes de trabajo, ponerse en contacto con equipos de servicio o contratistas, comunicarse entre sí durante la operación, evaluar trabajos y cerrar órdenes de trabajo, todo en un solo lugar.

**Órdenes de trabajo**, como producto independiente, se compone del [Flujo de órdenes de trabajo](/docs/products/workflows/work_orders/related-product/wo/overview_intro) y el [Flujo de cotizaciones](/docs/products/workflows/budget_management/related-product/wo/overview).

:::note Nota
Los productos de [**Mantenimiento correctivo**](/docs/products/corrective_maintenance/landing/overview) y[ **Mantenimiento preventivo**](/docs/products/preventive_maintenance/pm_overview) incluyen **Órdenes de trabajo** en su proceso.
:::

## ¿Cómo funciona? {#how}

**Órdenes de trabajo** facilita el desarrollo de actividades. Como se indicó anteriormente, **Órdenes de trabajo** se puede usar de forma independiente o junto a otros productos de mantenimiento.

<img alt="corrective maintenance" className="img_sizing" src={useBaseUrl('img/productos_es/products_work_orders_00.png')} />
<br/>

_Ya sea que es utilizado independientemente o en conjunto con otros productos, el proceso es el siguiente:_

1. Se completa un formulario de _orden de trabajo_ dentro del flujo de trabajo de _Órdenes de trabajo_. Al enviar el formulario, se crea la orden de trabajo y se notifica al equipo encargado o a un contratista que se requiere de su servicio.
    1. Si se utiliza **Mantenimiento Correctivo**, primero se debe reportar y validar un incidente antes de crear la _orden de trabajo_.
    2. Si se utiliza **Mantenimiento Preventivo**, se puede generar y enviar una _orden de trabajo_ automáticamente en el momento en que corresponda hacer el mantenimiento.
2. Los destinatarios pueden revisar la _orden de trabajo_ y cualquier otra información compartida en el canal antes de decidir si aceptan o no la solicitud. Para notificar su decisión, debe enviar el formulario _Aceptar Orden de Trabajo_.
3. Enseguida pueden llenar el formulario _Nueva Cotización_ para enviar la cotización con los costos del servicio. Los responsables de los presupuestos pueden discutir los costos con los contratistas y decidir aprobar o no la cotización.
4. Una vez terminado el trabajo, el personal de mantenimiento puede solicitar cerrar la _orden de trabajo_.
5. Los supervisores deben entonces inspeccionar el trabajo realizado y dar su aprobación.
6. Después del cierre, los supervisores pueden enviar un formulario de evaluación que el equipo de mantenimiento también podrá ver.
7. Si se usa junto con otros productos, los respectivos flujos de trabajo continúan su propio proceso.

## Flujos de Trabajo Involucrados {#workflows}
_For more in-depth information, view the workflows that make up the Work Order product:_

<div className="container">
<div className="row">

<div className="col col--12 margin-bottom--lg">
<a className="card2 padding--lg cardContainer_qNfC" href="/docs/products/workflows/work_orders/related-product/wo/overview_intro">

<span className="hero__subtitle"><b>🧾 Flujo de Órdenes de Trabajo</b></span> 

Los supervisores comienzan enviando a los contratistas una _orden de trabajo_. En el canal de tareas los destinatarios pueden revisar los detalles y decidir si aceptan o no el trabajo. Luego, los contratistas pueden enviar un formulario de _presupuesto_ que se comparte con los responsables para su revisión. Los contratistas envían el formulario de _cierre de orden de trabajo_ al finalizar el trabajo para la aprobación del supervisor.  

</a>
</div>

<div className="col col--12 margin-bottom--lg">
<a className="card2 padding--lg cardContainer_qNfC" href="/docs/products/workflows/budget_management/related-product/wo/overview">

<span className="hero__subtitle"><b>💲 Flujo de Cotizaciones</b></span> 

Los contratistas envían cotizaciones automáticamente a los responsables desde el flujo de órdenes de trabajo al completar el formulario de cotización. Desde el canal, los responsables pueden revisar la cotización para aprobar o rechazarla.

</a>
</div>

</div>
</div>
<br/>


