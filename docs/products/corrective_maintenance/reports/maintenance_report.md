---
title: Reporte de Mantenimiento
---

import Filters, {toc as Title1TOC} from '/i18n/es/docusaurus-plugin-content-docs/current/products/corrective_maintenance/reports/_filters.mdx'; 
import Uptime, {toc as Title2TOC} from '/i18n/es/docusaurus-plugin-content-docs/current/products/corrective_maintenance/reports/_confidence_indicators.mdx'; 
import Notifications, {toc as Title3TOC} from '/i18n/es/docusaurus-plugin-content-docs/current/products/corrective_maintenance/reports/_reported_incidents.mdx'; 
import Workflow, {toc as Title4TOC} from '/i18n/es/docusaurus-plugin-content-docs/current/products/corrective_maintenance/reports/_cm_workflow.mdx'; 

:::caution WE'RE SORRY... 😢
Our English version is not yet available.
:::


## Resumen {#overview}
Cotalker te genera automáticamente un reporte de mantenimiento. Este reporte consiste en _dashboards_ o _paneles de control_ para visualizar la data de tus _avisos_, _planes preventivos_ y _órdenes de trabajo_. 

Estos paneles de control son generados con [Metabase](https://www.metabase.com/).

### Cómo Acceder al Reporte {#access}
Para acceder al reporte, simplemente selecciona **Reporte mantenimiento** desde el _menú principal_.

<div className="margin-left--lg">

![access dashboards](/img/productos_es/product_report_00.png)

</div>
<br/>

## Filtros {#filters}

<Filters/>


## Secciones {#sections}
El reporte de mantenimiento está dividido en las siguientes secciones:

### Indicadores de confiabilidad {#uptime}

<Uptime/>

### Avisos Reportados {#notifications}

<Notifications/>

### Flujo Correctivo {#corrective-workflow}

<Workflow/>



