---  
title: Create Channel-1.0.0  
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
### 8. Settings (key: settings)  
  
Required: no  
Data Type: object   
### 9. Image (key: image)  
  
Required: no  
Data Type: object   
## Next Stages  
### 1. Channel created (key: CREATED)  
Stage to execute when the Channel was created  
### 2. Channel not created (key: NOT-CREATED)  
Stage to be executed when the Channel was not created  
## Outputs  
### 1. Channel (key: channel)  
  
Required: no  
Data Type: object 
