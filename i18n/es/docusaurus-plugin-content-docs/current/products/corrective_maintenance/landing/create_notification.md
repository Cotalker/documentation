---
title: Crear un Aviso
displayed_sidebar: products_landing
---

import useBaseUrl from '@docusaurus/useBaseUrl'; 
import Related, {toc as Title1TOC} from '/i18n/es/docusaurus-plugin-content-docs/current/products/corrective_maintenance/landing/_relatedTopics.mdx'; 
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Resumen {#overview}
Por medio de un formulario, [usuarios](/docs/products/corrective_maintenance/master_data/users) pueden crear **avisos** que alertan supervisores de fallas en equipos o activos e inician un proceso de mantenimiento correctivo.  

## Requisitos {#requirements}
El [usuario](/docs/products/corrective_maintenance/master_data/users) debe tener, al menos, las siguientes características:
- [**Cargo**](/docs/products/corrective_maintenance/master_data/job_title): `Levantador`, `Supervisor`, `Jefe`, `Administrador` o `Técnico`
- [**Puestos de trabajo**](/docs/products/corrective_maintenance/master_data/workstation): _Según corresponda al sector de equipamiento._

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

1. Seleccionar Aviso.

<!-- <span className="hero__subtitle"><b>1. Seleccionar Aviso.</b></span>
<br/>
<br/> -->

<div className="margin-left--lg">
<div className="row">
<div className="col col--6">
<img alt="first step" className="img_sizing_small shadow--tl" src={useBaseUrl('/img/productos_es/products_cm_create_notification_mobile_01.png')} />
<br/>
</div>
<div className="col col--6">

:::note Nota
_La sección **Aviso** se encuentra en el menú principal, normalmente dentro de **Mantención**._
:::

</div>
</div>
</div>
<br/>

2. Apretar el botón de acciones.

<!-- <span className="hero__subtitle"><b>2. Apretar el botón de acciones.</b></span>
<br/>
<br/> -->

<div className="margin-left--lg">
<div className="row">
<div className="col col--6">
<img alt="second step" className="img_sizing_small shadow--tl" src={useBaseUrl('/img/productos_es/products_cm_create_notification_mobile_02.png')} />
<br/>
</div>
</div>
</div>
<br/>

3. Apretar el botón Crear Aviso.

<!-- <span className="hero__subtitle"><b>3. Apretar el botón Crear Aviso.</b></span>
<br/>
<br/> -->

<div className="margin-left--lg">
<div className="row">
<div className="col col--6">
<img alt="thrid step" className="img_sizing_small shadow--tl" src={useBaseUrl('/img/productos_es/products_cm_create_notification_mobile_03.png')} />
<br/>
</div>
</div>
</div>
<br/>

4. Rellenar y enviar el formulario.

<!-- <span className="hero__subtitle"><b>4. Rellenar y enviar el formulario.</b></span>
<br/>
<br/> -->

<div className="margin-left--lg">
<div className="row">
<div className="col col--6">
<img alt="fourth step" className="img_sizing_small shadow--tl" src={useBaseUrl('/img/productos_es/products_cm_create_notification_mobile_04.png')} />
<br/>
</div>
<div className="col col--6">

:::note Más detalles
📋 [Formulario Crear Nuevo Aviso](/docs/products/corrective_maintenance/forms/form_notify)
:::

</div>
</div>
</div>
<br/>

</TabItem>
</Tabs>

## Resultados Esperados {#results}
Al crear el **Aviso**, éste aparece en la vista de tareas bajo la sección **Reportados**.

El **Aviso** es compartido inmediatamente con personal de supervisión para su aprobación.

_Versión de escritorio:_

<div className="margin-left--lg">


![fifth-step](/img/productos_es/products_cm_create_notification_05.png)

</div>
<br/>

_Versión móvil:_

<img alt="fifth step" className="img_sizing_50 shadow--tl" src={useBaseUrl('/img/productos_es/products_cm_create_notification_mobile_05.png')} />
<br/>

:::info Siguiente paso
☞ El personal de supervisión o administración debe [**validar el aviso**](/docs/products/corrective_maintenance/landing/validate_notification).
:::


## Temas relacionados {#related}
<Related/>