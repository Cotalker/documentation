---
id: create_bot
title: Create a Bot
---
import useBaseUrl from '@docusaurus/useBaseUrl'; 

Tutorial on how to create a _bot_.

Time: 20 minutes

:::tip Vocabulary Note:
A _bot_ is an automation that can be created within Cotalker. It can help companies with automating tasks and commands.
:::

## Company Requirements {#company-requirements}
#### Tutorial Objectives {#tutorial-objectives}

The company has a small problem: not all employees are regularly connected to the app, but we know that their email notifications are always active. To address this situation, we propose using a _bot_ that will contact the person through an email message whenever a _user_ in the _channel_ types `/emailbomb` along with the recipient's email address.

The email message will contain the sender's name and the _channel_ where the _bot_ was used.

## Pre-Requisites {#pre-requisites}

**Access Role**
* _User_ with the `admin-groups-write`, `admin-properties-write`,  and `admin-bots-write` permissions to create and modify groups, databases and bots. 
* Or`admin-*-write` which allows all of the above. 
* _User_ with the `web-admin-write` and `web-admin-read` permissions to set up the _Admin_.
* _User_ with the `read admin` access role.

**User**
* Having completed the [Create User Tutorial](create_user)

## Steps {#steps}
### I. Create "Email" Stage {#i-create-email-stage}
<div class="alert alert--secondary">

1. From the **Main Menu Bar**, access the <span class="badge badge--primary">Administrator</span> and open <span class="badge badge--primary">Bot</span>.

</div>
<br/>

<div class="alert alert--secondary">

2. Press the <span class="badge badge--primary">+</span> button to create a new _Bot_, as shown below:

<img alt="create new bot" class="img_sizing item shadow--tl" src={useBaseUrl('img/tutorial_bot_00.png')}/>
<br/>

_The following settings panel will open up:_

<img alt="create new bot" class="img_sizing item shadow--tl" src={useBaseUrl('img/tutorial_bot_01.png')}/>
<br/>

</div>
<br/>

<div class="alert alert--secondary">

3. In the settings panel, set up the following information:

  I. Under the <span class="badge badge--primary">General Information</span> section, fill in the following fields:
    * **Name**: `Email Bomb`
    * **User bot name**: `emailbomb`
    * **Description**: `Contact the person through email.`

  II. Under the <span class="badge badge--primary">Access</span> tab, enter the following information:
    * **Access Roles**: `default`

  III. Under the <span class="badge badge--primary">Functions</span> tab, set the following options:
    * **Global**: _activated_
    * **It's a survey command**: _deactivated_
    * **It's a slash command**: _activated_
    * **Slash command**: `emailbomb`

_Your screen should look something like the following image:_

<img alt="" class="img_sizing item shadow--tl" src={useBaseUrl('img/tutorial_bot_01a.png')}/>

</div>
<br/>

<div class="alert alert--secondary">

4. In the settings panel, open the <span class="badge badge--primary">Routine Builder</span> tab and press the <span class="badge badge--primary">+ Add Routine</span> button.

  _The following settings panel will open up:_

<img alt="routine builder" class="img_sizing item shadow--tl" src={useBaseUrl('img/tutorial_bot_02.png')}/>
<br/>

</div>
<br/>

<div class="alert alert--secondary">

5. Press <span class="badge badge--primary">+ Add Stage</span> to create the first stage of the _routine_. The following panel will open up:

<br/>
<img alt="create new bot" class="img_sizing item shadow--tl" src={useBaseUrl('img/tutorial_bot_03.png')}/>
<br/>

  - Set the following fields:

    - In **Code**, type `email`.
    - In **Type**, select `Send email`

  _Once the stage **Type** is defined, the **Options** fields will be displayed below, where you must specify the settings. It will look as follows:_

<img alt="email settings" class="img_sizing item shadow--tl" src={useBaseUrl('img/tutorial_bot_04.png')}/>
<br/>

