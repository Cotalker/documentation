---  
title: Create Channel-2.0.0  
displayed_sidebar: documentation  
---  
**Create a new Channel**  
key: PBCreateChannel  
  
## Inputs  
### 1. Group (key: group)  
  
Required: true  
Data Type: CotGroupId   
### 2. Code (key: nameCode)  
Channel Code  
Required: no  
Data Type: string   
### 3. Display Name (key: nameDisplay)  
  
Required: no  
Data Type: string   
### 4. User Ids (key: userIds)  
  
Required: no  
Data Type: array CotUserId  
### 5. Property Ids (key: propertyIds)  
  
Required: no  
Data Type: array CotPropertyId  
### 6. Group Owner Ids (key: groupOwnerIds)  
  
Required: no  
Data Type: array CotUserId  
### 7. is Active (key: isActive)  
  
Required: no  
Data Type: boolean   
### 8. Settings Display (key: settingsDisplay)  
  
Required: no  
Data Type: string   
### 9. Settings Write (key: settingsWrite)  
  
Required: no  
Data Type: string   
### 10. Settings Read (key: settingsRead)  
  
Required: no  
Data Type: string   
### 11. Image Original (key: imageOriginal)  
  
Required: no  
Data Type: string   
### 12. Image Small (key: imageSmall)  
  
Required: no  
Data Type: string   
### 13. Image Square (key: imageSquare)  
  
Required: no  
Data Type: string   
## Next Stages  
### 1. SUCCESS  
  
### 2. ERROR  
  
## Outputs  
### 1. Channel (key: channel)  
  
Required: no  
Data Type: object   
### 2. Errors (key: errors)  
  
Required: no  
Data Type: array string