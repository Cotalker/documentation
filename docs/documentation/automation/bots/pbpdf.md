# Create PDF  
**Create a PDF from a local file or a URL**  
key: PBPdf  
## Inputs  
### 1. Local file (key: localFile)  
Address of the local file from which the PDF will be created  
Required: no  
Data Type: string   
### 2. URL (key: url)  
URL from which the PDF will be created  
Required: no  
Data Type: string   
### 3. Upload PDF (key: upload)  
Indicates whether the generated PDF should be uploaded to the file repository in the cloud  
Required: no  
Data Type: boolean   
### 4. Identifier (key: linkIdentifier)  
Code used to identify the PDF  
Required: no  
Data Type: string   
### 5. Name (key: outputFile)  
PDF name  
Required: true  
Data Type: string   
### 6. Disable automatic header (key: disableAutoHeaders)  
Indicates whether the automatic header should be disabled when loading the URL to generate the PDF  
Required: no  
Data Type: boolean   
### 7. Copies (key: copies)  
Copies to be generated  
Required: no  
Data Type: string   
### 8. useAltPdfConverter (key: useAltPdfConverter)  
  
Required: no  
Data Type: boolean   
## Next Stages  
### 1. Default (key: DEFAULT)  
Stage to be executed when the operation ends  
Required: no  
Data Type: undefined   
## Outputs  
### 1. status (key: status)  
  
Required: no  
Data Type: string   
### 2. contentType (key: contentType)  
  
Required: no  
Data Type: string   
### 3. contentUrl (key: contentUrl)  
  
Required: no  
Data Type: string   
### 4. content (key: content)  
  
Required: no  
Data Type: string 