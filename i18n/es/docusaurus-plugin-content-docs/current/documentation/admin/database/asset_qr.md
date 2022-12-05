---
title: Asset QR Code
sidebar_label: Asset QR Code
---

:::caution Advertencia
Esta página aún no se encuentra traducida al español.
:::
import useBaseUrl from '@docusaurus/useBaseUrl';
import Highlight from '@theme/Highlight';

<span className="hero__subtitle">Asset Viewer</span>
<br/>
<br/>

The **Asset Viewer** generates a **QR code** for each asset. The QR codes can be printed and placed on assets, allowing users to easily access asset data with their mobile devices.


## Obtaining QR Codes {#obtain}
_To view and obtain the asset's QR code:_

<img alt="qr code" className="img_sizing item shadow--tl" src={useBaseUrl('img/asset_qr_00.png')} />
<br/>

<div className="margin margin-left--lg">

- **<span className="badge badge--danger">1.</span>** From the [**Asset Viewer**](/docs/documentation/admin/database/asset_viewer), click **View QR**.

</div>
<br/>

_A new tab opens in the web browser, as shown below:_

<img alt="qr code" className="img_sizing item shadow--tl" src={useBaseUrl('img/asset_qr_01.png')} />
<br/>

<div className="margin margin-left--lg">

- **<span className="badge badge--danger">2.</span>** The web browser displays the QR code and the link it directs to.
- **<span className="badge badge--danger">3.</span>** From the web browser's options, print the screen.

</div>
<br/>

_A window with print settings opens up, similar to the one shown below:_

<img alt="qr code" className="img_sizing item shadow--tl" src={useBaseUrl('img/asset_qr_01a.png')} />
<br/>

<div className="margin margin-left--lg">

- **<span className="badge badge--danger">4.</span>** The web browser should allow you to either print or save the screen as a PDF file for later use.

</div>
<br/>

Finally, **print the QR code**, either directly from the web browser or any other application where you can open the PDF file. Once printed, place the QR code on your asset or a strategic place to give users access to the asset's data and tools.



## Result {#result}
When the QR code is scanned, the user is redirected to **Asset Viewer** where the asset's data is displayed.

_Below is a sample of a mobile device displaying asset data after scanning the code:_

<img alt="qr code" className="img_sizing_50 item shadow--tl" src={useBaseUrl('img/asset_qr_02.png')} />
<br/>

:::note
Users must be logged into Cotalker on their mobile device for the asset viewer to appear once the QR code is scanned.
:::
