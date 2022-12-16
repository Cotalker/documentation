---  
title: Send email-3.0.0  
displayed_sidebar: documentation  
---  
**Send an email**  
key: PBEmail  

import useBaseUrl from '@docusaurus/useBaseUrl';

## Overview {#ovewrview}
The **Send Email** stage routine is a bot that automatically generates and sends customized emails within a routine.

## Settings Layout {#settings}

<div className="container">
<div className="row">
<div className="col col--6">

<div className="img_sizing_narrow">

![template](/img/bot_send_email_01v3.png)

</div>

</div>
<div className="col col--6">

- **<span className="badge badge--success">A.</span> [Subject](#1-subject-key-subject)**: String sent as the subject of the email.
- **<span className="badge badge--success">B.</span> [Data (Object)](#3-data-key-content)**: JSON object with email template keys and variable values. Use either the default or a customized template. [Template info below](#template).
- **<span className="badge badge--success">C.</span> [+ Add Item](#5-to-key-targets)**: Add recipient emails to an array.
- **<span className="badge badge--success">D.</span> Add Optional Inputs**: Optional inputs include:
  - [From](#2-from-key-from)
  - [Attachments](#4-attachments-key-attachments)
  - [CC](#6-cc-key-cc)
  - [BCC](#7-bcc-key-bcc)
  - [HTML Template](#8-html-template-key-htmltemplate)
  - [CSS Template](#9-css-template-key-csstemplate)
  - [Individual Shipping](#10-individual-shipping-key-singlerecipient)

</div>

</div>
</div>

## Templates {#template}
An HTML template is required to generate the email's basic design structure. You can choose between [_default_](#default) and [_customized_](#custom). Whichever option you choose, you must add the template's variables in the **Data (Object)** section in JSON format.

To use a custom template, you must select _HTML Template_ from the **Add Optional Inputs** section. Additionally, a _CSS Template_ can also be added for further customized design.

If you don't provide your own HTML template, the system will expect you to use the _default email template_.

:::tip
Within the **Data (Object)** section, you can use [COTLang](/docs/documentation/automation/cotlang/admin_cotlang) (Cotalker Scripting Language) to extract _context data_ and use it within the JSON object that contains the variables so that your automated emails are generated with the relative data. [Context data](/docs/documentation/automation/cotlang/triggers_and_contexts) can include things like assets, users, and other task details found within the database.
:::

### Default Email Template {#default}
When no template is provided, you must use the default template object to include variable content on your automated emails.

The default email template has 8 items in which you can include variable content. To add your customized content, include a JSON object in the **Data (Object)** section with the 8 default keys and the values you wish them to display.

_This is the basic structure of the data object corresponding to the default email template:_

```json
{
    "recipientName": string,
    "recipientEmail": string,
    "title": string,
    "messageA": string,
    "messageB": string,
    "action": string,
    "code": string,
    "companyName": string,
}
```

_Below is an example of what an email looks like using the default template:_

<div className="container">
<div className="row">
<div className="col col--6">

<div className="img_sizing_narrow">

![template](/img/bot_send_email_00v3.png)

</div>
</div>

<div className="col col--6">
<br/>

- **<span className="badge badge--danger">1.</span>** `recipientName`
- **<span className="badge badge--danger">2.</span>** `title`
- **<span className="badge badge--danger">3.</span>** `messageA`
- **<span className="badge badge--danger">4.</span>** `messageB`
- **<span className="badge badge--danger">5.</span>** `action`
- **<span className="badge badge--danger">6.</span>** `code`
- **<span className="badge badge--danger">7.</span>** `recipientEmail`
- **<span className="badge badge--danger">8.</span>** `companyName`

</div>

</div>
</div>

### Custom HTML Template {#custom}
If you wish to provide a custom template for your emails, add the **HTML Template** option from the **Add Optional Inputs** section.

Add your HTML code in the HTML Template code box.

The variables in your template must follow the `{{content.key}}` format.

_Below is a simple example of an HTML template:_

```html
<html>
  <head>
    <h1>Task Reminder: {{content.channel}}</h1>
  </head>
  <body>
    <p>Hi, {{content.recipientName}}!</p>
    <p>Remember to check and report on the status of {{content.equipment}}.</p>
    <p>Sent by: {{content.sentBy}}
  </body>
</html>
```

_In the **Data (Object)** section, the customized template's variables can be filled out with static and automated content, as shown in the example below:_

```json
{
  "channel": "$VALUE#channel",
  "recipientName": "Diego",
  "equipment": "$OUTPUT#get_property#data|name|display",
  "sentBy": "$VALUE#user"
}
```

:::tip
☞ Read the [mustache documentation](https://mustache.github.io/mustache.5.html) for more details and options for displaying variable and conditional content on your HTML template.
:::

### CSS Template

Through **Add Optional Inputs**, you can modify your HTML template's design with a **CSS Template**.

_Simply insert CSS code, as shown below:_ 

```css
p {
  text-decoration: underline;
  color: red;
}
```


---
_Below you will find the complete list of options available on the Send Email (v3.0.0) stage bot:_
---  
## Inputs  
### 1. Subject (key: subject)  
Subject of the email  
Required: true  
Data Type: string   
### 2. From (key: from)  
Email of the sender  
Required: no  
Data Type: string   
### 3. Data (key: content)  
Data that will be used to build the HTML. In the template they are referenced as: '{{ content.key }}'. In case of using the default template, the keys are 'recipientName', 'recipientEmail', 'companyName', 'title', 'messageA', 'messageB', 'action' and 'code'  
Required: true  
Data Type: object   
### 4. Attachments (key: attachments)  
Email attachments  
Required: no  
Data Type: array string  
### 5. To (key: targets)  
Array with the emails of the recipient  
Required: true  
Data Type: array string  
### 6. CC (key: cc)  
Array with the emails of the person receiving a copy  
Required: no  
Data Type: array string  
### 7. BCC (key: bcc)  
Array with the emails of those who receive a hidden copy  
Required: no  
Data Type: array string  
### 8. HTML Template (key: htmlTemplate)  
Template to use for HTML generation. It must be written in HTML language. If it is empty, the default template will be used. Documentation about how data is referenced in https://mustache.github.io/  
Required: no  
Data Type: code html  
### 9. CSS Template (key: cssTemplate)  
(Optional) Style to apply in the HTML. It must be written in CSS language  
Required: no  
Data Type: code css  
### 10. Individual shipping (key: singleRecipient)  
Indicates whether the mail should be sent individually to the recipients  
Required: no  
Data Type: boolean   
## Next Stages  
### 1. SUCCESS  
  
### 2. ERROR  
  
## Outputs  
### 1. Status (key: status)  
  
Required: no  
Data Type: boolean   
### 2. Errors (key: errors)  
  
Required: no  
Data Type: array string