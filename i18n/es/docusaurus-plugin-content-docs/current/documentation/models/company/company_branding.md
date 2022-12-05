---
title: Branding Data Model
---

:::caution Advertencia
Esta página aún no se encuentra traducida al español.
:::

import useBaseUrl from '@docusaurus/useBaseUrl';

<span className="hero__subtitle">COTCompany</span>

## Description {#description}
Within the [COTCompany](/docs/documentation/models/company/model_company) data model, the `companies.branding` object allows customizing certain aspects of Cotalker's UI, i.e., platform colors, images, and text. It also enables login authentication with an organization's Google and Microsoft accounts.

:::tip
Visit the [Branding Settings](/docs/documentation/admin/special_configurations/branding) section for examples and tips.
:::

## JSON Sample {#json}
Below is a sample of a COTCompany data model displaying one of the available `companies` in a database. An example of the `companies.branding` object can be found between lines 11 to 51.

```json {11} showLineNumbers
{
    "_id": "62f2b06e9682bd2711a27c46",
    "defaultCountry": "US",
    "defaultLanguage": "en",
    "isActive": true,
    "subdomain": "kohannya",
    "displayName": "kohannya",
    "legalName": "kohannya",
    "createdAt": "2022-05-23T14:12:24.879Z",
    "modifiedAt": "2022-06-30T16:05:53.011Z",
    "branding": {
        "isActive": true,
        "names": {
            "name": "kohannya",
            "shortName": "Kohannya"
        },
        "urls": {
            "app": "https://kohannya.cotalker.com",
            "api": "https://www.cotalker.com"
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
            "customCss": ":root { --white-label-primary-color: #FCFEFF; --secondary-color: rgba(var(--white-label-secondary-color), 0.12); --secondary-color-focus: #028AFB; --general-menu-text-color: 150, 150, 150; --profile-background-color: #E7EAED; --profile-name-color:  black; --profile-email-color:  black; --menu-buttons-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25); --menu-buttons-text-color: #969696; --menu-buttons-text-color-selected: white; --search-bar-background-color: #028AFB;} cotalker-task-list {background-color: white;} cotalker-task-item cotalker-tag .tag-container {background-color: #E2E6EA !important;} cotalker-task-item cotalker-tag span {color: rgba(17,51,85,.56) !important;} cotalker-group-menu .logged-user-status-display {color: green !important;} cotalker-group-menu .cot-icon-font {opacity: 1 !important;} cotalker-group-menu.expanded .cot-icon {filter: contrast(1) brightness(1) opacity(1) !important;} cotalker-group-menu .cot-icon {opacity: 1 !important; filter: contrast(0) brightness(1) opacity(0.85) !important;}"
        },
        "images": {
            "logotype": "62a09637cf27b4b1e16a88c4",
            "isotype": "62a00adccf27b45eb96a88be",
            "icon512": "62a00af2cf27b464c46a88c0",
            "login": "629fadc1cf27b4e7046a88ba"
        },
        "auth": {
            "azureAD": {
                "isActive": true,
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


## Fields {#fields}

| Field | Description | Type | Notes |
| --- | --- | --- | --- |
| **isActive** | Activates the use of custom images. If `true`, the custom images contained in the `images` object are displayed. | boolean | |
| **names** | Allows overriding the default platform name. | object | |
| **names.name** | Corresponds to the environment build name, i.e., the code name by which the system identifies the customized version of the platform. | string |  |
| **names.shortName** | Customized name to be displayed externally, such as in the web browser tab. | string | |
| **urls** | Indicates the organization's Cotalker platform URLs. | string | |
| **urls.app** | The organization's web app URL. | string | Example: `"https://company.cotalker.com"` |
| **urls.api** | The REST API URL. | string | Example: `"https://www.cotalker.com"` |
| **style** | Contains platform color and button configurations. | object | |
| **style.customCss** | CSS code in string format. | string | Check the [Branding Settings](/docs/documentation/admin/special_configurations/branding#css) section for CSS examples. |
| **auth** | Contains settings to enable external credential login. | object | |
| **auth.azureAD** | Settings needed to enable Microsoft Azure login. | object | Go to [Microsoft Azure AD Sign-in Configuration](/docs/documentation/admin/special_configurations/azure_config) for complete setup information. |
| **auth.azureAD.isActive** | Activates Azure login settings. | boolean | |
| **auth.azureAD.clientId** | Contains the Application (client) ID. | string | Check step 15 of the [Microsoft Azure AD Sign-in Configuration](/docs/documentation/admin/special_configurations/azure_config) for information on how to obtain this value. |
| **auth.azureAD.authority** | Contains the Directory (tenant) ID. | string | Check step 15 of the [Microsoft Azure AD Sign-in Configuration](/docs/documentation/admin/special_configurations/azure_config) for information on how to obtain this value. |
| **auth.azureAD.redirectUri** | Indicates the redirect URI used for enabling Azure login. | string | Please ask your Cotalker sales representative or support team to supply the redirect URI. |
| **auth.googleSignIn** | Settings to enable Google Gmail login. | object | |
| **auth.gooogleSignIn.isActive** | Indicates if Google Gmail login is enabled. | boolean | |
| **images** | Indicates images used to replace the defaults. | object | |
| **images.login** | Contains the ObjectId of the custom image to be used on the righthand side of the login screen. | [ObjectId<COTFile\>](/docs/documentation/models/communication/file) | |
| **images.email** | Contains the ObjectId of a custom image to be used as a logo on automatically generated emails. | [ObjectId<COTFile\>](/docs/documentation/models/communication/file) | |
| **images.logotype** | Contains the ObjectId of a title-with-logo image to be used on the login screen and above the main menu bar. | [ObjectId<COTFile\>](/docs/documentation/models/communication/file) | |
| **images.isotype** | Contains the ObjectId of a custom image used to replace the hamburger icon of the retracted main menu bar. | [ObjectId<COTFile\>](/docs/documentation/models/communication/file) | |
| **images.icon512** | Contains the ObjectId of a custom image to be used as the in-progress icon. | [ObjectId<COTFile\>](/docs/documentation/models/communication/file) | |
|** translations** | Allows overriding default app text with customized versions or translations into other languages. <br/>The `key`, i.e., text section identifier, can be obtained through your Cotalker representative or support team. | object | **Format:** <br/>`"translations": {"en": {[key]: string}}` <br/><br/>**Example:** <br/>`"translations": {"en": {"subjects.link_groups": "Групи посилань", "subjects.group_other": "Групи"}}` |
| **translations.en** | This object overrides the default English platform texts with custom translations or versions. | object | |
| **translations.en.[key]** | Indicates the new text to be used in the indicated key or text section. | string | |
| **translations.es** | This object overrides the default Spanish platform texts with custom translations or versions. | object | |
| **translations.es.[key]** | Indicates the new text to be used in the indicated key or text sections | string | |
