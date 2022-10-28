---
title: 📦 Órdenes de Compra
displayed_sidebar: products
---

import useBaseUrl from '@docusaurus/useBaseUrl'; 

<span className="hero__title">Resumen del Producto</span>
<br/>

<img alt="purchase orders" className="img_sizing item shadow--tl" src={useBaseUrl('img/productos_es/product_purchase_overview_00.png')} />
<br/>

## ¿Qué puedo hacer con Órdenes de Compra? {#what}

**Órdenes de Compra** es un producto que te permite eliminar el papeleo y automatizar todo el proceso de solicitud, autorización, recepción y registro de compras.

- Involucra automáticamente a los stakeholders de la empresa en el proceso.
- Diseña estrategias de liberación y programa niveles de liberación según montos, áreas de la empresa y liberadores.
- Con formularios que están conectados a sus datos maestros, crea órdenes de compra que incluyen detalles del proveedor, artículos, costos y firmas de aprobación del liberador.
- Las órdenes de compra son enviadas automáticamente a proveedores una vez que son aprobadas.
- Registra recepciones totales o parciales de bienes y servicios.
- Las recepciones parciales registradas se descuentan del total previsto, permitiendo posteriores recepciones de bienes o servicios previstos.
- Registra facturas y detalles de facturación.
- El registro de la factura y los detalles de facturación están conectados con la orden de compra original y el registro de la recepción, lo que ayuda a controlar los pagos de las recepciones parciales.

## ¿Cómo funciona? {#how}
El Órdenes de Compra, en cuanto producto, consta de un solo flujo de trabajo.

<img alt="workflow" className="img_sizing" src={useBaseUrl('img/productos_es/product_purchase_overview_01.png')} />
<br/>

- El flujo comienza con la **creación de una orden de compra** por parte de un usuario autorizado. El formulario de creación de órdenes de compra está conectado con datos maestros, lo que permite a los usuarios seleccionar entre proveedores, bienes y servicios designados.
- Dependiendo del costo de la compra, el área de la empresa y la estrategia de liberación preestablecida, la _orden de compra_ se envía al liberador de primer nivel del área. (Si el costo está por debajo del monto del primer nivel programado, la _orden de compra_ se aprueba automáticamente y se envía al proveedor).
- Si la _orden de compra_ fue aprobada por el liberador de primer nivel y sus costos están por debajo del valor de segundo nivel, entonces la _orden de compra_ se envía automáticamente al proveedor. Pero, si la _orden de compra_ aprobada es igual o superior al valor de liberación de segundo nivel, entonces el liberador de segundo nivel del área debe aprobarla antes de que pueda enviarse al proveedor.
- El mismo proceso se sigue para una liberación de tercer nivel si fuera necesario.
- Una vez que el proveedor ha proporcionado los bienes o servicios, un _recepcionista_, declara recibidos los bienes o servicios al momento de la inspección.
- En caso de que el proveedor no suministró todos los bienes o servicios esperados, se puede declarar una recepción parcial de bienes o servicios. Si el proveedor envía más de una entrega parcial, todos los recibos se registran y se descuentan del total esperado.
- Luego de que el proveedor proporcione una factura, incluso si es una factura por la parcialidad de los bienes o servicios esperados, el usuario correspondiente puede registrar la factura y los detalles de facturación.
- Los datos de facturación se conectan con los datos maestros, la _orden de compra_ y el registro de bienes y servicios recibidos, permitiendo un control sobre los bienes o servicios esperados y recibidos, pagos parciales y totales, junto con un detalle de la información bancaria del proveedor.
- Una vez registrados y pagados todos los bienes y servicios recibidos, se puede cerrar el flujo de trabajo.

## Detalles del Flujo {#workflow}
_Para obtener detalles y ejemplos detallados del producto, consulte la siguiente información:_

<div className="container">
<div className="row">

<div className="col col--12 margin-bottom--lg">
<a className="card2 padding--lg cardContainer_qNfC" href="/docs/products/purchase_order_product/workflow_overview">

<span className="hero__subtitle"><b>📦 Flujo de Órdenes de Compra</b></span> 

El **flujo de trabajo de Órdenes de Compra** es la esencia del _producto de Órdenes de Compra_. En esta sección, puede descubrir y obtener más información sobre ejemplos de casos de uso, configuración de flujos de trabajo, automatizaciones, datos maestros, formularios de encuestas, estrategias de lanzamiento y participación de las partes interesadas.

</a>
</div>
</div>
</div>
<br/>
