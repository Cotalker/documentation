---  
title: Edit users of a Task-1.0.0  
displayed_sidebar: documentation  
---  
**Add or remove users from a Task**  
key: PBTaskAddEditor  
  
## Inputs  
### 1. Criteria (key: type)  
User selection criteria. Allowed values: 'user', 'boss', 'property' and 'accessRole'  
Required: true  
Data Type: string   
### 2. Users (key: user)  
Arrangement with the IDs of the users to add to the Task in case the criterion is 'user'  
Required: true  
Data Type: array CotUserId  
### 3. Access role (key: accessRole)  
Id of the access role that users must have in case the criterion is 'accessRole'  
Required: true  
Data Type: CotAccessRoleId   
### 4. Property (key: property)  
Property Id that users must have in case the criterion is 'property'  
Required: true  
Data Type: CotPropertyId   
### 5. Task (key: task)  
Task Id  
Required: true  
Data Type: CotTaskId   
### 6. Group (key: taskGroup)  
Id of the Group to which the Task belongs  
Required: true  
Data Type: CotTaskGroupId   
### 7. Operation (key: operation)  
Indicates whether users should be added or removed from the Channel. Allowed values: 'add' and 'remove'  
Required: true  
Data Type: string   
## Next Stages  
### 1. Task edited (key: ADDED)  
Stage to execute when the Task was edited  
### 2. Unedited task (key: NOT-ADDED)  
Stage to be executed when the Task was edited  
## Outputs  
### 1. Task (key: task)  
  
Required: no  
Data Type: object 
