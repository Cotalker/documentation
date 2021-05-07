# Change Form to edit mode  
**Change a set of forms to edit mode**  
key: PBEditableSurvey  
## Inputs  
### 1. Search criteria (key: type)  
Search criteria of the forms to be edited. Allowed values: 'uuids', 'survey', 'firstSurvey' and 'lastSurvey'  
Required: true  
Data Type: string   
### 2. Channel (key: channel)  
Id of the Channel where the forms will be searched  
Required: true  
Data Type: CotChannelId   
### 3. UUIDs (key: uuids)  
Array with the UUID's to search in case the search criteria is 'uuids'  
Required: no  
Data Type: array string  
### 4. Form (key: surveyId)  
Id of the trustee to be searched in case the search criteria is 'survey', 'firstSurvey' or 'lastSurvey'  
Required: no  
Data Type: CotSurveyId   
## Next Stages  
### 1. Default (key: DEFAULT)  
Stage to be executed when the operation finishes  
Required: no  
## Outputs  
### 1. Messages (key: messages)  
  
Required: no  
Data Type: object 