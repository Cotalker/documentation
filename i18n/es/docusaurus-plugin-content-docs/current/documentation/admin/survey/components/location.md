---
title: Location Component
sidebar_label: Location
---
import useBaseUrl from '@docusaurus/useBaseUrl';
import Highlight from '@theme/Highlight';

## Overview {#overview}

The **Location** component is used to let users send location data using embedded Google Maps. The component can be set to register only the user's current GPS location or it can be set to allow users freely indicate any map location.

This component works both on desktop and mobile apps. An internet connection is required for users to answers a _location_ question.

## Description {#description}

Below, fields pertaining to the component are explained:

<img alt="survey+gps" className="" src={useBaseUrl('img/admin_survey_location_00.png')} />
<br/>

1. **Button label**: Indicates the label that will be displayed in the survey form.
2. **Identifier**: Indicates the component's unique identification code.
3. **Location selection mode**: Select how users can input GPS data. Choose between:
    - Current location only (default): Automatically registers user's current GPS location.
    - Free selection on map: Allows users to freely select a location.

:::note
Standard fields are described in the [**general field descriptions**](/docs/documentation/admin/survey/survey_overview/#field-descriptions) section.
:::

## Survey example {#example}
### Current Selection Only Mode {#current}
_This mode can only submit the user's current GPS location._

<img alt="survey+gps" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_survey_location_02.png')} />
<br/>

### Free Selection on Map Mode {#free}
_This mode allows users to freely select a location. For more details on how it is used, [click here](/docs/documentation/client/surveys#location)._

<img alt="survey+gps" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_survey_location_01.png')} />
<br/>

## Data Models {#data-models}
- The Location survey component's [data model can be viewed here](/docs/documentation/models/surveys/model_questionContentType#gps).
- A sample of a submitted [answer's data model can be viewed here](/docs/documentation/admin/tips/survey_gps_response).
