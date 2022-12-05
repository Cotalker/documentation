---  
title: Create Property-1.0.0  
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
### 5. Extras (key: extra)  
Extra data of the new Property  
Required: no  
Data Type: dictionary string  
## Next Stages  
### 1. Property created (key: CREATED)  
Stage to execute when the Property was created  
### 2. Property not created (key: NOT-CREATED)  
Stage to execute when the Property was not created  
## Outputs  
### 1. Property (key: property)  
  
Required: no  
Data Type: object 
