---  
title: Edit users of a Task-2.2.0  
displayed_sidebar: documentation  
---  
  
**Add or remove users from a Task**  
key: PBTaskAddEditor  
## Inputs  
### 1. Criteria (key: type)  
User selection criteria. Allowed values: 'user', 'boss', 'property' and 'accessRole'  
Required: true  
Data Type: string   
### 2. Users (key: users)  
Arrangement with the IDs of the users to add to the Task in case the criterion is 'user' or 'boss'  
Required: no  
Data Type: array CotUserId  
### 3. User (key: user)  
ID of the user to add to the Task in case the criterion is 'user' or 'boss'. To add two or more users, use 'Users'.  
Required: no  
Data Type: CotUserId   
### 4. Access role (key: accessRole)  
Id of the access role that users must have in case the criterion is 'accessRole'  
Required: no  
Data Type: string   
### 5. Property (key: property)  
Property Id that users must have in case the criterion is 'property'  
Required: no  
Data Type: CotPropertyId   
### 6. Task (key: task)  
Task Id  
Required: true  
Data Type: CotTaskId   
### 7. Group (key: taskGroup)  
Id of the Group to which the Task belongs  
Required: true  
Data Type: CotTaskGroupId   
### 8. Operation (key: operation)  
Indicates whether users should be added or removed from the Channel. Allowed values: 'add' and 'remove'  
Required: no  
Data Type: string   
### 9. Quite (key: quite)  
  
Required: no  
Data Type: boolean   
## Next Stages  
### 1. SUCCESS  
  
### 2. ERROR  
  
## Outputs  
### 1. Task (key: task)  
  
Required: no  
Data Type: object   
### 2. Errors (key: errors)  
  
Required: no  
Data Type: array string