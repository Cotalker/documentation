---  
title: Change Form to edit mode-2.0.0  
displayed_sidebar: documentation  
---  
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
### 1. SUCCESS  
  
### 2. ERROR  
  
## Outputs  
### 1. Messages (key: messages)  
  
Required: no  
Data Type: object   
### 2. Errors (key: errors)  
  
Required: no  
Data Type: array string
