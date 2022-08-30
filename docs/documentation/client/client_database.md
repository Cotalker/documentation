---
id: database
title: Database
sidebar_label: Database
---
import useBaseUrl from '@docusaurus/useBaseUrl'; 
import Highlight from '@theme/Highlight';

<img alt="design" className="img_sizing" src={useBaseUrl('img/design/Database.svg')} />

## Overview {#database-overview}
The **Database viewer** gives non-administrative _users_ access to company data. With this tool, users can view, create, and edit company asset data. 

:::info
- Technically speaking, the displayed data consists of [collections](/docs/documentation/client/basic_concepts#collection) and [elements](/docs/documentation/client/basic_concepts#elements) stored in the Cotalker platform.
- _Elements_ are usually referred to as _assets_ because they can represent a company's tangible and intangible assets.
- The _Database viewer_ only displays assets selected through the [Database panel](/docs/documentation/admin/database/admin_collections#collection-settings-general).
- Each company can create and group assets into _collections_ according to its needs.
- Assets are defined by their internal information, which is usually divided into the following categories: 
    - general information, 
    - custom information,
    - related assets, 
    - related channels, 
    - associated surveys
:::

## Accessing the Database Viewer {#access}
_To access the Database viewer:_

<img alt="access database viewer" className="img_sizing item shadow--tl" src={useBaseUrl('img/database_viewer_00.png')} /> 
<br/>

- **<span className="badge badge--success">A.</span>** From the **Main Menu**, select <span className="badge badge--primary">Database</span>.
- **<span className="badge badge--success">B.</span>** The **Collections** panel appears within the **Database** viewer.
- **<span className="badge badge--warning">C.</span>** Select a _collection_ from the list.
- **<span className="badge badge--warning">D.</span>** The _elements/assets_ contained within the chosen _collection_ appear in the panel.


## Asset Viewer {#element-view}
_After selecting an asset from within a collection, the asset viewer window pops up._

<img alt="asset viewer" className="img_sizing item shadow--tl" src={useBaseUrl('img/database_viewer_01.png')} /> 
<br/>

- **<span className="badge badge--danger">A.</span> Displays the asset's QR code.** _The QR code can be printed and placed in strategic places, allowing users to access asset data by scanning the code with their mobile devices. Go to the [**Asset QR Code**](/docs/documentation/admin/database/asset_qr) section for more details._
- **<span className="badge badge--success">B.</span> Opens asset reports and actions.** _Reports and actions have to be previously [configured by admins](/docs/documentation/admin/database/asset_reports_actions). These features can be set to:_ 
    - Display **tasks** associated with the asset
    - Open **forms** associated with the asset
    - Display data gathered from the **SQL database**
- **<span className="badge badge--warning">C.</span> Asset settings display.** _These [settings](/docs/documentation/admin/database/admin_elements#settings) include asset data and associations:_ 
    - **General information**: Basic information and associated child _elements_ or _assets_.
    - **Additional fields**: Additional fields are custom fields set for all the _assets_ within the _collection_.
    - **Additional attributes**: Adds extra information. Deprecated, only used on legacy systems.
    - **Channels**: Displays chat _channels_ associated with the _element_.
    - **Associated surveys**: Displays submitted survey forms associated with the element.
    - **Child elements**: Displays a list of any child elements.
    - **Parent elements**: Displays a list of any parent elements.
- **<span className="badge badge--primary">D.</span> Close the asset window.** _Close the asset window without saving. Clicking outside the asset window will also bring you back to the database viewer._
- **<span className="badge badge--primary">E.</span> Deactivates the current asset.** _The asset is no longer available once deactivated. Only a user with access to the [Administrative Panel](/docs/documentation/admin/database/admin_elements) can reactivate the asset._
- **<span className="badge badge--primary">F.</span> Saves the asset with the latest changes.** _If the user has writing privileges, they can make changes to existing assets, along with the ability to create new ones._