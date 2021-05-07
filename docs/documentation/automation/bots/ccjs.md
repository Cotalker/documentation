# Custom Javascript Code  
**Sandboxed JS runner.**  
key: CCJS  
## Inputs  
### 1. Source Code (key: src)  
Must return an Object. e.g., return { hello: 'world' };. Variables 'value' and 'output' can be read.  
Required: true  
Data Type: string   
## Next Stages  
### 1. SUCCESS (key: SUCCESS)  
  
Required: no  
### 2. ERROR (key: ERROR)  
  
Required: no  
## Outputs  
### 1. statusCode (key: statusCode)  
Status code number: 0 if successful  
Required: no  
Data Type: number   
### 2. error (key: error)  
Error message.  
Required: no  
Data Type: string   
### 3. data (key: data)  
Returned value.  
Required: no  
Data Type: any 