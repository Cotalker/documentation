# Send message  
**Send a message to a set of channels**  
key: PBMessage  
## Inputs  
### 1. Content (key: content)  
Content of the message to be sent  
Required: true  
Data Type: string   
### 2. [Legacy] Merge content (key: joinContentBy)  
Character used to join the content in case this is an array  
Required: no  
Data Type: string   
### 3. Content type (key: contentType)  
Message content type. Allowed values: 'text / plain' and 'text / system'  
Required: true  
Data Type: string   
### 4. User (key: sentBy)  
Id of the User sending the message  
Required: true  
Data Type: CotUserId   
### 5. Channels (key: channelIds)  
Array with the IDs of the channels to which the message will be sent  
Required: true  
Data Type: array CotChannelId  
### 6. Settings (key: runtime)  
JSON that contains runtime settings  
Required: no  
Data Type: string   
### 7. Metadata (key: meta)  
JSON containing message metadata  
Required: no  
Data Type: string   
## Next Stages  
### 1. Default (key: DEFAULT)  
Stage to be executed when the operation ends  
Required: no  
Data Type: undefined   
## Outputs  
### 1. Status (key: status)  
  
Required: no  
Data Type: boolean 