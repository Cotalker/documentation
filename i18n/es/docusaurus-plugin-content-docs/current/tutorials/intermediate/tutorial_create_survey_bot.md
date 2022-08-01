---
id: create_survey_bot
title: Create Survey-Triggered Parametrized Bot
---

:::caution Advertencia
Esta página aún no se encuentra traducida al español.
:::
import useBaseUrl from '@docusaurus/useBaseUrl'; 

Tutorial on how to activate a bot after submitting a survey.

Time: 25 minutes

## Company Requirements {#company-requirements}
We want to improve HR's idea exposed in the [Create Survey Tutorial](/docs/tutorials/basic/create_survey) for welcoming new employees. To help break the ice, we propose that every time an in-coming employee answers the "New Pal" survey, a bot representing the company mascot or some fictional character welcomes them with a message and an animated gif.

The welcoming message would go something like this:

> Welcome {**nickname**}! I wish you all the best of luck in this new journey in the company! Hey team, say hi to our new pal from the {**department**} area!

## Pre-Requisites {#pre-requisites}

#### Access Role {#access-role}
* _User_ with the `admin-groups-write`, `admin-properties-write` and `admin-bots-write` permissions to create and modify groups, databases and bots. 
* Or the `admin-*-write` which allows all of the above. 
* _User_ with the `read admin` access role .

#### Survey {#survey}
* Having completed the [Create Survey Tutorial](/docs/tutorials/basic/create_survey)

#### User {#user}
* Having completed the [Create User Tutorial](/docs/tutorials/basic/create_user)
* A fictional character or company mascot created as a _user_. We will need to use their email address later on in the tutorial.
:::note 
In this example, `pet@cotalker.com` is the email of the created pet/fictional _user_.
:::

## Steps {#steps}

### I. Create the Bot {#i-create-the-bot}

<div className="alert alert--secondary">

1. Access the <span className="badge badge--primary">Administrator</span> and open <span className="badge badge--primary">Bots</span>.

</div>
<br/>

<div className="alert alert--secondary">

2. Press <span className="badge badge--primary">+</span> icon to create a new _bot_.

</div>
<br/>

<div className="alert alert--secondary">

3. Set up the following:

    1. In the <span className="badge badge--primary">General information</span> section, set:
        - **Name**: `New pal bot`
        - **Code**: `newpalbot_1`
        - **Description**: `Welcomes new members to the company.`

    2. In the <span className="badge badge--primary">Access</span> section, set:
        - **Access Roles**: `default`

    3. In the <span className="badge badge--primary">Functions</span> section, set:
        - **It's a survey command**: _activate option_
        - **Form**: `New pal`

_So far, your screen should look something like this:_

<img alt="settings" className="img_sizing item shadow--tl" src={useBaseUrl('img/tutorial_inter_survey_bot_00.png')} />
<br/>

</div>
<br/>

<div className="alert alert--secondary">

4. Build the routine:

    1. In the <span className="badge badge--primary">Routine builder</span> section:
        - Press the <span className="badge badge--primary">+ Add Routine</span> button.
        - New settings will appear.
       _You should see something like this:_
       ![Routine builder](/img/tutorial_inter_survey_bot_01.png)
    --------
    2. Add the first stage by pressing the <span className="badge badge--primary">+ Add stage</span> button, and set the following:
        - **Code**: `property_request`
        - **Type**: `Network Request` 
        - **URL** : `$JOIN#/#($ENV#BASEURL)#api#properties#($VALUE#data|[find=>identifier=department]|process|0)`
        :::note 
        The [Cotlang](/docs/documentation/automation/cotlang/admin_cotlang) string in the URL field gets the department's URL address.
        :::
        - **Method**: *GET*
        - **Default authentication**: _activate option_
    --------
    3. Scroll back up the <span className="badge badge--primary">Routine builder</span> section to add the second stage by pressing the <span className="badge badge--primary">+ Add Stage</span> button again. Set the following:
        - **Code**: `message`
        - **Type**: `Send Message` 
        - **Content**: `$JOIN# #Welcome#($VALUE#data|[find=>identifier=nickname]|process|0)#! I wish you all the best of luck in this new journey in the company! Hey team, say hi to our new pal from the#($OUTPUT#property_request#data|name|display)#area.`
        - **Content type**: `text/plain`
        - **User**: `($CODE#user#email#pet@cotalker.com)|_id`
        :::note 
        This [Cotlang] string will return the _COTuser_ that matches the email *pet@cotalker.com* and then obtain its *id*.
        :::
        - **Channel**: `$VALUE#channel`
        :::note 
        The context being accessed is _COTanswer_.
        :::
    --------
    4. Scroll back up and press <span className="badge badge--primary">+ Add Stage</span> to add the third stage. Set the following:
        - **Code**: `gif`
        - **Type**: `Enviar Gif`
        - In <span className="badge badge--primary">Búsqueda</span>, press the <span className="badge badge--primary">+ Add item</span>, and set:
            - **Item**: `Welcome Pal`
        - **Channel**: `$VALUE#channel`
        - **User**: `($CODE#user#email#pet@cotalker.com)|_id`
    --------
    5. Scroll back up again and set:
        - **Max. Iterations**: `10`
        - **Initial Stage**: `property_request`
    --------
    6. Select the <span className="badge badge--primary">property_request</span> stage. Then, scroll to the bottom of the section and configure the following:
        - Under **Outputs**, in the **Succeed** field: `message` 
    
    _The stages can be selected from this menu bar:_
    ![stages menu bar](/img/tutorial_inter_survey_bot_02.png)

    --------
    7. Select the <span className="badge badge--primary">message</span> stage. Scroll to the bottom of the section and configure the following:
        - Under **Outputs**, in the **Default** field: `gif`

</div>
<br/>

<div className="alert alert--secondary">

5. Press <span className="badge badge--primary">Save</span>.

</div>
<br/>

### II. Configure the Channel {#ii-configure-the-channel}

<div className="alert alert--secondary">

6. Access the <span className="badge badge--primary">Administrator</span> and open <span className="badge badge--primary">Groups</span>.

</div>
<br/>

<div className="alert alert--secondary">

7. Press the _group_ that has the channel with the whole team.
    :::note
    The team channel was created in the [Create Survey Tutorial](/docs/tutorials/basic/create_survey).
    :::

</div>
<br/>

<div className="alert alert--secondary">

8. Press the _channel_ where the whole team is found.

</div>
<br/>

<div className="alert alert--secondary">

9. Configure the <span className="badge badge--primary">Participants</span> section:
    - **Bots**: `New pal bot` 

_Your screen should look something like this:_

<img alt="edit channel" className="img_sizing item shadow--tl" src={useBaseUrl('img/tutorial_inter_survey_bot_03.png')} />
<br/>

</div>
<br/>

<div className="alert alert--secondary">

10. Press <span className="badge badge--primary">Save</span>.

</div>
<br/>


<div className="hero shadow--lw">
<div className="container">
<h1 className="hero__title">Congratulations!</h1>
<p className="hero__subtitle">

Now that you finished, go to the team channel and try to send the _New Pal_ survey.</p>

<img alt="team channel" className="img_sizing item shadow--tl" src={useBaseUrl('img/tutorial_inter_survey_bot_04.png')} />
<br/>
<div>
</div>
</div>
</div>


## Result {#result}

After submitting the survey, you should see a message like the following in the channel chat window :

<img alt="team channel" className="img_sizing item shadow--tl" src={useBaseUrl('img/tutorial_inter_survey_bot_05.png')} />
<br/>

