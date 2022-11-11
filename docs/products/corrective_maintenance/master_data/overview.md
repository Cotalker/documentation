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
        U(Usuario):::user1 --> C(Cargos):::user0
        U --> PT(Puestos de Trabajo):::user1
        PT --> R(Rol):::user0
        PT --> SE3(Sector de Equipamiento - 3):::equip1A
        SE2(Sector de Equipamiento - 2):::equip1B --> SE3
        SE1(Sector de Equipamiento - 1):::equip1B --> SE2
        EQ(Equipo):::thing1A --> SE3
        EQ --> FEq(Familia del Equipo):::equip1B
        EQ --> CEq(Categoría de Equipo):::equip1A
        FEq --> CEq
        FEq --> CL(Checklist):::equip1A
        EQ --> GF(Grupo de Falla):::equip1A
        GF --> Sin(Síntoma):::equip1B
        Sin --> Prior(Prioridad):::equip0
        GF --> CF(Causa de Falla):::equip1B
        EQ --> TCO(Tipo Centro Operativo):::thing1B
        TCO --> CO(Centro Operativo):::thing1A
        M(Material):::thing1A --> CO
        EQ --> State(Estado):::thing1B
        EQ --> CE(Clase Equipo):::thing1B
        S(Servicio):::thing1A
        classDef user1 fill:#FFDD4C,color:gray,stroke-width:0px
        classDef user0 fill:#FFF6CC,stroke-width:0px,color:gray
        classDef equip1A fill:#CA7FFF,color:white,stroke-width:0px
        classDef equip1B fill:#8E5EB1,stroke-width:0px,color:white
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
        click CE "equipment_class" "Se puede crear. No tiene formulario propio."
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

<div className="align-center">

**Leyenda:**

Tipo | Tiene formulario propio | Se pueden crear más
:---: | :---: | :---:
<Highlight text="Relacionado con Usuarios" color="#FFDD4C" textcolor="gray"/> | ✓ | ✓ 
<Highlight text="Relacionado con Usuarios" color="#FFF6CC" textcolor="gray"/> | ✗ | ✗ 
<Highlight text="Relacionado con Equipos" color="#CA7FFF" textcolor="white"/> | ✓ | ✓
<Highlight text="Relacionado con Equipos" color="#8E5EB1" textcolor="white"/> | ✗ | ✓
<Highlight text="Relacionado con Equipos" color="#F1DEFF" textcolor="gray"/> | ✗ | ✗
<Highlight text="Relacionado con Activos" color="#64D0E7" textcolor="white"/> | ✓ | ✓
<Highlight text="Relacionado con Activos" color="#55B3C7" textcolor="white"/> | x | ✓


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
- ¿Qué fallas podrían presentar estos equipos o activos?
- ¿En qué lugares se encuentra estos equipos o activos?
- ¿Quiénes son los responsables de estos equipos o activos?

_Se recomienda ingresar tu data maestra en el orden en que los ítemes en el sub-menú._
:::

## 📋 Formularios para ingresar tu data maestra {#recommended}

<Configuration/>