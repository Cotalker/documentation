---  
title: Change Task Status-1.0.0  
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
## Next Stages  
### 1. Default (key: DEFAULT)  
Stage to be executed after the operation  
## Outputs  
### 1. Task (key: task)  
  
Required: no  
Data Type: object 
