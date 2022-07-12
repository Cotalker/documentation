---
id: create_bot
title: Create a Bot
---

:::caution Advertencia
Esta página aún no se encuentra traducida al español.
:::
import useBaseUrl from '@docusaurus/useBaseUrl'; 

<span className="hero__subtitle">

Tutorial on how to create a _bot_ summoned by a slash command sent as a message in a chat area.

</span>

Time: 20 minutes

:::tip Vocabulary Note:
A _bot_ is an automation triggered either by a _slash command_ or a _survey_. Every time a _bot_ is triggered, it executes a [_routine_](/docs/documentation/automation/admin_routine) with various stages. Choose from a variety of [_routine stage types_](/docs/documentation/automation/existing_routines) to give your bots all kinds of tools to gather data and carry out diverse automations.
:::

## Company Requirements {#company-requirements}
The company has a problem: not all employees are regularly connected to the app. But we know that their email notifications are always active. To address this situation, we propose using a _bot_ that will contact the person through an email message whenever a _user_ types `/emailbomb` along with the recipient's email address in a [chat area](/docs/documentation/client/channels#channel-workspace-layout).

The email will contain a message mentioning the _channel_ in which the person's pressence is required. Additionally, a system message will appear in the channel workspace indicating that the email was sent successfully.

## Tutorial Objectives {#tutorial-objectives}
- [A. Set up basic bot settings.](#basic-bot-settings)
- [B. Set the first routine stage ("Send email").](#first-stage)
- [C. Set the second routine stage ("Send message")](#second-stage)

## Pre-Requisites {#pre-requisites}
#### Access Role {#access-role}
- Due to the wide range of actions a bot can undertake, it is best if your _user_ profile's [_access role_](/docs/documentation/admin/admin_accessrole) counts with the `admin-*-write` permission that grants access to the entire **Administrative Panel**.

## Steps {#steps}
### A. Set Up Basic Bot Settings {#basic-bot-settings}

<div className="alert alert--secondary">

**I. Go to the Bots section.**

<img alt="bot section" className="img_sizing item shadow--tl" src={useBaseUrl('img/tutorials/tutorial_basic_bots_00.png')} />
<br/>

1. From the **Main Menu Bar**, press the <span className="badge badge--primary">Administrator</span> button.
2. In the **Administrative Panel**, select <span className="badge badge--primary">Bots</span>.
3. The **Bots** section opens up.

</div>
<br/>

<div className="alert alert--secondary">

**II. Open the Create Bot settings panel.**

<img alt="bot section" className="img_sizing item shadow--tl" src={useBaseUrl('img/tutorials/tutorial_basic_bots_00a.png')} />
<br/>

- Press the <span className="badge badge--primary">+</span> icon to open the **Create bot** settings panel.

</div>
<br/>

<div className="alert alert--secondary">

**III. Set basic settings.**

<img alt="bot section" className="img_sizing item shadow--tl" src={useBaseUrl('img/tutorials/tutorial_basic_bots_01.png')} />
<br/>

1. **Name**: _Email Bomb_
2. **User bot name**: _email\_bomb\_bot_
3. **Description**: _Send an automatically generated email to a user._
4. **Access Roles**: _default_
5. **Global**: Toggle on.
6. **It's a slash command**: Toggle on.
7. **Slash command**: _emailbomb_

</div>
<br/>

<div className="alert alert--secondary">

**IV. Open the routine builder.**

<img alt="bot section" className="img_sizing item shadow--tl" src={useBaseUrl('img/tutorials/tutorial_basic_bots_02.png')} />
<br/>

- At the bottom of the **Create bot** settings panel, under the **Routine Builder** tab and press the <span className="badge badge--primary">+ Add Routine</span> button to open the _Routine builder_ settings panel.

<br/>

</div>
<br/>

### B. Set First Routine Stage (Send Email) {#first-stage}

<div className="alert alert--secondary">

**I. Open Routine Stage settings.**

<img alt="bot section" className="img_sizing item shadow--tl" src={useBaseUrl('img/tutorials/tutorial_basic_bots_03.png')} />
<br/>

- A. From the **Routine builder** settings panel, press the<span className="badge badge--primary">+ Add Stage</span> button.
- B. A _New stage_ settings panel opens up.

:::note Attention
_Once you set the stage **Type** in the next step, more fields will open up according to the selected stage type._
:::

</div>
<br/>

<div className="alert alert--secondary">

**II. Set up the stage.**

<img alt="bot section" className="img_sizing item shadow--tl" src={useBaseUrl('img/tutorials/tutorial_basic_bots_04.png')} />
<br/>

1. **Code**: _email\_bot_
2. **Type**: _Send email_
3. **Subject**: _Hey! We need to talk with you._
4. **Company Name**: _Ruanda_
5. **Title**: _Your team is looking for you._
6. **Message A**: _I hope you're not too busy._
7. **Message B**: `$JOIN# #Your presence is requested in the #($VALUE#channel|nameDisplay)# channel.`
8. **Action**: Add a blank space or character since this is a required field.
9. **Code**: Add a blank space or character since this is a required field.
10. **Advanced mode**: Toggle on the _Advanced mode_ switch in the **To** field.
11. **To**: `$VALUE#cmdArgs`
12. Press <span className="badge badge--primary">+ Add Stage</span> and go to the following step.

:::note Cotlang Scripting Notes:
- In the **Message B** (7) and **To** (11) fields, we use some [_Cotlang_](/docs/documentation/automation/admin_cotlang) scripts to gather data from the [context](/docs/documentation/automation/triggers_and_contexts), i.e., the contextual data relative to the bot. The [data context of the slash command bot](/docs/documentation/automation/triggers_and_contexts#global-message-trigger) we are working with comes from the slash command that is sent as a message in a channel. More specifically, the context is the message itself, any extra arguments added to the slash command (in our case, the email address), and the channel the message was sent in.
- For example, in **Message B**, we use `$VALUE#channel|nameDisplay` command to get the channel name from the _channel_ context. And, to add the result to a string, we use `$JOIN#` command.
- In **To**, `$VALUE#cmdArgs` retreives data from the command arguments context, in this case, the email address. For example, if I execute the slash command typing _/emailbomb jane.doe@ruanda.com_, the command argument context would be `jane.doe@ruanda.com`.
:::

</div>
<br/>

### C. Set Second Routine Stage (Send Message) {#second-stage}

<div className="alert alert--secondary">

**I. Set up stage.**

<img alt="bot section" className="img_sizing item shadow--tl" src={useBaseUrl('img/tutorials/tutorial_basic_bots_05.png')} />
<br/>

_After pressing the <span className="badge badge--primary">+ Add Stage</span> button, set up the second stage with the following:_
1. **Code**: _message\_bot_
2. **Type**: _Send message_
3. **Content**: _📩  Email sent ✅_
4. **Content Type**: _text/system_
5. **User**: `$VALUE#message|sentBy`
6. **Channels**: Press the <span className="badge badge--primary">+ Add Item</span> button.
7. **Item**: `$VALUE#channel|_id`


</div>
<br/>

<div className="alert alert--secondary">

**II. Complete Routine setup.**

<img alt="bot section" className="img_sizing item shadow--tl" src={useBaseUrl('img/tutorials/tutorial_basic_bots_06.png')} />
<br/>

1. **Initial stage**: _email\_bot_
2. **Max. iterations**: _2_
3. **Success**: _message\_bot_ (Make sure you are on the **email\_bot** tab.)
4. Press <span className="badge badge--primary">Save</span>. You will be taken back to the **Bots** section.

:::note
_Each execution of a stage is an iteration. Therefore, you need as many iterations as you have stages. If any stage loops, you will have to count each loop as an iteration._
:::

</div>
<br/>



## Expected Result {#result}

Now the _bot_ is available on all _channels_.

If you direct yourself to a _channel_ and type `/emailbomb name@example.com`, the system will send an email to the indicated address and an automated system message gets generated in the chat area.

<br/>

<img alt="bot section" className="img_sizing item shadow--tl" src={useBaseUrl('img/tutorials/tutorial_basic_bots_07.png')} />
<br/>

_The recipient will receive an email similar to the one below:_

<img alt="bot section" className="img_sizing item shadow--tl" src={useBaseUrl('img/tutorials/tutorial_basic_bots_08.png')} />
<br/>

<br/>

<div className="align-center">

<iframe src="https://giphy.com/embed/OcZp0maz6ALok" width="90%" height="90%" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>

<p><a href="https://giphy.com/gifs/30-rock-liz-lemon-i-love-this-show-OcZp0maz6ALok">via GIPHY</a></p>

</div>
<br/>

---

## Related Topics {#related-topics}
- [Bots Section](/docs/documentation/admin/admin_bots): Administrative Panel documentation
- [Routine Builder](/docs/documentation/automation/admin_routine): Automation Tools documentation
- [Routine Stage Types](/docs/documentation/automation/existing_routines): Automation Tools documentation
- [COTBot](/docs/documentation/models/automations/model_bots): Bots data model
- [Bots API](/docs/documentation/api/automations/bots): REST API documentation
