---
title: Offline Mode
sidebar_label: Offline Mode
---

import useBaseUrl from '@docusaurus/useBaseUrl'; 

<span className="hero__subtitle">⚠ This feature is still in BETA stage.</span>

## Overview {#overview}
The _Cotalker app_ is constantly synchronizing with servers sending and retrieving the latest information shared on an organization's _Cotalker platform_. But in cases in which internet access is not available, users on mobile devices can activate the **Offline Mode**. With this feature, users can still work with the latest synchronized data on their mobile app and automatically update changes they made as soon as an internet connection is reestablished.

:::caution
**Offline Mode** works only on mobile devices, and [only certain specific actions](#offline-actions) can be carried out without an internet connection.
:::

:::info
- The **Offline Mode** is a feature that must be requested and configured in order for it to be available in your organization's Cotalker experience.
- **Offline Mode** can only be activated when all synchronization processes have been completed.
:::

## Synchronization {#sync}
To understand how **Offline Mode** works, we should review some basic notions of how the Cotalker app synchronizes data, i.e., sending and receiving data between the user's device and the platform's server.

The Cotalker app synchronizes data in the background as soon as it is opened on a mobile device. Synchronization continues whether the app is in use or not and as long as an active internet connection is available. This allows users to initiate and start using the app while still in the course of synchronization. Synchronization is an ongoing process that enables users to work with the latest data whenever they select the app.

### Graphic Indicators {#graphic-indicators}

_While synchronizing, at the bottom of your mobile app a status bar is displayed:_

<img alt="synchronization" className="img_sizing_narrow item shadow--tl" src={useBaseUrl('img/client_offline_00.png')} />
<br/>

_If synchronization is completed, the status bar will turn green:_

<img alt="synchronization" className="img_sizing_narrow item shadow--tl" src={useBaseUrl('img/client_offline_01.png')} />


## Enabling the Offline Mode {#enable}

<div className="alert alert--secondary">

### Settings Panel
**Offline Mode** can only be activated from the settings panel if the synchronization process has been completed, thus ensuring you have the latest information downloaded on your mobile device.  

To activate **Offline Mode** from the **Settings** panel, even if there is an active internet connection: 

<img alt="synchronization" className="img_sizing item shadow--tl" src={useBaseUrl('img/client_offline_03.png')} />
<br/>

<div className="margin margin-left--lg">

1. Press the _Settings Panel_ icon.
2. Select the **Offline Mode Settings**.
3. From the **Offline Mode Settings** panel, click the _Offline mode_ button.

</div>
</div>
<br/>

<div className="alert alert--secondary">

### Banner

If the internet connection has been lost, a yellow banner appears in the upper section of the app with the option to turn on the **Offline Mode**. Even if synchronization has not been completed, you can still activate the **Offline Mode** through this banner.

<img alt="synchronization" className="img_sizing_small item shadow--tl" src={useBaseUrl('img/client_offline_05.png')} />
<br/>

</div>
<br/>

## Offline Features
You can continue to work using the **Offline Mode** with the latest data synced to your device without needing an active internet connection. The [valid offline actions](#offline-actions) you carry out will be automatically synced with the server once an internet connection is reestablished.

:::caution
If **Offline Mode** is not set when you don't have access to the internet, the app will try to unsuccessfully connect to the internet. This will prevent it from showing data correctly and updating any changes you made while offline.
:::

### Valid Offline Actions {#offline-actions}

- View [regular and workflow groups](/docs/documentation/client/groups#group-types)
- View [channel workspaces](/docs/documentation/client/channels)
- Submit forms (except [API survey components](/docs/documentation/admin/survey/components/multiple_choice#api-type))
- Submit [workflow and state start forms](/docs/documentation/admin/workflows/admin_workflow_required_survey)

:::note
- Only one action upon a task is allowed while in Offline Mode. For example, you can change the state of a task from A to B while offline but cannot additionally change it from B to C.
- Even though _start forms_ can be submitted while offline, the actions they initiate through their routines may be limited.
:::
