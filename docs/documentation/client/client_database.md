---
id: database
title: Database
sidebar_label: Database
---
import useBaseUrl from '@docusaurus/useBaseUrl'; 
import Component1, {toc as Title1TOC} from '/docs/documentation/admin/database/_asset_viewer.mdx';
import Component2, {toc as Title2TOC} from '/docs/documentation/admin/database/_asset_create.mdx';


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
_After selecting an asset (element) from within a collection, the asset viewer window pops up._

<Component1 layout={useBaseUrl('img/database_viewer_01.png')} />

## Create Asset {#create-asset}

_To create a new asset (element):_

<img alt="create asset" className="img_sizing item shadow--tl" src={useBaseUrl('img/database_viewer_02.png')} />
<br/>

- **<span className="badge badge--success">A.</span>** From the **Main Menu**, select <span className="badge badge--primary">Database</span>.
- **<span className="badge badge--success">B.</span>** The **Collections** panel appears within the **Database** viewer.
- **<span className="badge badge--warning">C.</span>** Select a _collection_ from the list.
- **<span className="badge badge--warning">D.</span>** Press the <span className="badge badge--secondary">+</span> to create a new asset (element) to open the **Create** settings panel.

_The **Create** settings panel appears as shown below:_

<Component2/>