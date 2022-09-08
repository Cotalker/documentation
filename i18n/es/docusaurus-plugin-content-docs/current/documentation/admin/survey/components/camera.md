---
title: Camera Component
sidebar_label: Camera
---

:::caution Advertencia
Esta página aún no se encuentra traducida al español.
:::
import useBaseUrl from '@docusaurus/useBaseUrl';
import Highlight from '@theme/Highlight';

The **Camera** component permits users to send pictures, either by taking a picture with their smartphone camera or choosing one from the gallery. Webcams on desktop computers can also be used with this component.

Once the photo is taken, a preview is shown for approval before adding it to the survey.

<img alt="" src={useBaseUrl('img/admin_survey_camera.png')} />
<br/><br/>

The field(s) unique to the **Camera** component are described in the following table:


| Field | Description | Notes |
| ---- | ----------- | ----- |
| Source | Specify the image source. Options are: _Any source_, _Cellphone's camera_, _Cellphone's camera and web files_, or _Cellphone's gallery and web files_. | Smartphone cameras and desktop webcams are automatically found on user's devices, but might require permission for use. |
