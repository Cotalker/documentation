# Update User  
**Update a User**  
key: PBUpdateUser  
## Inputs  
### 1. User (key: userId)  
User Id  
Required: true  
Data Type: CotUserId   
### 2. Cargo (key: jobTitle)  
User Fee  
Required: false  
Data Type: string   
### 3. Properties (key: properties)  
Array with the IDs of the User Properties  
Required: no  
Data Type: array object  
### 4. Access roles (key: accessRoles)  
Array with the IDs of the User Access Roles  
Required: no  
Data Type: array object  
### 5. Active (key: isActive)  
Indicates if the User is active  
Required: no  
Data Type: boolean   
### 6. Extras (key: extra)  
Extra User Data  
Required: no  
Data Type: dictionary any  
## Next Stages  
### 1. Default (key: DEFAULT)  
Stage to be executed when the operation finishes  
Required: no  
Data Type: undefined   
## Outputs  
### 1. status (key: status)  
  
Required: no  
Data Type: boolean   
### 2. user (key: user)  
  
Required: no  
Data Type: object 