# Google Calendar Integration  
import useBaseUrl from '@docusaurus/useBaseUrl';

## Overview {#overview}

This stage-bot integrates Cotalker with Google Calenders. Create meetings or events and send invitations via email. 

Before beginning, you will need to have your a Google email account associated with your company. Please contact support for configuration.

:::note keep in mind
- Date & Time must be in Javascript Format: YYYY-MM-DDTHH:mm:ss.sssZ
- The **Organizer ID** must contain a valid domain email, i.e., a Google email account that has been configured to be associated with the company. Please contact support for configuration.
- The **Invitees IDs** field only supports email addresses. Press the <span className="badge badge--primary">+ Add Item</span> button for each email recipient. 
:::

What is a valid domain email and how do I get one?
What is length in **End Date** field?
Why is **Length field** required if **End Date** doesn't even work without time.
What is **Time Zone** field format? What happens if not used? Does it go to GMT? What if timezone added to time format in Start and End date?  
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