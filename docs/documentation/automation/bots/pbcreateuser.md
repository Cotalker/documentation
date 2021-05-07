# Create User  
**Create a new User**  
key: PBCreateUser  
## Inputs  
### 1. Email (key: email)  
User Email  
Required: true  
Data Type: string   
### 2. Phone (key: phone)  
User Phone  
Required: true  
Data Type: string   
### 3. Names (key: names)  
User Names  
Required: true  
Data Type: string   
### 4. Paternal Surname (key: lastName)  
User's paternal last name  
Required: true  
Data Type: string   
### 5. Mother Surname (key: secondLastName)  
User's maternal last name  
Required: no  
Data Type: string   
### 6. Cargo (key: jobTitle)  
User Fee  
Required: true  
Data Type: string   
### 7. Access roles (key: accessRoles)  
Array with the IDs of the User Access Roles  
Required: no  
Data Type: array string  
### 8. Properties (key: properties)  
Array with the IDs of the User Properties  
Required: no  
Data Type: array CotPropertyId  
### 9. Extra (key: extra)  
Extra User Data  
Required: no  
Data Type: dictionary any  
## Next Stages  
### 1. User created (key: CREATED)  
Stage to be executed when the User was created  
### 2. User not created (key: NOT-CREATED)  
Stage to be executed when the User was not created  
## Outputs  
### 1. User (key: user)  
  
Required: no  
Data Type: object 