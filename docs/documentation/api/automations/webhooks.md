---
title: Webhooks
sidebar_label: Webhooks
---
import useBaseUrl from '@docusaurus/useBaseUrl';


## GET Webhooks[ ]

`https://www.cotalker.com/api/v3/webhook/subscription`


## GET specific webhook

`https://www.cotalker.com/api/v3/webhook/subscription/{id}`



`https://www.cotalker.com/api/v3/webhook/subscription/logs/{id}`

Quien recibe un COTEvent son las url suscritas a determinado trigger (url pertence a COTWebhook)

4. Los events no son accesibles por api, pero se generan logs cada vez que se envía un evento a una url suscrita, los cuales tienen dentro el COTEvent. El único endpoint para obtener logs es: 
GET /api/v3/webhook/subscription/logs/subscription_id que retorna un arreglo de logs (COTWebhookLog[]).

