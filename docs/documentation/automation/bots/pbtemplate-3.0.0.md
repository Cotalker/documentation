---  
title: Generate HTML-3.0.0  
displayed_sidebar: documentation  
---  
  
**Generates an HTML from a template and an object with data**  
key: PBTemplate  
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