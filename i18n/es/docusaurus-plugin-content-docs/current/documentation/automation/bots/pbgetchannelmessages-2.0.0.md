# Get Channel Messages  
  
****  
key: PBGetChannelMessages  
## Inputs  
### 1. Channel (key: channel)  
  
Required: true  
Data Type: CotChannelId   
### 2. UUID (key: uuid)  
  
Required: true  
Data Type: string   
### 3. Survey Id (key: surveyId)  
  
Required: true  
Data Type: CotSurveyId   
## Next Stages  
### 1. FOUND  
  
### 2. NOT-FOUND  
  
### 3. ERROR  
  
## Outputs  
### 1. Messages (key: messages)  
  
Required: no  
Data Type: array object  
### 2. Errors (key: errors)  
  
Required: no  
Data Type: array string