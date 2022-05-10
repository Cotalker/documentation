---
title: Survey Execution
sidebar_label: COTSurveyExecution
---
import useBaseUrl from '@docusaurus/useBaseUrl';

## Description {#description}

Used for sending survey data through [webhooks](/docs/documentation/admin/admin_webhooks).

es solo una interface para definir el modelo de la ejecución de un Survey, sin embargo no corresponde al modelo de un documento guardado en base de datos.

Se hizo un cambio, surveyData corresponde actualmente a un array de COTMessage (seguramente esto cambiará en un futuro no muy lejano, por ahorá quedará así). Por lo que ahora como dices al final, es un arreglo de los COTMessages que forman el formulario enviado.

```json
{ 
    "surveyId": ObjectId,
    "group": ObjectId, 
    "surveyData": COTMessage[],
}
```
