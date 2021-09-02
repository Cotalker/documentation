# Submit Form  
  
**Send a Form to a Channel**  
key: PBSendSurvey  
## Inputs  
### 1. Survey Id (key: surveyId)  
  
Required: no  
Data Type: CotSurveyId   
### 2. Survey Code (key: surveyCode)  
  
Required: no  
Data Type: string   
### 3. Channel Id (key: channelId)  
  
Required: true  
Data Type: CotChannelId   
### 4. Task Id (key: taskId)  
  
Required: true  
Data Type: CotTaskId   
### 5. Task Group Id (key: taskGroupId)  
  
Required: true  
Data Type: CotTaskGroupId   
### 6. Sender Id (key: senderId)  
  
Required: no  
Data Type: CotUserId   
### 7. Recipient Id (key: recipientId)  
  
Required: true  
Data Type: CotUserId   
### 8. Edit Mode (key: editMode)  
  
Required: no  
Data Type: boolean   
### 9. Prefilled (key: prefilled)  
  
Required: no  
Data Type: dictionary any  
## Next Stages  
### 1. SUCCESS  
  
### 2. ERROR  
  
## Outputs  
### 1. Status (key: status)  
  
Required: no  
Data Type: boolean 