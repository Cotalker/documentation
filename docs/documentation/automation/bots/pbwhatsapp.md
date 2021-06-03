# WhatsApp Integration  
import useBaseUrl from '@docusaurus/useBaseUrl';

<img alt="title image" className="img_sizing" src={useBaseUrl('img/design/Access_Roles.svg')} />
<br/>

## Overview {#overview}

This stage-bot permits sending automated messages to WhatsApp users.

You will need the following:
- A **contract code** (Refer to your contract addendum 'Whatsapp and SMS Integrations' or contact your Cotalker sales representative).
- Recipient's full international phone number, e.g., +1 (234) 555-6789
- Template information

:::info note
**Templates** are used for sending automated messages. Templates can be personalized but they require Facebook approval, which can take a while. We recommend you use our already approved and ready-to-use _Default_ template.
:::

<div className="alert alert--secondary">

### <span className="hero__subtitle">Default Template</span> {#default-template}

> Hi `NAME`! You have a new request for the process `WORKFLOW NAME`. 
> 📝 The link to complete the request is: `URL LINK`

<br/>

### <span className="hero__subtitle">Basic Setup</span> {#basic-setup}

- `NAME`: The recipients name should be set in the settings panel's **Name** field.
- `WORKFLOW NAME`: The _workflow name_ should be set in the settings panel's **First** field.
- `URL LINK`: Use any URL link. It should be placed in the settings panel's **Second** field.

_The settings panel should look something like this:_

<img alt="whatsapp message" className="img_sizing_narrow item shadow--tl" src={useBaseUrl('img/automations_routines_stage_whatsapp_01.png')} />
<br/>

</div>
<br/>

### Expected Results {#expected-results}

_Your message will look something like this:_

<img alt="whatsapp message" className="img_whatsapp item shadow--tl" src={useBaseUrl('img/automations_routines_stage_whatsapp_00.jpeg')} />
<br/>

-----



  
**Send message via WhatsApp**  
key: PBWhatsApp  
## Inputs  
### 1. Contract code (key: contractCode)  
The code can be found in the contract addendum: 'Whatsapp and SMS Integrations'  
Required: true  
Data Type: string   
### 2. Phone Number (key: phoneNumber)  
Full international number e.g., +56912345678  
Required: true  
Data Type: string   
### 3. template  
Use 'default'  
Required: true  
Data Type: string   
### 4. language  
'en' or 'es'  
Required: true  
Data Type: string   
### 5. Name (key: name)  
Name for template  
Required: true  
Data Type: string   
### 6. first  
Template first argument  
Required: true  
Data Type: string   
### 7. second  
Template second argument  
Required: true  
Data Type: string   
## Next Stages  
### 1. DEFAULT  
  
## Outputs  
### 1. status  
  
Required: no  
Data Type: string   
### 2. message  
  
Required: no  
Data Type: object 