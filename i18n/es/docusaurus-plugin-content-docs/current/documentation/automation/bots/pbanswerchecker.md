# Search for answers  
  
**Search for form responses**  
key: PBAnswerChecker  
## Inputs  
### 1. Query (key: query)  
Query used to search for answers  
Required: true  
Data Type: dictionary any  
### 2. Filtering criteria (key: check)  
Array of filtering criteria that will be applied to the Response data  
Required: true  
Data Type: array object  
## Next Stages  
### 1. Answers found (key: FOUND)  
Stage to execute when answers are found  
### 2. Answers not found (key: NOT-FOUND)  
Stage to be executed when no answers are found  
## Outputs  
### 1. Answers (key: answers)  
  
Required: no  
Data Type: array CotAnswerId
