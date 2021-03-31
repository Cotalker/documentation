---
id: tutorial_scheduler
title: Create Scheduled Routine
author: Valentina Martínez
---
import useBaseUrl from '@docusaurus/useBaseUrl'; 

## Company Request {#company-request}
The Human Resources department of the Rwanda Company asks if cotalker can implement a bot that remembers the team's birthday on a monthly basis. So, every first of the month he sends a message of the birthdays of the month so that everyone has them in mind. <br/>

To make it more fun, cotalker offers to have the company's mascot send the message

## Functional Requirements {#functional-requirements}
**ACCESS ROLE**
* User with the permission `admin-*-write`, which allows all to access to the admin.
* User with the permissions `web-admin-write` and `web-admin-read` to set up in the admin.
* User with the access role `read admin`.

**CHANNEL**
* Create a channel that has the entire team on it. Save the channel id, we'll refer to it with *channel_id*

**USER**
* Create a user (company's mascot), who will send the birthday message on the team channel. Save the user id, we'll refer to it with *user_id*

**DATABASE**
* Create the collection *month_birthday* with the following elements with the addtional attribute named *display*:

| Name | Code | display |
|--------|--------|-------------|
| January | month_01 | Andres [2], Sergio I. [3], Ariel  [12], Guille Valin [20] and Julius [23] |
| February | month_02 | Mario [2] and Will Smith [12]  |
| March | month_03 | Valentina [15] and Aroon Piper [22] |
| May | month_05 | Javiera [16] and Cristian[15] |
| June | month_06 | Tom Holland [18] |
| July | month_07 | Joaquin [30] |
| August | month_08 | Roberto [13] |
| September | month_09 | Zac Effron [7] |
| October | month_10 | Lily Collins [3] |
| November | month_11 | Tom Cruse [5] |
| December | month_12 | Harry Style [20] and Ducker [17] |

## Steps {#steps}
1. Access the `administrator` and open `Workflows`
2. Press `+` button to create a new scheduler.
3. Set up the general information:
    * `Code`: *monthbirthday*
    * Active the button `Recurrence` 
    * Press `Monthly` option
    * `Every`: 1
    * `Day`: 1
    * `Hour`: 9
    * `Minute`: 0
4. Set up the *Routine builder*
    1. Press `+ Add Stage`
        * `code`: *get_date*
        * `type`: *Network Request* 
        * `URL`: *http://worldtimeapi.org/api/timezone/America/Santiago*
        * `Method`: *GET*

    2. Press `+ Add Stage`
        * `code`: *property*
        * `type`: *Network Request* 
        * `URL`: *$JOIN#/#($ENV#BASEURL)#api#properties#findByCode#($JOIN##month_#($OUTPUT#get_date#data|datetime|[date=>format=MM]))*
        * `Method`: *GET*
        * Active the button `Default authentication`
        :::note It needs to be active to use the cotalker api.
        :::
    3. Press `+ Add Stage`
        * `code`: *message*
        * `type`: *Send Message* 
        * `Content`: *$JOIN##(🎈 ¡This month we celebrate the following birthday! 🎈)#($OUTPUT#property#data|extra|display)*
        * `Content Type`: *text/plain*
        * `User`: *user_id*
        * In *Channel* press `+ Add Item`:
            * `Item`: *channel_id*
    4. Press `+ Add Stage`
        * `code`: *empty_condition*
        * `type`: *Conditional* 
        * `left side`: *$OUTPUT#property#data*
        * `right side`: *$CODE#users#email#asdasd@cotalker.com*
        * `Operator`: *neq*
        * `True Condition`: *message*
    5. `Max. Iterations`: *10*
    6. `Initial Stage`: *get_date*
    7. Set up the Outputs section of the *get_date* stage:
        * `Succed`: *property*
    8. Set up the Outputs section of the *property* stage:
        * `Succed`: *conditional*
5. Save.

## Result {#result}
