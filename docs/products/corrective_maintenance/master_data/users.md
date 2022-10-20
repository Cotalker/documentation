---
title: Usuario
displayed_sidebar: products_landing
---

import useBaseUrl from '@docusaurus/useBaseUrl'; 
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

import Related, {toc as Title1TOC} from '/i18n/es/docusaurus-plugin-content-docs/current/products/corrective_maintenance/landing/_relatedTopics.mdx'; 
import Configuration, {toc as Title2TOC} from '/i18n/es/docusaurus-plugin-content-docs/current/products/corrective_maintenance/landing/_configurationTopics.mdx'; 

## Resumen {#overview}
Los _usuarios_ son la unidad básica de Cotalker, representan individuos o incluso bots. Pueden ingresar a la plataforma de Cotalker y llevar a cabo varias acciones según sus roles y permisos.

## ¿Cómo crear un nuevo usuario? {#create}
1. Selecciona la opción **Usuario** en la sección _Datos Maestros_ en el _menú principal_.
2. Presiona el botón de acciones.
3. Elije la opción _Crear nuevo usuario_.
4. Rellena el formulario.

## ¿Qué características debo entregarle a un nuevo usuario? {#details}
En primer lugar debes especificar sus datos personales, tales como sus 
- nombres, 
- apellidos, 
- teléfono y 
- correo electrónico. 

Luego es importante que definas qué [**cargo**](/docs/products/corrective_maintenance/master_data/job_title) tendrá este nuevo usuario. 

También puedes asociarle **roles de acceso** para realizar ciertas acciones durante el proceso de mantenimiento, por ejemplo, un permiso para crear una orden de trabajo o para crear un plan preventivo. 

Y por último, puedes asignarle [**puestos de trabajo**](/docs/products/corrective_maintenance/master_data/workstation) a los cuales puede pertenecer este usuario (lugares donde se realiza el trabajo, representado por un rol específico).


:::note Y recuerda...
Si el cargo que necesitas no se encuentra en la lista, puedes ir a crearlo al flujo de "Cargos". Lo mismo si deseas roles de acceso o puestos de trabajo nuevos, puedes ir a crearlos a sus respectivos flujos.
:::