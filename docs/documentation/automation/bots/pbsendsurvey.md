# Submit Form  
**Send a Form to a Channel**  
key: PBSendSurvey  
## Inputs  
### 1. Form (key: survey)  
Code of the Form to be sent  
Required: true  
Data Type: string   
### 2. Channel (key: channel)  
Id of the Channel where the Form will be sent  
Required: true  
Data Type: CotChannelId   
### 3. Sent by (key: sender)  
Id of the User submitting the Form  
Required: no  
Data Type: CotUserId   
### 4. Received by (key: recipient)  
Id of the User who receives the Form  
Required: true  
Data Type: CotUserId   
### 5. Saved (key: saved)  
Indicates whether the Submit Form should be marked as saved  
Required: no  
Data Type: boolean   
### 6. Prefilled fields (key: field)  
Prefilled fields of the Form  
Required: no  
Data Type: dictionary any  
### 7. Hidden Questions (key: hide)  
Hidden Form Questions  
Required: no  
Data Type: dictionary boolean  
## Next Stages  
### 1. Default (key: DEFAULT)  
Stage to be executed when the operation ends  
## Outputs  
### 1. Status (key: status)  
  
Required: no  
Data Type: boolean 