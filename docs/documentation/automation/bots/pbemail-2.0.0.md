# Send email  
import useBaseUrl from '@docusaurus/useBaseUrl';

## Overview {#ovewrview}
The **Send Email** stage routine is a bot that automatically generates and sends customized emails within a routine.

:::tip
Check out the [Create a bot tutorial](/docs/tutorials/basic/create_bot#first-stage) to find a section on how to set up the the Send Email bot.
:::

## Default Email Template {#default}
_Below is an example of an email using the default template displayed on a recipient's email client:_

<div className="img_sizing_small">

![template](/img/bot_send_email_00.png)

</div>
<br/>

_Check the **inputs** below to see how the corresponding fields will appear on the email._


  
**Send an email**  
key: PBEmail  
## Inputs  
### 1. Subject (key: subject)  
Subject of the email  
Required: true  
Data Type: string   
### 2. From (key: from)  
Email of the sender  
Required: no  
Data Type: string   
### 3. Recipient Name (key: recipientName)  
  
Required: no  
Data Type: string   
### 4. Recipient Email (key: recipientEmail)  
  
Required: no  
Data Type: string   
### 5. Company Name (key: companyName)  
  
Required: true  
Data Type: string   
### 6. Title (key: title)  
  
Required: true  
Data Type: string   
### 7. Message A (key: messageA)  
  
Required: true  
Data Type: string   
### 8. Message B (key: messageB)  
  
Required: true  
Data Type: string   
### 9. Action (key: action)  
  
Required: true  
Data Type: string   
### 10. Code (key: code)  
  
Required: true  
Data Type: string   
### 11. Attachments (key: attachments)  
Email attachments  
Required: no  
Data Type: array string  
### 12. To (key: targets)  
Array with the emails of the recipient  
Required: true  
Data Type: array string  
### 13. CC (key: cc)  
Array with the emails of the person receiving a copy  
Required: no  
Data Type: array string  
### 14. BCC (key: bcc)  
Array with the emails of those who receive a hidden copy  
Required: no  
Data Type: array string  
### 15. Template (key: template)  
Name of the template to use to build the email  
Required: no  
Data Type: string   
### 16. Individual shipping (key: singleRecipient)  
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