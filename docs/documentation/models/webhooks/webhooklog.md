---
title: Webhook Log
sidebar_label: COTWebhookLog
---
import useBaseUrl from '@docusaurus/useBaseUrl';

```json
{
  company: ObjectId;
  createdAt: ObjectId;
  event: COTEvent;
  retry: number;
  subscription: ObjectId (webhook)
  response: string;
  status: number;
}

```