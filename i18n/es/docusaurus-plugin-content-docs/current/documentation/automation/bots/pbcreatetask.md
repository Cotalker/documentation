# Create Task  
  
**Create a new Task**  
key: PBCreateTask  
## Inputs  
### 1. Id (key: tid)  
Id of the Task to be created (If one is not indicated, the system will generate it automatically)  
Required: no  
Data Type: CotTaskId   
### 2. Name (key: name)  
Task Name  
Required: true  
Data Type: array string  
### 3. Group (key: taskGroup)  
Id of the Group to which the Task will belong  
Required: true  
Data Type: CotTaskGroupId   
### 4. Relative weight (key: relativeWeight)  
Relative Task Weight  
Required: no  
Data Type: number   
### 5. User (key: user)  
User Id  
Required: no  
Data Type: CotUserId   
### 6. Estimated time (key: estimatedTime)  
Estimated time to complete the Task  
Required: no  
Data Type: number   
### 7. Start date (key: startDate)  
Task Start Date  
Required: no  
Data Type: date   
### 8. Channel (key: channel)  
  
Required: no  
Data Type: CotChannelId   
### 9. End date (key: endDate)  
Task Completion Date  
Required: no  
Data Type: date   
### 10. Parent task (key: parent)  
Id of the parent Task of the new Task  
Required: no  
Data Type: CotTaskId   
### 11. Parent Channel (key: parentChannel)  
Parent Channel Id of the new Task  
Required: no  
Data Type: CotChannelId   
### 12. Asset (key: parentAsset)  
Asset ID  
Required: no  
Data Type: CotTaskId   
### 13. Answers (key: answers)  
Array with the Id's of the responses of associated forms of the new Task  
Required: no  
Data Type: array string  
### 14. Dynamic Field 1 (key: status1)  
Property Id associated with dynamic field 1 of the new Task  
Required: no  
Data Type: CotPropertyId   
### 15. Dynamic Field 2 (key: status2)  
Property Id associated with dynamic field 2 of the new Task  
Required: no  
Data Type: CotPropertyId   
### 16. Dynamic Field 3 (key: status3)  
Property Id associated with dynamic field 3 of the new Task  
Required: no  
Data Type: CotPropertyId   
### 17. Dynamic Field 4 (key: status4)  
Property Id associated with dynamic field 4 of the new Task  
Required: no  
Data Type: CotPropertyId   
### 18. Dynamic Field 5 (key: status5)  
Property Id associated with dynamic field 5 of the new Task  
Required: no  
Data Type: CotPropertyId   
### 19. Editors (key: editors)  
Array with the IDs of the user editors of the new Task  
Required: no  
Data Type: array CotUserId  
### 20. Assigned (key: assignee)  
User ID assigned to the new Task  
Required: no  
Data Type: CotUserId   
### 21. Visibility (key: visibility)  
  
Required: no  
Data Type: array CotUserId  
### 22. Followers (key: followers)  
  
Required: no  
Data Type: array CotUserId  
### 23. Information (key: info)  
Information  
Required: no  
Data Type: string   
### 24. Creator (key: createdBy)  
User ID creator of the new Task  
Required: no  
Data Type: CotUserId   
## Next Stages  
### 1. Task created (key: CREATED)  
Stage to execute when the Task was created  
### 2. Task not created (key: NOT-CREATED)  
Stage to execute when the Task was not created  
## Outputs  
### 1. Task (key: task)  
  
Required: no  
Data Type: object 