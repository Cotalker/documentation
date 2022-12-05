---  
title: Change Task Status-2.1.0  
displayed_sidebar: documentation  
---  
**Change the status of a Task**  
key: PBChangeState  
  
## Inputs  
### 1. Task (key: tid)  
Task Id  
Required: true  
Data Type: CotTaskId   
### 2. Status (key: smState)  
Id of the new state  
Required: true  
Data Type: CotStateMachineStateId   
### 3. Group (key: taskGroup)  
Group to which the Task belongs  
Required: true  
Data Type: CotTaskGroupId   
### 4. Quiet (key: quiet)  
  
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
