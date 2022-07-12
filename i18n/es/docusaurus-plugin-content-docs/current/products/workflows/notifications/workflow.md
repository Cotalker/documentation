---
title: Flujo de Trabajo de Notificaciones
sidebar_label: Descripción del Flujo de Trabajo
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<span className="hero__title">Descripción del Flujo de Trabajo</span>
<br/>
<br/>

<div className="container">
<div className="row">
<div className="col col--6">

<img alt="notifications" className="img_sizing_narrow" src={useBaseUrl('img/products/products_notifications_workflow_00.png')} />
<br/>

</div>
<div className="col col--6">

<span className="hero__subtitle">Estados de flujo de trabajo (pasos del proceso):</span>

1. **Reportado**: El formulario _Informar nuevo incidente_ ha sido enviado por un trabajador de campo indicando una falla que requiere mantenimiento.
2. **En proceso**: Un supervisor ha validado el informe. Luego de esto, el supervisor puede enviar las órdenes de trabajo correspondientes que inician flujos de trabajo paralelos que abordan el incidente notificado.
3. **Tareas completadas**: después de que los trabajadores de mantenimiento hayan cerrado las órdenes de trabajo, los supervisores pueden poner la _notificación_ en el estado _Tareas completadas_, finalizando así el proceso de flujo de trabajo.
4. **Rechazado**: Después de que se haya enviado la _notificación_, es decir, durante el estado de flujo de trabajo _Reportado_, los supervisores también pueden optar por rechazar el incidente, poniendo la _notificación_ en el estado _Rechazado_, finalizando así el proceso de flujo de trabajo.

</div>
</div>
</div>