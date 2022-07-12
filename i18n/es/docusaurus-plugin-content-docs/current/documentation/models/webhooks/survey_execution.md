---
title: Survey Execution
sidebar_label: COTSurveyExecution
---

:::caution Advertencia
Esta página aún no se encuentra traducida al español.
:::
import useBaseUrl from '@docusaurus/useBaseUrl';

<span className="hero__subtitle">COTSurveyExecution</span>

## Description {#description}

The COTSurveyExecution data model is found within [COTEvent](/docs/documentation/models/webhooks/event) objects sent to external servers via [webhooks](/docs/documentation/admin/admin_webhooks). COTSurveyExecution contains submitted survey data in the form of [COTMessage](/docs/documentation/models/communication/model_messages) objects.

## JSON Sample {#sample}
```json
{ 
    "surveyId": "627acd7e58a77633efc55b69",
    "group": "627acd8437cc96869d805470", 
    "surveyData": [
        "627acdb064399b2d607d69a0",
        "627acdbc7bbc2a5c8102c7e9",
        "627acdc90e3dfdafb11a59d7",
        "627acdd173275a80b642c368"
    ]
}
```

## Fields {#fields}

Field | Description | Type | Note
--- | --- | --- | ---
**surveyId** | The ObjectId of submitted survey. | ObjectId<COTSurvey\> |
**group** | The ObjectId of the group in which the submitted survey is found. | ObjectId<COTGroup\> |
**surveyData** | An array of the COTMessage objects that constitute the submitted survey. | [COTMessage[ ]](/docs/documentation/models/communication/model_messages) |



## Additional Resources {#additional-resources}
- [Webhooks Section](/docs/documentation/admin/admin_webhooks): Administrative Panel Settings
- [Webhook REST API Documentation](/docs/documentation/api/automations/webhooks): Webhook API requests

## Help {#help}

- [Cotalker Platform Community](https://github.com/Cotalker/documentation/discussions): post your questions or search for previous answers given in the forum
