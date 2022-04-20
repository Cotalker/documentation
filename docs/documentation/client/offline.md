---
title: Offline Mode
sidebar_label: Offline Mode
---

import useBaseUrl from '@docusaurus/useBaseUrl'; 

<span className="hero__subtitle">⚠ This feature is still in BETA stage.</span>

## Overview {#overview}

The _Cotalker app_ is constantly synchronizing with servers sending and retrieving the latest information shared on an organization's _Cotalker platform_. But in cases in which internet access is not available, users on mobile devices can activate the **Offline Mode**. With this feature, users can still work with the latest synchronized data on their mobile app and automatically update any changes they made as soon as an internet connection is reestablished.

:::info
The **Offline Mode** is a feature that must be requested in order for it to be available in your organization's Cotalker experience.
:::

## Synchronization {#sync}

To understand how **Offline Mode** works, we should review some basic notions of how the Cotalker app synchronizes data, i.e., sending and receiving data between the user's device and the platform's server.

The Cotalker app synchronizes data in the background. This allows users to initiate and start using the app while still in the course of synchronization. Synchronization is an ongoing process, that allows users to work with the latest data.

### Graphic Indicators {#graphic-indicators}

<div className="container margin-left--lg">
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
From the _Settings_ section, you can view numeric synchronization indicators.

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


From the **Settings** section, you can also activate the **Offline Mode** on your app and see how much data was synced since the last time you were online.

## Enabling the Offline Mode {#enable}

Enabling the **Offline Mode** on your app can be done either through the **Main Menu** or the **Settings** section.

<div className="container">
<div className="row">
<div className="col col--6">

**Main Menu**
_When internet connection is lost, a yellow banner appears in the upper section of the app with the option to turn on the **Offline Mode**._

<img alt="synchronization" className="img_sizing item shadow--tl" src={useBaseUrl('img/client_offline_05.png')} />
<br/>

</div>
<div className="col col--6">

**Settings**

<img alt="synchronization" className="img_sizing item shadow--tl" src={useBaseUrl('img/client_offline_06.png')} />
<br/>

</div>
</div>
</div>

## Offline Features

In case you lose your internet connection, you can continue to work using the **Offline Mode** with the latest data that was synced to your device. Any input you add will be automatically sent to the server once an internet connection is reestablished.