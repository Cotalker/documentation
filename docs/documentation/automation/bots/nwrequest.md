# Network request  
**Makes a network request**  
key: NWRequest  
## Inputs  
### 1. URL (key: url)  
URL to which the network request will be sent  
Required: true  
Data Type: string   
### 2. Method (key: method)  
HTTP method of the network request  
Required: true  
Data Type: dictionary   
### 3. Headings (key: headers)  
Network request headers  
Required: no  
Data Type: object   
### 4. Default authentication (key: defaultAuth)  
Use the default authentication method if the query to be performed is against the Cotalker API  
Required: no  
Data Type: boolean   
### 5. Query parameters (key: queryString)  
Query parameters to use in the network request  
Required: no  
Data Type: object   
### 6. Body (key: body)  
Body to use in the network request  
Required: no  
Data Type: any   
### 7. String body (key: sbody)  
Alternative to the body parameter, it allows you to enter a body in string format (normally used to pass the body as JSON).  
Required: no  
Data Type: string   
### 8. Simulation (key: simulation)  
Indicates that the network call must be executed in simulation mode (the call will return HTTP code 999)  
Required: no  
Data Type: boolean   
## Next Stages  
### 1. Success (key: SUCCESS)  
Stage to be executed when the network request returned a success code (Ex: HTTP 2xx)  
Required: no  
Data Type: undefined   
### 2. Error (key: ERROR)  
Stage to execute when the network request returned an error code (Ex: HTTP 5xx)  
Required: no  
Data Type: undefined   
## Outputs  
### 1. Status Code (key: statusCode)  
  
Required: no  
Data Type: number   
### 2. Error Message (key: errorMessage)  
  
Required: no  
Data Type: string   
### 3. Data (key: data)  
  
Required: no  
Data Type: any 