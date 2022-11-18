---  
title: Send email-1.0.0  
displayed_sidebar: documentation  
---  
  
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
### 3. Data (key: content)  
Data that will be used to build the email  
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
### 8. Template (key: template)  
Name of the template to use to build the email  
Required: no  
Data Type: string   
### 9. Individual shipping (key: singleRecipient)  
Indicates whether the mail should be sent individually to the recipients  
Required: no  
Data Type: boolean   
## Next Stages  
### 1. Default (key: DEFAULT)  
Stage to be executed when the operation ends  
## Outputs  
### 1. Status (key: status)  
  
Required: no  
Data Type: boolean 