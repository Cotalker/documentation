---  
title: Google Calendar Integration-1.0.0  
displayed_sidebar: documentation  
---  
  
**Domain wide integration**  
key: PBGoogleCalendar  
## Inputs  
### 1. Event Name (key: title)  
  
Required: true  
Data Type: string   
### 2. Event Location (key: location)  
  
Required: true  
Data Type: string   
### 3. Event Description (key: description)  
  
Required: true  
Data Type: string   
### 4. Start Date (key: initialDate)  
  
Required: true  
Data Type: string   
### 5. End Date (key: endDate)  
Either 'End Date' or 'Length' is required  
Required: true  
Data Type: string   
### 6. Length (minutes) (key: endMinutes)  
Either 'End Date' or 'Length' is required  
Required: true  
Data Type: number   
### 7. Timezone (key: timeZone)  
(optional)  
Required: no  
Data Type: string   
### 8. Organizer id. (key: organizer)  
Must be a valid domain user/email  
Required: true  
Data Type: CotUserId   
### 9. Invitees ids (key: invitedById)  
List of Cotalker Users to invite  
Required: true  
Data Type: array CotUserId  
### 10. Invitees by Email (key: invitedByEmail)  
List of Emails to invite  
Required: true  
Data Type: array string  
## Next Stages  
### 1. Default (key: DEFAULT)  
  
## Outputs  
### 1. Event (key: event)  
  
Required: no  
Data Type: object 
