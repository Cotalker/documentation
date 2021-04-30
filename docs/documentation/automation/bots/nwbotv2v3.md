# Run legacy bot  
**Makes a network request to execute a legacy bot**  
key: NWBotV2V3  
## Inputs  
### 1. uri (key: uri)  
  
Required: true  
Data Type: string   
### 2. Channel (key: channel)  
Channel Id  
Required: true  
Data Type: CotChannelId   
### 3. Messages (key: messages)  
Message array  
Required: true  
Data Type: array object  
### 4. Process (key: process)  
Process to execute  
Required: true  
Data Type: string   
## Next Stages  
### 1. Success (key: SUCCESS)  
Stage to be executed when the network request returned a success code (Ex: HTTP 2xx)  
Required: no  
Data Type: undefined   
### 2. Error (key: ERROR)  
Stage to be executed when the network request returned an error code (Ex: HTTP 5xx)  
Required: no  
Data Type: undefined   
## Outputs  
### 1. statusCode (key: statusCode)  
  
Required: no  
Data Type: number   
### 2. errorMessage (key: errorMessage)  
  
Required: no  
Data Type: string   
### 3. data (key: data)  
  
Required: no  
Data Type: any 