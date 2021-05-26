---
id: admin_token
title: API Tokens
sidebar_label: API Tokens
---
import useBaseUrl from '@docusaurus/useBaseUrl'; 
import Highlight from '@theme/Highlight';

<img alt="title image" class="img_sizing" src={useBaseUrl('img/design/routines.svg')} />

## Overview {#overview}
An _API Token_ is a key or _bearer token_ that grants users different levels of permission to access the Cotalker API.

For information on how to use an API Token with our API, please refer to the [Auth section of the API documentation](/docs/documentation/api/auth#authorization).

:::tip Why use API Tokens?
API Tokens are useful in many ways:
- Partners can give access to part of the company data to external users by just sharing the _bearer token_.
- Bots or systems can impersonate other users with just part of their permissions.
- Admins can deactivate or modify permissions at any time.
- Create a _bearer token_ to let users and partners send messages in Cotalker channels.
:::

## How to Create an API Token {#create-token}
Users can create API Tokens by either:

- using the **Administrator** (This is the simplest way to create API Tokens, which we will discuss below.)
- or through the **Cotalker API**. (For information on how to obtain an API Token using the Cotalker API, please refer to the [Auth section of the API documentation](/docs/documentation/api/auth).)

#### Steps:

<div className="alert alert--secondary">

1. Go to the <span className="badge badge--primary">API Token</span> section in the _Administrative Panel_.

<img alt="administrative panel" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_token_00.png')} />
<br/>

</div>
<br/>

<div className="alert alert--secondary">

2. Press the <span className="badge badge--primary">+</span> icon in the upper-right corner.

  _You should see the following settings panel:_

<img alt="administrative panel" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_token_01.png')} />
<br/>

</div>
<br/>

<div className="alert alert--secondary">

3. Fill out the fields that appear in the settings panel with the following information:

    - A **name** and a **code** to identify the Api Token.
    - A **name** (_user bot name_) and an **avatar** to personify the user that will represent the token. (Yes! With API Token you could send messages to a specific channel.)
    - A set of _access roles_ to assign to the personified user.

</div>
<br/>

<div className="alert alert--secondary">

4. Press <span className="badge badge--primary">Save</span>. A pop-up window will appear indicating the token was successfully created.

<img alt="administrative panel" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_token_02.png')} />
<br/>

:::caution
Make sure to copy the token before closing the window because it will **not** appear again.
:::

</div>
<br/>

## Editing API Tokens {#edit-token}

Once created, API Tokens are permanent, but can be revoked or modified at any time.

To edit an existing API Token, go to the <span className="badge badge--primary">API Token</span> section in the _Administrative Panel_ and select the token you wish to edit from the list.

_The API Token list should look something like this:_

<img alt="administrative panel" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_token_04.png')} />
<br/>

_After selecting the desired token to edit, you will find yourself again with the following settings panel:_

<img alt="administrative panel" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_token_03.png')} />
<br/>