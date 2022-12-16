---  
title: Generate HTML-3.0.0  
displayed_sidebar: documentation  
---  
**Generates an HTML from a template and an object with data**  
key: PBTemplate  

import useBaseUrl from '@docusaurus/useBaseUrl';

## Overview {#overview}
The _Generate HTML_ bot creates an HTML file that can be used during the [routine](/docs/documentation/automation/admin_routine) by another [stage bot](/docs/documentation/automation/existing_routines) to structure and stylize information. 

:::tip
The [Create PDF (PBPdf)](/docs/documentation/automation/bots/pbpdf-3.0.0) stage bot can use the files created by _Generate HTML_ to produce PDF files with a standardized design and format that include relative task data. For example, it can be used to create invoices or purchase orders that automatically include client data, items, costs, and much more.
:::

## Settings Layout {#layout}

<div className="container">
<div className="row">
<div className="col col--6">

<div className="img_sizing">

![settings](/img/bot_html_template_01.png)


</div>
</div>

<div className="col col--6">

- **<span className="badge badge--success">1.</span> [Data (Object)](#1-data-key-content)**: <br/>JSON object with template keys and variable values. Use an object corresponding to either the default or customized template. [Template info below](#templates). 

- **<span className="badge badge--success">2.</span> [HTML Template (Code)](#2-html-template-key-htmltemplate)**: <br/>Customized HTML template goes here. The default template is used if no customized code is inserted.

- **<span className="badge badge--success">3.</span> [CSS Template (Code)](#3-css-template-key-csstemplate)**: <br/>Customized CSS template used for stylizing the HTML template.

- **<span className="badge badge--success">4.</span> [File Name](#4-file-name-key-filename)**: <br/>The file name used to store the HTML template. The template is summoned by its file name on HTML-compatible stages within the routine.

_<br/>To display items 2–4, you must select **+Add Optional Inputs**._

</div>

</div>
</div>

## Templates {#templates}
The _Generate HTML_ stage bot enables other stages within the routine to use either the default or a customized HTML template to generate their own documents.

Whether the default or a customized template is used, the **Data (Objects)** section must contain a JSON object with template keys and values.

:::tip
Within the **Data (Object)** section, you can use [COTLang](/docs/documentation/automation/cotlang/admin_cotlang) (Cotalker Scripting Language) to extract _context data_ and use it within the JSON object that contains the variables so that your templates are generated with the relative data. [Context data](/docs/documentation/automation/cotlang/triggers_and_contexts) can include things like assets, users, and other task details found within the database.
:::

:::caution Attention
You **must** save the HTML file by using the [**File Name**](#4-file-name-key-filename) option. Otherwise, the template will not be available for use by other stage bots during the routine.  
_Note: The file is stored in memory only during the routine._
:::

### Default template {#default}
The default template requires a JSON object with the following structure and keys:

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

:::note
- If no customized HTML Template is defined, the system will use the default template and expect the use of the JSON object shown above.
- The default template is similiar to the [default email template](/docs/documentation/automation/bots/pbemail-3.0.0#default) used for sending automatically generated emails within a routine.
:::

### Custom Template {#custom-template}
By pressing **Add Optional Inputs** within the settings panel, you can add a customized **HTML Template**.

The variable keys must be inserted with the `{{content.key}}` format.

_Below is a simple example of how to write your HTML code with its variable keys:_

```html
<!DOCTYPE html>
<html>
  <head>
  </head>
  <body>
    <h1>{{content.title}}</h1>
    <p>Your variable content can go here: {{content.value1}}</p>
    <p>And we can add this {{content.value2}} here.</p>
  </body>
</html>
```

_Below is an example of the JSON object with the template keys and their values that will appear in the final output:_

```json
{
  "title": "This is the Title",
  "value1": "$OUTPUT#stage1#data|item1",
  "value2": "$OUTPUT#stage1#data|item2"
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
_Below you will find the complete list of options available on the Generate HTML (v3.0.0) stage bot:_
---  
## Inputs  
### 1. Data (key: content)  
Data that will be used to build the HTML. In the template they are referenced as: '{{ content.key }}'. In case of using the default template, the keys are: 'recipientName', 'recipientEmail', 'companyName', 'title', 'messageA', 'messageB', 'action' and 'code'  
Required: true  
Data Type: object   
### 2. HTML Template (key: htmlTemplate)  
Template to use for HTML generation. It must be written in HTML language. If it is empty, the default template will be used. Documentation about how data is referenced in https://mustache.github.io/  
Required: no  
Data Type: code html  
### 3. CSS Template (key: cssTemplate)  
(Optional) Style to apply in the HTML. It must be written in CSS language  
Required: no  
Data Type: code css  
### 4. File name (key: fileName)  
Name of the file where you will write the HTML. By default the name is 'template.html'  
Required: no  
Data Type: string   
## Next Stages  
### 1. SUCCESS  
  
### 2. ERROR  
  
## Outputs  
### 1. File Path (key: filePath)  
  
Required: no  
Data Type: string   
### 2. Errors (key: errors)  
  
Required: no  
Data Type: array string