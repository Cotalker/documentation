


| branding | Allows customizing certain aspects of Cotalker's UI, i.e., platform colors, images, and text. Also enables login authentication with an organization's Google and Microsoft accounts. | object | Visit the [Branding Settings](/docs/documentation/admin/special_configurations/branding) section for examples and tips. |
| branding.isActive | Activates the use of custom images. If `true`, the custom images contained in the `images` object are displayed. | boolean | |
| branding.names | Allows overriding the default platform name. | object | |
| branding.names.name | Corresponds to the environment build name, i.e., the code name by which the system identifies the customized version of the platform. | string |  |
| branding.names.shortName | Customized name to be displayed externally, such as in the web browser tab. | string | |
| branding.urls | Indicates the organization's Cotalker platform URLs. | string | |
| branding.urls.app | The organization's web app URL. | string | Example: `"https://company.cotalker.com"` |
| branding.urls.api | The REST API URL. | string | Example: `"https://www.cotalker.com"` |
| branding.style | Contains platform color and button configurations. | object | |
| branding.style.customCss | CSS code in string format. | string | Check the [Branding Settings](/docs/documentation/admin/special_configurations/branding#css) section for CSS examples. |
| branding.auth | Contains settings to enable external credential login. | object | |
| branding.auth.azureAD | Settings needed to enable Microsoft Azure login. | object | Go to [Microsoft Azure AD Sign-in Configuration](/docs/documentation/admin/special_configurations/azure_config) for complete setup information. |
| branding.auth.azureAD.isActive | Activates Azure login settings. | boolean | |
| branding.auth.azureAD.clientId | Contains the Application (client) ID. | string | Check step 15 of the [Microsoft Azure AD Sign-in Configuration](/docs/documentation/admin/special_configurations/azure_config) for information on how to obtain this value. |
| branding.auth.azureAD.authority | Contains the Directory (tenant) ID. | string | Check step 15 of the [Microsoft Azure AD Sign-in Configuration](/docs/documentation/admin/special_configurations/azure_config) for information on how to obtain this value. |
| branding.auth.azureAD.redirectUri | Indicates the redirect URI used for enabling Azure login. | string | Please ask your Cotalker sales representative or support team to supply the redirect URI. |
| branding.auth.googleSignIn | Settings to enable Google Gmail login. | object | |
| branding.auth.gooogleSignIn.isActive | Indicates if Google Gmail login is enabled. | boolean | |
| branding.images | Indicates images used to replace the defaults. | object | |
| branding.images.login | Contains the ObjectId of the custom image to be used on the righthand side of the login screen. | [ObjectId<COTFile\>](/docs/documentation/models/communication/file) | |
| branding.images.email | Contains the ObjectId of a custom image to be used as a logo on automatically generated emails. | [ObjectId<COTFile\>](/docs/documentation/models/communication/file) | |
| branding.images.logotype | Contains the ObjectId of a title-with-logo image to be used on the login screen and above the main menu bar. | [ObjectId<COTFile\>](/docs/documentation/models/communication/file) | |
| branding.images.isotype | Contains the ObjectId of a custom image used to replace the hamburger icon of the retracted main menu bar. | [ObjectId<COTFile\>](/docs/documentation/models/communication/file) | |
| branding.images.icon512 | Contains the ObjectId of a custom image to be used as the in-progress icon. | [ObjectId<COTFile\>](/docs/documentation/models/communication/file) | |
| branding.translations | Allows overriding default app text with customized versions or translations into other languages. <br/>The `key`, i.e., text section identifier, can be obtained through your Cotalker representative or support team. | object | **Format:** `"translations": {"en": {[key]: string}}` <br/>**Example:** `"translations": {"en": {"subjects.link_groups": "Групи посилань", "subjects.group_other": "Групи"}}`. |
| branding.translations.en | This object overrides the default English platform texts with custom translations or versions. | object | |
| branding.translations.en.[key] | Indicates the new text to be used in the indicated key or text section. | string | |
| branding.translations.es | This object overrides the default Spanish platform texts with custom translations or versions. | object | |
| branding.translations.es.[key] | Indicates the new text to be used in the indicated key or text sections | string | |