# PDF Extractor  
  
**Convert data and tables from PDFs to JSON**  
key: PBPDFExtractor  
## Inputs  
### 1. Contract Code (key: contractCode)  
Contract for paid usage API  
Required: true  
Data Type: string   
### 2. URL (key: url)  
PDF or .ZIP URL  
Required: true  
Data Type: string   
### 3. CSV (key: csv)  
Extract tables as CSV (Default JSON)  
Required: no  
Data Type: boolean   
## Next Stages  
### 1. DEFAULT  
  
### 2. ERROR  
  
## Outputs  
### 1. Status (key: status)  
  
Required: no  
Data Type: boolean   
### 2. Tables (key: tables)  
  
Required: no  
Data Type: array object  
### 3. Data (key: data)  
  
Required: no  
Data Type: object 
