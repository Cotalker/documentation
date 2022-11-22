---  
title: Create PDF-2.0.0  
displayed_sidebar: documentation  
---  
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
### 3. Disable automatic header (key: disableAutoHeaders)  
Indicates whether the automatic header should be disabled when loading the URL to generate the PDF  
Required: no  
Data Type: boolean   
### 4. Copies (key: copies)  
Copies to be generated  
Required: no  
Data Type: string   
### 5. Alternative Converter (key: useAltPdfConverter)  
Use Alternative Pdf Converter.  
Required: no  
Data Type: boolean   
### 6. Identifier (key: linkIdentifier)  
Code used to identify the PDF  
Required: no  
Data Type: string   
## Next Stages  
### 1. SUCCESS  
  
### 2. ERROR  
  
## Outputs  
### 1. Content Type (key: contentType)  
  
Required: no  
Data Type: string   
### 2. Content URL (key: contentUrl)  
  
Required: no  
Data Type: string   
### 3. Content (key: content)  
  
Required: no  
Data Type: string   
### 4. Errors (key: errors)  
  
Required: no  
Data Type: array string