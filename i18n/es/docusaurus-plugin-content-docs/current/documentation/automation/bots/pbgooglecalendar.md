# Google Calendar Integration  
import useBaseUrl from '@docusaurus/useBaseUrl';

## Overview {#overview}

This stage-bot integrates Cotalker with Google Calendars. Create meetings or events and send ICS invitations to any email. 

Most email clients will show the event. Invitations can be sent to any user, even those _not_ in the organization's Google Workspace.

Before beginning, you will need to have a Google email account associated with the company's Google Workspace.

## Special Inputs {#special-inputs}

<div className="alert alert--secondary">

### Date & Time Inputs {#date-time-input}
In [Start Date](#4-start-date-key-initialdate) and [End Date](#5-end-date-key-enddate), valid inputs are:

<div className="padding-left--lg">

**ISODate**: <br/>
`YYYY-MM-DDTHH:mm:ss.sssZ`

**Survey Date Answer**:<br/>
`$VALUE#answer|data[find=>identifier=myidentifier]|process|0`

**Date Object**:<br/>
`$VALUE#createdAt`

:::note
Go to [COTLang](/docs/documentation/automation/cotlang/admin_cotlang) section for more information on scripts shown above.
:::

</div>
<br/>

### Timezone {#timezone}
The [Timezone](#7-timezone-key-timezone) must be set using the TZ Database name format, e.g., America/Santiago, America/Sao_Paulo, Asia/Dubai, Asia/Shanghai, etc.

### Organizer ID {#organizer-id}
For the [Organizer ID](#8-organizer-id-key-organizer), you must use the ObjectId of a [COTUser](docs/documentation/models/users/model_users) with a valid domain email, i.e., a Google email account that belongs to the organization's Google Workspace. Events will be scheduled in the organization's Google Workspace Calendar.

### Invitees IDs {#invitees}
The [Invitees IDs](#9-invitees-ids-key-invitedbyid) field supports email addresses or [COTUser](/docs/documentation/models/users/model_users) ObjectIDs. Press the <span className="badge badge--primary">+ Add Item</span> button for each invitation recipient. 

</div>
<br/>


## JSON Sample {#json-sample}

```json
    {
        "_id" : "6130ecc9a3c2f31c626d4404", 
        "key" : "calendar", 
        "name" : "PBCalendar", 
        "version" : "2.0.0", 
        "data" : {
            "title" : "PBCalendar Event", 
            "description" : "Description of event", 
            "initialDate" : ISODate("2021-08-05T20:51:30.551+0000"), 
            "durationMinutes" : 30.0, 
            "invitedById" : [
                "6130ecd1f24f031951a4d29d", 
                "6130ecd8a2aa9b74a14d03ab"
            ], 
            "invitedByEmail" : [
                "sample@gmail.com"
            ], 
            "owner" : "6130ece1611250a6b29a9879"
        }, 
        "customNetworkRequest" : [
        ], 
        "next" : {
            "DEFAULT" : null
        }
    }
```

## Expected Result {#expected-result}

<img alt="email" className="img_sizing item shadow--tl" src={useBaseUrl('img/pbcalendar_00.png')} />
<br/>


--------

  
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
