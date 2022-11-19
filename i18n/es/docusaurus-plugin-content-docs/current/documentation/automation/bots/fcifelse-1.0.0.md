---  
title: Conditional-1.0.0  
displayed_sidebar: documentation  
---  
  
**Execute the next stage conditionally based on the operator's left and right hand**  
key: FCIfElse  
## Inputs  
### 1. Left side (key: left)  
Left operator side  
Required: true  
Data Type: any   
### 2. Right side (key: right)  
Right side of the operator  
Required: true  
Data Type: any   
### 3. Operator (key: operator)  
String representing the operator. Allowed values: 'eq', 'neq', 'gt' and 'lt'  
Required: no  
Data Type: any   
## Next Stages  
### 1. True condition (key: IF)  
Stage to be executed when the operation results in true  
### 2. False condition (key: ELSE)  
Stage to execute when the operation results in false  
## Outputs  
### 1. Left hand side (key: lhs)  
  
Required: no  
Data Type: any   
### 2. Right hand side (key: rhs)  
  
Required: no  
Data Type: any   
### 3. Result (key: res)  
  
Required: no  
Data Type: boolean   
### 4. Next step (key: next)  
  
Required: no  
Data Type: string 
