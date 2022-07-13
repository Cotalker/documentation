---
id: cutomizebot
title: Implement Custom Bot
author: Valentina Martínez
---

:::caution Advertencia
Esta página aún no se encuentra traducida al español.
:::
import useBaseUrl from '@docusaurus/useBaseUrl'; 

## Company Request {#company-request}
Cotalker realizes that the Ruanda Company team uses the value of the uf and dolar a lot when chatting. So, they offer them another feature: every time they want to know the daily value of those economic indicators, they only send */uf* or */dollar* to show it in chat. <br/>

To do that cotalker will use the api of *mindicador* https://mindicador.cl/ . It is an open source service that provides economic indicators for Chile in JSON format. The source of information is the Central Bank of Chile.<br/>
They also have the following indicators:
- unemployment rate
- euro
- ipc (consumer's price index)
- bitcoin
- among other

## Functional Requirements {#functional-requirements}
**Access Role**
* User with the permission `admin-*-write`, which allows all to access to the admin.
* User with the permissions `web-admin-write` and `web-admin-read` to set up in the admin.
* User with the access role `read admin`.

**User**
* Having completed [User Tutorial](/docs/tutorials/basic/create_user)

## Steps {#steps}
1. Access the `administrator` and open `bots`
2. Press `+` button to create a new bot.
3. Set up the *General Information*, *Access* and *Function sections*: 
    * `Name`: *UF*
    * `User bot name`: *uf*
    * `Description`: *ask for the price of the uf. Source: https://mindicador.cl/*
    * `Access roles`: *default*
    * `Global`: *Active*
    * `It's a survey command`: *Deactive*
    * `It's a slash command`: *Active*
    * `Slash command`: *uf*
4. Set up the *Routine builder*
    1. Press `+ Add Stage`
        * `code`: *uf_request*
        * `type`: *Network request* 
        * `URL`: https://mindicador.cl/api/uf
        :::note If you search for this link in a browser, you will see the response in json format
        :::
        * `Method`: *GET*
    2. Press `+ Add Stage`
        * `code`: *message*
        * `type`: *Send Message* 
        * `Content`: *$JOIN# #(Valor UF:)#($OUTPUT#uf_request#data|serie|0|valor)*
        :::note in *$OUTPUT#uf_request#data* you have access to the json response
        :::
        * `Content Type`: *text/system*
        * `User`: *$VALUE#user|_id*
        * `Channels`: *$VALUE#channel|_id*
    3. `Max. Iterations`: *10*
    4. `Initial Stage`: *uf_request*
    5. Configure the *uf_request* stage:
        * `Succed Output`: *message*
5. Save

**Now we will repeat the same step for the dollar request.**

6. Access the `administrator` and open `bots`
7. Press `+` button to create a new bot.
8. Set up the *General Information*, *Access* and *Function sections*: 
    * `Name`: *Dolar*
    * `User bot name`: *dolar*
    * `Description`: *ask for the price of the dolar. Source: https://mindicador.cl/*
    * `Access roles`: *default*
    * `Global`: *Active*
    * `It's a survey command`: *Deactive*
    * `It's a slash command`: *Active*
    * `Slash command`: *dolar*
9. Set up the *Routine builder*
    1. Press `+ Add Stage`
        * `code`: *dolar_request*
        * `type`: *Network request* 
        * `URL`: https://mindicador.cl/api/dolar
        * `Method`: *GET*
    2. Press `+ Add Stage`
        * `code`: *message*
        * `type`: *Send Message* 
        * `Content`: *$JOIN# #(Valor dolar:)#($OUTPUT#dolar_request#data|serie|0|valor)*
        * `Content Type`: *text/system*
        * `User`: *$VALUE#user|_id*
        * `Channels`: *$VALUE#channel|_id*
    3. `Max. Iterations`: *10*
    4. `Initial Stage`: *dolar_request*
    5. Configure the *dolar_request* stage:
        * `Succed Output`: *message*
10. Save


## Result {#result}
The bot will be look like this: 
<img alt="" src={useBaseUrl('img/tutorial_customizebot.png')} />