- Fill the fields with the following information:

  * **Subject**: `Hey! We need to talk to you.`
  * **Data**: `{"recipientName":"","recipientEmail":"","companyName":"Ruanda","title":["Your team is looking for you."],"action":"","code":"","messageA":"$JOIN# #Your presence is requested in the #($VALUE#channel|nameDisplay)# channel.","messageB":""}`
  * In the **To** section, press <span class="badge badge--primary">+ Add Item</span>
  * Then, in the **Item** field, type `$VALUE#cmdArgs`

:::note Technical Notes:
- The **Data** field is written in _JSON_ format. It specifies the content of the email. In this case, _company name_, _email title_, and _message_ are written directly into the JSON object.
- The [_Cotlang_](/docs/documentation/automation/admin_cotlang) `VALUE#channel|nameDisplay` script in the **Data** field is used to refer to the channel that the _user_ was called in.
- The _Cotlang_ `$VALUE#cmdArgs` script in the **Item** field is used to get the email address that is next to the command. For example, if a _user_ types `/emailbomb vm@ruanda.cl` in the chat it will get `vm@ruanda.cl`.
:::

</div>
<br/>

### II. Create "Message" Stage {#ii-create-message-stage}

<div class="alert alert--secondary">

6. Scroll up to the top of the <span class="badge badge--primary">Routine Builder</span> section and press <span class="badge badge--primary">+ Add Stage</span> to create the second stage, which will generate the automated message sent to the chat once the email has been sent.

  _The screen should look like this:_

<img alt="" class="img_sizing item shadow--tl" src={useBaseUrl('img/tutorial_bot_05.png')}/>
<br/>

</div>
<br/>

<div class="alert alert--secondary">

7. In the options that opened up, set the following:

    - In the **Code** field, type: `message` 
    - In the **Type** field, select `Send Message` 
    - In **Content**, write the message that will be generated: `📩 Email sent ✅`.
    - In the **Content Type** field, write `text/system`.
    - In the **User** field, type `$VALUE#user|_id`.
    - In the **Channels** section, select **Advanced mode** and type `$VALUE#channel|_id`.

</div>
<br/>

<div class="alert alert--secondary">

8. Scroll back up to the top of the <span class="badge badge--primary">Routine Builder</span> and fill in the **Max. Iterations** field with `2`. Then, make sure that the **Initial Stage** is set to `email`.

:::note Important:
- _Each iteration is the execution of a stage. Therefore, you need as many iterations as you have stages. If any stage loops, you will have to count each loop as an iteration._
:::

</div>
<br/>

<div class="alert alert--secondary">

9. Select the **email** stage as shown below:

<img alt="go to email stage" class="img_sizing item shadow--tl" src={useBaseUrl('img/tutorial_bot_06.png')}/>
<br/>

</div>
<br/>

<div class="alert alert--secondary">

10. Next, scroll down to the bottom of the **email** stage and in the **Outputs** option select `message`.

<img alt="outputs option" class="img_sizing item shadow--tl" src={useBaseUrl('img/tutorial_bot_07.png')}/>
<br/>

</div>
<br/>

<div class="alert alert--secondary">

11. Scroll up to the top of the page and press <span class="badge badge--primary">Save</span>.

</div>
<br/>

## Result {#result}

Now the _bot_ is available on all _channels_.

If you direct yourself to a _channel_ and type `/emailbomb name@example.com`, the system will send an email to the indicated address and an automated message gets generated in the chat.

<br/>

_The screen should look something like this:_


<img alt="send email" class="img_sizing item shadow--tl" src={useBaseUrl('img/tutorial_bot_08.png')}/>

<br/>
<br/>

_The recipient will receive an email similar to this one:_

<img alt="sent email" class="img_sizing item shadow--tl" src={useBaseUrl('img/tutorial_bot_09.png')} />

<br/>

