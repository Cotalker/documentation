---
title: Triggering Event
sidebar_label: COTEvent
---
import useBaseUrl from '@docusaurus/useBaseUrl';

## Description {#description}



Quien recibe un COTEvent son las url suscritas a determinado trigger (url pertence a COTWebhook)

4. Los events no son accesibles por api, pero se generan logs cada vez que se envía un evento a una url suscrita, los cuales tienen dentro el COTEvent. El único endpoint para obtener logs es: 
GET /api/v3/webhook/subscription/logs/subscription_id que retorna un arreglo de logs (COTWebhookLog[]).


```json
{ 
"company": ObjectId; 
"data": COTTask | COTUser | COTSurveyExecution; 
"type": 'COTTask' | 'COTUser' | 'COTSurvey'; 
"event": 'create' | 'edit' | 'delete'; 
"createdAt": ObjectId; 
"diff?": Record<string, { previous: COTTask | COTUser | COTSurveyExecution, changedTo: COTTask | COTUser | COTSurveyExecution } >; 
} 
```