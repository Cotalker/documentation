# Send email  
  
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
