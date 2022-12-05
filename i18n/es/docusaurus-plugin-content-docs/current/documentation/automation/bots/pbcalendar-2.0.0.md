---  
title: Calendar 2.0.0-2.0.0  
displayed_sidebar: documentation  
---  
****  
key: PBCalendar  
  
## Inputs  
### 1. Title (key: title)  
  
Required: true  
Data Type: string   
### 2. Description (key: description)  
  
Required: no  
Data Type: string   
### 3. Initial Date (key: initialDate)  
  
Required: true  
Data Type: date   
### 4. Duration Minutes (key: durationMinutes)  
  
Required: true  
Data Type: number   
### 5. Invited By Id (key: invitedById)  
  
Required: no  
Data Type: array CotUserId  
### 6. Invited By Email (key: invitedByEmail)  
  
Required: no  
Data Type: array string  
### 7. Owner (key: owner)  
  
Required: true  
Data Type: CotUserId   
## Next Stages  
### 1. DEFAULT  
  
## Outputs  
### 1. ICS Content (key: ICSContent)  
  
Required: no  
Data Type: string   
### 2. Recipients (key: recipients)  
  
Required: no  
Data Type: array string
