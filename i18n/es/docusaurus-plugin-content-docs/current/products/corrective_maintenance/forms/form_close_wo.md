---
title: Formulario
displayed_sidebar: products
---

import useBaseUrl from '@docusaurus/useBaseUrl'; 
import Related, {toc as Title2TOC} from '/i18n/es/docusaurus-plugin-content-docs/current/products/corrective_maintenance/landing/_relatedTopics.mdx'; 


[Volver atrás...](/docs/products/corrective_maintenance/actions/wo_close)

<span className="align-center hero__title">Cerrar Orden de Trabajo</span>

## Descripción del Formulario {#description}

<div className="container">
<div className="row">
<div className="col col--6">

<div className="img_sizing_narrow">

![close wo form](/img/productos_es/products_form_close_wo_cm.png)

</div>
</div>

<div className="col col--6">

- **<span className="badge badge--danger">1.</span> <span className="badge badge--danger">2.</span> <span className="badge badge--danger">3.</span> [Sector de Equipamiento](/docs/products/corrective_maintenance/master_data/equipment_sector) Niveles 1–3**: Indica los tres niveles de _sectores de equipamiento_ donde se ubica el _equipo_.<br/>_Nota: Estos campos se rellenan automáticamente._
- **<span className="badge badge--danger">4.</span> [Equipo](/docs/products/corrective_maintenance/master_data/equipment)**: Indica el equipo que requería mantenimiento.<br/>_Nota: Este campo se rellena automáticamente._
- **<span className="badge badge--danger">5.</span> ¿Fue corregido el incidente?**: Señaliza si se pudo arreglar la falla. Independiente de la respuesta, la orden de trabajo pasará a la etapa de validación.
- **<span className="badge badge--danger">6.</span> [Servicio](/docs/products/corrective_maintenance/master_data/service)**: Agrega los _servicios_ prestados para llevar acabo la orden de trabajo. El valor de cada _servicio_ y su cantidad es agregado a la suma total de costos. 
- **<span className="badge badge--danger">7.</span> [Material](/docs/products/corrective_maintenance/master_data/material)**: Agrega los _materiales_ utilizados para llevar acabo la orden de trabajo. Cada _material_, con su cantidad respectiva, es restada del stock registrado en la data maestra.
- **<span className="badge badge--danger">8.</span> Evidencia**: Agrega imágenes, ya sea directamente con la cámera del dispositivo o desde una carpeta o galería.
- **<span className="badge badge--danger">9.</span> Geolocalización**: Indica las coordenadas geográficas al momento de rellenar el formulario utilizando Google Maps.
- **<span className="badge badge--danger">10.</span> Notas**: Opcionalmente, agrega alguna nota sobre la orden de trabajo.
- **<span className="badge badge--danger">11.</span> Enviar**: Al enviar el formulario, la orden de trabajo pasa al estado de _Validación_, a la espera de la [recepción de la orden de trabajo](/docs/products/corrective_maintenance/actions/wo_validate).




</div>

</div>
</div>

## Temas Relacionados {#related-topics}

<Related/>


