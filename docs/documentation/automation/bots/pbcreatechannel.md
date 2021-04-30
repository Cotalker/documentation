# Create Channel  
**Create a new Channel**  
key: PBCreateChannel  
## Inputs  
### 1. group (key: group)  
  
Required: true  
Data Type: CotGroupId   
### 2. Code (key: nameCode)  
Channel Code  
Required: no  
Data Type: string   
### 3. nameDisplay (key: nameDisplay)  
  
Required: no  
Data Type: string   
### 4. userIds (key: userIds)  
  
Required: no  
Data Type: array CotUserId  
### 5. propertyIds (key: propertyIds)  
  
Required: no  
Data Type: array CotPropertyId  
### 6. groupOwnerIds (key: groupOwnerIds)  
  
Required: no  
Data Type: array CotUserId  
### 7. isActive (key: isActive)  
  
Required: no  
Data Type: boolean   
### 8. settings (key: settings)  
  
Required: no  
Data Type: object   
### 9. image (key: image)  
  
Required: no  
Data Type: object   
## Next Stages  
### 1. Channel created (key: CREATED)  
Stage to execute when the Channel was created  
Required: no  
Data Type: undefined   
### 2. Channel not created (key: NOT-CREATED)  
Stage to be executed when the Channel was not created  
Required: no  
Data Type: undefined   
## Outputs  
### 1. channel (key: channel)  
  
Required: no  
Data Type: object 