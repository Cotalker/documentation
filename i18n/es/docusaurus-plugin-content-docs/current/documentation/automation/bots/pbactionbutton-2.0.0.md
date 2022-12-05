---  
title: Action Button-2.0.0  
displayed_sidebar: documentation  
---  
****  
key: PBActionButton  
  
## Inputs  
### 1. Is Active (key: isActive)  
  
Required: true  
Data Type: boolean   
### 2. Channel Id (key: channelId)  
  
Required: true  
Data Type: CotChannelId   
### 3. Action Type (key: actionType)  
  
Required: true  
Data Type: string   
### 4. Channel Properties (key: channelProperties)  
  
Required: no  
Data Type: array CotPropertyId  
### 5. Access Roles (key: accessRoles)  
  
Required: no  
Data Type: array CotAccessRoleId  
### 6. URI (key: uri)  
  
Required: no  
Data Type: string   
### 7. Query Params (key: queryParams)  
  
Required: no  
Data Type: dictionary string  
### 8. Window Config (key: windowConfig)  
  
Required: no  
Data Type: string   
### 9. Window Name (key: windowName)  
  
Required: no  
Data Type: string   
### 10. Open Mode (key: openMode)  
  
Required: no  
Data Type: string   
## Next Stages  
### 1. SUCCESS  
  
### 2. ERROR  
  
## Outputs  
### 1. Channel (key: channel)  
  
Required: no  
Data Type: CotChannelId   
### 2. Errors (key: errors)  
  
Required: no  
Data Type: array string
