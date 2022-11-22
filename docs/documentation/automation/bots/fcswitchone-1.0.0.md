---  
title: Switch-1.0.0  
displayed_sidebar: documentation  
---  
**Conditionally executes the next stage based on the left and right hand of the operator**  
key: FCSwitchOne  
  
## Inputs  
### 1. Left side (key: lexpression)  
Left operator side  
Required: true  
Data Type: any   
### 2. Right side case A (key: rcaseA)  
Right side of the operator for case A  
Required: true  
Data Type: any   
### 3. Right side case B (key: rcaseB)  
Right side of the operator for case B  
Required: true  
Data Type: any   
### 4. Right side case C (key: rcaseC)  
Right side of the operator for case C  
Required: true  
Data Type: any   
### 5. Right side case D (key: rcaseD)  
Right side of the operator for case D  
Required: true  
Data Type: any   
### 6. Right side case E (key: rcaseE)  
Right side of the operator for case E  
Required: true  
Data Type: any   
### 7. Operator (key: operator)  
String representing the operator. Allowed values: 'eq', 'neq', 'gt' and 'lt'  
Required: no  
Data Type: string   
## Next Stages  
### 1. Case A (key: CASE_A)  
Stage to be executed when the operation for case A results in true  
### 2. Case B (key: CASE_B)  
Stage to be executed when the operation for case B results in true  
### 3. Case C (key: CASE_C)  
Stage to be executed when the operation for case C results in true  
### 4. Case D (key: CASE_D)  
Stage to be executed when the operation for case D results in true  
### 5. Case E (key: CASE_E)  
Stage to be executed when the operation for case E results in true  
### 6. Default (key: DEFAULT)  
Stage to be executed when all previous stages were executed  
## Outputs  
### 1. Selected (key: selected)  
  
Required: no  
Data Type: string 