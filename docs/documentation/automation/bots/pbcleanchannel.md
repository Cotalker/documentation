# Clean channels  
**Delete the messages that have the indicated channels**  
key: PBCleanChannel  
## Inputs  
### 1. Channels (key: channelIds)  
Array with the IDs of the channels  
Required: true  
Data Type: array CotChannelId  
## Next Stages  
### 1. Default (key: DEFAULT)  
Stage to be executed when the operation finishes  
## Outputs  
### 1. Status (key: status)  
  
Required: no  
Data Type: boolean 