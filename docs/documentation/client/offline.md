---
title: Offline Mode
sidebar_label: Offline Mode
---

import useBaseUrl from '@docusaurus/useBaseUrl'; 

<span className="hero__subtitle">⚠ This feature is still in BETA stage.</span>

## Overview {#overview}

The _Cotalker app_ is constantly synchronizing with servers sending and retrieving the latest information shared on an organization's _Cotalker platform_. But in cases in which internet access is not available, users on mobile devices can activate the **Offline Mode**. With this feature, users can still work with the latest synchronized data on their mobile app and automatically update changes they made as soon as an internet connection is reestablished.

:::caution
**Offline Mode** works only on mobile devices and only certain specific actions can be carried out without an internet connection.
:::

:::info
The **Offline Mode** is a feature that must be requested and configured in order for it to be available in your organization's Cotalker experience.
:::

## Synchronization {#sync}

To understand how **Offline Mode** works, we should review some basic notions of how the Cotalker app synchronizes data, i.e., sending and receiving data between the user's device and the platform's server.

The Cotalker app synchronizes data in the background. This allows users to initiate and start using the app while still in the course of synchronization. Synchronization is an ongoing process, that allows users to work with the latest data.

### Graphic Indicators {#graphic-indicators}

<div className="container">
<div className="row">
<div className="col col--6">

_While synchronizing, at the bottom of your mobile app a status bar is displayed:_

</div>
<div className="col col--6">

<img alt="synchronization" className="img_sizing item shadow--tl" src={useBaseUrl('img/client_offline_00.png')} />

</div>
</div>
<br/>
<div className="row">
<div className="col col--6">

_If synchronization is completed, the status bar will turn green:_

</div>
<div className="col col--6">

<img alt="synchronization" className="img_sizing item shadow--tl" src={useBaseUrl('img/client_offline_01.png')} />

</div>
</div>
<br/>
<div className="row">
<div className="col col--6">

_If synchronization has halted because there is no available internet connection, a message will show up on the upper part of the app and the status bar on the bottom will turn red:_

</div>
<div className="col col--6">

<img alt="synchronization" className="img_sizing item shadow--tl" src={useBaseUrl('img/client_offline_02.png')} />

</div>
</div>
</div>
<br/>

### Settings Indicators {#settings-indicators}
From the **Settings** section, you can see how much data was synced since the last time you were online.

<div className="container">
<div className="row">
<div className="col col--6">

_To go to the **Settings** section, press the three vertical dots icon in the upper right corner of the app._

<img alt="synchronization" className="img_sizing item shadow--tl" src={useBaseUrl('img/client_offline_03.png')} />
<br/>

</div>
<div className="col col--6">

_At the lower half of the **Settings** section, you can see the synchronization data indicators._

<img alt="synchronization" className="img_sizing item shadow--tl" src={useBaseUrl('img/client_offline_04.png')} />
<br/>

</div>

</div>
</div>
<br/>

## Enabling the Offline Mode {#enable}

Enabling the **Offline Mode** on your app can be done either through the **Main Menu** or the **Settings** section.

<div className="container">
<div className="row">
<div className="col col--6">

**Main Menu**  
_When you lose your internet connection, a yellow banner appears in the upper section of the app with the option to turn on the **Offline Mode**._

<img alt="synchronization" className="img_sizing item shadow--tl" src={useBaseUrl('img/client_offline_05.png')} />
<br/>

</div>
<div className="col col--6">

**Settings**  
_If you want to turn on the **Offline Mode** manually, even if you have an internet connection, go to the **Settings** section to find the option._

<img alt="synchronization" className="img_sizing item shadow--tl" src={useBaseUrl('img/client_offline_06.png')} />
<br/>

</div>
</div>
</div>

## Offline Features

In case you lose your internet connection, you can continue to work using the **Offline Mode** with the latest data that was synced to your device. Any input you add will be automatically sent to the server once an internet connection is reestablished.

:::caution
If **Offline Mode** is not set when you don't have access to the internet, the app will try to unsuccessfully connect to the internet. This will prevent it from showing any data and correctly updating any changes you made while offline.
:::

### Available Offline Actions {#offline-actions}

- View [regular and workflow groups](/docs/documentation/client/groups#group-types)
- View [channel workspaces](/docs/documentation/client/channels)
- Submit forms ([API survey components](/docs/documentation/admin/survey/components/multiple_choice#api-type) do not function in Offline Mode)
- Submit [workflow and state start forms](/docs/documentation/admin/workflows/admin_workflow_required_survey)

:::note
- Only one action upon a task is allowed while in Offline Mode. For example, you can change the state of a task from A to B while offline, but cannot additionally change it from B to C.
- Even though _start forms_ can be submitted while offline, the actions they initiate through their routines may be limited.
:::
