---
title: Flujo de Trabajo de Notificaciones
sidebar_label: Ejemplo de Caso de Uso
---

import useBaseUrl from '@docusaurus/useBaseUrl'; 

<span className="hero__title">Ejemplo de Caso de Uso</span>
<br/>
<br/>



## Notificación de fuga de agua {#water-leak}

<div className="alert alert--primary">

_Mira cómo Azam envía una notificación para informar un problema de mantenimiento en 30 segundos:_

<img alt="ejemplo de notificación" className="img_sizing item shadow--tl" src={useBaseUrl('img/products/video_notification.gif')} />
<br/>

_Detalle del proceso de notificación de Azam explicado paso a paso:_

1. Azam supervisa la oficina en las instalaciones del norte de Acme. Esta mañana, encontró una fuga de agua en el local.
2. Así que abrió la plataforma Cotalker para enviar una notificación de mantenimiento.
3. Va a la sección _Notificaciones_,
4. Y presiona el _botón de acción verde_ y selecciona la opción _Reportar Incidente_.
5. Aparece un formulario y él lo completa.
6. Indica la ubicación de la empresa donde se ha producido la incidencia de un listado: _Locales Norte_.
7. Luego, indica qué tipo de activo ha sufrido una falla. Selecciona _Suministro de agua_ de la lista.
8. Después de elegir la opción _Abastecimiento de agua_, indica si el problema viene de dentro o fuera del local. Entonces selecciona la opción _Interno_ para informar que el problema está dentro del local.
9. Luego indica el tipo de falla. Aparece una lista de posibles fallas relacionadas con problemas internos de suministro de agua. Selecciona _Fuga de tubería_.
10. A continuación, registra la fecha y hora en que ocurrió el incidente.
11. Antes de enviar, agrega una foto para explicar mejor el incidente.
12. Finalmente, presiona el botón _Enviar_ en el formulario para notificar a Layla, la supervisora ​​de mantenimiento.
13. Esto inicia el flujo de trabajo de _Notificación_. En el siguiente paso del proceso, Layla tendrá que _validar el informe_. Una vez validada, puede crear una _orden de trabajo_, iniciando un nuevo flujo de trabajo que incluirá al contratista asignado para reparar la fuga (más sobre esto más adelante).

</div>
<br/>

## Validación del informe de fugas de agua {#validation}

<div className="alert alert--primary">

<img alt="validation example" className="img_sizing item shadow--tl" src={useBaseUrl('img/products/video_validate_notification.gif')} />
<br/>

_Detalles de cómo Layla validó el informe de Azam:_

1. Una vez que Azam envía el informe, Layla, la supervisora de mantenimiento, recibe una notificación de inmediato.
2. Ella abre el canal de notificación.
3. Luego, se desplaza hacia arriba en el canal para ver los detalles del informe.
4. En el espacio de trabajo del canal, presiona el botón verde etiquetado como _Validar incidente_.
5. Aparecerá el formulario _Validar notificación de incidente_.
6. Ella elige validar y agrega una nota antes de enviar el formulario.
7. Una vez que se valida el incidente, desde el mismo espacio de trabajo, Layla puede enviar a los contratistas una _orden de trabajo_ solicitando sus servicios, iniciando así el [work order workflow](/docs/products/workflows/work_orders/related-product/cm/overview_intro) .

</div>
<br/>