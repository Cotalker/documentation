---
title: Validar Aviso
displayed_sidebar: products_landing
---

import useBaseUrl from '@docusaurus/useBaseUrl'; 
import Related, {toc as Title1TOC} from '/i18n/es/docusaurus-plugin-content-docs/current/products/corrective_maintenance/landing/_relatedTopics.mdx'; 
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Resumen {#overview}
Cada vez que un [Aviso](/docs/products/corrective_maintenance/landing/create_notification) es creado, un _usuario_ con perfil de supervisor es alertado y asignado a la _tarea_.  

Desde el canal de la _tarea_, el supervisor puede revisar los detalles del Aviso.  

Si el _aviso_ no corresponde o ya ha sido reportado, se puede descartar, enviándolo al final del flujo de trabajo.  

Si el _aviso_ requiere mantenimiento, entonces se puede crear una orden de trabajo que es enviada al personal de mantenimiento.

## Requisitos {#requirements} 
El usuario debe tener, al menos, los siguientes características:  
**Cargo**: `Supervisor`, `Jefe` o `Administrador`  
**Puesto de Trabajo**: _Según corresponda al equipamiento._  

## Pasos para Validar Aviso {#steps}

<Tabs>
<TabItem value="desktop" label="Escritorio" default>

1. Selecciona el aviso.

<!-- <span className="hero__subtitle"><b>1. Seleccionar Aviso</b></span>
<br/>
<br/> -->

<div className="margin-left--lg">

**<span className="badge badge--warning">a.</span>** Apretar **Aviso** desde el _Menu Principal_. Esto abrirá la vista de _avisos_.  
**<span className="badge badge--warning">b.</span>** Seleccionar el _Aviso_ reportado. El panel de trabajo de la tarea se abrirá.  
**<span className="badge badge--warning">c.</span>** Revisa el _Aviso_ desde el panel de trabajo.  

![first-step](/img/productos_es/products_cm_validate_notification_01.png)

</div>
<br/>

2. Presiona el botón de acciones.

<!-- <span className="hero__subtitle"><b>2. Apretar botón de acciones </b></span>
<br/>
<br/> -->

<div className="margin-left--lg">

![second-step](/img/productos_es/products_cm_validate_notification_02.png)

</div>
<br/>

3. Selecciona una opción.

<div className="margin-left--lg">

**<span className="badge badge--danger">A.</span>** Si se pretende dar solución al _aviso_, selecciona _Crear una Orden de Trabajo_. (3.1)  
**<span className="badge badge--danger">B.</span>** Si se ha optado por rechazar el _aviso_, selecciona _Rechazar el Aviso_. (3.2)  

<div className="img_sizing_small">

![opciones](/img/productos_es/products_cm_validate_notification_02a.png)

</div>

</div>

- 3.1 Presiona _Crear una Orden de Trabajo_ y rellena el formulario que aparece.

<!-- <span className="hero__subtitle"><b>2.1 Crear una Orden de Trabajo</b></span>
<br/>
<br/> -->

<div className="margin-left--lg">

<div className="img_sizing_small">

<!-- ![second-first-step](/img/productos_es/products_cm_validate_notification_02-1.png) -->

![create wo form](/img/productos_es/products_cm_validate_notification_02-1a.png)

</div>
</div>
<br/>

_o bien:_

- 3.2 Presiona _Rechazar Aviso_ y rellena el formulario que aparece.

<!-- <span className="hero__subtitle"><b>2.2 Rechazar el Aviso</b></span>
<br/>
<br/> -->

<div className="margin-left--lg">

<div className="img_sizing_small">

<!-- ![second-second-step](/img/productos_es/products_cm_validate_notification_02-2.png) -->

![reject form](/img/productos_es/products_cm_validate_notification_02-2a.png)

</div>
</div>
<br/>

</TabItem>
<TabItem value="mobile" label="Versión Móvil">
    
</TabItem>
</Tabs>

## Resultado Esperado {#results}

<div className="margin-left--lg">

**<span className="badge badge--danger">A.</span>** Avisos que son aceptados y se crea su orden de trabajo respectiva, pasa al estado _En proceso_.  
**<span className="badge badge--danger">B.</span>** Avisos que son rechazados van al final del flujo de trabajo y catalogados como rechazados.

![expected result](/img/productos_es/products_cm_validate_notification_03.png)

</div>

:::note Nota
Las _órdenes de trabajo_ creadas inician un nuevo flujo de trabajo que incluye personal de mantenimiento y supervisores.
:::

## Temas Relacionados {#related}

<Related/>