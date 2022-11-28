---
title: 🛠 Mantenimiento Correctivo
---

import useBaseUrl from '@docusaurus/useBaseUrl'; 
import Related, {toc as Title1TOC} from '/i18n/es/docusaurus-plugin-content-docs/current/products/corrective_maintenance/landing/_relatedTopics.mdx'; 
import Configuration, {toc as Title2TOC} from '/i18n/es/docusaurus-plugin-content-docs/current/products/corrective_maintenance/landing/_configurationTopics.mdx'; 

:::caution WE'RE SORRY... 😢
Our English version is not yet available.
:::

## 📌 Resumen {#overview}

Este producto está diseñado para guiar y conectar a los usuarios involucrados en las diferentes etapas del proceso de mantenimiento correctivo. 

A través de formularios, usuarios podrán dar avisos de fallas en equipos e interactuar con órdenes de trabajo. Los formularios están conectados con la data maestra de la compañía, facilitando a los usuarios la selección de opciones y el registro de incidentes.

## 👥 Perfiles de Usuarios {#user_types}
En Mantenimiento Correctivo existen 5 _cargos_ o perfiles de usuarios que entregan los permisos necesarios para autorizar a los usuarios acceder a las herramientas e información correspondientes.

Los _cargos_ estándar son:
- **Levantador de Aviso**: Da avisos de fallas en equipos o activos.
- **Técnico**: Personal de mantenimiento encargado de arreglar las fallas reportadas.
- **Supervisor**: Vela sobre el proceso de mantención correctiva.
- **Administrador**: Tiene las facultades del supervisor pero puede además configurar formularios y data maestra.
- **Jefe**: Tiene todos los permisos para ver y configurar todo lo que pasa en la plataforma.

Más información en [_Perfiles de Usuarios_](/docs/products/corrective_maintenance/user_types/overview).

## 📋 Acciones y Formularios {#actions}
Los usuarios podrán ejecutar las acciones utilizando los formularios correspondientes:

<Related/>

## ➡️ Flujo de Trabajo {#workflow}
Todas las acciones mencionadas están interconcetadas en a través del flujo de trabajo representado abajo.

<div className="img_sizing">

![corrective maintenance diagram](/img/productos_es/product_cm_diagram.png)
_*Si la OT es rechazada, ésta sigue en el mismo estado (Reportado), pero el usuario que rechazó es removido de la tarea._  

_Cada rectángulo representa una acción/formulario. Sus colores indican su relación dentro del proceso.  <br/><span className="badge badge--success">Verde</span> es el inicio del proceso, y puede ser ejecutado por cualquier usuario. <br/><span className="badge badge--info">Azúl</span> indica una acción que llevará a otra, éstas son llevadas a cabo por personal de mantenimiento. <br/><span className="badge badge--danger">Rojo</span> son acciones que conducen al cierre del flujo, éstas pueden ser operadas sólo por personal con cargos más altos. <br/><span className="badge badge--secondary">Gris</span> es para indicar los diferentes estados o etapas del flujo de órdenes de trabajo._


</div> 

## ⚙️ Configuración de Data Maestra {#master-data}

La [**data maestra**](/docs/products/corrective_maintenance/master_data/overview) de cada compañía es fácilmente configurada a través de los siguientes formularios:

<Configuration/>

:::tip Recomendación
Consulta la sección [**Data Maestra**](/docs/products/corrective_maintenance/master_data/overview) para obtener más información.
:::


## 📊 Reporte Mantenimiento {#report}
A través de diferentes gráficos, esta herramienta te entrega un reporte con toda la data relacionada con el proceso de mantenimiento correctivo. 

Permite la utilización de filtros para acotar la información visualizada.

_Ejemplo de un panel de analítica perteneciente a Mantenimiento Correctivo:_

<div className="align-center">

![dashboard](/img/productos_es/product_cm_dashboard_preview.png)

</div>

Consulta en la sección [**Reporte Mantenimiento**](/docs/products/corrective_maintenance/reports/overview) para más información.