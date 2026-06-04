---
title: Acciones masivas
---

import useBaseUrl from '@docusaurus/useBaseUrl';

A veces necesitas hacer lo mismo en muchas tareas a la vez — completar el mismo formulario, actualizar el mismo campo, o eliminar un lote de ellas. En vez de abrir cada tarea una por una, el _task view_ te permite actuar sobre toda una **selección** de tareas en conjunto. Esta página cubre las **acciones masivas**: aplicar un formulario a cada tarea seleccionada en un solo paso.

## Seleccionar varias tareas {#seleccionar-tareas}

Las operaciones masivas empiezan con una selección. En el _task view_, elige las tareas sobre las que quieres actuar — márcalas una por una, o selecciona un grupo entero. Una vez que hay una o más tareas seleccionadas, las opciones masivas se habilitan en el encabezado de la vista.

<img alt="Selección de varias tareas en el task view" className="img_sizing item shadow--tl" src={useBaseUrl('img/bulk_actions_selection.webp')} />
<br/>

## Ejecutar un formulario de acción masiva {#formularios-accion-masiva}

Un **formulario de acción masiva** es un formulario (survey) que corre sobre todas las tareas de tu selección a la vez — por ejemplo, marcar un lote de tareas como revisadas, o registrar el mismo resultado de inspección en muchas de ellas.

Para ejecutar uno:

1. Selecciona las tareas sobre las que quieres actuar.
2. Abre el menú **Bulk Actions** en el encabezado del _task view_. Lista los formularios de acción masiva disponibles para ese grupo de tareas.
3. Elige un formulario. Se abre igual que un formulario normal.
4. Complétalo y envíalo. La acción se aplica a **todas** las tareas seleccionadas, y la selección se limpia cuando termina.

<img alt="El menú Bulk Actions mostrando un formulario de acción masiva disponible" className="img_sizing item shadow--tl" src={useBaseUrl('img/bulk_actions_menu.webp')} />
<br/>

<img alt="Ejecución de un formulario de acción masiva sobre las tareas seleccionadas" className="img_sizing item shadow--tl" src={useBaseUrl('img/bulk_actions_form.webp')} />
<br/>

:::note
Si el menú muestra _"No hay formularios de acciones masivas disponibles"_, significa que todavía no se configuró ningún formulario como acción masiva para ese grupo de tareas. Mira [Configurar un formulario de acción masiva](#configurar) más abajo.
:::

## Configurar un formulario de acción masiva {#configurar}

Un formulario de acción masiva es simplemente un survey que fue **marcado como bulk form**. Esto se configura en el _Panel Administrativo_, no en el task view:

1. En la sección _Surveys_ del admin, abre el survey que quieres usar (o crea uno nuevo).
2. Activa la opción **Bulk form** en el survey.
3. Guarda.

Una vez marcado, el survey:

- aparece en la lista dedicada de **Bulk Forms** en la sección _Surveys_ del admin, y
- queda seleccionable desde el menú **Bulk Actions** en el _task view_ para los grupos de tareas correspondientes.

:::tip
Un survey marcado como bulk form se **quita del menú de acciones de tarea individual** — está pensado para actuar sobre una selección, no sobre una tarea a la vez. Mantén surveys separados para uso individual y para uso masivo.
:::

## Otras operaciones masivas {#otras-operaciones-masivas}

Además de ejecutar formularios, el _task view_ ofrece dos operaciones más sobre una selección:

- **Bulk edit** — actualiza el/los mismo(s) campo(s) en todas las tareas seleccionadas desde un solo diálogo.
- **Bulk delete** — elimina todas las tareas seleccionadas a la vez.

Ambas siguen el mismo patrón: haz tu selección primero, y después elige la operación desde el encabezado.

:::note
Las operaciones masivas actúan sobre las tareas del **grupo actualmente seleccionado**. Asegúrate de estar en el grupo correcto antes de seleccionar y aplicar una acción.
:::
