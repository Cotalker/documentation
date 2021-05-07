# Update Channel  
**Update a Channel**  
key: PBUpdateChannel  
## Inputs  
### 1. Channel (key: channelId)  
Channel Id  
Required: true  
Data Type: CotChannelId   
### 2. Group (key: group)  
  
Required: no  
Data Type: CotGroupId   
### 3. Code (key: nameCode)  
Channel Code  
Required: no  
Data Type: string   
### 4. Name (key: nameDisplay)  
Channel Name  
Required: no  
Data Type: string   
### 5. Users (key: userIds)  
Array with the IDs of Channel users  
Required: no  
Data Type: array CotUserId  
### 6. Property Ids (key: propertyIds)  
  
Required: no  
Data Type: array CotPropertyId  
### 7. Admin users (key: groupOwnerIds)  
Array with the IDs of the admin users of the Channel  
Required: no  
Data Type: array CotUserId  
### 8. Active (key: isActive)  
Indicates if the Channel is active  
Required: no  
Data Type: boolean   
### 9. Settings (key: settings)  
Channel Settings  
Required: no  
Data Type: object   
### 10. Image (key: image)  
Object with the image of the Channel in its different sizes  
Required: no  
Data Type: object   
## Next Stages  
### 1. Default (key: DEFAULT)  
Stage to be executed when the operation finishes  
Required: no  
Data Type: undefined   
## Outputs  
### 1. Status (key: status)  
  
Required: no  
Data Type: boolean   
### 2. Channel (key: channel)  
  
Required: no  
Data Type: object 