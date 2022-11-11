---
title: Formulario
sidebar_label: Crear Nuevo Aviso

---

import useBaseUrl from '@docusaurus/useBaseUrl'; 
import Related, {toc as Title2TOC} from '/i18n/es/docusaurus-plugin-content-docs/current/products/corrective_maintenance/landing/_relatedTopics.mdx'; 

## Crear Nuevo Aviso {#notification}

[_Volver atrás._](/docs/products/corrective_maintenance/actions/create_notification)

<div className="img_sizing_small">

![create notification form](/img/productos_es/products_form_notify_cm.png)

</div>

<div className="margin-left--lg">

- **<span className="badge badge--danger">1.</span> Fecha del incidente**: Automaticamente generada al abrir el formulario pero puede ser modificada.  <br/>
_A partir de esta fecha se fija automáticamente la fecha de término como parte de un Service-Level Agreement (SLA) dependiendo de la prioridad de la falla. El sistema enviará un correo electrónico a los usuarios involucrados si no se cumplen con los plazos._
- **<span className="badge badge--danger">2.</span> Descripción**: Breve descripción escrita sobre el incidente que el personal de mantenimiento podrá revisar en la orden de trabajo.
- **<span className="badge badge--danger">3.</span> ¿Cómo indentificarás el equipo?**: Para identificar el equipo e ingresar detalles de su ubicación técnica y falla puedes escanear un [código QR](/docs/documentation/client/database#element-view) generada para cada equipo o elegirlo de una lista conecetada a la siguiente data maestra:
  - [**Sector de Equipamiento**](/docs/products/corrective_maintenance/master_data/equipment_sector)
  - [**Equipo**](/docs/products/corrective_maintenance/master_data/equipment)
  - [**Falla**](/docs/products/corrective_maintenance/master_data/failure_catalog)
- **<span className="badge badge--danger">4.</span> Evidencia fotográfica**: Se puede sacar una foto directamente o adjuntar una imagen almacenada en una galería o carpeta.
- **<span className="badge badge--danger">5.</span> Enviar**: Al enviar el formulario se inicia el flujo de trabajo de [Mantenimiento Correctivo](/docs/products/corrective_maintenance/landing/overview).

</div>


## Temas Relacionados {#related-topics}
<Related/>