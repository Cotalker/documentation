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
Required: no  
Data Type: string   
### 3. Schema Instance (key: schemaInstance)  
  
Required: no  
Data Type: dictionary any  
### 4. SubProperties (key: subproperty)  
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