---
title: Branding Settings
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<span className="hero__subtitle">Customize platform colors, text, and login authentication.</span>
<br/>

## Overview {#overview}

You can customize certain aspects of Cotalker's UI to your organization's needs by updating the _companies_ endpoint. Specifically, you can override the default CSS settings, allowing you to modify the platform's colors and buttons. You can also change UI text, login screen images, and the company icon. Furthermore, your company's Microsoft or Google accounts can be set as authentication methods for sign-in.

:::warning
Cotalker continuously makes updates to the app platform and cannot guarantee that CSS class selectors, text identifier keys, images, and other modifiable elements will not change. It is each company's responsibility to maintain and update their branding settings.
:::

#### Custom Login Screen Example {#login}
_Here's an example of a customized startup screen with a new logo and side image. Furthermore, Google Sign-in was enabled in this customization, and the browser tab was set to display the company´s name._

<img alt="login" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_branding_04.png')} />
<br/>

#### Custom Platform Example {#platform-example}
_Below is an example of how you can change colors, customize buttons, and add a logo on the Cotalker platform._

<img alt="branding css" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_branding_01.png')} />
<br/>

_The CSS code used for the example shown above is included in the [CSS Settings](#css) section._

## How-To {#how-to}
To apply changes, you must: 
1. Make an [API PATCH request to the _companies_ endpoint](/docs/documentation/api/company#patch-company). 
2. The _body_ of the request must contain a `branding` object.

:::tip
- Examples and tips for the API request with _body_ details are given below.
- The `branding` object that must be included in the request body is described in the [`companies.branding`](/docs/documentation/models/company/company_branding) **data model** specifications.
- The API reference guide for the **PATCH** request on the _companies_ endpoint is available in the [Update a Company](/docs/documentation/api/company#patch-company) section.
:::

_Below is an example of the request being made through Postman._

<img alt="postman request" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_branding_00.png')} />
<br/>

### API Request {#api}
To make changes to Cotalker's UI, send an API request to your company's endpoint using the PATCH method. The request must contain the `branding` object in its body. More about the request body is described [below](#body).

_Request method and endpoint URL:_  
[`PATCH https://www.cotalker.com/api/v1/companies/{ObjectId<COTCompany>}`](/docs/documentation/api/company#patch-company)

:::tip
The **{ObjectId<COTCompany\>}** path parameter is your company's ObjectId, which can be found in the _companies_ endpoint in the `_id` field. You can access the endpoint through the [Get a Company](/docs/documentation/api/company#get-company) API request.
:::

### Body {#body}
_Send a request body with a `branding` object, as shown in the example below:_

```json
{
    "branding": {
        "isActive": true,
        "names": {
            "name": "kohannya",
            "shortName": "Kohannya"
        },
        "urls": {
            "app": "https://kohannya.dev.cotalker.com",
            "api": "https://dev.cotalker.com"
        },
        "translations": {
            "en": {
                "admin.main_title": "Адміністративна панель",
                "subjects.state_machine_groups_other": "Групи робочого процесу",
                "subjects.state_machine_other": "Робочі процеси",
                "subjects.link_groups": "Групи посилань",
                "subjects.group_other": "Групи",
                "descriptors.admin_menu_section": "Розділи"
            }
        },
        "style": {
            "customCss": ".login-right-side-whitelabel-img {background: #FFFFFF} .empty-channel-state {background: #FFE800} .profile-section-background {background: #004DFF} .search-bar-container {background: #004DFF} .side-menu {background: #004DFF} .group-menu-button {background: #004DFF} .administrations-menu-button {background: #004DFF} .feature-container {background: #FFE800}"
        },
        "images": {
            "logotype": "62a09637cf27b4b1e16a88c4",
            "isotype": "62a00adccf27b45eb96a88be",
            "icon512": "62a00af2cf27b464c46a88c0",
            "login": "629fadc1cf27b4e7046a88ba"
        },
        "auth": {
            "azureAD": {
                "isActive": false,
                "clientId": "",
                "authority": "",
                "redirectUri": ""
            },
            "googleSignIn": {
                "isActive": true
            }
        }
    }
}
```

### CSS Settings {#css}
Copy and paste your CSS code in the `branding.style.customCss` field. The code must be sent in string format, i.e., contained within quotation marks.

:::tip
You can obtain _selectors_, i.e., the CSS tags associated with the elements you want to modify, with Chrome Developer Tools or a Chrome extension like [CSS Peeper](https://chrome.google.com/webstore/detail/css-peeper/mbnbehikldjhnfehhnaidhjhoofhpehk). 
:::

#### Code Samples {#css-samples}

_The CSS code displayed here corresponds to the example shown in the [Overview](#platform-example) section:_

```json
{
    "branding": {
        "style": {
            "customCss": {
                ":root { --white-label-primary-color: #FCFEFF; --secondary-color: rgba(var(--white-label-secondary-color), 0.12); --secondary-color-focus: #028AFB; --general-menu-text-color: 150, 150, 150; --profile-background-color: #E7EAED; --profile-name-color:  black; --profile-email-color:  black; --menu-buttons-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25); --menu-buttons-text-color: #969696; --menu-buttons-text-color-selected: white; --search-bar-background-color: #028AFB;} cotalker-task-list {background-color: white;} cotalker-task-item cotalker-tag .tag-container {background-color: #E2E6EA !important;} cotalker-task-item cotalker-tag span {color: rgba(17,51,85,.56) !important;} cotalker-group-menu .logged-user-status-display {color: green !important;} cotalker-group-menu .cot-icon-font {opacity: 1 !important;} cotalker-group-menu.expanded .cot-icon {filter: contrast(1) brightness(1) opacity(1) !important;} cotalker-group-menu .cot-icon {opacity: 1 !important; filter: contrast(0) brightness(1) opacity(0.85) !important;}"
            }
        }
    }
}
```

_This CSS code corresponds to the example displayed below:_

```json
{
    "branding": {
        "style": {
            "customCss": {
                ":root {--white-label-primary-color: #4D4F53;} cotalker-root {background-color: #E5E5E5;} .login-container {background-color: #8BBB00;} .group-menu-overlay {background-color: rgba(77, 79, 83, 0.24);} .whitelabel-powered-by-cotalker {background-color: rgba(255, 255, 255, 0.12);} .account-widget a {background-color: rgba(77, 79, 83, 0.97);} .account-widget.selected a, .account-widget a:active, .account-widget a:focus {background-color: rgba(255, 255, 255, 0.12);} .side-menu li a.selected, .side-menu li a.group-item:active, .side-menu li a.group-item:focus {background-color: rgba(255, 255, 255, 0.12);} .expanded .account-widget a:hover {background-color: rgba(255, 255, 255, 0.12);} .expanded .account-widget.selected a, .expanded .account-widget a:active, .expanded .account-widget a:focus {background-color: rgba(255, 255, 255, 0.12);} .expanded .side-menu li a:hover {background-color: rgba(255, 255, 255, 0.12);} .expanded .side-menu li a.selected, .expanded .side-menu li a.group-item:active, .expanded .side-menu li a.group-item:focus {background-color: rgba(255, 255, 255, 0.12);}"
            }
        }
    }
}
```

<img alt="branding css" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_branding_02.png')} />
<br/>

### Images {#images}
To change images and icons, you must:
1. First, upload the images. Use the [_Upload a File_](/docs/documentation/api/communication/files#post-new) request to upload your image files. In the request body, set the _uploadInput_ key to `{ "public": true }`.
2. Use the request's _response_ to get the image's ObjectId. The _response_ follows the [COTFile](/docs/documentation/models/communication/file) data model.
3. Use the ObjectIds as values in the corresponding `branding.images` fields. 

#### Code Sample: {#images-example}
_Example:_
```json
{
    "branding": {
        "images": {
            "logotype": "628b9648dd6676581d5fd491",
            "isotype": "629e6e6af9a744da09a43f73",
            "icon512": "629e6e73697a860893d8fd2a",
            "login": "629e6e7b8ee85377e2b73da7"
        }
    }
}
```

Image Field | Description
--- | ---
logotype | Corresponds to the logo displayed in the login screen, and above the main menu bar on the platform UI.
isotype | When the main menu bar is retracted, this image replaces the hamburger icon.
icon512 | This is the company icon and is displayed while the platform is loading or refreshing.
login | This is the image displayed on the righthand panel of the login screen.


### Text Translation {#keys}
Currently, there are three language sets for the Cotalker UI: English (en), Spanish (es), and Portuguese (pt). The language is chosen automatically depending on the language you have your browser set on. For example, if your browser is set to Spanish, then Cotalker will automatically set itself to Spanish. If you use any language other than Spanish or Portuguese, it will be set to English.

In case your company wishes to translate Cotalker's UI to another languger or perhaps even modify default UI texts into something more appropiate for your company's identity or culture, you can introduce the required modifications into the `branding.translations` object.

To change UI text, you must indicate the _text identifier key_, i.e., the text section you wish to modify, with its corresponding new value in the `branding.translations` object.

:::tip
Ask your Cotalker representative or support team for the corresponding _text identifier keys_.
:::

#### Code Samples {#translation-code}
_Translated text sections:_

<img alt="translations" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_branding_03.png')} />
<br/>

_The code used for the example above modifies the English version:_
```json
{
    "branding": {
        "translations": {
            "en": {
                "admin.main_title": "Адміністративна панель",
                "subjects.state_machine_groups_other": "Групи робочого процесу",
                "subjects.state_machine_other": "Робочі процеси",
                "subjects.link_groups": "Групи посилань",
                "subjects.group_other": "Групи",
                "descriptors.admin_menu_section": "Розділи"
            }
        }
    }
}
```

### External Authentification {#auth}
Through the `branding.auth` object, you can also enable user login with your company's Google and Microsoft accounts.

:::tip
- Go to the [COTCompany](/docs/documentation/models/company/model_company) data model section for `branding.auth` field descriptions.
- Visit the [Microsoft Azure AD Sign-in Configuration](/docs/documentation/admin/special_configurations/azure_config) section for a step-by-step tutorial.
- Ask your Cotalker sales representative or support team for more information.
:::

:::note
This feature's availability may depend on your company's Cotalker plan. Speak with your Cotalker sales representative for more information.
:::

#### Code Sample {#auth-code}

```json
{
    "branding": {
        "auth": {
            "azureAD": {
                "isActive": false,
                "clientId": "",
                "authority": "",
                "redirectUri": ""
            },
            "googleSignIn": {
                "isActive": true
            }
        }
    }
}
```
