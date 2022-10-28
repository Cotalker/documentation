---
title: Configurar Data Maestra
---

import useBaseUrl from '@docusaurus/useBaseUrl'; 
import Related, {toc as Title1TOC} from '/i18n/es/docusaurus-plugin-content-docs/current/products/corrective_maintenance/landing/_relatedTopics.mdx'; 
import Configuration, {toc as Title2TOC} from '/i18n/es/docusaurus-plugin-content-docs/current/products/corrective_maintenance/landing/_configurationTopics.mdx'; 
import Mermaid from '@theme/Mermaid';


## Resumen {#overview}
La data maestra de tu compañía agregada a Cotalker permite la automatización de tareas, su selección desde los formularios correspondientes y el registro de data relevante.

## Formularios para Agregar Data Maestra {#forms}

<Configuration/>

## Cómo Acceder a los Formularios {#access}
Selecciona **Datos maestros** en el menú principal. Luego aparece un sub-menú con todos los formularios disponibles para agregar data maestra.

<div className="margin-left--lg img_sizing">

![access](/img/productos_es/product_master_data_00.png)

</div>

## Mapa de Data Maestra {#map}
Abajo hay un esquema mostrando las conexiones y dependencias de la data maestra para facilitar su configuración.

☞ _Presiona sobre los ítems de data maestra para obtener mayor información._

<div className="align-center">

<Mermaid chart={`
    graph TD;
        U(Usuario):::user --> C(Cargos):::user
        U --> PT(Puestos de Trabajo):::user
        PT --> R(Rol):::user
        PT --> SE3(Sector de Equipamiento - 3):::sector
        SE2(Sector de Equipamiento - 2):::sector --> SE3
        SE1(Sector de Equipamiento - 1):::sector --> SE2
        SE3 --> EQ(Equipo):::thing
        CE(Clase Equipo):::equip --> EQ
        CO(Centro Operativo):::center --> EQ
        TCO(Tipo Centro Operativo):::center --> CO
        CO --> M(Material):::thing
        S(Servicio):::thing
        EQ --> State(Estado):::equip
        EQ --> FEq(Familia del Equipo):::equip
        EQ --> CEq(Categoría de Equipo):::equip
        FEq --> CEq
        FEq --> CL(Checklist):::check
        EQ --> GF(Grupo de Falla):::fail
        GF --> Sin(Síntoma):::fail
        Sin --> Prior(Prioridad):::fail
        GF --> CF(Causa de Falla):::fail
        classDef user fill:#58f5f2,stroke-width:0px
        classDef thing fill:#77fa3e,stroke-width:0px
        classDef sector fill:#f2f558,stroke-width:0px
        classDef equip fill:#cefaca,stroke-width:0px
        classDef center fill:#fcfa6f,stroke-width:0px
        classDef fail fill:#faa7a7,stroke-width:0px
        classDef check fill:#fae105,stroke-width:0px
        click U "users"
        click C "job_title"
        click PT "workstation"
        click R "rol"
`}/>

</div>