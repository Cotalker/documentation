# Send gif  
**Send a gif to a Channel**  
key: PBGiphy  
## Inputs  
### 1. Search (key: search)  
Array with the words used to find the gif  
Required: true  
Data Type: array string  
### 2. Channel (key: channel)  
Id of the Channel to which the gif will be sent  
Required: true  
Data Type: CotChannelId   
### 3. User (key: sentBy)  
Id of the User sending the gif  
Required: no  
Data Type: CotUserId   
## Next Stages  
### 1. Default (key: DEFAULT)  
Stage to be executed when the operation ends  
Required: no  
Data Type: undefined   
## Outputs  
### 1. URL (key: url)  
  
Required: no  
Data Type: string 