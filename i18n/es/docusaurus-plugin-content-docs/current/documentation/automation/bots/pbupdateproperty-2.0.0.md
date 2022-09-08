# Update Property  
  
**Update a Property**  
key: PBUpdateProperty  
## Inputs  
### 1. Property (key: propertyId)  
Property Id  
Required: true  
Data Type: CotPropertyId   
### 2. Name (key: display)  
Property Name  
Required: true  
Data Type: string   
### 3. Code (key: code)  
Property Code  
Required: true  
Data Type: string   
### 4. Property Type Code (key: propertyType)  
Code of the Type of property to which the Property belongs  
Required: true  
Data Type: string   
### 5. Schema Instance (key: schemaInstance)  
  
Required: no  
Data Type: dictionary any  
### 6. SubProperties (key: subproperty)  
Array with the IDs of the sub-properties of the new Property  
Required: no  
Data Type: array CotPropertyId  
## Next Stages  
### 1. SUCCESS  
  
### 2. ERROR  
  
## Outputs  
### 1. Property (key: property)  
  
Required: no  
Data Type: CotPropertyId   
### 2. Errors (key: errors)  
  
Required: no  
Data Type: array string