# Update Task  
  
**Update a Task**  
key: PBUpdateTask  
## Inputs  
### 1. Task (key: _id)  
Task Id  
Required: true  
Data Type: CotTaskId   
### 2. Group (key: taskGroup)  
Id of the Group to which the Task belongs  
Required: true  
Data Type: CotTaskGroupId   
### 3. State machine (key: smState)  
Id of the State Machine to which the Task belongs  
Required: no  
Data Type: CotStateMachineStateId   
### 4. Dynamic Field 1 (key: status1)  
Property Id associated with dynamic field 1 of the new Task  
Required: no  
Data Type: CotPropertyId   
### 5. Dynamic Field 2 (key: status2)  
Property Id associated with dynamic field 2 of the new Task  
Required: no  
Data Type: CotPropertyId   
### 6. Dynamic Field 3 (key: status3)  
Property Id associated with dynamic field 3 of the new Task  
Required: no  
Data Type: CotPropertyId   
### 7. Dynamic Field 4 (key: status4)  
Property Id associated with dynamic field 4 of the new Task  
Required: no  
Data Type: CotPropertyId   
### 8. Dynamic Field 5 (key: status5)  
Property Id associated with dynamic field 5 of the new Task  
Required: no  
Data Type: CotPropertyId   
### 9. Editors (key: editors)  
Array with the IDs of the user editors of the new Task  
Required: no  
Data Type: array CotUserId  
### 10. Assigned (key: assignee)  
User ID assigned to the new Task  
Required: no  
Data Type: CotUserId   
### 11. Followers (key: followers)  
  
Required: no  
Data Type: array CotUserId  
### 12. Visibility (key: visibility)  
  
Required: no  
Data Type: array CotUserId  
### 13. Validators (key: validators)  
  
Required: no  
Data Type: array CotUserId  
### 14. Active (key: isActive)  
Indicates whether the Task is active  
Required: no  
Data Type: boolean   
### 15. Name (key: name)  
Task Name  
Required: no  
Data Type: string   
### 16. Estimated time (key: estimatedTime)  
Estimated time to complete the Task  
Required: no  
Data Type: number   
### 17. Start date (key: startDate)  
Task Start Date  
Required: no  
Data Type: date   
### 18. End date (key: endDate)  
Task Completion Date  
Required: no  
Data Type: date   
### 19. Channel Type (key: channelType)  
Task Channel Type. Allowed values: 'bound', 'unbound' and 'unbound-hierarchy'  
Required: no  
Data Type: string   
### 20. Channel (key: channel)  
Channel Id associated with the Task  
Required: no  
Data Type: CotChannelId   
### 21. Parent (key: parent)  
  
Required: no  
Data Type: CotTaskId   
### 22. Info (key: info)  
String with additional information of the task  
Required: no  
Data Type: string   
## Next Stages  
### 1. Default (key: DEFAULT)  
Stage to be executed when the operation finishes  
## Outputs  
### 1. Task (key: task)  
  
Required: no  
Data Type: object 