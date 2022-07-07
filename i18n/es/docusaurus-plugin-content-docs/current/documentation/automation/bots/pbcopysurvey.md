# Copy messages  
  
**Copy messages from one Channel to another**  
key: PBCopySurvey  
## Inputs  
### 1. Messages (key: messages)  
Arrangement with the Id's of the messages to be copied  
Required: true  
Data Type: array object  
### 2. Channel (key: channel)  
Id of the Channel to which the messages will be copied  
Required: true  
Data Type: CotChannelId   
### 3. Sent by (key: sentBy)  
User ID that sends the copied messages  
Required: no  
Data Type: CotUserId   
## Next Stages  
### 1. Default (key: DEFAULT)  
Stage to be executed when the operation ends  
## Outputs  
### 1. Messages (key: messages)  
  
Required: no  
Data Type: array object