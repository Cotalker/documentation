---
title: Reportes de Activo
---

:::caution WE'RE SORRY... 😢
Our English version is not yet available.
:::

## Resumen {#overview}
En el [gestor de activos](/docs/documentation/client/database) se incluyen por defecto dos tipos de reportes por activo (equipo):
- [**Historial de Órdenes de Trabajo**](#log): Incluye información de todas las OTs relacionadas con el activo.
- [**Recursos Consumidos**](#resources): Muestra todos los servicios y materiales utilizados en un activo.

:::note Nota
- Sólo usuarios autorizados podrán ver los reportes.
- Habla con tu representante Cotalker para ver cómo [agregar o personalizar reportes](/docs/documentation/admin/database/asset_reports_actions).
:::

### Acceso a Reportes de Activos {#access}
Para acceder a los reportes de activos:

1. Selecciona **Base de Datos** desde el _Menú Principal_.
2. En la sección _Colecciones_, selecciona **Activos**.
3. Desde la lista _Activo_, selecciona un _activo_ o _equipo_ para abrir el gestor de activos.

<div className="img_sizing">

![report](/img/productos_es/asset_reports_cm_01.png)

</div>

4. En el gestor de activos, desde la sección _Reportes y Acciones_, selecciona el reporte que deseas ver: [historial OTS](#log) o [recursos consumidos](#resources).

<div className="img_sizing">

![report](/img/productos_es/asset_reports_cm_02.png)

</div>

## Historial de Órdenes de Trabajo {#log}
Cada activo o equipo tiene su historial de órdenes de trabajo (OT). 

<div className="img_sizing">

![report](/img/productos_es/asset_reports_cm_04.png)

</div>

Se registra en el historial la información indicada abajo:

<details className="override-info">
<summary>Detalle Reporte</summary>
<div>

- **Serial**: número de la orden de trabajo.
- **Estado**: Paso en que se encuentra la OT dentro del [flujo](/docs/products/workflows/work_orders/related-product/wo/workflow).
- [**Sector de Equipamiento**](/docs/products/corrective_maintenance/master_data/equipment_sector): Ubicación técnica en que se desarrolla la OT.
- [**Síntoma Falla**](/docs/products/corrective_maintenance/master_data/failure_symptoms): Falla o daño observado inicialmente.
- [**Prioridad**](/docs/products/corrective_maintenance/master_data/failure_priority): Nivel de tiempo de resolución.
- **Descripción**: Breve texto descriptivo de la falla.
- **Fecha Inicio Esperada**: Fecha y hora en que se inició creó la OT.
- **Fecha Inicio Real**: Fecha y hora en que se aceptó la OT.
- **Fecha Término Esperada**: Fecha y hora de resolución establecida al crear la OT.
- **Fecha Término Real**: Fecha y hora de la recepción de la OT.
- **Costo Total**: La suma de servicios y materiales utilizados.
- **Costo Materiales**: La suma de costos de [materiales](/docs/products/corrective_maintenance/master_data/material) registrados en la OT.
- **Costo Servicios**: La suma de costos de [servicios](/docs/products/corrective_maintenance/master_data/service) registrados en la OT.
- **Nombre Asignado**: Usuario responsable de la OT. Puede ser el [técnico](/docs/products/corrective_maintenance/user_types/overview#technician) asignado o el [supervisor](/docs/products/corrective_maintenance/user_types/overview#supervisor) del sector.

</div>
</details>

## Recursos Consumidas {#resources}
El reporte de _Recursos Consumidos_ muestra toda la data de [_servicios_](/docs/products/corrective_maintenance/master_data/service) y [_materiales_](/docs/products/corrective_maintenance/master_data/material) registrados en cada [cierre de orden de trabajo](/docs/products/corrective_maintenance/actions/wo_close) (OT).

<div className="img_sizing">

![report](/img/productos_es/asset_reports_cm_05.png)

</div>

<details className="override-info">
<summary>Detalle Reporte</summary>
<div>

- **Nombre Producto**: Nombre del [material](/docs/products/corrective_maintenance/master_data/material) o [servicio](/docs/products/corrective_maintenance/master_data/service).
- **Costo Unitario**: El costo es dado por la data maestra o ingresado manualmente.
- **Cantidad**: La cantidad es ingresada por cada [cierre de OT](/docs/products/corrective_maintenance/actions/wo_close).
- **Nombre OT**: Generalmente, el nombre de la OT indica el [equipo](/docs/products/corrective_maintenance/master_data/equipment) que refiere mantenimiento, su [sector](/docs/products/corrective_maintenance/master_data/equipment_sector) y número serial.
- **Tipo OT**: Los tipos de OT pueden ser: 
  - Correctivo: OT creado a través de un [aviso](/docs/products/corrective_maintenance/actions/create_notification).
  - Preventivo: OT creada como parte de un [plan preventivo](/docs/products/preventive_maintenance/pm_overview). 
  - Normativo: [OT creada de manualmente](/docs/products/corrective_maintenance/actions/wo_create).
- **Fecha Uso**: Fecha y hora en que se [cerró la OT](/docs/products/corrective_maintenance/actions/wo_close).

</div>
</details>

## Descargar Plantilla {#download}
Descarga copias de los reportes en formato Excel (XLSX).

Presiona el botón **Descargar** que se encuentra bajo a la izquierda en la ventana del reporte.

<div className="img_sizing">

![report](/img/productos_es/asset_reports_cm_03.png)

</div>