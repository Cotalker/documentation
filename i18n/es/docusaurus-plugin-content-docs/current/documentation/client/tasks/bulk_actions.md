---
title: Acciones masivas
---

A veces necesitás hacer lo mismo en muchas tareas a la vez — completar el mismo formulario, actualizar el mismo campo, o eliminar un lote de ellas. En vez de abrir cada tarea una por una, el _task view_ te permite actuar sobre toda una **selección** de tareas en conjunto. Esta página cubre las **acciones masivas**: aplicar un formulario a cada tarea seleccionada en un solo paso.

## Seleccionar varias tareas {#seleccionar-tareas}

Las operaciones masivas empiezan con una selección. En el _task view_, elegí las tareas sobre las que querés actuar — marcalas una por una, o seleccioná un grupo entero. Una vez que hay una o más tareas seleccionadas, las opciones masivas se habilitan en el encabezado de la vista.

<!-- TODO screenshot: task view con varias tareas seleccionadas y el menú Bulk Actions en el encabezado -->

## Ejecutar un formulario de acción masiva {#formularios-accion-masiva}

Un **formulario de acción masiva** es un formulario (survey) que corre sobre todas las tareas de tu selección a la vez — por ejemplo, marcar un lote de tareas como revisadas, o registrar el mismo resultado de inspección en muchas de ellas.

Para ejecutar uno:

1. Seleccioná las tareas sobre las que querés actuar.
2. Abrí el menú **Bulk Actions** en el encabezado del _task view_. Lista los formularios de acción masiva disponibles para ese grupo de tareas.
3. Elegí un formulario. Se abre igual que un formulario normal.
4. Completalo y envialo. La acción se aplica a **todas** las tareas seleccionadas, y la selección se limpia cuando termina.

:::note
Si el menú muestra _"No hay formularios de acciones masivas disponibles"_, significa que todavía no se configuró ningún formulario como acción masiva para ese grupo de tareas. Mirá [Configurar un formulario de acción masiva](#configurar) más abajo.
:::

## Configurar un formulario de acción masiva {#configurar}

Un formulario de acción masiva es simplemente un survey que fue **marcado como bulk form**. Esto se configura en el _Panel Administrativo_, no en el task view:

1. En la sección _Surveys_ del admin, abrí el survey que querés usar (o creá uno nuevo).
2. Activá la opción **Bulk form** en el survey.
3. Guardá.

Una vez marcado, el survey:

- aparece en la lista dedicada de **Bulk Forms** en la sección _Surveys_ del admin, y
- queda seleccionable desde el menú **Bulk Actions** en el _task view_ para los grupos de tareas correspondientes.

:::tip
Un survey marcado como bulk form se **quita del menú de acciones de tarea individual** — está pensado para actuar sobre una selección, no sobre una tarea a la vez. Mantené surveys separados para uso individual y para uso masivo.
:::

## Otras operaciones masivas {#otras-operaciones-masivas}

Además de ejecutar formularios, el _task view_ ofrece dos operaciones más sobre una selección:

- **Bulk edit** — actualizá el/los mismo(s) campo(s) en todas las tareas seleccionadas desde un solo diálogo.
- **Bulk delete** — eliminá todas las tareas seleccionadas a la vez.

Ambas siguen el mismo patrón: hacé tu selección primero, y después elegí la operación desde el encabezado.

<!-- TODO screenshot: el diálogo de bulk edit actuando sobre una selección -->

:::note
Las operaciones masivas actúan sobre las tareas del **grupo actualmente seleccionado**. Asegurate de estar en el grupo correcto antes de seleccionar y aplicar una acción.
:::
