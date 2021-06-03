# Google Calendar Integration  
import useBaseUrl from '@docusaurus/useBaseUrl';

<img alt="title image" className="img_sizing" src={useBaseUrl('img/design/Main_menu.svg')} />
<br/>

## Overview {#overview}

This stage-bot integrates Cotalker with Google Calenders. Create meetings or events and send invitations via email. 

Before beginning, you will need to have a Google email account associated with the company's Google Workspace.

:::note keep in mind
- The **Organizer ID** must contain a valid domain email, i.e., a Google email account that belongs to the organization's Google Workspace. Events will be scheduled in the organization's Google Workspace Calendar.
- _Date & Time_ must be in Javascript Format: `YYYY-MM-DDTHH:mm:ss.sssZ`
- The **Invitees IDs** field supports email addresses or Cotalker ID numbers. Press the <span className="badge badge--primary">+ Add Item</span> button for each invitation recipient. 
- **Timezone** must be set using the Timezone Database Name, e.g., America/Santiago, America/Sao_Paulo, Asia/Dubai, Asia/Shanghai, etc.
- Invitations can be sent to any user, even those **not** in the organization's Google Workspace.
:::
  
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