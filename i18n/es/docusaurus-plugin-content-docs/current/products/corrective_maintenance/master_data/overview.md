---
title: ⚙️ Data Maestra
---

import Highlight from '@theme/Highlight';
import useBaseUrl from '@docusaurus/useBaseUrl'; 
import Related, {toc as Title1TOC} from '/i18n/es/docusaurus-plugin-content-docs/current/products/corrective_maintenance/landing/_relatedTopics.mdx'; 
import Configuration, {toc as Title2TOC} from '/i18n/es/docusaurus-plugin-content-docs/current/products/corrective_maintenance/landing/_configurationTopics.mdx'; 
import Mermaid from '@theme/Mermaid';


## 📌 Resumen {#overview}
La _data maestra_ de tu compañía agregada a Cotalker permite la automatización de tareas, su selección desde los formularios correspondientes y el registro de data relevante.

A través de los [**formularios mencionados**](#forms) en esta sección puedes ir fácilmente agregando la _data maestra_ a la plataforma.

Conversa con un representante Cotalker para ver otras formas de agregar y editar tu _data maestra_ en la plataforma.

## 📍 Mapa de Data Maestra {#data-map}
Abajo hay un esquema mostrando las conexiones y dependencias de la data maestra para facilitar su configuración.

<div className="align-center">

<span className="badge badge--warning">☞ Presiona sobre los ítems de data maestra para obtener mayor información.</span>

</div>
<br/>

<Mermaid chart={`
    graph LR;
        U & SE3 --> PT(Puestos de Trabajo):::user1
        U(Usuario):::user1 --> C(Cargos):::user0
        PT --> R(Rol):::user0
        EQ --> GF(Grupo de Falla):::fail1A
        GF --> Sin(Síntoma):::fail1A
        Sin --> Prior(Prioridad):::fail1B
        GF --> CF(Causa de Falla):::fail1A
        SE3(Sector de Equipamiento - 3):::equip1A --> SE2(Sector de Equipamiento - 2):::equip1B
        SE2 --> SE1(Sector de Equipamiento - 1):::equip1B
        SE1 & SE2 --> U
        EQ(Equipo):::thing1A --> SE3
        EQ --> FEq(Familia del Equipo):::equip1A
        FEq --> CEq(Categoría de Equipo):::equip1A
        EQ --> CE(Clase de Activo):::equip1A
        FEq --> CL(Checklist):::equip1A
        EQ --> TCO(Tipo Centro Operativo):::thing1A
        TCO --> CO(Centro Operativo):::thing1A
        M(Material):::thing1A --> CO
        EQ --> State(Estado):::thing1B
        M ~~~ S(Servicio):::thing1A
        classDef user1 fill:#FFDD4C,color:gray,stroke-width:0px
        classDef user0 fill:#FFF6CC,stroke-width:0px,color:gray
        classDef equip1A fill:#CA7FFF,color:white,stroke-width:0px
        classDef equip1B fill:#8E5EB1,stroke-width:0px,color:white
        classDef fail1A fill:#FF7F9F,stroke-width:0px,color:white
        classDef fail1B fill:#FCB2C4,stroke-width:0px,color:white
        classDef equip0 fill:#F1DEFF,stroke-width:0px,color:gray
        classDef thing1A fill:#64D0E7,color:white,stroke-width:0px
        classDef thing1B fill:#55B3C7,stroke-width:0px,color:white
        click U "users" "Se puede crear. Tiene formulario propio."
        click C "job_title" "No se puede crear."
        click PT "workstation" "Se puede crear. Tiene formulario propio."
        click R "rol" "No se puede crear."
        click SE3 "equipment_sector" "Se puede crear. Tiene formulario propio."
        click SE2 "equipment_sector" "Se puede crear. Tiene formulario propio."
        click SE1 "equipment_sector" "Se puede crear. Tiene formulario propio."
        click CE "asset_class" "Se puede crear. No tiene formulario propio."
        click CO "center" "Se puede crear. Tiene formulario propio."
        click TCO "center_type" "Se puede crear. No tiene formulario propio."
        click M "material" "Se puede crear. Tiene formulario propio."
        click S "service" "Se puede crear. Tiene formulario propio."
        click State "equipment_condition" "Se puede crear. No tiene formulario propio."
        click EQ "equipment" "Se puede crear. Tiene formulario propio."
        click FEq "equipment_family" "Se puede crear. No tiene formulario propio."
        click CEq "equipment_category" "Se puede crear. Tiene formulario propio."
        click CL "checklist" "Se puede crear. Tiene formulario propio."
        click GF "failure_catalog" "Se puede crear. Tiene formulario propio."
        click Sin "failure_symptoms" "Se puede crear. No tiene formulario propio."
        click Prior "failure_priority" "No se puede crear."
        click CF "failure_cause" "Se puede crear. No tiene formulario propio."
`}/>

<div className="align-center small_text">

**Leyenda:**

Tipo | Tiene formulario propio | Se pueden crear más
:---: | :---: | :---:
<Highlight text="Relacionado con Usuarios" color="#FFDD4C" textcolor="gray"/> | ✓ | ✓ 
<Highlight text="Relacionado con Usuarios" color="#FFF6CC" textcolor="gray"/> | ✗ | ✗ 
<Highlight text="Relacionado con Fallas" color="#FF7F9F" textcolor="white"/> | ✓ | ✓
<Highlight text="Relacionado con Fallas" color="#FCB2C4" textcolor="white"/> | ✗ | ✗
<Highlight text="Relacionado con Equipos" color="#CA7FFF" textcolor="white"/> | ✓ | ✓
<Highlight text="Relacionado con Equipos" color="#8E5EB1" textcolor="white"/> | ✗ | ✓
<Highlight text="Relacionado con Activos" color="#64D0E7" textcolor="white"/> | ✓ | ✓
<Highlight text="Relacionado con Activos" color="#55B3C7" textcolor="white"/> | ✗ | ✗


</div>


## ❓ ¿Cómo procedo para ingresar mi data maestra?
Puedes utilizar **formularios** para ingresar tu data maestra. Los formularios permiten agregar y unir la data maestra como sale representada en la [figura arriba](#data-map).

Para acceder a los **formularios**, selecciona **Datos maestros** en el _menú principal_. Luego aparece un sub-menú con todos los formularios disponibles para agregar data maestra. 

_**Datos Maestros** en menú principal:_

<div className="margin-left--lg img_sizing">

![access](/img/productos_es/product_master_data_00.png)

</div>

:::tip Recomendaciones
Antes de ingresar tu data maestra, debes tomarte un momento para pensar en tu proceso de mantenimiento correctivo. Considera lo siguiente:
- ¿Cuáles son los equipos o activos que quieres que sean incluídos en el proceso de mantenimiento correctivo?
- ¿Cómo se pueden agrupar o clasificar?
- ¿Qué fallas podrían presentar?
- ¿En qué lugares se encuentran?
- ¿Quiénes son los responsables de estos equipos o activos?

_Se recomienda ingresar tu data maestra en el orden en que los ítemes en el sub-menú._
:::

## 📋 Formularios para ingresar tu data maestra {#recommended}

<Configuration/>