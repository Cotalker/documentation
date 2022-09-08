---
title: Microsoft Azure AD Sign-in Configuration
--- 

import useBaseUrl from '@docusaurus/useBaseUrl'; 

Microsoft Work sign-in is available on Enterprise editions.

<img alt="microsoft sign-in" className="img_sizing item shadow--tl" src={useBaseUrl('img/platform_versions_microsoft.png')} />
<br/>

To enable users to sign in with Microsoft Work accounts, some configuration is required. Contact your Cotalker sales representative to obtain a _Redirect URI_ before commencing the configuration.

_Follow these simple steps:_

<div className="alert alert--secondary">

1. Sign in to the [Azure portal](https://portal.azure.com).

</div>
<br/>

<div className="alert alert--secondary">

2. If you have access to multiple tenants, use the **Directory + subscriptions** filter in the top menu to select the _tenant_ in which you want to register the application.

<img alt="directory + subscriptions" className="img_sizing item shadow--tl" src={useBaseUrl('img/azure_config_00.png')} />
<br/>

</div>
<br/>

<div className="alert alert--secondary">

3. From the **Home** page, search for and select **Azure Active Directory**.

<img alt="Azure Active Directory" className="img_sizing item shadow--tl" src={useBaseUrl('img/azure_config_01.png')} />
<br/>

</div>
<br/>

<div className="alert alert--secondary">

4. On the left-side panel, under **Manage**, select **App registrations**, then press **New registration**.

<img alt="App registration" className="img_sizing item shadow--tl" src={useBaseUrl('img/azure_config_02.png')} />
<br/>

</div>
<br/>

<div className="alert alert--secondary">

5. From the **Register an application** page:
    1. Enter a _Name_ for the application. "Cotalker" is a suitable name. Cotalker _users_ might see this _name_, and if necessary, you can change it later.  
    2. Choose "Accounts in this organizational directory only" as the _Supported account type_ for the application. 
    3. Do NOT enter a _Redirect URI_.  
    4. Press _Register_ to create the app registration.

<img alt="register app" className="img_sizing item shadow--tl" src={useBaseUrl('img/azure_config_03.png')} />
<br/>

<br/>

</div>
<br/>

<div className="alert alert--secondary">

6. From the left-side panel, under **Manage**, select **Authentication**, then press **Add a platform**.

<img alt="add platform" className="img_sizing item shadow--tl" src={useBaseUrl('img/azure_config_04a.png')} />
<br/>

</div>
<br/>

<div className="alert alert--secondary">

7. On the right-side panel, **Configure platforms**, under **Web applications**, select the **Single-page application** tile.

<img alt="single-page app" className="img_sizing item shadow--tl" src={useBaseUrl('img/azure_config_04.png')} />
<br/>

</div>
<br/>

<div className="alert alert--secondary">

8. On the right-side panel, **Configure single-page application**:
    1. Under **Redirect URIs**, enter a _redirect URI_. This value is supplied by Cotalker.
    2. Press **Configure** to finish adding the redirect URI.
    
<img alt="Configure single-page application" className="img_sizing item shadow--tl" src={useBaseUrl('img/azure_config_05.png')} />
<br/>

:::note
Do NOT enter a _redirect URI_ that was not supplied by Cotalker.  
Do NOT select any of the _implicit_ or _hybrid flow_ checkboxes.
:::

</div>
<br/>

<div className="alert alert--secondary">

12. On the left-side panel, under **Manage**, select **Token configuration**, then press **Add optional claim**.

<img alt="Token configuration" className="img_sizing item shadow--tl" src={useBaseUrl('img/azure_config_06.png')} />
<br/>

</div>
<br/>

<div className="alert alert--secondary">

13. On the right-side panel, **Add optional claim**:
    1. Under **Token type**, select **ID**. 
    2. Then select the _email_, _family\_name_ and _given\_name_ checkboxes.
    3. Press **Add** to continue adding the optional claim.

<img alt="Token type" className="img_sizing item shadow--tl" src={useBaseUrl('img/azure_config_07.png')} />
<br/>

</div>
<br/>

<div className="alert alert--secondary">

14. A pop-up window appears:
    1. Select the _checkbox_ "Turn on the Microsoft Graph email, profile permission (required for claims to appear in token)".
    2. Press **Add** to finish adding the optional claim.

<img alt="pop-up window" className="img_sizing item shadow--tl" src={useBaseUrl('img/azure_config_08.png')} />
<br/>

</div>
<br/>

<div className="alert alert--secondary">

15. Finally, Cotalker requires two values from the app just created. These values are found under the **Overview** option in the previously created app view (Azure Active Directory > App registrations > Cotalker): 
    1. **Application (client) ID**
    2. **Directory (tenant) ID**

<img alt="overview" className="img_sizing item shadow--tl" src={useBaseUrl('img/azure_config_09.png')} />
<br/>

Once you have these values, update your Cotalker platform's configuration through an [API PATCH request to the _companies_ endpoint](/docs/documentation/api/company#patch-company). The request must contain the following body filled out with the corresponding values: 

```json
{
    "branding": {
        "auth": {
            "azureAD": {
                "isActive": true,
                "clientId": "", //APPLICATION (CLIENT) ID
                "authority": "", // DIRECTORY (TENANT) ID
                "redirectUri": "" // OBTAIN REDIRECT URI FROM COTALKER STAFF.
            }
        }
    }
}
```

For more details about the request body, go to the [COTCompany](/docs/documentation/models/company/model_company) data model section.


</div>
<br/>

