---  
title: Update Channel-2.0.0  
displayed_sidebar: documentation  
---  
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
### 9. Settings Display (key: settingsDisplay)  
  
Required: no  
Data Type: string   
### 10. Settings Write (key: settingsWrite)  
  
Required: no  
Data Type: string   
### 11. Settings Read (key: settingsRead)  
  
Required: no  
Data Type: string   
### 12. Image Original (key: imageOriginal)  
  
Required: no  
Data Type: string   
### 13. Image Small (key: imageSmall)  
  
Required: no  
Data Type: string   
### 14. Image Square (key: imageSquare)  
  
Required: no  
Data Type: string   
## Next Stages  
### 1. SUCCESS  
  
### 2. ERROR  
  
## Outputs  
### 1. Status (key: status)  
  
Required: no  
Data Type: boolean   
### 2. Channel (key: channel)  
  
Required: no  
Data Type: object   
### 3. Errors (key: errors)  
  
Required: no  
Data Type: array string
