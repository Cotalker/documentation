---  
title: Copy messages-2.0.0  
displayed_sidebar: documentation  
---  
**Copy messages from one Channel to another**  
key: PBCopySurvey  
  
## Inputs  
### 1. Form Id (key: formId)  
answer.formId or message.form.id  
Required: true  
Data Type: CotMessageFormId   
### 2. Form Channel Id (key: formChannel)  
Channel where survey exists  
Required: true  
Data Type: CotChannelId   
### 3. Target Channel Id (key: targetChannel)  
Where to copy the survey  
Required: true  
Data Type: CotChannelId   
### 4. Sent by (key: sentBy)  
(OPTIONAL) User ID that sends the copied messages  
Required: no  
Data Type: CotUserId   
### 5. Create New Answer (key: createNewAnswer)  
  
Required: true  
Data Type: boolean   
## Next Stages  
### 1. SUCCESS  
  
### 2. ERROR  
  
## Outputs  
### 1. Messages (key: messages)  
  
Required: no  
Data Type: array CotMessageId  
### 2. Errors (key: errors)  
  
Required: no  
Data Type: array string