# Edit Channel Users  
**Add or remove users from a Channel**  
key: PBChannelAddUser  
## Inputs  
### 1. Criteria (key: type)  
User selection criteria. Allowed values: 'user', 'boss', 'property' and 'accessRole'  
Required: true  
Data Type: string   
### 2. User (key: user)  
User ID to be added to the Channel in case the criterion is 'user'  
Required: true  
Data Type: CotUserId   
### 3. Access role (key: accessRole)  
Id of the access role that users must have in case the criterion is 'accessRole'  
Required: true  
Data Type: CotAccessRoleId   
### 4. Property (key: property)  
Property Id that users must have in case the criterion is 'property'  
Required: true  
Data Type: CotPropertyId   
### 5. Channel (key: channel)  
Channel Id  
Required: true  
Data Type: CotChannelId   
### 6. Operation (key: operation)  
Indicates whether users should be added or removed from the Channel. Allowed values: 'add' and 'remove'  
Required: true  
Data Type: string   
## Next Stages  
### 1. Channel edited (key: ADDED)  
Stage to be executed when the Channel was edited  
### 2. Channel not edited (key: NOT-ADDED)  
Stage to be executed when the Channel was not edited  
## Outputs  
### 1. Channel (key: channel)  
  
Required: no  
Data Type: object 