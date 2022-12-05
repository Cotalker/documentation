---  
title: Create Property-2.0.0  
displayed_sidebar: documentation  
---  
**Create a new Property**  
key: PBCreateProperty  
  
## Inputs  
### 1. Name (key: display)  
Property Name  
Required: true  
Data Type: string   
### 2. Code (key: code)  
Property Code  
Required: true  
Data Type: string   
### 3. Property Type Code (key: propertyType)  
Property Type Code to which the new Property will belong  
Required: true  
Data Type: CotPropertyTypeId   
### 4. SubProperties (key: subproperty)  
Array with the IDs of the sub-properties of the new Property  
Required: no  
Data Type: array CotPropertyId  
### 5. Schema Instance (key: schemaInstance)  
  
Required: no  
Data Type: dictionary any  
## Next Stages  
### 1. SUCCESS  
  
### 2. ERROR  
  
## Outputs  
### 1. Property (key: property)  
  
Required: no  
Data Type: object   
### 2. Errors (key: errors)  
  
Required: no  
Data Type: array string
