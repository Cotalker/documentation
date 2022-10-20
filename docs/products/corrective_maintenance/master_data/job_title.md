---
title: Cargos
displayed_sidebar: products_landing
---

import useBaseUrl from '@docusaurus/useBaseUrl'; 
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

import Related, {toc as Title1TOC} from '/i18n/es/docusaurus-plugin-content-docs/current/products/corrective_maintenance/landing/_relatedTopics.mdx'; 
import Configuration, {toc as Title2TOC} from '/i18n/es/docusaurus-plugin-content-docs/current/products/corrective_maintenance/landing/_configurationTopics.mdx'; 

## ¿Qué es un cargo? {#overview}
Es el título de trabajo, que agrupa a los [usuarios](/docs/products/corrective_maintenance/master_data/users) y les otorga atributos especiales de acuerdo a su cargo.

## ¿Cómo crear un nuevo cargo? {#create}
1. Selecciona la opción **Cargo** en la sección _Datos Maestros_ en el _menú principal_.
2. Presiona el botón de acciones.
3. Elije la opción _Crear nuevo cargo_.
4. Rellena el formulario.

## ¿Cuál es un buen nombre? {#details}
Un [usuario](/docs/products/corrective_maintenance/master_data/users) puede ser un mecánico y otro puede ser un validador. También pueden haber usuarios que son supervisores. A esto nos referimos a "cargos", elemento que luego se le asigna a un usuario en el flujo de "Usuarios".

## ¿Qué necesito para crear un cargo? {#requirements}
A cada cargo le puedes asociar _roles de acceso_ (permisos para realizar ciertas acciones, como crear una orden de trabajo) y también le puedes asociar [_puestos de trabajo_](/docs/products/corrective_maintenance/master_data/workstation) (lugares donde se realiza el trabajo, representado por un rol específico). Todos los usuarios que pertenezcan al cargo creado, se les atribuye también los roles de acceso y los puestos de trabajo de este cargo.

:::note Y recuerda...
Si necesitas nuevos roles de acceso o puestos de trabajo que no aparecen en la lista, puedes dirigirte a los flujos respectivos para crearlos.
:::
